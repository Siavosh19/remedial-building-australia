import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { createMeasurement } from "@/lib/measuremap/estimating";
import type { SourceType } from "@/types/measuremap";

export async function POST(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => null);
  // estimate_item_id is the shared link; accept legacy takeoff_item_id as a fallback.
  const itemId = typeof body?.estimate_item_id === "string" ? body.estimate_item_id
    : typeof body?.takeoff_item_id === "string" ? body.takeoff_item_id : null;
  if (!body || !itemId || body.geometry == null || typeof body.calculated_quantity !== "number") {
    return NextResponse.json({ error: "Invalid measurement" }, { status: 400 });
  }
  const created = await createMeasurement(user.id, projectId, {
    estimate_item_id: itemId,
    category_id: typeof body.category_id === "string" ? body.category_id : null,
    geometry: body.geometry,
    calculated_quantity: body.calculated_quantity,
    unit: typeof body.unit === "string" ? body.unit : "m",
    measurement_type: typeof body.measurement_type === "string" ? body.measurement_type : "area",
    measurement_mode: body.measurement_mode === "free" ? "free" : "structured",
    name: typeof body.name === "string" ? body.name : null,
    colour: typeof body.colour === "string" ? body.colour : null,
    label: body.label ?? null,
    source_type: (body.source_type === "drawing" ? "drawing" : "map") as SourceType,
    plan_id: typeof body.plan_id === "string" ? body.plan_id : null,
    plan_page_id: typeof body.plan_page_id === "string" ? body.plan_page_id : null,
    sort_order: typeof body.sort_order === "number" ? body.sort_order : 0,
  });
  if (!created) return NextResponse.json({ error: "Create failed (item not owned)" }, { status: 400 });
  return NextResponse.json({ measurement: { id: created.id } });
}
