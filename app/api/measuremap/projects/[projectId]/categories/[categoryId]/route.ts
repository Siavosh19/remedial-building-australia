import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { updateCategory, deleteCategory } from "@/lib/measuremap/estimating";

type Ctx = { params: Promise<{ projectId: string; categoryId: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { categoryId } = await ctx.params;
  const body = await request.json().catch(() => ({}));
  const patch: Record<string, unknown> = {};
  if (typeof body.name === "string") patch.name = body.name;
  if (typeof body.description === "string" || body.description === null) patch.description = body.description;
  if (typeof body.sort_order === "number") patch.sort_order = body.sort_order;
  const ok = await updateCategory(user.id, categoryId, patch);
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { categoryId } = await ctx.params;
  const ok = await deleteCategory(user.id, categoryId);
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}
