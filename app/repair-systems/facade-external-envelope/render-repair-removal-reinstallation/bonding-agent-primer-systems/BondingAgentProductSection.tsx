"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "SBR"
  | "Acrylic"
  | "Epoxy"
  | "Slurry"
  | "Exterior"
  | "Interior"
  | "Masonry"
  | "Concrete"
  | "Smooth-substrate"
  | "Dense-substrate"
  | "Low-absorption"
  | "Pre-bagged";

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
    tdsUrl: "https://www.mapei.com/au",
    accentColor: "#0369a1",
    name: "Mapei Planicrete AC (Acrylic Bonding Agent)",
    descriptionLine: "Acrylic bonding agent and SBR admixture — applied to substrate before render application or added to render mix as polymer admixture — exterior and interior masonry and concrete substrates",
    productType: "Acrylic bonding agent / SBR render admixture",
    filterTags: ["Acrylic", "SBR", "Exterior", "Interior", "Masonry", "Concrete", "Smooth-substrate", "Low-absorption"],
    techChips: [
      { label: "Acrylic bonding agent", cls: "bg-sky-100 text-sky-800" },
      { label: "SBR admixture", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior and interior", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Planicrete AC is an acrylic-based polymer admixture used as a bonding agent for cementitious renders and mortars. It can be applied to the substrate as a neat slurry brush coat before render application, or added to the render mix water as an admixture to improve polymer content and adhesion. It improves adhesion on dense, smooth, or low-absorption substrates such as smooth concrete and polished masonry where standard render adhesion without bonding agent may be insufficient. Confirm dilution ratio, application method, and compatibility with the render system with Mapei Australia technical. TODO: owner confirm — Mapei Planicrete AC specification, dilution ratios and application guide for render bonding.",
    technicalProperties: [
      "Acrylic polymer bonding agent and render admixture",
      "Applied neat to substrate as brush-on slurry coat, or added to render mix water",
      "Improves adhesion to dense and smooth substrates",
      "Exterior and interior masonry and concrete",
      "Pre-bagged / liquid concentrate — dilute as specified",
      "Confirm dilution ratio and application method from Mapei TDS",
    ],
    limitations: [
      "Do not allow bonding agent slurry coat to dry before applying render — render must be applied while bonding coat is still tacky",
      "Confirm compatibility with specific render system — not all bonding agents are compatible with all renders",
      "TODO: owner confirm — Mapei Planicrete AC specification and dilution ratio",
    ],
    procurementSources: [
      { name: "Mapei Australia", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com",
    accentColor: "#166534",
    name: "SikaBond or SikaLatex (Bonding Agent / SBR Admixture)",
    descriptionLine: "SBR latex bonding agent and render admixture — applied to substrate or added to render mix — improves adhesion to dense and smooth concrete and masonry substrates",
    productType: "SBR bonding agent / latex render admixture",
    filterTags: ["SBR", "Exterior", "Interior", "Masonry", "Concrete", "Smooth-substrate", "Dense-substrate", "Low-absorption"],
    techChips: [
      { label: "SBR latex", cls: "bg-green-100 text-green-800" },
      { label: "Bonding agent", cls: "bg-slate-100 text-slate-700" },
      { label: "Dense substrates", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika supplies SBR latex bonding agents and render admixtures for improving adhesion of cementitious renders to dense, smooth, and low-absorption substrates. SikaLatex (or current equivalent) is a styrene-butadiene rubber latex used as a bonding slurry when brushed neat onto the substrate, or as a polymer admixture when added to the render mix water. Confirm the current Sika product for render bonding, dilution ratio, and compatibility with Sika render systems with Sika Australia technical. TODO: owner confirm — current Sika SBR bonding agent product name, dilution ratio and application guide.",
    technicalProperties: [
      "SBR latex — bonding agent and render admixture",
      "Applied as neat brush-on slurry or added to render mix water",
      "Improves adhesion to dense and smooth concrete and masonry",
      "Confirm dilution ratio and application method from Sika TDS",
      "Compatible with Sika render systems — confirm with Sika technical",
    ],
    limitations: [
      "Apply render while bonding coat is still tacky — do not allow to dry",
      "TODO: owner confirm — current Sika SBR bonding agent product name, specification and availability",
      "Confirm compatibility with specific render system",
    ],
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Sika national distribution", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Fosroc Australia",
    brandUrl: "https://www.fosroc.com/en-AU",
    tdsUrl: "https://www.fosroc.com/en-AU",
    accentColor: "#7c3aed",
    name: "Fosroc Renderoc Primer / Nitobond SBR",
    descriptionLine: "SBR bonding slurry and primer — applied to substrate before Fosroc render application — improves adhesion to smooth and dense concrete and masonry substrates",
    productType: "SBR bonding slurry and render primer — dense substrates",
    filterTags: ["SBR", "Slurry", "Exterior", "Interior", "Masonry", "Concrete", "Smooth-substrate", "Dense-substrate"],
    techChips: [
      { label: "SBR bonding slurry", cls: "bg-violet-100 text-violet-800" },
      { label: "Fosroc Nitobond", cls: "bg-slate-100 text-slate-700" },
      { label: "Dense substrates", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitobond SBR (or current equivalent) is a styrene-butadiene rubber latex used as a bonding agent for cementitious renders and repair mortars on smooth and dense substrates. It is applied as a brush-on bonding slurry to the substrate before Fosroc Renderoc render application to improve adhesion on concrete and masonry substrates where direct render adhesion is insufficient. Confirm current product name, dilution ratio, and compatibility with Fosroc render systems with Fosroc Australia. TODO: owner confirm — Fosroc Nitobond SBR current product name, specification and application guide.",
    technicalProperties: [
      "SBR bonding agent applied as brush-on slurry to substrate",
      "Improves render adhesion to smooth and dense concrete and masonry",
      "Compatible with Fosroc Renderoc render systems — confirm with Fosroc technical",
      "Confirm dilution ratio and application method from current Fosroc TDS",
    ],
    limitations: [
      "TODO: owner confirm — Fosroc Nitobond SBR current product name and availability",
      "Apply render while bonding slurry is still tacky",
      "Confirm compatibility with specific render system",
    ],
    procurementSources: [
      { name: "Fosroc Australia", url: "https://www.fosroc.com/en-AU" },
      { name: "Parchem — national Fosroc distribution", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Rockcote / Saint-Gobain Weber",
    brandUrl: "https://www.rockcote.com.au",
    tdsUrl: "https://www.rockcote.com.au",
    accentColor: "#b45309",
    name: "Rockcote Primer / Acrylic Bonding Agent",
    descriptionLine: "Acrylic bonding agent and primer — applied to smooth or dense substrate before Rockcote render — improves adhesion on concrete, polished masonry, and low-absorption substrates",
    productType: "Acrylic bonding agent and render primer",
    filterTags: ["Acrylic", "Exterior", "Interior", "Masonry", "Concrete", "Smooth-substrate", "Low-absorption", "Pre-bagged"],
    techChips: [
      { label: "Acrylic bonding agent", cls: "bg-amber-100 text-amber-800" },
      { label: "Rockcote system", cls: "bg-slate-100 text-slate-700" },
      { label: "Low-absorption substrates", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote / Saint-Gobain Weber supplies acrylic bonding agents and primers compatible with the Rockcote render range. Confirm the specific Rockcote product for render bonding on smooth or low-absorption substrates with Saint-Gobain Weber / Rockcote technical. TODO: owner confirm — Rockcote bonding agent product, dilution ratio and application guide.",
    technicalProperties: [
      "Acrylic bonding agent and render primer",
      "Apply to substrate before Rockcote render",
      "Improves adhesion to smooth and low-absorption substrates",
      "Confirm dilution ratio and application method from Rockcote TDS",
    ],
    limitations: [
      "TODO: owner confirm — specific Rockcote bonding agent product and specification",
      "Apply render while bonding coat is still tacky",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber", url: "https://www.rockcote.com.au" },
      { name: "Saint-Gobain Weber trade distribution", url: "https://www.rockcote.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "SBR", label: "SBR" },
  { id: "Acrylic", label: "Acrylic" },
  { id: "Slurry", label: "Slurry" },
  { id: "Exterior", label: "Exterior" },
  { id: "Interior", label: "Interior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Smooth-substrate", label: "Smooth substrate" },
  { id: "Dense-substrate", label: "Dense substrate" },
  { id: "Low-absorption", label: "Low absorption" },
  { id: "Pre-bagged", label: "Pre-bagged" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  bondingType: string;
  applicationMethod: string;
  substrateTypes: string;
  mixWithRender: string;
  primaryUse: string;
}[] = [
  {
    product: "Mapei Planicrete AC",
    brand: "Mapei Australia",
    bondingType: "Acrylic polymer",
    applicationMethod: "Brush-on slurry or render mix admixture",
    substrateTypes: "Dense concrete, polished masonry",
    mixWithRender: "Yes — can be added to mix water",
    primaryUse: "Bonding agent on smooth / low-absorption substrates",
  },
  {
    product: "SikaLatex / SikaBond",
    brand: "Sika Australia",
    bondingType: "SBR latex",
    applicationMethod: "Brush-on slurry or render mix admixture",
    substrateTypes: "Dense concrete, masonry",
    mixWithRender: "Yes — can be added to mix water",
    primaryUse: "SBR bonding agent on dense concrete and masonry",
  },
  {
    product: "Fosroc Nitobond SBR",
    brand: "Fosroc / Parchem",
    bondingType: "SBR latex",
    applicationMethod: "Brush-on slurry to substrate",
    substrateTypes: "Smooth concrete, dense masonry",
    mixWithRender: "Confirm with Fosroc",
    primaryUse: "Bonding primer before Fosroc Renderoc render systems",
  },
  {
    product: "Rockcote Primer / Acrylic Bonding Agent",
    brand: "Rockcote / Saint-Gobain Weber",
    bondingType: "Acrylic",
    applicationMethod: "Brush-on to substrate",
    substrateTypes: "Smooth concrete, polished masonry, low-absorption",
    mixWithRender: "TODO: confirm with Rockcote",
    primaryUse: "Bonding agent for Rockcote render systems",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Dense or smooth concrete substrates before render application — reduces risk of render delamination",
    "Polished or low-absorption masonry surfaces before render",
    "Render re-application over existing cured render substrate (confirm with manufacturer)",
    "Polymer admixture addition to render mix where increased polymer content is required",
  ],
  selectionCriteria: [
    "Substrate type — confirm product for specific substrate (dense concrete, smooth masonry, AAC, existing render)",
    "Application method — bonding slurry applied to substrate before render, or polymer added to render mix — confirm with manufacturer",
    "Compatibility — bonding agent must be compatible with the selected render system",
    "Application timing — apply render while bonding agent is still tacky",
  ],
  limitations: [
    "Never allow bonding agent to dry before applying render — forming a film that prevents adhesion",
    "Not a substitute for mechanical preparation — substrate must be clean, sound, and free from laitance, dust, and contamination",
    "Not all bonding agents are compatible with all renders — confirm compatibility with manufacturer",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures",
    "Manufacturer TDS — dilution, application, and compatibility guidance",
  ],
  suitableDefects: [
    "Render adhesion failure on dense or smooth substrates",
    "Re-render on smooth concrete facades where render bonding without primer is insufficient",
    "Polymer content enhancement in cementitious render for improved adhesion",
  ],
  typicalSubstrates: [
    "Dense smooth concrete — external facade concrete panels",
    "Polished masonry — low absorption brick and block",
    "Existing sound cured render (confirm compatibility)",
    "AAC (autoclaved aerated concrete) — confirm specific primer for AAC with manufacturer",
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

export function BondingAgentIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are bonding agents and primer systems for render?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Bonding agents and render primers are polymer-based liquid admixtures applied to the substrate before render application to improve adhesion on dense, smooth, or low-absorption surfaces where direct render adhesion without a primer may be insufficient.
        </p>
        {expanded && (
          <>
            <p>
              They are typically acrylic or SBR (styrene-butadiene rubber) latex products applied as a thin brush-on slurry coat to the substrate. The render is applied while the bonding coat is still tacky — allowing render to dry before applying is a common error that creates a film layer and reduces adhesion. Some bonding agents can also be added to the render mix water as a polymer admixture to increase the polymer content of the render system. Product selection and dilution ratios must be confirmed with the manufacturer and matched to the specific render system being used.
            </p>
          </>
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

export function BondingAgentProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — bonding agent and primer systems — scroll to view all</p>
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
              Side-by-side comparison of bonding agent and primer systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Bonding type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate types</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mix with render</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.bondingType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.applicationMethod}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substrateTypes}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.mixWithRender}</td>
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
