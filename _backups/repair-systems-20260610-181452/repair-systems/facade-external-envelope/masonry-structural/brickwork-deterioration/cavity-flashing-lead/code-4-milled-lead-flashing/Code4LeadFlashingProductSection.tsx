"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Midland-Lead"
  | "Austral-Lead"
  | "Code-4"
  | "1.8mm"
  | "Standard-cavity"
  | "Lintel"
  | "Sill"
  | "Base-of-cavity"
  | "AS-3700"
  | "National"
  | "Coastal";

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
    fullLabel: "Midland Lead Australia",
    brandUrl: "https://www.midlandlead.com.au",
    accentColor: "#0369a1",
    name: "Midland Lead Australia — Code 4 Milled Lead Sheet",
    descriptionLine: "Code 4 (1.8mm, 20 kg/m²) milled lead sheet in roll form for cavity flashing — the leading UK-origin lead product in the Australian market, supplied through Midland's Australian distribution network",
    productType: "Code 4 milled lead sheet — standard cavity flashing",
    filterTags: ["Midland-Lead", "Code-4", "1.8mm", "Standard-cavity", "Lintel", "Sill", "Base-of-cavity", "AS-3700", "National", "Coastal"],
    techChips: [
      { label: "Code 4", cls: "bg-sky-100 text-sky-800" },
      { label: "1.8mm thickness", cls: "bg-slate-100 text-slate-700" },
      { label: "20 kg/m²", cls: "bg-slate-100 text-slate-700" },
      { label: "Self-sealing laps", cls: "bg-green-50 text-green-700" },
      { label: "National distribution", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Midland Lead Australia supplies Code 4 milled lead sheet rolled to standard cavity flashing widths. Supplied in roll lengths of 3m or 6m. Lead is self-sealing at overlaps under thermal movement. Weep formers are rolled from the same sheet on site or supplied as separate folded lead units. The leading UK-origin milled lead product in the Australian market, Midland Lead is available through plumbing and building materials merchants nationally. Confirm current stock widths, roll lengths, and pricing with local merchant before specifying.",
    technicalProperties: [
      "Code: Code 4 — standard cavity flashing grade",
      "Thickness: 1.8mm",
      "Weight: 20.41 kg/m²",
      "Widths: 150mm, 200mm, 300mm, 450mm, 600mm standard",
      "Roll lengths: 3.0m, 6.0m standard",
      "Standard: BS EN 12588 / AS/NZS 1418",
      "Finish: milled lead (natural) — no coating applied",
      "Weep formers: site-formed or supplied as separate folded lead units",
    ],
    limitations: [
      "Heavier than aluminium — consider roof access for delivery of lead rolls to high levels",
      "Not suitable for direct contact with zinc-coated or galvanised steel without isolation strip — bimetallic corrosion risk",
      "Lead fatigue cracking risk in high-vibration environments — not typical for standard masonry facades",
    ],
    procurementSources: [
      { name: "Midland Lead Australia — national distribution", url: "https://www.midlandlead.com.au" },
      { name: "Plumbing and building materials merchants nationally — confirm local stock", url: "https://www.midlandlead.com.au" },
    ],
  },
  {
    fullLabel: "Austral Lead",
    brandUrl: "#",
    accentColor: "#b45309",
    name: "Austral Lead — Code 4 Milled Lead Sheet",
    descriptionLine: "Australian-supplied Code 4 milled lead sheet for cavity flashing — available through plumbing and roofing materials merchants, building products distributors, and lead specialists",
    productType: "Code 4 milled lead sheet — Australian supply",
    filterTags: ["Austral-Lead", "Code-4", "1.8mm", "Standard-cavity", "Lintel", "Sill", "Base-of-cavity", "AS-3700"],
    techChips: [
      { label: "Code 4", cls: "bg-amber-100 text-amber-800" },
      { label: "1.8mm thickness", cls: "bg-slate-100 text-slate-700" },
      { label: "20 kg/m²", cls: "bg-slate-100 text-slate-700" },
      { label: "Plumbing merchant supply", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Austral Lead supplies Code 4 milled lead sheet through plumbing and building materials merchants across Australia. Product is equivalent to Midland Lead specification — Code 4, 1.8mm, 20 kg/m². Availability varies by state and merchant — confirm with local merchant before specifying. May require substitution with Midland Lead in some states where Austral Lead is not stocked.",
    technicalProperties: [
      "Code: Code 4 — standard cavity flashing grade",
      "Thickness: 1.8mm",
      "Weight: 20.41 kg/m²",
      "Widths: standard cavity widths — confirm available widths with local merchant",
      "Roll lengths: 3.0m, 6.0m",
      "Standard: AS/NZS 1418",
      "Distribution: plumbing merchants — availability varies by state",
      "Weep formers: site-formed",
    ],
    limitations: [
      "Availability varies by state — confirm with local merchant before specifying in documents",
      "Not a national brand — may require substitution with Midland Lead in some states",
    ],
    procurementSources: [
      { name: "Plumbing and building merchants — state-based distribution", url: "#" },
      { name: "Lead product specialists nationally", url: "#" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Midland-Lead", label: "Midland Lead" },
  { id: "Austral-Lead", label: "Austral Lead" },
  { id: "Code-4", label: "Code 4" },
  { id: "1.8mm", label: "1.8mm" },
  { id: "Standard-cavity", label: "Standard cavity" },
  { id: "Lintel", label: "Lintel" },
  { id: "Sill", label: "Sill" },
  { id: "Base-of-cavity", label: "Base of cavity" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "National", label: "National supply" },
  { id: "Coastal", label: "Coastal" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  code: string;
  thickness: string;
  weight: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Midland Lead",
    product: "Code 4 Milled Lead Sheet",
    code: "Code 4",
    thickness: "1.8mm",
    weight: "20 kg/m²",
    distribution: "National — Midland distribution network",
    keyFeature: "Leading Australian market supplier",
    primaryUse: "Standard cavity flashing — lintel, sill, base of cavity",
  },
  {
    supplier: "Austral Lead",
    product: "Code 4 Milled Lead Sheet",
    code: "Code 4",
    thickness: "1.8mm",
    weight: "20 kg/m²",
    distribution: "Plumbing merchants — state-dependent",
    keyFeature: "Australian supply chain",
    primaryUse: "Standard cavity flashing — residential and low-rise",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Code 4 milled lead (1.8mm, 20 kg/m²) for standard masonry cavity wall sill flashings, base-of-cavity flashings, and over-lintel flashings",
    "Standard residential and low-rise strata buildings where cavity width and exposure conditions fall within Code 4 capacity",
    "Base of cavity and lintel zone flashing replacement in Class 2 strata building remediation",
    "Window sill course DPC flashing where original flashing has corroded or was never installed",
  ],
  selectionCriteria: [
    "Code 4 is suitable for standard cavity applications: base of cavity, over lintels, and window sill courses",
    "For parapets, exposed ledges, or locations with extended ponding risk, upgrade to Code 5 or Code 6",
    "Lead must be dressed to the full cavity width with a minimum 25mm upstand behind the inner leaf",
    "All laps self-seal under compression and thermal movement — confirm minimum 100mm lap at joints per AS 3700",
  ],
  limitations: [
    "Lead is susceptible to fatigue cracking in high-vibration or extreme thermal cycling locations — not typical for standard masonry facades",
    "Not suitable for contact with zinc-coated or galvanised steel without isolation strip — bimetallic corrosion risk",
    "Code 4 is not suitable for wide-cavity or parapet applications — specify Code 5 or 6 for those",
    "Alkaline mortar contact is not an issue — lead is alkali-resistant and compatible with standard masonry mortars",
  ],
  standardsNotes: [
    "AS 3700 Masonry Structures — flashing installation, lap, and weep former requirements",
    "Lead sheet to AS/NZS 1418 or BS EN 12588 — confirm compliance at time of order",
    "LIA (Lead Institute of Australia) installation recommendations — follow for all lead cavity flashing work",
  ],
  suitableDefects: [
    "Absent or failed cavity flashing at base of cavity, above lintels, and at sill courses in brick masonry",
    "Corroded thin aluminium flashing replacement where lead provides superior durability and self-sealing joints",
    "Standard residential and Class 2 strata building remediation — base of cavity, lintel zone, sill flashing",
  ],
  typicalSubstrates: [
    "Clay brick masonry cavity walls — most common substrate for lead cavity flashing in Australian strata buildings",
    "Calcium silicate brick and concrete masonry — confirm lead is compatible with mortar specification",
    "Coastal environments — lead is resistant to salt-air corrosion — confirm Code 4 is sufficient for the exposure classification",
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
              {src.url && src.url !== "#" ? (
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

export function Code4LeadFlashingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What is Code 4 milled lead cavity flashing?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Code 4 milled lead sheet (1.8mm, 20 kg/m²) is the standard specification for cavity flashing in most standard masonry remediation applications — base of cavity, over lintels, and window sill courses in residential and Class 2 strata buildings where the cavity width and exposure conditions fall within Code 4 capacity.
        </p>
        {expanded && (
          <>
            <p>
              Lead is self-sealing at lapped joints under thermal movement and compression — a significant advantage over aluminium flat strip which relies on correctly formed joints and sealant. Weep formers are formed from the same lead sheet on site or supplied as separate folded lead units. Minimum lap at joints is 100mm with a mortar key or lead cleat fixing per AS 3700 and LIA recommendations.
            </p>
            <p>
              Code 4 is not suitable for parapets, exposed horizontal ledges, or wide-cavity applications — upgrade to Code 5 or Code 6 for those. For Australian Class 2 strata building remediation, Code 4 lead flashing is typically specified at base-of-cavity and lintel zone locations, with Code 5 or higher at parapet level.
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

export function Code4LeadFlashingProductSection() {
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
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">2 products — 2 suppliers — Code 4 milled lead cavity flashing — scroll to view all</p>
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
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
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
                      {product.brandUrl !== "#" && <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>}
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
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of Code 4 milled lead cavity flashing suppliers. Confirm all product selections with current supplier before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Code</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weight</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.code}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.weight}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyFeature}</td>
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
