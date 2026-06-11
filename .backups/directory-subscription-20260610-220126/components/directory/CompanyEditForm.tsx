"use client";

import { useState } from "react";
import CategorySearch from "@/components/directory/CategorySearch";

type Category = { id: number; name: string };

type Props = {
  company: {
    name: string;
    phone: string | null;
    website: string | null;
    email: string;
    description: string | null;
    main_category_id: number | null;
    locations: { suburb: string | null; postcode: string; state: string }[];
  };
  categories: Category[];
};

export default function CompanyEditForm({ company, categories }: Props) {
  const location = company.locations[0];
  const [form, setForm] = useState({
    companyName: company.name,
    phone: company.phone ?? "",
    website: company.website ?? "",
    businessEmail: company.email,
    description: company.description ?? "",
    mainCategoryId: String(company.main_category_id ?? ""),
    suburb: location?.suburb ?? "",
    postcode: location?.postcode ?? "",
    state: location?.state ?? "NSW",
  });
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/directory/company", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        mainCategoryId: Number(form.mainCategoryId),
      }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Unable to update company details." });
      return;
    }

    setStatus({ type: "success", message: "Company details updated." });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          <span>Company name</span>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
          />
        </label>

        <div className="block text-sm font-semibold text-slate-800">
          <span>Primary category</span>
          <CategorySearch
            categories={categories}
            value={form.mainCategoryId}
            onChange={(id) => setForm({ ...form, mainCategoryId: id })}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          <span>Phone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
          />
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          <span>Business email</span>
          <input
            type="email"
            value={form.businessEmail}
            onChange={(e) => setForm({ ...form, businessEmail: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <label className="block text-sm font-semibold text-slate-800">
          <span>Suburb</span>
          <input
            type="text"
            value={form.suburb}
            onChange={(e) => setForm({ ...form, suburb: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          <span>Postcode</span>
          <input
            type="text"
            value={form.postcode}
            onChange={(e) => setForm({ ...form, postcode: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          <span>State</span>
          <select
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          >
            {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Website</span>
        <input
          type="url"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          placeholder="https://"
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
        />
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Description</span>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={5}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
        />
      </label>

      {status ? (
        <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
          {status.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-2xl bg-sky-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
