"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Glasswool"
  | "Stone-wool"
  | "Mineral-wool"
  | "Bradford"
  | "Knauf"
  | "ROCKWOOL"
  | "Ceiling-rafter"
  | "R-value-range"
  | "Formaldehyde-free"
  | "Non-combustible"
  | "High-density";

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
    fullLabel: "CSR Bradford",
    brandUrl: "https://www.bradfordinsulation.com.au",
    accentColor: "#0369a1",
    name: "Bradford Gold Glasswool Batts",
    descriptionLine: "CSR Bradford glasswool batt insulation — standard for ceiling and rafter insulation in pitched roofs — R2.5, R3.5, R4.0 and R6.0 available — installed between rafters or ceiling joists below sarking",
    productType: "Glasswool mineral wool batt — ceiling / rafter — AS/NZS 4859",
    filterTags: ["Glasswool", "Mineral-wool", "Bradford", "Ceiling-rafter", "R-value-range"],
    techChips: [
      { label: "Glasswool batt", cls: "bg-sky-100 text-sky-800" },
      { label: "Bradford Gold", cls: "bg-slate-100 text-slate-700" },
      { label: "R2.5 to R6.0", cls: "bg-green-50 text-green-700" },
      { label: "Ceiling / rafter level", cls: "bg-amber-50 text-amber-700" },
      { label: "Nationally stocked", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Bradford Gold is CSR Bradford's primary range of glasswool batt insulation products for residential and strata building applications, including pitched roof ceiling and rafter insulation. Bradford Gold batts are installed between the ceiling joists (at ceiling level) or between the rafters (at rafter level below the tile course) to provide thermal insulation. For pitched tiled roof applications, the standard installation is at ceiling level between the ceiling joists below the sarking and above the ceiling lining. Rafter-level installation requires tile removal and is typically combined with a re-tiling scope. Bradford Gold is available in R2.5, R3.5, R4.0, and R6.0 thicknesses — the required R-value is confirmed from the NCC climate zone requirement for the project location. Bradford Gold is the most widely distributed glasswool batt product in Australia, available through trade suppliers and Bunnings nationally. Glasswool batts are vapour-permeable and do not restrict moisture vapour movement within the roof assembly — this is an important characteristic when specifying insulation in a pitched roof assembly with sarking.",
    technicalProperties: [
      "Glasswool batt — spun glass fibre mineral wool insulation",
      "Available in R2.5, R3.5, R4.0, and R6.0 — confirm current range from Bradford TDS",
      "Installed at ceiling level between joists or at rafter level between rafters",
      "Vapour permeable — does not restrict moisture vapour movement within the roof assembly",
      "Bradford Gold — nationally distributed — available through trade suppliers and Bunnings",
      "AS/NZS 4859 compliant — NCC-compliant for residential and strata thermal requirements",
    ],
    limitations: [
      "Not a rigid board — cannot be installed under-tile as a rigid substrate the way PIR or phenolic boards can — glasswool batts are installed between joists or rafters, not across them as a rigid layer",
      "Glasswool is combustible — confirm fire rating requirements with the building certifier for the specific roof assembly before specifying",
      "Must be installed without compression — compressing glasswool batts reduces their R-value — confirm that the available joist or rafter depth is sufficient for the specified R-value without compression",
      "Confirm NCC R-value requirements for the project climate zone before selecting the batt R-value",
      "Retrofit installation at rafter level between tiles requires removal of the tile course — this is a significant cost impost",
    ],
    procurementSources: [
      { name: "CSR Bradford — bradfordinsulation.com.au", url: "https://www.bradfordinsulation.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Roofing and insulation trade suppliers", url: "https://www.bradfordinsulation.com.au" },
    ],
  },
  {
    fullLabel: "Knauf Insulation",
    brandUrl: "https://www.knaufinsulation.com.au",
    accentColor: "#16a34a",
    name: "Knauf Earthwool",
    descriptionLine: "Knauf glasswool mineral wool batts — formaldehyde-free binder — alternative to Bradford Gold — ceiling and rafter insulation for pitched roofs",
    productType: "Glasswool mineral wool batt — formaldehyde-free — AS/NZS 4859",
    filterTags: ["Glasswool", "Mineral-wool", "Knauf", "Formaldehyde-free"],
    techChips: [
      { label: "Glasswool batt", cls: "bg-green-100 text-green-800" },
      { label: "Formaldehyde-free", cls: "bg-green-50 text-green-700" },
      { label: "Knauf Earthwool", cls: "bg-slate-100 text-slate-700" },
      { label: "Ceiling / rafter level", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Knauf Earthwool is Knauf Insulation's glasswool mineral wool batt product for residential and commercial insulation applications, including ceiling and rafter insulation in pitched roofs. Earthwool is manufactured with a formaldehyde-free ECOSE Technology binder — a bio-based binder that replaces the traditional phenol-formaldehyde binders used in conventional glasswool. This makes Earthwool a preferred choice for projects where formaldehyde-free insulation is specified, such as where occupant health is a priority or where the building's sustainability rating scheme requires low-VOC or formaldehyde-free materials. Knauf Earthwool is available in R-value ranges comparable to Bradford Gold and is distributed nationally through trade supply channels. Confirm the current R-value range, product width, and NCC compliance from the current Knauf Earthwool TDS before specifying.",
    technicalProperties: [
      "Glasswool mineral wool batt — formaldehyde-free ECOSE Technology binder",
      "Available in comparable R-value range to Bradford Gold — confirm current range from Knauf TDS",
      "Ceiling-level and rafter-level installation in pitched roofs",
      "Vapour permeable — does not restrict moisture vapour movement",
      "Knauf Insulation — internationally recognised glasswool manufacturer with Australian distribution",
      "AS/NZS 4859 compliant — NCC-compliant for applicable climate zones",
    ],
    limitations: [
      "Confirm current Australian availability, R-value range, and product dimensions from Knauf Insulation before specifying",
      "Same installation constraints as Bradford Gold — cannot be installed without compression within insufficient rafter or joist depth",
      "Not a rigid board — same limitations apply as Bradford Gold for under-tile rigid installation",
      "Confirm NCC R-value requirements for the project climate zone before selecting batt R-value",
    ],
    procurementSources: [
      { name: "Knauf Insulation — knaufinsulation.com.au", url: "https://www.knaufinsulation.com.au" },
      { name: "Trade insulation suppliers nationally", url: "https://www.knaufinsulation.com.au" },
      { name: "Bunnings — confirm current Earthwool stock in-store", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "ROCKWOOL",
    brandUrl: "https://www.rockwool.com/au",
    accentColor: "#b45309",
    name: "ROCKWOOL Stone Mineral Wool",
    descriptionLine: "ROCKWOOL stone mineral wool batts and slabs for under-tile, rafter and ceiling applications — non-combustible — vapour-permeable — higher density than glasswool",
    productType: "Stone mineral wool — non-combustible — AS/NZS 4859",
    filterTags: ["Stone-wool", "Mineral-wool", "ROCKWOOL", "Non-combustible", "High-density"],
    techChips: [
      { label: "Stone wool — non-combustible", cls: "bg-amber-100 text-amber-800" },
      { label: "High density", cls: "bg-slate-100 text-slate-700" },
      { label: "Vapour permeable", cls: "bg-green-50 text-green-700" },
      { label: "ROCKWOOL", cls: "bg-slate-100 text-slate-700" },
      { label: "Rafter / ceiling / under-tile", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ROCKWOOL stone mineral wool products are manufactured from basalt rock and recycled slag, spun into a fibrous wool form. Unlike glasswool (which is made from recycled glass), ROCKWOOL is a stone-based product with a higher melting point — it is classified as non-combustible and can withstand temperatures significantly higher than glasswool before igniting. This non-combustible classification is the primary differentiator that makes ROCKWOOL the preferred mineral wool product in applications where fire performance is a design requirement or NCC compliance requirement for the roof assembly. ROCKWOOL is also higher density than standard glasswool batts — higher density mineral wool has better acoustic performance and dimensional stability, and semi-rigid ROCKWOOL slabs can be used in between-rafter applications where a slab that holds its shape without full rigid board performance is suitable. ROCKWOOL is vapour-permeable — moisture vapour passes through the insulation, which is important in sarking assemblies where vapour management is a design consideration. Confirm the specific ROCKWOOL product range (Flexi, RockSlab, or other), R-value, NCC fire performance compliance, and current Australian availability from ROCKWOOL before specifying.",
    technicalProperties: [
      "Stone mineral wool — manufactured from basalt rock and recycled slag — non-combustible",
      "Higher melting point than glasswool — classified as non-combustible under AS 1530.1",
      "Higher density than standard glasswool — better acoustic performance and dimensional stability",
      "Vapour permeable — moisture vapour passes freely through the insulation",
      "Available in batt and semi-rigid slab formats — batts for ceiling and rafter applications, slabs for between-rafter rigid or semi-rigid applications",
      "ROCKWOOL — internationally recognised stone mineral wool manufacturer with Australian distribution",
    ],
    limitations: [
      "Higher cost per m² than standard glasswool batts — specify where non-combustible or acoustic performance justifies the cost premium",
      "Not a rigid board — ROCKWOOL slabs have limited rigidity compared to PIR or phenolic foam boards — they will not span between rafters without support in the same way as a rigid board",
      "Confirm current ROCKWOOL product range, R-value, NCC fire compliance, and Australian distribution from ROCKWOOL before specifying — product range includes multiple formats (Flexi, RockSlab, etc.)",
      "Confirm the correct ROCKWOOL format for the specific application — batt vs slab vs Flexi — before specifying",
      "Confirm NCC climate zone R-value requirements before selecting ROCKWOOL product thickness",
    ],
    procurementSources: [
      { name: "ROCKWOOL Australia — rockwool.com/au", url: "https://www.rockwool.com/au" },
      { name: "Insulation and building trade suppliers", url: "https://www.rockwool.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Glasswool", label: "Glasswool" },
  { id: "Stone-wool", label: "Stone-wool" },
  { id: "Bradford", label: "Bradford" },
  { id: "Knauf", label: "Knauf" },
  { id: "ROCKWOOL", label: "ROCKWOOL" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Bradford Gold",
    brand: "Bradford",
    woolType: "Glasswool",
    nonCombustible: "No",
    vapourPermeable: "Yes",
    rValueRange: "R2.5 / R3.5 / R4.0 / R6.0",
    density: "Standard",
    binder: "Standard glasswool binder",
  },
  {
    product: "Knauf Earthwool",
    brand: "Knauf",
    woolType: "Glasswool",
    nonCombustible: "No",
    vapourPermeable: "Yes",
    rValueRange: "Confirm TDS",
    density: "Standard",
    binder: "Formaldehyde-free ECOSE",
  },
  {
    product: "ROCKWOOL",
    brand: "ROCKWOOL",
    woolType: "Stone wool (basalt)",
    nonCombustible: "Yes",
    vapourPermeable: "Yes",
    rValueRange: "Confirm TDS",
    density: "Higher than glasswool",
    binder: "N/A — stone fibre",
  },
];

const TECH_INFO = [
  {
    title: "Glasswool vs Stone Wool",
    style: "bullet" as const,
    items: [
      "Glasswool is made from recycled glass fibres spun into a mat — it is the standard insulation batt product in Australian residential and strata construction (Bradford Gold, Knauf Earthwool)",
      "Stone wool (ROCKWOOL) is made from basalt rock and recycled slag fibres — it is heavier, denser, and has a significantly higher melting point than glasswool",
      "The primary practical difference is fire performance — ROCKWOOL is classified as non-combustible, glasswool is not — this matters in fire-rated roof assemblies where NCC requires non-combustible insulation",
      "Both glasswool and stone wool are vapour-permeable — moisture vapour passes through both materials without condensing within the insulation — this is important in roof sarking assemblies",
      "Stone wool is generally more expensive per m² than glasswool — specify where fire performance or acoustic requirements justify the cost premium",
    ],
  },
  {
    title: "Fire Performance",
    style: "warn" as const,
    items: [
      "Where the roof assembly is required to be fire-rated under the NCC — for example, where the roof is within a fire compartment boundary or where the building type requires non-combustible construction — the insulation material must comply with the fire performance requirement",
      "Glasswool is combustible — it will melt and may burn under high heat — it is not classified as non-combustible under AS 1530.1",
      "ROCKWOOL stone mineral wool is classified as non-combustible — confirm the specific ROCKWOOL product's AS 1530.1 classification with ROCKWOOL Australia before specifying for a fire-rated assembly",
      "Confirm the NCC fire performance requirement for the specific roof assembly with the building certifier before selecting glasswool or stone wool",
    ],
  },
  {
    title: "Vapour Permeability in Sarking Assemblies",
    style: "check" as const,
    items: [
      "Vapour permeability is important in a pitched roof insulation assembly — moisture vapour generated within the building must be able to move through the insulation and sarking layers without condensing and causing timber decay or mould growth",
      "Both glasswool and stone wool are vapour-permeable — they do not act as vapour barriers and allow moisture vapour to pass through the insulation without restriction",
      "PIR and phenolic rigid boards (listed on the PIR page) are also vapour-permeable when foil-faced, but the foil facing provides a degree of vapour retardance — confirm from the board manufacturer TDS",
      "In humid climate zones, vapour management is critical — confirm the vapour management strategy for the roof assembly with the building certifier before specifying insulation",
    ],
  },
  {
    title: "NCC Thermal Requirements",
    style: "check" as const,
    items: [
      "NCC climate zone R-value requirements for roof and ceiling assemblies vary by climate zone — confirm the required R-value for the project location from the current NCC",
      "In warmer climate zones (NCC Zones 1 and 2 — tropical and sub-tropical), higher ceiling R-values are required to manage summer heat loads — R4.0 or R6.0 may be specified",
      "In cooler climate zones (NCC Zones 7 and 8 — alpine and cool temperate), insulation primarily manages heat retention in winter — confirm the required R-value from the NCC and specify accordingly",
      "Bradford Gold is available in R2.5, R3.5, R4.0, and R6.0 — confirm the required R-value before ordering to avoid under-specifying or over-specifying the insulation",
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

function TechCard({
  title,
  items,
  style,
}: {
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {style === "check" && <CheckCircle size={15} />}
          {style === "warn" && <AlertTriangle size={15} />}
          {style === "bullet" && <BookOpen size={15} />}
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

export function SarkingMineralWoolIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are mineral wool under-tile insulation systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Mineral wool under-tile insulation covers glasswool batts (Bradford Gold, Knauf Earthwool) and stone mineral wool (ROCKWOOL) used in pitched roof rafter and ceiling applications. These are fibrous insulation materials installed between the ceiling joists or between the rafters of a pitched tiled roof to provide thermal insulation. Unlike PIR rigid boards, mineral wool batts are flexible and are not rigid — they compress to fit the available joist or rafter depth but must not be compressed to the point where R-value is reduced.
        </p>
        {expanded && (
          <>
            <p>
              Glasswool is the standard and most widely available mineral wool insulation in Australian residential and strata construction. Stone mineral wool (ROCKWOOL) is specified where non-combustible insulation is required for fire rating compliance, or where higher density and improved acoustic performance are design requirements. Both types are vapour-permeable and do not restrict moisture vapour movement within the roof assembly.
            </p>
            <p>
              Mineral wool batts are distinct from PIR rigid boards (which provide a higher R-value per mm at the cost of rigidity and higher price) and from reflective foil sarking (which provides a secondary weather barrier and radiant heat benefit but minimal resistive insulation). For the highest thermal performance per mm of thickness, specify PIR or phenolic board — for standard residential NCC compliance and cost-effective thermal improvement, glasswool batts are the standard solution.
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

export function SarkingMineralWoolProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter as FilterTag));

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
              Glasswool vs stone wool, fire performance, vapour permeability, NCC thermal requirements
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
              {TECH_INFO.map((card) => (
                <TechCard key={card.title} title={card.title} items={card.items} style={card.style} />
              ))}
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — mineral wool under-tile insulation — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
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
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of mineral wool insulation products. Confirm R-value, NCC climate zone requirements, and vapour management with building certifier before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Wool type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Non-combustible</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Vapour permeable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">R-value range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Density</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Binder</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.woolType}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.nonCombustible === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700"><CheckCircle size={11} /> Yes</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-semibold text-red-600"><XCircle size={11} /> No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.vapourPermeable === "Yes" ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700"><CheckCircle size={11} /> Yes</span>
                    ) : (
                      <span className="text-slate-400">{row.vapourPermeable}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.rValueRange}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.density}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.binder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
