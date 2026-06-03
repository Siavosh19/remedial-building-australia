"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "2-part"
  | "Polysulfide"
  | "Structural"
  | "Glazing"
  | "Curtain-wall"
  | "Low-movement"
  | "Chemical-resistant"
  | "Fuel-resistant"
  | "Immersion"
  | "Long-pot-life";

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
    fullLabel: "Bostik",
    brandUrl: "https://www.bostik.com/au",
    accentColor: "#E63946",
    name: "Bostik Thioflex 600",
    descriptionLine: "2-part polysulfide sealant — curtain wall, glazing channel and structural joint sealing",
    productType: "2-component polysulfide",
    filterTags: ["2-part", "Polysulfide", "Structural", "Glazing", "Curtain-wall", "Long-pot-life"],
    techChips: [
      { label: "2-component polysulfide", cls: "bg-purple-100 text-purple-800" },
      { label: "Structural glazing", cls: "bg-slate-100 text-slate-700" },
      { label: "Chemical resistant", cls: "bg-amber-50 text-amber-700" },
      { label: "Low modulus", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Bostik Thioflex 600 is a two-component polysulfide joint sealant suitable for structural glazing channel sealing, curtain wall perimeter joints, precast concrete joints and water-retaining structures. Used in Australian Class 2 and commercial building remediation for curtain wall joints, precast facade joint sealing and glazing channel applications where chemical resistance and long pot-life after mixing are required. Mix ratio must be confirmed from current TDS; substrate preparation and primer usage must follow Bostik technical guidance.",
    technicalProperties: [
      "2-component polysulfide — requires mixing of base and curing agent at specified ratio before application",
      "Low-modulus flexibility — accommodates movement in structural and curtain wall joints without cohesive failure",
      "Chemical resistance — resistant to many industrial chemicals, fuels and solvents — confirm from current Bostik TDS",
      "Fuel resistance — suitable for joints subject to fuel splash or immersion in fuel-exposed environments",
      "Good adhesion to glass, metal, concrete and masonry — confirm primer requirements per substrate from Bostik technical data",
    ],
    limitations: [
      "Mix ratio accuracy is critical — incorrect ratios will compromise cure and long-term joint performance",
      "Pot-life must be managed — once mixed, discard material if pot-life is exceeded — do not apply overaged sealant",
      "Substrate primer is required on most substrates — confirm primer selection from Bostik TDS before application",
      "Not suitable for high-movement facade joints where silicone or high-movement PU is specified — confirm movement rating",
      "Confirm current product specification, availability and TDS with Bostik Australia before specifying",
    ],
    procurementSources: [
      { name: "Bostik Australia trade supply — contact for current pricing", url: "https://www.bostik.com/au" },
      { name: "Facade and glazing distributors — confirm regional availability", url: "https://www.bostik.com/au" },
    ],
  },
  {
    fullLabel: "Fosroc",
    brandUrl: "https://www.fosroc.com/au",
    accentColor: "#003087",
    name: "Fosroc Nitoseal PS50",
    descriptionLine: "2-part polysulfide sealant — precast concrete joints, basement structures and water-retaining structures",
    productType: "2-component polysulfide",
    filterTags: ["2-part", "Polysulfide", "Structural", "Chemical-resistant", "Fuel-resistant", "Immersion"],
    techChips: [
      { label: "2-component polysulfide", cls: "bg-blue-100 text-blue-800" },
      { label: "Fuel resistant", cls: "bg-amber-50 text-amber-700" },
      { label: "Water-retaining structures", cls: "bg-sky-50 text-sky-700" },
      { label: "Low modulus", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitoseal PS50 is a two-component cold-applied polysulfide sealant used for sealing joints in precast concrete structures, basement retaining structures, water-retaining structures, airport pavements and industrial joints subject to fuel or chemical splash. In Australian Class 2 building remediation it is applied to below-grade structure joints, water retaining slab joints and industrial pavement control joints where resistance to fuels and chemicals is specified.",
    technicalProperties: [
      "Excellent fuel and chemical resistance — suitable for joints in areas subject to fuel splash or chemical exposure",
      "Good adhesion to concrete, masonry and metal — confirm primer requirements from Fosroc technical data",
      "Low modulus flexibility — accommodates movement in precast and structural joints without cohesive failure",
      "Suitable for submerged and water-retaining applications — used in basement and water-retaining structure joints",
      "2-component mixing from separate base and curing agent — cold-applied without heat equipment",
    ],
    limitations: [
      "Requires accurate mix ratio — incorrect mixing will compromise cure and joint performance",
      "Not suitable for glass-to-metal structural glazing — confirm application type with Fosroc technical",
      "Substrate must be clean, dry and primed per Fosroc data — confirm primer selection before application",
      "Pot-life is sensitive to temperature — higher temperatures reduce working time — plan accordingly",
      "Confirm product availability in the Australian market and with Fosroc Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Fosroc Australia technical and trade supply — contact for current pricing", url: "https://www.fosroc.com/au" },
      { name: "Concrete repair distributors — confirm regional availability", url: "https://www.fosroc.com/au" },
    ],
  },
  {
    fullLabel: "Sika",
    brandUrl: "https://aus.sika.com",
    accentColor: "#D2000F",
    name: "Sika Sikaflex-2c NS",
    descriptionLine: "2-component neutral-cure PU sealant — construction joints and facade movement joints",
    productType: "2-component PU",
    filterTags: ["2-part", "Structural", "Glazing", "Curtain-wall", "Chemical-resistant", "Long-pot-life"],
    techChips: [
      { label: "2-component PU", cls: "bg-red-50 text-red-700" },
      { label: "Neutral cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Construction joints", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-sag", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Sikaflex-2c NS is a 2-component, non-sag, neutral-cure polyurethane sealant for construction, facade and movement joints. While technically a polyurethane system (not a true polysulfide), it is frequently specified alongside polysulfide systems for construction joint applications where high chemical resistance, good adhesion and non-sag vertical application are required. Used in Australian Class 2 building remediation for perimeter sealant joints, facade panel joints and general construction joint applications.",
    technicalProperties: [
      "2-component neutral-cure PU — no mixing of acetic acid — suitable for a wide range of substrates",
      "Non-sag — suitable for vertical and overhead joint applications without sagging or slumping",
      "High movement accommodation — good elongation and recovery for construction and facade joints",
      "Paintable after cure — suitable for colour-matched repair in visible facade locations",
      "Compatible with many substrates — confirm primer requirements per substrate from Sika TDS before application",
    ],
    limitations: [
      "Not a true polysulfide — do not substitute for polysulfide without confirming chemical resistance specification meets project requirement",
      "Requires primer on porous substrates — confirm from Sika TDS per substrate combination before application",
      "Mix ratio is critical — incorrect ratios will compromise cure and long-term joint performance",
      "Working time is limited after mixing — plan application to complete within pot-life — discard overaged material",
      "Confirm current product name, specification and availability with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — aus.sika.com — trade supply", url: "https://aus.sika.com" },
      { name: "Sika trade distributors nationwide — confirm regional availability", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Tremco",
    brandUrl: "https://www.tremcosealants.com/au",
    accentColor: "#005EB8",
    name: "Tremco Dymonic FC",
    descriptionLine: "1-component hybrid polyurethane sealant — facade, window perimeter and movement joints",
    productType: "1-component hybrid PU",
    filterTags: ["Structural", "Curtain-wall", "Chemical-resistant", "Low-movement"],
    techChips: [
      { label: "1-component hybrid PU", cls: "bg-blue-100 text-blue-800" },
      { label: "Paintable", cls: "bg-slate-100 text-slate-700" },
      { label: "Facade joints", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-sag", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco Dymonic FC is a one-component hybrid polyurethane sealant used for facade joint sealing, window perimeter sealing, expansion joints and general movement joints in Australian Class 2 strata and commercial building remediation. While not a true 2-part polysulfide, it is listed as a Tremco alternative sealant frequently used alongside polysulfide specifications in facade and curtain wall applications. Suitable for facade sealing, pre-cast panel joints and window perimeter applications.",
    technicalProperties: [
      "1-component moisture cure — no site mixing required — straightforward field application",
      "Non-sag — suitable for vertical and overhead facade joint applications",
      "Good UV resistance for a PU system — suitable for external facade exposure in Australian conditions",
      "Paintable after cure — suitable for colour-matched facade joint repairs",
      "Excellent adhesion to glass, metal and concrete — confirm primer requirements from Tremco TDS per substrate",
    ],
    limitations: [
      "1-component — not a polysulfide — confirm that the project specification does not require a true 2-part polysulfide system",
      "Not suitable for immersed or water-retaining structure joints — do not use in below-grade submerged conditions",
      "Cure time is dependent on ambient humidity and temperature — allow adequate cure before exposure",
      "Confirm with Tremco Australia that Dymonic FC meets project chemical resistance and movement requirements",
      "Confirm current product specification, local availability and current TDS with Tremco Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco Australia — tremcosealants.com.au — trade supply", url: "https://www.tremcosealants.com/au" },
      { name: "Facade and glazing trade distributors — confirm regional availability", url: "https://www.tremcosealants.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Polysulfide", label: "Polysulfide" },
  { id: "2-part", label: "2-part" },
  { id: "Structural", label: "Structural" },
  { id: "Glazing", label: "Glazing" },
  { id: "Chemical-resistant", label: "Chemical-resistant" },
  { id: "Fuel-resistant", label: "Fuel-resistant" },
];

const BRAND_EQUIV: { system: string; bostik: string; fosroc: string; sika: string; tremco: string }[] = [
  { system: "Structural glazing channel", bostik: "Thioflex 600", fosroc: "—", sika: "Sikaflex-2c NS", tremco: "—" },
  { system: "Precast/basement joints", bostik: "Thioflex 600", fosroc: "Nitoseal PS50", sika: "Sikaflex-2c NS", tremco: "—" },
  { system: "Facade/movement joints", bostik: "—", fosroc: "—", sika: "Sikaflex-2c NS", tremco: "Dymonic FC" },
  { system: "Water-retaining structures", bostik: "Thioflex 600", fosroc: "Nitoseal PS50", sika: "—", tremco: "—" },
];

const SYSTEM_COMPARISON: {
  property: string;
  thioflex: string;
  nitoseal: string;
  sikaflex2c: string;
  dymonic: string;
}[] = [
  { property: "Components", thioflex: "2-part", nitoseal: "2-part", sikaflex2c: "2-part", dymonic: "1-part" },
  { property: "Cure type", thioflex: "Polysulfide", nitoseal: "Polysulfide", sikaflex2c: "Neutral-cure PU", dymonic: "Moisture-cure PU-hybrid" },
  { property: "Movement capacity", thioflex: "Low–medium", nitoseal: "Low–medium", sikaflex2c: "Medium–high", dymonic: "Medium" },
  { property: "Chemical resistance", thioflex: "Excellent", nitoseal: "Excellent", sikaflex2c: "Good", dymonic: "Moderate" },
  { property: "Fuel resistance", thioflex: "Good", nitoseal: "Excellent", sikaflex2c: "Moderate", dymonic: "Limited" },
  { property: "Submerged use", thioflex: "Yes", nitoseal: "Yes", sikaflex2c: "Confirm TDS", dymonic: "No" },
  { property: "Application", thioflex: "Curtain wall / glazing", nitoseal: "Below-grade / industrial", sikaflex2c: "Facade / construction joints", dymonic: "Facade / window perimeter" },
];

const TECH_INFO = [
  {
    icon: "layers" as const,
    title: "2-component mixing",
    style: "warn" as const,
    items: [
      "Mix ratio must be followed exactly — the base and curing agent must be combined at the ratio specified in the current manufacturer TDS",
      "Pot-life begins as soon as mixing is complete — plan application quantity to avoid mixed material sitting unused",
      "Discard material if pot-life is exceeded — do not apply overaged sealant — cohesive failure will result",
      "Temperature affects pot-life — higher temperatures shorten working time — plan mixing quantities accordingly",
      "Mechanical mixing is preferred for uniform dispersion of curing agent through the base compound",
    ],
  },
  {
    icon: "ruler" as const,
    title: "Joint design",
    style: "bullet" as const,
    items: [
      "Width-to-depth ratio must comply with manufacturer specification — typically 2:1 width to depth for elastomeric sealants",
      "Backing rod is mandatory — closed-cell polyethylene foam rod controls sealant depth and prevents three-sided adhesion",
      "Bond breaker tape must be used where backing rod cannot be installed — prevents adhesion to the back face of the joint",
      "Three-sided adhesion causes cohesive failure — sealant must only bond to the two joint faces, not the back",
      "Minimum joint width must be calculated from anticipated maximum thermal or structural movement",
    ],
  },
  {
    icon: "check" as const,
    title: "Substrate preparation",
    style: "check" as const,
    items: [
      "Substrate must be clean, dry and free of dust, oil, release agents, laitance and loose material before priming",
      "Primer selection is critical — use the primer recommended by the manufacturer for each specific substrate type",
      "Allow primer to dry to the correct tack condition before applying sealant — check primer open time from TDS",
      "Do not apply polysulfide sealant to wet or damp substrates — moisture will affect adhesion and cure",
      "Confirm surface preparation method — mechanical abrasion, solvent wipe or both — from manufacturer TDS per substrate",
    ],
  },
  {
    icon: "book" as const,
    title: "Standards",
    style: "bullet" as const,
    items: [
      "ISO 11600 does not directly classify polysulfide sealants — it primarily covers silicone and PU sealant systems",
      "ASTM C920 — Standard Specification for Elastomeric Joint Sealants — commonly referenced for polysulfide products on Australian TDS",
      "AS 4330 — Movement Joints — relevant to joint design requirements for polysulfide sealant applications in Australia",
      "NCC Volume One — performance requirements for weatherproofing of Class 2 building envelopes — applicable to facade joints",
      "Confirm applicable standards with project engineer or facade consultant before specifying polysulfide joint sealants",
    ],
  },
];

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

export function PolysulfideSealantsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are polysulfide joint sealants?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Polysulfide joint sealants are two-component elastomeric sealants based on liquid polysulfide polymer chemistry. A base compound and a curing agent are mixed on site at a specified ratio before application. Once cured, polysulfide sealants provide a durable flexible seal with good chemical resistance, fuel resistance and adhesion to concrete, masonry, metal and glass. They are historically used in curtain wall glazing channels, precast concrete facade joints, basement structure joints and water-retaining structure joints where chemical or fuel resistance is required.
        </p>
        <p>
          In Australian Class 2 commercial and curtain wall building remediation, polysulfide sealants are specified for joints where the chemical environment or immersion conditions rule out standard silicone or polyurethane sealants. Product selection must consider the mix ratio, pot-life management, substrate primer requirements, joint design (width-to-depth ratio, backing rod, bond breaker), movement expectations, chemical exposure and applicable standards.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Silicone sealants — one-component, different polymer chemistry — not a polysulfide — do not substitute without confirming chemical resistance requirements",
            "Polyurethane sealants — one or two-component PU systems — different chemistry to polysulfide — confirm specification before substituting",
            "Hybrid PU sealants — one-component moisture-cure systems — not a true polysulfide — check specification for required chemistry",
            "Expansion joint cover systems — proprietary mechanical cover plates for wide structural expansion joints — not sealant-based",
            "Epoxy joint fillers — rigid non-moving compounds — not elastomeric movement joint sealants — do not use in movement joints",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-xs leading-5 text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
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

export function PolysulfideSealantsProductSection() {
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
              2-component mixing, joint design, substrate preparation and standards
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
            <div className="grid gap-6 md:grid-cols-2">
              {TECH_INFO.map((card) => {
                const iconMap = {
                  layers: <Layers size={15} />,
                  ruler: <Ruler size={15} />,
                  check: <CheckCircle size={15} />,
                  book: <BookOpen size={15} />,
                };
                return (
                  <TechCard
                    key={card.title}
                    icon={iconMap[card.icon]}
                    title={card.title}
                    items={card.items}
                    style={card.style}
                  />
                );
              })}
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
            <p className="mt-1 text-sm text-slate-500">4 products — 3 brands — polysulfide and 2-part joint sealant systems — scroll to view all</p>
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

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">
              Polysulfide and 2-part joint sealant equivalents across brands active in Australian Class 2 and commercial building remediation. Confirm exact product and specification with manufacturer before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">
                  Joint Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#E63946" }}>Bostik</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#003087" }}>Fosroc</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#D2000F" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#005EB8" }}>Tremco</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.system}
                  </td>
                  {[row.bostik, row.fosroc, row.sika, row.tremco].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {val === "—" ? <span className="text-slate-300">—</span> : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Key technical properties compared across the four listed products. Confirm all data against current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">
                  Property
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#E63946" }}>Bostik Thioflex 600</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#003087" }}>Fosroc Nitoseal PS50</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#D2000F" }}>Sika Sikaflex-2c NS</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#005EB8" }}>Tremco Dymonic FC</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.property} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.property}
                  </td>
                  {[row.thioflex, row.nitoseal, row.sikaflex2c, row.dymonic].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {val === "—" ? <span className="text-slate-300">—</span> : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Joint Design Warning ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Critical — Mixing, Pot-life and Joint Design</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Mix ratio must be followed exactly — incorrect base-to-curing-agent ratio will result in incomplete cure or uncured sealant in the joint",
            "Pot-life begins immediately on mixing — discard any mixed material that has exceeded the pot-life stated in the current manufacturer TDS",
            "Backing rod is mandatory for all movement joint sealant applications — bond breaker tape or closed-cell polyethylene foam rod must be installed before sealant application to prevent three-sided adhesion",
            "Three-sided adhesion causes cohesive failure — if sealant bonds to the back of the joint as well as the two joint faces, the sealant cannot stretch without tearing",
            "Joint width must be designed from anticipated maximum movement — minimum 6 mm joint width — confirm design calculations with project engineer before sealing",
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
