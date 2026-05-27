"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";
import type { SearchableProduct } from "@/lib/product-search-index";
import type { AiResult, SearchResponse } from "@/app/api/product-search/route";

// ── Props ──────────────────────────────────────────────────────────────────────

interface ProductSearchBarProps {
  products: SearchableProduct[];
  placeholder?: string;
}

// ── Filters ────────────────────────────────────────────────────────────────────

interface Filters {
  manufacturers: string[];
  enClass: string[];
  structural: string[];
  orientation: string[];
}

const EMPTY_FILTERS: Filters = {
  manufacturers: [],
  enClass: [],
  structural: [],
  orientation: [],
};

// ── Style maps ─────────────────────────────────────────────────────────────────

const MFR_CHIP: Record<string, string> = {
  Sika:    "bg-red-50 text-red-800 border-red-200",
  Ardex:   "bg-orange-50 text-orange-800 border-orange-200",
  Fosroc:  "bg-blue-50 text-blue-800 border-blue-200",
  Tremco:  "bg-emerald-50 text-emerald-800 border-emerald-200",
  Parchem: "bg-teal-50 text-teal-800 border-teal-200",
};

const CONF_BADGE: Record<string, string> = {
  High:   "bg-green-50 text-green-700 border-green-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low:    "bg-slate-50 text-slate-500 border-slate-200",
};

const CONF_DOT: Record<string, string> = {
  High:   "bg-green-500",
  Medium: "bg-amber-400",
  Low:    "bg-slate-400",
};

// ── Debounce hook ──────────────────────────────────────────────────────────────

function useDebounce<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}

// ── Main component ─────────────────────────────────────────────────────────────

