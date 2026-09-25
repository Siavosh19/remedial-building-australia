import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import {
  arrearsStage,
  currentYearStart,
  daysBetween,
  interestOn,
  round2,
  yearLabel as buildYearLabel,
} from "@/lib/strata/levies";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import LeviesClient, { type LevyRow, type PeriodSummary } from "./LeviesClient";

export const dynamic = "force-dynamic";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" });

export default async function LeviesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ year?: string; period?: string }>;
}) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;
  const sp = await searchParams;

  const startYear = currentYearStart(scheme.financial_year_start_month);
  const year = sp.year?.trim() || buildYearLabel(scheme.financial_year_start_month, startYear);

  const periods = await prisma.strataLevyPeriod.findMany({
    where: { scheme_id: scheme.id, year_label: year },
    orderBy: { sequence: "asc" },
    include: {
      levies: {
        include: {
          lot: { select: { lot_number: true, owner_name: true, payment_reference: true } },
          payments: { select: { amount: true } },
        },
        orderBy: { lot_id: "asc" },
      },
    },
  });

  const now = new Date();

  const summaries: PeriodSummary[] = periods.map((p) => {
    let levied = 0;
    let received = 0;
    for (const l of p.levies) {
      levied += l.fund_1_amount + l.fund_2_amount;
      received += l.payments.reduce((s, x) => s + x.amount, 0);
    }
    return {
      id: p.id,
      label: p.label,
      dueDate: AU_DATE.format(p.due_date),
      issued: p.issued_at !== null,
      levied: round2(levied),
      received: round2(received),
      outstanding: round2(levied - received),
    };
  });

  // Default to the period that is due next, falling back to the last one.
  const requested = Number(sp.period);
  const fallback =
    periods.find((p) => p.due_date.getTime() >= now.getTime()) ?? periods[periods.length - 1] ?? null;
  const selected = periods.find((p) => p.id === requested) ?? fallback;

  const rows: LevyRow[] = (selected?.levies ?? []).map((l) => {
    const levied = round2(l.fund_1_amount + l.fund_2_amount);
    const received = round2(l.payments.reduce((s, x) => s + x.amount, 0));
    const outstanding = round2(levied - received);
    const daysOverdue = Math.max(0, daysBetween(selected!.due_date, now));
    const stage = arrearsStage(outstanding, now >= selected!.due_date ? daysOverdue : -1);

    return {
      levyId: l.id,
      lotNumber: l.lot.lot_number,
      ownerName: l.lot.owner_name,
      paymentReference: l.lot.payment_reference,
      fund1: l.fund_1_amount,
      fund2: l.fund_2_amount,
      levied,
      received,
      outstanding,
      interest: interestOn({
        outstanding,
        dueDate: selected!.due_date,
        graceDays: scheme.arrears_grace_days,
        annualRatePercent: scheme.arrears_interest_rate,
        asOf: now,
      }),
      daysOverdue,
      status: outstanding <= 0.005 ? "Paid in full" : stage.label,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Levies · {year}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Contributions raised from the budget, apportioned by entitlement, and the money received against them.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="levies" />

      <LeviesClient
        schemeId={scheme.id}
        yearLabel={year}
        startYear={startYear}
        canManage={canManage}
        periods={summaries}
        selectedPeriodId={selected?.id ?? null}
        rows={rows}
        fundNames={{ fund_1: scheme.fund_1_name, fund_2: scheme.fund_2_name }}
      />
    </div>
  );
}
