"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { money } from "@/lib/strata/levies";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type ArrearsRow = {
  lotId: number;
  lotNumber: string;
  ownerName: string | null;
  outstanding: number;
  interest: number;
  oldestDue: string | null;
  daysOverdue: number;
  stage: number;
  stageLabel: string;
  nextAction: string;
  needsCommittee: boolean;
  history: { id: number; stage: number; action: string; on: string; note: string | null }[];
};

const TONE: Record<number, string> = {
  0: "bg-emerald-50 text-emerald-700",
  1: "bg-amber-50 text-amber-700",
  2: "bg-amber-100 text-amber-800",
  3: "bg-red-50 text-red-700",
  4: "bg-red-100 text-red-800",
};

export default function ArrearsClient({
  schemeId,
  rows,
  canManage,
}: {
  schemeId: number;
  rows: ArrearsRow[];
  canManage: boolean;
}) {
  const router = useRouter();
  const [logging, setLogging] = useState<ArrearsRow | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const owing = rows.filter((r) => r.outstanding > 0.005);
  const totalOwing = owing.reduce((s, r) => s + r.outstanding, 0);
  const totalInterest = owing.reduce((s, r) => s + r.interest, 0);

  async function record(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!logging) return;
    setBusy(true);
    setError(null);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(`/api/client/strata/${schemeId}/arrears`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, lot_id: logging.lotId, stage: logging.stage }),
    });
    const json = await res.json().catch(() => ({}));

    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not record that.");
      return;
    }
    setLogging(null);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total outstanding</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">{money(totalOwing)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Interest accrued</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">{money(totalInterest)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Lots in arrears</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">{owing.length}</p>
        </div>
      </div>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Lot</th>
              <th className="px-4 py-3 text-right">Outstanding</th>
              <th className="px-4 py-3 text-right">Interest</th>
              <th className="px-4 py-3 text-right">Days overdue</th>
              <th className="px-4 py-3">Stage</th>
              <th className="px-4 py-3">Next action</th>
              {canManage && <th className="px-4 py-3" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <Fragment key={r.lotId}>
                <tr className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setExpanded(expanded === r.lotId ? null : r.lotId)}
                      className="text-left"
                    >
                      <span className="font-semibold text-slate-900">{r.lotNumber}</span>
                      {r.ownerName && <span className="ml-2 text-xs text-slate-500">{r.ownerName}</span>}
                      {r.history.length > 0 && (
                        <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                          {r.history.length} logged
                        </span>
                      )}
                    </button>
                  </td>
                  <td className={`px-4 py-3 text-right tabular-nums ${r.outstanding > 0.005 ? "font-semibold text-red-700" : "text-slate-400"}`}>
                    {money(r.outstanding)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-500">
                    {r.interest > 0 ? money(r.interest) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-600">
                    {r.outstanding > 0.005 && r.daysOverdue > 0 ? r.daysOverdue : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${TONE[r.stage] ?? "bg-slate-100 text-slate-600"}`}>
                      {r.stageLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {r.nextAction}
                    {r.needsCommittee && (
                      <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        Committee
                      </span>
                    )}
                  </td>
                  {canManage && (
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => {
                          setLogging(r);
                          setError(null);
                        }}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Log action
                      </button>
                    </td>
                  )}
                </tr>
                {expanded === r.lotId && (
                  <tr className="bg-slate-50/70">
                    <td colSpan={canManage ? 7 : 6} className="px-4 py-3">
                      {r.history.length === 0 ? (
                        <p className="text-xs text-slate-500">Nothing logged for this lot yet.</p>
                      ) : (
                        <ul className="space-y-1.5">
                          {r.history.map((h) => (
                            <li key={h.id} className="text-xs text-slate-600">
                              <span className="font-semibold text-slate-800">{h.on}</span> — {h.action}
                              {h.note && <span className="text-slate-500"> · {h.note}</span>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {logging && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-4 sm:items-center">
          <form onSubmit={record} className="w-full max-w-md rounded-3xl bg-white p-5 shadow-xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Log an action · lot {logging.lotNumber}</h2>
              <button type="button" onClick={() => setLogging(null)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Records what the {logging.needsCommittee ? "committee" : "scheme"} has done. Nothing is sent from
              here — you send it yourself, and this keeps the history.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label className={LABEL} htmlFor="action">What was done</label>
                <select id="action" name="action" defaultValue={logging.nextAction} className={`${FIELD} mt-1.5`}>
                  <option>Reminder sent</option>
                  <option>Notice of demand issued</option>
                  <option>Final notice issued</option>
                  <option>Referred for recovery</option>
                  <option>Payment plan agreed</option>
                  <option>Owner contacted</option>
                </select>
              </div>
              <div>
                <label className={LABEL} htmlFor="actioned_on">Date</label>
                <input id="actioned_on" name="actioned_on" type="date" required defaultValue={new Date().toISOString().slice(0, 10)} className={`${FIELD} mt-1.5`} />
              </div>
              <div>
                <label className={LABEL} htmlFor="note">Note (optional)</label>
                <input id="note" name="note" className={`${FIELD} mt-1.5`} />
              </div>
            </div>

            {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

            <div className="mt-5 flex gap-2">
              <button type="submit" disabled={busy} className="rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60">
                {busy ? "Saving…" : "Record"}
              </button>
              <button type="button" onClick={() => setLogging(null)} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
