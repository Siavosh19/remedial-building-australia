"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import { DataNote } from "@/app/repair-systems/_components/ProductPageShared";

type FilterTag =
  | "Subfloor"
  | "Airbrick"
  | "Terracotta"
  | "Aluminium"
  | "Louvre"
  | "Passive"
  | "Mechanical"
  | "Fan"
  | "Subfloor-fan"
  | "Mould-control";

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
    fullLabel: "Austral Bricks",
    brandUrl: "https://www.australbricks.com.au",
    accentColor: "#ef4444",
    name: "Austral Terracotta Airbrick",
    descriptionLine:
      "Terracotta louvred airbrick for subfloor ventilation openings — standard 230×76mm brick course size, suitable for heritage and standard brick veneer buildings",
    productType: "Terracotta louvred airbrick for subfloor ventilation",
    filterTags: ["Subfloor", "Airbrick", "Terracotta", "Passive"],
    techChips: [
      { label: "Terracotta airbrick", cls: "bg-sky-100 text-sky-800" },
      { label: "Passive ventilation", cls: "bg-slate-100 text-slate-700" },
      { label: "230×76mm brick course", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage compatible", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Austral Terracotta Airbrick is a louvred terracotta vent unit designed to fit the standard Australian 230×76mm brick course opening, providing passive cross-ventilation to domestic subfloor spaces. Terracotta construction is non-corrosive, UV-stable and visually compatible with heritage and standard brick veneer buildings. The louvred face allows free passage of air while providing protection against vermin and water splash-back from the adjacent ground.\n\nAirbricks are installed at foundation wall level at spacings that must achieve the minimum aggregate ventilation opening area required by NCC Housing Provisions Part 6.2 for the applicable climate zone. Blocked or missing airbricks are a primary cause of subfloor moisture accumulation and mould growth in suspended timber floor buildings. Confirm current product range and availability with Austral Bricks before specifying.",
    technicalProperties: [
      "Terracotta construction — non-corrosive, UV-stable and suitable for exposed subfloor base course installations",
      "Standard 230×76mm brick course size — fits standard Australian brick veneer foundation wall openings without cutting or adapters",
      "Louvred face provides passive air passage while restricting vermin entry and direct water splash-back",
      "Visually compatible with heritage and standard brick veneer buildings — terracotta finish blends with common brick colours",
      "Passive ventilation — no electrical supply or mechanical components — zero maintenance requirement after installation",
    ],
    limitations: [
      "Passive only — cannot overcome inadequate cross-ventilation in enclosed or complex subfloor geometries — mechanical supplementation may be required",
      "Terracotta is brittle — handle carefully during installation — replace cracked units before installation",
      "Colour and texture variation is inherent in terracotta products — confirm visual match with existing brickwork before ordering",
      "Free area per unit must be confirmed against NCC minimum ventilation requirements — additional units may be required",
      "Confirm current product specification and compliance with Austral Bricks before specifying",
    ],
    procurementSources: [
      { name: "Austral Bricks — trade supply — contact for current pricing and availability", url: "https://www.australbricks.com.au" },
      { name: "Boral Building Products — national distribution", url: "https://www.boral.com.au" },
      { name: "Mason Brothers Brick & Tile — trade supply nationally", url: "https://www.masonbrothers.com.au" },
    ],
  },
  {
    fullLabel: "Ventis",
    brandUrl: "https://www.ventis.com.au",
    accentColor: "#3b82f6",
    name: "Ventis Aluminium Subfloor Louvre Vent",
    descriptionLine:
      "Pressed aluminium passive subfloor ventilation louvre in standard brick course sizes — corrosion-resistant, available in mill or powder-coated finish for coastal and standard environments",
    productType: "Pressed aluminium subfloor ventilation louvre",
    dataNote: "Owner to confirm — 'Ventis' appears to be a ventilation system supplier rather than a standalone brick-course louvre vent brand. Confirm the correct supplier and product name before specifying.",
    filterTags: ["Subfloor", "Louvre", "Aluminium", "Passive"],
    techChips: [
      { label: "Aluminium louvre", cls: "bg-sky-100 text-sky-800" },
      { label: "Passive ventilation", cls: "bg-slate-100 text-slate-700" },
      { label: "Brick course size", cls: "bg-slate-100 text-slate-700" },
      { label: "Powder-coat available", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Ventis Aluminium Subfloor Louvre Vent is a pressed aluminium passive ventilation louvre designed for installation in subfloor foundation wall openings at standard brick course dimensions. Aluminium construction provides superior corrosion resistance compared to steel alternatives and is well suited to coastal and high-humidity environments where terracotta is not specified or available. Available in mill finish or powder-coated colours to suit the building facade.\n\nThe louvred face provides passive air passage and vermin exclusion. Ventis aluminium subfloor vents are widely used in residential and Class 2 strata remediation projects where existing terracotta airbricks have been damaged, blocked or removed. Confirm current product dimensions, free area ratings and available colours with Ventis before specifying.",
    technicalProperties: [
      "Pressed aluminium construction — corrosion-resistant — suitable for coastal, high-humidity and subfloor environments",
      "Available in standard brick course sizes — replacement for terracotta or existing aluminium subfloor vent openings without structural modification",
      "Louvred face provides passive airflow and vermin exclusion simultaneously",
      "Available in mill finish or powder-coated colours — confirm current colour range with Ventis",
      "Lightweight — handling and installation does not require specialist equipment or large crew",
    ],
    limitations: [
      "Passive ventilation only — does not overcome inadequate cross-ventilation in enclosed or compartmentalised subfloor spaces",
      "Mill finish aluminium will oxidise in aggressive coastal environments — powder-coat finish recommended within 500m of saltwater",
      "Free area per unit must be checked against NCC and AS 1684 subfloor ventilation requirements — do not assume one vent per opening is sufficient",
      "Louvre blades may accumulate debris over time — inspect and clean periodically to maintain free area",
      "Confirm current product specification and compliance with Ventis before specifying",
    ],
    procurementSources: [
      { name: "Ventis — trade supply — contact for current pricing and product range", url: "https://www.ventis.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Fantech",
    brandUrl: "https://www.fantech.com.au",
    accentColor: "#22c55e",
    name: "Fantech 150mm Subfloor Ventilation Fan",
    descriptionLine:
      "150mm mechanical fan for active subfloor ventilation where passive airbrick ventilation is insufficient — draws moist air to exterior and creates cross-ventilation through passive inlet vents",
    productType: "150mm mechanical subfloor ventilation fan",
    dataNote: "Owner to confirm — 'Fantech SVF150' could not be confirmed as a current Fantech Australia product. The current Fantech 150mm mixed-flow inline fan is the TD-500/150SIL — confirm the correct subfloor ventilation fan model with Fantech Australia before specifying.",
    filterTags: ["Subfloor", "Mechanical", "Fan", "Subfloor-fan", "Mould-control"],
    techChips: [
      { label: "Mechanical fan", cls: "bg-sky-100 text-sky-800" },
      { label: "150mm centrifugal", cls: "bg-slate-100 text-slate-700" },
      { label: "Active ventilation", cls: "bg-slate-100 text-slate-700" },
      { label: "Mould control", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "TODO: owner confirm model name — Fantech offers 150mm mixed-flow inline fans for subfloor ventilation (current AU model: TD-500/150SIL per Fantech website). A 150mm mechanical fan designed for active subfloor ventilation where passive airbrick ventilation alone is insufficient to achieve adequate air changes. The fan draws moist air from the subfloor space and exhausts it to the exterior, creating negative pressure that draws fresh air through passive inlet vents on the opposite side of the subfloor. Suitable for installation in an existing 150mm vent opening in the foundation wall or through a new penetration cored through the perimeter wall.\n\nMechanical subfloor ventilation is specified where subfloor geometry prevents adequate cross-ventilation by passive means — including enclosed or partially enclosed subfloor spaces, split-level configurations, or where mould growth is active. Confirm current product specifications, model name, wiring requirements and control options with Fantech before specifying.",
    technicalProperties: [
      "150mm centrifugal fan — provides active mechanical ventilation to subfloor spaces that cannot achieve adequate air changes by passive means",
      "Installs in standard 150mm subfloor vent opening or new core-drilled penetration — minimal structural impact on foundation wall",
      "Low-wattage motor — suitable for continuous or timer/humidity-controlled operation — low running cost",
      "Draws moist subfloor air to exterior, creating cross-ventilation through passive inlet vents on opposing walls",
      "Compatible with Fantech humidity controllers and timer modules for automated operation — confirm available accessories with Fantech",
    ],
    limitations: [
      "Electrical connection required — must be installed by a licensed electrician — add to cost plan accordingly",
      "Mechanical fan does not resolve moisture entry from plumbing leaks, rising damp or groundwater — address moisture source before installing fan",
      "Fan creates negative pressure in subfloor — passive inlet vents on opposing walls must be clear and adequate in free area to support airflow",
      "Requires ongoing maintenance — motor and impeller inspection recommended annually — filter cleaning if applicable per Fantech TDS",
      "Confirm current product specification and compliance with Fantech before specifying",
    ],
    procurementSources: [
      { name: "Fantech — trade supply — contact for current pricing and control accessories", url: "https://www.fantech.com.au" },
      { name: "Reece Plumbing and HVAC — trade supply nationally", url: "https://www.reece.com.au" },
      { name: "Electrical trade wholesalers nationally — confirm current stock", url: "https://www.fantech.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Subfloor", label: "Subfloor" },
  { id: "Airbrick", label: "Airbrick" },
  { id: "Terracotta", label: "Terracotta" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Louvre", label: "Louvre" },
  { id: "Passive", label: "Passive" },
  { id: "Mechanical", label: "Mechanical" },
  { id: "Fan", label: "Fan" },
  { id: "Subfloor-fan", label: "Subfloor-fan" },
  { id: "Mould-control", label: "Mould-control" },
];

const BRAND_EQUIV: { system: string; austral: string; ventis: string; fantech: string }[] = [
  { system: "Terracotta airbrick (passive)", austral: "Terracotta Airbrick", ventis: "—", fantech: "—" },
  { system: "Aluminium louvre vent (passive)", austral: "—", ventis: "TODO: confirm product name", fantech: "—" },
  { system: "Mechanical subfloor fan", austral: "—", ventis: "—", fantech: "TODO: confirm model name" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  material: string;
  ventMode: string;
  sizeStandard: string;
  primaryUse: string;
}[] = [
  {
    product: "Austral Terracotta Airbrick",
    brand: "Austral Bricks",
    type: "Louvred airbrick",
    material: "Terracotta",
    ventMode: "Passive",
    sizeStandard: "230×76mm brick course",
    primaryUse: "Subfloor ventilation — heritage and standard brick veneer buildings",
  },
  {
    product: "Ventis Aluminium Subfloor Louvre Vent",
    brand: "Ventis",
    type: "Louvred vent",
    material: "Pressed aluminium",
    ventMode: "Passive",
    sizeStandard: "Brick course sizes",
    primaryUse: "Subfloor ventilation — replacement and new — coastal and standard environments",
  },
  {
    product: "TODO: confirm — Fantech 150mm subfloor fan (model name TBC)",
    brand: "Fantech",
    type: "Mixed-flow fan",
    material: "Polymer / metal",
    ventMode: "Mechanical (active)",
    sizeStandard: "150mm vent opening",
    primaryUse: "Active subfloor ventilation — enclosed spaces, mould remediation",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of blocked or broken terracotta airbricks in brick veneer subfloor foundation walls",
    "Installation of aluminium louvre vents where terracotta airbricks have been removed or are incompatible",
    "Active mechanical fan installation where passive ventilation cannot achieve adequate cross-ventilation in enclosed subfloor spaces",
    "Mould remediation in domestic subfloor spaces of Class 2 strata and single-dwelling buildings with suspended timber floors",
    "New subfloor ventilation openings in renovated or altered foundation walls to meet NCC and AS 1684 requirements",
  ],
  selectionCriteria: [
    "Select terracotta airbrick where visual compatibility with heritage or standard brick veneer is required and passive ventilation is adequate",
    "Select aluminium louvre vent where corrosion resistance is required, particularly in coastal environments within 500m of saltwater",
    "Select mechanical fan where subfloor geometry prevents adequate passive cross-ventilation or where active mould remediation is required",
    "Confirm free area per vent unit against NCC minimum — NCC Housing Provisions Part 6.2 specifies minimum aggregate opening area (mm²/m of wall) varying by climate zone — confirm the applicable zone requirement",
    "Always address moisture source (plumbing leaks, rising damp, groundwater) before relying on ventilation to resolve moisture issues",
  ],
  limitations: [
    "Passive vents alone cannot overcome inadequate cross-ventilation in enclosed or compartmentalised subfloor spaces — mechanical supplementation required",
    "Mechanical fans do not resolve moisture entry from leaks or rising damp — source must be eliminated before ventilation will be effective",
    "Subfloor ventilation must comply with NCC Section J and AS 1684 — confirm requirements with a licensed building consultant or mechanical engineer",
    "Blocked or obstructed passive inlet vents will prevent mechanical fans from developing adequate airflow — all passive vents must be clear",
    "Fan installation requires licensed electrical work — include in cost plan",
  ],
  standardsNotes: [
    "NCC Housing Provisions Part 6.2 — minimum aggregate subfloor ventilation opening area by climate zone (2,000–6,000 mm²/m of external wall) — applicable to Class 1 and Class 2 buildings with suspended floors",
    "AS 1684 — Residential Timber-Framed Construction — subfloor ventilation and durability requirements for timber-framed construction",
    "AS/NZS 1668.2 — The Use of Ventilation and Airconditioning in Buildings — mechanical ventilation requirements where passive is insufficient",
    "Local council requirements may impose additional subfloor ventilation obligations in high-moisture or flood-affected areas — confirm with certifier",
  ],
  suitableDefects: [
    "Mould growth in subfloor space of suspended timber floor buildings due to inadequate or blocked ventilation",
    "Blocked, cracked or missing terracotta airbricks in brick veneer foundation walls",
    "Condensation and timber decay in subfloor framing due to moisture accumulation from inadequate ventilation",
    "Subfloor spaces that fail NCC minimum ventilation requirements — identified during strata inspection or building report",
  ],
  typicalSubstrates: [
    "Brick veneer foundation walls — standard brick course opening for airbrick and aluminium louvre installation",
    "Concrete perimeter walls — core-drilled penetrations for 150mm mechanical fan installation",
    "Masonry block foundation walls — modified openings for vent and fan installation",
    "Timber framed perimeter walls — vent grilles installed through cladding for subfloor access",
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

export function SubfloorVentilationIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are subfloor ventilation systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Subfloor ventilation is the supply of fresh air to the underfloor space beneath suspended timber floor buildings. Inadequate subfloor ventilation is a leading cause of mould growth, timber decay and deteriorating air quality in Class 2 strata and single-dwelling buildings in Australia. Failure most commonly occurs through blocked or missing airbricks in the foundation wall perimeter, insufficient number of vent openings for the subfloor area, or enclosed subfloor geometries that prevent adequate cross-ventilation regardless of the number of passive openings.
        </p>
        <p>
          Passive airbricks and louvre vents rely entirely on wind-driven cross-ventilation and are adequate where the subfloor space is open and unobstructed and the number of openings meets NCC minimums. Mechanical subfloor fans are required where passive ventilation cannot achieve adequate air changes — typically in enclosed, compartmentalised, or L-shaped subfloor spaces, or where active mould remediation is necessary. Mechanical fans draw moist air from the subfloor and exhaust it to the exterior, creating negative pressure that draws fresh air through passive inlet vents on opposing walls.
        </p>
        <p>
          NCC Housing Provisions Part 6.2 sets minimum aggregate subfloor ventilation opening area requirements per metre of external wall, varying by climatic zone (2,000 to 6,000 mm²/m). Free area per vent unit must be checked against the manufacturer specification to confirm compliance with the applicable zone requirement. Where passive ventilation is inadequate, a mechanical engineer or licensed building consultant should determine the required number of mechanical fans, their placement, and the minimum passive inlet free area required to support the fan airflow.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Roof vents (mushroom vents, whirlybirds) — ventilate the roof space above the ceiling, not the subfloor space below the floor",
              "Carpark ventilation — mechanical ventilation systems for underground carparks, not domestic residential subfloor spaces",
              "Exhaust fans — bathroom, kitchen and laundry exhaust fans that exhaust internal air to the exterior, not subfloor ventilation systems",
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

export function SubfloorVentilationProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — subfloor ventilation systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of subfloor ventilation products for domestic and Class 2 strata buildings. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Vent mode</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Size standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ventMode}</td>
                  <td className="px-4 py-3 text-slate-600">{row.sizeStandard}</td>
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
            <p className="mt-1 text-sm text-slate-500">Subfloor ventilation product equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Austral Bricks</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Ventis</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Fantech</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.austral, row.ventis, row.fantech].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Free area and mould risk</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Minimum subfloor ventilation free area must comply with NCC Housing Provisions Part 6.2 — minimum aggregate opening area varies by climate zone (2,000 to 6,000 mm²/m of wall) — confirm free area per unit against manufacturer data and the applicable zone requirement before specifying",
            "Mechanical fans are required where passive ventilation alone cannot achieve adequate cross-ventilation — for example, in enclosed subfloor spaces, L-shaped configurations, or where internal subfloor walls obstruct airflow",
            "Always address the source of moisture (plumbing leaks, rising damp, groundwater) before installing additional ventilation — fans alone will not resolve moisture entry from leaks and may accelerate corrosion of affected framing",
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
