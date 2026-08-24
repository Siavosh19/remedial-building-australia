"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Approve a draft: put it on the website (status → published). Drafts already
// carry their AI summary from the ingest, so this is a plain status flip — no
// re-enrichment needed (that is what Recycle does for rejected articles).
export default function PublishNewsButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function publish() {
    setBusy(true);
    const res = await fetch(`/api/directory/admin/news-articles?id=${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "published" }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setBusy(false);
      alert("Publish failed. Please try again.");
    }
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={publish}
      title="Put this article on the website"
      className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition"
    >
      {busy ? "Publishing…" : "Publish"}
    </button>
  );
}
