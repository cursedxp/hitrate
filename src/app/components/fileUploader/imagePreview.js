import Image from "next/image";
import Loader from "./loader";
import { useState, useEffect, useCallback } from "react";
import { Eye, Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  setThumbnailFiles,
  setThumbnailPreviews,
} from "@/app/redux/slices/thumbnail.slice";

export default function ImagePreview({ thumbnail, isLoading }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const thumbnailFiles = useSelector((state) => state.thumbnail.thumbnailFiles);
  const previews = useSelector((state) => state.thumbnail.thumbnailPreviews);
  const dispatch = useDispatch();

  useEffect(() => {
    if (thumbnail) {
      const img = new window.Image();
      img.onload = () => setImageLoaded(true);
      img.src = thumbnail;
    }
  }, [thumbnail]);

  const handleDelete = useCallback(() => {
    dispatch(
      setThumbnailFiles(thumbnailFiles.filter((file) => file !== thumbnail))
    );
    dispatch(
      setThumbnailPreviews(previews.filter((preview) => preview !== thumbnail))
    );
  }, [dispatch, thumbnail, thumbnailFiles, previews]);

  return (
    <div className="relative h-[172px] w-[284px] rounded-md group">
      {(isLoading || !imageLoaded) && <Loader />}
      {imageLoaded && (
        <Image
          src={thumbnail}
          alt="image"
          fill
          sizes="100%"
          className="object-cover rounded-md"
        />
      )}

      <div className="absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-black ">
              <Eye size={16} className="text-white" />
            </button>
            <button
              className="p-2 rounded-full bg-black "
              onClick={handleDelete}
            >
              <Trash size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
