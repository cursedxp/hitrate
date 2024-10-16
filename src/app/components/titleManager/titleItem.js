import ContentEditable from "react-contenteditable";
import { Trash2, CheckCircle, Circle } from "react-feather";
import { useSelector } from "react-redux";

export default function TitleItem({
  index,
  title,
  handleTitleChange,
  handleRemoveTitle,
  placeholderText,
  onSelect,
  isSelected,
  isSingleTitle,
}) {
  const titles = useSelector((state) => state.title.titles);

  // Add this new function to handle the &nbsp; issue
  const handleLocalTitleChange = (index, e) => {
    const newContent = e.target.value.replace(/&nbsp;/g, " ");
    handleTitleChange(index, { target: { value: newContent } });
  };

  return (
    <div key={index} className={`flex items-center gap-2 `}>
      <div className="relative w-full">
        {!title && (
          <span className="absolute left-2 top-2 text-gray-400 pointer-events-none">
            {placeholderText}
          </span>
        )}
        <ContentEditable
          html={title}
          onChange={(e) => handleLocalTitleChange(index, e)}
          className={`w-full p-2 rounded-lg border dark:bg-zinc-700 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-blue-100 active:outline-none  dark:text-white ${
            title ? "text-black" : "text-gray-400"
          }`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
        <div className="absolute flex z-20 right-1 top-1 rounded-md bg-white dark:bg-zinc-800">
          {!isSingleTitle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(title);
              }}
              className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-white"
              title={isSelected ? "Selected title" : "Set as selected title"}
            >
              {isSelected ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Circle className="w-4 h-4 " />
              )}
            </button>
          )}
          <div className="h-full w-full bg-zinc-300 dark:bg-zinc-700"></div>
          {titles.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveTitle(index);
              }}
              className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
