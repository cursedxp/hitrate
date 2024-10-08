export function Formatter() {
  return {
    formatViewCount: (count) => {
      if (count == null) return "N/A"; // Handle undefined or null
      count = Number(count); // Ensure count is a number
      if (isNaN(count)) return "N/A"; // Handle non-numeric values

      if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + "M";
      } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + "K";
      } else {
        return count.toString();
      }
    },
    formatPublishedAt: (publishedAt) => {
      if (!publishedAt) return "N/A"; // Handle undefined or null
      const now = new Date();
      const published = new Date(publishedAt);
      const diffInSeconds = Math.floor((now - published) / 1000);

      if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
      if (diffInSeconds < 3600)
        return `${Math.floor(diffInSeconds / 60)} minutes ago`;
      if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      if (diffInSeconds < 2592000)
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
      if (diffInSeconds < 31536000)
        return `${Math.floor(diffInSeconds / 2592000)} months ago`;
      return `${Math.floor(diffInSeconds / 31536000)} years ago`;
    },
  };
}
