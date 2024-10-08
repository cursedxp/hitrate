import Image from "next/image";
import Loader from "./loader";
import { useState, useEffect, useCallback } from "react";
import { Eye, Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  setThumbnailFiles,
  setThumbnailPreviews,
  setSelectedThumbnail,
} from "@/app/redux/slices/thumbnail.slice";

export default function ImagePreview({ thumbnail, isLoading, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const thumbnailFiles = useSelector((state) => state.thumbnail.thumbnailFiles);
  const previews = useSelector((state) => state.thumbnail.thumbnailPreviews);
  const dispatch = useDispatch();
  const selectedThumbnail = useSelector(
    (state) => state.thumbnail.selectedThumbnail
  );

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

  const selectedThumbnailStyle = "border-4 border-blue-500";

  return (
    <div
      className={`relative h-[144px]  rounded-md cursor-pointer group`}
      onClick={() => dispatch(setSelectedThumbnail(index))}
    >
      {(isLoading || !imageLoaded) && <Loader />}
      {imageLoaded && (
        <Image
          src={thumbnail}
          alt="image"
          fill
          sizes="100%"
          className={`object-cover rounded-xl ${
            index === selectedThumbnail ? selectedThumbnailStyle : ""
          }`}
        />
      )}

      <div className="absolute top-0 left-0 w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md ">
        <div className="flex justify-end">
          <div className="flex flex-col bg-white dark:bg-zinc-800 rounded-md m-2">
            <button className="p-2 rounded-md hover:bg-zinc-700 hover:text-white text-black dark:text-white">
              <Eye size={16} />
            </button>
            <button
              className="p-2 rounded-md hover:bg-zinc-700 hover:text-white text-black dark:text-white"
              onClick={handleDelete}
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
