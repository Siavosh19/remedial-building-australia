"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Sand-cement"
  | "Two-coat"
  | "Exterior"
  | "Interior"
  | "Masonry"
  | "Concrete"
  | "Hand-applied"
  | "Heritage"
  | "AS-3700"
  | "Lightweight"
  | "Coastal";

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
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#0369a1",
    name: "Mapei Planitop XS (sand-cement system)",
    descriptionLine:
      "Two-coat sand-cement system — Planitop XS (cementitious base coat without polymer admixture) + sand-cement finish coat — exterior masonry and concrete facades where traditional render is specified",
    productType: "Two-coat sand-cement cementitious render — exterior facade",
    filterTags: ["Sand-cement", "Two-coat", "Exterior", "Masonry", "Concrete", "Hand-applied", "AS-3700"],
    techChips: [
      { label: "sand-cement", cls: "bg-slate-100 text-slate-700" },
      { label: "Two-coat", cls: "bg-sky-100 text-sky-800" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "Hand-applied", cls: "bg-amber-50 text-amber-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Traditional two-coat sand-cement render using site-batched or pre-bagged sand-cement as the primary binder. The scratch coat is a 1:4 cement:sand mix applied at 10–15mm and scratched to provide a key. The finish coat is a fine sand-cement mix applied at 6–10mm and finished by float or steel trowel. Mapei Planitop XS can be used as the base coat in a sand-cement render system where a cementitious binder without polymer admixture is required. Confirm with Mapei Australia whether Planitop XS is suitable as a traditional sand-cement type base coat without additional polymer, and confirm site-batched versus pre-bagged approach with the project specification. TODO: owner confirm — verify sand-cement system specification and suitable Mapei products with Mapei Australia technical before specifying.",
    technicalProperties: [
      "Scratch coat — 1:4 cement:sand mix at 10–15mm",
      "Finish coat — fine sand-cement at 6–10mm",
      "No polymer admixture (unless separately specified)",
      "Apply to dampened substrate — avoid dry substrate absorption",
      "Confirm primer requirements with Mapei Australia for dense or smooth substrates",
      "Allow minimum 7 days curing between scratch and finish coats (confirm)",
    ],
    limitations: [
      "More susceptible to shrinkage cracking than polymer-modified systems — control joint spacing critical",
      "Lower adhesion than polymer-modified systems on smooth substrates — substrate preparation critical",
      "Not recommended for fine cracking repair without mesh reinforcement",
      "Confirm suitability for coastal exposure with Mapei technical — standard sand-cement may require salt-resistant admixture in coastal environments",
      "TODO: owner confirm — Mapei product specification for sand-cement type render system",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Site-batched — confirm specification and mix ratios with project engineer", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Boral Australia",
    brandUrl: "https://www.boral.com.au",
    accentColor: "#92400e",
    name: "Boral OPC + Boral Render Sand",
    descriptionLine:
      "Site-batched two-coat sand-cement render — Boral Ordinary Portland Cement + washed render sand — scratch coat and finish coat — exterior masonry and brick facades",
    productType: "Site-batched two-coat sand-cement render",
    filterTags: ["Sand-cement", "Two-coat", "Exterior", "Masonry", "Hand-applied", "Heritage", "AS-3700"],
    techChips: [
      { label: "Site-batched", cls: "bg-slate-100 text-slate-700" },
      { label: "Sand-cement", cls: "bg-amber-100 text-amber-800" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "Heritage compatible", cls: "bg-amber-50 text-amber-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Traditional site-batched two-coat sand-cement render using Boral OPC (Ordinary Portland Cement) and locally sourced washed render sand. The scratch coat is typically a 1:3 or 1:4 cement:sand mix applied at 10–15mm to provide a strong base and key for the finish coat. The finish coat is a finer 1:4 or 1:5 mix for a smooth or textured finish. Site-batched render allows the mix ratio, aggregate size, and admixture selection to be adjusted to suit specific substrate conditions and environmental exposure. Boral OPC is widely available nationally. Confirm all mix ratios, admixture requirements, and inter-coat timing with the project specification. In coastal environments, confirm admixture requirements to reduce chloride ingress susceptibility. TODO: owner confirm — confirm mix design, admixtures, and coastal suitability with project engineer before specifying.",
    technicalProperties: [
      "Site-batched — mix ratios adjusted to suit project requirements and specification",
      "Scratch coat 1:3–1:4 cement:sand at 10–15mm",
      "Finish coat 1:4–1:5 at 6–10mm",
      "Boral OPC widely available through builders merchants nationally",
      "Substrate must be sound, clean, and dampened before application",
      "Allow minimum 7 days between scratch coat and finish coat (confirm with specification)",
    ],
    limitations: [
      "More susceptible to shrinkage cracking than polymer-modified systems — control joint spacing is critical",
      "Site-batched quality depends on mixing accuracy — pre-bagged alternatives offer more consistent results",
      "Not recommended for substrates requiring high adhesion (polished concrete, existing paint — prime first)",
      "Standard OPC sand-cement is not salt-resistant — specify salt-resistant admixture in coastal environments",
      "TODO: owner confirm — mix design, admixtures, and coastal suitability",
    ],
    procurementSources: [
      { name: "Boral — builders merchants nationally", url: "https://www.boral.com.au" },
      { name: "Local hardware and builders merchants — render sand supply", url: "https://www.boral.com.au" },
      { name: "Confirm local OPC supply with Boral or independent cement suppliers", url: "https://www.boral.com.au" },
    ],
  },
  {
    fullLabel: "Rockcote / Saint-Gobain Weber",
    brandUrl: "https://www.rockcote.com.au",
    accentColor: "#b45309",
    name: "Rockcote Pre-Mix Render Base + Rockcote Fine Render",
    descriptionLine:
      "Pre-bagged two-coat sand-cement type render — Rockcote Pre-Mix Render Base (scratch coat) + Rockcote Fine Render or Finessa (finish coat) — exterior masonry facades",
    productType: "Pre-bagged two-coat sand-cement type render — exterior facade",
    filterTags: ["Sand-cement", "Two-coat", "Exterior", "Masonry", "Hand-applied", "Heritage", "AS-3700"],
    techChips: [
      { label: "Pre-bagged", cls: "bg-slate-100 text-slate-700" },
      { label: "Sand-cement type", cls: "bg-amber-100 text-amber-800" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "Heritage use", cls: "bg-amber-50 text-amber-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote (Saint-Gobain Weber Australia) produces a range of pre-bagged render products for exterior masonry. A sand-cement type render system can be specified using Rockcote pre-bagged products where a lower polymer content or traditional sand-cement appearance is preferred. Confirm the specific Rockcote product suitable for a sand-cement type specification with Saint-Gobain Weber Australia technical — the Rockcote range includes both polymer-modified and sand-cement base render products. Rockcote products are widely available through Saint-Gobain Weber trade distribution nationally. TODO: owner confirm — confirm the specific Rockcote product for sand-cement type render specification with Saint-Gobain Weber / Rockcote technical before specifying.",
    technicalProperties: [
      "Pre-bagged — consistent mix quality compared to site-batched",
      "Suitable for exterior masonry facades",
      "Rockcote range widely available through Saint-Gobain Weber trade distribution",
      "Confirm product selection — sand-cement type versus polymer-modified — with Rockcote technical",
      "Confirm inter-coat timing, thickness, and primer requirements from current Rockcote TDS",
    ],
    limitations: [
      "TODO: owner confirm — confirm specific Rockcote product for sand-cement type render specification with Saint-Gobain Weber/Rockcote Australia",
      "Rockcote range is broad — confirm with technical that the selected product is sand-cement type rather than polymer-modified",
      "Confirm coastal suitability — standard sand-cement type render may not be suitable in marine environments without admixture",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber — trade supply nationally", url: "https://www.rockcote.com.au" },
      { name: "Saint-Gobain Weber Australia", url: "https://www.rockcote.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Sand-cement", label: "Sand-cement" },
  { id: "Two-coat", label: "Two-coat system" },
  { id: "Exterior", label: "Exterior" },
  { id: "Interior", label: "Interior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Hand-applied", label: "Hand-applied" },
  { id: "Heritage", label: "Heritage compatible" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Lightweight", label: "Lightweight" },
  { id: "Coastal", label: "Coastal rated" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  coatSystem: string;
  binder: string;
  application: string;
  coastalSuitable: string;
  heritage: string;
  primaryUse: string;
}[] = [
  {
    product: "Planitop XS (sand-cement system)",
    brand: "Mapei",
    coatSystem: "Two-coat",
    binder: "Sand-cement (confirm with Mapei)",
    application: "Hand trowel / float",
    coastalSuitable: "Confirm with Mapei technical",
    heritage: "Confirm suitability",
    primaryUse: "Exterior masonry and concrete facades where sand-cement is specified",
  },
  {
    product: "Boral OPC + Render Sand",
    brand: "Boral",
    coatSystem: "Two-coat site-batched",
    binder: "OPC + washed render sand",
    application: "Hand trowel / float",
    coastalSuitable: "Admixture required — confirm",
    heritage: "Compatible with heritage masonry",
    primaryUse: "Site-batched render on brick and masonry facades",
  },
  {
    product: "Rockcote Pre-Mix Render Base + Fine Render",
    brand: "Rockcote / Saint-Gobain Weber",
    coatSystem: "Two-coat pre-bagged",
    binder: "Sand-cement type (confirm with Rockcote)",
    application: "Hand trowel / float",
    coastalSuitable: "Confirm with Rockcote technical",
    heritage: "Heritage use confirmed with technical",
    primaryUse: "Pre-bagged sand-cement type render on exterior masonry",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Full render removal and replacement on heritage brick masonry facades where polymer-modified render is not specified",
    "Scratch-coat and finish coat on masonry blockwork facades",
    "Re-render on substrates where traditional sand-cement is preferred for appearance or vapour permeability",
    "New construction render to masonry facades where specification requires AS 3700 sand-cement render",
    "Heritage building remediation where lime-cement or sand-cement is preferred over polymer-modified systems",
  ],
  selectionCriteria: [
    "Substrate condition — sand-cement render requires a sound, clean, and adequately absorptive substrate",
    "Mix design — confirm 1:3 to 1:4 cement:sand ratio for scratch coat and 1:4 to 1:5 for finish coat",
    "Exposure — confirm admixture requirements for coastal environments",
    "Heritage context — confirm render type with heritage consultant or conservation architect",
    "Primer requirement — dense or smooth substrates require bonding agent before sand-cement render",
  ],
  limitations: [
    "More susceptible to shrinkage cracking than polymer-modified systems — control joint spacing is critical",
    "Lower adhesion to smooth substrates compared to polymer-modified systems",
    "Not recommended for spray-applied application without specialist equipment and mix adjustment",
    "Requires longer cure time between coats compared to polymer-modified systems",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures",
    "NCC Volume One — performance requirements for facade cladding in Class 2 buildings",
    "AS/NZS 2904 — damp-proof courses and flashings (relevant for interface works)",
    "Manufacturer TDS — confirm all application, inter-coat, and primer requirements",
  ],
  suitableDefects: [
    "Full render delamination and detachment on heritage masonry facades",
    "Render cracking and patch repair where sand-cement is the specified finish",
    "New render installation on blockwork and masonry facades post-defect rectification",
  ],
  typicalSubstrates: [
    "Masonry — brick and block",
    "Concrete — external concrete facades (confirm primer requirement)",
    "Heritage masonry — confirmed compatible with lime-cement or sand-cement specification",
    "Existing render (where fully removed and substrate is clean and sound)",
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
            >
              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                >
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

function CollapsibleCardDetails({
  text,
  chips,
}: {
  text: string;
  chips: { label: string; cls: string }[];
}) {
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
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function TwoCoatSandCementIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are two-coat sand-cement render systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Two-coat sand-cement render is the traditional facade render system used in Australian construction prior to the widespread adoption of polymer-modified pre-bagged products. The system consists of a scratch coat (or base coat) and a finish coat, both composed of Portland cement and well-graded render sand mixed in specified proportions. Unlike polymer-modified systems, sand-cement render does not incorporate SBR latex, acrylic, or other polymer admixtures as part of the standard mix — though admixtures may be added where specified for improved adhesion or durability.
        </p>
        {expanded && (
          <p>
            Sand-cement render is still widely specified in Australian remediation works, particularly on heritage masonry facades and where the project specification requires a vapour-permeable render or a traditional mortar compatible with lime-based substrates. In coastal environments, specialist admixtures are typically required to improve resistance to chloride ingress and salt crystallisation. For most modern strata remediation, polymer-modified systems offer superior adhesion, reduced shrinkage cracking, and improved durability — but sand-cement remains a valid and widely used system where correctly specified and applied.
          </p>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
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

export function TwoCoatSandCementProductSection() {
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
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

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
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable substrates
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (
              <>Hide detail <ChevronUp size={14} /></>
            ) : (
              <>Show detail <ChevronDown size={14} /></>
            )}
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — two-coat sand-cement render systems — scroll to view all</p>
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
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div
              key={product.name}
              className="flex-none"
              style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
            >
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}
              >
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a
                          href={product.tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a
                        href={product.brandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      >
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips}
                  />
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of two-coat sand-cement render systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coat system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Binder</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal suitable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coatSystem}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.binder}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastalSuitable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.heritage}</td>
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
