"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import type { MaterialRow } from "@/lib/concrete-defects-data";
import {
  RETAILER_PRICES,
  BRAND_SUPPLIERS,
  PRODUCT_TDS_URLS,
  PRODUCT_CARD_ENRICHMENT,
  PRODUCT_TECH_SPECS,
  type RetailerPrice,
  type ProductTechSpecs,
} from "@/lib/product-enrichment";

// ── Brand config ──────────────────────────────────────────────────────────────

const BRANDS = [
  {
    key: "brandSika",
    label: "Sika",
    fullLabel: "Sika Australia",
    tdsUrl: "https://aus.sika.com",
    gradientClass: "from-red-500 to-red-700",
    badgeClass: "bg-red-100 text-red-800",
    abbrev: "SKA",
    accentColor: "#ef4444",
  },
  {
    key: "brandArdex",
    label: "Ardex",
    fullLabel: "Ardex Australia",
    tdsUrl: "https://www.ardex.com.au",
    gradientClass: "from-orange-500 to-orange-700",
    badgeClass: "bg-orange-100 text-orange-800",
    abbrev: "ARD",
    accentColor: "#f97316",
  },
  {
    key: "brandFosroc",
    label: "Fosroc",
    fullLabel: "Fosroc Australia",
    tdsUrl: "https://www.fosroc.com/en-au",
    gradientClass: "from-blue-600 to-blue-800",
    badgeClass: "bg-blue-100 text-blue-800",
    abbrev: "FSR",
    accentColor: "#3b82f6",
  },
  {
    key: "brandParchem",
    label: "Parchem",
    fullLabel: "Parchem / Mapei",
    tdsUrl: "https://www.parchem.com.au",
    gradientClass: "from-teal-600 to-teal-800",
    badgeClass: "bg-teal-100 text-teal-800",
    abbrev: "PAR",
    accentColor: "#14b8a6",
  },
  {
    key: "brandTremco",
    label: "Tremco",
    fullLabel: "Tremco CPG Australia",
    tdsUrl: "https://www.tremcosealants.com.au",
    gradientClass: "from-green-600 to-green-800",
    badgeClass: "bg-green-100 text-green-800",
    abbrev: "TRM",
    accentColor: "#22c55e",
  },
] as const;

const BRAND_ACCENT: Record<string, string> = {
  brandSika: "#ef4444",
  brandArdex: "#f97316",
  brandFosroc: "#3b82f6",
  brandParchem: "#14b8a6",
  brandTremco: "#22c55e",
};

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProductCard {
  brandKey: string;
  brand: string;
  fullLabel: string;
  abbrev: string;
  gradientClass: string;
  badgeClass: string;
  productName: string;
  description: string;
  tdsUrl: string;
  packSize: string | null;
  uom: string | null;
  notes: string | null;
  materialIndex: number;
}

// ── Build cards ───────────────────────────────────────────────────────────────

export function buildCards(materials: MaterialRow[]): ProductCard[] {
  const cards: ProductCard[] = [];
  for (let idx = 0; idx < materials.length; idx++) {
    const m = materials[idx];
    for (const b of BRANDS) {
      const val = m[b.key as keyof MaterialRow] as string | null;
      if (!val) continue;
      const parts = val.split(/\s[–-]\s/);
      cards.push({
        brandKey: b.key,
        brand: b.label,
        fullLabel: b.fullLabel,
        abbrev: b.abbrev,
        gradientClass: b.gradientClass,
        badgeClass: b.badgeClass,
        productName: parts[0].trim(),
        description: parts.slice(1).join(" – ").trim(),
        tdsUrl: b.tdsUrl,
        packSize: m.packSize,
        uom: m.unitOfMeasure,
        notes: m.notes,
        materialIndex: idx,
      });
    }
  }
  return cards;
}

// ── Filter definitions ────────────────────────────────────────────────────────

type TechSpecEntry = ProductTechSpecs | null | undefined;

