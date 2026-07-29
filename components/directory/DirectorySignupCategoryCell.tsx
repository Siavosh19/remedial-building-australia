"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CategorySearch from "./CategorySearch";

// Inline, searchable primary-category editor for the admin Directory Signups table.
// Changing the category updates Company.main_category_id AND resyncs the company's
// CompanyCategory "primary" mirror row (which is what directory search matches on).
export default function DirectorySignupCategoryCell({
  companyId,
  categoryId,
  categoryName,
  categories,
}: {
  companyId: number;
  categoryId: number | null;
  categoryName: string | null;
  categories: { id: number; name: string }[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(categoryId ? String(categoryId) : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    if (!value) { setError("Pick a category first."); return; }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/directory/admin/companies", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: companyId, main_category_id: Number(value) }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        throw new Error(d?.error ?? "Failed to save");
      }
      setOpen(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => { setValue(categoryId ? String(categoryId) : ""); setError(null); setOpen(true); }}
        title="Change category"
        className="group inline-flex items-center gap-1.5 text-left text-slate-700 hover:text-sky-700"
      >
        <span className="underline decoration-dotted decoration-slate-300 underline-offset-4 group-hover:decoration-sky-400">
          {categoryName ?? "—"}
        </span>
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-sky-50 text-sky-600 ring-1 ring-sky-200 transition group-hover:bg-sky-100 group-hover:text-sky-700 group-hover:ring-sky-300">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-8.793 8.793a1 1 0 01-.44.26l-3.5 1a1 1 0 01-1.235-1.235l1-3.5a1 1 0 01.26-.44l8.793-8.793z" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
          onMouseDown={() => { if (!saving) setOpen(false); }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-slate-900">Change category</h2>
            <p className="mt-1 text-sm text-slate-500">
              Sets the primary category for this listing and updates its category records so it shows in the right searches.
            </p>
            <CategorySearch categories={categories} value={value} onChange={setValue} />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving || !value}
                onClick={save}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
