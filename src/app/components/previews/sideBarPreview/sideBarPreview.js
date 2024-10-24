import PreviewItem from "./previewItem";
import { useSelector } from "react-redux";

export default function SideBarPreview() {
  const allPreviews = useSelector((state) => state.app.allPreviews);
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
    <div className="flex flex-col items-center gap-4 w-full">
      {visiblePreviews.map((video) => (
        <PreviewItem key={video.id} video={video} />
      ))}
    </div>
  );
}
