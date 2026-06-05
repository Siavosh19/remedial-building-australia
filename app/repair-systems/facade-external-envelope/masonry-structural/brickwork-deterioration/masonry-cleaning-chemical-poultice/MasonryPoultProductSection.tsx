"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Poultice"
  | "Attapulgite"
  | "Kaolin"
  | "Proprietary"
  | "Organic-stain"
  | "Oil-stain"
  | "Rust-stain"
  | "Masonry-cleaning"
  | "Heritage"
  | "Sensitive-substrate";

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
    fullLabel: "Site-mixed / Remmers IG Poultice",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#b45309",
    name: "Attapulgite clay + hydrogen peroxide poultice (organic stains)",
    descriptionLine: "Attapulgite clay mixed with 3–6% H₂O₂ — draws organic stains out of masonry pores by capillary action — suitable for heritage and acid-sensitive substrates — 24–72 hr dwell",
    productType: "Attapulgite clay + H₂O₂ poultice — organic stain removal — heritage and sensitive masonry",
    filterTags: ["Poultice", "Attapulgite", "Organic-stain", "Masonry-cleaning", "Heritage", "Sensitive-substrate"],
    techChips: [
      { label: "Attapulgite clay", cls: "bg-amber-100 text-amber-800" },
      { label: "H₂O₂ bleach", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage safe", cls: "bg-green-100 text-green-700" },
      { label: "24–72 hr dwell", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "A traditional poultice for removing organic stains (mould, algae, bird droppings, coffee, tannin, oil-based biological growth) from masonry on Class 2 strata buildings and heritage facades. Attapulgite (palygorskite) clay is mixed with hydrogen peroxide (3–6%) to form a paste at 10–15 mm application thickness. The clay draws the staining chemical out of the pore structure as it dries by capillary action — the peroxide bleaches organic compounds within the paste without leaving toxic residue. Suitable for heritage and sensitive stone substrates where acid cleaning is prohibited — sandstone, limestone, terracotta, and heritage brick. Must be kept moist during the full dwell period (24–72 hours) by covering with plastic sheeting — premature drying reverses the capillary action and redeposits the stain in the masonry surface. Multiple applications are often required for deep or old stains. Identify the stain type before selecting — attapulgite + H₂O₂ is for organic stains only; oil/grease stains require solvent-based poultice.",
    technicalProperties: [
      "Draws stains out of pore structure by capillary action as the clay dries — does not push stains deeper into the masonry",
      "Hydrogen peroxide bleaches organic compounds without leaving toxic chemical residue in the masonry",
      "Suitable for all masonry types including sandstone, limestone, terracotta, and heritage brick where acid is prohibited",
      "Non-destructive to substrate chemistry — no acid attack on calcium-based or sensitive substrates",
      "Can be repeated without substrate damage — allow 48 hours drying between application cycles",
      "Attapulgite clay available in 5–25 kg bags; H₂O₂ 3–6% available from pharmacies or industrial chemical supply",
    ],
    limitations: [
      "Slow process — poultice must dwell for 24–72 hours before removal; cover with plastic wrap in dry or windy conditions to maintain moisture",
      "Not suitable for oil/grease stains — requires a solvent-based poultice (kaolin + solvent) instead; wrong poultice on wrong stain type produces no result",
      "Multiple applications often required for deep or old stains — allow 48 hours drying between cycles",
      "Peroxide bleaches fabric, clothing, and some painted surfaces in contact with the wet poultice — protect all surrounds",
    ],
    procurementSources: [
      { name: "Remmers Australia — specialist masonry care, IG Poultice system", url: "https://www.remmers.com.au" },
      { name: "DryTreat — specialist masonry care products, national distributors", url: "https://www.drytreat.com" },
      { name: "Blackwoods — attapulgite clay and H₂O₂ industrial supply", url: "https://www.blackwoods.com.au" },
      { name: "Chem Supply Australia — H₂O₂ and attapulgite clay bulk chemical supply", url: "https://www.chemsupply.com.au" },
    ],
  },
  {
    fullLabel: "Site-mixed / Stain Solver Oil-Out",
    brandUrl: "https://www.stainsolvers.com.au",
    accentColor: "#0369a1",
    name: "Kaolin / paper pulp + solvent poultice (oil and grease stains)",
    descriptionLine: "Kaolin clay or paper pulp saturated with hydrocarbon solvent — draws oil, grease, tar, and hydrocarbon stains out of masonry pores — heritage and acid-sensitive substrates — fire risk during application",
    productType: "Kaolin / paper pulp + solvent poultice — oil and grease stain removal — heritage masonry",
    filterTags: ["Poultice", "Kaolin", "Oil-stain", "Masonry-cleaning", "Heritage", "Sensitive-substrate"],
    techChips: [
      { label: "Kaolin + solvent", cls: "bg-sky-100 text-sky-800" },
      { label: "Oil / grease / tar", cls: "bg-amber-100 text-amber-800" },
      { label: "Heritage safe", cls: "bg-green-100 text-green-700" },
      { label: "Fire risk — ventilate", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "A poultice for removing oil, grease, tar, and hydrocarbon stains from masonry facades on Class 2 strata buildings and heritage structures. Kaolin clay or paper pulp is saturated with a hydrocarbon solvent (acetone, naphtha, or mineral spirits matched to the stain type) to form an absorbent paste at 15 mm application thickness. The solvent dissolves the oil or grease; the clay or paper pulp absorbs it as the poultice dries, drawing the contamination out of the masonry pore structure. Suitable for heritage and all masonry types including sandstone and heritage terracotta — no acid is involved. Cover with plastic to control evaporation rate during the 24–48 hour dwell period. Fire risk during application and drying — eliminate all ignition sources and ventilate the work area. Solvent waste from removed poultice is classified as hazardous waste and must not be disposed of to stormwater.",
    technicalProperties: [
      "Draws oil/grease out of masonry pores by capillary action as poultice dries — does not spread contamination as surface scrubbing can",
      "Hydrocarbon solvent dissolves oils and greases that water-based cleaners cannot remove from porous masonry",
      "Suitable for sensitive substrates including sandstone and heritage terracotta — no acid used, no risk to calcium-based substrates",
      "Paper pulp alternative to kaolin is more economical and widely available from office supply",
      "Plastic cover during dwell period controls solvent evaporation rate and maximises extraction of oil from depth",
      "Multiple applications can be performed safely — allow 48 hours drying between cycles",
    ],
    limitations: [
      "Solvent-based — fire risk during application and drying; eliminate all ignition sources and maintain adequate ventilation throughout",
      "Solvent vapour in enclosed spaces — ensure ventilation before commencing; do not work in confined spaces without forced ventilation",
      "Solvent disposal is classified as hazardous waste — removed poultice and rinse materials cannot be disposed of to stormwater; confirm local EPA requirements",
      "Multiple applications required for thick or old oil contamination — may leave a faint ghost stain after treatment; manage client expectations",
    ],
    procurementSources: [
      { name: "Stain Solvers — specialist stain removal products nationally", url: "https://www.stainsolvers.com.au" },
      { name: "Blackwoods — kaolin clay, acetone and naphtha industrial supply", url: "https://www.blackwoods.com.au" },
      { name: "Chem Supply Australia — diatomaceous earth, solvents, hazardous waste disposal advice", url: "https://www.chemsupply.com.au" },
      { name: "Bunnings / Mitre 10 — acetone and mineral spirits available in store", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Remmers Poultice / DryTreat Stain-Proof / Lithofin Rust-Ex",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#7c3aed",
    name: "Proprietary masonry poultice system (rust and multi-stain)",
    descriptionLine: "Purpose-formulated proprietary poultice for rust, iron, and complex multi-stain masonry cleaning — oxalic acid or reducing agent in absorbent carrier — heritage council documentation available",
    productType: "Proprietary masonry poultice — rust / multi-stain removal — heritage and Class 2 masonry",
    filterTags: ["Poultice", "Proprietary", "Rust-stain", "Organic-stain", "Oil-stain", "Masonry-cleaning", "Heritage", "Sensitive-substrate"],
    techChips: [
      { label: "Proprietary system", cls: "bg-purple-100 text-purple-800" },
      { label: "Rust / iron stains", cls: "bg-amber-100 text-amber-800" },
      { label: "TDS + MSDS available", cls: "bg-slate-100 text-slate-700" },
      { label: "Trial area mandatory", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Purpose-formulated proprietary poultice products for specific masonry stains — particularly rust and iron staining (iron complex reducing agents such as oxalic acid or thiourea dioxide in an absorbent carrier) or multi-stain universal systems — on Class 2 strata buildings and heritage facades. Used where stain type is uncertain or complex, on heritage and conservation work where documented product data sheets are required by the heritage consultant or council, or where a single-product approach is specified. Remmers, DryTreat, and Lithofin manufacture products rated for heritage sandstone and limestone. Iron/rust staining requires a reducing agent that site-mixed clay and H₂O₂ cannot address. Confirm the correct product to the stain type using the manufacturer&apos;s stain guide before ordering. Trial area application (0.1 m² minimum) is mandatory before full-area treatment — photograph before and after for heritage council documentation. Do not mix proprietary products with site-mixed chemicals.",
    technicalProperties: [
      "Formulated for specific stain chemistry — superior performance over generic site-mixed options for rust and complex multi-stain applications",
      "Iron and rust staining responds to oxalic acid or thiourea dioxide reducing agents that attapulgite + H₂O₂ cannot address",
      "Product data sheets and MSDS available from manufacturers — required for heritage council and local government works approval submissions",
      "Consistent proprietary formulation — reduced risk of site-mixed error in active agent concentration and carrier ratio",
      "Some products rated for heritage sandstone and limestone — confirm substrate compatibility with manufacturer before specifying",
      "Available in 1–5 kg tubs or kits; coverage typically 1–3 m² per kg at specified thickness",
    ],
    limitations: [
      "Higher cost than site-mixed poultice options — justify use where documentation, rust staining, or heritage compliance requires a proprietary system",
      "Must match the correct product to the stain type — consult manufacturer&apos;s stain guide; wrong product produces no result and wastes time",
      "Some rust-removing products contain oxalic acid which is prohibited on some heritage materials — confirm substrate compatibility with manufacturer",
      "Lead time may apply for specialist products from European manufacturers such as Remmers or Lithofin — confirm availability before specifying",
    ],
    procurementSources: [
      { name: "Remmers Australia — specialist masonry and heritage conservation products", url: "https://www.remmers.com.au" },
      { name: "DryTreat — specialist masonry care products including Stain-Proof, national", url: "https://www.drytreat.com" },
      { name: "Lithofin Australia — Rust-Ex and specialist stone care products", url: "https://www.lithofin.com.au" },
      { name: "Parchem Construction Supplies — specialist masonry care products nationally", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Poultice", label: "Poultice" },
  { id: "Attapulgite", label: "Attapulgite clay" },
  { id: "Kaolin", label: "Kaolin / paper pulp" },
  { id: "Proprietary", label: "Proprietary system" },
  { id: "Organic-stain", label: "Organic stain" },
  { id: "Oil-stain", label: "Oil / grease stain" },
  { id: "Rust-stain", label: "Rust stain" },
  { id: "Masonry-cleaning", label: "Masonry cleaning" },
  { id: "Heritage", label: "Heritage" },
  { id: "Sensitive-substrate", label: "Sensitive substrate" },
];

const SYSTEM_COMPARISON: {
  product: string;
  activeAgent: string;
  targetStain: string;
  acidSensitiveOK: string;
  dwellTime: string;
  skillLevel: string;
  cost: string;
}[] = [
  {
    product: "Attapulgite + H₂O₂",
    activeAgent: "Peroxide bleach",
    targetStain: "Organic / biological",
    acidSensitiveOK: "Yes",
    dwellTime: "24–72 hr",
    skillLevel: "Low",
    cost: "$",
  },
  {
    product: "Kaolin + solvent",
    activeAgent: "Hydrocarbon solvent",
    targetStain: "Oil / grease / tar",
    acidSensitiveOK: "Yes",
    dwellTime: "24–48 hr",
    skillLevel: "Moderate",
    cost: "$",
  },
  {
    product: "Proprietary system",
    activeAgent: "Varies (oxalic etc.)",
    targetStain: "Rust / multi-stain",
    acidSensitiveOK: "Confirm per product",
    dwellTime: "12–48 hr",
    skillLevel: "Moderate",
    cost: "$$$",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Removal of organic stains (mould, algae, bird droppings, tannin, biological growth) from heritage brick, sandstone, limestone, and terracotta facades",
    "Removal of oil, grease, tar, and hydrocarbon stains from masonry facades where surface scrubbing would spread the contamination",
    "Rust and iron staining removal from masonry surfaces — from corroding embedded fixings, iron pipe runoff, or reinforcement bar corrosion",
    "Stain removal on heritage and conservation works where acid cleaning is prohibited and documented product data sheets are required",
    "Multi-stain treatment on acid-sensitive substrates where a single-product proprietary system is specified by the heritage consultant",
  ],
  selectionCriteria: [
    "Identify the stain type before selecting the poultice — organic/biological stains respond to attapulgite + H₂O₂; oil/grease responds to solvent-based carrier; rust responds to oxalic acid or reducing agent",
    "Commission a trial area (minimum 0.1 m²) on an inconspicuous section before treating the full facade — confirm stain lift and no substrate damage",
    "For heritage or council-listed buildings, photograph the trial area before and after and document the product used — heritage consultants and councils often require this for approval",
    "Keep the poultice moist during the full dwell period by covering with plastic sheeting — premature drying reverses capillary action and redeposits the stain",
    "Multiple lighter applications outperform one heavy application — allow 48 hours drying between cycles",
    "Identify the source of recurring stains (corroding fixings, pipe runoff) and rectify the source before treating the stain — without source correction, staining will recur",
  ],
  limitations: [
    "Wrong poultice on wrong stain type produces no result — stain identification is mandatory before product selection",
    "Do not attempt poultice cleaning on actively wet or damp substrates — the poultice cannot draw out the stain against the inward water pressure",
    "Remove the poultice with a plastic scraper (not metal) before it fully hardens and bonds to the masonry — hardened poultice can be very difficult to remove from soft stone without damage",
    "Do not use solvent-based poultices near ignition sources or in poorly ventilated enclosed spaces",
    "Some proprietary products containing oxalic acid are prohibited on limestone and some heritage materials — confirm substrate compatibility before specifying",
  ],
  standardsNotes: [
    "Heritage Council of NSW / state heritage authorities — trial area documentation requirements for stain removal on listed buildings",
    "ICOMOS Guidelines for the Conservation of Stone — relevant to heritage poultice applications on sandstone and limestone",
    "Safe Work Australia — hazardous substances handling requirements for solvent-based poultice work",
    "Manufacturer SDS and TDS — mandatory on site for all proprietary poultice products; SDS required for heritage council submissions",
    "EPA state regulations — hazardous waste disposal requirements for solvent-contaminated poultice material",
  ],
  suitableDefects: [
    "Organic surface staining — mould, algae, biological growth, bird droppings, and tannin deposits on masonry facades and courtyard paving",
    "Oil and grease staining — from machinery, vehicles, cooking oils, or lubricant runoff onto masonry paving or walls",
    "Rust and iron staining — from corroding embedded steel fixings, balustrade bases, iron pipes, or reinforcement bar at cracked sections",
    "Complex or unidentified stains where a proprietary multi-stain system with documented chemistry is required",
    "Heritage masonry staining where acid cleaning is prohibited and a non-destructive poultice approach is mandated by the heritage consultant",
  ],
  typicalSubstrates: [
    "Sandstone — attapulgite + H₂O₂ and kaolin + solvent poultices are safe on sandstone; acid cleaning is prohibited",
    "Limestone — same safety profile as sandstone; confirm proprietary products with manufacturer before applying any acidic formulations",
    "Heritage clay brick and terracotta — fired clay heritage brick and terracotta are acid-sensitive; poultice approach preferred",
    "Modern fired clay brick — poultice approach for stains where acid cleaning is technically appropriate but impractical (occupied areas, delicate surfaces)",
    "Concrete masonry and concrete — poultice can be used for specific stain types; acid cleaning may be more efficient for large areas",
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

export function MasonryPoultIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are masonry chemical poultice cleaning systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Masonry chemical poultice cleaning systems use an absorbent carrier material (attapulgite clay, kaolin, paper pulp, or a proprietary absorbent) saturated with an active chemical agent to draw specific stains out of the masonry pore structure by capillary action as the poultice dries. Poultice cleaning is the preferred method for heritage and acid-sensitive substrates — sandstone, limestone, terracotta, and hand-made brick — where acid cleaning is prohibited.
        </p>
        {expanded && (
          <>
            <p>
              The fundamental rule in poultice cleaning is matching the active chemical agent to the stain chemistry. Organic and biological stains (mould, algae, bird droppings, tannin) respond to oxidising agents such as hydrogen peroxide mixed into attapulgite clay. Oil and grease stains respond to hydrocarbon solvents (acetone, naphtha, mineral spirits) carried in kaolin or paper pulp. Rust and iron staining requires reducing agents such as oxalic acid or thiourea dioxide that dissolve iron complexes — these are available in proprietary poultice formulations from specialist manufacturers. Using the wrong poultice type will produce no result and waste time.
            </p>
            <p>
              A trial area application of 0.1–0.2 m² on an inconspicuous section is mandatory before treating any significant area. For heritage-listed buildings, the trial area result must be photographed and documented before the full-area treatment proceeds. The poultice must be kept moist during the full dwell period — cover with plastic sheeting immediately after application. Premature drying reverses the capillary draw and redeposits the stain in the surface. Remove with a plastic scraper (not metal) before the poultice fully hardens. Multiple lighter applications at standard thickness outperform a single heavy application — allow 48 hours drying between cycles.
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

export function MasonryPoultProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — chemical poultice masonry cleaning — scroll to view all</p>
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
              Side-by-side comparison of chemical poultice masonry cleaning systems. Identify stain type before selecting. Confirm substrate compatibility with manufacturer before specifying proprietary products.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Active agent</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Target stain</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Acid-sensitive OK</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Dwell time</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Skill level</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cost</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.activeAgent}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.targetStain}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.acidSensitiveOK}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.dwellTime}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.skillLevel}</td>
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
