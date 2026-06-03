"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Milcor"
  | "Gorter"
  | "Bilco"
  | "Aluminium"
  | "Spring-assist"
  | "Stainless-hardware"
  | "Counterbalance";

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
    tdsUrl: "https://www.milcor.com/products/roof-access-hatches/style-al/",
    accentColor: "#0369a1",
    name: "Milcor Style AL",
    descriptionLine: "Aluminium curb and cover roof access hatch; 600–1200mm square; continuous piano hinge; compression spring assist; EPDM gasket; padlockable latch; flush lid.",
    productType: "Single-leaf aluminium roof access hatch — spring assist — EPDM weatherseal",
    filterTags: ["Milcor", "Aluminium", "Spring-assist"],
    techChips: [
      { label: "Milcor", cls: "bg-sky-100 text-sky-800" },
      { label: "Aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Spring-assist", cls: "bg-green-50 text-green-700" },
      { label: "EPDM gasket", cls: "bg-amber-50 text-amber-700" },
      { label: "Padlockable latch", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Milcor Style AL is a single-leaf aluminium roof access hatch with an integral aluminium curb and flush aluminium cover, available in square sizes from 600×600mm to 1200×1200mm. The continuous piano hinge provides a full-width hinge line that distributes the opening load evenly and is more durable than point-hinge alternatives in high-frequency access applications. Compression spring assist reduces the effective opening force required by the maintenance operative — a compliance consideration for AS 1657 access requirements in Class 2 strata buildings. The EPDM compression gasket on the curb head provides a weathertight seal between the cover and curb that maintains performance over multiple open/close cycles. The padlockable latch allows the building manager to control roof access — a standard provision in strata buildings where roof access must be restricted to authorised personnel. The flush lid design avoids protruding hardware that could create a trip hazard in trafficked roof areas. The Style AL curb is designed for direct installation to the structural roof deck — on flat membrane roofs, the waterproofing must be terminated to and over the base of the curb by a licensed waterproofer. Milcor products are distributed in Australia through roofing and commercial building supply channels — confirm current stock and lead times with the local distributor.",
    technicalProperties: [
      "Single-leaf aluminium hatch — 600–1200mm square — aluminium curb and cover — flush lid design",
      "Continuous piano hinge — full-width hinge for even load distribution — suitable for high-frequency access",
      "Compression spring assist — reduces opening force — assists AS 1657 access compliance for maintenance personnel",
      "EPDM compression gasket — weathertight seal maintained over multiple open/close cycles",
      "Padlockable latch — strata-compliant restricted access provision",
      "Curb designed for installation to structural roof deck — waterproofing termination to curb base required",
      "Confirm current AS 1657 compliance, load rating, and size availability with Milcor distributor before ordering",
    ],
    limitations: [
      "Waterproofing termination to curb base is NOT supplied — a separate licensed waterproofer must design and install the membrane termination at the curb",
      "Spring assist reduces but may not eliminate the need for a fixed access ladder — confirm AS 1657 access requirements for the specific building configuration",
      "Padlock is NOT supplied with the unit — confirm padlock specification and key management protocol with building manager before ordering",
      "Aluminium curb and cover — not suitable where a fire-rated hatch is required — confirm fire resistance requirements with building surveyor",
      "Load rating must be confirmed for the specific size ordered — larger hatches have different load ratings — confirm with Milcor distributor",
      "Confirm current product specification, lead times, and distributor availability before ordering",
    ],
    procurementSources: [
      { name: "Milcor — trade supply via Australian distributors", url: "https://www.milcor.com" },
      { name: "Raven Products", url: "https://www.raven.com.au" },
      { name: "Allway Roofing", url: "https://www.allwayroofing.com.au" },
    ],
  },
  {
    fullLabel: "Gorter Hatches",
    brandUrl: "https://www.gortergroup.com",
    tdsUrl: "https://www.gortergroup.com/en/products/roof-hatches/hal-roof-hatch",
    accentColor: "#16a34a",
    name: "Gorter HAL Roof Hatch",
    descriptionLine: "Single-leaf aluminium hatch; 600×600 to 900×900mm; EPDM weatherseal; 304 stainless hardware; suitable for flat and curved roofs; concealed hinge.",
    productType: "Single-leaf aluminium roof hatch — stainless hardware — concealed hinge",
    filterTags: ["Gorter", "Aluminium", "Stainless-hardware"],
    techChips: [
      { label: "Gorter", cls: "bg-green-100 text-green-800" },
      { label: "Aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "304 stainless hardware", cls: "bg-green-50 text-green-700" },
      { label: "EPDM weatherseal", cls: "bg-amber-50 text-amber-700" },
      { label: "Concealed hinge", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Gorter HAL Roof Hatch is a single-leaf aluminium hatch with a concealed hinge design, available in square sizes from 600×600mm to 900×900mm, suitable for flat and curved roof applications in Class 2 strata buildings. The concealed hinge avoids exposed pivot hardware that could corrode in coastal and marine environments — a practical advantage for strata buildings in coastal Australian locations. All hardware is specified in 304 stainless steel, providing significantly better corrosion resistance than zinc-plated or painted mild steel hardware used in budget hatch products. The EPDM weatherseal on the curb head maintains a weathertight seal when the hatch is closed. The HAL is designed for installation on both flat membrane roofs and curved standing seam or profiled metal roofs — the curb base geometry can be factory-set to the specific roof pitch and profile, which eliminates the need for site-made wedge curbs. Gorter is a European manufacturer with an Australian distribution presence — confirm current stock, lead times, and the local distributor before specifying. On flat membrane roofs, the waterproofing must be terminated to and over the base of the curb by a licensed waterproofer. The HAL does not include a spring assist mechanism as standard — confirm the opening assistance specification with Gorter Australia if spring assist is required for AS 1657 compliance.",
    technicalProperties: [
      "Single-leaf aluminium hatch — 600×600 to 900×900mm — concealed hinge — no exposed pivot hardware",
      "304 stainless steel hardware — improved corrosion resistance for coastal and marine strata applications",
      "EPDM weatherseal — weathertight when closed — maintains seal integrity over repeated open/close cycles",
      "Suitable for flat and curved roof applications — curb base can be factory-set to specific roof pitch and profile",
      "Concealed hinge design — suitable for coastal environments where exposed hardware would be subject to accelerated corrosion",
      "Waterproofing termination to curb base required on flat membrane roofs",
      "Confirm spring assist availability and AS 1657 compliance with Gorter Australia before specifying",
    ],
    limitations: [
      "Spring assist is NOT standard on HAL — confirm if spring assist is required for AS 1657 compliance and specify accordingly",
      "Maximum size 900×900mm — for larger hatches up to 1200×1200mm, the Milcor Style AL or Bilco E-50TB may be more appropriate",
      "Waterproofing termination to curb base is NOT supplied — a separate licensed waterproofer must design and install the membrane termination",
      "European manufacturer — confirm Australian stock availability and lead times before specifying — some sizes may be subject to extended lead times",
      "Not a fire-rated hatch — confirm fire resistance requirements with building surveyor before specifying",
      "Confirm current product specification and local distributor with Gorter Australia before ordering",
    ],
    procurementSources: [
      { name: "Gorter Hatches — Australian distributor", url: "https://www.gortergroup.com" },
      { name: "Access Products Australia", url: "https://www.accessproducts.com.au" },
    ],
  },
  {
    fullLabel: "Bilco",
    brandUrl: "https://www.bilco.com",
    tdsUrl: "https://www.bilco.com/Products/Roof-Access-Hatches/E-50TB",
    accentColor: "#7c2d12",
    name: "Bilco E-50TB",
    descriptionLine: "Aluminium escape hatch/roof access; 24\"×36\" (610×914mm) standard; double seal; compression spring counterbalance; UL listed; optional exterior ladder.",
    productType: "Aluminium escape-rated roof access hatch — counterbalance spring — double-sealed",
    filterTags: ["Bilco", "Aluminium", "Counterbalance"],
    techChips: [
      { label: "Bilco", cls: "bg-orange-100 text-orange-800" },
      { label: "Aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Counterbalance spring", cls: "bg-green-50 text-green-700" },
      { label: "Double-sealed", cls: "bg-amber-50 text-amber-700" },
      { label: "UL listed", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Bilco E-50TB is a single-leaf aluminium roof access hatch rated as an escape hatch, available in the standard 24\"×36\" (610×914mm) size. It is classified by Bilco as an egress unit — a distinction from standard access hatches — and is UL listed, which provides a recognised third-party compliance certification relevant where an egress-rated hatch is required in the building consent documentation. The double-seal design — comprising a primary weatherstrip and a secondary interior seal — provides superior weather protection compared to single-seal products and reduces air infiltration into the conditioned space below. The compression spring counterbalance mechanism allows the hatch to open and stay open without manual effort after the initial lift — a significant operational advantage for emergency egress and for maintenance personnel working alone on the roof. The optional exterior ladder provision allows integration of a fixed access ladder to AS 1657 for strata buildings where roof access is required as a means of egress or fire service access. On flat membrane roofs, the waterproofing must be terminated to and over the base of the curb by a licensed waterproofer. The Bilco E-50TB follows a different compliance path to the Milcor Style AL and Gorter HAL — the UL listing and escape rating make it appropriate where a higher compliance standard is specified or required by the building consent authority.",
    technicalProperties: [
      "Single-leaf aluminium escape-rated roof access hatch — 610×914mm standard — UL listed",
      "Double-seal design — primary weatherstrip and secondary interior seal — reduced air infiltration and superior weather protection",
      "Compression spring counterbalance — hatch opens and stays open without manual effort — suitable for emergency egress",
      "Optional exterior ladder provision — integration with AS 1657 fixed access ladder for strata roof access compliance",
      "Escape-rated design — appropriate where egress-rated hatch is required in building consent documentation",
      "Aluminium construction — low maintenance — suitable for Australian climate conditions",
      "Confirm current Australian compliance and building code acceptability with Bilco Australia before specifying",
    ],
    limitations: [
      "Standard size is 610×914mm — confirm this size meets the AS 1657 clear opening requirement for the specific building configuration",
      "UL listing is a US certification — confirm Australian building consent acceptance of UL listing as evidence of compliance with the building surveyor before specifying",
      "Waterproofing termination to curb base is NOT supplied — a separate licensed waterproofer must design and install the membrane termination on flat roof applications",
      "Escape-rated unit — confirm whether the escape hatch classification is required or appropriate for the specific project — do not over-specify if a standard access hatch is sufficient",
      "Exterior ladder is optional — confirm whether a fixed access ladder is required to meet AS 1657 and order accordingly",
      "Confirm current product specification, Australian availability, and local distributor with Bilco before ordering",
    ],
    procurementSources: [
      { name: "Bilco — trade supply via Australian distributors", url: "https://www.bilco.com" },
      { name: "Access Products Australia", url: "https://www.accessproducts.com.au" },
      { name: "Raven Products", url: "https://www.raven.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Milcor", label: "Milcor" },
  { id: "Gorter", label: "Gorter" },
  { id: "Bilco", label: "Bilco" },
];

const SYSTEM_COMPARISON: {
  sizeRange: string;
  springType: string;
  weatherseal: string;
  hardware: string;
  product: string;
}[] = [
  {
    product: "Milcor Style AL",
    sizeRange: "600–1200mm square",
    springType: "Compression spring assist",
    weatherseal: "EPDM compression gasket",
    hardware: "Aluminium / padlockable latch",
  },
  {
    product: "Gorter HAL",
    sizeRange: "600×600 to 900×900mm",
    springType: "Confirm with Gorter — not standard",
    weatherseal: "EPDM weatherseal",
    hardware: "304 stainless steel — concealed hinge",
  },
  {
    product: "Bilco E-50TB",
    sizeRange: "610×914mm standard",
    springType: "Compression spring counterbalance",
    weatherseal: "Double-seal — primary + secondary",
    hardware: "Aluminium — UL listed hardware",
  },
];

const TECH_INFO = [
  "AS 1657 fixed platforms — hatch sizing and access requirements — minimum clear opening dimensions must be confirmed for the specific building configuration and use case",
  "Waterproofing around hatch curb on flat roofs — membrane must be terminated to and over the curb base by a licensed waterproofer — this is separate scope from hatch supply and installation",
  "Wind uplift and load rating requirements for roof hatches — confirm structural capacity of the roof deck and curb attachment for the hatch size and wind zone",
  "Security lock provisions for strata roof access — padlockable latch is standard on most aluminium hatches — confirm key management protocol and master key system with building manager",
];

const BRAND_EQUIV = [
  "Milcor Style AL ≈ Gorter HAL — both single-leaf aluminium roof hatches with EPDM weatherseal, suitable for flat and low-pitch strata roofs",
  "Bilco E-50TB — escape-rated unit with counterbalance spring and double seal — different compliance path to Milcor and Gorter standard access hatches",
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

export function AluminiumHatchIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are aluminium roof access hatch systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Aluminium roof access hatches provide code-compliant, weather-tight access to flat and low-pitched roofs in Class 2 strata buildings for maintenance personnel. Units from Milcor and Gorter comply with AS 1657 fixed platforms and stairways requirements and include security locks, gasket seals and integral lifting handles.
        </p>
        {expanded && (
          <>
            <p>
              Product selection must consider the required clear opening size per AS 1657, whether spring assist or counterbalance is required for single-person operation, the corrosion resistance of hardware for the building's exposure environment, and whether the hatch must meet an egress or escape-rated standard under the building consent conditions.
            </p>
            <p>
              On flat membrane roofs, the waterproofing detail at the hatch curb base is a critical defect point. The membrane must be terminated and dressed over the curb by a licensed waterproofer — this work is separate from the hatch supply and installation and must be programmed accordingly. The hatch curb must be installed before the membrane is applied around it.
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

export function AluminiumHatchProductSection() {
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
              AS 1657 requirements, waterproofing at curb, brand equivalencies
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
          <div className="border-t border-slate-100 px-7 pb-7 pt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <TechCard
                icon={<Layers size={15} />}
                title="Technical Information"
                items={TECH_INFO}
                style="bullet"
              />
              <TechCard
                icon={<Ruler size={15} />}
                title="Brand Equivalencies"
                items={BRAND_EQUIV}
                style="check"
              />
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
            <p className="mt-1 text-sm text-slate-500">3 products — aluminium roof access hatch systems — scroll to view all</p>
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
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
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
              Side-by-side comparison of aluminium roof access hatch systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Size range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Spring type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weatherseal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Hardware</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sizeRange}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.springType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.weatherseal}</td>
                  <td className="px-4 py-3 text-slate-600">{row.hardware}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
