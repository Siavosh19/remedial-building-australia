"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Upload } from "lucide-react";

const STORAGE_KEY = "rba_jobs_applicant";

export default function ApplyForm({ jobSlug }: { jobSlug: string }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cover, setCover] = useState("");
  const [remember, setRemember] = useState(true);
  const [fileName, setFileName] = useState("");
  const [honey, setHoney] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  // Prefill from this device's saved details (name/email/phone only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.name) setFullName(d.name);
        if (d.email) setEmail(d.email);
        if (d.phone) setPhone(d.phone);
      }
    } catch { /* ignore */ }
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    if (remember) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: fullName, email, phone }));
      } catch { /* ignore */ }
    } else {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    }

    const fd = new FormData(e.currentTarget);
    fd.set("job_slug", jobSlug);

    try {
      const res = await fetch("/api/industry-jobs/apply", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 text-emerald-600" size={36} />
        <p className="text-lg font-extrabold text-emerald-900">Application sent successfully.</p>
        <p className="mt-1 text-sm text-emerald-800">We&apos;ve emailed you a confirmation. The employer will contact you directly if shortlisted.</p>
        <Link href="/industry-jobs" className="mt-5 inline-block text-sm font-bold text-sky-700 hover:text-red-700">Browse more jobs →</Link>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-sky-950 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100";

  return (
    <form onSubmit={submit} className="mt-6 space-y-4" encType="multipart/form-data">
      {/* Honeypot — visually hidden, off-screen; real users leave it blank */}
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-sky-950">Full name *</label>
        <input name="full_name" required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-sky-950">Email *</label>
          <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-sky-950">Phone</label>
          <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-sky-950">Résumé (PDF, DOC or DOCX)</label>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500 transition hover:border-sky-400">
          <Upload size={16} />
          <span className="truncate">{fileName || "Choose file…"}</span>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            className="hidden"
          />
        </label>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-sky-950">Cover message</label>
        <textarea name="cover_message" rows={5} value={cover} onChange={(e) => setCover(e.target.value)} placeholder="Tell the employer briefly why you're a good fit (optional)." className={inputCls} />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-sky-950">
        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
        Remember my details on this device
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={status === "sending"} className="w-full rounded-xl bg-red-700 py-3.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Submit application"}
      </button>
      <p className="text-center text-xs text-slate-400">Your details are sent to the employer for this role only. No account is created.</p>
    </form>
  );
}
