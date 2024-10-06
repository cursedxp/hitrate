"use client";

import SideBar from "./components/sideBar/sideBar";
import HomePreview from "./components/previews/homePreview/homePreview";
import PreviewBar from "./components/previewBar/previewBar";
import SearchPreview from "./components/previews/searchPreview/searchPreview";
import { useSelector, useDispatch } from "react-redux";
import { setPreviews } from "./redux/slices/app.slice";
import { useState, useEffect } from "react";
export default function Home() {
  const dispatch = useDispatch();
  const currentPreview = useSelector((state) => state.app.currentPreview);
  const previews = useSelector((state) => state.app.previews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pageToken, setPageToken] = useState(null);
  const fetchVideos = async (pageToken = null) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        maxResults: "20",
        videoCategoryId: "",
        hl: "de",
        regionCode: "DE",
      });
      if (pageToken) params.append("pageToken", pageToken);

      const response = await fetch(`/api/youTube?${params}`);
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data = await response.json();

      dispatch(
        setPreviews(pageToken ? [...previews, ...data.items] : data.items)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative p-4 flex w-full">
      <SideBar />
      <div className="flex w-full flex-col gap-4 pb-4 px-4">
        <div className="flex justify-end w-full ">
          <PreviewBar />
        </div>

        <div className="self-center max-w-screen-xl">
          {currentPreview === 0 && (
            <HomePreview
            // initialRegionCode="DE"
            // initialCategory=""
            // initialLanguage="de"
            />
          )}
          {currentPreview === 1 && <SearchPreview />}
        </div>
        {loading && (
          <div className="flex justify-center items-center w-full h-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
