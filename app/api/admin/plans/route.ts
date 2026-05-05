// app/api/admin/plans/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const filePath = path.join(process.cwd(), "data", "content.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error) {
    console.error("Failed to read plans:", error);
    return NextResponse.json({ error: "Failed to read plans" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const filePath = path.join(process.cwd(), "data", "content.json");
    
    // Write back to content.json with nice formatting
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf8");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update plans:", error);
    return NextResponse.json({ error: "Failed to update plans" }, { status: 500 });
  }
}
