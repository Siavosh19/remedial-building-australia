"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryOption = {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  company_count?: number;
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
  type: "state" | "suburb" | "postcode";
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
  initialCompanies: CompanyResult[];
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
  const isFeatured = planType === "featured";
  const isClaimed = planType === "claimed" || planType === "featured";
  const abbr = initials(company.name);
  const tags = company.company_tags ?? [];

  return (
    <div
      className={`flex gap-4 border-b-2 border-slate-200 bg-white px-6 py-5 last:border-0 transition-colors hover:bg-slate-50/70 ${
        isFeatured ? "border-l-4 border-l-amber-400" : ""
      }`}
    >
      {/* Logo / initials */}
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold overflow-hidden ${
          isFeatured ? "bg-amber-100 text-amber-800" : "bg-sky-100 text-sky-800"
        }`}
      >
        {company.logo_url
          ? <img src={company.logo_url} alt={`${company.name} logo`} className="h-full w-full object-cover" />
          : abbr || "?"}
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        {/* Badges */}
        <div className="mb-1 flex flex-wrap items-center gap-1.5">
          {company.main_category && (
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-800">
              {company.main_category.name}
            </span>
          )}
          {isFeatured && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
              ★ Featured
            </span>
          )}
          {isClaimed && !isFeatured && (
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
              Claimed Profile
            </span>
          )}
          {company.distance_km != null && (
            <DistanceBadge distanceKm={company.distance_km} />
          )}
        </div>

        {/* Name */}
        <h3 className="text-base font-bold leading-tight text-sky-950">
          {company.name}
        </h3>

        {/* Location */}
        {locationParts.length > 0 && (
          <p className="mt-0.5 text-xs text-slate-500">
            {locationParts.join(", ")}
          </p>
        )}

        {/* Description */}
        {company.description && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {company.description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.slice(0, 5).map((t) => (
              <span
                key={t.tag.name}
                className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-600"
              >
                {t.tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right: reviews + action buttons */}
      <div className="flex shrink-0 flex-col items-end justify-between gap-2 pl-1 sm:gap-3 sm:pl-2">
        <p className="text-xs text-slate-400">No reviews yet</p>
        <div className="flex flex-col items-end gap-2">
          <a
            href={`/directory/company/${company.slug}`}
            className="whitespace-nowrap rounded-xl bg-sky-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-800"
          >
            View Profile →
          </a>
          {isClaimed ? (
            <a
              href={`/directory/company/${company.slug}`}
              className="whitespace-nowrap rounded-xl border border-sky-300 bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-800 transition hover:bg-sky-100"
            >
              Request Quote
            </a>
          ) : (
            <a
              href={`/directory/claim/${company.slug}`}
              className="whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Claim this profile →
            </a>
          )}
        </div>
      </div>
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

// ─── Category browser (hierarchical) ─────────────────────────────────────────

function CategoryBrowser({
  categories,
  value,
  onChange,
}: {
  categories: CategoryOption[];
  value: string;
  onChange: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  const parents = categories
    .filter((c) => !c.parent_id)
    .filter((c) => {
      const hasOwn = (c.company_count ?? 0) > 0;
      const hasChildren = categories.some(
        (ch) => ch.parent_id === c.id && (ch.company_count ?? 0) > 0
      );
      return hasOwn || hasChildren;
    });

  function getChildren(parentId: number) {
    return categories.filter((c) => c.parent_id === parentId && (c.company_count ?? 0) > 0);
  }

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
    setExpanded(new Set());
  }

  function toggleExpand(id: number, e: React.MouseEvent) {
    e.stopPropagation();
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${
          value
            ? "border-sky-400 bg-sky-400/20 text-sky-200"
            : "border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20"
        }`}
      >
        <svg width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
        <span className="max-w-[150px] truncate">{selectedLabel}</span>
        <svg className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} width={10} height={10} viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 8L1 3h10z" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 max-h-96 w-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
          {value && (
            <button
              onClick={() => select("")}
              className="flex w-full items-center gap-2 border-b border-slate-100 px-4 py-2.5 text-left text-sm font-semibold text-slate-500 hover:bg-slate-50"
            >
              <span>×</span> Clear category filter
            </button>
          )}
          {parents.map((parent) => {
            const children = getChildren(parent.id);
            const hasChildren = children.length > 0;
            const isExpanded = expanded.has(parent.id);
            return (
              <div key={parent.id} className="border-b border-slate-50 last:border-0">
                <div className={`flex items-center ${value === parent.slug ? "bg-sky-50" : "hover:bg-sky-50"}`}>
                  <button
                    onClick={() => select(parent.slug)}
                    className="flex-1 px-4 py-2.5 text-left text-sm font-semibold text-sky-950"
                  >
                    {parent.name}
                  </button>
                  {hasChildren && (
                    <button
                      onClick={(e) => toggleExpand(parent.id, e)}
                      className="shrink-0 px-3 py-2.5 text-slate-400 hover:text-slate-700"
                      aria-label="Expand"
                    >
                      <svg className={`transition-transform duration-150 ${isExpanded ? "rotate-90" : ""}`} width={10} height={10} viewBox="0 0 12 12" fill="currentColor">
                        <path d="M4 1l7 5-7 5z" />
                      </svg>
                    </button>
                  )}
                </div>
                {hasChildren && isExpanded && (
                  <div className="bg-slate-50">
                    {children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => select(child.slug)}
                        className={`flex w-full items-center py-2 pl-8 pr-4 text-left text-sm hover:bg-sky-100 ${
                          value === child.slug ? "bg-sky-100 font-semibold text-sky-800" : "font-medium text-sky-900"
                        }`}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
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

  const parents = categories.filter((c) => !c.parent_id);

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
        <span className="max-w-[160px] truncate">{selectedLabel}</span>
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
              className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition hover:bg-slate-50 ${!value ? "text-sky-700" : "text-slate-700"}`}
            >
              All Categories
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
  postcode: "🔢",
};

const TYPE_LABELS: Record<LocationSuggestion["type"], string> = {
  state: "State",
  suburb: "Suburb",
  postcode: "Postcode",
};

function LocationAutocomplete({
  selectedLocation,
  onSelect,
  onClear,
}: {
  selectedLocation: SelectedLocation;
  onSelect: (loc: LocationSuggestion) => void;
  onClear: () => void;
}) {
  const [inputVal, setInputVal] = useState("");
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
      <div className="flex h-[42px] items-center gap-2.5 rounded-xl border-2 border-sky-400 bg-sky-50 px-4">
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
        placeholder="Suburb, postcode or state…"
        className="w-full rounded-xl border-2 border-slate-900 bg-white py-2.5 pl-10 pr-10 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-white/30"
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

// ─── Keyword autocomplete ─────────────────────────────────────────────────────

type KeywordSuggestion = {
  type: "category";
  text: string;
  slug: string;
  count: number;
};

function KeywordAutocomplete({
  value,
  onChange,
  onSearch,
  onSelectCategory,
}: {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  onSelectCategory: (slug: string, label: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<KeywordSuggestion[]>([]);
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

  function handleChange(v: string) {
    onChange(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (v.trim().length < 2) { setSuggestions([]); setOpen(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/directory/suggest?q=${encodeURIComponent(v.trim())}`);
        const data = await res.json();
        const s = data.suggestions ?? [];
        setSuggestions(s);
        setOpen(s.length > 0);
      } catch {
        setSuggestions([]); setOpen(false);
      }
    }, 250);
  }

  function pick(s: KeywordSuggestion) {
    setSuggestions([]); setOpen(false);
    onSelectCategory(s.slug, s.text);
  }

  return (
    <div ref={containerRef} className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden
      >
        <circle cx={11} cy={11} r={8} />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { setOpen(false); onSearch(); } if (e.key === "Escape") setOpen(false); }}
        placeholder="Company, service or category…"
        autoComplete="off"
        className="w-full rounded-xl border-2 border-slate-900 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-white/30"
      />

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 px-4 py-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Categories</span>
          </div>
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => pick(s)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-sky-50 focus:bg-sky-50 focus:outline-none"
            >
              <span className="shrink-0 text-sm text-sky-600">
                <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M3 7a2 2 0 012-2h3.586a1 1 0 01.707.293L10.414 6.5A1 1 0 0011.121 6.793H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-sky-950">{s.text}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DirectoryListing({ categories, initialCompanies }: Props) {
  // qInput = what the user is typing; q = applied to search (on Enter/button)
  const [qInput, setQInput] = useState(() =>
    typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("q") ?? ""
  );
  const [q, setQ] = useState(qInput);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>(null);
  const [coords, setCoords] = useState<Coords>(null);
  const [category, setCategory] = useState(() =>
    typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("category") ?? ""
  );
  const [featured, setFeatured] = useState(false);
  const [page, setPage] = useState(1);

  const [companies, setCompanies] = useState<CompanyResult[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLocalFallback, setIsLocalFallback] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const geocodeAbortRef = useRef<AbortController | null>(null);

  const hasFilters = Boolean(q || qInput || selectedLocation || category || featured);

  const fetchResults = useCallback(
    async (params: {
      q: string;
      selectedLocation: SelectedLocation;
      coords: Coords;
      category: string;
      featured: boolean;
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
        // Fallback: no coords — use hard location filter
        const loc = params.selectedLocation;
        if (loc.type === "state") {
          sp.set("state", loc.stateCode);
        } else if (loc.type === "suburb" && loc.suburb) {
          sp.set("suburb", loc.suburb);
          sp.set("state", loc.stateCode);
        } else if (loc.type === "postcode" && loc.postcode) {
          sp.set("postcode", loc.postcode);
        }
      }

      if (params.category) sp.set("category", params.category);
      if (params.featured) sp.set("featured", "true");
      sp.set("page", String(params.page));

      try {
        const res = await fetch(`/api/directory/search?${sp}`);
        const data = await res.json();
        setCompanies(data.companies ?? []);
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

  // Re-run search when explicit filters change (category, featured, page, coords)
  // Does NOT watch qInput — keyword requires Enter or button click
  useEffect(() => {
    if (!hasSearched) return;
    fetchResults({ q, selectedLocation, coords, category, featured, page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, featured, coords, page]);

  function applySearch() {
    setHasSearched(true);
    setQ(qInput);
    setPage(1);
    fetchResults({ q: qInput, selectedLocation, coords, category, featured, page: 1 });
  }

  function handleSelectCategory(slug: string, label: string) {
    setQInput(label);
    setQ(label);
    setCategory(slug);
    setHasSearched(true);
    setPage(1);
    fetchResults({ q: label, selectedLocation, coords, category: slug, featured, page: 1 });
  }

  function handleLocationSelect(loc: LocationSuggestion) {
    setHasSearched(true);
    setSelectedLocation(loc);
    setCoords(null);
    setIsLocalFallback(false);

    if (loc.type === "state") {
      // State selection — no coords needed, use state filter
      setPage(1);
      fetchResults({ q, selectedLocation: loc, coords: null, category, featured, page: 1 });
      return;
    }

    // Suburb or postcode — resolve coordinates
    if (loc.lat != null && loc.lng != null) {
      const resolved: Coords = { lat: loc.lat, lng: loc.lng };
      setCoords(resolved);
      // fetchResults triggered by coords useEffect
    } else {
      // Geocode via Nominatim as fallback
      if (geocodeAbortRef.current) geocodeAbortRef.current.abort();
      const ctrl = new AbortController();
      geocodeAbortRef.current = ctrl;
      const query = loc.suburb ? `${loc.suburb} ${loc.stateCode}` : `${loc.postcode ?? ""} ${loc.stateCode}`;
      fetch(`/api/directory/geocode?q=${encodeURIComponent(query)}`, { signal: ctrl.signal })
        .then((r) => r.json())
        .then((data) => {
          if (data?.lat && data?.lng) {
            setCoords({ lat: data.lat, lng: data.lng });
            // fetchResults triggered by coords useEffect
          } else {
            // Geocode failed — search with state filter only
            setPage(1);
            fetchResults({ q, selectedLocation: loc, coords: null, category, featured, page: 1 });
          }
        })
        .catch(() => {
          // Aborted or failed — search without coords
          setPage(1);
          fetchResults({ q, selectedLocation: loc, coords: null, category, featured, page: 1 });
        });
    }
  }

  function handleLocationClear() {
    setSelectedLocation(null);
    setCoords(null);
    setIsLocalFallback(false);
    setPage(1);
    fetchResults({ q, selectedLocation: null, coords: null, category, featured, page: 1 });
  }

  function clearFilters() {
    setQInput("");
    setQ("");
    setSelectedLocation(null);
    setCoords(null);
    setCategory("");
    setFeatured(false);
    setPage(1);
    setIsLocalFallback(false);
    setHasSearched(false);
    setCompanies([]);
    setTotal(0);
  }

  return (
    <>
      {/* ── Search + filters ─────────────────────────────────────────────── */}
      <div className="sticky top-[73px] z-40 border-b border-sky-900 bg-sky-950 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          {/* Row 1: keyword + location + search button */}
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            {/* Keyword */}
            <KeywordAutocomplete
              value={qInput}
              onChange={setQInput}
              onSearch={applySearch}
              onSelectCategory={handleSelectCategory}
            />

            {/* Location */}
            <LocationAutocomplete
              selectedLocation={selectedLocation}
              onSelect={handleLocationSelect}
              onClear={handleLocationClear}
            />

            {/* Search button */}
            <button
              type="button"
              onClick={applySearch}
              className="rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Search
            </button>
          </div>

          {/* Row 2: category browser + Featured toggle + clear */}
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <CategoryBrowser
              categories={categories}
              value={category}
              onChange={(slug) => {
                setCategory(slug);
                setHasSearched(true);
                setPage(1);
                fetchResults({ q, selectedLocation, coords, category: slug, featured, page: 1 });
              }}
            />

            <button
              onClick={() => { setHasSearched(true); setFeatured((v) => !v); }}
              className={`rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${
                featured
                  ? "border-amber-400 bg-amber-400/20 text-amber-300"
                  : "border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20"
              }`}
            >
              {featured && <span className="mr-1 text-amber-400">✓</span>}
              Featured
            </button>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/20"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-8">

        {!hasSearched ? (
          /* ── Pre-search prompt ─────────────────────────────────────────── */
          <>
            <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 px-8 py-12 text-center">
              <p className="text-2xl font-extrabold text-sky-950">Search the directory</p>
              <p className="mt-2 text-sm text-slate-600">
                Enter a business name, service type, suburb, postcode or state to find listed businesses.
              </p>
              <p className="mt-4 text-xs text-slate-400">13,500+ businesses listed across Australia</p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-sky-200 bg-sky-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-sky-950">Own a business in this industry?</p>
                <p className="mt-0.5 text-sm text-slate-600">
                  Claim your profile to manage your details, showcase your expertise and receive enquiries.
                </p>
              </div>
              <a
                href="/directory/signup"
                className="shrink-0 rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 sm:whitespace-nowrap"
              >
                List / Claim Your Profile
              </a>
            </div>
          </>
        ) : (
          /* ── Search results ────────────────────────────────────────────── */
          <>
            {/* Results meta bar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-600">
                  {loading
                    ? "Searching…"
                    : `${total} ${total === 1 ? "business" : "businesses"} found`}
                  {selectedLocation && !loading && total > 0 && (
                    <span className="ml-1 font-normal text-slate-400">near {selectedLocation.label.split(",")[0]}</span>
                  )}
                </p>
                {isLocalFallback && !loading && selectedLocation && (
                  <p className="mt-1 text-xs text-amber-700">
                    No local businesses found. Showing relevant businesses that service your area.
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

            {/* Results list */}
            {loading ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
              </div>
            ) : companies.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-10 py-20 text-center shadow-sm">
                <p className="text-lg font-bold text-sky-950">No businesses found</p>
                <p className="mt-2 text-sm text-slate-500">Try adjusting your search or clearing your filters.</p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={clearFilters}
                    className="rounded-xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-hidden rounded-2xl border-2 border-slate-300 shadow-sm">
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
          </>
        )}
      </div>
    </>
  );
}
