import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "You must be logged in to create a checkout session" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const { priceId } = await req.json();

  // Check if user is already subscribed
  if (session.user.subscriptionStatus === "active") {
    return NextResponse.json(
      { error: "You already have an active subscription" },
      { status: 400 }
    );
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card", "paypal"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
      client_reference_id: userId,
      customer_email: session.user.email,
      metadata: {
        userId: userId,
        currentStatus: session.user.subscriptionStatus,
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json({ session });
  } catch (error) {
    console.error("Error retrieving Stripe session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
