"use client";
import { motion } from "framer-motion";
export default function PriceSwitch({ isYearly, setIsYearly }) {
  return (
    <div className="flex justify-center items-center mb-2">
      <div className="flex items-center space-x-4 bg-gray-100 rounded-xl p-1">
        <motion.button
          className={`px-10 py-2 rounded-xl ${
            !isYearly ? "bg-white text-blue-600 shadow-md" : "text-gray-500"
          } transition-all duration-300`}
          onClick={() => setIsYearly(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Monthly
        </motion.button>
        <motion.button
          className={`px-10 py-2 rounded-xl ${
            isYearly ? "bg-white text-blue-600 shadow-md" : "text-gray-500"
          } transition-all duration-300`}
          onClick={() => setIsYearly(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Yearly
        </motion.button>
      </div>
    </div>
  );
}
