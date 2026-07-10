"use client";

import { useState } from "react";

type Business = {
  company_id: number;
  slug: string;
  name: string;
  logo_url: string | null;
  tier: "gold" | "silver" | "free";
  category: string | null;
  description: string | null;
  suburb: string | null;
  state: string | null;
  distance_km: number | null;
  services_statewide: boolean;
  services_nationwide: boolean;
  can_request: boolean;
};

const MAX = 5;

function areaText(b: Business): string {
  if (b.services_nationwide) return "Services Australia-wide";
  if (b.services_statewide) return `Services all of ${b.state ?? "the state"}`;
  if (b.distance_km != null) return b.distance_km < 1 ? "< 1 km away" : `${b.distance_km} km away`;
  return [b.suburb, b.state].filter(Boolean).join(", ");
}

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export default function ResultsClient({
  requestId,
  businesses,
  alreadySent,
}: {
  requestId: number;
  businesses: Business[];
  alreadySent: number[];
}) {
  const [sentIds, setSentIds] = useState<Set<number>>(new Set(alreadySent));
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const count = sentIds.size;
  const maxReached = count >= MAX;

  async function request(companyId: number) {
    setError(null);
    setBusyId(companyId);
    const res = await fetch(`/api/client/quote-request/${requestId}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId }),
    });
    const r = await res.json().catch(() => ({}));
    setBusyId(null);
    if (!res.ok) {
      setError(r.error ?? "Could not send the request.");
      return;
    }
    setSentIds((prev) => new Set(prev).add(companyId));
  }

  return (
    <div className="space-y-5">
      {/* Counter bar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
        <p className="text-sm font-semibold text-slate-700">
          Quote Requests Selected <span className="ml-1 rounded-full bg-sky-950 px-2.5 py-0.5 text-white">{count} / {MAX}</span>
        </p>
        {maxReached && (
          <p className="text-sm font-medium text-amber-700">
            You have reached the maximum of {MAX} quote requests for this enquiry.
          </p>
        )}
      </div>

      {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>}

      {businesses.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">No businesses currently service your area for this category.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {businesses.map((b) => {
            const sent = sentIds.has(b.company_id);
            const isGold = b.tier === "gold";
            return (
              <li
                key={b.company_id}
                className={`rounded-2xl border bg-white p-5 shadow-sm ${isGold ? "border-amber-300" : "border-slate-200"}`}
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-sky-100 text-sm font-extrabold text-sky-800">
                    {b.logo_url ? <img src={b.logo_url} alt={`${b.name} logo`} className="h-full w-full object-cover" /> : initials(b.name) || "?"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {isGold && (
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                          ⭐ Featured in {b.state ?? "your State"}
                        </span>
                      )}
                      {b.tier === "silver" && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">Silver</span>
                      )}
                      {b.category && <span className="text-xs font-semibold text-slate-500">{b.category.split("/")[0].trim()}</span>}
                    </div>
                    <h3 className="mt-1 text-base font-bold text-slate-900">{b.name}</h3>
                    <p className="text-xs text-slate-500">{areaText(b)}</p>
                    {b.description && <p className="mt-2 line-clamp-2 text-sm text-slate-600">{b.description}</p>}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <a
                      href={`/directory/company/${b.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap rounded-xl bg-sky-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-800"
                    >
                      View Profile →
                    </a>
                    {b.can_request &&
                      (sent ? (
                        <span className="whitespace-nowrap rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                          ✓ Quote Request Sent
                        </span>
                      ) : (
                        <button
                          onClick={() => request(b.company_id)}
                          disabled={maxReached || busyId === b.company_id}
                          className="whitespace-nowrap rounded-xl border border-red-700 bg-white px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
                        >
                          {busyId === b.company_id ? "Sending…" : "Request Quote"}
                        </button>
                      ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
