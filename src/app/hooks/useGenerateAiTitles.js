import { useState } from "react";

export default function useGenerateAiTitles() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAiTitles = async (titles) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titles }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate titles");
      }

      const data = await response.json();
      let generatedTitles = data.titles;

      if (typeof generatedTitles === "string") {
        generatedTitles = generatedTitles
          .split("\n")
          .filter((title) => title.trim() !== "");
      }
      generatedTitles = generatedTitles.map((title) => {
        return title
          .replace(/^\d+\.\s*/, "")
          .replace(/^["']|["']$/g, "")
          .trim();
      });
      return generatedTitles;
    } catch (error) {
      console.error("Error generating titles:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, generateAiTitles };
}
