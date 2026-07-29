import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { signedUrlForDrawing } from "@/lib/measuremap/drawings";

type Ctx = { params: Promise<{ projectId: string; drawingId: string }> };

export async function GET(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { drawingId } = await ctx.params;
  const url = await signedUrlForDrawing(user.id, drawingId);
  if (!url) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ url });
}
