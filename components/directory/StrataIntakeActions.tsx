"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PROPERTY_TYPE_OPTIONS, URGENCY_OPTIONS } from "@/lib/quote-options";

type Category = { id: number; name: string };

export type StrataIntakeInitial = {
  buildingAddress: string;
  suburb: string;
  postcode: string;
  strataPlanNumber: string;
  description: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  propertyType: string;
  urgency: string;
  workCategoryId: string; // "" when unmatched
};

// Stage 3 admin panel: review/correct the extracted fields, then approve (→ real
// quote request broadcast to businesses) or reject. Also re-runs Stage 2 AI
// extraction on demand. Locked once the intake is converted/rejected.
export default function StrataIntakeActions({
  intakeId,
  initial,
  categories,
  locked,
  lockedReason,
}: {
  intakeId: number;
  initial: StrataIntakeInitial;
  categories: Category[];
  locked: boolean;
  lockedReason: string | null;
}) {
  const router = useRouter();
  const [f, setF] = useState<StrataIntakeInitial>(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const set = (k: keyof StrataIntakeInitial) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function call(path: string, payload?: unknown, label?: string) {
    setBusy(label ?? path);
    setError(null);
    setDone(null);
    try {
      const res = await fetch(`/api/directory/admin/strata-intake/${intakeId}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload ?? {}),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Request failed.");
        return null;
      }
      return data;
    } finally {
      setBusy(null);
    }
  }

  async function runExtraction() {
    const data = await call("extract", {}, "extract");
    if (data) { setDone("AI extraction finished — review the fields below."); router.refresh(); }
  }

  async function approve() {
    const data = await call("approve", {
      buildingAddress: f.buildingAddress,
      suburb: f.suburb,
      postcode: f.postcode,
      strataPlanNumber: f.strataPlanNumber,
      description: f.description,
      contactName: f.contactName,
      contactEmail: f.contactEmail,
      contactPhone: f.contactPhone,
      propertyType: f.propertyType,
      urgency: f.urgency,
      workCategoryId: f.workCategoryId ? Number(f.workCategoryId) : undefined,
    }, "approve");
    if (data) { setDone(`Approved — broadcast to ${data.delivered} matching business${data.delivered === 1 ? "" : "es"}.`); router.refresh(); }
  }

  async function reject() {
    const data = await call("reject", {}, "reject");
    if (data) { setDone("Rejected — nothing was sent."); router.refresh(); }
  }

  const input = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:outline-none";
  const label = "mb-1 block text-xs font-semibold text-slate-500";

  if (locked) {
    return (
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-700">{lockedReason}</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-sky-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Review &amp; approve</h2>
        <button
          onClick={runExtraction}
          disabled={busy !== null}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        >
          {busy === "extract" ? "Extracting…" : "Run AI extraction"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Building address *</label>
          <input className={input} value={f.buildingAddress} onChange={set("buildingAddress")} />
        </div>
        <div><label className={label}>Suburb *</label><input className={input} value={f.suburb} onChange={set("suburb")} /></div>
        <div><label className={label}>Postcode *</label><input className={input} value={f.postcode} onChange={set("postcode")} /></div>
        <div><label className={label}>Strata plan</label><input className={input} value={f.strataPlanNumber} onChange={set("strataPlanNumber")} /></div>
        <div>
          <label className={label}>Work category *</label>
          <select className={input} value={f.workCategoryId} onChange={set("workCategoryId")}>
            <option value="">— select —</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Property type</label>
          <select className={input} value={f.propertyType} onChange={set("propertyType")}>
            {PROPERTY_TYPE_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Urgency</label>
          <select className={input} value={f.urgency} onChange={set("urgency")}>
            {URGENCY_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Job description *</label>
          <textarea className={`${input} min-h-[80px]`} value={f.description} onChange={set("description")} />
        </div>
        <div><label className={label}>Contact name</label><input className={input} value={f.contactName} onChange={set("contactName")} /></div>
        <div><label className={label}>Contact email</label><input className={input} value={f.contactEmail} onChange={set("contactEmail")} /></div>
        <div><label className={label}>Contact phone</label><input className={input} value={f.contactPhone} onChange={set("contactPhone")} /></div>
      </div>

      {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}
      {done && <p className="mt-3 text-sm font-semibold text-emerald-700">{done}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={approve}
          disabled={busy !== null}
          className="rounded-lg bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60"
        >
          {busy === "approve" ? "Broadcasting…" : "Approve & broadcast to businesses"}
        </button>
        <button
          onClick={reject}
          disabled={busy !== null}
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
        >
          {busy === "reject" ? "…" : "Reject"}
        </button>
      </div>
      <p className="mt-3 text-xs text-slate-400">Nothing is sent to any business until you press Approve.</p>
    </section>
  );
}
