"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-50 disabled:text-slate-500";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type SchemeSettings = {
  id: number;
  name: string;
  plan_number: string | null;
  address: string | null;
  suburb: string | null;
  postcode: string | null;
  fund_1_name: string;
  fund_2_name: string;
  fund_1_opening: number | null;
  fund_2_opening: number | null;
  financial_year_start_month: number;
  levy_frequency: string;
  levy_notice_days: number | null;
  arrears_grace_days: number | null;
  arrears_interest_rate: number | null;
  committee_spend_limit: number | null;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function SchemeSettingsForm({
  scheme,
  canManage,
  authority,
}: {
  scheme: SchemeSettings;
  canManage: boolean;
  authority: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(`/api/client/strata/${scheme.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));

    setSaving(false);
    if (!res.ok) {
      setError(json.error ?? "Could not save.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-slate-900">Scheme details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={LABEL} htmlFor="name">Name</label>
            <input id="name" name="name" defaultValue={scheme.name} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
          <div>
            <label className={LABEL} htmlFor="plan_number">Plan number</label>
            <input id="plan_number" name="plan_number" defaultValue={scheme.plan_number ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
          <div>
            <label className={LABEL} htmlFor="address">Street address</label>
            <input id="address" name="address" defaultValue={scheme.address ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
          <div>
            <label className={LABEL} htmlFor="suburb">Suburb</label>
            <input id="suburb" name="suburb" defaultValue={scheme.suburb ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
          <div>
            <label className={LABEL} htmlFor="postcode">Postcode</label>
            <input id="postcode" name="postcode" defaultValue={scheme.postcode ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-slate-900">Funds</h2>
        <p className="mt-1 text-sm text-slate-500">
          Call them whatever your scheme calls them. Nothing in the software depends on these names.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="fund_1_name">Day-to-day fund</label>
            <input id="fund_1_name" name="fund_1_name" defaultValue={scheme.fund_1_name} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
          <div>
            <label className={LABEL} htmlFor="fund_2_name">Long-term fund</label>
            <input id="fund_2_name" name="fund_2_name" defaultValue={scheme.fund_2_name} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
          <div>
            <label className={LABEL} htmlFor="fund_1_opening">Opening balance — day-to-day ($)</label>
            <input id="fund_1_opening" name="fund_1_opening" type="number" step="0.01" defaultValue={scheme.fund_1_opening ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
          <div>
            <label className={LABEL} htmlFor="fund_2_opening">Opening balance — long-term ($)</label>
            <input id="fund_2_opening" name="fund_2_opening" type="number" step="0.01" defaultValue={scheme.fund_2_opening ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
            <p className="mt-1 text-xs text-slate-400">What was in the fund when you started using this — the capital works projection builds on it.</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-slate-900">Your scheme&apos;s rules</h2>
        <p className="mt-1 text-sm text-slate-500">
          These are your committee&apos;s settings, not legal advice. The software does arithmetic on the numbers
          you enter and nothing more — for what your scheme is actually required to do, check with {authority}.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="financial_year_start_month">Financial year starts</label>
            <select
              id="financial_year_start_month"
              name="financial_year_start_month"
              defaultValue={String(scheme.financial_year_start_month)}
              disabled={!canManage}
              className={`${FIELD} mt-1.5`}
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={LABEL} htmlFor="levy_frequency">Contributions are raised</label>
            <select id="levy_frequency" name="levy_frequency" defaultValue={scheme.levy_frequency} disabled={!canManage} className={`${FIELD} mt-1.5`}>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="half_yearly">Half yearly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label className={LABEL} htmlFor="levy_notice_days">Notice issued this many days before the due date</label>
            <input id="levy_notice_days" name="levy_notice_days" type="number" min={0} defaultValue={scheme.levy_notice_days ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
          <div>
            <label className={LABEL} htmlFor="arrears_grace_days">Grace days before interest starts</label>
            <input id="arrears_grace_days" name="arrears_grace_days" type="number" min={0} defaultValue={scheme.arrears_grace_days ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
          <div>
            <label className={LABEL} htmlFor="arrears_interest_rate">Interest on overdue contributions (% per year)</label>
            <input id="arrears_interest_rate" name="arrears_interest_rate" type="number" step="0.001" min={0} defaultValue={scheme.arrears_interest_rate ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
          <div>
            <label className={LABEL} htmlFor="committee_spend_limit">Committee spending limit ($)</label>
            <input id="committee_spend_limit" name="committee_spend_limit" type="number" step="0.01" min={0} defaultValue={scheme.committee_spend_limit ?? ""} disabled={!canManage} className={`${FIELD} mt-1.5`} />
          </div>
        </div>
      </section>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
      {saved && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">Saved.</p>}

      {canManage && (
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save settings"}
        </button>
      )}
    </form>
  );
}
