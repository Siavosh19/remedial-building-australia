"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Polyurethane"
  | "One-part"
  | "Two-part"
  | "ISO-11600"
  | "AS-3700"
  | "Movement-joint"
  | "Masonry"
  | "Bond-breaker"
  | "25LM"
  | "Paintable";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#b45309",
    name: "Sikaflex-11FC+ one-part polyurethane sealant",
    descriptionLine: "Industry-standard one-part moisture-curing PU sealant — ISO 11600 F 25 LM — for movement joints in masonry facades and around window and door frames",
    productType: "One-part moisture-curing polyurethane sealant — ISO 11600 F 25 LM — masonry movement joints",
    filterTags: ["Polyurethane", "One-part", "ISO-11600", "AS-3700", "Movement-joint", "Masonry", "Bond-breaker", "25LM", "Paintable"],
    techChips: [
      { label: "One-part PU", cls: "bg-amber-100 text-amber-800" },
      { label: "ISO 11600 F 25 LM", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-green-100 text-green-700" },
      { label: "Bond breaker req.", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Industry-standard one-part moisture-curing PU sealant rated ISO 11600 F 25 LM. Used for movement joints in masonry facades, around window and door frames, and at material change-of-plane junctions. Primer required on porous substrates. Bond breaker tape is mandatory — three-sided bond causes cohesive failure. Single-component formulation simplifies site handling with no mixing required. Shore A hardness approximately 35 when cured. Skin time approximately 60 minutes at 23°C / 50% RH; cure rate 3–5 mm per day. Application temperature range 5°C to 40°C. Paintable after full cure with most water-based paints.",
    technicalProperties: [
      "Single-component — no mixing required; reduces waste and site error",
      "ISO 11600 F 25 LM rated — accommodates ±25% of joint width in movement",
      "Paintable after full cure with most water-based topcoats",
      "Excellent adhesion to masonry, concrete, and aluminium with Sika Primer-3N",
      "Widely available nationally — high contractor familiarity reduces application error",
      "Skin time ~60 min at 23°C / 50% RH; tack-free ~24 hr; full cure 3–5 mm per day",
    ],
    limitations: [
      "Moisture-curing — requires ambient humidity; slow cure in very dry or cold conditions",
      "Sag in deep or wide vertical joints without backer rod support to control depth",
      "NOT for immersed or permanently wet joints — specify a wet-rated PU or epoxy sealant",
      "Colour range limited; UV stability moderate — may yellow on prolonged direct sun exposure",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies — national (Sika distributor)", url: "https://www.parchem.com.au" },
      { name: "Total Fasteners — national", url: "https://www.totalfasteners.com.au" },
      { name: "Bunnings Trade / Beaumont Tiles — wide retail availability", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#0369a1",
    name: "Mapei Mapeflex PU45 two-part polyurethane sealant",
    descriptionLine: "Two-component polyurethane sealant — chemical cure independent of humidity — ISO 11600 25 LM — for large-scale facade jointing and low-humidity environments",
    productType: "Two-part chemically curing polyurethane sealant — ISO 11600 25 LM — facade movement joints",
    filterTags: ["Polyurethane", "Two-part", "ISO-11600", "AS-3700", "Movement-joint", "Masonry", "Bond-breaker", "25LM"],
    techChips: [
      { label: "Two-part PU", cls: "bg-sky-100 text-sky-800" },
      { label: "Chemical cure", cls: "bg-slate-100 text-slate-700" },
      { label: "ISO 11600 25 LM", cls: "bg-slate-100 text-slate-700" },
      { label: "Low-humidity OK", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Two-component polyurethane sealant curing by chemical crosslink rather than atmospheric moisture. Consistent cure rate regardless of site humidity and temperature variation — suited to large-scale facade projects, low-humidity or air-conditioned environments, and where precise colour matching across multiple joints is required. Mixing ratio must be exact — component A + component B in the volume ratio specified on the TDS. Pot life approximately 60–90 minutes at 23°C. Full cure approximately 7 days at 23°C. Shore A hardness approximately 45 when cured. Larger batch sizes support high-volume facade jointing efficiently.",
    technicalProperties: [
      "Chemical cure — consistent performance independent of ambient humidity or temperature variation",
      "Suitable for low-humidity environments where one-part moisture-curing sealants cannot cure",
      "Larger batch kit sizes suit high-volume facade jointing on multi-storey projects",
      "Good colour consistency across batches when site-mixed components are used",
      "ISO 11600 25 LM — same ±25% movement class as one-part alternatives",
      "Pot life ~60–90 min at 23°C — apply within pot life; do not use sealant past gel point",
    ],
    limitations: [
      "Two-component mixing required — incorrect ratio causes partial cure or complete cure failure",
      "Pot life ~60–90 min at 23°C — unused mixed material must be discarded; waste risk on small areas",
      "More complex than one-part on small jobs — one-part sealant is preferred for small or isolated joint repairs",
      "Higher skill requirement for accurate volume measurement, mixing, and application",
    ],
    procurementSources: [
      { name: "Mapei Australia — national distributors", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies — national", url: "https://www.parchem.com.au" },
      { name: "Ardex Australia — national distributors", url: "https://www.ardex.com.au" },
      { name: "TileMax / Tile Depot — trade supply nationally", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Tremco / RPM Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    accentColor: "#7c3aed",
    name: "Tremco Dymonic FC one-part high-movement PU facade sealant",
    descriptionLine: "Premium non-sag one-part PU sealant — enhanced UV resistance — for wide or deep vertical facade joints, curtain wall perimeters, and high-movement control joints",
    productType: "One-part non-sag moisture-curing polyurethane sealant — ISO 11600 F 25 LM — facade vertical joints",
    filterTags: ["Polyurethane", "One-part", "ISO-11600", "AS-3700", "Movement-joint", "Masonry", "Bond-breaker", "25LM"],
    techChips: [
      { label: "Non-sag", cls: "bg-purple-100 text-purple-800" },
      { label: "Enhanced UV", cls: "bg-amber-100 text-amber-800" },
      { label: "Wide joints", cls: "bg-slate-100 text-slate-700" },
      { label: "ISO 11600 F 25 LM", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Premium non-sag one-part PU sealant with enhanced non-sag rheology specifically formulated for vertical facade joints. Stays in position in joints up to 50 mm deep without drooping during application. Preferred for wide or deep vertical joints in masonry and cladding, curtain wall perimeters, and high-movement control joints in multi-storey facades. Enhanced UV resistance compared to standard Sikaflex-11FC+ — preferred for sustained direct sun exposure on north and west-facing facades. Fuel and oil resistant formulation also suits joints around plant areas and parking structure joints. Shore A hardness approximately 30 when cured — slightly softer than Sikaflex-11FC+. Skin time approximately 45–60 minutes at 23°C / 50% RH. Primer required on porous masonry substrates with Tremco Primer 171.",
    technicalProperties: [
      "Non-sag formulation — maintains position in deep vertical joints to 50 mm depth without backer rod sagging",
      "Enhanced UV resistance compared to standard one-part PU — preferred for sustained sun-exposed facade joints",
      "Wide joint capability — suitable for joints up to 50 mm wide",
      "Consistent colour through full joint depth — no surface skinning before depth cure",
      "Fuel and oil resistant — suitable for plant room, parking structure and service penetration joints",
      "Shore A ~30 cured — slightly softer than standard PU; lower joint stress in thermally active facades",
    ],
    limitations: [
      "Higher cost than standard one-part PU — justify use in high-movement or high-UV-exposure locations",
      "Limited colour range compared to Sikaflex product family — confirm required colour is available",
      "Primer still required on porous masonry substrates — Tremco Primer 171 on masonry and concrete",
      "Slower cure rate than two-part systems in cold conditions — check minimum application temperature",
    ],
    procurementSources: [
      { name: "Tremco / RPM Australia — national trade supply", url: "https://www.tremcosealants.com.au" },
      { name: "Parchem Construction Supplies — Tremco distributor nationally", url: "https://www.parchem.com.au" },
      { name: "PBS Building Supplies — national", url: "https://www.pbsbuildingsupplies.com.au" },
      { name: "Confirm current AU distributor with Tremco local rep before ordering", url: "https://www.tremcosealants.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Polyurethane", label: "Polyurethane" },
  { id: "One-part", label: "One-part" },
  { id: "Two-part", label: "Two-part" },
  { id: "ISO-11600", label: "ISO 11600" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Movement-joint", label: "Movement joint" },
  { id: "Masonry", label: "Masonry" },
  { id: "Bond-breaker", label: "Bond breaker req." },
  { id: "25LM", label: "±25% LM" },
  { id: "Paintable", label: "Paintable" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  components: string;
  cure: string;
  isoClass: string;
  nonSag: string;
  uvStability: string;
  paintable: string;
  primaryUse: string;
}[] = [
  {
    product: "Sikaflex-11FC+",
    brand: "Sika Australia",
    components: "One-part",
    cure: "Moisture",
    isoClass: "F 25 LM",
    nonSag: "Moderate",
    uvStability: "Moderate",
    paintable: "Yes — after full cure",
    primaryUse: "General masonry movement joints — residential and commercial facades",
  },
  {
    product: "Mapeflex PU45",
    brand: "Mapei Australia",
    components: "Two-part",
    cure: "Chemical",
    isoClass: "25 LM",
    nonSag: "Good",
    uvStability: "Good",
    paintable: "Confirm with TDS",
    primaryUse: "Low-humidity or large-volume facade jointing",
  },
  {
    product: "Tremco Dymonic FC",
    brand: "Tremco / RPM Australia",
    components: "One-part",
    cure: "Moisture",
    isoClass: "F 25 LM",
    nonSag: "Excellent",
    uvStability: "Enhanced",
    paintable: "Confirm with TDS",
    primaryUse: "Wide/deep vertical joints, high UV exposure, high-movement control joints",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Movement joints in masonry facades at maximum 6 m centres per AS 3700 requirements",
    "Window and door frame perimeter joints — at junction of frame and masonry surround",
    "Material change-of-plane joints — where different cladding or substrate types meet",
    "Parapet coping joints — high thermal movement and water exposure zones",
    "Control joints at re-entrant corners and changes in wall height or thickness",
  ],
  selectionCriteria: [
    "For general masonry facade joint repair, specify one-part PU (Sikaflex-11FC+ or equivalent) — simple supply, familiar to contractors",
    "For low-humidity environments or where humidity-independent cure is required, specify two-part PU (Mapeflex PU45 or equivalent)",
    "For wide or deep vertical joints (> 25 mm deep) or prolonged UV exposure, specify a non-sag formulation (Tremco Dymonic FC or equivalent)",
    "Apply when joint is at mid-range temperature — not at seasonal minimum (joint contracted) or maximum (joint expanded)",
    "Bond breaker tape is mandatory — do not apply sealant without confirming the joint base is isolated from sealant bond",
  ],
  limitations: [
    "Bond breaker tape at the joint base is mandatory — three-sided bond restricts movement and causes cohesive tearing",
    "Do not apply to wet joint faces — substrate must be clean, dry, and primed",
    "Do not apply in rain or when joint surfaces are wet — moisture on the joint face prevents adhesion",
    "Do not apply over uncured or contaminated existing sealant — rake out fully to sound substrate",
    "Two-part sealant: incorrect mixing ratio causes partial cure or complete cure failure — measure volumes accurately",
  ],
  standardsNotes: [
    "ISO 11600 — Classification and requirements for joint sealants — designates movement class (F 25 LM = facade, ±25%, low modulus)",
    "AS 3700 — Masonry Structures — movement joint spacing and sealant requirements for masonry facades",
    "NATSPEC worksection 05 32 00 — Sealants — project specification requirements for sealant work",
    "Manufacturer TDS — confirm current product classification, primer requirement, and application temperature range before specifying",
  ],
  suitableDefects: [
    "Failed, cracked or debonded polyurethane or silicone sealant in masonry facade movement joints",
    "Open control joints where original sealant has cured out and pulled away from the joint face",
    "Perimeter joints around window and door frames where original sealant is deteriorated or absent",
    "New movement joints cut into masonry as part of a remedial programme for crack repair or salt attack work",
  ],
  typicalSubstrates: [
    "Modern fired clay brick — prime porous substrates with manufacturer-specified primer before sealant application",
    "Concrete masonry units and precast concrete panels — prime per TDS",
    "Aluminium window frames and curtain wall profiles — prime per manufacturer TDS",
    "PVCu frames — confirm primer compatibility with the PVCu compound before applying",
    "NOT suitable: immersed joints or permanently wet conditions — specify a wet-rated waterproofing sealant",
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

export function MovJointPUIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are movement joint polyurethane sealants?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Movement joint polyurethane sealants are elastomeric compounds applied into prepared joints in masonry facades to accommodate thermal expansion and contraction, differential settlement, and structural movement while maintaining a weathertight seal. They are classified under ISO 11600 by movement class — F 25 LM designates a facade-grade sealant capable of accommodating ±25% of the joint width in movement at low modulus (low stress on the joint faces).
        </p>
        {expanded && (
          <>
            <p>
              The three most critical installation requirements are: correct joint geometry (depth-to-width ratio per ISO 11600); bond breaker tape at the joint base (three-sided bond prevents movement and causes cohesive tearing — the single most common sealant failure mode); and substrate priming on all porous surfaces before sealant application. Missing any one of these three steps will result in premature sealant failure regardless of product quality.
            </p>
            <p>
              Sealant should be applied when the joint is at mid-range temperature — not at seasonal minimum (joint contracted) or maximum (joint expanded). For Class 2 strata remediation, one-part moisture-curing PU is the standard product for most applications. Two-part PU is preferred for large-volume or low-humidity work. Non-sag formulations are specified for wide or deep vertical joints where standard one-part sealant would sag before curing.
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

export function MovJointPUProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — movement joint polyurethane sealants — scroll to view all</p>
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
              Side-by-side comparison of movement joint polyurethane sealant systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Components</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cure</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">ISO class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Non-sag</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">UV stability</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Paintable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.components}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.cure}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.isoClass}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.nonSag}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.uvStability}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.paintable}</td>
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
