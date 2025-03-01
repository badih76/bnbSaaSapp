import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import jwksClient from "jwks-rsa";
// import jwt, { JwtPayload } from "jsonwebtoken";
import ReservationEmail from '@/app/my-components/email-templates/SuccessfulReservation';
import { IReceiptEmailParams } from '@/lib/emailsInterfaces';

// import { AppleReceiptEmail } from '@/components/receiptEmail'

const client = jwksClient({
    jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
  });

const fromEmail = process.env.BUSINESS_EMAIL ? process.env.BUSINESS_EMAIL : "some-email@email.com";
  

export async function POST(req: NextRequest) {
    console.log(client);
    try{
        // const token = await req.text();
        const reqParams: IReceiptEmailParams = await req.json();

        console.log(reqParams);

        // console.log("Params: ", reqParams);

        // Decode the token
        // const { header } = jwt.decode(token, { complete: true })!;
        // const { kid } = header;

        // // Verify the token
        // const key = await client.getSigningKey(kid);
        // const signingKey = key.getPublicKey();
        // const event = await jwt.verify(token, signingKey);

        // // Handle various events
        // switch ((event as JwtPayload)?.type) {
        //     case "user.updated":
        //     // handle user updated event
        //     // e.g update database with event.data
        //     console.log((event as JwtPayload)?.type, (event as JwtPayload).data);
        //     break;
        //     case "user.created":
        //     // handle user created event
        //     // e.g add user to database with event.data
        //     console.log((event as JwtPayload)?.type, (event as JwtPayload).data);
        //     break;
        //     default:
        //     // other events that we don't handle
        //     break;
        // }

        const resendAPIKey = process.env.RESEND_API_KEY;
        const resend = new Resend(resendAPIKey);

        const businessName = process.env.BUSINESS_NAME;

   
        const { data } = await resend.emails.send({
            from: fromEmail,
            to: reqParams.userEmail,
            subject: `Successful Payment on ${businessName}`,
            // html: '<h1>Hello from Next.js Resend</h1>'
            react: ReservationEmail(reqParams)
        });

        console.log("Email Sending:", data);

        return NextResponse.json({
            reqParams
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