import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { deleteDrawing } from "@/lib/measuremap/drawings";

type Ctx = { params: Promise<{ projectId: string; drawingId: string }> };

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { drawingId } = await ctx.params;
  const ok = await deleteDrawing(user.id, drawingId);
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}
