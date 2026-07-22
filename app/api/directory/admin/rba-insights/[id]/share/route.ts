import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { shareArticleToSocial } from "@/lib/social-publish";

// Manual "Share to social" trigger for an RBA Insights article. Admin-only.
// Posts the (published) article to Facebook / Instagram / LinkedIn and returns
// the per-platform results. Deliberately manual so a human stays in control and
// sees exactly what posted — nothing fires automatically on publish.

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const articleId = Number(id);
  if (!Number.isFinite(articleId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = (await request.json().catch(() => ({}))) as { platforms?: Array<"facebook" | "instagram" | "linkedin"> };
  const platforms = Array.isArray(body?.platforms) ? body.platforms : undefined;

  try {
    const outcome = await shareArticleToSocial(articleId, platforms);
    return NextResponse.json(outcome);
  } catch (e) {
    return NextResponse.json({ error: String((e as Error)?.message ?? e) }, { status: 400 });
  }
}
