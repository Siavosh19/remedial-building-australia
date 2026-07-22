"use client";

import { useState } from "react";

type PlatformResult = {
  platform: "facebook" | "instagram" | "linkedin";
  ok: boolean;
  skipped?: boolean;
  id?: string;
  url?: string;
  error?: string;
};

const LABEL: Record<string, string> = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn" };

export default function ShareToSocialButton({ id, status }: { id: number; status: string }) {
  const [confirming, setConfirming] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [results, setResults] = useState<PlatformResult[] | null>(null);
  const [topError, setTopError] = useState<string | null>(null);

  const disabled = status !== "published";

  async function handleShare() {
    setSharing(true);
    setTopError(null);
    setResults(null);
    try {
      const res = await fetch(`/api/directory/admin/rba-insights/${id}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) setTopError(data?.error ?? "Share failed.");
      else setResults(data.results ?? []);
    } catch (e) {
      setTopError(String((e as Error)?.message ?? e));
    } finally {
      setSharing(false);
      setConfirming(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      {!confirming ? (
        <button
          type="button"
          disabled={disabled}
          onClick={() => setConfirming(true)}
          title={disabled ? "Publish the article first" : "Post this article to Facebook, Instagram and LinkedIn"}
          className="rounded-xl border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Share to social
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Post to Facebook, Instagram &amp; LinkedIn?</span>
          <button
            type="button"
            disabled={sharing}
            onClick={handleShare}
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60"
          >
            {sharing ? "Posting…" : "Yes, post now"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      )}

      {topError && <p className="max-w-md text-right text-sm text-rose-600">{topError}</p>}

      {results && (
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
          {results.map((r) => (
            <div key={r.platform} className="flex items-start justify-between gap-3 py-1">
              <span className="font-semibold text-slate-700">{LABEL[r.platform] ?? r.platform}</span>
              {r.ok ? (
                <span className="text-emerald-600">
                  Posted
                  {r.url ? (
                    <>
                      {" · "}
                      <a className="underline" href={r.url} target="_blank" rel="noreferrer">
                        view
                      </a>
                    </>
                  ) : null}
                </span>
              ) : r.skipped ? (
                <span className="text-slate-400" title={r.error}>
                  Not connected
                </span>
              ) : (
                <span className="max-w-[16rem] text-right text-rose-600" title={r.error}>
                  Failed{r.error ? ` — ${r.error}` : ""}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
