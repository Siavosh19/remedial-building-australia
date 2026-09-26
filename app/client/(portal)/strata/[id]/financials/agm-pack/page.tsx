import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { currentYearStart, money, round2, yearLabel as buildYearLabel } from "@/lib/strata/levies";
import { buildStatements } from "@/lib/strata/statements";
import StatementsView from "../StatementsView";
import PrintButton from "../../levies/[periodId]/notices/PrintButton";

export const dynamic = "force-dynamic";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "long", year: "numeric" });

export default async function AgmPackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, labels } = access;
  const year = buildYearLabel(scheme.financial_year_start_month, currentYearStart(scheme.financial_year_start_month));

  const [statements, budget, openActions, capital, compliance, lots] = await Promise.all([
    buildStatements(scheme.id),
    prisma.strataBudgetItem.findMany({
      where: { scheme_id: scheme.id, year_label: year },
      orderBy: [{ fund: "asc" }, { id: "asc" }],
    }),
    prisma.strataMotion.findMany({
      where: { scheme_id: scheme.id, done: false },
      orderBy: [{ due_on: "asc" }],
      take: 30,
    }),
    prisma.strataCapitalWorksItem.findMany({
      where: { scheme_id: scheme.id },
      orderBy: [{ next_due_year: "asc" }],
      take: 20,
    }),
    prisma.strataCompliance.findMany({
      where: { scheme_id: scheme.id },
      orderBy: [{ next_due: "asc" }],
      take: 30,
    }),
    prisma.strataLot.count({ where: { scheme_id: scheme.id } }),
  ]);

  const fund1Budget = round2(budget.filter((b) => b.fund === "fund_1").reduce((s, b) => s + b.amount, 0));
  const fund2Budget = round2(budget.filter((b) => b.fund === "fund_2").reduce((s, b) => s + b.amount, 0));

  return (
    <div className="space-y-6">
      <div className="print:hidden">
        <Link
          href={`/client/strata/${scheme.id}/financials`}
          className="text-xs font-semibold text-slate-500 hover:text-slate-700"
        >
          ← Financial statements
        </Link>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">AGM pack</h1>
            <p className="mt-1 text-sm text-slate-500">
              Everything an annual general meeting needs, in one document. Print it or save as PDF and send it
              from the scheme&apos;s own address with your notice of meeting.
            </p>
          </div>
          <PrintButton />
        </div>
      </div>

      <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:rounded-none print:border-0 print:p-0 print:shadow-none">
        <header className="border-b-2 border-slate-900 pb-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Annual general meeting pack · {year}
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-slate-900">{scheme.name}</h2>
          <p className="text-sm text-slate-600">
            {scheme.plan_number ? `${scheme.plan_number} · ` : ""}
            {[scheme.address, scheme.suburb, scheme.state, scheme.postcode].filter(Boolean).join(" ")} ·{" "}
            {lots} lots
          </p>
          <p className="mt-1 text-xs text-slate-500">Prepared {AU_DATE.format(new Date())}</p>
        </header>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Proposed budget · {year}</h3>
          {budget.length === 0 ? (
            <p className="mt-2 text-sm text-slate-400">No budget has been entered for {year}.</p>
          ) : (
            <table className="mt-2 w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {budget.map((b) => (
                  <tr key={b.id}>
                    <td className="py-1.5 text-slate-700">{b.item}</td>
                    <td className="py-1.5 text-xs text-slate-400">
                      {b.fund === "fund_1" ? scheme.fund_1_name : scheme.fund_2_name}
                    </td>
                    <td className="py-1.5 text-right tabular-nums text-slate-800">{money(b.amount)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-900 font-bold">
                  <td className="py-2 text-slate-900" colSpan={2}>
                    Total to be raised
                  </td>
                  <td className="py-2 text-right tabular-nums text-slate-900">{money(fund1Budget + fund2Budget)}</td>
                </tr>
              </tbody>
            </table>
          )}
        </section>

        <section>
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Financial statements</h3>
          <StatementsView
            statements={statements}
            fundNames={{ fund_1: scheme.fund_1_name, fund_2: scheme.fund_2_name }}
          />
        </section>

        {capital.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Capital works ahead</h3>
            <table className="mt-2 w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {capital.map((c) => (
                  <tr key={c.id}>
                    <td className="py-1.5 text-slate-700">{c.item}</td>
                    <td className="py-1.5 text-right text-xs text-slate-500">{c.next_due_year ?? "—"}</td>
                    <td className="py-1.5 text-right tabular-nums text-slate-800">{money(c.estimated_cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {compliance.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Compliance &amp; insurance</h3>
            <table className="mt-2 w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {compliance.map((c) => (
                  <tr key={c.id}>
                    <td className="py-1.5 text-slate-700">{c.item}</td>
                    <td className="py-1.5 text-slate-500">{c.provider ?? "—"}</td>
                    <td className="py-1.5 text-right text-slate-600">
                      {c.next_due ? AU_DATE.format(c.next_due) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {openActions.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Outstanding actions</h3>
            <ul className="mt-2 space-y-1.5">
              {openActions.map((m) => (
                <li key={m.id} className="text-sm text-slate-700">
                  {m.action || m.motion}
                  {m.responsible ? <span className="text-slate-500"> — {m.responsible}</span> : null}
                  {m.due_on ? <span className="text-slate-500"> · due {AU_DATE.format(m.due_on)}</span> : null}
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-500">
          Prepared by the {labels.committee.toLowerCase()} of {scheme.name} from its own records. This pack is a
          summary for the meeting, not audited accounts, and does not constitute advice about what the scheme is
          required to do.
        </footer>
      </article>
    </div>
  );
}
