import { Upload } from "react-feather";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addThumbnailFiles,
  addThumbnailPreviews,
  setIsLoading,
} from "@/app/redux/slices/thumbnail.slice";
import { setPreviews, addPreviews } from "@/app/redux/slices/app.slice";
import toast from "react-hot-toast";
import { uuidv7 } from "uuidv7";

const FILE_SIZE = 5 * 1024 * 1024; //5MB
const FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export default function FileUploader() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const selectedTitle = useSelector((state) => state.title.selectedTitle);
  const projectId = useSelector((state) => state.app.currentProjectId);

  const verifyFile = (file) => {
    if (!FILE_TYPES.includes(file.type)) {
      toast.error("Invalid file type");
      return false;
    }
    if (file.size > FILE_SIZE) {
      toast.error("File size too large");
      return false;
    }
    return true;
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const newFiles = Array.from(e.target.files);

    try {
      const validFiles = newFiles.filter(verifyFile);

      if (validFiles.length === 0) {
        toast.error("No valid files selected");
        return;
      }

      dispatch(setIsLoading(true));

      for (const file of validFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("projectId", projectId);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const { url } = await response.json();

        const newPreview = {
          id: uuidv7(),
          snippet: {
            title: "",
            thumbnails: {
              medium: { url },
            },
            channelTitle: "",
            publishedAt: new Date().toISOString(),
            description: "This is a generated thumbnail description",
          },
          statistics: {
            viewCount: 100.0,
          },
        };

        dispatch(addPreviews([newPreview]));
        dispatch(addThumbnailPreviews([url]));
      }

      dispatch(setIsLoading(false));
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
