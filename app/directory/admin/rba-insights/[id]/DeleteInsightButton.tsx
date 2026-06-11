"use client";

import { useState } from "react";

export default function DeleteInsightButton({ id }: { id: number }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const res = await fetch(`/api/directory/admin/rba-insights/${id}`, { method: "DELETE" });
    if (res.ok) {
      window.location.href = "/directory/admin/rba-insights";
    } else {
      setDeleting(false);
      alert("Delete failed.");
    }
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition"
      >
        Delete
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600">Are you sure?</span>
      <button
        type="button"
        disabled={deleting}
        onClick={handleDelete}
        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
      >
        {deleting ? "Deleting…" : "Yes, delete"}
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
      >
        Cancel
      </button>
    </div>
  );
}
