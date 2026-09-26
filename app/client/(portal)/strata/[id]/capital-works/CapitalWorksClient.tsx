"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { money } from "@/lib/strata/levies";
import type { ProjectionYear } from "@/lib/strata/funds";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type CapitalRow = {
  id: number;
  item: string;
  lastDoneYear: number | null;
  cycleYears: number | null;
  nextDueYear: number | null;
  estimatedCost: number;
  notes: string | null;
};

export default function CapitalWorksClient({
  schemeId,
  rows,
  projection,
  fundName,
  openingBalance,
  annualContribution,
  canManage,
}: {
  schemeId: number;
  rows: CapitalRow[];
  projection: ProjectionYear[];
  fundName: string;
  openingBalance: number;
  annualContribution: number;
  canManage: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<CapitalRow | "new" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = editing === "new" ? null : editing;
  const firstShortfall = projection.find((p) => p.closing < 0);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const isNew = editing === "new";
    const res = await fetch(
      isNew
        ? `/api/client/strata/${schemeId}/capital-works`
        : `/api/client/strata/${schemeId}/capital-works/${editing.id}`,
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

  async function remove(row: CapitalRow) {
    if (!confirm(`Remove "${row.item}" from the plan?`)) return;
    setBusy(true);
    const res = await fetch(`/api/client/strata/${schemeId}/capital-works/${row.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{fundName} today</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">{money(openingBalance)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Going in each year</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">{money(annualContribution)}</p>
        </div>
        <div
          className={`rounded-2xl border p-4 shadow-sm ${
            firstShortfall ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"
          }`}
        >
          <p className={`text-xs font-semibold uppercase tracking-wide ${firstShortfall ? "text-red-700" : "text-emerald-700"}`}>
            {firstShortfall ? "Runs short in" : "Fund holds for"}
          </p>
          <p className={`mt-1 text-2xl font-extrabold ${firstShortfall ? "text-red-800" : "text-emerald-800"}`}>
            {firstShortfall ? firstShortfall.year : "10 years"}
          </p>
        </div>
      </div>

      {firstShortfall && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          On these numbers the {fundName.toLowerCase()} goes negative in {firstShortfall.year}. Either the
          contribution is too low for the work planned, or a job needs moving.
        </p>
      )}

      {canManage && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditing("new");
              setError(null);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            <Plus size={16} /> Add an item
          </button>
        </div>
      )}

      {editing && (
        <form onSubmit={save} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {editing === "new" ? "Add a capital works item" : current?.item}
            </h2>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="item">Item</label>
              <input id="item" name="item" required defaultValue={current?.item ?? ""} placeholder="Exterior repaint" className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="last_done_year">Last done (year)</label>
              <input id="last_done_year" name="last_done_year" type="number" defaultValue={current?.lastDoneYear ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="cycle_years">Repeats every (years)</label>
              <input id="cycle_years" name="cycle_years" type="number" min={0} defaultValue={current?.cycleYears ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="next_due_year">Next due (year)</label>
              <input id="next_due_year" name="next_due_year" type="number" defaultValue={current?.nextDueYear ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="estimated_cost">Cost in today&apos;s dollars ($)</label>
              <input id="estimated_cost" name="estimated_cost" type="number" step="0.01" defaultValue={current?.estimatedCost ?? ""} className={`${FIELD} mt-1.5`} />
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
          <p className="text-sm text-slate-500">No capital works planned yet.</p>
          <p className="mx-auto mt-2 max-w-md text-xs text-slate-400">
            Roof, paint, lifts, waterproofing, driveways — what they cost, when they were last done, and how
            often they come round.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3 text-right">Last done</th>
                  <th className="px-4 py-3 text-right">Cycle</th>
                  <th className="px-4 py-3 text-right">Next due</th>
                  <th className="px-4 py-3 text-right">Cost today</th>
                  {canManage && <th className="px-4 py-3" />}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-900">{r.item}</span>
                      {r.notes && <p className="mt-0.5 text-xs text-slate-500">{r.notes}</p>}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-600">{r.lastDoneYear ?? "—"}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-600">
                      {r.cycleYears ? `${r.cycleYears} yr` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-600">{r.nextDueYear ?? "—"}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-900">{money(r.estimatedCost)}</td>
                    {canManage && (
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
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

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Ten-year projection</h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Costs escalate 3% a year and contributions grow 3% a year. Change the {fundName.toLowerCase()}{" "}
              budget line to see the effect.
            </p>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Year</th>
                    <th className="px-4 py-3 text-right">Opening</th>
                    <th className="px-4 py-3 text-right">In</th>
                    <th className="px-4 py-3 text-right">Out</th>
                    <th className="px-4 py-3 text-right">Closing</th>
                    <th className="px-4 py-3">Work falling due</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projection.map((p) => (
                    <tr key={p.year} className={p.closing < 0 ? "bg-red-50" : undefined}>
                      <td className="px-4 py-3 font-semibold text-slate-900">{p.year}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-slate-600">{money(p.opening)}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-emerald-700">{money(p.contributions)}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-slate-600">
                        {p.expenditure > 0 ? money(p.expenditure) : "—"}
                      </td>
                      <td className={`px-4 py-3 text-right tabular-nums font-semibold ${p.closing < 0 ? "text-red-700" : "text-slate-900"}`}>
                        {money(p.closing)}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {p.items.length === 0 ? "—" : p.items.map((i) => i.item).join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
