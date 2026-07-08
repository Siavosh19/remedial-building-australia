"use client";

import { useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";

export type PricingRow = {
  id: number; key: string; name: string; description: string | null; kind: string;
  amountCents: number; currency: string; durationDays: number; features: string[];
  isActive: boolean; displayOrder: number; hasStripePrice: boolean;
};

type Draft = {
  name: string; amount: string; durationDays: string; description: string;
  features: string; kind: string; isActive: boolean; displayOrder: string;
};

const rowToDraft = (r: PricingRow): Draft => ({
  name: r.name, amount: (r.amountCents / 100).toFixed(2), durationDays: String(r.durationDays),
  description: r.description ?? "", features: r.features.join("\n"), kind: r.kind,
  isActive: r.isActive, displayOrder: String(r.displayOrder),
});

export default function PricingClient({ initial, stripeConfigured }: { initial: PricingRow[]; stripeConfigured: boolean }) {
  const [rows] = useState(initial);
  const [drafts, setDrafts] = useState<Record<number, Draft>>(
    Object.fromEntries(initial.map((r) => [r.id, rowToDraft(r)])),
  );
  const [busy, setBusy] = useState<number | "new" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [newRow, setNewRow] = useState<Draft>({ name: "", amount: "", durationDays: "30", description: "", features: "", kind: "addon", isActive: true, displayOrder: "10" });

  const input = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400";

  function setDraft(id: number, patch: Partial<Draft>) {
    setDrafts((d) => ({ ...d, [id]: { ...d[id], ...patch } }));
  }

  async function save(id: number) {
    const d = drafts[id];
    setBusy(id); setMsg(null);
    const res = await fetch(`/api/directory/admin/jobs/pricing/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: d.name, amount_cents: Math.round(parseFloat(d.amount || "0") * 100),
        duration_days: Number(d.durationDays), description: d.description,
        features: d.features.split("\n").map((s) => s.trim()).filter(Boolean),
        kind: d.kind, is_active: d.isActive, display_order: Number(d.displayOrder),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(null);
    if (!res.ok) { setMsg(data.error ?? "Save failed."); return; }
    setMsg("Saved."); location.reload();
  }

  async function create() {
    setBusy("new"); setMsg(null);
    const res = await fetch(`/api/directory/admin/jobs/pricing`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newRow.name, amount_cents: Math.round(parseFloat(newRow.amount || "0") * 100),
        duration_days: Number(newRow.durationDays), description: newRow.description,
        features: newRow.features.split("\n").map((s) => s.trim()).filter(Boolean),
        kind: newRow.kind, is_active: newRow.isActive, display_order: Number(newRow.displayOrder),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(null);
    if (!res.ok) { setMsg(data.error ?? "Create failed."); return; }
    location.reload();
  }

  async function archive(id: number) {
    if (!confirm("Deactivate this pricing item?")) return;
    setBusy(id);
    await fetch(`/api/directory/admin/jobs/pricing/${id}`, { method: "DELETE" });
    location.reload();
  }

  return (
    <div className="p-6">
      <a href="/directory/admin/jobs" className="text-sm font-semibold text-sky-700 hover:text-red-700">← Jobs Management</a>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">Jobs Pricing</h1>
      <p className="mt-1 text-sm text-slate-500">
        Set what employers pay to post. <strong>standard</strong> and <strong>featured</strong> are the two listing tiers used at checkout.
        {stripeConfigured
          ? " Saving a new price creates a fresh Stripe price automatically."
          : " Stripe isn't configured yet — prices save to the database and sync once STRIPE_SECRET_KEY is set."}
      </p>
      {msg && <p className="mt-3 text-sm font-semibold text-emerald-700">{msg}</p>}

      <div className="mt-6 space-y-4">
        {rows.map((r) => {
          const d = drafts[r.id];
          return (
            <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-500">{r.key}</span>
                <span className="text-xs text-slate-400">{r.kind}{!r.hasStripePrice && stripeConfigured ? " · not synced to Stripe" : ""}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                <label className="md:col-span-2 text-xs font-semibold text-slate-500">Name
                  <input className={input} value={d.name} onChange={(e) => setDraft(r.id, { name: e.target.value })} />
                </label>
                <label className="text-xs font-semibold text-slate-500">Price (AUD)
                  <input className={input} value={d.amount} onChange={(e) => setDraft(r.id, { amount: e.target.value })} />
                </label>
                <label className="text-xs font-semibold text-slate-500">Duration (days)
                  <input className={input} value={d.durationDays} onChange={(e) => setDraft(r.id, { durationDays: e.target.value })} />
                </label>
                <label className="md:col-span-4 text-xs font-semibold text-slate-500">Description
                  <input className={input} value={d.description} onChange={(e) => setDraft(r.id, { description: e.target.value })} />
                </label>
                <label className="md:col-span-4 text-xs font-semibold text-slate-500">Features (one per line)
                  <textarea rows={3} className={input} value={d.features} onChange={(e) => setDraft(r.id, { features: e.target.value })} />
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <input type="checkbox" checked={d.isActive} onChange={(e) => setDraft(r.id, { isActive: e.target.checked })} /> Active
                </label>
                <label className="text-xs font-semibold text-slate-500">Display order
                  <input className={input} value={d.displayOrder} onChange={(e) => setDraft(r.id, { displayOrder: e.target.value })} />
                </label>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => save(r.id)} disabled={busy === r.id} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
                  <Save size={14} /> {busy === r.id ? "Saving…" : "Save"}
                </button>
                {r.kind === "addon" && (
                  <button onClick={() => archive(r.id)} disabled={busy === r.id} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-red-600 hover:border-red-300">
                    <Trash2 size={14} /> Deactivate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add-on creator */}
      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-700"><Plus size={15} /> Add a paid add-on</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <label className="md:col-span-2 text-xs font-semibold text-slate-500">Name
            <input className={input} value={newRow.name} onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} placeholder="e.g. 60-day listing" />
          </label>
          <label className="text-xs font-semibold text-slate-500">Price (AUD)
            <input className={input} value={newRow.amount} onChange={(e) => setNewRow({ ...newRow, amount: e.target.value })} placeholder="0.00" />
          </label>
          <label className="text-xs font-semibold text-slate-500">Duration (days)
            <input className={input} value={newRow.durationDays} onChange={(e) => setNewRow({ ...newRow, durationDays: e.target.value })} />
          </label>
        </div>
        <button onClick={create} disabled={busy === "new"} className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50">
          <Plus size={14} /> {busy === "new" ? "Adding…" : "Add pricing item"}
        </button>
      </div>
    </div>
  );
}
