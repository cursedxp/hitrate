export default function updateTitlesOfProject() {
  const updateTitles = async (projectId, title, titles) => {
    try {
      const response = await fetch("/api/projects/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          updates: { titles: titles, title: title },
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(
          `Failed to update titles: ${response.status} - ${text}`
        );
      }
    } catch (error) {
      console.error("Error updating titles:", error);
    }
  };
  return { updateTitles };
}
