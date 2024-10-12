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
        const searchResponse = await youtube.search.list({
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

        if (channelId) {
          // If we have a channel ID, fetch videos for that channel
          const channelVideosResponse = await youtube.search.list({
            ...defaultParams,
            channelId: channelId,
            order: "date",
            type: "video",
          });
          return NextResponse.json(channelVideosResponse.data);
        } else {
          // If it's not a channel search or channel not found, perform a general search
          const searchResponse = await youtube.search.list({
            ...defaultParams,
            q: query,
            order: "relevance",
            type: "video",
          });
          return NextResponse.json(searchResponse.data);
        }

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
