"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "PIR"
  | "Kingspan"
  | "Recticel"
  | "Mineral-wool"
  | "Rockwool"
  | "Tapered"
  | "Non-combustible";

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
    fullLabel: "Kingspan Insulation",
    brandUrl: "https://www.kingspan.com/au",
    tdsUrl: "https://www.kingspan.com/au/en-au/products/insulation-boards/thermaroof/kingspan-thermaroof-tr26-fm/",
    accentColor: "#f97316",
    name: "Kingspan Thermaroof TR26 FM",
    descriptionLine: "PIR tapered insulation board; factory-cut to specified fall; R-value up to R6.0; FM-approved for insurance compliance; BBA certified",
    productType: "PIR tapered insulation board — FM-approved",
    filterTags: ["PIR", "Kingspan", "Tapered"],
    techChips: [
      { label: "PIR", cls: "bg-orange-100 text-orange-800" },
      { label: "Tapered", cls: "bg-slate-100 text-slate-700" },
      { label: "R-value up to R6.0", cls: "bg-green-50 text-green-700" },
      { label: "FM-approved", cls: "bg-slate-100 text-slate-700" },
      { label: "BBA certified", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Kingspan Thermaroof TR26 FM is a polyisocyanurate (PIR) rigid insulation board factory-cut to a tapered profile for flat roof fall correction. The FM (Factory Mutual) approval is a significant specification advantage on commercial and strata buildings where insurers require FM-compliant roof system assemblies — confirm FM system assembly requirements with the roofing membrane manufacturer and the project's insurer before specifying. Boards are designed to achieve 1:80 to 1:40 drainage falls through profiled cut schedules produced from a project-specific layout drawing. The factory-cut approach provides consistent, reliable gradients without the dead load or structural load implications of cementitious screeds. R-values up to R6.0 depending on board thickness, combining thermal performance improvement with fall correction in a single product layer. BBA (British Board of Agrément) certification provides documented third-party product assessment. Compatible with all major single-ply roofing membranes. Confirm AS 1530.3 fire classification status and NCC Section J compliance with Kingspan Australia for Australian applications.",
    technicalProperties: [
      "PIR foam core with glass tissue facing — factory-cut to project-specific tapered profile",
      "R-value up to R6.0 — combined thermal performance and fall correction in one layer",
      "FM-approved — suitable for use in Factory Mutual compliant roof assemblies",
      "BBA certified — documented third-party product assessment",
      "Compatible with all major single-ply and built-up roofing membranes",
      "Bespoke tapered cut schedules produced per project drainage layout drawing",
      "Confirm AS 1530.3 fire classification and NCC Section J compliance with Kingspan Australia",
    ],
    limitations: [
      "Bespoke project-specific cut schedule required — not an off-the-shelf stocked product; lead time must be allowed in the programme",
      "PIR is combustible — where fire class A1 (non-combustible) is required by specification or NCC, specify mineral wool instead",
      "Confirm FM system assembly requirements with membrane manufacturer and insurer before specifying",
      "Confirm AS 1530.3 fire classification and NCC Section J compliance with Kingspan Australia",
      "Vapour control layer requirements must be assessed by the project engineer for the specific roof construction",
      "Confirm current product specification with Kingspan Australia before specifying",
    ],
    procurementSources: [
      { name: "Kingspan Australia — direct supply", url: "https://www.kingspan.com/au" },
      { name: "Fletcher Insulation", url: "https://www.fletcherinsulation.com.au" },
      { name: "Specialised Roofing Suppliers", url: "https://www.kingspan.com/au/en-au/find-a-distributor/" },
    ],
  },
  {
    fullLabel: "Recticel Insulation",
    brandUrl: "https://www.recticelinsulation.com.au",
    tdsUrl: "https://www.recticelinsulation.com.au/products/eurothane-g/",
    accentColor: "#0369a1",
    name: "Recticel Eurothane G",
    descriptionLine: "Polyisocyanurate (PIR) tapered board; Lambda 0.022 W/mK; halogen-free; dimensionally stable; compatible with all major single-ply and built-up roofing systems",
    productType: "PIR tapered insulation board — halogen-free",
    filterTags: ["PIR", "Recticel", "Tapered"],
    techChips: [
      { label: "PIR", cls: "bg-sky-100 text-sky-800" },
      { label: "Tapered", cls: "bg-slate-100 text-slate-700" },
      { label: "Lambda 0.022 W/mK", cls: "bg-green-50 text-green-700" },
      { label: "Halogen-free", cls: "bg-slate-100 text-slate-700" },
      { label: "Dimensionally stable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Recticel Eurothane G is a polyisocyanurate (PIR) rigid insulation board with a glass tissue facing on both sides, available in tapered profiles for flat roof fall correction. Its thermal conductivity of Lambda 0.022 W/mK places it among the highest-performing insulation products by thermal efficiency per unit thickness, making it particularly suitable where roof build-up height is constrained. Halogen-free formulation reduces toxicity in combustion scenarios — an increasingly specified environmental performance requirement. Dimensionally stable under temperature cycling and moisture exposure. Compatible with all major single-ply (PVC-P, TPO, EPDM) and built-up roofing membrane systems. Bespoke project-specific tapered cut schedules are produced by Recticel based on the project drainage layout drawing. Like all PIR products, Eurothane G is combustible and must not be specified where a non-combustible roof system is required. Confirm NCC Section J compliance and AS 1530.3 fire classification with Recticel Australia.",
    technicalProperties: [
      "PIR core with glass tissue facing — Lambda 0.022 W/mK thermal conductivity — high R-value per mm",
      "Factory-cut to project-specific tapered profile for flat roof fall correction",
      "Halogen-free formulation — reduced toxicity in combustion scenarios",
      "Dimensionally stable under temperature cycling and moisture exposure",
      "Compatible with all major single-ply (PVC-P, TPO, EPDM) and built-up roofing systems",
      "Bespoke tapered cut schedules produced per project drainage layout drawing",
      "Confirm NCC Section J compliance and AS 1530.3 fire classification with Recticel Australia",
    ],
    limitations: [
      "PIR is combustible — where fire class A1 (non-combustible) is required, specify Rockwool Hardrock Multi-Fix instead",
      "Bespoke cut schedule required — lead time must be allowed in programme",
      "Confirm AS 1530.3 fire classification and NCC Section J compliance with Recticel Australia",
      "Vapour control layer assessment required for the specific roof construction type",
      "Not suitable as a standalone waterproofing layer — a separate roofing membrane is required over the insulation",
      "Confirm current product specification with Recticel Australia before specifying",
    ],
    procurementSources: [
      { name: "Recticel Insulation Australia — direct supply", url: "https://www.recticelinsulation.com.au" },
      { name: "Specialist roofing insulation distributors — contact Recticel for current network", url: "https://www.recticelinsulation.com.au" },
    ],
  },
  {
    fullLabel: "Rockwool Australia",
    brandUrl: "https://www.rockwool.com/au",
    tdsUrl: "https://www.rockwool.com/au/products/hardrock-multi-fix/",
    accentColor: "#be123c",
    name: "Rockwool Hardrock Multi-Fix",
    descriptionLine: "Dual-density mineral wool tapered board; non-combustible (Euro Class A1); vapour-permeable; suitable for inverted and warm roof constructions",
    productType: "Dual-density mineral wool tapered board — non-combustible",
    filterTags: ["Mineral-wool", "Rockwool", "Tapered", "Non-combustible"],
    techChips: [
      { label: "Mineral-wool", cls: "bg-rose-100 text-rose-800" },
      { label: "Non-combustible", cls: "bg-slate-100 text-slate-700" },
      { label: "Euro Class A1", cls: "bg-green-50 text-green-700" },
      { label: "Vapour-permeable", cls: "bg-slate-100 text-slate-700" },
      { label: "Warm and inverted roof", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockwool Hardrock Multi-Fix is a dual-density mineral wool insulation board with a rigid top layer bonded to a softer base layer, designed for mechanically fastened or adhesive-fixed flat roof applications. Its non-combustible classification (Euro Class A1 to EN 13501-1) makes it the product of choice for projects where NCC requirements or project specification mandate non-combustible insulation — typically high-rise buildings, buildings with specific fire compartmentation requirements, or projects where insurance or heritage conditions require non-combustible construction. As a mineral wool product, it is vapour-permeable — an important consideration in warm roof construction where vapour pressure management differs from PIR-based systems. Available in tapered profiles for flat roof fall correction. Suitable for both warm roof (insulation above the deck, membrane above the insulation) and inverted roof (membrane below the insulation) constructions. Confirm AS 1530.3 classification and NCC Section J compliance with Rockwool Australia. Project-specific tapered cut schedules required.",
    technicalProperties: [
      "Dual-density mineral wool — rigid top layer bonded to softer base — designed for mechanically fastened or adhesive-fixed flat roof assemblies",
      "Non-combustible — Euro Class A1 to EN 13501-1 — suitable for high-rise and fire-classified roof assemblies",
      "Vapour-permeable — important consideration for warm roof vapour pressure management",
      "Suitable for warm roof and inverted roof construction types",
      "Available in tapered profiles for flat roof fall correction — project-specific cut schedules required",
      "Compatible with major single-ply roofing membranes — confirm compatibility with membrane manufacturer",
      "Confirm AS 1530.3 classification and NCC Section J compliance with Rockwool Australia",
    ],
    limitations: [
      "Lower R-value per mm than PIR — greater build-up height required to achieve equivalent thermal performance",
      "Bespoke tapered cut schedule required — lead time must be allowed in programme",
      "Vapour-permeable characteristic changes the vapour analysis requirements for the roof assembly — confirm warm roof design with project engineer",
      "Heavier than PIR — confirm structural load implications with project engineer",
      "Confirm AS 1530.3 classification and NCC Section J compliance with Rockwool Australia",
      "Confirm current product specification with Rockwool Australia before specifying",
    ],
    procurementSources: [
      { name: "Rockwool Australia — direct supply", url: "https://www.rockwool.com/au" },
      { name: "Specialist roofing insulation distributors — contact Rockwool for current network", url: "https://www.rockwool.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "PIR", label: "PIR" },
  { id: "Mineral-wool", label: "Mineral-wool" },
  { id: "Non-combustible", label: "Non-combustible" },
];

const BRAND_EQUIV = [
  {
    a: "Kingspan TR26 FM",
    b: "Recticel Eurothane G",
    note: "Both are PIR tapered boards with similar lambda values and factory-cut tapered profiles. Kingspan TR26 FM carries FM approval for insurer-compliant assemblies; Eurothane G is halogen-free.",
  },
  {
    a: "Rockwool Hardrock Multi-Fix",
    b: "Non-combustible alternative to PIR",
    note: "Mineral wool provides Euro Class A1 non-combustibility where PIR is not permitted. Lower R-value per mm means greater build-up height is required for equivalent thermal performance.",
  },
  {
    a: "All 3 products",
    b: "— bespoke cut schedules required —",
    note: "All three products require project-specific tapered cut schedules produced from a drainage layout drawing. Off-the-shelf flat boards cannot substitute for tapered insulation in fall correction applications.",
  },
];

const SYSTEM_COMPARISON: {
  attribute: string;
  kingspan: string;
  recticel: string;
  rockwool: string;
}[] = [
  {
    attribute: "Board type",
    kingspan: "PIR — polyisocyanurate",
    recticel: "PIR — polyisocyanurate",
    rockwool: "Mineral wool — dual density",
  },
  {
    attribute: "R-value",
    kingspan: "Up to R6.0",
    recticel: "Lambda 0.022 — high R/mm",
    rockwool: "Lower R/mm — confirm with TDS",
  },
  {
    attribute: "Fire class",
    kingspan: "Confirm AS 1530.3 with Kingspan",
    recticel: "Confirm AS 1530.3 with Recticel",
    rockwool: "Euro Class A1 — non-combustible",
  },
  {
    attribute: "Min thickness",
    kingspan: "Confirm with Kingspan tapered schedule",
    recticel: "Confirm with Recticel tapered schedule",
    rockwool: "Confirm with Rockwool tapered schedule",
  },
];

const TECH_INFO = [
  {
    title: "PIR vs mineral wool tapered board selection criteria",
    items: [
      "PIR provides the highest R-value per mm and is the preferred choice where build-up height is constrained — Kingspan TR26 FM and Recticel Eurothane G are both PIR products",
      "Mineral wool (Rockwool Hardrock) is non-combustible (Euro Class A1) and must be specified where NCC or project specification mandates non-combustible roof construction",
      "High-rise buildings and buildings in fire-sensitive locations frequently require non-combustible insulation — confirm with the NCC performance solution or DTS pathway applicable to the project",
      "PIR boards are combustible and must be separated from the building interior by an appropriate fire-rated element — confirm with project fire engineer or NCC consultant",
      "Where insurance requirements mandate FM-approved assemblies, Kingspan TR26 FM is the appropriate PIR selection — confirm FM system assembly requirements with the membrane manufacturer",
    ],
    icon: "bullet" as const,
  },
  {
    title: "How tapered insulation achieves falls without screed weight",
    items: [
      "Tapered insulation boards are manufactured with a wedge-profile cut from thicker at one end to thinner at the other, creating a gradient across the installed board area",
      "The profiled cut schedule is designed by the board manufacturer from the project drainage layout — all boards in the area are assigned specific thickness to collectively achieve the target fall",
      "Typical falls achieved: 1:80 to 1:40 — confirm minimum fall with project engineer and NCC requirements",
      "Weight of tapered insulation is 3–15 kg/m² depending on product and thickness — significantly lower than polymer-modified screed at 18–22 kg/m² per 10mm",
      "Tapered insulation is the preferred fall correction method on lightweight steel or timber roof structures where structural capacity limits the use of cementitious screed",
    ],
    icon: "check" as const,
  },
  {
    title: "Vapour control and warm vs inverted roof considerations",
    items: [
      "In a warm roof, insulation is above the deck and below the waterproofing membrane — a vapour control layer (VCL) is required on the warm (underside) face of the insulation to prevent interstitial condensation",
      "In an inverted roof, the waterproofing membrane is below the insulation — the membrane acts as the vapour barrier and the insulation is protected from the membrane by the overburden above",
      "Mineral wool (Rockwool) is vapour-permeable — the vapour analysis for a warm roof with mineral wool differs from an analysis with impermeable PIR",
      "Confirm vapour control requirements for the specific roof construction type with the project engineer or façade engineer",
      "Misspecification of vapour control can cause interstitial condensation, membrane failure, and structural damage — do not substitute insulation types without reviewing the vapour analysis",
    ],
    icon: "warn" as const,
  },
  {
    title: "NCC Section J and fall compliance for flat roofs",
    items: [
      "NCC 2022 Section J sets minimum thermal requirements for building fabric — confirm current R-value requirements for the roof construction type and climate zone",
      "NCC Volume One requires minimum 1:100 fall to drainage for flat roofs on Class 2–9 buildings — confirm with project engineer",
      "Tapered insulation must achieve the required minimum fall across the entire roof area — low points and sumps must be confirmed by the tapered cut schedule designer",
      "Confirm AS 1530.3 fire index classification with the product manufacturer for Australian NCC compliance — European fire class (Euro Class A1) does not directly translate to AS 1530.3 classification",
      "Where tapered insulation is used in a performance solution, confirm that the system assembly meets the required fire performance with a fire engineer",
    ],
    icon: "bullet" as const,
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

export function TaperedInsulationBoardIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are tapered insulation board systems for flat roof fall correction?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Tapered insulation boards are rigid insulation products factory-cut to a wedge profile that creates a drainage fall across the installed area. Unlike polymer-modified screeds, which add significant dead load to the roof structure, tapered insulation boards weigh only 3–15 kg/m² — making them the preferred fall correction method for lightweight structures, timber roofs, and buildings where additional structural load is constrained.
        </p>
        {expanded && (
          <>
            <p>
              PIR (polyisocyanurate) boards — such as Kingspan Thermaroof TR26 FM and Recticel Eurothane G — offer the highest R-value per millimetre of any rigid insulation type. Mineral wool boards — such as Rockwool Hardrock Multi-Fix — are non-combustible (Euro Class A1) and are specified where fire performance is the overriding criterion.
            </p>
            <p>
              All three products require a project-specific tapered cut schedule produced by the board manufacturer from the roof drainage layout drawing. The cut schedule ensures that the assembled boards collectively achieve the target fall across all areas of the roof. Tapered insulation does not replace the waterproofing membrane — a separate roofing membrane system is always required over the insulation boards.
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

export function TaperedInsulationBoardProductSection() {
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
              PIR vs mineral wool selection, tapered fall mechanics, vapour control, NCC Section J
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
              {TECH_INFO.map((info) => (
                <TechCard
                  key={info.title}
                  icon={
                    info.icon === "check" ? <Ruler size={15} /> :
                    info.icon === "warn" ? <AlertTriangle size={15} /> :
                    <Layers size={15} />
                  }
                  title={info.title}
                  items={info.items}
                  style={info.icon}
                />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — tapered insulation board systems for flat roof fall correction</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
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
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Comparable products across brands — confirm technical equivalence with the current manufacturer TDS before substituting.</p>
          </div>
        </div>
        <div className="space-y-3">
          {BRAND_EQUIV.map((eq) => (
            <div key={eq.a} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-900">{eq.a}</span>
                <span className="text-slate-400 text-xs font-bold">≈</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{eq.b}</span>
              </div>
              <p className="text-xs leading-5 text-slate-600">{eq.note}</p>
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
              Side-by-side comparison of tapered insulation board systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Kingspan TR26 FM</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Recticel Eurothane G</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Rockwool Hardrock Multi-Fix</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td>
                  <td className="px-4 py-3 text-slate-600">{row.kingspan}</td>
                  <td className="px-4 py-3 text-slate-600">{row.recticel}</td>
                  <td className="px-4 py-3 text-slate-600">{row.rockwool}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
