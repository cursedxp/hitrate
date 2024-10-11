"use client";
import Header from "./components/header/header";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-white w-full h-screen">
        <div className="flex flex-col h-full w-full max-w-7xl bg-white">
          <div className="flex flex-col justify-center items-center  text-center text-zinc-900 min-h-min p-40">
            <h1 className="text-9xl font-bold mb-4">
              <span className="">Craft stunning </span>
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {["t", "h", "u", "m", "b", "n", "a", "i", "l", "s"].map(
                  (letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {letter}
                    </motion.span>
                  )
                )}
              </motion.span>
            </h1>
            <p className="text-2xl px-20 text-zinc-500 mb-8 leading-relaxed">
              Elevate your content's appeal with HitMagnet. Our tool analyzes
              trends to help you create eye-catching visuals that drive clicks
              and views.
            </p>
            <div className="flex items-center justify-center">
              <button className="bg-blue-500 text-xl  text-white px-8 py-4 rounded-2xl  hover:shadow-2xl transition-shadow duration-300 hover:scale-105 ">
                Launch App
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
