import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { collectionId } = await request.json();
    const userRef = doc(db, "users", session.user.id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userSnap.data();
    const collections = userData.collections || [];

    // Find and remove the collection
    const updatedCollections = collections.filter(
      (collection) => collection.id !== collectionId
    );

    // Update the user document with the modified collections array
    await updateDoc(userRef, {
      collections: updatedCollections,
    });

    return NextResponse.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
