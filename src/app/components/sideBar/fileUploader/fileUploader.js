import { Upload } from "react-feather";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setThumbnailFiles,
  setThumbnailPreviews,
} from "@/app/redux/slices/thumbnail.slice";

export default function FileUploader() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    dispatch(setThumbnailFiles(files));
    const imagePreviews = files.map((file) => {
      return URL.createObjectURL(file);
    });
    dispatch(setThumbnailPreviews(imagePreviews));
  };

  return (
    <div
      className="border-2 border-blue-500 flex items-center justify-center h-[90px] w-[138px] rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <Upload className="w-4 h-4 text-blue-500" />
        <span className="text-xs text-blue-500 mt-1">Add Thumbnail</span>
      </div>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
}
