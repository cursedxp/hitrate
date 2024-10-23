import { useEffect } from "react";
import PreviewItem from "./previewItem";
import { useSelector, useDispatch } from "react-redux";
import { setChannelAvatars, resetShake } from "@/app/redux/slices/app.slice";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePreview() {
  const dispatch = useDispatch();
  const allPreviews = useSelector((state) => state.app.allPreviews);
  const channelAvatars = useSelector((state) => state.app.channelAvatars);
  const shakeUploaded = useSelector((state) => state.app.shakeUploaded);

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

    if (shakeUploaded) {
      const timer = setTimeout(() => dispatch(resetShake()), 2000);
      return () => clearTimeout(timer);
    }
  }, [allPreviews, channelAvatars, dispatch, shakeUploaded]);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-8 w-full">
        <AnimatePresence>
          {allPreviews.map((video, index) => (
            <motion.div
              key={video.id.videoId || index}
              layout
              transition={{ duration: 0.5 }}
            >
              <PreviewItem
                video={video}
                channelAvatar={channelAvatars[video.snippet.channelId]}
                shake={shakeUploaded && !video.snippet.channelId}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
