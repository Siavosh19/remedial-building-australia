"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { TERMS, TERMS_SUMMARY, TERMS_VERSION } from "@/lib/strata/terms";

/**
 * Shown instead of the workspace until the current terms are accepted. It gates
 * the whole module from one place, so there is no route that can be reached
 * without having agreed.
 */
export default function TermsGate() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function accept() {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/client/strata/terms", { method: "POST" });
    setBusy(false);
    if (!res.ok) {
      setError("Could not record that. Try again.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-950 text-white">
          <ShieldCheck size={18} />
        </span>
        <h1 className="mt-3 text-2xl font-extrabold text-slate-900">Before you start</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{TERMS_SUMMARY}</p>
      </div>

      <div className="max-h-[52vh] space-y-5 overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {TERMS.map((section) => (
          <section key={section.heading}>
            <h2 className="text-sm font-bold text-slate-900">{section.heading}</h2>
            {section.body.map((p, i) => (
              <p key={i} className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
          </section>
        ))}
        <p className="border-t border-slate-200 pt-4 text-xs text-slate-400">Version {TERMS_VERSION}</p>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300"
        />
        <span>
          I have read these terms and I accept them on behalf of the scheme or schemes I administer. I
          understand this is record-keeping software, that it does not give advice, and that it never holds the
          scheme&apos;s money.
        </span>
      </label>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      <button
        onClick={accept}
        disabled={!agreed || busy}
        className="rounded-xl bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-50"
      >
        {busy ? "Saving…" : "Accept and continue"}
      </button>
    </div>
  );
}
