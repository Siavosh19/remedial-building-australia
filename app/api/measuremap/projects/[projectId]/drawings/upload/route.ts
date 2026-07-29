import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { createUploadTarget, finalizeDrawing } from "@/lib/measuremap/drawings";

type Ctx = { params: Promise<{ projectId: string }> };
const ALLOWED_EXT = /\.(pdf|png|jpe?g|webp)$/i;

// POST → issue a signed upload URL so the browser can PUT the file straight to
// Supabase Storage (avoids Vercel's ~4.5 MB serverless request-body limit).
export async function POST(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await request.json().catch(() => null);
  const filename = body?.filename;
  if (typeof filename !== "string" || !ALLOWED_EXT.test(filename)) return NextResponse.json({ error: "Only PDF, PNG, JPG or WEBP" }, { status: 400 });
  const target = await createUploadTarget(user.id, projectId, filename);
  if (!target) return NextResponse.json({ error: "Could not start upload" }, { status: 500 });
  return NextResponse.json(target);
}

// PATCH → finalize once the direct upload finishes: store size/mime + page rows.
export async function PATCH(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.drawing_id !== "string") return NextResponse.json({ error: "drawing_id required" }, { status: 400 });
  const drawing = await finalizeDrawing(user.id, projectId, body.drawing_id, {
    mimeType: typeof body.mime_type === "string" ? body.mime_type : null,
    size: Number(body.size) || 0,
    pageCount: Number(body.page_count) || 1,
  });
  if (!drawing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ drawing });
}
