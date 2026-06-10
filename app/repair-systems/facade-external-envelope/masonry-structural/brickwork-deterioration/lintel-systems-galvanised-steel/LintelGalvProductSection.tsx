"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Galvanised"
  | "Hot-dip"
  | "AS/NZS-4680"
  | "Steel-angle"
  | "Flat-bar"
  | "Channel"
  | "AS-3700"
  | "AS-4100"
  | "Inland"
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
    fullLabel: "Masonry lintel supplier / structural steel merchant",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#b45309",
    name: "Hot-dip galvanised steel angle lintel — AS/NZS 4680",
    descriptionLine: "HDG equal or unequal angle lintel to AS/NZS 4680 — 15–25 year inland service life — engineer-specified section — not coastal",
    productType: "Hot-dip galvanised steel angle lintel — AS/NZS 4680 — inland structural masonry",
    filterTags: ["Galvanised", "Hot-dip", "AS/NZS-4680", "Steel-angle", "AS-3700", "AS-4100", "Inland", "Structural"],
    techChips: [
      { label: "HDG AS/NZS 4680", cls: "bg-amber-100 text-amber-800" },
      { label: "15–25 yr inland life", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4100 design", cls: "bg-stone-100 text-stone-700" },
      { label: "Not coastal", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Hot-dip galvanised steel equal angle or unequal angle lintel for masonry opening support on Class 2 strata buildings in inland and sheltered exposure environments. Galvanised to AS/NZS 4680 — minimum zinc coating mass 600 g/m² for standard structural sections. Service life in inland environments is typically 15–25 years before significant zinc depletion. For longer service life (40–50 years) in inland environments, specify a duplex coated system (galvanised + paint). For coastal environments (within 1 km of the coast or in C4/C5 corrosivity zones), specify grade 316L stainless steel lintels — galvanised steel corrodes rapidly in marine-influenced environments. Structural engineer specification is mandatory — section size and bearing length must be designed per AS 4100 and AS 3700. All cut ends and drilled holes made on site must be treated immediately with cold galvanised zinc-rich paint.",
    technicalProperties: [
      "Hot-dip galvanising to AS/NZS 4680 — minimum zinc coating mass 600 g/m² for standard structural sections",
      "Low initial cost — the most economical steel lintel option for inland, low-exposure environments",
      "Standard structural equal and unequal angle sections available — engineer selects from standard AS/NZS range for the required span and load",
      "Readily available from structural steel merchants — faster supply than stainless or precast alternatives",
      "Wide span range — angle lintels can span from 0.5 m to 5 m+ depending on section size (engineer to confirm)",
      "Compatible with standard masonry cavity flashing details above the lintel top flange",
    ],
    limitations: [
      "Limited corrosion protection — galvanising alone provides 15–25 years in inland environments before zinc depletion; specify duplex coated or stainless in high-exposure or coastal environments",
      "Not suitable for coastal or marine-influenced environments — galvanising corrodes rapidly in C4 or C5 corrosivity zone masonry environments",
      "Cut ends and drilled holes must be treated with cold galvanised zinc-rich paint — bare steel at cut edges corrodes through to red rust well before the adjacent galvanised surface",
      "Structural engineer design mandatory — do not install a galvanised angle lintel without an engineered design for the specific span and load",
    ],
    procurementSources: [
      { name: "InfraBuild (OneSteel / Arrium) — national steel merchant", url: "https://www.infrabuild.com" },
      { name: "Lysaght / BlueScope Steel — national structural merchant", url: "https://www.lysaght.com.au" },
      { name: "Masonry lintel suppliers — state-based, cut-to-length supply", url: "https://www.australiansteel.com.au" },
      { name: "Structural steel fabricators — cut and fabricate to engineer's drawings", url: "https://www.infrabuild.com" },
    ],
  },
  {
    fullLabel: "Masonry lintel supplier / structural steel merchant",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#0369a1",
    name: "Hot-dip galvanised flat bar lintel — shallow rebate",
    descriptionLine: "HDG flat bar lintel to AS/NZS 4680 — shallow rebate masonry openings — restricted to spans under 2 m — engineer-specified — not coastal",
    productType: "Hot-dip galvanised flat bar lintel — AS/NZS 4680 — shallow rebate masonry",
    filterTags: ["Galvanised", "Hot-dip", "AS/NZS-4680", "Flat-bar", "AS-3700", "AS-4100", "Inland", "Structural"],
    techChips: [
      { label: "HDG AS/NZS 4680", cls: "bg-sky-100 text-sky-800" },
      { label: "Shallow rebate", cls: "bg-green-100 text-green-700" },
      { label: "Short spans <2 m", cls: "bg-slate-100 text-slate-700" },
      { label: "Not coastal", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Hot-dip galvanised steel flat bar lintel for shallow rebate masonry openings where a conventional angle profile cannot be accommodated within the available structural depth. Flat bar lintels are typically restricted to shorter spans (under 2 m) due to their lower section modulus — the engineer must confirm that the flat bar section can carry the design load within the specified deflection limit before it is used. Galvanised to AS/NZS 4680 for corrosion protection in inland sheltered environments. Not suitable for coastal or marine-influenced environments. All cut ends must be treated with cold galvanised zinc-rich paint before installation. Engineer must check deflection as well as bending capacity — deep narrow flat bar sections can deflect significantly under live load even within the elastic limit.",
    technicalProperties: [
      "Minimum profile — fits within very shallow rebate openings where an angle lintel would project below the soffit line",
      "Lighter than angle lintels of similar width — easier manual handling for upper-floor lintel installation",
      "Hot-dip galvanising to AS/NZS 4680 provides corrosion protection in inland sheltered environments",
      "Low initial cost — the most economical lintel option for short spans in sheltered inland environments",
      "Fabricated to any length — confirm exact bearing-to-bearing length before ordering to avoid site cutting",
      "Standard flat bar stock available from steel merchants — short lead time for standard sizes",
    ],
    limitations: [
      "Restricted to short spans — flat bar section modulus is significantly lower than an equal-height angle; engineer must confirm span is within deflection and bending limits",
      "Not suitable for coastal environments — same galvanising durability limitations as angle lintels; specify stainless for coastal",
      "Cold galvanised treatment of cut ends is essential — bare steel at cut faces corrodes through to red rust rapidly in any environment",
      "Deflection must be within AS 3700 masonry support limits — deep narrow flat bar sections can have significant live load deflection even within the elastic limit",
    ],
    procurementSources: [
      { name: "InfraBuild (OneSteel) — national steel merchant", url: "https://www.infrabuild.com" },
      { name: "Lysaght / BlueScope Steel — national structural merchant", url: "https://www.lysaght.com.au" },
      { name: "Masonry lintel suppliers — state-based, cut-to-length", url: "https://www.australiansteel.com.au" },
      { name: "Structural steel fabricators — fabricate to engineer's drawings", url: "https://www.infrabuild.com" },
    ],
  },
  {
    fullLabel: "Masonry lintel supplier / structural steel merchant",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#7c3aed",
    name: "Hot-dip galvanised channel lintel — wide or loaded openings",
    descriptionLine: "HDG PFC channel lintel to AS/NZS 4680 — wide or heavily loaded masonry openings — greater span capacity than angle — engineer-specified — not coastal",
    productType: "Hot-dip galvanised PFC channel lintel — AS/NZS 4680 — wide masonry openings",
    filterTags: ["Galvanised", "Hot-dip", "AS/NZS-4680", "Channel", "AS-3700", "AS-4100", "Inland", "Structural"],
    techChips: [
      { label: "HDG AS/NZS 4680", cls: "bg-purple-100 text-purple-800" },
      { label: "PFC channel section", cls: "bg-slate-100 text-slate-700" },
      { label: "Wide openings", cls: "bg-green-100 text-green-700" },
      { label: "Not coastal", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Hot-dip galvanised structural steel channel (PFC) section lintel for wider or more heavily loaded masonry openings on Class 2 strata building facades. Channel sections achieve greater span capacity than equal-height angle lintels due to their higher section modulus — used for wide garage door openings, wide window openings or where higher masonry loads apply. Galvanised to AS/NZS 4680. Engineer specification is mandatory — section size, span, bearing length and connection detail must all be designed per AS 4100 and AS 3700. Not suitable for coastal or marine-influenced environments. Back-to-back configurations require an engineered connection detail. Cavity flashing must be profiled to fit the channel section top flange.",
    technicalProperties: [
      "Greater span and load capacity than angle lintel of similar height — higher section modulus allows longer spans at the same beam depth",
      "Standard PFC sections available from structural steel merchants in a full range of section sizes",
      "Hot-dip galvanising to AS/NZS 4680 provides good corrosion protection in inland sheltered environments",
      "Back-to-back configuration available for double-leaf cavity wall construction — engineer to specify the connection detail between sections",
      "Wide bearing face distributes load over larger masonry area compared to an angle lintel leg",
      "Compatible with standard masonry bearing details — can be designed to bear on outer leaf, inner leaf, or both",
    ],
    limitations: [
      "Not suitable for coastal or marine-influenced environments — specify 316L stainless steel or duplex coated stainless for coastal locations",
      "Heavier than angle lintels — confirm lifting and handling logistics before ordering; mechanical assistance may be required for upper-floor installation",
      "Back-to-back configurations require an engineered connection detail — do not use back-to-back PFC without an engineer designing the bolted or welded connection",
      "Cavity flashing must be profiled to fit the channel section top flange — confirm the flashing profile with the engineer before installation",
    ],
    procurementSources: [
      { name: "InfraBuild (OneSteel) — national steel merchant, standard PFC stock", url: "https://www.infrabuild.com" },
      { name: "Lysaght / BlueScope Steel — national structural merchant", url: "https://www.lysaght.com.au" },
      { name: "Structural steel fabricators — cut and fabricate back-to-back to engineer's drawings", url: "https://www.infrabuild.com" },
      { name: "Masonry lintel suppliers — state-based, supply cut-to-length channel lintels", url: "https://www.australiansteel.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Galvanised", label: "Galvanised" },
  { id: "Hot-dip", label: "Hot-dip" },
  { id: "AS/NZS-4680", label: "AS/NZS 4680" },
  { id: "Steel-angle", label: "Steel angle" },
  { id: "Flat-bar", label: "Flat bar" },
  { id: "Channel", label: "Channel" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "AS-4100", label: "AS 4100" },
  { id: "Inland", label: "Inland" },
  { id: "Structural", label: "Structural" },
];

const SYSTEM_COMPARISON: {
  product: string;
  profile: string;
  coating: string;
  coastal: string;
  span: string;
  serviceLife: string;
  primaryUse: string;
}[] = [
  {
    product: "Galvanised angle lintel",
    profile: "Equal / unequal angle",
    coating: "HDG AS/NZS 4680",
    coastal: "No",
    span: "Up to 5 m (engineer to confirm)",
    serviceLife: "15–25 years inland",
    primaryUse: "Standard masonry opening — inland / sheltered",
  },
  {
    product: "Galvanised flat bar lintel",
    profile: "Flat bar",
    coating: "HDG AS/NZS 4680",
    coastal: "No",
    span: "Up to 2 m (engineer to confirm)",
    serviceLife: "15–25 years inland",
    primaryUse: "Shallow rebate opening where angle cannot fit",
  },
  {
    product: "Galvanised channel lintel",
    profile: "PFC channel",
    coating: "HDG AS/NZS 4680",
    coastal: "No",
    span: "Up to 6 m+ (engineer to confirm)",
    serviceLife: "15–25 years inland",
    primaryUse: "Wide or heavily loaded masonry opening",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded or failed steel angle lintels above window and door openings in inland Class 2 strata building facades",
    "New lintel installation where existing masonry bears directly on the brick course with no structural lintel beneath",
    "Lintel replacement at garage door openings and wide window openings in sheltered inland environments",
    "Shallow rebate openings where flat bar lintels replace failed timber or corroded steel in low-span conditions",
    "Wide or structurally loaded openings where a channel section is required to achieve the required span capacity",
  ],
  selectionCriteria: [
    "Confirm the exposure classification before specifying galvanised lintels — for coastal locations (C4/C5 corrosivity) specify 316L stainless steel instead",
    "For longer service life in inland environments, specify duplex coated (HDG + paint) rather than galvanised-only lintels",
    "Structural engineer must design and certify all lintel replacements — section size, bearing length, span, and connection details per AS 4100 and AS 3700",
    "Select angle, flat bar, or channel based on available structural depth and required span — flat bar restricted to spans under 2 m",
    "Confirm galvanising is to AS/NZS 4680 (hot-dip) — do not accept electroplated or cold galvanised coating as a substitute for structural masonry lintels",
    "Ensure cavity flashing type is confirmed before ordering lintel — flashing profile must suit the lintel top flange geometry",
  ],
  limitations: [
    "Not suitable for coastal or marine-influenced environments (C4/C5 corrosivity) — specify 316L stainless steel",
    "Cut ends and drilled holes made on site must be treated with cold galvanised zinc-rich paint before installation",
    "Do not install without a structural engineer's signed design — lintel replacements are structural work",
    "Temporary propping of masonry above the opening is mandatory during lintel replacement",
    "Do not re-lay brickwork above a new lintel without confirming cavity flashing is correctly installed with weep holes at not more than 600 mm centres",
  ],
  standardsNotes: [
    "AS 4100 — Steel Structures — primary Australian standard for structural steel design",
    "AS 3700 — Masonry Structures — governs bearing zone design, lintel deflection limits, and cavity flashing requirements",
    "AS/NZS 4680 — Hot-dip galvanised coatings — specifies minimum zinc coating mass for structural sections (600 g/m²)",
    "NCC Volume One — structural and durability requirements for Class 2 building facades",
    "Manufacturer TDS — confirm galvanising specification and any site repair requirements for cut ends",
  ],
  suitableDefects: [
    "Corroded steel angle lintels with visible red rust, section loss, or mortar cracking above the lintel course",
    "Failed timber lintels — timber lintels must be replaced with steel in all external masonry applications",
    "Lintels with insufficient bearing length — masonry cracking at lintel ends indicates the bearing zone is overstressed",
    "Bowing or deflecting lintels causing stepped masonry cracking above the lintel course",
    "Lintels in failed condition identified during remediation scope for salt attack, crack repair, or facade restoration",
  ],
  typicalSubstrates: [
    "Modern clay brick masonry — single or double leaf — confirm bearing zone is in sound condition before loading the new lintel",
    "Concrete masonry unit (block) walls — confirm block compressive strength is adequate for the bearing stress",
    "Calcium silicate brick masonry — confirm bearing zone condition with engineer",
    "Rendered masonry facades — confirm the rendering does not conceal deteriorated masonry at the bearing zones",
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

export function LintelGalvIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are hot-dip galvanised steel lintel systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Hot-dip galvanised steel lintel systems use structural steel sections — angle, flat bar, or channel — coated with zinc by immersion in a molten zinc bath to AS/NZS 4680. They are the most economical steel lintel option for masonry opening remediation on Class 2 strata buildings in inland and sheltered exposure environments, with a service life of 15–25 years before significant zinc depletion.
        </p>
        {expanded && (
          <>
            <p>
              The key limitation of galvanising alone is that zinc depletion in coastal or marine environments is rapid — galvanised lintels in coastal locations can fail within a few years. For coastal environments, specify grade 316L stainless steel. For longer inland service life, specify a duplex coated system (galvanised plus paint overcoat) which extends design life to 40–50 years. A structural engineer must design and certify all lintel replacements — section size, span, bearing length, and connection details must be designed per AS 4100 and AS 3700 before ordering.
            </p>
            <p>
              Any cut ends or drilled holes made on site after hot-dip galvanising expose bare steel that corrodes faster than the adjacent galvanised surface. All such areas must be treated immediately with cold galvanised zinc-rich paint (minimum 94% zinc in dried film) before the lintel is installed. A cavity flashing must be installed above the lintel top flange before re-laying brickwork, with weep holes at not more than 600 mm centres. Temporary propping of masonry above the opening is mandatory during lintel replacement.
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

export function LintelGalvProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — hot-dip galvanised steel lintels — scroll to view all</p>
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
              Side-by-side comparison of hot-dip galvanised steel lintel systems. Confirm all product selections against the structural engineer&apos;s design before ordering.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Service life (inland)</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.serviceLife}</td>
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
