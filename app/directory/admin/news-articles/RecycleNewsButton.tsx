"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecycleNewsButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function recycle() {
    setBusy(true);
    // Generates an AI summary (fetches the source) and publishes — may take a few seconds.
    const res = await fetch(
      `/api/directory/admin/news-articles/enrich?id=${encodeURIComponent(id)}&publish=true`,
      { method: "POST" },
    );
    if (res.ok) {
      router.refresh();
    } else {
      setBusy(false);
      alert("Recycle failed. Please try again.");
    }
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={recycle}
      className="rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 disabled:opacity-60 transition"
    >
      {busy ? "Generating summary…" : "Recycle → publish"}
    </button>
  );
}
