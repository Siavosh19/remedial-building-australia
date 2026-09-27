import { NextResponse } from "next/server";
import { requireSchemeAccess } from "@/lib/strata/access";
import { readAllowance } from "@/lib/strata/ai";

/**
 * Allowance-only read for the always-visible AI usage badge on the launcher
 * button. The full /ai GET also loads a topic's message thread (up to 60 rows)
 * — unnecessary weight for something fetched on every scheme page load.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const allowance = await readAllowance(access.scheme.id);
  return NextResponse.json({ allowance });
}
