"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo, type CSSProperties } from "react";
import Link from "next/link";
import { dirTier, displayName, clampName, cardSummary } from "@/lib/directory-tier";

// Brushed / shiny metallic sheens — angled bands used as a thin frame around the
// white content panel on the paid tiers.
const GOLD_BRUSH = "linear-gradient(135deg, #fbf3d9 0%, #f0d59f 18%, #fdf8e8 34%, #e6c977 50%, #faf1d6 66%, #edd696 82%, #fbf3d9 100%)";
const SILVER_BRUSH = "linear-gradient(135deg, #f4f6f8 0%, #dfe4ea 18%, #f7f9fb 34%, #cbd2db 50%, #eef1f4 66%, #d6dce3 82%, #f4f6f8 100%)";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryOption = {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
};

type CompanyResult = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  tagline?: string | null;
  phone: string | null;
  website?: string | null;
  email?: string | null;
  plan_type?: string;
  profile_status: string;
  confidence_score: number;
  is_featured: boolean;
  is_claimed: boolean;
  listing_claim_status?: string | null;
  logo_url?: string | null;
  distance_km?: number | null;
  main_category: CategoryOption | null;
  locations: Array<{
    suburb: string | null;
    state: string;
    postcode: string;
    services_nationwide?: boolean;
    services_statewide?: boolean;
  }>;
  licences?: Array<{ status: string }>;
  company_tags?: Array<{ tag: { name: string; tag_type: string } }>;
};

type LocationSuggestion = {
  type: "state" | "suburb" | "region" | "postcode";
  label: string;
  stateCode: string;
  suburb?: string;
  postcode?: string;
  lat?: number;
  lng?: number;
};

type Coords = { lat: number; lng: number } | null;
type SelectedLocation = LocationSuggestion | null;

// AI category matcher (POST /api/ai-category-match) — maps a free-text job
// description onto a directory category so the owner doesn't need the trade name.
type AiMatchCategory = { id: number; name: string; slug: string };
type AiMatchResponse = {
  matched: AiMatchCategory | null;
  alternates: AiMatchCategory[];
  query: string;
  location: string;
  confidence: "high" | "medium" | "low";
  reason: string;
};

interface Props {
  categories: CategoryOption[];
}

// ─── Company row ─────────────────────────────────────────────────────────────

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

// Resolve a listing's plan string — same fallback the server ranks by.
function planOf(company: CompanyResult): string {
  return company.plan_type ?? (company.is_featured ? "featured" : company.is_claimed ? "claimed" : "basic");
}

// ─── Contact confirm popup ───────────────────────────────────────────────────
// Tapping any phone / email / website control opens a small popup that shows the
// detail and lets the visitor proceed or close — instead of firing tel:/mailto:/
// link straight away. A single modal (mounted once in the listing) listens for a
// window event, so the memoized cards don't need a callback threaded through them.
type ContactKind = "phone" | "email" | "website";
type ContactDetail = { kind: ContactKind; value: string; company: string };

function openContactConfirm(detail: ContactDetail) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<ContactDetail>("rba:contact", { detail }));
  }
}

function contactHref(kind: ContactKind, value: string): string {
  if (kind === "phone") return `tel:${value.replace(/\s+/g, "")}`;
  if (kind === "email") return `mailto:${value}`;
  return value.startsWith("http") ? value : `https://${value}`;
}

function prettyContact(kind: ContactKind, value: string): string {
  return kind === "website" ? value.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : value;
}

