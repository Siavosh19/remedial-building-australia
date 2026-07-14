"use client";

import { useState } from "react";
import { Inbox, Check } from "lucide-react";

// Lead cards shown directly on the business dashboard. Each card has an
// "Interested" button — tapping it refers the business to the client (no detail
// page to open, no messaging). Optimistic UI: the card flips to "Interested" on
// click and the server records it + notifies the client.

export type DashboardLead = {
  id: number;
  category: string;
  location: string;
  date: string;
  urgency: string | null;
  isNew: boolean;
  interested: boolean;
};

export default function DashboardLeadCards({ leads: initial }: { leads: DashboardLead[] }) {
  const [leads, setLeads] = useState(initial);
  const [busyId, setBusyId] = useState<number | null>(null);

  async function markInterested(id: number) {
    setBusyId(id);
    // Optimistic — flip immediately; revert on failure.
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, interested: true, isNew: false } : l)));
    try {
      const res = await fetch(`/api/directory/lead-requests/${id}/interested`, { method: "POST" });
      if (!res.ok) setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, interested: false } : l)));
    } catch {
      setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, interested: false } : l)));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <ul className="divide-y divide-slate-50">
      {leads.map((l) => (
        <li key={l.id} className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            <Inbox size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-sm font-bold text-slate-800">{l.category}</p>
              {l.urgency && (
                <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">{l.urgency}</span>
              )}
              {l.isNew && !l.interested && (
                <span className="shrink-0 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">New</span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-slate-400">{l.location} · {l.date}</p>
          </div>
          {l.interested ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
              <Check size={14} /> Interested
            </span>
          ) : (
            <button
              onClick={() => markInterested(l.id)}
              disabled={busyId === l.id}
              className="shrink-0 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-500 disabled:opacity-60"
            >
              {busyId === l.id ? "…" : "Interested"}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
