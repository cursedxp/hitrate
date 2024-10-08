import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setComparisonList } from "@/app/redux/slices/app.slice";
import Chip from "./chip";

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

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && value.trim()) {
      dispatch(setComparisonList(value.trim()));
      setValue("");
      setIsAdding(false);
    }
  };

  return (
    <div className="flex gap-2">
      {comparisonList.map((item, index) => (
        <Chip key={index} item={item} />
      ))}

      {isAdding ? (
        <input
          type="text"
          className="bg-white shadow-sm text-gray-800 p-3 rounded-xl dark:text-white dark:bg-zinc-800 w-80"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Competitor, channel, etc..."
          autoFocus
        />
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
