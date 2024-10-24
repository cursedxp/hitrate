import React, { useState, useEffect } from "react";

const loadingMessages = [
  "🎥 Smashing that like button...",
  "🔔 Ringing the notification bell...",
  "🎬 Don't forget to subscribe!",
  "👍 Giving this video a thumbs up...",
  "💬 Responding to comments...",
  "🚀 To the moon with views!",
  "🔥 Making this content fire...",
  "🤯 Mind-blowing edits in progress...",
  "🎭 Perfecting our clickbait face...",
  "🏆 Chasing that YouTube algorithm...",
];

export default function Loader() {
  const [loadingMessage, setLoadingMessage] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessage((prev) => (prev + 1) % loadingMessages.length);
      setLoadingProgress((prev) => Math.min(prev + 10, 100));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-64 h-2 bg-gray-200 rounded-full mb-4">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>
      <div className="text-lg font-semibold text-gray-700 mb-2">
        Loading... {loadingProgress}%
      </div>
      <div className="text-sm text-gray-500 animate-bounce">
        {loadingMessages[loadingMessage]}
      </div>
    </div>
  );
}
