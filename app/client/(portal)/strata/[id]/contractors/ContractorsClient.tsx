"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Archive, Pencil, Plus, X } from "lucide-react";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type Contractor = {
  id: number;
  companyId: number | null;
  companySlug: string | null;
  trade: string;
  businessName: string;
  contactName: string | null;
  phone: string | null;
  email: string | null;
  abn: string | null;
  licenceNumber: string | null;
  insuranceExpiry: string | null;
  insuranceExpired: boolean;
  engagement: "one_off" | "ongoing";
  frequency: string | null;
  rate: number | null;
  rateNote: string | null;
  active: boolean;
  lastEngaged: string | null;
  jobCount: number;
  notes: string | null;
};

export default function ContractorsClient({
  schemeId,
  contractors,
  canManage,
}: {
  schemeId: number;
  contractors: Contractor[];
  canManage: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<Contractor | "new" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = editing === "new" ? null : editing;
  const ongoing = contractors.filter((c) => c.engagement === "ongoing" && c.active);
  const oneOff = contractors.filter((c) => c.engagement === "one_off" && c.active);
  const archived = contractors.filter((c) => !c.active);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);

    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const isNew = editing === "new";
    const res = await fetch(
      isNew
        ? `/api/client/strata/${schemeId}/contractors`
        : `/api/client/strata/${schemeId}/contractors/${editing.id}`,
      {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, active: true }),
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

  async function archive(c: Contractor) {
    if (!confirm(`Remove ${c.businessName} from the active list?`)) return;
    setBusy(true);
    const res = await fetch(`/api/client/strata/${schemeId}/contractors/${c.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  function card(c: Contractor) {
    return (
      <li key={c.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {c.companySlug ? (
                <Link
                  href={`/directory/${c.companySlug}`}
                  target="_blank"
                  className="font-bold text-slate-900 underline decoration-slate-300 underline-offset-2"
                >
                  {c.businessName}
                </Link>
              ) : (
                <span className="font-bold text-slate-900">{c.businessName}</span>
              )}
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {c.trade}
              </span>
              {c.companyId && (
                <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-800">
                  RBA listing
                </span>
              )}
              {c.insuranceExpired && (
                <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
                  Insurance expired
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {[c.contactName, c.phone, c.email].filter(Boolean).join(" · ") || "No contact details"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {c.engagement === "ongoing" && c.frequency ? `${c.frequency} · ` : ""}
              {c.rate !== null ? `$${c.rate.toLocaleString("en-AU")}${c.rateNote ? ` ${c.rateNote}` : ""} · ` : ""}
              {c.jobCount > 0 ? `${c.jobCount} work order${c.jobCount === 1 ? "" : "s"}` : "No work orders yet"}
              {c.lastEngaged ? ` · last engaged ${c.lastEngaged}` : ""}
            </p>
            {c.licenceNumber && (
              <p className="mt-1 text-xs text-slate-400">
                Licence {c.licenceNumber}
                {c.insuranceExpiry ? ` · insurance to ${c.insuranceExpiry}` : ""}
              </p>
            )}
            {c.notes && <p className="mt-1.5 text-xs text-slate-600">{c.notes}</p>}
          </div>
          {canManage && (
            <div className="flex shrink-0 gap-1">
              <button
                onClick={() => {
                  setEditing(c);
                  setError(null);
                }}
                title="Edit"
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <Pencil size={15} />
              </button>
              {c.active && (
                <button
                  onClick={() => archive(c)}
                  title="Remove from the active list"
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-700"
                >
                  <Archive size={15} />
                </button>
              )}
            </div>
          )}
        </div>
      </li>
    );
  }

  return (
    <div className="space-y-5">
      {canManage && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditing("new");
              setError(null);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            <Plus size={16} /> Add a business
          </button>
        </div>
      )}

      {error && !editing && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      {editing && (
        <form onSubmit={save} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {editing === "new" ? "Add a business" : current?.businessName}
            </h2>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="business_name">Business name</label>
              <input id="business_name" name="business_name" required defaultValue={current?.businessName ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="trade">Trade</label>
              <input id="trade" name="trade" required defaultValue={current?.trade ?? ""} placeholder="Cleaning" className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="engagement">Engagement</label>
              <select id="engagement" name="engagement" defaultValue={current?.engagement ?? "one_off"} className={`${FIELD} mt-1.5`}>
                <option value="ongoing">Ongoing service</option>
                <option value="one_off">One-off / as needed</option>
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="frequency">How often (ongoing only)</label>
              <input id="frequency" name="frequency" defaultValue={current?.frequency ?? ""} placeholder="Fortnightly, Tuesdays" className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="contact_name">Contact</label>
              <input id="contact_name" name="contact_name" defaultValue={current?.contactName ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="phone">Phone</label>
              <input id="phone" name="phone" defaultValue={current?.phone ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="email">Email</label>
              <input id="email" name="email" type="email" defaultValue={current?.email ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="abn">ABN</label>
              <input id="abn" name="abn" defaultValue={current?.abn ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="licence_number">Licence number</label>
              <input id="licence_number" name="licence_number" defaultValue={current?.licenceNumber ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="insurance_expiry">Insurance expires</label>
              <input id="insurance_expiry" name="insurance_expiry" type="date" defaultValue={current?.insuranceExpiry ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="rate">Rate ($)</label>
              <input id="rate" name="rate" type="number" step="0.01" defaultValue={current?.rate ?? ""} className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="rate_note">Rate note</label>
              <input id="rate_note" name="rate_note" defaultValue={current?.rateNote ?? ""} placeholder="per visit" className={`${FIELD} mt-1.5`} />
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

      <section>
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Ongoing services</h2>
        <p className="mt-0.5 text-xs text-slate-400">
          Standing arrangements — cleaning, lawns, lift servicing. They recur without a new engagement each time.
        </p>
        {ongoing.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-400">
            None recorded.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">{ongoing.map(card)}</ul>
        )}
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Engaged as needed</h2>
        <p className="mt-0.5 text-xs text-slate-400">
          Businesses that have worked on the building, kept for next time.
        </p>
        {oneOff.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-400">
            None yet. Engaging a business from a work order adds it here automatically.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">{oneOff.map(card)}</ul>
        )}
      </section>

      {archived.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">No longer used</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Kept because they have work history on the building.
          </p>
          <ul className="mt-3 space-y-2 opacity-70">{archived.map(card)}</ul>
        </section>
      )}
    </div>
  );
}
