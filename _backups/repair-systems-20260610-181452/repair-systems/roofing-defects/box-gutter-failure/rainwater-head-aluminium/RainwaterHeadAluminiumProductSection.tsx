"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Capral"
  | "Metalcorp"
  | "Aluminium"
  | "Custom"
  | "Mill-finish"
  | "Powder-coated"
  | "Anodised"
  | "Bespoke";

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
    fullLabel: "Capral Aluminium",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#0369a1",
    name: "Capral Custom Aluminium Rainwater Head",
    descriptionLine: "Fabricated from Capral 1.2mm aluminium sheet; custom sizes 200–600mm wide; mill-finish or powder-coated; DN90/DN100 outlet; available via fabricator network nationally.",
    productType: "Custom-fabricated aluminium rainwater head — Capral sheet",
    filterTags: ["Capral", "Aluminium", "Custom", "Mill-finish", "Powder-coated"],
    techChips: [
      { label: "Capral", cls: "bg-sky-100 text-sky-800" },
      { label: "1.2mm aluminium sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Custom fabricated", cls: "bg-slate-100 text-slate-700" },
      { label: "Mill-finish or powder-coated", cls: "bg-green-50 text-green-700" },
      { label: "DN90 / DN100 outlet", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Capral Custom Aluminium Rainwater Heads are fabricated from Capral 1.2mm aluminium alloy sheet by specialist sheet metal fabricators using Capral-supplied material through their national fabricator network. Custom widths from 200mm to 600mm are available to suit project-specific box gutter discharge requirements. Finish options include mill-finish (natural aluminium), powder-coated to a project-specified colour, or anodised for enhanced surface durability. DN90 and DN100 outlet collars are formed at the fabrication stage for connection to standard round aluminium or PVC downpipes. Capral aluminium is the most widely specified aluminium sheet product in Australia for architectural and building applications, and Capral's fabricator network provides national coverage. Specify the required width, depth, outlet size, and finish when obtaining a quotation from a Capral-affiliated fabricator. Aluminium rainwater heads are particularly suited to aluminium-clad buildings and coastal environments where galvanic corrosion between Colorbond steel and aluminium must be managed — an all-aluminium drainage system avoids dissimilar metal contact at the gutter-to-rainwater head and rainwater head-to-downpipe connections.",
    technicalProperties: [
      "Fabricated from Capral 1.2mm aluminium alloy sheet — lightweight and inherently corrosion-resistant",
      "Custom sizes 200–600mm wide — fabricated to project specification",
      "Mill-finish or powder-coated finish — confirm colour and coating specification at time of order",
      "DN90 and DN100 outlet collars — formed at fabrication for standard round downpipe connection",
      "Available via Capral fabricator network nationally — confirm local fabricator lead time",
      "No rust — aluminium forms a natural oxide layer that prevents corrosion in most building environments",
      "Suitable for coastal environments where Colorbond steel would require enhanced coating specification",
    ],
    limitations: [
      "Custom fabrication — lead time must be confirmed with the fabricator before programming installation",
      "Dissimilar metal contact — aluminium rainwater heads must not be in direct contact with copper or copper alloy components — galvanic corrosion will occur without isolation",
      "Aluminium and Colorbond steel can be used together but require isolation where prolonged water contact at the junction is expected — confirm isolation detail with the fabricator",
      "Mill-finish aluminium will oxidise and dull over time — specify powder-coat or anodised finish where appearance is critical",
      "Rainwater head sizing must be confirmed by a hydraulic engineer for the catchment area",
      "Confirm current product availability, sheet thickness options, and finish options with the Capral-affiliated fabricator before specifying",
    ],
    procurementSources: [
      { name: "Capral Aluminium — fabricator network", url: "https://www.capral.com.au" },
    ],
  },
  {
    fullLabel: "Metalcorp Steel",
    brandUrl: "https://www.metalcorp.com.au",
    accentColor: "#7c2d12",
    name: "Metalcorp Aluminium Rainwater Head",
    descriptionLine: "1.2mm and 1.6mm aluminium sheet rainwater heads; standard and custom sizes; anodised or powder-coated finish options; DN90 and DN100 outlets.",
    productType: "Aluminium rainwater head — Metalcorp — anodised or powder-coated",
    filterTags: ["Metalcorp", "Aluminium", "Custom", "Anodised"],
    techChips: [
      { label: "Metalcorp", cls: "bg-orange-100 text-orange-800" },
      { label: "1.2mm or 1.6mm aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Standard and custom", cls: "bg-slate-100 text-slate-700" },
      { label: "Anodised or powder-coated", cls: "bg-green-50 text-green-700" },
      { label: "DN90 / DN100", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Metalcorp supplies aluminium rainwater heads fabricated from 1.2mm and 1.6mm aluminium sheet in both standard and custom sizes. The heavier 1.6mm option provides additional stiffness for larger rainwater heads or installations subject to significant water loading. Finish options include anodising and powder-coating — anodising provides a harder, more abrasion-resistant surface finish with greater long-term durability than powder coat, making it a preferred option for coastal and exposed environments. DN90 and DN100 outlet collars are available for connection to standard round downpipes. Standard and custom sizes are available — confirm the current standard size range and custom fabrication capability with Metalcorp before specifying. Metalcorp's distribution network covers major metropolitan and regional centres. Aluminium rainwater heads from Metalcorp are particularly well-suited to projects with aluminium gutters and downpipes where an all-aluminium drainage system is preferred to avoid dissimilar metal corrosion.",
    technicalProperties: [
      "1.2mm and 1.6mm aluminium sheet options — heavier gauge provides additional stiffness for larger heads",
      "Standard and custom sizes available — confirm current size range with Metalcorp",
      "Anodised or powder-coated finish options — anodising provides enhanced hardness and durability",
      "DN90 and DN100 outlet collars — standard round downpipe connection",
      "Suitable for coastal and exposed environments — aluminium provides inherent corrosion resistance",
      "All-aluminium system compatibility — avoids dissimilar metal contact with aluminium gutters and downpipes",
      "National distribution through Metalcorp branch network — confirm local branch availability",
    ],
    limitations: [
      "Confirm current standard size range, custom fabrication capability, and lead time with Metalcorp before specifying",
      "Dissimilar metal contact — aluminium must not contact copper, copper alloys, or lead without isolation",
      "Anodised finish cannot be repaired on site — if the anodised surface is damaged, the section must be replaced or stripped and re-anodised in a workshop",
      "Powder-coated finish may require re-coating over time — particularly in coastal environments with salt spray",
      "Rainwater head sizing must be confirmed by a hydraulic engineer for the catchment area",
      "Confirm compatibility with specific downpipe material (aluminium, PVC, Colorbond) before specifying outlet collar detail",
    ],
    procurementSources: [
      { name: "Metalcorp Steel — branch network", url: "https://www.metalcorp.com.au" },
    ],
  },
  {
    fullLabel: "Custom Sheet Metal Fabricator",
    brandUrl: "https://www.masterbuilders.com.au",
    accentColor: "#16a34a",
    name: "Custom Fabricator — Aluminium Rainwater Head",
    descriptionLine: "Site-fabricated or workshop-formed aluminium rainwater head to project-specific drawing; suitable for non-standard gutter profiles; matching aluminium downpipe connection.",
    productType: "Bespoke aluminium rainwater head — custom fabrication to drawing",
    filterTags: ["Aluminium", "Custom", "Bespoke"],
    techChips: [
      { label: "Custom to drawing", cls: "bg-green-100 text-green-800" },
      { label: "Bespoke sizing", cls: "bg-slate-100 text-slate-700" },
      { label: "Aluminium sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-standard profiles", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Where the box gutter profile, drainage configuration, or architectural requirement cannot be accommodated by a standard catalogue rainwater head or by the standard size ranges of Capral or Metalcorp, a bespoke aluminium rainwater head fabricated to project-specific drawing is the appropriate solution. Custom fabrication allows the rainwater head to be dimensioned precisely for the hydraulic design, with inlet opening and outlet spigot sized exactly to the engineer's specification. Workshop-formed aluminium rainwater heads are fabricated from aluminium sheet — typically 1.2mm or 1.6mm depending on size — using folding, riveting, or welding as appropriate to the fabricator's capability and the project specification. A site-fabricated rainwater head is an option where the existing box gutter profile is unusual or where access constraints prevent workshop fabrication. Confirm the fabricator's capability, sheet thickness options, seam type (folded, riveted, or TIG-welded), and finish options before engaging a custom fabricator. Custom aluminium rainwater heads have no standard catalogue product — all dimensions and details must be defined in a project drawing before fabrication commences.",
    technicalProperties: [
      "Fabricated to project-specific drawing — no size or shape restriction",
      "Aluminium sheet — typically 1.2mm or 1.6mm — confirm gauge with fabricator for the required size and loading",
      "Seam type: folded, riveted, or TIG-welded — confirm with fabricator and specify in the project drawing",
      "Finish: mill-finish, powder-coated, or anodised — specify at time of engagement",
      "Matching aluminium downpipe collar — confirm outlet diameter and connection method",
      "Suitable for non-standard box gutter profiles and complex drainage configurations",
      "No lead time advantage over standard products — allow for fabrication and delivery in the construction programme",
    ],
    limitations: [
      "No standard product — all dimensions and details must be confirmed in a drawing before fabrication — changes after fabrication commences may not be possible without scrap cost",
      "Fabricator quality and capability varies — inspect a sample or reference project before engaging a custom fabricator for a large strata project",
      "TIG-welded aluminium rainwater heads require a fabricator with aluminium TIG welding capability — confirm before specifying welded seams",
      "Dissimilar metal contact — aluminium must not contact copper, copper alloys, or lead without isolation",
      "Rainwater head sizing must be confirmed by a hydraulic engineer — do not rely on the fabricator to size the unit",
      "Confirm finish durability requirements with the fabricator — uncoated mill-finish aluminium may not be acceptable in exposed or coastal environments",
    ],
    procurementSources: [
      { name: "Master Builders Australia — find a fabricator", url: "https://www.masterbuilders.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Capral", label: "Capral" },
  { id: "Metalcorp", label: "Metalcorp" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Custom", label: "Custom" },
  { id: "Mill-finish", label: "Mill-finish" },
  { id: "Powder-coated", label: "Powder-coated" },
  { id: "Anodised", label: "Anodised" },
  { id: "Bespoke", label: "Bespoke" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  sheetThickness: string;
  finishOptions: string;
  dissimilarMetalRisk: string;
}[] = [
  {
    supplier: "Capral (via fabricator)",
    sheetThickness: "1.2mm standard",
    finishOptions: "Mill-finish, powder-coated",
    dissimilarMetalRisk: "Isolate from copper — compatible with aluminium and PVC",
  },
  {
    supplier: "Metalcorp",
    sheetThickness: "1.2mm or 1.6mm",
    finishOptions: "Anodised, powder-coated",
    dissimilarMetalRisk: "Isolate from copper — compatible with aluminium and PVC",
  },
  {
    supplier: "Custom Fabricator",
    sheetThickness: "1.2mm or 1.6mm — specify",
    finishOptions: "Mill-finish, powder-coated, anodised",
    dissimilarMetalRisk: "Isolate from copper — compatible with aluminium and PVC",
  },
];

const TECH_INFO = {
  dissimilarMetal: [
    "Aluminium and copper form a galvanic couple — direct contact in the presence of moisture will cause accelerated corrosion of the aluminium. Isolate all aluminium rainwater heads from copper components with a non-conductive gasket or sleeve",
    "Aluminium and Colorbond steel can coexist in most environments but require isolation at points of prolonged water contact — confirm isolation detail with the fabricator and the hydraulic engineer",
    "An all-aluminium system — aluminium gutter lining, aluminium rainwater head, aluminium downpipes — eliminates all dissimilar metal contact risk and is the simplest specification for aluminium-clad buildings",
    "Where aluminium rainwater heads connect to PVC downpipes, no isolation is required — PVC is non-conductive",
  ],
  finishes: [
    "Mill-finish aluminium (natural silver) is the lowest cost option but will oxidise and dull in outdoor environments — appropriate where the rainwater head is hidden or appearance is not critical",
    "Powder-coating provides a coloured and more weather-resistant finish than mill-finish — confirm powder coat specification (thickness, primer, coating type) for coastal environments",
    "Anodising provides a harder, more abrasion-resistant surface than powder coat — anodised aluminium is preferred for exposed coastal environments and where long-term appearance retention is important",
    "Anodised finish cannot be repaired on site — damaged sections must be replaced or re-anodised in a workshop",
  ],
  thermalExpansion: [
    "Aluminium has a higher coefficient of thermal expansion than steel — 23 × 10⁻⁶/°C vs 12 × 10⁻⁶/°C — allowance for thermal movement is required in large rainwater heads",
    "For rainwater heads wider than 400mm, discuss thermal expansion allowance with the fabricator — inadequate allowance can cause buckling or joint failure over time",
    "Where the rainwater head connects to a long aluminium downpipe, expansion joints in the downpipe system should be confirmed with the hydraulic engineer",
    "Riveted or folded seams allow more thermal movement than rigid welded seams — specify the seam type appropriate to the rainwater head size and thermal exposure",
  ],
  maintenance: [
    "Aluminium rainwater heads require minimal maintenance compared to painted steel — the natural oxide layer provides ongoing corrosion resistance",
    "Cleaning with mild detergent and water removes salt and pollutant deposits — avoid abrasive cleaners that will damage anodised or powder-coated finishes",
    "Inspect seals and sealant at the rainwater head-to-gutter junction annually and reseal as required",
    "Re-coating of powder-coated aluminium rainwater heads — typically 10–15 years in coastal environments — confirm re-coating requirements with the finish supplier",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x" | "bullet";
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
            ) : icon === "x" ? (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            ) : (
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
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

export function RainwaterHeadAluminiumIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are aluminium rainwater heads for box gutters?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Aluminium rainwater heads are fabricated from aluminium alloy sheet — typically alloy 3003 or 5005 — and serve the same function as Colorbond steel rainwater heads: collecting box gutter discharge and transitioning the flow into a downpipe. Their primary advantage over Colorbond steel is inherent corrosion resistance without a painted or coated surface, making them well-suited to coastal environments and buildings with aluminium cladding systems where an all-aluminium drainage system eliminates dissimilar metal contact.
        </p>
        {expanded && (
          <>
            <p>
              Aluminium rainwater heads are fabricated to order by specialist sheet metal fabricators using Capral or Metalcorp aluminium sheet. They are available in mill-finish (natural aluminium), powder-coated, or anodised finish. Anodising produces a harder, more durable surface than powder coat and is preferred for long-term appearance retention in coastal environments. The critical design consideration for aluminium rainwater heads is dissimilar metal isolation — aluminium in direct contact with copper will corrode rapidly in the presence of moisture.
            </p>
            <p>
              Sizing must be confirmed by a hydraulic engineer for the catchment area and design rainfall intensity. Custom fabrication allows exact sizing to the hydraulic design, and all-aluminium systems are preferred on buildings where the gutter lining, rainwater head, and downpipes are specified as aluminium throughout.
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

export function RainwaterHeadAluminiumProductSection() {
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
              Dissimilar metal isolation, finishes, thermal expansion, maintenance
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              <TechCard icon={<AlertTriangle size={15} />} title="Dissimilar Metal Contact" items={TECH_INFO.dissimilarMetal} style="warn" />
              <TechCard icon={<Layers size={15} />} title="Anodising vs Powder Coating" items={TECH_INFO.finishes} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Thermal Expansion Allowance" items={TECH_INFO.thermalExpansion} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Maintenance" items={TECH_INFO.maintenance} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — aluminium rainwater heads for box gutters — scroll to view all</p>
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
              Side-by-side comparison of aluminium rainwater head suppliers and options. Confirm all product selections against the current supplier before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sheet thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish options</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Dissimilar metal risk with Colorbond</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sheetThickness}</td>
                  <td className="px-4 py-3 text-slate-600">{row.finishOptions}</td>
                  <td className="px-4 py-3 text-slate-600">{row.dissimilarMetalRisk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
