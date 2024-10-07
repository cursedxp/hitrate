import { Formatter } from "@/app/utils/formatters";
import Image from "next/image";
export default function PreviewItem({ video }) {
  const formatter = Formatter();
  return (
    <div className="flex gap-2 bg">
      <div className="relative w-[160px] h-[94px]">
        <Image
          src={video.snippet.thumbnails.default.url}
          alt={video.snippet.title}
          className=" rounded-lg"
          fill
          objectFit="cover"
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
