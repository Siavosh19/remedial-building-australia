"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { money } from "@/lib/strata/levies";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type BudgetItem = {
  id: number;
  category: string | null;
  item: string;
  fund: "fund_1" | "fund_2";
  amount: number;
};

export default function BudgetClient({
  schemeId,
  yearLabel,
  items,
  fundNames,
  periodCount,
  periodWord,
  canManage,
}: {
  schemeId: number;
  yearLabel: string;
  items: BudgetItem[];
  fundNames: { fund_1: string; fund_2: string };
  periodCount: number;
  periodWord: string;
  canManage: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<BudgetItem | "new" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fund1 = items.filter((i) => i.fund === "fund_1");
  const fund2 = items.filter((i) => i.fund === "fund_2");
  const total1 = fund1.reduce((s, i) => s + i.amount, 0);
  const total2 = fund2.reduce((s, i) => s + i.amount, 0);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const isNew = editing === "new";
    const res = await fetch(
      isNew ? `/api/client/strata/${schemeId}/budget` : `/api/client/strata/${schemeId}/budget/${editing.id}`,
      {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, year_label: yearLabel }),
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

  async function remove(item: BudgetItem) {
    if (!confirm(`Remove "${item.item}" from the budget?`)) return;
    setBusy(true);
    const res = await fetch(`/api/client/strata/${schemeId}/budget/${item.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  const current = editing === "new" ? null : editing;

  function section(title: string, rows: BudgetItem[], total: number) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          <span className="text-sm font-bold tabular-nums text-slate-900">{money(total)}</span>
        </div>
        {rows.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-slate-400">Nothing budgeted yet.</p>
        ) : (
          <table className="min-w-full text-sm">
            <tbody className="divide-y divide-slate-100">
              {rows.map((i) => (
                <tr key={i.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-2.5">
                    <span className="font-medium text-slate-900">{i.item}</span>
                    {i.category && <span className="ml-2 text-xs text-slate-400">{i.category}</span>}
                  </td>
                  <td className="w-32 px-4 py-2.5 text-right tabular-nums text-slate-700">{money(i.amount)}</td>
                  {canManage && (
                    <td className="w-24 px-4 py-2.5">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditing(i);
                            setError(null);
                          }}
                          title="Edit"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => remove(i)}
                          title="Remove"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {canManage && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditing("new");
              setError(null);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            <Plus size={16} /> Add budget item
          </button>
        </div>
      )}

      {editing && (
        <form onSubmit={save} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {editing === "new" ? "Add a budget item" : "Edit budget item"}
            </h2>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="item">Item</label>
              <input id="item" name="item" required defaultValue={current?.item ?? ""} placeholder="Building insurance" className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="category">Category (optional)</label>
              <input id="category" name="category" defaultValue={current?.category ?? ""} placeholder="Insurance" className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="fund">Fund</label>
              <select id="fund" name="fund" defaultValue={current?.fund ?? "fund_1"} className={`${FIELD} mt-1.5`}>
                <option value="fund_1">{fundNames.fund_1}</option>
                <option value="fund_2">{fundNames.fund_2}</option>
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="amount">Amount for the year ($)</label>
              <input id="amount" name="amount" type="number" step="0.01" min={0} required defaultValue={current?.amount ?? ""} className={`${FIELD} mt-1.5`} />
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

      <div className="grid gap-4 lg:grid-cols-2">
        {section(fundNames.fund_1, fund1, total1)}
        {section(fundNames.fund_2, fund2, total2)}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-sm font-bold text-slate-900">Total to be raised in {yearLabel}</span>
          <span className="text-xl font-extrabold tabular-nums text-slate-900">{money(total1 + total2)}</span>
        </div>
        {periodCount > 0 && total1 + total2 > 0 && (
          <p className="mt-1 text-sm text-slate-500">
            {money((total1 + total2) / periodCount)} per {periodWord} across the whole scheme, apportioned between
            lots by entitlement.
          </p>
        )}
      </div>
    </div>
  );
}
