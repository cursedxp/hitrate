import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Helper function to serialize timestamps
function serializeTimestamps(data) {
  if (!data) return null;

  if (data instanceof Date) {
    return data.toISOString();
  }

  if (data?.toDate) {
    return data.toDate().toISOString();
  }

  if (Array.isArray(data)) {
    return data.map((item) => serializeTimestamps(item));
  }

  if (typeof data === "object") {
    const serialized = {};
    for (const [key, value] of Object.entries(data)) {
      serialized[key] = serializeTimestamps(value);
    }
    return serialized;
  }

  return data;
}

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userDoc = await getDoc(doc(db, "users", session.user.id));
    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    const collections = userData.inspirations || {};

    const collectionsArray = Object.entries(collections).map(
      ([id, collection]) => ({
        id,
        ...serializeTimestamps(collection),
      })
    );

    return NextResponse.json(
      { collections: collectionsArray },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
