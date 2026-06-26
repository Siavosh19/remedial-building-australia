"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Reverse a recycle: take a published article back off the website
// (status → rejected). It stays in the Rejected list and can be recycled again.
export default function UnpublishNewsButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function unpublish() {
    setBusy(true);
    const res = await fetch(`/api/directory/admin/news-articles?id=${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rejected" }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setBusy(false);
      alert("Unpublish failed. Please try again.");
    }
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={unpublish}
      title="Take this article off the website (back to Rejected)"
      className="rounded-lg border border-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-50 disabled:opacity-60 transition"
    >
      {busy ? "Unpublishing…" : "Unpublish"}
    </button>
  );
}
