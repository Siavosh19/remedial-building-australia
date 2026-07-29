import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { listDrawings, createDrawingWithFile } from "@/lib/measuremap/drawings";

const ALLOWED = ["application/pdf", "image/png", "image/jpeg", "image/webp"];
const MAX_BYTES = 40 * 1024 * 1024; // 40 MB

export async function GET(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ drawings: await listDrawings(user.id, projectId) });
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "File too large (max 40 MB)" }, { status: 400 });
  const type = file.type || "";
  const okByType = ALLOWED.includes(type);
  const okByExt = /\.(pdf|png|jpe?g|webp)$/i.test(file.name);
  if (!okByType && !okByExt) return NextResponse.json({ error: "Only PDF, PNG, JPG or WEBP" }, { status: 400 });

  const bytes = Buffer.from(await file.arrayBuffer());
  const drawing = await createDrawingWithFile(user.id, projectId, {
    filename: file.name, mimeType: type || null, bytes, size: file.size,
  });
  if (!drawing) return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  return NextResponse.json({ drawing });
}
