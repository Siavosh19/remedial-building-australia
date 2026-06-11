"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Fibre-reinforced"
  | "Polypropylene"
  | "Glass-fibre"
  | "Two-coat"
  | "Exterior"
  | "Masonry"
  | "Concrete"
  | "Pre-bagged"
  | "Crack-resistant"
  | "Coastal"
  | "AS-3700";

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
    name: "Mapei Planitop XS + Polypropylene Fibre Admixture",
    descriptionLine:
      "Fibre-reinforced two-coat render — Mapei Planitop XS base coat with polypropylene fibre admixture + fine finish coat — exterior masonry and concrete facades with elevated crack risk",
    productType: "Polypropylene fibre-reinforced cementitious render — exterior facade",
    filterTags: ["Fibre-reinforced", "Polypropylene", "Two-coat", "Exterior", "Masonry", "Concrete", "Pre-bagged", "Crack-resistant", "AS-3700"],
    techChips: [
      { label: "Polypropylene fibres", cls: "bg-sky-100 text-sky-800" },
      { label: "Two-coat system", cls: "bg-slate-100 text-slate-700" },
      { label: "Crack-resistant", cls: "bg-green-50 text-green-700" },
      { label: "Exterior masonry", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Polypropylene fibre-reinforced render using Mapei Planitop XS as the base coat with discrete polypropylene fibres added to the mix to improve tensile resistance and reduce early-age plastic shrinkage cracking. Polypropylene fibres (typically at 0.5–1.0 kg/m³) are added to the Planitop XS mix at the time of batching. The fibre-reinforced base coat is applied at the standard scratch coat thickness and covered with a fine polymer-modified finish coat after curing. Confirm suitable fibre type, dosage rate, and mix compatibility with Mapei Australia technical before specifying. TODO: owner confirm — Mapei-compatible polypropylene fibre type, dosage, and approved system guide.",
    technicalProperties: [
      "Polypropylene fibres added to Planitop XS base coat — confirm dosage (typically 0.5–1.0 kg/m³) with Mapei technical",
      "Improves tensile resistance and reduces plastic shrinkage cracking",
      "Two-coat system — fibre-reinforced base + fine finish coat",
      "Exterior and interior masonry and concrete substrates",
      "Pre-bagged base coat — fibres added at mixing",
      "Confirm AS 3700 compliance and coastal suitability with Mapei Australia",
    ],
    limitations: [
      "Fibres are not a substitute for properly spaced control joints",
      "Polypropylene fibres do not replace structural reinforcement for load-bearing render",
      "Confirm fibre type and dosage — not all polypropylene fibres are compatible with all cementitious mixes",
      "Finish coat surface quality depends on base coat preparation",
      "TODO: owner confirm — Mapei fibre system specification and approved products",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Polypropylene fibre — confirm supplier with Mapei technical", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Rockcote / Saint-Gobain Weber",
    brandUrl: "https://www.rockcote.com.au",
    accentColor: "#b45309",
    name: "Rockcote Primus Basecoat + Polypropylene Fibres",
    descriptionLine:
      "Fibre-reinforced render — Rockcote Primus Basecoat with polypropylene fibre admixture + Rockcote Finessa finish coat — exterior masonry facades with elevated shrinkage cracking risk",
    productType: "Polypropylene fibre-reinforced two-coat render — exterior facade",
    filterTags: ["Fibre-reinforced", "Polypropylene", "Two-coat", "Exterior", "Masonry", "Crack-resistant", "Pre-bagged", "AS-3700"],
    techChips: [
      { label: "Polypropylene fibres", cls: "bg-amber-100 text-amber-800" },
      { label: "Primus + Finessa", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote Primus Basecoat with polypropylene fibre admixture as the base coat, finished with Rockcote Finessa Fine Render. The fibres are added to the Primus Basecoat at mixing to improve tensile resistance and reduce plastic shrinkage cracking in the base render. Confirm polypropylene fibre type, dosage, and approved system guide with Saint-Gobain Weber / Rockcote technical before specifying. TODO: owner confirm — Rockcote-approved polypropylene fibre system and dosage guidance.",
    technicalProperties: [
      "Fibre-reinforced Primus Basecoat — polypropylene fibres at confirmed dosage",
      "Two-coat — fibre-reinforced base + Finessa finish coat",
      "Exterior masonry — suitable for facade patch repair and full-sheet render",
      "Primus Basecoat machine or hand apply",
      "Pre-bagged — fibres added at mixing",
      "Confirm fibre type and dosage with Rockcote technical",
    ],
    limitations: [
      "Fibres do not replace control joints or structural reinforcement",
      "Confirm fibre-to-mix compatibility with Rockcote technical",
      "TODO: owner confirm — Rockcote-approved fibre system, dosage, and technical data",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber", url: "https://www.rockcote.com.au" },
      { name: "Polypropylene fibre — confirm with Rockcote technical", url: "https://www.rockcote.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#166534",
    name: "Sika SikaTop-122 Plus + SikaFibre AD12",
    descriptionLine:
      "Fibre-reinforced two-coat render — Sika SikaTop-122 Plus base coat with SikaFibre AD12 polypropylene fibre admixture + SikaTop-144 finish coat — exterior masonry and concrete facades",
    productType: "Polypropylene fibre-reinforced PM render — exterior facade",
    filterTags: ["Fibre-reinforced", "Polypropylene", "Two-coat", "Exterior", "Masonry", "Concrete", "Pre-bagged", "Crack-resistant", "Coastal", "AS-3700"],
    techChips: [
      { label: "SikaFibre AD12", cls: "bg-green-100 text-green-800" },
      { label: "SikaTop system", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal suitable", cls: "bg-sky-50 text-sky-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika's fibre-reinforced render system pairs SikaTop-122 Plus (polymer-modified render base coat) with SikaFibre AD12 (polypropylene monofilament fibre admixture) to produce a fibre-reinforced scratch coat. SikaFibre AD12 is Sika's polypropylene fibre specifically designed for cementitious systems. Confirm current product availability, dosage rate, and TDS with Sika Australia technical before specifying. TODO: owner confirm — Sika fibre-reinforced render system, SikaFibre AD12 current availability and dosage guidance.",
    technicalProperties: [
      "SikaTop-122 Plus base coat + SikaFibre AD12 polypropylene fibres",
      "SikaTop-144 finish coat",
      "Exterior and interior masonry and concrete",
      "Pre-bagged Sika products",
      "SikaFibre AD12 — confirm dosage from Sika TDS",
      "Confirm coastal and high-exposure suitability with Sika Australia",
    ],
    limitations: [
      "SikaFibre AD12 dosage must be confirmed — over-dosing reduces workability",
      "TODO: owner confirm — confirm SikaFibre AD12 availability and dosage with Sika Australia",
      "Standard render fibres do not replace structural concrete reinforcement",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Sika national distribution — builders merchants", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Fosroc Australia",
    brandUrl: "https://www.fosroc.com/en-AU",
    accentColor: "#7c3aed",
    name: "Fosroc Renderoc Classic + Polypropylene Fibre",
    descriptionLine:
      "Fibre-reinforced render — Fosroc Renderoc Classic base coat with polypropylene fibre admixture + Fosroc FC finish coat — exterior masonry and concrete facades with crack resistance requirement",
    productType: "Polypropylene fibre-reinforced render — exterior facade",
    filterTags: ["Fibre-reinforced", "Polypropylene", "Two-coat", "Exterior", "Masonry", "Concrete", "Crack-resistant", "AS-3700"],
    techChips: [
      { label: "Fosroc Renderoc system", cls: "bg-violet-100 text-violet-800" },
      { label: "Polypropylene fibres", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Renderoc Classic with polypropylene fibre admixture used as the fibre-reinforced base coat, finished with Fosroc Renderoc FC (Fine Coat). Confirm polypropylene fibre type, dosage, and compatibility with Fosroc Renderoc Classic with Fosroc Australia technical before specifying. TODO: owner confirm — Fosroc-approved polypropylene fibre system and dosage guidance.",
    technicalProperties: [
      "Renderoc Classic base coat + polypropylene fibres at confirmed dosage",
      "Renderoc FC finish coat",
      "Exterior and interior use",
      "Pre-bagged Fosroc products",
      "Confirm fibre type and dosage with Fosroc technical",
      "Confirm coastal suitability",
    ],
    limitations: [
      "TODO: owner confirm — Fosroc fibre specification and approved system",
      "Fibres do not replace control joints",
      "Confirm current Fosroc product availability",
    ],
    procurementSources: [
      { name: "Fosroc Australia", url: "https://www.fosroc.com/en-AU" },
      { name: "Parchem — national Fosroc distribution", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Fibre-reinforced", label: "Fibre-reinforced" },
  { id: "Polypropylene", label: "Polypropylene" },
  { id: "Glass-fibre", label: "Glass-fibre" },
  { id: "Two-coat", label: "Two-coat system" },
  { id: "Exterior", label: "Exterior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Pre-bagged", label: "Pre-bagged" },
  { id: "Crack-resistant", label: "Crack-resistant" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "AS-3700", label: "AS 3700" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  fibreType: string;
  dosage: string;
  baseCoat: string;
  finishCoat: string;
  crackResistance: string;
  primaryUse: string;
}[] = [
  {
    product: "Planitop XS + PP Fibre",
    brand: "Mapei",
    fibreType: "Polypropylene (confirm type with Mapei)",
    dosage: "0.5–1.0 kg/m³ (confirm with Mapei)",
    baseCoat: "Mapei Planitop XS",
    finishCoat: "Fine finish coat (confirm with Mapei)",
    crackResistance: "Improved plastic shrinkage resistance",
    primaryUse: "Exterior masonry and concrete facades with elevated crack risk",
  },
  {
    product: "Primus Basecoat + PP Fibre + Finessa",
    brand: "Rockcote / Saint-Gobain Weber",
    fibreType: "Polypropylene (confirm type with Rockcote)",
    dosage: "Confirm with Rockcote technical",
    baseCoat: "Rockcote Primus Basecoat",
    finishCoat: "Rockcote Finessa",
    crackResistance: "Reduced plastic shrinkage cracking",
    primaryUse: "Exterior masonry facade patch repair and full re-render",
  },
  {
    product: "SikaTop-122 Plus + SikaFibre AD12",
    brand: "Sika",
    fibreType: "SikaFibre AD12 — polypropylene monofilament",
    dosage: "Confirm from Sika TDS",
    baseCoat: "SikaTop-122 Plus",
    finishCoat: "SikaTop-144 (confirm AU availability)",
    crackResistance: "Improved tensile resistance and crack distribution",
    primaryUse: "Exterior masonry and concrete facades — coastal environments",
  },
  {
    product: "Renderoc Classic + PP Fibre + Renderoc FC",
    brand: "Fosroc / Parchem",
    fibreType: "Polypropylene (confirm with Fosroc)",
    dosage: "Confirm with Fosroc technical",
    baseCoat: "Fosroc Renderoc Classic",
    finishCoat: "Fosroc Renderoc FC",
    crackResistance: "Improved crack resistance (confirm with Fosroc)",
    primaryUse: "Exterior masonry and concrete facades with crack resistance requirement",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Facade render repair on substrates with elevated thermal and structural movement",
    "Full re-render on facades with history of map cracking and shrinkage cracking",
    "Base coat application over AAC and lightweight block substrates with high movement differential",
    "Heritage facades requiring improved crack resistance without polymer-modified systems",
    "Coastal facades where crack propagation increases chloride ingress risk",
  ],
  selectionCriteria: [
    "Fibre type — polypropylene for crack control, glass fibre for tensile reinforcement",
    "Dosage rate — confirm from manufacturer TDS — too little is ineffective, too much reduces workability",
    "Substrate preparation — substrate must be sound and primed as required",
    "Control joints — fibres reduce cracking but do not eliminate need for properly spaced control joints",
    "Compatibility — confirm fibre-to-system compatibility with manufacturer technical before specifying",
  ],
  limitations: [
    "Fibres are not structural reinforcement and do not replace properly designed control joint spacing",
    "Fibre dosage must be confirmed — excessive dosage reduces workability and can impair render surface quality",
    "Not a waterproofing system — fibre-reinforced render must be overcoated with a compatible coating system",
    "Glass fibres must be alkali-resistant (AR glass) — standard glass fibres will degrade in cementitious environments",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures",
    "NCC Volume One — facade performance requirements",
    "Manufacturer TDS — fibre dosage, mix design, and application guidance",
  ],
  suitableDefects: [
    "Map cracking and shrinkage cracking in existing render — where cause has been identified and controlled",
    "Render reinstallation on facades with high thermal movement differential",
    "Facades with history of hairline cracking propagating to full delamination",
  ],
  typicalSubstrates: [
    "Masonry — brick and concrete block",
    "Concrete — external concrete facade panels",
    "AAC (autoclaved aerated concrete) — lightweight block — confirm primer requirement",
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

export function FibreReinforcedRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are fibre-reinforced render systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Fibre-reinforced render systems incorporate discrete polypropylene, glass, or steel fibres into the cementitious render mix to improve tensile strength, reduce plastic shrinkage cracking, and distribute crack propagation more evenly across the render body. Unlike conventional sand-cement or polymer-modified renders, fibre-reinforced systems use the fibres as a micro-reinforcement integral to the mortar matrix rather than as a surface reinforcement layer.
        </p>
        {expanded && (
          <p>
            The most common fibre type used in Australian facade render systems is polypropylene monofilament fibre, added at the time of mixing at dosages typically between 0.5 and 1.0 kg/m³. Alkali-resistant glass fibres are used in specialist systems requiring higher tensile capacity. Fibres do not replace control joints — they reduce crack width and distribution, but properly spaced movement joints must still be designed into the render system. Product selection must confirm fibre type, dosage rate, and compatibility with the cementitious system from the current manufacturer TDS.
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

export function FibreReinforcedRenderProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — fibre-reinforced render systems — scroll to view all</p>
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
              Side-by-side comparison of fibre-reinforced render systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fibre type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Dosage</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Base coat</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish coat</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Crack resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fibreType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.dosage}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.baseCoat}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finishCoat}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.crackResistance}</td>
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
