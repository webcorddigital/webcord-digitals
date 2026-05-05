// app/api/admin/upload/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;
    const filename = formData.get("filename") as string;

    if (!file || !folder || !filename) {
      return NextResponse.json({ error: "Missing file, folder, or filename" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Secure the folder path
    const safeFolder = path.basename(folder);
    const safeFilename = path.basename(filename);

    const targetDir = path.join(process.cwd(), "public", "images", safeFolder);
    const targetPath = path.join(targetDir, safeFilename);

    // Create folder if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetPath, buffer);

    return NextResponse.json({ success: true, path: `/images/${safeFolder}/${safeFilename}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
