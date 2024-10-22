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
      console.log("User document:", userData);

      if (!userData.projects) {
        return NextResponse.json(
          { error: "User has no projects field" },
          { status: 404 }
        );
      }

      if (typeof userData.projects !== "object") {
        return NextResponse.json(
          { error: "Projects field is not an object" },
          { status: 404 }
        );
      }

      if (Object.keys(userData.projects).length === 0) {
        return NextResponse.json(
          { error: "Projects object is empty" },
          { status: 404 }
        );
      }

      const project = userData.projects[projectId];

      if (project) {
        return NextResponse.json(
          { project: { id: projectId, ...project } },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            error: `Project with ID ${projectId} not found in user's projects`,
          },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "User document not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
