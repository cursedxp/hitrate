"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import FAQ from "@/app/components/features/faq";
import { Check } from "react-feather";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Reusable animated button component
const AnimatedButton = ({ onClick, className, children }) => (
  <motion.button
    onClick={onClick}
    className={className}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const { data: session, status } = useSession();

  const monthlyPriceId = "price_1QAq2SPryQLXqSIpN2rPAPy8";
  const yearlyPriceId = "price_1QAs5yPryQLXqSIpb2G8hjIL";

  const handleSubscribe = async () => {
    if (status === "loading") return; // Wait for the session to load

    if (!session) {
      // Redirect to NextAuth sign-in
      signIn("google");
      return;
    }

    try {
      const stripe = await stripePromise;
      const priceId = isYearly ? yearlyPriceId : monthlyPriceId;

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { sessionId } = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error in handleSubscribe:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-20">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-6 max-w-3xl">
          Start creating amazing thumbnails today.
        </h1>
        <p className="text-xl text-gray-500">
          One plan for all your needs and start creating amazing thumbnails
          today.
        </p>
      </div>

      <div className="flex justify-center items-center mb-2">
        <div className="flex items-center space-x-4 bg-gray-100 rounded-xl p-1">
          <motion.button
            className={`px-10 py-2 rounded-xl ${
              !isYearly ? "bg-white text-blue-600 shadow-md" : "text-gray-500"
            } transition-all duration-300`}
            onClick={() => setIsYearly(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Monthly
          </motion.button>
          <motion.button
            className={`px-10 py-2 rounded-xl ${
              isYearly ? "bg-white text-blue-600 shadow-md" : "text-gray-500"
            } transition-all duration-300`}
            onClick={() => setIsYearly(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Yearly
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl  shadow-md p-10 max-w-sm w-full mt-10 mb-20 relative"
      >
        {isYearly && (
          <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-tr-2xl rounded-bl-2xl text-sm font-semibold">
            Most Popular
          </div>
        )}
        <h2 className="text-3xl text-left mb-4">HitMagnet Pro</h2>
        <p className="text-md text-gray-500 text-left mb-6">
          Unlock the full potential of HitMagnet and create eye-catching
          thumbnails that drive clicks and views.
        </p>
        <div className="text-left h-24 flex flex-col  ">
          <AnimatePresence mode="wait">
            <motion.span
              key={isYearly ? "yearly" : "monthly"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="text-4xl flex items-center"
            >
              {isYearly ? "100$ " : "10$ "}
              <span className="text-gray-600 text-sm ml-2">
                /{isYearly ? " Year" : " Month"}
              </span>
            </motion.span>
          </AnimatePresence>

          <AnimatePresence>
            {isYearly && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-green-500 mt-1"
              >
                Save $20 per year
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <ul className="mb-10 space-y-4">
          <li className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-3" />
            Unlimited thumbnails
          </li>
          <li className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-3" />
            Advanced analytics
          </li>
          <li className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-3" />
            Priority support
          </li>
        </ul>
        <motion.button
          onClick={handleSubscribe}
          className="w-full bg-blue-500 text-white rounded-2xl py-4 font-semibold hover:bg-blue-700 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Subscribe Now
        </motion.button>
      </motion.div>

      <FAQ />
    </div>
  );
}
