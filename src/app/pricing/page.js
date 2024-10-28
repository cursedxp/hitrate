"use client";

import FAQ from "@/app/components/features/faq";
import Pricing from "@/app/components/features/pricing";

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-20">
      <Pricing />
      <FAQ />
    </div>
  );
}
