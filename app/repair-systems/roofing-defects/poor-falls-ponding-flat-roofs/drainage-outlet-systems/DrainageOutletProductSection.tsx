"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Stainless-steel"
  | "Blucher"
  | "Geberit"
  | "Siphonic"
  | "HL-Hutterer"
  | "Adjustable"
  | "Cast-iron";

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
    fullLabel: "Blucher Australia",
    brandUrl: "https://www.blucher.com.au",
    tdsUrl: "https://www.blucher.com.au/products/roof-drains/",
    accentColor: "#f97316",
    name: "Blucher Marine Drain D500",
    descriptionLine: "Stainless steel AISI 316 flat roof drain; 50–100mm outlets; adjustable top with sealing clamping ring; integrated sump; accepts all membrane types",
    productType: "Stainless steel flat roof drain — AISI 316 — adjustable",
    filterTags: ["Stainless-steel", "Blucher", "Adjustable"],
    techChips: [
      { label: "Stainless-steel AISI 316", cls: "bg-orange-100 text-orange-800" },
      { label: "Adjustable", cls: "bg-slate-100 text-slate-700" },
      { label: "50–100mm outlets", cls: "bg-green-50 text-green-700" },
      { label: "Integrated sump", cls: "bg-slate-100 text-slate-700" },
      { label: "All membrane types", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Blucher Marine Drain D500 is a stainless steel AISI 316 flat roof drain designed for both gravity and low-slope roof drainage applications. The AISI 316 grade provides superior corrosion resistance compared to AISI 304, making it suitable for exposed coastal environments common in Australian strata and residential flat roof applications. The adjustable top assembly allows the drain grate to be set flush with the finished surface, accommodating variations in membrane thickness and overlay depth. The sealing clamping ring at the membrane connection point accepts all common flat roof membrane types — bituminous, single-ply PVC-P and TPO, and liquid-applied systems — by clamping the membrane between the lower body flange and the upper clamping ring. Integrated sump body provides the required depression at the drainage point to direct water to the outlet efficiently. Outlet sizes 50mm to 100mm suit the majority of flat roof drainage calculations per AS/NZS 3500.3. The debris strainer must be specified and installed to maintain AS/NZS 3500.3 strainer area requirements (strainer open area must equal at least 4 times the outlet pipe area). Confirm current product range, sizes, and installation requirements with Blucher Australia.",
    technicalProperties: [
      "Stainless steel AISI 316 body and grate — superior corrosion resistance for exposed and coastal environments",
      "Adjustable top assembly — grate set flush with finished surface accommodating membrane and overlay thickness",
      "Sealing clamping ring — accepts bituminous, single-ply (PVC-P, TPO), and liquid-applied membrane types",
      "Integrated sump body — provides drainage depression for efficient water collection",
      "Outlet sizes DN50–DN100 — suitable for gravity flat roof drainage per AS/NZS 3500.3",
      "Debris strainer included — confirm strainer open area ≥ 4× pipe area with AS/NZS 3500.3",
      "Confirm current product range and sizes with Blucher Australia",
    ],
    limitations: [
      "Not a siphonic system — gravity drainage only; for large roof areas where siphonic drainage is required, specify Geberit Pluvia",
      "Confirm outlet size against AS/NZS 3500.3 rainfall intensity calculations for the specific roof area and location",
      "Debris strainer must be maintained regularly to prevent blockage — confirm maintenance access requirements with building management",
      "Adjustable height range must be confirmed before installation against the finished surface level",
      "Confirm membrane compatibility at clamping ring detail with the membrane manufacturer before installation",
      "Confirm current product specification with Blucher Australia before specifying",
    ],
    procurementSources: [
      { name: "Blucher Australia — trade supply", url: "https://www.blucher.com.au" },
      { name: "Reece Plumbing", url: "https://www.reece.com.au" },
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
      { name: "Specialist roofing and drainage suppliers", url: "https://www.blucher.com.au" },
    ],
  },
  {
    fullLabel: "Geberit Australia",
    brandUrl: "https://www.geberit.com.au",
    tdsUrl: "https://www.geberit.com.au/products/drainage-systems/roof-drainage/pluvia-roof-drainage/",
    accentColor: "#0369a1",
    name: "Geberit Pluvia Flat Roof Drain",
    descriptionLine: "Siphonic roof drainage outlet; DN75–DN110; integrated WP flange; chrome-plated ABS or stainless steel strainer; vacuum-tight membrane connection",
    productType: "Siphonic roof drainage outlet — DN75–DN110",
    filterTags: ["Siphonic", "Geberit", "Stainless-steel"],
    techChips: [
      { label: "Siphonic", cls: "bg-sky-100 text-sky-800" },
      { label: "DN75–DN110", cls: "bg-slate-100 text-slate-700" },
      { label: "Integrated WP flange", cls: "bg-green-50 text-green-700" },
      { label: "Vacuum-tight", cls: "bg-slate-100 text-slate-700" },
      { label: "Stainless steel strainer option", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Geberit Pluvia is a siphonic roof drainage outlet designed to operate as part of a complete siphonic roof drainage system. Unlike gravity drain outlets which rely on partially filled pipes and atmospheric drainage, the Pluvia system is designed to fill the horizontal drainage pipes completely, creating a siphonic action that dramatically increases the hydraulic capacity of smaller pipe diameters — enabling fewer, smaller outlets to drain large roof areas. This is a significant advantage on large commercial flat roofs where the number of penetrations through the roof membrane is to be minimised. The siphonic system requires specific pipe sizing by a hydraulic engineer using siphonic drainage design software — it cannot be sized using the gravity drainage tables in AS/NZS 3500.3. The integrated waterproofing flange at the base of the drain collar provides a positive membrane connection that is designed to be vacuum-tight under siphonic operating conditions. Strainer options include chrome-plated ABS and stainless steel. Geberit Pluvia must be installed as part of a complete Geberit Pluvia system design — the outlet cannot be used as a simple gravity drain replacement without the correct siphonic system design. Confirm system design and outlet selection with Geberit Australia and a hydraulic engineer.",
    technicalProperties: [
      "Siphonic roof drainage outlet — fills horizontal drainage pipes completely to create siphonic action",
      "DN75–DN110 outlet sizes — suitable for siphonic system design",
      "Integrated waterproofing flange — vacuum-tight membrane connection",
      "Chrome-plated ABS or stainless steel strainer options",
      "Enables larger roof areas to be drained with fewer, smaller outlets compared to gravity systems",
      "Must be designed by hydraulic engineer using siphonic drainage design software — not sized per AS/NZS 3500.3 gravity tables",
      "Confirm system design with Geberit Australia and project hydraulic engineer before specifying",
    ],
    limitations: [
      "Siphonic system — cannot be installed as a simple gravity drain; the complete siphonic system must be designed by a hydraulic engineer using Geberit design software",
      "Higher upfront design and installation cost than gravity drainage — justified on large commercial roofs where outlet number reduction is required",
      "Requires maintenance expertise — blockages or air entry points can disrupt siphonic action and compromise drainage performance",
      "Not suitable as a replacement outlet in an existing gravity drainage system without complete drainage redesign",
      "Confirm AS/NZS 3500.3 compliance pathway for siphonic systems with the project hydraulic engineer",
      "Confirm current product specification with Geberit Australia before specifying",
    ],
    procurementSources: [
      { name: "Geberit Australia — trade supply", url: "https://www.geberit.com.au" },
      { name: "Reece Plumbing", url: "https://www.reece.com.au" },
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
    ],
  },
  {
    fullLabel: "HL Hutterer & Lechner",
    brandUrl: "https://www.hutterer-lechner.com",
    tdsUrl: "https://www.hutterer-lechner.com/en/products/roof-drains/",
    accentColor: "#16a34a",
    name: "HL Hutterer HL62N Roof Drain",
    descriptionLine: "Cast iron or stainless AISI 316 flat roof drain; DN50–DN200; adjustable height; integrated bitumen/sheet membrane clamping flange; UV-resistant grate",
    productType: "Cast iron or stainless flat roof drain — DN50–DN200 — adjustable height",
    filterTags: ["Cast-iron", "HL-Hutterer", "Adjustable"],
    techChips: [
      { label: "Cast-iron or AISI 316", cls: "bg-green-100 text-green-800" },
      { label: "Adjustable height", cls: "bg-slate-100 text-slate-700" },
      { label: "DN50–DN200", cls: "bg-green-50 text-green-700" },
      { label: "Membrane clamping flange", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-resistant grate", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The HL Hutterer HL62N is a flat roof drain available in cast iron or stainless steel AISI 316, designed for gravity drainage of flat roofs and balconies. The wide outlet size range — DN50 to DN200 — makes it one of the most versatile products in this category, suitable from small balcony applications through to large commercial roof drainage scenarios. The adjustable height collar allows the top of the drain to be set flush with the finished surface after membrane and overlay installation, accommodating a range of build-up depths. The integrated bituminous and sheet membrane clamping flange is designed to accept torch-on bitumen, cold self-adhesive sheet, and single-ply sheet membranes — the membrane is clamped mechanically between the lower body flange and the upper clamping ring, providing a robust, reliable waterproof connection at the most critical junction in a flat roof assembly. The UV-resistant polypropylene grate is suitable for exposed applications without a separate overlay. Cast iron provides high compression resistance for drains in trafficked areas; stainless AISI 316 provides corrosion resistance in coastal and chemical environments. Confirm outlet sizing against AS/NZS 3500.3 rainfall intensity calculations for the specific roof area and location.",
    technicalProperties: [
      "Cast iron or stainless steel AISI 316 body — wide material choice for environment and load requirements",
      "DN50–DN200 outlet range — versatile coverage from small balcony to large commercial roof",
      "Adjustable height collar — accommodates membrane and overlay build-up depth",
      "Integrated bituminous and sheet membrane clamping flange — torch-on, cold-applied, and single-ply membrane compatible",
      "UV-resistant polypropylene grate — suitable for exposed applications",
      "Gravity drainage system — size per AS/NZS 3500.3 rainfall intensity tables",
      "Confirm product range, materials, and outlet sizes with HL Hutterer Australia distributor",
    ],
    limitations: [
      "Gravity drain only — not a siphonic system; for siphonic drainage design specify Geberit Pluvia",
      "Confirm outlet size against AS/NZS 3500.3 rainfall intensity for the specific roof area and location",
      "Clamping flange detail must be correctly installed with membrane — confirm installation method with HL Hutterer technical and membrane manufacturer",
      "Debris strainer must be maintained regularly — confirm maintenance access with building management",
      "Cast iron is heavy — confirm structural support at drain location before installation",
      "Confirm current product specification and Australian distributor with HL Hutterer before specifying",
    ],
    procurementSources: [
      { name: "HL Hutterer — Australian distributors (confirm current network)", url: "https://www.hutterer-lechner.com" },
      { name: "Specialist roofing and drainage suppliers", url: "https://www.hutterer-lechner.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Stainless-steel", label: "Stainless-steel" },
  { id: "Siphonic", label: "Siphonic" },
  { id: "Adjustable", label: "Adjustable" },
];

const BRAND_EQUIV = [
  {
    a: "Blucher D500",
    b: "HL Hutterer HL62N",
    note: "Both are gravity drains with integrated membrane clamping flanges accepting all common roofing membrane types. Blucher D500 is AISI 316 stainless only; HL62N is available in cast iron or AISI 316 with a wider outlet size range (DN50–DN200).",
  },
  {
    a: "Geberit Pluvia",
    b: "— siphonic system —",
    note: "Siphonic drainage operates on different hydraulic principles to gravity drains. Geberit Pluvia requires complete system design by a hydraulic engineer and cannot substitute for a gravity drain without full drainage redesign.",
  },
  {
    a: "All three products",
    b: "— membrane connection —",
    note: "All three accept standard waterproofing membrane clamping connections — bituminous, single-ply, and liquid-applied membranes. Confirm the specific clamping detail with the drain manufacturer and the membrane manufacturer before installation.",
  },
];

const SYSTEM_COMPARISON: {
  attribute: string;
  blucher: string;
  geberit: string;
  hl: string;
}[] = [
  {
    attribute: "Drain type",
    blucher: "Gravity — flat roof",
    geberit: "Siphonic — full-bore",
    hl: "Gravity — flat roof",
  },
  {
    attribute: "Outlet size",
    blucher: "DN50–DN100",
    geberit: "DN75–DN110",
    hl: "DN50–DN200",
  },
  {
    attribute: "Material",
    blucher: "Stainless steel AISI 316",
    geberit: "ABS / stainless steel strainer",
    hl: "Cast iron or stainless AISI 316",
  },
  {
    attribute: "Membrane connection",
    blucher: "Sealing clamping ring — all membrane types",
    geberit: "Integrated WP flange — vacuum-tight",
    hl: "Membrane clamping flange — bitumen and sheet",
  },
];

const TECH_INFO = [
  {
    title: "Gravity vs siphonic roof drainage selection",
    items: [
      "Gravity drainage relies on partially filled pipes flowing under atmospheric pressure — sized using AS/NZS 3500.3 rainfall intensity tables based on roof area, location, and design storm event",
      "Siphonic drainage fills horizontal pipes completely — creating a siphonic (vacuum-assisted) flow that allows smaller pipe diameters to drain much larger roof areas with fewer outlets",
      "Gravity drainage is the standard choice for all residential and small commercial flat roofs — simple to design, install, and maintain",
      "Siphonic drainage is justified on large commercial flat roofs where minimising the number of vertical downpipes or roof penetrations is a priority",
      "Siphonic systems require specialist hydraulic design using manufacturer-specific software — they cannot be sized from AS/NZS 3500.3 gravity tables",
      "In ponding remediation on existing roofs, gravity drainage replacement is the typical approach — siphonic systems require significant hydraulic redesign of the entire drainage network",
    ],
    icon: "bullet" as const,
  },
  {
    title: "Outlet sizing per AS/NZS 3500.3 rainfall intensity",
    items: [
      "AS/NZS 3500.3 (Plumbing and Drainage — Stormwater Drainage) provides the design standard for roof drainage outlet sizing in Australia",
      "Outlet sizing is based on the roof catchment area, the design rainfall intensity for the building location (in mm/hr), and the design storm return period (typically 1 in 20 year for roofs)",
      "BOM (Bureau of Meteorology) rainfall intensity data is required for the specific location — rainfall intensity varies significantly across Australian climate zones",
      "Minimum outlet size of DN75 is commonly specified for flat roofs — confirm with AS/NZS 3500.3 calculations for the specific project",
      "The strainer open area must be at least 4 times the pipe cross-sectional area (AS/NZS 3500.3) to prevent blockage reducing drainage capacity below design flow",
      "Confirm outlet sizing calculations with the project hydraulic engineer — do not assume a standard outlet size without calculation",
    ],
    icon: "check" as const,
  },
  {
    title: "Membrane compatibility at outlet junction (clamping flange vs solvent welded collar)",
    items: [
      "The outlet junction is the highest-risk waterproofing detail in a flat roof — membrane failure at the drain is a common source of water ingress",
      "Clamping flange systems mechanically compress the membrane between the lower body flange and the upper clamping ring — suitable for sheet membranes (bitumen, single-ply) and liquid-applied membranes terminated at the collar",
      "Solvent-welded collar systems (common in single-ply PVC-P) bond the membrane directly to the drain collar by hot-air or solvent welding — provides a seamless, monolithic connection",
      "Confirm the drain's membrane connection method compatibility with the specific membrane product and system before specifying — not all drain flanges accept all membrane types",
      "Liquid-applied membranes (PMMA, PU) are applied over and around the drain collar — confirm the collar surface preparation and primer requirement with the membrane manufacturer",
      "All drain-membrane junctions must be inspected as a hold point during installation — photographic evidence is recommended for warranty compliance",
    ],
    icon: "warn" as const,
  },
  {
    title: "Sump depth requirements for flat roof drainage",
    items: [
      "A roof sump is a localised depression formed in or below the roof membrane at the drainage outlet — it ensures that water is collected and directed to the drain even when the roof surface is nearly level",
      "Standard sump depth is 50–150mm below the finished roof surface at the drain — the sump creates a collection area that prevents water from bypassing the outlet on very flat or slightly ponding surfaces",
      "Where fall correction with screed or tapered insulation has been applied, the sump depth must be re-established at the drain location to ensure drainage continues to function correctly",
      "On existing flat roofs where ponding remediation is being carried out, raising the roof level with screed may reduce or eliminate the existing sump — confirm sump depth is maintained or re-created in the remediation design",
      "Sump depth and configuration must be confirmed by the project hydraulic engineer — inadequate sump depth is a common cause of persistent ponding after remediation",
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

export function DrainageOutletIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are flat roof drainage outlet and sump systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Flat roof drainage outlets collect ponding water from the roof surface and direct it into the building's stormwater drainage system. On flat roofs where ponding occurs, the outlet — together with its associated sump depression — is the critical component that ensures water is removed efficiently. Incorrectly sized, blocked, or poorly detailed outlets are a primary cause of persistent ponding on flat roofs even where falls have been corrected.
        </p>
        {expanded && (
          <>
            <p>
              Roof drainage outlets are classified as either gravity drains (Blucher D500, HL Hutterer HL62N) or siphonic drains (Geberit Pluvia). Gravity drains rely on partially filled pipes flowing under atmospheric pressure. Siphonic drains fill horizontal pipes completely, achieving much higher flow rates at smaller pipe diameters — but require specialist hydraulic design.
            </p>
            <p>
              All flat roof drainage outlets must comply with AS/NZS 3500.3 (Plumbing and Drainage — Stormwater Drainage) for sizing and strainer area requirements. The waterproofing membrane connection at the outlet collar is the most critical detail in any flat roof waterproofing system — membrane failure at the drain is the leading cause of water ingress in ponding-remediated flat roofs.
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

export function DrainageOutletProductSection() {
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
              Gravity vs siphonic selection, AS/NZS 3500.3 sizing, membrane junction detailing, sump depth
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — flat roof drainage outlet and sump systems</p>
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
              Side-by-side comparison of flat roof drainage outlet systems. Confirm all product selections against the current manufacturer TDS and AS/NZS 3500.3 before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Blucher D500</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Geberit Pluvia</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">HL Hutterer HL62N</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td>
                  <td className="px-4 py-3 text-slate-600">{row.blucher}</td>
                  <td className="px-4 py-3 text-slate-600">{row.geberit}</td>
                  <td className="px-4 py-3 text-slate-600">{row.hl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
