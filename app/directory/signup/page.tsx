"use client";

import { useState } from "react";
import Link from "next/link";

export default function DirectorySignupPage() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/directory/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Unable to submit. Please try again." });
      return;
    }

    setStatus({ type: "success", message: "Verification email sent. Please check your inbox to continue." });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
    <div className="mx-auto max-w-5xl px-6 py-10">
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
      <h1 className="text-3xl font-extrabold text-slate-950">Create your directory account</h1>
      <p className="mt-3 text-slate-600">Start with your account details, then verify your email before setting up your company.</p>

      {status?.type === "success" ? (
        <div className="mt-10 rounded-2xl bg-emerald-100 px-6 py-5 text-emerald-900">
          <p className="font-semibold">Check your inbox</p>
          <p className="mt-1 text-sm">{status.message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <label className="block space-y-2 text-sm font-semibold text-slate-800">
            <span>Full name</span>
            <input
              type="text"
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
              required
            />
          </label>

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
            <span>Phone number</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
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
              minLength={8}
              required
            />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-slate-800">
            <span>Confirm password</span>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
              minLength={8}
              required
            />
          </label>

          {status?.type === "error" ? (
            <div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-900">
              {status.message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
      )}

      <div className="mt-6 text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/directory/login" className="font-semibold text-sky-950 hover:text-sky-700">
          Sign in
        </Link>
      </div>
    </div>
    </div>
    </div>
  );
}
