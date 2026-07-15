"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LEAD_OUTCOME_OPTIONS } from "@/lib/quote-options";

// The business-side action panel for a single lead. It has three phases:
//   1. New lead        → Interested / Not interested
//   2. Interested      → "waiting for the client to proceed" (contacts still hidden)
//   3. Client proceeded → outcome tracker (Quoted / Won / Didn't proceed)
// "declined" (Not interested) is terminal but can be undone.
export default function LeadFlowActions({
  deliveryId,
  responseStatus,
  interested,
  clientRequested,
}: {
  deliveryId: number;
  responseStatus: string;
  interested: boolean;
  clientRequested: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function expressInterest() {
    setBusy("interested");
    setError(null);
    const res = await fetch(`/api/directory/lead-requests/${deliveryId}/interested`, { method: "POST" });
    setBusy(null);
    if (!res.ok) {
      const r = await res.json().catch(() => ({}));
      setError(r.error ?? "Could not submit your interest.");
      return;
    }
    router.refresh();
  }

  async function setStatus(status: string) {
    setBusy(status);
    setError(null);
    const res = await fetch(`/api/directory/lead-requests/${deliveryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responseStatus: status }),
    });
    setBusy(null);
    if (!res.ok) {
      const r = await res.json().catch(() => ({}));
      setError(r.error ?? "Could not update.");
      return;
    }
    router.refresh();
  }

  // ── Phase 3: client has proceeded — outcome tracker ────────────────────────
  if (clientRequested) {
    return (
      <div className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">How did this lead go?</p>
          <p className="mt-0.5 text-xs text-slate-500">For your records — this isn't shown to the client.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {LEAD_OUTCOME_OPTIONS.map((o) => {
            const active = responseStatus === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setStatus(o.id)}
                disabled={busy !== null}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-60 ${
                  active ? "bg-sky-950 text-white" : "border border-slate-300 bg-white text-slate-700 hover:border-sky-400"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
        {error && <p className="text-sm text-rose-700">{error}</p>}
      </div>
    );
  }

  // ── Phase: declined (Not interested) — terminal, undoable ──────────────────
  if (responseStatus === "declined") {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-700">You marked this lead as not interested.</p>
        <button
          onClick={expressInterest}
          disabled={busy !== null}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-400 disabled:opacity-60"
        >
          {busy === "interested" ? "Submitting…" : "Actually, I'm interested"}
        </button>
        {error && <p className="text-sm text-rose-700">{error}</p>}
      </div>
    );
  }

  // ── Phase 2: interested, waiting on the client ─────────────────────────────
  if (interested) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4">
        <p className="text-sm font-bold text-emerald-800">Your interest has been submitted ✓</p>
        <p className="mt-1 text-sm leading-6 text-emerald-900/80">
          The client has been notified. Once they proceed with your business, their contact details will be
          exchanged here and you'll be able to quote.
        </p>
      </div>
    );
  }

  // ── Phase 1: new lead — Interested / Not interested ────────────────────────
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-800">Are you interested in this lead?</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={expressInterest}
          disabled={busy !== null}
          className="rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60"
        >
          {busy === "interested" ? "Submitting…" : "Interested"}
        </button>
        <button
          onClick={() => setStatus("declined")}
          disabled={busy !== null}
          className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:opacity-60"
        >
          {busy === "declined" ? "…" : "Not interested"}
        </button>
      </div>
      <p className="text-xs leading-5 text-slate-500">
        Expressing interest counts toward your weekly lead allowance. The client's contact details are exchanged only
        once they proceed with your business.
      </p>
      {error && <p className="text-sm text-rose-700">{error}</p>}
    </div>
  );
}
