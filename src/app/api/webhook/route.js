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
    case "customer.subscription.updated":
    case "customer.subscription.created":
      const subscription = event.data.object;
      await handleSubscriptionUpdate(subscription);
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
      subscriptionCurrentPeriodEnd: new Date(
        subscriptionData.current_period_end * 1000
      ),
    });
  } catch (error) {
    console.error("Error updating user subscription info:", error);
  }
}

async function handleSubscriptionUpdate(subscription) {
  const userId = subscription.metadata.userId;

  if (!userId) {
    console.error("Missing user ID in subscription metadata");
    return;
  }

  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error(`User with ID ${userId} not found`);
      return;
    }

    const isSubscribed =
      subscription.status === "active" || subscription.status === "trialing";

    await updateDoc(userRef, {
      isSubscribed: isSubscribed,
      subscriptionStatus: subscription.status,
      subscriptionId: subscription.id,
      subscriptionPlan: subscription.items.data[0].price.nickname,
      subscriptionCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000
      ),
      trialEnd: subscription.trial_end
        ? new Date(subscription.trial_end * 1000)
        : null,
    });

    console.log(
      `Updated subscription for user ${userId}. Status: ${subscription.status}, Is Subscribed: ${isSubscribed}`
    );
  } catch (error) {
    console.error("Error updating user subscription info:", error);
  }
}
