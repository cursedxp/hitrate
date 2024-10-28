import { useEffect } from "react";
import PreviewItem from "./previewItem";
import { useSelector, useDispatch } from "react-redux";
import { setChannelAvatars, resetShake } from "@/app/redux/slices/app.slice";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchChannelAvatars } from "@/app/hooks/useFetchChannelAvatars";

export default function HomePreview() {
  const dispatch = useDispatch();
  const allPreviews = useSelector((state) => state.app.allPreviews);
  const channelAvatars = useSelector((state) => state.app.channelAvatars);
  const shakeUploaded = useSelector((state) => state.app.shakeUploaded);
  const hiddenThumbnails = useSelector(
    (state) => state.thumbnail.hiddenThumbnails
  );

  useFetchChannelAvatars(allPreviews);

  useEffect(() => {
    if (shakeUploaded) {
      const timer = setTimeout(() => dispatch(resetShake()), 2000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, shakeUploaded]);

  const visiblePreviews = allPreviews.filter(
    (video) =>
      !hiddenThumbnails.includes(
        video.snippet.thumbnails.medium?.url ||
          video.snippet.thumbnails.default.url
      )
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AnimatePresence>
          {visiblePreviews.map((video, index) => (
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
