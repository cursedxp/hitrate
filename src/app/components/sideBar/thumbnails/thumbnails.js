"use client";
import ImagePreview from "@/app/components/fileUploader/imagePreview";
import FileUploader from "@/app/components/fileUploader/fileUploader";
import { useSelector } from "react-redux";

export default function Thumbnails() {
  const thumbnailPreviews = useSelector(
    (state) => state.thumbnail.thumbnailPreviews
  );
  const isLoading = useSelector((state) => state.thumbnail.isLoading);
  const thumbnailFiles = useSelector((state) => state.thumbnail.thumbnailFiles);

  console.log("thumbnailPreviews:", thumbnailPreviews);
  console.log("typeof thumbnailPreviews:", typeof thumbnailPreviews);

  if (!Array.isArray(thumbnailPreviews)) {
    console.error("thumbnailPreviews is not an array:", thumbnailPreviews);
    return <div>Error: Invalid thumbnail data</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-2">
        {thumbnailPreviews.map((preview, index) => (
          <ImagePreview
            key={preview}
            index={index}
            thumbnail={preview}
            isLoading={
              isLoading &&
              index >= thumbnailFiles.length - thumbnailPreviews.length
            }
          />
        ))}
        <FileUploader />
      </div>
    </>
  );
}
