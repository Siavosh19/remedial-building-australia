"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CategoryOpt = { id: number; name: string };
type Opt = { id: string; label: string };

export type StrataIntakeReviewData = {
  id: number;
  status: string;
  buildingAddress: string;
  suburb: string;
  postcode: string;
  state: string;
  strataPlanNumber: string;
  orderNumber: string;
  jobDescription: string;
  contactName: string;
  contactPhone: string;
  workCategoryId: number | null;
  reviewNotes: string;
  matchConfidence: string | null;
  extractionError: string | null;
};

const STATE_OPTS = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

export default function StrataIntakeReview({
  intake,
  categories,
  propertyTypes,
  urgencies,
}: {
  intake: StrataIntakeReviewData;
  categories: CategoryOpt[];
  propertyTypes: Opt[];
  urgencies: Opt[];
}) {
  const router = useRouter();
  const [f, setF] = useState({
    buildingAddress: intake.buildingAddress,
    suburb: intake.suburb,
    postcode: intake.postcode,
    state: intake.state,
    strataPlanNumber: intake.strataPlanNumber,
    orderNumber: intake.orderNumber,
    jobDescription: intake.jobDescription,
    contactName: intake.contactName,
    contactPhone: intake.contactPhone,
    workCategoryId: intake.workCategoryId ? String(intake.workCategoryId) : "",
    propertyType: "residential_strata",
    urgency: "within_month",
    reviewNotes: intake.reviewNotes,
  });
  const [busy, setBusy] = useState<null | "save" | "approve" | "reject">(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const locked = intake.status === "converted" || intake.status === "rejected";
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  async function send(action: "save" | "approve" | "reject") {
    if (action === "approve" && !confirm("Approve this work order? It will be turned into a quote request and sent to every matching Silver/Gold business in the category.")) return;
    if (action === "reject" && !confirm("Reject this work order? It will not be sent to any businesses.")) return;
    setBusy(action);
    setMsg(null);
    const res = await fetch(`/api/directory/admin/strata-intakes/${intake.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action, ...f }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(null);
    if (!res.ok) {
      setMsg({ kind: "err", text: data.error ?? "Something went wrong." });
      return;
    }
    if (action === "approve") {
      setMsg({ kind: "ok", text: `Approved — sent to ${data.delivered ?? 0} business${data.delivered === 1 ? "" : "es"} (${data.matched ?? 0} matched).` });
      if (data.requestId) {
        router.push(`/directory/admin/client-quote-requests/${data.requestId}`);
        return;
      }
    } else if (action === "reject") {
      router.push("/directory/admin/strata-intakes");
      return;
    } else {
      setMsg({ kind: "ok", text: "Saved." });
    }
    router.refresh();
  }

  const label = "block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1";
  const input = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500";

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Extracted details</h2>
        {intake.matchConfidence && !locked && (
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
            intake.matchConfidence === "high" ? "bg-emerald-100 text-emerald-800" : intake.matchConfidence === "medium" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-700"
          }`}>
            AI confidence: {intake.matchConfidence}
          </span>
        )}
      </div>

      {intake.extractionError && (
        <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          AI extraction failed — fill the fields in manually. ({intake.extractionError})
        </p>
      )}
      {locked && (
        <p className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
          This work order is {intake.status === "converted" ? "approved and has been sent to businesses" : "rejected"} — fields are read-only.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Building address</label>
          <input className={input} value={f.buildingAddress} onChange={set("buildingAddress")} disabled={locked} placeholder="e.g. 12 Ocean Street" />
        </div>
        <div>
          <label className={label}>Suburb</label>
          <input className={input} value={f.suburb} onChange={set("suburb")} disabled={locked} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>Postcode</label>
            <input className={input} value={f.postcode} onChange={set("postcode")} disabled={locked} inputMode="numeric" maxLength={4} />
          </div>
          <div>
            <label className={label}>State</label>
            <select className={input} value={f.state} onChange={set("state")} disabled={locked}>
              <option value="">—</option>
              {STATE_OPTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className={label}>Strata plan #</label>
          <input className={input} value={f.strataPlanNumber} onChange={set("strataPlanNumber")} disabled={locked} />
        </div>
        <div>
          <label className={label}>Work order #</label>
          <input className={input} value={f.orderNumber} onChange={set("orderNumber")} disabled={locked} />
        </div>
        <div>
          <label className={label}>Contact name</label>
          <input className={input} value={f.contactName} onChange={set("contactName")} disabled={locked} />
        </div>
        <div>
          <label className={label}>Contact phone</label>
          <input className={input} value={f.contactPhone} onChange={set("contactPhone")} disabled={locked} />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Work category</label>
          <select className={input} value={f.workCategoryId} onChange={set("workCategoryId")} disabled={locked}>
            <option value="">— select a category —</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Property type</label>
          <select className={input} value={f.propertyType} onChange={set("propertyType")} disabled={locked}>
            {propertyTypes.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Urgency</label>
          <select className={input} value={f.urgency} onChange={set("urgency")} disabled={locked}>
            {urgencies.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Job description (sent to businesses)</label>
          <textarea className={`${input} min-h-[120px]`} value={f.jobDescription} onChange={set("jobDescription")} disabled={locked} />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Review notes (internal)</label>
          <textarea className={`${input} min-h-[60px]`} value={f.reviewNotes} onChange={set("reviewNotes")} disabled={locked} />
        </div>
      </div>

      {msg && (
        <p className={`mt-4 rounded-lg px-3 py-2 text-sm ${msg.kind === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{msg.text}</p>
      )}

      {!locked && (
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => send("approve")}
            disabled={busy !== null}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {busy === "approve" ? "Approving…" : "Approve & send to businesses"}
          </button>
          <button
            onClick={() => send("save")}
            disabled={busy !== null}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            {busy === "save" ? "Saving…" : "Save edits"}
          </button>
          <button
            onClick={() => send("reject")}
            disabled={busy !== null}
            className="rounded-lg border border-rose-300 bg-white px-5 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-60"
          >
            {busy === "reject" ? "Rejecting…" : "Reject"}
          </button>
        </div>
      )}
    </section>
  );
}
