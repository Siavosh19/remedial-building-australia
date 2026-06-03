"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Stainless-steel"
  | "Blucher"
  | "Geberit"
  | "DN110"
  | "Aluminium"
  | "Alproc"
  | "Custom-width"
  | "Adjustable";

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
    fullLabel: "Blucher Australia",
    brandUrl: "https://www.blucher.com.au",
    tdsUrl: "https://www.blucher.com.au",
    accentColor: "#0369a1",
    name: "Blucher Scupper Outlet S300",
    descriptionLine: "AISI 316 stainless steel wall scupper; 75×50mm to 150×75mm; adjustable height sleeve for membrane installation; debris-resistant open face",
    productType: "Stainless steel wall-mounted scupper overflow outlet",
    filterTags: ["Stainless-steel", "Blucher", "Adjustable"],
    techChips: [
      { label: "Stainless-steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Blucher", cls: "bg-slate-100 text-slate-700" },
      { label: "Adjustable height sleeve", cls: "bg-green-50 text-green-700" },
      { label: "AISI 316", cls: "bg-slate-100 text-slate-700" },
      { label: "75×50mm to 150×75mm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Blucher Scupper Outlet S300 is a wall-mounted secondary overflow outlet manufactured from AISI 316 stainless steel, designed for flat and low-pitched roof drainage compliance under AS/NZS 3500.3. The scupper body passes through the parapet wall and is sized to activate at 25–50mm above the primary drain invert level, providing emergency overflow capacity in the event of primary drain blockage. The adjustable height sleeve allows the scupper to be set precisely during construction or membrane installation, accommodating varying membrane and screed thicknesses. The open-face inlet is designed to resist debris ingress while maintaining the required hydraulic capacity. Available in outlet sizes from 75×50mm through to 150×75mm. Confirm the current product range, sizing, and installation requirements with Blucher Australia technical before specifying.",
    technicalProperties: [
      "AISI 316 stainless steel body — corrosion resistant for external and coastal roof applications",
      "Available sizes: 75×50mm to 150×75mm outlet face — confirm sizing against hydraulic calculation",
      "Adjustable height sleeve — accommodates membrane and screed thickness variation during installation",
      "Open-face debris-resistant inlet — maintains hydraulic capacity under normal roof conditions",
      "Designed for installation at 25–50mm above primary drain invert per AS/NZS 3500.3 overflow requirements",
      "Wall-mounted through-parapet installation — requires waterproofing membrane termination at scupper body",
      "Confirm current product specifications, sizes, and fixing details with Blucher Australia",
    ],
    limitations: [
      "Must be installed at the correct overflow activation height — 25–50mm above primary drain invert — incorrect height renders overflow system non-compliant",
      "Waterproofing membrane must be correctly terminated and sealed at the scupper body — flanged connection or formed lead seal required",
      "Not a primary drainage outlet — do not use as a primary roof drain or box gutter outlet",
      "Confirm hydraulic sizing with a hydraulic engineer or AS/NZS 3500.3 before specifying outlet dimensions",
      "Stainless steel grade must be confirmed for coastal exposure — AISI 316 is standard but confirm with Blucher for severe marine environments",
      "Confirm current product range and specifications with Blucher Australia before ordering",
    ],
    procurementSources: [
      { name: "Blucher Australia — trade supply", url: "https://www.blucher.com.au" },
      { name: "Reece Plumbing", url: "https://www.reece.com.au" },
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
    ],
  },
  {
    fullLabel: "Geberit Australia",
    brandUrl: "https://www.geberit.com.au",
    tdsUrl: "https://www.geberit.com.au",
    accentColor: "#be123c",
    name: "Geberit wall scupper D110",
    descriptionLine: "DN110 discharge; stainless steel body; waterproofing membrane connection flange; compatible with siphonic roof drainage systems",
    productType: "Stainless steel wall scupper — DN110 — membrane connection flange",
    filterTags: ["Stainless-steel", "Geberit", "DN110"],
    techChips: [
      { label: "Stainless-steel", cls: "bg-rose-100 text-rose-800" },
      { label: "Geberit", cls: "bg-slate-100 text-slate-700" },
      { label: "DN110 outlet", cls: "bg-green-50 text-green-700" },
      { label: "Membrane connection flange", cls: "bg-slate-100 text-slate-700" },
      { label: "Siphonic compatible", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Geberit wall scupper D110 is a stainless steel wall-mounted overflow outlet with a DN110 discharge connection, designed for secondary overflow compliance on flat roofs and parapet-bounded roof areas. The integrated membrane connection flange allows the waterproofing membrane to be bonded directly to the scupper body, forming a continuous waterproof connection at the through-wall penetration. The D110 is compatible with Geberit siphonic roof drainage systems, making it suitable for specification alongside Geberit primary drainage where a consistent drainage system from one supplier is required. Install at 25–50mm above the primary drain invert per AS/NZS 3500.3 overflow requirements. Confirm the current product range, fixing details, and membrane compatibility with Geberit Australia before specifying.",
    technicalProperties: [
      "Stainless steel body — DN110 discharge outlet — suitable for through-parapet overflow installation",
      "Integrated membrane connection flange — provides positive waterproofing membrane connection at scupper body",
      "Compatible with Geberit siphonic roof drainage systems — consistent system specification available from one supplier",
      "Install at 25–50mm above primary drain invert level per AS/NZS 3500.3",
      "Suitable for flat roofs, low-pitched roofs, and parapet-bounded roof areas requiring secondary overflow compliance",
      "Confirm membrane bond compatibility — flange must suit the membrane system being specified",
      "Confirm current product specifications with Geberit Australia before ordering",
    ],
    limitations: [
      "Must be set at the correct overflow activation height — 25–50mm above primary drain invert — confirm against hydraulic design",
      "Membrane flange must be correctly bonded to the waterproofing membrane — confirm compatibility with the membrane system specified",
      "Not a primary drainage outlet — DN110 discharge sizing is for overflow only — confirm hydraulic capacity with hydraulic engineer",
      "Confirm siphonic system compatibility requirements if specifying alongside Geberit siphonic primary drainage",
      "Confirm current product availability, sizing options, and specifications with Geberit Australia before specifying",
    ],
    procurementSources: [
      { name: "Geberit Australia — trade supply", url: "https://www.geberit.com.au" },
      { name: "Reece Plumbing", url: "https://www.reece.com.au" },
      { name: "Plumbing Plus", url: "https://www.plumbingplus.com.au" },
    ],
  },
  {
    fullLabel: "Alproc Australia",
    brandUrl: "https://www.alproc.com.au",
    tdsUrl: "https://www.alproc.com.au",
    accentColor: "#16a34a",
    name: "Alproc aluminium scupper",
    descriptionLine: "Extruded aluminium scupper body; powder-coated; custom widths 100–300mm; integral back flange for membrane waterproofing; low-profile outlet",
    productType: "Extruded aluminium wall scupper — custom width — powder-coated",
    filterTags: ["Aluminium", "Alproc", "Custom-width"],
    techChips: [
      { label: "Aluminium", cls: "bg-green-100 text-green-800" },
      { label: "Alproc", cls: "bg-slate-100 text-slate-700" },
      { label: "Custom width 100–300mm", cls: "bg-green-50 text-green-700" },
      { label: "Powder-coated", cls: "bg-slate-100 text-slate-700" },
      { label: "Integral back flange", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Alproc aluminium scupper is an extruded aluminium wall-mounted overflow outlet available in custom widths from 100mm to 300mm, making it suitable for architectural applications where a wide overflow opening is required to achieve the necessary hydraulic capacity or to match parapet aesthetics. The scupper body is powder-coated in the Colorbond range, allowing it to be colour-matched to roof flashings, gutters, and cladding. The integral back flange provides a positive connection point for waterproofing membrane termination at the through-wall penetration. The low-profile outlet minimises visual impact on the parapet face. Suitable for flat roofs, low-pitched roofs, and architectural parapets where custom width is required. Confirm current product specifications, powder-coat colour options, and membrane compatibility with Alproc Australia before specifying.",
    technicalProperties: [
      "Extruded aluminium body — custom widths 100–300mm — suitable for architectural and standard overflow applications",
      "Powder-coated finish — Colorbond range available — colour-match to roof flashings and cladding",
      "Integral back flange — provides waterproofing membrane connection at scupper body penetration",
      "Low-profile outlet — minimises visual impact on parapet face",
      "Install at 25–50mm above primary drain invert level per AS/NZS 3500.3",
      "Confirm hydraulic capacity of selected width against AS/NZS 3500.3 sizing requirements",
      "Confirm current product range, sizes, and powder-coat options with Alproc Australia",
    ],
    limitations: [
      "Aluminium — confirm suitability for coastal or aggressive environments — may require anodising or marine-grade powder coating in severe marine zones",
      "Custom width must be confirmed against hydraulic sizing calculation — wider scupper does not automatically mean compliant capacity",
      "Integral back flange must be correctly bonded to the membrane system — confirm membrane compatibility with Alproc before specifying",
      "Not adjustable for height in the same way as Blucher S300 — set height must be determined before installation",
      "Confirm current product specification, availability, and lead times with Alproc Australia before ordering",
    ],
    procurementSources: [
      { name: "Alproc Australia — trade supply", url: "https://www.alproc.com.au" },
      { name: "Specialised Roofing Supplies", url: "https://www.specialisedroofing.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Stainless-steel", label: "Stainless-steel" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Adjustable", label: "Adjustable" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  outletSize: string;
  membraneConnection: string;
  adjustability: string;
}[] = [
  {
    product: "Scupper Outlet S300",
    brand: "Blucher",
    material: "AISI 316 stainless steel",
    outletSize: "75×50mm to 150×75mm",
    membraneConnection: "Adjustable sleeve — formed or flanged at site",
    adjustability: "Adjustable height sleeve",
  },
  {
    product: "Wall scupper D110",
    brand: "Geberit",
    material: "Stainless steel",
    outletSize: "DN110",
    membraneConnection: "Integral membrane connection flange",
    adjustability: "Fixed — set height at installation",
  },
  {
    product: "Aluminium scupper",
    brand: "Alproc",
    material: "Extruded aluminium — powder-coated",
    outletSize: "Custom 100–300mm width",
    membraneConnection: "Integral back flange for membrane",
    adjustability: "Fixed — custom width selection",
  },
];

const BRAND_EQUIV = [
  "Blucher S300 ≈ Geberit wall scupper — both are stainless steel wall-mounted overflow outlets with membrane flange connections, suitable for standard parapet overflow installation.",
  "Alproc aluminium scupper — aluminium alternative to stainless steel, suitable for architectural applications requiring custom width or Colorbond colour match.",
];

const TECH_INFO = {
  asNzsRequirements: [
    "AS/NZS 3500.3 requires secondary overflow outlets on flat and low-pitched roofs where primary drainage can become blocked",
    "Overflow outlets must be set at 25–50mm above the primary drain invert level to activate only during emergency overflow events",
    "Overflow capacity must be at least 50% of the primary drain capacity — confirm against hydraulic calculation",
    "Scupper outlets must discharge to a location where overflow water does not damage the building or adjacent properties",
    "Overflow drainage system must be maintained clear of debris — confirm maintenance access as part of building management plan",
  ],
  settingHeight: [
    "Scupper invert height is measured above the primary drain inlet level — not above the roof surface or membrane surface",
    "25mm minimum above primary drain ensures overflow does not activate during normal rainfall events",
    "50mm maximum above primary drain limits ponding depth in the event of primary drain blockage",
    "Membrane and screed thickness must be accounted for when setting scupper height — adjustable sleeve systems allow for post-membrane height fine-tuning",
    "Confirm final invert levels with the hydraulic engineer before waterproofing membrane is applied",
  ],
  membraneSealing: [
    "Waterproofing membrane must be continuously sealed to the scupper body — no gap or bridge is permitted at the through-wall junction",
    "Flanged scupper bodies allow liquid membranes to be bonded directly to the flange face — confirm primer and adhesion requirements",
    "Formed lead flashing is an alternative sealing method for scupper bodies without a membrane flange — lead formed around the scupper body and bonded to the membrane",
    "Sheet membranes (torch-on bitumen, self-adhesive) require the membrane to be taken up and over the flange with heat-applied or adhesive bond",
    "All membrane terminations at scupper bodies must be inspected and flood-tested before the roof is handed over",
  ],
  sizingCapacity: [
    "Scupper hydraulic capacity depends on the outlet face dimensions and the head of water above the scupper invert at the design overflow event",
    "Refer to AS/NZS 3500.3 sizing tables for minimum scupper dimensions based on roof area and design rainfall intensity",
    "A hydraulic engineer or plumbing designer must confirm scupper sizing — do not rely on rule-of-thumb sizing for compliance purposes",
    "Multiple scuppers may be required on large roof areas or where parapet geometry limits individual scupper width",
    "Confirm scupper sizing with the manufacturer's hydraulic capacity data as well as AS/NZS 3500.3 before ordering",
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
      <p
        className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}
      >
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

export function ScupperSystemsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are scupper overflow systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Scupper overflow systems are wall-mounted secondary drainage outlets installed through the parapet wall of flat and low-pitched roofs. They are required by AS/NZS 3500.3 to provide emergency overflow drainage in the event that primary roof drains become blocked. The scupper inlet is set at 25–50mm above the primary drain invert level, ensuring the system activates only during an emergency overflow event and does not intercept normal rainfall drainage.
        </p>
        {expanded && (
          <>
            <p>
              Scupper bodies are manufactured in AISI 316 stainless steel or extruded aluminium, selected based on exposure environment, membrane compatibility, and architectural requirements. The through-wall penetration must be continuously waterproofed — either through a flanged membrane connection or a formed lead seal — to prevent water entry at the scupper body junction.
            </p>
            <p>
              Sizing must be confirmed against AS/NZS 3500.3 and a hydraulic engineer's calculation. The scupper must discharge to a location where overflow water does not cause damage to the building fabric or adjacent properties. Regular inspection and clearing of overflow scuppers is required as part of building maintenance to ensure compliance is maintained over the building's life.
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

export function ScupperSystemsProductSection() {
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
              AS/NZS 3500.3 requirements, setting height, membrane sealing, sizing and capacity
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
              <TechCard icon={<Layers size={15} />} title="AS/NZS 3500.3 Overflow Requirements" items={TECH_INFO.asNzsRequirements} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Setting Scupper Height Above Primary Drain" items={TECH_INFO.settingHeight} style="check" />
              <TechCard icon={<BookOpen size={15} />} title="Membrane Sealing at Scupper Body" items={TECH_INFO.membraneSealing} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="Sizing Scupper Capacity" items={TECH_INFO.sizingCapacity} style="warn" />
            </div>

            {/* Brand equivalency */}
            <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <SquareStack size={12} />
                </div>
                <p className="text-sm font-extrabold text-sky-950">Brand Equivalency Notes</p>
              </div>
              <ul className="space-y-2">
                {BRAND_EQUIV.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-5 text-sky-900">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                    {note}
                  </li>
                ))}
              </ul>
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
            <p className="mt-1 text-sm text-slate-500">3 products — stainless steel and aluminium scupper overflow outlets — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for all
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
              Side-by-side comparison of scupper overflow outlet systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Outlet size</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Membrane connection</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Adjustability</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.outletSize}</td>
                  <td className="px-4 py-3 text-slate-600">{row.membraneConnection}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.adjustability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
