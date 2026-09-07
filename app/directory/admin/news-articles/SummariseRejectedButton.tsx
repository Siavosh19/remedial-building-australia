"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

type Result = { summarised: number; failed: number; remaining: number };

// Rejected articles that came in before the ingest started writing a reject
// note have a title and nothing else. This fills their line in, a batch per
// click, so the rejected tab can be read for mistakes rather than opened
// link by link.
export default function SummariseRejectedButton({ outstanding }: { outstanding: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const left = result ? result.remaining : outstanding;
  if (!left && !result) return null;

  async function run() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/directory/admin/news-articles/summarise-rejected", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "That didn't work. Please try again.");
      } else {
        setResult(data as Result);
        router.refresh();
      }
    } catch {
      setError("That didn't work. Please try again.");
    }
    setBusy(false);
  }

  return (
    <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <button
          type="button"
          disabled={busy || left === 0}
          onClick={run}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          <FileText size={14} />
          {busy ? "Writing summaries…" : "Summarise rejected articles"}
        </button>
        <p className="text-xs text-slate-600">
          {left > 0 ? (
            <>
              <strong>{left}</strong> rejected article{left === 1 ? "" : "s"} came in with no summary. This writes a
              line on each — what it was, and why it was turned away — so you can spot anything rejected by mistake.
              Sixty at a time; click again to keep going.
            </>
          ) : (
            <>Every rejected article now has a summary.</>
          )}
        </p>
      </div>

      {error && <p className="mt-2 text-xs font-semibold text-rose-700">{error}</p>}

      {result && (
        <p className="mt-2 border-t border-slate-200 pt-2 text-xs text-slate-600">
          Summarised {result.summarised} article{result.summarised === 1 ? "" : "s"}
          {result.failed > 0 && <> — {result.failed} came back empty and will be retried on the next run</>}.{" "}
          {result.remaining > 0
            ? `${result.remaining} still to go.`
            : "Nothing left without a summary."}
        </p>
      )}
    </div>
  );
}
