// app/api/admin/push/route.ts
import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // Add all changes
    await execAsync("git add .");
    
    // Commit with timestamp
    const date = new Date().toISOString().split('T')[0];
    await execAsync(`git commit -m "Admin update: ${date}"`);
    
    // Push to GitHub
    await execAsync("git push");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Git push failed:", error);
    // If there's nothing to commit, git exits with 1. We can ignore that specific error.
    if (error.stdout?.includes("nothing to commit") || error.stderr?.includes("nothing to commit")) {
       return NextResponse.json({ success: true, message: "Nothing new to push." });
    }
    return NextResponse.json({ error: "Failed to push changes to GitHub." }, { status: 500 });
  }
}
