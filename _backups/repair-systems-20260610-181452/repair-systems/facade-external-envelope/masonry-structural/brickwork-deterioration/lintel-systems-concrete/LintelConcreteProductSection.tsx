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
  | "Prestressed"
  | "AS-3600"
  | "AS-3700"
  | "Structural"
  | "All-exposure"
  | "Heritage-compatible"
  | "Engineer-designed"
  | "Heavy";

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
    fullLabel: "Hume Concrete / Stresscrete / local precast",
    brandUrl: "https://www.hume.com.au",
    accentColor: "#b45309",
    name: "Standard reinforced precast concrete lintel — AS 3600",
    descriptionLine: "Reinforced precast concrete lintel to AS 3600 — structural engineer specification mandatory — cover designed to exposure classification — all exposure zones",
    productType: "Reinforced precast concrete lintel — AS 3600 / AS 3700 — structural — engineer designed",
    filterTags: ["Precast-concrete", "Reinforced", "AS-3600", "AS-3700", "Structural", "All-exposure", "Engineer-designed", "Heavy"],
    techChips: [
      { label: "Reinforced concrete", cls: "bg-amber-100 text-amber-800" },
      { label: "AS 3600", cls: "bg-slate-100 text-slate-700" },
      { label: "All exposure zones", cls: "bg-green-100 text-green-700" },
      { label: "Engineer certified", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Reinforced precast concrete lintel manufactured to AS 3600 for masonry opening support on Class 2 strata buildings. The standard reinforced precast lintel uses deformed steel bar reinforcement with concrete cover designed to the AS 3600 durability class for the project's exposure environment — inland lintels and coastal lintels require different minimum cover to achieve the same design life. Precast lintels are manufactured to the engineer's specified dimensions and cannot be cut to length on site — the exact bearing-to-bearing span must be confirmed before ordering. Structural engineer specification and certification is mandatory. Thermally compatible with masonry — concrete has a similar thermal expansion coefficient to clay brick, reducing differential movement at the lintel-to-masonry interface. Can be rendered or faced for heritage-compatible appearances.",
    technicalProperties: [
      "No corrosion of the lintel body — concrete protects reinforcement from the environment for the full design life when cover is correctly specified",
      "Suitable for all exposure environments when correctly designed — coastal and marine require increased concrete cover per AS 3600 Table 4.3",
      "Thermally compatible with masonry — similar thermal expansion coefficient to clay brick; reduces differential movement at lintel-to-masonry interface",
      "Heritage compatible — lintel profile can be rendered or faced to match surrounding masonry where aesthetic integration is required",
      "Standard stock sections available from precast manufacturers for common spans and loads",
      "Structural engineer design and certification required — ensures correct reinforcement, cover, and bearing for the specific opening",
    ],
    limitations: [
      "Cannot be cut to length on site — bearing-to-bearing span must be measured and confirmed before ordering; incorrect length requires a replacement order",
      "Significantly heavier than steel lintels of the same span — mechanical lifting equipment is required for all but the shortest concrete lintels",
      "Reinforcement cover must be correctly specified for the exposure class — insufficient cover leads to reinforcement corrosion and spalling",
      "Structural engineer specification and certification is mandatory — do not order or install without a signed engineer's design for each lintel",
    ],
    procurementSources: [
      { name: "Hume Concrete — precast concrete lintels — national", url: "https://www.hume.com.au" },
      { name: "Stresscrete — precast and prestressed lintels — national", url: "" },
      { name: "Local precast concrete manufacturers — measure and quote per opening schedule", url: "" },
      { name: "Masonry supply companies — standard stock precast lintel ranges", url: "" },
    ],
  },
  {
    fullLabel: "Stresscrete / VSL / local prestress manufacturer",
    brandUrl: "https://www.stresscrete.com.au",
    accentColor: "#0369a1",
    name: "Prestressed precast concrete lintel — long span",
    descriptionLine: "Prestressed precast concrete lintel to AS 3600 — long spans or high loads — shallow section — all exposure zones — structural engineer mandatory",
    productType: "Prestressed precast concrete lintel — AS 3600 — long span / high load — engineer designed",
    filterTags: ["Precast-concrete", "Prestressed", "AS-3600", "AS-3700", "Structural", "All-exposure", "Engineer-designed", "Heavy"],
    techChips: [
      { label: "Prestressed", cls: "bg-sky-100 text-sky-800" },
      { label: "Long span", cls: "bg-green-100 text-green-700" },
      { label: "Factory controlled", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3600", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Prestressed precast concrete lintel for longer span or higher load masonry openings on Class 2 strata buildings. Prestressing allows a concrete lintel of the same section depth to achieve greater span or carry higher loads than a conventionally reinforced lintel. Used for wide garage door openings, wide commercial ground floor openings, or structurally loaded masonry openings where a reinforced lintel would require a deeper section than the opening geometry allows. Manufactured under factory quality control — concrete strength, cover, and strand placement are controlled processes. Cannot be cut to length on site — bearing-to-bearing span must be confirmed before ordering. Mechanical lifting is mandatory. Prestressed lintels must NOT be stored inverted or supported only at ends — the prestress is in the bottom of the section and inverting causes top-face cracking.",
    technicalProperties: [
      "Greater span capacity than reinforced lintel of the same section depth — prestress allows longer spans at a shallower section",
      "Reduced deflection compared to reinforced concrete at same load and span — prestress camber partially offsets imposed deflection",
      "Suitable for all exposure environments when correctly designed with adequate concrete cover per AS 3600",
      "Factory quality control — concrete strength, cover, and strand placement are controlled factory processes",
      "Used for wide openings (garage doors, commercial ground floor, wide windows) where reinforced section depth is impractical",
      "Structural engineer specification and AS 3600 design certification required for every lintel",
    ],
    limitations: [
      "Cannot be cut to length on site — bearing-to-bearing span must be confirmed before ordering; same constraint as all precast lintels",
      "Significantly heavier than steel lintels of the same span — mechanical lifting is mandatory; confirm crane or hoist access before ordering",
      "Must not be stored inverted or supported only at mid-span — prestress is in the bottom; invert storage causes top-face cracking",
      "Minimum bearing length requirements may be greater than for reinforced lintels — confirm with engineer before ordering",
    ],
    procurementSources: [
      { name: "Stresscrete — prestressed concrete lintels — national", url: "https://www.stresscrete.com.au" },
      { name: "VSL Australia — prestressed structural elements", url: "" },
      { name: "Local prestress concrete manufacturers — 3–6 week lead time typical", url: "" },
      { name: "Engineer to nominate preferred supplier for each project", url: "" },
    ],
  },
  {
    fullLabel: "Engineer-designed — site-specific",
    brandUrl: "https://www.engineersaustralia.org.au",
    accentColor: "#7c3aed",
    name: "Engineer-designed in-situ or custom precast concrete lintel",
    descriptionLine: "Engineer-designed concrete lintel for non-standard openings, heritage facades, or unusual structural loading — designed from first principles to AS 3600 — site cast or purpose precast",
    productType: "Custom engineer-designed concrete lintel — AS 3600 — non-standard / heritage — structural",
    filterTags: ["Precast-concrete", "Reinforced", "AS-3600", "AS-3700", "Structural", "All-exposure", "Engineer-designed", "Heritage-compatible"],
    techChips: [
      { label: "Custom designed", cls: "bg-purple-100 text-purple-800" },
      { label: "Heritage compatible", cls: "bg-amber-100 text-amber-800" },
      { label: "First principles", cls: "bg-slate-100 text-slate-700" },
      { label: "In-situ or precast", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Engineer-designed concrete lintel for non-standard openings, unusual structural loading, heritage-sensitive facades, or situations where standard precast sections cannot be accommodated. The engineer designs the lintel from first principles — specifying the concrete grade, reinforcement layout, cover, shear reinforcement and bearing details — and the lintel is either cast in-situ (for smaller, accessible openings) or manufactured as a purpose precast element. This approach allows the lintel to be tailored to the exact structural and aesthetic requirements of the project. The concrete can be pigmented or textured to match the existing masonry for heritage integration. In-situ casting can accommodate non-standard section profiles and shaped soffits. Full structural engineer design and certification to AS 3600 is mandatory.",
    technicalProperties: [
      "Fully tailored to project-specific span, load, section geometry, and aesthetics — not constrained to standard precast manufacturer profiles",
      "Can be designed for heritage compatibility — pigmented, textured, or faced concrete to match existing masonry",
      "In-situ casting accommodates non-standard profiles, shaped soffits, rebated sections, or embedded inserts",
      "Engineer has full control over concrete mix, reinforcement cover, and durability class — optimised for the specific exposure classification",
      "For unique or complex structural situations where standard precast sections do not provide the required capacity or geometry",
      "Full structural engineer design package (drawings, specification, AS 3600 design certificate) required for every lintel",
    ],
    limitations: [
      "Requires a full structural engineer design from scratch — more design time and cost than specifying a standard precast section",
      "In-situ casting requires formwork, wet concrete placement and cure time — programme duration is longer than precast delivery",
      "Custom precast has longer lead time than standard stock precast — confirm with precast contractor before committing to programme",
      "Site casting quality depends on contractor workmanship — harder to control than factory precast; formwork and curing must be supervised",
    ],
    procurementSources: [
      { name: "Local precast concrete manufacturers — custom section manufacturing", url: "" },
      { name: "Site-based concrete contractor — in-situ casting option", url: "" },
      { name: "Structural engineer to nominate supplier and inspect works", url: "" },
      { name: "Heritage specialist contractors — facade-compatible concrete lintels", url: "" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Precast-concrete", label: "Precast concrete" },
  { id: "Reinforced", label: "Reinforced" },
  { id: "Prestressed", label: "Prestressed" },
  { id: "AS-3600", label: "AS 3600" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Structural", label: "Structural" },
  { id: "All-exposure", label: "All exposure zones" },
  { id: "Heritage-compatible", label: "Heritage compatible" },
  { id: "Engineer-designed", label: "Engineer designed" },
  { id: "Heavy", label: "Heavy (lifting req.)" },
];

const SYSTEM_COMPARISON: {
  product: string;
  type: string;
  coastal: string;
  typicalSpan: string;
  mechanicalLift: string;
  leadTime: string;
  primaryUse: string;
}[] = [
  {
    product: "Reinforced precast",
    type: "Reinforced bar",
    coastal: "Yes — cover designed",
    typicalSpan: "Up to ~4 m",
    mechanicalLift: "Often required",
    leadTime: "2–4 weeks",
    primaryUse: "Standard openings — all exposures",
  },
  {
    product: "Prestressed precast",
    type: "Prestressed strand",
    coastal: "Yes — cover designed",
    typicalSpan: "Up to ~6 m+",
    mechanicalLift: "Mandatory",
    leadTime: "3–6 weeks",
    primaryUse: "Long span / high load openings",
  },
  {
    product: "Engineer-designed custom",
    type: "Custom — first principles",
    coastal: "Yes — engineer designed",
    typicalSpan: "Any",
    mechanicalLift: "Project specific",
    leadTime: "Engineer-specified",
    primaryUse: "Non-standard / heritage / complex",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of failed, corroded, or undersized steel lintels in masonry facades where concrete is preferred",
    "Heritage building facades requiring thermally compatible lintel material that can be rendered to match masonry",
    "Long-span or high-load openings (garage doors, wide commercial openings) requiring prestressed sections",
    "Non-standard openings or unusual structural loading requiring an engineer-designed custom lintel",
  ],
  selectionCriteria: [
    "Measure the exact bearing-to-bearing span for every opening before ordering — concrete lintels cannot be cut to length on site",
    "Engage a structural engineer to design and certify every lintel to AS 3600 — do not order without an engineer's design",
    "Confirm the required concrete cover for the project's exposure classification — coastal buildings require increased cover and higher concrete strength per AS 3600 Table 4.3",
    "Confirm mechanical lifting access before ordering large or heavy lintels — especially for multi-storey applications",
    "Use prestressed sections where span or load exceeds the capacity of a standard reinforced section at the available section depth",
    "Consider in-situ or custom precast for heritage facades where a rendered or profiled finish is required",
  ],
  limitations: [
    "Cannot be cut on site — every bearing-to-bearing span must be measured and confirmed before ordering; re-orders cause significant programme delays",
    "Structural engineer specification is mandatory — do not select, order, or install concrete lintels without a signed engineer's design for each opening",
    "Insufficient reinforcement cover is the most common defect in concrete lintels — the same defect being remediated on the existing structure; the engineer must specify the correct cover",
    "Prestressed lintels must not be stored inverted — this causes top-face cracking that will compromise the structural capacity",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — primary standard for concrete lintel design, cover, and durability",
    "AS 3600 Table 4.3 — minimum concrete cover for exposure classification A1, A2, B1, B2, C1, C2",
    "AS 3700 — Masonry Structures — bearing length and flashing requirements at lintel bearing zones",
    "NCC Volume One — structural performance requirements for Class 2 buildings and structural members",
    "Manufacturer test reports / precast plant certification required for each product",
  ],
  suitableDefects: [
    "Failed, corroded, or undersized existing lintels in masonry facades on Class 2 strata buildings",
    "Missing lintels in masonry facades (incorrectly omitted during original construction)",
    "Heritage masonry facades where thermally compatible concrete is preferred over steel",
    "Masonry crack patterns caused by lintel deflection or failure — requiring lintel replacement",
  ],
  typicalSubstrates: [
    "Masonry bearing course at both ends — must be sound; engineer to confirm adequacy of bearing zone before ordering",
    "Cavity masonry walls — lintel must span the full cavity width with bearing on both leaves per engineer's design",
    "Heritage masonry — in-situ or custom precast can be profiled and finished to integrate with existing masonry appearance",
    "NOT suitable where existing bearing masonry is deteriorated — repair bearing zone masonry before installing new lintel",
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

export function LintelConcreteIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are precast concrete lintel systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Precast concrete lintels are factory-manufactured structural elements designed to carry the load of masonry above window, door, and garage door openings on Class 2 strata and commercial buildings. Unlike steel lintels, concrete lintels are thermally compatible with masonry, can be rendered or faced to match heritage facades, and are suitable for all exposure classifications when the reinforcement cover is correctly designed to AS 3600.
        </p>
        {expanded && (
          <>
            <p>
              The critical rule for all concrete lintels is that they cannot be cut to length on site — the exact bearing-to-bearing span must be measured and confirmed before the order is placed. A structural engineer must design and certify every lintel to AS 3600 — specifying the concrete grade, reinforcement layout, cover, and bearing details. The required reinforcement cover varies with the exposure classification: coastal buildings require significantly more cover than inland buildings to achieve the same design life.
            </p>
            <p>
              Prestressed lintels are used where span or load exceeds the capacity of a standard reinforced section at the available depth. Prestressed lintels must never be stored inverted — the prestress is in the bottom of the section and inverting causes top-face cracking. Every concrete lintel should be inspected on delivery for cracks, rust staining, and dimensional conformance before accepting.
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

export function LintelConcreteProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — precast concrete lintels — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of precast concrete lintel systems. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Typical span</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mechanical lifting</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lead time</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.typicalSpan}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.mechanicalLift}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.leadTime}</td>
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
