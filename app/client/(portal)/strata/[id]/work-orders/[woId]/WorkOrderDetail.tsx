"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { money } from "@/lib/strata/levies";
import { WO_STATUS_LABEL } from "../WorkOrdersClient";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-50 disabled:text-slate-500";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type Responder = {
  companyId: number;
  name: string;
  slug: string;
  phone: string | null;
  email: string | null;
  responseStatus: string;
  quoteDocUrl: string | null;
  alreadyInLog: boolean;
};

export default function WorkOrderDetail({
  schemeId,
  order,
  contractors,
  responders,
  quoteRequestId,
  canManage,
}: {
  schemeId: number;
  order: {
    id: number;
    reference: string;
    title: string;
    scope: string | null;
    location: string | null;
    status: string;
    contractorId: number | null;
    agreedPrice: number | null;
    issuedOn: string | null;
    startOn: string | null;
    completedOn: string | null;
    warrantyUntil: string | null;
    defectsLiabilityUntil: string | null;
    invoiceReference: string | null;
    notes: string | null;
  };
  contractors: { id: number; business_name: string; trade: string }[];
  responders: Responder[];
  quoteRequestId: number | null;
  canManage: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setSaved(false);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(`/api/client/strata/${schemeId}/work-orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json().catch(() => ({}));

    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not save.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  /** Put a business that quoted into the scheme's contractor log and engage it. */
  async function engage(r: Responder) {
    setBusy(true);
    setError(null);

    const added = await fetch(`/api/client/strata/${schemeId}/contractors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company_id: r.companyId }),
    });
    const addedJson = await added.json().catch(() => ({}));

    if (!added.ok) {
      setBusy(false);
      setError(addedJson.error ?? "Could not add that business.");
      return;
    }

    await fetch(`/api/client/strata/${schemeId}/work-orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contractor_id: addedJson.id, status: "accepted" }),
    });

    setBusy(false);
    router.refresh();
  }

  return (
    <div className="space-y-5">
      {quoteRequestId && (
        <section className="rounded-3xl border border-sky-200 bg-sky-50/60 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-bold text-sky-950">Businesses that were sent this job</h2>
            <Link
              href={`/client/quote-requests/${quoteRequestId}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 underline"
            >
              Open the quote request <ExternalLink size={12} />
            </Link>
          </div>

          {responders.length === 0 ? (
            <p className="mt-3 text-sm text-sky-900">
              No businesses have been matched yet. Open the quote request to send it.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {responders.map((r) => (
                <li
                  key={r.companyId}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/directory/${r.slug}`}
                      target="_blank"
                      className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-2"
                    >
                      {r.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {r.responseStatus.replace(/_/g, " ")}
                      {r.phone ? ` · ${r.phone}` : ""}
                      {r.alreadyInLog ? " · already in your contractor log" : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {r.quoteDocUrl && (
                      <a
                        href={r.quoteDocUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Their quote
                      </a>
                    )}
                    {canManage && (
                      <button
                        onClick={() => engage(r)}
                        disabled={busy}
                        className="rounded-lg bg-sky-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60"
                      >
                        Engage
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-sky-900/70">
            Engaging adds the business to this scheme&apos;s contractor log, with its licence and insurance from
            the directory, and attaches it to this work order.
          </p>
        </section>
      )}

      <form onSubmit={save} className="space-y-5">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">The work</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="title">Title</label>
              <input id="title" name="title" defaultValue={order.title} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="scope">Scope of works</label>
              <textarea id="scope" name="scope" rows={5} defaultValue={order.scope ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="location">Location</label>
              <input id="location" name="location" defaultValue={order.location ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="contractor_id">Business engaged</label>
              <select id="contractor_id" name="contractor_id" defaultValue={order.contractorId ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`}>
                <option value="">Not decided yet</option>
                {contractors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.business_name} — {c.trade}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">Progress &amp; money</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="status">Status</label>
              <select id="status" name="status" defaultValue={order.status} disabled={!canManage} className={`${FIELD} mt-1.5`}>
                {Object.entries(WO_STATUS_LABEL).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="agreed_price">Agreed price ($)</label>
              <input id="agreed_price" name="agreed_price" type="number" step="0.01" defaultValue={order.agreedPrice ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="issued_on">Issued</label>
              <input id="issued_on" name="issued_on" type="date" defaultValue={order.issuedOn ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="start_on">Start</label>
              <input id="start_on" name="start_on" type="date" defaultValue={order.startOn ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="completed_on">Completed</label>
              <input id="completed_on" name="completed_on" type="date" defaultValue={order.completedOn ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="invoice_reference">Invoice reference</label>
              <input id="invoice_reference" name="invoice_reference" defaultValue={order.invoiceReference ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">After the work</h2>
          <p className="mt-1 text-sm text-slate-500">
            Worth recording while you have the paperwork — these are the dates nobody can find in three years.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="warranty_until">Warranty until</label>
              <input id="warranty_until" name="warranty_until" type="date" defaultValue={order.warrantyUntil ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="defects_liability_until">Defects liability until</label>
              <input id="defects_liability_until" name="defects_liability_until" type="date" defaultValue={order.defectsLiabilityUntil ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="notes">Notes</label>
              <textarea id="notes" name="notes" rows={3} defaultValue={order.notes ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            </div>
          </div>
        </section>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
        {saved && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">Saved.</p>}

        {canManage && (
          <button type="submit" disabled={busy} className="rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60">
            {busy ? "Saving…" : "Save work order"}
          </button>
        )}
      </form>

      {order.agreedPrice !== null && (
        <p className="text-xs text-slate-400">
          Agreed value {money(order.agreedPrice)} · reference {order.reference}
        </p>
      )}
    </div>
  );
}
