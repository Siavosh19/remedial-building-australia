"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Lysaght"
  | "Stratco"
  | "Colorbond"
  | "Custom"
  | "Box-gutter";

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
    fullLabel: "Lysaght",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#0369a1",
    name: "Lysaght CUSTOM BOX Gutter (Colorbond/Zincalume)",
    descriptionLine: "Custom-width and depth box gutter fabricated from BlueScope Colorbond or Zincalume steel; site or shop-formed; full range of Colorbond colours; overflow outlets to AS/NZS 3500.3.",
    productType: "Custom-fabricated Colorbond/Zincalume box gutter — site or shop-formed",
    filterTags: ["Lysaght", "Colorbond", "Custom", "Box-gutter"],
    techChips: [
      { label: "Lysaght", cls: "bg-sky-100 text-sky-800" },
      { label: "Colorbond / Zincalume", cls: "bg-slate-100 text-slate-700" },
      { label: "Custom fabrication", cls: "bg-green-50 text-green-700" },
      { label: "Site or shop-formed", cls: "bg-slate-100 text-slate-700" },
      { label: "Overflow to AS/NZS 3500.3", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght CUSTOM BOX Gutter is fabricated from BlueScope Colorbond or Zincalume steel sheet to custom width and depth dimensions suited to the specific building and drainage requirements. Box gutters are not profiled (pre-formed) products — they are formed on site by roofing sheet metal workers or fabricated off-site in a sheet metal shop and delivered to site for installation. Lysaght supplies the Colorbond and Zincalume steel sheet from which box gutters are formed — the gutter geometry is determined by the project-specific design, not by a standard profile. Custom box gutters are used on Class 2 multi-unit residential buildings and commercial structures where roof geometry, parapet details, or drainage requirements make external eave gutters unsuitable. Design must include provision for overflow outlets per AS/NZS 3500.3, minimum fall of 1:200, and appropriate seam and lap joint detailing to ensure watertightness. Available in the full range of current Colorbond colours — Zincalume provides additional corrosion resistance for coastal environments. Confirm current Colorbond sheet availability and thickness options with Lysaght or your roofing contractor before specifying.",
    technicalProperties: [
      "Custom-fabricated from BlueScope Colorbond or Zincalume steel sheet — width and depth determined by project-specific drainage design",
      "Site-formed or shop-fabricated — roofing sheet metal workers form the gutter from flat sheet to the specified dimensions",
      "Full range of current Colorbond colours — Zincalume option for coastal and marine environments",
      "Overflow outlets required per AS/NZS 3500.3 — minimum fall 1:200 — outlet sizing determined by catchment area and rainfall intensity zone",
      "Suitable for Class 2 multi-unit residential and commercial structures where external eave gutters are not appropriate",
      "Seam and lap joint detailing must be designed for watertightness — sealed with compatible sealant and mechanically fixed",
      "Confirm sheet gauge (thickness) requirements with the roofing contractor based on gutter span and design loads",
    ],
    limitations: [
      "Not a profiled off-the-shelf product — box gutter dimensions must be designed by a qualified person and confirmed against AS/NZS 3500.3 before fabrication",
      "Minimum fall of 1:200 is required — significantly steeper than for profiled eave gutters — confirm whether the existing structure can accommodate this fall in a replacement scenario",
      "Overflow outlets are mandatory — sizing and location must be designed to prevent ponding water from entering the building in a blocked-outlet scenario",
      "Box gutter replacement must be assessed against whether relining is a preferable option to complete replacement — particularly where the structural box gutter form is sound but the lining has failed",
      "Seam and lap joint design is critical — poor seam detailing is a leading cause of box gutter failure — confirm detailing requirements with the fabricator",
      "Confirm current Colorbond sheet availability, gauge, and thickness options with Lysaght or your roofing contractor before specifying",
    ],
    procurementSources: [
      { name: "Lysaght — steel sheet supply", url: "https://www.lysaght.com" },
      { name: "BlueScope Steel — sheet supply", url: "https://www.bluescopesteel.com.au" },
      { name: "Roofmaster — trade supply", url: "https://www.roofmaster.com.au" },
      { name: "Steel Supplies — trade", url: "https://www.steelsupplies.com.au" },
    ],
  },
  {
    fullLabel: "Stratco",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#b45309",
    name: "Stratco Custom Box Gutter",
    descriptionLine: "Colorbond or Zincalume custom box gutter; site-formed from stock sheets; available in all Colorbond colours; matching downpipe and outlet fabrication services.",
    productType: "Custom-fabricated Colorbond/Zincalume box gutter — site-formed — Stratco supply",
    filterTags: ["Stratco", "Colorbond", "Custom", "Box-gutter"],
    techChips: [
      { label: "Stratco", cls: "bg-amber-100 text-amber-800" },
      { label: "Colorbond / Zincalume", cls: "bg-slate-100 text-slate-700" },
      { label: "Custom fabrication", cls: "bg-green-50 text-green-700" },
      { label: "All Colorbond colours", cls: "bg-slate-100 text-slate-700" },
      { label: "Downpipe and outlet supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stratco supplies Colorbond and Zincalume steel sheet for site-formed custom box gutters, with matching downpipe and outlet fabrication services available through Stratco trade centres. Box gutters fabricated from Stratco-supplied sheet are formed on site by the roofing contractor from stock Colorbond or Zincalume sheet to the project-specific dimensions. Stratco trade centres can supply matching downpipes, outlets, and fabricated components to co-ordinate with the site-formed gutter. Selection of Stratco as the sheet supplier is typically driven by the roofing contractor's existing supply relationship and the availability of matching fittings and downpipe components from the same supplier. All box gutter design must comply with AS/NZS 3500.3 — minimum fall 1:200, overflow outlet provision, and appropriate seam and lap joint detailing. Confirm current sheet availability, thickness options, and Colorbond colour range with your local Stratco trade centre before specifying.",
    technicalProperties: [
      "Colorbond and Zincalume steel sheet for site-formed custom box gutters — dimensions determined by project-specific drainage design",
      "Matching downpipe and outlet fabrication services available through Stratco trade centres — co-ordinated material supply",
      "All current Colorbond colours — practical for colour matching with existing Stratco roofing and fascia products",
      "Stock sheet available nationally through Stratco trade centre network — established contractor supply relationships",
      "Minimum fall 1:200 required — overflow outlets to AS/NZS 3500.3 — outlet sizing per catchment area and rainfall intensity zone",
      "Seam and lap joint detailing determined by the fabricating contractor — must be designed for watertightness",
      "Confirm sheet gauge (thickness) requirements with the roofing contractor based on gutter span and design loads",
    ],
    limitations: [
      "Not a profiled off-the-shelf product — box gutter dimensions must be designed by a qualified person and confirmed against AS/NZS 3500.3 before fabrication",
      "Minimum fall of 1:200 is required — confirm whether the existing structure can accommodate this fall in a replacement scenario",
      "Overflow outlets are mandatory — must be sized and located to prevent building ingress in a blocked-outlet scenario",
      "Box gutter replacement must be assessed against whether relining is preferable — particularly where the structural box is sound but the lining has failed",
      "Selection is typically driven by contractor supplier relationship — confirm material compatibility if mixing Stratco and non-Stratco components",
      "Confirm current Colorbond sheet availability, gauge, and colour range with your local Stratco trade centre before specifying",
    ],
    procurementSources: [
      { name: "Stratco — trade centres nationally", url: "https://www.stratco.com.au" },
      { name: "BlueScope Steel — sheet supply", url: "https://www.bluescopesteel.com.au" },
      { name: "Roofmaster — trade supply", url: "https://www.roofmaster.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Lysaght", label: "Lysaght" },
  { id: "Stratco", label: "Stratco" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Custom", label: "Custom" },
  { id: "Box-gutter", label: "Box gutter" },
];

const SYSTEM_COMPARISON: {
  brand: string;
  sheetMaterial: string;
  customSizing: string;
  overflowProvisions: string;
}[] = [
  {
    brand: "Lysaght",
    sheetMaterial: "BlueScope Colorbond / Zincalume steel sheet",
    customSizing: "Fully custom — width and depth to design — site or shop-formed",
    overflowProvisions: "Overflow outlets required per AS/NZS 3500.3 — designed and sized per catchment",
  },
  {
    brand: "Stratco",
    sheetMaterial: "Colorbond / Zincalume steel sheet — full colour range",
    customSizing: "Fully custom — site-formed — matching downpipe and outlet supply",
    overflowProvisions: "Overflow outlets required per AS/NZS 3500.3 — designed and sized per catchment",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Class 2 multi-unit residential buildings where box gutters are used between parallel roof pitches or behind parapets — replacement of failed or corroded box gutter sections",
    "Commercial and industrial buildings where large-span internal gutters are required for high catchment area drainage",
    "Buildings where external eave gutters are architecturally or structurally impractical — typically flat or low-pitch roof structures with parapet details",
    "Replacement of existing box gutters that have failed at seams, joints, or outlets — where full replacement is required rather than relining",
    "New box gutter installation as part of a broader roofing defect remediation scope on Class 2 strata buildings following defect inspection",
  ],
  selectionCriteria: [
    "Confirm minimum fall of 1:200 is achievable within the existing structure — steeper than profiled eave gutter requirements — fall correction may require structural work",
    "Confirm overflow outlet provision is included in the design — overflow outlet sizing per AS/NZS 3500.3 is mandatory for all box gutters",
    "Colorbond vs Zincalume selection — coastal and marine environments warrant Zincalume for superior corrosion resistance",
    "Sheet gauge (thickness) selection — determined by gutter span, design loads, and wind exposure — confirm with the roofing contractor or engineer",
    "Seam and lap joint design — standing seam, flat lock or soldered joints depending on exposure and fall — confirm with fabricator",
    "Lining vs replacement assessment — where the structural box gutter form is sound, lining with a compatible liquid membrane or GRP lining system may be more economical than full steel replacement",
    "Supplier relationship — selection of Lysaght or Stratco sheet is typically driven by the roofing contractor's existing supply arrangements",
  ],
  limitations: [
    "Box gutters are a higher-risk drainage element than external eave gutters — a blocked or undersized box gutter can cause significant internal water damage before overflow is detected",
    "Minimum fall requirement of 1:200 is often difficult to achieve in replacement works on existing buildings — assess fall achievability before committing to a steel replacement system",
    "Box gutter replacement must not be scoped without also addressing overflow outlet provision — a box gutter without an overflow outlet is a defect in itself",
    "Do not confuse box gutter replacement with box gutter relining — relining is a different scope item suitable where the structural form is intact but the lining has failed",
    "Seam and lap joint failure is the most common cause of box gutter leakage — confirm detailing requirements with the fabricator before specifying",
  ],
  standardsNotes: [
    "AS/NZS 3500.3 — Plumbing and Drainage — Stormwater Drainage — box gutter sizing, fall (minimum 1:200), outlet sizing, and overflow outlet requirements",
    "Australian Rainfall and Runoff (ARR) — used to determine design rainfall intensity for the building location — input to AS/NZS 3500.3 sizing",
    "NCC Volume One — BCA Performance Requirements for stormwater drainage on Class 2 buildings — box gutter design must comply with NCC requirements",
    "Lysaght and Stratco product guides — sheet gauge, forming, seam, and lap joint detailing for custom box gutter fabrication",
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

export function BoxGutterSystemsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are box gutter systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Box gutters are custom-fabricated from Colorbond or Zincalume steel to suit specific building dimensions and drainage requirements, typically on Class 2 multi-unit residential buildings and commercial structures. Unlike profiled gutters, box gutters are site-formed or fabricated off-site by roofing contractors and require careful design for overflow, falls and outlet sizing.
        </p>
        {expanded && (
          <>
            <p>
              Box gutters are an internal drainage element — they sit within the roof structure, typically between parallel roof pitches or behind parapets, rather than at the external eave. This location makes them a higher-risk drainage element than external eave gutters, because a blocked or failed box gutter can allow significant water ingress into the building before the problem is detected externally.
            </p>
            <p>
              Design requirements under AS/NZS 3500.3 include a minimum fall of 1:200 (steeper than the 1:500 for profiled eave gutters), mandatory overflow outlet provision, and outlet sizing based on catchment area and local rainfall intensity. Assessment of lining vs replacement is an important step in any box gutter remediation — where the structural box form is sound and the lining has failed, a proprietary GRP or liquid membrane lining system may be more economical than full steel replacement. Confirm with the engineer or building consultant before specifying a full replacement scope.
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

export function BoxGutterSystemsProductSection() {
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
              Applications, selection criteria, limitations, standards
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
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">2 products — Lysaght and Stratco — custom Colorbond and Zincalume box gutter systems</p>
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
              style={{ width: "calc(50% - 10px)", minWidth: "300px" }}
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
              Side-by-side comparison of custom box gutter supply options. Both Lysaght and Stratco supply Colorbond/Zincalume sheet for custom box gutter fabrication — selection is typically driven by roofing contractor supplier relationships.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sheet material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Custom sizing</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Overflow provisions</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sheetMaterial}</td>
                  <td className="px-4 py-3 text-slate-600">{row.customSizing}</td>
                  <td className="px-4 py-3 text-slate-600">{row.overflowProvisions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">Brand Equivalence Note</p>
          <p className="text-xs leading-6 text-slate-600">
            <strong>Lysaght ≈ Stratco</strong> — both supply Colorbond/Zincalume sheet for custom box gutter fabrication. Selection is typically driven by the roofing contractor&apos;s existing supplier relationship and the availability of matching downpipe and outlet components. Box gutter design and fabrication quality is far more critical than supplier selection — confirm seam detailing, fall, and overflow outlet provision with the fabricating contractor before proceeding.
          </p>
        </div>
      </div>
    </>
  );
}
