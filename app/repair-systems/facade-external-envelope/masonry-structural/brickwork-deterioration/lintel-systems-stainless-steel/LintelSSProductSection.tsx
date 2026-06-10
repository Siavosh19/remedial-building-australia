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
  | "Flat-bar"
  | "Back-to-back"
  | "AS-3700"
  | "AS-4100"
  | "Coastal"
  | "Marine"
  | "Structural"
  | "Passivated";

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
    fullLabel: "Stainless steel merchant / specialist lintel fabricator",
    brandUrl: "https://www.atlassteels.com.au",
    accentColor: "#b45309",
    name: "Grade 316L stainless steel angle lintel — 75×75×6 mm or engineer-specified",
    descriptionLine: "316L stainless equal angle lintel — coastal and marine environments — maintenance-free service life — engineer-specified section — passivate all welded joints",
    productType: "Grade 316L stainless steel angle lintel — AS 4100 structural masonry — coastal",
    filterTags: ["Stainless-316L", "Angle", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-amber-100 text-amber-800" },
      { label: "Coastal / marine", cls: "bg-sky-100 text-sky-800" },
      { label: "Maintenance-free", cls: "bg-green-100 text-green-700" },
      { label: "Passivate welds", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Grade 316L stainless steel equal angle lintel for masonry opening support on Class 2 strata buildings in coastal, marine-influenced or high-corrosivity environments. Grade 316L (low carbon) provides superior corrosion resistance to grade 304 and is the minimum acceptable grade for coastal and marine exposure masonry lintel applications — 304 stainless is not suitable and must not be substituted. Section size must be designed by a structural engineer per AS 4100 with stainless-specific design properties (lower elastic modulus E = 193 GPa; 0.2% proof stress used in lieu of yield stress). Engineer must also confirm passivation requirements after any welding — welding destroys the passive oxide layer in the heat-affected zone. Request material test certificate confirming grade 316L before accepting delivery.",
    technicalProperties: [
      "Full corrosion resistance in coastal and marine environments — grade 316L is the standard for coastal masonry lintel applications in Australia",
      "Maintenance-free service life — does not require painting, re-galvanising, or coating maintenance over the building design life",
      "High structural capacity — stainless steel angle sections achieve similar span and load capacity to carbon steel sections of the same nominal dimensions",
      "Compatible with stainless or Alcore cavity flashings above — avoids bimetallic corrosion risk at the lintel-to-flashing interface",
      "Grade 316L low-carbon content reduces sensitisation risk during welding compared to standard 316",
      "Standard equal angle sections available from stainless steel merchants — engineer selects from standard range",
    ],
    limitations: [
      "Confirm 316L grade — do not accept 304 stainless; grade 304 is not adequate in coastal environments and the two grades are visually identical",
      "Stainless steel has lower elastic modulus than carbon steel — deflection under load approximately 3.5% greater for the same section size; engineer must check deflection separately",
      "Heavier than aluminium lintels of the same section size — mechanical handling assistance may be required for long spans on upper floors",
      "All welding must be passivated — welding destroys the passive oxide layer in the heat-affected zone; weld area must be acid-passivated after fabrication",
    ],
    procurementSources: [
      { name: "Atlas Steels — national stainless steel merchant", url: "https://www.atlassteels.com.au" },
      { name: "Stainless Steel Fittings (SSF) — national", url: "https://www.ssf.net.au" },
      { name: "Valbruna Stainless — specialist stainless merchant", url: "https://www.valbruna.com.au" },
      { name: "Specialist lintel fabricators — fabricate to engineer's drawings, request material test cert", url: "https://www.atlassteels.com.au" },
    ],
  },
  {
    fullLabel: "Stainless steel merchant / specialist lintel fabricator",
    brandUrl: "https://www.atlassteels.com.au",
    accentColor: "#0369a1",
    name: "Grade 316L stainless steel flat bar lintel — shallow rebate",
    descriptionLine: "316L stainless flat bar lintel — shallow rebate coastal openings — restricted to spans under 2 m — engineer-specified section — passivate all welded joints",
    productType: "Grade 316L stainless flat bar lintel — shallow rebate coastal masonry — AS 4100",
    filterTags: ["Stainless-316L", "Flat-bar", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal / marine", cls: "bg-green-100 text-green-700" },
      { label: "Shallow rebate", cls: "bg-slate-100 text-slate-700" },
      { label: "Short spans <2 m", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Grade 316L stainless steel flat bar lintel for shallow rebate masonry openings in coastal and marine environments. Restricted to shorter spans (typically under 2 m) due to the lower section modulus of the flat bar profile — engineer must confirm the span capacity is within the deflection and bending limits before specifying. Suitable where an angle section would project below the soffit line. Grade 316L is mandatory for coastal applications — do not accept grade 304. Compatible with stainless or Alcore cavity flashings above the lintel. All welded connections must be passivated after fabrication. Request material test certificate confirming grade 316L from the supplier before accepting delivery.",
    technicalProperties: [
      "Minimum profile — fits within shallow rebate openings in coastal buildings where a full angle section cannot be accommodated",
      "Full corrosion resistance in coastal and marine environments — grade 316L provides maintenance-free service in the building design life",
      "Lighter than angle lintels of similar width — easier manual handling on upper floors in coastal buildings",
      "Compatible with stainless or Alcore cavity flashings above — confirms bimetallic compatibility at the lintel-flashing interface",
      "Standard flat bar stock available from stainless steel merchants — short lead time for standard sizes",
      "Same 316L grade specification as angle lintels — consistent with all-stainless coastal facade remediation scope",
    ],
    limitations: [
      "Restricted to short spans — flat bar has significantly lower section modulus than equal-height angle; engineer must confirm span is within bending and deflection limits",
      "Confirm 316L grade — same grade verification requirement as angle lintels; do not accept 304 stainless from the supplier",
      "Higher cost than galvanised flat bar — only specify stainless in coastal locations where galvanised cannot achieve the required service life",
      "Fabrication welding must be passivated — confirm passivation has been completed before accepting delivery",
    ],
    procurementSources: [
      { name: "Atlas Steels — national stainless steel merchant", url: "https://www.atlassteels.com.au" },
      { name: "Stainless Steel Fittings (SSF) — national", url: "https://www.ssf.net.au" },
      { name: "Valbruna Stainless — specialist stainless merchant", url: "https://www.valbruna.com.au" },
      { name: "Specialist stainless fabricators — request material test cert confirming grade 316L", url: "https://www.atlassteels.com.au" },
    ],
  },
  {
    fullLabel: "Stainless steel fabricator / specialist lintel supplier",
    brandUrl: "https://www.atlassteels.com.au",
    accentColor: "#7c3aed",
    name: "Grade 316L stainless steel back-to-back angle lintel — wide opening",
    descriptionLine: "316L stainless back-to-back angle lintel — wide or heavily loaded coastal openings — all-316 fasteners — passivate all welds — engineer-specified section",
    productType: "Grade 316L stainless back-to-back angle lintel — coastal wide masonry openings",
    filterTags: ["Stainless-316L", "Back-to-back", "Angle", "AS-3700", "AS-4100", "Coastal", "Marine", "Structural", "Passivated"],
    techChips: [
      { label: "Grade 316L SS", cls: "bg-purple-100 text-purple-800" },
      { label: "Coastal / marine", cls: "bg-sky-100 text-sky-800" },
      { label: "Back-to-back angle", cls: "bg-green-100 text-green-700" },
      { label: "All 316 fasteners", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Grade 316L stainless steel back-to-back equal angle lintel for wide or heavily loaded masonry openings in coastal and marine environments. Back-to-back angle sections bolted together with grade 316 stainless bolts provide significantly higher section modulus than a single angle of the same height — used for garage door openings, wide window openings or structurally loaded facade zones in coastal buildings where a single angle section cannot achieve the required capacity. All bolts and washers must be grade 316 stainless — do not use carbon steel fasteners. All welded connections must be passivated by the fabricator before delivery. Request material test certificate confirming grade 316L for all components before accepting delivery.",
    technicalProperties: [
      "Higher structural capacity than single angle — back-to-back configuration significantly increases the effective section modulus and span capability",
      "Full corrosion resistance — grade 316L stainless throughout including bolts, washers, and weld areas (passivated)",
      "Back-to-back sections configured from standard equal angle stock — engineer specifies bolt pattern and clamping force for the design loads",
      "Suitable for the longest masonry opening spans in coastal environments — replaces carbon steel channel lintels in marine-influenced zones",
      "All-stainless fastener specification (316 bolts, nuts, washers) eliminates corrosion ingress at bolt holes",
      "Passivation after welding restores the passive oxide layer in heat-affected zones before installation in coastal environment",
    ],
    limitations: [
      "Heaviest of the stainless lintel options — mechanical lifting assistance is typically required for back-to-back angle lintels on upper floors",
      "Connection between back-to-back sections must be engineer-designed — bolt size, spacing and clamping force must be specified for the design loads",
      "All bolts, nuts and washers must be grade 316 stainless — do not use carbon steel or grade 304 fasteners in coastal environments",
      "Passivation after welding is mandatory — all heat-affected zones must be acid-passivated to restore the passive oxide layer before installation",
    ],
    procurementSources: [
      { name: "Atlas Steels — national stainless steel merchant, standard EA sections", url: "https://www.atlassteels.com.au" },
      { name: "Stainless Steel Fittings (SSF) — national, 316 fasteners", url: "https://www.ssf.net.au" },
      { name: "Specialist stainless fabricators — fabricate back-to-back to engineer's drawings", url: "https://www.atlassteels.com.au" },
      { name: "Valbruna Stainless — specialist stainless merchant, request material test cert", url: "https://www.valbruna.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Stainless-316L", label: "316L stainless" },
  { id: "Angle", label: "Angle" },
  { id: "Flat-bar", label: "Flat bar" },
  { id: "Back-to-back", label: "Back-to-back" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "AS-4100", label: "AS 4100" },
  { id: "Coastal", label: "Coastal" },
  { id: "Marine", label: "Marine" },
  { id: "Structural", label: "Structural" },
  { id: "Passivated", label: "Passivated" },
];

const SYSTEM_COMPARISON: {
  product: string;
  profile: string;
  grade: string;
  coastal: string;
  span: string;
  passivation: string;
  primaryUse: string;
}[] = [
  {
    product: "316L angle lintel",
    profile: "Equal angle",
    grade: "316L",
    coastal: "Yes",
    span: "Up to 5 m (engineer to confirm)",
    passivation: "Welded joints — mandatory",
    primaryUse: "Standard coastal masonry opening",
  },
  {
    product: "316L flat bar lintel",
    profile: "Flat bar",
    grade: "316L",
    coastal: "Yes",
    span: "Up to 2 m (engineer to confirm)",
    passivation: "Welded joints — mandatory",
    primaryUse: "Shallow rebate coastal opening",
  },
  {
    product: "316L back-to-back angle",
    profile: "Back-to-back angle",
    grade: "316L",
    coastal: "Yes",
    span: "Up to 7 m+ (engineer to confirm)",
    passivation: "All welds — mandatory",
    primaryUse: "Wide or heavily loaded coastal opening",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded steel angle lintels above window and door openings in coastal or marine-influenced Class 2 strata building facades",
    "New lintel installation at coastal buildings where galvanised or duplex coated steel would not achieve the required service life",
    "Wide garage door or wide window openings in coastal buildings — back-to-back angle configuration for high span capacity",
    "Shallow rebate openings in coastal buildings where flat bar profile is required to fit within the available structural depth",
    "All lintel replacements within 1 km of the coast or in C4/C5 corrosivity classification zones",
  ],
  selectionCriteria: [
    "Specify grade 316L (not 304) — request material test certificate from the supplier before accepting delivery; the two grades are visually identical",
    "Structural engineer must design and certify all lintel replacements using stainless-specific design parameters — lower elastic modulus and 0.2% proof stress in lieu of yield stress",
    "Select angle, flat bar, or back-to-back based on available structural depth and required span — flat bar restricted to spans under 2 m",
    "All fasteners (bolts, nuts, washers) must be grade 316 stainless — do not use carbon steel or grade 304 fasteners",
    "Confirm passivation of all welded joints before accepting delivery from the fabricator",
    "Confirm cavity flashing compatibility — specify Alcore composite or lead flashings, not bare aluminium in direct contact with stainless in coastal environments",
  ],
  limitations: [
    "Do not substitute grade 304 for grade 316L — 304 is not adequate in coastal environments and will pit-corrode in chloride-rich masonry",
    "All welding must be acid-passivated by the fabricator after welding and grinding — confirm this before accepting delivery",
    "Do not install without a structural engineer's signed design using stainless-specific parameters",
    "Avoid bare aluminium flashings in direct contact with stainless lintels in coastal environments — specify Alcore composite or lead flashings to prevent bimetallic corrosion",
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
    "Lintel replacements identified in coastal buildings during salt attack remediation or full facade restoration scope",
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

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x";
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
            >
              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                >
                  {src.name}
                  <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
    </div>
  );
}

function CollapsibleCardDetails({
  text,
  chips,
}: {
  text: string;
  chips: { label: string; cls: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

function TechCard({
  icon,
  title,
  items,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {icon}
        </div>
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

export function LintelSSIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are grade 316L stainless steel lintel systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Grade 316L stainless steel lintel systems are the specified standard for masonry opening remediation in coastal and marine-influenced environments on Australian Class 2 strata buildings. Grade 316L (low carbon, with molybdenum addition) provides full corrosion resistance in chloride-rich environments where galvanised and duplex coated steel lintels will fail within an unacceptable service period. The &quot;L&quot; designation indicates low carbon content, which reduces sensitisation risk during welding.
        </p>
        {expanded && (
          <>
            <p>
              The critical rule is to confirm grade 316L with the supplier — grade 304 is visually identical to 316L but contains no molybdenum and will pit-corrode in coastal environments where 316L performs acceptably. Always request a material test certificate confirming grade 316L before accepting delivery. Stainless steel has a lower elastic modulus (E = 193 GPa vs 200 GPa for carbon steel) and no distinct yield point — the structural engineer must use stainless-specific design parameters and check deflection separately using the 0.2% proof stress.
            </p>
            <p>
              Welding destroys the passive chromium oxide layer in the heat-affected zone, temporarily making the weld area susceptible to crevice and pitting corrosion. In coastal masonry environments where chlorides are present, the heat-affected zone must be acid-passivated after welding and after any post-weld grinding before the lintel is installed. Cavity flashings above stainless lintels in coastal environments should be Alcore composite or lead — bare aluminium in direct contact with stainless steel can form a galvanic cell in the presence of seawater chlorides.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function LintelSSProductSection() {
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
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable substrates
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (
              <>Hide detail <ChevronUp size={14} /></>
            ) : (
              <>Show detail <ChevronDown size={14} /></>
            )}
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — grade 316L stainless steel lintels — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active
                    ? "border-sky-950 bg-sky-950 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div
              key={product.name}
              className="flex-none"
              style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
            >
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}
              >
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a
                          href={product.tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a
                        href={product.brandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      >
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips}
                  />
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

                {/* Technical Properties & Limitations */}
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

                {/* Procurement Sources */}
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of grade 316L stainless steel lintel systems. Confirm all selections against the structural engineer&apos;s design and request material test certificates before accepting delivery.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Typical span</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Passivation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.span}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.passivation}</td>
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
