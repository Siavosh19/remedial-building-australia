"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Aluminium"
  | "Mill-finish"
  | "Powder-coated"
  | "Profiled-tray"
  | "AS-3700"
  | "Cavity-flashing"
  | "Weep-holes"
  | "Inland"
  | "Non-coastal"
  | "Folded";

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
    fullLabel: "Various / fabricated",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#b45309",
    name: "Mill-finish aluminium cavity flashing",
    descriptionLine: "Plain aluminium sheet (0.7–0.9 mm) folded to profile — AS 3700 — inland and low-exposure zones only — not suitable for coastal or marine environments",
    productType: "Plain aluminium cavity flashing — AS 3700 — inland exposure only",
    filterTags: ["Aluminium", "Mill-finish", "AS-3700", "Cavity-flashing", "Weep-holes", "Inland", "Non-coastal", "Folded"],
    techChips: [
      { label: "Mill finish", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3700", cls: "bg-amber-100 text-amber-800" },
      { label: "Inland only", cls: "bg-red-100 text-red-700" },
      { label: "0.7–0.9 mm", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Plain aluminium sheet (0.7–0.9 mm) folded to profile. Standard remedy for corroded cavity tray replacement at lintels, sills, and DPC locations in inland and low-exposure zones. Compatible with most cement mortars when separated by bitumen or PE tape. Aluminium is anodic to steel in wet conditions — direct contact with steel lintels causes accelerated aluminium corrosion and must be prevented with bitumen tape or PE foam strip. Fresh lime or Portland cement mortar is highly alkaline and will attack aluminium — isolate the underside before bedding. Joints soldered or lapped and sealed with compatible neutral-cure silicone (not acetoxy — acetic acid attacks aluminium). End dams required at each end to prevent water discharging into the inner leaf.",
    technicalProperties: [
      "Low material cost; widely available from flashings suppliers nationally",
      "Easily site-formed to complex profiles with a hand folder — no specialist tooling required",
      "Lightweight — minimal additional load on masonry structure",
      "Joints can be soldered or lapped and sealed with compatible neutral-cure silicone",
      "Standard 0.7 mm thickness for spans to ~1.2 m; 0.9 mm for spans to ~1.5 m",
      "AS 3700 Section 5 compliant when correctly installed with 25 mm upstand and weep holes at 600 mm",
    ],
    limitations: [
      "NOT suitable for coastal or marine environments — galvanic corrosion risk against steel lintels in C3–C5 zones",
      "Bare aluminium reacts with fresh concrete and high-lime mortars — must isolate with bitumen tape or PE strip",
      "No colour tolerance — silver finish visible if exposed at weep zone in prominent locations",
      "Requires careful handling — thin sheet kinks easily on site; kinks cannot be straightened without weakening the material",
    ],
    procurementSources: [
      { name: "Capral Aluminium — national distributor network", url: "https://www.capral.com.au" },
      { name: "Metalcraft Group — national", url: "https://www.metalcraft.com.au" },
      { name: "Local flashings fabricators — all states (measure and fabricate to order)", url: "" },
      { name: "Roofing and flashings trade suppliers — Stramit, Bluescope distribution", url: "https://www.stramit.com.au" },
    ],
  },
  {
    fullLabel: "Capral / Metalcraft / fabricated",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#0369a1",
    name: "Powder-coated aluminium cavity flashing",
    descriptionLine: "0.9 mm aluminium with factory powder-coat finish — colour-matched to mortar joints — AS 3700 — inland and low-exposure zones — aesthetics-driven selection",
    productType: "Powder-coated aluminium cavity flashing — AS 3700 — inland exposure only",
    filterTags: ["Aluminium", "Powder-coated", "AS-3700", "Cavity-flashing", "Weep-holes", "Inland", "Folded"],
    techChips: [
      { label: "Powder coated", cls: "bg-sky-100 text-sky-800" },
      { label: "Colour matched", cls: "bg-green-100 text-green-700" },
      { label: "0.9 mm base", cls: "bg-slate-100 text-slate-700" },
      { label: "Inland only", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "0.9 mm aluminium with factory powder-coat finish, typically grey or off-white. Used where the exposed weep zone is visible from street level and aesthetics matter. Colour-matched to mortar joints reduces visual impact of the weep channel. Same exposure limitation as mill-finish applies — aluminium is not suitable for coastal or marine zones regardless of coating. The powder coat protects against weathering in inland environments but does not change the galvanic behaviour of the base aluminium against steel lintels. All galvanic and mortar isolation requirements are identical to mill-finish aluminium. Cut edges on site must be touched up with compatible zinc-free touch-up paint — cut edges expose bare aluminium to potential corrosion.",
    technicalProperties: [
      "Powder coat hides silver flashing at weep zone — improved street-level appearance on exposed facades",
      "Factory finish more durable and uniform than site-applied paint",
      "0.9 mm base sheet offers slightly higher stiffness than 0.7 mm mill-finish — reduces installation kinking",
      "Available in standard range of Colorbond-compatible colours from major fabricators",
      "Laps and joints with compatible neutral-cure silicone — same installation method as mill-finish",
      "AS 3700 compliant when installed with minimum 25 mm upstand and weep holes at 600 mm centres",
    ],
    limitations: [
      "Aluminium exposure zone limitation applies — NOT for coastal, marine, or C3–C5 industrial zones regardless of powder coat",
      "Galvanic and lime mortar isolation requirements identical to mill-finish — coating does not change galvanic behaviour",
      "Higher cost than mill-finish; cutting damages powder coat at ends — touch-up with zinc-free paint mandatory on all site-cut edges",
      "Colour range from fabricators is limited — match against existing weathered mortar; confirm colour before ordering full job quantities",
    ],
    procurementSources: [
      { name: "Capral Aluminium — powder coat service through distribution network", url: "https://www.capral.com.au" },
      { name: "Metalcraft Group — colour-range powder coat flashings", url: "https://www.metalcraft.com.au" },
      { name: "Local flashing fabricators — order with colour specification", url: "" },
      { name: "Stramit Building Products — pre-finished flashings", url: "https://www.stramit.com.au" },
    ],
  },
  {
    fullLabel: "Keystone / Extrude-a-Trim / fabricated",
    brandUrl: "https://www.keystonelintels.com.au",
    accentColor: "#7c3aed",
    name: "Profiled aluminium cavity tray with integral weep slots",
    descriptionLine: "Extruded or roll-formed aluminium tray with factory-pressed weep slots — eliminates site-drilled weep holes — AS 3700 — inland only — higher-volume projects",
    productType: "Profiled aluminium cavity tray — AS 3700 — inland / benign exposure only",
    filterTags: ["Aluminium", "Profiled-tray", "AS-3700", "Cavity-flashing", "Weep-holes", "Inland", "Non-coastal"],
    techChips: [
      { label: "Profiled tray", cls: "bg-purple-100 text-purple-800" },
      { label: "Factory weep slots", cls: "bg-green-100 text-green-700" },
      { label: "Rigid tray", cls: "bg-slate-100 text-slate-700" },
      { label: "Inland only", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Extruded or roll-formed aluminium tray with pressed weep slots factory-formed at 450–600 mm centres. Eliminates need for site-drilled weep holes in mortar courses. Profiled upstand locates against the inner leaf to provide positive registration without mortar displacement. Used on higher-volume projects or where drilling weep holes in mortar course is impractical due to dense mortar or tight programme. Tray width must match the cavity dimension exactly — measure before ordering. NOT for coastal or marine exposure. Same galvanic and mortar isolation requirements apply as for all aluminium flashings. Factory weep slot free area must be ≥ 75 mm² per slot to comply with AS 3700 weep hole requirements.",
    technicalProperties: [
      "Factory-formed weep slots — no site drilling; consistent spacing over the full opening length",
      "Profiled upstand provides positive register against inner leaf — reduces misalignment during outer leaf construction",
      "Rigid extruded tray resists sagging across the opening during mortar bedding operations",
      "Reduces site skill requirement for weep hole formation — installer does not drill through mortar course",
      "Weep slot spacing per manufacturer: confirm ≥ 75 mm² free area per slot to comply with AS 3700 clause 5.4",
      "Available in 3 m or 6 m lengths — cut to length with snips or angle grinder (protect base metal at cuts)",
    ],
    limitations: [
      "Aluminium exposure zone limitation applies — inland only; NOT suitable for coastal or C3–C5 marine/industrial zones",
      "Tray width must match cavity dimension exactly — measure before ordering; non-adjustable after manufacture",
      "Extruded sections only available in fixed profiles — complex returns at reveals require site-fabricated flat sheet sections",
      "Higher cost than flat sheet options; minimum order quantities may apply — confirm with supplier",
    ],
    procurementSources: [
      { name: "Keystone Lintels — cavity tray range", url: "https://www.keystonelintels.com.au" },
      { name: "Extrude-a-Trim — extrusion cavity tray systems", url: "" },
      { name: "Local aluminium extruders — specify tray width and weep slot spacing", url: "" },
      { name: "Capral Aluminium distribution — profiled extrusion products", url: "https://www.capral.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Aluminium", label: "Aluminium" },
  { id: "Mill-finish", label: "Mill finish" },
  { id: "Powder-coated", label: "Powder coated" },
  { id: "Profiled-tray", label: "Profiled tray" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Cavity-flashing", label: "Cavity flashing" },
  { id: "Weep-holes", label: "Weep holes" },
  { id: "Inland", label: "Inland" },
  { id: "Non-coastal", label: "Non-coastal" },
  { id: "Folded", label: "Folded sheet" },
];

const SYSTEM_COMPARISON: {
  product: string;
  finish: string;
  thickness: string;
  coastal: string;
  weepMethod: string;
  relCost: string;
  primaryUse: string;
}[] = [
  {
    product: "Mill-finish aluminium",
    finish: "Natural silver",
    thickness: "0.7–0.9 mm",
    coastal: "No",
    weepMethod: "Site drilled",
    relCost: "$",
    primaryUse: "Inland — cost-driven remediation",
  },
  {
    product: "Powder-coated aluminium",
    finish: "Colour matched",
    thickness: "0.9 mm",
    coastal: "No",
    weepMethod: "Site drilled",
    relCost: "$$",
    primaryUse: "Inland — visible weep zone / aesthetics",
  },
  {
    product: "Profiled aluminium tray",
    finish: "Mill or powder coat",
    thickness: "1.2 mm wall (extrusion)",
    coastal: "No",
    weepMethod: "Factory slots",
    relCost: "$$$",
    primaryUse: "Inland — high volume / consistent weep spacing",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded or failed cavity tray flashings at lintels, sills, and DPC locations in inland masonry buildings",
    "Class 2 strata buildings in A1/A2 exposure classifications (inland, non-coastal)",
    "Cost-driven remediation projects where coastal exposure is confirmed not a factor",
    "Residential and low-rise buildings where lead or Alcore composite is not warranted",
  ],
  selectionCriteria: [
    "Confirm exposure classification per AS/NZS 2312.2 — aluminium is only suitable for A1/A2 (inland/benign) exposure zones",
    "Confirm galvanic isolation from steel lintels is achievable with bitumen tape or PE foam strip before specifying",
    "Confirm mortar type — alkaline lime or Portland cement mortars require bitumen tape isolation on flashing underside",
    "Use powder-coated product where weep zone is visible from street level and aesthetics are a client requirement",
    "Use profiled tray where consistent factory weep hole spacing is required or site drilling is impractical",
    "Do not specify aluminium within 1 km of breaking surf — use lead (Code 4 minimum) or Alcore composite instead",
  ],
  limitations: [
    "NOT suitable for coastal, marine, or C3–C5 industrial exposure zones — galvanic corrosion with steel lintels is a certainty in wet salt-laden conditions",
    "Must be isolated from steel lintels AND from alkaline lime/cement mortars with bitumen tape or PE foam strip",
    "Site-cut edges on powder-coated product must be touched up with zinc-free paint — bare aluminium at cut edges will corrode in service",
    "Do not use profiled tray where the tray width doesn't match the cavity exactly — gaps allow mortar bridging behind the tray",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — Section 5: cavity flashings, upstand, weep holes",
    "AS 3700 clause 5.6 — minimum 25 mm upstand at inner leaf required for all cavity flashings",
    "AS 3700 clause 5.4 — weep holes at maximum 600 mm centres; minimum 75 mm² free area per weep",
    "AS/NZS 2312.2 — Guide to the protection of structural steel against atmospheric corrosion — exposure zone classification",
    "NATSPEC worksection 04 10 00 — Masonry: flashing and weep hole requirements",
  ],
  suitableDefects: [
    "Corroded, failed, or absent cavity tray flashings in inland masonry buildings causing water ingress",
    "Water ingress at lintel and sill locations in strata buildings in non-coastal locations",
    "Weep hole blockage from mortar bridging — clearing and reinstatement of drainage pathway",
    "Remediation of post-construction omission of cavity flashings at lintels or sills",
  ],
  typicalSubstrates: [
    "Masonry bearing course at lintel or sill — clean and mortar-free before flashing installation",
    "Concrete lintel bearing surface — isolate flashing from concrete with bitumen tape",
    "Masonry DPC locations — standard mortar bed for flashing seating; isolate from fresh mortar",
    "NOT suitable: any masonry within 1 km of breaking surf or in C3–C5 industrial exposure zones",
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
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
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

export function CavityFlashAlumIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are aluminium cavity flashings?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Aluminium cavity flashings are formed aluminium sheet (typically 0.7–0.9 mm) installed at lintels, sills, and DPC locations within masonry cavity walls to intercept water that penetrates the outer leaf and redirect it to weep holes. AS 3700 requires flashings at every lintel, sill, and DPC location — their absence or failure is a primary cause of water ingress in Class 2 strata buildings.
        </p>
        {expanded && (
          <>
            <p>
              Aluminium cavity flashings are the most cost-effective flashing material for inland and benign exposure locations. The critical limitation is galvanic corrosion — aluminium is anodic to steel in an electrolyte, so direct contact with steel lintels in wet conditions causes accelerated corrosion of the aluminium. This is managed by installing a bitumen tape or PE foam strip between the aluminium flashing and any steel bearing surface.
            </p>
            <p>
              Aluminium is also attacked by the high pH of fresh Portland cement and lime mortars — the same bitumen tape isolation that protects from galvanic corrosion also protects from alkaline attack. Aluminium flashings must NEVER be specified for coastal, marine, or C3–C5 industrial exposure zones — use lead (Code 4 minimum) or Alcore bitumen composite for these locations.
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

export function CavityFlashAlumProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
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
      {/* ── System Technical Reference ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
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
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — aluminium cavity flashings — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
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
            <button onClick={() => scroll("left")} aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of aluminium cavity flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weep method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Rel. cost</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.weepMethod}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.relCost}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
