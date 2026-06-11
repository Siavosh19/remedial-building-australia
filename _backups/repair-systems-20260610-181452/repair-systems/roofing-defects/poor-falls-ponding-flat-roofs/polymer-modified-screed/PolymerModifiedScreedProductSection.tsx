"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Screed"
  | "ARDEX"
  | "Laticrete"
  | "Mapei"
  | "Rapid-set"
  | "Two-component"
  | "Self-levelling";

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
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-k-301/",
    accentColor: "#f97316",
    name: "ARDEX K 301",
    descriptionLine: "Rapid-hardening polymer-modified cementitious screed; 3–75mm in one pass; 24hr foot traffic; AS 4654 compatible; available nationally",
    productType: "Rapid-hardening polymer-modified cementitious screed",
    filterTags: ["Screed", "ARDEX", "Rapid-set"],
    techChips: [
      { label: "Screed", cls: "bg-orange-100 text-orange-800" },
      { label: "Rapid-set", cls: "bg-slate-100 text-slate-700" },
      { label: "3–75mm in one pass", cls: "bg-green-50 text-green-700" },
      { label: "AS 4654 compatible", cls: "bg-slate-100 text-slate-700" },
      { label: "24hr foot traffic", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX K 301 is a rapid-hardening, polymer-modified cementitious floor screed designed for fall correction on flat roofs, balconies, and podium slabs where drainage gradients must be re-established. The product can be applied in a single pass from 3mm up to 75mm, making it suitable for the full range of fall correction scenarios encountered in flat roof ponding remediation — from minor gradient adjustments to significant depth changes at sumps and outlets. Its polymer modification provides improved adhesion to concrete substrates and increased flexibility compared to plain cement screeds, reducing the risk of delamination or cracking under thermal movement. Foot traffic is achievable within 24 hours at standard conditions, allowing waterproofing membrane application to follow quickly. Compatible with ARDEX waterproofing membrane systems including ARDEX W 800 RF and ARDEX WPM series products. Available nationally through ARDEX Australia trade supply and specialist distributors. Confirm the current product TDS and substrate primer requirements with ARDEX Australia before specifying. Prime concrete substrate with ARDEX P 51 or equivalent ARDEX primer as required by current TDS.",
    technicalProperties: [
      "Rapid-hardening polymer-modified cementitious screed — single-pass 3–75mm application",
      "Foot traffic within 24 hours at standard temperature and humidity — suitable for fast-track programmes",
      "AS 4654 compatible — suitable under ARDEX waterproofing membrane systems",
      "Polymer modification provides improved bond to concrete substrate and increased flexibility",
      "Suitable for fall correction on flat roofs, balconies, podiums, and terraces",
      "Available nationally through ARDEX Australia trade supply",
      "Confirm primer requirements with ARDEX Australia — ARDEX P 51 or equivalent typically required",
    ],
    limitations: [
      "Substrate must be structurally sound, clean, and free of laitance, oils, and release agents before application",
      "Prime concrete substrate as required by ARDEX TDS — do not apply to un-primed substrates",
      "Confirm maximum single-pass thickness with current ARDEX TDS — 75mm limit may require formwork at edges",
      "Minimum fall must still be engineered correctly — screed achieves the fall but does not substitute for design",
      "Confirm membrane compatibility with ARDEX Australia before applying waterproofing system over cured screed",
      "Confirm current product name, formulation, and TDS with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "Laticrete Australia",
    brandUrl: "https://laticrete.com.au",
    tdsUrl: "https://laticrete.com.au/en-au/tile-stone-installation-systems/installation-systems/product-catalog/3701-mortar-admix",
    accentColor: "#0369a1",
    name: "Laticrete 3701 Mortar Admix System",
    descriptionLine: "Two-component polymer-modified screed system; mixed on site; 10–50mm thick; excellent bond to concrete substrate; compatible with Laticrete waterproofing",
    productType: "Two-component polymer-modified screed system",
    filterTags: ["Screed", "Laticrete", "Two-component"],
    techChips: [
      { label: "Two-component", cls: "bg-sky-100 text-sky-800" },
      { label: "10–50mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Polymer-modified", cls: "bg-green-50 text-green-700" },
      { label: "Excellent concrete bond", cls: "bg-slate-100 text-slate-700" },
      { label: "Laticrete WP compatible", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Laticrete 3701 Mortar Admix System is a two-component polymer-modified screed system consisting of Laticrete 3701 Mortar Admix liquid mixed with Portland cement and aggregate on site to produce a custom polymer-modified mortar bed or screed. The liquid admixture replaces the water component in a conventional cement and sand mix, producing a screed with significantly improved bond strength, flexibility, and reduced permeability. For flat roof fall correction, the system is typically applied at 10–50mm thickness to re-establish drainage gradients on concrete substrates where ponding has been identified. The polymer-modified mortar bonds effectively to existing concrete substrates when correctly primed and prepared, providing a trafficable, stable base for subsequent waterproofing membrane application. The system is particularly well suited to projects where Laticrete's 9237 Waterproofing Membrane or other Laticrete waterproofing systems will be applied over the screed, as compatibility is confirmed within the Laticrete system. Confirm primer requirements and the current product TDS with Laticrete Australia before specifying.",
    technicalProperties: [
      "Two-component system — Laticrete 3701 Mortar Admix liquid mixed with cement and aggregate on site",
      "10–50mm application range — suitable for the majority of flat roof fall correction scenarios",
      "Improved bond strength, flexibility, and reduced permeability versus plain cement mortar",
      "Compatible with Laticrete 9237 Waterproofing Membrane and other Laticrete waterproofing systems",
      "Excellent adhesion to concrete substrate when correctly primed and prepared",
      "Site-mixed system — aggregate and ratios can be adjusted for specific thickness requirements",
      "Available nationally through Laticrete Australia trade supply",
    ],
    limitations: [
      "Site-mixed system — consistent mixing ratios are critical for performance — confirm ratios with current Laticrete TDS",
      "Substrate must be sound, clean, and primed before application — confirm primer with Laticrete Australia",
      "10–50mm range — for greater depths confirm with Laticrete technical whether layering is required",
      "Not a self-levelling product — requires skilled float application to achieve consistent gradient",
      "Confirm trafficable time and membrane overlay timing with Laticrete Australia",
      "Confirm current product specification with Laticrete Australia before specifying",
    ],
    procurementSources: [
      { name: "Laticrete Australia — trade supply", url: "https://laticrete.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Online Tilers Store", url: "https://onlinetilersstore.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/ultraplan-eco",
    accentColor: "#16a34a",
    name: "Mapei Ultraplan Eco",
    descriptionLine: "Self-levelling polymer compound for fall correction up to 40mm; pumpable; 2hr trafficable; suitable under membranes and tiles",
    productType: "Self-levelling polymer-modified cementitious screed",
    filterTags: ["Screed", "Mapei", "Self-levelling"],
    techChips: [
      { label: "Self-levelling", cls: "bg-green-100 text-green-800" },
      { label: "Pumpable", cls: "bg-slate-100 text-slate-700" },
      { label: "2hr trafficable", cls: "bg-green-50 text-green-700" },
      { label: "Up to 40mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Membrane and tile compatible", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Ultraplan Eco is a self-levelling, polymer-modified cementitious compound designed for fall correction and floor levelling on concrete substrates. For flat roof ponding remediation, it provides a fast-track, self-levelling approach to re-establishing drainage gradients up to 40mm depth. Its self-levelling characteristic makes it particularly suitable for large roof areas where traditional trowel-applied screeds are labour-intensive, as the material flows to a consistent, flat finish with minimal raking, achieving the target gradient when applied over a pre-levelled or tapered datum. The pumpable formulation makes it practical for large commercial flat roof areas accessed via mechanical pump. Trafficable within 2 hours at standard conditions, making it one of the fastest-access products in this category. Suitable under waterproofing membranes and tile finishes. Confirm substrate primer requirements with Mapei Australia — Mapei Primer G or equivalent is typically required on porous or absorbent concrete surfaces. Confirm that the self-levelling characteristic is compatible with the gradient requirements — on very low-slope applications, confirm that the product does not level out the designed fall.",
    technicalProperties: [
      "Self-levelling polymer-modified cementitious compound — suitable for fall correction up to 40mm",
      "Pumpable — suitable for large commercial flat roof areas with mechanical pump application",
      "Trafficable within 2 hours at standard conditions — fast-track programme compatibility",
      "Suitable under waterproofing membranes and ceramic, porcelain, and natural stone tiles",
      "Polymer modification provides bond to concrete substrate and reduced permeability",
      "Mapei Primer G or equivalent primer typically required on porous substrates",
      "Confirm maximum thickness and compatibility with Mapei Australia before specifying for applications above 40mm",
    ],
    limitations: [
      "Maximum 40mm — for deeper applications confirm with Mapei whether multiple pours or alternative product is required",
      "Self-levelling characteristic requires careful gradient design — confirm that product flow does not eliminate the engineered fall on very low-slope roofs",
      "Substrate must be primed — confirm primer product and application method with Mapei Australia before use",
      "Not suitable for application over unsound concrete — substrate must be prepared to achieve minimum pull-off strength",
      "Pump application requires correct equipment and operator — confirm pumpability with Mapei Australia for specific pump types",
      "Confirm current product specification with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Applied Building Products Australia", url: "https://www.appliedbuildingproducts.com.au" },
      { name: "Mosaic Co", url: "https://www.mosaicco.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Rapid-set", label: "Rapid-set" },
  { id: "Two-component", label: "Two-component" },
  { id: "Self-levelling", label: "Self-levelling" },
];

const BRAND_EQUIV = [
  {
    a: "ARDEX K 301",
    b: "Mapei Ultraplan Eco",
    note: "Both are self-levelling or rapid-set screeds suited to fall correction; ARDEX K 301 covers 3–75mm in one pass, Ultraplan Eco is self-levelling up to 40mm and pumpable.",
  },
  {
    a: "Laticrete 3701 Mortar Admix",
    b: "ARDEX K 15",
    note: "Both are polymer additive screed systems mixed on site with cement and aggregate; the admixture approach gives the installer control over mix ratios and aggregate grading.",
  },
  {
    a: "Mapei Ultraplan Eco",
    b: "— unique characteristic —",
    note: "Self-levelling and pumpable in this product group — distinguishes it from the trowel-applied systems above for large commercial flat roof fall correction.",
  },
];

const SYSTEM_COMPARISON: {
  attribute: string;
  ardex: string;
  laticrete: string;
  mapei: string;
}[] = [
  {
    attribute: "Fall range",
    ardex: "3–75mm single pass",
    laticrete: "10–50mm typical",
    mapei: "Up to 40mm",
  },
  {
    attribute: "Min depth",
    ardex: "3mm",
    laticrete: "10mm",
    mapei: "Confirm with TDS",
  },
  {
    attribute: "Trafficable time",
    ardex: "24 hours",
    laticrete: "Confirm with TDS",
    mapei: "2 hours",
  },
  {
    attribute: "Compatible membranes",
    ardex: "ARDEX WPM series, AS 4654 systems",
    laticrete: "Laticrete 9237, Laticrete WP systems",
    mapei: "Mapelastic Smart, Mapei WP systems",
  },
];

const TECH_INFO = [
  {
    title: "Substrate preparation requirements for screeds on existing concrete",
    items: [
      "Existing concrete must be structurally sound with a minimum pull-off tensile strength — confirm minimum value with screed manufacturer TDS (typically ≥1.5 MPa)",
      "Surface laitance, oil contamination, paint, and release agents must be removed by mechanical means — diamond grinding or shot blasting preferred",
      "Surface voids, spalls, and honeycombing must be patched with a compatible repair mortar and allowed to cure before screed application",
      "Concrete must be at a minimum 28 days cure before application of polymer-modified screed unless product TDS specifies otherwise",
      "Substrate moisture content must be within the product's permitted range — confirm with TDS and test before priming",
      "Primer application is required on most porous concrete surfaces — confirm primer product and coverage rate with manufacturer before specifying",
    ],
    icon: "bullet" as const,
  },
  {
    title: "Minimum falls per NCC/BCA for roofs and balconies",
    items: [
      "NCC (BCA) Volume One requires a minimum 1:100 (1%) fall to drainage outlets on flat roofs for Class 2–9 buildings",
      "AS 3740 recommends minimum 1:60 fall on balconies and trafficable roof areas where tiles or pavers are the finish",
      "Engineers and waterproofing consultants typically specify 1:80 to 1:40 for flat roofs with high ponding risk or complex drainage geometry",
      "The minimum fall is measured at the finished surface — the screed must achieve the fall at the top surface, accounting for substrate unevenness",
      "Confirm the required minimum fall with the project engineer or waterproofing consultant before designing screed thicknesses",
    ],
    icon: "check" as const,
  },
  {
    title: "Selecting screed thickness vs insulation board for fall correction",
    items: [
      "Polymer-modified screeds add dead load to the roof structure — confirm the structural engineer's permitted additional load per m² before specifying thickness",
      "Typical polymer-modified screeds weigh 18–22 kg/m² per 10mm of thickness — a 50mm fall correction screed adds approximately 90–110 kg/m²",
      "Tapered insulation boards typically weigh 3–15 kg/m² and are preferred where structural load constraints prevent the use of heavy screed",
      "Screeds are preferred where a trafficable, tiled, or paved finish is required — insulation boards require a membrane or overlay board to achieve trafficability",
      "Where thermal performance improvement is also required, tapered insulation boards offer combined fall correction and insulation in a single system",
      "On heritage or older structures with limited structural capacity, confirm load implications with the structural engineer before specifying screed",
    ],
    icon: "warn" as const,
  },
  {
    title: "Membrane compatibility after polymer screed",
    items: [
      "Allow the screed to cure fully before applying waterproofing membrane — minimum cure time varies by product and ambient conditions; confirm with TDS",
      "Prime the screed surface with the membrane manufacturer's recommended primer before applying liquid-applied or torch-on membranes",
      "Self-levelling screeds may have a smoother surface finish — mechanical keying or primer may be required to achieve adequate membrane bond",
      "Confirm that the screed has achieved the minimum moisture content permitted by the membrane manufacturer before application",
      "Where the screed is to be overlaid with single-ply membrane, confirm that the screed surface temperature is within the membrane's application range",
      "All transitions between screed and existing concrete must be detailed as movement joints or feathered — confirm detailing requirements with the membrane manufacturer",
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

export function PolymerModifiedScreedIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are polymer-modified screeds for flat roof fall correction?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Polymer-modified cementitious screeds are cement-based materials where a polymer admixture — either pre-blended in the powder or added as a liquid component — improves the mechanical properties of the screed compared to plain cement mortars. For flat roof fall correction, they are used to build up localised areas of the concrete deck to re-establish the minimum drainage gradient required by NCC/BCA (typically 1:100) and direct ponding water to drainage outlets.
        </p>
        {expanded && (
          <>
            <p>
              Unlike plain cement screeds, polymer-modified systems offer better bond to existing concrete, improved tensile strength, reduced shrinkage cracking, and greater flexibility under thermal cycling — all important properties on exposed flat roof environments. Some products in this category are rapid-setting, allowing waterproofing membrane application within 24 hours. Others are self-levelling and pumpable, making them suitable for large commercial roofs.
            </p>
            <p>
              Product selection must consider the required thickness range, structural load implications, fall gradient targets, compatibility with the waterproofing membrane system to be applied over the screed, and substrate preparation requirements. On buildings where structural capacity is limited, tapered insulation boards should be evaluated as a lower-weight alternative.
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

export function PolymerModifiedScreedProductSection() {
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
              Substrate preparation, minimum falls, screed vs insulation selection, membrane compatibility
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — polymer-modified screed systems for flat roof fall correction</p>
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
                {eq.b !== "— unique characteristic —" && (
                  <>
                    <span className="text-slate-400 text-xs font-bold">≈</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{eq.b}</span>
                  </>
                )}
                {eq.b === "— unique characteristic —" && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">{eq.b}</span>
                )}
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
              Side-by-side comparison of polymer-modified screed systems for flat roof fall correction. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">ARDEX K 301</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Laticrete 3701 System</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mapei Ultraplan Eco</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ardex}</td>
                  <td className="px-4 py-3 text-slate-600">{row.laticrete}</td>
                  <td className="px-4 py-3 text-slate-600">{row.mapei}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
