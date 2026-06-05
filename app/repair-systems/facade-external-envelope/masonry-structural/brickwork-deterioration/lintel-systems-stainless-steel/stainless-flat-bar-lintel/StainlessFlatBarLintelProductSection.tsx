"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Stainless-316L"
  | "Flat-bar"
  | "AS-3700"
  | "AS-4100"
  | "Coastal"
  | "Marine"
  | "Structural"
  | "Passivated"
  | "Engineer-specified"
  | "Shallow-rebate"
  | "Short-span";

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
    fullLabel: "Ancon Building Products",
    brandUrl: "https://www.ancon.com.au",
    accentColor: "#0369a1",
    name: "Ancon 316L Stainless Flat Bar Lintel — shallow rebate coastal",
    descriptionLine: "Ancon 316L flat bar lintels — shallow rebate coastal applications — spans typically under 2 m — engineer deflection verification required",
    productType: "Grade 316L stainless steel flat bar lintel — shallow rebate coastal masonry — AS 4100",
    filterTags: ["Stainless-316L", "Flat-bar", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural", "Shallow-rebate", "Short-span"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-sky-100 text-sky-800" },
      { label: "Shallow rebate", cls: "bg-green-100 text-green-700" },
      { label: "Coastal / marine", cls: "bg-slate-100 text-slate-700" },
      { label: "Spans < 2 m", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Ancon Building Products supplies grade 316L stainless steel flat bar lintels for shallow rebate coastal masonry openings where a full equal angle section cannot be accommodated within the available structural depth. The flat bar profile allows the lintel to sit within a minimal rebate — particularly applicable in situations where the original construction used a thin flat plate and the opening geometry prevents replacement with a deeper angle section. Ancon flat bar lintels are supplied in grade 316L for coastal and marine applications — the same grade as Ancon&apos;s angle lintel range, providing corrosion resistance consistency across the remedial scope. The structural engineer must verify the flat bar section achieves adequate span capacity within the available depth — flat bars have significantly lower section modulus than angle sections of the same height.",
    technicalProperties: [
      "Minimal profile depth — fits within shallow rebate openings where a full angle section would project below the soffit line",
      "Grade 316L stainless — full corrosion resistance in coastal and marine environments — maintenance-free service life",
      "Compatible with Ancon remedial masonry ties and cavity flashing systems — consistent 316L grade across all coastal facade elements",
      "Lighter than angle lintels of the same span — easier manual handling for shorter coastal openings",
      "Material test certificate confirming grade 316L available on request — mandatory for coastal applications",
      "Standard stock sections available — short lead time for common flat bar sizes",
    ],
    limitations: [
      "Restricted to spans typically under 2 m — flat bar has significantly lower section modulus than equal-height angle; engineer must confirm span capacity",
      "Engineer must verify deflection independently — flat bar sections deflect more than angle sections at the same load and span; serviceability must be checked",
      "Not interchangeable with angle lintel without engineering approval — do not substitute flat bar for angle without explicit engineer sign-off",
      "Confirm grade 316L on material test certificate — do not accept grade 304 for coastal applications",
    ],
    procurementSources: [
      { name: "Ancon Building Products — national supplier, stainless lintel range", url: "https://www.ancon.com.au" },
      { name: "Ancon technical support — flat bar section sizing and load tables", url: "https://www.ancon.com.au" },
    ],
  },
  {
    fullLabel: "Helifix",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#b45309",
    name: "Helifix 316L Stainless Flat Bar Lintel — remedial masonry products",
    descriptionLine: "316L flat bar lintel sections — stainless remedial masonry products — shallow rebate coastal openings",
    productType: "Grade 316L stainless steel flat bar lintel — Helifix — coastal / marine — shallow rebate",
    filterTags: ["Stainless-316L", "Flat-bar", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural", "Engineer-specified", "Shallow-rebate"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-amber-100 text-amber-800" },
      { label: "Helifix remedial", cls: "bg-sky-100 text-sky-800" },
      { label: "Shallow rebate", cls: "bg-green-100 text-green-700" },
      { label: "Passivate welds", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Helifix supplies grade 316L stainless flat bar lintel sections for shallow rebate coastal masonry openings as part of its specialist remedial masonry structural product range. The flat bar profile is used specifically where the masonry rebate dimension is too narrow for an angle section. Helifix can supply flat bar to the structural engineer&apos;s section specification — sections outside the standard 75×10 mm and 100×10 mm range are available to engineer&apos;s specification. Helifix&apos;s remedial masonry range includes compatible stainless helical ties, bed joint reinforcement, and fixings — allowing a single supplier system for the full coastal facade remediation scope. Material test certificates confirming grade 316L are available on request. All welded connections must be passivated by the fabricator before delivery.",
    technicalProperties: [
      "Flat bar sections available to engineer&apos;s specification — for shallow rebate openings where angle sections cannot be installed",
      "Grade 316L — full corrosion resistance in coastal and marine environments — maintenance-free service life",
      "Compatible with Helifix stainless helical ties and bed joint reinforcement — consistent 316L grade across all remedial masonry products",
      "Material test certificate confirming grade 316L available on request — mandatory for coastal applications",
      "Passivated after manufacture — passive oxide layer restored after fabrication welding or grinding",
      "Technical support for engineer specification — Helifix can assist with flat bar section selection for specific shallow rebate spans",
    ],
    limitations: [
      "Engineer must specify the required flat bar section — Helifix supplies to specification; section design is the engineer&apos;s responsibility",
      "Engineer must verify deflection independently — flat bar is significantly more flexible than angle; serviceability must be checked",
      "Confirm grade 316L on material test certificate — do not substitute grade 304 for coastal applications",
      "All field welding must be passivated by the contractor — factory passivation does not cover site-welded connections",
    ],
    procurementSources: [
      { name: "Helifix Australia — national remedial masonry specialist supplier", url: "https://www.helifix.com.au" },
      { name: "Helifix technical support — flat bar section specification for shallow rebate applications", url: "https://www.helifix.com.au" },
    ],
  },
  {
    fullLabel: "State stainless fabricators",
    brandUrl: "#",
    accentColor: "#7c3aed",
    name: "State Stainless Fabricators — 316L flat bar cut-to-length",
    descriptionLine: "316L flat bar cut-to-length from state stainless steel merchants — engineer&apos;s specification — all section sizes — request material test certificate",
    productType: "Grade 316L stainless flat bar lintel — cut-to-length — engineer&apos;s specification — coastal",
    filterTags: ["Stainless-316L", "Flat-bar", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural", "Shallow-rebate"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-amber-100 text-amber-800" },
      { label: "Cut to length", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal / marine", cls: "bg-green-100 text-green-700" },
      { label: "Request MTC", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "State-based stainless steel merchants supply grade 316L flat bar cut to length from standard merchant stock to the structural engineer&apos;s specification. This route is used where a purpose-designed flat bar lintel supplier is not available or where the engineer requires a specific custom section outside the standard range. The structural engineer must provide a dimensioned drawing with section width, thickness, length, bearing details, and passivation requirements. Request a material test certificate confirming grade 316L from the merchant before accepting delivery — grade 304 is visually identical to 316L and must not be substituted for coastal applications. Confirm passivation of any welded connections is completed by the fabricator before delivery. State merchants typically carry standard flat bar in 316L grade with short lead times for cut-to-length supply.",
    technicalProperties: [
      "Full flexibility on section dimensions — any flat bar section from the stainless merchant&apos;s standard range can be specified and cut to length",
      "Grade 316L stainless — full corrosion resistance in coastal and marine environments when MTC confirms correct grade",
      "Short lead time for cut-to-length standard sections — typically 1–2 weeks from merchant stock",
      "Suitable for the full range of shallow rebate coastal opening applications — section width and thickness selected by engineer for each span",
      "Compatible with Alcore, lead, or stainless cavity flashings — fabricator can notch for cavity flashing integration if specified by engineer",
      "State-based merchants available in all major Australian cities — consistent supply for multi-building coastal remediation programmes",
    ],
    limitations: [
      "No purpose-designed bearing details or engineering documentation from the merchant — structural engineer must provide complete design drawings",
      "Material test certificate must be requested explicitly — stainless merchants will not automatically provide MTC without a specific written request",
      "Passivation of welded joints must be specified and confirmed in writing — do not assume passivation is included in the standard fabrication scope",
      "Deflection check by engineer is mandatory for all flat bar applications — flat bar sections are significantly more flexible than angle sections",
    ],
    procurementSources: [
      { name: "Atlas Steels — national stainless steel merchant, 316L flat bar stock", url: "https://www.atlassteels.com.au" },
      { name: "Stainless Steel Fittings (SSF) — national, 316L flat bar sections", url: "https://www.ssf.net.au" },
      { name: "Valbruna Stainless — specialist stainless merchant, request MTC confirming 316L", url: "https://www.valbruna.com.au" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  grade: string;
  sections: string;
  life: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Ancon Building Products",
    product: "Purpose-designed flat bar lintel",
    grade: "316L",
    sections: "75×10, 100×10 mm standard",
    life: "50+ yr coastal",
    distribution: "National",
    keyFeature: "Purpose-designed, MTC on request",
    primaryUse: "Standard shallow rebate coastal replacement",
  },
  {
    supplier: "Helifix",
    product: "Flat bar lintel — remedial range",
    grade: "316L",
    sections: "Engineer-specified",
    life: "50+ yr coastal",
    distribution: "National",
    keyFeature: "Full remedial range compatibility",
    primaryUse: "Shallow rebate — non-standard sections",
  },
  {
    supplier: "State stainless fabricators",
    product: "Cut-to-length flat bar lintel",
    grade: "316L (confirm MTC)",
    sections: "Any — from drawings",
    life: "50+ yr coastal",
    distribution: "State-based",
    keyFeature: "Custom fabrication, full flexibility",
    primaryUse: "Custom fabrication to engineer&apos;s spec",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of flat bar steel lintels in shallow rebate coastal masonry openings where the opening geometry prevents use of an angle section",
    "Coastal facade remediation where the existing opening has insufficient depth for a 75×75 angle section — flat bar maintains the original soffit line",
    "Short-span window openings in coastal buildings — typically under 2 m — where flat bar is structurally adequate and angle is not required",
    "All flat bar lintel replacements within 1 km of the coast or in C4/C5 corrosivity classification zones",
  ],
  selectionCriteria: [
    "Structural engineer must verify flat bar section capacity for each specific span and load — do not assume flat bar is adequate without engineering sign-off",
    "Specify grade 316L (not 304) — request material test certificate before accepting delivery",
    "Engineer must check deflection independently — flat bars are significantly more flexible than angle sections of the same height",
    "Confirm passivation of all welded connections before accepting delivery from the fabricator",
    "Do not use flat bar for spans over 2 m without explicit engineering confirmation of section adequacy",
    "Confirm cavity flashing compatibility — specify Alcore or lead flashings above stainless flat bar lintels in coastal environments",
  ],
  limitations: [
    "Restricted to short spans — flat bar has significantly lower section modulus than equal-height angle; engineer must confirm each span",
    "Not interchangeable with angle lintel without engineering approval — do not substitute flat bar for angle or vice versa without engineer sign-off",
    "Do not substitute grade 304 for grade 316L in coastal environments — visually identical but inadequate corrosion resistance",
    "Passivation of welded connections is mandatory — confirm passivation before accepting delivery",
    "Temporary propping of masonry above the opening is mandatory during lintel replacement",
  ],
  standardsNotes: [
    "AS 4100 — Steel Structures — primary design standard; stainless-specific design parameters apply (E = 193 GPa, 0.2% proof stress)",
    "AS 3700 — Masonry Structures — governs bearing zone design, lintel deflection limits, and cavity flashing requirements",
    "AS/NZS 1554.6 — Welding of stainless steel — specifies passivation requirements after welding",
    "ASTM A276 or EN 10088 — material specification for stainless steel flat bar; request MTC confirming grade 316L",
    "NCC Volume One — structural and durability requirements for Class 2 building facades",
  ],
  suitableDefects: [
    "Corroded flat bar steel lintels in shallow rebate coastal masonry openings — rust staining, section loss, or mortar cracking at lintel ends",
    "Flat bar lintels in coastal facades where the existing galvanised coating has failed and the section has lost structural capacity",
    "Shallow rebate openings identified during coastal facade restoration scope where flat bar replacement is confirmed by engineer",
    "Coastal building lintel replacements where the opening geometry precludes use of a deeper angle section",
  ],
  typicalSubstrates: [
    "Clay brick masonry at coastal locations — shallow rebate openings where existing flat bar lintel is being replaced in-kind",
    "Concrete masonry unit (block) walls in coastal environments with shallow rebate opening configuration",
    "All masonry substrates within 1 km of the coast or in C4/C5 corrosivity classification zones with shallow rebate opening geometry",
    "NOT suitable for spans over 2 m without explicit structural engineering confirmation",
    "NOT suitable as a substitute for angle lintels without engineering approval",
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

export function StainlessFlatBarLintelIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is a grade 316L stainless steel flat bar lintel?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A grade 316L stainless steel flat bar lintel is a rectangular section used to carry masonry load above shallow rebate openings in coastal and marine-influenced Class 2 strata building facades. The flat bar profile has a lower section modulus than an equal angle section — it is restricted to shorter spans (typically under 2 m) and must be verified by a structural engineer for each specific span and loading. It is used where the opening geometry or existing construction prevents the use of a deeper angle section.
        </p>
        {expanded && (
          <>
            <p>
              Flat bar lintels are not interchangeable with angle lintels without engineering approval — the two profiles have fundamentally different structural behaviour. The structural engineer must independently check deflection for flat bar lintels, as the serviceability limit state is often the critical design criterion for flat bar at the spans involved. Grade 316L is mandatory for coastal applications — grade 304 is visually identical but will pit-corrode in chloride-rich coastal masonry environments.
            </p>
            <p>
              All welded connections must be passivated by the fabricator after welding. Material test certificates confirming grade 316L must be requested before accepting delivery from any stainless steel supplier or fabricator.
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

export function StainlessFlatBarLintelProductSection() {
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
    { id: "Stainless-316L", label: "316L stainless" },
    { id: "Flat-bar", label: "Flat bar" },
    { id: "AS-4100", label: "AS 4100" },
    { id: "AS-3700", label: "AS 3700" },
    { id: "Coastal", label: "Coastal" },
    { id: "Marine", label: "Marine" },
    { id: "Structural", label: "Structural" },
    { id: "Shallow-rebate", label: "Shallow rebate" },
    { id: "Engineer-specified", label: "Engineer-specified" },
    { id: "Passivated", label: "Passivated" },
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
            <p className="mt-1 text-sm text-slate-500">3 suppliers — grade 316L stainless flat bar lintels — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of 316L stainless flat bar lintel suppliers. Engineer must verify span capacity and deflection for every application.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Sections</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Life</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sections}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.life}</td>
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
