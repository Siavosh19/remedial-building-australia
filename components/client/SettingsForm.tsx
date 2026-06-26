"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLIENT_TYPE_OPTIONS } from "@/lib/quote-options";

type Props = {
  email: string;
  defaults: { fullName: string; phone: string; companyName: string; clientType: string };
};

export default function SettingsForm({ email, defaults }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(defaults);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [resetMsg, setResetMsg] = useState<string | null>(null);

  const inputClass = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-sky-600 focus:outline-none";
  const labelClass = "block space-y-1.5 text-sm font-semibold text-slate-800";

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    const res = await fetch("/api/client/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const r = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setStatus({ type: "error", message: r.error ?? "Could not save changes." });
      return;
    }
    setStatus({ type: "success", message: "Your details have been saved." });
    router.refresh();
  }

  async function sendReset() {
    setResetMsg(null);
    const res = await fetch("/api/directory/password-reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setResetMsg(res.ok ? "If your email is registered, a password reset link is on its way." : "Could not send reset email.");
  }

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-base font-bold text-slate-900">Account details</h2>

        <label className={labelClass}>
          <span>Email</span>
          <input className={`${inputClass} bg-slate-50 text-slate-500`} value={email} disabled />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            <span>Full name</span>
            <input className={inputClass} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          </label>
          <label className={labelClass}>
            <span>Phone</span>
            <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
        </div>

        <label className={labelClass}>
          <span>Company / strata management company <span className="font-normal text-slate-400">(optional)</span></span>
          <input className={inputClass} value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
        </label>

        <label className={labelClass}>
          <span>Which best describes you?</span>
          <select className={inputClass} value={form.clientType} onChange={(e) => setForm({ ...form, clientType: e.target.value })} required>
            <option value="">Select…</option>
            {CLIENT_TYPE_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>{o.label}</option>
            ))}
          </select>
        </label>

        {status && (
          <div className={`rounded-xl px-4 py-3 text-sm ${status.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
            {status.message}
          </div>
        )}

        <button type="submit" disabled={busy} className="rounded-xl bg-sky-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60">
          {busy ? "Saving…" : "Save changes"}
        </button>
      </form>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-base font-bold text-slate-900">Password</h2>
        <p className="mt-1 text-sm text-slate-500">We'll email you a secure link to set a new password.</p>
        <button onClick={sendReset} className="mt-4 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
          Send password reset email
        </button>
        {resetMsg && <p className="mt-3 text-sm text-emerald-700">{resetMsg}</p>}
      </div>
    </div>
  );
}
