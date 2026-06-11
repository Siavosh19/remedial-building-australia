"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Aluminium"
  | "Alproc"
  | "Adjustable"
  | "Stainless-steel"
  | "Blucher"
  | "Coastal";

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
    fullLabel: "Alproc Australia",
    brandUrl: "https://www.alproc.com.au",
    tdsUrl: "https://www.alproc.com.au",
    accentColor: "#16a34a",
    name: "Alproc Weir Overflow Outlet",
    descriptionLine: "Aluminium alloy weir body; adjustable weir blade ±30mm; 150–300mm width; integral membrane flange; powder-coated in Colorbond range",
    productType: "Aluminium weir overflow outlet — adjustable — powder-coated Colorbond",
    filterTags: ["Aluminium", "Alproc", "Adjustable"],
    techChips: [
      { label: "Aluminium", cls: "bg-green-100 text-green-800" },
      { label: "Alproc", cls: "bg-slate-100 text-slate-700" },
      { label: "Adjustable weir ±30mm", cls: "bg-green-50 text-green-700" },
      { label: "150–300mm width", cls: "bg-slate-100 text-slate-700" },
      { label: "Colorbond powder-coat", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Alproc Weir Overflow Outlet is an aluminium alloy weir body fitted with an adjustable weir blade that can be raised or lowered ±30mm from the nominal setting, allowing precise on-site calibration of the overflow activation level above the primary drain. The weir body is available in widths from 150mm to 300mm, providing flexibility in hydraulic capacity to suit varying roof areas and design rainfall intensities as calculated under AS/NZS 3500.3. The integral membrane flange provides a positive connection point for waterproofing membrane installation — liquid-applied and sheet membranes can be bonded directly to the flange. The powder-coat finish is available in the Colorbond range, allowing the outlet to be colour-matched to box gutter linings, roof flashings, and cladding. Suitable for box gutters, parapet-bounded flat roofs, and internal gutter overflow applications. Confirm current product specifications, weir blade adjustment range, and membrane compatibility with Alproc Australia before specifying.",
    technicalProperties: [
      "Aluminium alloy body — adjustable weir blade ±30mm — precise on-site overflow level calibration",
      "Width range 150–300mm — hydraulic capacity to suit varying roof areas per AS/NZS 3500.3",
      "Integral membrane flange — positive connection for liquid-applied and sheet waterproofing membranes",
      "Powder-coated in Colorbond range — colour-match to box gutter linings and roof flashings",
      "Suitable for box gutters, flat roofs, and internal gutter overflow applications",
      "Adjustability allows for membrane and screed thickness accommodation during installation",
      "Confirm current product range, adjustment mechanism, and specifications with Alproc Australia",
    ],
    limitations: [
      "Aluminium — confirm suitability for coastal and marine environments — may require anodising or marine-grade coating in severe coastal zones",
      "Adjustable weir blade must be locked at the correct position after calibration — confirm locking mechanism with Alproc before installation",
      "Width selection must be confirmed against hydraulic capacity calculation — wider weir does not automatically guarantee AS/NZS 3500.3 compliance",
      "Integral membrane flange must be compatible with the specified membrane system — confirm with Alproc and the membrane manufacturer",
      "Powder-coat finish is not an indefinitely maintenance-free finish in harsh UV environments — confirm expected service life with Alproc",
      "Confirm current product specifications, weir blade range, and availability with Alproc Australia before ordering",
    ],
    procurementSources: [
      { name: "Alproc Australia — trade supply", url: "https://www.alproc.com.au" },
      { name: "Specialised Roofing Supplies", url: "https://www.specialisedroofing.com.au" },
    ],
  },
  {
    fullLabel: "Blucher Australia",
    brandUrl: "https://www.blucher.com.au",
    tdsUrl: "https://www.blucher.com.au",
    accentColor: "#0369a1",
    name: "Blucher Weir Drain W400",
    descriptionLine: "AISI 316 stainless steel weir outlet; DN100 outlet; integrated clamping ring for sheet membranes; corrosion-resistant for coastal environments",
    productType: "Stainless steel weir overflow outlet — DN100 — coastal grade AISI 316",
    filterTags: ["Stainless-steel", "Blucher", "Coastal"],
    techChips: [
      { label: "Stainless-steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Blucher", cls: "bg-slate-100 text-slate-700" },
      { label: "AISI 316", cls: "bg-green-50 text-green-700" },
      { label: "DN100 outlet", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal environments", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Blucher Weir Drain W400 is a stainless steel weir overflow outlet manufactured from AISI 316 stainless steel, designed for use in flat roof and box gutter overflow applications where corrosion resistance is a primary selection criterion. AISI 316 provides significantly better resistance to chloride corrosion compared to 304-grade stainless steel, making the W400 the appropriate specification for buildings in coastal and marine environments where salt-laden air accelerates corrosion of standard drainage fittings. The DN100 outlet connects to the discharge drainage system, and the integrated clamping ring provides a positive mechanical seal for sheet waterproofing membranes — the membrane is clamped between the weir body and the clamping ring to form a watertight seal without relying solely on adhesive. The W400 is suitable for high-specification commercial roofing and flat roof applications in coastal locations, premium developments, and where a stainless steel overflow outlet is preferred over aluminium for longevity and corrosion resistance. Confirm current product specifications, weir height setting, and membrane clamping ring compatibility with Blucher Australia before specifying.",
    technicalProperties: [
      "AISI 316 stainless steel body — superior chloride corrosion resistance for coastal and marine environments",
      "DN100 outlet — connects to discharge drainage system — confirm discharge routing and capacity",
      "Integrated clamping ring — positive mechanical seal for sheet waterproofing membranes",
      "Suitable for flat roofs, box gutters, and parapet overflow applications in coastal locations",
      "Corrosion-resistant construction — suitable for long service life in aggressive exposure environments",
      "High-specification alternative to aluminium weir for coastal and premium applications",
      "Confirm current product specifications, weir height setting, and installation details with Blucher Australia",
    ],
    limitations: [
      "Higher cost than aluminium weir alternatives — AISI 316 stainless steel carries a material cost premium over powder-coated aluminium",
      "Weir height may be fixed or have limited adjustment — confirm adjustment range with Blucher before specifying where fine calibration is required",
      "Integrated clamping ring is designed for sheet membranes — confirm compatibility with liquid-applied membrane systems with Blucher technical",
      "DN100 outlet size must be confirmed against hydraulic capacity calculation for the roof area — confirm with a hydraulic engineer",
      "AISI 316 is the appropriate grade for coastal use but confirm with Blucher for severe marine environments (beachfront, splash zone)",
      "Confirm current product range, DN options, and specifications with Blucher Australia before ordering",
    ],
    procurementSources: [
      { name: "Blucher Australia — trade supply", url: "https://www.blucher.com.au" },
      { name: "Reece Plumbing", url: "https://www.reece.com.au" },
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Aluminium", label: "Aluminium" },
  { id: "Stainless-steel", label: "Stainless-steel" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  weirWidth: string;
  adjustment: string;
  membraneConnection: string;
}[] = [
  {
    product: "Weir Overflow Outlet",
    brand: "Alproc",
    material: "Aluminium alloy — powder-coated Colorbond",
    weirWidth: "150–300mm — selection by hydraulic requirement",
    adjustment: "Adjustable weir blade ±30mm",
    membraneConnection: "Integral membrane flange — liquid and sheet membranes",
  },
  {
    product: "Weir Drain W400",
    brand: "Blucher",
    material: "AISI 316 stainless steel",
    weirWidth: "DN100 outlet — confirm weir face width with Blucher",
    adjustment: "Confirm adjustment range with Blucher",
    membraneConnection: "Integrated clamping ring — sheet membranes",
  },
];

const BRAND_EQUIV = [
  "Alproc — aluminium weir, adjustable ±30mm, Colorbond finish options — suitable for standard and architectural flat roof and box gutter overflow applications.",
  "Blucher W400 — stainless steel weir, suited to coastal, marine, and premium applications where AISI 316 corrosion resistance is required.",
];

const TECH_INFO = {
  weirVsOther: [
    "Weir overflow outlets differ from scupper outlets in that the overflow occurs over a controlled spill edge (the weir blade) rather than through an open-face hole in the parapet",
    "Weir overflow outlets differ from pipe overflow systems in that overflow discharges over the weir blade, not through a pipe set at the activation height",
    "Weir systems are well suited to box gutters where a low-profile overflow device is required at the overflow activation level within the gutter",
    "Select weir, scupper, or pipe overflow based on the specific roof geometry, gutter configuration, hydraulic design, and architectural requirements",
    "Confirm overflow system type selection with a hydraulic engineer or experienced roofing consultant before specifying",
  ],
  settingHeight: [
    "Weir activation level is determined by the height of the weir blade above the box gutter or roof surface at the point of installation",
    "AS/NZS 3500.3 requires the overflow activation level to be 25–50mm above the primary drain invert — the weir blade must be set accordingly",
    "Box gutter minimum freeboard requirements must be confirmed — 50mm minimum freeboard is typical — confirm with AS/NZS 3500.3 and the hydraulic engineer",
    "Adjustable weir systems allow precise on-site calibration — lock the weir blade at the correct level before completing waterproofing works",
    "Confirm final weir height with the hydraulic engineer before commissioning the roof drainage system",
  ],
  membraneIntegration: [
    "Waterproofing membrane must be continuously sealed to the weir overflow body — no gap or bridge is permitted at the junction",
    "Integral membrane flanges (Alproc) allow liquid-applied and sheet membranes to be bonded directly to the weir body flange",
    "Clamping ring systems (Blucher W400) provide a mechanical seal for sheet membranes — the membrane is clamped between the body and ring",
    "Confirm membrane compatibility with the weir outlet body material — aluminium or stainless steel — and with the specific membrane adhesive or primer",
    "All membrane terminations at weir overflow bodies must be flood-tested before the roof is handed over",
  ],
  coastalSelection: [
    "In coastal and marine environments, aluminium overflow outlets may corrode prematurely if the powder-coat finish is damaged or if unsuitable alloy grades are used",
    "AISI 316 stainless steel (Blucher W400) provides superior chloride corrosion resistance compared to aluminium in coastal environments",
    "For buildings within 1km of the coast (or in splash zones), specify AISI 316 stainless steel weir outlets as the default material",
    "Confirm coastal exposure category with the project structural engineer or building surveyor — NCC and AS 4312 define corrosivity zones for Australian locations",
    "Anodised aluminium provides better corrosion resistance than powder-coated aluminium in coastal zones — confirm with Alproc if aluminium is preferred",
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

export function WeirOverflowIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are weir overflow systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Weir overflow outlets are proprietary secondary drainage devices that provide a controlled spill edge at a precise water level above the primary drain. Unlike scupper outlets that discharge through an open face in the parapet wall, a weir outlet spills water over an adjustable weir blade when the water level rises to the overflow activation height — typically 25–50mm above the primary drain invert as required by AS/NZS 3500.3.
        </p>
        {expanded && (
          <>
            <p>
              Weir systems are particularly well suited to box gutters and flat roof areas where a low-profile, internally installed overflow device is preferred over a through-wall scupper or pipe. The adjustable weir blade allows precise calibration of the overflow level on site, accommodating variation in membrane thickness and substrate level. Aluminium (Alproc) and stainless steel (Blucher W400) are the two primary material options — material selection depends on exposure environment, aesthetic requirements, and membrane compatibility.
            </p>
            <p>
              In coastal environments, AISI 316 stainless steel is preferred over aluminium due to superior chloride corrosion resistance. Waterproofing membrane must be continuously sealed to the weir body — using either an integral flange (Alproc) or a clamping ring (Blucher W400). Sizing must be confirmed against AS/NZS 3500.3 by a hydraulic engineer before specifying.
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

export function WeirOverflowProductSection() {
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
              Weir vs scupper vs pipe overflow, setting weir height, membrane integration, coastal material selection
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
              <TechCard icon={<Layers size={15} />} title="Weir vs Scupper vs Pipe Overflow — Selection" items={TECH_INFO.weirVsOther} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Setting Weir Height for Box Gutters and Flat Roofs" items={TECH_INFO.settingHeight} style="check" />
              <TechCard icon={<BookOpen size={15} />} title="Integrating Weir Outlets with Waterproofing Membranes" items={TECH_INFO.membraneIntegration} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="Coastal Environment Material Selection" items={TECH_INFO.coastalSelection} style="warn" />
            </div>

            {/* Brand equivalency */}
            <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <SquareStack size={12} />
                </div>
                <p className="text-sm font-extrabold text-sky-950">Brand Equivalency Notes</p>
              </div>
              <ul className="space-y-2">
                {BRAND_EQUIV.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-5 text-sky-900">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                    {note}
                  </li>
                ))}
              </ul>
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
            <p className="mt-1 text-sm text-slate-500">2 products — aluminium and stainless steel weir overflow outlets — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for all
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
              Side-by-side comparison of weir overflow outlet systems. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weir width</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Adjustment</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Membrane connection</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.weirWidth}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.adjustment}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.membraneConnection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
