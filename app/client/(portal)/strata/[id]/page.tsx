import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { currentYearStart, money, round2, yearLabel as buildYearLabel } from "@/lib/strata/levies";
import SchemeTabs from "../SchemeTabs";
import StrataHelp from "../StrataHelp";
import SchemeSettingsForm from "./SchemeSettingsForm";

export const dynamic = "force-dynamic";

export default async function SchemeOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, labels, canManage } = access;
  const now = new Date();
  const year = buildYearLabel(scheme.financial_year_start_month, currentYearStart(scheme.financial_year_start_month));

  const [lotCount, memberCount, totals, levies] = await Promise.all([
    prisma.strataLot.count({ where: { scheme_id: scheme.id } }),
    prisma.strataMember.count({ where: { scheme_id: scheme.id, status: "active" } }),
    prisma.strataLot.aggregate({
      where: { scheme_id: scheme.id },
      _sum: { levy_basis: true },
    }),
    prisma.strataLevy.findMany({
      where: { scheme_id: scheme.id, period: { year_label: year } },
      include: { period: { select: { due_date: true } }, payments: { select: { amount: true } } },
    }),
  ]);

  let raised = 0;
  let received = 0;
  let overdue = 0;
  const lotsOwing = new Set<number>();
  for (const l of levies) {
    const amount = l.fund_1_amount + l.fund_2_amount;
    const paid = l.payments.reduce((s, p) => s + p.amount, 0);
    raised += amount;
    received += paid;
    if (l.period.due_date <= now && amount - paid > 0.005) {
      overdue += amount - paid;
      lotsOwing.add(l.lot_id);
    }
  }

  const roll = [
    { label: "Lots on the roll", value: lotCount.toLocaleString("en-AU") },
    { label: `Total ${labels.levyBasis.toLowerCase()}`, value: (totals._sum.levy_basis ?? 0).toLocaleString("en-AU") },
    { label: "People with access", value: memberCount.toLocaleString("en-AU") },
  ];

  const finances = [
    { label: `Raised in ${year}`, value: money(round2(raised)), tone: "text-slate-900" },
    { label: "Received", value: money(round2(received)), tone: "text-slate-900" },
    { label: "Overdue", value: money(round2(overdue)), tone: overdue > 0.005 ? "text-red-700" : "text-slate-900" },
    { label: "Lots in arrears", value: lotsOwing.size.toLocaleString("en-AU"), tone: lotsOwing.size > 0 ? "text-red-700" : "text-slate-900" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Link href="/client/strata" className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← Strata management
        </Link>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">{scheme.name}</h1>
            <p className="mt-1 text-sm text-slate-500">
              {scheme.plan_number ? `${scheme.plan_number} · ` : ""}
              {[scheme.address, scheme.suburb, scheme.state, scheme.postcode].filter(Boolean).join(" ")}
            </p>
          </div>
          {!canManage && (
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              Read-only access
            </span>
          )}
        </div>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="overview" />

      <div className="grid gap-3 sm:grid-cols-3">
        {roll.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{s.label}</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">{s.value}</p>
          </div>
        ))}
      </div>

      {levies.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {finances.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{s.label}</p>
              <p className={`mt-1 text-2xl font-extrabold tabular-nums ${s.tone}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {lotCount === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center shadow-sm">
          <p className="text-sm text-slate-600">Start with the strata roll — the lots and their entitlements.</p>
          <Link
            href={`/client/strata/${scheme.id}/lots`}
            className="mt-3 inline-block rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Enter the lots
          </Link>
        </div>
      ) : levies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center shadow-sm">
          <p className="text-sm text-slate-600">
            The roll is in. Next: set the budget for {year}, then build the levy schedule from it.
          </p>
          <Link
            href={`/client/strata/${scheme.id}/budget`}
            className="mt-3 inline-block rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Set the budget
          </Link>
        </div>
      ) : null}

      <SchemeSettingsForm
        canManage={canManage}
        authority={labels.authority}
        scheme={{
          id: scheme.id,
          name: scheme.name,
          plan_number: scheme.plan_number,
          address: scheme.address,
          suburb: scheme.suburb,
          postcode: scheme.postcode,
          fund_1_name: scheme.fund_1_name,
          fund_2_name: scheme.fund_2_name,
          financial_year_start_month: scheme.financial_year_start_month,
          levy_frequency: scheme.levy_frequency,
          levy_notice_days: scheme.levy_notice_days,
          arrears_grace_days: scheme.arrears_grace_days,
          arrears_interest_rate: scheme.arrears_interest_rate,
          committee_spend_limit: scheme.committee_spend_limit,
        }}
      />
    </div>
  );
}
