import PreviewItem from "./previewItem";
import { useSelector } from "react-redux";

export default function HomePreview() {
  const searchList = useSelector((state) => state.app.searchList);
  const previews = useSelector((state) => state.app.previews);
  const selectedSearchItem = useSelector(
    (state) => state.app.selectedSearchItem
  );

  // Combine previews and search results
  const allPreviews = [
    ...previews,
    ...(searchList.find((item) => item.query === selectedSearchItem)?.results ||
      []),
  ];

  return (
    <div className="flex w-full items-center justify-center ">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-8 w-full">
        {allPreviews.map((video, index) => (
          <PreviewItem key={index} video={video} />
        ))}
      </div>
    </div>
  );
}
