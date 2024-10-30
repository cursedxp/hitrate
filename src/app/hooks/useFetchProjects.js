import { useState, useEffect } from "react";

export function useFetchProjects() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/projects/read");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        const sortedProjects = data.projects.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setProjects(sortedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { loading, projects };
}
