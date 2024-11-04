"use client";
import Header from "./components/header/header";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Previews from "./components/features/previews";
import FAQ from "./components/features/faq";
import Pricing from "./components/features/pricing";
import FeatureSets from "./components/features/featureSets";
import { useSession, signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

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
                  className="bg-clip-text text-transparent bg-gradient-to-r from-red-500  via-blue-500 to-purple-500"
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
                  onClick={async () => {
                    if (session) {
                      router.push("/studio");
                    } else {
                      await signIn("google", { callbackUrl: "/studio" });
                    }
                  }}
                >
                  Launch App
                </button>
              </div>
            </div>
          </div>
        </section>

        <Previews />

        <FeatureSets />

        <Pricing />

        <FAQ />

        {/* Footer Section */}
        <footer className="w-full bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-4">HitMagnet</h3>
                <p className="text-sm text-gray-600">
                  Preview your YouTube thumbnails and titles across multiple
                  formats to maximize engagement before publishing.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#features"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/privacy"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="mailto:contact@hitmagnet.com"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      contact@hitmagnet.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/hitmagnet"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                © {new Date().getFullYear()} HitMagnet. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
