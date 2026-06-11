"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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
  profile_status: string;
  confidence_score: number;
  is_featured: boolean;
  is_claimed: boolean;
  distance_km?: number | null;
  main_category: CategoryOption | null;
  locations: Array<{
    suburb: string | null;
    state: string;
    postcode: string;
    services_nationwide?: boolean;
    services_statewide?: boolean;
  }>;
  licences: Array<{ status: string }>;
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
  const isVerified =
    company.licences.length > 0 ||
    ["business_verified", "contact_verified", "licence_verified", "practitioner_verified"].includes(
      company.profile_status
    );
  const abbr = initials(company.name);
  const tags = company.company_tags ?? [];

  return (
    <div
      className={`flex gap-4 border-b border-slate-100 bg-white px-6 py-5 last:border-0 transition-colors hover:bg-slate-50/70 ${
        company.is_featured ? "border-l-4 border-l-amber-400" : ""
      }`}
    >
      {/* Logo / initials */}
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${
          company.is_featured
            ? "bg-amber-100 text-amber-800"
            : "bg-sky-100 text-sky-800"
        }`}
      >
        {abbr || "?"}
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
          {company.is_featured && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
              ★ Featured
            </span>
          )}
          {isVerified && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
              Business Verified ✓
            </span>
          )}
          {company.is_claimed && !isVerified && !company.is_featured && (
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
              Claimed Profile ✓
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
      <div className="flex shrink-0 flex-col items-end justify-between gap-3 pl-2">
        <p className="text-xs text-slate-400">No reviews yet</p>
        <div className="flex flex-col items-end gap-2">
          <a
            href={`/directory/company/${company.slug}`}
            className="whitespace-nowrap rounded-xl bg-sky-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-800"
          >
            View Profile →
          </a>
          {company.is_claimed ? (
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
              Claim Profile
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
      <div className="flex items-center gap-2.5 rounded-xl border border-sky-300 bg-sky-50 px-4 py-2.5">
        <span className="text-base">{TYPE_ICONS[selectedLocation.type]}</span>
        <div className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-sky-500">
            {TYPE_LABELS[selectedLocation.type]}
          </span>
          <span className="block truncate text-sm font-semibold text-sky-900">{selectedLocation.label}</span>
        </div>
        <button
          onClick={onClear}
          className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold text-sky-500 hover:bg-sky-100 hover:text-sky-700"
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
        className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-10 text-sm focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-100"
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

  const [companies, setCompanies] = useState<CompanyResult[]>(initialCompanies);
  const [total, setTotal] = useState(initialCompanies.length);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLocalFallback, setIsLocalFallback] = useState(false);

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
    fetchResults({ q, selectedLocation, coords, category, featured, page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, featured, coords, page]);

  function applySearch() {
    setQ(qInput);
    setPage(1);
    fetchResults({ q: qInput, selectedLocation, coords, category, featured, page: 1 });
  }

  function handleLocationSelect(loc: LocationSuggestion) {
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
    fetchResults({ q: "", selectedLocation: null, coords: null, category: "", featured: false, page: 1 });
  }

  return (
    <>
      {/* ── Search + filters ─────────────────────────────────────────────── */}
      <div className="sticky top-[73px] z-40 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          {/* Row 1: keyword + location + search button */}
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            {/* Keyword */}
            <div className="relative">
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
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>

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

          {/* Row 2: category (hidden for now) + Featured toggle + clear */}
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <div className="hidden">
              <CategorySelector categories={categories} value={category} onChange={setCategory} />
            </div>

            <button
              onClick={() => { setFeatured((v) => !v); }}
              className={`rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${
                featured
                  ? "border-amber-500 bg-amber-50 text-amber-800"
                  : "border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              {featured && <span className="mr-1 text-amber-500">✓</span>}
              Featured
            </button>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
              >
                Clear all
              </button>
            )}
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

        {/* Results list */}
        {loading ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : companies.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-10 py-20 text-center shadow-sm">
            <p className="text-lg font-bold text-sky-950">No businesses found</p>
            <p className="mt-2 text-sm text-slate-500">
              {hasFilters
                ? "Try adjusting your search or clearing your filters."
                : "No listings are published yet. Be the first to list your business."}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="rounded-xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800"
                >
                  Clear all filters
                </button>
              )}
              {!hasFilters && (
                <a
                  href="/directory/signup"
                  className="rounded-xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800"
                >
                  List your business →
                </a>
              )}
            </div>
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
