import { getBrowserLanguageAndRegion } from "../utils/browserUtils";

export async function apiCall(params) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value != null && value !== "")
  );
  const searchParams = new URLSearchParams(filteredParams);
  try {
    const response = await fetch(`/api/youTube?${searchParams}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error:", response.status, errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}

const getDefaultParams = (includeStatistics = true) => {
  const { language, region } = getBrowserLanguageAndRegion();
  return {
    part: includeStatistics ? "snippet,statistics" : "snippet",
    maxResults: "20",
    hl: language,
    regionCode: region,
    fields: includeStatistics
      ? "items(id,snippet(title,channelId,thumbnails,description,publishedAt),statistics)"
      : "",
  };
};

const youtubeServices = {
  getTrendingVideos: (params = {}) =>
    apiCall({
      ...getDefaultParams(true),
      chart: "mostPopular",
      ...params,
    }),

  getSearchResults: (query, params = {}) =>
    apiCall({
      ...getDefaultParams(false),
      part: "snippet",
      type: "video",
      q: query,
      order: "relevance",
      ...params,
    }),

  getChannelVideos: (channelId, params = {}) =>
    apiCall({
      ...getDefaultParams(true),
      type: "video",
      channelId: channelId,
      order: "date",
      ...params,
    }),

  intelligentSearch: async (input, params = {}) => {
    // Check if the input looks like a channel ID or username
    const isChannelSearch =
      /^UC[\w-]{21}[AQgw]$/.test(input) || /^@[\w-]+$/.test(input);

    if (isChannelSearch) {
      // If it's a channel ID, use it directly
      if (/^UC[\w-]{21}[AQgw]$/.test(input)) {
        return youtubeServices.getChannelVideos(input, params);
      }
      // If it's a username, first get the channel ID
      const channelResponse = await apiCall({
        part: "id",
        forUsername: input.slice(1), // Remove the '@' symbol
        type: "channel",
      });
      if (channelResponse.items && channelResponse.items.length > 0) {
        const channelId = channelResponse.items[0].id;
        return youtubeServices.getChannelVideos(channelId, params);
      }
    }

    // If it's not a channel search or channel not found, perform a general search
    return youtubeServices.getSearchResults(input, params);
  },
};

export default youtubeServices;
