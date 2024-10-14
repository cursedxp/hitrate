import { useEffect, useState } from "react";
import PreviewItem from "./previewItem";
import { useSelector } from "react-redux";

export default function HomePreview() {
  const searchList = useSelector((state) => state.app.searchList);
  const previews = useSelector((state) => state.app.previews);
  const [allPreviews, setAllPreviews] = useState([]);
  const selectedSearchItem = useSelector(
    (state) => state.app.selectedSearchItem
  );
  const [channelAvatars, setChannelAvatars] = useState({});

  // Combine previews and search results
  useEffect(() => {
    console.log("Current searchList:", searchList);
    const searchResults = searchList.find(
      (item) => item.query === selectedSearchItem
    );
    console.log("Found searchResults:", searchResults);
    setAllPreviews([...previews, ...(searchResults?.results || [])]);
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

  useEffect(() => {
    console.log("selected Item on preview:", selectedSearchItem);
  }, [selectedSearchItem]);

  return (
    <div className="flex w-full items-center justify-center ">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-8 w-full">
        {allPreviews.map((video, index) => (
          <PreviewItem
            key={index}
            video={video}
            channelAvatar={channelAvatars[video.snippet.channelId]}
          />
        ))}
      </div>
    </div>
  );
}
