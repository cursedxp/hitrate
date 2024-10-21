import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function POST(req) {
  const { projectId, updates } = await req.json();

  if (!projectId || !updates || Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "Missing projectId or updates" },
      { status: 400 }
    );
  }

  try {
    // Get the user document
    const userRef = doc(db, "users", req.user.id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const projects = userDoc.data().projects;
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Apply updates to the project
    Object.keys(updates).forEach((key) => {
      if (key === "thumbnailUrls") {
        // If updating thumbnailUrls, append new URLs to the existing array
        projects[projectIndex].thumbnailUrls = [
          ...(projects[projectIndex].thumbnailUrls || []),
          ...updates.thumbnailUrls,
        ];
      } else {
        projects[projectIndex][key] = updates[key];
      }
    });

    // Update the updatedAt timestamp
    projects[projectIndex].updatedAt = new Date().toISOString();

    await updateDoc(userRef, { projects });

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