function ContactIcon({ kind }: { kind: ContactKind }) {
  const p = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (kind === "phone") return (<svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
  if (kind === "email") return (<svg {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>);
  return (<svg {...p}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20" /></svg>);
}

// The single confirm popup — mounted once at the top of the listing.
function ContactConfirmModal() {
  const [detail, setDetail] = useState<ContactDetail | null>(null);
  useEffect(() => {
    const handler = (e: Event) => setDetail((e as CustomEvent<ContactDetail>).detail);
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setDetail(null); };
    window.addEventListener("rba:contact", handler);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("rba:contact", handler); window.removeEventListener("keydown", esc); };
  }, []);
  if (!detail) return null;
  const { kind, value, company } = detail;
  const heading = kind === "phone" ? "Phone number" : kind === "email" ? "Email address" : "Website";
  const action = kind === "phone" ? "Call" : kind === "email" ? "Email" : "Visit website";
  const close = () => setDetail(null);
  return (
    <div role="dialog" aria-modal="true" aria-label={`${heading} for ${company}`} onClick={close}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(15,23,42,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, maxWidth: 340, width: "100%", padding: 20, boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b", margin: 0 }}>{heading}</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#16324F", margin: "6px 0 2px", wordBreak: "break-word" }}>{company}</p>
        <p style={{ fontSize: 16, color: "#1e3a5f", margin: "0 0 18px", wordBreak: "break-word" }}>{prettyContact(kind, value)}</p>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={close} style={{ flex: 1, borderRadius: 8, border: "0.5px solid #C6D2DE", background: "#fff", color: "#16324F", fontSize: 14, fontWeight: 600, padding: "10px 0", cursor: "pointer" }}>Close</button>
          <a href={contactHref(kind, value)} onClick={close} {...(kind === "website" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            style={{ flex: 1, borderRadius: 8, background: "#16324F", color: "#fff", fontSize: 14, fontWeight: 700, padding: "10px 0", textAlign: "center", textDecoration: "none" }}>{action}</a>
        </div>
      </div>
    </div>
  );
}

// Circular 32px icon button (Free card, mobile) — opens the confirm popup.
function ContactIconButton({ kind, value, company, size = 32 }: { kind: ContactKind; value: string; company: string; size?: number }) {
  const isWeb = kind === "website";
  const aria = kind === "phone" ? `Call ${company}` : kind === "email" ? `Email ${company}` : `Visit ${company} website`;
  return (
    <button type="button" aria-label={aria} onClick={() => openContactConfirm({ kind, value, company })}
      style={{ width: size, height: size, borderRadius: 999, background: "#EEF3F8", color: isWeb ? "#185FA5" : "#16324F", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "none", flexShrink: 0, cursor: "pointer", padding: 0 }}>
      <ContactIcon kind={kind} />
    </button>
  );
}

// Right-aligned circular icons for the available contacts (Free card, mobile).
function ContactIconRow({ company, size, gap = 6 }: { company: { name: string; phone: string | null; email?: string | null; website?: string | null }; size?: number; gap?: number }) {
  if (!company.phone && !company.email && !company.website) return null;
  return (
    <div style={{ display: "flex", gap, flexShrink: 0 }}>
      {company.phone && <ContactIconButton kind="phone" value={company.phone} company={company.name} size={size} />}
      {company.email && <ContactIconButton kind="email" value={company.email} company={company.name} size={size} />}
      {company.website && <ContactIconButton kind="website" value={company.website} company={company.name} size={size} />}
    </div>
  );
}

// Equal-width Call / Email / Website tap buttons (Featured card, mobile Row 4) —
// each opens the confirm popup. Only available contacts are shown.
function ContactTapRow({ company }: { company: { name: string; phone: string | null; email?: string | null; website?: string | null } }) {
  const btns: { kind: ContactKind; value: string; label: string }[] = [];
  if (company.phone) btns.push({ kind: "phone", value: company.phone, label: "Call" });
  if (company.email) btns.push({ kind: "email", value: company.email, label: "Email" });
  if (company.website) btns.push({ kind: "website", value: company.website, label: "Website" });
  if (!btns.length) return null;
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      {btns.map((b) => (
        <button key={b.kind} type="button" aria-label={`${b.label} ${company.name}`} onClick={() => openContactConfirm({ kind: b.kind, value: b.value, company: company.name })}
          style={{ flex: 1, background: "#F5F4F0", borderRadius: 8, border: "none", color: "#16324F", fontSize: 13, fontWeight: 700, padding: "9px 0", cursor: "pointer" }}>{b.label}</button>
      ))}
    </div>
  );
}

// Distance + location as a single "📍 X km away · Suburb, STATE" line (mobile).
function metaLine(distanceKm: number | null | undefined, locText: string): string {
  const d = distanceKm == null ? "" : distanceKm < 1 ? "< 1 km away" : `${distanceKm < 10 ? distanceKm.toFixed(1) : Math.round(distanceKm)} km away`;
  const s = [d, locText].filter(Boolean).join(" · ");
  return s ? `📍 ${s}` : "";
}

// Phone / email / website — shared inline contact row (Silver + Free desktop).
// Each control opens the confirm popup rather than dialling/opening immediately.
function ContactLinks({ company, className = "", style }: { company: { name: string; phone: string | null; email?: string | null; website?: string | null }; className?: string; style?: CSSProperties }) {
  if (!company.phone && !company.email && !company.website) return null;
  const btn = "inline-flex items-center gap-1 font-semibold text-sky-800 hover:underline";
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${className}`} style={style}>
      {company.phone && (
        <button type="button" aria-label={`Call ${company.name}`} onClick={() => openContactConfirm({ kind: "phone", value: company.phone!, company: company.name })} className={btn}>
          <span aria-hidden>📞</span> {company.phone}
        </button>
      )}
      {company.email && (
        <button type="button" aria-label={`Email ${company.name}`} onClick={() => openContactConfirm({ kind: "email", value: company.email!, company: company.name })} className={btn}>
          <span aria-hidden>✉️</span> {company.email}
        </button>
      )}
      {company.website && (
        <button type="button" aria-label={`Visit ${company.name} website`} onClick={() => openContactConfirm({ kind: "website", value: company.website!, company: company.name })} className={btn}>
          <span aria-hidden>🌐</span> {prettyContact("website", company.website)}
        </button>
      )}
    </div>
  );
}

// ─── Silver card ─────────────────────────────────────────────────────────────
// Paid tier: 32px logo inline with the (full) name + (suburb, state), a capped
// summary, a single "View Profile" button, and a centred SILVER ribbon. Paid
// tiers keep any tagline in their name — it is only stripped on Free cards.
function SilverRow({ company }: { company: CompanyResult }) {
  const location = company.locations[0];
  const locText = [location?.suburb, location?.state].filter(Boolean).join(", ");
  const summary = cardSummary(company.description, 21);
  return (
    <div
      className="relative mx-3 my-2 rounded-[12px] p-[5px]"
      style={{ background: SILVER_BRUSH, boxShadow: "0 2px 9px rgba(15,23,42,0.16)" }}
    >
      {/* Centred SILVER ribbon — mirrors the Gold ribbon position/style */}
      <span
        className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white"
        style={{ background: "linear-gradient(135deg, #64748b, #94a3b8, #475569)", boxShadow: "0 3px 10px rgba(71,85,105,0.35)" }}
      >
        Silver
      </span>

      {/* ── Desktop (≥640px) — redesigned featured header: left column stacks the */}
      {/*    category badge over the logo; middle bottom-aligns tagline + name to  */}
      {/*    the logo; View Profile pins top-right. Distance chip removed. Contacts */}
      {/*    centre at the card foot above a thin divider. */}
      <div className="hidden rounded-[8px] bg-white px-5 pb-3.5 pt-2.5 sm:block">
        <div className="flex items-stretch gap-3">
          {/* LEFT column (~88px, centred): category badge + logo */}
          <div className="flex shrink-0 flex-col items-center gap-2" style={{ width: 88 }}>
            {company.main_category && (
              <span className="max-w-full truncate rounded-full px-2.5 py-0.5 text-center text-[12px] font-bold" style={{ background: "#F1F1EF", color: "#5F5E5A", border: "0.5px solid #E2E2DE" }}>
                {company.main_category.name.split("/")[0].trim()}
              </span>
            )}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-[12px] font-extrabold text-slate-600">
              {company.logo_url
                ? <img src={company.logo_url} alt={`${company.name} logo`} width={32} height={32} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                : initials(company.name) || "?"}
            </div>
          </div>

          {/* MIDDLE column: tagline + name, bottom-aligned to the logo */}
          <div className="flex min-w-0 flex-1 flex-col justify-end self-stretch">
            {company.tagline && (
              <div className="truncate" style={{ fontFamily: "var(--font-dm-serif)", fontStyle: "italic", fontSize: "15px", letterSpacing: "0.2px", color: "#9E3B2B" }}>
                &ldquo;{company.tagline}&rdquo;
              </div>
            )}
            <h3 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-lg font-bold leading-tight text-sky-950">
              <span>{clampName(company.name)}</span>
              {locText && <span className="text-sm font-normal text-slate-500">({locText})</span>}
            </h3>
          </div>

          {/* RIGHT: View Profile pinned top-right */}
          <Link
            href={`/directory/company/${company.slug}`}
            className="shrink-0 self-start whitespace-nowrap rounded-lg bg-sky-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            View Profile →
          </Link>
        </div>

        {summary && <p className="mt-3 text-sm leading-relaxed text-slate-600">{summary}</p>}
        <ContactLinks company={company} className="mt-3 justify-center border-t border-slate-200 pt-3 text-sm" />
      </div>

      {/* ── Mobile (<640px) — item 4: compact 4-row layout ── */}
      <div className="rounded-[8px] bg-white sm:hidden" style={{ padding: "20px 16px 14px" }}>
        {/* Row 1: category chip (left) + View Profile (right) */}
        <div className="flex items-center justify-between gap-2">
          {company.main_category
            ? <span className="min-w-0 truncate rounded-full px-2 py-0.5 text-[12px] font-bold" style={{ background: "#F1F1EF", color: "#5F5E5A", border: "0.5px solid #E2E2DE" }}>{company.main_category.name.split("/")[0].trim()}</span>
            : <span />}
          <Link href={`/directory/company/${company.slug}`} className="shrink-0 whitespace-nowrap rounded-lg bg-sky-950 px-3 py-1.5 text-[13px] font-semibold text-white">View Profile</Link>
        </div>
        {/* Row 2: 46px logo + stacked tagline / name / location */}
        <div className="mt-3 flex items-start gap-3">
          <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-[13px] font-extrabold text-slate-600" style={{ width: 46, height: 46 }}>
            {company.logo_url
              ? <img src={company.logo_url} alt={`${company.name} logo`} width={46} height={46} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              : initials(company.name) || "?"}
          </div>
          <div className="min-w-0 flex-1">
            {company.tagline && (
              <div className="truncate" style={{ fontFamily: "var(--font-dm-serif)", fontStyle: "italic", fontSize: "13px", letterSpacing: "0.2px", color: "#9E3B2B" }}>&ldquo;{company.tagline}&rdquo;</div>
            )}
            <div className="truncate" style={{ fontFamily: "var(--font-dm-serif-up)", fontSize: 18, lineHeight: 1.2, color: "#16324F" }}>{clampName(company.name)}</div>
            {metaLine(company.distance_km, locText) && <div className="truncate" style={{ fontSize: 12, color: "#64748b" }}>{metaLine(company.distance_km, locText)}</div>}
          </div>
        </div>
        {/* Row 3: description (2 lines max) */}
        {summary && <p className="mt-2.5 text-[13px] leading-snug text-slate-600" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{summary}</p>}
        {/* Row 4: Call / Email / Website tap buttons */}
        <ContactTapRow company={company} />
      </div>
    </div>
  );
}

// ─── Free card ───────────────────────────────────────────────────────────────
// No logo, no description — ever. Core name only (tagline after a pipe stripped
// for display), inline (suburb, state), contacts, and small buttons top-right.
// Claimed = bright white + navy name + blue tag + one button; unclaimed = duller
// background + grey name/tag + a "Claim this profile" button.
function FreeRow({ company }: { company: CompanyResult }) {
  const location = company.locations[0];
  const locText = [location?.suburb, location?.state].filter(Boolean).join(", ");
  const name = displayName(company.name);
  const claimed = company.is_claimed || company.listing_claim_status === "claimed";
  const canClaim = !claimed && company.listing_claim_status !== "claim_pending";

  // Claimed vs unclaimed differ ONLY by background (white vs light grey) and the
  // presence of the "Claim this profile" button. Name, tag, fonts and button
  // styling are identical between the two.
  return (
    <div className="sm:border-b sm:border-slate-200 sm:last:border-0">
      {/* ── Desktop (≥640px) — unchanged ── */}
      <div className={`hidden items-start justify-between gap-3 px-6 py-4 hover:bg-slate-50/70 sm:flex ${claimed ? "bg-white" : "bg-slate-50/60"}`}>
        <div className="min-w-0 flex-1">
          {company.main_category && (
            <span className="mb-1 inline-block rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-bold text-sky-800">
              {company.main_category.name.split("/")[0].trim()}
            </span>
          )}
          <h3 className="text-base font-bold leading-tight text-slate-900">
            {name}
            {locText && <span className="ml-1 text-xs font-normal text-slate-400">({locText})</span>}
          </h3>
          <ContactLinks company={company} className="mt-1.5 text-xs sm:pl-5" />
        </div>
        <div className="flex shrink-0 flex-row items-start gap-1.5">
          <Link href={`/directory/company/${company.slug}`} className="whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100">
            View Profile
          </Link>
          {canClaim && (
            <Link href={`/directory/claim/${company.slug}`} className="whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100">
              Claim this profile
            </Link>
          )}
        </div>
      </div>

      {/* ── Mobile (<640px) — item 6: fixed 3-row bordered card, no raw contacts ── */}
      <div className="sm:hidden" style={{ margin: "5px 10px", borderRadius: 12, border: "0.5px solid #DDE4EC", padding: "12px 14px", background: "#fff" }}>
        {/* Row 1: blue category chip (left) + Suburb, STATE (right) */}
        <div className="flex items-center justify-between gap-2">
          {company.main_category
            ? <span className="min-w-0 truncate rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ background: "#E3EEFB", color: "#185FA5" }}>{company.main_category.name.split("/")[0].trim()}</span>
            : <span />}
          {locText && <span className="shrink-0 truncate text-right text-[12px] text-slate-400" style={{ maxWidth: "55%" }}>{locText}</span>}
        </div>
        {/* Row 2: business name (serif) — full width so long names truncate less */}
        <div className="mt-2 min-w-0 truncate" style={{ fontFamily: "var(--font-dm-serif-up)", fontSize: 17, lineHeight: 1.2, color: "#16324F" }}>{name}</div>
        {/* Row 3: three equal thirds — contact icons (left) · View Profile · Claim this profile */}
        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex min-w-0 flex-1 justify-start"><ContactIconRow company={company} size={28} gap={4} /></div>
          <Link href={`/directory/company/${company.slug}`} className="min-w-0 flex-1 overflow-hidden whitespace-nowrap rounded-lg px-1 py-2 text-center text-[11px] font-semibold text-white" style={{ background: "#16324F" }}>View Profile</Link>
          {canClaim && (
            <Link href={`/directory/claim/${company.slug}`} className="min-w-0 flex-1 overflow-hidden whitespace-nowrap rounded-lg px-1 py-2 text-center text-[11px] font-semibold" style={{ border: "0.5px solid #C6D2DE", color: "#16324F" }}>Claim this profile</Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Silver sample / placeholder ─────────────────────────────────────────────
// Shown at the top of the Free list when no real Silver member exists in the
// current results, inviting a business to buy the Silver spot. No price shown.
function SilverSampleCard() {
  return (
    <div className="border-b border-slate-200 px-3 pb-3 pt-4">
    <div
      className="relative rounded-[12px] p-[5px]"
      style={{ background: SILVER_BRUSH, boxShadow: "0 2px 9px rgba(15,23,42,0.16)" }}
    >
      {/* "Your Business Here" — top-left badge (all sizes) */}
      <span className="absolute left-4 top-0 z-20 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[10px] font-bold text-slate-600 shadow-md ring-1 ring-slate-200 sm:left-6 sm:px-3.5 sm:text-[11px]">
        Your Business Here
      </span>
      {/* Tier badge — top-right on phones, top-centre on desktop */}
      <span
        className="absolute right-4 top-0 z-10 -translate-y-1/2 rounded-full px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
        style={{ background: "linear-gradient(135deg, #64748b, #94a3b8, #475569)", boxShadow: "0 3px 10px rgba(71,85,105,0.35)" }}
      >
        Silver — Available
      </span>

      {/* White content panel inside the silver frame */}
      <div className="rounded-[8px] bg-white px-4 pt-2.5 pb-3 sm:px-5 sm:py-3.5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-[12px] font-extrabold text-slate-400 sm:flex">★</div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold leading-tight text-slate-700 sm:text-lg">
            Your Business Name
            <span className="text-sm font-normal text-slate-500"> / Your Tagline</span>
            <span className="text-xs font-normal text-slate-400 sm:text-sm"> (Your Suburb, State)</span>
          </h3>
          <p className="mt-1.5 text-[13px] leading-snug text-slate-500 sm:mt-2 sm:text-sm sm:leading-relaxed">
            Claim the Silver spot for this category and rank above every Free listing in your suburb — seen first by the strata managers and owners searching for your trade.
          </p>
          {/* Desktop contacts — nested under the name (unchanged) */}
          <div className="mt-2.5 hidden flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-slate-400 sm:flex">
            <span className="inline-flex items-center gap-1"><span aria-hidden>📞</span> 000 000 000</span>
            <span className="inline-flex items-center gap-1"><span aria-hidden>✉️</span> you@yourbusiness.com.au</span>
            <span className="inline-flex items-center gap-1"><span aria-hidden>🌐</span> yourbusiness.com.au</span>
          </div>
        </div>
        {/* Desktop CTA — inline on the right (unchanged) */}
        <Link
          href="/directory/login"
          className="hidden shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:block"
          style={{ background: "#475569" }}
        >
          Get This Spot →
        </Link>
      </div>
      {/* Mobile contacts — phone + email on one row, website below */}
      <div className="mt-3 flex flex-col gap-1 text-[11px] font-semibold text-slate-600 sm:hidden">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1"><span aria-hidden>📞</span> 000 000 000</span>
          <span className="inline-flex items-center gap-1"><span aria-hidden>✉️</span> you@yourbusiness.com.au</span>
        </div>
        <span className="inline-flex items-center gap-1"><span aria-hidden>🌐</span> yourbusiness.com.au</span>
      </div>
      {/* Mobile CTA — full width */}
      <Link
        href="/directory/login"
        className="mt-3 block w-full rounded-lg px-4 py-2 text-center text-sm font-semibold text-white transition hover:opacity-90 sm:hidden"
        style={{ background: "#475569" }}
      >
        Get This Spot →
      </Link>
      </div>
    </div>
    </div>
  );
}

// Dispatch to the right card by tier. Gold renders in TopListingSection and is
// filtered out of this list, so only Silver and Free reach here.
// Memoized so typing in the search boxes (which re-renders DirectoryListing) does
// not re-render every result card — cards only re-render when their company changes.
const CompanyRow = memo(function CompanyRow({ company }: { company: CompanyResult }) {
  return dirTier(planOf(company)) === "silver"
    ? <SilverRow company={company} />
    : <FreeRow company={company} />;
});

type TopListing = {
  id: number;
  slug: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  tagline: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  main_category: { name: string } | null;
  locations: { suburb: string | null; state: string }[];
  distance_km: number | null;
};

// "Top Listing" section — real Premium subscribers for the searched category,
// ordered by subscription date, max 3. Renders nothing when empty.
function TopListingSection({ items, eligible }: { items: TopListing[]; eligible: boolean }) {
  // The Top Listing cards are a vertical stack, so they render at natural height.
  // (An earlier JS pass measured the tallest card and set a matching minHeight on
  // every card — but that ran after first paint, causing a layout jump right above
  // the results that could offset clicks. Natural heights avoid the reflow.)

  // Zero state — the category was searched but nobody has subscribed: one promo
  // card inviting businesses to claim the spot. No T&C line, never beside real cards.
  if (!items.length) {
    if (!eligible) return null;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 28 }}>
        <div style={{ position: "relative" }}>
          {/* "Your Business Here" — top-left badge (all sizes) */}
          <span className="absolute left-4 top-0 z-20 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold shadow-md ring-1 ring-black/5 sm:left-7 sm:px-3.5 sm:text-[11px]" style={{ background: "#fdf1cf", color: "#7a5c1e" }}>
            Your Business Here
          </span>
          {/* Tier badge — top-right on phones, top-centre on desktop */}
          <div className="absolute right-4 top-0 z-10 -translate-y-1/2 whitespace-nowrap rounded-[20px] px-[18px] py-1.5 text-[10px] font-extrabold uppercase tracking-[1.2px] text-white sm:left-1/2 sm:right-auto sm:-translate-x-1/2" style={{ background: "linear-gradient(135deg, #b8963e, #d4b44a, #c8922a)", boxShadow: "0 4px 14px rgba(184,150,62,0.45)" }}>
            ⭐ Gold Featured
          </div>
          <div
            className="rounded-[20px] p-[5px] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,0.13)]"
            style={{ background: GOLD_BRUSH, boxShadow: "0 2px 12px rgba(0,0,0,0.14)" }}
          >
            <div className="overflow-hidden rounded-[15px] bg-white">
            <div className="rba-top-pad" style={{ padding: "20px 28px 24px 28px" }}>
              <div className="flex items-start gap-3 sm:gap-[14px]">
                {/* Avatar (gold-tinted) — desktop only */}
                <div className="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base font-extrabold sm:flex sm:h-10 sm:w-10 sm:text-lg" style={{ background: "#fff6da", color: "#b8963e" }}>★</div>

                {/* Business-info preview (mirrors the Silver card) */}
                <div className="min-w-0 flex-1">
                  <h3 className="mt-1.5 text-base font-extrabold leading-tight sm:mt-0 sm:text-[19px]" style={{ color: "#0f1f35" }}>
                    Your Business Name
                    <span className="text-sm font-normal" style={{ color: "#64748b" }}> / Your Tagline</span>
                    <span className="text-xs font-normal sm:text-sm" style={{ color: "#94a3b8" }}> (Your Suburb, State)</span>
                  </h3>
                  <p className="mt-1.5 text-[13px] font-medium leading-snug sm:mt-2 sm:text-sm sm:leading-relaxed" style={{ color: "#5b6472" }}>
                    Be one of only three Gold Featured businesses for this category in your State — placed above all Silver and Free listings, ahead of 12,000+ businesses on the directory. Limited to 3 per category in each State/Territory.
                  </p>
                  {/* Desktop contacts — nested under the name (unchanged) */}
                  <div className="mt-2.5 hidden flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold sm:flex" style={{ color: "#94826a" }}>
                    <span className="inline-flex items-center gap-1"><span aria-hidden>📞</span> 000 000 000</span>
                    <span className="inline-flex items-center gap-1"><span aria-hidden>✉️</span> you@yourbusiness.com.au</span>
                    <span className="inline-flex items-center gap-1"><span aria-hidden>🌐</span> yourbusiness.com.au</span>
                  </div>
                </div>

                {/* Desktop CTA — inline right (unchanged) */}
                <Link href="/directory/login" className="hidden shrink-0 whitespace-nowrap rounded-[10px] px-[22px] py-2.5 text-sm font-bold text-white sm:block" style={{ background: "#1e3a5f", boxShadow: "0 3px 10px rgba(30,58,95,0.22)" }}>
                  Get This Spot →
                </Link>
              </div>
              {/* Mobile contacts — phone + email on one row, website below */}
              <div className="mt-3 flex flex-col gap-1 text-[11px] font-semibold sm:hidden" style={{ color: "#7a6a4a" }}>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="inline-flex items-center gap-1"><span aria-hidden>📞</span> 000 000 000</span>
                  <span className="inline-flex items-center gap-1"><span aria-hidden>✉️</span> you@yourbusiness.com.au</span>
                </div>
                <span className="inline-flex items-center gap-1"><span aria-hidden>🌐</span> yourbusiness.com.au</span>
              </div>
              {/* Mobile CTA — full width */}
              <Link href="/directory/login" className="mt-3 block w-full rounded-[10px] px-4 py-2 text-center text-sm font-bold text-white sm:hidden" style={{ background: "#1e3a5f", boxShadow: "0 3px 10px rgba(30,58,95,0.22)" }}>
                Get This Spot →
              </Link>
            </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 640px) {
            .rba-top-pad { padding: 10px 16px 14px 16px !important; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="rba-top-list" style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 28 }}>
      {items.map((b) => {
        const loc = b.locations[0];
        const locText = [loc?.suburb, loc?.state].filter(Boolean).join(", ");
        return (
          <div key={b.id} style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -50%)", background: "linear-gradient(135deg, #b8963e, #d4b44a, #c8922a)", color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", padding: "6px 18px", borderRadius: 20, boxShadow: "0 4px 14px rgba(184,150,62,0.45)", whiteSpace: "nowrap", zIndex: 10 }}>
              {`⭐ Featured in ${loc?.state ?? "your State"}`}
            </div>
            <div
              style={{ background: GOLD_BRUSH, boxShadow: "0 2px 12px rgba(0,0,0,0.14)" }}
              className="flex flex-col rounded-[20px] p-[5px] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,0.13)]"
            >
              <div className="flex-1 overflow-hidden rounded-[15px] bg-white">
              {/* ── Desktop (≥640px) — redesigned featured header: left column stacks */}
              {/*    the category badge over the logo; middle bottom-aligns tagline + */}
              {/*    name to the logo; View Profile pins top-right. Distance chip      */}
              {/*    removed. Contacts centre at the card foot above a thin divider.   */}
              <div className="hidden sm:block" style={{ padding: "14px 28px 20px 28px" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
                  {/* LEFT column (~88px, centred): category badge + logo */}
                  <div style={{ width: 88, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    {b.main_category && <span style={{ maxWidth: "100%", background: "#F1F1EF", color: "#5F5E5A", border: "0.5px solid #E2E2DE", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center" }}>{b.main_category.name.split("/")[0].trim()}</span>}
                    <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 12, background: "#fff6da", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {b.logo_url
                        ? <img src={b.logo_url} alt={`${b.name} logo`} width={48} height={48} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <span style={{ fontSize: 16, fontWeight: 900, color: "#7a5c1e" }}>{initials(b.name)}</span>}
                    </div>
                  </div>
                  {/* MIDDLE column: tagline + name, bottom-aligned to the logo */}
                  <div style={{ flex: 1, minWidth: 0, alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    {b.tagline && <div style={{ fontFamily: "var(--font-dm-serif)", fontStyle: "italic", color: "#9E3B2B", fontSize: 15, letterSpacing: "0.2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 4 }}>&ldquo;{b.tagline}&rdquo;</div>}
                    <h3 style={{ fontSize: 21, fontWeight: 800, color: "#0f1f35", lineHeight: 1.25, margin: 0, display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 8 }}>
                      <span>{clampName(b.name)}</span>
                      {locText && <span style={{ fontSize: 15, fontWeight: 500, color: "#64748b" }}>({locText})</span>}
                    </h3>
                  </div>
                  {/* RIGHT: View Profile pinned top-right */}
                  <Link href={`/directory/company/${b.slug}`} style={{ alignSelf: "flex-start", flexShrink: 0, background: "#1e3a5f", color: "#fff", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 700, boxShadow: "0 3px 10px rgba(30,58,95,0.22)", textDecoration: "none", whiteSpace: "nowrap" }}>
                    View Profile →
                  </Link>
                </div>
                {cardSummary(b.description, 21) && <p style={{ fontSize: 15, color: "#1a1a1a", fontWeight: 500, lineHeight: 1.6, margin: "12px 0 0", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{cardSummary(b.description, 21)}</p>}
                <ContactLinks company={b} className="mt-3 justify-center pt-3 text-sm" style={{ borderTop: "1px solid #ECE7D5" }} />
              </div>

              {/* ── Mobile (<640px) — item 4: compact 4-row layout ── */}
              <div className="sm:hidden" style={{ padding: "20px 16px 14px" }}>
                {/* Row 1: category chip (left) + View Profile (right) */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  {b.main_category
                    ? <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", background: "#F1F1EF", color: "#5F5E5A", border: "0.5px solid #E2E2DE", borderRadius: 20, padding: "3px 11px", fontSize: 12, fontWeight: 700 }}>{b.main_category.name.split("/")[0].trim()}</span>
                    : <span />}
                  <Link href={`/directory/company/${b.slug}`} style={{ flexShrink: 0, background: "#1e3a5f", color: "#fff", borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>View Profile</Link>
                </div>
                {/* Row 2: 46px logo + stacked tagline / name / location */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 12 }}>
                  <div style={{ width: 46, height: 46, flexShrink: 0, borderRadius: 10, background: "#fff6da", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {b.logo_url
                      ? <img src={b.logo_url} alt={`${b.name} logo`} width={46} height={46} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span style={{ fontSize: 15, fontWeight: 900, color: "#7a5c1e" }}>{initials(b.name)}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {b.tagline && <div style={{ fontFamily: "var(--font-dm-serif)", fontStyle: "italic", color: "#9E3B2B", fontSize: 13, letterSpacing: "0.2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>&ldquo;{b.tagline}&rdquo;</div>}
                    <div style={{ fontFamily: "var(--font-dm-serif-up)", fontSize: 18, lineHeight: 1.2, color: "#16324F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{clampName(b.name)}</div>
                    {metaLine(b.distance_km, locText) && <div style={{ fontSize: 12, color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{metaLine(b.distance_km, locText)}</div>}
                  </div>
                </div>
                {/* Row 3: description (2 lines max) */}
                {cardSummary(b.description) && <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.45, margin: "10px 0 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{cardSummary(b.description)}</p>}
                {/* Row 4: Call / Email / Website tap buttons */}
                <ContactTapRow company={b} />
              </div>
              </div>
            </div>
          </div>
        );
      })}
      <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
        Gold Featured placements are filled in order of subscription date — first to subscribe secures position #1, second secures #2, third secures #3. A maximum of 3 positions are available per category in each State/Territory. Gold Featured businesses appear above all Silver and Free listings for their chosen category in their State. No other business will occupy these positions while a subscription is active. Positions are held for the duration of the active subscription.{" "}
        <Link href="/terms" style={{ color: "#64748b", textDecoration: "underline" }}>Terms &amp; Conditions</Link>
      </p>
      <style>{`
        @media (max-width: 640px) {
          .rba-top-list { gap: 14px !important; }
          .rba-top-pad { padding: 10px 16px 14px 16px !important; }
        }
      `}</style>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex gap-4 border-b border-slate-100 bg-white px-6 py-5">
      <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-200" />
      <div className="flex-1 space-y-2.5">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-56 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onPage,
}: {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPage: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-2">
      <p className="text-sm text-slate-500">
        Showing {from}–{to} of {total} results
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Previous
        </button>
        <span className="px-2 text-sm font-semibold text-slate-600">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => onPage(page + 1)}
          disabled={page >= totalPages}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ─── Category selector ────────────────────────────────────────────────────────

function CategorySelector({
  categories,
  value,
  onChange,
}: {
  categories: CategoryOption[];
  value: string;
  onChange: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [subExpanded, setSubExpanded] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // All top-level categories (most are now selectable leaves; only a few, like
  // Product & Material Supplier, have children shown collapsibly). Memoized so we
  // don't re-filter/sort the whole category list on every keystroke/render.
  type Cat = (typeof categories)[number];
  const parents = useMemo(
    () => categories.filter((c) => !c.parent_id).sort((a, b) => a.name.localeCompare(b.name)),
    [categories]
  );

  // Precompute children grouped by parent once, so lookups during render and while
  // typing in the category search are O(1) instead of a full scan per parent.
  const childrenByParent = useMemo(() => {
    const map = new Map<number, Cat[]>();
    for (const c of categories) {
      if (c.parent_id == null) continue;
      const arr = map.get(c.parent_id);
      if (arr) arr.push(c);
      else map.set(c.parent_id, [c]);
    }
    for (const arr of map.values()) arr.sort((a, b) => a.name.localeCompare(b.name));
    return map;
  }, [categories]);
  const childrenOf = (pid: number): Cat[] => childrenByParent.get(pid) ?? [];

  const term = search.toLowerCase().trim();
  const filteredParents = useMemo(
    () =>
      term
        ? parents.filter(
            (p) =>
              p.name.toLowerCase().includes(term) ||
              (childrenByParent.get(p.id) ?? []).some((k) => k.name.toLowerCase().includes(term))
          )
        : parents,
    [parents, childrenByParent, term]
  );

  const selectedLabel = value
    ? (categories.find((c) => c.slug === value)?.name ?? "All Categories")
    : "All Categories";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function select(slug: string) {
    onChange(slug);
    setOpen(false);
    setSearch("");
  }


  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${
          value
            ? "border-sky-600 bg-sky-50 text-sky-800"
            : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
        }`}
      >
        <svg
          className="shrink-0 text-slate-400"
          width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden
        >
          <rect x={3} y={3} width={7} height={7} rx={1.5} />
          <rect x={14} y={3} width={7} height={7} rx={1.5} />
          <rect x={3} y={14} width={7} height={7} rx={1.5} />
          <rect x={14} y={14} width={7} height={7} rx={1.5} />
        </svg>
        <span className="max-w-[180px] truncate">{value ? selectedLabel : "All Categories"}</span>
        <svg
          className={`shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          width={12} height={12} viewBox="0 0 12 12" fill="currentColor"
        >
          <path d="M6 8L1 3h10z" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 px-3 py-2.5">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
              <svg width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="shrink-0 text-slate-400">
                <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories…"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
                autoFocus
              />
              {search && (
                <button onClick={() => setSearch("")} className="shrink-0 text-slate-400 hover:text-slate-600">×</button>
              )}
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            <button
              type="button"
              onClick={() => select("")}
              className={`flex w-full items-center justify-between border-b border-slate-100 px-4 py-2.5 text-left text-sm font-bold transition hover:bg-slate-50 ${!value ? "text-sky-700" : "text-slate-900"}`}
            >
              <span>All Categories</span>
            </button>

            {filteredParents.length === 0 && (
              <p className="px-4 py-3 text-sm text-slate-400">No categories found</p>
            )}

            {filteredParents.map((parent) => {
              const kids = childrenOf(parent.id);
              const matchKids = term ? kids.filter((k) => k.name.toLowerCase().includes(term)) : kids;
              // Group children by their first-segment label. A label with several
              // slash-synonym variants becomes an expandable sub-node (third level);
              // a label with a single variant is a direct subcategory.
              const groups = new Map<string, CategoryOption[]>();
              for (const k of matchKids) {
                const label = k.name.split("/")[0].trim();
                if (!label) continue;
                if (!groups.has(label)) groups.set(label, []);
                groups.get(label)!.push(k);
              }
              const groupList = [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));
              const isOpen = expanded === parent.id || (!!term && groupList.length > 0);
              return (
                <div key={parent.id} className="border-b border-slate-50 last:border-0">
                  <button
                    type="button"
                    onClick={() => (kids.length ? setExpanded((e) => (e === parent.id ? null : parent.id)) : select(parent.slug))}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-bold transition hover:bg-slate-50 ${value === parent.slug ? "text-sky-700" : "text-slate-600"}`}
                  >
                    <span className="truncate">{parent.name}</span>
                    <span className="ml-2 flex shrink-0 items-center gap-2">
                      {kids.length > 0 && (
                        <svg className={`transition-transform ${isOpen ? "rotate-180" : ""}`} width={11} height={11} viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L1 3h10z" /></svg>
                      )}
                    </span>
                  </button>
                  {isOpen && kids.length > 0 && (
                    <div className="bg-slate-50/60 pb-1">
                      <button
                        type="button"
                        onClick={() => select(parent.slug)}
                        className="block w-full px-4 py-1.5 pl-7 text-left text-xs font-semibold text-sky-700 transition hover:bg-white"
                      >
                        View all in {parent.name} →
                      </button>
                      {groupList.map(([label, kids2]) => {
                        if (kids2.length === 1) {
                          const kid = kids2[0];
                          return (
                            <button
                              key={kid.id}
                              type="button"
                              onClick={() => select(kid.slug)}
                              className={`block w-full truncate px-4 py-1.5 pl-7 text-left text-[12px] transition hover:bg-white ${value === kid.slug ? "font-semibold text-sky-700" : "text-slate-600"}`}
                            >
                              {label}
                            </button>
                          );
                        }
                        const subKey = `${parent.id}:${label}`;
                        const subOpen = subExpanded === subKey || !!term;
                        return (
                          <div key={label}>
                            <button
                              type="button"
                              onClick={() => setSubExpanded((e) => (e === subKey ? null : subKey))}
                              className="flex w-full items-center justify-between px-4 py-1.5 pl-7 text-left text-[12px] font-semibold text-slate-700 transition hover:bg-white"
                            >
                              <span className="truncate">{label}</span>
                              <svg className={`ml-2 shrink-0 transition-transform ${subOpen ? "rotate-180" : ""}`} width={10} height={10} viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L1 3h10z" /></svg>
                            </button>
                            {subOpen && (
                              <div className="bg-white/70">
                                {kids2.map((kid) => {
                                  const suffix = kid.name.split("/").slice(1).join(" / ").trim() || kid.name;
                                  return (
                                    <button
                                      key={kid.id}
                                      type="button"
                                      onClick={() => select(kid.slug)}
                                      className={`block w-full truncate px-4 py-1.5 pl-11 text-left text-xs transition hover:bg-slate-50 ${value === kid.slug ? "font-semibold text-sky-700" : "text-slate-500"}`}
                                    >
                                      {suffix}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Location autocomplete ────────────────────────────────────────────────────

const TYPE_ICONS: Record<LocationSuggestion["type"], string> = {
  state: "🗺",
  suburb: "📍",
  region: "🗺",
  postcode: "🔢",
};

const TYPE_LABELS: Record<LocationSuggestion["type"], string> = {
  state: "State",
  suburb: "Suburb",
  region: "Region",
  postcode: "Postcode",
};

function LocationAutocomplete({
  selectedLocation,
  onSelect,
  onClear,
  onText,
  initialText,
  onEnter,
}: {
  selectedLocation: SelectedLocation;
  onSelect: (loc: LocationSuggestion) => void;
  onClear: () => void;
  onText?: (val: string) => void;
  initialText?: string;
  onEnter?: () => void;
}) {
  const [inputVal, setInputVal] = useState(initialText ?? "");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [fetching, setFetching] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleInput(val: string) {
    setInputVal(val);
    onText?.(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.length < 1) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setFetching(true);
      try {
        const res = await fetch(`/api/directory/location-suggest?q=${encodeURIComponent(val)}`);
        const data = await res.json();
        setSuggestions(data.suggestions ?? []);
        setOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setFetching(false);
      }
    }, 280);
  }

  function selectSuggestion(s: LocationSuggestion) {
    onSelect(s);
    setInputVal("");
    setSuggestions([]);
    setOpen(false);
  }

  if (selectedLocation) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-[0_2px_10px_rgba(15,37,64,0.10)]">
        <span className="shrink-0 text-sm">{TYPE_ICONS[selectedLocation.type]}</span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-sky-900">{selectedLocation.label}</span>
        <button
          onClick={onClear}
          className="shrink-0 rounded-lg px-2 py-0.5 text-xs font-bold text-sky-500 hover:bg-sky-100 hover:text-sky-700"
        >
          × Clear
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx={12} cy={9} r={2.5} />
      </svg>
      <input
        type="text"
        value={inputVal}
        onChange={(e) => handleInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); setOpen(false); onEnter?.(); } }}
        placeholder="Suburb, postcode or state…"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-base text-sky-800 placeholder:text-slate-400 shadow-[0_2px_10px_rgba(15,37,64,0.10)] focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
        autoComplete="off"
      />
      {fetching && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          Searching…
        </span>
      )}

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => selectSuggestion(s)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-sky-50 focus:bg-sky-50 focus:outline-none"
            >
              <span className="shrink-0 text-base">{TYPE_ICONS[s.type]}</span>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-sky-950">{s.label}</span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {TYPE_LABELS[s.type]}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {open && !fetching && suggestions.length === 0 && inputVal.length >= 2 && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
          <p className="text-sm text-slate-400">No locations found for &ldquo;{inputVal}&rdquo;</p>
        </div>
      )}
    </div>
  );
}

// ─── Search persistence (survive Back from a profile) ────────────────────────
// The directory keeps its search in local React state, and every "View Profile"
// link is a full-page navigation — so returning from a business profile would
// otherwise remount this component empty and drop the visitor's search. We
// snapshot the applied search to sessionStorage and restore it on mount, so the
// results, location, category and filters all come back. An explicit URL search
// (a shared/deep link) always wins over the snapshot.
const SEARCH_STORE_KEY = "rba:directory:search";

type SavedSearch = {
  qInput: string;
  q: string;
  locationText: string;
  appliedLocation: string;
  selectedLocation: SelectedLocation;
  coords: Coords;
  category: string;
  featured: boolean;
  radius: string;
  page: number;
  sortByDistance: boolean;
  aiText: string;
  aiLocation: string;
  aiResolvedLoc: LocationSuggestion | null;
  aiAppliedLocation: string;
  aiMatch: AiMatchResponse | null;
  showManual: boolean;
};

function readSavedSearch(): SavedSearch | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SEARCH_STORE_KEY);
    return raw ? (JSON.parse(raw) as SavedSearch) : null;
  } catch {
    return null;
  }
}

function writeSavedSearch(snapshot: SavedSearch) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SEARCH_STORE_KEY, JSON.stringify(snapshot));
  } catch {
    // storage full / unavailable — non-fatal, the search just won't persist.
  }
}

