"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Siloxane-liquid"
  | "Silane-siloxane"
  | "DPC-injection"
  | "Pressure-injection"
  | "Low-viscosity"
  | "Dense-masonry"
  | "Brick"
  | "Blockwork"
  | "1C"
  | "WTA";

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
    accentColor: "#1a5276",
    name: "Remmers Kiesol",
    descriptionLine: "Concentrated silane/siloxane liquid DPC injection concentrate — the benchmark liquid injection product for rising damp",
    productType: "Silane/siloxane liquid DPC injection",
    filterTags: ["Siloxane-liquid", "Silane-siloxane", "DPC-injection", "Pressure-injection", "Low-viscosity", "Dense-masonry", "Brick", "Blockwork", "1C", "WTA"],
    techChips: [
      { label: "Silane/siloxane liquid", cls: "bg-sky-100 text-sky-800" },
      { label: "WTA-referenced system", cls: "bg-amber-50 text-amber-700" },
      { label: "Dense masonry", cls: "bg-green-50 text-green-700" },
      { label: "Pressure injection", cls: "bg-slate-100 text-slate-700" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Remmers Kiesol is a concentrated silane/siloxane liquid DPC injection product — the benchmark fluid injection product in Remmers' WTA-referenced rising damp treatment system. Unlike silane cream products, Kiesol is a liquid that relies on the capillary suction of the masonry and/or low-pressure injection to draw the product into the wall cross-section. The active chemistry is potassium methyl siliconate, which penetrates into the pore structure and creates a hydrophobic barrier within the wall.\n\nLiquid injection has advantages over cream injection in specific situations: it can penetrate into denser masonry substrates more effectively than cream, and it can be injected under controlled low pressure to ensure even distribution across the wall width. However, it requires injection equipment capable of maintaining low pressure, and the holes must be sealed or drilled at a slight downward angle to prevent the liquid from running out before curing.\n\nKiesol is part of Remmers' complete WTA-referenced rising damp system, which specifies Kiesol or Kiesol C injection followed by Remmers SP renovation plasters. The complete Remmers system provides consistent technical documentation for the full treatment sequence. Confirm current product specification, injection equipment requirements and availability with Remmers Australia.",
    technicalProperties: [
      "Concentrated silane/siloxane liquid — potassium methyl siliconate base — penetrates masonry pore structure under low pressure or capillary suction",
      "Lower viscosity than cream — penetrates into denser masonry substrates where cream may not achieve full depth penetration",
      "WTA-referenced system — Remmers injection and renovation plasters form a coordinated system with consistent technical documentation",
      "Can be applied under controlled low pressure for uniform distribution across thick walls",
      "Part of complete Remmers rising damp system: Kiesol injection + SP renovation plasters + breathable topcoat",
    ],
    limitations: [
      "Liquid consistency — holes must be drilled at a slight downward angle (10–15°) or sealed after injection to prevent product running out before cure",
      "Low-pressure injection equipment may be required for thick walls or dense masonry — not a simple cartridge gun application",
      "Replastering with Remmers SP renovation plaster is mandatory after injection — liquid injection alone does not complete the treatment",
      "Walls must dry fully after treatment — confirm drying period with Remmers technical before redecoration",
      "Confirm current product specification, dilution rates, injection pressure requirements and local availability with Remmers Australia before specifying",
    ],
    procurementSources: [
      { name: "Remmers Australia — trade supply — contact for current pricing", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Safeguard Europe / Wykamol",
    brandUrl: "https://www.wykamol.com.au",
    accentColor: "#1e3a8a",
    name: "Wykamol Basecourse DPC Fluid",
    descriptionLine: "Siloxane-based liquid DPC injection fluid — for dense and low-porosity masonry where cream does not achieve full penetration",
    productType: "Siloxane liquid DPC injection",
    filterTags: ["Siloxane-liquid", "DPC-injection", "Pressure-injection", "Low-viscosity", "Dense-masonry", "Brick", "1C"],
    techChips: [
      { label: "Siloxane liquid", cls: "bg-sky-100 text-sky-800" },
      { label: "Dense masonry", cls: "bg-green-50 text-green-700" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Wykamol / Safeguard", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Wykamol (Safeguard Europe) supply siloxane-based liquid DPC injection products as an alternative to their Dryzone cream in situations where liquid injection is preferred — specifically for dense or low-porosity masonry where the cream may not achieve full penetration depth, or where injection pump equipment is available and the specifier prefers a pressure-injected liquid system.\n\nSiloxane liquid DPC products from Safeguard/Wykamol use siloxane chemistry that penetrates the masonry pore structure and creates a hydrophobic barrier. The liquid formulation offers very low viscosity for maximum penetration depth into dense substrate pores. Application typically requires injection under low positive pressure using a hand pump or motorised injection pump system.\n\nConfirm the current product name and product range for liquid siloxane DPC injection with Wykamol Australia, as product names and formulations in the Safeguard/Wykamol range may vary between markets. Confirm availability and technical support before specifying on a project.",
    technicalProperties: [
      "Siloxane chemistry — very low viscosity liquid — maximum penetration depth into dense masonry pore structure",
      "Suitable for dense and lower-porosity masonry where silane cream may not achieve full wall width penetration",
      "Pressure injection allows controlled dosing across wall width — suitable for thick walls (>450mm) where cream may not fully penetrate",
      "Safeguard / Wykamol national technical support — confirm Australian distribution with Wykamol Australia",
    ],
    limitations: [
      "Pressure injection equipment required — not a simple cartridge gun system — increases application cost and complexity",
      "Holes must be sealed or drilled at an angle — liquid will run out of unsealed holes before curing is complete",
      "Replastering with salt-resistant renovation plaster is mandatory after injection — liquid DPC alone does not complete the treatment",
      "Confirm current product name, specification and availability in Australia with Wykamol Australia before specifying — Safeguard/Wykamol product range varies between markets",
    ],
    procurementSources: [
      { name: "Wykamol Australia — trade supply — contact for current pricing", url: "https://www.wykamol.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Siloxane-liquid", label: "Siloxane liquid" },
  { id: "Silane-siloxane", label: "Silane/siloxane" },
  { id: "DPC-injection", label: "DPC injection" },
  { id: "Pressure-injection", label: "Pressure injection" },
  { id: "Low-viscosity", label: "Low viscosity" },
  { id: "Dense-masonry", label: "Dense masonry" },
  { id: "Brick", label: "Brick" },
  { id: "Blockwork", label: "Blockwork" },
  { id: "1C", label: "One-component" },
  { id: "WTA", label: "WTA system" },
];

const BRAND_EQUIV: { system: string; remmers: string; wykamol: string }[] = [
  { system: "Siloxane/silane liquid — standard liquid DPC injection", remmers: "Kiesol", wykamol: "Basecourse DPC Fluid*" },
  { system: "Silane/siloxane cream (cross-reference)", remmers: "Kiesol C", wykamol: "Dryzone" },
];

const TECH_INFO = {
  typicalApplications: [
    "Dense or low-porosity masonry where silane cream does not achieve full penetration depth across the wall cross-section",
    "Thick solid masonry walls (>350mm) where full width penetration must be confirmed under low pressure",
    "Rising damp in harder brick types — some Victorian-era bricks and engineering bricks have lower porosity than standard bricks",
    "Situations where injection pump equipment is available and pressure-controlled delivery is preferred",
  ],
  selectionCriteria: [
    "Siloxane liquid is preferred over cream for dense masonry substrates with low porosity where cream cannot penetrate the full wall width",
    "Silane cream (Dryzone, SikaMur InjectoCream-100) is more practical for standard porous masonry and small-scale works without pump equipment",
    "Confirm masonry porosity before selecting between cream and liquid — a simple water drop absorption test on the masonry gives a qualitative indication",
    "Liquid injection requires injection pump equipment — factor this into application cost and specifier requirements",
    "Both silane cream and siloxane liquid require the same follow-on treatment: plaster stripping and salt-resistant renovation plaster",
  ],
  limitations: [
    "Liquid injection requires sealed holes or downward-drilled holes to prevent product loss before curing",
    "Injection pump equipment required — increases application complexity compared to cream products",
    "Complete system: injection + plaster removal + salt-resistant renovation plaster + breathable topcoat — liquid injection alone is insufficient",
    "Rising damp diagnosis must be confirmed before injection — moisture meter testing across wall height required",
  ],
  standardsNotes: [
    "BS 6576 — Code of Practice for Design and Installation of Damp-Proofing Using Remedial Chemical Treatments — drilling specification and injection requirements",
    "WTA 2-6-99 — German WTA Institute standard for chemical injection DPC — referenced in Remmers system documentation",
    "Drilling specification: 12mm diameter holes at 100–120mm centres in the mortar bed joint at 75–150mm above floor level to 75% of wall width",
  ],
  suitableDefects: [
    "Rising damp in dense or hard brick masonry where silane cream DPC does not achieve full depth penetration",
    "Failed or absent physical DPC in dense masonry walls",
    "Rising damp in thick solid masonry walls where pressure injection ensures full width penetration",
  ],
  typicalSubstrates: [
    "Dense fired clay brick — lower porosity than standard brickwork — confirmed by poor water absorption on test",
    "Hard or semi-engineering brick — some Victorian and Edwardian-era commercial buildings",
    "Thick solid masonry walls (>350mm) where cream penetration depth may not reach the full wall width",
    "Calcium silicate brick — confirm porosity and suitability with manufacturer",
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
              {chips.map((chip) => (<span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>))}
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

export function SiloxaneLiquidDPCIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are siloxane liquid DPC injection systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Siloxane liquid chemical DPC injection systems are low-viscosity fluid products injected under pressure into pre-drilled holes in masonry to create a hydrophobic damp-proof barrier against rising damp. The low viscosity of liquid siloxane products allows deeper penetration into dense or fine-pored masonry substrates compared to cream products, making them the preferred injection product where masonry porosity is lower than standard brickwork.
        </p>
        <p>
          The key distinction from silane cream DPC is the product consistency and application method. Liquid products require the injection holes to be drilled at a slight downward angle or sealed after injection to prevent the product from running out. Low-pressure injection equipment (hand pump or motorised pump) is typically required to achieve controlled dosing. This increases application complexity compared to cream products but ensures uniform distribution across the full wall width in dense masonry.
        </p>
        <p>
          Like all chemical DPC injection systems, liquid injection treats capillary rise only. Old salt-contaminated plaster must be stripped and replaced with WTA-compliant salt-resistant renovation plaster after injection. The wall must then be allowed to dry before any non-breathable finish is applied.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Silane cream DPC injection (Dryzone, SikaMur InjectoCream-100) — cream consistency, no pump required, preferred for standard porous masonry",
            "Surface-applied siloxane water repellents (facade creams, masonry treatments) — surface treatment only, does not create a barrier within the wall",
            "Crystalline waterproofing injection (PU injection, acrylic injection) — used for active water ingress under pressure — not a rising damp DPC system",
            "Electro-osmotic damp proofing — different operating principle — confirm evidence base before specifying",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-xs leading-5 text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
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

export function SiloxaneLiquidDPCProductSection() {
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
    activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
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
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — siloxane liquid DPC injection — for dense and low-porosity masonry</p>
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
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}</span>
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
                      {product.tdsUrl && (<a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>)}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Liquid DPC injection products. * Confirm product name and specification with Wykamol Australia before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1a5276" }}>Remmers</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1e3a8a" }}>Safeguard / Wykamol</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.remmers, row.wykamol].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Liquid injection requires sealed or angled holes — product will run out of open vertical holes</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Unlike cream products, liquid siloxane will drain from an open vertical hole under gravity — holes must be drilled at a 10–15° downward angle or sealed with a plug after injection",
            "Low-pressure injection equipment (hand pump or motorised pump) is required to control dosing and achieve uniform distribution across the wall cross-section",
            "Confirm injection pressure limits with the manufacturer — excessively high pressure may damage mortar or cause the product to bypass the target zone",
            "As with all chemical DPC systems: replastering with salt-resistant renovation plaster is mandatory after liquid injection — liquid DPC alone does not complete the treatment",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
