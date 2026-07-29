import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { listItemsForPlan } from "@/lib/measuremap/estimating";
import { clearPageTakeoffs } from "@/lib/measuremap/drawings";

type Ctx = { params: Promise<{ projectId: string; drawingId: string }> };

export async function GET(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId, drawingId } = await ctx.params;
  const pageId = request.nextUrl.searchParams.get("pageId") ?? undefined;
  const items = await listItemsForPlan(user.id, projectId, drawingId, pageId);
  return NextResponse.json({ items });
}

// Clear all takeoffs on a page ("delete page" contents).
export async function DELETE(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId, drawingId } = await ctx.params;
  const pageId = request.nextUrl.searchParams.get("pageId");
  if (!pageId) return NextResponse.json({ error: "pageId required" }, { status: 400 });
  const ok = await clearPageTakeoffs(user.id, projectId, drawingId, pageId);
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}
