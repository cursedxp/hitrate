import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Initialize the YouTube API client
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY,
    });

    // Extract search parameters from the request URL
    const { searchParams } = new URL(request.url);

    // Set up parameters for the YouTube API request
    const params = {
      part: "snippet,statistics,contentDetails", // Specify which parts of the video data to retrieve
      chart: "mostPopular", // Get the most popular videos
      videoCategoryId: searchParams.get("videoCategoryId") || "0", // Filter by video category, default to "0" (all categories)
      regionCode: searchParams.get("regionCode") || "US", // Filter by region, default to "US"
      maxResults: parseInt(searchParams.get("maxResults") || "20", 10), // Number of results to return, default to 20
      pageToken: searchParams.get("pageToken"), // Token for pagination
      hl: searchParams.get("hl"), // Interface language
      forUsername: searchParams.get("forUsername"), // Filter by username
    };

    // Validate and adjust the maxResults parameter
    const validatedParams = {
      ...params,
      maxResults: Math.min(Math.max(params.maxResults, 1), 50), // Ensure maxResults is between 1 and 50
    };

    // Make the API request to get the list of videos
    const response = await youtube.videos.list(validatedParams);

    // Return the video data, including pagination tokens
    return NextResponse.json({
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
      prevPageToken: response.data.prevPageToken,
    });
  } catch (error) {
    // Log the error and return a 500 status code
    console.error("Error fetching trending videos:", error);
    return NextResponse.json(
      { error: "Error fetching trending videos" },
      { status: 500 }
    );
  }
}
