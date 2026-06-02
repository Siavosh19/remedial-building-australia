"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Access-hatch"
  | "Roof-access"
  | "Aluminium"
  | "Steel"
  | "Galvanised"
  | "Insulated"
  | "Ladder-access"
  | "Flat-roof";

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
    fullLabel: "Milcor",
    brandUrl: "https://www.milcor.com",
    accentColor: "#ef4444",
    name: "Milcor Galvanised Steel Roof Access Hatch",
    descriptionLine:
      "Galvanised steel curb with aluminium cover panel roof access hatch — spring-assisted lid, stainless hardware, hasp and staple lock for roof maintenance access",
    productType: "Galvanised steel roof access hatch with aluminium cover",
    filterTags: ["Access-hatch", "Roof-access", "Steel", "Galvanised", "Aluminium", "Flat-roof"],
    techChips: [
      { label: "Galvanised steel curb", cls: "bg-sky-100 text-sky-800" },
      { label: "Aluminium cover", cls: "bg-slate-100 text-slate-700" },
      { label: "Spring-assisted lid", cls: "bg-slate-100 text-slate-700" },
      { label: "Hasp and staple lock", cls: "bg-slate-100 text-slate-700" },
      { label: "Flat roof", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Milcor galvanised steel roof access hatches are widely used in Australian commercial and multi-residential building roofing for maintenance access to flat and low-slope roofs. The hatch consists of a galvanised steel curb that is independently supported from the roof structure, with an aluminium cover panel fitted with spring-assisted lid operation, stainless steel hardware, and a hasp and staple locking mechanism suitable for padlock security. The curb provides the upstand for waterproofing membrane continuation and is designed to receive standard liquid-applied or sheet membrane systems up and over the curb perimeter.\n\nMilcor hatches are typically sized to AS 1657 minimum clear opening requirements for fixed ladder access. Confirm opening size, structural support, membrane upstand height and locking requirements against the current Milcor technical data sheet and AS 1657 before specifying. Product range and designations are subject to change — confirm current availability with Milcor or authorised distributor.",
    technicalProperties: [
      "Galvanised steel curb — corrosion-resistant for exposed rooftop environment — suitable for membrane upstand continuation",
      "Aluminium cover panel — lightweight and corrosion-resistant — spring-assisted counterbalance for single-person operation",
      "Stainless steel hardware throughout — hinges, compression springs and fasteners resist rooftop weathering",
      "Hasp and staple lock — accepts standard padlock — meets basic security requirements for roof access control",
      "Available in standard sizes compliant with AS 1657 minimum clear opening — confirm current size range with Milcor",
    ],
    limitations: [
      "Galvanised steel curb requires priming before membrane application — confirm primer compatibility with membrane manufacturer",
      "Hatch curb must be independently supported from the roof structure — do not rely on membrane upstand alone for structural support",
      "Waterproofing membrane must be carried up and over the hatch curb — consult waterproofing consultant for detailing",
      "No integral ladder — separate fixed ladder to AS 1657 required for access — coordinate ladder installation with hatch specification",
      "Confirm current product specification and compliance with Milcor before specifying",
    ],
    procurementSources: [
      { name: "Milcor — trade supply through authorised distributors — contact for current pricing", url: "https://www.milcor.com" },
      { name: "Building hardware and roofing suppliers nationally — confirm current stock", url: "https://www.milcor.com" },
    ],
  },
  {
    fullLabel: "Fakro",
    brandUrl: "https://www.fakro.com.au",
    accentColor: "#3b82f6",
    name: "Fakro DRL Fixed Ladder Roof Access Hatch",
    descriptionLine:
      "Insulated aluminium roof access hatch with integral fold-down fixed ladder — thermally broken frame, weatherseal gasket, safety rail compatible",
    productType: "Insulated roof access hatch with integral fixed ladder",
    filterTags: ["Access-hatch", "Roof-access", "Aluminium", "Insulated", "Ladder-access", "Flat-roof"],
    techChips: [
      { label: "Insulated aluminium hatch", cls: "bg-sky-100 text-sky-800" },
      { label: "Integral fold-down ladder", cls: "bg-slate-100 text-slate-700" },
      { label: "Thermally broken frame", cls: "bg-green-50 text-green-700" },
      { label: "Weatherseal gasket", cls: "bg-slate-100 text-slate-700" },
      { label: "Safety rail compatible", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Fakro DRL is an insulated aluminium roof access hatch with an integral fold-down fixed ladder, designed for safe single-person access to flat roofs in multi-residential and commercial buildings. The thermally broken aluminium frame reduces thermal bridging at the hatch opening, while the weatherseal perimeter gasket provides a weatherproof closure when the hatch is shut. The integral fold-down ladder eliminates the need for a separate fixed ladder installation, reducing structural coordination and simplifying AS 1657 compliance for the access system as a single unit.\n\nThe Fakro DRL is compatible with safety rail and edge protection systems to meet WHS Regulation 2017 Part 4.5 requirements for work at height on Class 2 strata apartment rooftops. Confirm current model designation, sizing, thermal performance data, and AS 1657 compliance documentation with Fakro Australia before specifying. Product range subject to revision.",
    technicalProperties: [
      "Insulated aluminium construction — thermally broken frame reduces heat loss at hatch opening — suitable for conditioned building envelopes",
      "Integral fold-down fixed ladder — single-unit access system — eliminates separate ladder installation and structural coordination",
      "Weatherseal perimeter gasket — weatherproof closure — reduces water ingress risk at hatch opening when shut",
      "Safety rail compatible — can be specified with edge protection systems to comply with WHS Regulation 2017 Part 4.5",
      "Available in sizes to comply with AS 1657 minimum clear opening requirements — confirm current size range with Fakro Australia",
    ],
    limitations: [
      "Insulated hatch has greater weight than standard steel hatch — confirm structural support for hatch curb and opening framing",
      "Integral ladder requires adequate floor-to-roof height for safe deployment — confirm clearance against AS 1657 requirements",
      "Waterproofing membrane must be carried up and over the hatch curb — consult waterproofing consultant for detailing at thermally broken frame",
      "Edge protection and safety rail at roof level must be specified separately and coordinated with hatch installation — hatch alone does not satisfy WHS height safety requirements",
      "Confirm current product specification and compliance with Fakro before specifying",
    ],
    procurementSources: [
      { name: "Fakro Australia — trade supply — contact for current pricing and technical support", url: "https://www.fakro.com.au" },
      { name: "Roofing and building product distributors — confirm current stock with Fakro Australia", url: "https://www.fakro.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Access-hatch", label: "Access-hatch" },
  { id: "Roof-access", label: "Roof-access" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Steel", label: "Steel" },
  { id: "Galvanised", label: "Galvanised" },
  { id: "Insulated", label: "Insulated" },
  { id: "Ladder-access", label: "Ladder-access" },
  { id: "Flat-roof", label: "Flat-roof" },
];

const BRAND_EQUIV: { system: string; milcor: string; fakro: string }[] = [
  { system: "Steel curb / aluminium lid hatch", milcor: "Galvanised Steel Hatch", fakro: "—" },
  { system: "Insulated hatch with ladder", milcor: "—", fakro: "DRL Ladder Hatch" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  insulated: string;
  ladderIncluded: string;
  standard: string;
  primaryUse: string;
}[] = [
  {
    product: "Milcor Galvanised Steel Roof Access Hatch",
    brand: "Milcor",
    material: "Galvanised steel curb / aluminium lid",
    insulated: "No",
    ladderIncluded: "No",
    standard: "AS 1657",
    primaryUse: "Flat roof maintenance access — basic steel/aluminium lid hatch",
  },
  {
    product: "Fakro DRL Fixed Ladder Roof Access Hatch",
    brand: "Fakro",
    material: "Insulated aluminium",
    insulated: "Yes",
    ladderIncluded: "Yes",
    standard: "AS 1657",
    primaryUse: "Flat roof access with integral ladder — thermally broken insulated hatch",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Roof maintenance access on Class 2 strata apartment building flat or low-slope roofs",
    "Emergency egress and evacuation access from roof level in multi-storey residential buildings",
    "Plant room and mechanical equipment access on commercial and multi-residential rooftops",
    "Replacement of non-compliant or deteriorated existing roof access hatches on remediation projects",
    "New roof access provision as part of remediation works where safe roof access was previously absent",
  ],
  selectionCriteria: [
    "Confirm AS 1657 minimum clear opening size before specifying — opening must be adequate for occupant egress and maintenance access",
    "Select insulated hatch where the building has a conditioned ceiling void — thermal bridging at hatch opening affects building energy performance",
    "Select integral ladder hatch where floor-to-roof height and headroom permit — eliminates coordination of separate fixed ladder",
    "Confirm structural support for hatch curb is independent of roof membrane — membrane upstand must not carry hatch structural load",
    "Coordinate edge protection and safety rail specification at roof level with hatch selection — WHS Regulation 2017 Part 4.5 requirements apply",
  ],
  limitations: [
    "Roof access hatch alone does not satisfy WHS Regulation 2017 working at heights requirements — edge protection at roof level must be separately specified",
    "Membrane upstand at hatch curb must be detailed and installed by a qualified waterproofing contractor — hatch manufacturer does not warrant membrane performance",
    "Confirm structural support for hatch curb before installation — concrete or framed opening must be designed to carry hatch and access loads",
    "Insulated hatches have greater weight — confirm lifting force and spring-assist specification against occupant capability requirements",
    "All roof access hatches must be lockable from below to prevent unauthorised roof access — confirm locking mechanism with security requirements",
  ],
  standardsNotes: [
    "AS 1657 — Fixed Platforms, Walkways, Stairways and Ladders — prescribes minimum clear opening size and ladder requirements for roof access hatches",
    "WHS Regulation 2017 Part 4.5 — working at heights — edge protection and fall prevention required at roof level during maintenance access",
    "NCC (National Construction Code) — roof access requirements for Class 2 buildings — confirm applicable provisions with building certifier",
    "Waterproofing membrane at hatch curb must comply with the relevant membrane system standard — AS 3740, AS 4654 or applicable product standard",
  ],
  suitableDefects: [
    "Non-compliant or absent roof access hatch on Class 2 strata apartment rooftop requiring AS 1657 compliant access",
    "Deteriorated or corroded existing roof access hatch requiring replacement as part of roofing remediation",
    "Leaking hatch curb or cover where waterproofing membrane has failed at the hatch upstand",
    "Insecure or unlockable existing hatch creating unauthorised roof access risk",
  ],
  typicalSubstrates: [
    "Concrete roof deck — hatch curb independently supported from structural slab — membrane carried over curb",
    "Framed roof construction — hatch curb supported from framed opening — structural engineer to confirm support design",
    "Existing waterproofed flat roof — hatch curb penetrates existing membrane — full membrane detailing at curb perimeter required",
    "Metal deck roof — confirm structural support adequacy for hatch curb loads with structural engineer",
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

export function RoofAccessIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are roof access hatch systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Roof access hatches provide safe, compliant access to the rooftop of multi-storey residential and commercial buildings for maintenance, inspection and emergency purposes. For Class 2 strata apartment buildings, access to the roof is a practical necessity for ongoing maintenance of waterproofing membranes, drainage, mechanical plant, antennae and solar systems. The Work Health and Safety Regulation 2017 Part 4.5 imposes duties on persons conducting a business or undertaking to manage risks associated with working at height, including requiring safe access routes to roof level. A compliant roof access hatch is the fundamental element of that access route.
        </p>
        <p>
          Roof access hatches fall into two broad categories: basic steel or aluminium lid hatches consisting of a galvanised steel curb with an aluminium cover panel, and insulated hatches with an integrated fold-down fixed ladder. Basic hatches require a separately specified and installed fixed ladder to AS 1657, and are typically lower in cost but require more structural coordination. Insulated hatches with an integral ladder simplify specification and AS 1657 compliance by combining the hatch and ladder into a single certified unit, and provide better thermal performance at the roof penetration for conditioned buildings.
        </p>
        <p>
          AS 1657 — Fixed Platforms, Walkways, Stairways and Ladders — prescribes the minimum clear opening dimensions for roof access hatches and the requirements for fixed ladders used in conjunction with them. WHS Regulation 2017 Part 4.5 requires that edge protection be provided at roof level when persons are working at heights. A roof access hatch alone does not satisfy working at heights requirements — edge protection, safety lines or other fall prevention measures must be specified and installed separately. All hatch specifications must be confirmed against current AS 1657 requirements, the NCC and applicable WHS legislation before installation.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Skylights — designed for daylighting, not access — not structurally or operationally suitable as a roof access hatch",
              "Attic access hatches — internal ceiling hatches providing access to roof void or attic space, not through-roof access to the external roof surface",
              "Lift overruns and plant room access doors — structural access provisions for mechanical plant rooms that differ from maintenance access hatches",
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

export function RoofAccessProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — roof access hatch systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of roof access hatch products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Insulated</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Ladder included</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${row.insulated === "Yes" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {row.insulated}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${row.ladderIncluded === "Yes" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {row.ladderIncluded}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.standard}</td>
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
            <p className="mt-1 text-sm text-slate-500">Roof access hatch equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Milcor</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Fakro</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.milcor, row.fakro].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Compliance and structural requirements</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Roof access hatch must comply with AS 1657 and WHS Regulation 2017 — edge protection required at roof level when persons are working at height — hatch alone does not satisfy working at heights requirements",
            "Hatch curb must be independently supported from the roof structure — do not rely on membrane upstand alone to carry hatch or access loads — structural engineer to confirm support design",
            "Waterproofing membrane must be carried up and over the hatch curb — consult waterproofing consultant for detailing at hatch perimeter — membrane manufacturer warranty requires correct upstand installation",
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
