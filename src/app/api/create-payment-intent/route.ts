import { NextRequest, NextResponse } from "next/server";
import { Stripe } from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;

const stripe = new Stripe(stripeSecretKey);

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    try {
        const { amount } =await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: { enabled: true }
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret
        });

    } catch(error) {
        console.error(`Inernal Error: ${error}`);

        return NextResponse.json(
            { error: `Internal Server Error: ${error}`},
            { status: 500 }
        )
    }
}