"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SupplierSetupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ brandName: "", contactEmail: "", phone: "", website: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/supplier/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Error submitting form."); return; }
    router.push("/supplier-dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center py-14 px-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-950">Set up your supplier profile</h1>
        <p className="mt-2 text-sm text-slate-500">Tell us about your brand so we can set up your portal. Only your brand name and email are required.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
            <span>Brand name <span className="text-red-500">*</span></span>
            <input
              type="text"
              placeholder="e.g. Sika, Dulux, MasterFlow"
              value={form.brandName}
              onChange={(e) => setForm({ ...form, brandName: e.target.value })}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
              required
            />
          </label>

          <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
            <span>Contact email <span className="text-red-500">*</span></span>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
              required
            />
          </label>

          <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
            <span>Phone <span className="text-xs font-normal text-slate-400">optional</span></span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            />
          </label>

          <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
            <span>Website <span className="text-xs font-normal text-slate-400">optional</span></span>
            <input
              type="url"
              placeholder="https://"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            />
          </label>

          <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
            <span>Short description <span className="text-xs font-normal text-slate-400">optional</span></span>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none resize-none"
            />
          </label>

          {error && <p className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-800">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-60 transition"
          >
            {loading ? "Saving…" : "Complete setup"}
          </button>
        </form>
      </div>
    </div>
  );
}
