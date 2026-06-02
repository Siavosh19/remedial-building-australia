"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Skylight"
  | "Fixed"
  | "Double-glazed"
  | "Aluminium"
  | "Glass"
  | "Flashing-kit"
  | "Tiled-roof"
  | "Energy-rated";

type Product = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Velux",
    brandUrl: "https://www.velux.com.au",
    tdsUrl: "https://www.velux.com.au/products/roof-windows-skylights",
    accentColor: "#ef4444",
    name: "Velux GGL Fixed Deck-Mounted Skylight",
    descriptionLine: "Fixed deck-mounted double-glazed roof window for installation in pitched tiled roofs — factory-sealed double glazing, aluminium frame with pre-fitted flashing",
    productType: "Fixed double-glazed roof window — tiled roof",
    filterTags: ["Skylight", "Fixed", "Double-glazed", "Aluminium", "Glass", "Tiled-roof", "Energy-rated"],
    techChips: [
      { label: "Fixed double-glazed", cls: "bg-sky-100 text-sky-800" },
      { label: "Deck-mounted", cls: "bg-slate-100 text-slate-700" },
      { label: "Aluminium frame", cls: "bg-slate-100 text-slate-700" },
      { label: "Tiled roof", cls: "bg-slate-100 text-slate-700" },
      { label: "Energy-rated", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Velux GGL is a fixed deck-mounted double-glazed roof window designed for installation in pitched tiled roofs. The unit is factory-sealed with a double-glazed insulating glass unit set within an aluminium frame, and supplied with a pre-fitted EDZ profile-specific flashing kit that integrates with the tile course. The GGL is the benchmark fixed skylight product used in Australian residential and Class 2 strata buildings where daylighting without ventilation is required and long-term maintenance-free performance is the primary design objective.\n\nThe GGL range is available in a standard size range. Selection of the correct size requires measurement of the rafter spacing and tile profile before ordering. The pre-fitted flashing integrates with the deck of the roof window unit — the EDZ flashing kit is ordered separately and must match the tile profile of the roof.",
    technicalProperties: [
      "Fixed double-glazed insulating glass unit — factory-sealed — reduces condensation risk and improves thermal performance relative to single-glazed units",
      "Aluminium frame — corrosion resistant — suitable for Australian coastal and inland climates",
      "Deck-mounted installation — integrates with roof tile course via profile-specific EDZ flashing kit",
      "Energy-rated glazing — check SHGC and U-value against NCC Section J climate zone requirements before specifying",
      "Available in standard size range — confirm rafter spacing and opening dimensions before ordering",
    ],
    limitations: [
      "Fixed unit only — no ventilation — do not specify where opening for natural ventilation is required",
      "Correct EDZ flashing kit must be specified separately and must match the tile profile of the roof — incorrect flashing kit will result in water ingress",
      "If installation requires cutting of roof rafters, a structural engineer must be consulted before proceeding",
      "Glazing energy performance must be confirmed against NCC Section J SHGC and U-value requirements for the project climate zone",
      "Confirm current product specification and compliance with Velux before specifying",
    ],
    procurementSources: [
      { name: "Velux Australia — trade supply — contact for current pricing and sizing", url: "https://www.velux.com.au" },
      { name: "Roofing trade suppliers nationally — confirm stock and sizing", url: "https://www.velux.com.au" },
      { name: "Bunnings — selected sizes available in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Velux",
    brandUrl: "https://www.velux.com.au",
    tdsUrl: "https://www.velux.com.au/products/flashing",
    accentColor: "#3b82f6",
    name: "Velux EDZ Flashing Kit",
    descriptionLine: "Profile-specific aluminium flashing kit for Velux GGL skylights installed in tiled pitched roofs — includes sill, side and top flashings",
    productType: "Aluminium flashing kit for Velux skylights — pitched tiled roofs",
    filterTags: ["Flashing-kit", "Aluminium", "Tiled-roof", "Skylight"],
    techChips: [
      { label: "Aluminium flashing", cls: "bg-sky-100 text-sky-800" },
      { label: "Profile-specific", cls: "bg-slate-100 text-slate-700" },
      { label: "Tiled roof", cls: "bg-slate-100 text-slate-700" },
      { label: "Skylight accessory", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Velux EDZ is a profile-specific aluminium flashing kit designed for installation of Velux GGL fixed roof windows in pitched tiled roofs. The EDZ kit includes sill, side and top flashings that are pre-formed to integrate with the tile course and the deck of the GGL roof window unit. The flashing kit must be selected to match the tile profile of the roof — Velux supply EDZ kits for a range of standard Australian tile profiles including flat, low profile, medium profile and high profile tiles.\n\nThe EDZ flashing kit is ordered separately from the GGL roof window unit. Correct flashing selection is critical — an incorrectly specified flashing kit that does not match the tile profile will result in water ingress at the tile/skylight junction. Confirm the tile profile and the correct EDZ variant with Velux before ordering.",
    technicalProperties: [
      "Profile-specific aluminium construction — pre-formed to integrate with the tile course at the skylight perimeter",
      "Includes sill, side and top flashings — complete perimeter flashing coverage for the GGL installation",
      "Must be selected to match the specific tile profile of the roof — available for flat, low, medium and high profile tiles",
      "Designed for use with Velux GGL fixed deck-mounted roof windows — confirm compatibility with the specific GGL size before ordering",
      "Aluminium construction — corrosion resistant — suitable for Australian residential and Class 2 strata building environments",
    ],
    limitations: [
      "Must be ordered to match the tile profile of the roof — incorrect profile selection will result in water ingress",
      "Not interchangeable between different GGL sizes — confirm the correct EDZ variant for the specific GGL unit size",
      "Correct integration with the tile course requires experienced roofing installation — do not attempt installation without roofing trade experience",
      "Flashing performance depends on correct integration with both the GGL deck and the tile course — inspect all junctions after installation",
      "Confirm current product specification and compliance with Velux before specifying",
    ],
    procurementSources: [
      { name: "Velux Australia — trade supply — order with matching GGL unit", url: "https://www.velux.com.au" },
      { name: "Roofing trade suppliers nationally — confirm stock", url: "https://www.velux.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Skylight", label: "Skylight" },
  { id: "Fixed", label: "Fixed" },
  { id: "Double-glazed", label: "Double-glazed" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Glass", label: "Glass" },
  { id: "Flashing-kit", label: "Flashing-kit" },
  { id: "Tiled-roof", label: "Tiled-roof" },
  { id: "Energy-rated", label: "Energy-rated" },
];

const BRAND_EQUIV: { system: string; velux: string }[] = [
  { system: "Fixed double-glazed skylight", velux: "GGL Fixed Roof Window" },
  { system: "Profile-specific flashing kit", velux: "EDZ Flashing Kit" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  glazing: string;
  frameColor: string;
  pitchRange: string;
  primaryUse: string;
}[] = [
  {
    product: "Velux GGL Fixed Deck-Mounted Skylight",
    brand: "Velux",
    type: "Fixed roof window",
    glazing: "Double-glazed (factory-sealed IGU)",
    frameColor: "White painted pine / aluminium",
    pitchRange: "15°–90° (confirm with Velux TDS)",
    primaryUse: "Daylighting in pitched tiled roofs — Class 2 strata and residential",
  },
  {
    product: "Velux EDZ Flashing Kit",
    brand: "Velux",
    type: "Aluminium flashing kit",
    glazing: "N/A",
    frameColor: "Aluminium (mill finish)",
    pitchRange: "Match to GGL unit and tile profile",
    primaryUse: "Weatherproofing the GGL/tile junction in pitched tiled roofs",
  },
];

/* ── Collapsible helpers ── */

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
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

export function SkylightIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are skylight replacement systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Skylights in residential and Class 2 strata buildings fail through UV degradation of glazing seals and frame finishes, gasket failure at the glass-to-frame junction, breakage of single-glazed units, and condensation within the glazing cavity of sealed double-glazed units. Failed units allow water ingress directly through the roof plane, which can cause significant internal damage before the source is identified. Replacement of a failed skylight requires removal of the existing unit and flashing, preparation of the opening, and installation of a new deck-mounted unit with a profile-specific flashing kit matched to the tile course.
        </p>
        <p>
          For Class 2 strata apartment buildings, fixed double-glazed skylights are the preferred replacement product. Fixed units eliminate the mechanical complexity and ongoing maintenance liability of opening mechanisms, while factory-sealed double-glazed units provide improved thermal performance and reduced condensation risk compared with single-glazed replacements. Glazing selection must satisfy NCC Section J energy efficiency requirements for SHGC and U-value in the relevant climate zone — this is particularly relevant in climate zones with high solar heat gain or heating loads.
        </p>
        <p>
          The flashing kit is the critical waterproofing interface between the skylight unit and the roof tile course. Profile-specific flashing kits are pre-formed to the geometry of the tile profile — flat, low, medium or high profile — and must be ordered to match the specific tile type on the roof. Use of an incorrect or generic flashing kit that does not conform to the tile profile will result in water ingress at the tile/skylight junction. The flashing kit is ordered separately from the skylight unit and must be confirmed against the tile profile before ordering.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Roof access hatches — provide physical access through the roof, not daylighting — different product category",
              "Solar tubes / tubular daylight devices (TDDs) — transfer diffuse daylight via a reflective tube — not a replacement for a fixed glazed skylight",
              "Flat roof skylights — fixed dome or pyramid skylights for flat or near-flat roofs — not pitched tiled roof products and not covered by the same flashing systems",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-xs leading-5 text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SkylightProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleProducts =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard
                icon={<Layers size={15} />}
                title="Typical Applications"
                items={[
                  "Replacement of failed or degraded skylights in pitched tiled roofs of Class 2 strata apartment buildings",
                  "Replacement of single-glazed skylights with double-glazed units for improved thermal performance and condensation control",
                  "Replacement of failed or leaking skylights where water ingress is occurring through the roof plane",
                  "Upgrade of obsolete skylight units no longer supported by the manufacturer with current flashing systems",
                  "New skylight installations in pitched tiled roofs where structural engineering has confirmed rafter cutting is acceptable",
                ]}
                style="bullet"
              />
              <TechCard
                icon={<Ruler size={15} />}
                title="Selection Criteria"
                items={[
                  "Measure rafter spacing and existing opening before ordering — GGL units are available in a standard size range and must fit within the structural opening",
                  "Confirm tile profile before ordering the EDZ flashing kit — profile-specific kits are non-interchangeable between flat, low, medium and high profile tiles",
                  "Check glazing SHGC and U-value against NCC Section J requirements for the project climate zone before specifying",
                  "Select fixed unit for Class 2 strata where maintenance-free operation is the primary requirement — opening units add mechanical complexity",
                  "Confirm the roof pitch is within the manufacturer's specified pitch range for the selected unit",
                ]}
                style="check"
              />
              <TechCard
                icon={<AlertTriangle size={15} />}
                title="Limitations"
                items={[
                  "Cutting of rafters requires structural engineering review before proceeding — do not cut structural members without engineer approval",
                  "Flashing kit must match the tile profile — an incorrect or generic flashing will result in water ingress at the tile/skylight junction",
                  "Fixed units provide daylighting only — no natural ventilation — confirm this meets the ventilation requirements of the space",
                  "Glazing energy performance must be confirmed against NCC Section J for the climate zone — not all glazing options are compliant in all zones",
                  "Skylight installation should be undertaken by an experienced roofing contractor — incorrect tile integration leads to water ingress",
                ]}
                style="warn"
              />
              <TechCard
                icon={<BookOpen size={15} />}
                title="Standards & Compliance"
                items={[
                  "NCC Section J — Energy Efficiency — glazing SHGC and U-value requirements must be confirmed for the project climate zone",
                  "AS 2047 — Windows and External Glazed Doors in Buildings — applicable to skylight glazed units",
                  "NCC Volume One — structural requirements for openings in roof construction — consult engineer if rafters require cutting",
                  "Manufacturer installation instructions — must be followed for product warranty and weatherproofing performance",
                ]}
                style="bullet"
              />
              <TechCard
                icon={<CheckCircle size={15} />}
                title="Suitable Defects"
                items={[
                  "Failed or cracked skylight glazing allowing water ingress through the roof plane",
                  "UV-degraded or broken glazing seals on single or double-glazed skylight units",
                  "Corroded or deformed aluminium skylight frames preventing proper sealing",
                  "Failed or incorrectly specified flashing allowing water ingress at the tile/skylight junction",
                ]}
                style="check"
              />
              <TechCard
                icon={<SquareStack size={15} />}
                title="Typical Substrates"
                items={[
                  "Pitched tiled roofs — concrete or terracotta tiles — standard domestic roof construction in Australian Class 2 strata buildings",
                  "Timber rafter roof structure — standard construction for residential and low-rise strata apartment buildings",
                  "Existing skylight opening — typically trimmed with timber framing between rafters",
                ]}
                style="bullet"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">2 products — 1 brand — skylight replacement systems — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

                {/* Technical Properties & Limitations */}
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <CollapsibleList items={product.technicalProperties} icon="check" limit={3} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList items={product.limitations} icon="x" limit={3} />
                  </div>
                </div>

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of skylight replacement products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Glazing</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Frame colour</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Pitch range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.glazing}</td>
                  <td className="px-4 py-3 text-slate-600">{row.frameColor}</td>
                  <td className="px-4 py-3 text-slate-600">{row.pitchRange}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Skylight system types and the Velux product name for each — used in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Velux</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  <td className="px-4 py-3 text-slate-600">{row.velux === "—" ? <span className="text-slate-300">—</span> : row.velux}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callouts — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">NCC energy and weathering compliance</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Skylight glazing must meet NCC Section J energy efficiency requirements — check SHGC and U-value against climate zone before specifying any replacement unit",
            "Skylight opening must not reduce required roof structural integrity — consult a structural engineer if rafters require cutting to form or enlarge the opening",
            "Flashing kit must match the specific tile profile — profile-specific kits prevent water ingress at the tile/skylight junction — generic or incorrect flashings will fail",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