function clearSavedSearch() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(SEARCH_STORE_KEY);
  } catch {
    // ignore
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DirectoryListing({ categories }: Props) {
  // Support deep links like /directory?search=remedial+builder&location=sydney
  // (also accepts the legacy ?q= and ?category= params).
  const params = typeof window === "undefined" ? null : new URLSearchParams(window.location.search);
  const urlQ = params?.get("search") ?? params?.get("q") ?? "";
  const urlLocation = params?.get("location") ?? "";
  const urlCategory = params?.get("category") ?? "";
  const urlHasSearch = Boolean(urlQ || urlLocation || urlCategory);

  // When the URL carries no search of its own, restore the visitor's last search
  // ONLY if they actually navigated Back/Forward (e.g. returning from a company
  // profile). A fresh visit, a reload, or a typed/linked bare /directory must
  // start empty — otherwise the previous results linger even though the URL shows
  // no search. An explicit URL/deep-link always wins.
  const isBackForward =
    typeof performance !== "undefined" &&
    (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type ===
      "back_forward";
  const saved = urlHasSearch || !isBackForward ? null : readSavedSearch();

  const initialQ = urlQ || saved?.q || "";
  const initialLocation = urlLocation || saved?.appliedLocation || saved?.locationText || "";
  const initialCategory = urlCategory || saved?.category || "";

  // qInput = what the user is typing; q = applied to search (on Enter/button)
  const [qInput, setQInput] = useState(saved?.qInput ?? initialQ);
  const [q, setQ] = useState(initialQ);
  // Free-text location box (suburb / postcode / state / partial text).
  // locationText = what the user is typing; appliedLocation = applied on search.
  const [locationText, setLocationText] = useState(saved?.locationText ?? initialLocation);
  // On a cold deep-link load the location is a raw string with no coordinates.
  // We geocode it on mount (see the hydrate effect) and feed it through the same
  // path as an interactive pick — so appliedLocation starts empty and we hold the
  // search until geocoding resolves, rather than sending un-geocoded free text.
  // A restored snapshot already carries resolved coords/appliedLocation, so it
  // seeds these directly and skips the geocode step.
  const [appliedLocation, setAppliedLocation] = useState(saved?.appliedLocation ?? "");
  const [hydratingLocation, setHydratingLocation] = useState(Boolean(urlLocation));
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>(saved?.selectedLocation ?? null);
  const [coords, setCoords] = useState<Coords>(saved?.coords ?? null);
  const [category, setCategory] = useState(initialCategory);
  const [featured, setFeatured] = useState(saved?.featured ?? false);
  const [radius, setRadius] = useState(saved?.radius ?? "50"); // default: within 50 km (Silver membership reach)
  const [page, setPage] = useState(saved?.page ?? 1);
  const [showManual, setShowManual] = useState(saved?.showManual ?? false); // standard search hidden until toggled

  // The directory starts EMPTY — no listings until the visitor searches/filters.
  const [companies, setCompanies] = useState<CompanyResult[]>([]);
  const [topListings, setTopListings] = useState<TopListing[]>([]);
  const [topEligible, setTopEligible] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  // Start in the loading state when arriving via a deep link OR restoring a saved
  // search, so the empty "no results" message never flashes before the first
  // fetch resolves.
  const [loading, setLoading] = useState(
    Boolean(initialQ || initialCategory || urlLocation || saved?.appliedLocation || saved?.selectedLocation || saved?.featured)
  );
  const [isLocalFallback, setIsLocalFallback] = useState(false);

  // AI "describe your job" matcher state.
  const [aiText, setAiText] = useState(saved?.aiText ?? "");
  const [aiLocation, setAiLocation] = useState(saved?.aiLocation ?? "");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMatch, setAiMatch] = useState<AiMatchResponse | null>(saved?.aiMatch ?? null);
  const [aiError, setAiError] = useState("");
  const [aiAppliedLocation, setAiAppliedLocation] = useState(saved?.aiAppliedLocation ?? "");
  // When the typed/AI-extracted location is recognised as a real AU place, we
  // lock it into a confirmed "verified" pill (same idea as the main search box).
  const [aiResolvedLoc, setAiResolvedLoc] = useState<LocationSuggestion | null>(saved?.aiResolvedLoc ?? null);
  // AI "near me" search ranks results strictly nearest → furthest.
  const [sortByDistance, setSortByDistance] = useState(saved?.sortByDistance ?? false);

  const geocodeAbortRef = useRef<AbortController | null>(null);
  // Cancels the previous in-flight search when a newer one starts, so fast typing
  // / rapid filter changes don't stack requests or paint stale, out-of-order results.
  const searchAbortRef = useRef<AbortController | null>(null);

  // A search is "active" once the visitor has supplied a keyword, location,
  // category or filter. Until then we show the search prompt, not businesses.
  // This is derived (not stored), so the empty state needs no effect to reset it.
  const hasActiveSearch = Boolean(q || appliedLocation || selectedLocation || category || featured);
  const hasFilters = Boolean(q || qInput || appliedLocation || locationText || selectedLocation || category || featured);

  const fetchResults = useCallback(
    async (params: {
      q: string;
      appliedLocation: string;
      selectedLocation: SelectedLocation;
      coords: Coords;
      category: string;
      featured: boolean;
      radius: string;
      page: number;
      sortByDistance: boolean;
    }) => {
      setLoading(true);
      const sp = new URLSearchParams();
      if (params.q) sp.set("q", params.q);
      if (params.sortByDistance) sp.set("sort", "distance");

      if (params.coords) {
        // Coordinate-based ranking
        sp.set("lat", String(params.coords.lat));
        sp.set("lng", String(params.coords.lng));
        if (params.selectedLocation?.stateCode) {
          sp.set("locationState", params.selectedLocation.stateCode);
        }
        // Also pass suburb/postcode for exact-match bonus scoring
        if (params.selectedLocation?.suburb) sp.set("suburb", params.selectedLocation.suburb);
        if (params.selectedLocation?.postcode) sp.set("postcode", params.selectedLocation.postcode);
      } else if (params.selectedLocation) {
        // A suggestion was picked but has no coords — pass its parts (boosts ranking)
        const loc = params.selectedLocation;
        if (loc.type === "state") {
          sp.set("state", loc.stateCode);
        } else if (loc.type === "suburb" && loc.suburb) {
          sp.set("suburb", loc.suburb);
          sp.set("state", loc.stateCode);
        } else if (loc.type === "postcode" && loc.postcode) {
          sp.set("postcode", loc.postcode);
        }
      } else if (params.appliedLocation) {
        // Free-text location (suburb / postcode / state / partial) — server parses it.
        sp.set("location", params.appliedLocation);
      }

      if (params.category) sp.set("category", params.category);
      if (params.featured) sp.set("featured", "true");
      if (params.radius && params.radius !== "au") sp.set("radius", params.radius);
      sp.set("page", String(params.page));

      // Abort any search still in flight before firing this one.
      if (searchAbortRef.current) searchAbortRef.current.abort();
      const ctrl = new AbortController();
      searchAbortRef.current = ctrl;

      try {
        const res = await fetch(`/api/directory/search?${sp}`, { signal: ctrl.signal });
        const data = await res.json();
        setCompanies(data.companies ?? []);
        setTopListings(data.topListings ?? []);
        setTopEligible(data.topListingEligible ?? false);
        setTotal(data.total ?? 0);
        setTotalPages(data.totalPages ?? 1);
        setIsLocalFallback(data.isLocalFallback ?? false);
      } catch (err) {
        // A superseded request was aborted — ignore it and let the newer one win
        // (don't drop the loading state either; the newer search owns it now).
        if (err instanceof DOMException && err.name === "AbortError") return;
        // keep current results on other errors
      } finally {
        // Only the most recent request clears the loading state.
        if (searchAbortRef.current === ctrl) setLoading(false);
      }
    },
    []
  );

  // Single source of truth for running searches: whenever the applied search
  // inputs change, run the search. When nothing is set, hasActiveSearch is false
  // and the render shows the empty "search to begin" prompt — no reset needed.
  // Note: qInput is NOT watched — the keyword only applies on Enter / the Search
  // button (which updates `q`).
  useEffect(() => {
    if (!hasActiveSearch || hydratingLocation) return;
    fetchResults({ q, appliedLocation, selectedLocation, coords, category, featured, radius, page, sortByDistance });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, appliedLocation, selectedLocation, coords, category, featured, radius, page, sortByDistance, hydratingLocation]);

  // Deep-link hydration: when the page loads with a ?location= param, geocode it
  // once (same source as the interactive autocomplete) and feed the first match
  // through handleLocationSelect — giving the search real lat/lng/state, so a
  // shared/refreshed URL reproduces the interactive result. If geocoding fails we
  // drop the location and search nationwide rather than returning zero.
  useEffect(() => {
    // Only geocode a location that came from the URL. A restored snapshot already
    // carries resolved coords / free-text location, so it must not be re-geocoded.
    if (!urlLocation) return;
    let cancelled = false;
    // The URL may hold a formatted label like "Bondi, NSW 2026", but location-suggest
    // only matches the suburb name — so try the raw value, then the part before the
    // first comma, then a version with any trailing state/postcode stripped.
    const candidates = Array.from(new Set([
      urlLocation.trim(),
      urlLocation.split(",")[0].trim(),
      urlLocation.replace(/,?\s*\b[A-Za-z]{2,3}\b\s*\d{0,4}\s*$/i, "").trim(),
    ].filter(Boolean)));
    (async () => {
      let first: LocationSuggestion | null = null;
      for (const query of candidates) {
        try {
          const r = await fetch(`/api/directory/location-suggest?q=${encodeURIComponent(query)}`);
          const j = await r.json();
          if (cancelled) return;
          first = (j?.suggestions?.[0] as LocationSuggestion | undefined) ?? null;
        } catch { first = null; }
        if (first) break;
      }
      if (cancelled) return;
      if (first) {
        handleLocationSelect(first); // sets selectedLocation + coords (page 1)
      } else {
        // Unrecognised location → nationwide fallback (keeps any keyword search).
        setSelectedLocation(null);
        setCoords(null);
        setAppliedLocation("");
      }
      setHydratingLocation(false);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist the current search so it survives leaving the directory (e.g. opening
  // a profile and hitting Back). We snapshot while a search is active and clear it
  // once the visitor resets — so a fresh, unsearched visit stays empty. We hold off
  // while a deep-linked location is still geocoding, to avoid saving a half state.
  useEffect(() => {
    if (typeof window === "undefined" || hydratingLocation) return;
    if (hasActiveSearch) {
      writeSavedSearch({
        qInput, q, locationText, appliedLocation, selectedLocation, coords,
        category, featured, radius, page, sortByDistance,
        aiText, aiLocation, aiResolvedLoc, aiAppliedLocation, aiMatch, showManual,
      });
    } else {
      clearSavedSearch();
    }
  }, [
    qInput, q, locationText, appliedLocation, selectedLocation, coords,
    category, featured, radius, page, sortByDistance,
    aiText, aiLocation, aiResolvedLoc, aiAppliedLocation, aiMatch, showManual,
    hasActiveSearch, hydratingLocation,
  ]);

  // Reflect the current search in the URL so it can be shared / reloaded.
  function syncUrl(keyword: string, location: string) {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams();
    if (keyword) sp.set("search", keyword);
    if (location) sp.set("location", location);
    if (category) sp.set("category", category);
    const qs = sp.toString();
    window.history.replaceState({}, "", qs ? `/directory?${qs}` : "/directory");
  }

  function applySearch() {
    // Apply the typed keyword + free-text location. Reset to page 1 for a fresh query.
    setQ(qInput);
    setAppliedLocation(locationText);
    setSortByDistance(false); // manual search uses the default plan/relevance order
    setPage(1);
    syncUrl(qInput, locationText);
  }

  // ── AI "describe your job" matcher ───────────────────────────────────────────
  async function runAiMatch() {
    const desc = aiText.trim();
    if (desc.length < 1) {
      setAiError("Please describe the work in a bit more detail.");
      return;
    }
    setAiError("");
    setAiLoading(true);
    setAiMatch(null);
    try {
      const res = await fetch("/api/ai-category-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: desc }),
      });
      const data = (await res.json()) as AiMatchResponse & { error?: string };
      if (!res.ok) {
        setAiError(data?.error ?? "Couldn't match that — try rephrasing or use the search box below.");
        return;
      }
      setAiMatch(data);
      // Location the owner typed, else any location the AI found in the text.
      const rawLoc = aiLocation.trim() || (data.location ?? "").trim();
      // Confirm it against the real AU place list (same source the main search
      // box autocompletes from). A hit becomes a "verified" locked-in pill and
      // gives precise coordinates for nearest-first ranking.
      let resolved: LocationSuggestion | null = null;
      if (rawLoc) {
        try {
          const lr = await fetch(`/api/directory/location-suggest?q=${encodeURIComponent(rawLoc)}`);
          const lj = await lr.json();
          resolved = (lj?.suggestions?.[0] as LocationSuggestion) ?? null;
        } catch { resolved = null; }
      }
      if (data.matched) {
        applyAiSearch(data.matched.name, rawLoc, resolved);
      } else {
        // No trade category — the query is probably a BUSINESS NAME (e.g. "Oxo Pty
        // Ltd"). Fall back to a name/keyword lookup so it still surfaces the listing
        // instead of dead-ending. Only show the "couldn't pin" hint if that finds
        // nothing either.
        // Mirror the exact location params the real search will send (see
        // fetchResults). A resolved suggestion carries coords/suburb/state — passing
        // its full LABEL as free-text `location` doesn't parse server-side and yields
        // a false "no results". Unresolved free text (e.g. "sydney") is parsed fine.
        const sp = new URLSearchParams({ search: desc });
        if (resolved) {
          if (resolved.lat != null && resolved.lng != null) {
            sp.set("lat", String(resolved.lat));
            sp.set("lng", String(resolved.lng));
            if (resolved.stateCode) sp.set("locationState", resolved.stateCode);
          } else if (resolved.type === "state") {
            sp.set("state", resolved.stateCode);
          }
          if (resolved.suburb) sp.set("suburb", resolved.suburb);
          if (resolved.postcode) sp.set("postcode", resolved.postcode);
        } else if (rawLoc) {
          sp.set("location", rawLoc);
        }
        let hasHit = false;
        try {
          const kr = await fetch(`/api/directory/search?${sp}`);
          const kj = await kr.json();
          hasHit = (kj?.total ?? 0) > 0;
        } catch { hasHit = false; }
        if (hasHit) {
          applyAiSearch(desc, rawLoc, resolved);
        } else {
          setAiError("We couldn't pin a category or find a business by that name. Try describing the work differently, or search by keyword below.");
        }
      }
    } catch {
      setAiError("Network error. Please try again.");
    } finally {
      setAiLoading(false);
    }
  }

  // Apply an AI result as a KEYWORD search (NOT a hard category filter). The
  // matched category name is fed into the directory's synonym/intent engine,
  // which matches across business names, descriptions and every related (and
  // duplicated) category — so we never dead-end on an empty parent-category
  // slug. A recognised location is locked in (precise ranking); otherwise the
  // free text is sent for the server to resolve.
  function applyAiSearch(term: string, locText: string, resolved: LocationSuggestion | null) {
    const keyword = term.trim();
    setCategory(""); // recall via the keyword engine, not a brittle slug filter
    setQInput(keyword);
    setQ(keyword);
    // AI "near me" search → rank strictly nearest-first when we have a location.
    setSortByDistance(Boolean(resolved || locText.trim()));

    if (resolved) {
      // Precise, confirmed location — same path as picking a main-box suggestion.
      setAiResolvedLoc(resolved);
      setAiLocation(resolved.suburb || resolved.label);
      setAiAppliedLocation(resolved.label);
      handleLocationSelect(resolved); // sets selectedLocation, geocodes, page 1
    } else {
      const location = locText.trim();
      setAiResolvedLoc(null);
      setSelectedLocation(null);
      setCoords(null);
      setLocationText(location);
      setAppliedLocation(location);
      setAiAppliedLocation(location);
      setPage(1);
    }

    // A located AI search shouldn't be culled by the tight 10 km default — the
    // state filter already scopes results; rank the whole state nearest-first.
    if ((resolved || locText.trim()) && radius === "10") setRadius("250");

    if (typeof window !== "undefined") {
      const sp = new URLSearchParams();
      if (keyword) sp.set("search", keyword);
      const locForUrl = resolved ? resolved.label : locText.trim();
      if (locForUrl) sp.set("location", locForUrl);
      window.history.replaceState({}, "", sp.toString() ? `/directory?${sp.toString()}` : "/directory");
    }
  }

  // Clear the confirmed AI location pill and drop the location from the search.
  function clearAiLocation() {
    setAiResolvedLoc(null);
    setAiLocation("");
    setAiAppliedLocation("");
    handleLocationClear();
  }

  function handleLocationSelect(loc: LocationSuggestion) {
    setSelectedLocation(loc);
    // A precise suggestion supersedes any free-text location.
    setLocationText("");
    setAppliedLocation("");
    setPage(1);
    setIsLocalFallback(false);

    if (loc.type === "state") {
      // State selection — no coords needed; the effect runs a state-filtered search.
      setCoords(null);
      return;
    }

    // Suburb or postcode — resolve coordinates for nearest-first ranking.
    if (loc.lat != null && loc.lng != null) {
      setCoords({ lat: loc.lat, lng: loc.lng }); // effect runs with coords
      return;
    }

    // No coords on the suggestion — the effect will first run a state-level
    // search, then we geocode via Nominatim and refine with coordinates.
    setCoords(null);
    if (geocodeAbortRef.current) geocodeAbortRef.current.abort();
    const ctrl = new AbortController();
    geocodeAbortRef.current = ctrl;
    const query = loc.suburb ? `${loc.suburb} ${loc.stateCode}` : `${loc.postcode ?? ""} ${loc.stateCode}`;
    fetch(`/api/directory/geocode?q=${encodeURIComponent(query)}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((data) => {
        if (data?.lat && data?.lng) setCoords({ lat: data.lat, lng: data.lng });
      })
      .catch(() => {
        // Aborted or failed — the state-level results already shown remain.
      });
  }

  function handleLocationClear() {
    // Clearing location updates state; the effect re-runs (or resets to empty).
    setSelectedLocation(null);
    setCoords(null);
    setLocationText("");
    setAppliedLocation("");
    setIsLocalFallback(false);
    setPage(1);
  }

  function clearFilters() {
    // Resetting every input makes hasActiveSearch false → effect shows the prompt.
    setQInput("");
    setQ("");
    setLocationText("");
    setAppliedLocation("");
    setSelectedLocation(null);
    setCoords(null);
    setCategory("");
    setFeatured(false);
    setPage(1);
    setIsLocalFallback(false);
    setAiText("");
    setAiLocation("");
    setAiAppliedLocation("");
    setAiResolvedLoc(null);
    setSortByDistance(false);
    setAiMatch(null);
    setAiError("");
    if (typeof window !== "undefined") window.history.replaceState({}, "", "/directory");
  }

  return (
    <>
      {/* Confirm popup for phone / email / website taps (mounted once) */}
      <ContactConfirmModal />
      {/* ── Search + filters ─────────────────────────────────────────────── */}
      <div className="relative z-30 bg-white shadow-[0_8px_24px_rgba(15,37,64,0.12)]">
        <div className="mx-auto max-w-7xl px-6 py-5">
          {/* ── AI box — advanced gradient "describe your job" assistant ── */}
          <div
            className="relative overflow-visible rounded-3xl border-[1.5px] border-sky-400 p-[18px]"
            style={{
              background: "linear-gradient(135deg,#e0f2fe 0%,#dbeafe 30%,#cfe0ff 60%,#bfdbfe 100%)",
              boxShadow: "0 12px 30px rgba(15,23,42,0.18),0 4px 10px rgba(15,23,42,0.10)",
            }}
          >
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white shadow ring-1 ring-white/40"
              style={{ background: "linear-gradient(90deg,#06b6d4,#2563eb)" }}
            >
              <span aria-hidden>✨</span> AI Assistant
            </span>

            <h2 className="mt-2.5 text-xl font-extrabold leading-tight sm:text-2xl" style={{ color: "#0f2748" }}>
              Not Sure Who You Need? Describe The Job.
            </h2>
            <p className="mt-0.5 text-sm" style={{ color: "#334155" }}>
              Tell us the problem in plain English — our AI finds the right trade and the closest businesses.
            </p>

            {/* Big description input */}
            <input
              type="text"
              value={aiText}
              onChange={(e) => setAiText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") runAiMatch(); }}
              placeholder="e.g. water leaking through my balcony onto the unit below"
              className="mt-3 w-full rounded-xl border-0 bg-white py-3 px-4 text-base text-slate-800 placeholder:text-slate-400 shadow focus:outline-none focus:ring-4 focus:ring-cyan-200/70"
            />

            {/* Control row — location · AI match (after search) · Find · Clear all */}
            <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              {aiResolvedLoc ? (
                // Verified / locked-in location chip — the system recognised the place.
                <div className="flex h-11 items-center gap-2 rounded-xl bg-white px-3.5 shadow-sm">
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white" aria-hidden>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">{aiResolvedLoc.label}</span>
                  <button
                    type="button"
                    onClick={clearAiLocation}
                    aria-label="Clear location"
                    className="shrink-0 rounded px-0.5 text-xs font-bold text-slate-400 transition hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  value={aiLocation}
                  onChange={(e) => setAiLocation(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") runAiMatch(); }}
                  placeholder="Your suburb or postcode"
                  aria-label="Your suburb or postcode"
                  className="h-11 w-full rounded-xl border-0 bg-white px-3.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-cyan-200/70 sm:w-52"
                />
              )}

              {/* Find the right people (stretches to fill the gap) */}
              <button
                type="button"
                onClick={runAiMatch}
                disabled={aiLoading}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-red-700 px-6 text-base font-bold tracking-tight text-white shadow-md transition hover:bg-red-800 disabled:opacity-60 sm:w-auto sm:flex-1"
              >
                {aiLoading ? "Finding…" : "Find the right people"}
              </button>

              {/* Clear all */}
              <button
                type="button"
                onClick={clearFilters}
                className="flex h-11 w-full shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/50 px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-white sm:w-auto"
              >
                Clear all
              </button>
            </div>

            {/* AI status / match — on its own row so it never reflows the control
                row above (that reflow was causing clicks to land on the wrong
                control right after a match resolved). While matching, an explicit
                status shows instead of the page appearing frozen. */}
            {aiLoading && (
              <div className="mt-2.5 flex items-center gap-2.5 rounded-xl bg-white/60 px-3.5 py-2.5 text-sm font-semibold text-slate-600 ring-1 ring-white/80 backdrop-blur">
                <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" aria-hidden />
                Matching your job to the right trade…
              </div>
            )}
            {!aiLoading && aiMatch?.matched && (() => {
              const matched = aiMatch.matched;
              // Every category the user can pick — the best match first, then the
              // alternates. The one that's actually applied is highlighted, so the
              // dropdown always shows which category the current results are for.
              const options = [matched, ...aiMatch.alternates];
              const applied = q.trim().toLowerCase();
              const active = options.find((o) => o.name.trim().toLowerCase() === applied) ?? matched;
              const activeIsBest = active.id === matched.id;
              return (
                <div className="mt-2.5 flex min-h-11 items-center gap-2 rounded-xl bg-white/60 px-3 py-1.5 ring-1 ring-white/80 backdrop-blur">
                  <span className="text-xs font-semibold text-slate-500">AI match:</span>
                  {aiMatch.alternates.length > 0 ? (
                    <details className="relative">
                      <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-cyan-200 transition hover:ring-cyan-400">
                        {active.name}
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                          {activeIsBest ? "Best" : "Selected"}
                        </span>
                        <span className="text-slate-400">▾</span>
                      </summary>
                      <div className="absolute left-0 top-full z-30 mt-1 min-w-[210px] rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                        <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Choose category</p>
                        {options.map((o) => {
                          const isActive = o.id === active.id;
                          const isBest = o.id === matched.id;
                          return (
                            <button
                              key={o.id}
                              type="button"
                              onClick={(e) => {
                                applyAiSearch(o.name, aiResolvedLoc ? aiResolvedLoc.label : aiAppliedLocation, aiResolvedLoc);
                                // Close the native <details> after a pick.
                                (e.currentTarget.closest("details") as HTMLDetailsElement | null)?.removeAttribute("open");
                              }}
                              aria-current={isActive}
                              className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium transition ${
                                isActive
                                  ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-300"
                                  : "text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              <span className="flex min-w-0 items-center gap-1.5">
                                <span className="truncate">{o.name}</span>
                                {isBest && (
                                  <span className="shrink-0 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">Best</span>
                                )}
                              </span>
                              {isActive && (
                                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white" aria-hidden>
                                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </details>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-cyan-200">
                      {matched.name}
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">Best</span>
                    </span>
                  )}
                </div>
              );
            })()}
            {aiError && <p className="mt-2 text-sm font-semibold text-red-700">{aiError}</p>}
          </div>

          {/* Toggle: reveal the standard search on demand */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setShowManual((v) => !v)}
              aria-expanded={showManual}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-sky-800"
            >
              {showManual ? "Hide standard search" : "Prefer to search yourself? Use the standard search"}
              <span aria-hidden className={`text-slate-400 transition-transform ${showManual ? "rotate-180" : ""}`}>▾</span>
            </button>
          </div>

          {/* ── Standard (manual) search box — hidden until toggled ── */}
          {showManual && (
          <div className="mt-4 rounded-3xl border-2 border-[#0f2f5f] p-4" style={{ background: "#cdd7e7" }}>
          {/* Controls — keyword + location + Search + Clear all, all on one line */}
          <div className="relative z-10 flex flex-wrap items-center gap-3">
            {/* Keyword */}
            <div className="relative w-full sm:flex-[1.7]">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden
              >
                <circle cx={11} cy={11} r={8} />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={qInput}
                onChange={(e) => setQInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") applySearch(); }}
                placeholder="Company, service or defect type…"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-base text-sky-800 placeholder:text-slate-400 shadow-[0_2px_10px_rgba(15,37,64,0.10)] focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>

            {/* Location */}
            <div className="w-full sm:flex-1">
              <LocationAutocomplete
                selectedLocation={selectedLocation}
                onSelect={handleLocationSelect}
                onClear={handleLocationClear}
                onText={setLocationText}
                initialText={initialLocation}
                onEnter={applySearch}
              />
            </div>

            {/* Radius */}
            <select
              value={radius}
              onChange={(e) => { setRadius(e.target.value); setPage(1); }}
              aria-label="Search radius"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 focus:border-sky-500 focus:outline-none sm:w-auto"
            >
              <option value="10">Within 10 km</option>
              <option value="25">Within 25 km</option>
              <option value="50">Within 50 km</option>
              <option value="100">Within 100 km</option>
              <option value="250">Within 250 km</option>
              <option value="500">Within 500 km</option>
            </select>

            {/* Search button */}
            <button
              type="button"
              onClick={applySearch}
              className="rounded-xl bg-sky-950 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-800"
            >
              Search
            </button>

            {/* Clear all */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
              >
                Clear all
              </button>
            )}
          </div>
          {/* Browse by category — parent group -> subcategory (sets the existing category filter) */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-sky-900/70">Browse by category</span>
            <CategorySelector
              categories={categories}
              value={category}
              onChange={(slug) => { setCategory(slug); setPage(1); }}
            />
          </div>

          </div>
          )}

          {/* Client quote-request entry point — always visible */}
          <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center">
            <p className="text-sm text-sky-950">
              <span className="font-bold">Strata manager, owners corporation or building owner?</span>{" "}
              Request quotes for building works from listed businesses.
            </p>
            <Link
              href="/directory/login"
              className="shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 sm:whitespace-nowrap"
            >
              Request Quotes →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Results meta bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-600">
              {loading || aiLoading
                ? "Searching…"
                : !hasActiveSearch
                ? "Search to find strata building specialists"
                : `${total} ${total === 1 ? "business" : "businesses"} found`}
              {selectedLocation && hasActiveSearch && !loading && total > 0 && (
                <span className="ml-1 font-normal text-slate-400">near {selectedLocation.label.split(",")[0]}</span>
              )}
            </p>
            {isLocalFallback && !loading && selectedLocation && (
              <p className="mt-1 text-xs text-amber-700">
                No local businesses found. Showing relevant businesses that service your area.
              </p>
            )}
            {hasActiveSearch && !loading && (
              <p className="mt-1 text-xs text-slate-400">
                Businesses are ranked by membership level, category relevance and distance from your project.
              </p>
            )}
          </div>
          <Link
            href="/directory/login"
            className="rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            List your business →
          </Link>
        </div>

        {/* Claim banner */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-sky-200 bg-sky-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-sky-950">Own a business listed here?</p>
            <p className="mt-0.5 text-sm text-slate-600">
              Claim your profile to manage your details, showcase your expertise and receive enquiries from potential clients.
            </p>
          </div>
          <Link
            href="/directory/login"
            className="shrink-0 rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 sm:whitespace-nowrap"
          >
            Claim Your Profile
          </Link>
        </div>

        {/* Top Listing section — real Premium subscribers for this category (max 3) */}
        {!(loading || aiLoading) && <TopListingSection items={topListings} eligible={topEligible} />}

        {/* Results list */}
        {loading || aiLoading ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : !hasActiveSearch ? (
          /* Empty default state — prompt the visitor to search */
          <div className="rounded-2xl border border-slate-200 bg-white px-10 py-20 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
              <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <circle cx={11} cy={11} r={8} />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <p className="text-lg font-bold text-sky-950">Find a strata building specialist</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Search by service, trade, occupation, suburb or postcode to find relevant businesses.
            </p>
          </div>
        ) : companies.length === 0 ? (
          /* Searched, but nothing matched */
          <div className="rounded-2xl border border-slate-200 bg-white px-10 py-20 text-center shadow-sm">
            <p className="text-lg font-bold text-sky-950">No matching businesses found</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Try waterproofing, remedial builder, engineer, concrete repair, roofing, or strata manager.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {["waterproofing", "remedial builder", "engineer", "concrete repair", "roofing", "strata manager"].map((s) => (
                <button
                  key={s}
                  onClick={() => { setQInput(s); setQ(s); setPage(1); syncUrl(s, appliedLocation); }}
                  className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                >
                  {s}
                </button>
              ))}
            </div>
            {hasFilters && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={clearFilters}
                  className="rounded-xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              {(() => {
                // Gold is shown in the Top Listing section above — keep it out of
                // the main list so it isn't duplicated as a plain row.
                const listed = companies.filter((c) => dirTier(planOf(c)) !== "gold");
                const hasSilver = listed.some((c) => dirTier(planOf(c)) === "silver");
                return (
                  <>
                    {page === 1 && !hasSilver && <SilverSampleCard />}
                    {listed.map((company) => (
                      <CompanyRow key={company.id} company={company} />
                    ))}
                  </>
                );
              })()}
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={20}
              onPage={setPage}
            />
          </>
        )}
      </div>
    </>
  );
}
