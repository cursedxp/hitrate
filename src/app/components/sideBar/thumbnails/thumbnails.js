"use client";
import ImagePreview from "@/app/components/fileUploader/imagePreview";
import FileUploader from "@/app/components/fileUploader/fileUploader";
import { useSelector } from "react-redux";

export default function Thumbnails() {
  const thumbnailPreviews = useSelector(
    (state) => state.thumbnail.thumbnailPreviews
  );
  const isLoading = useSelector((state) => state.thumbnail.isLoading);

  if (!Array.isArray(thumbnailPreviews)) {
    console.error("thumbnailPreviews is not an array:", thumbnailPreviews);
    return <div>Error: Invalid thumbnail data</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-2 h-full overflow-scroll">
      {thumbnailPreviews.map((preview, index) => (
        <ImagePreview
          key={preview}
          index={index}
          thumbnail={preview}
          isLoading={isLoading && index === thumbnailPreviews.length - 1}
        />
      ))}
      <FileUploader />
    </div>
  );
}
