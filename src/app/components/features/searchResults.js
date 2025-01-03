"use client";
import Image from "next/image";
import { useState } from "react";
const chips = {
  Trending: [
    {
      image: "/images/channels/previews/4.jpg",
      title: "Your Video",
      channelName: "Your Channel",
      views: "130K views",
      date: "2 days ago",
    },
    {
      image: "/images/trending/2.png",
      title: "This smart phone can help you to work faster",
      channelName: "Tech Talk",
      views: "1.2M views",
      date: "1 days ago",
    },
    {
      image: "/images/trending/3.png",
      title: "New adventure begins!",
      channelName: "Adventure Time",
      views: "1.8M views",
      date: "1 days ago",
    },
  ],
  Gaming: [
    {
      image: "/images/preview-3.png",
      title: "Your Video",
      channelName: "Your Channel",
      views: "130K views",
      date: "2 days ago",
    },
    {
      image: "/images/gaming/2.png",
      title: "FPS Gaming Legends",
      channelName: "Pixel Warriors",
      views: "114K views",
      date: "1 days ago",
    },
    {
      image: "/images/gaming/3.png",
      title: "Tactical Strategy",
      channelName: "Pixel Warriors",
      views: "140K views",
      date: "1 days ago",
    },
  ],
  Cooking: [
    {
      image: "/images/preview-3.png",
      title: "Your Video",
      channelName: "Your Channel",
      views: "1.1M views",
      date: "1 days ago",
    },
    {
      image: "/images/cooking/2.png",
      title: "Spiciest noodles in town",
      channelName: "Cooking with love",
      views: "857K views",
      date: "1 days ago",
    },
    {
      image: "/images/cooking/3.png",
      title: "Cooking tips and tricks",
      channelName: "Cooking with love",
      views: "620K views",
      date: "1 days ago",
    },
  ],
};

export default function SearchResults() {
  const [chip, setChip] = useState("Trending");
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-4 justify-center w-full mb-16 px-4 md:px-0">
      <div className="w-full md:w-[60%]">
        <div className="grid-item relative rounded-2xl bg-white transition-all duration-300 flex flex-col justify-center gap-4">
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-2 overflow-x-auto pb-2 w-full">
                {["Trending", "Gaming", "Cooking"].map((chip) => (
                  <div
                    key={chip}
                    className="px-4 md:px-6 py-2 md:py-3 bg-white rounded-xl shadow-md text-sm font-medium text-gray-700 whitespace-nowrap hover:bg-zinc-800 hover:text-white cursor-pointer"
                    onClick={() => setChip(chip)}
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {chips[chip].map((item) => (
                <div key={item} className="flex gap-3 md:gap-4 items-start">
                  <div className="w-32 md:w-40 h-20 md:h-24 bg-gray-100 rounded-lg relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      quality={100}
                      loading="lazy"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-medium text-sm md:text-base text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      {item.channelName}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {item.views} • {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-[40%] self-start mb-8 md:mb-0">
        <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
          SEARCH
        </div>
        <div className="text-3xl md:text-4xl font-bold text-black mb-4">
          Compare search results
        </div>
        <p className=" text-zinc-500 mb-8 leading-relaxed">
          See how your content appears in YouTube search results. Compare your
          thumbnails and titles against competitors in your niche using
          topic-based filters to optimize your content's discoverability.
        </p>
      </div>
    </div>
  );
}
