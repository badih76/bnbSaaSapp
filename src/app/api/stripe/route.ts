import { NextResponse } from "next/server";
import { Stripe } from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;

const stripe = new Stripe(stripeSecretKey);

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET() {
    try {

        const customers = await stripe.customers.list({ limit: 3 });


        // const transaction = await stripe.issuing.transactions.retrieve(
        //     'pi_3QnqTJQkI0tYRrg40E2KWBsx', { 
        //         expand: [ 'card' ]
        //     }
        //   );

        return NextResponse.json({
            customers
        });

    } catch(error) {
        console.error(`Inernal Error: ${error}`);

        return NextResponse.json(
            { error: `Internal Server Error: ${error}`},
            { status: 500 }
        )
    }
}