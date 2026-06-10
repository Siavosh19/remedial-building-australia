"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Floor"
  | "Wall"
  | "Facade"
  | "Aluminium"
  | "Stainless"
  | "Seismic"
  | "Standard-movement"
  | "Trafficable"
  | "Watertight"
  | "Fire-rated";

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
    fullLabel: "Unison Joints",
    brandUrl: "https://www.unisonjoints.com.au",
    accentColor: "#003087",
    name: "Unison Joints FF Series",
    descriptionLine: "Floor-to-floor aluminium expansion joint cover — standard movement floor joints in Class 2 strata buildings",
    productType: "Aluminium floor expansion joint",
    filterTags: ["Floor", "Aluminium", "Standard-movement", "Trafficable"],
    techChips: [
      { label: "Aluminium extrusion", cls: "bg-slate-100 text-slate-700" },
      { label: "Floor-to-floor", cls: "bg-sky-50 text-sky-700" },
      { label: "Trafficable", cls: "bg-amber-50 text-amber-700" },
      { label: "Standard movement", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Aluminium extruded floor-to-floor expansion joint cover for standard building movement in floor applications. Used in Class 2 strata and commercial buildings to cover and protect structural expansion joints in floor screeds, tiled floors and concrete slabs. The FF Series accommodates horizontal movement within the joint and is fixed to the substrate on each side of the joint independently. Confirm joint width, movement rating and substrate fixings with Unison technical before specifying.",
    technicalProperties: [
      "Aluminium extrusion with neoprene or foam centre seal — independent fixing to each substrate side",
      "Trafficable for foot traffic — suitable for lobbies, corridors and public areas",
      "Available in various joint widths and anodised or powder coat finishes",
      "Replacement centre seal available without removing full system",
      "Confirm movement rating and joint width with Unison technical before specifying",
    ],
    limitations: [
      "Not rated for vehicle or forklift traffic without specifying heavy-duty variant",
      "Confirm movement rating matches anticipated joint movement before specifying",
      "Centre seal replacement required over time — confirm maintenance access before installing",
      "Not suitable for immersed or submerged applications without waterproof variant",
    ],
    procurementSources: [
      { name: "Unison Joints Australia — unisonjoints.com.au", url: "https://www.unisonjoints.com.au" },
      { name: "Architectural hardware and construction joints distributors", url: "https://www.unisonjoints.com.au" },
    ],
  },
  {
    fullLabel: "Unison Joints",
    brandUrl: "https://www.unisonjoints.com.au",
    accentColor: "#003087",
    name: "Unison Joints FW Series",
    descriptionLine: "Floor-to-wall aluminium expansion joint cover — perimeter and wall junction movement joints",
    productType: "Aluminium floor-to-wall expansion joint",
    filterTags: ["Floor", "Wall", "Aluminium", "Standard-movement"],
    techChips: [
      { label: "Aluminium extrusion", cls: "bg-slate-100 text-slate-700" },
      { label: "Floor-to-wall", cls: "bg-sky-50 text-sky-700" },
      { label: "Perimeter joint", cls: "bg-slate-100 text-slate-700" },
      { label: "Neoprene seal", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Aluminium floor-to-wall expansion joint cover for perimeter movement joints at the junction of floor and wall elements in Class 2 strata and commercial buildings. Covers the joint and provides a clean finish at the floor-wall junction. Used in lobbies, corridors, car parks and public areas where structural movement must be accommodated at the perimeter joint. Each substrate side is fixed independently to allow differential movement.",
    technicalProperties: [
      "Aluminium extrusion cover plate with flexible neoprene or EPDM centre seal",
      "Accommodates differential movement between floor and wall",
      "Powder coat finish to match interior — each wing independently anchored to substrate",
      "Compatible with tiled and screed floors",
      "Confirm joint width and movement rating with Unison technical before specifying",
    ],
    limitations: [
      "Not suitable for joints subject to large seismic movement without seismic-rated variant",
      "Cover plate can be a trip hazard if specified too thin — confirm profile depth with architect",
      "Confirm finish and colour with architect before ordering",
      "Not for use in wet areas without waterproof gasket variant",
    ],
    procurementSources: [
      { name: "Unison Joints Australia — unisonjoints.com.au", url: "https://www.unisonjoints.com.au" },
      { name: "Architectural joinery suppliers", url: "https://www.unisonjoints.com.au" },
    ],
  },
  {
    fullLabel: "C/S Group",
    brandUrl: "https://www.csgroup.com",
    accentColor: "#1A3A5C",
    name: "C/S Group Centra-Seal",
    descriptionLine: "Compression seal expansion joint system — wide-gap structural expansion joints in facades and floors",
    productType: "Compression seal expansion joint",
    filterTags: ["Floor", "Wall", "Facade", "Standard-movement", "Seismic", "Watertight"],
    techChips: [
      { label: "Compression seal", cls: "bg-indigo-100 text-indigo-800" },
      { label: "Wide joint", cls: "bg-slate-100 text-slate-700" },
      { label: "Watertight", cls: "bg-sky-50 text-sky-700" },
      { label: "Facade & floor", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "C/S Group Centra-Seal is a preformed thermoplastic elastomer compression seal expansion joint system suitable for wide structural expansion joints in facades, floors and walls of Class 2 and commercial buildings. The extruded seal compresses into the joint and remains in compression to maintain weathertightness and movement accommodation. Used in Australian remediation projects where sealant-only systems are insufficient for wide structural expansion joints. Seismic-rated variants available.",
    technicalProperties: [
      "Preformed thermoplastic elastomer (TPE) compression seal — accommodates wide joints and seismic movement",
      "Watertight seal in compression — UV resistant",
      "Available in multiple profiles for floor, wall, ceiling and facade applications",
      "Replaceable without demolition — confirm access and replacement procedure with C/S Group technical",
      "Fire-rated variants available — must be specified separately",
    ],
    limitations: [
      "Correct joint width and compression ratio critical — oversized or undersized joints will fail",
      "Substrate preparation and fixing critical for retention — confirm installation method with C/S Group technical",
      "Fire-rated variants available but must be specified separately — confirm with building certifier",
      "International supply — contact Australian distributor for pricing and lead time",
    ],
    procurementSources: [
      { name: "C/S Group — csgroup.com — international supply", url: "https://www.csgroup.com" },
      { name: "Contact Australian distributor for pricing and lead time", url: "https://www.csgroup.com" },
    ],
  },
  {
    fullLabel: "MM Systems",
    brandUrl: "https://www.mmsystems.com",
    accentColor: "#2C5F2E",
    name: "MM Systems Series F",
    descriptionLine: "Aluminium and stainless steel floor expansion joint cover — heavy-duty trafficable floor joints",
    productType: "Metal floor expansion joint",
    filterTags: ["Floor", "Aluminium", "Stainless", "Trafficable", "Standard-movement", "Seismic"],
    techChips: [
      { label: "Aluminium / SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Heavy duty", cls: "bg-amber-100 text-amber-800" },
      { label: "Trafficable", cls: "bg-amber-50 text-amber-700" },
      { label: "Seismic option", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "MM Systems Series F is a heavy-duty aluminium or stainless steel floor expansion joint cover system for trafficable and high-traffic floor joints in commercial, industrial and Class 2 building applications. Suitable for areas subject to wheeled traffic, forklift traffic and heavy pedestrian loads. Seismic-rated variants accommodate lateral seismic movement. In Australian Class 2 building remediation it is used in car parks, loading docks and commercial lobbies where structural expansion joints must be covered with a trafficable, durable system.",
    technicalProperties: [
      "Extruded aluminium or stainless steel cover plate with EPDM or neoprene centre seal",
      "Rated for wheeled and heavy pedestrian traffic — seismic-rated variants available",
      "Stainless steel option for corrosive or coastal environments",
      "Wide range of joint widths — confirm with MM Systems technical before specifying",
      "Seismic-rated variants accommodate lateral seismic movement — confirm installation method",
    ],
    limitations: [
      "Requires adequate concrete substrate edge for anchor fixing — spalled or crumbling joint edges must be repaired first",
      "Seismic variants require specific installation method — confirm with MM Systems technical",
      "Confirm traffic load rating before specifying — heavy-duty variant required for vehicle and forklift traffic",
      "International supply — confirm lead time for Australian projects before specifying",
    ],
    procurementSources: [
      { name: "MM Systems — mmsystems.com — contact Australian distributor", url: "https://www.mmsystems.com" },
      { name: "Structural and architectural joint system suppliers", url: "https://www.mmsystems.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Floor", label: "Floor" },
  { id: "Wall", label: "Wall" },
  { id: "Facade", label: "Facade" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Stainless", label: "Stainless" },
  { id: "Seismic", label: "Seismic" },
  { id: "Trafficable", label: "Trafficable" },
];

const BRAND_EQUIV: { application: string; unison: string; csgroup: string; mmsystems: string }[] = [
  { application: "Floor-to-floor", unison: "FF Series", csgroup: "Centra-Seal", mmsystems: "Series F" },
  { application: "Floor-to-wall", unison: "FW Series", csgroup: "Centra-Seal", mmsystems: "—" },
  { application: "Facade joints", unison: "—", csgroup: "Centra-Seal", mmsystems: "—" },
  { application: "Heavy traffic", unison: "—", csgroup: "—", mmsystems: "Series F" },
  { application: "Seismic rated", unison: "—", csgroup: "Centra-Seal", mmsystems: "Series F" },
];

const SYSTEM_COMPARISON: {
  row: string;
  ffSeries: string;
  fwSeries: string;
  centraSeal: string;
  seriesF: string;
}[] = [
  { row: "Application", ffSeries: "Floor-to-floor", fwSeries: "Floor-to-wall", centraSeal: "Floor / wall / facade", seriesF: "Heavy-duty floor" },
  { row: "Material", ffSeries: "Aluminium", fwSeries: "Aluminium", centraSeal: "TPE compression seal", seriesF: "Aluminium / stainless" },
  { row: "Movement type", ffSeries: "Standard movement", fwSeries: "Standard movement", centraSeal: "Standard + seismic", seriesF: "Standard + seismic" },
  { row: "Traffic rating", ffSeries: "Foot traffic", fwSeries: "Foot traffic", centraSeal: "Confirm with C/S Group", seriesF: "Heavy / vehicle traffic" },
  { row: "Seismic option", ffSeries: "No", fwSeries: "No", centraSeal: "Yes", seriesF: "Yes" },
  { row: "Watertight", ffSeries: "Centre seal", fwSeries: "Centre seal", centraSeal: "Yes — in compression", seriesF: "Centre seal" },
  { row: "Lead time", ffSeries: "Local — AU stock", fwSeries: "Local — AU stock", centraSeal: "International — confirm", seriesF: "International — confirm" },
];

const TECH_INFO = {
  jointWidth: [
    "Structural expansion joints are designed by structural engineers to allow differential thermal, seismic and settlement movement between building elements",
    "Joint width is determined by anticipated maximum movement — wider joints accommodate larger movement cycles",
    "Joint width in Australian Class 2 buildings typically ranges from 20 mm to 100 mm — confirm design joint width from structural drawings before specifying cover system",
    "Cover system must be compatible with the design joint width — confirm with manufacturer technical before ordering",
    "Do not reduce or fill the structural joint — the joint must remain clear of rigid material to allow movement",
  ],
  movementRatings: [
    "Standard movement rating — covers systems for thermal and live load movement — typical for Class 2 strata buildings",
    "Seismic movement rating — covers systems for lateral seismic displacement — required in seismic design zones under AS 1170.4",
    "Movement capacity is specified in mm — confirm the system's rated movement capacity against the structural engineer's calculated joint movement",
    "Seismic-rated systems have different installation requirements — confirm with manufacturer before specifying in seismic zones",
    "Thermal movement must also be calculated — steel and concrete expand and contract differently — confirm with structural engineer",
  ],
  substratePreparation: [
    "Joint edges must be structurally sound before installing any cover plate system — spalled, crumbled or hollow-sounding concrete must be repaired first",
    "Anchor fixings for cover plates rely on sound substrate — inadequate substrate will result in cover plate failure and risk of trip hazard",
    "Repair spalled joint edges with structural epoxy mortar or polymer-modified mortar — confirm repair mortar compatibility with cover plate anchor system",
    "Joint edges must be clean and free of old sealant, paint, oil and contamination before fixing cover plates",
    "Confirm minimum concrete strength and edge distance requirements for anchor fixings from manufacturer technical data",
  ],
  fireRating: [
    "Some expansion joints in Class 2 buildings require fire-rated joint covers — confirm with building certifier and NCC Section C requirements",
    "Fire-rated expansion joint cover systems must be specified with the correct FRL — confirm required FRL from building certifier before specifying",
    "Standard aluminium cover plates are not fire-rated — do not assume a standard cover system meets fire rating requirements",
    "Fire-rated variants are available from some manufacturers — confirm availability and FRL with manufacturer technical",
    "Installation of fire-rated expansion joint covers must be inspected and certified — coordinate with certifier during design stage",
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

export function ExpansionJointCoverIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are expansion joint cover systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Mechanical expansion joint cover systems are proprietary aluminium, stainless steel or elastomeric systems that cover and protect structural expansion joints in floor, wall and facade elements of Class 2 strata and commercial buildings. Unlike sealant-based joint systems, mechanical cover systems accommodate movement through a physical cover plate and flexible centre seal mechanism — the cover plate bridges the joint and is anchored independently to each side of the substrate to allow relative movement. They are used where the joint is too wide or the anticipated movement is too large for a sealant-only system, or where the joint requires a trafficable, durable or architecturally finished cover.
        </p>
        <p>
          Selection depends on the joint location (floor, wall or facade), the design joint width from structural drawings, the anticipated movement type (standard thermal or seismic), the traffic type (foot traffic, wheeled, heavy), material selection (aluminium for standard environments, stainless steel for corrosive or coastal settings), and fire rating requirements. Substrate edge condition is critical — spalled or crumbled joint edges must be repaired before cover plate installation. Confirm all parameters with the manufacturer technical team before specifying.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Sealant-only expansion joints — silicone or PU sealant is used to seal narrow movement joints — not a mechanical cover plate system",
            "Control joints — saw-cut or formed joints in concrete slabs to control cracking — not the same as structural expansion joints",
            "Construction joints — formed joints between separate concrete pours — not designed for ongoing movement accommodation",
            "Isolation joints — joints isolating a slab from a wall or column — may or may not require a cover system depending on location and movement",
            "Backing rods — foam rod installed in sealant joints as bond breaker — not a mechanical cover system",
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

export function ExpansionJointCoverProductSection() {
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
              Joint width, movement ratings, substrate preparation and fire rating requirements
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              <TechCard icon={<Ruler size={15} />} title="Joint Width" items={TECH_INFO.jointWidth} style="bullet" />
              <TechCard icon={<Layers size={15} />} title="Movement Ratings" items={TECH_INFO.movementRatings} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Substrate Preparation" items={TECH_INFO.substratePreparation} style="warn" />
              <TechCard icon={<AlertTriangle size={15} />} title="Fire Rating" items={TECH_INFO.fireRating} style="warn" />
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
            <p className="mt-1 text-sm text-slate-500">4 products — 3 brands — mechanical expansion joint cover systems — scroll to view all</p>
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
              Expansion joint cover system equivalents by application across brands active in Australian Class 2 and commercial building remediation. Confirm exact product and specification with manufacturer before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">
                  Application
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#003087" }}>Unison Joints</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1A3A5C" }}>C/S Group</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#2C5F2E" }}>MM Systems</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.application} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.application}
                  </td>
                  {[row.unison, row.csgroup, row.mmsystems].map((val, j) => (
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
              Side-by-side comparison of the four expansion joint cover systems listed on this page. Confirm all parameters with manufacturer technical before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#003087" }}>FF Series</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#003087" }}>FW Series</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1A3A5C" }}>Centra-Seal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#2C5F2E" }}>Series F</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.row} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.row}
                  </td>
                  {[row.ffSeries, row.fwSeries, row.centraSeal, row.seriesF].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Substrate Warning — BELOW comparison tables ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Critical — Substrate Edge Condition and Anchor Fixing</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Expansion joint cover plate systems rely entirely on sound substrate edges for anchor fixing — do not install over spalled, hollow or crumbled concrete joint edges",
            "Spalled joint edges must be repaired with structural epoxy mortar or polymer-modified repair mortar before cover plate installation — confirm repair mortar compatibility with anchor system",
            "Anchor fixing edge distance must meet manufacturer's minimum requirements — confirm from manufacturer technical data and structural drawings before specifying",
            "A failed anchor fixing will allow the cover plate to lift and create a trip hazard — this is a life safety issue in public areas and must be treated as a priority defect",
            "Confirm seismic requirements with structural engineer before specifying any expansion joint cover system in areas subject to AS 1170.4 seismic design requirements",
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
