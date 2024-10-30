import Image from "next/image";
import { useState } from "react";

export default function AiTitleGeneration() {
  const [currentTitle, setCurrentTitle] = useState(
    "7 Days Exploring An Underground City"
  );

  return (
    <div className="flex items-center gap-8 justify-center w-full mb-16">
      <div className="w-[60%]">
        <div
          className="grid-item relative rounded-2xl bg-white transition-all duration-300 flex flex-col items-center justify-center gap-4 p-6"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <div className="w-full max-w-2xl space-y-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-64 h-36 bg-gray-100 rounded-lg relative flex-shrink-0">
                  <Image
                    src="/images/preview-5.jpg"
                    alt="Video thumbnail"
                    fill
                    quality={100}
                    loading="lazy"
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="font-medium text-gray-900">
                    <h3 className="text-lg" id="currentTitle">
                      {currentTitle}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">Your Channel</p>
                  <p className="text-sm text-gray-500">0 views • Just now</p>
                </div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setCurrentTitle(
                      "Secret Underground City Explored For 7 Days Straight"
                    );
                  }}
                  className="w-full h-12 bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 flex items-center transition-colors duration-200"
                >
                  <span className="text-sm text-emerald-700">
                    🌟 "Secret Underground City Explored For 7 Days Straight"
                  </span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTitle(
                      "Living Underground For A Week Changed Everything"
                    );
                  }}
                  className="w-full h-12 bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 flex items-center transition-colors duration-200"
                >
                  <span className="text-sm text-emerald-700">
                    🔍 "Living Underground For A Week Changed Everything"
                  </span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTitle(
                      "What I Found After 7 Days In This Secret Underground City"
                    );
                  }}
                  className="w-full h-12 bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 flex items-center transition-colors duration-200"
                >
                  <span className="text-sm text-emerald-700">
                    💎 "What I Found After 7 Days In This Secret Underground
                    City"
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[40%] self-start">
        <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
          AUTO GENERATE
        </div>
        <div className="text-4xl font-bold text-black mb-4">
          AI-powered title generation
        </div>
        <p className="text-xl text-zinc-500 mb-8 leading-relaxed">
          Let our AI help you create engaging titles that grab attention. Get
          smart suggestions based on your content and niche, optimized for
          maximum viewer engagement and click-through rates. Click any
          suggestion to preview how it looks.
        </p>
      </div>
    </div>
  );
}
