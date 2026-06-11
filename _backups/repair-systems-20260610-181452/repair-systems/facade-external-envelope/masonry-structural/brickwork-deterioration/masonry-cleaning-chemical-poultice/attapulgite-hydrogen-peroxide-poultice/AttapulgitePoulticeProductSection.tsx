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
  | "Organic-stain"
  | "Masonry-cleaning"
  | "Heritage"
  | "Sensitive-substrate"
  | "Hydrogen-peroxide"
  | "Brick"
  | "Sandstone";

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
    fullLabel: "Specialist Masonry Restoration Suppliers",
    brandUrl: "#",
    accentColor: "#0369a1",
    name: "Attapulgite clay + hydrogen peroxide poultice — organic stain removal",
    descriptionLine: "Attapulgite clay carrier + 3–6% hydrogen peroxide active — draws organic stains (moss, lichen, algae, bird droppings, tannin) out of masonry pores by capillary action — suitable for heritage and acid-sensitive substrates — 24–72 hr dwell",
    productType: "Attapulgite + H₂O₂ poultice — organic stain removal — heritage and sensitive masonry",
    filterTags: ["Poultice", "Attapulgite", "Organic-stain", "Masonry-cleaning", "Heritage", "Sensitive-substrate", "Hydrogen-peroxide", "Brick", "Sandstone"],
    techChips: [
      { label: "Attapulgite clay", cls: "bg-amber-100 text-amber-800" },
      { label: "H₂O₂ bleach active", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage safe", cls: "bg-green-100 text-green-700" },
      { label: "24–72 hr dwell", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "A traditional poultice for removing organic stains (mould, algae, moss, lichen, bird droppings, tannin, biological growth residue) from masonry on Class 2 strata buildings and heritage facades. Site-mixed from attapulgite (palygorskite) clay powder and hydrogen peroxide at 3–6% concentration. Apply at 10–15 mm thickness, cover with plastic sheeting immediately to prevent premature drying, and allow a full 24–72 hour dwell period. The clay draws the staining chemical out of the masonry pore structure as it dries by capillary action — the peroxide bleaches organic compounds within the paste without leaving toxic chemical residue. Suitable for heritage and acid-sensitive substrates (sandstone, limestone, terracotta, heritage brick) where acid cleaning is prohibited. Multiple applications are often required for deep or longstanding biological staining — allow 48 hours drying between cycles. Remove the dried poultice with a plastic scraper (not metal) and flush the surface with clean water. Identify the stain type before selecting — attapulgite + H₂O₂ is for organic stains only; oil and grease staining requires solvent-based kaolin poultice; rust staining requires a chelating agent or oxalic acid poultice.",
    technicalProperties: [
      "Stain type: Organic / biological — moss, lichen, algae residue, bird droppings, tannin, coffee, mould",
      "Carrier: Attapulgite (palygorskite) clay — absorbs staining chemical out of masonry pores by capillary action during drying",
      "Active: Hydrogen peroxide (3–6%) — bleaches organic compounds within the paste without leaving toxic residue",
      "Application: 10–15 mm thick paste; cover with plastic sheeting immediately to maintain moisture during full dwell period",
      "Dwell time: 24–72 hours — do not remove prematurely; premature drying reverses capillary action and redeposits stain",
      "Heritage safe: Non-destructive to calcium-based substrates — suitable for sandstone, limestone, terracotta, heritage brick",
      "Repeat applications: Multiple cycles at 48-hour drying intervals are more effective than single heavy application",
    ],
    limitations: [
      "Slow process — 24–72 hour dwell plus drying time between cycles; plan schedule accordingly for strata building remediation",
      "Not suitable for oil, grease, or hydrocarbon staining — specify kaolin + solvent poultice for these stain types",
      "Not suitable for rust or iron staining — specify proprietary chelating agent or oxalic acid poultice for rust removal",
      "Peroxide bleaches fabric, clothing, and some painted surfaces in contact with the wet poultice — protect all surrounds",
      "Must be covered with plastic sheeting in dry, hot, or windy conditions — premature drying reverses the capillary extraction",
      "Deep or historic stains may require 3–5 application cycles — manage client expectations for time and cost",
    ],
    procurementSources: [
      { name: "Blackwoods — attapulgite clay powder and H₂O₂ industrial supply", url: "https://www.blackwoods.com.au" },
      { name: "Chem Supply Australia — H₂O₂ and attapulgite clay bulk chemical supply", url: "https://www.chemsupply.com.au" },
      { name: "Specialist masonry restoration suppliers — pre-mixed poultice systems for organic stain removal", url: "https://www.blackwoods.com.au" },
      { name: "DryTreat — specialist masonry care products, national distributors", url: "https://www.drytreat.com" },
    ],
  },
  {
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#b45309",
    name: "Remmers IG Poultice — organic stain removal system",
    descriptionLine: "Professional attapulgite + hydrogen peroxide poultice system for organic stain removal from masonry — tested formulation with documented TDS — suitable for heritage sandstone, limestone, and terracotta — 24–72 hr dwell",
    productType: "Proprietary attapulgite + H₂O₂ poultice — organic stain removal — heritage conservation",
    filterTags: ["Poultice", "Attapulgite", "Organic-stain", "Masonry-cleaning", "Heritage", "Sensitive-substrate", "Hydrogen-peroxide", "Brick", "Sandstone"],
    techChips: [
      { label: "Remmers IG Poultice", cls: "bg-amber-100 text-amber-800" },
      { label: "Heritage tested", cls: "bg-green-100 text-green-700" },
      { label: "TDS + SDS available", cls: "bg-slate-100 text-slate-700" },
      { label: "24–72 hr dwell", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Remmers Australia manufactures the IG Poultice system — a professional proprietary attapulgite clay and hydrogen peroxide formulation specifically developed for organic stain removal from heritage and sensitive masonry substrates on Class 2 strata buildings, conservation works, and heritage-listed buildings. Pre-formulated for consistent carrier-to-active ratio — eliminates the risk of site-mixing errors that can under-dose the active or over-saturate the clay carrier. Product data sheet and SDS available from Remmers Australia — required for heritage council and local government conservation submissions. Tested and rated for use on heritage sandstone, limestone, and terracotta as well as fired clay brick. Apply at 10–15 mm thickness, cover with plastic sheeting to slow drying, remove after the full dwell period with a plastic scraper, and flush with clean water. Suitable for both Class 2 strata building organic stain remediation and heritage conservation works where documented product chemistry is required by the heritage consultant or authority. Multiple applications may be required for deep or historic biological staining.",
    technicalProperties: [
      "Remmers proprietary formulation — consistent carrier-to-active ratio; no site-mixing errors; controlled H₂O₂ concentration",
      "Product data sheet and SDS available — required for heritage council submissions and local government conservation works approval",
      "Tested for heritage sandstone, limestone, and terracotta — confirmed non-destructive to acid-sensitive calcium-based substrates",
      "Organic stain removal: mould, algae, moss, lichen, bird droppings, tannin deposits on masonry facades",
      "Available from Remmers Australia specialist distribution nationally — technical support available from Remmers representatives",
      "Application: 10–15 mm paste, plastic cover, 24–72 hr dwell; remove with plastic scraper, flush with clean water",
    ],
    limitations: [
      "Not suitable for oil, grease, rust, or complex multi-stain removal — specify kaolin solvent or proprietary rust poultice for these stain types",
      "Lead time may apply for specialist Remmers products — confirm availability before specifying for urgent remediation works",
      "Higher cost than site-mixed attapulgite and H₂O₂ — justified where heritage documentation, consistent formulation, or technical support is required",
      "Same dwell and process requirements apply as site-mixed — 24–72 hour dwell and plastic cover are mandatory regardless of product source",
    ],
    procurementSources: [
      { name: "Remmers Australia — specialist masonry and heritage conservation products nationally", url: "https://www.remmers.com.au" },
      { name: "DryTreat — specialist masonry care products including Remmers range, national distributors", url: "https://www.drytreat.com" },
      { name: "Parchem Construction Supplies — specialist masonry care products nationally", url: "https://www.parchem.com.au" },
      { name: "Blackwoods — specialist conservation products for commercial masonry restoration", url: "https://www.blackwoods.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Poultice", label: "Poultice" },
  { id: "Attapulgite", label: "Attapulgite clay" },
  { id: "Organic-stain", label: "Organic stain" },
  { id: "Hydrogen-peroxide", label: "Hydrogen peroxide" },
  { id: "Heritage", label: "Heritage" },
  { id: "Sensitive-substrate", label: "Sensitive substrate" },
  { id: "Masonry-cleaning", label: "Masonry cleaning" },
  { id: "Brick", label: "Brick" },
  { id: "Sandstone", label: "Sandstone / limestone" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  stainType: string;
  carrier: string;
  active: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Specialist masonry suppliers",
    product: "Site-mixed attapulgite + H₂O₂",
    stainType: "Organic / biological",
    carrier: "Attapulgite clay",
    active: "Hydrogen peroxide 3–6%",
    distribution: "Chemical supply / trade",
    keyFeature: "Low cost; widely sourced",
    primaryUse: "Organic stain — general masonry",
  },
  {
    supplier: "Remmers Australia",
    product: "Remmers IG Poultice",
    stainType: "Organic / biological",
    carrier: "Attapulgite clay (proprietary)",
    active: "H₂O₂ (formulated ratio)",
    distribution: "Remmers specialist supply",
    keyFeature: "TDS / SDS — heritage documentation",
    primaryUse: "Organic stain — heritage works",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Removal of moss, lichen, and algae residue staining from heritage brick, sandstone, limestone, and terracotta facades after biocide treatment",
    "Removal of bird dropping staining from masonry on Class 2 strata building facades where pressure washing would spread contamination",
    "Removal of tannin staining from masonry below timber elements or where organic material has leached onto the facade",
    "Organic stain removal from heritage-listed buildings where acid cleaning is prohibited and documented product data sheets are required",
    "Treatment of biological growth staining on acid-sensitive substrates (sandstone, limestone, terracotta) where surface acid wash would cause substrate damage",
  ],
  selectionCriteria: [
    "Confirm stain type is organic or biological before selecting attapulgite + H₂O₂ poultice — this system is for organic stains only",
    "Commission a trial area (minimum 0.1 m²) on an inconspicuous section before full-facade treatment — confirm stain lift and no substrate damage",
    "For heritage-listed buildings, photograph the trial area before and after and document the product used — required by heritage consultants and councils",
    "Cover the poultice with plastic sheeting immediately after application — premature drying reverses capillary extraction and redeposits the stain",
    "Multiple lighter applications outperform one heavy application — allow 48 hours complete drying between application cycles",
    "Identify and rectify the source of recurring biological staining (leaking gutters, shaded north faces) before treating — without source correction, staining will recur",
  ],
  limitations: [
    "Wrong poultice on wrong stain type produces no result — oil and grease require solvent-based kaolin carrier; rust requires chelating agent",
    "Do not attempt on actively wet or damp substrates — inward water pressure prevents the capillary draw from extracting the stain",
    "Remove with plastic scraper before poultice fully hardens and bonds to the masonry — hardened poultice on soft stone is very difficult to remove without damage",
    "Peroxide bleaches fabric, clothing, and some paint finishes — protect all surrounding materials before application",
    "Multiple applications are often required — deep or historic staining may require 3–5 cycles at 48-hour intervals",
  ],
  standardsNotes: [
    "Heritage Council of NSW and state heritage authorities — trial area documentation requirements for stain removal on listed buildings",
    "ICOMOS Guidelines for the Conservation of Stone — relevant to heritage poultice applications on sandstone and limestone",
    "Safe Work Australia — hazardous substances handling for H₂O₂; SDS must be on site for all poultice cleaning operations",
    "Manufacturer SDS and TDS — mandatory on site; required for heritage council and government works submissions for Remmers products",
    "EPA state regulations — waste disposal requirements for poultice material and rinse water",
  ],
  suitableDefects: [
    "Organic surface staining — mould, algae, biological growth, bird droppings, tannin deposits on masonry and sandstone facades",
    "Moss and lichen residue staining after biocide treatment — biocide kills the growth but organic pigment staining remains in the pores",
    "Heritage masonry staining where acid cleaning is prohibited and a non-destructive poultice approach is mandated",
    "Biological growth staining on sandstone, limestone, and terracotta where acid cleaning would dissolve the substrate",
    "Courtyard paving organic staining on heritage masonry where pressure washing would spread contamination or damage the surface",
  ],
  typicalSubstrates: [
    "Sandstone — attapulgite + H₂O₂ is safe on sandstone; acid cleaning is prohibited on sandstone",
    "Limestone — same safety profile as sandstone; confirm proprietary products with manufacturer before applying",
    "Heritage clay brick and terracotta — acid-sensitive heritage substrates where poultice is the preferred approach",
    "Modern fired clay brick — poultice for organic staining where acid cleaning is technically appropriate but the stain type requires an oxidising agent",
    "Concrete masonry — poultice can be used for organic staining; acid cleaning may be more efficient for large areas of calcium deposits",
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

export function AttapulgitePoulticeIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is attapulgite clay + hydrogen peroxide poultice?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Attapulgite clay (palygorskite) combined with hydrogen peroxide at 3–6% concentration is the standard poultice formulation for removing organic stains — mould, algae, moss residue, lichen, bird droppings, tannin, and biological growth pigments — from masonry facades. The clay carrier draws the staining compound out of the masonry pore structure by capillary action as the poultice slowly dries; the hydrogen peroxide bleaches organic compounds within the paste. Suitable for all masonry types including acid-sensitive substrates (sandstone, limestone, terracotta) where acid cleaning is prohibited.
        </p>
        {expanded && (
          <>
            <p>
              The critical rule is stain type identification before selection. Attapulgite + H₂O₂ is for organic and biological stains only — it has no effect on oil and grease staining, rust and iron staining, or calcium carbonate (efflorescence) deposits. Applying the wrong poultice type wastes time and materials. The poultice must be applied at 10–15 mm thickness and covered with plastic sheeting immediately after application to prevent premature drying — premature drying reverses the capillary draw and redeposits the stain in the masonry surface rather than extracting it.
            </p>
            <p>
              For heritage-listed buildings, a trial area of minimum 0.1 m² on an inconspicuous section is mandatory before treating the full facade. Photograph and document the trial area before and after treatment for heritage council or local authority submission requirements. Multiple lighter applications at 48-hour drying intervals are more effective than a single heavy application — attempting to increase the H₂O₂ concentration beyond 6% does not improve results and can damage some substrates. Remove the dried poultice with a plastic scraper (not metal) and flush with clean water.
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

export function AttapulgitePoulticeProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 product systems — attapulgite clay + hydrogen peroxide poultice — scroll to view all</p>
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
              Side-by-side comparison of attapulgite + hydrogen peroxide poultice systems. Confirm stain type is organic or biological before selecting — wrong poultice on wrong stain type produces no result.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Carrier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Active</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.carrier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.active}</td>
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
