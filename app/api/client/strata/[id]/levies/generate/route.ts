import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { apportion, normaliseFrequency, periodsForYear, round2 } from "@/lib/strata/levies";

/**
 * Build (or rebuild) a year's levy schedule from the budget.
 *
 * Rebuilding is safe to run whenever the budget or the roll changes:
 *   • a period that already exists keeps its due date — a committee may have
 *     moved it, and regenerating must not quietly undo that;
 *   • levy amounts are recalculated in place, so receipts already recorded
 *     against a levy stay attached to it;
 *   • a levy is only removed when its lot has left the roll AND nothing has
 *     ever been receipted against it.
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const yearLabel = String(body?.year_label ?? "").trim();
  const startYear = Number(body?.start_year);
  if (!yearLabel || !Number.isFinite(startYear)) {
    return NextResponse.json({ error: "Missing financial year." }, { status: 400 });
  }

  const scheme = access.scheme;

  const [budget, lots] = await Promise.all([
    prisma.strataBudgetItem.findMany({ where: { scheme_id: scheme.id, year_label: yearLabel } }),
    prisma.strataLot.findMany({
      where: { scheme_id: scheme.id },
      select: { id: true, levy_basis: true },
      orderBy: { id: "asc" },
    }),
  ]);

  if (lots.length === 0) {
    return NextResponse.json({ error: "Add the lots to the roll before generating levies." }, { status: 400 });
  }
  if (budget.length === 0) {
    return NextResponse.json({ error: "Enter the budget for this year first." }, { status: 400 });
  }

  const fund1Total = round2(budget.filter((b) => b.fund === "fund_1").reduce((s, b) => s + b.amount, 0));
  const fund2Total = round2(budget.filter((b) => b.fund === "fund_2").reduce((s, b) => s + b.amount, 0));

  const frequency = normaliseFrequency(scheme.levy_frequency);
  const generated = periodsForYear(frequency, scheme.financial_year_start_month, startYear);
  const perPeriod1 = round2(fund1Total / generated.length);
  const perPeriod2 = round2(fund2Total / generated.length);

  const shares = lots.map((l) => ({ lotId: l.id, basis: l.levy_basis }));
  const split = apportion(perPeriod1, perPeriod2, shares);

  await prisma.$transaction(async (tx) => {
    for (const period of generated) {
      const existing = await tx.strataLevyPeriod.findUnique({
        where: {
          scheme_id_year_label_sequence: {
            scheme_id: scheme.id,
            year_label: yearLabel,
            sequence: period.sequence,
          },
        },
      });

      const row =
        existing ??
        (await tx.strataLevyPeriod.create({
          data: {
            scheme_id: scheme.id,
            year_label: yearLabel,
            sequence: period.sequence,
            label: period.label,
            due_date: period.dueDate,
          },
        }));

      for (const amounts of split) {
        await tx.strataLevy.upsert({
          where: { period_id_lot_id: { period_id: row.id, lot_id: amounts.lotId } },
          create: {
            scheme_id: scheme.id,
            period_id: row.id,
            lot_id: amounts.lotId,
            fund_1_amount: amounts.fund1,
            fund_2_amount: amounts.fund2,
          },
          update: { fund_1_amount: amounts.fund1, fund_2_amount: amounts.fund2 },
        });
      }

      // Lots that have left the roll: drop their levy only when nothing was
      // ever receipted against it, so history is never silently destroyed.
      const stale = await tx.strataLevy.findMany({
        where: { period_id: row.id, lot_id: { notIn: lots.map((l) => l.id) } },
        select: { id: true, _count: { select: { payments: true } } },
      });
      const removable = stale.filter((s) => s._count.payments === 0).map((s) => s.id);
      if (removable.length > 0) {
        await tx.strataLevy.deleteMany({ where: { id: { in: removable } } });
      }
    }
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_scheme",
    entityId: String(scheme.id),
    action: "levies_generated",
    newValue: { year: yearLabel, periods: generated.length, fund1Total, fund2Total, lots: lots.length },
  });

  return NextResponse.json({ ok: true, periods: generated.length, fund1Total, fund2Total });
}
