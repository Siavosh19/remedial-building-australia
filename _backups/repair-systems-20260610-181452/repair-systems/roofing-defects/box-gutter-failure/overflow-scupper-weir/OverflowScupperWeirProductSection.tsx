"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Stainless"
  | "Scupper"
  | "Wall-mounted"
  | "Weir"
  | "Aluminium"
  | "Overflow-outlet"
  | "NCC-compliant"
  | "Blucher"
  | "Geberit"
  | "Alproc"
  | "Pre-fabricated";

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
    fullLabel: "Blucher (ACO Group)",
    brandUrl: "https://www.blucher.com.au",
    accentColor: "#0369a1",
    name: "Blucher Stainless Overflow Scupper",
    descriptionLine: "Stainless steel wall-mounted overflow scupper for box gutter overflow compliance. Adjustable height. NCC-compliant.",
    productType: "Stainless steel overflow scupper — wall-mounted — NCC-compliant — adjustable height",
    filterTags: ["Stainless", "Scupper", "Wall-mounted", "NCC-compliant", "Blucher"],
    techChips: [
      { label: "Stainless steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Wall-mounted scupper", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC-compliant", cls: "bg-green-50 text-green-700" },
      { label: "Adjustable height", cls: "bg-slate-100 text-slate-700" },
      { label: "Blucher / ACO Group", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Blucher (part of the ACO Group) manufactures a range of stainless steel drainage products including wall-mounted overflow scuppers for box gutter overflow compliance. The Blucher overflow scupper is a stainless steel outlet body installed through the gutter wall or parapet at a set height above the primary drainage outlet — when the primary outlet is blocked or overwhelmed and water rises to the overflow scupper invert level, water discharges through the scupper and away from the building structure. The adjustable height feature allows the specifier to set the scupper invert at the required level above the primary outlet to comply with NCC performance requirements for overflow provision. Stainless steel construction provides long-term corrosion resistance appropriate for both coastal and inland environments. Blucher overflow scuppers are compatible with the Blucher primary outlet and drainage channel range, simplifying specification on projects where a single manufacturer's drainage system is preferred. Confirm the required scupper size, flow capacity, and positioning with the hydraulic engineer before ordering. NCC overflow requirements for box gutters in Class 2 buildings are mandatory — the overflow system must be designed and documented by a licensed hydraulic engineer.",
    technicalProperties: [
      "Stainless steel wall-mounted overflow scupper — suitable for coastal and inland environments",
      "Adjustable height setting — invert level can be set at required height above primary outlet",
      "NCC-compliant overflow outlet — designed to satisfy NCC overflow requirements for box gutters",
      "Compatible with Blucher primary outlet and drainage channel product range",
      "Available in a range of sizes — confirm required size and flow capacity with the hydraulic engineer",
      "Stainless steel construction — low maintenance — long service life",
    ],
    limitations: [
      "Sizing and positioning must be determined by a licensed hydraulic engineer — the product alone does not achieve NCC compliance",
      "Must be installed at the correct height above the primary outlet invert — incorrect positioning will not provide overflow protection at the intended water level",
      "Confirm compatibility with the gutter lining material and wall/parapet construction before specifying",
      "Not a substitute for a properly sized primary drainage outlet — overflow systems are secondary devices only",
      "Confirm current product range and sizes with Blucher before specifying — product range subject to periodic revision",
    ],
    procurementSources: [
      { name: "Blucher Australia — trade supply", url: "https://www.blucher.com.au" },
      { name: "ACO Group Australia", url: "https://www.acoaus.com.au" },
      { name: "Hydraulic supplies — confirm with hydraulic engineer", url: "https://www.masterplumbers.com.au" },
    ],
  },
  {
    fullLabel: "Geberit Australia",
    brandUrl: "https://www.geberit.com.au",
    accentColor: "#16a34a",
    name: "Geberit Overflow Outlet",
    descriptionLine: "Geberit box gutter overflow outlet system, available in stainless steel and plastic variants for secondary overflow compliance.",
    productType: "Overflow outlet system — stainless steel and plastic variants — secondary overflow",
    filterTags: ["Overflow-outlet", "Geberit", "Stainless"],
    techChips: [
      { label: "Geberit", cls: "bg-green-100 text-green-800" },
      { label: "Stainless and plastic variants", cls: "bg-slate-100 text-slate-700" },
      { label: "Secondary overflow", cls: "bg-slate-100 text-slate-700" },
      { label: "Overflow outlet system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Geberit is a major European plumbing and drainage manufacturer with Australian operations. Geberit's overflow outlet range includes products suitable for box gutter secondary overflow compliance, available in stainless steel and plastic variants depending on the application and budget. The Geberit overflow outlet is typically a through-wall fitting installed in the gutter wall or parapet at the required overflow height. Stainless steel variants are preferred in exposed or coastal environments. Plastic variants are suitable for concealed or protected applications where material compatibility with the gutter lining has been confirmed. Geberit overflow products are commonly used in conjunction with Geberit primary drainage systems on larger commercial and strata building projects. Confirm the required overflow type, size, flow capacity, and material with the hydraulic engineer before selecting the appropriate Geberit product from their range. Geberit technical support can assist with product selection and hydraulic sizing data.",
    technicalProperties: [
      "Overflow outlet system for box gutter secondary overflow provision — stainless steel and plastic variants",
      "Through-wall installation at required overflow height above primary outlet",
      "Stainless steel variants for exposed and coastal environments — plastic variants for concealed protected applications",
      "Geberit technical support available for product selection and hydraulic sizing",
      "Suitable for use with Geberit primary drainage systems on commercial and strata building projects",
    ],
    limitations: [
      "Confirm overflow type, size, and material variant with the hydraulic engineer before ordering",
      "Plastic variant — confirm compatibility with gutter lining material and UV exposure conditions before specifying in exposed applications",
      "Sizing must be determined by a licensed hydraulic engineer — Geberit product data alone is not a hydraulic design",
      "Confirm current product range and availability with Geberit Australia — product specifications subject to revision",
      "Not a substitute for a properly sized primary drainage outlet",
    ],
    procurementSources: [
      { name: "Geberit Australia — trade supply", url: "https://www.geberit.com.au" },
      { name: "Plumbing trade suppliers — national", url: "https://www.reece.com.au" },
    ],
  },
  {
    fullLabel: "Alproc Fabrication",
    brandUrl: "https://www.alproc.com.au",
    accentColor: "#7c2d12",
    name: "Alproc Aluminium Weir Overflow",
    descriptionLine: "Alproc aluminium weir overflow system for box gutters. Pre-fabricated weir with specified flow rate for NCC overflow compliance.",
    productType: "Pre-fabricated aluminium weir overflow — specified flow rate — NCC compliance",
    filterTags: ["Weir", "Aluminium", "Alproc", "Pre-fabricated"],
    techChips: [
      { label: "Alproc fabrication", cls: "bg-orange-100 text-orange-800" },
      { label: "Aluminium weir", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-fabricated", cls: "bg-slate-100 text-slate-700" },
      { label: "Specified flow rate", cls: "bg-green-50 text-green-700" },
      { label: "NCC compliant", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Alproc Fabrication supplies pre-fabricated aluminium weir overflow systems for box gutter overflow compliance. Unlike a scupper (which is a through-wall outlet fitting), a weir overflow is a threshold device — a low-profile barrier set at the required overflow height within or at the gutter wall that allows water to overflow harmlessly to the outside of the building when the primary drainage is blocked or overwhelmed. The Alproc pre-fabricated aluminium weir is supplied to a specified flow rate, allowing the hydraulic engineer to confirm that the weir provides sufficient overflow capacity for the catchment area under the NCC design storm. Aluminium construction provides good corrosion resistance and low weight — it is compatible with aluminium and Colorbond box gutter linings but must not be installed in contact with copper elements without isolation. Alproc can fabricate weir overflows to custom dimensions and flow rates where standard products do not satisfy the hydraulic design. Confirm the required weir height, length, material, and flow rate with the hydraulic engineer before ordering.",
    technicalProperties: [
      "Pre-fabricated aluminium weir overflow — supplied to specified dimensions and flow rate",
      "Threshold-type overflow — water flows over the weir crest when primary drainage is blocked or overwhelmed",
      "Specified flow rate data available — allows hydraulic engineer to confirm NCC compliance for the catchment area",
      "Aluminium construction — corrosion resistant — compatible with aluminium and Colorbond lining systems",
      "Custom dimensions available for non-standard box gutter configurations",
      "Low-profile installation at gutter wall or parapet at the required overflow height",
    ],
    limitations: [
      "Must not be installed in contact with copper elements without appropriate isolation — galvanic corrosion risk",
      "Weir height and length must be determined by a licensed hydraulic engineer — the product alone does not guarantee NCC compliance",
      "Flow rate must be confirmed as sufficient for the roof catchment area design storm — confirm with hydraulic engineer",
      "Confirm Alproc current product range and lead times before specifying — fabricated products have lead times",
      "Installation at the correct height is critical — incorrect positioning will not provide overflow protection at the intended water level",
      "Not a substitute for a properly sized primary drainage outlet",
    ],
    procurementSources: [
      { name: "Alproc Fabrication — direct supply", url: "https://www.alproc.com.au" },
      { name: "Roofing and hydraulic suppliers — confirm with hydraulic engineer", url: "https://www.masterplumbers.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Stainless", label: "Stainless steel" },
  { id: "Scupper", label: "Scupper" },
  { id: "Wall-mounted", label: "Wall-mounted" },
  { id: "Weir", label: "Weir" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Overflow-outlet", label: "Overflow outlet" },
  { id: "NCC-compliant", label: "NCC-compliant" },
  { id: "Blucher", label: "Blucher" },
  { id: "Geberit", label: "Geberit" },
  { id: "Alproc", label: "Alproc" },
  { id: "Pre-fabricated", label: "Pre-fabricated" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  type: string;
  nccCompliant: string;
  flowRate: string;
  adjustable: string;
}[] = [
  {
    product: "Blucher Overflow Scupper",
    brand: "Blucher / ACO Group",
    material: "Stainless steel",
    type: "Wall-mounted scupper — through-wall outlet",
    nccCompliant: "Yes — sized by hydraulic engineer",
    flowRate: "Confirm with Blucher technical data",
    adjustable: "Yes — adjustable height setting",
  },
  {
    product: "Geberit Overflow Outlet",
    brand: "Geberit Australia",
    material: "Stainless steel or plastic variants",
    type: "Through-wall overflow outlet",
    nccCompliant: "Yes — when sized by hydraulic engineer",
    flowRate: "Confirm with Geberit technical data",
    adjustable: "Confirm with Geberit",
  },
  {
    product: "Alproc Aluminium Weir",
    brand: "Alproc Fabrication",
    material: "Aluminium",
    type: "Pre-fabricated weir — threshold type",
    nccCompliant: "Yes — when sized by hydraulic engineer for catchment",
    flowRate: "Specified flow rate — confirm with hydraulic engineer",
    adjustable: "Custom dimensions available",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "NCC-mandatory secondary overflow provision for box gutters on Class 2 strata buildings — where primary outlet blockage would cause water to back up and enter the building",
    "Remediation of existing box gutters that lack code-compliant overflow provision — a common deficiency in older strata buildings",
    "New box gutter lining projects where the hydraulic engineer specifies an overflow scupper or weir as part of the compliant drainage design",
    "Buildings where primary outlet blockage from leaf debris is a recurring maintenance issue requiring overflow safeguard",
  ],
  selectionCriteria: [
    "NCC compliance — overflow type and sizing must satisfy NCC performance requirements for the catchment area — confirmed by the hydraulic engineer",
    "Overflow type — scupper (through-wall fitting) vs weir (threshold) vs pipe overflow — confirm with hydraulic engineer which type is appropriate for the gutter geometry",
    "Material compatibility — stainless steel for exposed and coastal environments — aluminium for protected inland locations — confirm compatibility with lining material",
    "Flow rate — the overflow device must have sufficient flow capacity for the design storm event — confirm from product data and hydraulic design",
    "Height setting — the overflow invert must be set at the correct height above the primary outlet to provide overflow before water backs up into the building",
    "Maintenance access — the overflow outlet must be accessible for regular inspection and clearing",
  ],
  limitations: [
    "Overflow systems are secondary — they must not substitute for a properly sized primary drainage outlet — both must be present and functional",
    "Sizing is the responsibility of the hydraulic engineer — product datasheets alone do not confirm NCC compliance for a specific catchment",
    "NCC overflow requirements are mandatory for Class 2 buildings — non-compliant overflow provision is a defect in its own right",
    "Overflow outlets must be kept clear of debris — a blocked overflow outlet provides no protection against primary outlet blockage",
    "Do not install aluminium overflow hardware where copper elements are present without appropriate isolation",
  ],
  standardsNotes: [
    "NCC Volume One — Building Code of Australia — performance requirements for stormwater drainage on Class 2 buildings — overflow provision is mandatory",
    "AS 3500.3 — Plumbing and Drainage — Stormwater Drainage — hydraulic design requirements including overflow provision",
    "AS 1562.1 / AS 1562.3 — box gutter design standards — overflow positioning and sizing requirements",
    "Hydraulic engineer design — overflow must be designed, documented, and certified by a licensed hydraulic engineer",
    "Maintenance requirements — NCC requires overflow outlets to be maintained — document in the building's maintenance plan",
  ],
  suitableDefects: [
    "Box gutter with no overflow provision — missing overflow system is a non-compliance and a critical safety deficiency",
    "Box gutter with undersized or incorrectly positioned overflow — overflow invert set too high, or flow capacity insufficient for catchment",
    "Box gutter overflow blocked by debris or corrosion — overflow outlet requires replacement or cleaning",
  ],
  typicalSubstrates: [
    "Box gutter wall or parapet — overflow scupper/weir installed through or over the gutter wall at the required overflow height",
    "Existing box gutter lining — confirm that overflow outlet installation does not compromise the integrity of the lining at the penetration point",
    "Masonry, concrete, or timber parapet — confirm fixing method and flashing requirements for the overflow outlet penetration",
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

export function OverflowScupperWeirIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are overflow scupper and weir systems for box gutters?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Overflow scuppers and weirs are secondary drainage devices installed in box gutters to provide a compliant overflow path in the event that the primary drainage outlet is blocked or overwhelmed. NCC (National Construction Code) overflow requirements for box gutters are mandatory on Class 2 buildings — a box gutter without an adequately sized and correctly positioned overflow system is non-compliant and represents a critical deficiency.
        </p>
        {expanded && (
          <>
            <p>
              An overflow scupper is a through-wall fitting installed in the gutter wall or parapet at a set height above the primary outlet. When water rises above the primary outlet due to blockage or storm overload, it discharges through the scupper to the exterior of the building rather than backing up into the roof structure. A weir overflow is a threshold device — a low-profile barrier at the overflow height — that achieves the same result through a different geometry. Both must be sized by a licensed hydraulic engineer for the roof catchment area.
            </p>
            <p>
              Overflow provision is commonly absent or non-compliant on older Class 2 strata buildings. During box gutter remediation, the installation of a compliant overflow system is an essential component of a complete and code-compliant repair scope. Do not complete a box gutter re-lining without confirming that the overflow provision meets current NCC requirements.
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

export function OverflowScupperWeirProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — box gutter overflow scuppers and weirs — scroll to view all</p>
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
                  <div className="mt-0.5">
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

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of overflow scupper and weir systems. Confirm all product selections with the hydraulic engineer and against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">NCC compliant</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Flow rate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Adjustable</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.nccCompliant}</td>
                  <td className="px-4 py-3 text-slate-600">{row.flowRate}</td>
                  <td className="px-4 py-3 text-slate-600">{row.adjustable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
