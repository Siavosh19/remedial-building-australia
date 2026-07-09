"use client";

import { useState } from "react";
import { AU_STATES, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS } from "@/lib/jobs-data";
import { Upload, Building2, Star, Eye, Pencil } from "lucide-react";

export type JobFormInitial = {
  id?: number;
  title?: string;
  company_name?: string;
  company_logo_url?: string | null;
  company_website?: string | null;
  company_about?: string | null;
  category_slug?: string | null;
  location?: string;
  state?: string | null;
  employment_type?: string | null;
  experience_level?: string | null;
  salary?: string | null;
  description?: string;
  responsibilities?: string | null;
  requirements?: string | null;
  contact_email?: string;
  closing_date?: string | null; // yyyy-mm-dd
  is_featured?: boolean;
};

type Pricing = { standard: string | null; featured: string | null };

const input =
  "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-sky-950 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100";
const label = "mb-1.5 block text-sm font-semibold text-sky-950";

// Pretty-print a pure-number salary as currency ($1,222,222). Leaves ranges or
// text (e.g. "$110k – $130k + super") untouched so the field stays flexible.
function formatSalary(v: string): string {
  const digits = v.replace(/[$,\s]/g, "");
  if (digits.length > 0 && /^\d+$/.test(digits)) {
    return "$" + Number(digits).toLocaleString("en-AU");
  }
  return v;
}

