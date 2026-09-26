"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";

export default function SubscriptionClient({
  canSubscribe,
  hasSubscription,
  monthly,
  yearly,
}: {
  canSubscribe: boolean;
  hasSubscription: boolean;
  monthly: string;
  yearly: string;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function go(path: string, body?: Record<string, unknown>) {
    setBusy(path);
    setError(null);
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
    });
    const json = await res.json().catch(() => ({}));
    setBusy(null);
    if (!res.ok || !json.url) {
      setError(json.error ?? "That did not work.");
      return;
    }
    window.location.href = json.url;
  }

  return (
    <div className="space-y-4">
      {canSubscribe && (
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => go("/api/client/strata/checkout", { interval: "monthly" })}
            disabled={busy !== null}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-slate-300 disabled:opacity-60"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Monthly</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">{monthly}</p>
            <p className="mt-1 text-xs text-slate-500">Billed every month. Cancel any time.</p>
          </button>

          <button
            onClick={() => go("/api/client/strata/checkout", { interval: "yearly" })}
            disabled={busy !== null}
            className="rounded-2xl border-2 border-sky-700 bg-sky-50 p-5 text-left shadow-sm transition hover:bg-sky-100 disabled:opacity-60"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">Yearly</p>
              <span className="rounded-full bg-sky-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                2 months free
              </span>
            </div>
            <p className="mt-1 text-2xl font-extrabold text-sky-950">{yearly}</p>
            <p className="mt-1 text-xs text-sky-900/70">Billed once a year.</p>
          </button>
        </div>
      )}

      {hasSubscription && (
        <button
          onClick={() => go("/api/client/strata/portal")}
          disabled={busy !== null}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        >
          <CreditCard size={15} /> Cards, invoices and cancelling
        </button>
      )}

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}
