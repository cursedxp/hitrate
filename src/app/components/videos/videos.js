import React, { useState, useEffect } from "react";
import { Image } from "next/image";
import { Formatter } from "../utils/formatters";

export default function Videos({
  initialRegionCode,
  initialCategory,
  initialLanguage,
}) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [regionCode, setRegionCode] = useState(initialRegionCode || "");
  const [category, setCategory] = useState(initialCategory || "");
  const [language, setLanguage] = useState(initialLanguage || "");

  const fetchVideos = async (pageToken = null) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        maxResults: "20",
        regionCode,
        videoCategoryId: category,
        hl: language,
      });
      if (pageToken) params.append("pageToken", pageToken);

      // Change this line to match your API route
      const response = await fetch(`/api/youTube?${params}`);
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data = await response.json();

      setVideos((prevVideos) =>
        pageToken ? [...prevVideos, ...data.items] : data.items
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [regionCode, category, language]);

  if (error) return <div>Error: {error}</div>;

  const formatter = Formatter();

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        {videos.map((video) => (
          <div key={video.id} className="flex flex-col dark:text-white ">
            <div className="relative pb-[56.25%]">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                {video.snippet.duration}
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.channelTitle}
                className="rounded-full w-9 h-9"
              />
              <div className="flex flex-col">
                <div className="text-sm font-semibold line-clamp-2 mb-1">
                  {video.snippet.title}
                </div>
                <p className="text-xs text-gray-400">
                  {video.snippet.channelTitle}
                </p>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <span>
                    {formatter.formatViewCount(video.statistics.viewCount)}{" "}
                    views
                  </span>
                  <span className="mx-1">•</span>
                  <span>
                    {formatter.formatPublishedAt(video.snippet.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center w-full h-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
