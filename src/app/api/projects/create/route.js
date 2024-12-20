import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const newProject = {
      id: Date.now().toString(),
      name: "Untitled Project",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: "",
      titles: [],
      thumbnailUrls: [],
      description: "This is a generated thumbnail description",
      statistics: {
        viewCount: 100.0,
      },
    };

    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    let projects = userData.projects || [];
    projects.push(newProject);

    await updateDoc(userRef, { projects });

    return NextResponse.json({ projectId: newProject.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating new project:", error);
    return NextResponse.json(
      { error: "Failed to create project", details: error.message },
      { status: 500 }
    );
  }
}
