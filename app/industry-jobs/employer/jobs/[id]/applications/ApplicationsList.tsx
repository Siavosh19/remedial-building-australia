"use client";

import { useState } from "react";
import { Mail, Phone, FileText, Download } from "lucide-react";
import { JOB_APPLICATION_STATUSES } from "@/lib/jobs-data";

export type ApplicationRow = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  resumeUrl: string | null;
  resumeName: string | null;
  coverMessage: string | null;
  status: string;
  date: string;
};

const STATUS_STYLE: Record<string, string> = {
  new: "bg-sky-100 text-sky-800",
  reviewed: "bg-violet-100 text-violet-800",
  contacted: "bg-amber-100 text-amber-800",
  closed: "bg-slate-200 text-slate-600",
};

export default function ApplicationsList({ applications }: { applications: ApplicationRow[] }) {
  const [rows, setRows] = useState(applications);
  const [busy, setBusy] = useState<number | null>(null);

  async function setStatus(id: number, status: string) {
    setBusy(id);
    const prev = rows;
    setRows((r) => r.map((a) => (a.id === id ? { ...a, status } : a)));
    const res = await fetch(`/api/industry-jobs/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) setRows(prev); // revert on failure
    setBusy(null);
  }

  if (rows.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-14 text-center">
        <p className="text-sm font-semibold text-slate-500">No applications yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {rows.map((a) => (
        <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-sky-950">{a.fullName}</h3>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${STATUS_STYLE[a.status] ?? "bg-slate-100 text-slate-500"}`}>{a.status}</span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <a href={`mailto:${a.email}`} className="inline-flex items-center gap-1 hover:text-red-700"><Mail size={12} /> {a.email}</a>
                {a.phone && <a href={`tel:${a.phone}`} className="inline-flex items-center gap-1 hover:text-red-700"><Phone size={12} /> {a.phone}</a>}
                <span>Applied {a.date}</span>
              </div>
            </div>
            <select
              value={a.status}
              disabled={busy === a.id}
              onChange={(e) => setStatus(a.id, e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-sky-950 outline-none focus:border-sky-400"
            >
              {JOB_APPLICATION_STATUSES.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>

          {a.coverMessage && (
            <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600 whitespace-pre-wrap">{a.coverMessage}</div>
          )}
          {a.resumeUrl ? (
            <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-sky-800 hover:border-sky-300 hover:text-red-700">
              <Download size={13} /> {a.resumeName ?? "Download résumé"}
            </a>
          ) : (
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400"><FileText size={13} /> No résumé attached</p>
          )}
        </div>
      ))}
    </div>
  );
}
