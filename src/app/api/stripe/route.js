import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req, res) {
  if (req.method !== "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card", "paypal"],
        line_items: [{ price: price_1QAq2SPryQLXqSIpN2rPAPy8, quantity: 1 }],
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });
      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
