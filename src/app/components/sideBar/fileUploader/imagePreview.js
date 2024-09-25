import Image from "next/image";

export default function ImagePreview({ image }) {
  return (
    <div className="relative h-[90px] w-[138px] rounded-md cursor-pointer">
      <Image
        src={image}
        alt="image"
        fill
        sizes="100%"
        className=" object-cover rounded-md"
      />
    </div>
  );
}
