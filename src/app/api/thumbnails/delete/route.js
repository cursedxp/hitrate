import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME);

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId, thumbnailUrl } = await req.json();

  if (!projectId || !thumbnailUrl) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    // Extract the file name from the URL
    const fileName = thumbnailUrl.split("/").pop().split("?")[0];
    const filePath = `${session.user.id}/${projectId}/${fileName}`;

    // Delete the file from Google Cloud Storage
    await bucket.file(filePath).delete();

    // Update Firebase to remove the thumbnail URL
    const userRef = doc(db, "users", session.user.id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    let projects = userData.projects;

    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    projects[projectIndex].thumbnailUrls = projects[
      projectIndex
    ].thumbnailUrls.filter((url) => url !== thumbnailUrl);
    projects[projectIndex].updatedAt = new Date().toISOString();

    // Update the user document with the modified projects array
    await updateDoc(userRef, { projects });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting thumbnail:", error);
    return NextResponse.json(
      { error: "Deletion failed", details: error.message },
      { status: 500 }
    );
  }
}
