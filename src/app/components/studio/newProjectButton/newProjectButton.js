import { Plus } from "react-feather";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearProjectData } from "@/app/redux/slices/app.slice";
import { clearThumbnailData } from "@/app/redux/slices/thumbnail.slice";
import { clearTitleData } from "@/app/redux/slices/title.slice";

import useCreateProject from "@/app/hooks/useCreateProject";

export default function NewProjectButton({ session }) {
  const { createProject, isLoading } = useCreateProject();

  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = async () => {
    resetReduxStates();
    if (!session) {
      console.error("User not logged in");
      return;
    }
    const newProjectId = await createProject();
    if (newProjectId) {
      router.push(`/studio/editor/${newProjectId}`);
    }
  };
  const resetReduxStates = () => {
    dispatch(clearProjectData());
    dispatch(clearThumbnailData());
    dispatch(clearTitleData());
  };

  return (
    <div>
      <button
        className={`relative h-48 rounded-xl w-full border-2 border-blue-500 flex flex-col justify-center items-center transition-all duration-300 
          ${
            isLoading
              ? "opacity-75 cursor-not-allowed"
              : "hover:scale-105 hover:shadow-lg hover:bg-blue-50"
          }`}
        onClick={handleClick}
        disabled={isLoading}
        aria-label="Create new project"
      >
        <div
          className={`rounded-full text-blue-500 bg-blue-200 w-12 h-12 flex justify-center items-center 
          ${isLoading ? "animate-pulse" : ""}`}
        >
          <Plus className={`w-6 h-6 ${isLoading ? "animate-spin" : ""}`} />
        </div>
        <div className="text-blue-500 mt-2">
          {isLoading ? "Creating..." : "New Project"}
        </div>
      </button>
    </div>
  );
}
