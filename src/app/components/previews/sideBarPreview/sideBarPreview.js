import PreviewItem from "./previewItem";
import { useSelector } from "react-redux";

export default function SideBarPreview() {
  const allPreviews = useSelector((state) => state.app.allPreviews);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {allPreviews.map((video) => (
        <PreviewItem key={video.id} video={video} />
      ))}
    </div>
  );
}
