"use client";
import ImagePreview from "@/app/components/fileUploader/imagePreview";
import FileUploader from "@/app/components/fileUploader/fileUploader";
import { useSelector } from "react-redux";
import SectionTitle from "../sectionTitle/sectionTitle";

export default function Thumbnails() {
  const thumbnailPreviews = useSelector(
    (state) => state.thumbnail.thumbnailPreviews
  );
  const isLoading = useSelector((state) => state.thumbnail.isLoading);

  return (
    <>
      <SectionTitle title="Thumbnails" />
      <div className="grid grid-cols-2 gap-2">
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
