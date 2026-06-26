"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const FIELDS = [
  { name: "businessName", label: "Business Name", type: "text", required: true, placeholder: "Your company name" },
  { name: "contactName", label: "Contact Name", type: "text", required: true, placeholder: "Your name" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@business.com.au" },
  { name: "phone", label: "Phone Number", type: "tel", required: false, placeholder: "04xx xxx xxx" },
  { name: "website", label: "Website URL", type: "url", required: false, placeholder: "https://" },
] as const;

const PLACEMENTS = [
  "Directory page banner",
  "Homepage feature",
  "Category / search pages",
  "News & Insights / newsletter",
  "Not sure — please advise",
];

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function AdvertiseForm() {
  const [form, setForm] = useState({
    businessName: "", contactName: "", email: "", phone: "", website: "", placement: "", message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function update(name: string, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (file && file.size > MAX_FILE_BYTES) {
      setError("Your attachment is larger than 10 MB. Please attach a smaller file.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("attachment", file);
      const res = await fetch("/api/advertise/enquiry", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 text-xl font-bold text-emerald-900">Your request has been submitted</h3>
        <p className="mt-2 text-sm leading-7 text-emerald-800">
          Thank you — one of our marketing consultants will be in touch with you shortly. We&rsquo;ve also sent a
          confirmation to your email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <label key={field.name} className={`block text-sm font-semibold text-slate-800 ${field.name === "website" ? "sm:col-span-2" : ""}`}>
            <span>
              {field.label}
              {field.required && <span className="text-red-600"> *</span>}
            </span>
            <input
              type={field.type}
              required={field.required}
              value={form[field.name as keyof typeof form]}
              onChange={(e) => update(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-normal text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>
        ))}
      </div>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Preferred advertising placement<span className="text-red-600"> *</span></span>
        <select
          required
          value={form.placement}
          onChange={(e) => update("placement", e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-normal text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        >
          <option value="" disabled>Select a placement…</option>
          {PLACEMENTS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Attach a design <span className="font-normal text-slate-400">(optional — if you already have one in mind)</span></span>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-normal text-slate-700 shadow-sm outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
        <span className="mt-1 block text-xs font-normal text-slate-400">Images or PDF, up to 10 MB.</span>
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Message / What would you like to promote?</span>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us a little about your business and what you'd like to advertise."
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-normal text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </label>

      {status === "error" && error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          style={{ backgroundColor: "#0a2540" }}
        >
          {status === "loading" ? "Sending…" : "Send Enquiry →"}
        </button>
        <p className="mt-3 text-xs text-slate-500">One of our marketing consultants will be in touch with you shortly.</p>
      </div>
    </form>
  );
}
