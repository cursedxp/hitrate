import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY,
    });

    const { searchParams } = new URL(request.url);
    const regionCode = searchParams.get("regionCode");
    const videoCategoryId = searchParams.get("videoCategoryId");
    const maxResults = searchParams.get("maxResults") || "20";
    const pageToken = searchParams.get("pageToken");
    const hl = searchParams.get("hl");

    const params = {
      part: "snippet,statistics,contentDetails",
      chart: "mostPopular",
      maxResults: Math.min(parseInt(maxResults), 20),
    };

    if (regionCode) params.regionCode = regionCode;
    if (videoCategoryId) params.videoCategoryId = videoCategoryId;
    if (pageToken) params.pageToken = pageToken;
    if (hl) params.hl = hl;

    const response = await youtube.videos.list(params);

    return NextResponse.json({
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
      prevPageToken: response.data.prevPageToken,
    });
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    return NextResponse.json(
      { error: "Error fetching trending videos" },
      { status: 500 }
    );
  }
}
