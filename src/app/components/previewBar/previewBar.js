import { useState } from "react";
import { Sidebar, Search, Home } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPreview } from "@/app/redux/slices/app.slice";

export default function PreviewBar() {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(0);
  const currentPreview = useSelector((state) => state.app.currentPreview);
  const handleClick = (index) => {
    dispatch(setCurrentPreview(index));
    setIsSelected(index);
  };

  return (
    <div className="flex  justify-center gap-4 p-2 px-4 items-center h-fit bg-white dark:bg-zinc-800 rounded-xl shadow-md">
      <div className="text-xs font-bold text-center">Previews</div>
      <button
        className={`flex flex-col p-2 items-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
          isSelected === 0 ? "bg-zinc-100 dark:bg-zinc-700" : ""
        }`}
        onClick={() => setIsSelected(0)}
      >
        <Home className="w-4 h-4" />
      </button>
      <button
        className={`flex flex-col p-2 items-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
          isSelected === 1 ? "bg-zinc-100 dark:bg-zinc-700" : ""
        }`}
        onClick={() => setIsSelected(1)}
      >
        <Sidebar className="w-4 h-4 rotate-180" />
      </button>
      <button
        className={`flex flex-col p-2 items-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
          isSelected === 2 ? "bg-zinc-100 dark:bg-zinc-700" : ""
        }`}
        onClick={() => setIsSelected(2)}
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
}
