"use client";

import { useState, useEffect } from "react";

type Request = {
  id: number;
  status: string;
  field_changes: unknown;
  admin_notes: string | null;
  created_at: string;
  reviewed_at: string | null;
};

type ProductRequest = Request & { product?: { product_name: string } };

export default function UpdateRequestsPage() {
  const [supplierReqs, setSupplierReqs] = useState<Request[]>([]);
  const [productReqs, setProductReqs] = useState<ProductRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: "supplier", changes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/supplier/update-requests")
      .then(r => r.json())
      .then(d => {
        setSupplierReqs(d.supplier_requests ?? []);
        setProductReqs(d.product_requests ?? []);
        setLoading(false);
      });
  }, []);

  async function submit() {
    let field_changes: unknown;
    try {
      field_changes = JSON.parse(form.changes);
    } catch {
      field_changes = { description: form.changes };
    }
    setSubmitting(true);
    const res = await fetch("/api/supplier/update-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: form.type, field_changes }),
    });
    setSubmitting(false);
    if (res.ok) {
      setMsg("Request submitted. We'll review it shortly.");
      setShowForm(false);
      setForm({ type: "supplier", changes: "" });
      const d = await fetch("/api/supplier/update-requests").then(r => r.json());
      setSupplierReqs(d.supplier_requests ?? []);
      setProductReqs(d.product_requests ?? []);
    } else {
      setMsg("Error submitting. Please try again.");
    }
    setTimeout(() => setMsg(""), 5000);
  }

  const statusColor = (s: string) =>
    s === "approved" ? "bg-green-100 text-green-700" :
    s === "pending" ? "bg-amber-100 text-amber-700" :
    s === "rejected" ? "bg-red-100 text-red-700" :
    "bg-slate-100 text-slate-600";

  if (loading) return <div className="text-slate-500 text-sm">Loading…</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Update Requests</h1>
          <p className="text-sm text-slate-500 mt-1">Submit changes to your profile or product information for admin review</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
        >
          + New Request
        </button>
      </div>

      {msg && (
        <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${msg.includes("submitted") ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"}`}>
          {msg}
        </div>
      )}

      {showForm && (
        <div className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <h2 className="text-sm font-bold text-indigo-800 mb-4">New Update Request</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-indigo-700 mb-1">Request Type</label>
              <select
                value={form.type}
                onChange={e => setForm(v => ({ ...v, type: e.target.value }))}
                className="rounded-lg border border-indigo-300 bg-white px-3 py-2 text-sm"
              >
                <option value="supplier">Profile / Company Update</option>
                <option value="product">Product Update</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-indigo-700 mb-1">What needs to change?</label>
              <textarea
                value={form.changes}
                onChange={e => setForm(v => ({ ...v, changes: e.target.value }))}
                placeholder={`Describe the changes, e.g.: {"website": "https://new-url.com", "contact_phone": "+61 2 1234 5678"}`}
                rows={4}
                className="w-full rounded-lg border border-indigo-300 bg-white px-3 py-2 text-sm resize-none"
              />
              <p className="text-xs text-indigo-500 mt-1">You can paste plain text describing changes, or a JSON object with field names and new values.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={submit}
                disabled={submitting || !form.changes}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                {submitting ? "Submitting…" : "Submit Request"}
              </button>
              <button onClick={() => setShowForm(false)} className="rounded-lg bg-white border border-indigo-300 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {supplierReqs.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-3">Profile Requests</h2>
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Submitted</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Changes</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Admin Notes</th>
                </tr>
              </thead>
              <tbody>
                {supplierReqs.map(r => (
                  <tr key={r.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-xs text-slate-400">{new Date(r.created_at).toLocaleDateString("en-AU")}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor(r.status)}`}>{r.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 max-w-xs truncate">
                      {r.field_changes ? JSON.stringify(r.field_changes).slice(0, 80) : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{r.admin_notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {productReqs.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-3">Product Requests</h2>
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Product</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Submitted</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Admin Notes</th>
                </tr>
              </thead>
              <tbody>
                {productReqs.map(r => (
                  <tr key={r.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-medium text-slate-800">{r.product?.product_name ?? `Request #${r.id}`}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{new Date(r.created_at).toLocaleDateString("en-AU")}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor(r.status)}`}>{r.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{r.admin_notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!supplierReqs.length && !productReqs.length && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-400 text-sm">No update requests yet. Use the button above to submit a change request.</p>
        </div>
      )}
    </div>
  );
}
