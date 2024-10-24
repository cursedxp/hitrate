import Image from "next/image";
import Loader from "./loader";
import { useState, useEffect, useCallback } from "react";
import { Eye, Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  setThumbnailFiles,
  setThumbnailPreviews,
  setSelectedThumbnail,
  toggleHiddenThumbnail,
} from "@/app/redux/slices/thumbnail.slice";
import { removePreview } from "@/app/redux/slices/app.slice";
import { useParams } from "next/navigation";

export default function ImagePreview({ thumbnail, isLoading, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const thumbnailFiles = useSelector((state) => state.thumbnail.thumbnailFiles);
  const previews = useSelector((state) => state.thumbnail.thumbnailPreviews);
  const hiddenThumbnails = useSelector(
    (state) => state.thumbnail.hiddenThumbnails
  );
  const dispatch = useDispatch();
  const selectedThumbnail = useSelector(
    (state) => state.thumbnail.selectedThumbnail
  );
  const { projectId } = useParams();

  useEffect(() => {
    if (thumbnail) {
      const img = new window.Image();
      img.onload = () => setImageLoaded(true);
      img.src = thumbnail;
    }
  }, [thumbnail]);

  const handleDelete = useCallback(
    async (e) => {
      e.stopPropagation();
      setIsDeleting(true);

      try {
        const response = await fetch("/api/thumbnails/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId,
            thumbnailUrl: thumbnail,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to delete thumbnail");
        }

        // Remove from thumbnailFiles
        dispatch(
          setThumbnailFiles(thumbnailFiles.filter((_, i) => i !== index))
        );

        // Remove from thumbnailPreviews
        dispatch(setThumbnailPreviews(previews.filter((_, i) => i !== index)));

        // Remove corresponding preview
        dispatch(removePreview(index));

        // If this was the selected thumbnail, reset the selection
        if (index === selectedThumbnail) {
          dispatch(setSelectedThumbnail(null));
        }
      } catch (error) {
        console.error("Error deleting thumbnail:", error);
        // Handle error (e.g., show an error message to the user)
      } finally {
        setIsDeleting(false);
      }
    },
    [
      dispatch,
      index,
      thumbnailFiles,
      previews,
      projectId,
      thumbnail,
      selectedThumbnail,
    ]
  );

  const handleToggleHidden = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(toggleHiddenThumbnail(thumbnail));
    },
    [dispatch, thumbnail]
  );

  const isHidden = hiddenThumbnails.includes(thumbnail);

  const selectedThumbnailStyle = "border-4 border-blue-500";

  return (
    <div
      className="relative h-[180px] rounded-xl cursor-pointer group"
      onClick={() => dispatch(setSelectedThumbnail(index))}
    >
      {(isLoading || !imageLoaded) && <Loader />}
      {isDeleting && <Loader text="" />}
      <div
        className={`relative w-full h-full rounded-xl ${
          isHidden ? "brightness-50" : ""
        } ${isDeleting ? "opacity-50" : ""}`}
      >
        {imageLoaded && !isDeleting && (
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
        {isHidden && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-xl" />
        )}
      </div>

      {!isDeleting && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
          <div className="flex justify-end">
            <div className="flex flex-col bg-white dark:bg-zinc-800 rounded-md m-2">
              <button
                className="p-2 rounded-md hover:bg-zinc-700 hover:text-white text-black dark:text-white"
                onClick={handleToggleHidden}
                title={isHidden ? "Show thumbnail" : "Hide thumbnail"}
              >
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
      )}
    </div>
  );
}
