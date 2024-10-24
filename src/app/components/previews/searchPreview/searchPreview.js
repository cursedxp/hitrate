import { useEffect } from "react";
import PreviewItem from "./previewItem";
import { useSelector, useDispatch } from "react-redux";
import { setChannelAvatars } from "@/app/redux/slices/app.slice";

export default function SearchPreview() {
  const dispatch = useDispatch();
  const allPreviews = useSelector((state) => state.app.allPreviews);
  const channelAvatars = useSelector((state) => state.app.channelAvatars);
  const hiddenThumbnails = useSelector(
    (state) => state.thumbnail.hiddenThumbnails
  );

  const visiblePreviews = allPreviews.filter(
    (video) =>
      !hiddenThumbnails.includes(
        video.snippet.thumbnails.medium?.url ||
          video.snippet.thumbnails.default.url
      )
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      {visiblePreviews.map((video) => (
        <PreviewItem
          key={video.id}
          video={video}
          channelAvatar={channelAvatars[video.snippet.channelId]}
        />
      ))}
    </div>
  );
}
