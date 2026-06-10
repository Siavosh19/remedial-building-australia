"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Lead"
  | "Code-4"
  | "Code-5"
  | "Code-6"
  | "AS-3700"
  | "Cavity-flashing"
  | "Weep-holes"
  | "Coastal"
  | "Heritage"
  | "All-exposure";

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
    fullLabel: "Midland Lead / Austral Lead",
    brandUrl: "https://www.midlandlead.com.au",
    accentColor: "#b45309",
    name: "Code 4 milled lead cavity flashing (1.80 mm)",
    descriptionLine: "Code 4 milled lead sheet (1.80 mm, 20.41 kg/m²) — minimum weight for cavity flashing — all exposure zones including coastal and marine — AS 3700",
    productType: "Milled lead cavity flashing — Code 4 — AS 3700 — all exposure zones",
    filterTags: ["Lead", "Code-4", "AS-3700", "Cavity-flashing", "Weep-holes", "Coastal", "Heritage", "All-exposure"],
    techChips: [
      { label: "Code 4 — 1.80 mm", cls: "bg-amber-100 text-amber-800" },
      { label: "All exposure zones", cls: "bg-green-100 text-green-700" },
      { label: "Heritage compatible", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3700", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Code 4 milled lead sheet (1.80 mm nominal, 20.41 kg/m²) is the minimum weight suitable for cavity flashing in masonry construction under AS 3700. Appropriate for openings up to approximately 1.2 m, standard residential remediation, and all exposure classifications including coastal and marine. Lead conforms easily to complex profiles and self-seals at laps under mortar pressure — the weight of fresh mortar forces the lead laps together, creating a reliable weathertight joint without reliance on site-applied sealant. Lead is compatible with all masonry mortars and does not require isolation from steel lintels for galvanic reasons (mild surface staining only). Lead is the material of choice in heritage buildings where the original flashing was lead. OH&S requirements for lead work must be observed: PPE, no eating/drinking on site, controlled waste disposal.",
    technicalProperties: [
      "Suitable for all exposure zones including coastal, marine, and C4–C5 industrial — no galvanic restriction",
      "Self-sealing at laps under mortar pressure — reliable joint performance without specialist lap sealant",
      "Compatible with all masonry mortars and concrete lintels without isolation",
      "Heritage-appropriate material — matches original construction specification in pre-1970s buildings",
      "No galvanic corrosion risk against steel, aluminium, or stainless steel adjacent flashings",
      "Code 4 is minimum per industry practice — do not substitute Code 3 (insufficient stiffness for flashing use)",
    ],
    limitations: [
      "Heavy material — Code 4 weighs ~20 kg/m²; manual handling safety requirements apply",
      "OH&S obligations: PPE (gloves, P2 respirator when cutting), no eating/drinking on site, controlled lead waste disposal per state EPA",
      "Creep risk in wide openings under sustained thermal cycling — NOT suitable for spans > ~1.2 m without Code 5 or structural step-in",
      "Lead in prolonged contact with fresh Portland cement (permanently wet conditions) can suffer mild attack — isolate with bitumen tape if in doubt",
    ],
    procurementSources: [
      { name: "Midland Lead Australia — national supply", url: "https://www.midlandlead.com.au" },
      { name: "Austral Lead — national", url: "" },
      { name: "Roofing and flashings trade suppliers — all states", url: "" },
      { name: "Heritage building materials suppliers — all states", url: "" },
    ],
  },
  {
    fullLabel: "Midland Lead / Austral Lead",
    brandUrl: "https://www.midlandlead.com.au",
    accentColor: "#0369a1",
    name: "Code 5 milled lead cavity flashing (2.24 mm)",
    descriptionLine: "Code 5 milled lead (2.24 mm, 25.40 kg/m²) — standard for commercial and multi-storey — spans to ~1.8 m — all exposure zones including coastal — AS 3700",
    productType: "Milled lead cavity flashing — Code 5 — AS 3700 — all exposure zones",
    filterTags: ["Lead", "Code-5", "AS-3700", "Cavity-flashing", "Weep-holes", "Coastal", "Heritage", "All-exposure"],
    techChips: [
      { label: "Code 5 — 2.24 mm", cls: "bg-sky-100 text-sky-800" },
      { label: "Commercial standard", cls: "bg-slate-100 text-slate-700" },
      { label: "All exposure zones", cls: "bg-green-100 text-green-700" },
      { label: "Spans to ~1.8 m", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Code 5 milled lead (2.24 mm, 25.40 kg/m²) is the standard specification for cavity flashings at lintels in multi-storey or heavily loaded situations, spans up to approximately 1.8 m, or where significant thermal cycling is anticipated. Wider flashings, heavier wall loads, or coastal buildings in heritage precincts commonly specify Code 5. Greater stiffness than Code 4 reduces creep risk in wider openings. Industry standard for commercial masonry remediation. Compatible with all exposure zones including coastal and severe marine. Lead-burning laps is preferred for coastal and marine applications. OH&S requirements identical to Code 4 — PPE, no eating/drinking on site, controlled lead waste disposal.",
    technicalProperties: [
      "Greater stiffness than Code 4 — reduced creep risk in wider openings or locations with high thermal cycling",
      "Suitable for all exposure zones including coastal, marine, and C4–C5 industrial environments",
      "Self-sealing laps under mortar pressure — same reliable joint performance as Code 4",
      "Accommodates spans up to approximately 1.8 m without structural step-in or reinforcement",
      "Industry standard for commercial and multi-storey masonry remediation on Class 2 strata buildings",
      "Compatible with steel lintels without isolation — minor surface rust staining only under prolonged wet contact",
    ],
    limitations: [
      "Heavier than Code 4 (~25 kg/m²) — manual handling safety requirements apply; two-person handling for larger sheets",
      "OH&S lead work requirements identical to Code 4 — PPE, controlled waste disposal per state EPA",
      "Higher material cost than aluminium alternatives — cost premium justified by all-exposure suitability",
      "Cutting and forming requires tin snips or angle grinder — no heat tools; confirm edge treatment at all cut edges",
    ],
    procurementSources: [
      { name: "Midland Lead Australia — national supply", url: "https://www.midlandlead.com.au" },
      { name: "Austral Lead — national", url: "" },
      { name: "Roofing and flashings trade suppliers — all states", url: "" },
      { name: "Heritage building materials suppliers — coastal and commercial", url: "" },
    ],
  },
  {
    fullLabel: "Midland Lead / Austral Lead",
    brandUrl: "https://www.midlandlead.com.au",
    accentColor: "#7c3aed",
    name: "Code 6 heavy-duty lead cavity flashing (2.65 mm)",
    descriptionLine: "Code 6 milled lead (2.65 mm, 29.77 kg/m²) — heavy-duty — spans to ~2.5 m — severe marine exposure — heritage conservation — AS 3700",
    productType: "Milled lead cavity flashing — Code 6 heavy-duty — AS 3700 — all exposure zones",
    filterTags: ["Lead", "Code-6", "AS-3700", "Cavity-flashing", "Weep-holes", "Coastal", "Heritage", "All-exposure"],
    techChips: [
      { label: "Code 6 — 2.65 mm", cls: "bg-purple-100 text-purple-800" },
      { label: "Heavy duty", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage conservation", cls: "bg-amber-100 text-amber-800" },
      { label: "Spans to ~2.5 m", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Code 6 milled lead (2.65 mm, 29.77 kg/m²) is specified for long spans (up to approximately 2.5 m), heavily loaded external masonry, locations subject to extreme thermal cycling and coastal spray, or heritage conservation projects where the original lead detailing is specified to a heavyweight lead specification. Code 6 is the maximum weight commonly available for cavity flashing applications and provides the highest creep and thermal fatigue resistance of any milled lead product. Used in heritage conservation to match original heavyweight lead specifications on pre-1970s buildings. At ~30 kg/m², Code 6 requires mechanical handling assistance for all but the shortest sheets. Lead-burning of laps is strongly recommended for all Code 6 applications.",
    technicalProperties: [
      "Maximum commonly available lead weight — highest creep and thermal fatigue resistance for cavity flashing use",
      "Spans to approximately 2.5 m without structural step-in or mid-span reinforcement",
      "Suitable for all exposure zones including severe marine and C5 industrial",
      "Used in heritage conservation to match original heavyweight lead specification in pre-1970s buildings",
      "Lead-burning at laps creates a monolithic waterproof sheet — most reliable joint method for severe exposure",
      "Compatible with all masonry mortars and steel lintels without isolation",
    ],
    limitations: [
      "Very heavy (~30 kg/m²) — two-person manual handling required for all but shortest pieces; mechanical lifting for multi-storey",
      "OH&S lead work requirements critical at this weight — PPE, lead waste disposal per state WorkSafe and EPA",
      "Significantly higher material and installation cost than Code 4 or 5 — justify use only where span or exposure warrants",
      "Lead-burning laps requires a licensed sheet lead worker — additional trade cost vs mechanical lap sealing",
    ],
    procurementSources: [
      { name: "Midland Lead Australia — Code 6 sheet supply", url: "https://www.midlandlead.com.au" },
      { name: "Austral Lead — Code 6 on request", url: "" },
      { name: "Heritage specialist flashings contractors — all states", url: "" },
      { name: "Roofing and flashings trade suppliers — confirm Code 6 stock availability", url: "" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Lead", label: "Lead" },
  { id: "Code-4", label: "Code 4 (1.80 mm)" },
  { id: "Code-5", label: "Code 5 (2.24 mm)" },
  { id: "Code-6", label: "Code 6 (2.65 mm)" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Cavity-flashing", label: "Cavity flashing" },
  { id: "Weep-holes", label: "Weep holes" },
  { id: "Coastal", label: "Coastal" },
  { id: "Heritage", label: "Heritage" },
  { id: "All-exposure", label: "All exposure zones" },
];

const SYSTEM_COMPARISON: {
  product: string;
  thickness: string;
  massKgm2: string;
  coastal: string;
  maxSpan: string;
  relCost: string;
  primaryUse: string;
}[] = [
  {
    product: "Code 4 lead (1.80 mm)",
    thickness: "1.80 mm",
    massKgm2: "20.41",
    coastal: "Yes",
    maxSpan: "~1.2 m",
    relCost: "$",
    primaryUse: "Standard residential — inland and coastal",
  },
  {
    product: "Code 5 lead (2.24 mm)",
    thickness: "2.24 mm",
    massKgm2: "25.40",
    coastal: "Yes",
    maxSpan: "~1.8 m",
    relCost: "$$",
    primaryUse: "Commercial / multi-storey — all exposures",
  },
  {
    product: "Code 6 lead (2.65 mm)",
    thickness: "2.65 mm",
    massKgm2: "29.77",
    coastal: "Yes",
    maxSpan: "~2.5 m",
    relCost: "$$$",
    primaryUse: "Long spans / heritage conservation / severe marine",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of corroded or failed cavity tray flashings in coastal, marine, and all exposure zone masonry buildings",
    "Heritage masonry buildings where the original flashing specification used milled lead sheet",
    "Commercial and multi-storey Class 2 strata buildings where Code 5 is the default specification",
    "Long-span openings and heavily loaded masonry facades where Code 5 or Code 6 is required",
  ],
  selectionCriteria: [
    "Code 4 is minimum per industry practice — do not substitute Code 3 which lacks the stiffness required for flashing use",
    "Use Code 5 as the default for commercial and multi-storey work, spans over 1.2 m, or high thermal cycling locations",
    "Use Code 6 for spans over 1.8 m, severe marine exposure, or heritage conservation requiring heavyweight lead specification",
    "Lead is the preferred material for coastal and marine buildings where aluminium is not suitable",
    "Lead-burn laps in coastal and severe marine applications — mechanical lap sealing is acceptable for inland and benign zones",
    "OH&S requirements for lead work must be observed in all applications — no exceptions",
  ],
  limitations: [
    "Heavy material — OH&S manual handling requirements apply; mechanical lifting for multi-storey applications",
    "OH&S obligations: PPE (gloves, P2 respirator when cutting), no eating/drinking on site, controlled lead waste disposal per state EPA and WorkSafe",
    "Lead is mildly attacked by fresh Portland cement in permanently wet conditions — isolate with bitumen tape if the bearing zone will be permanently wet",
    "Do not use copper fixings or copper wire ties adjacent to lead flashing — bimetallic corrosion risk",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — Section 5: cavity flashings, upstand requirements, weep holes",
    "AS 3700 clause 5.6 — minimum 25 mm upstand at inner leaf — flashing must lap the inner leaf, not just rest on the outer course",
    "AS 3700 clause 5.4 — weep holes at maximum 600 mm centres; minimum 75 mm² free area per weep hole",
    "DLSC Lead Sheet Manual — industry reference for lead flashing design and installation",
    "State WorkSafe and EPA regulations — lead work safety and waste disposal requirements vary by state",
  ],
  suitableDefects: [
    "Corroded, failed, or absent cavity tray flashings in coastal and marine masonry buildings",
    "Water ingress at lintel and sill locations in heritage buildings where lead is the appropriate original material",
    "Failed or cracked lead flashings requiring full replacement at lintel or sill locations",
    "Post-construction omission of cavity flashings at lintel, sill, or DPC locations — all exposure zones",
  ],
  typicalSubstrates: [
    "Masonry bearing course at lintel or sill — all mortar types compatible with lead without isolation",
    "Steel lintel bearing surface — minor surface rust staining only; isolation not required unless permanently wet",
    "Concrete lintel bearing surface — compatible without isolation (minor alkaline attack in permanently wet conditions — isolate if concerned)",
    "Heritage masonry DPC locations — lead is heritage-compatible material for original lead DPC replacement",
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
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
                </a>
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

export function CavityFlashLeadIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are lead cavity flashings?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Milled lead cavity flashings have been used in Australian masonry construction since the early twentieth century. Lead is the most durable cavity flashing material and is suitable for all exposure classifications including coastal and severe marine environments. AS 3700 permits lead flashings without restriction on exposure zone — Code 4 (1.80 mm) is the minimum and Code 5 (2.24 mm) is the default specification for commercial remediation work.
        </p>
        {expanded && (
          <>
            <p>
              The practical advantages of lead are self-sealing laps (mortar weight presses the laps together), ease of site forming to complex profiles, universal exposure suitability, and heritage compatibility. The primary constraints are weight (OH&S handling requirements) and lead work safety obligations — all lead work requires appropriate PPE, site controls, and controlled waste disposal under state WorkSafe and EPA regulations.
            </p>
            <p>
              Code 4 is minimum — do not substitute Code 3 which is too thin and lacks the stiffness and creep resistance required for cavity flashing. Code 5 is the industry standard for commercial and multi-storey work. Code 6 is used for long spans (over 1.8 m) or heritage conservation projects requiring the heaviest lead specification. Laps must be minimum 75 mm — lead-burning is preferred in coastal applications.
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

export function CavityFlashLeadProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — lead cavity flashings — scroll to view all</p>
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
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>
                      )}
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of lead cavity flashing codes. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mass (kg/m²)</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Max span (approx.)</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Rel. cost</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.massKgm2}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.maxSpan}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.relCost}</td>
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
