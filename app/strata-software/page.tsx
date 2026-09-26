import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { formatAud, pricing } from "@/lib/strata/entitlement";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Free strata management software for self-managed schemes | Remedial Building Australia",
  description:
    "Run your own owners corporation: strata roll, levies, arrears, defects, compliance and financial statements. Free for a single scheme of 13 lots or fewer, and 80c per lot per month beyond that.",
  alternates: { canonical: "/strata-software" },
};

const FEATURES: { group: string; items: string[] }[] = [
  {
    group: "The money",
    items: [
      "Budget, then levies apportioned by entitlement",
      "Printable notices with a payment reference per lot",
      "Arrears with interest and an escalation ladder",
      "Invoices against budget lines, budget versus actual",
      "Income and expenditure, balance sheet, AGM pack",
    ],
  },
  {
    group: "The building",
    items: [
      "Strata roll, service addresses, mortgagees, tenancies",
      "Defect register, and quotes from verified trades",
      "Work orders, warranties and defects liability dates",
      "Compliance and insurance dates that warn you early",
      "Ten-year capital works plan with a fund projection",
    ],
  },
  {
    group: "The paperwork",
    items: [
      "Meetings, motions and tracked actions",
      "Correspondence log that partly writes itself",
      "By-laws, breaches, owner applications, claims, keys",
      "Bank statement import that receipts by reference",
      "An assistant that reads your records and drafts for you",
    ],
  },
];

export default async function StrataSoftwarePage() {
  const p = await pricing();
  const perLot = formatAud(p.centsPerLotMonthly);

  const examples = [20, 50, 100].map((lots) => ({
    lots,
    monthly: formatAud(lots * p.centsPerLotMonthly),
    yearly: formatAud(lots * p.centsPerLotMonthly * p.yearlyMonthsCharged),
  }));

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-16">
        <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">
          Free strata software
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-sky-950 md:text-5xl">
          Run your own scheme, without the management fee
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Everything a self-managed owners corporation actually needs — the roll, the levies, the arrears, the
          defects, the compliance dates and the financial statements — in one place. Free for a single scheme of{" "}
          {p.freeLotLimit} lots or fewer, and {perLot} per lot a month beyond that.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/client/strata"
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-7 py-4 text-base font-semibold text-white transition hover:bg-red-800"
          >
            Set up your scheme
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-7 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Browse verified trades
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          {p.trialMonths} months free to start, no card needed.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map((group) => (
            <div key={group.group} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-extrabold text-sky-950">{group.group}</h2>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="text-2xl font-extrabold tracking-tight text-sky-950 md:text-3xl">What it costs</h2>
        <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
          One strata plan of {p.freeLotLimit} lots or fewer is free, permanently — not a trial. Larger schemes,
          and accounts running more than one plan, pay {perLot} per lot a month.
        </p>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">Scheme</th>
                <th className="px-5 py-3 text-right">Monthly</th>
                <th className="px-5 py-3 text-right">Yearly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr className="bg-emerald-50/60">
                <td className="px-5 py-3 font-semibold text-emerald-900">
                  Up to {p.freeLotLimit} lots, one plan
                </td>
                <td className="px-5 py-3 text-right font-bold text-emerald-800">Free</td>
                <td className="px-5 py-3 text-right font-bold text-emerald-800">Free</td>
              </tr>
              {examples.map((row) => (
                <tr key={row.lots}>
                  <td className="px-5 py-3 text-slate-700">{row.lots} lots</td>
                  <td className="px-5 py-3 text-right tabular-nums text-slate-900">{row.monthly}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-slate-900">
                    {row.yearly}
                    <span className="ml-2 text-xs font-semibold text-emerald-700">2 months free</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          For comparison, strata management fees in Australia run to several hundred dollars per lot per year
          before disbursements. A 20-lot scheme paying a manager is commonly quoted around $8,000–9,000 a year.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20 pt-6">
        <div className="rounded-3xl bg-sky-950 p-8 text-white md:p-10">
          <h2 className="text-2xl font-extrabold md:text-3xl">Built for every Australian scheme</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/80">
            Choose your state and the wording follows it — owners corporation or body corporate, capital works or
            sinking fund, unit entitlement or lot liability. Your committee sets its own dates, rates and limits,
            because what your scheme must do is set by your state&rsquo;s law, not by us.
          </p>
          <Link
            href="/client/strata"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-semibold text-sky-950 transition hover:bg-slate-100"
          >
            Start free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-slate-400">
          This is record-keeping software. It is not strata management, it does not provide legal, financial or
          insurance advice, and it never holds your scheme&rsquo;s money. Confirm your obligations with your state
          or territory authority.
        </p>
      </section>
    </main>
  );
}
