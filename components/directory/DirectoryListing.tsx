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
};

type LocationSuggestion = {
  type: "state" | "suburb" | "postcode";
  label: string;
  stateCode: string;
  suburb?: string;
  postcode?: string;
};

type SelectedLocation = LocationSuggestion | null;

interface Props {
  categories: CategoryOption[];
  initialCompanies: CompanyResult[];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function VerificationBadge({
  status,
  isFeatured,
  isLicenceVerified,
  isClaimed,
}: {
  status: string;
  isFeatured: boolean;
  isLicenceVerified: boolean;
  isClaimed: boolean;
}) {
  if (isFeatured)
    return <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">Featured</span>;
  if (isLicenceVerified || status === "licence_verified")
    return <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">Licence Verified ✓</span>;
  if (status === "practitioner_verified")
    return <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">Practitioner Verified ✓</span>;
  if (status === "business_verified" || status === "contact_verified")
    return <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-sky-800">Verified</span>;
  if (isClaimed)
    return <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800">Claimed</span>;
  return null;
}

function DistanceBadge({ distanceKm }: { distanceKm: number }) {
  const label = distanceKm < 1 ? "< 1 km" : distanceKm < 10 ? `${distanceKm.toFixed(1)} km` : `${Math.round(distanceKm)} km`;
  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
      {label} away
    </span>
  );
}

