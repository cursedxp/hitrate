import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user.id;

    const newProject = {
      id: Date.now().toString(),
      name: "Untitled",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      projects: arrayUnion(newProject),
    });

    return NextResponse.json({ projectId: newProject.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating new project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
