"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteStrataIntakeButton({ intakeId }: { intakeId: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm("Delete this work order as spam / test? This removes it and its stored attachments. This cannot be undone.")) return;
    setBusy(true);
    const res = await fetch(`/api/directory/admin/strata-intakes/${intakeId}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) {
      const r = await res.json().catch(() => ({}));
      alert(r.error ?? "Could not delete.");
      return;
    }
    router.push("/directory/admin/strata-intakes");
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
