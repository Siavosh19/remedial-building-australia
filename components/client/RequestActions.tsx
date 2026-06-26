"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RequestActions({ requestId, status }: { requestId: number; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function act(action: "submit" | "close") {
    if (action === "close" && !confirm("Close this request? Businesses will no longer be expected to respond.")) return;
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/client/quote-request/${requestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action === "submit" ? { action: "submit", termsAccepted: true } : { action: "close" }),
    });
    const r = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(r.error ?? "Action failed.");
      return;
    }
    router.refresh();
  }

  if (status === "closed") return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {status === "draft" && (
        <button
          onClick={() => act("submit")}
          disabled={busy}
          className="rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {busy ? "Working…" : "Submit request"}
        </button>
      )}
      <button
        onClick={() => act("close")}
        disabled={busy}
        className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:opacity-60"
      >
        Close request
      </button>
      {error && <span className="text-sm text-rose-700">{error}</span>}
    </div>
  );
}
