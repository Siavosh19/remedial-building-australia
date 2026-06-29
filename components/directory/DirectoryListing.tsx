"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { dirTier, TIER } from "@/lib/directory-tier";

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
  phone: string | null;
  plan_type?: string;
  profile_status: string;
  confidence_score: number;
  is_featured: boolean;
  is_claimed: boolean;
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

function DistanceBadge({ distanceKm }: { distanceKm: number }) {
  const label =
    distanceKm < 1
      ? "< 1 km"
      : distanceKm < 10
      ? `${distanceKm.toFixed(1)} km`
      : `${Math.round(distanceKm)} km`;
  return (
    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
      {label} away
    </span>
  );
}

function CompanyRow({ company }: { company: CompanyResult }) {
  const location = company.locations[0];
  const locationParts = [location?.suburb, location?.state].filter(Boolean);
  const planType = company.plan_type ?? (company.is_featured ? "featured" : company.is_claimed ? "claimed" : "basic");
  const tier = dirTier(planType);
  const isBiz = tier === "silver";
  const isPrem = tier === "gold";
  const isPaid = isBiz || isPrem;
  const abbr = initials(company.name);
  const tags = company.company_tags ?? [];

  // ── Per-tier card chrome ──────────────────────────────────────────────────
  const wrapStyle = isPrem
    ? { borderColor: TIER.gold, borderWidth: "2.5px", backgroundColor: "#FFFDF5", boxShadow: `inset 5px 0 0 0 ${TIER.gold}, 0 4px 20px rgba(201,168,76,0.25)` }
    : isBiz
    ? { borderColor: TIER.business, borderWidth: "2px", backgroundColor: "#FAFAF8", boxShadow: `inset 4px 0 0 0 ${TIER.business}` }
    : undefined;
  const avatarStyle = isPrem
    ? { backgroundColor: "#fff", border: `2px solid ${TIER.gold}` }
    : isBiz
    ? { backgroundColor: "#fff", border: `2px solid ${TIER.business}` }
    : undefined;

  return (
    <div
      className={`relative px-6 py-5 transition-colors ${
        isPaid
          ? "rounded-2xl border mx-3 my-2.5"
          : "border-b border-slate-200 bg-white last:border-0 hover:bg-slate-50/70"
      }`}
      style={wrapStyle}
    >
      {/* Tier badge — top-right */}
      {isPaid && (
        <span
          className="absolute right-3 top-3 rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide"
          style={
            isPrem
              ? { backgroundColor: TIER.gold, color: "#1A1A1A", boxShadow: "0 2px 8px rgba(201,168,76,0.4)" }
              : { backgroundColor: TIER.business, color: "#fff" }
          }
        >
          {isPrem ? `⭐ Featured in ${location?.state ?? "your State"}` : "Silver"}
        </span>
      )}

      {/* Top row: logo + key info + action buttons */}
      <div className="flex gap-4">
        {/* Logo / initials */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold overflow-hidden ${
            isPaid ? "text-slate-700" : "bg-sky-100 text-sky-800"
          }`}
          style={avatarStyle}
        >
          {company.logo_url
            ? <img src={company.logo_url} alt={`${company.name} logo`} className="h-full w-full object-cover" />
            : abbr || "?"}
        </div>

        {/* Key info — desktop layout (beside the logo); mobile shows it full-width below */}
        <div className="hidden min-w-0 flex-1 md:block">
          {/* Badges */}
          <div className="mb-1 flex flex-wrap items-center gap-1.5">
            {company.main_category && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${isPrem ? "" : "bg-sky-100 text-sky-800"}`}
                style={isPrem ? { border: `1px solid ${TIER.gold}`, color: TIER.goldText, backgroundColor: TIER.goldBg } : undefined}
              >
                {company.main_category.name.split("/")[0].trim()}
              </span>
            )}
            {company.distance_km != null && <DistanceBadge distanceKm={company.distance_km} />}
          </div>

          {/* Name */}
          <h3 className="text-base font-bold leading-tight text-sky-950">{company.name}</h3>

          {/* Ranking note (paid tiers) */}
          {isPaid && (
            <p className="mt-0.5 text-[11px] italic" style={{ color: isPrem ? TIER.gold : TIER.businessLight }}>
              {isPrem ? "★ Featured in your State for this category" : "Receives quote requests · ranks above free listings"}
            </p>
          )}

          {/* Location */}
          {locationParts.length > 0 && (
            <p className="mt-0.5 text-xs text-slate-500">{locationParts.join(", ")}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="ml-auto flex shrink-0 flex-col items-end gap-2 pl-2 md:ml-0">
          <a
            href={`/directory/company/${company.slug}`}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition ${isPaid ? "" : "bg-sky-950 text-white hover:bg-sky-800"}`}
            style={
              isPrem
                ? { backgroundColor: TIER.business, border: `1.5px solid ${TIER.gold}`, color: TIER.gold }
                : isBiz
                ? { backgroundColor: TIER.business, color: "#fff" }
                : undefined
            }
          >
            View Profile →
          </a>
          {isPaid ? (
            /* Request Quote — Silver & Gold only */
            <a
              href={`/directory/company/${company.slug}`}
              className="whitespace-nowrap rounded-xl border bg-white px-4 py-2 text-xs font-semibold transition hover:bg-slate-50"
              style={
                isPrem
                  ? { borderColor: TIER.gold, color: TIER.goldText }
                  : { borderColor: TIER.silver, color: TIER.silverText }
              }
            >
              Request Quote
            </a>
          ) : !company.is_claimed ? (
            /* Unclaimed Free listing — encourage the owner to claim it */
            <a
              href={`/directory/claim/${company.slug}`}
              className="whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Claim this profile →
            </a>
          ) : null}
        </div>
      </div>

      {/* Mobile: company name under the logo, stretched full width, category in parentheses */}
      <div className="mt-3 md:hidden">
        <h3 className="text-base font-bold leading-tight text-sky-950">
          {company.name}
          {company.main_category && (
            <span className="align-middle text-xs font-normal text-slate-500"> ({company.main_category.name.split("/")[0].trim()})</span>
          )}
        </h3>
        {isPaid && (
          <p className="mt-0.5 text-[11px] italic" style={{ color: isPrem ? TIER.gold : TIER.businessLight }}>
            {isPrem ? "★ Featured in your State for this category" : "Receives quote requests · ranks above free listings"}
          </p>
        )}
        {locationParts.length > 0 && (
          <p className="mt-0.5 text-xs text-slate-500">{locationParts.join(", ")}</p>
        )}
      </div>

      {/* Description + tags — full width below */}
      {company.description && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">{company.description}</p>
      )}
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.slice(0, 5).map((t) => (
            <span key={t.tag.name} className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-600">
              {t.tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

type TopListing = {
  id: number;
  slug: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  main_category: { name: string } | null;
  locations: { suburb: string | null; state: string }[];
  distance_km: number | null;
};

// "Top Listing" section — real Premium subscribers for the searched category,
// ordered by subscription date, max 3. Renders nothing when empty.
function TopListingSection({ items, eligible }: { items: TopListing[]; eligible: boolean }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [minH, setMinH] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (!items.length) { setMinH(undefined); return; }
    const tallest = Math.max(0, ...refs.current.map((el) => el?.offsetHeight ?? 0));
    if (tallest > 0) setMinH(tallest);
  }, [items]);

  // Zero state — the category was searched but nobody has subscribed: one promo
  // card inviting businesses to claim the spot. No T&C line, never beside real cards.
  if (!items.length) {
    if (!eligible) return null;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 28 }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -50%)", background: "linear-gradient(135deg, #b8963e, #d4b44a, #c8922a)", color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", padding: "6px 18px", borderRadius: 20, boxShadow: "0 4px 14px rgba(184,150,62,0.45)", whiteSpace: "nowrap", zIndex: 10 }}>
            ⭐ Gold Featured
          </div>
          <div className="overflow-hidden rounded-[20px] border border-[#e8edf2] bg-white transition-all duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,0.13)]">
            <div style={{ height: 5, background: "linear-gradient(90deg, #1e3a5f, #2d6a9f)" }} />
            <div className="rba-top-pad" style={{ padding: "20px 28px 24px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                <div style={{ minWidth: 0 }}>
                  <span style={{ display: "inline-block", background: "#e8f0fb", color: "#1e3a5f", borderRadius: 20, padding: "3px 11px", fontSize: 11, fontWeight: 700 }}>GOLD FEATURED — AVAILABLE</span>
                  <h3 style={{ fontSize: 19, fontWeight: 800, color: "#0f1f35", margin: "8px 0 0 0" }}>Be Featured in Your State</h3>
                </div>
                <a href="/directory/signup" style={{ background: "#1e3a5f", color: "#fff", borderRadius: 10, padding: "10px 22px", fontSize: 12, fontWeight: 700, boxShadow: "0 3px 10px rgba(30,58,95,0.22)", textDecoration: "none", whiteSpace: "nowrap" }}>
                  Get This Spot →
                </a>
              </div>
              <p style={{ fontSize: 13, color: "#1a1a1a", fontWeight: 500, lineHeight: 1.6, margin: "10px 0 0" }}>
                Be one of only three Gold Featured businesses for this category in your State. Gold Featured placement puts you above all Silver and Free listings — ahead of 12,000+ businesses on the directory. Limited to 3 per category in each State/Territory.
              </p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 640px) {
            .rba-top-pad { padding: 14px 16px 16px 16px !important; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="rba-top-list" style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 28 }}>
      {items.map((b, i) => {
        const loc = b.locations[0];
        const locText = [loc?.suburb, loc?.state].filter(Boolean).join(", ");
        return (
          <div key={b.id} style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -50%)", background: "linear-gradient(135deg, #b8963e, #d4b44a, #c8922a)", color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", padding: "6px 18px", borderRadius: 20, boxShadow: "0 4px 14px rgba(184,150,62,0.45)", whiteSpace: "nowrap", zIndex: 10 }}>
              {`⭐ Featured in ${loc?.state ?? "your State"}`}
            </div>
            <div
              ref={(el) => { refs.current[i] = el; }}
              style={{ minHeight: minH }}
              className="overflow-hidden rounded-[20px] border border-[#e8edf2] bg-white transition-all duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,0.13)]"
            >
              <div className="rba-top-stripe" style={{ height: 5, background: "linear-gradient(90deg, #1e3a5f, #2d6a9f)" }} />
              <div className="rba-top-pad" style={{ padding: "20px 28px 24px 28px" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div className="rba-top-logo" style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 12, background: "#e8f0fb", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {b.logo_url
                      ? <img src={b.logo_url} alt={`${b.name} logo`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span style={{ fontSize: 14, fontWeight: 900, color: "#1e3a5f" }}>{initials(b.name)}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                      {b.main_category && <span style={{ background: "#e8f0fb", color: "#1e3a5f", borderRadius: 20, padding: "3px 11px", fontSize: 11, fontWeight: 700 }}>{b.main_category.name.split("/")[0].trim()}</span>}
                      {b.distance_km != null && <span style={{ background: "#f5f7fa", color: "#000000", borderRadius: 20, padding: "3px 11px", fontSize: 11, fontWeight: 600 }}>{b.distance_km < 1 ? "< 1 km away" : `${b.distance_km} km away`}</span>}
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f1f35", lineHeight: 1.25, margin: 0 }}>{b.name}</h3>
                    {locText && <p style={{ fontSize: 12, color: "#1a1a1a", fontWeight: 500, margin: "4px 0 0" }}>{locText}</p>}
                  </div>
                  <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                    <a href={`/directory/company/${b.slug}`} style={{ background: "#1e3a5f", color: "#fff", borderRadius: 10, padding: "10px 22px", fontSize: 12, fontWeight: 700, boxShadow: "0 3px 10px rgba(30,58,95,0.22)", textDecoration: "none", whiteSpace: "nowrap" }}>
                      View Profile →
                    </a>
                  </div>
                </div>
                {b.description && <p style={{ fontSize: 13, color: "#1a1a1a", fontWeight: 500, lineHeight: 1.6, margin: "10px 0 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{b.description}</p>}
              </div>
            </div>
          </div>
        );
      })}
      <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
        Gold Featured placements are filled in order of subscription date — first to subscribe secures position #1, second secures #2, third secures #3. A maximum of 3 positions are available per category in each State/Territory. Gold Featured businesses appear above all Silver and Free listings for their chosen category in their State. No other business will occupy these positions while a subscription is active. Positions are held for the duration of the active subscription.{" "}
        <a href="/terms" style={{ color: "#64748b", textDecoration: "underline" }}>Terms &amp; Conditions</a>
      </p>
      <style>{`
        @media (max-width: 640px) {
          .rba-top-list { gap: 14px !important; }
          .rba-top-pad { padding: 14px 16px 16px 16px !important; }
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
  const ref = useRef<HTMLDivElement>(null);

  const parents = categories
    .filter((c) => !c.parent_id)
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredParents = search.trim()
    ? parents.filter((p) => p.name.toLowerCase().includes(search.toLowerCase().trim()))
    : parents;

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
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-semibold transition hover:bg-slate-50 ${!value ? "text-sky-700" : "text-slate-700"}`}
            >
              <span>All Categories</span>
              <span className="text-xs font-medium text-slate-400">{parents.length}</span>
            </button>

            {filteredParents.length === 0 && (
              <p className="px-4 py-3 text-sm text-slate-400">No categories found</p>
            )}

            {filteredParents.map((parent) => (
              <button
                key={parent.id}
                type="button"
                onClick={() => select(parent.slug)}
                className={`w-full px-4 py-2 text-left text-sm font-semibold transition hover:bg-slate-50 ${
                  value === parent.slug ? "text-sky-700" : "text-slate-800"
                }`}
              >
                {parent.name}
              </button>
            ))}
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function DirectoryListing({ categories }: Props) {
  // Support deep links like /directory?search=remedial+builder&location=sydney
  // (also accepts the legacy ?q= and ?category= params).
  const params = typeof window === "undefined" ? null : new URLSearchParams(window.location.search);
  const initialQ = params?.get("search") ?? params?.get("q") ?? "";
  const initialLocation = params?.get("location") ?? "";
  const initialCategory = params?.get("category") ?? "";

  // qInput = what the user is typing; q = applied to search (on Enter/button)
  const [qInput, setQInput] = useState(initialQ);
  const [q, setQ] = useState(initialQ);
  // Free-text location box (suburb / postcode / state / partial text).
  // locationText = what the user is typing; appliedLocation = applied on search.
  const [locationText, setLocationText] = useState(initialLocation);
  const [appliedLocation, setAppliedLocation] = useState(initialLocation);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>(null);
  const [coords, setCoords] = useState<Coords>(null);
  const [category, setCategory] = useState(initialCategory);
  const [featured, setFeatured] = useState(false);
  const [radius, setRadius] = useState("au"); // "au" = Australia-wide
  const [page, setPage] = useState(1);

  // The directory starts EMPTY — no listings until the visitor searches/filters.
  const [companies, setCompanies] = useState<CompanyResult[]>([]);
  const [topListings, setTopListings] = useState<TopListing[]>([]);
  const [topEligible, setTopEligible] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  // Start in the loading state when arriving via a deep link, so the empty
  // "no results" message never flashes before the first fetch resolves.
  const [loading, setLoading] = useState(Boolean(initialQ || initialCategory || initialLocation));
  const [isLocalFallback, setIsLocalFallback] = useState(false);

  const geocodeAbortRef = useRef<AbortController | null>(null);

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
    }) => {
      setLoading(true);
      const sp = new URLSearchParams();
      if (params.q) sp.set("q", params.q);

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

      try {
        const res = await fetch(`/api/directory/search?${sp}`);
        const data = await res.json();
        setCompanies(data.companies ?? []);
        setTopListings(data.topListings ?? []);
        setTopEligible(data.topListingEligible ?? false);
        setTotal(data.total ?? 0);
        setTotalPages(data.totalPages ?? 1);
        setIsLocalFallback(data.isLocalFallback ?? false);
      } catch {
        // keep current results on error
      } finally {
        setLoading(false);
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
    if (!hasActiveSearch) return;
    fetchResults({ q, appliedLocation, selectedLocation, coords, category, featured, radius, page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, appliedLocation, selectedLocation, coords, category, featured, radius, page]);

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
    setPage(1);
    syncUrl(qInput, locationText);
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
    if (typeof window !== "undefined") window.history.replaceState({}, "", "/directory");
  }

  return (
    <>
      {/* ── Search + filters ─────────────────────────────────────────────── */}
      <div className="bg-white shadow-[0_8px_24px_rgba(15,37,64,0.12)]">
        <div className="mx-auto max-w-7xl px-6 py-5">
          {/* Search shell — rounded navy box with a uniform light-green fill. */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#0f2f5f] bg-emerald-50 p-4">
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
              <option value="au">Australia-wide</option>
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
          {/* Client quote-request entry point — sits directly on the green shell */}
          <div className="mt-3 flex flex-col items-start justify-between gap-3 border-t border-emerald-200 px-1 pt-3 sm:flex-row sm:items-center">
            <p className="text-sm text-emerald-950">
              <span className="font-bold">Strata manager, owners corporation or building owner?</span>{" "}
              Request quotes for building works from listed businesses.
            </p>
            <a
              href="/request-quotes"
              className="shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 sm:whitespace-nowrap"
            >
              Request Quotes →
            </a>
          </div>
          </div>
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Results meta bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-600">
              {loading
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
          <a
            href="/directory/signup"
            className="rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            List your business →
          </a>
        </div>

        {/* Claim banner */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-sky-200 bg-sky-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-sky-950">Own a business listed here?</p>
            <p className="mt-0.5 text-sm text-slate-600">
              Claim your profile to manage your details, showcase your expertise and receive enquiries from potential clients.
            </p>
          </div>
          <a
            href="/directory/signup"
            className="shrink-0 rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 sm:whitespace-nowrap"
          >
            Claim Your Profile
          </a>
        </div>

        {/* Top Listing section — real Premium subscribers for this category (max 3) */}
        {!loading && <TopListingSection items={topListings} eligible={topEligible} />}

        {/* Results list */}
        {loading ? (
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
              {companies.map((company) => (
                <CompanyRow key={company.id} company={company} />
              ))}
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
