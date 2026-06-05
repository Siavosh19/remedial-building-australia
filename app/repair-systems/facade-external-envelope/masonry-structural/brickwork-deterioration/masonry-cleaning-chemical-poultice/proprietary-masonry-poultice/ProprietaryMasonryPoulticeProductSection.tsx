"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Remmers"
  | "PROSOCO"
  | "Conservation-specialist"
  | "Proprietary"
  | "Poultice"
  | "Rust-stain"
  | "Multi-stain"
  | "Heritage"
  | "Chelating-agent"
  | "Masonry-cleaning";

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
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#0369a1",
    name: "Remmers VWS — Vialit-based rust and multi-stain poultice system",
    descriptionLine: "Remmers VWS proprietary chelating-agent masonry poultice — rust, iron oxide, and metallic stain removal from masonry — documented TDS and SDS — heritage and conservation tested — suitable for sandstone, limestone, clay brick, and terracotta",
    productType: "Proprietary chelating agent poultice — rust and iron oxide stain removal — heritage conservation",
    filterTags: ["Remmers", "Proprietary", "Poultice", "Rust-stain", "Multi-stain", "Heritage", "Chelating-agent", "Masonry-cleaning"],
    techChips: [
      { label: "Remmers VWS", cls: "bg-sky-100 text-sky-800" },
      { label: "Chelating agent", cls: "bg-amber-100 text-amber-800" },
      { label: "Rust / iron oxide", cls: "bg-red-100 text-red-700" },
      { label: "Heritage tested", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Remmers VWS is a proprietary poultice formulation for rust, iron oxide, and metallic stain removal from masonry facades on Australian Class 2 strata buildings and heritage structures. Pre-formulated chelating and reducing agent system — avoids the variable chemistry risk of site-mixed oxalic acid or thiourea dioxide formulations. Product data sheet and SDS available from Remmers Australia — required for heritage council and local government conservation submissions. Tested for compatibility with sandstone, limestone, clay brick, and terracotta. Apply at 10–15 mm thickness, cover with plastic sheeting to slow drying, and allow the full dwell period specified in the TDS. The chelating agent draws iron ions out of the masonry pore structure and binds them in the poultice carrier — the staining is removed with the dried poultice. Always rectify the rust source (corroding wall ties, fixings, embedded steel) before treating the stain — without source rectification, rust staining will immediately recur after treatment. Multiple applications may be required for deep or longstanding rust staining.",
    technicalProperties: [
      "Proprietary chelating agent formulation — controlled active chemistry; no site-mixing errors; consistent batch quality",
      "Rust and iron oxide stain removal — effective for staining from corroding wall ties, balustrade bases, embedded fixings, and structural steel",
      "Product data sheet and SDS available — required for heritage council submissions and local government conservation works approval",
      "Tested for heritage sandstone, limestone, and terracotta — confirmed non-destructive to acid-sensitive calcium-based substrates",
      "Available from Remmers Australia nationally — technical support available from Remmers representatives",
      "Application: 10–15 mm paste, plastic cover, dwell per TDS; remove with plastic scraper, flush with clean water",
    ],
    limitations: [
      "Rectify rust source before treating stain — without source rectification, rust staining will immediately recur after treatment",
      "Trial area mandatory — apply to minimum 0.1 m² inconspicuous section; confirm stain lift and no substrate damage before full treatment",
      "Not suitable for oil, grease, or organic staining — specify attapulgite + H₂O₂ for organic stains and kaolin + solvent for oil and grease",
      "Lead time may apply — confirm Remmers VWS availability before specifying for urgent remediation works",
      "Higher cost than generic formulations — justified where heritage documentation, consistent formulation, or technical support is required",
    ],
    procurementSources: [
      { name: "Remmers Australia — specialist masonry and heritage conservation products nationally", url: "https://www.remmers.com.au" },
      { name: "Parchem Construction Supplies — specialist masonry care products nationally", url: "https://www.parchem.com.au" },
      { name: "DryTreat — specialist masonry care products including Remmers range, national distributors", url: "https://www.drytreat.com" },
    ],
  },
  {
    fullLabel: "PROSOCO Inc",
    brandUrl: "#",
    accentColor: "#b45309",
    name: "PROSOCO Vana Trol and Restoration Cleaners — specialist masonry stain removal",
    descriptionLine: "PROSOCO specialist masonry restoration cleaners for rust, metallic oxide, graffiti, and multi-stain removal — US-manufactured formulations with documented application history on heritage and commercial masonry — specialist import supply for Australian projects",
    productType: "PROSOCO specialist masonry restoration cleaner — rust, metallic and multi-stain removal — import supply",
    filterTags: ["PROSOCO", "Proprietary", "Poultice", "Rust-stain", "Multi-stain", "Heritage", "Chelating-agent", "Masonry-cleaning"],
    techChips: [
      { label: "PROSOCO", cls: "bg-amber-100 text-amber-800" },
      { label: "Rust + metallic", cls: "bg-red-100 text-red-700" },
      { label: "Multi-stain range", cls: "bg-sky-100 text-sky-800" },
      { label: "Import supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "PROSOCO is a specialist US masonry cleaning and surface treatment manufacturer with a comprehensive range of proprietary restoration cleaning products for complex masonry staining including rust, metallic oxide, efflorescence, graffiti, and multi-component staining. The PROSOCO Vana Trol range addresses vanadium and iron staining on calcium silicate and concrete masonry; the Restoration Cleaners address rust and metallic staining on heritage brick, sandstone, and limestone. PROSOCO products are used extensively in North American heritage building conservation and commercial facade remediation with documented performance data. Available in Australia through specialist import channels — confirm distributor and lead time before specifying on time-critical projects. Always commission a trial area before full application; confirm specific PROSOCO product formulation addresses the target stain chemistry with the Australian distributor before ordering.",
    technicalProperties: [
      "Comprehensive stain range — rust, vanadium, metallic oxide, graffiti, and multi-component staining formulations available",
      "Heritage conservation reference — widely documented application on heritage masonry in North America",
      "Product TDS and SDS available — documented formulations for method approval submissions",
      "Vana Trol range — specific to vanadium and metallic staining on calcium silicate brick and concrete masonry",
      "Restoration Cleaners — chelating agent formulations for rust and iron oxide staining on brick, sandstone, and limestone",
    ],
    limitations: [
      "Specialist import supply from USA — requires advance procurement planning; confirm Australian distributor before specifying",
      "Lead time for import stock — allow programme time; do not specify for time-critical projects without confirming stock availability",
      "Confirm specific product for stain type — PROSOCO range covers multiple functions; not all products are poultice-form or rust-specific",
      "Higher cost than generic site-mixed formulations — cost-justified for complex heritage works requiring documented product data",
      "Confirm lead time before specifying — variable availability in Australian supply chain; confirm stock for large-volume projects",
    ],
    procurementSources: [
      { name: "PROSOCO Inc — specialist masonry restoration products (US manufacturer)", url: "#" },
      { name: "Specialist heritage and restoration suppliers — Australia (import channel)", url: "#" },
    ],
  },
  {
    fullLabel: "Conservation Specialist Suppliers",
    brandUrl: "#",
    accentColor: "#7c3aed",
    name: "Conservation specialist poultice formulations — site-specific heritage masonry treatment",
    descriptionLine: "Conservation specialist proprietary poultice formulations for complex heritage masonry staining — site-specific chelating and reducing agent systems developed by conservation chemists for individual building and substrate requirements — heritage authority approved",
    productType: "Conservation specialist poultice — site-specific heritage masonry treatment — authority approved",
    filterTags: ["Conservation-specialist", "Proprietary", "Poultice", "Rust-stain", "Multi-stain", "Heritage", "Masonry-cleaning"],
    techChips: [
      { label: "Conservation specialist", cls: "bg-purple-100 text-purple-800" },
      { label: "Site-specific", cls: "bg-green-100 text-green-700" },
      { label: "Heritage approved", cls: "bg-amber-100 text-amber-800" },
      { label: "Chemist formulated", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "For complex or unusual masonry staining on heritage-significant buildings where standard proprietary products (Remmers, PROSOCO) cannot address the specific stain chemistry or substrate, conservation specialist chemists and heritage masonry conservators can develop site-specific poultice formulations. These are typically engaged on heritage-listed buildings where the heritage authority requires a specific treatment methodology developed in consultation with a qualified conservation chemist. Examples include unusual mineral staining from heritage building materials, complex multi-stain scenarios on rare stone substrates, or treatment of staining on substrates where standard chelating agents are contraindicated. Conservation specialist poultice formulations are developed in consultation with the heritage authority and building owner — they require more programme time and cost than standard proprietary products but provide the documentation and methodology control required for heritage authority approval on sensitive buildings.",
    technicalProperties: [
      "Site-specific formulation — developed by a conservation chemist for the specific stain type and substrate of each individual project",
      "Heritage authority alignment — methodology developed in consultation with the heritage consultant and relevant authority",
      "Documentation-led approach — full product data, trial area protocol, and heritage consultant sign-off before commencing",
      "Substrate-first chemistry — active agent and carrier selected after substrate testing; no assumption of compatibility with standard formulations",
      "Trial area mandatory — all conservation specialist treatments require a documented trial before full-facade application",
    ],
    limitations: [
      "Higher cost and longer programme — conservation specialist engagement, formulation development, and heritage authority approval all add time and cost",
      "Not suitable for standard commercial remediation — use Remmers or PROSOCO for typical rust and multi-stain removal on non-heritage buildings",
      "Requires a qualified conservation chemist or masonry conservator — not available through standard trade supply chains",
      "Programme lead time — allow 4–8 weeks for consultation, formulation development, trial application, and authority approval",
      "Confirm heritage authority requirements before engaging — not all heritage-listed buildings require this level of specialist intervention",
    ],
    procurementSources: [
      { name: "Australia ICOMOS — heritage conservation practitioners and masonry conservators", url: "#" },
      { name: "Heritage building conservation specialists — state-based practitioners", url: "#" },
      { name: "State heritage authority consultants lists — NSW Heritage Office, Heritage Victoria, Heritage WA", url: "#" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Remmers", label: "Remmers" },
  { id: "PROSOCO", label: "PROSOCO" },
  { id: "Conservation-specialist", label: "Conservation specialist" },
  { id: "Proprietary", label: "Proprietary" },
  { id: "Poultice", label: "Poultice" },
  { id: "Rust-stain", label: "Rust stain" },
  { id: "Multi-stain", label: "Multi-stain" },
  { id: "Heritage", label: "Heritage" },
  { id: "Chelating-agent", label: "Chelating agent" },
  { id: "Masonry-cleaning", label: "Masonry cleaning" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  stainType: string;
  active: string;
  heritage: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Remmers Australia",
    product: "Remmers VWS",
    stainType: "Rust / iron oxide / metallic",
    active: "Chelating agent (proprietary)",
    heritage: "Yes — tested",
    distribution: "Remmers national supply",
    keyFeature: "TDS / SDS — heritage documentation",
    primaryUse: "Rust stain — heritage works",
  },
  {
    supplier: "PROSOCO Inc",
    product: "Vana Trol / Restoration Cleaners",
    stainType: "Rust / vanadium / metallic / multi",
    active: "Chelating agent (formulation-specific)",
    heritage: "Yes — extensive reference",
    distribution: "Specialist import — confirm lead time",
    keyFeature: "Comprehensive stain range; N. American heritage reference",
    primaryUse: "Complex rust / vanadium / multi-stain",
  },
  {
    supplier: "Conservation Specialist",
    product: "Site-specific formulation",
    stainType: "Complex / unusual / heritage substrate",
    active: "Site-specific — chemist developed",
    heritage: "Yes — authority aligned",
    distribution: "Specialist engagement — conservation chemist",
    keyFeature: "Authority approval; substrate-specific chemistry",
    primaryUse: "Heritage-listed buildings — complex or rare substrate",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Rust and iron oxide stain removal from masonry facades where the rust source has been rectified — corroding wall ties, embedded fixings, balustrade bases",
    "Metallic oxide staining on masonry from bronze, copper, or aluminium elements — green and blue-grey staining characteristic of non-ferrous metals",
    "Vanadium staining (green-yellow) on calcium silicate brick and concrete masonry from vanadium compounds in the masonry materials",
    "Complex multi-component staining on heritage-listed masonry facades where single-chemistry approaches have failed",
    "Heritage building masonry cleaning where documented proprietary product data is required for heritage authority method approval",
  ],
  selectionCriteria: [
    "Identify and rectify the rust source before treating the stain — without source rectification, rust staining will immediately recur after treatment",
    "Commission a trial area (minimum 0.1 m²) on an inconspicuous section before full-facade treatment — confirm stain lift and no substrate damage",
    "For heritage-listed buildings, photograph the trial area before and after and document the product used for heritage council submission",
    "Confirm specific product addresses the target stain chemistry — rust, vanadium, and multi-stain products have different active agents",
    "Confirm Australian distributor and lead time before specifying — specialist import products may not be available for time-critical projects",
    "Use conservation specialist formulations for heritage-significant buildings where standard products are contraindicated for the substrate",
  ],
  limitations: [
    "Wrong product on wrong stain type produces no result — confirm stain identification before specifying",
    "Some proprietary rust products contain oxalic acid — prohibited on certain heritage limestone and marble substrates; confirm with supplier",
    "Do not mix proprietary products with site-mixed chemicals — formulations are balanced systems; adding site-mixed components changes the chemistry",
    "Source rectification mandatory — treating rust staining without rectifying the corroding steel source is temporary; staining will recur",
    "Heritage authority approval may be required — not all products are pre-approved for heritage council works; allow programme time for approval",
  ],
  standardsNotes: [
    "Heritage Council NSW and equivalent state authorities — trial area documentation requirements for chemical cleaning of heritage-listed masonry",
    "ICOMOS Guidelines for the Conservation of Historic Places — relevant to chemical cleaning methodology selection on heritage structures",
    "Safe Work Australia — chemical handling and PPE requirements apply to all proprietary poultice products",
    "Manufacturer SDS and TDS — mandatory on site; required for heritage council and government works submissions",
    "EPA state regulations — waste disposal requirements for poultice material and rinse water containing chelating agents",
  ],
  suitableDefects: [
    "Rust and iron oxide staining on masonry facades from corroding embedded wall ties, fixings, or structural steel elements",
    "Vanadium staining (green-yellow) on calcium silicate brick and concrete masonry",
    "Bronze, copper, or aluminium metallic oxide staining (green, blue-grey) on masonry below non-ferrous cladding or fittings",
    "Complex multi-component staining on heritage facades where stain identification confirms a chelating agent approach is required",
    "Heritage masonry staining where documented product data and heritage authority method approval is required",
  ],
  typicalSubstrates: [
    "Clay brick — all listed proprietary products suitable; confirm specific product compatibility with supplier for heritage brick",
    "Calcium silicate brick — PROSOCO Vana Trol specific to vanadium staining on calcium silicate; confirm other products with supplier",
    "Natural stone (sandstone, limestone) — Remmers and conservation specialist products have tested heritage stone application history; confirm before use",
    "Concrete masonry — confirm active agent compatibility with concrete substrate; some chelating agents can affect cement matrix",
    "Terracotta and heritage glazed ceramic — confirm product suitability with conservation specialist before applying to decorative heritage elements",
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
              {src.url && src.url !== "#" ? (
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

export function ProprietaryMasonryPoulticeIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are proprietary masonry poultice systems for rust and multi-stain?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Proprietary masonry poultice systems for rust and multi-stain removal are pre-formulated chelating and reducing agent products from specialist suppliers including Remmers Australia, PROSOCO, and conservation specialists. They address rust, iron oxide, vanadium, metallic oxide, and complex multi-component staining where site-mixed poultice combinations (attapulgite/H₂O₂ for organics, kaolin/solvent for oil) cannot deliver the required stain chemistry. Mandatory requirement: identify and rectify the rust source before treating the stain — corroding wall ties, balustrade base plates, or embedded fixings must be repaired or isolated before poultice treatment.
        </p>
        {expanded && (
          <>
            <p>
              The critical distinction from site-mixed poultice types is the active chemistry: rust removal requires a chelating agent (binds iron ions and draws them out of the masonry pore structure) or an oxalic acid or thiourea dioxide reducing agent. Standard attapulgite + H₂O₂ has no effect on rust deposits. Proprietary products from Remmers and PROSOCO provide consistent formulations with documented TDS and SDS — essential for heritage council method approval and consistent results across large areas. Without source rectification (corroding embedded metal), the rust stain will recur within weeks of treatment regardless of the product used.
            </p>
            <p>
              For heritage-listed buildings, a trial area of minimum 0.1 m² on an inconspicuous section is mandatory before treating the full facade. Some proprietary rust-removing products contain oxalic acid — prohibited on certain heritage limestone and marble substrates. Confirm substrate compatibility with the manufacturer before specifying. Do not mix proprietary products with site-mixed chemicals — the formulations are balanced systems and adding other agents changes the chemistry unpredictably. Confirm lead time before specifying specialist import products (PROSOCO) — variable availability in the Australian supply chain can affect programme on time-critical projects.
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

export function ProprietaryMasonryPoulticeProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — proprietary masonry poultice — rust and multi-stain — scroll to view all</p>
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
                style={{ borderLeftWidth: 4, borderLeftColor: product.accentColor }}
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
                      {product.brandUrl !== "#" && (
                        <a
                          href={product.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
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
              Side-by-side comparison of proprietary masonry poultice systems for rust and multi-stain removal. Confirm stain type is rust, metallic oxide, or vanadium before selecting — wrong poultice type on organic or oil staining produces no result.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Stain type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Active</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.stainType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.active}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.heritage}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.keyFeature}</td>
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
