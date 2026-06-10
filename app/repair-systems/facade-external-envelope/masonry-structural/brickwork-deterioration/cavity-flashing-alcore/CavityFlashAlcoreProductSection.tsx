"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Alcore"
  | "Bitumen-composite"
  | "Polyester-faced"
  | "Coastal-rated"
  | "AS-3700"
  | "Cavity-flashing"
  | "Weep-holes"
  | "All-exposure"
  | "Lightweight"
  | "Self-adhesive";

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
    fullLabel: "Alcore / Bituline",
    brandUrl: "https://www.alcore.com.au",
    accentColor: "#b45309",
    name: "Alcore bitumen aluminium composite flashing",
    descriptionLine: "Factory-laminated aluminium foil core between two bitumen-modified polymer layers — self-sealing laps — lightweight (~1.6 kg/m²) — all exposure zones — AS 3700",
    productType: "Bitumen-aluminium composite cavity flashing — AS 3700 — all exposure zones",
    filterTags: ["Alcore", "Bitumen-composite", "AS-3700", "Cavity-flashing", "Weep-holes", "All-exposure", "Lightweight"],
    techChips: [
      { label: "Bitumen composite", cls: "bg-amber-100 text-amber-800" },
      { label: "Self-sealing laps", cls: "bg-green-100 text-green-700" },
      { label: "~1.6 kg/m²", cls: "bg-slate-100 text-slate-700" },
      { label: "All exposure zones", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Alcore is a factory-laminated composite: aluminium foil core bonded between two bitumen-modified polymer layers. The bitumen surface self-seals at laps under mortar pressure and is compatible with all exposure zones including coastal and marine. Lightweight (approximately 1.6 kg/m²) compared to lead — eliminates the OH&S heavy-handling requirements of milled lead. No galvanic risk against steel lintels — the bitumen layer separates the metals. Weep holes must be punched through the composite — the bitumen layer does not self-open under mortar pressure. Cut with knife or scissors only — angle grinder heat destroys the bitumen layer and produces toxic fumes. Compatible with steel, galvanised, and stainless lintels without isolation. Confirm coastal exposure rating (C3 vs C4) with the manufacturer's product data sheet for buildings within 1 km of breaking surf.",
    technicalProperties: [
      "Suitable for all exposure zones including coastal and marine — confirm C3/C4 rating with manufacturer product data sheet",
      "Lightweight (~1.6 kg/m²) — no OH&S heavy-handling requirements; single-person installation",
      "Bitumen layer self-seals at laps under mortar pressure — reliable joint performance",
      "Compatible with steel, galvanised, and stainless steel lintels without isolation — bitumen layer prevents galvanic contact",
      "Cuts easily with scissors or knife — no specialist tools required; no heat cutting",
      "Significantly lighter and easier to install than equivalent lead flashing",
    ],
    limitations: [
      "Do NOT cut with heat tools — angle grinder heat destroys the bitumen layer and produces toxic fumes; knife or scissors only",
      "Confirm coastal compatibility with specific manufacturer product data — not all bitumen composites are rated for severe marine C4/C5",
      "Cannot be soldered or lead-burned — laps rely on pressure seal and sealant; inspect laps before mortar is placed",
      "Weep holes must be punched through the composite — bitumen will not self-open; use purpose-made punch or knife-cut slots ≥ 75 mm²",
    ],
    procurementSources: [
      { name: "Alcore Australia — national supply through trade distributors", url: "https://www.alcore.com.au" },
      { name: "Bituline — bitumen composite flashing — national", url: "" },
      { name: "Roofing and flashings trade suppliers — all states", url: "" },
      { name: "Masonry supply and builders merchants — rolls in standard widths", url: "" },
    ],
  },
  {
    fullLabel: "Alcore / Bituline HD",
    brandUrl: "https://www.alcore.com.au",
    accentColor: "#0369a1",
    name: "Alcore polyester-faced bitumen composite (heavy duty)",
    descriptionLine: "Polyester-reinforced Alcore with enhanced tear resistance — confirmed coastal C3–C4 — heavy mortar load — wider openings — AS 3700",
    productType: "Polyester-reinforced bitumen composite cavity flashing — AS 3700 — C3–C4 coastal rated",
    filterTags: ["Alcore", "Polyester-faced", "Coastal-rated", "AS-3700", "Cavity-flashing", "Weep-holes", "All-exposure", "Lightweight"],
    techChips: [
      { label: "Polyester reinforced", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal C3–C4", cls: "bg-green-100 text-green-700" },
      { label: "Tear resistant", cls: "bg-slate-100 text-slate-700" },
      { label: "Heavy mortar load", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Heavy-duty Alcore variant with spunbond polyester reinforcement on the exposed face, improving tear resistance during installation and extending durability in aggressive environments. Used in wider openings, higher-traffic installation situations, or where the flashing must carry heavy mortar load on the top surface during multi-leaf construction. Rated for coastal and industrial C3–C4 exposure. Greater puncture and tear resistance than standard aluminium-foil composite. Self-sealing bitumen laps same as standard Alcore — 75 mm minimum lap, press firmly by hand then mortar weight completes the seal. Slightly stiffer than standard Alcore — requires care when forming into complex profiles at reveals and corners.",
    technicalProperties: [
      "Polyester reinforcement prevents tearing on long spans or under heavy mortar load during outer leaf construction",
      "Confirmed coastal and industrial C3–C4 exposure rating — suitable for buildings within ~1 km of breaking surf",
      "Greater puncture and tear resistance than standard aluminium-foil bitumen composite",
      "Self-sealing bitumen laps — same installation method as standard Alcore — 75 mm minimum lap",
      "Suitable for wider cavities and longer spans than standard composite",
      "Compatible with steel, galvanised, and stainless steel lintels without isolation",
    ],
    limitations: [
      "Slightly stiffer than standard Alcore — requires care when forming into complex reveals and corner profiles",
      "Higher cost than standard bitumen composite — use where coastal exposure or heavy mortar load is confirmed",
      "Same cutting restriction as standard Alcore — knife or scissors only; no angle grinder or heat tools",
      "Not suitable for sustained UV exposure — must be covered by mortar or pointing; do not leave exposed for extended periods",
    ],
    procurementSources: [
      { name: "Alcore Australia — HD polyester range — national", url: "https://www.alcore.com.au" },
      { name: "Bituline HD — polyester-reinforced bitumen composite — national", url: "" },
      { name: "Roofing and flashings trade suppliers — confirm HD product availability", url: "" },
      { name: "Commercial masonry supply and trade merchants — all states", url: "" },
    ],
  },
  {
    fullLabel: "Alcore / Proofex / Tremco",
    brandUrl: "https://www.alcore.com.au",
    accentColor: "#7c3aed",
    name: "Alcore self-adhesive coastal-rated system with weep formers",
    descriptionLine: "Self-adhesive pressure-sensitive Alcore with proprietary weep hole formers — positive location before outer leaf construction — coastal rated — high-rise application",
    productType: "Self-adhesive bitumen composite cavity flashing with proprietary weep formers — coastal rated",
    filterTags: ["Alcore", "Self-adhesive", "Coastal-rated", "AS-3700", "Cavity-flashing", "Weep-holes", "All-exposure", "Lightweight"],
    techChips: [
      { label: "Self-adhesive", cls: "bg-purple-100 text-purple-800" },
      { label: "Weep formers", cls: "bg-green-100 text-green-700" },
      { label: "Coastal rated", cls: "bg-sky-100 text-sky-800" },
      { label: "No site drilling", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Premium self-adhesive Alcore system with factory-bonded pressure-sensitive adhesive on the underside for positive adhesion to the lintel or bearing surface before the outer leaf is built. Includes proprietary plastic weep hole formers that lock into the flashing, ensuring consistent weep hole positioning at 600 mm centres and preventing mortar blockage during construction. Specified for coastal high-rise, new build, or refurbishment where positive location and mortar-proof weep holes are required. Adhesive requires a clean, dry, primed substrate — cannot be installed in wet conditions. Remove release film immediately before bedding. Application temperature above 10°C required for reliable adhesive activation.",
    technicalProperties: [
      "Self-adhesive underside bonds positively to lintel or masonry — stays in position without mortar during outer leaf construction",
      "Proprietary weep formers lock in place at 600 mm — consistent spacing, mortar-proof channel through the outer leaf",
      "Confirmed coastal and severe marine exposure rating — confirm C3 vs C4 classification with manufacturer product data sheet",
      "Eliminates site skill requirement for weep hole formation — no drilling or punching of mortar course required",
      "Compatible with stainless steel lintels — no galvanic concerns with bitumen barrier layer",
      "Premium installation speed — adhesive backing eliminates need for tape or sealant at bearing surface",
    ],
    limitations: [
      "Significantly higher cost than standard roll products — justify use where positive location and mortar-proof weeps are specified",
      "Adhesive requires clean, dry, primed surface — cannot install in wet or dusty conditions; substrate primer required",
      "Application temperature above 10°C required — adhesive activation below this temperature is unreliable",
      "Release film must be removed immediately before positioning — do not allow adhesive face to contact dust or water before bonding",
    ],
    procurementSources: [
      { name: "Alcore Australia — self-adhesive SA range — national", url: "https://www.alcore.com.au" },
      { name: "Proofex — self-adhesive composite flashing systems", url: "" },
      { name: "Tremco Illbruck — building envelope flashings", url: "https://www.tremcoadapting.com.au" },
      { name: "Specialist waterproofing and flashings distributors — all states", url: "" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Alcore", label: "Alcore" },
  { id: "Bitumen-composite", label: "Bitumen composite" },
  { id: "Polyester-faced", label: "Polyester faced" },
  { id: "Coastal-rated", label: "Coastal rated" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Cavity-flashing", label: "Cavity flashing" },
  { id: "Weep-holes", label: "Weep holes" },
  { id: "All-exposure", label: "All exposure zones" },
  { id: "Lightweight", label: "Lightweight" },
  { id: "Self-adhesive", label: "Self-adhesive" },
];

const SYSTEM_COMPARISON: {
  product: string;
  core: string;
  selfAdhesive: string;
  coastal: string;
  weepHoles: string;
  relCost: string;
  primaryUse: string;
}[] = [
  {
    product: "Alcore bitumen composite",
    core: "Al foil + bitumen both faces",
    selfAdhesive: "No",
    coastal: "Confirm with manufacturer",
    weepHoles: "Site punched",
    relCost: "$",
    primaryUse: "General — all exposure — inland and low coastal",
  },
  {
    product: "Alcore polyester HD",
    core: "Al foil + bitumen + polyester face",
    selfAdhesive: "No",
    coastal: "Yes — C3–C4",
    weepHoles: "Site punched",
    relCost: "$$",
    primaryUse: "Coastal / heavy mortar load / wider openings",
  },
  {
    product: "Self-adhesive + weep formers",
    core: "Polyester Alcore + pressure adhesive",
    selfAdhesive: "Yes",
    coastal: "Yes — confirm C3/C4",
    weepHoles: "Proprietary formers",
    relCost: "$$$",
    primaryUse: "High-rise coastal / positive location / mortar-proof weeps",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded or failed cavity tray flashings in all exposure zones including coastal and marine",
    "Where lead is not appropriate for OH&S or cost reasons but coastal exposure is a factor",
    "Commercial and multi-storey Class 2 strata buildings where lightweight installation is preferred",
    "New-build or refurbishment projects specifying mortar-proof weep hole formers in coastal locations",
  ],
  selectionCriteria: [
    "Confirm the specific product's coastal exposure rating (C3 vs C4) with the manufacturer's product data sheet — not all bitumen composites are rated for severe marine",
    "Use polyester-HD for coastal buildings, wider openings, or where heavy mortar load during construction is expected",
    "Use self-adhesive with weep formers where positive location before outer leaf construction is specified or required",
    "Alcore is preferred over aluminium in coastal zones where lead is not practical or warranted by OH&S",
    "Do not use Alcore with copper flashings or copper-containing sealants — bitumen-copper incompatibility",
    "Use compatible neutral-cure sealant at all laps — not acetoxy-cure (acetic acid attacks the bitumen layer)",
  ],
  limitations: [
    "Do NOT cut with heat tools (angle grinder) — bitumen fumes; knife or scissors only",
    "Weep holes must be punched or cut through the composite — the bitumen will not self-open under mortar pressure",
    "Self-adhesive product requires primed, clean, dry substrate — cannot be installed in wet or cold (below 10°C) conditions",
    "Do not use with copper flashings or copper-based sealants — incompatibility with bitumen modifier over time",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — Section 5: cavity flashings, upstand, and weep holes",
    "AS 3700 clause 5.6 — minimum 25 mm upstand at inner leaf required",
    "AS 3700 clause 5.4 — weep holes at maximum 600 mm centres; minimum 75 mm² free area per weep hole or slot",
    "Manufacturer product data sheet — confirm coastal corrosivity rating (C3 vs C4) before specifying for coastal buildings",
  ],
  suitableDefects: [
    "Corroded, failed, or absent cavity tray flashings in coastal, marine, and all exposure zone masonry buildings",
    "Water ingress at lintel and sill locations where lead is not appropriate and aluminium is excluded by exposure class",
    "Weep hole blockage from mortar bridging — clearing and reinstatement using Alcore with weep formers",
    "Remediation of post-construction omission of cavity flashings at lintel or sill locations",
  ],
  typicalSubstrates: [
    "Masonry bearing course at lintel or sill — all mortar types compatible; no isolation required for galvanic reasons",
    "Steel lintel bearing surface — compatible without isolation; bitumen layer separates metals",
    "Galvanised and stainless steel lintels — fully compatible without isolation",
    "Concrete lintel bearing surface — compatible without isolation; no alkaline attack concern with bitumen surface",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
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

export function CavityFlashAlcoreIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is Alcore composite cavity flashing?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Alcore is a factory-laminated composite flashing material: an aluminium foil core bonded between two bitumen-modified polymer layers. It provides the durability and exposure compatibility of lead flashing without the weight and OH&S obligations of milled lead sheet. Suitable for all exposure zones including coastal and marine when the correct product grade is confirmed.
        </p>
        {expanded && (
          <>
            <p>
              The bitumen surface self-seals at laps under mortar pressure — the weight of fresh mortar forces the laps together without reliance on site-applied sealant. Compatible with steel, galvanised, and stainless lintels without galvanic isolation — the bitumen layer separates the metals. The key installation rules are: knife or scissors only (angle grinder heat destroys the bitumen), weep holes must be punched through (bitumen does not self-open), and only neutral-cure sealant at laps (acetoxy-cure silicone attacks the bitumen layer).
            </p>
            <p>
              Confirm the specific product's coastal exposure rating (C3 vs C4) with the manufacturer's product data sheet before specifying for buildings within 1 km of breaking surf. The standard bitumen composite may only be rated for C2–C3; the polyester-reinforced heavy-duty grade and the self-adhesive system are typically rated C3–C4. Do not specify standard Alcore for severe marine applications without confirming the exposure rating.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function CavityFlashAlcoreProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const visibleProducts =
    activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── System Technical Reference ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — Alcore composite cavity flashings — scroll to view all</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5"><p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p></div>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of Alcore composite cavity flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Core construction</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Self-adhesive</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weep holes</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Rel. cost</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.core}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.selfAdhesive}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.weepHoles}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.relCost}</td>
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
