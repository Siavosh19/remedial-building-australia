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
    <div className="min-h-screen bg-slate-50 text-slate-900">
    <div className="mx-auto max-w-5xl px-6 py-10">
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
      <div className="mb-6">
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">← Back to home</Link>
      </div>
      <h1 className="text-3xl font-extrabold text-slate-950">Directory login</h1>
      <p className="mt-3 text-slate-600">Sign in with your account email and password.</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <label className="block space-y-2 text-sm font-semibold text-slate-800">
          <span>Email address</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
          />
        </label>

        <label className="block space-y-2 text-sm font-semibold text-slate-800">
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
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
          <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
            {status.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <Link href="/directory/forgot-password" className="font-semibold text-sky-950 hover:text-sky-700">
          Forgot your password?
        </Link>
        <span>
          No account?{" "}
          <Link href="/directory/signup" className="font-semibold text-sky-950 hover:text-sky-700">
            Create one
          </Link>
        </span>
      </div>
    </div>
    </div>
    </div>
  );
}
