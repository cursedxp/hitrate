"use client";
import ImagePreview from "./fileUploader/imagePreview";
import FileUploader from "./fileUploader/fileUploader";
import { useSelector } from "react-redux";
export default function SideBarContent() {
  const thumbnailPreviews = useSelector(
    (state) => state.thumbnail.thumbnailPreviews
  );

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between text-sm font-bold pb-2">
        Thumbnails
      </div>
      <div className="grid grid-cols-2 gap-2">
        {thumbnailPreviews.map((preview, index) => (
          <ImagePreview key={index} image={preview} />
        ))}
        <FileUploader />
      </div>
    </div>
  );
}
