import { Formatter } from "@/app/utils/formatters";
import Image from "next/image";
export default function PreviewItem({ video }) {
  const formatter = Formatter();
  return (
    <div className="flex gap-2 bg">
      <div className="relative w-[160px] h-[94px]">
        <Image
          src={
            video.snippet.thumbnails.maxres?.url ||
            video.snippet.thumbnails.high.url
          }
          alt={video.snippet.title}
          className="rounded-lg"
          fill
          loading="lazy"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col max-w-[200px]">
        <div className="flex flex-col gap-1">
          <div className="text-xs font-medium line-clamp-2 break-words">
            {video.snippet.title}
          </div>
          <div className="flex gap-2 text-gray-500 text-xs">
            {video.snippet.channelTitle}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span>
              {formatter.formatViewCount(video.statistics.viewCount)} views
            </span>
            <span className="mx-1">•</span>
            <span>
              {formatter.formatPublishedAt(video.snippet.publishedAt)}
            </span>
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
