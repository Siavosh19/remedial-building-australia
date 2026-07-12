"use client";

import { useMemo, useState } from "react";

type Plan = {
  id: number;
  product_line: string;
  tier: string;
  name: string;
  description: string | null;
  billing_interval: string;
  amount_cents: number;
  currency: string;
  trial_days: number;
  features: string[];
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  is_active: boolean;
  is_public: boolean;
  display_order: number;
};

const PRODUCT_LINES = [
  { value: "directory", label: "Directory Listing" },
  { value: "ai_scope", label: "AI Scope Reader" },
  { value: "supplier_card", label: "Supplier Card" },
];
const INTERVALS = [
  { value: "month", label: "Monthly" },
  { value: "year", label: "Yearly" },
  { value: "one_time", label: "One-off" },
];

const money = (cents: number, ccy: string) =>
  `${(cents / 100).toLocaleString("en-AU", { style: "currency", currency: (ccy || "aud").toUpperCase() })}`;

type FormState = {
  id?: number;
  product_line: string;
  tier: string;
  name: string;
  description: string;
  billing_interval: string;
  amount_dollars: string;
  currency: string;
  trial_days: string;
  features: string;
  is_active: boolean;
  is_public: boolean;
  display_order: string;
};

const blankForm = (): FormState => ({
  product_line: "directory", tier: "", name: "", description: "",
  billing_interval: "month", amount_dollars: "", currency: "aud", trial_days: "60",
  features: "", is_active: true, is_public: true, display_order: "0",
});

