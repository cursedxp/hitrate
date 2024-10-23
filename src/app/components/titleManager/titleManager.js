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
  const projectId = useSelector((state) => state.app.currentProjectId);

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

  const handleSetSelectedTitle = async (title) => {
    dispatch(setSelectedTitle(title));
  };

  const updateTitleInDatabase = async (title) => {
    try {
      const response = await fetch("/api/projects/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          updates: { title: title, titles: titles },
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(
          `Failed to update selected title: ${response.status} - ${text}`
        );
      }
      const data = JSON.parse(text);
    } catch (error) {
      console.error("Error updating selected title:", error);
    }
  };

  useEffect(() => {
    updateTitleInDatabase(selectedTitle);
  }, [selectedTitle, titles]);

  useEffect(() => {
    // If there's only one title, automatically select it
    if (titles.length === 1 && selectedTitle !== titles[0]) {
      handleSetSelectedTitle(titles[0]);
    }
    // If there are no titles, set selectedTitle to null
    if (titles.length === 0 && selectedTitle !== null) {
      handleSetSelectedTitle(null);
    }
  }, [titles, selectedTitle]);

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
        className="flex items-center justify-center gap-1 py-3 rounded-lg bg-blue-500 text-white text-xs font-bold hover:bg-blue-600"
      >
        <Plus className="w-4 h-4" />
        Add Title
      </button>
    </div>
  );
}
