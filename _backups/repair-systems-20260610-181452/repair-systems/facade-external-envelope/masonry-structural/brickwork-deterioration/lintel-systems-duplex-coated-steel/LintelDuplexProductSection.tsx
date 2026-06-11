"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Duplex-coated"
  | "Galvanised"
  | "Paint-overcoat"
  | "Steel-angle"
  | "Flat-bar"
  | "AS-3700"
  | "AS-4100"
  | "Inland"
  | "Moderate-exposure"
  | "Structural";

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
    fullLabel: "Structural steel fabricator / masonry lintel supplier",
    brandUrl: "https://www.lysaght.com.au",
    accentColor: "#b45309",
    name: "Duplex coated steel angle lintel — hot-dip galvanised + epoxy paint",
    descriptionLine: "HDG steel angle lintel with two-coat epoxy paint overcoat — 40–50 year inland service life — AS 4100 engineer-specified section — not coastal",
    productType: "Duplex coated steel angle lintel — HDG + epoxy paint — AS 4100 structural masonry",
    filterTags: ["Duplex-coated", "Galvanised", "Paint-overcoat", "Steel-angle", "AS-3700", "AS-4100", "Inland", "Moderate-exposure", "Structural"],
    techChips: [
      { label: "HDG + epoxy overcoat", cls: "bg-amber-100 text-amber-800" },
      { label: "40–50 yr inland life", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4100 design", cls: "bg-stone-100 text-stone-700" },
      { label: "Not coastal", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Hot-dip galvanised steel angle lintel with a two-coat epoxy paint overcoat for masonry opening support on Class 2 strata building facades. The duplex system (hot-dip galvanising to AS/NZS 4680 plus epoxy paint overcoat) provides substantially longer service life than galvanising alone — the paint overcoat protects the zinc coating from carbonation and abrasion, extending the design life to 40–50 years in inland or sheltered environments. Section size, bearing length and span must be engineer-specified per AS 4100 and AS 3700. Not suitable for coastal or marine-influenced environments — specify 316L stainless steel lintels in those locations. Cut ends and drilled holes made after coating must be treated immediately with cold galvanised zinc-rich paint before installation. Cavity flashing must be installed above the lintel top flange before re-laying brickwork.",
    technicalProperties: [
      "Hot-dip galvanising to AS/NZS 4680 — minimum zinc coating mass 600 g/m² for standard structural sections",
      "Epoxy paint overcoat extends service life to 40–50 years in inland and sheltered environments — significantly longer than galvanising alone",
      "Standard structural steel equal angle and unequal angle sections available — engineer selects from standard AS/NZS range",
      "Fabricated to any length — unlike precast concrete, steel angle lintels can be cut and fabricated to the exact opening dimension",
      "Higher section capacity than flat bar at equivalent height — angle lintels achieve longer spans at shallower beam depths",
      "Compatible with standard masonry cavity flashing details above the lintel top flange",
    ],
    limitations: [
      "Not suitable for coastal or marine-influenced environments — duplex coating not adequate in C4 or C5 corrosivity classifications; specify stainless steel",
      "Cut ends and drilled holes must be treated with cold galvanised zinc-rich paint before installation — bare steel at cut edges corrodes preferentially",
      "Structural engineer specification mandatory — span, section size, bearing length and connection details must be designed and certified per AS 4100 and AS 3700",
      "Cavity flashing must be installed above the lintel before re-laying brickwork — confirm flashing type and lap with engineer",
    ],
    procurementSources: [
      { name: "Lysaght / BlueScope Steel — national structural merchant", url: "https://www.lysaght.com.au" },
      { name: "InfraBuild (OneSteel / Arrium) — national steel merchant", url: "https://www.infrabuild.com" },
      { name: "Masonry lintel suppliers — state-based fabricators", url: "https://www.australiansteel.com.au" },
      { name: "Structural steel fabricators — nationwide, fabricate to engineer's drawings", url: "https://www.infrabuild.com" },
    ],
  },
  {
    fullLabel: "Structural steel fabricator / masonry lintel supplier",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#0369a1",
    name: "Duplex coated steel flat bar lintel — galvanised + polyurethane",
    descriptionLine: "HDG flat bar lintel with polyurethane paint overcoat — shallow rebate masonry openings — spans typically under 2 m — engineer-specified section — not coastal",
    productType: "Duplex coated steel flat bar lintel — HDG + PU paint — shallow rebate masonry",
    filterTags: ["Duplex-coated", "Galvanised", "Paint-overcoat", "Flat-bar", "AS-3700", "AS-4100", "Inland", "Structural"],
    techChips: [
      { label: "HDG + PU overcoat", cls: "bg-sky-100 text-sky-800" },
      { label: "Shallow rebate", cls: "bg-green-100 text-green-700" },
      { label: "Short spans <2 m", cls: "bg-slate-100 text-slate-700" },
      { label: "Not coastal", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Hot-dip galvanised steel flat bar lintel with a polyurethane paint overcoat for shallow-rebate masonry openings where a conventional angle profile cannot be accommodated within the available structural depth. Flat bar lintels sit within the masonry rebate at the soffit of an opening with minimal projection — used where the structural depth is very limited and the span is short (typically under 2 m). Section size must be designed by a structural engineer — do not substitute a flat bar for an angle lintel without engineering approval as the structural behaviour differs significantly. The polyurethane overcoat over hot-dip galvanising provides a duplex system with extended inland service life over galvanising alone. Cut ends must be treated with cold galvanised zinc-rich paint before installation.",
    technicalProperties: [
      "Minimum profile depth — suitable for very shallow rebate openings where a full angle section would project below the soffit line",
      "Duplex coating (HDG + PU) provides extended service life in sheltered and inland environments beyond galvanising alone",
      "Fabricated to exact opening width — no site cutting required when lengths are confirmed before ordering",
      "Lighter than angle lintels of the same span — easier to handle on upper floors without mechanical lifting",
      "Hot-dip galvanising to AS/NZS 4680 forms the corrosion-resistant base coat under the PU topcoat",
      "Engineer must check deflection separately to bending capacity — narrow flat bar sections can deflect significantly",
    ],
    limitations: [
      "Lower section modulus than angle of same depth — flat bar lintels restricted to shorter spans than angle lintels; confirm span capacity with engineer before specifying",
      "Not suitable for coastal or marine-influenced environments — duplex coating not adequate in high-corrosivity coastal zones",
      "Cut ends must be treated with cold galvanised zinc-rich paint — bare steel at cut ends corrodes preferentially over the galvanised surface",
      "Deflection must be within AS 3700 limits for the supported masonry — check deflection as well as bending capacity in the structural design",
    ],
    procurementSources: [
      { name: "InfraBuild (OneSteel) — national steel merchant", url: "https://www.infrabuild.com" },
      { name: "Masonry lintel suppliers — state-based fabricators", url: "https://www.australiansteel.com.au" },
      { name: "Lysaght / BlueScope Steel — national structural merchant", url: "https://www.lysaght.com.au" },
      { name: "Structural steel fabricators — fabricate to engineer's drawings", url: "https://www.infrabuild.com" },
    ],
  },
  {
    fullLabel: "Structural steel fabricator / masonry lintel supplier",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#7c3aed",
    name: "Duplex coated steel channel lintel — galvanised + epoxy",
    descriptionLine: "HDG PFC channel lintel with epoxy paint overcoat — wide or heavily loaded masonry openings — higher section modulus than angle — engineer-specified — not coastal",
    productType: "Duplex coated steel channel lintel — HDG + epoxy paint — wide masonry openings",
    filterTags: ["Duplex-coated", "Galvanised", "Paint-overcoat", "AS-3700", "AS-4100", "Inland", "Moderate-exposure", "Structural"],
    techChips: [
      { label: "HDG + epoxy overcoat", cls: "bg-purple-100 text-purple-800" },
      { label: "PFC channel section", cls: "bg-slate-100 text-slate-700" },
      { label: "Wide openings", cls: "bg-green-100 text-green-700" },
      { label: "Not coastal", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Hot-dip galvanised structural steel channel (PFC) section lintel with epoxy paint overcoat for wider or structurally loaded masonry openings on Class 2 strata building facades. Channel sections have higher section modulus than angle lintels of similar overall height, allowing longer spans or higher loads at the same beam depth. Typically used as a back-to-back pair or single channel for double brick leaf openings or long spans — section size and configuration must be engineer-specified per AS 4100. Not suitable for coastal environments. Back-to-back PFC sections require an engineered connection detail between sections — do not use back-to-back without a structural engineer specifying the connection. Cavity flashing must be profiled to fit the channel section top flange.",
    technicalProperties: [
      "Higher section modulus than equal-height angle lintel — achieves longer spans or carries higher masonry loads at the same depth",
      "Standard PFC sections available from steel merchants — engineer can specify from standard range without custom fabrication",
      "Duplex coating (HDG + epoxy) extends service life beyond galvanising alone in inland and sheltered environments",
      "Compatible with standard masonry bearing details — can be designed to bear on the outer brick leaf, inner leaf, or both",
      "Hot-dip galvanising to AS/NZS 4680 as the base corrosion protection under the epoxy overcoat",
      "Back-to-back configuration significantly increases effective section modulus for very wide openings",
    ],
    limitations: [
      "Heavier and more complex to handle than angle lintels — may require mechanical assistance for installation on upper floors",
      "Not suitable for coastal or marine-influenced environments — duplex coated steel is not adequate in high-corrosivity coastal zones",
      "Back-to-back PFC sections require engineering design for the connection between sections — do not use back-to-back without a structural engineer designing the connection detail",
      "Cavity flashing must be fitted to the top flange profile — confirm flashing profile with engineer before installation",
    ],
    procurementSources: [
      { name: "InfraBuild (OneSteel) — national steel merchant, standard PFC stock", url: "https://www.infrabuild.com" },
      { name: "Lysaght / BlueScope Steel — national structural merchant", url: "https://www.lysaght.com.au" },
      { name: "Structural steel fabricators — fabricate back-to-back to engineer's drawings", url: "https://www.infrabuild.com" },
      { name: "Masonry lintel suppliers — state-based, supply cut-to-length lintels", url: "https://www.australiansteel.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Duplex-coated", label: "Duplex coated" },
  { id: "Galvanised", label: "Galvanised" },
  { id: "Paint-overcoat", label: "Paint overcoat" },
  { id: "Steel-angle", label: "Steel angle" },
  { id: "Flat-bar", label: "Flat bar" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "AS-4100", label: "AS 4100" },
  { id: "Inland", label: "Inland" },
  { id: "Moderate-exposure", label: "Moderate exposure" },
  { id: "Structural", label: "Structural" },
];

const SYSTEM_COMPARISON: {
  product: string;
  profile: string;
  coating: string;
  coastal: string;
  span: string;
  engineer: string;
  primaryUse: string;
}[] = [
  {
    product: "Angle lintel — duplex",
    profile: "Equal / unequal angle",
    coating: "HDG AS/NZS 4680 + epoxy paint",
    coastal: "No",
    span: "Up to 4 m (engineer to confirm)",
    engineer: "Yes — mandatory",
    primaryUse: "Standard masonry opening — inland / sheltered",
  },
  {
    product: "Flat bar lintel — duplex",
    profile: "Flat bar",
    coating: "HDG AS/NZS 4680 + PU paint",
    coastal: "No",
    span: "Up to 2 m (engineer to confirm)",
    engineer: "Yes — mandatory",
    primaryUse: "Shallow rebate opening where angle cannot fit",
  },
  {
    product: "Channel lintel — duplex",
    profile: "PFC channel",
    coating: "HDG AS/NZS 4680 + epoxy paint",
    coastal: "No",
    span: "Up to 6 m+ (engineer to confirm)",
    engineer: "Yes — mandatory",
    primaryUse: "Wide or heavily loaded masonry opening",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded or failed steel angle lintels above window and door openings in inland Class 2 strata building facades",
    "New lintel installation where existing masonry bears directly on the brick course with no structural lintel beneath",
    "Lintel replacement at garage door openings and wide window openings in sheltered or inland environments",
    "Shallow rebate openings where flat bar lintels replace failed timber or corroded steel in low-span conditions",
    "Structurally loaded wide openings where a channel section is required to achieve the span at the available depth",
  ],
  selectionCriteria: [
    "Confirm the exposure classification — duplex coated lintels are suitable for inland and sheltered environments only; specify 316L stainless for coastal locations",
    "Structural engineer must design and certify all lintel replacements — section size, bearing length, span, and connection details per AS 4100 and AS 3700",
    "Select angle, flat bar, or channel based on available structural depth at the opening and the required span — confirm with engineer before ordering",
    "Flat bar lintels are restricted to short spans (typically under 2 m) due to low section modulus — confirm span capacity with engineer",
    "For long spans or heavily loaded openings, specify channel section rather than angle — engineer to confirm section size",
    "Ensure cavity flashing type is confirmed before ordering lintel — flashing profile must suit the lintel top flange geometry",
  ],
  limitations: [
    "Not suitable for coastal or marine-influenced environments (C4/C5 corrosivity) — specify 316L stainless steel",
    "Cut ends and drilled holes made after duplex coating must be treated with cold galvanised zinc-rich paint before installation",
    "Do not install without a structural engineer's signed design — lintel replacements are structural work",
    "Temporary propping of masonry above the opening is mandatory during lintel replacement — confirm propping design with engineer or temporary works engineer",
    "Do not re-lay brickwork above a new lintel without confirming the cavity flashing is correctly installed and sealed",
  ],
  standardsNotes: [
    "AS 4100 — Steel Structures — primary Australian standard for structural steel design; stainless-specific design parameters differ",
    "AS 3700 — Masonry Structures — governs bearing zone design, lintel deflection limits, and cavity flashing requirements",
    "AS/NZS 4680 — Hot-dip galvanised coatings — minimum zinc coating mass for structural sections",
    "NCC Volume One — structural and durability requirements for Class 2 building facades",
    "Manufacturer TDS — confirm paint overcoat product, dry film thickness, and any site repair requirements",
  ],
  suitableDefects: [
    "Corroded steel angle lintels with visible red rust, section loss, or mortar cracking above the lintel course",
    "Failed timber lintels — timber lintels have no place in modern external masonry; all timber must be replaced with steel",
    "Lintels with insufficient bearing length — masonry cracking at the lintel ends indicates the bearing zone is overstressed",
    "Bowing or deflecting lintel causing stepped masonry cracking above the lintel course",
    "Lintels in failed condition identified during remediation scope of works for salt attack, crack repair, or facade restoration",
  ],
  typicalSubstrates: [
    "Modern clay brick masonry — single or double leaf — confirm bearing zone is in sound condition before loading the new lintel",
    "Concrete masonry unit (block) walls — confirm block compressive strength is adequate for the bearing stress",
    "Calcium silicate brick masonry — confirm bearing zone condition with engineer",
    "Rendered masonry facades — confirm that the rendering does not conceal deteriorated masonry at the bearing zones",
    "NOT suitable: coastal environments — specify 316L stainless steel lintels within 1 km of the coast or in C4/C5 exposure zones",
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

export function LintelDuplexIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are duplex coated steel lintel systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Duplex coated steel lintel systems combine hot-dip galvanising (zinc coating to AS/NZS 4680) with a paint overcoat — typically epoxy or polyurethane — applied over the galvanised surface by a specialist coating applicator. The duplex system provides substantially longer service life than galvanising alone in inland and sheltered environments, with a design life of 40–50 years where galvanising alone would last 15–25 years before significant zinc depletion.
        </p>
        {expanded && (
          <>
            <p>
              The critical rule with duplex coated lintels is that any cut ends or drilled holes made after the duplex coating is applied expose bare steel — these must be treated immediately with a cold galvanised zinc-rich paint (minimum 94% zinc in dried film) before installation. The paint overcoat slows carbonation of the zinc layer by acting as a physical barrier, but it must be maintained in good condition — any damage on site must be made good before the lintel is installed. A structural engineer must design and certify all lintel replacements before the lintel is loaded.
            </p>
            <p>
              Duplex coated steel is not suitable for coastal or marine-influenced environments where the chloride loading accelerates zinc depletion even through a paint overcoat — specify grade 316L stainless steel lintels in those locations. Before replacing any lintel, temporary propping must be in place to support the masonry above the opening. A cavity flashing must be installed above the lintel top flange before re-laying brickwork, with weep holes at not more than 600 mm centres.
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

export function LintelDuplexProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — duplex coated steel lintels — scroll to view all</p>
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
              Side-by-side comparison of duplex coated steel lintel systems. Confirm all product selections against the current manufacturer TDS and the structural engineer&apos;s design before ordering.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coating</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Typical span</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Engineer req.</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coating}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.span}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.engineer}</td>
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
