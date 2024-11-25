import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function useSubscribe({ monthlyPriceId, yearlyPriceId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (status === "authenticated" && plan) {
      handleSubscribe(plan === "yearly");
    }
  }, [status, searchParams]);

  const handleSubscribe = async (isYearly) => {
    try {
      setIsLoading(true);

      if (!session) {
        await signIn("google", {
          callbackUrl: `${window.location.href}?plan=${
            isYearly ? "yearly" : "monthly"
          }`,
        });
        return;
      }

      const priceId = isYearly ? yearlyPriceId : monthlyPriceId;

      if (!priceId) {
        throw new Error("Price ID is not defined");
      }

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubscribe, isLoading };
}
