"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";

type FilterTag =
  | "Diamond-blade"
  | "Demo-hammer"
  | "Needle-gun"
  | "Cup-wheel"
  | "Perimeter-cutting"
  | "Concrete-removal"
  | "Rebar-cleaning"
  | "Surface-prep";

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
    fullLabel: "Bosch / Hilti / Milwaukee — Tool Hire or Purchase",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#0369a1",
    name: "Diamond Saw Blade — Perimeter Cutting",
    descriptionLine: "Segmented diamond saw blade — 230–350 mm — concrete saw or angle grinder — perimeter cutting of repair boundaries before demolition hammer break-out",
    productType: "Segmented diamond saw blade — concrete cutting",
    filterTags: ["Diamond-blade", "Perimeter-cutting", "Concrete-removal"],
    techChips: [
      { label: "Segmented diamond — wet or dry", cls: "bg-sky-100 text-sky-800" },
      { label: "230–350 mm diameter", cls: "bg-slate-100 text-slate-700" },
      { label: "Perimeter saw-cutting before break-out", cls: "bg-amber-50 text-amber-700" },
      { label: "Hire or purchase — most tool hire centres", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "A segmented diamond saw blade mounted on an angle grinder, concrete saw, or cut-off saw is used to saw-cut the perimeter of the repair boundary before break-out. Perimeter saw-cutting defines the repair boundary, prevents undercutting the adjacent sound concrete, and produces a clean saw-cut face with a minimum 10 mm depth — AS 1627.0 and EN 1504-10 both reference perpendicular saw-cut faces as best practice for patch repair boundaries. Wet cutting is preferred to reduce silica dust — confirm dust suppression method with the site health and safety plan. Segmented diamond blades are available in a wide range of grades for hard and abrasive aggregate concrete — select the correct bond hardness for the specific concrete type. Available from tool hire centres, Hilti, Bosch, Milwaukee, and trade suppliers nationally.",
    technicalProperties: [
      "Segmented diamond blade — wet or dry cutting — 230–350 mm diameter",
      "Used for saw-cutting the repair boundary perimeter before demolition hammer break-out",
      "Produces a clean perpendicular saw-cut face — EN 1504-10 best practice",
      "Available from tool hire centres and trade suppliers nationally",
    ],
    limitations: [
      "Silica dust hazard — wet cutting or dust extraction required; confirm with the site WHS plan",
      "Select the correct diamond bond hardness for the concrete type — a blade too hard for soft aggregate will glaze and stop cutting",
      "Perimeter cutting should be done to a minimum depth of 10–12 mm — shallow cuts allow undercutting and edge spalling when the demo hammer operates at the boundary",
      "Cutting near or through rebar will damage the blade segment — scan for rebar location before cutting",
    ],
    procurementSources: [
      { name: "Hilti Australia — diamond blades and concrete saws", url: "https://www.hilti.com.au" },
      { name: "Bosch Professional — diamond blades", url: "https://www.boschtools.com.au" },
    ],
  },
  {
    fullLabel: "Bosch / Hilti / Milwaukee — Tool Hire or Purchase",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#be123c",
    name: "SDS-MAX Demolition Hammer",
    descriptionLine: "SDS-Max electric demolition hammer — point or flat chisel — breaking out spalled or delaminated concrete in reinforcement corrosion repair",
    productType: "SDS-Max electric demolition hammer — concrete break-out",
    filterTags: ["Demo-hammer", "Concrete-removal"],
    techChips: [
      { label: "SDS-Max demo hammer", cls: "bg-rose-100 text-rose-800" },
      { label: "5–15 kg class", cls: "bg-slate-100 text-slate-700" },
      { label: "Concrete break-out after saw-cutting", cls: "bg-amber-50 text-amber-700" },
      { label: "Tool hire — nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "SDS-Max electric demolition hammers (5–15 kg class) are used to break out spalled, delaminated, or carbonated concrete in the repair zone after perimeter saw-cutting. The SDS-Max chuck accepts demolition chisels (point, flat, and gouge types) for controlled concrete removal. The key discipline in concrete break-out is to work within the saw-cut perimeter and avoid undercutting the adjacent sound concrete — use a sharp flat chisel at the boundary rather than a pointed chisel, which can travel under the edge. Break-out depth should expose the rebar with minimum 25 mm clearance behind the bar to allow repair mortar to be placed and compacted. Light percussion tools are preferred over heavy pneumatic breakers for most remedial patch repair. Hilti TE-series, Bosch GSH-series, and Milwaukee SDS-Max hammers are all widely available through tool hire nationally.",
    technicalProperties: [
      "SDS-Max demolition hammer — 5–15 kg class — for patch repair break-out",
      "Used after saw-cutting to remove concrete within the repair perimeter",
      "Exposes rebar with minimum 25 mm clearance behind bar",
      "Available through tool hire nationally",
    ],
    limitations: [
      "Do not use heavy pneumatic breakers for small patch repair — vibration and impact can crack the adjacent sound concrete",
      "Work within the saw-cut perimeter — do not break through the perimeter boundary",
      "Confirm minimum concrete strength at the substrate before heavy break-out — weak surrounding concrete can delaminate under heavy hammer impact",
      "Protect rebar from impact damage during break-out — bent or nicked rebar must be assessed by the engineer before repair mortar is placed",
    ],
    procurementSources: [
      { name: "Hilti Australia — SDS-Max tools and hire", url: "https://www.hilti.com.au" },
      { name: "Bosch Professional — GSH-series SDS-Max", url: "https://www.boschtools.com.au" },
    ],
  },
  {
    fullLabel: "Needle Gun / Wire Cup — Hire or Purchase",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#0369a1",
    name: "Needle Gun / Wire Cup Wheel — Rebar Cleaning",
    descriptionLine: "Pneumatic needle gun or angle grinder wire cup wheel — for cleaning corroded rebar to St 2 standard in concrete repair zones",
    productType: "Pneumatic needle gun or wire cup wheel — rebar surface preparation",
    filterTags: ["Needle-gun", "Rebar-cleaning", "Surface-prep"],
    techChips: [
      { label: "Needle gun — pneumatic", cls: "bg-sky-100 text-sky-800" },
      { label: "Wire cup wheel — angle grinder", cls: "bg-slate-100 text-slate-700" },
      { label: "Rebar cleaning to St 2", cls: "bg-amber-50 text-amber-700" },
      { label: "Tool hire or purchase nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "After concrete break-out, corroded reinforcing steel must be cleaned to a minimum standard before rebar primer can be applied. In most remedial repair specifications, the minimum cleaning standard is St 2 (thorough hand tool or power tool cleaning) per AS 1627.4, which requires removal of loose rust, scale, and contamination — the steel should have a light metallic sheen after cleaning. The two primary tools are the pneumatic needle gun (for irregular surfaces and tight spaces around the bar) and the wire cup wheel on an angle grinder (for faster cleaning of straight bar lengths). Needle guns require a compressed air supply; wire cup wheels are electric. Both produce respirable dust and metallic particles — PPE (dust mask, goggles, gloves) is mandatory.",
    technicalProperties: [
      "Needle gun (pneumatic) — St 2 rebar cleaning in tight repair zones",
      "Wire cup wheel (angle grinder) — efficient cleaning of straight rebar lengths",
      "Minimum cleaning standard: St 2 per AS 1627.4",
      "Available through tool hire and hardware suppliers nationally",
    ],
    limitations: [
      "St 2 cleaning removes loose scale and rust but does not achieve the fully bright metal surface of Sa 2.5 abrasive blast cleaning — confirm the engineer's minimum standard",
      "Needle gun and wire cup create metallic dust and debris — protect adjacent surfaces and apply PPE (dust mask, safety glasses, gloves)",
      "Corroded rebar with >20% section loss must be assessed by the engineer before proceeding — cleaning alone does not reinstate structural capacity",
      "Wire cup wheel can damage the concrete surface adjacent to the rebar — use with care at the rebar–concrete interface",
    ],
    procurementSources: [
      { name: "Hilti Australia — surface prep tools and hire", url: "https://www.hilti.com.au" },
      { name: "Bosch Professional — wire cup wheels and angle grinders", url: "https://www.boschtools.com.au" },
    ],
  },
  {
    fullLabel: "Hilti / Bosch / Trade Supplier",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#15803d",
    name: "Diamond Cup Wheel — Substrate Preparation",
    descriptionLine: "Diamond cup wheel on angle grinder — concrete substrate preparation to CSP 2–3 or CSP 3–4 before repair mortar, bonding agent, or CFRP application",
    productType: "Diamond cup wheel — concrete surface preparation",
    filterTags: ["Cup-wheel", "Surface-prep"],
    techChips: [
      { label: "Diamond cup wheel — angle grinder", cls: "bg-green-100 text-green-900" },
      { label: "CSP 2–3 or CSP 3–4 surface profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Substrate prep before mortar or CFRP", cls: "bg-amber-50 text-amber-700" },
      { label: "Tool hire or purchase nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "A diamond cup wheel mounted on an angle grinder or floor grinder is used to prepare concrete surfaces to the concrete surface profile (CSP) required before repair mortar, bonding agent, or CFRP laminate application. Most polymer-modified repair mortars require a minimum CSP 3 substrate profile (medium roughness, visible aggregate), and CFRP external bonding requires CSP 3 minimum with a pull-off strength ≥ 1.5 MPa. Diamond cup wheels are available in single-row and double-row segment configurations — single-row for aggressive removal, double-row for a finer finish. Used on overhead soffits, columns, walls, and slab surfaces before mortar or CFRP application in reinforcement corrosion repair. The alternative for large flat areas is a floor grinding machine (planetary or rotary) — angle grinder cup wheels are used for smaller areas and restricted-access locations. Available through tool hire centres and Hilti, Bosch trade supply nationally.",
    technicalProperties: [
      "Diamond cup wheel — single or double row segments — on angle grinder",
      "Achieves CSP 2–3 or CSP 3–4 concrete surface profile",
      "Used before repair mortar, bonding agent, epoxy primer, and CFRP application",
      "Available through tool hire centres and trade suppliers nationally",
    ],
    limitations: [
      "Silica dust hazard — wet grinding or dust extraction hood attachment required; confirm with WHS plan",
      "Cup wheel on angle grinder covers smaller areas slowly — for large areas, use a floor grinding machine",
      "Pull-off testing after grinding is best practice before CFRP bonding — confirm pull-off strength ≥ 1.5 MPa or as specified by the engineer",
      "Do not grind over rebar — the diamond cup segments can be destroyed by metal contact",
    ],
    procurementSources: [
      { name: "Hilti Australia — diamond tools and surface prep equipment", url: "https://www.hilti.com.au" },
      { name: "Bosch Professional — diamond cup wheels and grinders", url: "https://www.boschtools.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Diamond-blade", label: "Diamond blade" },
  { id: "Demo-hammer", label: "Demo hammer" },
  { id: "Needle-gun", label: "Needle gun" },
  { id: "Cup-wheel", label: "Cup wheel" },
  { id: "Perimeter-cutting", label: "Perimeter cutting" },
  { id: "Concrete-removal", label: "Concrete removal" },
  { id: "Rebar-cleaning", label: "Rebar cleaning" },
  { id: "Surface-prep", label: "Surface prep" },
];

const SYSTEM_COMPARISON = [
  {
    tool: "Diamond Saw Blade",
    purpose: "Perimeter boundary saw-cut",
    prepStandard: "N/A — boundary definition",
    keyNote: "10–12 mm deep before break-out — prevents undercutting",
  },
  {
    tool: "SDS-Max Demo Hammer",
    purpose: "Concrete break-out",
    prepStandard: "Rebar exposed — 25 mm clearance",
    keyNote: "Work within saw-cut perimeter — light percussion preferred",
  },
  {
    tool: "Needle Gun / Wire Cup",
    purpose: "Rebar cleaning",
    prepStandard: "St 2 — AS 1627.4",
    keyNote: "Minimum before rebar primer application",
  },
  {
    tool: "Diamond Cup Wheel",
    purpose: "Concrete surface preparation",
    prepStandard: "CSP 3 — repair mortar; CSP 3 + pull-off ≥ 1.5 MPa for CFRP",
    keyNote: "Angle grinder for small areas — floor grinder for large areas",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Saw-cutting the repair boundary perimeter with a diamond blade before demolition hammer break-out to define the repair patch and prevent undercutting adjacent sound concrete",
    "Breaking out delaminated or spalled concrete with an SDS-Max demolition hammer after perimeter saw-cutting — exposing the corroded rebar for cleaning and treatment",
    "Cleaning corroded rebar to St 2 minimum with a needle gun or wire cup wheel before rebar primer application",
    "Preparing concrete substrate surfaces to CSP 3 with a diamond cup wheel before repair mortar, bonding agent, or CFRP laminate application",
    "Cleaning and de-carbonating concrete substrate adjacent to the repair zone — cup wheel grinding removes the laitance layer and exposes fresh aggregate",
    "Pull-off sample preparation — lightly grind the test area to remove surface contamination before applying the pull-off dolly adhesive",
  ],
  selectionCriteria: [
    "Always saw-cut the perimeter before using a demo hammer — saw-cutting first is best practice for all reinforcement corrosion and concrete spalling patch repair",
    "Use a needle gun for tight spaces around rebar where a wire cup wheel cannot reach — needle guns clean irregular surfaces better",
    "Use a wire cup wheel on an angle grinder for faster cleaning of long, straight rebar — more efficient than a needle gun on accessible bar",
    "Use a diamond cup wheel (not a disc grinder) for substrate surface preparation — cup wheels create the CSP texture required; grinding discs create a smoother, less keyed surface",
    "For large flat soffit areas, hire a ceiling grinder or planetary grinder rather than trying to prepare the surface with an angle grinder cup wheel — much more productive",
    "Confirm the required substrate preparation standard (CSP 3, pull-off strength) from the repair mortar or CFRP system TDS before starting surface preparation",
  ],
  limitations: [
    "Silica dust is a Class 1 carcinogen — dust suppression or extraction is mandatory; do not grind dry concrete without dust extraction and appropriate RPE",
    "Do not use a demolition hammer without perimeter saw-cutting first — uncontrolled break-out damages adjacent sound concrete and creates poor repair boundaries",
    "Tool cleaning standards (St 2, St 3) are minimum standards — if the engineer specifies Sa 2.5 (abrasive blast), grinding tools alone cannot achieve this — blasting equipment is required",
    "Needle guns and wire cups produce metallic debris that must be collected and removed from the repair zone before primer application — blowing with compressed air is acceptable",
    "Do not attempt to clean rebar to St 2 with a disc grinder — angle grinder discs are for cutting, not for rebar cleaning — wire cup wheel or needle gun must be used",
    "Tool hire equipment must be inspected before use — damaged blades, cups, or needle gun needles should be replaced before starting work",
  ],
  standardsNotes: [
    "AS 1627.4 — Metal finishing — preparation of surfaces — hand tool and power tool cleaning — defines St 2 and St 3 rebar cleaning standards",
    "SSPC-SP 2 / SP 3 — US Steel Structures Painting Council — hand and power tool cleaning standards referenced by some Australian engineers in lieu of AS 1627",
    "EN 1504-10 — Products and Systems for the Protection and Repair of Concrete — site application and quality control — references perimeter saw-cutting as best practice",
    "ICRI Technical Guideline 310.2 — CSP (Concrete Surface Profile) classification — referenced in repair mortar and CFRP TDS documents for minimum substrate roughness",
    "SafeWork Australia SDS — silica dust and metallic dust exposure limits — grinding and cutting concrete and steel creates hazardous dusts; confirm the exposure management plan with the safety officer",
  ],
  suitableDefects: [
    "Concrete spalling repair — perimeter saw-cutting, break-out, rebar cleaning, and substrate preparation are the sequential steps before repair mortar placement",
    "Reinforcement corrosion repair — same break-out and cleaning sequence as spalling repair, with the addition of rebar primer after cleaning",
    "CFRP strengthening preparation — substrate preparation to CSP 3 and pull-off testing are the critical steps before CFRP laminate bonding",
    "Delaminated concrete repair — break-out to remove the delaminated layer, then prepare the exposed substrate for repair mortar",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — the primary substrate for diamond blade perimeter cutting, demolition hammer break-out, and diamond cup wheel surface preparation",
    "Precast concrete — same tools and preparation standards as in-situ concrete",
    "Corroded deformed reinforcing bar (D500N, D500L) — the primary substrate for needle gun and wire cup wheel rebar cleaning",
    "Concrete soffit and vertical surface — the primary substrate for diamond cup wheel substrate preparation before repair mortar and CFRP applications",
  ],
};

export function AbrasivesToolsRCIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Abrasives, blades and tools for reinforcement corrosion and concrete repair preparation</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Surface preparation is the most critical stage in concrete repair and reinforcement corrosion treatment. The quality of the bond between the repair mortar (or CFRP laminate) and the existing substrate is determined almost entirely by the quality of surface preparation — inadequate preparation is the leading cause of repair failure. The core preparation sequence is: perimeter saw-cut, break-out, rebar cleaning, substrate profiling, and primer application.
        </p>
        {expanded && (
          <>
            <p>
              The four key tools in this sequence are: diamond saw blade (perimeter cutting), SDS-Max demolition hammer (break-out), needle gun or wire cup wheel (rebar cleaning to St 2), and diamond cup wheel (substrate profiling to CSP 3). Each step has a minimum standard that must be achieved before proceeding to the next step. Silica dust management is mandatory throughout — wet cutting, dust extraction, and appropriate RPE must be in place before any cutting, grinding, or demolition work starts.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function AbrasivesToolsRCProductSection() {
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

  const visibleProducts = activeFilters.size === 0
    ? PRODUCTS
    : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
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

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 tools — abrasives, blades, and prep tools for reinforcement corrosion repair — scroll to view all</p>
          </div>
        </div>

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

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
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
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>
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
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Abrasives, blades, and tools in the reinforcement corrosion repair preparation sequence — from saw-cutting through substrate profiling.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Tool</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Purpose</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Prep standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key note</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.tool} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.tool}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.purpose}</td>
                  <td className="px-4 py-3 text-slate-600">{row.prepStandard}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.keyNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
