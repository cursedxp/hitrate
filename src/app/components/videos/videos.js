import React, { useState, useEffect } from "react";
import { Image } from "next/image";

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

  const loadMore = () => {
    if (nextPageToken) fetchVideos(nextPageToken);
  };

  if (error) return <div>Error: {error}</div>;

  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    } else {
      return count.toString();
    }
  };

  const formatPublishedAt = (publishedAt) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInSeconds = Math.floor((now - published) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

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
                    {formatViewCount(video.statistics.viewCount)} views
                  </span>
                  <span className="mx-1">•</span>
                  <span>{formatPublishedAt(video.snippet.publishedAt)}</span>
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
