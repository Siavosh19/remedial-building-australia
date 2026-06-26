"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RESPONSE_STATUS_OPTIONS } from "@/lib/quote-options";

const ACTIONABLE = RESPONSE_STATUS_OPTIONS.filter((o) => o.id !== "pending");

export default function LeadResponseActions({
  deliveryId,
  responseStatus,
  quoteDocUrl,
}: {
  deliveryId: number;
  responseStatus: string;
  quoteDocUrl: string | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function setStatus(id: string) {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/directory/lead-requests/${deliveryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responseStatus: id }),
    });
    setBusy(false);
    if (!res.ok) {
      const r = await res.json().catch(() => ({}));
      setError(r.error ?? "Could not update.");
      return;
    }
    router.refresh();
  }

  async function uploadQuote(file: File) {
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`/api/directory/lead-requests/${deliveryId}/quote-upload`, { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) {
      const r = await res.json().catch(() => ({}));
      setError(r.error ?? "Upload failed.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-semibold text-slate-800">Update your response</p>
        <div className="flex flex-wrap gap-2">
          {ACTIONABLE.map((o) => {
            const active = responseStatus === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setStatus(o.id)}
                disabled={busy}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-60 ${
                  active
                    ? "bg-sky-950 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-sky-400"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-slate-800">Quote document <span className="font-normal text-slate-400">(optional)</span></p>
        {quoteDocUrl && (
          <a href={quoteDocUrl} target="_blank" rel="noopener noreferrer" className="mb-2 block text-sm font-medium text-sky-800 hover:text-sky-600">
            View uploaded quote
          </a>
        )}
        <label className="inline-block cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-400">
          {uploading ? "Uploading…" : quoteDocUrl ? "Replace quote" : "Upload quote"}
          <input
            type="file"
            className="hidden"
            disabled={uploading}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadQuote(f); e.target.value = ""; }}
          />
        </label>
      </div>

      {error && <p className="text-sm text-rose-700">{error}</p>}
    </div>
  );
}
