import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { ensureDrawingPages, renamePage } from "@/lib/measuremap/drawings";

type Ctx = { params: Promise<{ projectId: string; drawingId: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { drawingId } = await ctx.params;
  const body = await request.json().catch(() => null);
  // Rename a page.
  if (body && typeof body.page_id === "string" && typeof body.name === "string") {
    const ok = await renamePage(user.id, drawingId, body.page_id, body.name);
    return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
  }
  // Sync page count (create missing per-page records).
  if (body && typeof body.page_count === "number" && body.page_count >= 1) {
    const pages = await ensureDrawingPages(user.id, drawingId, body.page_count);
    if (!pages) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ pages });
  }
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
