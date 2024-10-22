import { Plus } from "react-feather";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { clearProjectData } from "@/app/redux/slices/app.slice";
import { clearThumbnailData } from "@/app/redux/slices/thumbnail.slice";
import { clearTitleData } from "@/app/redux/slices/title.slice";

export default function NewProjectButton() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (!session) {
      console.error("User not logged in");
      return;
    }

    try {
      // Clear all project-related data from Redux store
      dispatch(clearProjectData());
      dispatch(clearThumbnailData());
      dispatch(clearTitleData());

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
    }
  };

  return (
    <div>
      <button
        className="relative h-48 rounded-xl w-full border-2 border-blue-500 flex flex-col justify-center items-center hover:scale-105 transition-all duration-300 hover:shadow-lg"
        onClick={handleClick}
      >
        <div className="rounded-full text-blue-500 bg-blue-200 w-12 h-12 flex justify-center items-center">
          <Plus className="w-6 h-6" />
        </div>
        <div className="text-blue-500 mt-2">New Project</div>
      </button>
    </div>
  );
}
