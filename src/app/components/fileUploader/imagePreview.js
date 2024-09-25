import Image from "next/image";
import Loader from "./loader";
import { useState, useEffect } from "react";

export default function ImagePreview({ thumbnail, isLoading }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (thumbnail) {
      const img = new window.Image();
      img.onload = () => setImageLoaded(true);
      img.src = thumbnail;
    }
  }, [thumbnail]);

  return (
    <div className="relative h-[90px] w-[138px] rounded-md cursor-pointer">
      {(isLoading || !imageLoaded) && <Loader />}
      {imageLoaded && (
        <Image
          src={thumbnail}
          alt="image"
          fill
          sizes="100%"
          className="object-cover rounded-md"
        />
      )}
    </div>
  );
}
