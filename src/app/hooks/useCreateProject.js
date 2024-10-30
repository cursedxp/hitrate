import { useState } from "react";

export default function useCreateProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [projectId, setProjectId] = useState(null);

  const createProject = async () => {
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
      const data = await response.json();
      setProjectId(data.projectId);
      return data.projectId;
    } catch (error) {
      console.error("Error creating new project:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createProject, isLoading };
}
