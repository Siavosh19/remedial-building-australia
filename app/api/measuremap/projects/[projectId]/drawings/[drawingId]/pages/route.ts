import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { ensureDrawingPages } from "@/lib/measuremap/drawings";

type Ctx = { params: Promise<{ projectId: string; drawingId: string }> };

// Client detects a PDF's real page count (via pdf.js) and syncs it here; we
// create any missing per-page records and return the full page list.
export async function PATCH(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { drawingId } = await ctx.params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body.page_count !== "number" || !(body.page_count >= 1)) {
    return NextResponse.json({ error: "Invalid page_count" }, { status: 400 });
  }
  const pages = await ensureDrawingPages(user.id, drawingId, body.page_count);
  if (!pages) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ pages });
}
