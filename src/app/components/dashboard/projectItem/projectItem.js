"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Image as ImageIcon } from "react-feather";

export default function ProjectItem({ project }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/studio/editor/${project.id}`);
  };

  // Get the first thumbnail URL or use a default image
  const previewImageUrl =
    project.thumbnailUrls && project.thumbnailUrls.length > 0
      ? project.thumbnailUrls[0]
      : "https://picsum.photos/400/300";

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="relative h-48 rounded-xl">
        <Image
          src={previewImageUrl}
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
  );
}

// Helper functions for image placeholder
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
