"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronDown } from "lucide-react";

// The profile checklist, moved out of the top of the dashboard into a collapsible
// panel below Recent Leads (leads are the priority; profile setup is secondary).

export type ChecklistItem = { label: string; done: boolean; locked: boolean };

export default function ProfileChecklistCollapsible({
  items,
  completed,
  total,
  plan,
}: {
  items: ChecklistItem[];
  completed: number;
  total: number;
  plan: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div>
          <p className="font-bold text-sky-950">Profile checklist</p>
          <p className="mt-0.5 text-xs text-slate-400">{completed} of {total} complete</p>
        </div>
        <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-slate-100">
          <ul className="divide-y divide-slate-50 px-5">
            {items.map((it) => (
              <li key={it.label} className="flex items-center gap-3 py-3">
                {it.done ? (
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                ) : (
                  <Circle size={16} className={`shrink-0 ${it.locked ? "text-slate-200" : "text-slate-300"}`} />
                )}
                <span className={`flex-1 text-sm ${it.done ? "text-slate-600 line-through decoration-slate-300" : it.locked ? "text-slate-300" : "font-medium text-slate-700"}`}>
                  {it.label}
                </span>
                {it.locked && (
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-400">Claimed</span>
                )}
              </li>
            ))}
          </ul>
          <div className="border-t border-slate-100 px-5 py-4">
            <Link
              href="/directory/dashboard/profile"
              className="inline-flex w-full items-center justify-center rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-800"
            >
              Complete profile
            </Link>
            {plan === "basic" && (
              <Link
                href="/directory/dashboard/subscription"
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Upgrade to unlock all features
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
