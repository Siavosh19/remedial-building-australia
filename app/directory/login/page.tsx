"use client";

import { useState } from "react";
import Link from "next/link";

export default function DirectoryLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/directory/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, rememberMe }),
    });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Login failed." });
      return;
    }

    const dest =
      result.role === "supplier_user" ? "/supplier-dashboard" :
      result.role === "admin" || result.role === "super_admin" ? "/directory/admin" :
      "/directory/dashboard";
    window.location.href = dest;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">

            {/* Login card */}
            <div className="w-full lg:max-w-[520px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 lg:p-10">

              {/* Back link */}
              <div className="mb-8">
                <Link
                  href="/directory"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <span aria-hidden="true">&larr;</span>
                  <span>Back to directory</span>
                </Link>
              </div>

              {/* Branding */}
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Remedial Building Australia
                </p>
                <h1 className="text-2xl font-extrabold text-slate-950 leading-tight">
                  Directory Business Login
                </h1>
                <p className="mt-1 text-sm font-medium text-slate-500">Business Directory Portal</p>
                <p className="mt-1 text-sm text-slate-500">
                  Manage your listing, quote requests and subscription.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                  <span>Email address</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-950/10 transition"
                    style={{ minHeight: "48px" }}
                    placeholder="you@company.com"
                    required
                  />
                </label>

                <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
                  <span>Password</span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-950/10 transition"
                    style={{ minHeight: "48px" }}
                    placeholder="••••••••"
                    required
                  />
                </label>

                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-sky-950"
                  />
                  <span className="text-sm text-slate-600">Stay signed in for 30 days</span>
                </label>

                {status ? (
                  <div
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      status.type === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-rose-200 bg-rose-50 text-rose-800"
                    }`}
                  >
                    {status.message}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-sky-950 px-5 font-semibold text-white transition hover:bg-sky-800 active:bg-sky-900 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ minHeight: "50px" }}
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </form>

              {/* Bottom links */}
              <div className="mt-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <Link
                    href="/directory/forgot-password"
                    className="font-medium text-sky-950 hover:text-sky-700 transition-colors"
                  >
                    Forgot your password?
                  </Link>
                  <Link
                    href="/directory/signup"
                    className="font-medium text-sky-950 hover:text-sky-700 transition-colors"
                  >
                    Create account
                  </Link>
                </div>
                <p className="text-center text-xs text-slate-400">
                  Need help?{" "}
                  <Link href="/contact" className="underline underline-offset-2 hover:text-slate-600 transition-colors">
                    Contact support
                  </Link>
                </p>
              </div>
            </div>

            {/* Right info panel — desktop only */}
            <div className="hidden lg:flex flex-1 flex-col justify-center rounded-2xl bg-sky-950 p-10 text-white">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/50">
                Business Portal
              </p>
              <h2 className="mb-6 text-xl font-bold leading-snug">
                Everything you need to<br />manage your listing
              </h2>
              <ul className="space-y-4">
                {[
                  "Claim and manage your listing",
                  "Receive quote requests",
                  "Track profile views",
                  "Manage your subscription",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white">
                      &#10003;
                    </span>
                    <span className="text-sm text-white/85">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-xs text-white/40">
                  Remedial Building Australia &mdash; Trusted by building professionals nationwide.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
