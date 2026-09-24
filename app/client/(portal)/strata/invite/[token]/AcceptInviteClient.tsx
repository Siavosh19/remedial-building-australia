"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AcceptInviteClient({ token }: { token: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function accept() {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/client/strata/invite/${encodeURIComponent(token)}`, { method: "POST" });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(json.error ?? "Could not accept this invitation.");
      setBusy(false);
      return;
    }
    router.push(`/client/strata/${json.scheme_id}`);
  }

  return (
    <div className="space-y-4">
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={accept}
          disabled={busy}
          className="rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {busy ? "Accepting…" : "Accept invitation"}
        </button>
        <button
          onClick={() => router.push("/client/strata")}
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
