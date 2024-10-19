"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;

    const fetchSessionData = async () => {
      if (!session_id) {
        setLoading(false);
        setError(
          "No session ID provided. Please ensure you're using a valid payment link."
        );
        return;
      }

      try {
        const res = await fetch(`/api/stripe?session_id=${session_id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (!data.session) {
          throw new Error("Session data not found in response");
        }
        setSession(data.session);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching session:", error);
        setError(
          "Failed to fetch session data. Please try again later or contact support."
        );
        setLoading(false);
      }
    };

    fetchSessionData();
    effectRan.current = true;
  }, [session_id]);

  useEffect(() => {
    if (session && !loading && !error) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  }, [session, loading, error]);

  const LoadingSpinner = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
    ></motion.div>
  );

  const ErrorMessage = ({ message }) => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8 text-red-500"
    >
      <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
      <p>{message}</p>
      <Link
        href="/"
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        Return to Home
      </Link>
    </motion.div>
  );

  const SuccessContent = ({ session }) => (
    <div>
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-24 h-24 relative mb-6 mx-auto"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50 3, 93.3 25, 93.3 75, 50 97, 6.7 75, 6.7 25"
            fill="#4ade80"
          />
          <path
            d="M30 50 L45 65 L70 40"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <h1 className="text-3xl mb-4 text-center">Payment Successful!</h1>
      <p className="text-lg text-center text-gray-500 mb-8">
        Thank you for your purchase. Your order details are below
      </p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full"
      >
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col">
            <p className="text-sm text-black font-bold">PAYMENT DETAILS</p>
          </div>
          <div className="flex justify-between w-full text-sm">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">
              {session.id.slice(-6).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between w-full text-sm">
            <span className="text-gray-500">Status</span>
            <span className="font-medium capitalize">
              {session.payment_status}
            </span>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 w-full"
        >
          <Link
            href="/studio"
            className="block w-full bg-blue-500 text-white rounded-2xl py-4 font-semibold hover:bg-blue-600 transition duration-300 hover:scale-100 text-center"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingSpinner key="loading" />
        ) : error ? (
          <ErrorMessage message={error} key="error" />
        ) : session ? (
          <SuccessContent session={session} key="success" />
        ) : (
          <ErrorMessage
            message="Unable to retrieve session information. Please contact support."
            key="no-session"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
