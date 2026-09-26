"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Pencil, Plus, Trash2, X } from "lucide-react";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

/** ISO dates are kept for the date inputs; this is only for reading. */
function show(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}


export type ComplianceRow = {
  id: number;
  item: string;
  provider: string | null;
  reference: string | null;
  sumInsured: number | null;
  lastDone: string | null;
  nextDue: string | null;
  cycleMonths: number | null;
  responsible: string | null;
  notes: string | null;
  state: { label: string; tone: string; days: number | null };
};

/** A starting register — a committee edits or deletes whatever does not apply. */
const SUGGESTIONS = [
  { item: "Building insurance policy", cycle_months: 12 },
  { item: "Public liability insurance", cycle_months: 12 },
  { item: "Office bearers liability", cycle_months: 12 },
  { item: "Workers compensation", cycle_months: 12 },
  { item: "Insurance valuation", cycle_months: 60 },
  { item: "Fire safety statement", cycle_months: 12 },
  { item: "Fire equipment service", cycle_months: 6 },
  { item: "Lift registration & inspection", cycle_months: 12 },
  { item: "Backflow prevention test", cycle_months: 12 },
  { item: "Anchor point / height safety", cycle_months: 12 },
];

export default function ComplianceClient({
  schemeId,
  rows,
  canManage,
}: {
  schemeId: number;
  rows: ComplianceRow[];
  canManage: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<ComplianceRow | "new" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = editing === "new" ? null : editing;
  const overdue = rows.filter((r) => r.state.label === "Overdue").length;
  const soon = rows.filter((r) => r.state.label === "Due soon").length;

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const isNew = editing === "new";
    const res = await fetch(
      isNew ? `/api/client/strata/${schemeId}/compliance` : `/api/client/strata/${schemeId}/compliance/${editing.id}`,
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

  async function markDone(row: ComplianceRow) {
    setBusy(true);
    await fetch(`/api/client/strata/${schemeId}/compliance/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mark_done: true }),
    });
    setBusy(false);
    router.refresh();
  }

  async function remove(row: ComplianceRow) {
    if (!confirm(`Remove "${row.item}" from the register?`)) return;
    setBusy(true);
    const res = await fetch(`/api/client/strata/${schemeId}/compliance/${row.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  async function addSuggested() {
    setBusy(true);
    for (const s of SUGGESTIONS) {
      await fetch(`/api/client/strata/${schemeId}/compliance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
    }
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {(overdue > 0 || soon > 0) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {overdue > 0 && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Overdue</p>
              <p className="mt-1 text-2xl font-extrabold text-red-800">{overdue}</p>
            </div>
          )}
          {soon > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Due within 60 days</p>
              <p className="mt-1 text-2xl font-extrabold text-amber-900">{soon}</p>
            </div>
          )}
        </div>
      )}

      {canManage && (
        <div className="flex flex-wrap justify-end gap-2">
          {rows.length === 0 && (
            <button
              onClick={addSuggested}
              disabled={busy}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              {busy ? "Adding…" : "Start with a typical list"}
            </button>
          )}
          <button
            onClick={() => {
              setEditing("new");
              setError(null);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            <Plus size={16} /> Add an obligation
          </button>
        </div>
      )}

      {editing && (
        <form onSubmit={save} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {editing === "new" ? "Add an obligation" : current?.item}
            </h2>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="item">What it is</label>
              <input id="item" name="item" required defaultValue={current?.item ?? ""} placeholder="Fire safety statement" className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="provider">Provider</label>
              <input id="provider" name="provider" defaultValue={current?.provider ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="reference">Policy / reference</label>
              <input id="reference" name="reference" defaultValue={current?.reference ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="last_done">Last done</label>
              <input id="last_done" name="last_done" type="date" defaultValue={current?.lastDone ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="next_due">Next due</label>
              <input id="next_due" name="next_due" type="date" defaultValue={current?.nextDue ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="cycle_months">Repeats every (months)</label>
              <input id="cycle_months" name="cycle_months" type="number" min={0} defaultValue={current?.cycleMonths ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="sum_insured">Sum insured / value ($)</label>
              <input id="sum_insured" name="sum_insured" type="number" step="0.01" defaultValue={current?.sumInsured ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="responsible">Who looks after it</label>
              <input id="responsible" name="responsible" defaultValue={current?.responsible ?? ""} className={`${FIELD} mt-1.5`} />
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

      {rows.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">Nothing on the register yet.</p>
          <p className="mx-auto mt-2 max-w-md text-xs text-slate-400">
            Record what your scheme has to keep current and when it was last done. What applies to your building
            is set by your own state&apos;s rules — nothing here is assumed for you.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Obligation</th>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Last done</th>
                <th className="px-4 py-3">Next due</th>
                <th className="px-4 py-3">Status</th>
                {canManage && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-900">{r.item}</span>
                    {r.reference && <span className="ml-2 text-xs text-slate-400">{r.reference}</span>}
                    {r.notes && <p className="mt-0.5 text-xs text-slate-500">{r.notes}</p>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.provider ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{show(r.lastDone)}</td>
                  <td className="px-4 py-3 text-slate-600">{show(r.nextDue)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${r.state.tone}`}>
                      {r.state.label}
                      {r.state.days !== null && r.state.label !== "Current" && (
                        <span className="ml-1 font-normal">
                          {r.state.days < 0 ? `${Math.abs(r.state.days)}d ago` : `${r.state.days}d`}
                        </span>
                      )}
                    </span>
                  </td>
                  {canManage && (
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => markDone(r)}
                          disabled={busy}
                          title="Mark done today and roll the next due date forward"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
                        >
                          <CheckCircle2 size={15} />
                        </button>
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
                          title="Remove"
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
    </div>
  );
}
