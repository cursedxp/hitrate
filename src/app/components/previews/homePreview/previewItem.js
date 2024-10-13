import { Formatter } from "@/app/utils/formatters";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChannelAvatar } from "@/app/redux/slices/app.slice";

export default function PreviewItem({ video }) {
  const formatter = Formatter();
  const dispatch = useDispatch();
  const channelAvatar = useSelector(
    (state) => state.app.channelAvatars[video.snippet.channelId]
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentTitle = useSelector((state) => state.title.selectedTitle);
  // useEffect(() => {
  //   const fetchChannelAvatar = async () => {
  //     if (!channelAvatar) {
  //       try {
  //         const response = await fetch(
  //           `/api/channelAvatar?channelId=${video.snippet.channelId}`
  //         );
  //         const data = await response.json();
  //         dispatch(
  //           setChannelAvatar({
  //             channelId: video.snippet.channelId,
  //             avatarUrl: data.avatarUrl,
  //           })
  //         );
  //       } catch (error) {
  //         console.error("Error fetching channel avatar:", error);
  //       }
  //     }
  //   };

  //   fetchChannelAvatar();
  // }, [video.snippet.channelId, channelAvatar, dispatch]);

  useEffect(() => {
    console.log(video.snippet.title);
  }, [video]);

  return (
    <div key={video.id} className="flex flex-col dark:text-white">
      <div className="relative w-full w-[308px] h-[173px]">
        <Image
          src={
            video.snippet.thumbnails.medium?.url ||
            video.snippet.thumbnails.default.url
          }
          alt={video.snippet.title || currentTitle || "Untitled Video"}
          fill
          className={`rounded-lg object-cover transition-opacity duration-300 ${
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
      <div className="flex gap-2 mt-2">
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10 overflow-hidden rounded-full bg-white flex items-center justify-center">
            {channelAvatar ? (
              <Image
                src={channelAvatar}
                alt={video.snippet.channelTitle || ""}
                fill
                className="object-cover rounded-full"
                sizes="40px"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  fill="#FF0000"
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-grow min-w-0">
          <div className="text-sm font-semibold mb-1 line-clamp-2">
            {video.snippet.title || currentTitle || "Untitled Video"}
          </div>
          <p className="text-xs text-gray-500 truncate">
            {video.snippet.channelTitle || "Lorem ipsum dolor sit amet"}
          </p>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span className="truncate">
              {(video.statistics && video.statistics.viewCount) ||
              (videoStats &&
                videoStats.statistics &&
                videoStats.statistics.viewCount)
                ? formatter.formatViewCount(
                    (video.statistics && video.statistics.viewCount) ||
                      (videoStats &&
                        videoStats.statistics &&
                        videoStats.statistics.viewCount)
                  )
                : "Loading..."}
              {" views"}
            </span>
            <span className="mx-1 flex-shrink-0">•</span>
            <span className="truncate">
              {formatter.formatPublishedAt(video.snippet.publishedAt)}
            </span>
          </div>
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
