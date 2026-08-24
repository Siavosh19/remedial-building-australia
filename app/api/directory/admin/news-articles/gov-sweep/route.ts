import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { sweepForGovernmentOriginals } from "@/lib/gov-news-import";

// Work through the backlog of articles that report on a government matter but
// link to somebody else's coverage, pulling in the agency's own publication as
// a new draft. One click = a small batch, because each lookup runs web searches
// and reads the official page.
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const result = await sweepForGovernmentOriginals({
      limit: 2,
      // Leave room inside the function timeout to write the rows and reply.
      budgetMs: 46000,
      lookup: { effort: "medium", maxUses: 5 },
    });
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[admin/news-articles/gov-sweep] failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Government sweep failed" },
      { status: 500 },
    );
  }
}