export function ProductSearchBar({
  products,
  placeholder = "Search products — e.g. \"vertical repair mortar coastal\" or \"fast cure overhead\"",
}: ProductSearchBarProps) {
  const [query, setQuery]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [filters, setFilters]   = useState<Filters>(EMPTY_FILTERS);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const debouncedQ = useDebounce(query, 420);
  const carouselRef = useRef<HTMLDivElement>(null);
  const abortRef    = useRef<AbortController | null>(null);

  // ── Derived filter options from product list ─────────────────────────────────
  const mfrs      = [...new Set(products.map((p) => p.manufacturer))].sort();
  const enClasses = [...new Set(products.map((p) => p.enClass).filter(Boolean))].sort() as string[];

  // ── AI search ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (debouncedQ.length < 3) {
      setResponse(null);
      return;
    }
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);

    fetch("/api/product-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: debouncedQ }),
      signal: ctrl.signal,
    })
      .then((r) => r.json())
      .then((data: SearchResponse) => {
        setResponse(data);
        setExpanded(new Set());
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setResponse({ queryAnalysis: "", results: [], fallback: true });
        }
      })
      .finally(() => setLoading(false));
  }, [debouncedQ]);

  // ── Filter logic ──────────────────────────────────────────────────────────────
  function applyFilters(list: SearchableProduct[]): SearchableProduct[] {
    return list.filter((p) => {
      if (filters.manufacturers.length && !filters.manufacturers.includes(p.manufacturer)) return false;
      if (filters.enClass.length && !filters.enClass.some((ec) => p.enClass?.includes(ec))) return false;
      if (filters.structural.length && !filters.structural.includes(p.structural ?? "")) return false;
      if (filters.orientation.includes("Overhead") && !p.orientation?.includes("O")) return false;
      if (filters.orientation.includes("Vertical") && !p.orientation?.includes("V")) return false;
      return true;
    });
  }

  function toggle(key: keyof Filters, val: string) {
    setFilters((f) => {
      const cur = f[key];
      return {
        ...f,
        [key]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val],
      };
    });
  }

  function clearAll() {
    setQuery("");
    setResponse(null);
    setFilters(EMPTY_FILTERS);
  }

  function scrollBy(dir: "left" | "right") {
    const el = carouselRef.current;
    if (!el) return;
    const w = (el.querySelector("[data-card]") as HTMLElement | null)?.offsetWidth ?? 308;
    el.scrollBy({ left: dir === "right" ? w + 16 : -(w + 16), behavior: "smooth" });
  }

  // ── Display list ──────────────────────────────────────────────────────────────
  const hasFilters = Object.values(filters).some((f) => f.length > 0);
  const isAiMode   = response !== null && query.length >= 3;

  const displayList: Array<{ product: SearchableProduct; ai: AiResult | null }> = (() => {
    if (isAiMode) {
      // AI results first, then apply filters
      const aiById = Object.fromEntries(response!.results.map((r) => [r.product.id, r]));
      const aiProducts = applyFilters(response!.results.map((r) => r.product));
      return aiProducts.map((p) => ({ product: p, ai: aiById[p.id] ?? null }));
    }
    if (hasFilters) {
      return applyFilters(products).map((p) => ({ product: p, ai: null }));
    }
    return [];
  })();

  const showHint = !query && !hasFilters;

  return (
    <div className="w-full">

      {/* ── Search input ────────────────────────────────────────────────────── */}
      <div className="relative">
        <Search
          size={17}
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${loading ? "text-sky-500" : "text-slate-400"}`}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-10 pr-10 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin rounded-full border-2 border-sky-600 border-t-transparent" />
        )}
        {!loading && (query || hasFilters) && (
          <button
            onClick={clearAll}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:text-slate-600 transition"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* ── Filter chips ────────────────────────────────────────────────────── */}
      <div className="mt-3 flex flex-wrap items-center gap-2">

        {/* Manufacturer */}
        {mfrs.map((m) => (
          <button
            key={m}
            onClick={() => toggle("manufacturers", m)}
            className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${
              filters.manufacturers.includes(m)
                ? "border-sky-950 bg-sky-950 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
            }`}
          >
            {m}
          </button>
        ))}

        <span className="h-4 w-px bg-slate-200" />

        {/* EN class */}
        {enClasses.map((ec) => (
          <button
            key={ec}
            onClick={() => toggle("enClass", ec)}
            className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${
              filters.enClass.includes(ec)
                ? "border-sky-600 bg-sky-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
            }`}
          >
            {ec}
          </button>
        ))}

        <span className="h-4 w-px bg-slate-200" />

        {/* Structural classification */}
        {["Structural", "Non-structural", "Cosmetic"].map((s) => (
          <button
            key={s}
            onClick={() => toggle("structural", s)}
            className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${
              filters.structural.includes(s)
                ? "border-amber-600 bg-amber-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:text-amber-700"
            }`}
          >
            {s}
          </button>
        ))}

        <span className="h-4 w-px bg-slate-200" />

        {/* Orientation */}
        {["Overhead", "Vertical"].map((o) => (
          <button
            key={o}
            onClick={() => toggle("orientation", o)}
            className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${
              filters.orientation.includes(o)
                ? "border-violet-600 bg-violet-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-700"
            }`}
          >
            {o} capable
          </button>
        ))}

        {hasFilters && (
          <button
            onClick={() => setFilters(EMPTY_FILTERS)}
            className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-bold text-red-600 hover:bg-red-100 transition"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── AI query analysis banner ─────────────────────────────────────────── */}
      {response?.queryAnalysis && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3">
          <Info size={14} className="mt-0.5 shrink-0 text-sky-600" />
          <p className="text-xs leading-relaxed text-sky-800">
            <span className="font-bold">AI search: </span>
            {response.queryAnalysis}
          </p>
          {response.fallback && (
            <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" />
          )}
        </div>
      )}

      {/* ── Hint text ────────────────────────────────────────────────────────── */}
      {showHint && (
        <p className="mt-3 text-xs text-slate-400">
          Type 3+ characters for AI-assisted product matching, or use the chips above to filter by manufacturer, EN class, or application type.
        </p>
      )}

      {/* ── Results ──────────────────────────────────────────────────────────── */}
      {displayList.length > 0 && (
        <div className="mt-5">

          {/* Results header */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              {displayList.length} product{displayList.length !== 1 ? "s" : ""}
              {isAiMode ? " matched" : " filtered"}
              {response?.fallback && <span className="ml-2 text-amber-500">(keyword fallback)</span>}
            </p>
            {displayList.length > 3 && (
              <div className="flex gap-1.5">
                <button
                  onClick={() => scrollBy("left")}
                  className="rounded-full border border-slate-200 p-1.5 text-slate-500 transition hover:border-sky-300 hover:text-sky-700"
                >
                  <ChevronLeft size={13} />
                </button>
                <button
                  onClick={() => scrollBy("right")}
                  className="rounded-full border border-slate-200 p-1.5 text-slate-500 transition hover:border-sky-300 hover:text-sky-700"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-3 scroll-smooth"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "thin" }}
          >
            {displayList.map(({ product: p, ai }) => {
              const isExp = expanded.has(p.id);
              return (
                <div
                  key={p.id}
                  data-card
                  className="flex flex-none flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md hover:border-sky-200"
                  style={{ width: 300, minWidth: 300, scrollSnapAlign: "start" }}
                >
                  {/* ── Card header ───────────────────────────────────────── */}
                  <div className="border-b border-slate-100 p-4">
                    <div className="mb-2.5 flex items-start justify-between gap-2">
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${MFR_CHIP[p.manufacturer] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                        {p.manufacturer}
                      </span>
                      {ai && (
                        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${CONF_BADGE[ai.confidence]}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${CONF_DOT[ai.confidence]}`} />
                          {ai.confidence} match
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-extrabold leading-snug text-sky-950">{p.productName}</h3>
                    <p className="mt-0.5 text-[10px] text-slate-400">{p.categoryLabel} · {p.subcategoryLabel}</p>

                    {/* Tech chips */}
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {p.enClass && (
                        <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-700">{p.enClass}</span>
                      )}
                      {p.repairDepth && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{p.repairDepth}</span>
                      )}
                      {p.orientation && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{p.orientation}</span>
                      )}
                      {p.structural && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">{p.structural}</span>
                      )}
                      {p.fibreReinforced && (
                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700">Fibre</span>
                      )}
                    </div>
                  </div>

                  {/* ── Card body ─────────────────────────────────────────── */}
                  <div className="flex flex-1 flex-col gap-3 p-4">

                    {/* AI: Why matched + limitations */}
                    {ai && (
                      <div className="rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                        <button
                          onClick={() => setExpanded((prev) => {
                            const next = new Set(prev);
                            if (next.has(p.id)) next.delete(p.id);
                            else next.add(p.id);
                            return next;
                          })}
                          className="flex w-full items-center justify-between px-3 py-2 text-left"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-700">Why matched</span>
                          {isExp ? <ChevronUp size={12} className="text-slate-400" /> : <ChevronDown size={12} className="text-slate-400" />}
                        </button>

                        <div className={`px-3 overflow-hidden transition-all duration-200 ${isExp ? "max-h-64 pb-3" : "max-h-0"}`}>
                          <p className="text-[11px] leading-relaxed text-slate-600">{ai.matchReason}</p>
                          {ai.limitations && (
                            <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-50 border border-amber-100 px-2.5 py-2">
                              <AlertTriangle size={11} className="mt-0.5 shrink-0 text-amber-500" />
                              <p className="text-[10px] leading-relaxed text-amber-800">{ai.limitations}</p>
                            </div>
                          )}
                        </div>

                        {/* Collapsed preview */}
                        {!isExp && (
                          <p className="line-clamp-2 px-3 pb-2 text-[11px] leading-relaxed text-slate-500">
                            {ai.matchReason}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Non-AI: first advantage as summary */}
                    {!ai && p.advantages.length > 0 && (
                      <p className="line-clamp-3 text-[11px] leading-relaxed text-slate-500">
                        {p.advantages[0]}
                      </p>
                    )}

                    {/* Price */}
                    {p.priceRange && (
                      <p className="text-[11px] text-slate-500">
                        <span className="font-bold text-slate-700">From </span>
                        {p.priceRange}
                        {p.retailers.length > 0 && (
                          <span className="text-slate-400"> · {p.retailers.length} retailer{p.retailers.length !== 1 ? "s" : ""}</span>
                        )}
                      </p>
                    )}

                    {/* Related defects */}
                    <p className="text-[10px] text-slate-400">
                      <span className="font-bold">Defect: </span>{p.subcategoryLabel}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
                      <a
                        href={p.pageUrl}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-red-700 transition"
                      >
                        View details <ExternalLink size={10} />
                      </a>
                      {p.retailers.length > 0 && (
                        <a
                          href={p.retailers[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-semibold text-slate-400 hover:text-sky-600 transition"
                        >
                          {p.retailers[0].name} {p.retailers[0].price}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          {isAiMode && (
            <p className="mt-2 text-[10px] leading-relaxed text-slate-400">
              AI-assisted matching. Always verify product suitability against project requirements, exposure conditions, and manufacturer technical data sheets (TDS) before specifying.
            </p>
          )}
        </div>
      )}

      {/* ── No results ───────────────────────────────────────────────────────── */}
      {query.length >= 3 && !loading && response !== null && displayList.length === 0 && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center">
          <p className="text-sm font-bold text-slate-600">No products matched your search.</p>
          <p className="mt-1.5 text-xs text-slate-400">
            Try broader terms — e.g. &ldquo;repair mortar&rdquo; instead of a brand name — or use the filter chips above.
          </p>
        </div>
      )}

    </div>
  );
}