const FILTER_DEFS = [
  { id: "r2",         label: "EN R2",              match: (s: TechSpecEntry) => !!s?.enClass?.includes("R2") },
  { id: "r3",         label: "EN R3",              match: (s: TechSpecEntry) => !!s?.enClass?.includes("R3") },
  { id: "r4",         label: "EN R4",              match: (s: TechSpecEntry) => !!s?.enClass?.includes("R4") },
  { id: "overhead",   label: "Overhead capable",   match: (s: TechSpecEntry) => !!s?.orientation?.includes("O") },
  { id: "fibre",      label: "Fibre reinforced",   match: (s: TechSpecEntry) => !!s?.fibreReinforced },
  { id: "structural", label: "Structural",          match: (s: TechSpecEntry) => s?.structural === "Structural" },
  { id: "cosmetic",   label: "Cosmetic / fairing",  match: (s: TechSpecEntry) => s?.structural === "Cosmetic" },
  { id: "thin",       label: "Thin section",        match: (s: TechSpecEntry) => { const max = parseInt(s?.repairDepth?.split("–").pop() ?? "99"); return max <= 15; } },
  { id: "deep",       label: "Deep section",        match: (s: TechSpecEntry) => { const max = parseInt(s?.repairDepth?.split("–").pop() ?? "0"); return max >= 40; } },
] as const;

type FilterId = typeof FILTER_DEFS[number]["id"];

// ── Procurement link ──────────────────────────────────────────────────────────

function ProcurementLink({ r }: { r: RetailerPrice }) {
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs transition hover:border-slate-300"
    >
      <span className="font-semibold text-slate-700">{r.name}</span>
      <span className="flex items-center gap-1 text-slate-500">
        {r.price} <ExternalLink size={9} className="text-slate-300" />
      </span>
    </a>
  );
}

// ── Individual product card ───────────────────────────────────────────────────

