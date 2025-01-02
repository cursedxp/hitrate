import Image from "next/image";
import { useState } from "react";

export default function AiTitleGeneration() {
  const [currentTitle, setCurrentTitle] = useState(
    "The Most Beautiful Beaches to Explore"
  );

  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-4 md:gap-8 justify-center w-full mb-16 px-4 md:px-0">
      <div className="w-full md:w-[60%]">
        <div className="grid-item relative rounded-2xl bg-white transition-all duration-300 flex flex-col justify-center gap-4 p-4 md:p-6">
          <div className="w-full max-w-2xl space-y-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="w-full md:w-64 h-48 md:h-36 bg-gray-100 rounded-lg relative flex-shrink-0">
                  <Image
                    src="/images/preview-5.png"
                    alt="Video thumbnail"
                    fill
                    quality={100}
                    loading="lazy"
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="font-medium text-gray-900">
                    <h3 className="text-base md:text-lg" id="currentTitle">
                      {currentTitle}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500">
                    Your Channel
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    0 views • Just now
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setCurrentTitle("The World’s Most Stunning Beaches");
                  }}
                  className="w-full h-12 bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 flex items-center transition-colors duration-200"
                >
                  <span className="text-sm text-emerald-700">
                    🌟 "The World’s Most Stunning Beaches"
                  </span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTitle(" Exploring the Best Beaches on Earth");
                  }}
                  className="w-full h-12 bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 flex items-center transition-colors duration-200"
                >
                  <span className="text-sm text-emerald-700">
                    🔍 " Exploring the Best Beaches on Earth"
                  </span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTitle("Secret Beaches You’ve Never Heard Of");
                  }}
                  className="w-full h-12 bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 flex items-center transition-colors duration-200"
                >
                  <span className="text-sm text-emerald-700">
                    💎 "Secret Beaches You’ve Never Heard Of"
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-[40%] self-start mb-8 md:mb-0">
        <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
          AUTO GENERATE
        </div>
        <div className="text-3xl md:text-4xl font-bold text-black mb-4">
          AI-powered title generation
        </div>
        <p className="text-lg md:text-xl text-zinc-500 mb-8 leading-relaxed">
          Let our AI help you create engaging titles that grab attention. Get
          smart suggestions based on your content and niche, optimized for
          maximum viewer engagement and click-through rates. Click any
          suggestion to preview how it looks.
        </p>
      </div>
    </div>
  );
}
