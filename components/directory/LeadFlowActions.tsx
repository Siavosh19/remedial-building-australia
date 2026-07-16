"use client";

import { useState, useEffect, useRef } from "react";
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
  requestClosed,
  weeklyRemaining,
  weeklyCap,
  tierLabel,
}: {
  deliveryId: number;
  responseStatus: string;
  interested: boolean;
  clientRequested: boolean;
  requestClosed?: boolean;
  weeklyRemaining?: number;
  weeklyCap?: number;
  tierLabel?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Optimistic overrides — a tap flips the UI instantly; reverted if the request
  // fails. router.refresh() then reconciles with the server's authoritative state.
  const [optInterested, setOptInterested] = useState(false);
  const [optDeclined, setOptDeclined] = useState(false);
  const [optOutcome, setOptOutcome] = useState<string | null>(null);

  const effInterested = interested || optInterested;
  const effDeclined = responseStatus === "declined" || optDeclined;
  const effStatus = optOutcome ?? responseStatus;

  // Arrived from a lead email's magic link (?respond=interested|declined): apply
  // the chosen response once, only if the lead is still in its initial state.
  const autoRan = useRef(false);
  useEffect(() => {
    if (autoRan.current) return;
    const respond = new URLSearchParams(window.location.search).get("respond");
    if (!respond) return;
    if (requestClosed) return; // a closed request can no longer be responded to
    if (clientRequested || interested || responseStatus === "declined") return;
    autoRan.current = true;
    if (respond === "interested") expressInterest();
    else if (respond === "declined") decline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function expressInterest() {
    setBusy("interested");
    setError(null);
    setOptDeclined(false);
    setOptInterested(true); // instant → interested view
    const res = await fetch(`/api/directory/lead-requests/${deliveryId}/interested`, { method: "POST" });
    setBusy(null);
    if (!res.ok) {
      setOptInterested(false); // revert
      const r = await res.json().catch(() => ({}));
      setError(r.error ?? "Could not submit your interest.");
      return;
    }
    router.refresh();
  }

  async function decline() {
    setBusy("declined");
    setError(null);
    setOptDeclined(true); // instant → declined view
    const res = await fetch(`/api/directory/lead-requests/${deliveryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responseStatus: "declined" }),
    });
    setBusy(null);
    if (!res.ok) {
      setOptDeclined(false); // revert
      const r = await res.json().catch(() => ({}));
      setError(r.error ?? "Could not update.");
      return;
    }
    router.refresh();
  }

  async function setOutcome(status: string) {
    setBusy(status);
    setError(null);
    const prev = optOutcome;
    setOptOutcome(status); // instant highlight
    const res = await fetch(`/api/directory/lead-requests/${deliveryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responseStatus: status }),
    });
    setBusy(null);
    if (!res.ok) {
      setOptOutcome(prev); // revert
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
            const active = effStatus === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setOutcome(o.id)}
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

  // ── Phase: client closed the request — nothing left to action ─────────────
  // Deliberately sits below phase 3: a business the client already proceeded with
  // keeps its outcome tracker, since the job itself may have gone ahead.
  if (requestClosed) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
        <p className="text-sm font-bold text-slate-700">This lead is closed</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          The client closed this request and is no longer accepting quotes.
          {effInterested ? " Your interest was submitted before it closed." : ""}
        </p>
      </div>
    );
  }

  // ── Phase: declined (Not interested) — terminal, undoable ──────────────────
  if (effDeclined) {
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
  if (effInterested) {
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
  const showAllowance = typeof weeklyRemaining === "number" && typeof weeklyCap === "number";
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-800">Are you interested in this lead?</p>
      {showAllowance && (
        <div className={`rounded-xl border px-4 py-2.5 text-sm font-semibold ${weeklyRemaining! > 0 ? "border-sky-100 bg-sky-50 text-sky-900" : "border-amber-100 bg-amber-50 text-amber-800"}`}>
          {weeklyRemaining! > 0
            ? `${weeklyRemaining} of ${weeklyCap} ${tierLabel ?? ""} leads left this week`.replace("  ", " ")
            : `You've used all ${weeklyCap} of your ${tierLabel ?? ""} leads this week — resets Monday.`.replace("  ", " ")}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={expressInterest}
          disabled={busy !== null}
          className="rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60"
        >
          {busy === "interested" ? "Submitting…" : "Interested"}
        </button>
        <button
          onClick={decline}
          disabled={busy !== null}
          className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:opacity-60"
        >
          {busy === "declined" ? "…" : "Not interested"}
        </button>
      </div>
      <p className="text-xs leading-5 text-slate-500">
        Expressing interest uses one of your weekly leads. The client's contact details are exchanged only once they
        proceed with your business.
      </p>
      {error && <p className="text-sm text-rose-700">{error}</p>}
    </div>
  );
}
