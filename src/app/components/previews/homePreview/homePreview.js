import { useEffect, useState } from "react";
import PreviewItem from "./previewItem";
import { useSelector, useDispatch } from "react-redux";
import { setAllPreviews } from "@/app/redux/slices/app.slice";

export default function HomePreview() {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.app.searchList);
  const previews = useSelector((state) => state.app.previews);
  const allPreviews = useSelector((state) => state.app.allPreviews);
  const selectedSearchItem = useSelector(
    (state) => state.app.selectedSearchItem
  );
  const [channelAvatars, setChannelAvatars] = useState({});

  // Combine previews and search results
  useEffect(() => {
    const searchResults = searchList.find(
      (item) => item.query === selectedSearchItem
    );
    if (searchResults) {
      dispatch(setAllPreviews([...previews, ...searchResults.results]));
    } else {
      dispatch(setAllPreviews(previews));
    }
  }, [selectedSearchItem, searchList, previews]);

  // Fetch channel avatars
  useEffect(() => {
    const fetchChannelAvatars = async () => {
      const channelIds = [
        ...new Set(allPreviews.map((video) => video.snippet.channelId)),
      ];
      if (channelIds.length === 0) return;

      try {
        const response = await fetch(
          `/api/youTube?endpoint=channelAvatars&channelIds=${channelIds.join(
            ","
          )}`
        );
        if (!response.ok) throw new Error("Failed to fetch channel avatars");
        const data = await response.json();
        setChannelAvatars(data);
      } catch (error) {
        console.error("Error fetching channel avatars:", error);
      }
    };

    fetchChannelAvatars();
  }, [allPreviews]);

  return (
    <div className="flex w-full items-center justify-center ">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-8 w-full">
        {allPreviews.map((video, index) => (
          <PreviewItem
            key={video.id.videoId || index}
            video={video}
            channelAvatar={channelAvatars[video.snippet.channelId]}
          />
        ))}
      </div>
    </div>
  );
}
