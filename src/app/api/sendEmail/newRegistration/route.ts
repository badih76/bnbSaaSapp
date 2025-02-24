import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import jwksClient from "jwks-rsa";
import jwt, { JwtPayload } from "jsonwebtoken";
import NewRegisteredUser from '@/app/my-components/email-templates/NewRegisteredUser';

// import { AppleReceiptEmail } from '@/components/receiptEmail'

const client = jwksClient({
    jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
  });

const fromEmail = process.env.BUSINESS_EMAIL ? process.env.BUSINESS_EMAIL : "some-email@email.com";
  

export async function POST(req: NextRequest) {
    try{
        const token = await req.text();
        console.log("Token: ", token);

        // Decode the token
        const { header } = jwt.decode(token, { complete: true })!;
        const { kid } = header;

        // Verify the token
        const key = await client.getSigningKey(kid);
        const signingKey = key.getPublicKey();
        const event = await jwt.verify(token, signingKey);

        // Handle various events
        switch ((event as JwtPayload)?.type) {
            case "user.updated":
            // handle user updated event
            // e.g update database with event.data
            console.log((event as JwtPayload)?.type, (event as JwtPayload).data);
            break;
            case "user.created":
            // handle user created event
            // e.g add user to database with event.data
            console.log((event as JwtPayload)?.type, (event as JwtPayload).data);
            break;
            default:
            // other events that we don't handle
            break;
        }

        const resendAPIKey = process.env.RESEND_API_KEY;
        const resend = new Resend(resendAPIKey);

   
        const { data } = await resend.emails.send({
            from: fromEmail,
            to: (event as JwtPayload).data.email,
            subject: 'Welcome to ESM B&B',
            // html: '<h1>Hello from Next.js Resend</h1>'
            react: NewRegisteredUser((event as JwtPayload).data.user.first_name)
        });


        return NextResponse.json({
            data
        });
    } catch(ex) {
        if (ex instanceof Error) {
            console.error(ex.message);
            return NextResponse.json({ message: ex.message }, { status: 400 });
        }

        return NextResponse.json({
            ex
        });
    }
}