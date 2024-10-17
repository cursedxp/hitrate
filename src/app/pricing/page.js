"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "framer-motion";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const monthlyPriceId = "price_1QAq2SPryQLXqSIpN2rPAPy8";
  const yearlyPriceId = "price_1QAs5yPryQLXqSIpb2G8hjIL";
  const handleSubscribe = async () => {
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

  const faqData = [
    {
      question: "What is HitMagnet?",
      answer:
        "HitMagnet is a tool that helps you create eye-catching thumbnails for your content by analyzing trends and providing insights to improve your visuals.",
    },
    {
      question: "How will this help me make better thumbnails?",
      answer:
        "HitMagnet will help you make better thumbnails by allowing you to compare your thumbnails with those of other channels, giving you inspiration and ideas to improve your visuals.",
    },
    {
      question: "How does the pricing work?",
      answer:
        "We offer a Premium Plan with both monthly and yearly subscription options. The yearly plan offers savings compared to the monthly plan.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "We currently offer 15 days of free trial, but also have a money-back guarantee if you're not satisfied with our service within the first 15 days.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-20">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-6 max-w-3xl">
          Try any plan for 14 days, completely free.
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
        className="bg-white rounded-2xl border-2 border-blue-500 shadow-sm p-10 max-w-sm w-full mt-10 mb-20 relative"
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
            <svg
              className="h-5 w-5 text-green-500 mr-3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            Unlimited thumbnails
          </li>
          <li className="flex items-center">
            <svg
              className="h-5 w-5 text-green-500 mr-3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            Advanced analytics
          </li>
          <li className="flex items-center">
            <svg
              className="h-5 w-5 text-green-500 mr-3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            Priority support
          </li>
        </ul>
        <motion.button
          onClick={handleSubscribe}
          className="w-full bg-blue-600 text-white rounded-2xl py-4 font-semibold hover:bg-blue-700 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Subscribe Now
        </motion.button>
      </motion.div>

      <div className="max-w-3xl w-full mt-5">
        <h2 className="text-6xl font-bold text-center mb-6">
          Quick answers for you.
        </h2>
        <p className="text-xl text-gray-500 text-center mb-12">
          We know you are in a hurry, so we have prepared some quick answers for
          you.
        </p>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={false}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <motion.button
                className="flex justify-between items-center w-full text-left p-6"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <motion.svg
                  animate={{ rotate: openFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </motion.button>
              <AnimatePresence initial={false}>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-600 p-6 pt-0">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
