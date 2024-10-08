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
    const newFiles = Array.from(e.target.files);

    try {
      const validFiles = newFiles.filter((file) => !verifyFile(file));

      if (validFiles.length === 0) {
        toast.error("No valid files selected");
        return;
      }

      dispatch(setIsLoading(true));

      dispatch(setThumbnailFiles(validFiles));

      const newImagePreviews = validFiles.map((file) =>
        URL.createObjectURL(file)
      );

      dispatch(setThumbnailPreviews(newImagePreviews));

      // Set isLoading to false after all files have been processed
      setTimeout(() => dispatch(setIsLoading(false)), 0);
    } catch (error) {
      toast.error(error.message);
      dispatch(setIsLoading(false));
    } finally {
      e.target.value = null;
    }
  };

  return (
    <div
      className=" bg-blue-500 flex items-center gap-2 justify-center py-3 rounded-md cursor-pointer hover:bg-blue-600  text-white"
      onClick={handleClick}
    >
      <Upload className="w-4 h-4" />
      <span className="text-xs font-bold">Add Thumbnail</span>

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
