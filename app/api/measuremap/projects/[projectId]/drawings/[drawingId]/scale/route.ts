import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { setPageScale } from "@/lib/measuremap/drawings";

type Ctx = { params: Promise<{ projectId: string; drawingId: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { drawingId } = await ctx.params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body.pixels_per_metre !== "number" || !(body.pixels_per_metre > 0)) {
    return NextResponse.json({ error: "Invalid scale" }, { status: 400 });
  }
  const ok = await setPageScale(user.id, drawingId, {
    pixels_per_metre: body.pixels_per_metre,
    page_width: typeof body.page_width === "number" ? body.page_width : undefined,
    page_height: typeof body.page_height === "number" ? body.page_height : undefined,
  });
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}
