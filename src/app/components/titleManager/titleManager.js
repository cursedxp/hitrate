import ContentEditable from "react-contenteditable";
import { Plus, Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  addTitle,
  updateTitle,
  removeTitle,
} from "@/app/redux/slices/title.slice";
export default function TitleManager() {
  const dispatch = useDispatch();
  const titles = useSelector((state) => state.title.titles);

  const handleTitleChange = (index, e) => {
    dispatch(updateTitle({ index, value: e.target.value }));
  };

  const handleAddTitle = () => {
    dispatch(addTitle());
  };

  const handleRemoveTitle = (index) => {
    if (titles.length > 1) {
      dispatch(removeTitle(index));
    }
  };

  const placeholderText = "Enter a title...";

  return (
    <div className="flex flex-col gap-2 p-2 h-full overflow-scroll">
      {titles.map((title, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="relative w-full">
            {!title && (
              <span className="absolute left-2 top-2 text-gray-400 pointer-events-none">
                {placeholderText}
              </span>
            )}
            <ContentEditable
              html={title}
              onChange={(e) => handleTitleChange(index, e)}
              className={`w-full p-2 rounded-md bg-zinc-200 dark:bg-zinc-700 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-blue-100 active:outline-none  dark:text-white ${
                title ? "text-black" : "text-gray-400"
              }`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTitle();
                }
              }}
            />
            {titles.length > 1 && (
              <div className="absolute z-10 right-1 top-1 dark:bg-zinc-700">
                <button
                  onClick={() => handleRemoveTitle(index)}
                  className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
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
