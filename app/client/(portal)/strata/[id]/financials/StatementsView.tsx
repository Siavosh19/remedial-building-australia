import { money } from "@/lib/strata/levies";
import type { FundPair, Statements } from "@/lib/strata/statements";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "long", year: "numeric" });

function Row({
  label,
  amounts,
  bold,
  indent,
  tone,
}: {
  label: string;
  amounts: FundPair;
  bold?: boolean;
  indent?: boolean;
  tone?: string;
}) {
  const cell = `px-4 py-2.5 text-right tabular-nums ${bold ? "font-bold" : ""} ${tone ?? "text-slate-800"}`;
  return (
    <tr className={bold ? "bg-slate-50" : undefined}>
      <td className={`px-4 py-2.5 ${indent ? "pl-8" : ""} ${bold ? "font-bold text-slate-900" : "text-slate-700"}`}>
        {label}
      </td>
      <td className={cell}>{money(amounts.fund1)}</td>
      <td className={cell}>{money(amounts.fund2)}</td>
      <td className={`${cell} border-l border-slate-200`}>{money(amounts.total)}</td>
    </tr>
  );
}

/** The statements, rendered the same way on screen and in the AGM pack. */
export default function StatementsView({
  statements,
  fundNames,
}: {
  statements: Statements;
  fundNames: { fund_1: string; fund_2: string };
}) {
  const { income, expenditure, surplus, balanceSheet: bs } = statements;
  const balanced = Math.abs(bs.check.total) < 0.01;

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900 text-left text-xs font-semibold uppercase tracking-wide text-white">
            <tr>
              <th className="px-4 py-3">Income &amp; expenditure to {AU_DATE.format(statements.asAt)}</th>
              <th className="px-4 py-3 text-right">{fundNames.fund_1}</th>
              <th className="px-4 py-3 text-right">{fundNames.fund_2}</th>
              <th className="border-l border-white/20 px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <Row label="Contributions raised" amounts={income.levies} />
            <Row label="Interest charged on overdue contributions" amounts={income.interest} />
            <Row label="Total income" amounts={income.total} bold />
            {expenditure.lines.length === 0 ? (
              <tr>
                <td className="px-4 py-2.5 pl-8 text-slate-400" colSpan={4}>
                  No expenditure recorded
                </td>
              </tr>
            ) : (
              expenditure.lines.map((line) => (
                <Row key={line.label} label={line.label} amounts={line.amounts} indent />
              ))
            )}
            <Row label="Total expenditure" amounts={expenditure.total} bold />
            <Row
              label="Surplus / (deficit)"
              amounts={surplus}
              bold
              tone={surplus.total < 0 ? "text-red-700" : "text-emerald-700"}
            />
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900 text-left text-xs font-semibold uppercase tracking-wide text-white">
            <tr>
              <th className="px-4 py-3">Balance sheet as at {AU_DATE.format(statements.asAt)}</th>
              <th className="px-4 py-3 text-right">{fundNames.fund_1}</th>
              <th className="px-4 py-3 text-right">{fundNames.fund_2}</th>
              <th className="border-l border-white/20 px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <Row label="Cash at bank" amounts={bs.cash} />
            <Row label="Contributions receivable" amounts={bs.receivable} />
            <Row label="Total assets" amounts={bs.totalAssets} bold />
            <Row label="Less: invoices unpaid" amounts={bs.creditors} />
            <Row label="Net assets" amounts={bs.netAssets} bold />
            <Row label="Fund balance brought forward" amounts={bs.openingFunds} indent />
            <Row label="Surplus / (deficit) for the period" amounts={surplus} indent />
            <Row label="Fund balance" amounts={bs.closingFunds} bold />
            <Row
              label="Check — net assets less fund balance"
              amounts={bs.check}
              bold
              tone={balanced ? "text-emerald-700" : "text-red-700"}
            />
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400">
        Accrual basis: income is what has fallen due, expenditure is what has been invoiced. Cash at bank starts
        from the opening balances on the Overview tab. These are a record-keeping summary, not audited accounts.
      </p>
    </div>
  );
}
