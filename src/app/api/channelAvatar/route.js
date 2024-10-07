import { google } from "googleapis";
import { NextResponse } from "next/server";

// This function handles GET requests to fetch a channel's avatar
export async function GET(request) {
  // Extract the channelId from the request's search parameters
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get("channelId");

  // Check if channelId is provided
  if (!channelId) {
    // If no channelId is provided, return a 400 Bad Request response
    return NextResponse.json(
      { error: "Channel ID is required" },
      { status: 400 }
    );
  }

  try {
    // Initialize the YouTube API client
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY,
    });

    // Make a request to the YouTube API to fetch channel details
    const response = await youtube.channels.list({
      part: "snippet",
      id: channelId,
      fields: "items/snippet/thumbnails", // Only request the thumbnail fields to minimize data transfer
    });

    // Extract the avatar URL from the response
    // If no avatar is found, default to null
    const avatarUrl =
      response.data.items[0]?.snippet?.thumbnails?.default?.url || null;

    // Return the avatar URL in the response
    return NextResponse.json({ avatarUrl });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error fetching channel avatar", error);
    // Return a 500 Internal Server Error response
    return NextResponse.json(
      { error: "Error fetching channel avatar" },
      { status: 500 }
    );
  }
}
