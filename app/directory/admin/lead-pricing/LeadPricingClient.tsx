"use client";

import { useState } from "react";

type Row = { urgency: string; label: string; amount_cents: number };

export default function LeadPricingClient({ initialPrices }: { initialPrices: Row[] }) {
  // Edit in dollars for humans; convert to cents on save.
  const [dollars, setDollars] = useState<Record<string, string>>(
    Object.fromEntries(initialPrices.map((r) => [r.urgency, (r.amount_cents / 100).toString()])),
  );
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function save() {
    setSaving(true);
    setMsg(null);
    const prices = initialPrices.map((r) => ({
      urgency: r.urgency,
      amount_cents: Math.round(parseFloat(dollars[r.urgency] || "0") * 100),
    }));
    const res = await fetch("/api/directory/admin/lead-pricing", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prices }),
    });
    setSaving(false);
    if (!res.ok) {
      const r = await res.json().catch(() => ({}));
      setMsg({ ok: false, text: r.error ?? "Could not save." });
      return;
    }
    setMsg({ ok: true, text: "Prices saved." });
  }

  return (
    <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        {initialPrices.map((r) => (
          <div key={r.urgency} className="flex items-center justify-between gap-4">
            <label htmlFor={`price-${r.urgency}`} className="text-sm font-semibold text-slate-800">
              {r.label}
            </label>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-slate-500">$</span>
              <input
                id={`price-${r.urgency}`}
                type="number"
                min={0}
                step="0.5"
                value={dollars[r.urgency] ?? ""}
                onChange={(e) => setDollars((d) => ({ ...d, [r.urgency]: e.target.value }))}
                className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-right text-sm font-semibold text-slate-900 focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save prices"}
        </button>
        {msg && <p className={`text-sm font-medium ${msg.ok ? "text-emerald-700" : "text-rose-700"}`}>{msg.text}</p>}
      </div>
    </div>
  );
}
