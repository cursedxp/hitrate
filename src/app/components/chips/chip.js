import { useDispatch } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { removeSearchList } from "@/app/redux/slices/app.slice";

export default function Chip({ item, onRemove, onClick, isActive }) {
  return (
    <div
      className={`shadow-sm p-3 rounded-xl flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
        isActive
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "bg-white text-gray-800 dark:text-white dark:bg-zinc-800"
      }`}
      onClick={() => onClick(item)}
    >
      <span>{item}</span>
      <XMarkIcon
        className={`w-4 h-4 cursor-pointer ${
          isActive ? "text-white" : "text-gray-600 dark:text-gray-300"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item);
        }}
      />
    </div>
  );
}
