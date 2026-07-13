"use client";

import { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";

export default function DirectoryLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  // Shown when login is blocked because the account's email isn't verified yet —
  // lets the user resend the verification email (50s cooldown between sends).
  const [needsVerify, setNeedsVerify] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState<string | null>(null);

  // Cooldown countdown for the resend button.
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  async function resendVerification() {
    if (resending || resendIn > 0) return;
    setResending(true);
    setResendMsg(null);
    try {
      await fetch("/api/directory/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      setResendMsg("Verification email sent — check your inbox (and your spam folder).");
      setResendIn(50);
    } catch {
      setResendMsg("Couldn't resend just now. Please try again shortly.");
    } finally {
      setResending(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setNeedsVerify(false);
    setLoading(true);

    const response = await fetch("/api/directory/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, rememberMe }),
    });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      // 403 = account exists but email isn't verified → offer a resend instead of
      // a dead-end error. Any other failure shows the normal error message.
      if (response.status === 403) {
        setNeedsVerify(true);
        setResendMsg(null);
      } else {
        setStatus({ type: "error", message: result.error ?? "Login failed." });
      }
      return;
    }

    const dest =
      result.role === "supplier_user" ? "/supplier-dashboard" :
      result.role === "client_user" ? "/client/dashboard" :
      result.role === "admin" || result.role === "super_admin" ? "/directory/admin" :
      "/directory/dashboard";
    window.location.href = dest;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <SiteHeader />

      <main className="flex-1">

        {/* ── Page intro ─────────────────────────────────────────────────────── */}
        <section data-pwa-hide className="border-b border-sky-900/30 bg-sky-950 px-8 py-8">
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

            {/* Back link (hidden in the installed PWA — it's an app, no website) */}
            <div data-pwa-hide className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-lg font-bold text-slate-900 transition-colors hover:text-black"
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

            {/* Email-not-verified — grey box under the login form, centered, with a resend option */}
            {needsVerify && (
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-100 px-4 py-4 text-center text-sm text-slate-700">
                <p className="font-semibold text-slate-800">Your email isn&apos;t verified yet.</p>
                <p className="mt-1 text-slate-600">
                  Please verify your email before signing in. Check your inbox for the verification link — didn&apos;t get it?
                </p>
                <button
                  type="button"
                  onClick={resendVerification}
                  disabled={resending || resendIn > 0}
                  className="mt-3 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resending
                    ? "Sending…"
                    : resendIn > 0
                    ? `Resend in ${resendIn}s`
                    : "Resend verification email"}
                </button>
                {resendMsg && <p className="mt-2 font-medium text-emerald-700">{resendMsg}</p>}
              </div>
            )}

            {/* Bottom links */}
            <div className="mt-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-lg">
                <Link
                  href="/directory/forgot-password"
                  className="font-bold text-slate-900 transition-colors hover:text-black"
                >
                  Forgot your password?
                </Link>
                <Link
                  href="/directory/signup?type=directory"
                  className="font-bold text-slate-900 transition-colors hover:text-black"
                >
                  Create account
                </Link>
              </div>
              <p className="text-center text-lg font-bold text-slate-900">
                Need help?{" "}
                <Link href="/contact" className="underline underline-offset-2 transition-colors hover:text-black">
                  Contact support
                </Link>
              </p>
            </div>

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
            <div className="flex flex-col gap-2">
              <a href="/directory" className="hover:text-sky-700">Business Directory</a>
              <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
              <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
              <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/advertise" className="hover:text-sky-700">Advertise With Us</a>
              <a href="/contact" className="hover:text-sky-700">Contact</a>
              <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
              <a href="/terms" className="hover:text-sky-700">Terms</a>
              <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>

    </div>
  );
}
