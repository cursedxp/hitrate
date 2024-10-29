import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ShuffleThumbnails() {
  const [items, setItems] = useState([
    "/images/preview-1.png",
    "/images/preview-2.png",
    "/images/preview-3.png",
    "/images/preview-4.png",
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setItems((items) => [...items].sort(() => Math.random() - 0.5));
    }, 2000);

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
                key={item}
                layout
                className="relative w-full rounded-lg overflow-hidden"
                style={{ paddingTop: "56.25%" }} // This creates a 16:9 aspect ratio
                transition={{
                  duration: 0.5,
                  type: "spring",
                  bounce: 0.2,
                }}
              >
                <Image
                  src={item}
                  alt="Preview"
                  fill
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
