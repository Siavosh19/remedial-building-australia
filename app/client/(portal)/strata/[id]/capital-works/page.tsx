import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { currentYearStart, round2, yearLabel as buildYearLabel } from "@/lib/strata/levies";
import { project, receiptsByFund, spendByFund } from "@/lib/strata/funds";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import CapitalWorksClient, { type CapitalRow } from "./CapitalWorksClient";

export const dynamic = "force-dynamic";

export default async function CapitalWorksPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;
  const startYear = currentYearStart(scheme.financial_year_start_month);
  const year = buildYearLabel(scheme.financial_year_start_month, startYear);

  const [items, levies, expenses, budget] = await Promise.all([
    prisma.strataCapitalWorksItem.findMany({
      where: { scheme_id: scheme.id },
      orderBy: [{ next_due_year: "asc" }, { item: "asc" }],
    }),
    prisma.strataLevy.findMany({
      where: { scheme_id: scheme.id },
      select: { fund_1_amount: true, fund_2_amount: true, payments: { select: { amount: true } } },
    }),
    prisma.strataExpense.findMany({
      where: { scheme_id: scheme.id },
      select: { fund: true, amount: true, status: true },
    }),
    prisma.strataBudgetItem.findMany({
      where: { scheme_id: scheme.id, year_label: year, fund: "fund_2" },
      select: { amount: true },
    }),
  ]);

  // What is actually in the long-term fund: what was put in, less what has
  // been paid out of it, on top of the opening balance the committee entered.
  const received = receiptsByFund(levies);
  const spent = spendByFund(expenses, true);
  const balance = round2((scheme.fund_2_opening ?? 0) + received.fund2 - spent.fund2);
  const annualContribution = round2(budget.reduce((sum, b) => sum + b.amount, 0));

  const rows: CapitalRow[] = items.map((i) => ({
    id: i.id,
    item: i.item,
    lastDoneYear: i.last_done_year,
    cycleYears: i.cycle_years,
    nextDueYear: i.next_due_year,
    estimatedCost: i.estimated_cost,
    notes: i.notes,
  }));

  const projection = project({
    items: rows.map((r) => ({
      id: r.id,
      item: r.item,
      cycleYears: r.cycleYears,
      nextDueYear: r.nextDueYear,
      estimatedCost: r.estimatedCost,
    })),
    openingBalance: balance,
    annualContribution,
    startYear: startYear + 1,
  });

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Capital works plan</h1>
        <p className="mt-1 text-sm text-slate-500">
          The big jobs ahead and whether the {scheme.fund_2_name.toLowerCase()} covers them.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="capitalWorks" />

      <CapitalWorksClient
        schemeId={scheme.id}
        canManage={canManage}
        rows={rows}
        projection={projection}
        fundName={scheme.fund_2_name}
        openingBalance={balance}
        annualContribution={annualContribution}
      />
    </div>
  );
}
