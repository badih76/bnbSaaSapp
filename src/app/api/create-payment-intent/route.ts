import { NextRequest, NextResponse } from "next/server";
import { Stripe } from 'stripe';
import { db } from "@/drizzle";
import { unstable_noStore as noStore } from 'next/cache'
import { Orders } from "@/drizzle/schema";
import { eq, max, sql } from "drizzle-orm";
import { convertFromSubcurrency } from "@/lib/paymentGWUtils";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;

const stripe = new Stripe(stripeSecretKey);

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    noStore();

    try {
        const { amount, userId } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: { enabled: true }
        });

        // insert a new Order row with a new order number based on the max order number + 1
        const ordNumPreFix = (new Date()).getFullYear().toString() 
            + ((new Date()).getMonth() + 1).toString().padStart(2, '0') 
            + (new Date()).getDate().toString().padStart(2, '0');

        const ordData = await db.select({ maxNumber: max(Orders.ordNumber)})
            .from(Orders).where(eq(sql`LEFT(orders.ordNumber, 8)`, ordNumPreFix));

        console.log(ordData)
        const newOrderNumber = ordData[0].maxNumber !== null 
            ? parseInt(ordData[0].maxNumber.toString()!) + 1 
            : ordNumPreFix + '01';
        console.log('MaxNumber: ',newOrderNumber, ordNumPreFix, new Date());

        await db.insert(Orders).values({
            ordNumber: newOrderNumber.toString(),
            ordCustId: userId,
            ordAmount: convertFromSubcurrency(amount)
        })

        return NextResponse.json({
            clientSecret: { client_secret: paymentIntent.client_secret, ordNumber: ordData[0].maxNumber?.toString() }
        });

    } catch(error) {
        console.error(`Inernal Error: ${error}`);

        return NextResponse.json(
            { error: `Internal Server Error: ${error}`},
            { status: 500 }
        )
    }
}