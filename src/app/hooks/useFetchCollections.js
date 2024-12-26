import { useState, useCallback, useEffect } from "react";

export function useFetchCollections() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const fetchCollections = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/collections/read");
      if (!response.ok) throw new Error("Failed to fetch collections");
      const data = await response.json();
      setCollections(data.collections);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    fetchCollections();
  }, [fetchCollections]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return { loading, collections, refresh };
}
