"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Precast-concrete"
  | "Prestressed"
  | "AS-3600"
  | "AS-1478"
  | "AS-3700"
  | "Structural"
  | "All-exposure"
  | "Long-span"
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
    fullLabel: "Stresscrete",
    brandUrl: "https://www.stresscrete.com.au",
    accentColor: "#0369a1",
    name: "Stresscrete — Prestressed Concrete Lintels — Long Span",
    descriptionLine: "Stresscrete prestressed concrete lintels — long-span masonry openings — national distribution — engineer-specified prestress level — AS 3600",
    productType: "Prestressed precast concrete lintel — Stresscrete — long span — national — AS 3600",
    filterTags: ["Precast-concrete", "Prestressed", "AS-3600", "AS-1478", "AS-3700", "Structural", "All-exposure", "Long-span", "Engineer-designed", "Heavy", "National"],
    techChips: [
      { label: "Prestressed", cls: "bg-sky-100 text-sky-800" },
      { label: "Long span", cls: "bg-green-100 text-green-700" },
      { label: "National", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3600", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Stresscrete is a national prestressed concrete manufacturer supplying prestressed lintels for long-span or heavily loaded masonry openings on Class 2 strata buildings. Prestressing allows a concrete lintel of the same section depth to achieve greater span or carry higher loads than a conventionally reinforced section — used for wide garage door openings, wide commercial ground floor openings, and structurally loaded masonry zones where a reinforced lintel would require a greater depth than the opening geometry permits. Stresscrete manufactures under factory quality control — concrete strength, cover, and strand placement are controlled processes. The structural engineer must specify the required prestress level, camber tolerance, concrete cover, and bearing details. Cannot be cut on site — the exact bearing-to-bearing span must be confirmed before ordering. Mechanical lifting is mandatory for all prestressed lintels.",
    technicalProperties: [
      "Greater span capacity than reinforced concrete lintel of the same section depth — prestress allows longer spans at a shallower section",
      "National distribution from Stresscrete facilities — consistent availability for multi-state programmes",
      "Reduced deflection compared to reinforced concrete at the same load and span — prestress camber partially offsets imposed deflection",
      "Factory quality control — concrete strength, cover, and strand placement are controlled manufacturing processes",
      "Suitable for all exposure environments when correctly designed with adequate cover per AS 3600 Table 4.3",
      "Structural engineer load data and section capacity tables available from Stresscrete",
    ],
    limitations: [
      "Cannot be cut to length on site — bearing-to-bearing span must be confirmed before ordering; same constraint as all precast lintels",
      "Must not be stored inverted or supported at mid-span only — prestress is in the bottom of the section; invert storage causes top-face cracking",
      "Mechanical lifting is mandatory — confirm crane or hoist access before ordering",
      "Minimum bearing length requirements may be greater than for reinforced lintels — confirm with engineer before ordering",
    ],
    procurementSources: [
      { name: "Stresscrete — prestressed concrete lintels, national distribution", url: "https://www.stresscrete.com.au" },
      { name: "Stresscrete technical support — long-span section capacity and camber data", url: "https://www.stresscrete.com.au" },
    ],
  },
  {
    fullLabel: "VSL Australia / specialist prestress fabricators",
    brandUrl: "#",
    accentColor: "#b45309",
    name: "VSL Australia / Specialist Prestress Fabricators — Long-Span and Loaded Openings",
    descriptionLine: "VSL Australia and specialist prestress fabricators — prestressed lintels for long-span or heavily-loaded masonry openings — engineer-specified — AS 3600 + AS 1478",
    productType: "Prestressed precast concrete lintel — specialist fabricator — long-span / high-load — AS 3600",
    filterTags: ["Precast-concrete", "Prestressed", "AS-3600", "AS-1478", "AS-3700", "Structural", "All-exposure", "Long-span", "Engineer-designed", "Heavy"],
    techChips: [
      { label: "Prestressed", cls: "bg-amber-100 text-amber-800" },
      { label: "Specialist fabricator", cls: "bg-slate-100 text-slate-700" },
      { label: "Engineer specified", cls: "bg-green-100 text-green-700" },
      { label: "AS 3600 + AS 1478", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "VSL Australia and specialist prestressed concrete fabricators supply prestressed lintels for long-span or heavily-loaded masonry openings on Class 2 strata buildings — used where the span or loading exceeds the standard Stresscrete range or where non-standard section geometry is required. Specialist prestress fabricators work to the structural engineer&apos;s design — specifying the prestress strand layout, prestress force, concrete grade, cover, and bearing details. The engineer must confirm camber with the fabricator — prestressed lintels have an upward camber under the prestress force, and this camber must be accounted for in the soffit level of the opening. Allow 3–6 weeks lead time for specialist prestress manufacture. Cannot be cut on site. Mechanical lifting is mandatory.",
    technicalProperties: [
      "Suitable for the longest masonry opening spans — prestress allows sections to achieve spans that would require impractical depth in reinforced concrete",
      "Engineer specifies the prestress level — optimised for the specific span, load and exposure classification",
      "Non-standard section geometry available from specialist fabricators — not constrained to standard stock profiles",
      "Suitable for all exposure environments when correctly designed with adequate cover per AS 3600 Table 4.3",
      "Factory quality control for prestress strand placement and tension — more precise than site-cast reinforced concrete",
      "AS 3600 and AS 1478 compliance — structural engineer certification required for every lintel",
    ],
    limitations: [
      "3–6 week lead time for specialist fabrication — programme must allow for manufacturing time before delivery",
      "Camber must be confirmed with engineer before ordering — prestress camber affects the soffit level of the opening; confirm tolerance is acceptable",
      "Cannot be cut to length on site — exact span must be confirmed before ordering",
      "Must not be stored inverted — prestress in bottom of section; invert storage causes top-face cracking",
    ],
    procurementSources: [
      { name: "VSL Australia — prestressed concrete specialist, long-span elements", url: "" },
      { name: "Specialist prestress concrete fabricators — engineer to nominate for each project", url: "" },
      { name: "Stresscrete — also supplies non-standard sections on enquiry", url: "https://www.stresscrete.com.au" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  type: string;
  span: string;
  leadTime: string;
  camber: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Stresscrete",
    product: "Prestressed lintel",
    type: "Prestressed strand",
    span: "Up to ~6 m+ (engineer to confirm)",
    leadTime: "3–6 weeks",
    camber: "Confirm with engineer",
    primaryUse: "Long span / high load — national supply",
  },
  {
    supplier: "VSL / specialist fabricators",
    product: "Specialist prestressed lintel",
    type: "Prestressed strand — custom",
    span: "Any (engineer to specify)",
    leadTime: "3–6 weeks+",
    camber: "Engineer to specify tolerance",
    primaryUse: "Non-standard long-span or complex loading",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Wide garage door openings in masonry facades where reinforced precast requires an impractical section depth",
    "Wide commercial ground floor openings in Class 2 strata buildings — spans typically over 4 m",
    "Heavily loaded masonry openings where the reinforced precast section capacity is insufficient at the available depth",
    "Long-span window openings in coastal or inland masonry facades requiring prestressed section for serviceability",
  ],
  selectionCriteria: [
    "Structural engineer must specify the prestress level, camber, cover, and bearing details — do not order without an engineer&apos;s design",
    "Confirm camber tolerance with the engineer before ordering — upward camber under prestress must be accommodated in the soffit level",
    "Measure the exact bearing-to-bearing span before ordering — prestressed lintels cannot be cut to length on site",
    "Confirm mechanical lifting access before ordering — prestressed lintels are heavy and mechanical handling is mandatory",
    "Confirm minimum bearing length with engineer — prestressed lintels may have greater minimum bearing requirements than reinforced sections",
    "Allow 3–6 weeks lead time for manufacture — confirm before committing programme",
  ],
  limitations: [
    "Cannot be cut to length on site — same constraint as all precast lintels; span must be confirmed before ordering",
    "Must not be stored inverted — prestress is in the bottom; invert storage causes top-face cracking that compromises structural capacity",
    "Mechanical lifting is mandatory — confirm crane or hoist access before ordering",
    "Structural engineer specification is mandatory — prestressed design is more complex than reinforced and requires specialist engineer input",
    "Lead time is longer than reinforced stock sections — programme must allow for manufacture time",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — primary standard for prestressed concrete lintel design, cover, and durability",
    "AS 1478 — Chemical Admixtures for Concrete — relevant for concrete mix design for prestressed elements",
    "AS 3600 Table 4.3 — minimum concrete cover for exposure classifications A1, A2, B1, B2, C1, C2",
    "AS 3700 — Masonry Structures — bearing length and flashing requirements at lintel bearing zones",
    "NCC Volume One — structural performance requirements for Class 2 buildings",
  ],
  suitableDefects: [
    "Wide opening lintels in masonry facades — garage doors, wide windows — where existing lintel has failed and reinforced precast is inadequate at the available section depth",
    "Long-span masonry openings where the existing structural element (steel channel, reinforced concrete, or timber) has failed and prestressed concrete replacement is specified by engineer",
    "Heavily loaded masonry openings where a standard reinforced precast section cannot achieve the required span capacity",
    "Masonry crack patterns from lintel deflection on long-span openings — replacement with prestressed section to reduce deflection",
  ],
  typicalSubstrates: [
    "Clay brick masonry bearing course at both ends — confirm bearing zone is sound; engineer to confirm bearing adequacy for prestressed lintel reaction forces",
    "Concrete masonry unit (block) walls with wide openings — confirm block compressive strength for bearing stress at lintel ends",
    "All masonry substrates with long-span or heavily-loaded openings — engineer confirms the bearing zone can resist the prestressed lintel end reactions",
    "NOT suitable for short spans where a standard reinforced precast section achieves adequate capacity — use standard reinforced precast for routine openings",
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

export function PrestressedPrecastLintelIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is a prestressed precast concrete lintel?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A prestressed precast concrete lintel uses high-tensile steel strand placed in tension before the concrete is cast — the prestress force introduces a permanent compressive stress in the concrete that counteracts the tensile stresses from loading. This allows a prestressed lintel to achieve greater span or carry higher loads than a reinforced section of the same depth, and results in reduced deflection under serviceability loading. Used for garage door openings, wide commercial openings, and long-span masonry openings where a reinforced section would require impractical depth.
        </p>
        {expanded && (
          <>
            <p>
              Critical handling requirements apply to prestressed lintels: they must never be stored inverted or supported at mid-span only. The prestress strand is in the bottom of the section — inverting the lintel applies tension to the top face, where the concrete has no prestress protection, causing cracking that can compromise structural capacity before installation. Inspect all prestressed lintels on delivery for cracks and dimensional conformance.
            </p>
            <p>
              The upward camber from prestress must be accounted for in the soffit level — the engineer must confirm the camber tolerance is acceptable for the opening geometry before ordering. Mechanical lifting is mandatory. Allow 3–6 weeks lead time for manufacture from a specialist prestress fabricator.
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

export function PrestressedPrecastLintelProductSection() {
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
    { id: "Prestressed", label: "Prestressed" },
    { id: "AS-3600", label: "AS 3600" },
    { id: "Long-span", label: "Long span" },
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
            <p className="mt-1 text-sm text-slate-500">2 suppliers — prestressed precast concrete lintels — scroll to view all</p>
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
            <div key={supplier.name} className="flex-none" style={{ width: "calc(50% - 10px)", minWidth: "300px" }}>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of prestressed precast concrete lintel suppliers. Engineer must specify prestress level and confirm camber tolerance before ordering.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Typical span</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lead time</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Camber</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.span}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.leadTime}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.camber}</td>
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
