import { NextResponse } from "next/server";
import { google } from "googleapis";
import { getBrowserLanguageAndRegion } from "@/app/utils/browserUtils";

export async function GET(request) {
  //Parameters and default values
  const { searchParams } = new URL(request.url);
  const { language, region } = getBrowserLanguageAndRegion();
  const apiKey = process.env.YOUTUBE_API_KEY;
  const endpoint = searchParams.get("endpoint");

  //Check if API key is set
  if (!apiKey) {
    console.error("YouTube API key is missing");
    return NextResponse.json(
      { error: "YouTube API key is not configured" },
      { status: 500 }
    );
  }

  //Set default parameters
  const defaultParams = {
    part: "snippet",
    maxResults: 20,
    hl: language,
    regionCode: region,
  };

  //Initialize YouTube API client
  const youtube = google.youtube({ version: "v3", auth: apiKey });

  //Fetch data based on the endpoint
  try {
    switch (endpoint) {
      case "search":
        let searchResponse = await youtube.search.list({
          ...defaultParams,
          q: searchParams.get("query"),
          order: "relevance",
        });
        return NextResponse.json(searchResponse.data);
      case "trending":
        const trendingResponse = await youtube.videos.list({
          chart: "mostPopular",
          ...defaultParams,
          part: "snippet,statistics",
        });
        return NextResponse.json(trendingResponse.data.items);
      case "video":
        const videoResponse = await youtube.videos.list({
          part: "snippet,statistics",
          id: searchParams.get("videoId") || "",
        });
        return NextResponse.json(videoResponse.data.items);
      case "intelligentSearch":
        const query = searchParams.get("query");
        let channelId;

        // Check if the query looks like a channel ID or username
        if (/^UC[\w-]{21}[AQgw]$/.test(query)) {
          channelId = query;
        } else if (/^@[\w-]+$/.test(query)) {
          // If it's a username, first get the channel ID
          const channelResponse = await youtube.channels.list({
            part: "id",
            forUsername: query.slice(1), // Remove the '@' symbol
          });
          if (
            channelResponse.data.items &&
            channelResponse.data.items.length > 0
          ) {
            channelId = channelResponse.data.items[0].id;
          }
        }

        let intelligentSearchResponse;
        if (channelId) {
          intelligentSearchResponse = await youtube.search.list({
            ...defaultParams,
            channelId: channelId,
            order: "date",
            type: "video",
          });
        } else {
          intelligentSearchResponse = await youtube.search.list({
            ...defaultParams,
            q: query,
            order: "relevance",
            type: "video",
          });
        }

        // Get video IDs from search results
        const videoIds = intelligentSearchResponse.data.items.map(
          (item) => item.id.videoId
        );

        // Fetch video statistics
        const videoStatsResponse = await youtube.videos.list({
          part: "statistics",
          id: videoIds.join(","),
        });

        // Merge search results with video statistics
        const mergedResults = intelligentSearchResponse.data.items.map(
          (item) => {
            const stats = videoStatsResponse.data.items.find(
              (statItem) => statItem.id === item.id.videoId
            );
            return {
              ...item,
              statistics: stats ? stats.statistics : null,
            };
          }
        );

        return NextResponse.json({
          ...intelligentSearchResponse.data,
          items: mergedResults,
        });

      case "channelAvatars":
        const channelIds = searchParams.get("channelIds")?.split(",") || [];
        const uniqueChannelIds = [...new Set(channelIds)];

        if (uniqueChannelIds.length === 0) {
          return NextResponse.json(
            { error: "No channel IDs provided" },
            { status: 400 }
          );
        }

        const channelResponse = await youtube.channels.list({
          part: "snippet",
          id: uniqueChannelIds.join(","),
          maxResults: 50, // Adjust as needed, max is 50
        });

        const avatarMap = {};
        channelResponse.data.items.forEach((channel) => {
          avatarMap[channel.id] = channel.snippet.thumbnails.default.url;
        });

        return NextResponse.json(avatarMap);

      default:
        return NextResponse.json(
          { error: "Invalid YouTube endpoint" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return NextResponse.json(
      { error: "Error fetching YouTube data" },
      { status: 500 }
    );
  }
}
