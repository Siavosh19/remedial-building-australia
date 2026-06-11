"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Stainless"
  | "304-SS"
  | "Aluminium"
  | "PVC"
  | "Corner-bead"
  | "External-corner"
  | "Corrosion-resistant"
  | "Render"
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
    fullLabel: "Rondo Building Services",
    brandUrl: "https://www.rondo.com.au",
    accentColor: "#ef4444",
    name: "Rondo Stainless Arris Angle",
    descriptionLine: "304 stainless steel render arris angle for exposed external corners on coastal and corrosive exposure facades",
    productType: "304 stainless steel render arris bead",
    filterTags: ["Stainless", "304-SS", "Corner-bead", "External-corner", "Corrosion-resistant", "Render", "Coastal"],
    techChips: [
      { label: "304 stainless steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Corrosion-resistant", cls: "bg-green-50 text-green-700" },
      { label: "Coastal / C4+", cls: "bg-amber-50 text-amber-700" },
      { label: "External corner bead", cls: "bg-slate-100 text-slate-700" },
      { label: "Render system", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Rondo Stainless Arris Angle is a 304 grade stainless steel render corner bead used for the protection and definition of external corners on rendered masonry and concrete facade substrates. It is the preferred product for facades located in coastal, marine or corrosive environments where aluminium or mild steel beads are not suitable due to accelerated corrosion under the render.\n\nThe stainless angle is embedded in the render coat during application, providing a hard edge to the render return at the external corner and preventing chipping and damage at arris points. The perforated wings key into the render coat on both faces and provide mechanical bond. For Class 2 strata facade remediation where existing steel or aluminium arris beads have corroded and caused render staining or delamination, full removal and replacement with stainless is the preferred remedial approach in corrosive exposure zones.\n\nConfirm current product designation, sizing and availability with Rondo Building Services. Product range and designations are subject to revision — always obtain the current Rondo technical data sheet before specifying.",
    technicalProperties: [
      "304 stainless steel — corrosion-resistant — preferred for C4 and C5 exposure zones including coastal, marine and pool environments",
      "Perforated wings for mechanical key into render coat on both faces of the corner — compatible with sand cement, polymer-modified and acrylic render systems",
      "Hard arris edge protects render returns at external corners from impact damage and chipping",
      "Dimensionally stable — stainless steel does not expand differentially from masonry/concrete substrate at rates that cause render cracking over time",
      "Available in standard lengths — confirm current size range (leg dimensions and gauge) with Rondo Building Services",
    ],
    limitations: [
      "Higher cost than aluminium or PVC alternatives — use where corrosive exposure warrants the additional cost",
      "Requires full removal of existing corroded bead including all contaminated render before installation — do not render over existing corroded angles",
      "Stainless steel can still be subject to pitting corrosion in very high chloride environments (C5M marine) — confirm with Rondo for severe marine exposures",
      "Bead must be set to correct plane and plumb during render application — cannot be adjusted after render sets",
      "Confirm current product specification and compliance with Rondo Building Services before specifying",
    ],
    procurementSources: [
      { name: "Rondo Building Services — trade supply nationally — contact for current pricing and availability", url: "https://www.rondo.com.au" },
      { name: "Building materials trade suppliers — confirm stainless bead stock availability with local supplier", url: "https://www.rondo.com.au" },
    ],
  },
  {
    fullLabel: "Trim-Tex Australia",
    brandUrl: "https://www.trimtex.com.au",
    accentColor: "#3b82f6",
    name: "Trim-Tex PVC Corner Bead",
    descriptionLine: "PVC arris angle bead for render systems at external corners — lightweight and rust-free for non-coastal applications",
    productType: "PVC render and plaster corner bead",
    filterTags: ["PVC", "Corner-bead", "External-corner", "Lightweight", "Render"],
    techChips: [
      { label: "PVC", cls: "bg-sky-100 text-sky-800" },
      { label: "Rust-free", cls: "bg-green-50 text-green-700" },
      { label: "Lightweight", cls: "bg-slate-100 text-slate-700" },
      { label: "External corner bead", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-coastal", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Trim-Tex PVC Corner Bead is a rigid PVC arris angle bead for external corners in rendered and plastered wall systems. PVC beads are inherently rust-free and will not cause render staining or delamination from corrosion of the bead body. They are suited to sheltered and non-coastal exterior applications where corrosive exposure is classified C1 to C3 and where the lightweight, easy-to-cut characteristics of PVC are advantageous.\n\nThe perforated PVC wings embed in the render coat and provide mechanical key. The hard nose of the bead defines the arris and protects the render return from impact. PVC does not conduct heat differentially in the way that metal beads can, which may reduce thermally-induced stress cracking risk at the corner bead in some render systems.\n\nNote that PVC corner beads are generally not recommended for highly exposed coastal or corrosive facade applications as the PVC nose can become brittle with prolonged UV exposure over time, and PVC is not as dimensionally rigid as stainless steel in heavy render applications. Confirm suitability for the specific render system and exposure category with Trim-Tex Australia before specifying.",
    technicalProperties: [
      "PVC material — rust-free and will not corrode, stain render or cause delamination from bead corrosion",
      "Lightweight and easy to cut to length on site — reduces installation time compared to metal beads",
      "Perforated wings provide mechanical key into render coat — compatible with standard sand cement and polymer-modified render systems",
      "Hard PVC nose defines the arris edge and provides impact resistance to the render return",
      "Available in standard lengths — confirm current size range and product designations with Trim-Tex Australia",
    ],
    limitations: [
      "Not recommended for coastal, marine or corrosive exposure environments (C4/C5) — use stainless steel in these zones",
      "PVC can become brittle with long-term UV exposure in highly exposed uncoated facade conditions — confirm suitability for exposed applications",
      "Not as dimensionally rigid as metal beads in heavy or thick render applications — confirm for heavyweight render systems",
      "May require specific adhesive or fastening in some render system applications — confirm fixing method with Trim-Tex technical",
      "Confirm current product specification and compliance with Trim-Tex Australia before specifying",
    ],
    procurementSources: [
      { name: "Trim-Tex Australia — trade supply — contact for current pricing and availability", url: "https://www.trimtex.com.au" },
      { name: "Plasterboard and render accessory trade suppliers — confirm PVC corner bead availability locally", url: "https://www.trimtex.com.au" },
    ],
  },
  {
    fullLabel: "Rondo Building Services",
    brandUrl: "https://www.rondo.com.au",
    accentColor: "#22c55e",
    name: "Rondo Aluminium Render Bead",
    descriptionLine: "Standard aluminium arris angle render bead for external corners on non-coastal facade applications",
    productType: "Aluminium render arris angle bead",
    filterTags: ["Aluminium", "Corner-bead", "External-corner", "Lightweight", "Render"],
    techChips: [
      { label: "Aluminium", cls: "bg-sky-100 text-sky-800" },
      { label: "Lightweight", cls: "bg-slate-100 text-slate-700" },
      { label: "Standard exposure", cls: "bg-slate-100 text-slate-700" },
      { label: "External corner bead", cls: "bg-slate-100 text-slate-700" },
      { label: "C2 / C3 zones", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Rondo Aluminium Render Bead is the standard aluminium arris angle bead for external render corners in non-coastal and standard exposure facade applications. Aluminium is lighter than stainless steel and easier to cut on site, making it widely used for render bead applications in C2 and C3 exposure categories where corrosive exposure is not a primary concern.\n\nAluminium render beads are embedded in the render coat during application with the perforated wings keying into the render on both faces. The hard aluminium nose defines the arris, provides impact resistance and guides the render screed to a consistent corner return. Aluminium beads are suitable for use with standard sand cement and polymer-modified render systems in sheltered to moderately exposed facade conditions.\n\nAluminium should not be specified in coastal, marine or pool environments (C4/C5) where chloride-driven corrosion of the aluminium bead under the render can cause render staining, blistering and delamination. In these environments, 304 stainless steel arris angles are the correct specification. Confirm exposure category classification per AS 2312 before selecting bead material.",
    technicalProperties: [
      "Aluminium construction — significantly lighter than stainless steel — easy to cut and handle on site",
      "Perforated wings for mechanical key into render on both faces — compatible with sand cement, polymer-modified and acrylic render systems",
      "Hard aluminium nose defines arris edge and guides render screeding to a consistent external corner profile",
      "Suitable for C2 and C3 exposure categories in non-coastal inland and sheltered applications",
      "Available in standard lengths and leg dimensions — confirm current size range with Rondo Building Services",
    ],
    limitations: [
      "Not suitable for coastal, marine or pool environments (C4/C5) — aluminium will corrode under render in high chloride environments causing render staining and delamination",
      "Do not use in facades within approximately 1 km of breaking surf or in direct marine spray zones without confirmation from Rondo technical",
      "Requires full removal of existing corroded beads and affected render before installation — do not render over existing failed aluminium beads",
      "Must be set to correct plane and plumb during render application — cannot be adjusted after render sets",
      "Confirm current product specification and compliance with Rondo Building Services before specifying",
    ],
    procurementSources: [
      { name: "Rondo Building Services — trade supply nationally — contact for current pricing and availability", url: "https://www.rondo.com.au" },
      { name: "Building materials trade suppliers and render accessory suppliers — confirm aluminium bead stock with local supplier", url: "https://www.rondo.com.au" },
      { name: "Render system suppliers — confirm compatibility with render system being used", url: "https://www.rondo.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Stainless", label: "Stainless" },
  { id: "304-SS", label: "304-SS" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "PVC", label: "PVC" },
  { id: "Corner-bead", label: "Corner bead" },
  { id: "External-corner", label: "External corner" },
  { id: "Corrosion-resistant", label: "Corrosion-resistant" },
  { id: "Render", label: "Render" },
  { id: "Lightweight", label: "Lightweight" },
  { id: "Coastal", label: "Coastal" },
];

const BRAND_EQUIV: { system: string; rondo: string; trimtex: string }[] = [
  { system: "Stainless arris angle (coastal/exposed C4+)", rondo: "Rondo Stainless Arris Angle", trimtex: "—" },
  { system: "Aluminium arris angle (standard C2/C3)", rondo: "Rondo Aluminium Render Bead", trimtex: "—" },
  { system: "PVC corner bead (internal/sheltered)", rondo: "—", trimtex: "Trim-Tex PVC Corner Bead" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; material: string; corrosionRating: string; renderSystem: string; fixingMethod: string; primaryUse: string;
}[] = [
  {
    product: "Rondo Stainless Arris Angle",
    brand: "Rondo",
    material: "304 stainless steel",
    corrosionRating: "C4 / C5 — coastal / marine",
    renderSystem: "Sand cement, polymer-modified",
    fixingMethod: "Embedded in render — perforated wings",
    primaryUse: "Coastal and corrosive exposure external corners",
  },
  {
    product: "Trim-Tex PVC Corner Bead",
    brand: "Trim-Tex",
    material: "Rigid PVC",
    corrosionRating: "C1 / C2 / C3 — non-coastal",
    renderSystem: "Sand cement, polymer-modified",
    fixingMethod: "Embedded in render — perforated wings",
    primaryUse: "Sheltered / non-coastal external corners",
  },
  {
    product: "Rondo Aluminium Render Bead",
    brand: "Rondo",
    material: "Aluminium",
    corrosionRating: "C2 / C3 — standard inland",
    renderSystem: "Sand cement, polymer-modified, acrylic",
    fixingMethod: "Embedded in render — perforated wings",
    primaryUse: "Standard non-coastal external corners",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded or missing steel arris beads at external render corners on Class 2 strata masonry and concrete facades",
    "New render corner bead installation at external corners during full render removal and re-render remediation works",
    "Repair of chipped or damaged render returns at external arris edges caused by impact damage or bead corrosion",
    "Remedial works to facades exhibiting render delamination or staining at external corners caused by corroded mild steel beads",
    "Specification of stainless arris angles as part of a full coastal facade remediation package where original beads were aluminium or mild steel",
  ],
  selectionCriteria: [
    "Determine exposure category per AS 2312 before selecting bead material — coastal and marine zones (C4/C5) require 304 stainless steel as a minimum",
    "Select PVC beads for sheltered, internal or non-exposed applications where corrosion is not a risk and lightweight handling is an advantage",
    "Confirm compatibility of the bead material with the render system being used — some acrylic render systems have specific bead requirements",
    "In pool environments or buildings with salt pools, treat as C4/C5 and specify stainless steel regardless of coastal distance",
    "Confirm leg dimensions and bead profile match the render coat thickness and corner geometry before ordering",
  ],
  limitations: [
    "Mild steel arris beads (common in older buildings) are not suitable for use in any externally exposed rendered facade — replace with stainless or aluminium as appropriate",
    "Aluminium beads corrode in coastal environments — all aluminium beads within the corrosion exposure zone should be replaced with stainless steel during remediation",
    "PVC beads can become brittle with long-term UV exposure in unprotected external facades — confirm suitability for fully exposed locations",
    "Bead installation quality is critical — poorly embedded or misaligned beads will result in render cracking, delamination and water ingress at corners",
    "Do not render over existing corroded beads — all failed beads must be fully removed with contaminated render before replacement",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — referenced for external masonry render requirements and durability provisions applicable to facade remediation",
    "AS 2312 — Guide to the Protection of Structural Steel Against Atmospheric Corrosion by the Use of Protective Coatings — used to classify atmospheric corrosion exposure categories (C1–C5) for bead material selection",
    "Manufacturer technical data sheets must be consulted for current product designations, sizes and system compatibility — confirm before specifying",
    "Render system specifications should identify the arris bead type and material as part of the full render system documentation",
  ],
  suitableDefects: [
    "Corroded and rusting arris beads causing render staining at external corners — full removal and stainless steel replacement",
    "Render delamination and cracking at external corners caused by corroded embedded bead expansion",
    "Chipped or damaged render returns at arris edges requiring full removal and re-render with new bead installation",
    "Missing or poorly installed corner beads identified during render condition survey as part of facade remediation investigation",
  ],
  typicalSubstrates: [
    "Face brick and mortar — render applied over masonry with arris bead at corner returns",
    "Concrete block and precast concrete — render over block or precast with arris bead at external corners",
    "Concrete frame with masonry infill — render coat at interface corners between elements",
    "Lightweight framing systems with render — confirm bead specification with render system manufacturer for substrate compatibility",
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

export function ArrisAngleIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are arris angles and edge beads?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Arris angles — also called corner beads or render beads — are metal or PVC profiles embedded in the render coat at external corners of rendered masonry and concrete facades. They define the arris edge of the render return, protect the sharp corner from impact damage, and guide the render screed to a consistent plane on both faces. Without an arris bead, external render corners are prone to chipping, cracking and irregular profiles that trap moisture and deteriorate rapidly.
        </p>
        <p>
          In Australian Class 2 strata facade remediation, arris angle failure is one of the most common defects observed during facade condition surveys. Older buildings frequently used mild steel or low-grade aluminium beads, which corrode under the render in coastal and moderately exposed conditions. The expanding corrosion products cause the render to crack and delaminate at the corner, producing the characteristic rust staining and spalled render at external corner returns that is visible on many unremediated strata facades. Remediation requires full removal of the corroded bead and affected render, with replacement using a bead of appropriate material for the exposure category.
        </p>
        <p>
          Three materials are in common use for arris angle replacement in Australian facade remediation: 304 stainless steel for coastal and corrosive exposures (C4/C5), aluminium for standard inland exposures (C2/C3), and rigid PVC for sheltered non-corrosive applications. Material selection is governed by the atmospheric exposure category of the facade, classified using AS 2312, and must be confirmed as part of the facade remediation specification. Compliance with AS 3700 is required for the render system as a whole.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse arris angles with:</p>
          <ul className="space-y-1.5">
            {[
              "Corner tape (plasterboard / internal only) — mesh or paper tape used internally for plasterboard joints, not suitable for external render corners",
              "Movement joint profiles — expansion joint covers and profiles used at structural movement joints, not at render edge returns",
              "Stainless mesh — reinforcing mesh embedded inside render coats for crack resistance, not an edge or corner profile",
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

export function ArrisAngleProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — arris angle and corner bead systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of arris angle and corner bead products for facade remediation. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Corrosion rating</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Render system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Fixing method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.corrosionRating}</td>
                  <td className="px-4 py-3 text-slate-600">{row.renderSystem}</td>
                  <td className="px-4 py-3 text-slate-600">{row.fixingMethod}</td>
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
            <p className="mt-1 text-sm text-slate-500">Arris angle equivalents across brands active in Australian Class 2 strata facade remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Rondo</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Trim-Tex</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.rondo, row.trimtex].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Corrosion exposure selection</h3>
        </div>
        <ul className="space-y-2">
          {[
            "In coastal and marine environments — and all facades within approximately 1 km of breaking surf or in direct marine spray — specify 304 stainless steel arris angles as a minimum. Aluminium and mild steel beads will corrode and fail in these zones.",
            "Pool environments — including buildings with rooftop or podium salt pools — must be treated as C4 or C5 corrosive exposure regardless of coastal proximity. Specify stainless steel arris angles in all such applications.",
            "In C2 and C3 standard inland exposures away from the coast, aluminium arris angles are appropriate and cost-effective. Confirm the exposure category classification per AS 2312 before specifying.",
            "PVC beads are suitable for sheltered and non-exposed applications (C1/C2) and where lightweight handling is advantageous — they are not recommended for fully exposed facade corners subject to long-term UV loading without confirmation of product suitability for the specific exposure.",
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
