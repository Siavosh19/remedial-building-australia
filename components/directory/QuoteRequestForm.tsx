"use client";

import { useState } from "react";

type Props = {
  companySlug: string;
  companyName: string;
};

const ROLES = [
  { value: "strata_manager",    label: "Strata manager" },
  { value: "committee_member",  label: "Owners corporation / committee member" },
  { value: "building_manager",  label: "Building manager" },
  { value: "consultant",        label: "Consultant / engineer" },
  { value: "builder",           label: "Builder / contractor" },
  { value: "owner",             label: "Property owner" },
  { value: "other",             label: "Other" },
];

const URGENCY = [
  { value: "emergency",     label: "Emergency" },
  { value: "within_week",   label: "Within a week" },
  { value: "within_month",  label: "Within a month" },
  { value: "planning",      label: "Planning stage" },
];

const BUDGET = [
  { value: "under_5k",  label: "Under $5k" },
  { value: "5k_20k",    label: "$5k – $20k" },
  { value: "20k_100k",  label: "$20k – $100k" },
  { value: "100k_plus", label: "$100k+" },
];

export default function QuoteRequestForm({ companySlug, companyName }: Props) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    requesterName: "",
    requesterEmail: "",
    requesterPhone: "",
    requesterRole: "",
    buildingSuburb: "",
    projectCategory: "",
    urgency: "",
    budgetRange: "",
    message: "",
  });

  function set(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/directory/quote-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companySlug, ...form }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Please try again.");
      return;
    }
    setSent(true);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-sky-950 transition hover:bg-sky-50"
      >
        Request a Quote
      </button>
    );
  }

  if (sent) {
    return (
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-4">
        <p className="font-semibold text-emerald-900">Quote request sent</p>
        <p className="mt-1 text-xs text-emerald-700">{companyName} will be in touch directly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-2 text-xs text-red-700">{error}</div>
      )}

      <input
        type="text"
        required
        placeholder="Your name *"
        value={form.requesterName}
        onChange={(e) => set("requesterName", e.target.value)}
        className="w-full rounded-xl border border-sky-800 bg-sky-900 px-3 py-2.5 text-sm text-white placeholder-sky-400 focus:outline-none focus:border-sky-400"
      />
      <input
        type="email"
        required
        placeholder="Email *"
        value={form.requesterEmail}
        onChange={(e) => set("requesterEmail", e.target.value)}
        className="w-full rounded-xl border border-sky-800 bg-sky-900 px-3 py-2.5 text-sm text-white placeholder-sky-400 focus:outline-none focus:border-sky-400"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={form.requesterPhone}
        onChange={(e) => set("requesterPhone", e.target.value)}
        className="w-full rounded-xl border border-sky-800 bg-sky-900 px-3 py-2.5 text-sm text-white placeholder-sky-400 focus:outline-none focus:border-sky-400"
      />
      <select
        value={form.requesterRole}
        onChange={(e) => set("requesterRole", e.target.value)}
        className="w-full rounded-xl border border-sky-800 bg-sky-900 px-3 py-2.5 text-sm text-sky-200 focus:outline-none focus:border-sky-400"
      >
        <option value="">Your role (optional)</option>
        {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
      </select>
      <input
        type="text"
        placeholder="Building suburb"
        value={form.buildingSuburb}
        onChange={(e) => set("buildingSuburb", e.target.value)}
        className="w-full rounded-xl border border-sky-800 bg-sky-900 px-3 py-2.5 text-sm text-white placeholder-sky-400 focus:outline-none focus:border-sky-400"
      />
      <input
        type="text"
        placeholder="Project type / category"
        value={form.projectCategory}
        onChange={(e) => set("projectCategory", e.target.value)}
        className="w-full rounded-xl border border-sky-800 bg-sky-900 px-3 py-2.5 text-sm text-white placeholder-sky-400 focus:outline-none focus:border-sky-400"
      />
      <div className="grid grid-cols-2 gap-2">
        <select value={form.urgency} onChange={(e) => set("urgency", e.target.value)}
          className="rounded-xl border border-sky-800 bg-sky-900 px-3 py-2.5 text-sm text-sky-200 focus:outline-none focus:border-sky-400">
          <option value="">Urgency</option>
          {URGENCY.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
        </select>
        <select value={form.budgetRange} onChange={(e) => set("budgetRange", e.target.value)}
          className="rounded-xl border border-sky-800 bg-sky-900 px-3 py-2.5 text-sm text-sky-200 focus:outline-none focus:border-sky-400">
          <option value="">Budget</option>
          {BUDGET.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
        </select>
      </div>
      <textarea
        required
        placeholder="Describe your project or enquiry *"
        value={form.message}
        onChange={(e) => set("message", e.target.value)}
        rows={3}
        className="w-full rounded-xl border border-sky-800 bg-sky-900 px-3 py-2.5 text-sm text-white placeholder-sky-400 focus:outline-none focus:border-sky-400"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-bold text-sky-950 transition hover:bg-sky-50 disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send request"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-xl border border-sky-700 px-4 py-3 text-sm font-semibold text-sky-300 hover:bg-sky-900"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
