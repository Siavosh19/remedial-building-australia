import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { currentYearStart, normaliseFrequency, periodsForYear, yearLabel as buildYearLabel } from "@/lib/strata/levies";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import BudgetClient from "./BudgetClient";

export const dynamic = "force-dynamic";

const PERIOD_WORD: Record<string, string> = {
  monthly: "month",
  quarterly: "quarter",
  half_yearly: "half year",
  yearly: "year",
};

export default async function BudgetPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ year?: string }>;
}) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;

  const startYear = currentYearStart(scheme.financial_year_start_month);
  const defaultLabel = buildYearLabel(scheme.financial_year_start_month, startYear);
  const year = (await searchParams).year?.trim() || defaultLabel;

  const frequency = normaliseFrequency(scheme.levy_frequency);
  const periodCount = periodsForYear(frequency, scheme.financial_year_start_month, startYear).length;

  const items = await prisma.strataBudgetItem.findMany({
    where: { scheme_id: scheme.id, year_label: year },
    orderBy: [{ fund: "asc" }, { id: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Budget · {year}</h1>
        <p className="mt-1 text-sm text-slate-500">
          What the scheme expects to spend this year. The levies are worked out from these totals.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="budget" />

      <BudgetClient
        schemeId={scheme.id}
        yearLabel={year}
        canManage={canManage}
        periodCount={periodCount}
        periodWord={PERIOD_WORD[frequency] ?? "period"}
        fundNames={{ fund_1: scheme.fund_1_name, fund_2: scheme.fund_2_name }}
        items={items.map((i) => ({
          id: i.id,
          category: i.category,
          item: i.item,
          fund: i.fund,
          amount: i.amount,
        }))}
      />
    </div>
  );
}
