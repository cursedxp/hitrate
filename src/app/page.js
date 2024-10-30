"use client";
import Header from "./components/header/header";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import FAQ from "./components/features/faq";
import Pricing from "./components/features/pricing";
import SearchResults from "./components/features/searchResults";
import SectionTitle from "./components/features/sectionTitle";
import ShuffleThumbnails from "./components/features/shuffleThumbnails";
export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-white w-full h-screen">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center mb-32">
          <div
            className="absolute h-[700px] inset-0 opacity-50"
            style={{
              backgroundImage: `
            linear-gradient(to right, #e0e0e0 1px, transparent 1px),
            linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)
          `,
              backgroundSize: "100px 100px",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-white z-50"></div>
          </div>
          <div className="flex flex-col h-full w-full max-w-7xl z-10">
            <div className="flex flex-col justify-center items-center text-center text-zinc-900 min-h-min p-40">
              <h1 className="text-9xl font-bold mb-4">
                <span className="">Preview your </span>
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {["c", "o", "n", "t", "e", "n", "t"].map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
              </h1>
              <p className="text-2xl text-zinc-500 text-center mb-8 leading-relaxed">
                See how your YouTube content appears across different views
                before publishing. Test thumbnails and titles to maximize
                engagement and click-through rates.
              </p>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 text-xl text-white px-8 py-4 rounded-2xl hover:shadow-2xl transition-shadow duration-300 hover:scale-105"
                  onClick={() => {
                    router.push("/studio");
                  }}
                >
                  Launch App
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="flex flex-col gap-2 items-center w-full max-w-7xl justify-center mb-32">
          <h2 className="text-6xl text-black text-center mb-6">
            Quickly preview thumbnails and titles.
          </h2>
          <p className="text-2xl text-zinc-500 text-center mb-8 leading-relaxed px-20">
            Preview your thumbnails and titles across multiple YouTube formats -
            home feed, search results, and suggested videos. See your content
            through your viewers' eyes.
          </p>
          <div className="flex items-center gap-8 justify-center">
            <div className="flex flex-col w-[40%] self-start mt-10">
              <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
                PREVIEW
              </div>
              <div className="text-4xl font-bold text-black mb-4">
                Stand out from your competition
              </div>
              <p className="text-xl text-zinc-500 mb-8 leading-relaxed">
                See how your thumbnails and titles compare against your
                competition. Analyze what works in your niche and get
                inspiration from successful creators. Make data-driven decisions
                to improve your content's performance.
              </p>
            </div>
            <div className="relative w-[60%] h-[600px] shadow-lg rounded-3xl bg-white">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/previews.png"
                  alt="Preview"
                  fill
                  quality={100}
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="flex flex-col gap-2 items-center w-full max-w-7xl justify-center mb-32">
          <SectionTitle
            title="Powerful features to enhance your workflow"
            description="Take advantage of our advanced features designed to make your content creation process smoother and more efficient."
          />
          <SearchResults />
          <ShuffleThumbnails />
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
                          src="/images/preview-1.jpg"
                          alt="Video thumbnail"
                          fill
                          quality={100}
                          loading="lazy"
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="font-medium text-gray-900">
                          {/* Current title display */}
                          <h3 className="text-lg" id="currentTitle">
                            Select a suggested title below
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500">Your Channel</p>
                        <p className="text-sm text-gray-500">
                          0 views • Just now
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          document.getElementById("currentTitle").textContent =
                            "Epic Gaming Moments That Break The Internet!";
                        }}
                        className="w-full h-12 bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 flex items-center transition-colors duration-200"
                      >
                        <span className="text-sm text-emerald-700">
                          🎯 "Epic Gaming Moments That Break The Internet!"
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          document.getElementById("currentTitle").textContent =
                            "You Won't Believe What Happened In This Game!";
                        }}
                        className="w-full h-12 bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 flex items-center transition-colors duration-200"
                      >
                        <span className="text-sm text-emerald-700">
                          ✨ "You Won't Believe What Happened In This Game!"
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          document.getElementById("currentTitle").textContent =
                            "This Gaming Strategy Changes Everything!";
                        }}
                        className="w-full h-12 bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 flex items-center transition-colors duration-200"
                      >
                        <span className="text-sm text-emerald-700">
                          🔥 "This Gaming Strategy Changes Everything!"
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
                Let our AI help you create engaging titles that grab attention.
                Get smart suggestions based on your content and niche, optimized
                for maximum viewer engagement and click-through rates. Click any
                suggestion to preview how it looks.
              </p>
            </div>
          </div>
        </section>

        <Pricing />

        <FAQ />
      </div>
    </>
  );
}
