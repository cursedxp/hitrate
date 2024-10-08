"use client";
import SideBar from "@/app/components/sideBar/sideBar";
import HomePreview from "@/app/components/previews/homePreview/homePreview";
import PreviewBar from "@/app/components/previewBar/previewBar";
import SearchPreview from "@/app/components/previews/searchPreview/searchPreview";
import SideBarPreview from "@/app/components/previews/sideBarPreview/sideBarPreview";
import { useSelector, useDispatch } from "react-redux";
import { setPreviews } from "@/app/redux/slices/app.slice";
import { useState, useEffect } from "react";
import Chips from "../components/chips/chips";
import youtubeServices from "@/app/services/youtubeServices";

export default function StudioPage() {
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
      const params = pageToken ? { pageToken } : {};
      const data = await youtubeServices.getTrendingVideos(params);

      if (data && data.items) {
        dispatch(
          setPreviews(pageToken ? [...previews, ...data.items] : data.items)
        );
        setPageToken(data.nextPageToken || null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error details:", err);
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
        <div className="flex justify-between items-center w-full">
          <Chips />
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
          {currentPreview === 2 && <SideBarPreview />}
        </div>
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
