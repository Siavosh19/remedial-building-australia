import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { updateMeasurement, deleteMeasurement } from "@/lib/measuremap/takeoffs";

type Ctx = { params: Promise<{ projectId: string; measurementId: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { measurementId } = await ctx.params;
  const body = await request.json().catch(() => ({}));
  const patch: Record<string, unknown> = {};
  if (body.geometry != null) patch.geometry = body.geometry;
  if (typeof body.calculated_quantity === "number") patch.calculated_quantity = body.calculated_quantity;
  if (typeof body.label === "string") patch.label = body.label;
  const ok = await updateMeasurement(user.id, measurementId, patch);
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { measurementId } = await ctx.params;
  const ok = await deleteMeasurement(user.id, measurementId);
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}
