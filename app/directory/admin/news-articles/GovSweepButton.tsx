"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Landmark } from "lucide-react";

type SweepResult = {
  considered: number;
  attempted: number;
  created: { id: string; title: string; url: string }[];
  duplicates: number;
  not_found: number;
  remaining: number;
};

// Finds the government publication behind articles that only link to news
// coverage of it, and files each one as a new draft. Runs a small batch per
// click — each lookup searches the web and reads the agency's own page.
export default function GovSweepButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SweepResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function sweep() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/directory/admin/news-articles/gov-sweep", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "That didn't work. Please try again.");
      } else {
        setResult(data as SweepResult);
        router.refresh();
      }
    } catch {
      setError("That didn't work. Please try again.");
    }
    setBusy(false);
  }

  return (
    <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <button
          type="button"
          disabled={busy}
          onClick={sweep}
          className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-amber-700 disabled:opacity-60"
        >
          <Landmark size={14} />
          {busy ? "Searching government websites…" : "Find government sources"}
        </button>
        <p className="text-xs text-amber-900">
          Looks up the official publication behind articles that only link to news coverage — the agency&apos;s own
          media release, notice or code change — and files each one as a new draft. A couple at a time; click again to
          keep going.
        </p>
      </div>

      {error && <p className="mt-2 text-xs font-semibold text-rose-700">{error}</p>}

      {result && (
        <div className="mt-3 border-t border-amber-200 pt-2 text-xs text-amber-900">
          {result.created.length > 0 ? (
            <>
              <p className="font-semibold">
                Added {result.created.length} government article{result.created.length === 1 ? "" : "s"} as draft
                {result.created.length === 1 ? "" : "s"}:
              </p>
              <ul className="mt-1 space-y-1">
                {result.created.map((c) => (
                  <li key={c.id}>
                    <a href={`/news-preview/${c.id}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-800 hover:underline">
                      {c.title}
                    </a>{" "}
                    <span className="text-amber-700">— {new URL(c.url).hostname}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>
              {result.attempted === 0
                ? "Nothing left to check — every government article has been looked up."
                : "No official government publication found for the articles checked this time."}
            </p>
          )}
          <p className="mt-1 text-amber-700">
            {result.remaining} article{result.remaining === 1 ? "" : "s"} still to check.
          </p>
        </div>
      )}
    </div>
  );
}
