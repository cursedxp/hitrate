"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
const faq = [
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
];

export default function FAQ() {
  return (
    <section className="flex flex-col items-center w-full max-w-3xl justify-center pb-32">
      <h2 className="text-6xl font-bold text-black text-center mb-6">
        Quick answers for you.
      </h2>
      <p className="text-xl text-gray-500 text-center mb-12">
        We know you are in a hurry, so we have prepared some quick answers for
        you.
      </p>
      <div className="space-y-6 w-full">
        {faq.map((item, index) => (
          <FAQItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ item, index }) {
  const [openFAQ, setOpenFAQ] = useState(null);
  return (
    <motion.div
      key={index}
      initial={false}
      className="border border-gray-200 rounded-lg overflow-hidden"
    >
      <motion.button
        className="flex justify-between items-center w-full text-left p-6"
        onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
      >
        <h3 className="text-xl font-semibold">{item.question}</h3>
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
            <p className="text-gray-600 p-6 pt-0">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
