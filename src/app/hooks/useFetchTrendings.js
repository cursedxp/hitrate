import { useState, useCallback } from "react";

export default function useFetchTrendings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrendings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/youTube?endpoint=trending`);
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchTrendings, loading, error };
}
