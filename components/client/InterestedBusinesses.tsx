"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, Globe, Star } from "lucide-react";

// The businesses that expressed interest, shown to the client as uniform white
// cards. Contact info is visible (so the client can call first); Gold sorts to
// the top with a "Featured" badge but the card looks the same. "Request a quote"
// hooks the client up with that business (mutual contact email).

export type InterestedBusiness = {
  deliveryId: number;
  companyId: number;
  name: string;
  slug: string;
  suburb: string | null;
  state: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  isFeatured: boolean;
};

const webHref = (w: string) => (w.startsWith("http") ? w : `https://${w}`);
const webLabel = (w: string) => w.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function InterestedBusinesses({ requestId, businesses }: { requestId: number; businesses: InterestedBusiness[] }) {
  const [requested, setRequested] = useState<Set<number>>(new Set());
  const [busyId, setBusyId] = useState<number | null>(null);

  async function requestQuote(b: InterestedBusiness) {
    setBusyId(b.companyId);
    setRequested((s) => new Set(s).add(b.companyId)); // optimistic
    try {
      const res = await fetch(`/api/client/quote-request/${requestId}/request-quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId: b.companyId }),
      });
      if (!res.ok) setRequested((s) => { const n = new Set(s); n.delete(b.companyId); return n; });
    } catch {
      setRequested((s) => { const n = new Set(s); n.delete(b.companyId); return n; });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <ul className="space-y-3">
      {businesses.map((b) => {
        const done = requested.has(b.companyId);
        const loc = [b.suburb, b.state].filter(Boolean).join(", ");
        return (
          <li key={b.deliveryId} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-bold text-slate-900">{b.name}</p>
              {b.isFeatured && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg,#b8963e,#d4b44a,#c8922a)" }}>
                  <Star size={10} fill="#fff" /> Featured
                </span>
              )}
            </div>
            {loc && <p className="mt-0.5 truncate text-xs text-slate-500">{loc}</p>}

            {/* Contact info — visible so the client can reach out before selecting. */}
            {(b.phone || b.email || b.website) && (
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                {b.phone && <a href={`tel:${b.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-1 font-semibold text-sky-800 hover:underline"><Phone size={13} /> {b.phone}</a>}
                {b.email && <a href={`mailto:${b.email}`} className="inline-flex items-center gap-1 font-semibold text-sky-800 hover:underline"><Mail size={13} /> {b.email}</a>}
                {b.website && <a href={webHref(b.website)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-sky-800 hover:underline"><Globe size={13} /> {webLabel(b.website)}</a>}
              </div>
            )}

            <div className="mt-3 flex gap-2">
              <Link
                href={`/directory/company/${b.slug}`}
                target="_blank"
                className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                View profile
              </Link>
              {done ? (
                <span className="flex-1 rounded-xl bg-emerald-50 px-3 py-2 text-center text-xs font-bold text-emerald-700">Quote requested ✓</span>
              ) : (
                <button
                  onClick={() => requestQuote(b)}
                  disabled={busyId === b.companyId}
                  className="flex-1 rounded-xl bg-red-700 px-3 py-2 text-center text-xs font-bold text-white transition hover:bg-red-800 active:scale-[0.98] disabled:opacity-60"
                >
                  {busyId === b.companyId ? "…" : "Request a quote"}
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
