"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Lysaght"
  | "Stramit"
  | "Stratco"
  | "Colorbond"
  | "Corrugated"
  | "0.42mm-BMT";

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
  procurementSources: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Lysaght — BlueScope Steel",
    brandUrl: "https://www.lysaght.com",
    tdsUrl: "https://www.lysaght.com/profiles/custom-orb",
    accentColor: "#0369a1",
    name: "Lysaght Custom Orb",
    descriptionLine:
      "Colorbond corrugated steel sheet; 0.42mm and 0.48mm BMT standard; sinusoidal 76mm corrugation pitch; 762mm cover width; AS 1562.1 compliant",
    productType: "Corrugated Colorbond steel sheet — 762mm cover — AS 1562.1",
    filterTags: ["Lysaght", "Colorbond", "Corrugated", "0.42mm-BMT"],
    techChips: [
      { label: "Lysaght", cls: "bg-sky-100 text-sky-800" },
      { label: "Colorbond steel", cls: "bg-sky-50 text-sky-700" },
      { label: "762mm cover", cls: "bg-green-50 text-green-700" },
      { label: "0.42/0.48mm BMT", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1562.1", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Custom Orb is Lysaght's corrugated sheet product made from BlueScope Colorbond steel with a 76mm corrugation pitch and 762mm nominal cover width. 0.42mm BMT is the standard residential gauge; 0.48mm is specified for Class 2 and commercial applications for improved uplift resistance. Available in the full Colorbond colour range with a 25-year BlueScope warranty against perforation by corrosion. Fixing is typically by Class 3 hex-head self-drilling screws through the crown of each corrugation into steel purlins, or by Class 4 screws where C3 corrosivity or higher is specified. End laps minimum 150mm for pitches ≥5°, minimum 300mm for pitches <5°. Side laps minimum one corrugation. Sheet length is project-specific — confirm availability with Lysaght branch before ordering. Confirm colour consistency across different production batches when ordering replacement sheets — significant colour variation can occur between batches. The product is available through Lysaght branches nationally and is the benchmark corrugated Colorbond sheet product against which Stramit and Stratco equivalents are assessed. TODO: owner confirm current Custom Orb gauge range and availability in your market before specifying.",
    technicalProperties: [
      "Colorbond steel substrate — BlueScope steel with Activate technology zinc-aluminium-magnesium alloy coating",
      "0.42mm and 0.48mm BMT — residential and commercial gauges; confirm gauge with AS 1562.1 and project engineer for uplift requirements",
      "76mm corrugation pitch, 762mm cover width — standard sinusoidal profile compatible with existing Custom Orb profiles",
      "25-year BlueScope perforation warranty — subject to correct installation and maintenance",
      "Full Colorbond colour range — confirm current colour availability and batch consistency for replacement works",
      "AS 1562.1 compliant — design wind pressure and fixing requirements per AS/NZS 4600 cold-formed steel structures",
      "TODO: owner confirm current product gauges, sizes and availability before specifying",
    ],
    limitations: [
      "Colour matching: Colorbond colours fade over time — replacement sheets from current production will not match weathered existing sheets. Advise client of likely colour variation before ordering.",
      "End lap sealant: End laps must be sealed with butyl tape or equivalent — unsealed end laps are a common source of metal roof leaks. Confirm sealant compatibility with Colorbond coating.",
      "Gauge selection: 0.42mm BMT may not be sufficient for high-wind-zone or Class 2 buildings — confirm gauge and fixing pattern with structural engineer for wind uplift.",
      "Purlin/rafter compatibility: Confirm sheet span and fixing centres against existing purlin/rafter spacing — do not assume existing structure meets current AS 1562.1 requirements.",
      "Batch colour variation: Order all replacement sheets in a single order where possible to minimise colour variation between batches.",
    ],
    procurementSources:
      "Lysaght branches nationally, BlueScope Steel distributors, Stratco (reseller), Tradelink, specialised roofing sheet suppliers",
  },
  {
    fullLabel: "Stramit Building Products",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#dc2626",
    name: "Stramit Corrugated Colorbond Sheet",
    descriptionLine:
      "BlueScope Colorbond corrugated steel sheet; 0.42mm and 0.48mm BMT; 76mm corrugation pitch; 762mm cover; equivalent to Lysaght Custom Orb profile",
    productType: "Corrugated Colorbond steel sheet — equivalent to Custom Orb — AS 1562.1",
    filterTags: ["Stramit", "Colorbond", "Corrugated", "0.42mm-BMT"],
    techChips: [
      { label: "Stramit", cls: "bg-red-100 text-red-800" },
      { label: "Colorbond steel", cls: "bg-sky-50 text-sky-700" },
      { label: "762mm cover", cls: "bg-green-50 text-green-700" },
      { label: "0.42/0.48mm BMT", cls: "bg-slate-100 text-slate-700" },
      { label: "Equivalent profile", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stramit corrugated Colorbond sheet is manufactured from BlueScope Colorbond steel to the same standard sinusoidal corrugated profile (76mm pitch, 762mm cover) as Lysaght Custom Orb. The two products are dimensionally interchangeable in the same roof installation. Available in 0.42mm and 0.48mm BMT and the full current Colorbond colour range. Stramit is a major national roofing sheet supplier with branches in most states — availability may vary by location. Fixing system (Class 3/4 hex-head screws, end lap and side lap requirements) is identical to Custom Orb. Selection between Stramit and Lysaght is typically driven by local branch availability, lead time, and price rather than any technical difference in the product. Confirm colour batch consistency with the local Stramit branch when ordering replacement sheets for an existing roof — as with Custom Orb, colour variation between production batches is a known issue. TODO: owner confirm Stramit corrugated is available in your state/territory before specifying — product ranges and availability vary by branch.",
    technicalProperties: [
      "Same BlueScope Colorbond steel substrate and Activate technology coating as Lysaght Custom Orb",
      "Profile dimensionally interchangeable with Custom Orb — 76mm pitch, 762mm cover width",
      "Same fixing system as Custom Orb — Class 3/4 hex-head self-drilling screws, same end lap and side lap requirements",
      "Confirm colour batch consistency with Stramit branch for replacement orders",
      "TODO: confirm current product availability and gauge range with local Stramit branch before specifying",
    ],
    limitations: [
      "Colour matching: same caveats as Lysaght Custom Orb — weathered existing sheets will not match current production colour. Advise client before ordering.",
      "Confirm local branch availability before specifying — Stramit branch coverage varies by state and territory.",
      "Batch colour variation: order all replacement sheets in a single batch where possible.",
      "Gauge selection: confirm 0.48mm BMT availability at local branch for Class 2 or commercial applications requiring higher uplift resistance.",
    ],
    procurementSources:
      "Stramit branches nationally, Tradelink, roofing sheet specialists",
  },
  {
    fullLabel: "Stratco",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#16a34a",
    name: "Stratco Corrugated Colorbond Sheet",
    descriptionLine:
      "BlueScope Colorbond corrugated steel sheet; 0.42mm BMT standard; 76mm corrugation pitch; 762mm cover; standard corrugated profile — available nationally via Stratco stores",
    productType: "Corrugated Colorbond steel sheet — 762mm cover — retail and trade supply",
    filterTags: ["Stratco", "Colorbond", "Corrugated", "0.42mm-BMT"],
    techChips: [
      { label: "Stratco", cls: "bg-green-100 text-green-800" },
      { label: "Colorbond steel", cls: "bg-sky-50 text-sky-700" },
      { label: "762mm cover", cls: "bg-green-50 text-green-700" },
      { label: "0.42mm BMT", cls: "bg-slate-100 text-slate-700" },
      { label: "Trade & retail", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stratco corrugated Colorbond sheet is a retail and trade-supply equivalent to Lysaght Custom Orb and Stramit corrugated, manufactured from BlueScope Colorbond steel to the same standard 76mm-pitch sinusoidal profile. Available in Stratco stores nationally — Stratco's wide retail network makes it a practical source for smaller replacement orders where a full Lysaght or Stramit branch order is not practical. 0.42mm BMT is the standard availability; 0.48mm may not be available through Stratco retail — confirm before specifying for commercial applications. TODO: owner confirm current gauge and colour availability at your local Stratco store before ordering.",
    technicalProperties: [
      "Standard corrugated profile — 76mm pitch, 762mm cover width — dimensionally equivalent to Lysaght Custom Orb and Stramit corrugated",
      "BlueScope Colorbond steel substrate — Activate technology zinc-aluminium-magnesium alloy coating",
      "0.42mm BMT standard availability through Stratco stores — confirm 0.48mm BMT before specifying for commercial use",
      "Retail and trade supply through Stratco stores nationally — practical for smaller replacement orders",
    ],
    limitations: [
      "0.48mm BMT availability uncertain through Stratco retail — confirm before specifying for Class 2 or commercial applications.",
      "Confirm gauge and colour availability at local Stratco store before ordering — retail stock varies by location.",
      "Same colour-matching caveats as Custom Orb and Stramit — weathered existing sheets will not match current production colour.",
    ],
    procurementSources:
      "Stratco stores nationally (retail and trade)",
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Lysaght", label: "Lysaght" },
  { id: "Stramit", label: "Stramit" },
  { id: "Stratco", label: "Stratco" },
];

const BRAND_EQUIV = [
  {
    a: "Lysaght Custom Orb",
    b: "Stramit Corrugated",
    note: "Dimensionally interchangeable — same 76mm pitch, 762mm cover, same BlueScope Colorbond substrate. Selection driven by local branch availability and price.",
  },
  {
    a: "Stratco Corrugated",
    b: "Custom Orb / Stramit",
    note: "Same profile — wider retail availability for smaller orders; confirm 0.48mm BMT availability before specifying.",
  },
  {
    a: "All three",
    b: "—",
    note: "Confirm colour batch consistency for replacement works — order all sheets in a single batch where possible.",
  },
];

const SYSTEM_COMPARISON: {
  attribute: string;
  lysaght: string;
  stramit: string;
  stratco: string;
}[] = [
  {
    attribute: "BMT range",
    lysaght: "0.42mm, 0.48mm",
    stramit: "0.42mm, 0.48mm",
    stratco: "0.42mm (0.48mm — confirm)",
  },
  {
    attribute: "Cover width",
    lysaght: "762mm",
    stramit: "762mm",
    stratco: "762mm",
  },
  {
    attribute: "Profile",
    lysaght: "76mm pitch sinusoidal",
    stramit: "76mm pitch sinusoidal",
    stratco: "76mm pitch sinusoidal",
  },
  {
    attribute: "Supply channel",
    lysaght: "Trade branches — national",
    stramit: "Trade branches — national",
    stratco: "Retail + trade stores — national",
  },
];

type TechInfoItem = {
  title: string;
  icon: "bullet" | "check" | "warn";
  content: string;
};

const TECH_INFO: TechInfoItem[] = [
  {
    title: "Selecting Colorbond BMT for Class 2 buildings",
    icon: "bullet",
    content:
      "0.42mm BMT is the standard residential gauge for corrugated Colorbond sheet and is widely used on single-dwelling and Class 1 buildings. For Class 2 strata buildings, 0.48mm BMT is generally specified to meet higher wind uplift requirements under AS 1562.1. The design wind pressure on a multi-storey Class 2 building is typically greater than on a single-storey residential dwelling — the structural engineer or façade consultant must confirm the required BMT and fixing pattern for the specific building height, location, and wind classification. Do not assume 0.42mm BMT is adequate for a Class 2 replacement without engineering sign-off. Confirm AS 1562.1 design parameters and fixing pattern with a structural engineer before issuing the product specification.",
  },
  {
    title: "Fixing systems for corrugated Colorbond — Class 3 and Class 4 screws",
    icon: "check",
    content:
      "Corrugated Colorbond sheet is fixed through the crown of each corrugation using hex-head self-drilling screws with EPDM sealing washers. Screw selection is determined by corrosivity classification: Class 3 screws are used for inland and suburban locations (corrosivity category C2); Class 4 screws are required for coastal and near-marine locations (C3 and above). Do not over-tighten screws — over-tightening compresses the EPDM washer past its sealing point and deforms the corrugation crown, creating a leak point. Fixing into the corrugation crown (not the pan) is the standard requirement for corrugated sheet — pan fixing is not used on corrugated profiles. Confirm fixing centres and screw size with Lysaght, Stramit, or Stratco technical documentation and AS 1562.1 design requirements.",
  },
  {
    title: "End lap and side lap requirements — corrugated metal sheet",
    icon: "warn",
    content:
      "Minimum end lap for corrugated Colorbond sheet is 150mm for roof pitches ≥5° and 300mm for pitches <5°. End laps must be sealed with butyl tape — unsealed end laps are one of the most common sources of metal roof leaks in strata buildings. Do not use silicone sealant at end laps — butyl tape is the correct end lap sealing product for corrugated metal sheet. Side lap minimum is one full corrugation. Confirm end lap and side lap requirements with the current Lysaght, Stramit, or Stratco installation guide for the specific pitch and location. Failure to seal end laps is a significant defect risk on replacement roofing works — include as a hold point in the ITP.",
  },
  {
    title: "Colour matching and batch variation in Colorbond replacement",
    icon: "warn",
    content:
      "Colorbond steel colours fade under UV exposure over time. Replacement sheets ordered from current production will not match the colour of weathered existing sheets, even when the same Colorbond colour name is specified. In addition, colour variation can occur between different production batches of the same colour. For partial roof replacement or patching, advise the client in writing that colour variation between old and new sheets is unavoidable. Where appearance is critical — for example, on a heritage-listed building or a strata building with strict by-laws — a full roof replacement may be the only acceptable option. Where partial replacement proceeds, order all replacement sheets in a single batch from the same coil where possible to minimise batch-to-batch variation. Obtain client sign-off on the colour variation risk before ordering.",
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

function TechAccordionItem({ item }: { item: TechInfoItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
            {item.icon === "check" && <CheckCircle size={12} />}
            {item.icon === "warn" && <AlertTriangle size={12} />}
            {item.icon === "bullet" && <Layers size={12} />}
          </div>
          <span className="text-sm font-extrabold text-sky-950">{item.title}</span>
        </div>
        {open ? <ChevronUp size={14} className="shrink-0 text-slate-400" /> : <ChevronDown size={14} className="shrink-0 text-slate-400" />}
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4">
          <p className="text-xs leading-6 text-slate-600">{item.content}</p>
        </div>
      )}
    </div>
  );
}

export function MetalSheetColorbondCorrugatedIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is Colorbond corrugated sheet replacement?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Colorbond corrugated steel sheet (sold as Custom Orb by Lysaght and equivalent by Stramit and Stratco) is the most widely used metal roofing product in Australia, specified on both residential and Class 2 strata buildings for its durability, colour range and familiar sinusoidal profile. Sheet replacement requires matching the existing profile, pitch and fixing system and selecting a Colorbond colour consistent with the original or an approved variation under any applicable strata by-law or heritage requirement.
        </p>
        {expanded && (
          <>
            <p>
              The corrugated profile — defined by a 76mm pitch sinusoidal wave and 762mm nominal cover width — is consistent across Lysaght, Stramit, and Stratco. Products from all three manufacturers are dimensionally interchangeable. Selection between brands is typically driven by local branch availability, lead time, and price rather than any technical difference in the sheet product itself.
            </p>
            <p>
              BMT (base metal thickness) selection is critical for Class 2 buildings: 0.42mm BMT is the standard residential gauge; 0.48mm is required for Class 2 and commercial applications with higher wind uplift loading. Confirm BMT and fixing pattern with a structural engineer against AS 1562.1 wind pressure requirements before specifying.
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

export function MetalSheetColorbondCorrugatedProductSection() {
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
      <div className="space-y-3">
        <div className="mb-2 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Technical Reference</h2>
            <p className="mt-1 text-sm text-slate-500">BMT selection, fixing systems, lap requirements, and colour matching guidance</p>
          </div>
        </div>
        {TECH_INFO.map((item) => (
          <TechAccordionItem key={item.title} item={item} />
        ))}
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — corrugated Colorbond steel sheet systems — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}
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
                  <div className="mt-0.5">
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
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
                  <p className="mt-1 text-xs text-slate-600">{product.procurementSources}</p>
                  <p className="mt-2 text-[10px] italic text-slate-400">
                    Confirm suitability with the current manufacturer TDS before specifying or applying.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Brand Equivalence ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalence</h2>
            <p className="mt-1 text-sm text-slate-500">
              All three products share the same corrugated profile and BlueScope Colorbond substrate. Selection is driven by supply channel and local availability.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product A</th>
                <th className="px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product B</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-slate-700">Equivalence note</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.a}</td>
                  <td className="px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.b}</td>
                  <td className="px-5 py-3 text-slate-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of corrugated Colorbond sheet products. Confirm all selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lysaght Custom Orb</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Stramit Corrugated</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Stratco Corrugated</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.lysaght}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.stramit}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.stratco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Do not confuse ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Do not confuse Colorbond corrugated sheet with:</h3>
        </div>
        <ul className="space-y-2.5">
          {[
            "Trimdek (high-rib trapezoidal) — a different profile with a trapezoidal rib, different fixing system, and different span/loading tables. Not interchangeable with corrugated sheet.",
            "Klip-Lok (concealed fix) — completely different fixing mechanism using a concealed clip system, no through-fasteners in the field. Not interchangeable with corrugated sheet and requires a different substructure and installer competency.",
            "Zincalume corrugated — the same standard sinusoidal corrugated profile (76mm pitch, 762mm cover) but with an unpainted zinc-aluminium alloy substrate rather than a Colorbond painted finish. Not a like-for-like substitute where a painted finish is required.",
            "Uncoated galvanised iron (GI) sheet — older legacy corrugated product with a hot-dipped galvanised zinc coating, no paint finish. No longer used in new or replacement works in Australia. Do not specify or accept GI sheet as a replacement for Colorbond.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
