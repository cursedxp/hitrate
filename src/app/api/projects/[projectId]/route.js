import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  const { projectId } = params;

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userDoc = await getDoc(doc(db, "users", session.user.id));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const project = userData.projects.find((p) => p.id === projectId);

      if (project) {
        return NextResponse.json({ project }, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
