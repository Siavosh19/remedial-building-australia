import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { updateItem, deleteItem } from "@/lib/measuremap/estimating";

type Ctx = { params: Promise<{ projectId: string; itemId: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { itemId } = await ctx.params;
  const body = await request.json().catch(() => ({}));
  const patch: Record<string, unknown> = {};
  if (typeof body.name === "string") patch.name = body.name;
  if (typeof body.description === "string" || body.description === null) patch.description = body.description;
  if (typeof body.colour === "string") patch.colour = body.colour;
  if (typeof body.category_id === "string" || body.category_id === null) patch.category_id = body.category_id;
  if (typeof body.is_visible === "boolean") patch.is_visible = body.is_visible;
  if (typeof body.is_locked === "boolean") patch.is_locked = body.is_locked;
  if (typeof body.sort_order === "number") patch.sort_order = body.sort_order;
  if (typeof body.unit === "string") patch.unit = body.unit;
  if (typeof body.row_type === "string") patch.row_type = body.row_type;
  if (typeof body.quantity_override === "number" || body.quantity_override === null) patch.quantity_override = body.quantity_override;
  for (const k of ["manual_quantity", "waste_percent", "material_rate", "labour_rate", "equipment_rate", "subcontract_rate", "other_rate", "lump_sum_amount", "markup_percent"]) {
    if (typeof body[k] === "number" && Number.isFinite(body[k])) patch[k] = body[k];
  }
  const ok = await updateItem(user.id, itemId, patch);
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { itemId } = await ctx.params;
  const ok = await deleteItem(user.id, itemId);
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}
