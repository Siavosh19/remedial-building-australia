"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Custom-fabricated"
  | "Colorbond"
  | "Zincalume"
  | "Raised-plinth"
  | "Pre-formed"
  | "Deks"
  | "Elevated"
  | "Low-pitch";

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
    fullLabel: "Custom fabrication — roof plumber or metal fabricator",
    brandUrl: "https://www.bluescope.com.au",
    accentColor: "#0369a1",
    name: "Custom Colorbond / Zincalume Fabricated Plinth",
    descriptionLine: "Custom-fabricated raised plinth box from Colorbond or Zincalume sheet — where a pipe or service penetrates a flat or low-slope roof area within a tiled or metal roof — no proprietary product — described by specification and fabrication drawing",
    productType: "Custom-fabricated raised penetration plinth — Colorbond or Zincalume",
    filterTags: ["Custom-fabricated", "Colorbond", "Zincalume", "Raised-plinth"],
    techChips: [
      { label: "Custom-fabricated", cls: "bg-sky-100 text-sky-800" },
      { label: "Colorbond / Zincalume", cls: "bg-slate-100 text-slate-700" },
      { label: "Raised box plinth", cls: "bg-amber-50 text-amber-700" },
      { label: "By specification / drawing", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "A custom-fabricated raised plinth is the standard solution where a pipe, mechanical service, or conduit penetrates through a flat or low-slope area within a tiled or metal roof and a standard pre-formed collar cannot be used. The plinth is a raised box — typically fabricated from Colorbond or Zincalume sheet by the roof plumber or a local sheet metal fabricator — that creates a raised weathered enclosure around the penetration. The height of the plinth above the adjacent roof surface is determined by the drainage falls, the adjacent tile course height, and the risk of water ponding at the penetration point. The base of the plinth is flashed into the roof sarking and waterproofing layer below the tile course. The pipe or service penetrates through the top or side of the plinth box, which is then flashed or sealed at the penetration. There is no proprietary product for a custom plinth — the plinth is described by a specification, fabrication drawing, and installation detail prepared by the roof plumber or structural engineer. Colorbond is specified for colour-matched or aesthetic requirements; Zincalume (unpainted) is specified for concealed applications or where painting is to follow. Confirm Colorbond colour and Zincalume gauge with BlueScope Steel product documentation before ordering sheet.",
    technicalProperties: [
      "Custom-fabricated raised box — size and height determined by project conditions — no standard size",
      "Colorbond (prepainted) or Zincalume (unpainted) steel sheet — BlueScope Steel product",
      "Described by specification, fabrication drawing, and installation detail — not a proprietary product",
      "Base of plinth flashed into roof membrane and sarking below tile course",
      "Pipe or service penetrates through top or side of plinth — sealed at penetration point",
      "Height above roof surface determined by falls, tile course height, and ponding risk",
    ],
    limitations: [
      "Not a proprietary product — design must be documented by a specification or fabrication drawing before fabrication — do not fabricate without a drawing",
      "Fabrication quality varies by fabricator — inspect finished plinth before installation for dimensional accuracy and watertight seam quality",
      "Overflow provision must be considered — if ponding occurs at the plinth base, an overflow weep or drainage point must be incorporated in the design",
      "Confirm Colorbond colour availability and batch matching with BlueScope Steel before ordering sheet for visible applications",
      "All seams must be folded and sealed — unsealed welded seams on Colorbond may void the BlueScope warranty — confirm fabrication method with BlueScope guidelines",
      "Plinth must be installed by a licensed roof plumber — not a general tiling or building contractor",
    ],
    procurementSources: [
      { name: "BlueScope Steel (Colorbond / Zincalume sheet supply) — bluescope.com.au", url: "https://www.bluescope.com.au" },
      { name: "Steel and sheet metal trade suppliers nationally", url: "https://www.bluescope.com.au" },
      { name: "Local sheet metal fabricators — specified by project", url: "https://www.bluescope.com.au" },
    ],
  },
  {
    fullLabel: "Deks Industries",
    brandUrl: "https://www.deks.com.au",
    accentColor: "#78350f",
    name: "Deks Elevated Pipe Collar System",
    descriptionLine: "Deks elevated collar or plinth accessory — raised adapter or extension for weathered elevation around a pipe penetration on low-pitch roof areas — TODO: confirm current Deks elevated collar product name and availability",
    productType: "Pre-formed elevated pipe collar / plinth accessory — Deks",
    filterTags: ["Pre-formed", "Deks", "Elevated", "Low-pitch"],
    techChips: [
      { label: "Pre-formed", cls: "bg-amber-100 text-amber-800" },
      { label: "Elevated collar", cls: "bg-slate-100 text-slate-700" },
      { label: "Low-pitch", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO — confirm product", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Deks Industries manufactures a range of penetration flashing accessories and may offer elevated collar or plinth adapters for situations where a standard D-1 or Deks 45 collar is insufficient on a low-pitch roof area and a raised elevation around the pipe is required. This product listing is a placeholder — the owner must confirm with Deks Industries the current product name, part number, and technical specifications for any elevated collar or plinth accessory in the Deks range. Confirm with Deks technical whether the current product range includes an elevated or extended collar product for low-pitch applications, and confirm the pitch range, pipe OD range, and installation requirements before specifying. If Deks does not currently offer an elevated collar/plinth product for the application, revert to the custom-fabricated Colorbond plinth described on this page.",
    technicalProperties: [
      "TODO — confirm current Deks elevated collar product name and part number with Deks Industries technical",
      "Pre-formed — if available, no site forming of the main flashing element required",
      "For low-pitch roof areas where standard D-1 collar cannot be used without elevation",
      "Confirm pipe OD range, pitch range, and installation method from current Deks documentation",
    ],
    limitations: [
      "TODO — product existence, name, and specifications must be confirmed with Deks Industries before specifying",
      "If no Deks elevated collar product is confirmed, use a custom-fabricated Colorbond or Zincalume plinth instead",
      "Do not specify this product without first confirming with Deks Australia that a current elevated collar product exists in their range",
    ],
    procurementSources: [
      { name: "Deks Industries — deks.com.au — confirm product availability", url: "https://www.deks.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Custom-fabricated", label: "Custom-fabricated" },
  { id: "Pre-formed", label: "Pre-formed" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Custom Fabricated Plinth",
    brand: "No proprietary brand",
    type: "Custom-fabricated box",
    material: "Colorbond or Zincalume",
    fabrication: "By sheet metal fabricator or roof plumber",
    sizeFlexibility: "Fully flexible — any size",
    weatherproofing: "By specification and detailing",
    cost: "Higher — custom fabrication",
  },
  {
    product: "Deks Elevated Collar",
    brand: "Deks",
    type: "Pre-formed (if available)",
    material: "Confirm with Deks",
    fabrication: "Factory pre-formed",
    sizeFlexibility: "Limited to available sizes",
    weatherproofing: "Pre-formed seal",
    cost: "Lower if standard product available",
  },
];

const TECH_INFO = [
  {
    title: "When Plinths Are Required",
    style: "bullet" as const,
    items: [
      "A raised plinth is required where a pipe or service penetrates through a flat or low-slope section of a roof and the pipe exit point is at or below the height of adjacent water flow — a standard pre-formed collar cannot seal against water that may pond or flow around the penetration",
      "Plinths are also required where a cluster of pipes or services penetrate in close proximity and individual collars cannot be installed without overlap conflicts — a shared plinth enclosing the cluster is the preferred solution",
      "Most penetrations on standard pitched tiled roofs (above approximately 15°) use collar flashings, not plinths — plinths are for the exception, not the rule",
      "A plinth may be required where a roofing contractor re-pitches a previously flat section of a roof but cannot re-route an existing service penetration — raising the penetration termination above the new roof plane is achieved with a plinth",
    ],
  },
  {
    title: "Design Requirements for Plinths",
    style: "check" as const,
    items: [
      "The minimum height of the plinth above the adjacent finished roof surface must be confirmed — typically not less than 150mm above the highest adjacent water flow line, but confirm from the project engineer or roof plumber",
      "The base of the plinth must be continuously flashed into the roof membrane below, with the flashing turned up the outside of the plinth walls",
      "All joints and seams in the plinth must be sealed or folded watertight — Colorbond seams must be folded, not welded, unless the fabricator is accredited and the BlueScope welding guidelines are followed",
      "The pipe or service exits through the top or side of the plinth — the penetration through the plinth wall must be sealed with a compression fitting, cover flashing, or mastic compatible with the pipe and plinth material",
    ],
  },
  {
    title: "Overflow Provision",
    style: "warn" as const,
    items: [
      "If the plinth is located in a flat or low-slope area where water may pond, an overflow weep or scupper must be incorporated at the base of the plinth to allow water to drain if the surrounding primary drainage is blocked",
      "A blocked roof drain combined with a plinth without overflow provision can result in water ponding against the plinth base and overtopping the plinth flashing — this is a common cause of water ingress at penetration plinths",
      "Overflow provision must be included in the plinth specification and fabrication drawing — do not leave it as a site decision",
    ],
  },
  {
    title: "Flashing the Plinth Base",
    style: "check" as const,
    items: [
      "The base of the plinth must be continuously sealed to the roof membrane or sarking layer below the tile course — a gap at any point in the base perimeter flashing will allow water entry under the plinth",
      "On tiled roofs, the plinth base typically sits on the sarking or membrane below the tile course and is flashed up and over the tile course at the upslope side — the plumber must integrate the plinth base into the sarking lap detail",
      "Where the plinth is located in a section of roof with a membrane, the base flashing must be bonded to the membrane with a compatible sealant or flashing compound — confirm compatibility with the membrane manufacturer",
    ],
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
  title,
  items,
  style,
}: {
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {style === "check" && <CheckCircle size={15} />}
          {style === "warn" && <AlertTriangle size={15} />}
          {style === "bullet" && <BookOpen size={15} />}
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

export function PenetrationPlinthIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are penetration plinth systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Penetration plinth systems are raised box enclosures — typically custom-fabricated from Colorbond or Zincalume sheet by a licensed roof plumber or sheet metal fabricator — that create a weathered elevation around a pipe or service penetration where a standard pre-formed collar flashing cannot be used. Plinths are required where the pipe exits through a flat or low-slope area of the roof and the surrounding roof surface is at or near the same level as the pipe exit point, exposing the penetration to ponding water or water flow.
        </p>
        {expanded && (
          <>
            <p>
              Most penetrations on standard pitched tiled roofs use pre-formed collar flashings (such as the Deks D-1 range), not plinths. Plinths are the exception — they are required for specific conditions including flat or low-slope sections within a tiled roof, clusters of service pipes where individual collars are not practical, and where a service pipe exits at a point below the surrounding tile course height. Plinth design must be engineered for the specific application — there is no standard proprietary product for a custom plinth.
            </p>
            <p>
              A plinth is distinct from a penetration collar: a collar seals a round pipe through the tile plane on a pitched roof; a plinth is a raised enclosure that lifts the penetration termination point above the adjacent water level on a flat or low-slope section. Incorrect identification of the required system — specifying a collar where a plinth is needed, or vice versa — will result in ongoing water ingress at the penetration.
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

export function PenetrationPlinthProductSection() {
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
              When plinths are required, design requirements, overflow provision, flashing the base
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
              {TECH_INFO.map((card) => (
                <TechCard key={card.title} title={card.title} items={card.items} style={card.style} />
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — penetration plinth systems — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
              Side-by-side comparison of penetration plinth approaches. Plinth design must be engineered for the specific application — confirm with a licensed roof plumber.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fabrication</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Size flexibility</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weatherproofing</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cost</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.fabrication}</td>
                  <td className="px-4 py-3 text-slate-600">{row.sizeFlexibility}</td>
                  <td className="px-4 py-3 text-slate-600">{row.weatherproofing}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
