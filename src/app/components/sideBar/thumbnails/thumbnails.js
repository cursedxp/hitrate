"use client";
import ImagePreview from "@/app/components/fileUploader/imagePreview";
import FileUploader from "@/app/components/fileUploader/fileUploader";
import { useSelector } from "react-redux";

export default function Thumbnails() {
  const thumbnailPreviews = useSelector(
    (state) => state.thumbnail.thumbnailPreviews
  );
  const isLoading = useSelector((state) => state.thumbnail.isLoading);

  return (
    <>
      <div className="flex flex-col gap-4 p-2">
        {thumbnailPreviews.map((preview, index) => (
          <ImagePreview
            key={index}
            thumbnail={preview}
            isLoading={isLoading && index === thumbnailPreviews.length - 1}
          />
        ))}
        <FileUploader />
      </div>
    </>
  );
}
