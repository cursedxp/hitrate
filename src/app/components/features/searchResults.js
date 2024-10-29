"use client";
import Image from "next/image";
import { useState } from "react";
const chips = {
  Trending: [
    {
      image: "/images/trending/1.jpg",
      title: "Hypercharge for watching the Brawl Stars World Finals",
      channelName: "Brawl Stars",
      views: "130K views",
      date: "2 days ago",
    },
    {
      image: "/images/trending/2.jpg",
      title: "F1 Mexico: Race Highlights",
      channelName: "F1",
      views: "1.2M views",
      date: "1 days ago",
    },
    {
      image: "/images/trending/3.jpg",
      title: "Real Madrid vs Barcelona: El Clásico",
      channelName: "ESPN",
      views: "1.8M views",
      date: "1 days ago",
    },
  ],
  Gaming: [
    {
      image: "/images/gaming/1.jpg",
      title: "Hypercharge for watching the Brawl Stars World Finals",
      channelName: "Brawl Stars",
      views: "130K views",
      date: "2 days ago",
    },
    {
      image: "/images/gaming/2.jpg",
      title: "Dragon Age The Veilguard Review",
      channelName: "Skill Up",
      views: "114K views",
      date: "1 days ago",
    },
    {
      image: "/images/gaming/3.jpg",
      title: "Joker VS Giorno",
      channelName: "Death Battle",
      views: "140K views",
      date: "1 days ago",
    },
  ],
  Cooking: [
    {
      image: "/images/cooking/1.jpg",
      title: "Every Way To Cook A Potato (43 Ways)",
      channelName: "Joshua Weissman",
      views: "1.1M views",
      date: "1 days ago",
    },
    {
      image: "/images/cooking/2.jpg",
      title: "I Hatched A Chicken, Then Cooked It",
      channelName: "Nick DiGiovanni",
      views: "857K views",
      date: "1 days ago",
    },
    {
      image: "/images/cooking/3.jpg",
      title: "Why Recipes are holding you back from learning how to cook",
      channelName: "Ethan Chlebowski",
      views: "620K views",
      date: "1 days ago",
    },
  ],
};

export default function SearchResults() {
  const [chip, setChip] = useState("Trending");
  return (
    <div className="flex items-center gap-4 justify-center w-full">
      <div className="w-[60%]">
        <div
          className="grid-item relative rounded-2xl bg-white transition-all duration-300 flex flex-col  justify-center gap-4 "
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {["Trending", "Gaming", "Cooking"].map((chip) => (
                  <div
                    key={chip}
                    className="px-6 py-3 bg-white rounded-xl shadow-md text-sm font-medium text-gray-700 whitespace-nowrap hover:bg-zinc-800 hover:text-white cursor-pointer "
                    onClick={() => setChip(chip)}
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {chips[chip].map((item) => (
                <div key={item} className="flex gap-4 items-start">
                  <div className="w-40 h-24 bg-gray-100 rounded-lg relative flex-shrink-0">
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
                    <h3 className="font-medium text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.channelName}</p>
                    <p className="text-sm text-gray-500">
                      {item.views} • {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[40%] self-start">
        <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
          SEARCH
        </div>
        <div className="text-4xl font-bold text-black mb-4">
          Compare search results
        </div>
        <p className="text-xl text-zinc-500 mb-8 leading-relaxed">
          See how your content appears in YouTube search results. Compare your
          thumbnails and titles against competitors in your niche using
          topic-based filters to optimize your content's discoverability.
        </p>
      </div>
    </div>
  );
}