export default function JobForm({
  mode,
  initial = {},
  employerEmail,
  pricing,
}: {
  mode: "create" | "edit";
  initial?: JobFormInitial;
  employerEmail: string;
  pricing: Pricing;
}) {
  const [f, setF] = useState<JobFormInitial>({
    contact_email: employerEmail,
    is_featured: false,
    ...initial,
  });
  const [logoUrl, setLogoUrl] = useState<string | null>(initial.company_logo_url ?? null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof JobFormInitial, v: unknown) => setF((p) => ({ ...p, [k]: v }));

  async function uploadLogo(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("logo", file);
      const res = await fetch("/api/industry-jobs/employer/logo", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Upload failed.");
      setLogoUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function validate(): string | null {
    if (!f.title?.trim()) return "Job title is required.";
    if (!f.company_name?.trim()) return "Company name is required.";
    if (!f.location?.trim()) return "Location is required.";
    if (!f.description?.trim()) return "Job description is required.";
    if (!f.contact_email?.trim()) return "Contact email is required.";
    return null;
  }

  function payload() {
    return {
      title: f.title,
      company_name: f.company_name,
      company_logo_url: logoUrl,
      company_website: f.company_website,
      company_about: f.company_about,
      category: f.category_slug,
      location: f.location,
      state: f.state,
      employment_type: f.employment_type,
      experience_level: f.experience_level,
      salary: f.salary,
      description: f.description,
      responsibilities: f.responsibilities,
      requirements: f.requirements,
      contact_email: f.contact_email,
      closing_date: f.closing_date,
      is_featured: f.is_featured,
    };
  }

  // Create mode → create draft then go to payment. Edit mode → save changes.
  async function proceed() {
    const v = validate();
    if (v) { setError(v); setPreview(false); return; }
    setBusy(true);
    setError(null);
    try {
      if (mode === "edit" && initial.id) {
        const res = await fetch(`/api/industry-jobs/jobs/${initial.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload()),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error ?? "Save failed.");
        window.location.href = "/industry-jobs/employer?saved=1";
        return;
      }

      // create
      const res = await fetch("/api/industry-jobs/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Could not save the job.");

      const co = await fetch(`/api/industry-jobs/jobs/${data.id}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_featured: f.is_featured }),
      });
      const cod = await co.json().catch(() => ({}));
      if (!co.ok) throw new Error(cod.error ?? "Could not start payment.");
      if (cod.checkoutUrl) { window.location.href = cod.checkoutUrl; return; }
      window.location.href = "/industry-jobs/employer?published=1";
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  // ── Preview ──────────────────────────────────────────────────────────────────
  if (preview) {
    return (
      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-400">Preview</p>
          <button onClick={() => setPreview(false)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-red-700">
            <Pencil size={14} /> Keep editing
          </button>
        </div>
        <div className={`rounded-2xl border bg-white p-6 shadow-sm ${f.is_featured ? "border-amber-300 ring-1 ring-amber-200" : "border-slate-200"}`}>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              {logoUrl ? <img src={logoUrl} alt="" className="h-full w-full object-contain" /> : <Building2 className="text-slate-300" size={26} />}
            </div>
            <div>
              {f.is_featured && <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-800"><Star size={10} className="fill-amber-500 text-amber-500" /> Featured</span>}
              <h2 className="text-xl font-extrabold text-sky-950">{f.title || "Job title"}</h2>
              <p className="text-sm font-semibold text-slate-600">{f.company_name || "Company"} · {f.location || "Location"}{f.state ? `, ${f.state}` : ""}</p>
              {f.salary && <p className="mt-1 text-sm font-semibold text-emerald-700">{f.salary}</p>}
            </div>
          </div>
          {f.description && <div className="mt-4"><h3 className="text-sm font-extrabold text-sky-950">About the Role</h3><p className="mt-1 whitespace-pre-line text-sm leading-7 text-slate-600">{f.description}</p></div>}
          {f.responsibilities && <div className="mt-4"><h3 className="text-sm font-extrabold text-sky-950">Responsibilities</h3><p className="mt-1 whitespace-pre-line text-sm leading-7 text-slate-600">{f.responsibilities}</p></div>}
          {f.requirements && <div className="mt-4"><h3 className="text-sm font-extrabold text-sky-950">Requirements</h3><p className="mt-1 whitespace-pre-line text-sm leading-7 text-slate-600">{f.requirements}</p></div>}
          {f.company_about && <div className="mt-4"><h3 className="text-sm font-extrabold text-sky-950">About the Company</h3><p className="mt-1 whitespace-pre-line text-sm leading-7 text-slate-600">{f.company_about}</p></div>}
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={proceed} disabled={busy} className="rounded-xl bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60">
            {busy ? "Please wait…" : mode === "edit" ? "Save changes" : "Proceed to payment"}
          </button>
          <button onClick={() => setPreview(false)} className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-sky-800 hover:border-sky-300">
            Back
          </button>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <div className="mt-6 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Job title *</label>
          <input className={input} value={f.title ?? ""} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Remedial Estimator" />
        </div>
        <div>
          <label className={label}>Company name *</label>
          <input className={input} value={f.company_name ?? ""} onChange={(e) => set("company_name", e.target.value)} />
        </div>
        <div>
          <label className={label}>Company logo</label>
          <label className="flex h-[42px] cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 text-sm text-slate-500 hover:border-sky-400">
            {logoUrl ? <img src={logoUrl} alt="" className="h-7 w-7 rounded object-contain" /> : <Upload size={16} />}
            <span className="truncate">{uploading ? "Uploading…" : logoUrl ? "Change logo" : "Upload logo"}</span>
            <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadLogo(file); }} />
          </label>
        </div>
        <div>
          <label className={label}>Company website</label>
          <input className={input} value={f.company_website ?? ""} onChange={(e) => set("company_website", e.target.value)} placeholder="https://" />
        </div>
        <div>
          <label className={label}>Location *</label>
          <input className={input} value={f.location ?? ""} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Sydney" />
        </div>
        <div>
          <label className={label}>State</label>
          <select className={input} value={f.state ?? ""} onChange={(e) => set("state", e.target.value)}>
            <option value="">Select state</option>
            {AU_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Employment type</label>
          <select className={input} value={f.employment_type ?? ""} onChange={(e) => set("employment_type", e.target.value)}>
            <option value="">Select type</option>
            {EMPLOYMENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Experience level</label>
          <select className={input} value={f.experience_level ?? ""} onChange={(e) => set("experience_level", e.target.value)}>
            <option value="">Select level</option>
            {EXPERIENCE_LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Salary (optional)</label>
          <input className={input} value={f.salary ?? ""} onChange={(e) => set("salary", formatSalary(e.target.value))} placeholder="e.g. $110k – $130k + super" />
        </div>
        <div>
          <label className={label}>Closing date (optional)</label>
          <input type="date" className={input} value={f.closing_date ?? ""} onChange={(e) => set("closing_date", e.target.value)} />
        </div>
        <div>
          <label className={label}>Contact email *</label>
          <input type="email" className={input} value={f.contact_email ?? ""} onChange={(e) => set("contact_email", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={label}>About the role *</label>
        <textarea rows={5} className={input} value={f.description ?? ""} onChange={(e) => set("description", e.target.value)} />
      </div>
      <div>
        <label className={label}>Responsibilities</label>
        <textarea rows={4} className={input} value={f.responsibilities ?? ""} onChange={(e) => set("responsibilities", e.target.value)} placeholder="One per line" />
      </div>
      <div>
        <label className={label}>Requirements</label>
        <textarea rows={4} className={input} value={f.requirements ?? ""} onChange={(e) => set("requirements", e.target.value)} placeholder="One per line" />
      </div>
      <div>
        <label className={label}>About the company</label>
        <textarea rows={4} className={input} value={f.company_about ?? ""} onChange={(e) => set("company_about", e.target.value)} />
      </div>

      {/* Listing type */}
      <div>
        <label className={label}>Listing type</label>
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={() => set("is_featured", false)} className={`rounded-xl border p-4 text-left transition ${!f.is_featured ? "border-sky-500 bg-sky-50 ring-1 ring-sky-200" : "border-slate-200 hover:border-slate-300"}`}>
            <p className="text-sm font-bold text-sky-950">Standard</p>
            <p className="mt-0.5 text-xs text-slate-500">30-day listing{pricing.standard ? ` · ${pricing.standard}` : ""}</p>
          </button>
          <button type="button" onClick={() => set("is_featured", true)} className={`rounded-xl border p-4 text-left transition ${f.is_featured ? "border-amber-400 bg-amber-50 ring-1 ring-amber-200" : "border-slate-200 hover:border-slate-300"}`}>
            <p className="flex items-center gap-1.5 text-sm font-bold text-sky-950"><Star size={13} className="fill-amber-500 text-amber-500" /> Featured</p>
            <p className="mt-0.5 text-xs text-slate-500">Badge + top placement{pricing.featured ? ` · ${pricing.featured}` : ""}</p>
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-3 pt-2">
        <button onClick={() => { const v = validate(); if (v) { setError(v); return; } setError(null); setPreview(true); }} className="inline-flex items-center gap-2 rounded-xl bg-sky-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-900">
          <Eye size={16} /> Preview job
        </button>
        {mode === "edit" && (
          <button onClick={proceed} disabled={busy} className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-sky-800 hover:border-sky-300 disabled:opacity-60">
            {busy ? "Saving…" : "Save without preview"}
          </button>
        )}
      </div>
    </div>
  );
}
