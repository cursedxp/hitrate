"use client";

import SectionTitle from "@/app/components/features/sectionTitle";
import PriceSwitch from "@/app/components/priceSwitch/priceSwitch";
import PriceCard from "@/app/components/priceCard/priceCard";
import { useState } from "react";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <>
      <SectionTitle
        title="Compare your thumbnails with competitors."
        description="Compare thumbnails with successful channels to improve your strategy and get more views."
      />
      <PriceSwitch isYearly={isYearly} setIsYearly={setIsYearly} />
      <PriceCard isYearly={isYearly} />
    </>
  );
}
