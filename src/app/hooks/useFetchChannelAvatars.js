import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChannelAvatars } from "@/app/redux/slices/app.slice";

export function useFetchChannelAvatars(videos) {
  const dispatch = useDispatch();
  const channelAvatars = useSelector((state) => state.app.channelAvatars);

  useEffect(() => {
    const fetchChannelAvatars = async () => {
      // Filter out videos without channelId or already cached avatars
      const channelIds = [
        ...new Set(
          videos
            .filter(
              (video) =>
                video.snippet.channelId &&
                !channelAvatars[video.snippet.channelId]
            )
            .map((video) => video.snippet.channelId)
        ),
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
        dispatch(setChannelAvatars(data));
      } catch (error) {
        console.error("Error fetching channel avatars:", error);
      }
    };

    fetchChannelAvatars();
  }, [videos, channelAvatars, dispatch]);
}
