import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/app/lib/firebase/firebase.config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET);

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const projectId = formData.get("projectId");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const fileName = `${session.user.id}/${projectId}/${Date.now()}-${file.name}`;
  const fileUpload = bucket.file(fileName);

  try {
    await fileUpload.save(Buffer.from(buffer), {
      metadata: {
        contentType: file.type,
      },
    });

    const [url] = await fileUpload.getSignedUrl({
      action: "read",
      expires: "03-01-2500",
    });

    // Update Firebase with the new thumbnail URL
    const userRef = doc(db, "users", session.user.id);
    await updateDoc(userRef, {
      [`projects.${projectId}.thumbnailUrls`]: arrayUnion(url),
    });

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
