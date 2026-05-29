"use client";

import { useState } from "react";
import CategorySearch from "@/components/directory/CategorySearch";

export default function CompanySetupForm({ categories }: { categories: { id: number; name: string }[] }) {
  const [form, setForm] = useState({
    companyName: "",
    abn: "",
    mainCategoryId: "",
    state: "NSW",
    suburb: "",
    postcode: "",
    phone: "",
    website: "",
    businessEmail: "",
    description: "",
  });
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.mainCategoryId) {
      setStatus({ type: "error", message: "Please select a primary category." });
      return;
    }
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/directory/company", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        mainCategoryId: Number(form.mainCategoryId),
      }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Unable to submit company details." });
      return;
    }

    setStatus({ type: "success", message: "Your listing has been submitted for review. We will notify you when it goes live. Redirecting…" });
    window.setTimeout(() => { window.location.href = "/directory/dashboard"; }, 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          <span>Company name</span>
          <input
            type="text"
            value={form.companyName}
            onChange={(event) => setForm({ ...form, companyName: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
          />
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          <span>ABN</span>
          <input
            type="text"
            value={form.abn}
            onChange={(event) => setForm({ ...form, abn: event.target.value.replace(/\D/g, "") })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
            maxLength={11}
            placeholder="11 digits"
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="block text-sm font-semibold text-slate-800">
          <span>Primary category</span>
          <CategorySearch
            categories={categories}
            value={form.mainCategoryId}
            onChange={(id) => setForm({ ...form, mainCategoryId: id })}
          />
        </div>

        <label className="block text-sm font-semibold text-slate-800">
          <span>State</span>
          <select
            value={form.state}
            onChange={(event) => setForm({ ...form, state: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
          >
            {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          <span>Suburb</span>
          <input
            type="text"
            value={form.suburb}
            onChange={(event) => setForm({ ...form, suburb: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
          />
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          <span>Postcode</span>
          <input
            type="text"
            value={form.postcode}
            onChange={(event) => setForm({ ...form, postcode: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          <span>Phone number</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
          />
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          <span>Website</span>
          <input
            type="url"
            value={form.website}
            onChange={(event) => setForm({ ...form, website: event.target.value })}
            placeholder="https://"
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Business email</span>
        <input
          type="email"
          value={form.businessEmail}
          onChange={(event) => setForm({ ...form, businessEmail: event.target.value })}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          required
        />
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Short description</span>
        <textarea
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          rows={5}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          required
        />
      </label>

      {status ? (
        <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
          {status.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading || status?.type === "success"}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Submit company for review"}
      </button>
    </form>
  );
}
