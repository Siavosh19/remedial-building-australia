import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { VALID_CATEGORIES } from "@/lib/news-categories";

// Remove a news article from the website (hard delete from industry_news).
export async function DELETE(request: NextRequest) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const { error } = await supabaseAdmin.from("industry_news").delete().eq("id", id);
  if (error) {
    console.error("[admin/news-articles] delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

const ALLOWED_STATUS = new Set(["published", "rejected", "draft"]);
const ALLOWED_CATEGORY = new Set<string>(VALID_CATEGORIES);

// Update an article. Accepts a JSON body with any of:
//   status   — "recycle" a rejected article (→ published) or take one off (→ rejected)
//   category — re-categorise
//   title / summary / industry_impact — edit the on-site content (e.g. to fill in
//   a recycled article that has no AI summary).
export async function PATCH(request: NextRequest) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object")
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const update: Record<string, string> = {};

  if (typeof body.status === "string") {
    if (!ALLOWED_STATUS.has(body.status))
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    update.status = body.status;
  }
  if (typeof body.category === "string") {
    if (!ALLOWED_CATEGORY.has(body.category))
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    update.category = body.category;
  }
  if (typeof body.title === "string") update.title = body.title.trim().slice(0, 300);
  if (typeof body.summary === "string") update.summary = body.summary.trim();
  if (typeof body.industry_impact === "string") update.industry_impact = body.industry_impact.trim();

  if (Object.keys(update).length === 0)
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  const { error } = await supabaseAdmin.from("industry_news").update(update).eq("id", id);
  if (error) {
    console.error("[admin/news-articles] update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
