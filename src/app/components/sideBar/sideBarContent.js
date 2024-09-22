import Image from "next/image";
import { Upload } from "react-feather";
export default function SideBarContent() {
  return (
    <div className="flex flex-col p-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="relative h-[90px] w-[138px] rounded-md cursor-pointer">
          <Image
            src="https://placehold.co/600x400/png"
            alt="image 1"
            fill
            sizes="100%"
            className=" object-cover rounded-md"
          />
        </div>
        <div className="border-2 border-blue-500 flex items-center justify-center h-[90px] w-[138px] rounded-md">
          <Upload className="w-4 h-4 text-blue-500" />
        </div>
      </div>
    </div>
  );
}
