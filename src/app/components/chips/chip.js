import { useDispatch } from "react-redux";
import { removeComparisonList } from "@/app/redux/slices/app.slice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
export default function Chip({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeComparisonList(item));
  };

  return (
    <div className="flex items-center justify-between gap-2 bg-white shadow-sm text-gray-800 px-3 rounded-xl dark:text-white dark:bg-zinc-800 cursor-pointer">
      <div className="">{item === "trending" ? "🔥 Trending" : item}</div>
      {item !== "trending" && (
        <div className="flex items-center justify-center hover:bg-gray-200 p-1 hover:text-gray-800 rounded-md">
          <XMarkIcon className="w-4 h-4 m-1" onClick={handleRemove} />
        </div>
      )}
    </div>
  );
}
