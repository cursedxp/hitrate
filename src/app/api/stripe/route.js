import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { priceId } = await req.json(); // Get the selected price ID from the request body

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
    });
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