export default function PlansAdminClient({ initialPlans, stripeConfigured }: { initialPlans: Plan[]; stripeConfigured: boolean }) {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [form, setForm] = useState<FormState | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const grouped = useMemo(() => {
    const m = new Map<string, Plan[]>();
    for (const p of plans) { if (!m.has(p.product_line)) m.set(p.product_line, []); m.get(p.product_line)!.push(p); }
    return m;
  }, [plans]);

  function openCreate() { setMsg(null); setForm(blankForm()); }
  function openEdit(p: Plan) {
    setMsg(null);
    setForm({
      id: p.id, product_line: p.product_line, tier: p.tier, name: p.name, description: p.description ?? "",
      billing_interval: p.billing_interval, amount_dollars: (p.amount_cents / 100).toString(), currency: p.currency,
      trial_days: String(p.trial_days), features: p.features.join("\n"), is_active: p.is_active, is_public: p.is_public,
      display_order: String(p.display_order),
    });
  }

  async function save() {
    if (!form) return;
    setBusy(true); setMsg(null);
    const payload = {
      product_line: form.product_line, tier: form.tier.trim(), name: form.name.trim(),
      description: form.description.trim() || null, billing_interval: form.billing_interval,
      amount_cents: Math.round(parseFloat(form.amount_dollars || "0") * 100), currency: form.currency,
      trial_days: parseInt(form.trial_days || "0", 10) || 0,
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
      is_active: form.is_active, is_public: form.is_public, display_order: parseInt(form.display_order || "0", 10) || 0,
    };
    const url = form.id ? `/api/directory/admin/plans/${form.id}` : "/api/directory/admin/plans";
    const method = form.id ? "PATCH" : "POST";
    try {
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) { setMsg({ type: "error", text: data.error ?? "Save failed." }); setBusy(false); return; }
      const saved: Plan = data.plan;
      setPlans((prev) => form.id ? prev.map((p) => (p.id === saved.id ? saved : p)) : [...prev, saved]);
      setForm(null);
      setMsg({ type: "success", text: `Plan saved${saved.stripe_price_id ? " and synced to Stripe" : " (will sync to Stripe once the key is set)"}.` });
    } catch { setMsg({ type: "error", text: "Network error." }); }
    setBusy(false);
  }

  async function archive(p: Plan) {
    if (!confirm(`Archive "${p.name}"? Existing subscribers keep their plan; it stops being offered to new customers.`)) return;
    const res = await fetch(`/api/directory/admin/plans/${p.id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) setPlans((prev) => prev.map((x) => (x.id === p.id ? data.plan : x)));
  }

  return (
    <div className="space-y-6">
      {!stripeConfigured && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Stripe not connected yet.</strong> You can create and edit plans now — they’ll be saved and shown,
          but won’t take payment until <code>STRIPE_SECRET_KEY</code> is added. Once it is, edit &amp; save each plan to sync it to Stripe.
        </div>
      )}

      {msg && (
        <div className={`rounded-xl px-4 py-3 text-sm ${msg.type === "error" ? "bg-rose-100 text-rose-900" : "bg-emerald-100 text-emerald-900"}`}>{msg.text}</div>
      )}

      <button onClick={openCreate} className="rounded-xl bg-sky-950 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800">+ New plan</button>

      {[...grouped.entries()].map(([line, list]) => (
        <div key={line}>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-500">
            {PRODUCT_LINES.find((p) => p.value === line)?.label ?? line}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-2">Name</th><th className="px-4 py-2">Tier</th><th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Trial</th><th className="px-4 py-2">Stripe</th><th className="px-4 py-2">Status</th><th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {list.map((p) => (
                  <tr key={p.id} className={p.is_active ? "" : "opacity-50"}>
                    <td className="px-4 py-2 font-medium text-slate-800">{p.name}</td>
                    <td className="px-4 py-2">{p.tier}</td>
                    <td className="px-4 py-2">{money(p.amount_cents, p.currency)}<span className="text-slate-400">/{p.billing_interval === "one_time" ? "once" : p.billing_interval}</span></td>
                    <td className="px-4 py-2">{p.trial_days ? `${p.trial_days}d` : "—"}</td>
                    <td className="px-4 py-2">{p.stripe_price_id ? <span className="text-emerald-600">✓ synced</span> : <span className="text-amber-600">not synced</span>}</td>
                    <td className="px-4 py-2">{p.is_active ? (p.is_public ? "Live" : "Hidden") : "Archived"}</td>
                    <td className="px-4 py-2 text-right">
                      <button onClick={() => openEdit(p)} className="mr-2 text-sky-700 hover:underline">Edit</button>
                      {p.is_active && <button onClick={() => archive(p)} className="text-rose-600 hover:underline">Archive</button>}
                    </td>
                  </tr>
                ))}
                {list.length === 0 && <tr><td colSpan={7} className="px-4 py-3 text-slate-400">No plans yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => !busy && setForm(null)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-4 text-lg font-bold text-slate-900">{form.id ? "Edit plan" : "New plan"}</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className="col-span-2 font-semibold text-slate-700">Name
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />
              </label>
              <label className="font-semibold text-slate-700">Product line
                <select value={form.product_line} onChange={(e) => setForm({ ...form, product_line: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal">
                  {PRODUCT_LINES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </label>
              <label className="font-semibold text-slate-700">Tier (key)
                <input value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} placeholder="claimed / featured" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />
              </label>
              <label className="font-semibold text-slate-700">Billing
                <select value={form.billing_interval} onChange={(e) => setForm({ ...form, billing_interval: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal">
                  {INTERVALS.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
                </select>
              </label>
              <label className="font-semibold text-slate-700">Price ({form.currency.toUpperCase()})
                <input value={form.amount_dollars} onChange={(e) => setForm({ ...form, amount_dollars: e.target.value })} placeholder="29" inputMode="decimal" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />
              </label>
              <label className="font-semibold text-slate-700">Trial (days)
                <input value={form.trial_days} onChange={(e) => setForm({ ...form, trial_days: e.target.value })} inputMode="numeric" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />
              </label>
              <label className="font-semibold text-slate-700">Order
                <input value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} inputMode="numeric" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />
              </label>
              <label className="col-span-2 font-semibold text-slate-700">Short description
                <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />
              </label>
              <label className="col-span-2 font-semibold text-slate-700">Features (one per line)
                <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={4} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />
              </label>
              <label className="flex items-center gap-2 font-semibold text-slate-700">
                <input type="checkbox" checked={form.is_public} onChange={(e) => setForm({ ...form, is_public: e.target.checked })} /> Show on pricing page
              </label>
              <label className="flex items-center gap-2 font-semibold text-slate-700">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button disabled={busy} onClick={() => setForm(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
              <button disabled={busy} onClick={save} className="rounded-lg bg-sky-950 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-60">{busy ? "Saving…" : "Save plan"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
