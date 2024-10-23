"use client";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  setProjectName,
  setSearchList,
  setSelectedSearchItem,
  setAllPreviews,
  setChannelAvatars,
  setCurrentProjectId,
} from "@/app/redux/slices/app.slice";
import SideBar from "@/app/components/sideBar/sideBar";
import HomePreview from "@/app/components/previews/homePreview/homePreview";
import PreviewBar from "@/app/components/previewBar/previewBar";
import SearchPreview from "@/app/components/previews/searchPreview/searchPreview";
import SideBarPreview from "@/app/components/previews/sideBarPreview/sideBarPreview";
import Chips from "@/app/components/chips/chips";
import { setThumbnailPreviews } from "@/app/redux/slices/thumbnail.slice";
import { setSelectedTitle, setTitles } from "@/app/redux/slices/title.slice";
import { uuidv7 } from "uuidv7";
import { setPreviews } from "@/app/redux/slices/app.slice";
import { useSelector as thumbnailSelector } from "@/app/redux/slices/thumbnail.slice";

export default function EditorPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const currentPreview = useSelector((state) => state.app.currentPreview);
  const selectedSearchItem = useSelector(
    (state) => state.app.selectedSearchItem
  );
  const searchList = useSelector((state) => state.app.searchList);
  const previews = useSelector((state) => state.app.previews);
  const channelAvatars = useSelector((state) => state.app.channelAvatars);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedTitle = useSelector((state) => state.title.selectedTitle);
  const thumbnailPreviews = useSelector(
    (state) => state.thumbnail.thumbnailPreviews
  );
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) {
        setError("No project ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();
        console.log("Fetched project data:", data);
        dispatch(setCurrentProjectId(projectId));
        dispatch(setProjectName(data.project.name));
        dispatch(setThumbnailPreviews(data.project.thumbnailUrls || []));
        dispatch(setTitles(data.project.titles || [""]));
        dispatch(setSelectedTitle(data.project.title || "Untitled"));
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchProjectData();
    }
  }, [projectId, status, dispatch]);

  useEffect(() => {
    const preparePreviews = () => {
      if (!thumbnailPreviews || thumbnailPreviews.length === 0) return;

      const newPreviews = thumbnailPreviews.map((thumbnail) => ({
        id: uuidv7(),
        snippet: {
          title: selectedTitle,
          thumbnails: { medium: { url: thumbnail } },
        },
        channelTitle: "",
        publishedAt: new Date().toISOString(),
        description: "This is a generated thumbnail description",
        statistics: {
          viewCount: 100.0,
        },
      }));
      dispatch(setPreviews(newPreviews));
    };

    preparePreviews();
  }, [thumbnailPreviews, selectedTitle, dispatch]);

  useEffect(() => {
    const fetchVideos = async () => {
      if (searchList.length === 0) {
        try {
          const response = await fetch(`/api/youTube?endpoint=trending`);
          const data = await response.json();
          if (data) {
            dispatch(setSearchList({ query: "trending", results: data }));
            dispatch(setSelectedSearchItem("trending"));
          } else {
            throw new Error("Invalid response format");
          }
        } catch (err) {
          console.error("Error fetching trending videos:", err);
          setError(err.message);
        }
      }
    };

    fetchVideos();
  }, [dispatch, searchList]);

  useEffect(() => {
    const searchResults = searchList.find(
      (item) => item.query === selectedSearchItem
    );
    if (searchResults) {
      dispatch(setAllPreviews([...previews, ...searchResults.results]));
    } else {
      dispatch(setAllPreviews(previews));
    }
  }, [selectedSearchItem, searchList, previews, dispatch]);

  useEffect(() => {
    const fetchChannelAvatars = async () => {
      const channelIds = [
        ...new Set(previews.map((video) => video.snippet.channelId)),
      ];
      const missingChannelIds = channelIds.filter((id) => !channelAvatars[id]);

      if (missingChannelIds.length === 0) return;

      try {
        const response = await fetch(
          `/api/youTube?endpoint=channelAvatars&channelIds=${missingChannelIds.join(
            ","
          )}`
        );
        if (!response.ok) throw new Error("Failed to fetch channel avatars");
        const data = await response.json();
        dispatch(setChannelAvatars(data));
      } catch (error) {
        console.error("Error fetching channel avatars:", error);
      }
    };

    fetchChannelAvatars();
  }, [previews, channelAvatars, dispatch]);

  useEffect(() => {
    const fetchProjectThumbnails = async () => {
      if (projectId) {
        try {
          const response = await fetch(`/api/projects/${projectId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch project data");
          }
          const data = await response.json();
          if (data.project && data.project.thumbnailUrls) {
            dispatch(setThumbnailPreviews(data.project.thumbnailUrls));
          }
        } catch (error) {
          console.error("Error fetching project thumbnails:", error);
        }
      }
    };

    fetchProjectThumbnails();
  }, [projectId, dispatch]);

  if (status === "loading" || loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative p-4 flex w-full h-screen overflow-scroll">
      <SideBar />
      <div className="flex w-full flex-col gap-4 pb-4 px-4 overflow-scroll">
        <div className="flex justify-between items-center w-full">
          <Chips />
          <PreviewBar />
        </div>
        <div className="self-center max-w-screen-xl">
          {currentPreview === 0 && <HomePreview />}
          {currentPreview === 1 && <SearchPreview />}
          {currentPreview === 2 && <SideBarPreview />}
        </div>
      </div>
    </div>
  );
}
