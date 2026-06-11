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
  | "Phosphoric"
  | "Sulphamic"
  | "Efflorescence"
  | "Mortar-stain"
  | "Masonry-cleaning"
  | "Brick"
  | "Concrete"
  | "PPE-required";

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
    fullLabel: "Various / site-diluted",
    brandUrl: "https://www.bunnings.com.au",
    accentColor: "#b45309",
    name: "Dilute hydrochloric acid solution (5–10%)",
    descriptionLine: "Site-diluted HCl (muriatic acid) — 1:9 acid:water for 5% solution — heavy mortar smear and efflorescence removal — full PPE mandatory — fired clay brick and concrete only",
    productType: "Dilute hydrochloric acid masonry cleaner — site-mixed — external masonry",
    filterTags: ["Acid-wash", "Hydrochloric", "Efflorescence", "Mortar-stain", "Masonry-cleaning", "Brick", "PPE-required"],
    techChips: [
      { label: "Hydrochloric acid", cls: "bg-amber-100 text-amber-800" },
      { label: "Site-diluted", cls: "bg-slate-100 text-slate-700" },
      { label: "Full face shield + P2", cls: "bg-red-100 text-red-700" },
      { label: "Pre-wet mandatory", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Dilute hydrochloric acid (muriatic acid) is the most aggressive commonly used masonry cleaning chemical for Class 2 strata building facade remediation. Used to remove Portland cement mortar smears, heavy efflorescence, and calcium-based deposits from fired clay brick and concrete block. MUST be diluted before use — never apply commercial pool acid concentration (30–33%) directly. Always add acid to water (never water to acid) using a plastic bucket. Full PPE mandatory: acid-resistant gloves, full face shield, rubber apron, P2 respirator. Pre-wet all surfaces before application to prevent deep acid absorption. Neutralise with sodium bicarbonate or lime water solution and flush with large volumes of clean water — test pH of runoff (must be above 6) before stopping. NEVER use on sandstone, limestone, calcium silicate brick, Hebel/Siporex products, or reconstituted stone.",
    technicalProperties: [
      "Most effective for heavy Portland cement mortar splatter and calcium silicate scale on fired clay brick — fast-acting, visible reaction within seconds",
      "Low material cost — commercial 30–33% HCl widely available; diluted on site at 1:9 (acid:water) for 5% working solution",
      "Effective on stubborn mortar smears that resist milder phosphoric or sulphamic acid cleaners",
      "Available as pre-diluted commercial brick cleaner from hardware and trade supply — eliminates on-site dilution step",
      "Contact time of 30–60 seconds on clay brick is sufficient — scrub then flush immediately; do not allow to dry on the surface",
      "Neutralisation with sodium bicarbonate solution followed by clean water flush restores surface to safe pH for subsequent coating or sealing",
    ],
    limitations: [
      "NEVER use on sandstone, limestone, calcium silicate brick (Siporex/Hebel), or reconstituted stone — acid dissolves these substrates and causes irreversible damage",
      "Severe damage to metalwork, glazing, aluminium, and galvanised surfaces if contacted — mask all adjacents thoroughly before commencing",
      "Corrosive to skin, eyes, and respiratory system — full PPE mandatory; chlorine fumes are hazardous in confined or poorly ventilated conditions",
      "Substrate must be pre-wetted thoroughly before application — failure to pre-wet allows acid to wick deep into porous brick causing long-term surface spalling",
      "Must be neutralised and flushed thoroughly after — residual acid causes ongoing damage including salt crystallisation and mortar degradation",
      "Do not store diluted acid in sealed containers — dispose of unused mix at end of day",
    ],
    procurementSources: [
      { name: "Bunnings / Mitre 10 — pre-diluted brick cleaners, hardware stores nationally", url: "https://www.bunnings.com.au" },
      { name: "Blackwoods — industrial chemical supply, commercially concentrated HCl", url: "https://www.blackwoods.com.au" },
      { name: "Chem Supply Australia — bulk chemical supply, safety data sheets", url: "https://www.chemsupply.com.au" },
      { name: "Trade paint and building supply stores — Bondall, Dunlop pre-diluted brick cleaners", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Bondall BrickClean / Selleys Brickwork Cleaner",
    brandUrl: "https://www.bondall.com",
    accentColor: "#0369a1",
    name: "Phosphoric acid brick cleaner (pre-mixed)",
    descriptionLine: "Pre-formulated phosphoric acid brick cleaner (10–15%) — lower fuming than HCl — mortar stain and efflorescence removal — pre-mixed at working concentration — PPE required",
    productType: "Phosphoric acid masonry cleaner — pre-mixed — external brick and concrete",
    filterTags: ["Acid-wash", "Phosphoric", "Efflorescence", "Mortar-stain", "Masonry-cleaning", "Brick", "Concrete", "PPE-required"],
    techChips: [
      { label: "Phosphoric acid", cls: "bg-sky-100 text-sky-800" },
      { label: "Pre-mixed RTU", cls: "bg-green-100 text-green-700" },
      { label: "Low fuming", cls: "bg-slate-100 text-slate-700" },
      { label: "PPE required", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Pre-formulated phosphoric acid-based brick cleaner at controlled working concentration (typically 10–15% phosphoric acid with surfactants). Safer to use than HCl — lower fuming, less corrosive, slower acting — making it suitable for general efflorescence removal and light mortar staining on Class 2 strata building facades. More forgiving than HCl on adjacent materials but still requires full PPE and mandatory pre-wetting of the substrate before application. The surfactant package improves wetting and surface contact. Pre-mixed formulation eliminates on-site dilution risk. Available in 2 L, 5 L, and 20 L containers. Still prohibited on calcium silicate, sandstone, and limestone substrates. May leave a phosphate residue film if not flushed adequately — this affects subsequent paint adhesion.",
    technicalProperties: [
      "Lower fuming than HCl — safer for use in residential or partially occupied areas when adequate ventilation is maintained",
      "Pre-mixed at working concentration — no on-site dilution required, reducing handling risk compared to concentrated HCl",
      "Surfactant addition improves wetting and surface contact on dense brick faces",
      "Less aggressive to adjacent metalwork and painted surfaces than HCl — still requires masking but provides more working time before damage occurs",
      "Suitable for concrete surfaces — does not strip surface as aggressively as HCl at working concentration",
      "Available from hardware and trade supply nationally in 2 L, 5 L, and 20 L containers",
    ],
    limitations: [
      "Still an acid — PPE mandatory; prohibited on calcium silicate brick, sandstone, and limestone — these substrates dissolve in acid",
      "Slower reaction than HCl — may require longer dwell time (2–5 minutes) or repeat applications for heavy mortar smear",
      "Higher material cost than site-diluted HCl for large-scale facade cleaning jobs",
      "May leave a phosphate residue film if not flushed adequately — check that phosphate residue is fully removed before applying paint, sealant, or coating",
      "Not effective on rust staining — use oxalic acid cleaner or proprietary iron stain remover for rust and iron deposits",
    ],
    procurementSources: [
      { name: "Bondall — national distribution through hardware and trade stores", url: "https://www.bondall.com" },
      { name: "Selleys — national hardware and trade distribution", url: "https://www.selleys.com.au" },
      { name: "Bunnings / Mitre 10 — 2 L and 5 L sizes in store nationally", url: "https://www.bunnings.com.au" },
      { name: "Blackwoods / Tradelink — 20 L trade quantities", url: "https://www.blackwoods.com.au" },
    ],
  },
  {
    fullLabel: "Crommelin Efflorescence Remover / DryTreat 40SK",
    brandUrl: "https://www.crommelin.com.au",
    accentColor: "#7c3aed",
    name: "Sulphamic acid efflorescence remover",
    descriptionLine: "Sulphamic acid (amidosulfonic acid) — low-fuming crystalline solid dissolved on site — light to moderate efflorescence removal — suitable for occupied areas — fired clay brick and concrete",
    productType: "Sulphamic acid efflorescence remover — crystalline solid — external masonry",
    filterTags: ["Acid-wash", "Sulphamic", "Efflorescence", "Masonry-cleaning", "Brick", "Concrete", "PPE-required"],
    techChips: [
      { label: "Sulphamic acid", cls: "bg-purple-100 text-purple-800" },
      { label: "Crystalline solid", cls: "bg-slate-100 text-slate-700" },
      { label: "Very low fuming", cls: "bg-green-100 text-green-700" },
      { label: "PPE required", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Sulphamic acid (amidosulfonic acid) is a mild, low-fuming, solid acid dissolved in water at working concentration (typically 5–10% w/v) for removal of light to moderate efflorescence on brick, tile, and concrete facades on Class 2 strata buildings. Crystalline solid form — safer to transport and store than liquid HCl with no liquid acid spill risk. Gentler on substrates and adjacent materials than HCl or phosphoric acid. Preferred for spot treatment of efflorescence in occupied buildings or semi-enclosed areas where HCl fuming would be unacceptable. Biodegradable — lower environmental burden in waste water disposal. Do not mix with bleach-containing cleaners — chlorine gas can be generated. Still prohibited on sandstone, limestone, and calcium silicate substrates.",
    technicalProperties: [
      "Solid form — safe to store and transport; no liquid acid spill risk; dissolve in cold water on site at required concentration",
      "Very low fuming — suitable for use in occupied or semi-enclosed areas with adequate ventilation where HCl would be impractical",
      "Effective for efflorescence and calcium carbonate deposits on fired clay brick, concrete, and ceramic tile",
      "Gentler than HCl — reduced risk of etching dense brick faces during treatment",
      "Biodegradable — lower environmental burden in waste water compared to HCl; dilute with large water volume before drain disposal",
      "Available in 500 g, 1 kg, and 5 kg bags from hardware and specialist masonry supply",
    ],
    limitations: [
      "Less effective than HCl for heavy Portland cement mortar smear — specify HCl or phosphoric acid cleaner for thick mortar deposits",
      "Still prohibited on sandstone, limestone, and calcium silicate brick — sulphamic acid dissolves calcium-based substrates",
      "Multiple applications may be required for severe or deep efflorescence — allow 24-hour drying between cycles",
      "Higher cost per unit area than HCl for large-scale facade cleaning jobs where HCl is technically appropriate",
    ],
    procurementSources: [
      { name: "Crommelin — national hardware and trade distribution", url: "https://www.crommelin.com.au" },
      { name: "DryTreat — specialist masonry care products, national distributors", url: "https://www.drytreat.com" },
      { name: "Bunnings / Mitre 10 — Crommelin and generic efflorescence removers in store", url: "https://www.bunnings.com.au" },
      { name: "Blackwoods — sulphamic acid crystals in trade quantities", url: "https://www.blackwoods.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acid-wash", label: "Acid wash" },
  { id: "Hydrochloric", label: "Hydrochloric (HCl)" },
  { id: "Phosphoric", label: "Phosphoric acid" },
  { id: "Sulphamic", label: "Sulphamic acid" },
  { id: "Efflorescence", label: "Efflorescence" },
  { id: "Mortar-stain", label: "Mortar stain" },
  { id: "Masonry-cleaning", label: "Masonry cleaning" },
  { id: "Brick", label: "Brick" },
  { id: "Concrete", label: "Concrete" },
  { id: "PPE-required", label: "Full PPE required" },
];

const SYSTEM_COMPARISON: {
  product: string;
  activeAcid: string;
  fuming: string;
  preMixed: string;
  strength: string;
  bestFor: string;
  ppeLevel: string;
}[] = [
  {
    product: "Dilute HCl (5–10%)",
    activeAcid: "Hydrochloric acid",
    fuming: "High",
    preMixed: "No — site dilute 1:9",
    strength: "High",
    bestFor: "Heavy mortar smear",
    ppeLevel: "Full face shield + P2 respirator",
  },
  {
    product: "Phosphoric brick cleaner",
    activeAcid: "Phosphoric acid",
    fuming: "Low–moderate",
    preMixed: "Yes — RTU",
    strength: "Moderate",
    bestFor: "Mortar stain / efflorescence",
    ppeLevel: "Gloves + safety glasses",
  },
  {
    product: "Sulphamic acid remover",
    activeAcid: "Sulphamic acid",
    fuming: "Very low",
    preMixed: "No — dissolve crystals",
    strength: "Mild",
    bestFor: "Light efflorescence",
    ppeLevel: "Gloves + safety glasses",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Removal of Portland cement mortar smears and splatter from fired clay brick facades following masonry repair or repointing works",
    "Removal of efflorescence (calcium carbonate salt deposits) from brick and concrete masonry facade surfaces",
    "Cleaning of brick facades prior to applying a protective coating, sealer, or repaint as part of the overall remediation scope",
    "Spot treatment of heavy calcium deposits at weep holes and at the base of masonry piers",
    "Preparation of concrete surfaces for coating application where calcium-based surface contamination is present",
  ],
  selectionCriteria: [
    "Identify the substrate type first — NEVER use any acid cleaner on sandstone, limestone, calcium silicate brick, or reconstituted stone",
    "Select acid type based on contamination severity — HCl for heavy mortar smear; phosphoric for moderate mortar stain or general efflorescence; sulphamic for light efflorescence in occupied areas",
    "Pre-wet the substrate thoroughly before applying any acid cleaner — pre-wetting prevents deep acid penetration into porous brick",
    "Always add acid to water when diluting HCl — never add water to acid (violent exothermic reaction, spattering risk)",
    "Commission a trial area on an inconspicuous section before treating the full facade — confirm no substrate damage or unexpected reaction",
    "Confirm PPE requirements for the selected acid before commencing — HCl requires full face shield and P2 respirator as minimum",
  ],
  limitations: [
    "NEVER use acid cleaning on sandstone, limestone, calcium silicate brick, Hebel, Siporex, or reconstituted stone — acid dissolves these substrates",
    "Do not apply acid to any surface without thorough pre-wetting — failure to pre-wet causes deep acid absorption and long-term spalling damage",
    "Do not allow any acid cleaner to contact metalwork, glazing, aluminium, painted surfaces, or vegetation without full masking protection",
    "Do not apply in hot direct sun or high wind — acid dries too quickly, causing surface damage before it can be flushed",
    "Neutralise and flush thoroughly — test pH of runoff to confirm neutral before stopping; residual acid causes ongoing damage and salt crystallisation",
  ],
  standardsNotes: [
    "Safe Work Australia Model Code of Practice — hazardous chemicals on construction sites",
    "State WHS regulations — handling and storage of corrosive substances; SDS must be available on site for all acid cleaners",
    "EPA state regulations — acid waste and neutralised rinse water disposal requirements; confirm local requirements before disposal to stormwater",
    "Manufacturer SDS (Safety Data Sheet) — mandatory on site for each acid cleaning product; review before commencing work",
    "NATSPEC worksection 03 30 00 — Masonry cleaning requirements and pre-treatment specifications",
  ],
  suitableDefects: [
    "Efflorescence (white salt deposits) on brick and concrete masonry facades caused by cement hydration or moisture movement",
    "Portland cement mortar smears and splatter on brick faces left after repointing or masonry repair works",
    "Calcium carbonate scale deposits at weep holes, at the base of walls, and at horizontal masonry ledges",
    "Surface soiling with calcium-based deposits from water runoff over concrete parapets or sills onto brick below",
    "Lightly stained brick surfaces requiring preparation before applying waterproof coating or anti-carbonation paint",
  ],
  typicalSubstrates: [
    "Modern fired clay brick — face brick and engineering brick — confirm that mortar joints are sound before acid cleaning",
    "Concrete masonry units (block) — confirm any surface coating is compatible with acid cleaning before proceeding",
    "Concrete surfaces — phosphoric and sulphamic acid are more appropriate for concrete than HCl",
    "Ceramic tile and grout — sulphamic acid preferred for tile surfaces where HCl may etch the tile glaze",
    "NOT suitable: sandstone, limestone, calcium silicate brick (Hebel, Siporex), terracotta, or reconstituted stone",
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

export function MasonryAcidIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are masonry acid wash cleaning systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Masonry acid wash cleaning systems use dilute inorganic acids — hydrochloric (HCl), phosphoric, or sulphamic — to dissolve calcium-based surface deposits, mortar smears, and efflorescence from fired clay brick, concrete block, and concrete surfaces on Class 2 strata building facades. The fundamental rule is that substrate identification must precede acid selection — acid cleaning must NEVER be used on sandstone, limestone, calcium silicate brick, or reconstituted stone.
        </p>
        {expanded && (
          <>
            <p>
              Pre-wetting is mandatory before any acid cleaning work. All masonry surfaces must be thoroughly saturated with clean water before acid application — pre-wetting fills the pore structure with water and prevents the acid from penetrating deeply into the brick body. Failure to pre-wet allows the acid to wick into porous brick and cause long-term surface spalling and ongoing efflorescence as residual acid works back out over time. When diluting HCl on site, always add the acid slowly to the water — never add water to concentrated acid, which causes a violent exothermic reaction and acid spattering.
            </p>
            <p>
              All adjacent materials — metalwork, glazing, aluminium frames, painted surfaces, and vegetation — must be thoroughly masked before acid cleaning commences. After cleaning, the treated surface must be neutralised with sodium bicarbonate solution and flushed with large volumes of clean water. The pH of the rinse water runoff must be tested and must reach pH 6 or above before flushing stops. Full PPE is mandatory for all acid cleaning work — the PPE requirement varies by acid type but HCl requires full face shield, P2 respirator, acid-resistant gloves, and rubber apron as a minimum.
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

export function MasonryAcidProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — masonry acid wash cleaning — scroll to view all</p>
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
              Side-by-side comparison of masonry acid wash cleaning systems. Confirm substrate suitability and PPE requirements before commencing work.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Active acid</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fuming</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pre-mixed</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Strength</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Best for</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">PPE level</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.activeAcid}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fuming}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.preMixed}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.strength}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.bestFor}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.ppeLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
