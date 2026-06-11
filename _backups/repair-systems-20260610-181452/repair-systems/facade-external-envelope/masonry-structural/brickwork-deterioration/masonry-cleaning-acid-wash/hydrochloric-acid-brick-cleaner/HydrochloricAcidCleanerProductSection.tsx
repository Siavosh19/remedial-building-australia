"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Acid-wash"
  | "Hydrochloric"
  | "Efflorescence"
  | "Mortar-stain"
  | "Masonry-cleaning"
  | "Brick"
  | "PPE-required"
  | "Pre-mixed"
  | "Site-diluted";

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
    fullLabel: "Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#0369a1",
    name: "Dilute HCl brick cleaner — 5–10% pre-mixed formulation",
    descriptionLine: "Pre-mixed 5–10% hydrochloric acid brick cleaner — removes mortar smears, cement staining and efflorescence on clay brick — full PPE mandatory — PP/HDPE mixing vessels only",
    productType: "Hydrochloric acid brick cleaner — pre-mixed — external clay brick masonry",
    filterTags: ["Acid-wash", "Hydrochloric", "Efflorescence", "Mortar-stain", "Masonry-cleaning", "Brick", "PPE-required", "Pre-mixed"],
    techChips: [
      { label: "Hydrochloric acid", cls: "bg-amber-100 text-amber-800" },
      { label: "5–10% pre-mixed", cls: "bg-slate-100 text-slate-700" },
      { label: "Full PPE mandatory", cls: "bg-red-100 text-red-700" },
      { label: "Pre-wet mandatory", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Parchem Construction Supplies offers a pre-mixed dilute hydrochloric acid brick cleaner at 5–10% concentration for removal of mortar smears, cement staining, and efflorescence from fired clay brick facades on Class 2 strata buildings and commercial masonry structures. The pre-mixed formulation eliminates the on-site dilution step, reducing handling risk associated with concentrated HCl. This is the most aggressive of the common masonry acid cleaners — effective on heavy Portland cement mortar splatter and calcium silicate scale. Pre-wetting all masonry surfaces before application is mandatory — saturate the substrate thoroughly with clean water before applying to prevent deep acid absorption into the brick body. After the 30–60 second dwell time, scrub and flush with large volumes of clean water. Neutralise with sodium bicarbonate solution and flush to pH 6 or above before stopping. NEVER use on sandstone, limestone, calcium silicate brick, Hebel, Siporex, or reconstituted stone. All adjacent metalwork, glazing, aluminium frames, and painted surfaces must be masked and protected before commencing. PP/HDPE mixing vessels only — never use galvanised or aluminium containers.",
    technicalProperties: [
      "Acid type: Hydrochloric (HCl) — 5–10% working concentration in pre-mixed formulation",
      "Application: Brush or low-pressure spray onto pre-wetted masonry surface — contact time 30–60 seconds",
      "Pre-wetting: Mandatory — saturate masonry with clean water before application to prevent deep acid absorption",
      "Neutralisation: Thorough water rinse required after treatment — test runoff pH to confirm pH 6+ before stopping",
      "PPE: Acid-resistant gloves, full face shield (not safety glasses), rubber apron, P2 respirator as minimum",
      "Compatible masonry: Fired clay brick (face brick and engineering brick) only — not limestone, marble, calcium silicate, or aluminium",
      "Standards: AS/NZS 1715 applies for confined space work; manufacturer SDS must be on site",
    ],
    limitations: [
      "NEVER use on sandstone, limestone, calcium silicate brick (Hebel/Siporex), marble, or reconstituted stone — HCl dissolves these calcium-based substrates irreversibly",
      "Severe damage to metalwork, aluminium frames, glazing, and galvanised surfaces if contacted — mask all adjacent materials thoroughly before commencing",
      "High fuming — hazardous chlorine gas in confined or poorly ventilated conditions; ensure adequate ventilation or use outdoors only",
      "Must not exceed 10% concentration for clay brick — higher concentrations cause surface etching and long-term spalling",
      "Residual acid must be fully neutralised and flushed — residual HCl causes ongoing mortar degradation, salt crystallisation, and re-efflorescence",
      "Do not apply in hot direct sun or high wind — acid dries too quickly on warm surfaces before the stain can be flushed",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — trade and specialist construction supply nationally", url: "https://www.parchem.com.au" },
      { name: "Blackwoods — industrial chemical supply including pre-mixed brick cleaners", url: "https://www.blackwoods.com.au" },
      { name: "Bunnings / Mitre 10 — pre-diluted brick cleaners available in store nationally", url: "https://www.bunnings.com.au" },
      { name: "Chem Supply Australia — bulk chemical supply; safety data sheets available", url: "https://www.chemsupply.com.au" },
    ],
  },
  {
    fullLabel: "Selleys / Dulux",
    brandUrl: "https://www.selleys.com.au",
    accentColor: "#b45309",
    name: "HCl-based brick cleaner — hardware distribution",
    descriptionLine: "HCl-based brick cleaner — widely available through hardware stores — pre-mixed working concentration — removes mortar smears and efflorescence from clay brick — PPE mandatory",
    productType: "Hydrochloric acid brick cleaner — hardware supply — external clay brick masonry",
    filterTags: ["Acid-wash", "Hydrochloric", "Efflorescence", "Mortar-stain", "Masonry-cleaning", "Brick", "PPE-required", "Pre-mixed"],
    techChips: [
      { label: "Hydrochloric acid", cls: "bg-amber-100 text-amber-800" },
      { label: "Hardware supply", cls: "bg-green-100 text-green-700" },
      { label: "Pre-mixed RTU", cls: "bg-slate-100 text-slate-700" },
      { label: "PPE mandatory", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Selleys and Dulux manufacture HCl-based brick cleaners widely available through Bunnings, Mitre 10, and hardware stores nationally — providing trade and DIY access to pre-mixed dilute hydrochloric acid for removal of mortar smears, cement staining, and efflorescence on fired clay brick facades. Available in 1 L, 2 L, and 5 L sizes from hardware and trade supply outlets. Pre-mixed at working concentration — no on-site dilution required, reducing the handling risk of concentrated commercial acid. Suitable for the same applications as specialist trade supply: removal of Portland cement mortar splatter and calcium-based efflorescence from fired clay brick on Class 2 strata buildings and residential masonry structures. The same safety requirements apply regardless of the product source: pre-wet the masonry thoroughly before application; full PPE mandatory (acid-resistant gloves, face shield, rubber apron, P2 respirator); neutralise and flush thoroughly after treatment. NEVER use on calcium-sensitive substrates. Confirm compatibility with the project masonry type before specifying or applying.",
    technicalProperties: [
      "Acid type: Hydrochloric (HCl) — pre-mixed at working concentration for ready-to-use application",
      "Application: Brush or low-pressure spray onto pre-wetted masonry — dwell time 30–60 seconds, scrub and flush",
      "Pre-wetting: Mandatory before any HCl brick cleaner application regardless of product source",
      "Neutralisation: Thorough water rinse required — sodium bicarbonate solution rinse recommended before final water flush",
      "PPE: Acid-resistant gloves, full face shield, rubber apron, P2 respirator — mandatory regardless of working concentration",
      "Compatible masonry: Fired clay brick only — not for use on limestone, marble, calcium silicate brick, or any acid-sensitive substrate",
      "Standards: AS/NZS 1715 for confined space work; manufacturer SDS must be on site during all chemical cleaning operations",
    ],
    limitations: [
      "NEVER use on sandstone, limestone, calcium silicate brick, marble, or reconstituted stone — causes irreversible substrate damage",
      "All adjacent metalwork, aluminium, glazing, and painted surfaces must be masked before application — HCl causes rapid etching and corrosion of these materials",
      "High fuming product — ensure adequate fresh air ventilation during all application and flushing operations",
      "Residual acid causes ongoing damage if neutralisation and flushing are incomplete — flush until runoff tests at pH 6 or above",
      "Do not allow to dry on the masonry surface — contact time must not exceed 60 seconds on clay brick before scrubbing and flushing",
      "Store away from metallic containers, heat sources, and reactive materials — follow SDS storage requirements",
    ],
    procurementSources: [
      { name: "Selleys — national distribution through Bunnings, Mitre 10, and hardware stores", url: "https://www.selleys.com.au" },
      { name: "Bunnings — Selleys and generic HCl brick cleaners, 1 L to 5 L sizes in store", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 — trade hardware stores, HCl brick cleaners nationally", url: "https://www.mitre10.com.au" },
      { name: "Blackwoods — trade quantities and 20 L sizes for commercial masonry cleaning", url: "https://www.blackwoods.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acid-wash", label: "Acid wash" },
  { id: "Hydrochloric", label: "Hydrochloric (HCl)" },
  { id: "Efflorescence", label: "Efflorescence" },
  { id: "Mortar-stain", label: "Mortar stain" },
  { id: "Masonry-cleaning", label: "Masonry cleaning" },
  { id: "Brick", label: "Clay brick" },
  { id: "PPE-required", label: "Full PPE required" },
  { id: "Pre-mixed", label: "Pre-mixed" },
  { id: "Site-diluted", label: "Site-diluted" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  concentration: string;
  compatible: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Parchem Construction Supplies",
    product: "Dilute HCl brick cleaner",
    concentration: "5–10% pre-mixed",
    compatible: "Fired clay brick only",
    distribution: "Trade / specialist supply",
    keyFeature: "Trade-quality pre-mixed formulation",
    primaryUse: "Heavy mortar smear + efflorescence",
  },
  {
    supplier: "Selleys / Dulux",
    product: "HCl-based brick cleaner",
    concentration: "Pre-mixed RTU",
    compatible: "Fired clay brick only",
    distribution: "Hardware stores nationally",
    keyFeature: "Wide hardware availability",
    primaryUse: "General mortar stain + efflorescence",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Removal of Portland cement mortar smears and splatter from fired clay brick facades following masonry repair or repointing works",
    "Removal of efflorescence (calcium carbonate salt deposits) from brick and concrete masonry facade surfaces before coating or sealing",
    "Cleaning of brick facades prior to applying a protective coating, sealer, or repaint as part of the remediation scope",
    "Spot treatment of heavy calcium deposits at weep holes and at the base of masonry piers",
    "Pre-treatment of concrete surfaces where calcium-based surface contamination is present before coating application",
  ],
  selectionCriteria: [
    "Confirm the substrate is fired clay brick before specifying — HCl must NEVER be used on limestone, sandstone, calcium silicate brick, or reconstituted stone",
    "Use pre-mixed HCl formulations in preference to site-diluted concentrated acid — reduces handling risk and ensures correct working concentration",
    "Concentration must not exceed 10% for clay brick — higher concentrations cause irreversible surface etching and long-term spalling damage",
    "Commission a trial area on an inconspicuous section before treating the full facade — confirm no unexpected substrate reaction",
    "Pre-wet the substrate thoroughly before any acid application — failure to pre-wet allows acid to wick deep into porous brick",
    "Confirm PPE requirements before commencing — HCl requires full face shield (not safety glasses), P2 respirator, acid-resistant gloves, and rubber apron as minimum",
  ],
  limitations: [
    "NEVER use on sandstone, limestone, calcium silicate brick (Hebel/Siporex), marble, or reconstituted stone — acid dissolves these calcium-based substrates",
    "Must not be applied without thorough pre-wetting — dry application causes deep acid absorption and long-term spalling damage to the brick body",
    "All metalwork, glazing, aluminium frames, painted surfaces, and vegetation must be masked before acid application",
    "Do not apply in hot direct sun or high wind — rapid drying before the stain can be flushed causes surface damage",
    "Neutralise and flush thoroughly — test pH of runoff before stopping; residual acid causes ongoing mortar degradation",
    "Concentration must not exceed 10% for clay brick — higher concentrations cause irreversible etching",
  ],
  standardsNotes: [
    "Safe Work Australia Model Code of Practice — hazardous chemicals on construction sites; SDS mandatory on site for all acid cleaning products",
    "State WHS regulations — handling and storage of corrosive substances; risk assessment required for acid cleaning works",
    "AS/NZS 1715 — confined space work requirements applicable where acid cleaning is conducted in enclosed areas or courtyards",
    "EPA state regulations — acid waste and neutralised rinse water disposal; confirm local requirements before stormwater disposal",
    "NATSPEC worksection 03 30 00 — masonry cleaning requirements and pre-treatment specifications",
  ],
  suitableDefects: [
    "Efflorescence (white salt deposits) on fired clay brick facades from cement hydration or moisture movement through the brick",
    "Portland cement mortar smears and splatter on brick faces left after repointing or masonry repair",
    "Calcium carbonate scale deposits at weep holes, at the base of walls, and at horizontal masonry ledges",
    "Surface soiling with calcium-based deposits from water runoff over concrete parapets or sills onto brick below",
    "Lightly stained brick requiring preparation before applying waterproof coating or anti-carbonation paint",
  ],
  typicalSubstrates: [
    "Fired clay face brick — standard extruded or pressed face brick; confirm mortar joints are sound before acid cleaning",
    "Engineering clay brick — dense vitrified brick; confirm that surface treatment will not affect subsequent paint adhesion",
    "Concrete masonry units (block) — phosphoric acid is preferred over HCl for concrete; confirm surface coating compatibility",
    "NOT suitable: sandstone, limestone, calcium silicate brick (Hebel, Siporex), terracotta, marble, or reconstituted stone",
    "NOT suitable: aluminium, galvanised steel, zinc, copper, or painted surfaces without full masking protection",
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

export function HydrochloricAcidCleanerIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is dilute hydrochloric acid brick cleaner?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Dilute hydrochloric acid (HCl) brick cleaner at 5–10% concentration is the most aggressive of the common masonry acid cleaners used on fired clay brick facades on Class 2 strata buildings and commercial masonry structures in Australia. It dissolves Portland cement mortar smears, calcium silicate scale, and efflorescence deposits rapidly on contact — making it effective where phosphoric or sulphamic acid cannot penetrate heavy mortar splatter. Substrate identification is mandatory before application — HCl must never be used on sandstone, limestone, calcium silicate brick, or any calcium-based masonry.
        </p>
        {expanded && (
          <>
            <p>
              Pre-wetting all masonry surfaces before application is the single most important preparation step. Saturating the substrate with clean water fills the brick pore structure and prevents the acid from absorbing deeply into the brick body. Failure to pre-wet allows HCl to wick into porous brick and cause long-term surface spalling and secondary efflorescence as residual acid migrates back out during drying. The pre-mixed 5–10% concentration available from trade and hardware suppliers is the correct working strength — never apply commercial concentrated HCl (30–33% pool acid) directly to masonry.
            </p>
            <p>
              All adjacent materials must be protected before commencing: metalwork, glazing, aluminium frames, painted surfaces, and vegetation must all be masked. After the 30–60 second dwell time, scrub and flush with large volumes of clean water. Neutralise with sodium bicarbonate solution and continue flushing until runoff tests at pH 6 or above. Full PPE is mandatory for all HCl cleaning work — full face shield (not safety glasses), P2 respirator, acid-resistant gloves, and rubber apron. PP/HDPE mixing vessels only — never use galvanised or aluminium containers.
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

export function HydrochloricAcidCleanerProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 product systems — hydrochloric acid brick cleaner — scroll to view all</p>
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
              Side-by-side comparison of hydrochloric acid brick cleaner supply options. Confirm substrate suitability and PPE requirements before commencing work.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Concentration</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Compatible</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.concentration}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.compatible}</td>
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
