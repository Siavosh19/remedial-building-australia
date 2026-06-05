"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Flexible" | "Paintable" | "Facade" | "Render" | "Masonry" | "Acrylic" | "PU" | "Elastomeric" | "Hairline" | "Moderate-width";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://www.sika.com/au",
    tdsUrl: "https://www.sika.com/au",
    accentColor: "#dc2626",
    name: "Sika SikaFill-300",
    descriptionLine: "Elastomeric crack bridging coating and filler — suitable for filling and bridging fine to moderate non-structural facade cracks — paintable — used as a flexible crack repair system under facade coatings in Australian strata remediation",
    productType: "Elastomeric crack bridging coating — non-structural facade cracks",
    filterTags: ["Flexible", "Paintable", "Facade", "Render", "Masonry", "Elastomeric", "Hairline", "Moderate-width"],
    techChips: [
      { label: "Elastomeric", cls: "bg-slate-100 text-slate-700" },
      { label: "Crack bridging", cls: "bg-sky-100 text-sky-800" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Sika SikaFill-300 is an elastomeric crack bridging coating and filler suitable for sealing and bridging fine to moderate width non-structural facade cracks in rendered and masonry surfaces. It is applied by brush or roller as a flexible coating that bridges hairline to moderate cracks and accommodates minor ongoing movement. SikaFill-300 is used in Australian strata facade remediation as a crack repair layer applied under a facade coating system, providing flexibility that rigid fillers cannot offer. It is paintable once cured. Do not use for structurally active cracks, wide cracks or cracks with significant ongoing movement — these require a movement joint sealant system with backer rod. Confirm suitability, application method and crack width limits from the current Sika TDS. TODO: owner confirm — confirm current product designation, crack width capacity and compatibility with final coating with Sika Australia technical.",
    technicalProperties: [
      "Elastomeric — flexible after cure — bridges fine to moderate non-structural cracks",
      "Paintable — can be coated over with facade paint systems",
      "Suitable for rendered and masonry facade surfaces",
      "Applied by brush or roller — no specialist equipment required",
      "TODO: owner confirm — confirm crack width capacity and application method from current Sika TDS",
    ],
    limitations: [
      "Not suitable for structurally active cracks — engineering assessment required before application",
      "Not suitable for wide movement joints — use sealant-backed movement joint system for wide or active joints",
      "Not suitable as a waterproofing membrane — a dedicated membrane system is required for waterproofing over cracked substrates",
      "TODO: owner confirm — confirm maximum crack width, application method and suitability from current Sika TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://www.sika.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Bostik Australia",
    brandUrl: "https://www.bostik.com/au",
    tdsUrl: "https://www.bostik.com/au",
    accentColor: "#0369a1",
    name: "Bostik Seal N Flex Facade",
    descriptionLine: "One-part flexible polyurethane crack sealant — paintable — suitable for non-structural facade cracks in render, masonry and concrete — can be used as a crack filler before overcoating with facade paint in Australian strata remediation",
    productType: "One-part PU flexible crack sealant — facade cracks — paintable",
    filterTags: ["Flexible", "Paintable", "Facade", "Render", "Masonry", "PU", "Moderate-width"],
    techChips: [
      { label: "One-part PU", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable", cls: "bg-sky-100 text-sky-800" },
      { label: "Flexible", cls: "bg-green-50 text-green-700" },
      { label: "TODO: owner confirm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Bostik Seal N Flex Facade is a one-part polyurethane sealant suitable for use as a flexible crack filler in facade crack remediation on rendered and masonry surfaces. It is paintable once cured — an important advantage for facade work where the repair must be overcoated with facade paint or coating. One-part PU crack fillers are applied by cartridge gun into the cleaned crack, then struck off flush with the surface once cured, and overcoated. For cracks wider than hairline, the crack should be chased (widened) to form a proper sealant joint with parallel faces and correct width-to-depth ratio before applying the sealant. Do not apply into V-shaped cracks without first forming a parallel-sided joint. Confirm current product designation, crack width capacity and paintability from the current Bostik TDS. TODO: owner confirm — confirm current product designation, application method and crack width capacity with Bostik Australia.",
    technicalProperties: [
      "One-part — no mixing — ready to apply from cartridge",
      "Paintable after cure — suitable for overcoating with facade paint",
      "Flexible — accommodates minor ongoing movement in non-structural cracks",
      "Suitable for render, masonry and concrete facade crack filling",
      "TODO: owner confirm — confirm crack width capacity and application method from current Bostik TDS",
    ],
    limitations: [
      "Not suitable for structurally active or wide movement cracks",
      "Not suitable for waterproofing without a dedicated membrane over",
      "Crack must be clean and dry before application",
      "For cracks wider than hairline, form parallel-sided joint before applying sealant filler",
      "TODO: owner confirm — confirm current product designation and all parameters with Bostik Australia",
    ],
    procurementSources: [
      { name: "Bostik Australia — trade supply", url: "https://www.bostik.com/au" },
      { name: "Bunnings Warehouse — retail and trade", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 — hardware trade", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "Selleys Australia",
    brandUrl: "https://www.selleys.com.au",
    tdsUrl: "https://www.selleys.com.au",
    accentColor: "#7c3aed",
    name: "Selleys No More Gaps Exterior",
    descriptionLine: "Flexible acrylic exterior crack filler — paintable — suitable for hairline to fine cracks in render, masonry and concrete facades — low movement accommodation — widely available through Australian hardware channels — for minor crack filling before repainting",
    productType: "Flexible acrylic filler — exterior facade — hairline cracks — paintable",
    filterTags: ["Flexible", "Paintable", "Facade", "Render", "Masonry", "Acrylic", "Hairline"],
    techChips: [
      { label: "Acrylic", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior rated", cls: "bg-sky-100 text-sky-800" },
      { label: "Paintable", cls: "bg-green-50 text-green-700" },
      { label: "Hairline only", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: "Selleys No More Gaps Exterior is a flexible acrylic exterior filler suitable for filling hairline to fine cracks in render, masonry and concrete facade surfaces prior to repainting. It is widely available through Australian hardware and trade channels and is the most commonly used product for minor facade crack touch-up and pre-paint preparation in strata remediation. Acrylic fillers have lower movement accommodation than polyurethane or elastomeric crack fillers — they are suitable for hairline cracks that are stable or have minimal ongoing movement, but not for cracks with significant width or active thermal or structural movement. Selleys No More Gaps Exterior is water-based, easy to apply, cleans up with water and is paintable once cured. For cracks wider than approximately 2mm, a PU or elastomeric sealant filler is more appropriate. Confirm suitability for the specific crack type and width from the current Selleys TDS.",
    technicalProperties: [
      "Water-based acrylic — easy application, water cleanup",
      "Paintable after cure — compatible with most exterior architectural paints",
      "Exterior rated — suitable for Australian outdoor conditions for hairline cracks",
      "Flexible — some movement accommodation for hairline stable cracks",
      "Widely available — Bunnings, Mitre 10, hardware trade",
      "For cracks up to approximately 2mm width",
    ],
    limitations: [
      "Lower movement accommodation than PU or elastomeric fillers — not suitable for active or thermally wide cracks",
      "Not suitable for cracks wider than approximately 2mm without specialist assessment",
      "Not suitable for structurally active cracks",
      "Not a waterproofing membrane — do not rely on for water exclusion in cracked facades",
      "May crack at the filler/substrate interface if movement exceeds filler capacity",
    ],
    procurementSources: [
      { name: "Bunnings Warehouse — retail and trade", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 — hardware trade", url: "https://www.mitre10.com.au" },
      { name: "Selleys Australia — trade supply", url: "https://www.selleys.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Flexible", label: "Flexible" },
  { id: "Paintable", label: "Paintable" },
  { id: "Facade", label: "Facade" },
  { id: "Render", label: "Render" },
  { id: "Masonry", label: "Masonry" },
  { id: "Acrylic", label: "Acrylic" },
  { id: "PU", label: "Polyurethane" },
  { id: "Elastomeric", label: "Elastomeric" },
  { id: "Hairline", label: "Hairline cracks" },
  { id: "Moderate-width", label: "Moderate width" },
];

const SYSTEM_COMPARISON = [
  { product: "SikaFill-300", brand: "Sika", type: "Elastomeric", movement: "Moderate — crack bridging", paintable: "Yes", cracksuitability: "Hairline to moderate width", primaryUse: "Crack bridging coating under facade paint on rendered and masonry facades" },
  { product: "Seal N Flex Facade", brand: "Bostik", type: "One-part PU", movement: "Moderate — flexible sealant", paintable: "Yes", cracksuitability: "Hairline to moderate width", primaryUse: "Non-structural facade crack filling before overcoating in strata remediation" },
  { product: "No More Gaps Exterior", brand: "Selleys", type: "Acrylic", movement: "Low — hairline cracks only", paintable: "Yes", cracksuitability: "Hairline to 2mm", primaryUse: "Hairline crack touch-up before repainting — minor defects only" },
];

const TECH_INFO = {
  typicalApplications: [
    "Hairline crack filling in rendered facades before repainting in strata building maintenance",
    "Non-structural control crack repair in masonry facades before overcoating",
    "Pre-paint crack remediation in concrete facades with stable fine cracks",
    "Touch-up repair of minor cracks in facade render coat before topcoat application",
    "Crack bridging layer under elastomeric facade coating systems",
  ],
  selectionCriteria: [
    "Confirm the crack is non-structural before applying any filler — obtain engineering assessment for structural cracks",
    "Match filler flexibility to crack movement demand — PU and elastomeric fillers for wider or more active cracks",
    "Confirm paintability of filler matches the facade coating system being applied over it",
    "For cracks wider than 2mm, form a proper sealant joint profile before applying flexible filler",
    "For cracks with significant ongoing movement, specify a movement joint sealant system instead",
    "Confirm substrate compatibility and application method from current manufacturer TDS",
  ],
  limitations: [
    "Flexible crack fillers are not waterproofing membranes — a full membrane system is required where waterproofing is needed",
    "Not suitable for structurally active cracks — engineering assessment must be obtained first",
    "Not suitable for wide movement joints — movement joint sealant with backer rod is required",
    "Low-movement acrylic fillers will crack if applied to active or thermally wide cracks",
    "Filler must be applied to clean, dry, dust-free and oil-free substrate for correct bonding",
  ],
  standardsNotes: [
    "Manufacturer TDS — confirm crack width capacity, movement accommodation and application method",
    "AS 4654 — Waterproofing membranes for external above-ground use (if membrane system is specified over)",
    "Facade consultant assessment — required before any crack repair to confirm crack cause and correct repair method",
    "Do not apply crack filler without first confirming crack type and cause — incorrect repair type causes recurring failure",
  ],
  suitableDefects: [
    "Hairline to fine non-structural cracks in rendered facade surfaces — stable or with minor ongoing movement",
    "Minor surface cracking in masonry facade (not penetrating or structural)",
    "Control crack cracking in rendered surfaces from thermal cycling — where crack is stable",
    "Pre-paint crack preparation on concrete, masonry and render facades before repainting",
  ],
  typicalSubstrates: [
    "Cement render — acrylic and sand-and-cement render facades",
    "Masonry — face brick and block facades",
    "Concrete — external concrete facades and precast panels",
    "Painted surfaces — previously painted facade surfaces requiring crack touch-up",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
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
        <button onClick={() => setExpanded(e => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${items.length - limit} more ↓`}
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
        <button onClick={() => setExpanded(e => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map(src => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with current manufacturer TDS. Always assess crack type before specifying repair.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map(chip => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}</div>}</>)}
      <button onClick={() => setExpanded(e => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded(e => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
    </div>
  );
}

export function FlexCrackIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are flexible crack filler systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Flexible crack filler systems are elastomeric or flexible polymer-based materials applied to fill and bridge non-structural cracks in facade surfaces — rendered, masonry and concrete — where the filled crack must accommodate some ongoing minor movement without re-cracking. Unlike rigid fillers (cementitious patching, epoxy fillers), flexible crack fillers remain pliable after cure, allowing the filled crack to open and close slightly with thermal movement without breaking down the repair.</p>
        {expanded && <p>In Australian Class 2 strata facade remediation, flexible crack fillers are most commonly used for pre-paint crack repair — filling hairline to moderate-width stable or slowly-moving cracks in render, masonry or concrete surfaces before applying a facade paint or coating. The three main types used are: elastomeric crack bridging coatings (applied by brush or roller — bridge fine cracks over a wider area); one-part PU flexible sealants (applied by gun — good movement accommodation, paintable); and flexible acrylic fillers (easy to apply, widely available, suitable for hairline cracks only). Always confirm the crack is non-structural before applying any filler — a qualified consultant must assess the crack cause. Wide or actively moving cracks require a properly formed movement joint with backer rod and sealant rather than a simple filler.</p>}
      </div>
      <button onClick={() => setExpanded(e => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
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

export function FlexCrackProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter(p => Array.from(activeFilters).every(f => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen(o => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — flexible crack filler systems — scroll to view all</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map(f => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
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
          {visibleProducts.map(product => (
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
            <p className="mt-1 text-sm text-slate-500">Flexible crack filler comparison. Confirm suitability for crack type and width. Engineering assessment required before repair.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Movement</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Paintable</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Crack suitability</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.movement}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.paintable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.cracksuitability}</td>
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
