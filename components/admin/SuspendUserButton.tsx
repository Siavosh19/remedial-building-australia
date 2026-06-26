"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SuspendUserButton({ userId, suspended }: { userId: number; suspended: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    const next = !suspended;
    if (next && !confirm("Suspend this client account? They will be unable to sign in.")) return;
    setBusy(true);
    const res = await fetch(`/api/directory/admin/client-users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ suspended: next }),
    });
    setBusy(false);
    if (!res.ok) {
      const r = await res.json().catch(() => ({}));
      alert(r.error ?? "Could not update.");
      return;
    }
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-60 ${
        suspended
          ? "border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50"
          : "border-rose-300 bg-white text-rose-700 hover:bg-rose-50"
      }`}
    >
      {busy ? "…" : suspended ? "Unsuspend" : "Suspend"}
    </button>
  );
}
