"use client";

import { useState } from "react";

type Product = {
  id: number;
  product_name: string;
  product_category: string | null;
  promotion_tier: string;
  promotion_status: string;
  payment_status: string;
  status: string;
  monthly_fee: number | null;
  tds_url: string | null;
  created_at: string;
};

type Supplier = {
  id: number;
  brand_name: string;
  slug: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  billing_email: string | null;
  website: string | null;
  status: string;
  payment_status: string | null;
  current_plan: string | null;
  stripe_customer_id: string | null;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  products: Product[];
};

type AuditLog = {
  id: number;
  action: string;
  created_at: string;
  new_value: unknown;
  previous_value: unknown;
};

export default function SupplierDetailClient({ supplier, auditLogs }: { supplier: Supplier; auditLogs: AuditLog[] }) {
  const [tab, setTab] = useState<"products" | "profile" | "audit">("products");
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState({ status: supplier.status, current_plan: supplier.current_plan ?? "" });
  const [msg, setMsg] = useState("");

  async function saveProfile() {
    setSaving(true);
    const res = await fetch("/api/directory/admin/suppliers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: supplier.id, ...edit }),
    });
    setSaving(false);
    setMsg(res.ok ? "Saved." : "Error saving.");
    setTimeout(() => setMsg(""), 3000);
  }

  const tabs = [
    { id: "products", label: `Products (${supplier.products.length})` },
    { id: "profile", label: "Profile & Status" },
    { id: "audit", label: "Audit Log" },
  ] as const;

  return (
    <div>
      <div className="mb-6">
        <a href="/directory/admin/suppliers" className="text-lg font-bold text-slate-900 hover:text-black">← Back to Suppliers</a>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">{supplier.brand_name}</h1>
        <p className="text-sm text-slate-500">{supplier.slug}</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-semibold transition border-b-2 -mb-px ${
              tab === t.id ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Product</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Tier</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Payment</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Fee/mo</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">TDS</th>
              </tr>
            </thead>
            <tbody>
              {supplier.products.map(p => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{p.product_name}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{p.product_category ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      p.promotion_tier === "premium" ? "bg-purple-100 text-purple-700" :
                      p.promotion_tier === "promoted" ? "bg-blue-100 text-blue-700" :
                      "bg-slate-100 text-slate-600"
                    }`}>{p.promotion_tier}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      p.promotion_status === "active" ? "bg-green-100 text-green-700" :
                      p.promotion_status === "pending" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>{p.promotion_status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${p.payment_status === "paid" ? "text-green-600" : "text-amber-600"}`}>
                      {p.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{p.monthly_fee ? `$${p.monthly_fee}` : "—"}</td>
                  <td className="px-4 py-3 text-xs">
                    {p.tds_url ? (
                      <a href={p.tds_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">TDS</a>
                    ) : "—"}
                  </td>
                </tr>
              ))}
              {!supplier.products.length && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No products</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "profile" && (
        <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
              <select
                value={edit.status}
                onChange={e => setEdit(v => ({ ...v, status: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                {["active", "draft", "hidden", "suspended"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Current Plan</label>
              <input
                type="text"
                value={edit.current_plan}
                onChange={e => setEdit(v => ({ ...v, current_plan: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="e.g. promoted"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-sm text-slate-600">
            <div><span className="font-semibold">Contact:</span> {supplier.contact_name ?? "—"}</div>
            <div><span className="font-semibold">Email:</span> {supplier.contact_email ?? "—"}</div>
            <div><span className="font-semibold">Billing email:</span> {supplier.billing_email ?? "—"}</div>
            <div><span className="font-semibold">Website:</span> {supplier.website ?? "—"}</div>
            <div><span className="font-semibold">Stripe customer:</span> {supplier.stripe_customer_id ?? "—"}</div>
            <div><span className="font-semibold">Joined:</span> {new Date(supplier.created_at).toLocaleDateString("en-AU")}</div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
            {msg && <span className="text-sm text-green-600">{msg}</span>}
          </div>
        </div>
      )}

      {tab === "audit" && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Action</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">When</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-mono text-xs text-slate-700">{log.action}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{new Date(log.created_at).toLocaleString("en-AU")}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 max-w-xs truncate">
                    {log.new_value ? JSON.stringify(log.new_value).slice(0, 80) : "—"}
                  </td>
                </tr>
              ))}
              {!auditLogs.length && (
                <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-400">No audit entries</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
