import { Formatter } from "../../utils/formatters";

export default function PreviewItem({ video }) {
  const formatter = Formatter();
  return (
    <div key={video.id} className="flex flex-col dark:text-white ">
      <div className="relative pb-[56.25%]">
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
          {video.snippet.duration}
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <img
          src={video.snippet.thumbnails.default.url}
          alt={video.snippet.channelTitle}
          className="rounded-full w-9 h-9"
        />
        <div className="flex flex-col">
          <div className="text-sm font-semibold line-clamp-2 mb-1">
            {video.snippet.title}
          </div>
          <p className="text-xs text-gray-400">{video.snippet.channelTitle}</p>
          <div className="flex items-center text-sm text-gray-400 mt-1">
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
