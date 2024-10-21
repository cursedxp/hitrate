import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No Stripe signature found" },
      { status: 400 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      await handleCheckoutSessionCompleted(session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session) {
  const userId = session.client_reference_id;
  const subscriptionId = session.subscription;

  if (!userId || !subscriptionId) {
    console.error("Missing user ID or subscription ID in session");
    return;
  }

  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error(`User with ID ${userId} not found`);
      return;
    }

    const subscriptionData = await stripe.subscriptions.retrieve(
      subscriptionId
    );

    await updateDoc(userRef, {
      isSubscribed: true,
      subscriptionStatus: subscriptionData.status,
      subscriptionId: subscriptionId,
      subscriptionPlan: subscriptionData.items.data[0].price.nickname,
      trialStart: new Date(subscriptionData.trial_start * 1000),
      trialEnd: new Date(subscriptionData.trial_end * 1000),
      subscriptionCurrentPeriodEnd: new Date(
        subscriptionData.current_period_end * 1000
      ),
    });
  } catch (error) {
    console.error("Error updating user subscription info:", error);
  }
}
