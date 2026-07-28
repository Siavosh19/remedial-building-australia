import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { getTakeoffs, createTakeoffItem } from "@/lib/measuremap/takeoffs";
import type { MeasurementType, SourceType } from "@/types/measuremap";

const TYPES = ["length", "perimeter", "area", "count"];

export async function GET(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const source = (request.nextUrl.searchParams.get("source") ?? "map") as SourceType;
  const sourceId = request.nextUrl.searchParams.get("sourceId");
  const items = await getTakeoffs(user.id, projectId, source, sourceId);
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || !TYPES.includes(body.measurement_type)) {
    return NextResponse.json({ error: "Invalid item" }, { status: 400 });
  }
  const item = await createTakeoffItem(user.id, projectId, {
    name: body.name,
    measurement_type: body.measurement_type as MeasurementType,
    colour: typeof body.colour === "string" ? body.colour : "#e11d48",
    source_type: (body.source_type === "drawing" ? "drawing" : "map") as SourceType,
    source_id: body.source_id ?? null,
    sort_order: typeof body.sort_order === "number" ? body.sort_order : 0,
  });
  if (!item) return NextResponse.json({ error: "Create failed" }, { status: 400 });
  return NextResponse.json({ item });
}
