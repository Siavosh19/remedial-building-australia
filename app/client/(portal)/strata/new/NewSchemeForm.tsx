"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JURISDICTIONS, STATE_OPTIONS } from "@/lib/strata/jurisdictions";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export default function NewSchemeForm() {
  const router = useRouter();
  const [state, setState] = useState<(typeof STATE_OPTIONS)[number]>("NSW");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const labels = JURISDICTIONS[state];

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const res = await fetch("/api/client/strata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(data.entries())),
    });
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(json.error ?? "Could not create the scheme.");
      setSaving(false);
      return;
    }
    router.push(`/client/strata/${json.id}/lots`);
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <label className={LABEL} htmlFor="state">
          State or territory
        </label>
        <select
          id="state"
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value as (typeof STATE_OPTIONS)[number])}
          className={`${FIELD} mt-1.5`}
        >
          {STATE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-slate-500">
          This only sets the wording used across the workspace — {labels.body.toLowerCase()},{" "}
          {labels.committee.toLowerCase()}, {labels.fund1.toLowerCase()} and {labels.fund2.toLowerCase()}. Your
          committee still sets its own dates, rates and limits. For what the law requires of your scheme, check
          with {labels.authority}.
        </p>
      </div>

      <div>
        <label className={LABEL} htmlFor="name">
          Scheme or building name
        </label>
        <input id="name" name="name" required placeholder="Harbourview Apartments" className={`${FIELD} mt-1.5`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="plan_number">
            {labels.planNumber}
          </label>
          <input id="plan_number" name="plan_number" placeholder="SP 84213" className={`${FIELD} mt-1.5`} />
        </div>
        <div>
          <label className={LABEL} htmlFor="property_type">
            Property type
          </label>
          <select id="property_type" name="property_type" className={`${FIELD} mt-1.5`} defaultValue="residential_strata">
            <option value="residential_strata">Residential strata</option>
            <option value="commercial_strata">Commercial strata</option>
            <option value="mixed_use">Mixed use</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="address">
          Street address
        </label>
        <input id="address" name="address" placeholder="12-16 Marine Parade" className={`${FIELD} mt-1.5`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="suburb">
            Suburb
          </label>
          <input id="suburb" name="suburb" className={`${FIELD} mt-1.5`} />
        </div>
        <div>
          <label className={LABEL} htmlFor="postcode">
            Postcode
          </label>
          <input id="postcode" name="postcode" inputMode="numeric" className={`${FIELD} mt-1.5`} />
        </div>
      </div>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60 sm:w-auto"
      >
        {saving ? "Creating…" : "Create scheme"}
      </button>
    </form>
  );
}
