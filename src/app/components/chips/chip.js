import { useDispatch } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { removeSearchList } from "@/app/redux/slices/app.slice";

export default function Chip({ item, onRemove, onClick, isActive }) {
  return (
    <div
      className={`shadow-sm p-3 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
        isActive
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "bg-white text-gray-800 dark:text-white dark:bg-zinc-800"
      }`}
      onClick={() => onClick(item)}
    >
      <span>{item}</span>
      {item !== "trending" && (
        <XMarkIcon
          className={`w-4 h-4 cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item);
          }}
        />
      )}
    </div>
  );
}
