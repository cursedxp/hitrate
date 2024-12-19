"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const TIMEOUT_MS = 5000;
const MAX_RETRIES = 2;

const sendMessageWithRetry = async (extensionId, message, retryCount = 0) => {
  try {
    const response = await Promise.race([
      new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(extensionId, message, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      }),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Extension communication timeout")),
          TIMEOUT_MS
        )
      ),
    ]);
    return response;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(
        `Retrying extension communication (${retryCount + 1}/${MAX_RETRIES})...`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s before retry
      return sendMessageWithRetry(extensionId, message, retryCount + 1);
    }
    throw error;
  }
};

export default function ExtensionSignin() {
  const { data: session } = useSession();
  const [authStatus, setAuthStatus] = useState(() => ({
    success: sessionStorage.getItem("extensionAuthenticated") === "true",
    error: null,
    loading: false,
  }));
  const hasNotified = useRef(
    sessionStorage.getItem("extensionAuthenticated") === "true"
  );

  async function notifyExtension(userInfo) {
    if (hasNotified.current || authStatus.success) return;

    const EXTENSION_ID = process.env.NEXT_PUBLIC_EXTENSION_ID;
    if (!EXTENSION_ID) {
      console.error("Extension ID not found in environment variables");
      setAuthStatus({
        success: false,
        error: "Extension ID not configured",
        loading: false,
      });
      return;
    }

    setAuthStatus((prev) => ({ ...prev, loading: true }));

    try {
      const response = await sendMessageWithRetry(EXTENSION_ID, {
        type: "websiteAuth",
        userInfo: {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          image: userInfo.image,
          subscriptionStatus: userInfo.subscriptionStatus || "inactive",
        },
      });

      hasNotified.current = true;
      sessionStorage.setItem("extensionAuthenticated", "true");
      if (response?.success) {
        console.log("Extension authentication successful");
        setAuthStatus({ success: true, error: null, loading: false });
      } else {
        throw new Error(response?.error || "Extension authentication failed");
      }
    } catch (error) {
      console.error("Extension communication error:", error);
      hasNotified.current = false;
      sessionStorage.removeItem("extensionAuthenticated");
      setAuthStatus({
        success: false,
        error:
          "Unable to connect to extension. Please ensure the extension is installed and refresh the page.",
        loading: false,
      });
    }
  }

  useEffect(() => {
    if (session?.user && !authStatus.success && !hasNotified.current) {
      notifyExtension(session.user);
    }
  }, [session, authStatus.success]);

  const handleSignIn = async () => {
    if (session) {
      notifyExtension(session.user);
    } else {
      await signIn("google", { callbackUrl: window.location.pathname });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Loading Overlay */}
      {authStatus.loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col items-center space-y-4"
          >
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 dark:text-gray-300">
              Authenticating with extension...
            </p>
          </motion.div>
        </div>
      )}

      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <Image
            src="/images/logo.svg"
            alt="HitMagnet"
            width={200}
            height={40}
            priority
            className="mb-8"
          />
          {!authStatus.success ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Chrome Extension Sign In
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Sign in to your HitMagnet account to use the Chrome extension
                  and access all your collections.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center w-full"
              >
                <button
                  onClick={handleSignIn}
                  className="bg-blue-500 text-white px-8 py-4 rounded-2xl text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full max-w-xs"
                >
                  Sign in with Google
                </button>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a href="/" className="text-blue-500 hover:underline">
                    Create one for free
                  </a>
                </p>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Successfully Signed In!
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  You can now start using the HitMagnet Chrome extension.
                </p>
                <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Next Steps:
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Open YouTube in your browser</li>
                    <li>Start creating collections</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
