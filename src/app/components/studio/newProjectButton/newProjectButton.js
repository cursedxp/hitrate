import { Plus } from "react-feather";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { clearProjectData } from "@/app/redux/slices/app.slice";
import { clearThumbnailData } from "@/app/redux/slices/thumbnail.slice";
import { clearTitleData } from "@/app/redux/slices/title.slice";
import { useState } from "react";

export default function NewProjectButton({ session }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    resetReduxStates();
    if (!session) {
      console.error("User not logged in");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const { projectId } = await response.json();
      router.push(`/studio/editor/${projectId}`);
    } catch (error) {
      console.error("Error creating new project:", error);
      // Reset loading state on error
      setIsLoading(false);
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
