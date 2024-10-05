import { Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  addTitle,
  updateTitle,
  removeTitle,
  setSelectedTitle,
} from "@/app/redux/slices/title.slice";
import TitleItem from "./titleItem";
import { useEffect } from "react";

export default function TitleManager() {
  const dispatch = useDispatch();
  const titles = useSelector((state) => state.title.titles);
  const selectedTitle = useSelector((state) => state.title.selectedTitle);

  const handleTitleChange = (index, e) => {
    const newValue = e.target.value;
    dispatch(updateTitle({ index, value: newValue }));
  };

  const handleAddTitle = () => {
    dispatch(addTitle());
  };

  const handleRemoveTitle = (index) => {
    if (titles.length > 1) {
      dispatch(removeTitle(index));
    }
  };

  const handleSetSelectedTitle = (title) => {
    dispatch(setSelectedTitle(title));
  };

  useEffect(() => {
    if (titles.length === 1 && titles[0] !== selectedTitle) {
      dispatch(setSelectedTitle(titles[0]));
    }
  }, [titles, selectedTitle, dispatch]);

  useEffect(() => {
    console.log("SelectedTitle:", selectedTitle);
  }, [selectedTitle]);

  return (
    <div className="flex flex-col gap-2 p-2 h-full overflow-scroll">
      {titles.map((title, index) => (
        <TitleItem
          key={index}
          id={index}
          index={index}
          title={title}
          handleTitleChange={handleTitleChange}
          handleRemoveTitle={handleRemoveTitle}
          placeholderText="Enter a title..."
          onSelect={handleSetSelectedTitle}
          isSelected={title === selectedTitle}
          isSingleTitle={titles.length === 1}
        />
      ))}
      <button
        onClick={handleAddTitle}
        className="flex items-center justify-center gap-1 py-3 rounded-md bg-blue-500 text-white text-xs font-bold hover:bg-blue-600"
      >
        <Plus className="w-4 h-4" />
        Add Title
      </button>
    </div>
  );
}
