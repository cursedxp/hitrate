import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { getUserFromToken } from "@/app/utils/session";

export async function GET(req) {
  const sessionToken = req.cookies.get("next-auth.session-token").value;
  const userId = await getUserFromToken(sessionToken);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    const projects = userData.projects || {};

    const projectsArray = Object.entries(projects).map(([id, project]) => ({
      id,
      ...project,
    }));

    return NextResponse.json({ projects: projectsArray }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
