import { Upload } from "react-feather";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setThumbnailFiles,
  setThumbnailPreviews,
  setIsLoading,
} from "@/app/redux/slices/thumbnail.slice";
import toast from "react-hot-toast";
const FILE_SIZE = 5 * 1024 * 1024; //5MB
const FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export default function FileUploader() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const verifyFile = (file) => {
    if (!FILE_TYPES.includes(file.type)) {
      toast.error("Invalid file type");
      return false;
    }
    if (file.size > FILE_SIZE) {
      toast.error("File size too large");
      return false;
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    try {
      files.forEach((file) => {
        if (verifyFile(file)) {
          toast.error("Invalid file");
          return;
        }
      });

      dispatch(setThumbnailFiles(files));
      const imagePreviews = files.map((file) => {
        dispatch(setIsLoading(true));
        return URL.createObjectURL(file);
      });
      dispatch(setThumbnailPreviews(imagePreviews));
    } catch (error) {
      toast.error(error.message);
      e.target.value = null;
    }
  };

  return (
    <div
      className="border-2 border-blue-500 flex items-center justify-center py-2 rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <Upload className="w-4 h-4 text-blue-500" />
        <span className="text-xs text-blue-500 mt-1">Add Thumbnail</span>
      </div>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        multiple
        accept={FILE_TYPES.join(",")}
        onChange={handleFileChange}
      />
    </div>
  );
}
