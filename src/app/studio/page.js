"use client";
import SideBar from "@/app/components/sideBar/sideBar";
import HomePreview from "@/app/components/previews/homePreview/homePreview";
import PreviewBar from "@/app/components/previewBar/previewBar";
import SearchPreview from "@/app/components/previews/searchPreview/searchPreview";
import SideBarPreview from "@/app/components/previews/sideBarPreview/sideBarPreview";
import { useSelector, useDispatch } from "react-redux";
import { setSearchList } from "@/app/redux/slices/app.slice";
import { useState, useEffect } from "react";
import Chips from "../components/chips/chips";

//TODO: Make this page SSR later
export default function StudioPage() {
  const dispatch = useDispatch();
  const currentPreview = useSelector((state) => state.app.currentPreview);
  const searchList = useSelector((state) => state.app.searchList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/youTube?endpoint=trending`);
      const data = await response.json();
      if (data) {
        dispatch(setSearchList({ query: "trending", results: data }));
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
    const trendingSearch = searchList.find((item) => item.query === "trending");
    if (!trendingSearch || trendingSearch.results.length === 0) {
      fetchVideos();
    }
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
          {currentPreview === 0 && <HomePreview />}
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
