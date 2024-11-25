import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function useSubscribe({ monthlyPriceId, yearlyPriceId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubscribe = async (isYearly) => {
    try {
      setIsLoading(true);

      if (!session) {
        localStorage.setItem("selectedPlan", isYearly ? "yearly" : "monthly");
        await signIn("google", {
          callbackUrl: window.location.href,
        });
        return;
      }

      const storedPlan = localStorage.getItem("selectedPlan");
      const finalPlanType = storedPlan || (isYearly ? "yearly" : "monthly");
      const priceId =
        finalPlanType === "yearly" ? yearlyPriceId : monthlyPriceId;

      localStorage.removeItem("selectedPlan");

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
