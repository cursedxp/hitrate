import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const useSubscribe = ({ monthlyPriceId, yearlyPriceId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (isYearly) => {
    try {
      setIsLoading(true);
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

      // Redirect to Stripe checkout
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    } catch (error) {
      console.error("Subscription error:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubscribe, isLoading };
};

export default useSubscribe;
