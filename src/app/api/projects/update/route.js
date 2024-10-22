import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { projectId, updates } = await req.json();

    const userRef = doc(db, "users", session.user.id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    const projects = userData.projects || {};

    if (!projects[projectId]) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Update the project
    projects[projectId] = {
      ...projects[projectId],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // Update the user document with the modified projects
    await updateDoc(userRef, { projects });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
