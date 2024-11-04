import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchList,
  removeSearchList,
  setSelectedSearchItem,
} from "@/app/redux/slices/app.slice";
import Chip from "./chip";

export default function Chips() {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.app.searchList);
  const selectedSearchItem = useSelector(
    (state) => state.app.selectedSearchItem
  );
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
      setValue("");
      setIsAdding(false);
      const data = await handleSearch(value.trim());

      dispatch(setSearchList({ query: value.trim(), results: data.items }));
      dispatch(setSelectedSearchItem(value.trim()));
    }
  };

  const handleCancel = () => {
    setValue("");
    setIsAdding(false);
  };

  const handleRemoveChip = (endpoint) => {
    dispatch(removeSearchList(endpoint));
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `/api/youTube?endpoint=intelligentSearch&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      return data || { items: [] }; // Ensure we always return an object with items array
    } catch (error) {
      console.error("Error fetching search results:", error);
      return { items: [] }; // Return an object with empty items array in case of error
    }
  };

  const handleChipClick = (query) => {
    dispatch(setSelectedSearchItem(query));
  };

  return (
    <div className="flex gap-2">
      {searchList.map((item, index) => (
        <Chip
          key={index}
          item={item.query}
          onRemove={() => handleRemoveChip(item.query)}
          onClick={() => handleChipClick(item.query)}
          isActive={item.query === selectedSearchItem}
        />
      ))}

      {isAdding ? (
        <div className="relative">
          <input
            type="text"
            className="bg-white shadow-md text-gray-800 p-3 rounded-xl dark:text-white dark:bg-zinc-800 w-80  border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-blue-100 active:outline-none  "
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
          className="bg-white shadow-md text-gray-800 p-4 rounded-xl dark:text-white dark:bg-zinc-800"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
