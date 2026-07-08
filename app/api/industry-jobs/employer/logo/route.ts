import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEmployerFromRequest } from "@/lib/jobs-auth";
import { uploadJobFile } from "@/lib/jobs-storage";

export const runtime = "nodejs";

const ALLOWED = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"]);
const MAX = 4 * 1024 * 1024; // 4 MB

// Company logo upload for the post-a-job form. Returns a public URL.
export async function POST(request: NextRequest) {
  const employer = await getEmployerFromRequest(request);
  if (!employer) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }
  const file = form.get("logo");
  if (!file || !(file instanceof File) || file.size === 0) return NextResponse.json({ error: "No file provided." }, { status: 400 });
  if (!ALLOWED.has(file.type)) return NextResponse.json({ error: "Logo must be a PNG, JPG, WEBP or SVG." }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "Logo must be under 4 MB." }, { status: 400 });

  const buf = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `logos/${employer.id}/${Date.now()}.${ext}`;
  let url: string;
  try {
    url = await uploadJobFile(path, buf, file.type);
  } catch (err) {
    console.error("[industry-jobs/logo] upload failed:", err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 502 });
  }

  await prisma.jobEmployer.update({ where: { id: employer.id }, data: { logo_url: url } }).catch(() => {});
  return NextResponse.json({ url });
}
