import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { listAnnotations, createAnnotation } from "@/lib/measuremap/estimating";

const TYPES = ["text", "line", "arrow", "rect", "rectfill", "circle", "circlefill", "triangle"];

export async function GET(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const annotations = await listAnnotations(user.id, projectId);
  return NextResponse.json({ annotations });
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => null);
  if (!body || !TYPES.includes(body.annotation_type) || body.geometry == null) {
    return NextResponse.json({ error: "Invalid annotation" }, { status: 400 });
  }
  const created = await createAnnotation(user.id, projectId, {
    annotation_type: body.annotation_type,
    name: typeof body.name === "string" ? body.name : null,
    colour: typeof body.colour === "string" ? body.colour : "#dc2626",
    geometry: body.geometry,
  });
  if (!created) return NextResponse.json({ error: "Create failed" }, { status: 400 });
  return NextResponse.json({ annotation: { id: created.id } });
}