function ProductCardUI({
  card,
  catSlug,
  advantages,
  disadvantages,
}: {
  card: ProductCard;
  catSlug: string;
  advantages: string[];
  disadvantages: string[];
}) {
  const categoryKey = `${card.brandKey}_${catSlug}`;
  const retailers: RetailerPrice[] = RETAILER_PRICES[categoryKey] ?? [];
  const supplier = BRAND_SUPPLIERS[card.brandKey];
  const specificTdsUrl = PRODUCT_TDS_URLS[card.productName] ?? null;
  const cardEnrichment = PRODUCT_CARD_ENRICHMENT[card.productName];
  const cardAdvantages = cardEnrichment?.advantages ?? advantages;
  const cardDisadvantages = cardEnrichment?.disadvantages ?? disadvantages;
  const techSpecs = PRODUCT_TECH_SPECS[card.productName] ?? null;
  const accentColor = BRAND_ACCENT[card.brandKey] ?? "#94a3b8";

  const hasProcurement = supplier || retailers.length > 0;

  return (
    <div
      className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >

      {/* ── Header ── */}
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            {card.fullLabel}
          </span>
          <div className="flex shrink-0 items-center gap-1">
            {specificTdsUrl && (
              <a
                href={specificTdsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
              >
                <FileText size={9} /> TDS
              </a>
            )}
            <a
              href={card.tdsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
            >
              <ExternalLink size={9} /> Brand Site
            </a>
          </div>
        </div>
        <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{card.productName}</h3>
        {card.description && (
          <p className="mt-1 text-xs leading-5 text-slate-500">{card.description}</p>
        )}
      </div>

      {/* ── Tech spec chips ── */}
      {techSpecs && (
        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
          {techSpecs.enClass && (
            <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold text-sky-800">
              {techSpecs.enClass}
            </span>
          )}
          {techSpecs.repairDepth && (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
              {techSpecs.repairDepth}
            </span>
          )}
          {techSpecs.orientation && (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
              {techSpecs.orientation}
            </span>
          )}
          {techSpecs.structural && (
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
              {techSpecs.structural}
            </span>
          )}
          {techSpecs.fibreReinforced && (
            <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
              Fibre reinforced
            </span>
          )}
        </div>
      )}

      {/* ── System Description (was "About This Product") ── */}
      {card.notes && (
        <div className="px-5 py-4 bg-sky-50 border-b border-sky-100">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
          <p className="text-xs leading-6 text-slate-700">
            {card.notes}
          </p>
        </div>
      )}

      {/* ── Technical Properties & Limitations ── */}
      {(cardAdvantages.length > 0 || cardDisadvantages.length > 0) && (
        <div className="space-y-3 px-5 py-4">
          {cardAdvantages.length > 0 && (
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
              <ul className="space-y-1.5">
                {cardAdvantages.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                    <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cardDisadvantages.length > 0 && (
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
              <ul className="space-y-1.5">
                {cardDisadvantages.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                    <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── Procurement Sources ── */}
      {hasProcurement && (
        <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
          <div className="space-y-2">
            {supplier && (
              <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
                <a
                  href={supplier.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                >
                  {supplier.name}
                  <ExternalLink size={9} className="text-slate-300" />
                </a>
                <span className="text-slate-400">(Trade supply — contact for current pricing)</span>
              </div>
            )}
            {retailers.map((r) => (
              <ProcurementLink key={r.name} r={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Filter chips ──────────────────────────────────────────────────────────────

function FilterChips({
  cards,
  activeFilters,
  onToggle,
  onClear,
}: {
  cards: ProductCard[];
  activeFilters: Set<FilterId>;
  onToggle: (id: FilterId) => void;
  onClear: () => void;
}) {
  // Only show filters that match at least one card
  const visibleFilters = FILTER_DEFS.filter((f) =>
    cards.some((card) => {
      const specs = PRODUCT_TECH_SPECS[card.productName] ?? null;
      return f.match(specs);
    })
  );

  if (visibleFilters.length === 0) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-slate-500 shrink-0">Filter by:</span>
      {visibleFilters.map((f) => {
        const active = activeFilters.has(f.id);
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onToggle(f.id)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              active
                ? "border-sky-950 bg-sky-950 text-white"
                : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
            }`}
          >
            {f.label}
          </button>
        );
      })}
      {activeFilters.size > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-slate-400 underline hover:text-slate-600"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

// ── Product grid with horizontal scroll (3 visible) ───────────────────────────

export function ProductGrid({
  materials,
  catSlug,
  advantages,
  disadvantages,
}: {
  materials: MaterialRow[];
  catSlug: string;
  advantages: string[];
  disadvantages: string[];
}) {
  const allCards = buildCards(materials);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilters, setActiveFilters] = useState<Set<FilterId>>(new Set());

  if (!allCards.length) return <p className="text-sm text-slate-400">No product data available.</p>;

  const toggleFilter = (id: FilterId) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set());

  // Cards with no PRODUCT_TECH_SPECS entry are always shown; others must pass all active filters
  const cards = activeFilters.size === 0
    ? allCards
    : allCards.filter((card) => {
        const specs = PRODUCT_TECH_SPECS[card.productName] ?? null;
        if (specs === null) return true; // no specs entry — always show
        return Array.from(activeFilters).every((filterId) => {
          const def = FILTER_DEFS.find((f) => f.id === filterId);
          return def ? def.match(specs) : true;
        });
      });

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <div>
      {/* Filter chips */}
      <FilterChips
        cards={allCards}
        activeFilters={activeFilters}
        onToggle={toggleFilter}
        onClear={clearFilters}
      />

      {/* Navigation row */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">
          {cards.length} product{cards.length !== 1 ? "s" : ""} — 3 visible, scroll for more brands
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Scrollable row — exactly 3 cards visible */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex-none"
            style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
          >
            <ProductCardUI
              card={card}
              catSlug={catSlug}
              advantages={advantages}
              disadvantages={disadvantages}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Technical Accordion ───────────────────────────────────────────────────────

interface TechInfo {
  typicalApplications: string[];
  selectionCriteria: string[];
  limitations: string[];
  standardsNotes: string[];
  suitableDefects: string[];
  typicalSubstrates: string[];
}

function TechCard({
  icon,
  title,
  items,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {icon}
        </div>
        <h3 className="text-sm font-extrabold text-sky-950">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">
            {style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}
            {style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}
            {style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechnicalAccordionClient({ techInfo }: { techInfo: TechInfo }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
      >
        <div>
          <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
          <p className="mt-0.5 text-xs text-slate-500">
            Applications, selection criteria, limitations, standards, suitable defects and substrates
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
          {open ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-100 px-7 pb-7 pt-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <TechCard icon={<Layers size={15} />} title="Typical Applications" items={techInfo.typicalApplications} style="bullet" />
            <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={techInfo.selectionCriteria} style="check" />
            <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={techInfo.limitations} style="warn" />
            <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={techInfo.standardsNotes} style="bullet" />
            <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={techInfo.suitableDefects} style="check" />
            <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={techInfo.typicalSubstrates} style="bullet" />
          </div>
        </div>
      )}
    </div>
  );
}
