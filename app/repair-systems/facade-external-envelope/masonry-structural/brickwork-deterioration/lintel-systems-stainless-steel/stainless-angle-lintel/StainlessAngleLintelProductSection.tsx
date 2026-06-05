"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Stainless-316L"
  | "Angle"
  | "AS-3700"
  | "AS-4100"
  | "Coastal"
  | "Marine"
  | "Structural"
  | "Passivated"
  | "75x75x6"
  | "Engineer-specified";

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
    name: "Ancon 316L Stainless Angle Lintel — 75×75×6 mm standard",
    descriptionLine: "Ancon 316L stainless angle lintels — purpose-designed remedial masonry lintels — 75×75×6 mm standard section — coastal and marine exposure",
    productType: "Grade 316L stainless steel angle lintel — purpose-designed remedial masonry — AS 4100",
    filterTags: ["Stainless-316L", "Angle", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural", "75x75x6"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-sky-100 text-sky-800" },
      { label: "Purpose-designed", cls: "bg-green-100 text-green-700" },
      { label: "75×75×6 standard", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal / marine", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Ancon Building Products is a specialist remedial masonry fixings and lintel supplier offering purpose-designed grade 316L stainless steel angle lintels for coastal and marine facade remediation on Class 2 strata buildings. The standard section is 75×75×6 mm equal angle in 316L — matching the most common existing corroded angle lintel dimension found on post-war Australian apartment buildings. Purpose-designed remedial lintels include engineered bearing pads and are manufactured to consistent section tolerances. Ancon lintels are typically supplied with material test certificates confirming grade 316L. The structural engineer must confirm the 75×75×6 mm standard section is adequate for the specific span and load — do not assume the standard section is sufficient for all openings.",
    technicalProperties: [
      "Purpose-designed for remedial masonry lintel replacement — consistent section tolerances, engineered bearing details, and material test certificate confirmation",
      "Grade 316L stainless — full corrosion resistance in coastal and marine environments — maintenance-free service life",
      "75×75×6 mm standard section covers the most common angle lintel replacement on post-war Australian apartment facades",
      "Compatible with Ancon remedial masonry ties and cavity flashing systems — consistent corrosion resistance across all facade elements",
      "Material test certificate confirming grade 316L provided on request — mandatory for coastal applications",
      "Passivated after manufacture — passive oxide layer restored after any fabrication welding or grinding",
    ],
    limitations: [
      "Engineer must confirm 75×75×6 mm standard section is adequate for each specific span and loading — do not assume standard section covers all openings",
      "Confirm grade 316L on material test certificate before accepting delivery — do not substitute 304 stainless in coastal environments",
      "Heavy lintel for upper floor applications — confirm mechanical handling provisions before ordering",
      "Passivation of field-welded connections is the contractor&apos;s responsibility — confirm passivation is completed before installation",
    ],
    procurementSources: [
      { name: "Ancon Building Products — national supplier, masonry and facade fixings", url: "https://www.ancon.com.au" },
      { name: "Ancon technical support — engineer-specified section sizing", url: "https://www.ancon.com.au" },
    ],
  },
  {
    fullLabel: "Helifix",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#b45309",
    name: "Helifix 316L Stainless Angle Lintel — engineered sections",
    descriptionLine: "Helifix 316L stainless angle lintels — masonry facade remediation — engineered sections for coastal and marine exposure Class 2 buildings",
    productType: "Grade 316L stainless steel angle lintel — Helifix — engineered — coastal / marine",
    filterTags: ["Stainless-316L", "Angle", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural", "Engineer-specified"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-amber-100 text-amber-800" },
      { label: "Helifix engineered", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal / marine", cls: "bg-green-100 text-green-700" },
      { label: "Passivate welds", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Helifix is a specialist remedial masonry structural product supplier offering grade 316L stainless angle lintels designed for masonry facade remediation on Class 2 strata buildings in coastal and marine environments. Helifix lintels are engineered to the structural engineer&apos;s section requirements — section sizes outside the standard 75×75×6 mm range are available to engineer&apos;s specification. Helifix&apos;s remedial masonry range includes compatible stainless helical ties, bed joint reinforcement, and fixings — allowing a single supplier system for the full coastal facade remediation scope. Material test certificates confirming grade 316L are available. All welded connections must be passivated by the fabricator before delivery.",
    technicalProperties: [
      "Engineered sections available beyond standard 75×75×6 mm — suitable for wider or more heavily loaded coastal openings where standard section is inadequate",
      "Grade 316L stainless — full corrosion resistance in coastal and marine environments — maintenance-free service life",
      "Compatible with Helifix stainless helical ties and bed joint reinforcement — consistent 316L grade across all remedial masonry products",
      "Material test certificate confirming grade 316L available on request — mandatory for coastal applications",
      "Passivated after manufacture — passive oxide layer restored after fabrication welding or grinding",
      "Technical support for engineer specification — Helifix can assist with section selection for specific spans and loads",
    ],
    limitations: [
      "Engineer must specify the required section for each opening — Helifix supplies to specification; section design is the engineer&apos;s responsibility",
      "Non-standard sections require lead time for fabrication — confirm lead time before committing to programme",
      "Confirm grade 316L on material test certificate — do not substitute grade 304 for coastal applications",
      "All field welding must be passivated by the contractor — Helifix factory passivation does not cover site-welded connections",
    ],
    procurementSources: [
      { name: "Helifix Australia — national remedial masonry specialist supplier", url: "https://www.helifix.com.au" },
      { name: "Helifix technical support — section specification and load tables", url: "https://www.helifix.com.au" },
    ],
  },
  {
    fullLabel: "State stainless steel fabricators",
    brandUrl: "#",
    accentColor: "#7c3aed",
    name: "State Stainless Fabricators — 316L angle lintel cut to engineer&apos;s spec",
    descriptionLine: "Cut-to-length 316L angle lintels fabricated to engineer&apos;s specification — state-based stainless steel merchants and fabricators — all section sizes",
    productType: "Grade 316L stainless angle lintel — cut-to-length fabricated — engineer&apos;s specification",
    filterTags: ["Stainless-316L", "Angle", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural", "Engineer-specified", "Passivated"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-violet-100 text-violet-800" },
      { label: "Cut to length", cls: "bg-slate-100 text-slate-700" },
      { label: "Any section size", cls: "bg-green-100 text-green-700" },
      { label: "Request MTC", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "State-based stainless steel merchants and specialist fabricators supply grade 316L equal angle cut to length and fabricated to the structural engineer&apos;s specification — providing full flexibility on section size, length, bearing plate details, and weld configuration. This route is used for non-standard section sizes, complex bearing details, or projects where the structural engineer requires a specific custom fabrication beyond the range of purpose-designed lintel suppliers. The structural engineer must provide a dimensioned drawing with section size, length, bearing plate dimensions, weld details, and passivation requirements. Always request a material test certificate (MTC) from the stainless steel merchant confirming grade 316L before accepting delivery — grades 304 and 316L are visually identical. Confirm passivation of all welded joints is completed by the fabricator before delivery.",
    technicalProperties: [
      "Full flexibility on section size and configuration — any equal angle section from the stainless steel merchant&apos;s standard range can be specified",
      "Cut-to-length — fabricated to the exact bearing-to-bearing dimension for each opening from the engineer&apos;s drawing",
      "Material test certificate confirming grade 316L available from the stainless steel merchant — mandatory for coastal applications",
      "State-based fabricators provide short turnaround for standard sections — typically 1–2 weeks for cut-to-length with simple bearing details",
      "Suitable for the full range of coastal and marine masonry opening spans — section size selected by engineer for each application",
      "Compatible with Alcore, lead, or stainless cavity flashings — fabricator can include notched details for cavity flashing integration if specified",
    ],
    limitations: [
      "No purpose-designed bearing details or engineering documentation from the fabricator — structural engineer must provide complete design drawings",
      "Material test certificate must be requested explicitly — fabricators will not automatically provide MTC without the contractor specifying this requirement",
      "Passivation of welded joints is a separate process that must be specified and confirmed — do not assume factory passivation unless confirmed in writing",
      "Variable quality control compared to purpose-designed lintel suppliers — inspect every lintel on delivery for dimensional conformance and weld quality",
    ],
    procurementSources: [
      { name: "Atlas Steels — national stainless steel merchant, 316L angle sections", url: "https://www.atlassteels.com.au" },
      { name: "Stainless Steel Fittings (SSF) — national, 316L sections and fasteners", url: "https://www.ssf.net.au" },
      { name: "Valbruna Stainless — specialist stainless merchant, request MTC", url: "https://www.valbruna.com.au" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  grade: string;
  section: string;
  coastal: string;
  mtc: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Ancon Building Products",
    product: "Purpose-designed angle lintel",
    grade: "316L",
    section: "75×75×6 mm standard",
    coastal: "Yes",
    mtc: "On request",
    primaryUse: "Standard coastal remedial replacement",
  },
  {
    supplier: "Helifix",
    product: "Engineered angle lintel",
    grade: "316L",
    section: "Engineer-specified",
    coastal: "Yes",
    mtc: "On request",
    primaryUse: "Non-standard coastal openings",
  },
  {
    supplier: "State stainless fabricators",
    product: "Cut-to-length angle lintel",
    grade: "316L (confirm MTC)",
    section: "Any — from drawings",
    coastal: "Yes",
    mtc: "Request explicitly",
    primaryUse: "Custom fabrication to engineer&apos;s spec",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded steel angle lintels above window and door openings in coastal or marine-influenced Class 2 strata building facades",
    "New lintel installation at coastal buildings where galvanised or duplex coated steel would not achieve the required service life",
    "Standard 75×75×6 mm angle lintel replacement in post-war apartment building facades — the most common coastal remedial lintel replacement",
    "All lintel replacements within 1 km of the coast or in C4/C5 corrosivity classification zones",
    "Coastal facade restoration scope where all lintel types are replaced in a single programme",
  ],
  selectionCriteria: [
    "Specify grade 316L (not 304) — request material test certificate from the supplier before accepting delivery; the two grades are visually identical",
    "Structural engineer must design and certify all lintel replacements using stainless-specific design parameters — lower elastic modulus and 0.2% proof stress in lieu of yield stress",
    "Confirm passivation of all welded joints before accepting delivery from the fabricator",
    "Confirm cavity flashing compatibility — specify Alcore composite or lead flashings above stainless lintels in coastal environments",
    "Confirm mechanical handling provisions for upper floor lintel replacement before ordering",
    "Request purpose-designed lintels (Ancon, Helifix) for standard openings — custom fabrication for non-standard sections only",
  ],
  limitations: [
    "Do not substitute grade 304 for grade 316L — 304 is not adequate in coastal environments and will pit-corrode in chloride-rich masonry",
    "All welding must be acid-passivated by the fabricator after welding and grinding — confirm this before accepting delivery",
    "Do not install without a structural engineer&apos;s signed design using stainless-specific parameters to AS 4100",
    "Avoid bare aluminium flashings in direct contact with stainless lintels in coastal environments — specify Alcore composite or lead flashings",
    "Temporary propping of masonry above the opening is mandatory during lintel replacement",
  ],
  standardsNotes: [
    "AS 4100 — Steel Structures — primary design standard; stainless-specific design parameters (E = 193 GPa, 0.2% proof stress) must be applied",
    "AS 3700 — Masonry Structures — governs bearing zone design, lintel deflection limits, and cavity flashing requirements",
    "AS/NZS 1554.6 — Welding of stainless steel — specifies passivation requirements after welding",
    "ASTM A276 or EN 10088 — material specification for stainless steel bar and section; request MTC confirming grade 316L",
    "NCC Volume One — structural and durability requirements for Class 2 building facades; confirm C4/C5 exposure classification for the site",
  ],
  suitableDefects: [
    "Corroded steel angle lintels in coastal buildings — galvanised or duplex coated lintels with visible red rust, section loss, or mortar cracking",
    "Failed carbon steel lintels at coastal locations where repeated lintel failure confirms galvanised systems cannot achieve the required service life",
    "Lintels with insufficient bearing length in coastal buildings — masonry cracking at lintel ends indicates the bearing zone is overstressed",
    "Bowing or deflecting lintels in coastal facade restoration works",
    "Lintel replacements identified during salt attack remediation or full facade restoration scope",
  ],
  typicalSubstrates: [
    "Modern clay brick masonry at coastal locations — confirm bearing zone is in sound condition and corrosion of the old lintel has not damaged the bearing masonry",
    "Concrete masonry unit (block) walls in coastal environments — confirm block compressive strength for bearing stress",
    "Calcium silicate brick masonry at coastal locations — confirm bearing zone condition with engineer",
    "All masonry substrates within 1 km of the coast or in areas confirmed as C4/C5 corrosivity classification",
    "NOT suitable for inland environments where galvanised or duplex coated steel would achieve the required service life at lower cost",
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

export function StainlessAngleLintelIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is a grade 316L stainless steel angle lintel?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A grade 316L stainless steel angle lintel is an equal angle section used to carry the load of masonry above window, door, and opening in coastal or marine-influenced Class 2 strata building facades. Grade 316L (low carbon, with molybdenum addition) provides full corrosion resistance in chloride-rich coastal environments where galvanised and duplex coated steel lintels will corrode and fail within an unacceptable service period. The standard section for Australian post-war apartment building facades is 75×75×6 mm equal angle.
        </p>
        {expanded && (
          <>
            <p>
              The critical rule is to confirm grade 316L with the supplier — grade 304 is visually identical to 316L but contains no molybdenum and will pit-corrode in coastal masonry environments. Always request a material test certificate confirming grade 316L before accepting delivery. The structural engineer must design the lintel using stainless-specific parameters: the elastic modulus of stainless steel (E = 193 GPa) is approximately 3.5% lower than carbon steel, and there is no distinct yield point — the 0.2% proof stress is used in lieu of yield stress in the design.
            </p>
            <p>
              Welding destroys the passive chromium oxide layer in the heat-affected zone. All welded connections must be acid-passivated by the fabricator after fabrication and before delivery. Cavity flashings above stainless lintels in coastal environments should be Alcore composite or lead — not bare aluminium, which can form a galvanic cell in the presence of seawater chlorides.
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

export function StainlessAngleLintelProductSection() {
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
    { id: "Angle", label: "Angle" },
    { id: "AS-4100", label: "AS 4100" },
    { id: "AS-3700", label: "AS 3700" },
    { id: "Coastal", label: "Coastal" },
    { id: "Marine", label: "Marine" },
    { id: "Structural", label: "Structural" },
    { id: "75x75x6", label: "75×75×6 mm" },
    { id: "Engineer-specified", label: "Engineer-specified" },
  ];

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
            <h2 className="text-2xl font-extrabold text-sky-950">Supplier Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 suppliers — grade 316L stainless angle lintels — scroll to view all</p>
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

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Supplier Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of 316L stainless angle lintel suppliers. Confirm all selections against the structural engineer&apos;s design and request material test certificates before accepting delivery.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Section</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">MTC</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.section}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.mtc}</td>
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
