import PreviewItem from "./previewItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function HomePreview() {
  const searchList = useSelector((state) => state.app.searchList);
  const previews = useSelector((state) => state.app.previews);
  // const trendingSearch = searchList.find((item) => item.query === "trending");

  useEffect(() => {
    console.log("Previews state updated:");
    console.log(JSON.stringify(previews, null, 2));
  }, [previews]);

  return (
    <div className="flex w-full items-center justify-center ">
      {previews.length === 0 ? (
        <div>No previews available</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-8 w-full">
          {previews.map((video, index) => (
            <PreviewItem key={index} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
