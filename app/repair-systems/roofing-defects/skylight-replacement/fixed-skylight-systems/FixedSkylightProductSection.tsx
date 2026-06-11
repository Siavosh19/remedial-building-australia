"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Velux"
  | "Fakro"
  | "Double-glazed"
  | "Timber-lined"
  | "Centre-pivot"
  | "Fixed"
  | "Aluminium-frame"
  | "Curb-mount"
  | "Flat-roof";

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
    fullLabel: "Velux Australia",
    brandUrl: "https://www.velux.com.au",
    accentColor: "#0369a1",
    name: "Velux GGL CK02",
    descriptionLine: "Centre-pivot roof window; 55×78cm; factory-lacquered pine; laminated inner / tempered outer glazing; low-e argon-filled IGU; 10-year guarantee; suits 15–90° pitches.",
    productType: "Centre-pivot fixed roof window — double-glazed — timber-lined",
    filterTags: ["Velux", "Double-glazed", "Timber-lined", "Centre-pivot"],
    techChips: [
      { label: "Velux", cls: "bg-sky-100 text-sky-800" },
      { label: "Double-glazed", cls: "bg-slate-100 text-slate-700" },
      { label: "Centre-pivot", cls: "bg-green-50 text-green-700" },
      { label: "Timber-lined", cls: "bg-amber-50 text-amber-700" },
      { label: "10-year guarantee", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Velux GGL CK02 is a centre-pivot roof window in the CK02 size (55×78cm), featuring a factory-lacquered pine frame with a timber-lined internal reveal suitable for direct paint or stain finish. The IGU unit consists of laminated inner glass and a tempered outer pane, argon-filled and low-e coated to comply with NCC Section J energy requirements for Class 2 buildings. The centre-pivot mechanism allows the sash to rotate 180° for cleaning from inside the room — a practical advantage in multi-storey strata buildings where external window cleaning requires specialised access. Pitch range is 15–90°, making this unit suitable for the full range of conventional tiled and metal roof pitches found in Australian residential construction. The 10-year Velux guarantee covers the complete unit including the IGU seal. Installation requires the matching Velux EDZ or BDX flashing kit for the roof type — confirm flashing kit selection with the Velux product selector before ordering. Velux GGL is the standard pitched-roof window in Australian strata remediation and is widely stocked by roofing and window suppliers nationally.",
    technicalProperties: [
      "Centre-pivot roof window — 55×78cm (CK02) — factory-lacquered pine frame, timber-lined internal reveal",
      "Double-glazed low-e argon-filled IGU — laminated inner / tempered outer — NCC Section J energy compliant",
      "Pitch range: 15–90° — suitable for all standard tiled and metal roof pitches",
      "10-year guarantee on unit and IGU seal — confirm current guarantee terms with Velux Australia",
      "Centre-pivot mechanism — 180° rotation for internal cleaning — suitable for multi-storey strata applications",
      "Requires matching Velux flashing kit (EDZ or BDX) — flashing kit must match roof type and skylight size",
      "Widely stocked nationally through roofing and window suppliers — confirm current stock with supplier",
    ],
    limitations: [
      "Centre-pivot mechanism is not a fixed non-opening unit — specify Fakro FTP-V U3 or Velux FCM if a fixed non-opening skylight is required",
      "Timber frame requires maintenance — factory lacquer must be re-coated periodically — confirm maintenance schedule with Velux",
      "Not suitable for flat or near-flat roofs — minimum pitch 15° — specify Velux FCM for flat roof curb-mount applications",
      "Matching flashing kit is mandatory — do not install with generic lead flashings — EDZ or BDX kit must match CK02 size and roof type",
      "IGU seal carries 10-year guarantee — replacement IGU units must be factory-supplied Velux units — confirm repair parts availability before specifying",
      "Confirm current NCC Section J U-value compliance with Velux Australia for the specific climate zone before specifying",
    ],
    procurementSources: [
      { name: "Velux Australia — trade supply", url: "https://www.velux.com.au" },
      { name: "Roofmaster", url: "https://www.roofmaster.com.au" },
      { name: "Bunnings", url: "https://www.bunnings.com.au" },
      { name: "Stratco", url: "https://www.stratco.com.au" },
    ],
  },
  {
    fullLabel: "Fakro Australia",
    brandUrl: "https://www.fakro.com.au",
    accentColor: "#16a34a",
    name: "Fakro FTP-V U3",
    descriptionLine: "Fixed non-opening skylight; 55×78cm to 94×140cm; PVC-coated pine frame; 3-glass unit with argon fill; Uf=1.2 W/m²K; AS 4285 compliant; universal flashing collar.",
    productType: "Fixed non-opening roof window — triple-glazed — timber-lined — PVC coated",
    filterTags: ["Fakro", "Double-glazed", "Timber-lined", "Fixed"],
    techChips: [
      { label: "Fakro", cls: "bg-green-100 text-green-800" },
      { label: "Triple-glazed", cls: "bg-slate-100 text-slate-700" },
      { label: "Fixed non-opening", cls: "bg-green-50 text-green-700" },
      { label: "Uf=1.2 W/m²K", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 4285 compliant", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Fakro FTP-V U3 is a fixed non-opening roof skylight with a PVC-coated pine frame, providing enhanced moisture resistance compared to uncoated or lacquered timber alternatives. The U3 designation refers to the triple-glass IGU with argon fill, achieving a frame U-value of Uf=1.2 W/m²K — a high-performing thermal specification suitable for Class 2 buildings in NCC climate zones requiring NCC Section J compliance. Available in a comprehensive range from 55×78cm to 94×140cm, providing flexibility for standard and oversized skylight replacement projects. AS 4285 compliance confirms the unit meets Australian standards for roof windows and skylights for thermal performance and weathertightness. The FTP-V includes Fakro's universal flashing collar, which is compatible with a range of tile profiles including terracotta, concrete, and Decramastic tiles — confirm flashing compatibility with the Fakro LFT or LFT insulated flashing kit selection for the specific roof type. The fixed non-opening design simplifies the frame construction and eliminates the moving sash seal — a common source of long-term air leakage and heat loss in operable roof windows. Recommended for habitable rooms where daylighting is the primary requirement and ventilation is provided by other means.",
    technicalProperties: [
      "Fixed non-opening roof window — available 55×78cm to 94×140cm — PVC-coated pine frame for improved moisture resistance",
      "Triple-glass IGU with argon fill — Uf=1.2 W/m²K — NCC Section J energy compliant for Class 2 buildings",
      "AS 4285 compliant — weathertightness and thermal performance to Australian standard for roof windows",
      "Universal flashing collar included — compatible with Fakro LFT insulated flashing kit for tiled roof applications",
      "Fixed non-opening design — eliminates sash seal — reduces long-term air leakage risk vs operable units",
      "PVC-coated frame — improved moisture resistance vs lacquered pine — reduced maintenance requirement",
      "Confirm current NCC Section J U-value compliance with Fakro Australia for specific climate zone before specifying",
    ],
    limitations: [
      "Fixed non-opening — does not provide ventilation — ensure habitable room ventilation is provided by other means per NCC",
      "PVC coating extends maintenance intervals but does not eliminate frame inspection requirements — confirm maintenance schedule with Fakro",
      "Requires matching Fakro LFT or flashing kit — do not install with generic flashings — confirm flashing kit selection for roof type",
      "Triple-glass unit is heavier than double-glazed alternatives — confirm structural capacity of roof framing before ordering large sizes",
      "AS 4285 compliance must be confirmed from current Fakro Australia product documentation for the specific size and climate zone",
      "Confirm current product availability and lead times with Fakro Australia — some sizes may require ordering in advance",
    ],
    procurementSources: [
      { name: "Fakro Australia — trade supply", url: "https://www.fakro.com.au" },
      { name: "Roofmaster", url: "https://www.roofmaster.com.au" },
      { name: "Trend Windows", url: "https://www.trendwindows.com.au" },
    ],
  },
  {
    fullLabel: "Velux Australia",
    brandUrl: "https://www.velux.com.au",
    accentColor: "#0369a1",
    name: "Velux FCM Fixed Curb-Mount Skylight",
    descriptionLine: "Laminated low-e glass; aluminium frame; curb-mounted for flat-to-low pitch; IP4X rated; suitable for flat roofs with 2° min pitch; suits single-ply membrane roofs.",
    productType: "Fixed curb-mount skylight — aluminium frame — flat and low-pitch roofs",
    filterTags: ["Velux", "Aluminium-frame", "Curb-mount", "Flat-roof"],
    techChips: [
      { label: "Velux", cls: "bg-sky-100 text-sky-800" },
      { label: "Aluminium frame", cls: "bg-slate-100 text-slate-700" },
      { label: "Curb-mount", cls: "bg-green-50 text-green-700" },
      { label: "Flat roof — 2° min", cls: "bg-amber-50 text-amber-700" },
      { label: "IP4X rated", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Velux FCM Fixed Curb-Mount Skylight is Velux's flat and low-pitched roof skylight solution, designed for installation on a pre-built timber or structural curb at a minimum pitch of 2°. The unit features an aluminium frame — not timber — making it the appropriate specification for flat roof and membrane roof applications where timber frames would be exposed to ponding or moisture. The laminated low-e glass unit provides thermal performance compliant with NCC Section J for Class 2 buildings in relevant climate zones. IP4X rating confirms dust and splash protection suitable for exposed flat roof installations. The curb-mount design is compatible with all standard single-ply membrane roofing systems including TPO, FPO, and PVC membranes, as well as torch-on bitumen and HDPE sheet membranes — the membrane terminates to and over the curb perimeter, not to the skylight frame directly. This is a fundamentally different installation methodology to pitched roof skylights, and the waterproofing detail at the curb base must be designed and executed by a licensed waterproofer. The FCM is the correct Velux product for flat roof strata building applications — the GGL pitched roof window is not appropriate for flat or near-flat roof installations. Confirm curb height, curb construction specification, and membrane termination detail with the waterproofing contractor before ordering.",
    technicalProperties: [
      "Fixed curb-mount skylight — aluminium frame — minimum roof pitch 2° — suitable for flat and low-pitched roofs",
      "Laminated low-e glass — NCC Section J energy compliant — IP4X dust and splash protection rating",
      "Compatible with single-ply membranes (TPO, FPO, PVC), torch-on bitumen, and HDPE membrane roofing systems",
      "Curb-mount design — membrane terminates over curb — waterproofing detail at curb base designed separately",
      "Aluminium frame — no timber — appropriate for flat roof moisture exposure conditions",
      "Confirm current NCC Section J U-value compliance with Velux Australia for specific climate zone",
      "Pre-built curb required — curb specification and construction is separate scope from skylight supply and install",
    ],
    limitations: [
      "Minimum pitch 2° — cannot be installed on a level (zero-pitch) roof — ensure adequate fall to curb before specifying",
      "Curb construction and waterproofing detail is NOT part of the skylight supply — a separate licensed waterproofer must design and install the curb waterproofing",
      "Aluminium frame — no thermal break specified by default — confirm thermal performance for climate zone with Velux Australia",
      "IP4X rated — not rated for full water immersion — adequate drainage away from curb base is mandatory",
      "FCM is fixed non-opening — does not provide ventilation — ensure mechanical ventilation compliance for habitable rooms",
      "Do not install the Velux GGL pitched roof window on flat roofs — the FCM is the correct product — installation of pitched units on flat roofs will void the Velux warranty and may result in leakage",
    ],
    procurementSources: [
      { name: "Velux Australia — trade supply", url: "https://www.velux.com.au" },
      { name: "Roofmaster", url: "https://www.roofmaster.com.au" },
      { name: "Bunnings", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Velux", label: "Velux" },
  { id: "Fakro", label: "Fakro" },
  { id: "Flat-roof", label: "Flat-roof" },
];

const SYSTEM_COMPARISON: {
  model: string;
  frameMaterial: string;
  uValue: string;
  pitchRange: string;
}[] = [
  {
    model: "Velux GGL CK02",
    frameMaterial: "Factory-lacquered pine",
    uValue: "Confirm with Velux TDS",
    pitchRange: "15–90°",
  },
  {
    model: "Fakro FTP-V U3",
    frameMaterial: "PVC-coated pine",
    uValue: "Uf=1.2 W/m²K",
    pitchRange: "15–90°",
  },
  {
    model: "Velux FCM Curb-Mount",
    frameMaterial: "Aluminium",
    uValue: "Confirm with Velux TDS",
    pitchRange: "2° min (flat/low pitch)",
  },
];

const TECH_INFO = [
  "NCC Section J energy compliance for skylights in Class 2 buildings — confirm U-value and SHGC requirements for climate zone before specifying",
  "Flashing kit selection for tile and metal roof applications — matched flashing kit is mandatory for all pitched roof installations",
  "Skylight sizing — daylighting calculations for habitable rooms — confirm minimum glazed area requirements per NCC",
  "Replacement without structural alteration to roof framing — confirm existing framing dimensions match standard skylight sizes before ordering",
];

const BRAND_EQUIV = [
  "Velux GGL ≈ Fakro FTP-V U3 — both fixed timber-lined double/triple-glazed roof windows for pitched roofs 15–90°",
  "Velux FCM — unique curb-mount aluminium product for flat and low-pitch roof applications — no direct Fakro equivalent in this size range",
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

export function FixedSkylightIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are fixed roof skylight systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Fixed skylights are the primary natural lighting system in Class 2 buildings and require replacement when glazing fails, seals deteriorate or frames corrode. Velux GGL and Fakro FTP double-glazed timber-lined units comply with NCC Section J energy requirements while providing durable weather-tight roof penetrations.
        </p>
        {expanded && (
          <>
            <p>
              Product selection for skylight replacement must consider the roof pitch, frame material durability, glazing U-value and solar heat gain coefficient (SHGC) requirements under NCC Section J for the relevant climate zone, and the matching flashing kit system for the roof type. For flat and low-pitched roofs with a minimum 2° fall, a curb-mount aluminium-framed unit such as the Velux FCM is the appropriate specification — pitched roof timber-framed units are not suitable for flat roof applications.
            </p>
            <p>
              All skylight replacements in Class 2 strata buildings require a matched manufacturer flashing kit. Generic lead flashings are not an acceptable substitute for the engineered flashing kits supplied by Velux or Fakro for their respective products, and installation with generic flashings will void the product warranty and compromise the weathertightness guarantee.
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

export function FixedSkylightProductSection() {
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
              Technical information, brand equivalencies, NCC compliance notes
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
            <p className="mt-1 text-sm text-slate-500">3 products — fixed skylight systems — scroll to view all</p>
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
              Side-by-side comparison of fixed skylight systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Model</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Frame material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">U-value</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pitch range</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.model} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.model}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.frameMaterial}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.uValue}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pitchRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
