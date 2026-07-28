import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { createMeasurement } from "@/lib/measuremap/takeoffs";
import type { SourceType } from "@/types/measuremap";

export async function POST(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.takeoff_item_id !== "string" || body.geometry == null || typeof body.calculated_quantity !== "number") {
    return NextResponse.json({ error: "Invalid measurement" }, { status: 400 });
  }
  const created = await createMeasurement(user.id, projectId, {
    takeoff_item_id: body.takeoff_item_id,
    geometry: body.geometry,
    calculated_quantity: body.calculated_quantity,
    unit: typeof body.unit === "string" ? body.unit : "m",
    label: body.label ?? null,
    source_type: (body.source_type === "drawing" ? "drawing" : "map") as SourceType,
    source_id: body.source_id ?? null,
    sort_order: typeof body.sort_order === "number" ? body.sort_order : 0,
  });
  if (!created) return NextResponse.json({ error: "Create failed (item not owned)" }, { status: 400 });
  return NextResponse.json({ measurement: { id: created.id } });
}
