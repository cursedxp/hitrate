import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/outline";

export default function ShuffleThumbnails() {
  const [items, setItems] = useState([
    {
      thumbnail: "/images/preview-1.jpg",
      title: "DANTDM ANIMATED FUNNY MOMENTS",
      channel: "DANTDM",
      avatar: "/images/avatars/5.jpg",
      views: "125K views",
      published: "2 days ago",
    },
    {
      thumbnail: "/images/preview-2.jpg",
      title: "My wife insisted I do this for her",
      channel: "Linus Tech Tips",
      avatar: "/images/avatars/6.jpg",
      views: "89K views",
      published: "1 week ago",
    },
    {
      thumbnail: "/images/channels/previews/4.jpg",
      title: "Your Video",
      channel: "Your Channel",
      views: "256K views",
      published: "3 days ago",
    },
    {
      thumbnail: "/images/preview-4.jpg",
      title: "Joker VS Giorno",
      channel: "Death Battle",
      avatar: "/images/avatars/4.jpg",
      views: "178K views",
      published: "5 days ago",
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setItems((items) => [...items].sort(() => Math.random() - 0.5));
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center gap-8 justify-center w-full mb-16">
      <div className="flex flex-col w-[40%] self-start">
        <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
          SHUFFLE
        </div>
        <div className="text-4xl font-bold text-black mb-4">
          Shuffle and experiment with layouts
        </div>
        <p className="text-xl text-zinc-500 mb-8 leading-relaxed">
          Use our shuffle feature to instantly rearrange your thumbnails and see
          how they work together. Test different combinations and positions to
          find the most engaging layout for your content.
        </p>
      </div>
      <div className="w-[60%]">
        <div
          className="grid-item relative rounded-2xl bg-white transition-all duration-300 flex flex-col items-center justify-center gap-4 p-6"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <div className="grid grid-cols-2 gap-6 w-full">
            {items.map((item) => (
              <motion.div
                key={item.thumbnail}
                layout
                className="relative flex flex-col w-full"
                transition={{
                  duration: 0.5,
                  type: "spring",
                  bounce: 0.2,
                }}
              >
                <div
                  className="relative w-full rounded-2xl overflow-hidden"
                  style={{ paddingTop: "56.25%" }}
                >
                  <Image
                    src={item.thumbnail}
                    alt="Preview"
                    fill
                    loading="lazy"
                    quality={100}
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex mt-2 gap-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {item.avatar ? (
                      <Image
                        src={item.avatar}
                        alt={item.channel}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.channel}</p>
                    <p className="text-sm text-gray-500">
                      {item.views} • {item.published}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
