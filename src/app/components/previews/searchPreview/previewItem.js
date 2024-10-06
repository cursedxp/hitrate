import { Formatter } from "@/app/utils/formatters";

export default function PreviewItem({ video }) {
  const formatter = Formatter();
  return (
    <div className="flex gap-4">
      <div className="flex">
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-[500px] rounded-lg"
        />
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-col gap-1">
          {video.snippet.title}
          <div className="flex items-center text-sm text-gray-400 mt-1">
            <span>
              {formatter.formatViewCount(video.statistics.viewCount)} views
            </span>
            <span className="mx-1">•</span>
            <span>
              {formatter.formatPublishedAt(video.snippet.publishedAt)}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.channelTitle}
              className="rounded-full w-9 h-9"
            />
            <span className="text-xs">{video.snippet.channelTitle}</span>
          </div>
          <div className="text-xs">
            {video.snippet.description.slice(0, 100)}
          </div>
        </div>
      </div>
    </div>
  );
}
