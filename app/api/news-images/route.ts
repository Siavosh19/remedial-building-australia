import { NextResponse } from "next/server";
import { readdirSync, existsSync } from "fs";
import { join, extname } from "path";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export async function GET() {
  const dir = join(process.cwd(), "public", "Images", "News");
  let images: string[] = [];

  // Exclude non-news files (logo, homepage banner). All news images use lowercase-hyphenated names.
  const EXCLUDE = new Set(["Home page.jpg", "ChatGPT Image Apr 4, 2025, 03_51_18 PM.png"]);
  if (existsSync(dir)) {
    images = readdirSync(dir)
      .filter((f) => IMAGE_EXTS.has(extname(f).toLowerCase()) && !EXCLUDE.has(f))
      .sort()
      .map((f) => `/Images/News/${f}`);
  }

  return NextResponse.json(images, {
    headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=60" },
  });
}
