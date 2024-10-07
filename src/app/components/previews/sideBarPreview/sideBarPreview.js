import PreviewItem from "./previewItem";
import { useSelector } from "react-redux";

export default function SideBarPreview() {
  const previews = useSelector((state) => state.app.previews);

  return (
    <div className="flex flex-col gap-4 w-full">
      {previews.map((video) => (
        <PreviewItem key={video.id} video={video} />
      ))}
    </div>
  );
}
