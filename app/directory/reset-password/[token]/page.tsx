"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import AuthHeader from "@/components/AuthHeader";

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/directory/password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, ...form }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Unable to reset password." });
      return;
    }

    setStatus({ type: "success", message: "Password reset successfully. Redirecting to login…" });
    window.setTimeout(() => router.push("/directory/login"), 1800);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
    <AuthHeader />
    <div className="mx-auto max-w-5xl px-6 py-10">
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
      <h1 className="text-3xl font-extrabold text-slate-950">Reset your password</h1>
      <p className="mt-3 text-slate-600">Choose a new password for your directory account.</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <label className="block space-y-2 text-sm font-semibold text-slate-800">
          <span>New password</span>
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
          {loading ? "Resetting…" : "Reset password"}
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}
