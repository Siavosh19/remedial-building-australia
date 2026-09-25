"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RefreshCw, X } from "lucide-react";
import { money } from "@/lib/strata/levies";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type PeriodSummary = {
  id: number;
  label: string;
  dueDate: string;
  issued: boolean;
  levied: number;
  received: number;
  outstanding: number;
};

export type LevyRow = {
  levyId: number;
  lotNumber: string;
  ownerName: string | null;
  paymentReference: string | null;
  fund1: number;
  fund2: number;
  levied: number;
  received: number;
  outstanding: number;
  interest: number;
  daysOverdue: number;
  status: string;
};

export default function LeviesClient({
  schemeId,
  yearLabel,
  startYear,
  periods,
  selectedPeriodId,
  rows,
  fundNames,
  canManage,
}: {
  schemeId: number;
  yearLabel: string;
  startYear: number;
  periods: PeriodSummary[];
  selectedPeriodId: number | null;
  rows: LevyRow[];
  fundNames: { fund_1: string; fund_2: string };
  canManage: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipting, setReceipting] = useState<LevyRow | null>(null);

  const selected = periods.find((p) => p.id === selectedPeriodId) ?? null;

  async function generate() {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/client/strata/${schemeId}/levies/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year_label: yearLabel, start_year: startYear }),
    });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not build the schedule.");
      return;
    }
    router.refresh();
  }

  async function saveReceipt(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!receipting) return;
    setBusy(true);
    setError(null);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(`/api/client/strata/${schemeId}/levies/${receipting.levyId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json().catch(() => ({}));

    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not record the payment.");
      return;
    }
    setReceipting(null);
    router.refresh();
  }

  async function markIssued(period: PeriodSummary) {
    setBusy(true);
    await fetch(`/api/client/strata/${schemeId}/periods/${period.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issued: !period.issued }),
    });
    setBusy(false);
    router.refresh();
  }

  const statusTone: Record<string, string> = {
    "Paid in full": "bg-emerald-50 text-emerald-700",
    "Not yet due": "bg-slate-100 text-slate-600",
    Reminder: "bg-amber-50 text-amber-700",
    "Notice of demand": "bg-amber-50 text-amber-800",
    "Final notice": "bg-red-50 text-red-700",
    Recovery: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-5">
      {canManage && (
        <div className="flex flex-wrap justify-end gap-2">
          <button
            onClick={generate}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
          >
            <RefreshCw size={15} className={busy ? "animate-spin" : ""} />
            {periods.length === 0 ? "Build the levy schedule" : "Rebuild from the budget"}
          </button>
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      {periods.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">No levies raised for {yearLabel} yet.</p>
          <p className="mx-auto mt-2 max-w-md text-xs text-slate-400">
            Enter the budget and the roll first, then build the schedule — it apportions the year across the
            periods and across the lots by entitlement.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {periods.map((p) => {
              const active = p.id === selectedPeriodId;
              return (
                <Link
                  key={p.id}
                  href={`/client/strata/${schemeId}/levies?year=${encodeURIComponent(yearLabel)}&period=${p.id}`}
                  className={`rounded-2xl border p-4 shadow-sm transition ${
                    active ? "border-sky-700 bg-sky-50" : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{p.label}</span>
                    {p.issued && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        Issued
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Due {p.dueDate}</p>
                  <p className="mt-2 text-lg font-extrabold tabular-nums text-slate-900">{money(p.levied)}</p>
                  <p className="text-xs text-slate-500">
                    {money(p.received)} received
                    {p.outstanding > 0.005 && (
                      <span className="font-semibold text-red-700"> · {money(p.outstanding)} outstanding</span>
                    )}
                  </p>
                </Link>
              );
            })}
          </div>

          {selected && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-base font-bold text-slate-900">
                  {selected.label} · due {selected.dueDate}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/client/strata/${schemeId}/levies/${selected.id}/notices`}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Print notices
                  </Link>
                  {canManage && (
                    <button
                      onClick={() => markIssued(selected)}
                      disabled={busy}
                      className="rounded-lg bg-sky-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60"
                    >
                      {selected.issued ? "Mark not issued" : "Mark notices issued"}
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Lot</th>
                      <th className="px-4 py-3 text-right">{fundNames.fund_1}</th>
                      <th className="px-4 py-3 text-right">{fundNames.fund_2}</th>
                      <th className="px-4 py-3 text-right">Levied</th>
                      <th className="px-4 py-3 text-right">Received</th>
                      <th className="px-4 py-3 text-right">Outstanding</th>
                      <th className="px-4 py-3 text-right">Interest</th>
                      <th className="px-4 py-3">Status</th>
                      {canManage && <th className="px-4 py-3" />}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.map((r) => (
                      <tr key={r.levyId} className="hover:bg-slate-50/60">
                        <td className="px-4 py-3">
                          <span className="font-semibold text-slate-900">{r.lotNumber}</span>
                          {r.ownerName && <span className="ml-2 text-xs text-slate-500">{r.ownerName}</span>}
                          {r.paymentReference && (
                            <span className="ml-2 font-mono text-[11px] text-slate-400">{r.paymentReference}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-600">{money(r.fund1)}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-600">{money(r.fund2)}</td>
                        <td className="px-4 py-3 text-right tabular-nums font-semibold text-slate-900">{money(r.levied)}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-700">{money(r.received)}</td>
                        <td className={`px-4 py-3 text-right tabular-nums ${r.outstanding > 0.005 ? "font-semibold text-red-700" : "text-slate-400"}`}>
                          {money(r.outstanding)}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-500">
                          {r.interest > 0 ? money(r.interest) : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[r.status] ?? "bg-slate-100 text-slate-600"}`}>
                            {r.status}
                          </span>
                        </td>
                        {canManage && (
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => {
                                setReceipting(r);
                                setError(null);
                              }}
                              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              Receipt
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {receipting && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-4 sm:items-center">
          <form onSubmit={saveReceipt} className="w-full max-w-md rounded-3xl bg-white p-5 shadow-xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Record a payment · lot {receipting.lotNumber}</h2>
              <button type="button" onClick={() => setReceipting(null)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {money(receipting.outstanding)} outstanding on this levy.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label className={LABEL} htmlFor="amount">Amount received ($)</label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  required
                  autoFocus
                  defaultValue={receipting.outstanding > 0 ? receipting.outstanding.toFixed(2) : ""}
                  className={`${FIELD} mt-1.5`}
                />
              </div>
              <div>
                <label className={LABEL} htmlFor="received_on">Date received</label>
                <input
                  id="received_on"
                  name="received_on"
                  type="date"
                  required
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className={`${FIELD} mt-1.5`}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL} htmlFor="method">Method</label>
                  <select id="method" name="method" defaultValue="EFT" className={`${FIELD} mt-1.5`}>
                    <option value="EFT">EFT</option>
                    <option value="BPAY">BPAY</option>
                    <option value="Direct debit">Direct debit</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
                <div>
                  <label className={LABEL} htmlFor="reference">Reference</label>
                  <input
                    id="reference"
                    name="reference"
                    defaultValue={receipting.paymentReference ?? ""}
                    className={`${FIELD} mt-1.5`}
                  />
                </div>
              </div>
            </div>

            {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

            <div className="mt-5 flex gap-2">
              <button type="submit" disabled={busy} className="rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60">
                {busy ? "Saving…" : "Record payment"}
              </button>
              <button type="button" onClick={() => setReceipting(null)} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
