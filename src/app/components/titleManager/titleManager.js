import { Plus, Cpu } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  addTitle,
  updateTitle,
  removeTitle,
  setSelectedTitle,
} from "@/app/redux/slices/title.slice";
import TitleItem from "./titleItem";
import { useEffect, useState } from "react";

export default function TitleManager() {
  const dispatch = useDispatch();
  const titles = useSelector((state) => state.title.titles);
  const selectedTitle = useSelector((state) => state.title.selectedTitle);
  const projectId = useSelector((state) => state.app.currentProjectId);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTitleChange = (index, e) => {
    const newValue = e.target.value;
    dispatch(updateTitle({ index, value: newValue }));
  };

  const handleTitleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await updateTitleInDatabase(selectedTitle);
    }
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

  const handleGenerateAITitles = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titles }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate titles");
      }

      const data = await response.json();
      let generatedTitles = data.titles;

      // Ensure generatedTitles is an array
      if (typeof generatedTitles === "string") {
        generatedTitles = generatedTitles
          .split("\n")
          .filter((title) => title.trim() !== "");
      }

      // Remove any numbering, quotation marks, and trim whitespace from the titles
      generatedTitles = generatedTitles.map((title) => {
        return title
          .replace(/^\d+\.\s*/, "") // Remove numbering
          .replace(/^["']|["']$/g, "") // Remove leading and trailing quotes
          .trim();
      });

      // Add generated titles to the existing titles
      generatedTitles.forEach((title) => {
        if (title) {
          dispatch(addTitle(title));
        }
      });
    } catch (error) {
      console.error("Error generating titles:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col gap-2 p-2">
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
              onKeyDown={handleTitleKeyDown}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 p-2 border-t border-gray-100 dark:border-gray-700 mt-auto">
        <button
          onClick={handleAddTitle}
          className="flex items-center w-full justify-center gap-1 py-3 rounded-lg bg-blue-500 text-white text-xs font-bold hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          Add Title
        </button>
        {titles.length > 0 && (
          <button
            onClick={handleGenerateAITitles}
            disabled={isGenerating}
            className="flex items-center w-14 justify-center gap-1 py-3 rounded-lg text-xs font-bold dark:border-white disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            <Cpu className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
          </button>
        )}
      </div>
    </div>
  );
}
