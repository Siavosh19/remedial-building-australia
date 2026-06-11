"use client";

import { useState } from "react";
import Link from "next/link";

export default function DirectoryLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-4">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap transition hover:text-red-700">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          </nav>
          <a
            href="/directory/login"
            className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 md:inline-flex"
          >
            Login / Create Account
          </a>
          <button
            className="p-1 md:hidden"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
        {mobileNavOpen && (
          <div className="border-t border-sky-100 bg-white px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm font-semibold text-sky-800">
              <a href="/" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Home</a>
              <a href="/repair-systems" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Repair Systems</a>
              <a href="/industry-news" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">News &amp; Insights</a>
              <a href="/directory" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Directory</a>
              <a href="/ai-scope-builder" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">AI Scope Builder</a>
              <a href="/directory/login" onClick={() => setMobileNavOpen(false)} className="mt-2 inline-flex rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 transition">Login / Create Account</a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">

        {/* ── Page intro ─────────────────────────────────────────────────────── */}
        <section className="border-b border-sky-900/30 bg-sky-950 px-8 py-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-sky-400">
              Account Portal
            </p>
            <h1 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
              Remedial Building Australia Portal
            </h1>
            <p className="mt-2 text-sm text-sky-200/80">
              Sign in to access your account, tools, listings and subscriptions.
            </p>
          </div>
        </section>

        {/* ── Login card ─────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-4 py-12">

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">

            {/* Back link */}
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
              >
                <span aria-hidden="true">&larr;</span>
                <span>Back to website</span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Account Access
              </p>
              <h2 className="text-2xl font-extrabold leading-tight text-slate-950">
                Account Login
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Access your dashboard, saved tools, listings and account settings.
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
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-950/10"
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
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-950/10"
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
                className="w-full rounded-xl bg-red-700 px-5 font-semibold text-white transition hover:bg-red-800 active:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60"
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
                  className="font-medium text-sky-950 transition-colors hover:text-sky-700"
                >
                  Forgot your password?
                </Link>
                <Link
                  href="/directory/signup"
                  className="font-medium text-sky-950 transition-colors hover:text-sky-700"
                >
                  Create account
                </Link>
              </div>
              <p className="text-center text-xs text-slate-400">
                Need help?{" "}
                <Link href="/contact" className="underline underline-offset-2 transition-colors hover:text-slate-600">
                  Contact support
                </Link>
              </p>
            </div>

          </div>

          {/* ── Info panel — below card, light and compact ──────────────────── */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-white px-6 py-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Portal Access
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
              {[
                "Manage your listing",
                "Receive quote requests",
                "Track profile views",
                "Manage subscription",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-400">
                    ✓
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            <a href="/directory" className="hover:text-sky-700">Business Directory</a>
            <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>

    </div>
  );
}
