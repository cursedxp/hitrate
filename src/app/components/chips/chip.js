import { useDispatch } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { removeSearchList } from "@/app/redux/slices/app.slice";
export default function Chip({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeSearchList(item));
  };

  return (
    <div className="flex items-center justify-between gap-2 bg-white shadow-sm text-gray-800 px-3 rounded-xl dark:text-white dark:bg-zinc-800 cursor-pointer">
      {item}
      {item !== "trending" && (
        <div className="flex items-center justify-center hover:bg-gray-200 p-1 hover:text-gray-800 rounded-md">
          <XMarkIcon className="w-4 h-4 m-1" onClick={handleRemove} />
        </div>
      )}
    </div>
  );
}
