"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VALID_CATEGORIES } from "@/lib/news-categories";

export default function CategorySelect({ id, current }: { id: string; current: string }) {
  const router = useRouter();
  const [value, setValue] = useState(current);
  const [saving, setSaving] = useState(false);

  // Include the current value as an option even if it isn't in the canonical
  // list (legacy categories), so it still displays correctly.
  const options = (VALID_CATEGORIES as readonly string[]).includes(current)
    ? [...VALID_CATEGORIES]
    : [current, ...VALID_CATEGORIES];

  async function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    const prev = value;
    setValue(next);
    setSaving(true);
    const res = await fetch(`/api/directory/admin/news-articles?id=${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: next }),
    });
    setSaving(false);
    if (res.ok) {
      router.refresh();
    } else {
      setValue(prev);
      alert("Failed to update category.");
    }
  }

  return (
    <select
      value={value}
      onChange={onChange}
      disabled={saving}
      className="w-full max-w-[200px] rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-200 disabled:opacity-60"
    >
      {options.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}
