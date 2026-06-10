"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Helical-bar"
  | "Stainless"
  | "304-SS"
  | "316-SS"
  | "Crack-stitching"
  | "Masonry"
  | "Retrofit"
  | "Epoxy"
  | "Anchor-grout"
  | "2C"
  | "Structural";

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
    fullLabel: "Helifix",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#ef4444",
    name: "Helifix Helibars 304",
    descriptionLine: "304 stainless steel helical bar for retrofit masonry crack stitching and structural reinforcement across cracked masonry",
    productType: "304 stainless helical bar crack stitching",
    filterTags: ["Helical-bar", "Stainless", "304-SS", "Crack-stitching", "Masonry", "Retrofit"],
    techChips: [
      { label: "Helical stainless bar", cls: "bg-sky-100 text-sky-800" },
      { label: "304 stainless steel", cls: "bg-slate-100 text-slate-700" },
      { label: "Crack stitching", cls: "bg-slate-100 text-slate-700" },
      { label: "Masonry reinforcement", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3700", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Helifix Helibars 304 are stainless steel helical bars designed for the retrofit stitching of structural and non-structural cracks in brick and block masonry facades. The helical profile allows the bar to be pressed or driven into a slot cut across the crack, engaging with mortar bed joints on each side. The bar is then secured using a cementitious or epoxy grout to form a continuous reinforcement bridge across the crack plane.\n\nIn Class 2 strata facade remediation, Helibars are widely used to stabilise cracked brickwork in accordance with structural engineer specifications. They are typically installed in horizontal mortar bed joints at regular vertical spacings determined by the structural engineer based on crack width, length, load conditions and masonry type. The 304 grade is suitable for sheltered and semi-exposed facade locations — confirm suitability for highly exposed or coastal environments with Helifix, where 316 grade may be required.\n\nInstallation requires controlled slot cutting in mortar joints, thorough slot cleaning, placement of the bar, and full grouting. All works should be carried out under a structural engineer's specification and inspected at each stage.",
    technicalProperties: [
      "304 stainless steel helical bar — good corrosion resistance for sheltered and semi-exposed facade locations in Australian Class 2 buildings",
      "Helical profile allows engagement with mortar beds on each side of a crack — bar is set into a pre-cut slot in the mortar joint and grouted in place",
      "Proprietary bar diameters and embedment lengths available — selection of bar size and spacing must be designed by a structural engineer for each specific crack location",
      "Compatible with cementitious repair mortars and epoxy anchor grouts for slot filling — confirm grout compatibility and mix ratio with Helifix before specifying",
      "Can be cut to length on site to suit varying masonry bond patterns and slot lengths — confirm cutting method with Helifix technical",
    ],
    limitations: [
      "Bar size, spacing and embedment depth must be specified by a structural engineer — not a self-specified repair",
      "Requires controlled slot cutting in mortar joints — saw cutting must not damage adjacent masonry units or create additional cracking",
      "304 grade may not be sufficient for coastal or highly aggressive environments — 316 stainless may be required — confirm with Helifix and the structural engineer",
      "Grout must be installed to completely fill the slot with no voids — inadequate grouting compromises the structural effectiveness of the stitching",
      "Not a replacement for full structural repair where the cause of cracking (differential settlement, inadequate ties, overloading) has not been addressed and resolved",
    ],
    procurementSources: [
      { name: "Helifix Australia — specialist structural masonry repair supplier — contact for current pricing", url: "https://www.helifix.com.au" },
      { name: "Remedial building specialist suppliers — confirm availability in your state", url: "https://www.helifix.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#3b82f6",
    name: "Sika AnchorFix-3001",
    descriptionLine: "Two-part epoxy anchor grout for setting stainless rods in drilled masonry slots for crack stitching and structural repair",
    productType: "Two-component epoxy anchor grout",
    filterTags: ["Epoxy", "Anchor-grout", "2C", "Crack-stitching", "Structural", "Masonry"],
    techChips: [
      { label: "Two-component epoxy", cls: "bg-sky-100 text-sky-800" },
      { label: "Anchor grout", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural", cls: "bg-slate-100 text-slate-700" },
      { label: "Crack stitching", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 3700", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika AnchorFix-3001 is a two-component epoxy anchor grout used for the structural setting of stainless steel rods and helical bars in drilled holes and cut slots in masonry for crack stitching applications. When used in crack stitching, the epoxy grout is injected into the pre-cut slot or drilled hole before insertion of the stainless bar, fully encapsulating the bar and creating a high-strength bond between the bar and the surrounding masonry.\n\nTwo-component epoxy anchor grouts develop high early strength and provide a reliable, durable bond in masonry substrates including brick, block, and concrete. The product is dispensed from a cartridge using a calibrated mixing nozzle to ensure correct A:B ratio — do not use without the manufacturer-supplied nozzle as incorrect mixing ratios will result in impaired or zero cure.\n\nSika AnchorFix-3001 is suitable for use with stainless steel rods and bars in masonry crack stitching works specified by a structural engineer. Confirm current product availability and technical data with Sika Australia — product designations may be subject to revision.",
    technicalProperties: [
      "Two-component epoxy — high bond strength in masonry substrates — suitable for structural crack stitching rod and bar embedment",
      "Dispensed from calibrated cartridge with a mixing nozzle — ensures consistent A:B ratio on site — do not bypass the mixing nozzle",
      "High early strength development — allows faster return to service than cementitious grouts in many applications — confirm with Sika TDS",
      "Compatible with stainless steel bars and rods used in crack stitching — confirm compatibility with specific bar specification",
      "Chemical resistance superior to cementitious grouts — suitable for locations subject to moisture exposure in facade remediation",
    ],
    limitations: [
      "Two-component — requires correct mixing nozzle — improperly mixed material will not cure and must be removed and replaced",
      "Temperature-sensitive pot life and cure time — confirm working time against site conditions (ambient temperature, substrate temperature) from current Sika TDS",
      "Masonry substrate must be clean, dry and free of dust, grease and loose material — contaminated holes and slots will compromise bond strength",
      "Not suitable for use in wet or water-filled holes without specific product selection — confirm with Sika technical",
      "Confirm current product specification, availability and compliance with Sika Australia before specifying — product range subject to revision",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Remedial building specialist suppliers and trade distributors — confirm current stock", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Helical-bar", label: "Helical bar" },
  { id: "Stainless", label: "Stainless" },
  { id: "304-SS", label: "304 SS" },
  { id: "316-SS", label: "316 SS" },
  { id: "Crack-stitching", label: "Crack stitching" },
  { id: "Masonry", label: "Masonry" },
  { id: "Retrofit", label: "Retrofit" },
  { id: "Epoxy", label: "Epoxy" },
  { id: "Anchor-grout", label: "Anchor grout" },
  { id: "2C", label: "Two-component" },
  { id: "Structural", label: "Structural" },
];

const BRAND_EQUIV: { system: string; helifix: string; sika: string }[] = [
  { system: "Helical stainless bar", helifix: "Helibars 304", sika: "—" },
  { system: "Epoxy anchor grout", helifix: "—", sika: "AnchorFix-3001" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  diameter: string;
  epoxyGrout: string;
  application: string;
  primaryUse: string;
}[] = [
  {
    product: "Helifix Helibars 304",
    brand: "Helifix",
    material: "304 stainless steel",
    diameter: "Per structural engineer specification",
    epoxyGrout: "Compatible (confirm with Helifix)",
    application: "Slot-cut into mortar bed joints",
    primaryUse: "Masonry crack stitching — structural reinforcement across crack plane",
  },
  {
    product: "Sika AnchorFix-3001",
    brand: "Sika Australia",
    material: "Two-component epoxy",
    diameter: "N/A — grout product",
    epoxyGrout: "Is the grout — encapsulates stainless rod",
    application: "Cartridge-dispensed into slot or drilled hole",
    primaryUse: "Structural setting and grouting of stainless rods for crack stitching",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Stitching structural and non-structural cracks in brick and block masonry facades of Class 2 strata buildings",
    "Reinforcing cracked masonry walls at mortar bed joint level — bar installed horizontally across the crack plane",
    "Stabilising diagonal staircase cracks in masonry facades following differential settlement or thermal movement",
    "Retrofitting additional reinforcement to masonry walls where original construction lacked adequate wall ties or reinforcement",
    "Providing crack control in masonry panels subject to ongoing thermal or moisture movement in conjunction with engineer-specified joint design",
  ],
  selectionCriteria: [
    "Bar diameter and spacing must be specified by a structural engineer — selection is not based on product preference alone",
    "Use 304 stainless in sheltered and semi-exposed locations — specify 316 stainless in coastal, highly exposed or chemically aggressive environments",
    "Select an epoxy anchor grout over cementitious grout where higher bond strength, faster cure or chemical resistance is required — confirm with structural engineer",
    "Confirm grout compatibility with bar type and masonry substrate before specifying — not all grouts are compatible with all bar profiles",
    "Confirm AS 3700 compliance of specified materials and installation method with the structural engineer before procurement",
  ],
  limitations: [
    "Crack stitching does not address the underlying cause of cracking — structural cause must be identified and remediated before or in conjunction with stitching",
    "Slot cutting in mortar joints requires precision — over-cutting can damage masonry units and worsen the defect",
    "Epoxy grouts have a limited working time (pot life) — temperature-dependent — works must be planned to avoid waste and incomplete installation",
    "304 stainless is not suitable for all environments — confirm grade selection against exposure conditions and design life requirements",
    "Inspection of completed grouting is essential — voids in the grout reduce structural effectiveness — confirm inspection protocol with structural engineer",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — the primary Australian standard for masonry construction and repair — governs structural masonry reinforcement requirements",
    "Structural engineer certification required for crack stitching specifications — bar size, spacing and embedment must be designed and documented",
    "Stainless steel bar grade must comply with durability requirements for the exposure environment — confirm with structural engineer and manufacturer TDS",
    "All crack stitching works on Class 2 strata buildings must be documented and may require building consent or development approval — confirm with local authority",
  ],
  suitableDefects: [
    "Structural and non-structural cracks in brick and block masonry facades requiring reinforcement across the crack plane",
    "Diagonal staircase cracking in masonry panels associated with differential settlement or thermal movement",
    "Horizontal cracking in masonry courses at lintels, sills or wall ties associated with corrosion-induced expansion",
    "Cracking in masonry facades following earthquake, impact or overloading events where the masonry wall integrity must be restored",
  ],
  typicalSubstrates: [
    "Clay brick masonry — mortar bed joints — horizontal slot cutting for helical bar installation",
    "Concrete block (CMU) masonry — mortar bed joints — horizontal slot cutting",
    "Calcium silicate (sandlime) brick masonry — confirm grout compatibility for this substrate type",
    "Mixed masonry assemblies — confirm bar and grout suitability for each substrate type with structural engineer and manufacturer",
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

export function CrackStitchingIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are masonry crack stitching systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Masonry crack stitching is a structural repair technique used to reinforce and stabilise cracked brickwork and blockwork in Class 2 strata facade systems. Stainless steel helical bars are installed across the crack plane — typically embedded in horizontal mortar bed joints on each side of the crack at regular vertical spacings — and secured with a cementitious or epoxy anchor grout. The stitched bars bridge the crack, restoring tensile continuity across the masonry and preventing further displacement of the cracked sections.
        </p>
        <p>
          In Australian Class 2 strata buildings, masonry crack stitching is used primarily for structural and non-structural cracks in brick and block masonry facades, including diagonal staircase cracking, horizontal cracking at lintel and sill levels, and cracking associated with differential settlement, thermal movement or inadequate original construction. The technique is governed by AS 3700 — Masonry Structures — and all crack stitching work must be designed and specified by a structural engineer before installation commences. Bar diameter, spacing, embedment depth and grout type are all design variables that must be determined for the specific defect and loading condition.
        </p>
        <p>
          The two core products in a crack stitching system are the stainless steel helical bar (such as Helifix Helibars 304) and the anchor grout used to set the bar in the slot (such as Sika AnchorFix-3001 two-component epoxy). Together, these form a complete crack stitching system — but the design of the system is the responsibility of the structural engineer, not the product supplier or the remedial contractor.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse masonry crack stitching with:</p>
          <ul className="space-y-1.5">
            {[
              "Epoxy crack injection — fills the crack void under pressure with liquid epoxy resin — no reinforcement bar is installed — does not provide tensile reinforcement across the crack plane",
              "Surface crack fillers — cosmetic repair products applied to the face of the crack — do not provide structural reinforcement and do not prevent further crack movement",
              "Standard masonry wall ties — used to connect masonry leaves in cavity wall construction — not designed for stitching across existing cracks in a single leaf",
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

export function CrackStitchingProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — helical bar and epoxy grout crack stitching systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of crack stitching products for masonry facade repair. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Diameter / size</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Epoxy grout</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Application method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.diameter}</td>
                  <td className="px-4 py-3 text-slate-600">{row.epoxyGrout}</td>
                  <td className="px-4 py-3 text-slate-600">{row.application}</td>
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
            <p className="mt-1 text-sm text-slate-500">Crack stitching system components across brands active in Australian Class 2 strata masonry facade remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Helifix</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Sika</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.helifix, row.sika].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Structural engineer assessment required</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Crack stitching for structural masonry cracks must be specified by a structural engineer — bar diameter, spacing and embedment depth are design variables that cannot be self-specified from a product data sheet alone",
            "A structural assessment is required to determine the cause of cracking before specifying a repair — crack stitching without identifying and addressing the root cause (settlement, corrosion, overloading, inadequate ties) may result in further cracking or facade failure",
            "The structural engineer must document the specification including bar grade, diameter, slot dimensions, spacing, embedment length, grout product and curing requirements — this documentation is required for building consent and for strata committee and insurer records",
            "Works must be inspected at each stage — slot cleanliness before grouting, bar placement, and grout fill must be verified — do not close slots with render or tile finishes until inspection is complete and recorded",
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
