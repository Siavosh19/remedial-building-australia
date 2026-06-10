"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SUPPLIER_TYPES = ["Manufacturer", "Distributor", "Importer", "Contractor supplier", "Other"];

const PRODUCT_CATEGORIES = [
  "Concrete repair",
  "Waterproofing membranes",
  "Sealants",
  "Coatings",
  "Tile adhesives",
  "Screeds",
  "Injection systems",
  "Roofing products",
  "Drainage accessories",
  "Fire collars / penetrations",
  "Other",
];

const SERVICE_AREAS = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT", "Australia-wide"];

const SIGNUP_REASONS = [
  "Basic supplier profile",
  "Add products to product library",
  "Promote products",
  "AI Scope Writer product inclusion",
  "Other",
];

function MultiSelect({ options, value, onChange, label }: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  label: string;
}) {
  function toggle(opt: string) {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  }
  return (
    <div className="space-y-1.5">
      <span className="block text-sm font-semibold text-slate-800">{label} <span className="text-red-500">*</span></span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`rounded-xl border px-3 py-1.5 text-sm font-medium transition ${
              value.includes(opt)
                ? "border-sky-600 bg-sky-600 text-white"
                : "border-slate-300 bg-slate-50 text-slate-700 hover:border-sky-400 hover:bg-sky-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SupplierSetupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    brandName: "",
    contactPerson: "",
    contactEmail: "",
    phone: "",
    website: "",
    supplierType: "",
    productCategories: [] as string[],
    serviceAreas: [] as string[],
    signupReason: [] as string[],
    abn: "",
    billingEmail: "",
    notes: "",
  });
  const [checks, setChecks] = useState({ authorised: false, accurate: false, terms: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function field(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.productCategories.length) { setError("Please select at least one product category."); return; }
    if (!form.serviceAreas.length) { setError("Please select at least one service area."); return; }
    if (!form.signupReason.length) { setError("Please select at least one reason for signing up."); return; }
    if (!checks.authorised || !checks.accurate || !checks.terms) { setError("Please confirm all required checkboxes."); return; }

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

  const inputCls = "w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none";
  const labelCls = "block space-y-1.5 text-sm font-semibold text-slate-800";

  return (
    <div className="min-h-screen bg-slate-50 py-14 px-6">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-950">Supplier registration</h1>
        <p className="mt-2 text-sm text-slate-500">Complete your supplier profile to activate your portal. Fields marked <span className="text-red-500">*</span> are required.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* Required fields */}
          <div className="space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Brand details</h2>

            <label className={labelCls}>
              <span>Supplier / brand name <span className="text-red-500">*</span></span>
              <input type="text" value={form.brandName} onChange={field("brandName")} className={inputCls} required placeholder="e.g. Sika, Dulux, Parchem" />
            </label>

            <label className={labelCls}>
              <span>Contact person <span className="text-red-500">*</span></span>
              <input type="text" value={form.contactPerson} onChange={field("contactPerson")} className={inputCls} required placeholder="Full name" />
            </label>

            <label className={labelCls}>
              <span>Email <span className="text-red-500">*</span></span>
              <input type="email" value={form.contactEmail} onChange={field("contactEmail")} className={inputCls} required />
            </label>

            <label className={labelCls}>
              <span>Phone <span className="text-red-500">*</span></span>
              <input type="tel" value={form.phone} onChange={field("phone")} className={inputCls} required />
            </label>

            <label className={labelCls}>
              <span>Website <span className="text-red-500">*</span></span>
              <input type="url" value={form.website} onChange={field("website")} className={inputCls} required placeholder="https://" />
            </label>

            <div className="space-y-1.5">
              <span className="block text-sm font-semibold text-slate-800">Supplier type <span className="text-red-500">*</span></span>
              <select value={form.supplierType} onChange={field("supplierType")} className={inputCls} required>
                <option value="">— Select —</option>
                {SUPPLIER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <MultiSelect
              label="Product categories supplied"
              options={PRODUCT_CATEGORIES}
              value={form.productCategories}
              onChange={(v) => setForm((f) => ({ ...f, productCategories: v }))}
            />

            <MultiSelect
              label="Service area"
              options={SERVICE_AREAS}
              value={form.serviceAreas}
              onChange={(v) => setForm((f) => ({ ...f, serviceAreas: v }))}
            />

            <MultiSelect
              label="Reason for signing up"
              options={SIGNUP_REASONS}
              value={form.signupReason}
              onChange={(v) => setForm((f) => ({ ...f, signupReason: v }))}
            />
          </div>

          {/* Optional fields */}
          <div className="space-y-5 border-t border-slate-100 pt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Optional</h2>

            <label className={labelCls}>
              <span>ABN</span>
              <input type="text" value={form.abn} onChange={field("abn")} className={inputCls} placeholder="11 digits" />
            </label>

            <label className={labelCls}>
              <span>Billing email</span>
              <input type="email" value={form.billingEmail} onChange={field("billingEmail")} className={inputCls} />
            </label>

            <label className={labelCls}>
              <span>Notes / message</span>
              <textarea rows={3} value={form.notes} onChange={field("notes")} className={`${inputCls} resize-none`} placeholder="Anything else you'd like us to know" />
            </label>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Confirmations</h2>
            {[
              { key: "authorised" as const, label: "I confirm I am authorised to represent this supplier / brand." },
              { key: "accurate" as const, label: "I confirm product information submitted must be accurate and supported by TDS / SDS where applicable." },
              { key: "terms" as const, label: "I accept the website terms and privacy policy." },
            ].map(({ key, label }) => (
              <label key={key} className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={checks[key]}
                  onChange={(e) => setChecks((c) => ({ ...c, [key]: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-sky-700"
                />
                <span className="text-sm text-slate-700">{label}</span>
              </label>
            ))}
          </div>

          {error && <p className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-800">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-60 transition"
          >
            {loading ? "Submitting…" : "Submit supplier registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
