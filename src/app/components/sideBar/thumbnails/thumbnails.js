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
        {thumbnailPreviews.length === 0 && (
          <div className=" bg-blue-100 text-blue-500 px-2 py-6 text-center rounded-md text-sm">
            Start adding your thumbnails here
          </div>
        )}
        {thumbnailPreviews.map((preview, index) => (
          <ImagePreview
            key={index}
            index={index}
            thumbnail={preview}
            isLoading={isLoading && index === thumbnailPreviews.length - 1}
          />
        ))}
        <FileUploader />
      </div>
    </>
  );
}
