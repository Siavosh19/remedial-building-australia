"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "National"
  | "Eastern-states"
  | "WA-SA"
  | "WA-only"
  | "Colour-range"
  | "Add-water"
  | "Trade"
  | "AS-3700"
  | "Pre-mixed"
  | "Masonry-cement";

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
    fullLabel: "Boral Australia",
    brandUrl: "https://www.boral.com.au",
    tdsUrl: "https://www.boral.com.au/building-products/masonry",
    accentColor: "#b45309",
    name: "Boral Pre-mixed Masonry Cement Repointing Mortar",
    descriptionLine: "Boral factory-blended masonry cement repointing mortar — add water only — colour-matched range available — national supply through Boral trade centres and hardware merchants",
    productType: "Pre-mixed masonry cement repointing mortar — Boral — national supply",
    filterTags: ["National", "Colour-range", "Add-water", "Trade", "AS-3700", "Pre-mixed", "Masonry-cement"],
    techChips: [
      { label: "Boral pre-mixed", cls: "bg-amber-100 text-amber-800" },
      { label: "Colour range", cls: "bg-green-100 text-green-700" },
      { label: "Add water only", cls: "bg-slate-100 text-slate-700" },
      { label: "National supply", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Boral's pre-mixed masonry cement repointing mortar is a factory-blended product combining masonry cement, sand, and colour pigments — mixed with clean water only on site. Boral offers a colour-matched range of repointing mortars in standard shades (cream, grey, charcoal, and other colours) designed to match common brick mortar joints on Class 2 strata facades. The factory-controlled blending eliminates the site batching errors in cement:lime:sand proportioning that cause strength variation and colour inconsistency when mixing from separate components. Each bag is a consistent pre-measured quantity — reducing waste and improving consistency across large repointing jobs. Available through Boral trade centres, Bunnings Warehouse, Mitre 10, and independent masonry merchants nationally. Confirm the AS 3700 mortar class designation and compressive strength from the current Boral product data sheet — masonry cement mortars vary in designation between product lines. Commission a 28-day cured trial panel before approving colour match.",
    technicalProperties: [
      "Factory-controlled blending — eliminates site batching errors in proportioning",
      "Colour-matched range available — cream, grey, charcoal and other standard colours",
      "Add water only — no separate cement, lime, or sand components required on site",
      "Air-entrained masonry cement binder — better workability than plain GP cement mortar",
      "Water retention agents included — reduces bond failure on dry or porous brick substrates",
      "Nationally available through Boral trade centres, Bunnings, and masonry merchants",
    ],
    limitations: [
      "Colour range limited — match against existing weathered mortar and commission a 28-day trial panel before ordering full quantities",
      "Higher cost per unit than site-mixed GP cement + lime — pre-mix premium applies",
      "Not suitable for soft historic brick — same rigidity and low vapour permeability as all cement mortars",
      "Confirm current AS 3700 mortar class designation and compressive strength with Boral TDS — product specifications vary between colour lines",
    ],
    procurementSources: [
      { name: "Boral Trade Centres — all states", url: "https://www.boral.com.au" },
      { name: "Bunnings Warehouse — Boral masonry mortar range", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 — national", url: "https://www.mitre10.com.au" },
      { name: "Independent masonry merchants — confirm local Boral colour range availability", url: "https://www.boral.com.au" },
    ],
  },
  {
    fullLabel: "BGC Cement",
    brandUrl: "https://www.bgccement.com.au",
    accentColor: "#0369a1",
    name: "BGC Pre-mixed Masonry Cement Repointing Mortar",
    descriptionLine: "BGC factory-blended masonry cement repointing mortar — add water only — WA and selected eastern state distribution — colour-matched range",
    productType: "Pre-mixed masonry cement repointing mortar — BGC Cement — WA primary",
    filterTags: ["WA-only", "Colour-range", "Add-water", "Trade", "AS-3700", "Pre-mixed", "Masonry-cement"],
    techChips: [
      { label: "BGC Cement", cls: "bg-sky-100 text-sky-800" },
      { label: "WA primary", cls: "bg-slate-100 text-slate-700" },
      { label: "Colour range", cls: "bg-green-100 text-green-700" },
      { label: "Add water only", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "BGC Cement is a Western Australian building materials manufacturer supplying pre-mixed masonry cement repointing mortar for Class 2 strata building remediation in WA and selected eastern state markets. BGC's pre-mixed mortar is a factory-blended product designed to be mixed with clean water only on site, eliminating site batching variability. BGC has strong distribution through the WA construction trade supply chain, including hardware merchants and masonry suppliers in Perth metro and regional WA. BGC's product range is concentrated on the WA market where they compete with Boral and Adbri/Cockburn — confirm current product availability and colour range with BGC before specifying on non-WA projects. The mix conforms to AS 3700 masonry mortar requirements — confirm specific mortar class designation with BGC's current product data sheet. Trial panel mandatory before colour approval.",
    technicalProperties: [
      "Factory-blended product — consistent mix proportions per bag",
      "WA construction trade distribution — strong Perth metro and regional WA supply chain",
      "Add clean water only on site — no separate components",
      "Colour-matched range available through BGC trade network — confirm current colour options",
      "Conforming to AS 3700 masonry mortar requirements — confirm class designation with BGC TDS",
      "BGC is an independent WA manufacturer — not a national brand; strongest presence in Perth metro",
    ],
    limitations: [
      "Primary WA supplier — eastern states distribution limited; confirm availability outside WA before specifying",
      "BGC colour range may be smaller than national suppliers — confirm available colours before ordering",
      "Not suitable for soft historic brick — same cement mortar rigidity limitations apply",
      "Confirm current product name and specification with BGC — product range subject to change",
    ],
    procurementSources: [
      { name: "BGC Cement — Perth WA trade supply", url: "https://www.bgccement.com.au" },
      { name: "Bunnings Warehouse WA — BGC masonry products", url: "https://www.bunnings.com.au" },
      { name: "Independent WA masonry merchants — confirm BGC mortar availability", url: "https://www.bgccement.com.au" },
      { name: "Confirm eastern states availability with BGC directly before specifying outside WA", url: "https://www.bgccement.com.au" },
    ],
  },
  {
    fullLabel: "Cockburn Cement",
    brandUrl: "https://www.adbri.com.au",
    accentColor: "#7c3aed",
    name: "Cockburn Pre-mixed Masonry Cement Repointing Mortar",
    descriptionLine: "Cockburn Cement factory-blended masonry cement repointing mortar — add water only — WA and SA — Adbri group — colour-matched range",
    productType: "Pre-mixed masonry cement repointing mortar — Cockburn Cement (Adbri) — WA / SA",
    filterTags: ["WA-SA", "Colour-range", "Add-water", "Trade", "AS-3700", "Pre-mixed", "Masonry-cement"],
    techChips: [
      { label: "Cockburn Cement", cls: "bg-purple-100 text-purple-800" },
      { label: "WA / SA supply", cls: "bg-green-100 text-green-700" },
      { label: "Adbri group", cls: "bg-slate-100 text-slate-700" },
      { label: "Add water only", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Cockburn Cement (part of the Adbri group) supplies pre-mixed masonry cement repointing mortar for Class 2 strata building remediation in Western Australia and South Australia. As the dominant cement manufacturer in WA, Cockburn's pre-mixed mortar products are widely available through WA trade centres, hardware merchants, and masonry suppliers. The pre-mixed format ensures consistent proportioning on site without the variability of separate component batching. Cockburn's product range includes colour-matched options for standard mortar joint colours encountered on WA residential and commercial masonry construction. For SA projects, Cockburn products are available through Adbri distribution. Confirm current product name, colour range, and AS 3700 mortar class designation with Cockburn/Adbri before specifying. Trial panel mandatory before colour approval.",
    technicalProperties: [
      "Cockburn Cement WA manufacturing — consistent product quality for WA and SA market",
      "Factory-blended — add clean water only on site — consistent proportioning per bag",
      "Colour-matched range for WA masonry market — confirm colour availability with Cockburn/Adbri trade",
      "Adbri group distribution supplements Cockburn supply in SA through Adbri trade network",
      "Conforms to AS 3700 masonry mortar requirements — confirm specific class designation with TDS",
      "Competitive pricing in WA market — typically lower cost than eastern-state supplier equivalents in WA",
    ],
    limitations: [
      "WA and SA supply only — not available in eastern states; use Boral or Hanson for NSW/Qld/Vic",
      "Cockburn products may be rebranded under Adbri in some markets — confirm current product name with supplier",
      "Not suitable for soft historic brick — same cement mortar limitations as all masonry cement products",
      "Confirm colour range against existing weathered mortar with a physical sample before ordering",
    ],
    procurementSources: [
      { name: "Cockburn Cement trade depots — Perth and WA", url: "https://www.adbri.com.au" },
      { name: "Adbri distribution — SA", url: "https://www.adbri.com.au" },
      { name: "Bunnings Warehouse WA/SA — Cockburn masonry mortar", url: "https://www.bunnings.com.au" },
      { name: "Independent WA/SA masonry merchants", url: "https://www.adbri.com.au" },
    ],
  },
  {
    fullLabel: "Hanson Building Products",
    brandUrl: "https://www.hanson.com.au",
    accentColor: "#be123c",
    name: "Hanson Pre-mixed Masonry Cement Repointing Mortar",
    descriptionLine: "Hanson (now Holcim) factory-blended masonry cement repointing mortar — add water only — eastern states supply — colour-matched range through Holcim / Hanson trade network",
    productType: "Pre-mixed masonry cement repointing mortar — Hanson (Holcim) — eastern states",
    filterTags: ["Eastern-states", "Colour-range", "Add-water", "Trade", "AS-3700", "Pre-mixed", "Masonry-cement"],
    techChips: [
      { label: "Hanson / Holcim", cls: "bg-rose-100 text-rose-800" },
      { label: "Eastern states", cls: "bg-slate-100 text-slate-700" },
      { label: "Colour range", cls: "bg-green-100 text-green-700" },
      { label: "Trade supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Hanson Building Products (now part of the Holcim group, formerly HeidelbergCement) supplies pre-mixed masonry cement repointing mortar through the Hanson and Holcim trade distribution networks in eastern Australia. Hanson has strong presence in NSW, Victoria, and Queensland through a network of batching plants and trade supply depots. The pre-mixed masonry cement mortar is factory-blended for consistent proportioning on site — add clean water only. Hanson's colour-matched repointing mortar range covers the most common mortar joint colours encountered on eastern states residential and commercial masonry construction. Note: Following the Holcim/HeidelbergCement merger, Hanson products may be rebranded or consolidated under the Holcim product range in some markets — confirm current product name and availability with the local Holcim/Hanson trade representative before specifying. Trial panel mandatory before colour approval.",
    technicalProperties: [
      "Hanson/Holcim eastern states manufacturing — strong NSW, Vic, Qld distribution",
      "Factory-blended pre-mixed mortar — add clean water only — consistent proportioning per bag",
      "Colour-matched range for eastern states brick mortar joints — confirm current colours with Holcim/Hanson TDS",
      "Holcim group quality management — consistent specification across eastern states supply",
      "Conforms to AS 3700 masonry mortar requirements — confirm class designation with current TDS",
      "Strong eastern seaboard trade distribution through Holcim/Hanson batching plant network",
    ],
    limitations: [
      "Confirm current Hanson vs. Holcim branding — some Hanson products have been rebranded under Holcim; verify current product name with local supplier",
      "WA and SA distribution limited — use Cockburn/Adbri for WA/SA projects",
      "Not suitable for soft historic brick — same cement mortar limitations as all masonry cement products",
      "Confirm colour range and AS 3700 mortar class designation from current Holcim/Hanson TDS before ordering",
    ],
    procurementSources: [
      { name: "Holcim Australia (Hanson) — eastern states trade depots", url: "https://www.holcim.com.au" },
      { name: "Hanson Building Products — NSW / Vic / Qld", url: "https://www.hanson.com.au" },
      { name: "Independent masonry merchants — confirm local Hanson/Holcim supply", url: "https://www.hanson.com.au" },
      { name: "Confirm current product availability and branding with local Holcim/Hanson rep", url: "https://www.holcim.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "National", label: "National supply" },
  { id: "Eastern-states", label: "Eastern states" },
  { id: "WA-SA", label: "WA / SA" },
  { id: "WA-only", label: "WA only" },
  { id: "Colour-range", label: "Colour range" },
  { id: "Add-water", label: "Add water only" },
  { id: "Trade", label: "Trade" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Pre-mixed", label: "Pre-mixed" },
  { id: "Masonry-cement", label: "Masonry cement" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  region: string;
  product: string;
  colourRange: string;
  availability: string;
  keyStrength: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Boral Australia",
    region: "National",
    product: "Boral Pre-mixed Mortar",
    colourRange: "Standard range — cream/grey/charcoal",
    availability: "Bunnings + trade nationally",
    keyStrength: "Widest retail + trade distribution",
    primaryUse: "All states — standard repointing",
  },
  {
    supplier: "BGC Cement",
    region: "WA primary",
    product: "BGC Pre-mixed Mortar",
    colourRange: "WA standard range",
    availability: "Perth metro + regional WA",
    keyStrength: "WA independent alternative to Boral",
    primaryUse: "Perth metro and regional WA",
  },
  {
    supplier: "Cockburn Cement (Adbri)",
    region: "WA / SA",
    product: "Cockburn Pre-mixed Mortar",
    colourRange: "WA/SA standard range",
    availability: "Cockburn depots WA + Adbri SA",
    keyStrength: "WA dominant — competitive pricing",
    primaryUse: "WA and SA projects",
  },
  {
    supplier: "Hanson (Holcim)",
    region: "Eastern states",
    product: "Hanson / Holcim Pre-mixed",
    colourRange: "Eastern states standard range",
    availability: "Holcim/Hanson trade depots — NSW/Vic/Qld",
    keyStrength: "Strong eastern seaboard trade network",
    primaryUse: "NSW / Vic / Qld projects",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Repointing deteriorated mortar joints in modern clay brick facades where a consistent pre-mixed product is preferred over site batching",
    "Class 2 strata building facade repointing where multiple workers require consistent mortar colour across a large area",
    "Repointing concrete masonry (CMU) and calcium silicate brick facades — pre-mixed provides consistency across large blocks",
    "Parapet coping and exposed pier repointing where consistent colour and proportioning is critical",
    "Projects where the contractor prefers a single-component product to eliminate batching errors",
  ],
  selectionCriteria: [
    "Select supplier based on regional availability — Boral nationally, Cockburn/BGC for WA, Hanson for eastern states",
    "Commission a 28-day cured trial panel with the specific product and colour before ordering full job quantities",
    "Match the colour range sample against the existing weathered mortar under natural light — not indoor artificial light",
    "Confirm AS 3700 mortar class designation and compressive strength from current supplier TDS",
    "Confirm the mortar compressive strength does not exceed approximately 30% of the existing brick compressive strength",
    "Not suitable for heritage or soft brick — specify lime mortar for pre-1960s construction where original mortar was lime",
  ],
  limitations: [
    "Not suitable for soft, historic, or lime-mortar brickwork — masonry cement is rigid and non-breathable vs lime mortars",
    "Colour range limited to supplier standard palette — custom colours are not practical from pre-mixed products",
    "Higher cost per cubic metre of mortar than site-mixed GP cement + lime components",
    "Shelf life — pre-mixed bags must be stored dry and used within shelf life; caked or moisture-contaminated bags must be discarded",
    "Do not add extra cement to improve strength — the factory mix is calibrated; additions change strength and colour unpredictably",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — mortar proportions and designations (M1–M4) — Table 10.2",
    "AS 3972 — Portland and blended cements — governs the cement component of masonry cement products",
    "NATSPEC worksection 03 41 00 — Masonry — project specification requirements for repointing",
    "Manufacturer TDS — confirm mortar class designation, compressive strength, and colour range before specifying",
    "NCC Volume One and Two — masonry and facade requirements for Class 2 buildings",
  ],
  suitableDefects: [
    "Deteriorated or crumbling pre-mixed cement-mortar joints in modern clay brick or concrete masonry facades",
    "Mortar joints recessed more than 6mm behind the brick face from erosion or weathering",
    "Failed previous repointing where original cement mortar has debonded or shrinkage-cracked",
    "Mortar joints cracked open to water ingress — particularly at parapets and wind-exposed piers",
  ],
  typicalSubstrates: [
    "Modern fired clay brick — post-1960s hard-burnt brick where cement mortar is appropriate",
    "Concrete masonry units (CMU) — besser block and standard block construction",
    "Calcium silicate (sand-lime) brick — confirm mortar hardness does not exceed brick compressive strength",
    "NOT suitable: soft historic or heritage brick where original mortar was lime-based",
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
                </a>
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
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
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

export function PreMixedMasonryIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What is pre-mixed masonry cement repointing mortar?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Pre-mixed masonry cement repointing mortar is a factory-blended dry product — masonry cement (a proprietary blend of Portland cement, limestone filler, and air-entraining agents), fine aggregate, and colour pigment — supplied in 20–25 kg bags, mixed with clean water only on site. The factory-controlled blending eliminates the proportioning errors common in site-mixed cement:lime:sand mortar, delivering consistent colour and strength across large Class 2 strata repointing jobs.
        </p>
        {expanded && (
          <>
            <p>
              Four main suppliers cover the Australian market: Boral nationally, Hanson (now Holcim) in eastern states, and Cockburn Cement and BGC Cement in Western Australia. All four produce equivalent products to the same Australian standards — selection is primarily based on regional availability and pricing. Colour-matched ranges are available from each supplier, but the palette is limited and a 28-day cured trial panel must always be built and approved before committing to full job quantities.
            </p>
            <p>
              Pre-mixed masonry cement mortar is not suitable for soft, historic, or heritage brickwork where the original mortar was lime-based. For those substrates, a natural hydraulic lime (NHL) or lime putty mortar must be specified — listed on the repointing mortar — lime page.
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

export function PreMixedMasonryProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
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

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Supplier Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 suppliers — pre-mixed masonry cement repointing mortar — scroll to view all</p>
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
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} supplier{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
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
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
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

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Supplier Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of pre-mixed masonry cement mortar suppliers. All products are broadly equivalent in specification — selection is based on regional availability and pricing.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Region</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Availability</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key strength</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.region}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colourRange}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.availability}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyStrength}</td>
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
