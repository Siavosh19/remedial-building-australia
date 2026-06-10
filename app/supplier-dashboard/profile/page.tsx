"use client";

import { useState, useEffect } from "react";

type Supplier = {
  id: number;
  brand_name: string;
  slug: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  billing_email: string | null;
  website: string | null;
  description: string | null;
  logo_url: string | null;
  status: string;
};

export default function SupplierProfilePage() {
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [form, setForm] = useState<Partial<Supplier>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/supplier/me")
      .then(r => r.json())
      .then(d => {
        setSupplier(d.supplier);
        setForm({
          contact_name: d.supplier.contact_name ?? "",
          contact_email: d.supplier.contact_email ?? "",
          contact_phone: d.supplier.contact_phone ?? "",
          billing_email: d.supplier.billing_email ?? "",
          website: d.supplier.website ?? "",
          description: d.supplier.description ?? "",
        });
      });
  }, []);

  async function save() {
    setSaving(true);
    const res = await fetch("/api/supplier/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setMsg(res.ok ? "Profile saved." : "Error saving. Please try again.");
    setTimeout(() => setMsg(""), 4000);
  }

  if (!supplier) return <div className="text-slate-500 text-sm">Loading…</div>;

  const fields: { key: keyof Supplier; label: string; type?: string }[] = [
    { key: "contact_name", label: "Contact Name" },
    { key: "contact_email", label: "Contact Email", type: "email" },
    { key: "contact_phone", label: "Phone" },
    { key: "billing_email", label: "Billing Email", type: "email" },
    { key: "website", label: "Website URL", type: "url" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Profile</h1>
      <p className="text-sm text-slate-500 mb-6">Update your contact and business details. Changes go live immediately.</p>

      <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Brand Name</label>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">{supplier.brand_name}</div>
          <p className="text-xs text-slate-400 mt-1">Contact us to change your brand name.</p>
        </div>

        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</label>
            <input
              type={f.type ?? "text"}
              value={(form[f.key] ?? "") as string}
              onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
          <textarea
            value={(form.description ?? "") as string}
            onChange={e => setForm(v => ({ ...v, description: e.target.value }))}
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {msg && <span className="text-sm text-green-600">{msg}</span>}
        </div>
      </div>
    </div>
  );
}
