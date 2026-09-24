"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2, X } from "lucide-react";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type Lot = {
  id: number;
  lot_number: string;
  description: string | null;
  owner_name: string | null;
  owner_email: string | null;
  owner_phone: string | null;
  occupancy: string | null;
  levy_basis: number;
  ownership_basis: number;
  service_address: string | null;
  mortgagee: string | null;
  tenancy_notice: string | null;
  managing_agent: string | null;
  emergency_contact: string | null;
  payment_reference: string | null;
  notices_by_email: boolean;
  notes: string | null;
};

type Labels = { levyBasis: string; ownershipBasis: string; separateBases: boolean };

export default function LotsClient({
  schemeId,
  lots,
  labels,
  canManage,
}: {
  schemeId: number;
  lots: Lot[];
  labels: Labels;
  canManage: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<Lot | "new" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalLevy = lots.reduce((sum, l) => sum + l.levy_basis, 0);
  const totalOwnership = lots.reduce((sum, l) => sum + l.ownership_basis, 0);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const payload = { ...form, notices_by_email: form.notices_by_email === "on" };

    const isNew = editing === "new";
    const res = await fetch(
      isNew ? `/api/client/strata/${schemeId}/lots` : `/api/client/strata/${schemeId}/lots/${editing.id}`,
      {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const json = await res.json().catch(() => ({}));

    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not save the lot.");
      return;
    }
    setEditing(null);
    router.refresh();
  }

  async function remove(lot: Lot) {
    if (!confirm(`Remove lot ${lot.lot_number} from the roll? This cannot be undone.`)) return;
    setBusy(true);
    const res = await fetch(`/api/client/strata/${schemeId}/lots/${lot.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  const current = editing === "new" ? null : editing;

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
            <Plus size={16} /> Add lot
          </button>
        </div>
      )}

      {editing && (
        <form onSubmit={save} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {editing === "new" ? "Add a lot" : `Lot ${current?.lot_number}`}
            </h2>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="lot_number">Lot number</label>
              <input id="lot_number" name="lot_number" required defaultValue={current?.lot_number ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="description">Unit / description</label>
              <input id="description" name="description" defaultValue={current?.description ?? ""} className={`${FIELD} mt-1.5`} />
            </div>

            <div>
              <label className={LABEL} htmlFor="levy_basis">{labels.levyBasis}</label>
              <input id="levy_basis" name="levy_basis" type="number" step="0.0001" min={0} defaultValue={current?.levy_basis ?? 0} className={`${FIELD} mt-1.5`} />
              <p className="mt-1 text-xs text-slate-400">Contributions are apportioned on this figure.</p>
            </div>
            <div>
              <label className={LABEL} htmlFor="ownership_basis">{labels.ownershipBasis}</label>
              <input id="ownership_basis" name="ownership_basis" type="number" step="0.0001" min={0} defaultValue={current?.ownership_basis ?? 0} className={`${FIELD} mt-1.5`} />
              <p className="mt-1 text-xs text-slate-400">
                {labels.separateBases
                  ? "In this state this is a different figure from the one above."
                  : "Usually the same figure as above in this state."}
              </p>
            </div>

            <div>
              <label className={LABEL} htmlFor="owner_name">Owner(s)</label>
              <input id="owner_name" name="owner_name" defaultValue={current?.owner_name ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="occupancy">Occupancy</label>
              <select id="occupancy" name="occupancy" defaultValue={current?.occupancy ?? ""} className={`${FIELD} mt-1.5`}>
                <option value="">—</option>
                <option value="Owner occupied">Owner occupied</option>
                <option value="Tenanted">Tenanted</option>
                <option value="Vacant">Vacant</option>
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="owner_email">Email</label>
              <input id="owner_email" name="owner_email" type="email" defaultValue={current?.owner_email ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="owner_phone">Phone</label>
              <input id="owner_phone" name="owner_phone" defaultValue={current?.owner_phone ?? ""} className={`${FIELD} mt-1.5`} />
            </div>

            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="service_address">Service address for notices</label>
              <input id="service_address" name="service_address" defaultValue={current?.service_address ?? ""} className={`${FIELD} mt-1.5`} />
              <p className="mt-1 text-xs text-slate-400">
                Where formal notices are sent. Keep it current — service has consequences.
              </p>
            </div>

            <div>
              <label className={LABEL} htmlFor="mortgagee">Mortgagee / interested party</label>
              <input id="mortgagee" name="mortgagee" defaultValue={current?.mortgagee ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="tenancy_notice">Tenancy notice received</label>
              <input id="tenancy_notice" name="tenancy_notice" placeholder="e.g. Yes — 14/02/2026" defaultValue={current?.tenancy_notice ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="managing_agent">Managing agent / tenant contact</label>
              <input id="managing_agent" name="managing_agent" defaultValue={current?.managing_agent ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="emergency_contact">Emergency contact</label>
              <input id="emergency_contact" name="emergency_contact" defaultValue={current?.emergency_contact ?? ""} className={`${FIELD} mt-1.5`} />
            </div>

            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="notes">Notes</label>
              <input id="notes" name="notes" defaultValue={current?.notes ?? ""} className={`${FIELD} mt-1.5`} />
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-2">
              <input type="checkbox" name="notices_by_email" defaultChecked={current?.notices_by_email ?? true} className="h-4 w-4 rounded border-slate-300" />
              Send this lot&apos;s notices by email
            </label>
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

          <div className="mt-5 flex gap-2">
            <button type="submit" disabled={busy} className="rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60">
              {busy ? "Saving…" : editing === "new" ? "Add lot" : "Save changes"}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </form>
      )}

      {lots.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">No lots on the roll yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Lot</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3 text-right">{labels.levyBasis}</th>
                <th className="px-4 py-3 text-right">Share</th>
                {labels.separateBases && <th className="px-4 py-3 text-right">{labels.ownershipBasis}</th>}
                <th className="px-4 py-3">Payment reference</th>
                {canManage && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lots.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-900">{l.lot_number}</span>
                    {l.description && <span className="ml-2 text-xs text-slate-500">{l.description}</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {l.owner_name ?? "—"}
                    {l.occupancy && <span className="ml-2 text-xs text-slate-400">{l.occupancy}</span>}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">{l.levy_basis.toLocaleString("en-AU")}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-500">
                    {totalLevy > 0 ? `${((l.levy_basis / totalLevy) * 100).toFixed(2)}%` : "—"}
                  </td>
                  {labels.separateBases && (
                    <td className="px-4 py-3 text-right tabular-nums text-slate-700">{l.ownership_basis.toLocaleString("en-AU")}</td>
                  )}
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{l.payment_reference ?? "—"}</td>
                  {canManage && (
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditing(l);
                            setError(null);
                          }}
                          title="Edit lot"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => remove(l)}
                          title="Remove lot"
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
            <tfoot className="bg-slate-50 text-xs font-semibold text-slate-600">
              <tr>
                <td className="px-4 py-3" colSpan={2}>
                  {lots.length} lots
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{totalLevy.toLocaleString("en-AU")}</td>
                <td className="px-4 py-3 text-right tabular-nums">{totalLevy > 0 ? "100.00%" : "—"}</td>
                {labels.separateBases && (
                  <td className="px-4 py-3 text-right tabular-nums">{totalOwnership.toLocaleString("en-AU")}</td>
                )}
                <td className="px-4 py-3" colSpan={canManage ? 2 : 1} />
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
