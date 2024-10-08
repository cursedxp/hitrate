import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error("YouTube API key is missing");
    return NextResponse.json(
      { error: "YouTube API key is not configured" },
      { status: 500 }
    );
  }

  const youtubeParams = new URLSearchParams(searchParams);
  youtubeParams.append("key", apiKey);

  // Determine the endpoint based on the 'chart' parameter
  let endpoint;
  if (youtubeParams.get("chart") === "mostPopular") {
    endpoint = "videos";
  } else if (youtubeParams.get("type") === "channel") {
    endpoint = "channels";
  } else {
    endpoint = "search";
  }

  try {
    console.log(
      `Calling YouTube ${endpoint} API with params:`,
      Object.fromEntries(youtubeParams)
    );
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/${endpoint}?${youtubeParams}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("YouTube API error:", response.status, errorText);
      return NextResponse.json(
        { error: `YouTube API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in YouTube API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
