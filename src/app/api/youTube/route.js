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
        const searchResponse = youtube.search.list({
          ...defaultParams,
          q: searchParams.get("query"),
          order: "relevance",
          type: "video",
        });
        return NextResponse.json(searchResponse.data.items);
      case "trending":
        const trendingResponse = await youtube.videos.list({
          chart: "mostPopular",
          ...defaultParams,
          part: "snippet,statistics",
        });
        return NextResponse.json(trendingResponse.data.items);

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
