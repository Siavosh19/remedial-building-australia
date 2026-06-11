"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "EIFS"
  | "EPS-insulation"
  | "Mesh-reinforced"
  | "Exterior"
  | "Lightweight"
  | "Masonry"
  | "Concrete"
  | "Pre-bagged"
  | "Coastal"
  | "AS-3700"
  | "NCC"
  | "Remediation";

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
    fullLabel: "Rockcote / Saint-Gobain Weber",
    brandUrl: "https://www.rockcote.com.au",
    accentColor: "#b45309",
    name: "Rockcote EPS Render System",
    descriptionLine:
      "EIFS — EPS insulation board mechanically fixed to substrate + fibreglass mesh-reinforced polymer render base coat + fine finish coat — exterior facade — Rockcote / Saint-Gobain Weber",
    productType: "EIFS — EPS insulation board + mesh-reinforced render — exterior facade",
    filterTags: ["EIFS", "EPS-insulation", "Mesh-reinforced", "Exterior", "Masonry", "Concrete", "Lightweight", "Pre-bagged", "AS-3700"],
    techChips: [
      { label: "EPS insulation board", cls: "bg-amber-100 text-amber-800" },
      { label: "Fibreglass mesh reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior facade", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote (Saint-Gobain Weber) EIFS system consists of EPS insulation board mechanically fixed or adhesively bonded to the facade substrate, followed by a polymer-modified render base coat applied over embedded fibreglass reinforcing mesh, and a fine finish coat. The system is used for remediation of EIFS facades where sections of EPS and render have failed or delaminated, and for full replacement of failed lightweight cladding systems. Confirm the specific Rockcote EIFS system, system guide, approved EPS type, mesh specification, adhesive, and render products with Saint-Gobain Weber / Rockcote technical before specifying. TODO: owner confirm — Rockcote EIFS system guide, approved products, and TDS.",
    technicalProperties: [
      "EPS insulation board — mechanically fixed and/or adhesively bonded",
      "Fibreglass mesh embedded in base coat render",
      "Polymer-modified base coat render over mesh",
      "Fine finish coat over cured base",
      "Suitable for exterior masonry and concrete substrates",
      "Confirm system guide — EPS type, thickness, mechanical fixing pattern, mesh specification, adhesive and render — with Rockcote technical",
    ],
    limitations: [
      "EIFS requires strict system compliance — do not mix components from different manufacturers without written approval",
      "EPS board must be compatible specified type — confirm with Rockcote",
      "Fibreglass mesh must be compatible with base coat render — confirm specification",
      "TODO: owner confirm — complete Rockcote EIFS system guide, approved EPS, mesh, and render products",
      "Not a DIY system — requires trained and experienced applicator",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber Australia", url: "https://www.rockcote.com.au" },
      { name: "Saint-Gobain Weber trade distribution", url: "https://www.rockcote.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#0369a1",
    name: "Mapei EIFS Remediation System",
    descriptionLine:
      "EIFS repair and replacement — Mapei adhesive mortar, EPS insulation board, fibreglass reinforcing mesh, base coat render and finish coat — exterior facade remediation",
    productType: "EIFS — EPS + mesh-reinforced render — exterior facade remediation",
    filterTags: ["EIFS", "EPS-insulation", "Mesh-reinforced", "Exterior", "Masonry", "Concrete", "Pre-bagged", "Remediation", "AS-3700"],
    techChips: [
      { label: "EPS insulation board", cls: "bg-sky-100 text-sky-800" },
      { label: "Mapei system", cls: "bg-slate-100 text-slate-700" },
      { label: "Remediation", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei supplies adhesives, base coat renders, and finish coat products compatible with EIFS remediation and replacement. Confirm specific Mapei products for the EIFS substrate adhesive, base coat over mesh, and finish coat with Mapei Australia technical. Mapei products used in EIFS systems include Mapetherm range (EPS adhesive mortars) and Planitop system for base coat application. TODO: owner confirm — Mapei EIFS system guide, approved products and TDS for Australian EIFS remediation.",
    technicalProperties: [
      "Mapei Mapetherm or equivalent adhesive mortar for EPS bonding",
      "Fibreglass reinforcing mesh embedded in Mapei base coat",
      "Fine finish coat over cured base",
      "Confirm complete system guide with Mapei Australia",
      "Suitable for exterior masonry and concrete substrates",
    ],
    limitations: [
      "TODO: owner confirm — complete Mapei EIFS system, approved EPS, mesh, adhesive, base coat and finish coat with Mapei Australia technical",
      "System compliance — do not mix Mapei components with other manufacturers without written approval",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#166534",
    name: "Sika EIFS System (SikaCeram / Sika Facade)",
    descriptionLine:
      "EIFS facade system — Sika adhesive, EPS insulation board, fibreglass mesh, Sika base coat and finish render — exterior facade remediation and new installation",
    productType: "EIFS — EPS + fibreglass mesh + Sika render — exterior facade",
    filterTags: ["EIFS", "EPS-insulation", "Mesh-reinforced", "Exterior", "Concrete", "Masonry", "Pre-bagged", "Coastal", "Remediation"],
    techChips: [
      { label: "Sika EIFS system", cls: "bg-green-100 text-green-800" },
      { label: "EPS + mesh", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior facade", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika supplies EIFS systems including adhesive mortars, base coat renders, reinforcing mesh, and finish coat products. Confirm the specific Sika EIFS system guide, approved EPS type, fibreglass mesh specification, adhesive, base coat and finish coat with Sika Australia technical before specifying. TODO: owner confirm — Sika EIFS system guide and approved products for Australian EIFS facade remediation.",
    technicalProperties: [
      "Sika adhesive mortar for EPS bonding",
      "Fibreglass mesh embedded in Sika base coat",
      "Sika finish coat",
      "Complete system from one manufacturer",
      "Confirm system guide with Sika Australia",
    ],
    limitations: [
      "TODO: owner confirm — complete Sika EIFS system and approved products with Sika Australia technical",
      "System compliance required",
      "Requires trained applicator",
    ],
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Sika national distribution", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Sto Australia",
    brandUrl: "https://www.sto.com/au",
    accentColor: "#1e40af",
    name: "Sto EIFS System (StoTherm / StoLevell)",
    descriptionLine:
      "EIFS facade system — Sto adhesive, EPS insulation board, Sto fibreglass reinforcing mesh, StoLevell base coat and StoSilco or StoTex finish coat — exterior facade",
    productType: "EIFS — Sto EPS + mesh + base coat + finish — exterior facade",
    filterTags: ["EIFS", "EPS-insulation", "Mesh-reinforced", "Exterior", "Masonry", "Concrete", "Pre-bagged", "Coastal", "NCC", "Remediation"],
    techChips: [
      { label: "StoTherm system", cls: "bg-blue-100 text-blue-800" },
      { label: "EPS + Sto mesh", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior facade", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sto is a specialist EIFS manufacturer whose StoTherm system is commonly specified in Australian EIFS remediation and new installation projects. The StoTherm system includes EPS insulation board, Sto adhesive mortar, StoArmat base coat render applied over embedded Sto fibreglass reinforcing mesh, and Sto finish coats including StoSilco (silicone render) or StoTex. The Sto system is supported by technical representatives in Australia who can confirm system selection, EPS specification, and application guides. TODO: owner confirm — confirm Sto StoTherm system TDS, approved components, and applicator requirements with Sto Australia.",
    technicalProperties: [
      "StoTherm — EPS + StoArmat base coat + fibreglass mesh + Sto finish coat",
      "Complete EIFS system with full technical support",
      "Sto fibreglass mesh included in system specification",
      "StoSilco or StoTex finish coat options",
      "Suitable for exterior masonry, concrete, and steel stud framing substrates",
      "Confirm EPS type, thickness, and mechanical fixing pattern with Sto Australia",
    ],
    limitations: [
      "Sto system must be installed by trained and Sto-approved applicator",
      "TODO: owner confirm — complete StoTherm system specification, EPS type, mechanical fixing, and mesh specification with Sto Australia",
      "Do not substitute Sto components with other manufacturers without written approval",
      "Confirm NCC compliance and fire performance with Sto Australia",
    ],
    procurementSources: [
      { name: "Sto Australia — technical representative and trade supply", url: "https://www.sto.com/au" },
      { name: "Sto-approved applicators nationally", url: "https://www.sto.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "EIFS", label: "EIFS" },
  { id: "EPS-insulation", label: "EPS insulation" },
  { id: "Mesh-reinforced", label: "Mesh-reinforced" },
  { id: "Exterior", label: "Exterior" },
  { id: "Lightweight", label: "Lightweight" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Pre-bagged", label: "Pre-bagged" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "NCC", label: "NCC" },
  { id: "Remediation", label: "Remediation" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  epsAdhesive: string;
  meshType: string;
  baseCoat: string;
  finishCoat: string;
  fireFaceRating: string;
  primaryUse: string;
}[] = [
  {
    product: "Rockcote EPS Render System",
    brand: "Rockcote / Saint-Gobain Weber",
    epsAdhesive: "Confirm with Rockcote technical",
    meshType: "Fibreglass mesh (confirm spec with Rockcote)",
    baseCoat: "Rockcote polymer-modified base coat",
    finishCoat: "Rockcote fine finish coat",
    fireFaceRating: "TODO: confirm fire rating with manufacturer",
    primaryUse: "EIFS remediation and replacement on exterior masonry and concrete facades",
  },
  {
    product: "Mapei EIFS Remediation System",
    brand: "Mapei",
    epsAdhesive: "Mapei Mapetherm (confirm current product)",
    meshType: "Fibreglass mesh (confirm spec with Mapei)",
    baseCoat: "Mapei Planitop system (confirm with Mapei)",
    finishCoat: "Mapei fine finish coat (confirm with Mapei)",
    fireFaceRating: "TODO: confirm fire rating with manufacturer",
    primaryUse: "EIFS facade remediation — exterior masonry and concrete",
  },
  {
    product: "Sika EIFS System",
    brand: "Sika",
    epsAdhesive: "Sika adhesive mortar (confirm with Sika)",
    meshType: "Fibreglass mesh (confirm spec with Sika)",
    baseCoat: "Sika base coat (confirm with Sika)",
    finishCoat: "Sika finish coat (confirm with Sika)",
    fireFaceRating: "TODO: confirm fire rating with manufacturer",
    primaryUse: "EIFS facade remediation and new installation — exterior",
  },
  {
    product: "Sto StoTherm System",
    brand: "Sto Australia",
    epsAdhesive: "Sto adhesive mortar",
    meshType: "Sto fibreglass reinforcing mesh",
    baseCoat: "StoArmat base coat",
    finishCoat: "StoSilco or StoTex",
    fireFaceRating: "TODO: confirm fire rating with manufacturer",
    primaryUse: "EIFS remediation and new installation — exterior masonry, concrete, steel stud framing",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Full EIFS facade replacement where EPS and render system has failed by delamination, water ingress, or impact damage",
    "Partial EIFS panel replacement matching existing EPS thickness and render profile",
    "EIFS installation on new construction or converted buildings where insulation and render system is specified",
    "Facade re-rendering over new EPS insulation where thermal upgrade is included in remediation scope",
  ],
  selectionCriteria: [
    "System completeness — EIFS components (EPS, adhesive, mesh, base coat, finish coat) must be from the same approved system — do not mix components",
    "EPS type and thickness — confirm with manufacturer based on thermal and structural requirements",
    "Mechanical fixing — confirm fixing pattern, fastener type, and spacing from manufacturer system guide",
    "Fire performance — confirm NCC-compliant fire performance of the complete system with the manufacturer",
    "Applicator qualification — confirm manufacturer requires trained and approved applicator",
  ],
  limitations: [
    "EIFS is not suitable as a patch repair over deteriorated or failing render — substrate must be assessed and all failing material removed before EIFS installation",
    "Fire performance — confirm NCC Volume One external wall fire spread requirements are met by the complete EIFS system",
    "Do not use EIFS in areas subject to mechanical damage without protective mesh and impact-rated base coat",
    "Penetrations and terminations require specialist detailing — confirm with manufacturer",
  ],
  standardsNotes: [
    "NCC Volume One — external wall fire spread and weatherproofing performance requirements",
    "AS 3700 — Masonry Structures (for masonry substrate works)",
    "AS/NZS 1580 — coatings — application methods",
    "Manufacturer EIFS system guide — critical for EPS type, fixing, mesh, base coat and finish coat specification",
    "CodeMark or similar certification — confirm NCC compliance certification with EIFS manufacturer",
  ],
  suitableDefects: [
    "EIFS facade delamination — EPS separation from substrate or base coat",
    "EIFS render cracking and delamination over EPS insulation board",
    "Failed lightweight facade cladding system requiring full removal and EIFS replacement",
    "Thermal upgrade remediation — new EIFS over existing substrate where insulation is added to the scope",
  ],
  typicalSubstrates: [
    "Masonry — brick and block — existing render must be fully removed before EIFS installation",
    "Concrete — external concrete facade panels",
    "Light gauge steel stud framing — confirm EIFS suitability and mechanical fixing method with manufacturer",
    "Existing sound substrate — confirm surface preparation requirements with EIFS manufacturer",
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

export function EifsRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are EIFS render systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          EIFS (External Insulation and Finish Systems) are composite facade systems consisting of EPS (expanded polystyrene) insulation board mechanically fixed and/or adhesively bonded to the facade substrate, a polymer-modified render base coat applied over embedded alkali-resistant fibreglass reinforcing mesh, and a finish coat. They are used in Australian remediation works where the existing EIFS has failed, or where a new insulated render system is being installed over an existing substrate.
        </p>
        {expanded && (
          <p>
            EIFS should be treated as a complete system from a single manufacturer — EPS type, adhesive, base coat, mesh, and finish coat must all be from the approved system. Mixing components from different manufacturers without written approval may void system certification and create incompatibility risks. NCC fire performance requirements must be confirmed with the EIFS manufacturer, particularly in buildings that require compliance with external wall fire spread provisions. Applicator qualification is typically required — confirm with the manufacturer.
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

export function EifsRenderProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — EIFS render systems — scroll to view all</p>
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
              Side-by-side comparison of EIFS render systems. Confirm all product selections against the current manufacturer TDS before specifying. Fire face ratings must be confirmed with the EIFS manufacturer.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">EPS adhesive</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mesh type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Base coat</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish coat</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fire face rating</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.epsAdhesive}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.meshType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.baseCoat}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finishCoat}</td>
                  <td className="px-4 py-3 text-amber-700 font-semibold whitespace-nowrap text-[11px]">{row.fireFaceRating}</td>
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
