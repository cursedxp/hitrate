import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    const { collectionId, thumbnailUrl, userId } = await request.json();

    // Get the user document reference
    const userRef = doc(db, "users", userId);

    // Get the current user data
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get current collections array
    const userData = userSnap.data();
    const collections = userData.inspirations || [];

    // Find the specific collection
    const collectionIndex = collections.findIndex(
      (collection) => collection.id === collectionId
    );

    if (collectionIndex === -1) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    // Remove the specific thumbnail from the collection
    collections[collectionIndex].thumbnails = collections[
      collectionIndex
    ].thumbnails.filter((thumbnail) => thumbnail.url !== thumbnailUrl);

    // Update the user document with the modified collections array
    await updateDoc(userRef, {
      inspirations: collections,
    });

    return NextResponse.json({ message: "Thumbnail deleted successfully" });
  } catch (error) {
    console.error("Error deleting thumbnail:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
