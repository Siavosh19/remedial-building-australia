import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { listItemsForPlan } from "@/lib/measuremap/estimating";

type Ctx = { params: Promise<{ projectId: string; drawingId: string }> };

export async function GET(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId, drawingId } = await ctx.params;
  const items = await listItemsForPlan(user.id, projectId, drawingId);
  return NextResponse.json({ items });
}
