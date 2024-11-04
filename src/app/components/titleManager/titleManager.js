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
import updateTitlesOfProject from "@/app/hooks/useUpdateTitles";
import useGenerateAiTitles from "@/app/hooks/useGenerateAiTitles";

export default function TitleManager() {
  const dispatch = useDispatch();
  const titles = useSelector((state) => state.title.titles);
  const selectedTitle = useSelector((state) => state.title.selectedTitle);
  const projectId = useSelector((state) => state.app.currentProjectId);
  const { updateTitles } = updateTitlesOfProject();
  const { isGenerating, generateAiTitles } = useGenerateAiTitles();
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
    updateTitles(projectId, title, titles);
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
    const generatedTitles = await generateAiTitles(titles);

    generatedTitles.forEach((title) => {
      if (title) {
        dispatch(addTitle(title));
      }
    });
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
          <div className="relative group">
            <button
              onClick={handleGenerateAITitles}
              disabled={isGenerating || !titles.some((title) => title.trim())}
              className="flex items-center w-14 justify-center gap-1 py-3 rounded-lg text-xs font-bold dark:border-white disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
            >
              AI
            </button>
            {!titles.some((title) => title.trim()) && (
              <div className="absolute -left-36 bottom-full mb-2 hidden group-hover:block w-48 p-2 text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-md shadow-md">
                Enter at least one title to generate AI variations
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
