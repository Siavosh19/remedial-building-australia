import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { arrearsStage, daysBetween, interestOn, round2 } from "@/lib/strata/levies";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import ArrearsClient, { type ArrearsRow } from "./ArrearsClient";

export const dynamic = "force-dynamic";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" });

export default async function ArrearsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;
  const now = new Date();

  const [lots, levies, actions] = await Promise.all([
    prisma.strataLot.findMany({
      where: { scheme_id: scheme.id },
      orderBy: { id: "asc" },
      select: { id: true, lot_number: true, owner_name: true },
    }),
    // Only periods that have actually fallen due can be in arrears.
    prisma.strataLevy.findMany({
      where: { scheme_id: scheme.id, period: { due_date: { lte: now } } },
      include: { period: { select: { due_date: true } }, payments: { select: { amount: true } } },
    }),
    prisma.strataArrearsAction.findMany({
      where: { scheme_id: scheme.id },
      orderBy: { actioned_on: "desc" },
    }),
  ]);

  const byLot = new Map<number, { outstanding: number; interest: number; oldestDue: Date | null }>();
  for (const levy of levies) {
    const owing = round2(
      levy.fund_1_amount + levy.fund_2_amount - levy.payments.reduce((s, p) => s + p.amount, 0),
    );
    const entry = byLot.get(levy.lot_id) ?? { outstanding: 0, interest: 0, oldestDue: null };
    if (owing > 0.005) {
      entry.outstanding = round2(entry.outstanding + owing);
      entry.interest = round2(
        entry.interest +
          interestOn({
            outstanding: owing,
            dueDate: levy.period.due_date,
            graceDays: scheme.arrears_grace_days,
            annualRatePercent: scheme.arrears_interest_rate,
            asOf: now,
          }),
      );
      if (!entry.oldestDue || levy.period.due_date < entry.oldestDue) entry.oldestDue = levy.period.due_date;
    }
    byLot.set(levy.lot_id, entry);
  }

  const rows: ArrearsRow[] = lots.map((lot) => {
    const entry = byLot.get(lot.id) ?? { outstanding: 0, interest: 0, oldestDue: null };
    const daysOverdue = entry.oldestDue ? Math.max(0, daysBetween(entry.oldestDue, now)) : 0;
    const stage = arrearsStage(entry.outstanding, daysOverdue);

    return {
      lotId: lot.id,
      lotNumber: lot.lot_number,
      ownerName: lot.owner_name,
      outstanding: entry.outstanding,
      interest: entry.interest,
      oldestDue: entry.oldestDue ? AU_DATE.format(entry.oldestDue) : null,
      daysOverdue,
      stage: stage.stage,
      stageLabel: stage.label,
      nextAction: stage.nextAction,
      needsCommittee: stage.needsCommittee,
      history: actions
        .filter((a) => a.lot_id === lot.id)
        .map((a) => ({
          id: a.id,
          stage: a.stage,
          action: a.action,
          on: AU_DATE.format(a.actioned_on),
          note: a.note,
        })),
    };
  });

  // Lots that owe something first, largest debt at the top.
  rows.sort((a, b) => b.outstanding - a.outstanding || a.lotNumber.localeCompare(b.lotNumber, "en-AU"));

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Arrears</h1>
        <p className="mt-1 text-sm text-slate-500">
          What is owed across every period that has fallen due, and what has been done about it.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="arrears" />

      <ArrearsClient schemeId={scheme.id} rows={rows} canManage={canManage} />
    </div>
  );
}
