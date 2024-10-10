import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setComparisonList, setPreviews } from "@/app/redux/slices/app.slice";
import Chip from "./chip";
import { XMarkIcon } from "@heroicons/react/24/outline";
import youtubeServices from "@/app/services/youtubeServices";

export default function Chips() {
  const dispatch = useDispatch();
  const comparisonList = useSelector((state) => state.app.comparisonList);
  const [value, setValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddChip = () => {
    setIsAdding(true);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleInputKeyDown = async (e) => {
    if (e.key === "Enter" && value.trim()) {
      const data = await handleSearch(value.trim());
      dispatch(setPreviews(data.items));
      dispatch(setComparisonList(value.trim()));
      setValue("");
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setValue("");
    setIsAdding(false);
  };

  const handleSearch = async (value) => {
    const data = await youtubeServices.getSearchResults(value);
    console.log(data.items);
    return data;
  };

  return (
    <div className="flex gap-2">
      {comparisonList.map((item, index) => (
        <Chip key={index} item={item} />
      ))}

      {isAdding ? (
        <div className="relative">
          <input
            type="text"
            className="bg-white shadow-sm text-gray-800 p-3 rounded-xl dark:text-white dark:bg-zinc-800 w-80"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Competitor, channel, etc..."
            autoFocus
          />
          <div className="absolute top-2 right-2 p-2 hover:bg-gray-200 hover:text-gray-800 rounded-md cursor-pointer">
            <XMarkIcon className="w-4 h-4" onClick={handleCancel} />
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddChip}
          className="bg-white shadow-sm text-gray-800 p-4 rounded-xl dark:text-white dark:bg-zinc-800"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
