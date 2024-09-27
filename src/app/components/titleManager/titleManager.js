import ContentEditable from "react-contenteditable";
import { useState, useEffect } from "react";
import { Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { setTitle, setTitles } from "@/app/redux/slices/title.slice";

export default function TitleManager() {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.title.title);
  const titles = useSelector((state) => state.title.titles);

  const handleTitleChange = (e) => {
    dispatch(setTitle(e.target.value));
  };

  useEffect(() => {
    console.log(title);
  }, [title]);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 h-full overflow-scroll">
        {/* <ContentEditable
          html={title || "Add your titles here"}
          onChange={handleTitleChange}
          className={`w-full p-2 rounded-md bg-zinc-100 dark:bg-zinc-700 focus:ring-1 focus:ring-blue-500 focus:outline-none active:outline-none ${
            title ? "text-black" : "text-gray-400"
          }`}
          placeholder="Enter video title here"
        /> */}
        <div className="border-2 border-blue-500 flex items-center justify-center py-3 rounded-md cursor-pointer">
          <Plus className="w-4 h-4 text-blue-500" />
          <span className="text-xs text-blue-500">Add Title</span>
        </div>
      </div>
    </>
  );
}
