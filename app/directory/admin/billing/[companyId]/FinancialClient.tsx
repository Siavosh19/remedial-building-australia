"use client";

import { useState } from "react";
import type { Txn } from "./page";

const money = (cents: number, ccy: string) => `$${(cents / 100).toLocaleString("en-AU", { minimumFractionDigits: 2 })} ${ccy}`;
const STATUS_CLS: Record<string, string> = {
  succeeded: "bg-emerald-100 text-emerald-700",
  refunded: "bg-rose-100 text-rose-700",
  partial_refund: "bg-amber-100 text-amber-800",
  failed: "bg-slate-100 text-slate-500",
};

export default function FinancialClient({
  companyId, companyName, hasCustomer, subActive, transactions,
}: { companyId: number; companyName: string; hasCustomer: boolean; subActive: boolean; transactions: Txn[] }) {
  const [txns, setTxns] = useState(transactions);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function refund(t: Txn, partial: boolean) {
    let amountCents: number | null = null;
    if (partial) {
      const remaining = t.amount - t.refunded;
      const input = prompt(`Partial refund for ${companyName} — amount in dollars (max $${(remaining / 100).toFixed(2)}):`);
      if (input == null) return;
      const dollars = parseFloat(input);
      if (!Number.isFinite(dollars) || dollars <= 0) { setMsg({ type: "err", text: "Enter a valid amount." }); return; }
      amountCents = Math.round(dollars * 100);
    } else {
      if (!confirm(`Refund the full remaining ${money(t.amount - t.refunded, t.currency)} of this transaction to ${companyName}?`)) return;
    }
    const alsoCancel = subActive && confirm("Also cancel their subscription and revert the listing to free Basic?");

    setBusy(t.id); setMsg(null);
    const res = await fetch("/api/directory/admin/directory-refund", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId, chargeId: t.id, amountCents, alsoCancel }),
    });
    const data = await res.json();
    setBusy(null);
    if (!res.ok) { setMsg({ type: "err", text: data.error ?? "Refund failed." }); return; }
    const refundedNow = data.refundedCents as number;
    setTxns((prev) => prev.map((x) => x.id === t.id
      ? { ...x, refunded: x.refunded + refundedNow, status: x.refunded + refundedNow >= x.amount ? "refunded" : "partial_refund" }
      : x));
    setMsg({ type: "ok", text: `Refunded ${money(refundedNow, data.currency)}${data.cancelled ? " · subscription cancelled" : ""}.` });
  }

  if (!hasCustomer) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-500">This business has no Stripe customer yet — no payments to show.</div>;
  }

  return (
    <div className="space-y-4">
      {msg && (
        <div className={`rounded-xl px-4 py-3 text-sm ${msg.type === "ok" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>{msg.text}</div>
      )}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Date</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Receipt</th><th className="px-4 py-3 text-right">Refund</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {txns.map((t) => {
              const remaining = t.amount - t.refunded;
              return (
                <tr key={t.id}>
                  <td className="px-4 py-3 text-slate-700">{new Date(t.date).toLocaleString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {money(t.amount, t.currency)}
                    {t.refunded > 0 && <span className="ml-1 text-xs font-normal text-rose-600">(−{money(t.refunded, t.currency)})</span>}
                  </td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_CLS[t.status] ?? "bg-slate-100 text-slate-500"}`}>{t.status.replace("_", " ")}</span></td>
                  <td className="px-4 py-3">{t.receiptUrl ? <a href={t.receiptUrl} target="_blank" className="text-sky-700 hover:underline">View receipt ↗</a> : <span className="text-slate-400">—</span>}</td>
                  <td className="px-4 py-3 text-right">
                    {remaining > 0 && t.status !== "failed" ? (
                      <div className="flex justify-end gap-2">
                        <button disabled={busy === t.id} onClick={() => refund(t, false)} className="rounded-lg bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-rose-500 disabled:opacity-60">{busy === t.id ? "…" : "Full"}</button>
                        <button disabled={busy === t.id} onClick={() => refund(t, true)} className="rounded-lg border border-rose-300 px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60">Partial</button>
                      </div>
                    ) : <span className="text-xs text-slate-400">{t.refunded > 0 ? "refunded" : "—"}</span>}
                  </td>
                </tr>
              );
            })}
            {txns.length === 0 && <tr><td colSpan={5} className="px-4 py-4 text-slate-400">No transactions yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
