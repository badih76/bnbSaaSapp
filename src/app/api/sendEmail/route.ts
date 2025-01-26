import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
// import { AppleReceiptEmail } from '@/components/receiptEmail'

export async function POST(req: NextRequest) {
    const params = await req.json();
    console.log(params);

    const resendAPIKey = process.env.RESEND_API_KEY;
    const resend = new Resend(resendAPIKey);

    try {
        const { data } = await resend.emails.send({
            from: 'badih.barakat@badihbarakat.info',
            to: 'badih76@gmail.com',
            subject: 'Testing Resend Email',
            html: '<h1>Hello from Next.js Resend</h1>'
            // react: AppleReceiptEmail()
        });


        return NextResponse.json({
            data
        });
    } catch(ex) {
        return NextResponse.json({
            ex
        });
    }
}