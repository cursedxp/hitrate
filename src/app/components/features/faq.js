"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "@/app/components/features/sectionTitle";
const faq = [
  {
    question: "What is HitMagnet?",
    answer:
      "HitMagnet is a powerful tool that helps YouTube creators optimize their thumbnails by comparing them with successful competitors, generating AI-powered titles, and organizing thumbnails in collections. With features like thumbnail shuffling, dark mode previews, and a Chrome extension for easy downloading, HitMagnet provides everything you need to create more engaging YouTube content.",
  },
  {
    question: "How will this help me make better thumbnails?",
    answer:
      "HitMagnet helps you improve thumbnails by comparing with successful competitors, previewing in different layouts, generating AI titles, organizing collections, and easily downloading with our Chrome extension.",
  },
  {
    question: "How does the pricing work?",
    answer:
      "We offer a Premium Plan at $10/month or $100/year. The yearly plan saves you $20 compared to monthly billing. Premium includes unlimited projects, collections, competitor comparisons, thumbnail shuffling, dark mode previews, and AI title generation.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
  },
];

export default function FAQ() {
  return (
    <section className="flex flex-col items-center w-full max-w-3xl justify-center pb-16 md:pb-32 px-4 md:px-4">
      <SectionTitle
        title="Quick answers for you."
        description="We know you are in a hurry, so we have prepared some quick answers for you."
      />
      <div className="space-y-4 md:space-y-6 w-full">
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
        className="flex justify-between items-center w-full text-left p-4 md:p-6"
        onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
      >
        <h3 className="text-lg md:text-xl font-semibold">{item.question}</h3>
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
