"use client";
import Header from "./components/header/header";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import FAQ from "./components/features/faq";

export default function Home() {
  const router = useRouter();
  const [items, setItems] = useState([
    "/images/preview-1.png",
    "/images/preview-2.png",
    "/images/preview-3.png",
    "/images/preview-4.png",
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setItems((items) => [...items].sort(() => Math.random() - 0.5));
    }, 2000); // Shuffle every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

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
          <h2 className="text-6xl text-black text-center mb-6">
            Powerful features to enhance your workflow
          </h2>
          <p className="text-2xl text-zinc-500 text-center mb-16 leading-relaxed px-20">
            Take advantage of our advanced features designed to make your
            content creation process smoother and more efficient.
          </p>

          {/* First Feature - Shuffle */}
          <div className="flex items-center gap-8 justify-center w-full mb-32">
            <div className="flex flex-col w-[40%] self-start">
              <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
                SHUFFLE
              </div>
              <div className="text-4xl font-bold text-black mb-4">
                Shuffle and experiment with layouts
              </div>
              <p className="text-xl text-zinc-500 mb-8 leading-relaxed">
                Use our shuffle feature to instantly rearrange your thumbnails
                and see how they work together. Test different combinations and
                positions to find the most engaging layout for your content.
              </p>
            </div>
            <div className="w-[60%]">
              <div
                className="grid-item relative rounded-2xl bg-white transition-all duration-300 flex flex-col items-center justify-center gap-4 p-6"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <div className="grid grid-cols-2 gap-6 w-full">
                  {items.map((item) => (
                    <motion.div
                      key={item}
                      layout
                      className="relative w-full rounded-lg overflow-hidden"
                      style={{ paddingTop: "56.25%" }} // This creates a 16:9 aspect ratio
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        bounce: 0.2,
                      }}
                    >
                      <Image
                        src={item}
                        alt="Preview"
                        fill
                        quality={100}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Second Feature - Search Results */}
          <div className="flex items-center gap-8 justify-center w-full">
            <div className="w-[60%]">
              <div
                className="grid-item relative rounded-2xl bg-white transition-all duration-300 flex flex-col items-center justify-center gap-4 p-6"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <div className="w-full max-w-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {["Gaming", "Technology", "Cooking"].map((chip) => (
                        <div
                          key={chip}
                          className="px-4 py-2 bg-white rounded-md shadow-md text-sm font-medium text-gray-700 whitespace-nowrap hover:bg-zinc-800 hover:text-white cursor-pointer"
                        >
                          {chip}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex gap-4 items-start">
                        <div className="w-40 h-24 bg-gray-100 rounded-lg relative flex-shrink-0">
                          <Image
                            src="/images/preview-1.png"
                            alt="Video thumbnail"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-medium text-gray-900 line-clamp-2">
                            Sample Video Title That Shows How Your Content
                            Appears in Search
                          </h3>
                          <p className="text-sm text-gray-500">Channel Name</p>
                          <p className="text-sm text-gray-500">
                            10K views • 2 days ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[40%] self-start">
              <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
                SEARCH
              </div>
              <div className="text-4xl font-bold text-black mb-4">
                Compare search results
              </div>
              <p className="text-xl text-zinc-500 mb-8 leading-relaxed">
                See how your content appears in YouTube search results. Compare
                your thumbnails and titles against competitors in your niche
                using topic-based filters to optimize your content's
                discoverability.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="flex flex-col gap-2 items-center w-full max-w-7xl justify-center mb-32">
          <h2 className="text-6xl text-black text-center mb-6">
            Start creating amazing thumbnails today.
          </h2>
          <p className="text-2xl text-zinc-500 text-center mb-16 leading-relaxed px-20">
            One plan for all your needs and start creating amazing thumbnails
            today.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md p-10 max-w-sm w-full relative"
          >
            <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-tr-2xl rounded-bl-2xl text-sm font-semibold">
              Most Popular
            </div>
            <h2 className="text-3xl text-left mb-4">HitMagnet Pro</h2>
            <p className="text-md text-gray-500 text-left mb-6">
              Unlock the full potential of HitMagnet and create eye-catching
              thumbnails that drive clicks and views.
            </p>
            <div className="text-left mb-6">
              <span className="text-4xl flex items-center">
                10$ <span className="text-gray-600 text-sm ml-2">/ Month</span>
              </span>
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
              onClick={() => router.push("/pricing")}
              className="w-full bg-blue-500 text-white rounded-2xl py-4 font-semibold hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </section>

        <FAQ />
      </div>
    </>
  );
}
