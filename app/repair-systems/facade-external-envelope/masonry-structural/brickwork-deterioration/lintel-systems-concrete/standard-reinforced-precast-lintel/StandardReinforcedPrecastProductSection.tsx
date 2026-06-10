"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Precast-concrete"
  | "Reinforced"
  | "AS-3600"
  | "AS-3700"
  | "Structural"
  | "All-exposure"
  | "Stock-sizes"
  | "Engineer-designed"
  | "Heavy"
  | "National";

type Supplier = {
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

const SUPPLIERS: Supplier[] = [
  {
    fullLabel: "Hume Concrete",
    brandUrl: "https://www.hume.com.au",
    accentColor: "#0369a1",
    name: "Hume Concrete — Standard Precast Reinforced Concrete Lintels",
    descriptionLine: "Hume Concrete standard precast reinforced concrete lintels — national distribution — stock sizes for common opening spans — AS 3600",
    productType: "Reinforced precast concrete lintel — Hume Concrete — national — stock sizes — AS 3600",
    filterTags: ["Precast-concrete", "Reinforced", "AS-3600", "AS-3700", "Structural", "All-exposure", "Stock-sizes", "Engineer-designed", "Heavy", "National"],
    techChips: [
      { label: "Precast reinforced", cls: "bg-sky-100 text-sky-800" },
      { label: "National distribution", cls: "bg-green-100 text-green-700" },
      { label: "Stock sizes", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3600", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Hume Concrete is a national precast concrete manufacturer supplying standard reinforced precast concrete lintels for masonry opening replacement on Class 2 strata buildings. Hume&apos;s stock lintel range covers the most common opening spans and loads — available with short lead times from distribution centres in most major Australian cities. The standard range uses deformed steel bar reinforcement with concrete cover specified to the AS 3600 durability class for the exposure classification. Stock sections cannot be cut to length on site — the bearing-to-bearing span must be confirmed before ordering. Structural engineer specification and certification is mandatory for all lintel replacements — Hume can provide section dimensions and load data to the engineer. Precast lintels are significantly heavier than steel lintels of the same span — mechanical handling is required for all but the shortest sections.",
    technicalProperties: [
      "National distribution from Hume Concrete distribution centres — consistent availability for multi-state remediation programmes",
      "Stock sizes cover common opening spans and loads — short lead times for standard sections from existing inventory",
      "No corrosion risk in the lintel body when cover is correctly specified — concrete protects reinforcement from the environment",
      "Thermally compatible with masonry — similar thermal expansion coefficient to clay brick; reduces differential movement",
      "Heritage compatible — lintel can be rendered or faced to match surrounding masonry",
      "Structural engineer load data available from Hume Concrete — assists with engineer design and certification",
    ],
    limitations: [
      "Cannot be cut to length on site — bearing-to-bearing span must be measured and confirmed before ordering; incorrect length requires a full replacement order",
      "Significantly heavier than steel lintels — mechanical lifting is required; confirm crane or hoist access before ordering",
      "Reinforcement cover must be correctly specified for the exposure class — coastal buildings require increased cover per AS 3600 Table 4.3",
      "Structural engineer specification and certification is mandatory — do not order or install without an engineer&apos;s signed design",
    ],
    procurementSources: [
      { name: "Hume Concrete — national precast concrete lintels", url: "https://www.hume.com.au" },
      { name: "Hume Concrete product catalogue — stock lintel range and dimensions", url: "https://www.hume.com.au" },
    ],
  },
  {
    fullLabel: "BGC Concrete",
    brandUrl: "https://www.bgcconcrete.com.au",
    accentColor: "#b45309",
    name: "BGC Concrete — Precast Concrete Lintels",
    descriptionLine: "BGC Concrete precast concrete lintels — WA / national distribution — standard range — reinforced to AS 3600",
    productType: "Reinforced precast concrete lintel — BGC Concrete — WA / national — standard range — AS 3600",
    filterTags: ["Precast-concrete", "Reinforced", "AS-3600", "AS-3700", "Structural", "All-exposure", "Stock-sizes", "Engineer-designed", "Heavy"],
    techChips: [
      { label: "BGC Concrete", cls: "bg-amber-100 text-amber-800" },
      { label: "WA / national", cls: "bg-sky-100 text-sky-800" },
      { label: "Standard range", cls: "bg-green-100 text-green-700" },
      { label: "AS 3600", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "BGC Concrete is a major precast concrete manufacturer with strong distribution in Western Australia and national supply capability. BGC&apos;s standard precast concrete lintel range covers the most common masonry opening spans for Class 2 strata buildings — suitable for residential and commercial facade remediation works. Standard sections use deformed steel bar reinforcement with concrete cover designed to the AS 3600 durability class for the exposure environment. WA coastal buildings are well within BGC&apos;s primary distribution network. Structural engineer specification is mandatory. Cannot be cut on site — bearing-to-bearing span must be confirmed before ordering.",
    technicalProperties: [
      "Strong WA distribution network — preferred precast lintel supplier for Perth and WA coastal remediation programmes",
      "Standard range covers most common Class 2 strata building opening spans and loads",
      "No corrosion risk when cover is correctly specified to AS 3600 for the exposure classification",
      "Thermally compatible with masonry — suitable for heritage and rendered facade applications",
      "Structural engineer load data available from BGC Concrete — assists with engineer certification",
      "National supply capability for multi-state programmes",
    ],
    limitations: [
      "Cannot be cut to length on site — exact span must be confirmed before ordering",
      "Mechanical lifting required — concrete lintels are significantly heavier than steel lintels of the same span",
      "Reinforcement cover must meet AS 3600 Table 4.3 for the exposure class — coastal and marine require higher cover than inland",
      "Structural engineer design and certification mandatory — do not install without an engineer&apos;s signed design for each lintel",
    ],
    procurementSources: [
      { name: "BGC Concrete — precast concrete lintels, WA / national", url: "https://www.bgcconcrete.com.au" },
      { name: "BGC Concrete product range — standard lintel sizes and specifications", url: "https://www.bgcconcrete.com.au" },
    ],
  },
  {
    fullLabel: "Local precast manufacturers",
    brandUrl: "#",
    accentColor: "#7c3aed",
    name: "Local Precast Manufacturers — Custom Precast Lintels to Opening Schedule",
    descriptionLine: "Custom precast lintels to engineer&apos;s opening schedule — local precast manufacturers — measure and quote per opening — all exposure zones",
    productType: "Custom precast concrete lintel — local manufacturer — engineer&apos;s opening schedule — AS 3600",
    filterTags: ["Precast-concrete", "Reinforced", "AS-3600", "AS-3700", "Structural", "All-exposure", "Engineer-designed", "Heavy"],
    techChips: [
      { label: "Custom precast", cls: "bg-violet-100 text-violet-800" },
      { label: "Local manufacture", cls: "bg-slate-100 text-slate-700" },
      { label: "Opening schedule", cls: "bg-green-100 text-green-700" },
      { label: "Engineer designed", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Local precast concrete manufacturers supply custom precast lintels to the structural engineer&apos;s opening schedule — each lintel is manufactured to the exact bearing-to-bearing span, section dimensions, reinforcement layout, and cover specified by the engineer for each specific opening. This route is used for non-standard opening spans, unusual loading, or where the stock range of national suppliers does not cover the required section. The engineer must provide a complete opening schedule with bearing-to-bearing spans, section depths, reinforcement specifications, and cover requirements for each lintel. Allow 2–6 weeks lead time for custom manufacture. Inspect all lintels on delivery for dimensional conformance, cracks, and reinforcement corrosion staining before accepting.",
    technicalProperties: [
      "Fully tailored to the project opening schedule — each lintel manufactured to the exact span and section specified by the engineer",
      "Engineer controls reinforcement cover, concrete grade, and mix design — optimised for the project&apos;s exposure classification",
      "Suitable for all exposure environments when correctly designed — coastal, inland, and marine applications",
      "Local manufacture reduces transport damage risk and simplifies delivery logistics for multi-opening programmes",
      "Structural engineer has full control over every aspect of the lintel design — not constrained to stock section profiles",
      "Suitable for heritage applications requiring custom section profiles or rendered finishes",
    ],
    limitations: [
      "2–6 week lead time for custom manufacture — programme must allow for manufacturing time before delivery",
      "No stock sections — every lintel must be ordered individually from the opening schedule; errors in the schedule cause delays",
      "Variable quality control compared to national manufacturers — inspect every lintel on delivery for cracks and dimensional conformance",
      "Structural engineer must provide a complete opening schedule — significant design time required before ordering",
    ],
    procurementSources: [
      { name: "Local precast manufacturers — measure and quote from engineer&apos;s opening schedule", url: "" },
      { name: "State precast concrete industry associations — member manufacturer listings", url: "" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  type: string;
  spans: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Hume Concrete",
    product: "Standard precast lintel",
    type: "Reinforced bar",
    spans: "Stock — common spans",
    distribution: "National",
    keyFeature: "Short lead time from stock",
    primaryUse: "Standard openings — national supply",
  },
  {
    supplier: "BGC Concrete",
    product: "Standard precast lintel",
    type: "Reinforced bar",
    spans: "Stock — common spans",
    distribution: "WA / national",
    keyFeature: "Strong WA distribution",
    primaryUse: "WA and national standard openings",
  },
  {
    supplier: "Local precast manufacturers",
    product: "Custom precast lintel",
    type: "Custom reinforced",
    spans: "Any — from schedule",
    distribution: "Local",
    keyFeature: "Fully custom to engineer&apos;s spec",
    primaryUse: "Non-standard openings and spans",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of failed, corroded, or undersized steel lintels in masonry facades where concrete is preferred over metallic alternatives",
    "Heritage building facades requiring thermally compatible lintel material that can be rendered to match surrounding masonry",
    "Standard opening spans and loads covered by stock precast sections — most common opening replacements on Class 2 strata buildings",
    "Masonry facades in all exposure environments — from inland to coastal — when cover is correctly specified to AS 3600",
  ],
  selectionCriteria: [
    "Measure the exact bearing-to-bearing span for every opening before ordering — concrete lintels cannot be cut to length on site",
    "Engage a structural engineer to design and certify every lintel to AS 3600 — do not order without an engineer&apos;s design",
    "Confirm the required concrete cover for the project&apos;s exposure classification — coastal buildings require increased cover per AS 3600 Table 4.3",
    "Confirm mechanical lifting access before ordering — concrete lintels are significantly heavier than steel lintels of the same span",
    "Consider local or custom precast for non-standard opening spans where national stock sections do not cover the required dimension",
    "Inspect all lintels on delivery for cracks, rust staining, and dimensional conformance before accepting",
  ],
  limitations: [
    "Cannot be cut on site — every bearing-to-bearing span must be measured and confirmed before ordering; re-orders cause programme delays",
    "Structural engineer specification is mandatory — do not select, order, or install without a signed engineer&apos;s design for each opening",
    "Reinforcement cover must be correctly specified — insufficient cover is a common defect in existing concrete lintels; do not repeat the same design error",
    "Mechanical lifting equipment is required for all but the shortest concrete lintels — confirm lifting access before ordering",
    "Cavity flashing must be correctly installed above the lintel before re-laying brickwork",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — primary standard for concrete lintel design, reinforcement, cover, and durability",
    "AS 3600 Table 4.3 — minimum concrete cover for exposure classifications A1, A2, B1, B2, C1, C2",
    "AS 3700 — Masonry Structures — bearing length and flashing requirements at lintel bearing zones",
    "NCC Volume One — structural performance requirements for Class 2 buildings",
    "Manufacturer test reports and precast plant certification required for each supply",
  ],
  suitableDefects: [
    "Failed, corroded, or undersized existing steel lintels in masonry facades where concrete replacement is preferred",
    "Existing concrete lintels with insufficient cover causing reinforcement corrosion and spalling — replacement with correctly-specified cover",
    "Heritage masonry facades where thermally compatible concrete is preferred over steel",
    "Masonry crack patterns caused by lintel deflection or failure — confirming replacement with correctly-sized section",
  ],
  typicalSubstrates: [
    "Clay brick masonry bearing course at both lintel ends — must be sound; engineer to confirm bearing zone condition before ordering",
    "Concrete masonry unit (block) walls — lintel must span the full cavity width with bearing on both leaves per engineer&apos;s design",
    "Heritage masonry — standard reinforced precast can be rendered or faced to integrate with existing masonry appearance",
    "NOT suitable where existing bearing masonry is deteriorated — repair bearing zone before installing new lintel",
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
              {src.url && src.url !== "#" ? (
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

export function StandardReinforcedPrecastIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is a standard reinforced precast concrete lintel?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A standard reinforced precast concrete lintel is a factory-manufactured structural element using deformed steel bar reinforcement with specified concrete cover, used to carry masonry load above window, door, and opening in Class 2 strata building facades. Unlike steel lintels, concrete lintels are thermally compatible with masonry, can be rendered for heritage facades, and are suitable for all exposure classifications when cover is correctly specified to AS 3600. National manufacturers Hume Concrete and BGC Concrete supply stock sections for common opening spans.
        </p>
        {expanded && (
          <>
            <p>
              The most common error with concrete lintel replacement is ordering the wrong span — concrete lintels cannot be cut to length on site, so the bearing-to-bearing span must be measured and confirmed before the order is placed. A structural engineer must design and certify every lintel to AS 3600, specifying the concrete grade, reinforcement layout, cover, and bearing details. The required cover is directly linked to the exposure classification — coastal buildings require significantly greater cover than inland applications to achieve the same design life.
            </p>
            <p>
              Inspect all precast lintels on delivery for cracks, rust staining at reinforcement locations, and dimensional conformance before accepting. Mechanical handling is required for all but the shortest concrete lintels — confirm crane or hoist access before ordering.
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

export function StandardReinforcedPrecastProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const visibleSuppliers =
    activeFilters.size === 0 ? SUPPLIERS : SUPPLIERS.filter((s) => Array.from(activeFilters).every((f) => s.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  const FILTER_DEFS: { id: FilterTag; label: string }[] = [
    { id: "Precast-concrete", label: "Precast concrete" },
    { id: "Reinforced", label: "Reinforced" },
    { id: "AS-3600", label: "AS 3600" },
    { id: "Stock-sizes", label: "Stock sizes" },
    { id: "National", label: "National" },
    { id: "All-exposure", label: "All exposure zones" },
    { id: "Engineer-designed", label: "Engineer designed" },
  ];

  return (
    <>
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

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Supplier Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 suppliers — standard reinforced precast concrete lintels — scroll to view all</p>
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
          <span className="text-xs font-semibold text-slate-400">{visibleSuppliers.length} supplier{visibleSuppliers.length !== 1 ? "s" : ""} — scroll to view all</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleSuppliers.map((supplier) => (
            <div key={supplier.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: supplier.accentColor }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{supplier.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {supplier.tdsUrl && <a href={supplier.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      {supplier.brandUrl !== "#" && (
                        <a href={supplier.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{supplier.name}</h3>
                  <div className="mt-0.5"><p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{supplier.productType}</p></div>
                  <CollapsibleCardDetails text={supplier.descriptionLine} chips={supplier.techChips} />
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={supplier.systemDescription} />
                </div>
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <CollapsibleList items={supplier.technicalProperties} icon="check" limit={3} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList items={supplier.limitations} icon="x" limit={3} />
                  </div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={supplier.procurementSources} />
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of standard reinforced precast concrete lintel suppliers. Confirm all selections against the structural engineer&apos;s design before ordering.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Spans</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.spans}</td>
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
