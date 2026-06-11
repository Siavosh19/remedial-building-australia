"use client";

import { useState } from "react";

export default function PasswordChangeForm() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/directory/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Unable to change password." });
      return;
    }

    setStatus({ type: "success", message: "Password changed successfully." });
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-semibold text-slate-800">
        <span>Current password</span>
        <input
          type="password"
          value={form.currentPassword}
          onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          required
        />
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        <span>New password</span>
        <input
          type="password"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          minLength={8}
          required
        />
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Confirm new password</span>
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
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
        className="inline-flex items-center justify-center rounded-2xl bg-sky-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Updating…" : "Change password"}
      </button>
    </form>
  );
}
