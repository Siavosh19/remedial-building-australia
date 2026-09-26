"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { money } from "@/lib/strata/levies";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

function show(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}

export type ExpenseRow = {
  id: number;
  invoiceDate: string;
  invoiceNumber: string | null;
  supplier: string;
  budgetItemId: number | null;
  budgetItemName: string | null;
  fund: "fund_1" | "fund_2";
  amount: number;
  gst: number | null;
  status: "unpaid" | "paid" | "disputed";
  dueOn: string | null;
  paidOn: string | null;
  method: string | null;
  workOrderId: number | null;
  contractorId: number | null;
  notes: string | null;
  overdue: boolean;
};

export type BudgetLine = { id: number; item: string; fund: "fund_1" | "fund_2"; budget: number; actual: number };

const STATUS_TONE: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-700",
  unpaid: "bg-amber-50 text-amber-800",
  disputed: "bg-red-50 text-red-700",
};

export default function ExpensesClient({
  schemeId,
  rows,
  budgetLines,
  workOrders,
  contractors,
  fundNames,
  canManage,
}: {
  schemeId: number;
  rows: ExpenseRow[];
  budgetLines: BudgetLine[];
  workOrders: { id: number; reference: string; title: string }[];
  contractors: { id: number; business_name: string }[];
  fundNames: { fund_1: string; fund_2: string };
  canManage: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<ExpenseRow | "new" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = editing === "new" ? null : editing;
  const unpaid = rows.filter((r) => r.status === "unpaid");
  const unpaidTotal = unpaid.reduce((s, r) => s + r.amount, 0);
  const overdueCount = unpaid.filter((r) => r.overdue).length;
  const paidTotal = rows.filter((r) => r.status === "paid").reduce((s, r) => s + r.amount, 0);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const isNew = editing === "new";
    const res = await fetch(
      isNew ? `/api/client/strata/${schemeId}/expenses` : `/api/client/strata/${schemeId}/expenses/${editing.id}`,
      {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const json = await res.json().catch(() => ({}));

    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not save.");
      return;
    }
    setEditing(null);
    router.refresh();
  }

  async function remove(row: ExpenseRow) {
    if (!confirm(`Delete the ${row.supplier} invoice?`)) return;
    setBusy(true);
    const res = await fetch(`/api/client/strata/${schemeId}/expenses/${row.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  async function markPaid(row: ExpenseRow) {
    setBusy(true);
    await fetch(`/api/client/strata/${schemeId}/expenses/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "paid" }),
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className={`rounded-2xl border p-4 shadow-sm ${overdueCount > 0 ? "border-red-200 bg-red-50" : "border-slate-200 bg-white"}`}>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Unpaid invoices</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">{money(unpaidTotal)}</p>
          <p className="mt-0.5 text-xs text-slate-500">
            {unpaid.length} outstanding{overdueCount > 0 ? ` · ${overdueCount} past due` : ""}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Paid this year</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">{money(paidTotal)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Invoices recorded</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">{rows.length}</p>
        </div>
      </div>

      {canManage && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditing("new");
              setError(null);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            <Plus size={16} /> Record an invoice
          </button>
        </div>
      )}

      {editing && (
        <form onSubmit={save} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {editing === "new" ? "Record an invoice" : `${current?.supplier} invoice`}
            </h2>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="supplier">From</label>
              <input id="supplier" name="supplier" required defaultValue={current?.supplier ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="invoice_number">Invoice number</label>
              <input id="invoice_number" name="invoice_number" defaultValue={current?.invoiceNumber ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="invoice_date">Invoice date</label>
              <input
                id="invoice_date"
                name="invoice_date"
                type="date"
                required
                defaultValue={current?.invoiceDate ?? new Date().toISOString().slice(0, 10)}
                className={`${FIELD} mt-1.5`}
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="due_on">Due</label>
              <input id="due_on" name="due_on" type="date" defaultValue={current?.dueOn ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="amount">Amount inc GST ($)</label>
              <input id="amount" name="amount" type="number" step="0.01" required defaultValue={current?.amount ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="gst">GST ($)</label>
              <input id="gst" name="gst" type="number" step="0.01" defaultValue={current?.gst ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="fund">Paid from</label>
              <select id="fund" name="fund" defaultValue={current?.fund ?? "fund_1"} className={`${FIELD} mt-1.5`}>
                <option value="fund_1">{fundNames.fund_1}</option>
                <option value="fund_2">{fundNames.fund_2}</option>
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="budget_item_id">Budget line</label>
              <select id="budget_item_id" name="budget_item_id" defaultValue={current?.budgetItemId ?? ""} className={`${FIELD} mt-1.5`}>
                <option value="">Not allocated</option>
                {budgetLines.map((b) => (
                  <option key={b.id} value={b.id}>{b.item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="status">Status</label>
              <select id="status" name="status" defaultValue={current?.status ?? "unpaid"} className={`${FIELD} mt-1.5`}>
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="disputed">Disputed</option>
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="paid_on">Paid on</label>
              <input id="paid_on" name="paid_on" type="date" defaultValue={current?.paidOn ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="work_order_id">Work order</label>
              <select id="work_order_id" name="work_order_id" defaultValue={current?.workOrderId ?? ""} className={`${FIELD} mt-1.5`}>
                <option value="">—</option>
                {workOrders.map((w) => (
                  <option key={w.id} value={w.id}>{w.reference} — {w.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="contractor_id">Business</label>
              <select id="contractor_id" name="contractor_id" defaultValue={current?.contractorId ?? ""} className={`${FIELD} mt-1.5`}>
                <option value="">—</option>
                {contractors.map((c) => (
                  <option key={c.id} value={c.id}>{c.business_name}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="notes">Notes</label>
              <input id="notes" name="notes" defaultValue={current?.notes ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

          <div className="mt-5 flex gap-2">
            <button type="submit" disabled={busy} className="rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60">
              {busy ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </form>
      )}

      {rows.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">Budget line</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Status</th>
                {canManage && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id} className={r.overdue && r.status === "unpaid" ? "bg-red-50/60" : "hover:bg-slate-50/60"}>
                  <td className="px-4 py-3 text-slate-600">{show(r.invoiceDate)}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-900">{r.supplier}</span>
                    {r.invoiceNumber && <span className="ml-2 text-xs text-slate-400">{r.invoiceNumber}</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.budgetItemName ?? "—"}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-900">{money(r.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_TONE[r.status]}`}>
                      {r.status}
                    </span>
                    {r.overdue && r.status === "unpaid" && (
                      <span className="ml-2 text-xs font-semibold text-red-700">past due</span>
                    )}
                  </td>
                  {canManage && (
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        {r.status === "unpaid" && (
                          <button
                            onClick={() => markPaid(r)}
                            disabled={busy}
                            className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                          >
                            Mark paid
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setEditing(r);
                            setError(null);
                          }}
                          title="Edit"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => remove(r)}
                          title="Delete"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {budgetLines.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Budget vs actual</h2>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Budget line</th>
                  <th className="px-4 py-3 text-right">Budget</th>
                  <th className="px-4 py-3 text-right">Spent</th>
                  <th className="px-4 py-3 text-right">Left</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {budgetLines.map((b) => {
                  const left = b.budget - b.actual;
                  return (
                    <tr key={b.id} className={left < 0 ? "bg-red-50/60" : undefined}>
                      <td className="px-4 py-3 text-slate-800">{b.item}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-slate-600">{money(b.budget)}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-slate-900">{money(b.actual)}</td>
                      <td className={`px-4 py-3 text-right tabular-nums font-semibold ${left < 0 ? "text-red-700" : "text-slate-700"}`}>
                        {money(left)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
