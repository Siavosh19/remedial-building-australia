"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileSearch, Pencil, Plus, Trash2, X } from "lucide-react";
import { URGENCY_OPTIONS } from "@/lib/quote-options";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type Defect = {
  id: number;
  reference: string;
  reportedOn: string;
  reportedBy: string | null;
  lotId: number | null;
  lotNumber: string | null;
  locationType: string | null;
  location: string | null;
  description: string;
  priority: string;
  status: string;
  quotedCost: number | null;
  actualCost: number | null;
  notes: string | null;
  quoteRequestId: number | null;
  workOrderCount: number;
};

const PRIORITY_TONE: Record<string, string> = {
  urgent: "bg-red-100 text-red-800",
  high: "bg-red-50 text-red-700",
  medium: "bg-amber-50 text-amber-700",
  low: "bg-slate-100 text-slate-600",
};

const STATUS_LABEL: Record<string, string> = {
  open: "Open",
  awaiting_quote: "Awaiting quotes",
  scheduled: "Scheduled",
  in_progress: "In progress",
  closed: "Closed",
};

export default function DefectsClient({
  schemeId,
  defects,
  lots,
  categories,
  scheme,
  contact,
  canManage,
}: {
  schemeId: number;
  defects: Defect[];
  lots: { id: number; lot_number: string }[];
  categories: { id: number; name: string }[];
  scheme: { address: string; suburb: string; postcode: string; planNumber: string | null; propertyType: string };
  contact: { name: string; email: string };
  canManage: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<Defect | "new" | null>(null);
  const [quoting, setQuoting] = useState<Defect | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = editing === "new" ? null : editing;

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const isNew = editing === "new";
    const res = await fetch(
      isNew ? `/api/client/strata/${schemeId}/defects` : `/api/client/strata/${schemeId}/defects/${editing.id}`,
      {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const json = await res.json().catch(() => ({}));

    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not save.");
      return;
    }
    setEditing(null);
    router.refresh();
  }

  async function remove(defect: Defect) {
    if (!confirm(`Delete ${defect.reference}? This cannot be undone.`)) return;
    setBusy(true);
    const res = await fetch(`/api/client/strata/${schemeId}/defects/${defect.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  /**
   * Raise a quote request through the existing platform, then record that it
   * belongs to this scheme. The request is created exactly as the ordinary form
   * creates one — we only pre-fill it and note the association, then hand the
   * committee to the standard screen to review and send.
   */
  async function requestQuotes(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!quoting) return;
    setBusy(true);
    setError(null);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;

    const created = await fetch("/api/client/quote-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
        building_address: scheme.address,
        suburb: scheme.suburb,
        postcode: scheme.postcode,
        strata_plan_number: scheme.planNumber,
        property_type: scheme.propertyType,
        work_category_id: Number(form.work_category_id),
        description: form.description,
        urgency: form.urgency,
      }),
    });
    const createdJson = await created.json().catch(() => ({}));

    if (!created.ok) {
      setBusy(false);
      setError(createdJson.error ?? "Could not start the quote request.");
      return;
    }

    await fetch(`/api/client/strata/${schemeId}/quote-links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote_request_id: createdJson.id, defect_id: quoting.id }),
    });

    router.push(`/client/quote-requests/${createdJson.id}`);
  }

  return (
    <div className="space-y-4">
      {canManage && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditing("new");
              setError(null);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            <Plus size={16} /> Log a defect
          </button>
        </div>
      )}

      {error && !editing && !quoting && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
      )}

      {editing && (
        <form onSubmit={save} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {editing === "new" ? "Log a defect" : current?.reference}
            </h2>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="description">What is wrong</label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                defaultValue={current?.description ?? ""}
                placeholder="Water staining to the basement ceiling below the level 1 planter box, worsening after rain."
                className={`${FIELD} mt-1.5`}
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="location_type">Where</label>
              <select id="location_type" name="location_type" defaultValue={current?.locationType ?? "Common property"} className={`${FIELD} mt-1.5`}>
                <option>Common property</option>
                <option>Lot</option>
                <option>External / boundary</option>
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="location">Location detail</label>
              <input id="location" name="location" defaultValue={current?.location ?? ""} placeholder="Basement, bay 4" className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="lot_id">Affected lot (optional)</label>
              <select id="lot_id" name="lot_id" defaultValue={current?.lotId ?? ""} className={`${FIELD} mt-1.5`}>
                <option value="">—</option>
                {lots.map((l) => (
                  <option key={l.id} value={l.id}>Lot {l.lot_number}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="reported_by">Reported by</label>
              <input id="reported_by" name="reported_by" defaultValue={current?.reportedBy ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="priority">Priority</label>
              <select id="priority" name="priority" defaultValue={current?.priority ?? "medium"} className={`${FIELD} mt-1.5`}>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="status">Status</label>
              <select id="status" name="status" defaultValue={current?.status ?? "open"} className={`${FIELD} mt-1.5`}>
                {Object.entries(STATUS_LABEL).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="quoted_cost">Quoted cost ($)</label>
              <input id="quoted_cost" name="quoted_cost" type="number" step="0.01" defaultValue={current?.quotedCost ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="actual_cost">Actual cost ($)</label>
              <input id="actual_cost" name="actual_cost" type="number" step="0.01" defaultValue={current?.actualCost ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="notes">Notes</label>
              <input id="notes" name="notes" defaultValue={current?.notes ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

          <div className="mt-5 flex gap-2">
            <button type="submit" disabled={busy} className="rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60">
              {busy ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </form>
      )}

      {defects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">Nothing logged yet.</p>
          <p className="mx-auto mt-2 max-w-md text-xs text-slate-400">
            Log what needs fixing, then get quotes from verified trades without leaving the scheme.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {defects.map((d) => (
            <li key={d.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">{d.reference}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_TONE[d.priority] ?? ""}`}>
                      {d.priority}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                      {STATUS_LABEL[d.status] ?? d.status}
                    </span>
                    {d.workOrderCount > 0 && (
                      <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-800">
                        {d.workOrderCount} work order{d.workOrderCount === 1 ? "" : "s"}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-slate-800">{d.description}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {d.reportedOn}
                    {d.location ? ` · ${d.location}` : ""}
                    {d.lotNumber ? ` · lot ${d.lotNumber}` : ""}
                    {d.reportedBy ? ` · reported by ${d.reportedBy}` : ""}
                  </p>
                  {d.quoteRequestId && (
                    <Link
                      href={`/client/quote-requests/${d.quoteRequestId}`}
                      className="mt-2 inline-block text-xs font-semibold text-sky-800 underline"
                    >
                      View the quote request →
                    </Link>
                  )}
                </div>
                {canManage && (
                  <div className="flex shrink-0 flex-wrap gap-1">
                    {!d.quoteRequestId && (
                      <button
                        onClick={() => {
                          setQuoting(d);
                          setError(null);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-sky-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-800"
                      >
                        <FileSearch size={13} /> Get quotes
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setEditing(d);
                        setError(null);
                      }}
                      title="Edit"
                      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => remove(d)}
                      title="Delete"
                      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {quoting && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-slate-900/40 p-4 sm:items-center">
          <form onSubmit={requestQuotes} className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Get quotes · {quoting.reference}</h2>
              <button type="button" onClick={() => setQuoting(null)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              This raises a request on RBA and matches it to verified businesses. You will see it before anything
              is sent.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label className={LABEL} htmlFor="work_category_id">Type of work</label>
                <select id="work_category_id" name="work_category_id" required defaultValue="" className={`${FIELD} mt-1.5`}>
                  <option value="" disabled>Choose a trade…</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={LABEL} htmlFor="urgency">How soon</label>
                <select id="urgency" name="urgency" defaultValue="within_month" className={`${FIELD} mt-1.5`}>
                  {URGENCY_OPTIONS.map((u) => (
                    <option key={u.id} value={u.id}>{u.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={LABEL} htmlFor="description">Scope for the trades</label>
                <textarea id="description" name="description" required rows={4} defaultValue={quoting.description} className={`${FIELD} mt-1.5`} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL} htmlFor="contact_name">Contact name</label>
                  <input id="contact_name" name="contact_name" required defaultValue={contact.name} className={`${FIELD} mt-1.5`} />
                </div>
                <div>
                  <label className={LABEL} htmlFor="contact_email">Contact email</label>
                  <input id="contact_email" name="contact_email" type="email" required defaultValue={contact.email} className={`${FIELD} mt-1.5`} />
                </div>
              </div>
              <div>
                <label className={LABEL} htmlFor="contact_phone">Contact phone</label>
                <input id="contact_phone" name="contact_phone" className={`${FIELD} mt-1.5`} />
              </div>
              <p className="rounded-xl bg-slate-50 px-3.5 py-3 text-xs text-slate-500">
                Site address is taken from the scheme: {scheme.address}, {scheme.suburb} {scheme.postcode}.
              </p>
            </div>

            {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

            <div className="mt-5 flex gap-2">
              <button type="submit" disabled={busy} className="rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60">
                {busy ? "Preparing…" : "Continue"}
              </button>
              <button type="button" onClick={() => setQuoting(null)} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