function CompanyCard({ company }: { company: CompanyResult }) {
  const location = company.locations[0];
  const isLicenceVerified = company.licences.length > 0;
  const showPhone = company.profile_status !== "basic" && company.phone;
  const locationParts = [location?.suburb, location?.state, location?.postcode].filter(Boolean);

  return (
    <div
      className={`flex flex-col rounded-3xl border bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
        company.is_featured ? "border-amber-300 ring-1 ring-amber-100" : "border-slate-200"
      }`}
    >
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-center gap-2">
          {company.main_category && (
            <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-sky-800">
              {company.main_category.name}
            </span>
          )}
          <VerificationBadge
            status={company.profile_status}
            isFeatured={company.is_featured}
            isLicenceVerified={isLicenceVerified}
            isClaimed={company.is_claimed}
          />
          {company.distance_km != null && (
            <DistanceBadge distanceKm={company.distance_km} />
          )}
        </div>

        <h3 className="mt-4 text-xl font-bold leading-tight text-sky-950">{company.name}</h3>

        {locationParts.length > 0 && (
          <p className="mt-1 text-sm text-slate-500">{locationParts.join(", ")}</p>
        )}

        {company.description ? (
          <p className="mt-4 line-clamp-2 flex-1 text-sm leading-6 text-slate-600">
            {company.description}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        {showPhone && (
          <a href={`tel:${company.phone}`} className="mt-4 text-sm font-semibold text-slate-700 hover:text-sky-700">
            {company.phone}
          </a>
        )}

        <div className="mt-5 border-t border-slate-100 pt-4">
          <a
            href={`/directory/company/${company.slug}`}
            className="text-sm font-bold text-sky-700 transition hover:text-red-700"
          >
            View Profile →
          </a>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return <div className="h-56 animate-pulse rounded-3xl border border-slate-200 bg-slate-200" />;
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
    <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
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
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const parents = categories.filter((c) => !c.parent_id);
  const children = categories.filter((c) => !!c.parent_id);

  const filteredParents = search.trim()
    ? parents.filter((p) => p.name.toLowerCase().includes(search.toLowerCase().trim()))
    : parents;

  const selectedLabel = value
    ? (categories.find((c) => c.slug === value)?.name ?? "All Categories")
    : "All Categories";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
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
                onChange={(e) => { setSearch(e.target.value); setExpandedId(null); }}
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

            {filteredParents.map((parent) => {
              const subs = children.filter((c) => c.parent_id === parent.id);
              const isExpanded = expandedId === parent.id;
              const isSelected = value === parent.slug;

              return (
                <div key={parent.id}>
                  <div className="flex items-center gap-1 pr-2">
                    <button
                      type="button"
                      onClick={() => select(parent.slug)}
                      className={`flex-1 px-4 py-2 text-left text-sm font-semibold transition hover:bg-slate-50 ${
                        isSelected ? "text-sky-700" : "text-slate-800"
                      }`}
                    >
                      {parent.name}
                    </button>
                    {subs.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : parent.id)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      >
                        <svg
                          width={12} height={12} viewBox="0 0 12 12" fill="currentColor"
                          className={`transition-transform duration-150 ${isExpanded ? "rotate-90" : ""}`}
                        >
                          <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="ml-4 mb-1 border-l-2 border-sky-100">
                      {subs.map((sub) => (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => select(sub.slug)}
                          className={`w-full px-3 py-1.5 text-left text-xs transition hover:bg-sky-50 ${
                            value === sub.slug
                              ? "font-bold text-sky-700"
                              : "font-medium text-slate-600 hover:text-sky-700"
                          }`}
                        >
                          • {sub.name}
                        </button>
                      ))}
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
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
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
      <div className="flex items-center gap-2.5 rounded-2xl border border-sky-300 bg-sky-50 px-4 py-3">
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
        placeholder="State, suburb or postcode…"
        className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-10 text-sm focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-100"
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
  const [q, setQ] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("q") ?? "";
  });
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>(null);
  const [category, setCategory] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("category") ?? "";
  });
  const [featured, setFeatured] = useState(false);
  const [licenceVerified, setLicenceVerified] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [page, setPage] = useState(1);

  const [companies, setCompanies] = useState<CompanyResult[]>(initialCompanies);
  const [total, setTotal] = useState(initialCompanies.length);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasFilters = Boolean(q || selectedLocation || category || featured || licenceVerified || claimed);

  // ── Fetch results ───────────────────────────────────────────────────
  const fetchResults = useCallback(
    async (params: {
      q: string;
      selectedLocation: SelectedLocation;
      category: string;
      featured: boolean;
      licenceVerified: boolean;
      claimed: boolean;
      page: number;
    }) => {
      setLoading(true);
      const sp = new URLSearchParams();
      if (params.q) sp.set("q", params.q);

      if (params.selectedLocation) {
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
      if (params.licenceVerified) sp.set("licenceVerified", "true");
      if (params.claimed) sp.set("claimed", "true");
      sp.set("page", String(params.page));

      try {
        const res = await fetch(`/api/directory/search?${sp}`);
        const data = await res.json();
        setCompanies(data.companies ?? []);
        setTotal(data.total ?? 0);
        setTotalPages(data.totalPages ?? 1);
      } catch {
        // keep current results on error
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [q, selectedLocation, category, featured, licenceVerified, claimed]);

  // Trigger search on filter or page change
  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    const delay = q ? 350 : 0;
    searchDebounceRef.current = setTimeout(() => {
      fetchResults({ q, selectedLocation, category, featured, licenceVerified, claimed, page });
    }, delay);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [q, selectedLocation, category, featured, licenceVerified, claimed, page, fetchResults]);

  function clearFilters() {
    setQ("");
    setSelectedLocation(null);
    setCategory("");
    setFeatured(false);
    setLicenceVerified(false);
    setClaimed(false);
    setPage(1);
  }

  return (
    <>
      {/* ── Search + filters ────────────────────────────────────────── */}
      <div className="sticky top-[73px] z-40 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-5">

          {/* Row 1: keyword + location autocomplete */}
          <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
            {/* Keyword search */}
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                aria-hidden
              >
                <circle cx={11} cy={11} r={8} />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by company, service or defect type…"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>

            {/* Location autocomplete */}
            <LocationAutocomplete
              selectedLocation={selectedLocation}
              onSelect={(loc) => setSelectedLocation(loc)}
              onClear={() => setSelectedLocation(null)}
            />
          </div>

          {/* Row 2: category + verification toggles */}
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <CategorySelector
              categories={categories}
              value={category}
              onChange={setCategory}
            />

            <div className="mx-0.5 h-6 w-px bg-slate-200" aria-hidden />

            {(
              [
                { label: "Featured", active: featured, toggle: () => setFeatured((v) => !v) },
                { label: "Licence Verified", active: licenceVerified, toggle: () => setLicenceVerified((v) => !v) },
                { label: "Claimed Profile", active: claimed, toggle: () => setClaimed((v) => !v) },
              ] as const
            ).map(({ label, active, toggle }) => (
              <button
                key={label}
                onClick={toggle}
                className={`rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${
                  active
                    ? "border-sky-600 bg-sky-50 text-sky-800"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                {active && <span className="mr-1 text-sky-600">✓</span>}
                {label}
              </button>
            ))}

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

      {/* ── Results ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold text-slate-600">
            {loading
              ? "Searching…"
              : `${total} ${total === 1 ? "company" : "companies"} found`}
            {selectedLocation && !loading && total > 0 && (
              <span className="ml-1 font-normal text-slate-400">
                in {selectedLocation.label}
              </span>
            )}
          </p>
          <a
            href="/directory/signup"
            className="rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            List your business →
          </a>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : companies.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-10 py-20 text-center shadow-sm">
            <p className="text-lg font-bold text-sky-950">No companies found</p>
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
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
