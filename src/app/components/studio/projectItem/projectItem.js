"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Trash2 } from "react-feather";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import ConfirmationModal from "@/app/components/modal/confirmationModal";

// Move utility functions to the top, before the component
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function ProjectItem({ project, onDelete }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/studio/editor/${project.id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent triggering the parent click event
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/projects/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      toast.success("Project deleted successfully");
      onDelete();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Get the first thumbnail URL or use a placeholder div with gradient background
  const hasPreviewImage =
    project.thumbnailUrls && project.thumbnailUrls.length > 0;

  return (
    <>
      <div onClick={handleClick} className="cursor-pointer group relative">
        <div className="relative h-48 rounded-xl">
          {hasPreviewImage ? (
            <Image
              src={project.thumbnailUrls[0]}
              alt={project.name}
              fill
              className={`rounded-xl object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoadingComplete={() => setImageLoaded(true)}
              loading="lazy"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <ImageIcon className="w-8 h-8" />
                <span className="text-sm">No thumbnail yet added</span>
              </div>
            </div>
          )}

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`absolute top-2 right-2 p-2 bg-black/90 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed ${
              isDeleting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <Trash2
              className={`w-4 h-4 ${isDeleting ? "animate-pulse" : ""}`}
            />
          </button>
        </div>
        <div className="flex flex-col pt-4">
          <div className="flex justify-between">
            <div className="text-md font-semibold mb-1 line-clamp-2">
              {project.name}
            </div>
            <div className=" flex text-md items-center gap-2 text-gray-500">
              <div>
                {project.thumbnailUrls ? project.thumbnailUrls.length : 0}
              </div>
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm text-gray-500 line-clamp-2">
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        type="danger"
      />
    </>
  );
}
