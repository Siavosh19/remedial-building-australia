"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Mineral-render"
  | "Lime-render"
  | "Silicate-render"
  | "Breathable"
  | "Rising-damp"
  | "External"
  | "Internal"
  | "Heritage"
  | "Salt-resistant"
  | "Through-coloured"
  | "Scraped-finish"
  | "One-coat"
  | "Two-coat";

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
    fullLabel: "Parex Australia",
    brandUrl: "https://www.parex.com.au",
    tdsUrl: "https://www.parex.com.au",
    accentColor: "#c85000",
    name: "Parex Monorex GT",
    descriptionLine: "Through-coloured mineral scraped-texture render — breathable — for external masonry walls including rising damp remediation",
    productType: "Mineral through-coloured render",
    filterTags: ["Mineral-render", "Breathable", "Rising-damp", "External", "Salt-resistant", "Through-coloured", "Scraped-finish", "One-coat"],
    techChips: [
      { label: "Mineral render", cls: "bg-sky-100 text-sky-800" },
      { label: "Through-coloured", cls: "bg-green-50 text-green-700" },
      { label: "Breathable", cls: "bg-slate-100 text-slate-700" },
      { label: "One-coat system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Parex Monorex GT is a through-coloured mineral scraped-texture render widely used for external masonry facades in Australia. As a mineral render, Monorex GT is vapour-permeable (breathable) — it allows moisture to escape from the masonry substrate while providing a durable, through-coloured decorative finish. This breathability is a key property for use on masonry walls affected by rising damp or undergoing the drying-out period after DPC injection treatment.\n\nMonorex GT is applied as a one-coat render system typically at 15–20mm thickness to sand-and-cement-prepared or direct-to-masonry backgrounds. The scraped texture finish is applied while the render is green, using a nail float or scraper to create a uniform aggregate-exposed surface. The through-colour eliminates the need for topcoat paint immediately and provides a natural mineral appearance that has become standard in contemporary Australian apartment and medium-density residential construction.\n\nFor rising damp remediation on external walls, Monorex GT can be used as the external finish coat over a suitable breathable undercoat scratch coat where the existing render has been stripped. Confirm with Parex Australia that Monorex GT is the appropriate product for the specific rising damp remediation application, the required background preparation, and whether an undercoat is required for the specific substrate.",
    technicalProperties: [
      "Mineral through-coloured render — no topcoat required immediately — colour integral throughout the render body",
      "Vapour-permeable (breathable) — allows masonry substrate to dry through the render layer during rising damp drying-out period",
      "Scraped-texture finish — applied while green — consistent aggregate-exposed surface — standard Australian apartment aesthetic",
      "One-coat render system at 15–20mm applied thickness — suitable for direct application to masonry backgrounds with appropriate preparation",
      "Salt tolerance — mineral renders have higher salt resistance than acrylic renders and are more appropriate for rising damp remediation",
      "Parex national distribution — available through Parex trade supply channels across Australian states",
    ],
    limitations: [
      "Confirm suitability for rising damp applications with Parex technical — verify substrate preparation and undercoat requirements before specifying",
      "Not a WTA renovation plaster — not suitable as a replacement for internal WTA salt-resistant renovation plaster on internal rising damp walls",
      "Background must be sound, clean and free of contamination — rising damp walls require old contaminated render to be stripped before application",
      "Colour range is limited compared to acrylic renders — confirm colour selection and colour matching with Parex Australia",
      "The render must remain breathable — do not apply impermeable topcoat paints over Monorex GT on walls still drying after rising damp treatment",
      "Confirm current product specification, system documentation and substrate requirements with Parex Australia before specifying",
    ],
    procurementSources: [
      { name: "Parex Australia — trade supply — contact for current pricing", url: "https://www.parex.com.au" },
      { name: "Parex national distribution network — confirm regional availability", url: "https://www.parex.com.au" },
    ],
  },
  {
    fullLabel: "Keim Australia",
    brandUrl: "https://www.keim.com.au",
    tdsUrl: "https://www.keim.com.au",
    accentColor: "#2d6a4f",
    name: "Keim Mineral Silicate Render",
    descriptionLine: "Mineral silicate render — exceptionally breathable — chemically bonds to masonry — for external walls with rising damp or moisture issues",
    productType: "Mineral silicate render",
    filterTags: ["Silicate-render", "Mineral-render", "Breathable", "Rising-damp", "External", "Heritage", "Salt-resistant", "Two-coat"],
    techChips: [
      { label: "Silicate render", cls: "bg-sky-100 text-sky-800" },
      { label: "Exceptionally breathable", cls: "bg-green-50 text-green-700" },
      { label: "Heritage compatible", cls: "bg-amber-50 text-amber-700" },
      { label: "Chemical bond to masonry", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Keim's mineral silicate render system is part of the same silicate chemistry family as Keim's flagship Granital silicate paint. Silicate renders use potassium silicate as the binder, which undergoes a petrification reaction — a chemical bond — with silica-containing masonry substrates including brick, sandstone, concrete and traditional renders. This chemical bond creates a render that cannot peel, crack or delaminate in the way that acrylic or polymer-modified renders can.\n\nThe key property for rising damp applications is exceptional vapour permeability. Silicate renders have among the highest breathability of any render system — far higher than acrylic or polymer-modified renders. This allows masonry walls to continue drying freely during the post-treatment period without moisture being trapped beneath the render layer. For heritage buildings with soft masonry substrates (sandstone, handmade brick, traditional lime mortar) where breathability is critical to prevent moisture-driven damage, silicate render is the technically correct choice.\n\nKeim is a German manufacturer with a long heritage in silicate coatings and renders. Keim products are available in Australia through Keim Australia. Confirm the complete render system, application requirements and substrate suitability with Keim Australia before specifying.",
    technicalProperties: [
      "Potassium silicate binder — petrification reaction with silica-containing masonry — chemical bond — cannot peel or delaminate",
      "Exceptionally high vapour permeability — among the most breathable render systems available — allows masonry to dry freely after rising damp treatment",
      "Very high alkalinity — inherently resistant to algae, fungi and biological growth without biocide additives",
      "Suitable for heritage masonry substrates — compatible with soft brick, sandstone, sandstock brick, traditional lime mortars",
      "Non-combustible — A2 fire classification — suitable where fire performance requirements apply to facades",
      "Long service life — silicate renders are extremely durable — many European buildings have silicate renders surviving 100+ years",
    ],
    limitations: [
      "Only bonds chemically to silica-containing substrates — not suitable for substrates without silica content — confirm substrate compatibility with Keim Australia",
      "Application is more demanding than acrylic or polymer-modified renders — qualified Keim applicators are required for best results",
      "Colour range is limited to mineral earth tones — synthetic bright colours are not achievable in silicate systems — confirm colour options with Keim Australia",
      "Not suitable for application over acrylic or polymer-modified renders — the substrate must be mineral (masonry, cement render, mineral render)",
      "Higher product cost than standard mineral or acrylic renders — life-cycle cost advantage must be weighed against initial cost",
      "Confirm current product names, system documentation and applicator availability with Keim Australia before specifying",
    ],
    procurementSources: [
      { name: "Keim Australia — trade supply — contact for current pricing and applicator referral", url: "https://www.keim.com.au" },
    ],
  },
  {
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    tdsUrl: "https://www.remmers.com.au",
    accentColor: "#1a5276",
    name: "Remmers Kalkputz / NHL Lime-Based Breathable Render",
    descriptionLine: "Lime-based breathable render system — WTA-referenced — for external masonry walls after rising damp treatment — heritage compatible",
    productType: "Lime-based breathable render",
    filterTags: ["Lime-render", "Mineral-render", "Breathable", "Rising-damp", "External", "Heritage", "Salt-resistant"],
    techChips: [
      { label: "Lime-based", cls: "bg-sky-100 text-sky-800" },
      { label: "WTA-referenced system", cls: "bg-amber-50 text-amber-700" },
      { label: "Heritage compatible", cls: "bg-green-50 text-green-700" },
      { label: "Breathable", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Remmers supplies lime-based breathable render products (under their Kalkputz or equivalent product designations) as part of a WTA-referenced rising damp treatment system for external masonry walls. Lime renders are the traditional breathable render for masonry construction and have inherently high vapour permeability, good salt tolerance during the wall drying period, and compatibility with soft historic masonry substrates where harder Portland cement renders can cause damage through differential stiffness.\n\nIn the Remmers WTA rising damp system, a lime-based breathable render on the external face is the logical companion to Remmers SP WTA renovation plaster on the internal face — both products are part of an integrated Remmers WTA system that is designed to provide coordinated system documentation, technical support, and warranty coverage across the complete treatment. Using a single manufacturer for the injection product (Kiesol C), internal renovation plaster (SP) and external render provides administrative simplicity on larger strata remediation projects.\n\nConfirm the current Remmers product designation for lime-based breathable external render with Remmers Australia before specifying — the Remmers product range is broad and the exact product name and system recommendation may vary between projects.",
    technicalProperties: [
      "Lime-based binder — naturally high vapour permeability — allows wall to dry freely through the render after rising damp treatment",
      "Good salt tolerance during drying — lime renders do not have the enlarged pore structure of WTA renovation plasters but tolerate salt exposure better than Portland cement renders",
      "Heritage masonry compatible — compatible with soft brick, sandstone, traditional lime mortar backgrounds — does not cause moisture trapping behind impermeable surfaces",
      "Part of Remmers WTA system — coordinates with Remmers Kiesol C injection and SP renovation plasters as a complete rising damp treatment system from one manufacturer",
      "Low embodied energy compared to Portland cement renders — natural material with well-understood longevity in masonry construction",
    ],
    limitations: [
      "Lime renders have lower mechanical strength than Portland cement or polymer-modified renders — confirm suitability for the exposure and traffic conditions",
      "Lime renders require correct application conditions — protection from frost, strong sun and drying winds during the curing period",
      "Application by experienced plasterers is important — lime renders behave differently from Portland cement renders and require appropriate trade knowledge",
      "Confirm the current Remmers lime render product name and WTA system documentation with Remmers Australia — product designations vary between markets",
      "Rising damp walls must still have old contaminated render stripped and replaced — lime render is not applied over existing failing render",
      "Confirm current product specification, system compatibility and technical support with Remmers Australia before specifying",
    ],
    procurementSources: [
      { name: "Remmers Australia — trade supply — contact for current pricing", url: "https://www.remmers.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Mineral-render", label: "Mineral render" },
  { id: "Lime-render", label: "Lime render" },
  { id: "Silicate-render", label: "Silicate render" },
  { id: "Breathable", label: "Breathable" },
  { id: "Rising-damp", label: "Rising damp" },
  { id: "External", label: "External" },
  { id: "Internal", label: "Internal" },
  { id: "Heritage", label: "Heritage compatible" },
  { id: "Salt-resistant", label: "Salt resistant" },
  { id: "Through-coloured", label: "Through-coloured" },
  { id: "One-coat", label: "One-coat system" },
  { id: "Two-coat", label: "Two-coat system" },
];

const BRAND_EQUIV: { system: string; parex: string; keim: string; remmers: string }[] = [
  { system: "Mineral through-coloured scraped render — external", parex: "Monorex GT", keim: "—", remmers: "—" },
  { system: "Silicate render — max breathability — heritage", parex: "—", keim: "Mineral Silicate Render*", remmers: "—" },
  { system: "Lime-based breathable render — WTA system", parex: "—", keim: "—", remmers: "Kalkputz / NHL render*" },
];

const TECH_INFO = {
  typicalApplications: [
    "External render replacement on masonry walls after rising damp treatment — applied after DPC injection and internal WTA renovation plastering",
    "Breathable external render over masonry walls still drying after rising damp treatment — to allow vapour escape from the wall",
    "Heritage building external render replacement where soft masonry requires a compatible lime or silicate render system",
    "New external render over solid masonry apartments where the existing render is salt-contaminated and has failed due to rising damp",
  ],
  selectionCriteria: [
    "All breathable renders for rising damp remediation must be vapour-permeable — do not use acrylic or polymer-modified renders over walls still drying after DPC injection",
    "For standard brick veneer or concrete block external walls, Parex Monorex GT mineral render provides a cost-effective breathable solution",
    "For heritage masonry (sandstone, soft brick, traditional lime mortar) silicate render (Keim) or lime render (Remmers) is more appropriate than Portland cement or acrylic render",
    "Where a single-manufacturer WTA rising damp system is required (Remmers injection + Remmers SP internal + Remmers external), select Remmers lime-based render for the external face",
    "Confirm substrate compatibility — mineral and lime renders cannot be applied over acrylic or polymer-modified paints or renders without stripping the existing coating",
  ],
  limitations: [
    "Breathable renders for rising damp remediation should not be topcoated with impermeable acrylic paints — this defeats the purpose of using a breathable render",
    "Breathable render does not substitute for internal WTA renovation plaster — the external and internal plaster systems serve different roles in the rising damp treatment sequence",
    "Old contaminated external render must be stripped before applying new breathable render — applying over contaminated old render does not prevent failure",
    "Walls must continue to dry after treatment — confirm expected drying timelines with manufacturer and building pathologist before redecoration with any non-breathable finish",
  ],
  standardsNotes: [
    "WTA 2-9-04 — renovation plaster standard — primarily governs internal plasters — external renders are not classified under WTA 2-9-04 but breathability requirements are parallel",
    "AS/NZS 2311 — Guide to the Painting of Buildings — Australian painting and coating reference standard",
    "EN 998-1 — European standard for rendering and plastering mortars — referenced by European manufacturers including Parex and Remmers",
    "ICOMOS guidelines for heritage masonry — relevant for heritage building applications — confirm compatibility with Heritage NSW / relevant state body before specifying on heritage listed buildings",
  ],
  suitableDefects: [
    "External render failure on masonry walls with rising damp — spalling, delamination or salt efflorescence of existing external render",
    "Salt contamination in external render — white salt bloom or crystallisation damage to existing render on lower external wall sections",
    "Existing acrylic render applied over rising damp walls — causing moisture trapping, blistering and render failure",
  ],
  typicalSubstrates: [
    "Solid brick masonry — external face — after stripping existing contaminated render",
    "Sandstone masonry — heritage — confirm product compatibility and preparation requirements",
    "Concrete blockwork — external face — confirm mechanical key and bonding requirements",
    "Calcium silicate brick — confirm substrate preparation with manufacturer",
    "Existing cement render undercoat — confirm compatibility before applying topcoat mineral or lime render",
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
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
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
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

export function BreathableRenderIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are breathable render systems for rising damp remediation?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Breathable render systems are vapour-permeable external render products used on the external face of masonry walls undergoing or following rising damp treatment. The defining property is vapour permeability — the render must allow moisture vapour to escape from the masonry substrate as the wall dries out after DPC injection treatment, rather than trapping it beneath an impermeable film.
        </p>
        <p>
          Mineral renders (cement-based), lime renders and silicate renders are all vapour-permeable. Acrylic renders and polymer-modified renders typically have significantly lower vapour permeability and are not appropriate for use on walls still drying after rising damp treatment. Applying an acrylic render to a rising damp wall traps moisture, accelerates salt crystallisation damage at the render surface, and causes premature render failure.
        </p>
        <p>
          For external rising damp walls, the treatment sequence is: DPC injection → old external render stripped → wall begins to dry → breathable mineral or lime render applied to external face → WTA renovation plaster applied to internal face. The breathable external render system allows the wall to continue drying through both faces during the post-treatment drying period.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "WTA renovation plasters (Remmers SP, Mape-Antique) — internal plasters for rising damp walls — different product category — see the salt-resistant plaster page",
            "Acrylic or polymer-modified renders — not breathable — not appropriate for rising damp walls — will trap moisture and fail",
            "Crystalline waterproofing slurries (Xypex, Vandex Super) — positive-side active waterproofing — not a breathable render for rising damp",
            "Breathable masonry paint (Keim Granital, silicate paint) — a topcoat coating — not a render system — see the breathable paint page",
            "Textured acrylic topcoat coatings — acrylic-based — not vapour permeable — not suitable over rising damp walls",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-xs leading-5 text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
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

export function BreathableRenderProductSection() {
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
      : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, vapour permeability, standards and substrate compatibility</p>
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
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — mineral, silicate and lime breathable render systems for external masonry walls after rising damp treatment</p>
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
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
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

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Breathable render equivalents by render type. * Confirm WTA system compatibility and substrate suitability with manufacturer before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#c85000" }}>Parex</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#2d6a4f" }}>Keim</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1a5276" }}>Remmers</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.parex, row.keim, row.remmers].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning box — BELOW comparison table ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Do not apply acrylic or polymer-modified render over rising damp walls — vapour trapping causes premature failure</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Acrylic renders and polymer-modified renders have low vapour permeability — they trap moisture within the masonry wall behind the render and accelerate salt crystallisation damage at the render-masonry interface",
            "Rising damp walls drying after DPC injection need to breathe through both faces — applying an impermeable render on the external face traps moisture and prevents the wall from drying",
            "Acrylic render failure on a rising damp wall manifests as blistering, spalling and render delamination — typically occurring within 12–24 months of application",
            "Only mineral renders, lime renders or silicate renders should be applied to external masonry walls still in the drying-out phase after rising damp treatment",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
