import { Formatter } from "@/app/utils/formatters";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function PreviewItem({ video }) {
  const formatter = Formatter();
  const channelAvatar = useSelector(
    (state) => state.app.channelAvatars[video.snippet.channelId]
  );
  const currentTitle = useSelector((state) => state.title.selectedTitle);

  return (
    <div className="flex gap-4">
      <div className="flex relative w-[500px] h-[280px]">
        <Image
          src={
            video.snippet.thumbnails.medium?.url ||
            video.snippet.thumbnails.default.url
          }
          alt={video.snippet.title || currentTitle || "Untitled Video"}
          fill
          loading="lazy"
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold line-clamp-2">
            {video.snippet.title || currentTitle || "Untitled Video"}
          </h2>
          <div className="flex items-center text-xs text-gray-500 ">
            <span>
              {formatter.formatViewCount(video.statistics.viewCount)} views
            </span>
            <span className="mx-1">•</span>
            <span>
              {formatter.formatPublishedAt(video.snippet.publishedAt)}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            {channelAvatar ? (
              <div className="relative h-6 w-6">
                <Image
                  src={channelAvatar || "/default-avatar.png"}
                  alt={video.snippet.channelTitle}
                  sizes="100%"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
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
            <span className="text-xs text-gray-500">
              {video.snippet.channelTitle}
            </span>
          </div>
          <div className="text-xs mt-2">
            {video.snippet.description.slice(0, 100)}
          </div>
        </div>
      </div>
    </div>
  );
}

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
const toBase64 = (str) => {
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
};
