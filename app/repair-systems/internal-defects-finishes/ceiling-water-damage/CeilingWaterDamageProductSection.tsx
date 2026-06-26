"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import { DataNote } from "@/app/repair-systems/_components/ProductPageShared";

type FilterTag =
  | "Primer"
  | "Stain-blocking"
  | "Mould-resistant"
  | "Water-based"
  | "Ceiling"
  | "Interior"
  | "Paint"
  | "Low-sheen"
  | "Plasterboard";

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
  dataNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux",
    brandUrl: "https://www.dulux.com.au",
    accentColor: "#ef4444",
    name: "Dulux 1Step Prep Water Based Primer, Sealer & Undercoat",
    descriptionLine: "Water-based primer, sealer and undercoat with stain-blocking for tannin and water stains on plasterboard ceilings before top-coat repainting",
    productType: "Water-based primer sealer — stain blocking for water-damaged ceilings",
    filterTags: ["Primer", "Stain-blocking", "Water-based", "Ceiling", "Interior", "Plasterboard"],
    techChips: [
      { label: "Water-based primer sealer", cls: "bg-sky-100 text-sky-800" },
      { label: "Stain-blocking", cls: "bg-red-50 text-red-700" },
      { label: "Interior ceiling", cls: "bg-slate-100 text-slate-700" },
      { label: "Plasterboard", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Dulux 1Step Prep Water Based Primer, Sealer & Undercoat is a water-based primer sealer designed for sealing water stains, tannin bleed, and smoke stains on interior ceiling and wall surfaces before repainting. Applied by roller or brush to plasterboard and previously painted ceilings following water damage repair. Provides a sealed, uniform base for subsequent topcoat application and prevents stain bleed-through that occurs when water-damaged surfaces are repainted without a stain-blocking primer. Features mould-resistant formulation.\n\nApplied to ceilings that have been confirmed dry following rectification of the source of water ingress. Confirm current product designation and availability with Dulux Australia — product names and formulations are subject to periodic revision.",
    technicalProperties: [
      "Water-based formulation — low VOC — suitable for interior ceiling application with low odour",
      "Stain-blocking properties — seals water stains, tannin bleed and smoke marks on plasterboard ceilings before repainting",
      "Suitable for plasterboard, previously painted surfaces, and most interior ceiling substrates",
      "Fast-drying water-based formula — reduced recoat time compared with solvent-based stain blockers",
      "Compatible with Dulux water-based topcoat systems — confirm compatibility with intended finish coat before application",
    ],
    limitations: [
      "Ceiling must be confirmed fully dry before application — do not apply over damp or wet plasterboard",
      "Does not address the source of water ingress — primer treatment is a cosmetic repair only; source must be rectified first",
      "Severely water-damaged, swollen, or delaminated plasterboard must be replaced before priming",
      "Stain-blocking performance varies with stain severity — heavily yellowed or recurring stains may require multiple coats",
      "Confirm current product specification and compliance with Dulux before specifying",
    ],
    procurementSources: [
      { name: "Dulux Trade — trade supply nationally — contact for current pricing", url: "https://www.dulux.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Dulux Trade Centres — specialist trade supply", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Taubmans",
    brandUrl: "https://www.taubmans.com.au",
    accentColor: "#3b82f6",
    name: "Taubmans Moisture Shield Interior Paint",
    descriptionLine:
      "Premium water-based interior paint with a built-in mould inhibitor for ceilings and walls in wet-area-adjacent rooms and high-humidity environments",
    productType: "Mould-inhibiting interior ceiling and wall paint",
    dataNote: "Owner to confirm — the product name 'Taubmans Moisture Shield Interior Paint' could not be verified on the current Taubmans Australia website. Taubmans does offer interior paints for high-humidity environments; confirm the correct current product name, colour range, sheen options and specification with Taubmans Australia before publishing.",
    filterTags: ["Paint", "Mould-resistant", "Water-based", "Ceiling", "Interior", "Low-sheen"],
    techChips: [
      { label: "Mould-resistant paint", cls: "bg-sky-100 text-sky-800" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Interior ceiling", cls: "bg-slate-100 text-slate-700" },
      { label: "Low-sheen", cls: "bg-green-50 text-green-700" },
      { label: "Mould inhibitor", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — the product name 'Taubmans Moisture Shield Interior Paint' could not be verified on the current Taubmans Australia website. Taubmans does offer interior paints for high-humidity environments — confirm the current correct product name and specification with Taubmans Australia before specifying. A premium water-based interior paint formulated with a built-in mould inhibitor for application on ceilings and walls in wet-area-adjacent rooms and high-humidity environments.\n\nApply over a suitable primer-sealer following water damage repair to plasterboard ceilings. Confirm current colour range, sheen level options, and product designation with Taubmans before specifying.",
    technicalProperties: [
      "Built-in mould inhibitor — active mould resistance for interior ceiling and wall applications in high-humidity environments",
      "Water-based formulation — low odour, low VOC — suitable for occupied residential buildings",
      "Low-sheen finish — appropriate for ceiling application and wet-area-adjacent walls in strata apartments",
      "Premium durability formulation — washable and scrubbable finish resists moisture and humidity",
      "Suitable for application over primed plasterboard ceilings following water damage repair and drying",
    ],
    limitations: [
      "Mould inhibitor does not address persistent moisture problems — if water ingress recurs, mould will regrow regardless of paint system",
      "Apply only over fully dry, primed ceilings — do not apply directly to bare or water-stained plasterboard without a stain-blocking primer",
      "Not a substitute for waterproofing — ceiling paint does not prevent water ingress from above",
      "If mould penetration is deep within plasterboard substrate, surface paint will not eliminate the problem — replacement may be required",
      "Confirm current product specification and compliance with Taubmans before specifying",
    ],
    procurementSources: [
      { name: "Taubmans Trade — trade supply nationally — contact for current pricing", url: "https://www.taubmans.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Primer", label: "Primer" },
  { id: "Stain-blocking", label: "Stain-blocking" },
  { id: "Mould-resistant", label: "Mould-resistant" },
  { id: "Water-based", label: "Water-based" },
  { id: "Ceiling", label: "Ceiling" },
  { id: "Interior", label: "Interior" },
  { id: "Paint", label: "Paint" },
  { id: "Low-sheen", label: "Low-sheen" },
  { id: "Plasterboard", label: "Plasterboard" },
];

const BRAND_EQUIV: { system: string; dulux: string; taubmans: string }[] = [
  { system: "Water stain primer/sealer", dulux: "1Step Prep Primer Sealer", taubmans: "—" },
  { system: "Mould-resistant ceiling paint", dulux: "—", taubmans: "TODO: confirm product name" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  mouldResist: string;
  coats: string;
  substrate: string;
  primaryUse: string;
}[] = [
  {
    product: "1Step Prep Water Based Primer Sealer",
    brand: "Dulux",
    type: "Primer sealer",
    mouldResist: "Mould resistant formulation",
    coats: "1–2 coats primer",
    substrate: "Plasterboard, previously painted",
    primaryUse: "Stain-blocking primer — water stains and tannin bleed before topcoat",
  },
  {
    product: "TODO: confirm — Taubmans mould-resistant interior paint",
    brand: "Taubmans",
    type: "Interior topcoat",
    mouldResist: "Active inhibitor",
    coats: "2 coats topcoat",
    substrate: "Primed plasterboard, interior ceilings",
    primaryUse: "Mould-resistant ceiling and wall paint — wet-area-adjacent rooms",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Plasterboard ceilings with water stain and tannin bleed following leak from above — stain-blocking primer before repainting",
    "Bathroom and laundry ceilings showing mould regrowth following water damage — mould-resistant topcoat after rectification",
    "Ceilings above wet areas in Class 2 strata apartments — ongoing mould-resistant finish in high-humidity environments",
    "Kitchen and living area ceilings with old water stain rings from historical or rectified leaks",
    "Ceiling plasterboard that has been patched and skimmed following water damage repair — full prime and repaint",
  ],
  selectionCriteria: [
    "Always use a stain-blocking primer before applying topcoat over water-stained ceilings — without primer, stains bleed through",
    "Select mould-inhibiting topcoat for ceilings in bathrooms, laundries, and wet-area-adjacent spaces",
    "Confirm moisture content of plasterboard with a moisture meter before priming — do not apply over damp substrate",
    "Confirm whether plasterboard requires replacement (swollen, crumbling, delaminated) before attempting a paint repair",
    "Confirm sheen level is appropriate for ceiling application — ceiling white and low-sheen are standard for Class 2 residential ceilings",
  ],
  limitations: [
    "Paint treatment addresses cosmetic damage only — source of water ingress must be rectified before any paint treatment",
    "Structurally compromised plasterboard (swollen, delaminated, crumbling) requires replacement, not painting",
    "Mould-resistant paint inhibits surface mould but does not address deep substrate contamination",
    "Multiple coats of stain-blocking primer may be required for heavily stained or recurring water damage",
    "Topcoat colour must be agreed with building owner and strata manager — ceiling colour matching may require full ceiling repaint",
  ],
  standardsNotes: [
    "AS/NZS 1580 — Methods of test for paints and related materials — applicable to performance testing of interior ceiling paints",
    "AS 4858 — Wet area membranes — referenced for wet area waterproofing above ceilings that show water damage",
    "Confirm paint system meets strata manager and building manager requirements for colour matching and finish",
    "Confirm VOC limits comply with building occupancy requirements during application in occupied strata apartments",
  ],
  suitableDefects: [
    "Water stain rings and tannin bleed on plasterboard ceilings following roof, bathroom, or pipe leak from above",
    "Mould growth on ceiling surfaces in bathrooms, laundries, and kitchen areas of Class 2 strata apartments",
    "Discoloured or stained ceilings following historical water damage that has been rectified",
    "Ceiling plasterboard patches and repairs requiring full prime and repaint to match adjacent surfaces",
  ],
  typicalSubstrates: [
    "Plasterboard (gypsum wallboard) ceilings — standard substrate in Class 2 strata apartment buildings",
    "Previously painted ceiling surfaces — over existing water-based or oil-based paint finishes",
    "Skimmed and patched plasterboard — over filler and skim coat repairs following water damage",
    "Fibrous cement sheet ceiling substrates — confirm primer compatibility before application",
  ],
};

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

export function CeilingWaterDamageIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are ceiling water damage treatment systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Ceiling water damage in Class 2 strata apartment buildings occurs following water ingress from above — typically from bathroom or laundry leaks from the apartment above, roof or balcony waterproofing failure, or pipe leaks. The visible result on plasterboard ceilings is tannin and stain bleed-through, localised mould growth, plasterboard softening or swelling, and discolouration of existing paint finishes. Identification and rectification of the source of water ingress is mandatory before any paint treatment is attempted.
        </p>
        <p>
          Primer-sealer systems are required to block water stains and tannin before repainting. Water stains and tannin compounds in plasterboard bleed through standard topcoat paints unless a dedicated stain-blocking primer is applied first — without a stain-blocking primer, stains reappear through the finished coat regardless of the number of topcoat applications. A water-based stain-blocking primer must be applied to the affected ceiling area before any finish coat is applied over water-damaged plasterboard.
        </p>
        <p>
          Mould-resistant paint selection is important for ceilings in bathrooms, laundries, and wet-area-adjacent rooms where elevated humidity encourages mould regrowth. Standard interior paints without active mould inhibitors are prone to mould growth on ceilings in these environments. A paint system incorporating an active mould inhibitor is required for these locations — mould-resistant paint is not a substitute for ventilation improvement or waterproofing rectification, but provides meaningful ongoing surface mould resistance in humid residential environments.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Plasterboard replacement — structurally damaged plasterboard (swollen, delaminated, crumbling) requires full replacement, not painting over",
              "Waterproofing above — ceiling paint treatment does not fix the source of water ingress; a waterproofing repair above is always required first",
              "External coating — exterior paint and coating systems are not suitable for interior ceiling applications",
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

export function CeilingWaterDamageProductSection() {
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
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — ceiling water damage treatment systems — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3 space-y-2">
                  {product.dataNote && <DataNote text={product.dataNote} />}
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of ceiling water damage treatment products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Mould resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Coats</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.mouldResist}</td>
                  <td className="px-4 py-3 text-slate-600">{row.coats}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substrate}</td>
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
            <p className="mt-1 text-sm text-slate-500">Ceiling water damage treatment equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Dulux</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Taubmans</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.dulux, row.taubmans].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
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
          <h3 className="text-base font-extrabold text-amber-900">Rectify the source before repainting</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Ceiling water damage paint treatment does not address the cause — the source of water ingress must be confirmed, investigated and rectified first before any paint treatment is applied",
            "If plasterboard is structurally damaged (swollen, delaminated, crumbling) it must be replaced — painting over damaged board is not acceptable and will not produce a satisfactory or durable result",
            "Allow the ceiling to fully dry before priming — moisture content should be confirmed with a moisture meter before application of primer or topcoat",
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
