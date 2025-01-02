"use client";

import SectionTitle from "@/app/components/features/sectionTitle";
import PriceSwitch from "@/app/components/priceSwitch/priceSwitch";
import PriceCard from "@/app/components/priceCard/priceCard";
import { useState } from "react";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <section
      id="pricing"
      className="flex flex-col gap-2 items-center w-full max-w-7xl justify-center mb-16 md:mb-32 px-4 md:px-0"
    >
      <SectionTitle
        title="Compare your thumbnails with competitors."
        description="Compare thumbnails with successful channels to improve your strategy and get more views."
      />
      <PriceSwitch isYearly={isYearly} setIsYearly={setIsYearly} />
      <PriceCard isYearly={isYearly} />
    </section>
  );
}
