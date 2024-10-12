"use client";
import ImagePreview from "@/app/components/fileUploader/imagePreview";
import FileUploader from "@/app/components/fileUploader/fileUploader";
import { useSelector, useDispatch } from "react-redux";
import { removeThumbnail } from "@/app/redux/slices/thumbnail.slice";
import { removePreview } from "@/app/redux/slices/app.slice";
export default function Thumbnails() {
  const thumbnailPreviews = useSelector(
    (state) => state.thumbnail.thumbnailPreviews
  );
  const isLoading = useSelector((state) => state.thumbnail.isLoading);
  const thumbnailFiles = useSelector((state) => state.thumbnail.thumbnailFiles);
  const dispatch = useDispatch();

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
