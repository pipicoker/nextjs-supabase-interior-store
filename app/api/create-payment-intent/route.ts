import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    try {
        const {totalCartPrice} = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCartPrice,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({clientSecret: paymentIntent.client_secret});
    } catch (error) {
      console.error('internal errror', error);

      return NextResponse.json(
        { error: `Internal Server Error: ${error}`},
        { status: 500 }
      );
      
    }
}