import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWriteAdmin } from "@/lib/admin-auth";
import { URGENCY_OPTIONS } from "@/lib/quote-options";
import { LEAD_PRICE_FALLBACK_CENTS } from "@/lib/lead-pricing";

const VALID_URGENCY = new Set<string>(URGENCY_OPTIONS.map((o) => o.id));

// Admin-managed per-urgency lead prices. GET returns the current table merged
// with defaults; PATCH upserts one row per urgency.
export async function GET(request: NextRequest) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;
  const rows = await prisma.leadPrice.findMany();
  const byUrgency: Record<string, number> = { ...LEAD_PRICE_FALLBACK_CENTS };
  for (const r of rows) byUrgency[r.urgency] = r.amount_cents;
  const prices = URGENCY_OPTIONS.map((o) => ({ urgency: o.id, label: o.label, amount_cents: byUrgency[o.id] ?? 0 }));
  return NextResponse.json({ prices });
}

export async function PATCH(request: NextRequest) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const items = Array.isArray(body?.prices) ? body.prices : [];
  const updates: { urgency: string; amount_cents: number }[] = [];
  for (const it of items) {
    const urgency = String(it?.urgency ?? "");
    const cents = Math.round(Number(it?.amount_cents));
    if (!VALID_URGENCY.has(urgency)) continue;
    if (!Number.isFinite(cents) || cents < 0) continue;
    updates.push({ urgency, amount_cents: cents });
  }
  if (!updates.length) return NextResponse.json({ error: "No valid prices." }, { status: 400 });

  await prisma.$transaction(
    updates.map((u) =>
      prisma.leadPrice.upsert({
        where: { urgency: u.urgency },
        create: { urgency: u.urgency, amount_cents: u.amount_cents },
        update: { amount_cents: u.amount_cents },
      }),
    ),
  );

  return NextResponse.json({ success: true, updated: updates.length });
}
