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

// Helper function to serialize timestamps
function serializeTimestamp(timestamp) {
  if (!timestamp) return null;

  if (timestamp instanceof Date) {
    return timestamp.toISOString();
  }

  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toISOString();
  }

  return timestamp;
}

// Helper function to serialize arrays and objects
function serializeData(data) {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map((item) => serializeData(item));
  }

  if (typeof data === "object") {
    const serialized = {};
    for (const [key, value] of Object.entries(data)) {
      if (
        key.toLowerCase().includes("date") ||
        key.toLowerCase().includes("at")
      ) {
        serialized[key] = serializeTimestamp(value);
      } else {
        serialized[key] = serializeData(value);
      }
    }
    return serialized;
  }

  return data;
}

// Helper function to serialize the session data
function serializeSession(session) {
  if (!session) return null;

  return {
    ...session,
    user: {
      ...session.user,
      lastLoginAt: serializeTimestamp(session.user?.lastLoginAt),
      createdAt: serializeTimestamp(session.user?.createdAt),
      projects: serializeData(session.user?.projects),
      inspirations: serializeData(session.user?.inspirations),
      // Serialize any other potential timestamp fields
      updatedAt: serializeTimestamp(session.user?.updatedAt),
      subscriptionCurrentPeriodEnd: serializeTimestamp(
        session.user?.subscriptionCurrentPeriodEnd
      ),
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
