"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Single-ply"
  | "Sika"
  | "PVC"
  | "Exposed"
  | "Protan"
  | "Liquid-applied"
  | "ARDEX"
  | "PMMA"
  | "Seamless";

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
    tdsUrl: "https://aus.sika.com/en/construction/waterproofing/single-ply-membranes/sika-sarnafil-g-410.html",
    accentColor: "#be123c",
    name: "Sika Sarnafil G 410",
    descriptionLine: "Single-ply PVC-P membrane; thermally welded; 1.2–2.0mm thickness; UV-stable; root-resistant; suitable for green roofs and ballasted systems; ISO 13859 compliant",
    productType: "Single-ply PVC-P roofing membrane — thermally welded — exposed",
    filterTags: ["Single-ply", "Sika", "PVC", "Exposed"],
    techChips: [
      { label: "Single-ply PVC-P", cls: "bg-rose-100 text-rose-800" },
      { label: "Thermally welded", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-stable", cls: "bg-green-50 text-green-700" },
      { label: "Root-resistant", cls: "bg-slate-100 text-slate-700" },
      { label: "ISO 13859 compliant", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Sarnafil G 410 is a single-ply PVC-P (plasticised polyvinyl chloride) roofing membrane supplied by Sika Australia. It is one of the most widely specified single-ply membranes in Australia for commercial flat roof waterproofing — used on new construction and ponding remediation overlays. The membrane is thermally welded at all laps using hot-air welding equipment, creating a seamless, homogeneous lap joint across the full roof area. Hot-air welded joints are more reliable than adhesive bonds and can be spark-tested after installation to verify weld continuity. The G 410 is UV-stable and designed for direct exposed applications without the need for a protective overburden — suitable for ballasted, mechanically fastened, and fully adhered installation methods. Its root-resistant formulation makes it suitable for green roof and extensive planting applications. ISO 13859 compliant — the international standard for flexible sheets for waterproofing of roofs. Available in a range of thicknesses from 1.2mm to 2.0mm depending on system specification. On ponding remediation overlays, confirm substrate preparation requirements, primer selection, and the method of membrane attachment with Sika Australia and the project waterproofing consultant before specifying. The 2.0mm grade is typically specified for commercial flat roofs in Australia.",
    technicalProperties: [
      "Single-ply PVC-P membrane — thermally welded laps — homogeneous, testable joints",
      "1.2–2.0mm thickness range — 2.0mm typically specified for commercial flat roofs",
      "UV-stable — direct exposed application without protective overburden",
      "Root-resistant formulation — suitable for green roof and ballasted applications",
      "ISO 13859 compliant — international roofing membrane standard",
      "Installation methods: ballasted, mechanically fastened, or fully adhered — confirm system with Sika Australia",
      "Confirm AS 4654.2 compliance and NCC acceptance with Sika Australia for Australian projects",
    ],
    limitations: [
      "PVC-P is not compatible with bituminous products — do not apply over or adjacent to torch-on or cold-applied bitumen membranes without a separator layer",
      "Thermal welding requires trained and accredited applicators using correct hot-air welding equipment — not a DIY or general contractor system",
      "Spark testing of welds requires electrical testing equipment — confirm ITP hold point requirements with Sika Australia and the project specification",
      "Requires substrate that is clean, dry, and free of sharp protrusions — sand blinding or protection layer may be required over rigid insulation",
      "Confirm compatibility with existing roof substrate and materials before specifying an overlay — plasticiser migration from old PVC membranes can affect new membrane bonds",
      "Confirm current product specification with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Specialist single-ply roofing contractors — Sika Sarnafil approved applicator network", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Protan Australia",
    brandUrl: "https://www.protan.com/au",
    tdsUrl: "https://www.protan.com/au/products/se-16/",
    accentColor: "#0369a1",
    name: "Protan SE 1.6",
    descriptionLine: "Single-ply PVC-P roof membrane; 1.6mm; flexible at -35°C; fire class Broof(t1); excellent chemical resistance; factory-welded options for large areas",
    productType: "Single-ply PVC-P roofing membrane — 1.6mm — exposed",
    filterTags: ["Single-ply", "Protan", "PVC", "Exposed"],
    techChips: [
      { label: "Single-ply PVC-P", cls: "bg-sky-100 text-sky-800" },
      { label: "1.6mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Flexible at -35°C", cls: "bg-green-50 text-green-700" },
      { label: "Broof(t1) fire class", cls: "bg-slate-100 text-slate-700" },
      { label: "Factory-welded option", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Protan SE 1.6 is a single-ply PVC-P roofing membrane from Protan, a Norwegian specialist roofing membrane manufacturer with a strong market presence in Australian commercial and industrial flat roofing. The 1.6mm gauge is the standard commercial grade in the SE product range. Its flexibility at -35°C is particularly relevant for Australian applications in alpine and high-altitude areas, but also provides assurance of long-term flexibility and resistance to embrittlement in cold periods in all climates. The Broof(t1) fire classification (per EN 13501-5) indicates the membrane's performance as part of a roof assembly in external fire exposure — confirm the fire classification and its acceptance under NCC with Protan Australia and the project fire engineer. Factory-welded options — where large widths or prefabricated panels are factory-produced — reduce the number of site welds and can improve quality control on large commercial roof areas. Like all PVC-P single-ply membranes, laps are thermally welded on site. Chemical resistance makes it suitable for flat roofs in industrial or commercial environments where chemical exposure from adjacent plant is possible. Confirm NCC compliance and AS 4654.2 acceptance with Protan Australia before specifying.",
    technicalProperties: [
      "Single-ply PVC-P membrane — 1.6mm standard commercial gauge",
      "Flexible at -35°C — resists embrittlement in cold climates and alpine applications",
      "Fire class Broof(t1) per EN 13501-5 — confirm NCC acceptance with Protan Australia",
      "Excellent chemical resistance — suitable for industrial flat roof environments",
      "Factory-welded options available for large areas — reduces site weld count",
      "Thermally welded laps on site — testable joints using spark test",
      "Confirm AS 4654.2 compliance and NCC acceptance with Protan Australia",
    ],
    limitations: [
      "PVC-P is not compatible with bituminous products — separator layer required if applied adjacent to or over bitumen-based systems",
      "Thermal welding requires trained applicators — confirm applicator accreditation with Protan Australia before engaging contractor",
      "Broof(t1) is a European fire classification — confirm NCC acceptance and any required fire engineering with Protan Australia",
      "1.6mm may not meet all Australian specification requirements — confirm minimum thickness with project specification and AS 4654.2",
      "Confirm availability of Protan-approved applicators in Australia before specifying",
      "Confirm current product specification with Protan Australia before specifying",
    ],
    procurementSources: [
      { name: "Protan Australia — trade supply", url: "https://www.protan.com/au" },
      { name: "Specialist single-ply roofing contractors — Protan approved applicator network", url: "https://www.protan.com/au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-w-800-rf/",
    accentColor: "#f97316",
    name: "ARDEX W 800 RF",
    descriptionLine: "Rapid-hardening liquid-applied PMMA waterproofing; 2–3mm applied; trafficable in 2 hours; -30°C to +90°C service range; 100% seamless; AS 4654.1 compliant",
    productType: "Liquid-applied PMMA waterproofing membrane — AS 4654.1 — seamless",
    filterTags: ["Liquid-applied", "ARDEX", "PMMA", "Seamless"],
    techChips: [
      { label: "Liquid-applied PMMA", cls: "bg-orange-100 text-orange-800" },
      { label: "Seamless", cls: "bg-slate-100 text-slate-700" },
      { label: "2hr trafficable", cls: "bg-green-50 text-green-700" },
      { label: "-30°C to +90°C service", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654.1 compliant", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX W 800 RF is a rapid-hardening, liquid-applied polymethylmethacrylate (PMMA) waterproofing membrane from ARDEX Australia. PMMA is a reactive resin system that cures by chemical reaction rather than drying — curing is rapid (typically 30–60 minutes at standard conditions) and largely independent of temperature, allowing application and cure in conditions down to approximately -5°C. Trafficable within 2 hours of application at standard conditions. The liquid-applied, roller or squeegee application creates a 100% seamless membrane with no laps, seams, or joints — eliminating the most common failure points in sheet membrane systems. Applied at 2–3mm DFT in a single system. A reinforcing fleece is embedded in the first coat at all junctions, penetrations, drains, and terminations to provide additional dimensional stability at critical details. The -30°C to +90°C service temperature range makes it one of the most thermally tolerant waterproofing membranes available in Australia — important on exposed flat roofs subject to significant thermal cycling. AS 4654.1 compliant for external above-ground waterproofing. The PMMA system produces styrene-like odours during application — confirm ventilation requirements with ARDEX Australia and ensure appropriate site management for odour-sensitive buildings. Suitable for ponding remediation overlays on existing roofs where continuity of the membrane to all junctions and penetrations is critical.",
    technicalProperties: [
      "Liquid-applied PMMA reactive resin — 100% seamless monolithic membrane",
      "2–3mm DFT applied in one system — reinforcing fleece embedded at all junctions and penetrations",
      "Trafficable within 2 hours at standard conditions — fast-track programme compatibility",
      "-30°C to +90°C service temperature range — exceptional thermal tolerance for exposed flat roofs",
      "AS 4654.1 compliant for external above-ground waterproofing",
      "Cures by chemical reaction — largely temperature independent — can be applied in cold conditions down to approximately -5°C",
      "Confirm elongation, AS 4654.2 compliance, and NCC acceptance for specific project with ARDEX Australia",
    ],
    limitations: [
      "PMMA produces styrene-like odours during application and cure — not suitable for occupied buildings without adequate site management; confirm ventilation and odour management plan with ARDEX Australia",
      "Reactive resin system — short pot life (confirm with TDS); application must be planned and executed by trained ARDEX W 800 RF applicators",
      "Higher material cost per m² than single-ply membranes — justified by seamless application and thermal performance in complex geometry roof areas",
      "Reinforcing fleece must be correctly embedded at all junctions — confirm detailing requirements with ARDEX Australia before application",
      "Confirm compatibility with existing roof substrate — some substrates require priming with ARDEX-specified primer before application",
      "Confirm current product specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "ARDEX approved applicator network", url: "https://www.ardex.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Single-ply", label: "Single-ply" },
  { id: "Liquid-applied", label: "Liquid-applied" },
  { id: "Exposed", label: "Exposed" },
];

const BRAND_EQUIV = [
  {
    a: "Sika Sarnafil G 410",
    b: "Protan SE 1.6",
    note: "Both are thermally welded single-ply PVC-P membranes for exposed flat roof applications. Sarnafil G 410 is available in 1.2–2.0mm and is root-resistant; Protan SE 1.6 is a 1.6mm fixed-gauge product with superior low-temperature flexibility and factory-welded options.",
  },
  {
    a: "ARDEX W 800 RF",
    b: "— liquid-applied PMMA —",
    note: "ARDEX W 800 RF is a liquid-applied PMMA system — fundamentally different installation method to thermally welded single-ply. PMMA creates a 100% seamless membrane without laps or joints and is preferred in complex geometry roofs or where overlay continuity to all penetrations is the design priority.",
  },
  {
    a: "All three systems",
    b: "— AS 4654 compliant —",
    note: "All three are AS 4654 compliant waterproofing systems for exposed flat roof applications. Confirm the specific AS 4654.1 (liquid) or AS 4654.2 (sheet) part compliance with the respective manufacturer before specifying.",
  },
];

const SYSTEM_COMPARISON: {
  attribute: string;
  sarnafil: string;
  protan: string;
  ardex: string;
}[] = [
  {
    attribute: "System type",
    sarnafil: "Single-ply PVC-P — sheet",
    protan: "Single-ply PVC-P — sheet",
    ardex: "Liquid-applied PMMA",
  },
  {
    attribute: "Thickness",
    sarnafil: "1.2–2.0mm",
    protan: "1.6mm",
    ardex: "2–3mm DFT",
  },
  {
    attribute: "Installation method",
    sarnafil: "Thermally welded laps — hot air",
    protan: "Thermally welded laps — hot air",
    ardex: "Roller / squeegee applied — seamless",
  },
  {
    attribute: "UV rating",
    sarnafil: "UV-stable — direct exposed",
    protan: "UV-stable — direct exposed",
    ardex: "Exposed rated — confirm with ARDEX TDS",
  },
];

const TECH_INFO = [
  {
    title: "Single-ply vs liquid-applied waterproofing for flat roof overlays",
    items: [
      "Single-ply PVC-P membranes (Sarnafil G 410, Protan SE 1.6) are pre-manufactured sheets installed by skilled applicators using hot-air welding equipment — suitable for large, regular-geometry flat roofs where large sheets can be installed efficiently",
      "Liquid-applied PMMA systems (ARDEX W 800 RF) are applied by roller or squeegee in situ — 100% seamless with no laps; preferred for complex geometry roofs, roofs with many penetrations, or where continuity of the membrane to all details is the design priority",
      "Single-ply systems require trained and accredited welding operators — lap quality is the most critical installation parameter and must be verified by spark testing",
      "Liquid-applied PMMA cures by chemical reaction and is largely temperature-independent — can be applied in conditions where PVC-P welding quality is difficult to achieve",
      "Cost comparison: single-ply is typically lower material cost for large regular areas; liquid-applied PMMA is typically higher material cost but lower labour cost in complex areas",
      "Confirm the appropriate system with the project waterproofing consultant and substrate engineer before specifying",
    ],
    icon: "bullet" as const,
  },
  {
    title: "Root resistance and green roof compatibility for flat roof membranes",
    items: [
      "Sika Sarnafil G 410 carries a root-resistant formulation and is specified for green roof and ballasted planting applications — confirm current root-resistance certification with Sika Australia",
      "Standard PVC-P membranes without root-resistant formulation must not be used under soil, growing media, or planting — root penetration will cause membrane failure",
      "ARDEX W 800 RF PMMA membranes must be confirmed for root resistance with ARDEX Australia before use in green roof assemblies",
      "Green roof assemblies require a root-resistant membrane, a drainage layer, a filter fabric, and a growing medium — confirm the complete assembly specification with the project landscape and waterproofing engineer",
      "Root damage to flat roof membranes is a common source of defect in strata buildings with podium gardens — confirm root-resistance certification before specifying",
    ],
    icon: "check" as const,
  },
  {
    title: "Lap welding vs monolithic application — longevity and maintenance",
    items: [
      "Thermally welded PVC-P laps are the primary potential failure location in single-ply roof membranes — lap quality depends on substrate cleanliness, ambient temperature, humidity, and operator skill",
      "Lap welds can be tested by spark test (electrical continuity) immediately after installation — spark testing is a mandatory ITP hold point for most single-ply specifications",
      "Monolithic liquid-applied membranes (PMMA) have no laps and therefore no lap-related failure modes — the primary failure risk is at terminations, penetrations, and junctions where the fleece reinforcement must be correctly embedded",
      "PVC-P membranes can be inspected, repaired, and extended using the same hot-air welding process — maintenance is well-understood and repair materials are readily available",
      "PMMA membranes can be repaired by reapplication of PMMA resin — confirm repair system and compatibility with ARDEX Australia",
      "Both system types require regular maintenance inspection — debris removal from drains, checking terminations, and inspection of any penetrations after storm events",
    ],
    icon: "warn" as const,
  },
  {
    title: "NCC/BCA requirements for exposed flat roof waterproofing",
    items: [
      "AS 4654.2 (Waterproofing Membranes for External Above-Ground Use — Sheet Membranes) applies to single-ply PVC-P and other sheet membrane systems on exposed flat roofs — confirm compliance with the membrane manufacturer",
      "AS 4654.1 (Waterproofing Membranes for External Above-Ground Use — Liquid Applied Membranes) applies to liquid-applied systems including PMMA — ARDEX W 800 RF is AS 4654.1 compliant",
      "NCC Volume One sets performance requirements for roof waterproofing on Class 2–9 buildings — confirm that the selected membrane system meets the performance solution or DTS pathway applicable to the project",
      "Minimum DFT requirements: AS 4654.1 requires minimum 1.5–2.0mm DFT for liquid-applied membranes on external exposed applications — confirm with TDS",
      "Elongation at break: AS 4654 requires minimum 300% elongation at break for external above-ground waterproofing — confirm the product's tested elongation with the manufacturer",
      "Ponding water tolerance: confirm with the membrane manufacturer that the product is rated for standing water exposure — not all membranes are rated for continuous water immersion",
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

export function WaterproofingMembraneFlatRoofIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are waterproofing membrane systems for flat roof ponding remediation?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Flat roof waterproofing membranes for ponding remediation must perform in an environment of standing water, direct UV exposure, and thermal cycling — conditions far more demanding than a protected under-tile membrane system. The membrane is applied over the fall-corrected substrate (polymer screed or tapered insulation) and must maintain adhesion, elongation, and watertightness throughout its service life.
        </p>
        {expanded && (
          <>
            <p>
              The main system types used in Australian flat roof ponding remediation are: single-ply thermally welded PVC-P membranes (Sika Sarnafil G 410, Protan SE 1.6) and liquid-applied PMMA systems (ARDEX W 800 RF). Torch-on bitumen, EPDM, and TPO systems are also used but are covered on separate pages. All systems on this page are AS 4654 compliant for external above-ground waterproofing.
            </p>
            <p>
              Selection depends on the existing roof construction, overlay compatibility, budget, installation method, geometry complexity, and the specification requirements for elongation, UV exposure, root resistance, and fire performance. Confirm the complete system specification with the project waterproofing consultant and the manufacturer before proceeding.
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

export function WaterproofingMembraneFlatRoofProductSection() {
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
              Single-ply vs liquid-applied selection, root resistance, lap welding vs monolithic, NCC requirements
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — waterproofing membrane systems for exposed flat roof ponding remediation</p>
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
              Side-by-side comparison of waterproofing membrane systems for exposed flat roof ponding remediation. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sika Sarnafil G 410</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Protan SE 1.6</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">ARDEX W 800 RF</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td>
                  <td className="px-4 py-3 text-slate-600">{row.sarnafil}</td>
                  <td className="px-4 py-3 text-slate-600">{row.protan}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ardex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
