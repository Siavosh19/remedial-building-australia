"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { money } from "@/lib/strata/levies";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type WorkOrderRow = {
  id: number;
  reference: string;
  title: string;
  status: string;
  contractorName: string | null;
  defectReference: string | null;
  agreedPrice: number | null;
  issuedOn: string | null;
  completedOn: string | null;
};

export const WO_STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  issued: "Issued",
  accepted: "Accepted",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const TONE: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600",
  issued: "bg-sky-50 text-sky-800",
  accepted: "bg-sky-100 text-sky-900",
  in_progress: "bg-amber-50 text-amber-800",
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-slate-100 text-slate-400",
};

export default function WorkOrdersClient({
  schemeId,
  orders,
  defects,
  contractors,
  canManage,
}: {
  schemeId: number;
  orders: WorkOrderRow[];
  defects: { id: number; reference: string; description: string }[];
  contractors: { id: number; business_name: string; trade: string }[];
  canManage: boolean;
}) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(`/api/client/strata/${schemeId}/work-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json().catch(() => ({}));

    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not create the work order.");
      return;
    }
    setCreating(false);
    router.push(`/client/strata/${schemeId}/work-orders/${json.id}`);
  }

  return (
    <div className="space-y-4">
      {canManage && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setCreating(true);
              setError(null);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            <Plus size={16} /> New work order
          </button>
        </div>
      )}

      {creating && (
        <form onSubmit={create} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">New work order</h2>
            <button type="button" onClick={() => setCreating(false)} className="text-slate-400 hover:text-slate-700">
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="title">Title</label>
              <input id="title" name="title" required placeholder="Replace basement riser section" className={`${FIELD} mt-1.5`} />
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="scope">Scope of works</label>
              <textarea id="scope" name="scope" rows={4} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="defect_id">Arising from (optional)</label>
              <select id="defect_id" name="defect_id" defaultValue="" className={`${FIELD} mt-1.5`}>
                <option value="">—</option>
                {defects.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.reference} — {d.description.slice(0, 60)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="contractor_id">Business (optional)</label>
              <select id="contractor_id" name="contractor_id" defaultValue="" className={`${FIELD} mt-1.5`}>
                <option value="">Not decided yet</option>
                {contractors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.business_name} — {c.trade}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="location">Location</label>
              <input id="location" name="location" className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="agreed_price">Agreed price ($)</label>
              <input id="agreed_price" name="agreed_price" type="number" step="0.01" className={`${FIELD} mt-1.5`} />
            </div>
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

          <div className="mt-5 flex gap-2">
            <button type="submit" disabled={busy} className="rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60">
              {busy ? "Creating…" : "Create"}
            </button>
            <button type="button" onClick={() => setCreating(false)} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </form>
      )}

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">No work orders yet.</p>
          <p className="mx-auto mt-2 max-w-md text-xs text-slate-400">
            A work order records what a business was engaged to do, for how much, and when it was done — the
            building&apos;s work history.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Ref</th>
                <th className="px-4 py-3">Work</th>
                <th className="px-4 py-3">Business</th>
                <th className="px-4 py-3 text-right">Agreed</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-slate-500">{o.reference}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-900">{o.title}</span>
                    {o.defectReference && (
                      <span className="ml-2 text-xs text-slate-400">from {o.defectReference}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{o.contractorName ?? "—"}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                    {o.agreedPrice === null ? "—" : money(o.agreedPrice)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${TONE[o.status] ?? ""}`}>
                      {WO_STATUS_LABEL[o.status] ?? o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/client/strata/${schemeId}/work-orders/${o.id}`}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
