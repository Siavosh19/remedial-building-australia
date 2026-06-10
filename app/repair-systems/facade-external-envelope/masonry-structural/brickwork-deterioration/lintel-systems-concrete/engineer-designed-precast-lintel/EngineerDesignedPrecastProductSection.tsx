"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Precast-concrete"
  | "Custom"
  | "In-situ"
  | "AS-3600"
  | "AS-3700"
  | "Structural"
  | "All-exposure"
  | "Heritage-compatible"
  | "Engineer-designed"
  | "Non-standard"
  | "Heavy";

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
    fullLabel: "Local precast manufacturers",
    brandUrl: "#",
    accentColor: "#0369a1",
    name: "Local Precast Manufacturers — Custom Precast to Engineer&apos;s Specification",
    descriptionLine: "Custom precast to engineer&apos;s specification — any section and reinforcement — all exposure zones — AS 3600 — local manufacture",
    productType: "Custom precast concrete lintel — engineer&apos;s specification — local manufacturer — AS 3600",
    filterTags: ["Precast-concrete", "Custom", "AS-3600", "AS-3700", "Structural", "All-exposure", "Heritage-compatible", "Engineer-designed", "Non-standard", "Heavy"],
    techChips: [
      { label: "Custom precast", cls: "bg-sky-100 text-sky-800" },
      { label: "Any section", cls: "bg-green-100 text-green-700" },
      { label: "Engineer designed", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage compatible", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Local precast concrete manufacturers supply custom precast lintels to the structural engineer&apos;s specification — any section geometry, reinforcement layout, concrete grade, and cover can be specified. This route is used for non-standard opening spans, unusual structural loading, heritage facades requiring custom section profiles, or any situation where standard stock precast sections cannot meet the project requirements. The structural engineer designs the lintel from first principles — specifying section dimensions, reinforcement bar sizes and layout, concrete cover, concrete grade, and bearing plate details. The manufacturer produces the element to the engineer&apos;s drawings. Crack control requirements at the lintel-to-masonry interface should be considered by the engineer — particularly for remedial masonry applications where the surrounding masonry may have differential movement characteristics.",
    technicalProperties: [
      "Any section geometry and reinforcement layout — not constrained to standard precast manufacturer profiles",
      "Engineer controls concrete cover, grade, and mix design — optimised for the specific exposure classification",
      "Heritage compatible — section can be profiled, pigmented, or textured to match existing masonry",
      "Suitable for all exposure environments when correctly designed with adequate cover per AS 3600",
      "Structural engineer has full design control — crack control, deflection, and serviceability requirements all engineer-specified",
      "Local manufacture provides flexibility for complex shapes or embedded inserts not available from national suppliers",
    ],
    limitations: [
      "2–6 week lead time for custom manufacture — programme must allow for manufacturing time before delivery",
      "Requires a complete engineer&apos;s drawing for every lintel — significant design time required before ordering",
      "Variable quality control compared to national manufacturers — inspect every lintel on delivery for dimensional conformance, cracks, and reinforcement cover",
      "Cannot be cut to length on site — every span must be measured and confirmed in the engineer&apos;s opening schedule before ordering",
    ],
    procurementSources: [
      { name: "Local precast concrete manufacturers — custom section fabrication from engineer&apos;s drawings", url: "" },
      { name: "Specialist precast fabricators — complex section profiles and embedded inserts", url: "" },
    ],
  },
  {
    fullLabel: "Specialist structural precast fabricators",
    brandUrl: "#",
    accentColor: "#b45309",
    name: "Specialist Structural Precast Fabricators — Non-Standard Section Profiles",
    descriptionLine: "Non-standard precast lintels — complex section profiles — engineer-designed — specialist structural precast fabricators — all exposure zones",
    productType: "Non-standard custom precast lintel — specialist fabricator — complex profiles — AS 3600",
    filterTags: ["Precast-concrete", "Custom", "AS-3600", "AS-3700", "Structural", "All-exposure", "Heritage-compatible", "Engineer-designed", "Non-standard", "Heavy"],
    techChips: [
      { label: "Non-standard", cls: "bg-amber-100 text-amber-800" },
      { label: "Complex profiles", cls: "bg-slate-100 text-slate-700" },
      { label: "Specialist precast", cls: "bg-green-100 text-green-700" },
      { label: "Engineer designed", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Specialist structural precast fabricators manufacture non-standard precast lintels with complex section profiles — including rebated sections, shaped soffits, T-sections, L-sections, and lintels with embedded structural inserts. Used for heritage facades where the original opening had a non-rectangular lintel profile, or for structurally complex applications where the loading or geometry requires a custom section that a standard precast manufacturer cannot produce. The structural engineer provides a complete design package including section drawings, reinforcement schedule, concrete mix specification, cover requirements, and bearing details. Confirm crack control requirements for the lintel-to-masonry interface with the engineer — particularly important for heritage and remedial masonry applications. Allow 3–8 weeks lead time for specialist fabrication.",
    technicalProperties: [
      "Complex section profiles available — rebated, shaped soffit, T-section, L-section, or any engineer-specified geometry",
      "Embedded structural inserts possible — steel bearing plates, lifting anchors, and connection elements can be cast in",
      "Heritage compatible — section profile and finish can match original non-standard lintel geometry on heritage facades",
      "Engineer controls every aspect of the design — full first-principles approach for unusual loading or complex geometry",
      "Suitable for all exposure environments when correctly designed with adequate cover per AS 3600",
      "Structural engineer certification and full design package required — specialist fabricators can assist with constructability review",
    ],
    limitations: [
      "3–8 week lead time for specialist fabrication — longer than standard or local precast; confirm before committing programme",
      "Highest cost of all precast lintel options — complex moulds, specialist formwork, and non-standard reinforcement all add cost",
      "Requires a complete structural engineer&apos;s design package before fabrication can begin",
      "Inspection on delivery is critical — complex section geometry makes dimensional errors harder to detect; measure all critical dimensions before accepting",
    ],
    procurementSources: [
      { name: "Specialist structural precast fabricators — complex section profiles and non-standard elements", url: "" },
      { name: "State precast concrete industry associations — specialist fabricator listings", url: "" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  profile: string;
  leadTime: string;
  heritage: string;
  cost: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Local precast manufacturers",
    product: "Custom precast lintel",
    profile: "Standard or simple custom",
    leadTime: "2–6 weeks",
    heritage: "Rendered / pigmented",
    cost: "Moderate",
    primaryUse: "Non-standard spans and openings",
  },
  {
    supplier: "Specialist precast fabricators",
    product: "Non-standard section lintel",
    profile: "Complex — any profile",
    leadTime: "3–8 weeks",
    heritage: "Profile-matched to original",
    cost: "High",
    primaryUse: "Heritage / complex section profiles",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Non-standard opening spans or depths where stock precast sections from national manufacturers cannot be used",
    "Heritage masonry facades where the original lintel had a non-standard section profile that must be replicated in the replacement",
    "Complex structural loading from above — floors, balconies, or structural walls loading the lintel — where first-principles design is required",
    "Openings with embedded inserts, connection plates, or special bearings that cannot be incorporated into standard precast sections",
    "In-situ cast concrete lintels for small or inaccessible openings where precast delivery is not practicable",
  ],
  selectionCriteria: [
    "Engage a structural engineer to design from first principles — section dimensions, reinforcement, cover, and bearing all must be engineer-specified",
    "Confirm crack control requirements at the lintel-to-masonry interface — important for remedial masonry applications with differential movement",
    "Allow 2–8 weeks lead time depending on complexity — confirm with fabricator before committing programme",
    "Measure the exact bearing-to-bearing span before ordering — custom precast cannot be cut to length on site",
    "Confirm mechanical lifting access before ordering — custom precast lintels can be significantly heavier than standard sections",
    "Heritage authority approval may be required before ordering non-standard section profiles on listed buildings",
  ],
  limitations: [
    "Requires a complete structural engineer&apos;s design before ordering — the most design-intensive of all lintel options",
    "Custom precast cannot be cut on site — every span must be confirmed in the engineer&apos;s drawing before ordering",
    "Longer lead time than standard stock sections — programme must allow for both design time and manufacturing time",
    "In-situ casting option requires longer programme time and higher quality control oversight than factory precast",
    "Structural engineer certification is mandatory — custom designs require engineer sign-off before fabrication begins",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — primary standard for concrete lintel design, reinforcement, cover, crack control, and durability",
    "AS 3600 Section 8 — crack control requirements for concrete structures — engineer must check crack width at the masonry interface",
    "AS 3600 Table 4.3 — minimum concrete cover for exposure classifications A1, A2, B1, B2, C1, C2",
    "AS 3700 — Masonry Structures — bearing length and flashing requirements at lintel bearing zones",
    "Heritage state authority guidelines — Heritage NSW, Heritage Victoria, and equivalent bodies may require approval of non-standard section profiles on listed facades",
  ],
  suitableDefects: [
    "Non-standard opening spans or unusual structural loading on Class 2 strata buildings where standard precast is not applicable",
    "Heritage facades where the original lintel had a non-standard section that a standard replacement cannot replicate",
    "Complex loading situations — floors, balconies, or transfer structure above the lintel — where only a custom-designed section is adequate",
    "Situations where in-situ casting is preferable due to inaccessible delivery or complex existing opening geometry",
  ],
  typicalSubstrates: [
    "Clay brick masonry bearing course — confirm bearing zone adequacy for the custom engineer-designed end reactions",
    "Concrete masonry unit (block) walls with non-standard opening spans or unusual loading configurations",
    "Heritage masonry where a standard precast replacement would not match the original section profile or visual character",
    "All masonry substrates where standard precast sections are confirmed inadequate for the span, load, or geometry",
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

export function EngineerDesignedPrecastIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is an engineer-designed custom precast or in-situ concrete lintel?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          An engineer-designed concrete lintel is designed from first principles by a structural engineer — specifying the concrete grade, section dimensions, reinforcement layout and bar sizes, cover, and bearing details — then manufactured as a custom precast element or cast in-situ. This approach is used for non-standard opening spans, complex structural loading, heritage facades requiring profile-matched sections, or any situation where standard or prestressed precast sections cannot meet the project&apos;s structural or geometric requirements.
        </p>
        {expanded && (
          <>
            <p>
              The critical distinction between engineer-designed and standard precast is that there is no catalogue section to select from — the engineer must design every dimension from first principles against AS 3600. Crack control requirements at the lintel-to-masonry interface should be specifically checked — the interface between a new concrete lintel and the surrounding masonry can concentrate movement, particularly in remedial applications where the surrounding masonry already has cracking history.
            </p>
            <p>
              Allow 2–8 weeks lead time depending on whether local precast or specialist fabrication is required. Custom precast cannot be cut on site — the exact bearing-to-bearing span must be confirmed in the engineer&apos;s drawing before ordering. Heritage authority approval may be required before replacing a non-standard original lintel with a custom profile on a listed building.
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

export function EngineerDesignedPrecastProductSection() {
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
    { id: "Custom", label: "Custom precast" },
    { id: "AS-3600", label: "AS 3600" },
    { id: "Engineer-designed", label: "Engineer designed" },
    { id: "Heritage-compatible", label: "Heritage compatible" },
    { id: "Non-standard", label: "Non-standard" },
    { id: "All-exposure", label: "All exposure zones" },
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
            <p className="mt-1 text-sm text-slate-500">2 fabricator types — engineer-designed custom precast concrete lintels — scroll to view all</p>
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
          <span className="text-xs font-semibold text-slate-400">{visibleSuppliers.length} option{visibleSuppliers.length !== 1 ? "s" : ""} — scroll to view all</span>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Fabricator Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of engineer-designed custom precast fabricators. Structural engineer design package required before ordering from any fabricator.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fabricator type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lead time</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Heritage</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.leadTime}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.heritage}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.cost}</td>
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
