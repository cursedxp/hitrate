"use client";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  setProjectName,
  setSearchList,
  setSelectedSearchItem,
  setAllPreviews,
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
import Loader from "@/app/components/loader/loader";
import useFetchSingleProject from "@/app/hooks/useFetchSingleProject";
import useFetchTrendings from "@/app/hooks/useFetchTrendings";

export default function EditorPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const currentPreview = useSelector((state) => state.app.currentPreview);
  const selectedSearchItem = useSelector(
    (state) => state.app.selectedSearchItem
  );
  const searchList = useSelector((state) => state.app.searchList);
  const previews = useSelector((state) => state.app.previews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedTitle = useSelector((state) => state.title.selectedTitle);
  const thumbnailPreviews = useSelector(
    (state) => state.thumbnail.thumbnailPreviews
  );
  const { fetchProject, loading: projectLoading } = useFetchSingleProject();
  const { fetchTrendings, loading: trendingLoading } = useFetchTrendings();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const currentProject = await fetchProject({ projectId });

        if (!currentProject) {
          throw new Error("Project not found");
        }

        dispatch(setCurrentProjectId(projectId));
        dispatch(setProjectName(currentProject.name));
        dispatch(setThumbnailPreviews(currentProject.thumbnailUrls || []));
        dispatch(setTitles(currentProject.titles || [""]));
        dispatch(setSelectedTitle(currentProject.title || "Untitled"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId, fetchProject]);

  useEffect(() => {
    const preparePreviews = () => {
      if (!thumbnailPreviews || thumbnailPreviews.length === 0) return;

      const newPreviews = thumbnailPreviews.map((thumbnail) => ({
        id: uuidv7(),
        snippet: {
          title: selectedTitle,
          thumbnails: { medium: { url: thumbnail } },
          publishedAt: new Date().toISOString(),
          description: "This is a generated thumbnail description",
        },
        channelTitle: "",
        publishedAt: new Date().toISOString(),

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
          const trendingData = await fetchTrendings();
          if (trendingData) {
            dispatch(
              setSearchList({ query: "trending", results: trendingData })
            );
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
  }, [dispatch, searchList, fetchTrendings]);

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

  if (projectLoading || trendingLoading || loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SideBar />
      <div className="flex-grow overflow-y-auto">
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            <Chips />
            <PreviewBar />
          </div>
          <div className="w-full max-w-[2000px] mx-auto">
            {currentPreview === 0 && <HomePreview />}
            {currentPreview === 1 && <SearchPreview />}
            {currentPreview === 2 && <SideBarPreview />}
          </div>
        </div>
      </div>
    </div>
  );
}
