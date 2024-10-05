import React, { useState, useEffect } from "react";
import Video from "./video";
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

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        {videos.map((video) => (
          <Video key={video.id} video={video} />
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
