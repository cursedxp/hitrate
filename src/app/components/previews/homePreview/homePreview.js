import PreviewItem from "./previewItem";
import { useSelector } from "react-redux";

export default function HomePreview() {
  const previews = useSelector((state) => state.app.previews);
  return (
    <div className="flex w-full items-center justify-center ">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        {previews.map((video) => (
          <PreviewItem key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
