import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import SchemeTabs from "../SchemeTabs";
import SchemeSettingsForm from "./SchemeSettingsForm";

export const dynamic = "force-dynamic";

export default async function SchemeOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, labels, canManage } = access;

  const [lotCount, memberCount, totals] = await Promise.all([
    prisma.strataLot.count({ where: { scheme_id: scheme.id } }),
    prisma.strataMember.count({ where: { scheme_id: scheme.id, status: "active" } }),
    prisma.strataLot.aggregate({
      where: { scheme_id: scheme.id },
      _sum: { levy_basis: true, ownership_basis: true },
    }),
  ]);

  const stats = [
    { label: "Lots on the roll", value: lotCount },
    { label: `Total ${labels.levyBasis.toLowerCase()}`, value: totals._sum.levy_basis ?? 0 },
    { label: "People with access", value: memberCount },
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

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{s.label}</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {Number(s.value).toLocaleString("en-AU")}
            </p>
          </div>
        ))}
      </div>

      {lotCount === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center shadow-sm">
          <p className="text-sm text-slate-600">Start with the strata roll — the lots and their entitlements.</p>
          <Link
            href={`/client/strata/${scheme.id}/lots`}
            className="mt-3 inline-block rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Enter the lots
          </Link>
        </div>
      )}

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
