"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Top-hat" | "Z-section" | "Aluminium" | "6063-T5" | "6063-T6"
  | "Drained-cavity" | "Thermal-break" | "Engineer-required" | "Concealed-fix"
  | "Coastal" | "Continuous-rail" | "Intermediate-rail" | "Anodised";

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
    fullLabel: "Capral 65 mm Top-Hat Rail — 6063-T5",
    brandUrl: "https://www.capral.com.au/",
    tdsUrl: "https://www.capral.com.au/products/architectural/",
    accentColor: "#e2003a",
    name: "Capral 65 mm Top-Hat",
    descriptionLine: "Standard 65 mm 6063-T5 aluminium top-hat — engineered cladding subframe.",
    productType: "Aluminium Top-Hat Rail",
    filterTags: ["Top-hat", "Aluminium", "6063-T5", "Drained-cavity", "Coastal", "Continuous-rail", "Anodised"],
    techChips: [
      { label: "6063-T5 Alloy", cls: "bg-blue-100 text-blue-800" },
      { label: "65 mm Crown", cls: "bg-purple-100 text-purple-800" },
      { label: "Coastal Zone Safe", cls: "bg-sky-100 text-sky-800" },
      { label: "Drained Cavity System", cls: "bg-green-100 text-green-800" },
      { label: "Anodised Finish", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Capral 65 mm aluminium top-hat section in 6063-T5 alloy is the standard workhorse subframe profile for FC sheet, FC panel, solid aluminium, and HPL cladding systems in Australia. Installed horizontally or vertically on helping-hand brackets at 600 mm centres, the top-hat creates a drained and ventilated cavity between the cladding panel and the primary wall. The 65 mm crown accommodates standard FC screw fixings and allows the cladding panel to bridge the cavity without deflection. Anodised or mill finish; cut on site with standard aluminium-rated saw blades.",
    technicalProperties: [
      "Alloy: 6063-T5 aluminium",
      "Crown width: 65 mm",
      "Flange: 35 mm each side",
      "Section height: 40 mm standard",
      "Wall thickness: 1.5 mm or 2.0 mm",
      "Standard lengths: 6.0 m",
      "Finish: mill, anodised, or powder-coat",
      "Weight: ~1.1 kg/lm",
    ],
    limitations: [
      "Engineer must specify bracket spacing and rail gauge for wind loads",
      "Not suitable for direct brick/masonry fixing without helping-hand brackets",
      "Thermal bridge if rail contacts primary structure without neoprene pad",
      "Cutting on site generates fine swarf — respiratory protection required",
      "Mill finish will weather to white oxide in coastal zones — anodise preferred",
    ],
    procurementSources: [
      { name: "Capral Aluminium", url: "https://www.capral.com.au/" },
      { name: "Ullrich Aluminium", url: "https://www.ullrich.com.au/" },
    ],
  },
  {
    fullLabel: "Ultraframe Z-Section Aluminium Rail — 6063-T6",
    brandUrl: "https://www.ultraframe-aluminium.com.au/",
    tdsUrl: "https://www.ultraframe-aluminium.com.au/products/",
    accentColor: "#0369a1",
    name: "Z-Section Rail 6063-T6",
    descriptionLine: "Z-profile aluminium subframe — higher yield strength for wide-span applications.",
    productType: "Aluminium Z-Section Rail",
    filterTags: ["Z-section", "Aluminium", "6063-T6", "Drained-cavity", "Coastal", "Concealed-fix", "Engineer-required"],
    techChips: [
      { label: "6063-T6 Alloy — Higher Strength", cls: "bg-blue-100 text-blue-800" },
      { label: "Z-Profile", cls: "bg-purple-100 text-purple-800" },
      { label: "Concealed Fix Compatible", cls: "bg-green-100 text-green-800" },
      { label: "Coastal Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "Engineer Required", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Z-section aluminium rail in 6063-T6 provides a higher yield strength (160 MPa) than standard T5 extrusions, enabling wider bracket spacing and longer unsupported spans. The Z-profile configuration allows the cladding panel to interlock with the rail using a concealed clip or secret-fix arrangement — eliminating exposed screw heads on the cladding face. Particularly suitable for terracotta slip-fit systems, concealed-fix FC panels, and aluminium cassette cladding where a clean panel face is required. Engineer certification typically required for structural adequacy on buildings Class 2+ over 25 m.",
    technicalProperties: [
      "Alloy: 6063-T6 aluminium",
      "Yield strength: 160 MPa (vs 130 MPa T5)",
      "Section heights: 50, 65, 80 mm",
      "Wall thickness: 2.0 mm or 2.5 mm",
      "Standard lengths: 6.0 m",
      "Concealed-fix geometry",
      "Anodised or powder-coat finish",
      "Weight: ~1.3–1.8 kg/lm",
    ],
    limitations: [
      "Higher cost than standard top-hat for simple FC sheet applications",
      "Engineer certification required for wind load compliance",
      "Z-profile requires more precise installation — installer training advised",
      "Limited standard stock — may require extrusion on order",
      "Not interchangeable with standard top-hat without re-engineering bracket layout",
    ],
    procurementSources: [
      { name: "Ultraframe Aluminium", url: "https://www.ultraframe-aluminium.com.au/" },
      { name: "Capral Aluminium", url: "https://www.capral.com.au/" },
    ],
  },
  {
    fullLabel: "Ametalin ThermoBLOCK Rail with Thermal Break",
    brandUrl: "https://www.ametalin.com/",
    tdsUrl: "https://www.ametalin.com/products/",
    accentColor: "#7c3aed",
    name: "ThermoBLOCK Thermal-Break Rail",
    descriptionLine: "Aluminium rail with integrated EPDM thermal break — condensation control.",
    productType: "Thermal-Break Rail System",
    filterTags: ["Top-hat", "Aluminium", "Thermal-break", "Drained-cavity", "Coastal", "Continuous-rail", "Engineer-required"],
    techChips: [
      { label: "Integrated EPDM Thermal Break", cls: "bg-green-100 text-green-800" },
      { label: "Condensation Control", cls: "bg-blue-100 text-blue-800" },
      { label: "Aluminium 6063-T5", cls: "bg-purple-100 text-purple-800" },
      { label: "Coastal Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "NCC 2022 Section J", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "The Ametalin ThermoBLOCK system incorporates an extruded EPDM thermal break within the rail profile, interrupting the conductive aluminium path between the cladding and the primary structure. In NCC 2022 Section J compliance assessments, unbroken aluminium rails create significant thermal bridges that reduce the effective R-value of the wall system by 30–50%. ThermoBLOCK rails maintain the structural performance of 6063-T5 aluminium while satisfying thermal performance requirements for Class 2–9 buildings — critical for NatHERS and NABERS-rated projects.",
    technicalProperties: [
      "Alloy: 6063-T5 aluminium with EPDM break",
      "Thermal conductivity interrupted at rail-to-bracket interface",
      "Crown widths: 65 mm and 100 mm",
      "EPDM durometer: 70 Shore A",
      "NCC 2022 Section J compliant configuration",
      "Temperature range: −40°C to +120°C EPDM",
      "Standard lengths: 6.0 m",
      "Structural capacity: engineer to confirm per bracket spacing",
    ],
    limitations: [
      "Higher cost: approximately 2× standard top-hat",
      "EPDM component adds installation complexity — must be aligned during fixing",
      "Thermal break effectiveness reduces at high bracket density",
      "Engineer required to confirm structural capacity with thermal break",
      "Less common — not available from all aluminium distributors",
    ],
    procurementSources: [
      { name: "Ametalin", url: "https://www.ametalin.com/" },
      { name: "Ametalin Products", url: "https://www.ametalin.com/products/" },
    ],
  },
  {
    fullLabel: "Ullrich 100 mm Heavy-Duty Top-Hat — 6063-T6",
    brandUrl: "https://www.ullrich.com.au/",
    tdsUrl: "https://www.ullrich.com.au/products/",
    accentColor: "#b45309",
    name: "Ullrich 100 mm Heavy-Duty",
    descriptionLine: "100 mm wide 6063-T6 top-hat for high-load or large-panel cladding systems.",
    productType: "Heavy-Duty Top-Hat Rail",
    filterTags: ["Top-hat", "Aluminium", "6063-T6", "Drained-cavity", "Coastal", "Continuous-rail", "Anodised", "Engineer-required"],
    techChips: [
      { label: "100 mm Crown — Wide Bearing", cls: "bg-blue-100 text-blue-800" },
      { label: "6063-T6 High Strength", cls: "bg-purple-100 text-purple-800" },
      { label: "Heavy Panel Rated", cls: "bg-green-100 text-green-800" },
      { label: "Coastal Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "Engineer Required", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Ullrich 100 mm heavy-duty top-hat in 6063-T6 alloy provides a wider bearing surface for large-format cladding panels including terracotta laths, sintered stone slabs, and 1,200+ mm FC panels. The 100 mm crown reduces point load concentration at the panel-to-rail contact, extending panel service life and reducing risk of cracking at fixing points. At 2.5 mm wall thickness in T6 alloy, the rail can span up to 900 mm between brackets without exceeding deflection limits — allowing reduced bracket density on concrete or masonry primary structures.",
    technicalProperties: [
      "Alloy: 6063-T6 aluminium",
      "Crown width: 100 mm",
      "Section height: 50 mm",
      "Wall thickness: 2.5 mm",
      "Max span between brackets: 900 mm (engineer to confirm)",
      "Standard lengths: 6.0 m",
      "Finish: mill or anodised",
      "Weight: ~1.9 kg/lm",
    ],
    limitations: [
      "Higher weight and cost than 65 mm standard rail",
      "100 mm crown may conflict with narrow panel joints — check module dimensions",
      "Engineer certification required for all applications",
      "Specialist order — less commonly stocked at trade distributors",
      "Anodised finish must be factory-applied — field anodising not practical",
    ],
    procurementSources: [
      { name: "Ullrich Aluminium", url: "https://www.ullrich.com.au/" },
      { name: "Capral Aluminium", url: "https://www.capral.com.au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Top-hat", label: "Top-hat Profile" },
  { id: "Z-section", label: "Z-section Profile" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "6063-T5", label: "6063-T5" },
  { id: "6063-T6", label: "6063-T6" },
  { id: "Drained-cavity", label: "Drained Cavity" },
  { id: "Thermal-break", label: "Thermal Break" },
  { id: "Engineer-required", label: "Engineer Required" },
  { id: "Concealed-fix", label: "Concealed Fix" },
  { id: "Coastal", label: "Coastal Rated" },
  { id: "Continuous-rail", label: "Continuous Rail" },
  { id: "Anodised", label: "Anodised" },
];

const SYSTEM_COMPARISON: {
  product: string;
  profile: string;
  alloy: string;
  crownWidth: string;
  thermalBreak: string;
  coastal: string;
  primaryUse: string;
}[] = [
  {
    product: "Capral 65 mm Top-Hat",
    profile: "Top-hat",
    alloy: "6063-T5",
    crownWidth: "65 mm",
    thermalBreak: "No",
    coastal: "Yes (anodised)",
    primaryUse: "FC sheet / panel",
  },
  {
    product: "Z-Section 6063-T6",
    profile: "Z-section",
    alloy: "6063-T6",
    crownWidth: "50–80 mm",
    thermalBreak: "No",
    coastal: "Yes",
    primaryUse: "Concealed-fix panels",
  },
  {
    product: "ThermoBLOCK Rail",
    profile: "Top-hat",
    alloy: "6063-T5 + EPDM",
    crownWidth: "65–100 mm",
    thermalBreak: "Yes",
    coastal: "Yes",
    primaryUse: "Section J compliance",
  },
  {
    product: "Ullrich 100 mm Heavy-Duty",
    profile: "Top-hat",
    alloy: "6063-T6",
    crownWidth: "100 mm",
    thermalBreak: "No",
    coastal: "Yes (anodised)",
    primaryUse: "Heavy/large panels",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "FC sheet and FC panel cladding subframe — direct-fix to top-hat",
    "Solid aluminium sheet and cassette cladding subframe",
    "HPL and vitreous enamel panel backing rail",
    "Terracotta and ceramic slip-fit rail system substrate",
    "Overcladding remediation — creating cavity over existing facade",
    "New construction rainscreen facade framing",
  ],
  selectionCriteria: [
    "65 mm top-hat: standard FC sheet and panel systems — most common",
    "Z-section: concealed-fix panels requiring interlock profile",
    "Thermal-break rail: NCC 2022 Section J compliance required",
    "100 mm heavy-duty: large-format or heavy panels — terracotta, sintered stone",
    "T6 alloy: wider bracket spacing or higher wind load zones",
    "Anodised finish: coastal zones within 1 km of marine water",
  ],
  limitations: [
    "All rails require structural engineer certification for wind load compliance",
    "Bracket spacing must be engineered — do not rely on rule-of-thumb",
    "Aluminium rails are a thermal bridge without thermal-break accessories",
    "Cutting on site requires aluminium-rated blades and respiratory protection",
    "Rail to primary structure connections must be stainless or hot-dip galvanised",
    "Minimum 25 mm clearance behind cladding panel to top of rail flange",
  ],
  standardsNotes: [
    "AS/NZS 1170.2: wind actions — basis for structural rail sizing",
    "AS 1170.1: dead loads — rail must carry cladding panel self-weight",
    "NCC 2022 Section J: thermal performance — thermal break rail required for compliance",
    "AS/NZS 1664: aluminium structures — design of aluminium members",
    "AS 3566: self-drilling screws — thread form for FC-to-aluminium fixing",
    "AS 4284: testing of building facades — serviceability under load",
  ],
  suitableDefects: [
    "ACP remediation — installing non-combustible cladding on new subframe",
    "Spalling concrete facades — overcladding with FC or terracotta system",
    "Failed FC cladding with degraded timber battens — replace with aluminium rail",
    "Water ingress through direct-fixed cladding — installing drained cavity system",
    "Facades failing Section J thermal compliance — adding thermal-break subframe",
    "New high-rise construction requiring fully engineered cladding subframe",
  ],
  typicalSubstrates: [
    "Concrete columns and beams — helping-hand bracket anchor points",
    "Masonry blockwork — chemical or mechanical anchor to rail bracket",
    "Steel primary structure — direct bolt or welded bracket connection",
    "Steel stud framing — screw-fixed bracket to stud at required spacing",
    "Existing timber batten system — remove and replace with aluminium rail",
    "Existing FC cladding — bracket penetration through old skin to structure",
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

export function TopHatIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are top-hat aluminium subframe rail systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Aluminium top-hat and Z-section rails form the primary subframe that carries all rainscreen cladding systems in Australian facade remediation. Correctly specified and engineered, the rail system creates a drained and ventilated cavity, transfers cladding panel wind loads to the primary structure, and — with thermal break accessories — satisfies NCC 2022 Section J thermal performance requirements.
        </p>
        {expanded && (
          <>
            <p>
              The subframe rail is one of the most engineering-critical components of a cladding remediation — yet is frequently under-specified. Bracket spacing, rail gauge, alloy temper, and connection details to the primary structure must all be confirmed by a structural engineer. Wind uplift on high-rise facades can impose very high point loads on rail-to-bracket connections, and a failure at this interface is catastrophic.
            </p>
            <p>
              In coastal zones (within 1 km of marine water), aluminium rails must be anodised or otherwise treated to resist chloride-induced pitting corrosion. All fasteners connecting rail to bracket — and bracket to structure — must be stainless steel 316 or hot-dip galvanised to prevent galvanic corrosion between dissimilar metals.
            </p>
            <p>
              Thermal bridging through aluminium subframes is a compliance issue under NCC 2022 Section J. Where continuous aluminium rail contacts the primary concrete or masonry structure, a neoprene or EPDM thermal break pad must be installed under each bracket foot, or a thermal-break rail profile used. The design must be modelled to confirm the effective R-value of the wall system meets the prescriptive or JV3 pathway requirements.
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

export function TopHatProductSection() {
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
              Applications, selection criteria, limitations, standards, suitable substrates
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — top-hat aluminium subframe rail systems — scroll to view all</p>
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
              Side-by-side comparison of aluminium subframe rail systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Alloy</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Crown width</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thermal break</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.alloy}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.crownWidth}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thermalBreak}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
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
