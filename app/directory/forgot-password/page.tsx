"use client";

import { useState } from "react";

export default function DirectoryForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/directory/password-reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Unable to send reset email." });
      return;
    }

    setStatus({ type: "success", message: "If your email exists, a reset link has been sent." });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
    <div className="mx-auto max-w-5xl px-6 py-10">
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
      <h1 className="text-3xl font-extrabold text-slate-950">Forgot password</h1>
      <p className="mt-3 text-slate-600">Enter your account email and we’ll send a password reset link.</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <label className="block space-y-2 text-sm font-semibold text-slate-800">
          <span>Email address</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
          />
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
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}
