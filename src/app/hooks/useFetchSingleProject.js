import { useState, useCallback } from "react";

export default function useFetchSingleProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProject = useCallback(async ({ projectId }) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${projectId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      const data = await response.json();
      return data.project;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchProject, loading, error };
}
