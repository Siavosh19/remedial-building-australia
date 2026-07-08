"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Briefcase, Mail, CheckCircle2 } from "lucide-react";

function LoginInner() {
  const params = useSearchParams();
  const next = params.get("next") ?? undefined;
  const expired = params.get("error") === "expired";

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/industry-jobs/auth/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <div className="mb-6 flex items-center gap-2 text-red-700">
        <Briefcase size={18} />
        <span className="text-sm font-extrabold uppercase tracking-[0.2em]">Employer Sign-in</span>
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-sky-950">Post &amp; manage jobs</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        No password needed. Enter your email and we&apos;ll send you a secure sign-in link.
      </p>

      {expired && !sent && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          That link has expired. Enter your email to get a fresh one.
        </p>
      )}

      {sent ? (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <CheckCircle2 className="mx-auto mb-3 text-emerald-600" size={32} />
          <p className="text-base font-bold text-emerald-900">Check your inbox</p>
          <p className="mt-1 text-sm leading-6 text-emerald-800">
            We&apos;ve sent a sign-in link to <strong>{email}</strong>. It&apos;s valid for 45 minutes.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-sky-950">Email address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com.au"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-red-700 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Email me a sign-in link"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function EmployerLoginPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-5 py-16 text-sm text-slate-400">Loading…</div>}>
      <LoginInner />
    </Suspense>
  );
}
