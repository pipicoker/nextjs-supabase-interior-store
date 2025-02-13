import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia" // ✅ Specify API version (check Stripe docs for the latest)
});
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