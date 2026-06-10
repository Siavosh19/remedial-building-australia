"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Capral"
  | "Metalcraft"
  | "Stramit"
  | "Powder-coat"
  | "Colorbond"
  | "Colour-match"
  | "National"
  | "AS-3700"
  | "AS-4506"
  | "Custom-colour"
  | "Cut-to-length";

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
    fullLabel: "Capral Aluminium",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#0369a1",
    name: "Capral Powder Coated Aluminium Cavity Flashing Strip",
    descriptionLine: "Factory powder coated 1.2–2.0mm aluminium flashing strip in standard Dulux or custom colours — national distribution via Capral branch network",
    productType: "Powder coated aluminium flashing strip — custom colour range",
    filterTags: ["Capral", "Powder-coat", "Colour-match", "National", "AS-3700", "AS-4506", "Custom-colour"],
    techChips: [
      { label: "1100-H14 / 3003-H14", cls: "bg-sky-100 text-sky-800" },
      { label: "1.2–2.0mm", cls: "bg-slate-100 text-slate-700" },
      { label: "60 micron min coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Custom colours", cls: "bg-green-50 text-green-700" },
      { label: "National distribution", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Capral supplies powder coated aluminium flashing strip coated in-house or through approved coating partners. Available in standard Dulux Powder range or colour-matched to project specification. 1.2mm standard; 1.6mm and 2.0mm for parapets and heavy-duty applications. Slit and cut to size on request. Coating applied factory-fresh before cutting — cut ends must be touched up on site with a compatible zinc-rich primer before enclosure in masonry. Confirm current colour range, minimum order quantities for custom colours, and lead times with local Capral branch before specifying.",
    technicalProperties: [
      "Alloy: 1100-H14 / 3003-H14 — standard powder coat substrate grades",
      "Thickness: 1.2mm, 1.6mm, 2.0mm — confirm minimum 1.2mm for structural applications with engineer",
      "Coat thickness: 60 micron minimum DFT per AS 4506 thermosetting powder coat",
      "Colour range: standard Dulux Powder range or custom colour-match — minimum order quantities for non-standard colours",
      "Width: 150–450mm — slit to order",
      "Lengths: 2.4m, 3.0m, 6.0m standard",
      "Cut ends: touch-up with compatible zinc-rich primer required after cutting",
      "Supply form: strip or sheet — cut to size available on request",
    ],
    limitations: [
      "Cut ends must be touched up with compatible zinc-rich primer before enclosure in masonry — factory coating does not cover cut faces",
      "Colour availability subject to minimum order quantities for non-standard colours — confirm with Capral before specifying",
      "Lead time for custom colours — allow 2–4 weeks minimum from order confirmation",
    ],
    procurementSources: [
      { name: "Capral Aluminium branches — national distribution", url: "https://www.capral.com.au" },
      { name: "Approved aluminium distributors — confirm local availability with Capral", url: "https://www.capral.com.au" },
    ],
  },
  {
    fullLabel: "Metalcraft Industries",
    brandUrl: "https://www.metalcraft.com.au",
    accentColor: "#b45309",
    name: "Metalcraft Powder Coated Aluminium Flashing Strip",
    descriptionLine: "Powder coated aluminium flashing strip in Colorbond standard colour range — cut-to-length service available from Metalcraft fabrication network",
    productType: "Powder coated aluminium flashing strip — Colorbond colour range",
    filterTags: ["Metalcraft", "Powder-coat", "Colorbond", "Colour-match", "National", "AS-3700", "Cut-to-length"],
    techChips: [
      { label: "3003-H14", cls: "bg-amber-100 text-amber-800" },
      { label: "1.2–1.6mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Colorbond range", cls: "bg-slate-100 text-slate-700" },
      { label: "Cut to length", cls: "bg-green-50 text-green-700" },
      { label: "National", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Metalcraft supplies powder coated aluminium flashing strip coated in Colorbond or Dulux Powder colours for applications where the flashing face is exposed at the wall. Pre-cut to project lengths available. Suitable for standard residential remedial flashing replacement and new cavity construction where colour-match to the facade or Colorbond roof is required. Confirm current colour range, cut-to-length minimum order quantities, and lead times with Metalcraft before scheduling installation.",
    technicalProperties: [
      "Alloy: 3003-H14 — standard powder coat substrate grade",
      "Thickness: 1.2mm, 1.6mm — 2.0mm not available in standard powder coated range",
      "Coat thickness: 60 micron minimum DFT",
      "Colour range: Colorbond standard range — custom colours not available through standard stock",
      "Width: 150–400mm standard",
      "Cut to length: yes — on request, minimum order may apply",
      "Cut ends: touch-up required after cutting",
      "Supply form: strip or pre-cut lengths",
    ],
    limitations: [
      "Colorbond colour range only — custom colours not available through standard Metalcraft stock",
      "Cut-to-length service requires minimum order — confirm with Metalcraft before scheduling",
      "Not available in 2.0mm powder coated finish through standard range — confirm with Metalcraft for heavy-duty applications",
    ],
    procurementSources: [
      { name: "Metalcraft Industries branches — national distribution", url: "https://www.metalcraft.com.au" },
      { name: "Building materials distributors nationally — confirm local Metalcraft availability", url: "https://www.metalcraft.com.au" },
    ],
  },
  {
    fullLabel: "Stramit Building Products",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#7c3aed",
    name: "Stramit Colour-Coated Flashing Strip",
    descriptionLine: "Colour-coated (Colorbond) aluminium and steel flashing strip for masonry cavity applications — widely available via Stramit and BlueScope distribution network",
    productType: "Colour-coated aluminium or Colorbond steel flashing strip",
    filterTags: ["Stramit", "Powder-coat", "Colorbond", "Colour-match", "National", "AS-3700"],
    techChips: [
      { label: "Colorbond finish", cls: "bg-violet-100 text-violet-800" },
      { label: "1.2mm standard (Al)", cls: "bg-slate-100 text-slate-700" },
      { label: "Full Colorbond range", cls: "bg-slate-100 text-slate-700" },
      { label: "Steel or aluminium substrate", cls: "bg-amber-50 text-amber-700" },
      { label: "National", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Stramit supplies colour-coated flashing strip in both Colorbond-steel and aluminium substrate options. Confirm aluminium alloy substrate when ordering — some products are Colorbond-coated steel rather than aluminium. Suitable for exposed cavity applications where colour coordination with the roof or facade is required. Steel-substrate products are not equivalent to aluminium for structural cavity flashing — confirm substrate material with Stramit before ordering. Confirm current product range, substrate options, coating thickness, and minimum order with local Stramit branch.",
    technicalProperties: [
      "Substrate: aluminium or Colorbond-coated steel — confirm substrate material when ordering",
      "Thickness: 0.55mm (steel substrate) / 1.2mm (aluminium substrate)",
      "Coating: Colorbond PVDF or powder coat — confirm coating type and DFT with Stramit",
      "Colour range: full Colorbond range available",
      "Width: standard widths 150–300mm",
      "Distribution: Stramit / BlueScope national supply network",
      "Cut ends: touch-up required after cutting",
      "Supply form: coil or cut lengths",
    ],
    limitations: [
      "Confirm substrate material — steel-substrate products are not equivalent to aluminium for masonry cavity flashing and have different corrosion properties",
      "Thinner steel-substrate products (0.55mm) are not suitable for high-load or parapet applications requiring 1.2mm minimum aluminium",
      "Colour fading on PVDF coating after extended UV exposure — confirm warranty period and fade rating with Stramit before specifying",
    ],
    procurementSources: [
      { name: "Stramit Building Products branches — national", url: "https://www.stramit.com.au" },
      { name: "BlueScope Steel distributors nationally", url: "https://www.bluescopesteel.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Capral", label: "Capral" },
  { id: "Metalcraft", label: "Metalcraft" },
  { id: "Stramit", label: "Stramit" },
  { id: "Powder-coat", label: "Powder coat" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Colour-match", label: "Colour match" },
  { id: "National", label: "National supply" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "AS-4506", label: "AS 4506" },
  { id: "Custom-colour", label: "Custom colour" },
  { id: "Cut-to-length", label: "Cut to length" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  alloy: string;
  thickness: string;
  colourRange: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Capral Aluminium",
    product: "Powder Coat Strip",
    alloy: "1100-H14 / 3003-H14",
    thickness: "1.2–2.0mm",
    colourRange: "Dulux Powder / custom",
    distribution: "National — Capral branches",
    keyFeature: "Custom colour matching available",
    primaryUse: "Exposed flashing — colour-critical projects",
  },
  {
    supplier: "Metalcraft",
    product: "Powder Coat Flashing",
    alloy: "3003-H14",
    thickness: "1.2–1.6mm",
    colourRange: "Colorbond standard",
    distribution: "National — Metalcraft branches",
    keyFeature: "Cut-to-length service available",
    primaryUse: "Remedial flashing replacement — standard colours",
  },
  {
    supplier: "Stramit",
    product: "Colour-Coated Strip",
    alloy: "Aluminium or Colorbond steel",
    thickness: "0.55mm (steel) / 1.2mm (Al)",
    colourRange: "Full Colorbond range",
    distribution: "Stramit / BlueScope national",
    keyFeature: "Wide Colorbond colour availability",
    primaryUse: "Exposed cavity — colour-matched to Colorbond roof",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Exposed cavity flashing at wall face where colour-matching to the facade finish is required — sill, parapet, and spandrel installations",
    "Powder coated flashing at visible drip edge locations where mill finish oxidation is aesthetically unacceptable",
    "Parapet and window sill flashing replacement where the installed colour must coordinate with mortar, render, or facade cladding",
    "Semi-exposed cavity wall applications at Class 2 strata building facades in residential and commercial remediation",
  ],
  selectionCriteria: [
    "Select powder coat colour to match or complement the mortar or facade finish — confirm colour against physical sample before ordering",
    "Confirm coating thickness: minimum 60 micron DFT for AS 4506 powder coat — confirm with supplier before specifying",
    "Minimum 1.2mm aluminium thickness for standard cavities — 1.6mm for parapets and exposed ledges",
    "All-over factory coating required — cut ends must be touched up with compatible zinc-rich primer before enclosure",
  ],
  limitations: [
    "Powder coat finish is vulnerable to damage during handling and installation — abrasion and chipping at cut ends is common",
    "Scratched or chipped coating must be touched up with compatible zinc-rich primer before enclosure in masonry",
    "Not suitable where flashing will be permanently submerged or in continuous damp exposure without additional sealing",
    "Colour fading may occur on south-facing or UV-exposed elements after 10–15 years — confirm fade warranty with supplier",
  ],
  standardsNotes: [
    "AS 3700 Masonry Structures — flashing installation, lap, and weep former requirements",
    "AS 4506 — thermosetting powder coat — confirm coating specification and DFT with supplier",
    "AS/NZS 1734 — aluminium alloys — confirm alloy grade and temper with supplier",
  ],
  suitableDefects: [
    "Corroded or absent cavity flashing at base of cavity, parapet, or window sills where colour-match to the facade is required",
    "Mill finish aluminium replacement where oxidation at the exposed drip edge is aesthetically unacceptable",
    "Facade remediation projects requiring colour-coordinated flashing at visible locations",
  ],
  typicalSubstrates: [
    "Clay brick masonry cavity walls — most common substrate in Class 2 strata building remediation",
    "Calcium silicate brick and concrete masonry — confirm flashing profile suits blockwork course geometry",
    "Not suitable for direct contact with wet concrete without a protective barrier — isolate from alkaline substrate",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x";
  limit?: number;
}) {
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
              {src.url && src.url !== "#" ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}
                  <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
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
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
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

export function PowderCoatedAluminiumIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is powder coated aluminium cavity flashing?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Powder coated aluminium cavity flashing is specified where the exposed drip edge at the wall face must colour-match the facade finish, mortar, or Colorbond roof system. Factory-applied thermosetting powder coat in 60 micron minimum DFT per AS 4506 provides a durable, UV-resistant finish over 1.2–2.0mm aluminium alloy strip.
        </p>
        {expanded && (
          <>
            <p>
              Unlike mill finish aluminium which will oxidise and show a white/grey patina over time, powder coated aluminium maintains a consistent colour appearance and is suitable for all exposed locations including coastal zones, provided the correct Colorbond or marine-grade coating is specified. Cut ends must always be touched up with a compatible zinc-rich primer on site before enclosure.
            </p>
            <p>
              For Class 2 strata building remediation in Australia, powder coated aluminium cavity flashing is typically specified at parapet cappings, window sill flashings, and base-of-cavity locations where the drip edge is visible in the finished facade. Standard Colorbond colour ranges are available off-the-shelf from Metalcraft and Stramit; custom colours require minimum order quantities and 2–4 week lead times from Capral.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
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

export function PowderCoatedAluminiumProductSection() {
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
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
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
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 suppliers — powder coated aluminium cavity flashing — scroll to view all</p>
          </div>
        </div>

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

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}
              >
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
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
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>

                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of powder coated aluminium cavity flashing suppliers. Confirm all product selections with current supplier TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Alloy</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.alloy}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.colourRange}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyFeature}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
