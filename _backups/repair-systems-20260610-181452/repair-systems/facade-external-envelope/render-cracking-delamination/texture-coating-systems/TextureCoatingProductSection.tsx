"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Texture-coat" | "Acrylic" | "Render-finish"
  | "Concrete-masonry" | "UV-resistant" | "Spray-applied"
  | "Roller-applied" | "Water-resistant";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux / Acratex (Australia)",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/trade",
    accentColor: "#E3051B",
    name: "Dulux Acratex Roller Texture / Freestyle",
    descriptionLine: "100% acrylic texture coating — roller or spray applied — render and masonry facades — Class 2 strata facade finish coat",
    productType: "Acrylic texture coating — roller/spray",
    filterTags: ["Texture-coat", "Acrylic", "Render-finish", "Concrete-masonry", "UV-resistant", "Roller-applied", "Spray-applied", "Water-resistant"],
    techChips: [
      { label: "100% acrylic", cls: "bg-sky-100 text-sky-800" },
      { label: "Roller or spray", cls: "bg-slate-100 text-slate-700" },
      { label: "High UV resistance", cls: "bg-green-50 text-green-700" },
      { label: "Widely available", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Dulux Acratex Roller Texture and Freestyle are 100% acrylic texture coatings in the Acratex facade system range. Applied over a rendered and primed substrate, they provide a textured decorative finish coat that is the outermost weathering layer on the facade. The 100% acrylic binder provides excellent UV resistance, colour retention, water resistance, and flexibility — resisting the crack bridging of fine substrate cracks (hairline and micro-cracks) without the elastomeric elongation of a dedicated crack-bridging system.\n\nIn Australian Class 2 strata facade remediation, Acratex texture coatings are the most widely used texture finish systems — familiar to painting and remedial contractors, readily available through Dulux Trade stores, and technically supported by Dulux with system-specific primers (Acratex Primer) and application guides. The Acratex range provides a broad range of texture profiles (fine, medium, coarse) and a full colour range.\n\nConfirm current product names, recommended primer, and DFT with Dulux Trade Technical before specifying.",
    technicalProperties: [
      "100% acrylic binder — superior UV resistance and colour retention in Australian exterior exposure",
      "Roller or spray application — suits remedial contractors with either equipment",
      "Full range of texture profiles available — fine, medium, coarse — to match existing facade texture",
      "Applied over Acratex Primer — system compatibility ensured",
      "Water-resistant decorative finish — reduces moisture ingress through facade render",
      "Wide colour range — colour-matched to existing facade finish for patch repair work",
    ],
    limitations: [
      "Not a crack-bridging system — does not bridge cracks wider than hairline (approx. 0.1mm) — specify elastomeric system for larger cracks",
      "Texture matching for patch repair requires care — test panel required before full application",
      "Not suitable for application over wet or damp substrates — confirm substrate moisture content before application",
      "Minimum application temperature 10°C — do not apply in frost or rain",
      "Confirm current product name and Acratex system specification with Dulux Trade",
    ],
    procurementSources: [
      { name: "Dulux Trade stores — nationwide", url: "https://www.dulux.com.au" },
      { name: "Dulux Acratex trade supply network", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Solver Paints (Australia)",
    brandUrl: "https://www.solverpaints.com.au",
    tdsUrl: "https://www.solverpaints.com.au/products",
    accentColor: "#004B87",
    name: "Solver Texture Coat / Textone",
    descriptionLine: "Acrylic texture coating — render and masonry facade finish — spray or roller applied — Class 2 strata buildings",
    productType: "Acrylic texture coating",
    filterTags: ["Texture-coat", "Acrylic", "Render-finish", "Concrete-masonry", "UV-resistant", "Roller-applied"],
    techChips: [
      { label: "Acrylic texture", cls: "bg-sky-100 text-sky-800" },
      { label: "Roller/spray", cls: "bg-slate-100 text-slate-700" },
      { label: "Solver supply chain", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Solver Texture Coat and Textone are acrylic texture coatings in the Solver exterior coating range, used as finish coats over rendered and primed masonry and concrete facades. Solver products are widely used by painting contractors in the eastern Australian market who work within the Solver/DuluxGroup trade supply chain. The texture coatings provide a durable, water-resistant decorative finish with UV stability suited to Australian exterior exposure.\n\nIn Class 2 strata facade remediation, Solver Texture Coat is used where the painting contractor has an established Solver supply relationship and the project specification allows acrylic texture coating from the DuluxGroup system range. The Solver range provides similar technical performance to Dulux Acratex products as both are within the DuluxGroup portfolio.\n\nConfirm current product names, recommended primers, and application method with Solver/DuluxGroup Trade before specifying.",
    technicalProperties: [
      "Acrylic binder — UV-resistant decorative finish coat for exterior render",
      "Available in roller and spray application grades",
      "Compatible with Solver primer and undercoat systems",
      "Range of texture profiles to suit facade repair requirements",
      "Good water resistance — reduces surface moisture absorption",
    ],
    limitations: [
      "Not a crack-bridging system — hairline crack bridging only",
      "Texture matching for patch repair requires test panel",
      "Confirm current product name and primer compatibility with Solver/DuluxGroup Trade",
      "Do not apply in frost, rain, or below 10°C",
    ],
    procurementSources: [
      { name: "Solver Paints trade stores — eastern Australia", url: "https://www.solverpaints.com.au" },
      { name: "Dulux Trade (shared supply network)", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Rockcote (Australia)",
    brandUrl: "https://www.rockcote.com.au",
    tdsUrl: "https://www.rockcote.com.au/products",
    accentColor: "#5C4033",
    name: "Rockcote Render & Rock Texture Coatings",
    descriptionLine: "Acrylic and mineral-modified texture finish coatings — spray and trowel applied — render over concrete, masonry and EIFS substrates",
    productType: "Mineral-modified and acrylic texture coating",
    filterTags: ["Texture-coat", "Acrylic", "Render-finish", "Concrete-masonry", "UV-resistant", "Spray-applied"],
    techChips: [
      { label: "Mineral-modified options", cls: "bg-sky-100 text-sky-800" },
      { label: "Spray or trowel", cls: "bg-slate-100 text-slate-700" },
      { label: "EIFS compatible", cls: "bg-green-50 text-green-700" },
      { label: "Rockcote system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote provides a range of texture finish coatings including acrylic and mineral-based options for exterior render and facade applications. Rockcote products are commonly specified in custom residential and commercial strata projects where a higher-quality or more textured finish is required than standard roller-applied acrylic texture coatings. The Rockcote range includes spray-applied render and trowel-applied finish coats that can achieve a variety of architectural textures.\n\nIn Australian Class 2 strata remediation, Rockcote texture coatings are specified by facade consultants and remedial builders who value the texture variety and EIFS-compatible options in the Rockcote range. Rockcote also provides render systems used as the base coat in EIFS applications, providing a consistent system from adhesive mortar through to finish coat.\n\nConfirm current product names, substrate suitability, and application method with Rockcote before specifying.",
    technicalProperties: [
      "Range includes mineral-modified and 100% acrylic texture options for different aesthetic and performance requirements",
      "Spray, trowel, and roller application grades available",
      "EIFS-compatible finish coat options within the Rockcote system range",
      "Variety of texture profiles — sand, medium, coarse, stone-effect and specialty textures",
      "Good UV resistance in Australian exterior exposure",
    ],
    limitations: [
      "Specialist spray application required for some Rockcote textures — not all products are contractor roller-applied",
      "Texture matching for repair work may be difficult if original finish was a specific Rockcote texture — contact Rockcote for match advice",
      "Mineral-modified finishes may have different vapour permeability from acrylic finishes — confirm for your substrate",
      "Confirm current product name and primer requirement with Rockcote before specifying",
    ],
    procurementSources: [
      { name: "Rockcote — contact for current pricing and trade supply", url: "https://www.rockcote.com.au" },
      { name: "Rockcote trade distributors — contact Rockcote for nearest", url: "https://www.rockcote.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Texture-coat", label: "Texture coat" },
  { id: "Acrylic", label: "100% acrylic" },
  { id: "Render-finish", label: "Render finish" },
  { id: "UV-resistant", label: "UV-resistant" },
  { id: "Spray-applied", label: "Spray applied" },
  { id: "Roller-applied", label: "Roller applied" },
  { id: "Concrete-masonry", label: "Concrete/masonry" },
  { id: "Water-resistant", label: "Water-resistant" },
];

const COMPARISON_ROWS: {
  product: string; brand: string; binder: string;
  application: string; eifs: string; keyFeature: string;
}[] = [
  { product: "Acratex Roller Texture", brand: "Dulux", binder: "100% acrylic", application: "Roller or spray", eifs: "Yes", keyFeature: "Most widely available — full Dulux system support" },
  { product: "Solver Texture Coat", brand: "Solver", binder: "Acrylic", application: "Roller or spray", eifs: "Confirm with Solver", keyFeature: "Solver/DuluxGroup supply chain" },
  { product: "Rockcote Texture Range", brand: "Rockcote", binder: "Acrylic/mineral", application: "Spray or trowel", eifs: "System-compatible options", keyFeature: "Specialty textures and EIFS system integration" },
];

const TECH_INFO = {
  typicalApplications: [
    "Finish coat over repaired and re-rendered facade panels — applied after render is cured and primed",
    "Texture coat over new render where existing textured finish needs to be matched for patch repair",
    "Full facade recoat over sound existing texture coat — preparation, prime, and re-texture",
    "Applied over bonded EIFS render base coat as the decorative finish",
    "Finish coat over repaired concrete spandrels, columns, and wall panels after concrete repair and render reinstatement",
  ],
  selectionCriteria: [
    "Dulux Acratex: first choice for most strata facade texture coat — widest availability and contractor familiarity",
    "Solver: use where painting contractor works within Solver/DuluxGroup supply chain — equivalent performance to Acratex",
    "Rockcote: for specialist texture requirements — EIFS system-integrated options or architectural texture finishes",
    "All systems: texture matching for patch repair requires test panel before committing to full application — confirm colour and texture profile",
    "Confirm system primer compatibility — texture coats must be applied over the manufacturer's recommended primer",
  ],
  limitations: [
    "Texture coatings are not crack-bridging systems — do not specify as a repair for cracked render without addressing underlying crack cause",
    "Texture matching is rarely exact on aged facades — colour variation is expected between repaired areas and existing finish",
    "All texture coatings require the substrate to be sound, clean, and primed — do not apply over damp, contaminated, or friable surfaces",
    "Spray application requires windless conditions — overspray control is critical on strata buildings with occupied units",
    "Minimum cure time before overcoating with topcoat paint — confirm with manufacturer",
  ],
  standardsNotes: [
    "No Australian Standard specifically governs acrylic texture coatings — manufacturer TDS governs application requirements",
    "AS 4548 — Guide to long-term durability requirements for materials used in waterproofing of roofs — referenced for coating durability context",
    "NCC — performance requirements for external walls — texture coatings must contribute to weatherproofing performance",
    "Manufacturer current TDS — governs DFT, primer, application method, and recoat interval",
  ],
  suitableDefects: [
    "Faded, chalked, or deteriorated existing texture coat requiring replacement",
    "New render requiring texture finish coat — applied after render achieves specified cure time",
    "Patch-repaired areas requiring texture to match surrounding facade finish",
    "Full facade repaint where existing texture is sound but requires a fresh decorative finish",
  ],
  typicalSubstrates: [
    "Polymer-modified render (cured) — most common substrate for texture coat in strata remediation",
    "Concrete (smooth or sand-faced) — texture coat applied over suitable primer",
    "EIFS base coat (cured) — texture coat as finish layer of EIFS system",
    "Masonry block or brick (primed) — texture coat applied over masonry sealer/primer",
  ],
};

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
      {items.length > limit && (<button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Show less ↑" : `+${extra} more ↓`}</button>)}
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
      {expanded && (<div className="mt-2 space-y-1.5">{sources.map((src) => (<div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">{src.url ? (<a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a>) : <span className="font-semibold text-slate-600">{src.name}</span>}</div>))}</div>)}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && (<div className="mt-2 flex flex-wrap gap-1.5">{chips.map((chip) => (<span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>))}</div>)}</>)}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
    </div>
  );
}

export function TextureCoatingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are texture coating systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Texture coatings are acrylic or mineral-modified decorative finish coats applied over rendered and primed concrete and masonry facades. They provide the outermost weathering layer — combining decorative texture, UV resistance, water resistance, and limited crack-bridging capacity in a single application. Texture coatings are applied over a sound render substrate and appropriate primer to form the visible finish of the facade system.</p>
        {expanded && (<><p>In Australian Class 2 strata facade remediation, texture coatings are applied as the final step of a render repair or re-render programme — after the substrate has been prepared, cracked or failed render has been removed and replaced, bonding primer has been applied to the render, and the texture coat is spray or roller-applied to the primed surface. The texture profile (fine, medium, coarse) must match the existing surrounding facade finish to achieve an acceptable cosmetic result in partial repair work.</p><p>Texture coatings are not crack-bridging systems — they provide limited bridging of hairline (sub-0.1mm) cracks only. For facades with active cracking or crack widths greater than hairline, an elastomeric coating system must be specified, not a texture coat.</p></>)}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
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

export function TextureCoatingProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => { setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, product selection, texture matching, limitations, standards and substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Product Selection" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — Dulux Acratex / Solver / Rockcote</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => { const active = activeFilters.has(f.id); return (<button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>); })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more</span>
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
                  <div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p><CollapsibleList items={product.technicalProperties} icon="check" limit={3} /></div>
                  <div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p><CollapsibleList items={product.limitations} icon="x" limit={3} /></div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3"><CollapsibleSources sources={product.procurementSources} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Texture coating system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">All systems require primer over render — texture matching needs test panel. Confirm current product names with manufacturers.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Binder</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">EIFS suitable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Dulux" ? "#E3051B" : row.brand === "Solver" ? "#004B87" : "#5C4033" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.binder}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.eifs}</td>
                  <td className="px-4 py-3 text-slate-500">{row.keyFeature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
