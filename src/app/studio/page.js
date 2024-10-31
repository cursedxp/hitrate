import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { headers } from "next/headers";
import StudioClient from "./StudioClient";

async function getInitialTrending() {
  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");

  const response = await fetch(
    `${protocol}://${host}/api/youTube?endpoint=trending`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending data");
  }

  return response.json();
}

// Helper function to serialize the session data
function serializeSession(session) {
  if (!session) return null;

  return {
    ...session,
    user: {
      ...session.user,
      // Convert Timestamp to ISO string if it exists
      lastLoginAt: session.user?.lastLoginAt
        ? new Date(session.user.lastLoginAt.seconds * 1000).toISOString()
        : null,
      // Ensure other date fields are also serialized if they exist
      createdAt: session.user?.createdAt
        ? new Date(session.user.createdAt.seconds * 1000).toISOString()
        : null,
      // Add any other Timestamp fields that need conversion
    },
  };
}

export default async function Dashboard() {
  const [session, trendingData] = await Promise.all([
    getServerSession(authOptions),
    getInitialTrending(),
  ]);

  const serializedSession = serializeSession(session);

  return (
    <StudioClient session={serializedSession} trendingData={trendingData} />
  );
}
