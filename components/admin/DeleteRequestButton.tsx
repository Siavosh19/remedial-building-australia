"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteRequestButton({ requestId }: { requestId: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm("Delete this request as spam / bad? This removes it and all its deliveries and files. This cannot be undone.")) return;
    setBusy(true);
    const res = await fetch(`/api/directory/admin/client-quote-requests/${requestId}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) {
      const r = await res.json().catch(() => ({}));
      alert(r.error ?? "Could not delete.");
      return;
    }
    router.push("/directory/admin/client-quote-requests");
  }

  return (
    <button
      onClick={remove}
      disabled={busy}
      className="rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-60"
    >
      {busy ? "Deleting…" : "Delete as spam"}
    </button>
  );
}
