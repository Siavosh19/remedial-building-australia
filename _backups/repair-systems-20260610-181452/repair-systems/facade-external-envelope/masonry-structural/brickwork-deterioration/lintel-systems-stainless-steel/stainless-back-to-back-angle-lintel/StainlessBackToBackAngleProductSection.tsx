"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Stainless-316L"
  | "Back-to-back"
  | "Angle"
  | "AS-3700"
  | "AS-4100"
  | "Coastal"
  | "Marine"
  | "Structural"
  | "Wide-opening"
  | "Engineer-specified"
  | "Passivated";

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
    name: "Ancon 316L Back-to-Back Stainless Angle — wide coastal openings",
    descriptionLine: "Ancon 316L back-to-back stainless angle for wide coastal masonry openings — garage doors, wide windows — all 316 fasteners — passivate all welds",
    productType: "Grade 316L stainless back-to-back angle lintel — wide coastal masonry openings — AS 4100",
    filterTags: ["Stainless-316L", "Back-to-back", "Angle", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural", "Wide-opening", "Engineer-specified", "Passivated"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-sky-100 text-sky-800" },
      { label: "Back-to-back angle", cls: "bg-green-100 text-green-700" },
      { label: "Wide openings", cls: "bg-slate-100 text-slate-700" },
      { label: "All 316 fasteners", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Ancon Building Products supplies grade 316L stainless back-to-back angle lintels for wide or heavily loaded masonry openings in coastal and marine environments on Class 2 strata buildings. The back-to-back angle configuration provides significantly higher section modulus than a single angle of the same height — used for garage door openings, wide window openings, and structurally loaded facade zones in coastal buildings where a single angle section cannot achieve the required span capacity. The connection between the back-to-back sections must be engineer-designed — Ancon can assist with bolt pattern and clamping force specification for the design loads. All bolts, nuts and washers must be grade 316 stainless — do not use carbon steel or grade 304 fasteners in coastal environments. All welded connections must be passivated by the fabricator before delivery. Material test certificates confirming grade 316L are available on request.",
    technicalProperties: [
      "Higher structural capacity than single angle — back-to-back configuration significantly increases the effective section modulus and span capability for wide coastal openings",
      "Grade 316L throughout — both angle sections, all bolts, nuts and washers — full corrosion resistance in coastal and marine environments",
      "Compatible with Ancon remedial masonry ties and cavity flashing systems — consistent 316L grade across all coastal facade remediation elements",
      "Material test certificate confirming grade 316L available on request — mandatory for coastal applications",
      "Passivated after manufacture — passive oxide layer restored after fabrication welding or grinding",
      "Ancon technical support for engineer specification — load tables and bolt pattern guidance for specific spans and loads",
    ],
    limitations: [
      "Engineer must design and certify the back-to-back connection — bolt size, spacing and clamping force must be specified for the design loads; do not assume standard bolt patterns",
      "All bolts, nuts and washers must be grade 316 stainless — do not use carbon steel or grade 304 fasteners in coastal environments",
      "Heaviest of the stainless lintel options — mechanical lifting assistance is typically required for upper floor replacement",
      "All field welding must be passivated by the contractor — Ancon factory passivation does not cover site-made connections",
    ],
    procurementSources: [
      { name: "Ancon Building Products — national supplier, stainless lintel range", url: "https://www.ancon.com.au" },
      { name: "Ancon technical support — back-to-back angle specification and bolt patterns", url: "https://www.ancon.com.au" },
    ],
  },
  {
    fullLabel: "Helifix",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#b45309",
    name: "Helifix 316L Stainless Back-to-Back Angle — remedial masonry sections",
    descriptionLine: "Stainless back-to-back angle sections — remedial masonry — 316L — wide coastal openings — engineered connection required",
    productType: "Grade 316L stainless back-to-back angle lintel — Helifix — wide coastal masonry openings",
    filterTags: ["Stainless-316L", "Back-to-back", "Angle", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural", "Wide-opening", "Engineer-specified"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-amber-100 text-amber-800" },
      { label: "Helifix remedial", cls: "bg-sky-100 text-sky-800" },
      { label: "Wide openings", cls: "bg-green-100 text-green-700" },
      { label: "Engineer connection", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Helifix supplies grade 316L stainless back-to-back angle lintel sections for wide coastal masonry openings as part of its specialist remedial masonry structural product range. The back-to-back configuration provides significantly higher section modulus than a single angle — used for garage door openings, wide windows, and heavily loaded coastal facade zones where single angle section capacity is insufficient. Helifix can supply back-to-back angle sections to the structural engineer&apos;s section specification. Helifix&apos;s remedial range includes compatible stainless helical ties, bed joint reinforcement, and fixings — allowing a single supplier system for the full coastal facade remediation scope. The back-to-back connection must be engineer-designed with grade 316 stainless fasteners. All welded connections must be passivated before delivery. Material test certificates confirming grade 316L are available on request.",
    technicalProperties: [
      "Engineered back-to-back angle sections for wide coastal openings — higher section modulus than single angle for the same visible height",
      "Grade 316L — full corrosion resistance in coastal and marine environments — maintenance-free service life",
      "Compatible with Helifix stainless helical ties and bed joint reinforcement — consistent 316L grade across all remedial masonry products",
      "Material test certificate confirming grade 316L available on request — mandatory for coastal applications",
      "Passivated after manufacture — passive oxide layer restored after fabrication welding or grinding",
      "Technical support for engineer specification of section sizes and connection details for wide coastal openings",
    ],
    limitations: [
      "Engineer must design and certify the back-to-back connection — bolt size, spacing and clamping force must be specified for the design loads",
      "All bolts, nuts and washers must be grade 316 stainless — specify explicitly on fabrication drawing",
      "Non-standard configurations require lead time for fabrication — confirm lead time before committing to programme",
      "All field welding must be passivated by the contractor — factory passivation does not cover site-made connections",
    ],
    procurementSources: [
      { name: "Helifix Australia — national remedial masonry specialist supplier", url: "https://www.helifix.com.au" },
      { name: "Helifix technical support — back-to-back section specification for wide coastal openings", url: "https://www.helifix.com.au" },
    ],
  },
  {
    fullLabel: "State stainless steel fabricators",
    brandUrl: "#",
    accentColor: "#7c3aed",
    name: "State Stainless Fabricators — back-to-back 316L angle with engineered connection",
    descriptionLine: "Back-to-back 316L angle lintels with engineer-designed connection — state stainless fabricators — all section sizes — request material test certificate",
    productType: "Grade 316L back-to-back angle lintel — engineered connection — fabricated to spec — coastal",
    filterTags: ["Stainless-316L", "Back-to-back", "Angle", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural", "Wide-opening", "Engineer-specified", "Passivated"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-amber-100 text-amber-800" },
      { label: "Engineered connection", cls: "bg-slate-100 text-slate-700" },
      { label: "Wide openings", cls: "bg-green-100 text-green-700" },
      { label: "Request MTC", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "State-based stainless steel fabricators supply grade 316L back-to-back angle lintels fabricated to the structural engineer&apos;s drawing — providing full flexibility on angle section size, back-to-back configuration, bolt pattern, and bearing plate details. This route is used for non-standard opening widths, complex structural loading, or projects where the engineer requires a specific fabrication configuration beyond the standard lintel supplier range. The structural engineer must provide a dimensioned fabrication drawing specifying both angle sections, back-to-back bolt pattern, clamping force, bearing plate details, and passivation requirements. All bolts, nuts and washers must be grade 316 stainless — specified explicitly on the fabrication drawing. Request a material test certificate confirming grade 316L for all components before accepting delivery — grades 304 and 316L are visually identical.",
    technicalProperties: [
      "Full flexibility on angle section size and back-to-back configuration — any engineer-specified section from the stainless merchant&apos;s standard range",
      "Fabricated to the exact bearing-to-bearing dimension for each wide opening from the engineer&apos;s drawing",
      "Material test certificate confirming grade 316L available from the stainless merchant for all components — mandatory for coastal applications",
      "State-based fabricators available in all major Australian cities — consistent supply for multi-building coastal programmes",
      "Suitable for the widest masonry opening spans in coastal environments — section size and configuration selected by engineer",
      "Compatible with Alcore, lead, or stainless cavity flashings — engineer can specify notched bearing details for cavity flashing integration",
    ],
    limitations: [
      "No purpose-designed bearing details or engineering documentation from the fabricator — structural engineer must provide complete fabrication drawings",
      "Material test certificate must be requested explicitly for all components — do not assume the fabricator will provide MTC without a specific written request",
      "Passivation of all welded joints is a separate process that must be specified and confirmed in writing — confirm before accepting delivery",
      "Heavier than single angle lintels — mechanical handling equipment is typically required for wide span back-to-back lintels",
    ],
    procurementSources: [
      { name: "Atlas Steels — national stainless merchant, 316L angle sections and fasteners", url: "https://www.atlassteels.com.au" },
      { name: "Stainless Steel Fittings (SSF) — national, 316L sections and grade 316 fasteners", url: "https://www.ssf.net.au" },
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
    product: "Back-to-back angle lintel",
    grade: "316L",
    sections: "Standard + engineer-specified",
    life: "50+ yr coastal",
    distribution: "National",
    keyFeature: "Purpose-designed, MTC on request",
    primaryUse: "Wide coastal openings — standard range",
  },
  {
    supplier: "Helifix",
    product: "Back-to-back angle — remedial range",
    grade: "316L",
    sections: "Engineer-specified",
    life: "50+ yr coastal",
    distribution: "National",
    keyFeature: "Full remedial range compatibility",
    primaryUse: "Wide coastal — non-standard sections",
  },
  {
    supplier: "State stainless fabricators",
    product: "Back-to-back angle — fabricated",
    grade: "316L (confirm MTC)",
    sections: "Any — from drawings",
    life: "50+ yr coastal",
    distribution: "State-based",
    keyFeature: "Custom fabrication, full flexibility",
    primaryUse: "Non-standard wide coastal openings",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of wide carbon steel lintels above garage door openings in coastal Class 2 strata building facades",
    "Wide window openings (over 3 m) in coastal buildings where a single 316L angle cannot achieve the required span capacity",
    "Heavily loaded masonry openings in coastal buildings where structural loading exceeds single angle section capacity",
    "All wide lintel replacements within 1 km of the coast or in C4/C5 corrosivity classification zones",
    "Coastal facade restoration programmes where wide opening lintels are replaced as part of a full lintel replacement scope",
  ],
  selectionCriteria: [
    "Structural engineer must design and certify the back-to-back angle — both section sizes and the connection details (bolt size, spacing, clamping force) must be engineer-specified",
    "Specify grade 316L for both angle sections and all fasteners — request material test certificate confirming 316L before accepting delivery",
    "Confirm all bolts, nuts and washers are grade 316 stainless — do not use carbon steel or grade 304 fasteners",
    "Confirm passivation of all welded joints before accepting delivery from the fabricator",
    "Confirm mechanical handling provisions for upper floor wide lintel replacement before ordering",
    "Consider back-to-back only when single angle section is confirmed inadequate by engineer — single angle is lighter and easier to handle",
  ],
  limitations: [
    "Engineer must design the back-to-back connection — do not assume standard bolt patterns are adequate; the connection must be designed for the specific loads",
    "All fasteners must be grade 316 stainless — do not substitute carbon steel or grade 304 in coastal environments",
    "All welding must be acid-passivated after fabrication — confirm passivation is completed before accepting delivery",
    "Heaviest of all stainless lintel options — mechanical handling is typically required for upper floor installation",
    "Temporary propping of masonry above the opening is mandatory during wide lintel replacement",
  ],
  standardsNotes: [
    "AS 4100 — Steel Structures — primary design standard; stainless-specific design parameters (E = 193 GPa, 0.2% proof stress) apply",
    "AS 3700 — Masonry Structures — governs bearing zone design, lintel deflection limits, and cavity flashing requirements",
    "AS/NZS 1554.6 — Welding of stainless steel — specifies passivation requirements after welding",
    "ASTM A276 or EN 10088 — material specification for stainless steel; request MTC confirming grade 316L for all components",
    "NCC Volume One — structural and durability requirements for Class 2 building facades; confirm C4/C5 exposure classification",
  ],
  suitableDefects: [
    "Corroded wide steel lintels above garage doors or wide windows in coastal buildings",
    "Wide carbon steel channel or back-to-back angle lintels in coastal facades with visible section loss, rust staining, or masonry cracking",
    "Wide opening lintel replacements identified in coastal buildings during salt attack remediation or full facade restoration",
    "Wide lintels with insufficient bearing length in coastal buildings — masonry cracking at lintel ends",
  ],
  typicalSubstrates: [
    "Clay brick masonry at coastal locations with wide openings — garage door or wide window openings",
    "Concrete masonry unit (block) walls in coastal environments with wide openings — confirm block compressive strength for bearing stress",
    "All masonry substrates with wide openings within 1 km of the coast or in C4/C5 corrosivity classification zones",
    "NOT suitable for inland environments where duplex coated or galvanised back-to-back angle would achieve the required service life at lower cost",
    "NOT suitable where single 316L angle section has been confirmed adequate by the structural engineer",
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

export function StainlessBackToBackLintelIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is a grade 316L stainless back-to-back angle lintel?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A grade 316L stainless steel back-to-back angle lintel consists of two equal angle sections placed back-to-back and bolted together with grade 316 stainless fasteners. The configuration provides significantly higher section modulus than a single angle of the same height — used for wide masonry openings such as garage doors, wide windows, and heavily loaded facade zones in coastal and marine-influenced Class 2 strata buildings where a single angle section cannot achieve the required span capacity.
        </p>
        {expanded && (
          <>
            <p>
              The connection between the two back-to-back sections is a structural connection that must be engineer-designed — bolt size, spacing and clamping force must be specified for the design loads. All fasteners (bolts, nuts, washers) must be grade 316 stainless — do not use carbon steel or grade 304 fasteners in coastal environments. Grade 316L is mandatory for the angle sections — grade 304 is visually identical but will pit-corrode in chloride-rich coastal masonry.
            </p>
            <p>
              All welded connections must be acid-passivated by the fabricator after welding. Material test certificates confirming grade 316L must be requested before accepting delivery. Back-to-back angle lintels are the heaviest of all stainless lintel options — mechanical lifting assistance is typically required for upper floor installation.
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

export function StainlessBackToBackLintelProductSection() {
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
    { id: "Back-to-back", label: "Back-to-back" },
    { id: "AS-4100", label: "AS 4100" },
    { id: "Coastal", label: "Coastal" },
    { id: "Marine", label: "Marine" },
    { id: "Wide-opening", label: "Wide opening" },
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
            <p className="mt-1 text-sm text-slate-500">3 suppliers — grade 316L stainless back-to-back angle lintels — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of 316L back-to-back angle lintel suppliers. Engineer must design and certify the back-to-back connection for every application.</p>
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
