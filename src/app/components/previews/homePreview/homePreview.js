import { useEffect } from "react";
import PreviewItem from "./previewItem";
import { useSelector, useDispatch } from "react-redux";
import { setChannelAvatars } from "@/app/redux/slices/app.slice";

export default function HomePreview() {
  const dispatch = useDispatch();
  const allPreviews = useSelector((state) => state.app.allPreviews);
  const channelAvatars = useSelector((state) => state.app.channelAvatars);

  useEffect(() => {
    const fetchChannelAvatars = async () => {
      const channelIds = [
        ...new Set(allPreviews.map((video) => video.snippet.channelId)),
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
  }, [allPreviews, channelAvatars, dispatch]);

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
