"use client";

import { useState } from "react";

type Props = {
  settings: Record<string, string>;
  disclosureDefault: string;
};

export default function AdminSettingsClient({ settings, disclosureDefault }: Props) {
  const [disclosure, setDisclosure] = useState(settings["promotion_disclosure_text"] ?? disclosureDefault);
  const [maxPerCategory, setMaxPerCategory] = useState(settings["max_promotions_per_category"] ?? "3");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function save(key: string, value: string) {
    setSaving(true);
    const res = await fetch("/api/directory/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    setSaving(false);
    setMsg(res.ok ? "Saved." : "Error saving.");
    setTimeout(() => setMsg(""), 3000);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-slate-700 mb-3">Promotion Disclosure Text</h2>
        <p className="text-xs text-slate-500 mb-3">Shown below supplier product results where promoted content appears.</p>
        <textarea
          value={disclosure}
          onChange={e => setDisclosure(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => save("promotion_disclosure_text", disclosure)}
          disabled={saving}
          className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          Save
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-slate-700 mb-3">Max Promoted Products per Category</h2>
        <p className="text-xs text-slate-500 mb-3">Maximum number of sponsored/promoted cards shown per repair system category.</p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            max={10}
            value={maxPerCategory}
            onChange={e => setMaxPerCategory(e.target.value)}
            className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm text-center"
          />
          <button
            onClick={() => save("max_promotions_per_category", maxPerCategory)}
            disabled={saving}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            Save
          </button>
        </div>
      </div>

      {msg && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">{msg}</div>
      )}
    </div>
  );
}
