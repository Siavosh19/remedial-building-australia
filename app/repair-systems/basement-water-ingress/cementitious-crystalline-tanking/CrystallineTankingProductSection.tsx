"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Crystalline" | "Positive-side"
  | "Negative-side" | "Cementitious"
  | "Autogenous-healing" | "AS-3600"
  | "Slurry-applied" | "Additive";

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
    fullLabel: "Xypex Australia",
    brandUrl: "https://www.xypex.com.au",
    tdsUrl: "https://www.xypex.com.au/products/xypex-concentrate",
    accentColor: "#1e40af",
    name: "Xypex Concentrate",
    descriptionLine: "Crystalline waterproofing slurry — positive and negative side application — basement walls, slabs, and water-retaining structures",
    productType: "Crystalline waterproofing slurry — positive & negative side",
    filterTags: ["Crystalline", "Positive-side", "Negative-side", "Cementitious", "Autogenous-healing", "Slurry-applied"],
    techChips: [
      { label: "Crystalline", cls: "bg-sky-100 text-sky-800" },
      { label: "Positive side", cls: "bg-slate-100 text-slate-700" },
      { label: "Negative side", cls: "bg-slate-100 text-slate-700" },
      { label: "Autogenous healing", cls: "bg-green-50 text-green-700" },
      { label: "Slurry applied", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Xypex Concentrate is a dry powder crystalline waterproofing product mixed with water to a slurry consistency and brush-applied directly to concrete surfaces — both positive side (the side the water is coming from) and negative side (the dry side, against the water pressure). The active chemicals in Xypex penetrate into the concrete capillary matrix and react with the water and unhydrated cement particles already present in the concrete to form insoluble crystalline hydrates that fill the capillaries and micro-cracks in the concrete matrix, reducing permeability to water.\n\nThe crystalline mechanism continues to grow as long as water is present — if the concrete is subsequently cracked, the crystalline growth can self-seal cracks up to approximately 0.4mm width under ongoing water pressure, a property known as autogenous healing. This makes crystalline tanking fundamentally different from membrane waterproofing: the waterproofing becomes part of the concrete rather than a layer on the surface.\n\nIn Australian Class 2 strata basement remediation, Xypex Concentrate is applied to concrete basement walls and slabs as a tanking system — either as a primary waterproofing treatment on the positive face of a new pour, or as a remedial negative-side treatment applied to the dry interior face of an existing basement wall against hydrostatic water pressure. Negative-side application is particularly relevant in strata remediation where the waterside (positive) face of the basement wall is inaccessible.\n\nXypex is confirmed available in Australia through Xypex Australia and authorised distributors. Confirm current product pricing and specification with Xypex Australia before ordering.",
    technicalProperties: [
      "Crystalline waterproofing — active chemicals penetrate concrete capillary matrix — waterproofing becomes part of concrete",
      "Suitable for positive-side and negative-side application — critical for strata basements where positive face is inaccessible",
      "Autogenous healing — crystalline growth can self-seal cracks up to approximately 0.4mm under water pressure",
      "Suitable for water-retaining structures — non-toxic — potable water contact approval from APVMA (confirm current status)",
      "Becomes permanently integrated with concrete — cannot delaminate or blister like membrane systems",
      "AS 3600 Concrete Structures — complement to structural concrete; confirm engineering approval for use in structural elements",
      "Coverage approximately 0.8 kg/m² per coat for slurry application — confirm current coverage with Xypex Australia",
    ],
    limitations: [
      "Requires sound concrete substrate — crystalline chemistry relies on unhydrated cement particles in the concrete — cannot be applied to masonry, render, or non-cementitious substrates",
      "Negative-side application against high hydrostatic pressure — must stop active running water before application — use hydraulic cement plug first",
      "Effective crack healing is limited to approximately 0.4mm — larger cracks require injection before crystalline treatment",
      "Not suitable for moving joints, control joints, or construction joints that continue to move — use polyurethane sealant or injection in moving joints",
      "Does not replace surface preparation — concrete must be cleaned, laitance removed, and surface opened by grinding or high-pressure water blasting before application",
      "Wet cure required after application — keep damp for 3 days minimum after each coat — do not allow to dry out during curing",
      "Confirm current APVMA potable water approval status with Xypex Australia before specifying for water storage tanks",
    ],
    procurementSources: [
      { name: "Xypex Australia — direct supply", url: "https://www.xypex.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Xypex Australia",
    brandUrl: "https://www.xypex.com.au",
    tdsUrl: "https://www.xypex.com.au/products/xypex-modified",
    accentColor: "#1e40af",
    name: "Xypex Modified",
    descriptionLine: "Crystalline waterproofing slurry — designed for positive-side application and as a parge coat — lower active chemical concentration than Concentrate",
    productType: "Crystalline waterproofing slurry — positive side / parge coat",
    filterTags: ["Crystalline", "Positive-side", "Cementitious", "Autogenous-healing", "Slurry-applied"],
    techChips: [
      { label: "Crystalline", cls: "bg-sky-100 text-sky-800" },
      { label: "Positive side preferred", cls: "bg-slate-100 text-slate-700" },
      { label: "Parge coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Autogenous healing", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Xypex Modified is a variant of the Xypex crystalline waterproofing system with a modified formulation — lower concentration of active crystalline chemicals than Xypex Concentrate — designed for positive-side application as an integral concrete additive or as a surface parge coat applied to the concrete surface in the early stages of construction. Modified is typically used in a two-coat system with Concentrate: Concentrate as the primary active waterproofing coat, and Modified as the second coat or parge coat that provides a more workable, smoother surface finish over the crystalline base treatment.\n\nIn Australian Class 2 strata basement remediation, Xypex Modified is used in combination with Xypex Concentrate in the full Xypex system specification — typically as the finishing coat over the Concentrate coat, or as the preferred product where the Xypex specification calls for a parge coat application to a positive-side concrete surface during construction. For negative-side remediation of an existing basement, Concentrate is the primary product and Modified may be used as a topping coat.\n\nConfirm the current two-product application specification for your specific substrate and exposure condition with Xypex Australia before specifying.",
    technicalProperties: [
      "Crystalline waterproofing — same chemical mechanism as Concentrate but lower active ingredient concentration",
      "Positive-side preferred — suitable for application to forming face of new concrete or surface parge coat in positive-side applications",
      "Integral concrete additive option — can be added to concrete mix during batching — confirm mix design with Xypex Australia",
      "Autogenous healing — self-seals cracks under water pressure in same mechanism as Concentrate",
      "Compatible with Xypex Concentrate — used as second coat or finishing coat in two-product Xypex system",
    ],
    limitations: [
      "Less concentrated than Xypex Concentrate — not preferred as sole negative-side waterproofing product — use Concentrate for negative-side remediation",
      "Same substrate requirement as Concentrate — sound concrete substrate required — not for masonry or render substrates",
      "Requires wet cure after application — same cure regime as Concentrate",
      "Not suitable for moving joints or construction joints",
      "Confirm current two-coat specification and product selection with Xypex Australia — specify according to current Xypex Application Guide",
    ],
    procurementSources: [
      { name: "Xypex Australia — direct supply", url: "https://www.xypex.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Penetron Australia",
    brandUrl: "https://www.penetron.com.au",
    tdsUrl: "https://www.penetron.com.au/products",
    accentColor: "#6b21a8",
    name: "Penetron Standard",
    descriptionLine: "Crystalline waterproofing system — positive and negative side — concrete basement walls, slabs and water-retaining structures",
    productType: "Crystalline waterproofing system — positive & negative side",
    filterTags: ["Crystalline", "Positive-side", "Negative-side", "Cementitious", "Autogenous-healing", "Slurry-applied", "AS-3600"],
    techChips: [
      { label: "Crystalline", cls: "bg-sky-100 text-sky-800" },
      { label: "Positive side", cls: "bg-slate-100 text-slate-700" },
      { label: "Negative side", cls: "bg-slate-100 text-slate-700" },
      { label: "Autogenous healing", cls: "bg-green-50 text-green-700" },
      { label: "Penetron system", cls: "bg-purple-50 text-purple-700" },
    ],
    systemDescription:
      "Penetron Standard is the primary crystalline waterproofing product in the Penetron system — a competing crystalline waterproofing system to Xypex, with a similar underlying chemistry but different formulation, marketing, and supply chain. Like Xypex Concentrate, Penetron Standard is mixed with water to a slurry consistency and brush-applied to concrete surfaces on the positive or negative side. The active crystalline chemicals penetrate the concrete capillary matrix and react to form insoluble crystalline compounds that reduce permeability and self-seal cracks under water pressure.\n\nIn Australian Class 2 strata basement remediation, Penetron Standard is used where the design consultant, engineer, or client specifies the Penetron brand rather than Xypex — either due to supply preference, contractor familiarity with the Penetron system, or where Penetron Australia has provided a technical specification or warranty for the project. Penetron Australia is confirmed to have an Australian presence and distribution network.\n\nFor product comparison purposes, Penetron Standard and Xypex Concentrate are broadly technically equivalent — both are cementitious crystalline systems with positive/negative-side capability and autogenous healing. The selection between brands is typically driven by supply chain, contractor familiarity, and which system is specified by the consulting engineer or waterproofing consultant. Confirm current product availability, pricing, and current application specification with Penetron Australia before ordering.",
    technicalProperties: [
      "Crystalline waterproofing — penetrates concrete capillary matrix — waterproofing integral to concrete",
      "Positive-side and negative-side application — same capability as Xypex Concentrate",
      "Autogenous healing — self-seals cracks under ongoing water pressure",
      "Suitable for water-retaining structures — potable water contact — confirm current approval with Penetron Australia",
      "Compatible with reinforced concrete basement structures — does not affect reinforcement or concrete structural properties",
      "Integral concrete additive option — Penetron Admix — confirm with Penetron Australia for new construction applications",
    ],
    limitations: [
      "Requires sound concrete substrate — same crystalline chemistry limitations as Xypex — not for masonry or render",
      "Active water must be stopped before negative-side application — use hydraulic cement plug first",
      "Cracks above 0.4mm width should be injected before crystalline treatment",
      "Moving joints not suitable — use injection and sealant for live construction joints",
      "Wet cure required after application — keep damp for minimum 3 days",
      "Confirm current product specification and application rates with Penetron Australia — application guides are updated periodically",
    ],
    procurementSources: [
      { name: "Penetron Australia — direct supply and technical support", url: "https://www.penetron.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Crystalline", label: "Crystalline" },
  { id: "Positive-side", label: "Positive side" },
  { id: "Negative-side", label: "Negative side" },
  { id: "Autogenous-healing", label: "Autogenous healing" },
  { id: "Cementitious", label: "Cementitious" },
  { id: "Slurry-applied", label: "Slurry applied" },
  { id: "Additive", label: "Concrete additive" },
  { id: "AS-3600", label: "AS 3600" },
];

const COMPARISON_ROWS: {
  product: string;
  brand: string;
  positiveSide: string;
  negativeSide: string;
  healing: string;
  additiveOption: string;
  potableWater: string;
  keyRestriction: string;
}[] = [
  {
    product: "Xypex Concentrate",
    brand: "Xypex",
    positiveSide: "Yes",
    negativeSide: "Yes — primary negative-side product",
    healing: "Yes — up to ~0.4mm",
    additiveOption: "Xypex C-500 Admix",
    potableWater: "APVMA — confirm current",
    keyRestriction: "Stop active water first — wet cure required",
  },
  {
    product: "Xypex Modified",
    brand: "Xypex",
    positiveSide: "Yes — preferred",
    negativeSide: "Secondary coat only",
    healing: "Yes",
    additiveOption: "Yes — integral additive option",
    potableWater: "APVMA — confirm current",
    keyRestriction: "Not the primary negative-side product — use Concentrate",
  },
  {
    product: "Penetron Standard",
    brand: "Penetron",
    positiveSide: "Yes",
    negativeSide: "Yes",
    healing: "Yes — up to ~0.4mm",
    additiveOption: "Penetron Admix",
    potableWater: "Confirm with Penetron AU",
    keyRestriction: "Stop active water first — wet cure required",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Negative-side tanking of existing basement walls — applied to dry interior face where positive face is inaccessible",
    "Positive-side tanking of new below-grade concrete walls before backfill — most effective application",
    "Basement slab waterproofing — applied to top or soffit face of slab",
    "Water-retaining structures — water storage tanks, retention basins — confirm potable water approval",
    "Construction joint treatment — applied to joint before pour — complement to polyurethane waterstop",
    "Self-healing crack maintenance — applied over repaired crack zones to provide ongoing sealing protection",
  ],
  selectionCriteria: [
    "Positive-side access available (new construction): specify Xypex Concentrate or Penetron Standard on the positive face before backfill — most effective configuration",
    "Positive-side inaccessible (existing basement, strata remediation): specify Xypex Concentrate or Penetron Standard on the negative (interior) face — stop active water first with hydraulic cement plug",
    "Xypex vs Penetron: broadly technically equivalent — select based on engineer or consultant specification, supply preference, or contractor familiarity",
    "Use Xypex Modified as second coat over Concentrate in two-coat Xypex system — do not use Modified alone for negative-side tanking",
    "Cracks above 0.4mm: inject before crystalline tanking — crystalline self-healing does not reliably seal cracks above this width",
  ],
  limitations: [
    "Cannot be applied to masonry, brick, render, or non-cementitious substrates — chemical reaction requires unhydrated cement particles in concrete",
    "Active running water must be stopped before application — apply hydraulic cement plug to discrete leak points first",
    "Cracks above 0.4mm width must be injected before crystalline treatment — crystalline alone insufficient for large cracks",
    "Moving construction joints require polyurethane sealant or injection — crystalline treatment does not accommodate joint movement",
    "Wet cure essential — drying out during cure impairs crystalline formation — mist with water and cover with hessian for minimum 3 days",
    "Not a substitute for a robust structural concrete design — thin or permeable concrete will not respond well to crystalline treatment",
  ],
  standardsNotes: [
    "AS 3600 Concrete Structures — crystalline waterproofing is a concrete protection and repair system — engineer must confirm suitability for structural elements",
    "NCC Volume One — below-grade waterproofing performance requirements — crystalline tanking must achieve the required performance outcome",
    "APVMA — Australian Pesticides and Veterinary Medicines Authority — potable water contact approval — confirm current registration with Xypex Australia and Penetron Australia",
    "BS 8102 Code of practice for protection of below ground structures against water from the ground — useful reference for negative-side tanking design philosophy",
  ],
  suitableDefects: [
    "Hydrostatic water ingress through concrete basement walls — seeping or weeping concrete without discrete cracks",
    "General moisture permeability of poorly waterproofed basement concrete",
    "Construction joint water ingress — applied over injected construction joints as secondary treatment",
    "New construction waterproofing — positive-side application before backfill in new basement construction",
  ],
  typicalSubstrates: [
    "Reinforced concrete basement walls — in-situ poured — must be sound and free of laitance",
    "Reinforced concrete slabs — basement floors and soffits",
    "Precast concrete — confirm compatibility with Xypex or Penetron Australia for specific precast mix design",
    "NOT suitable: masonry, brick, block, render, or any non-cementitious substrate",
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
              ) : <span className="font-semibold text-slate-600">{src.name}</span>}
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

export function CrystallineTankingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are crystalline tanking systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cementitious crystalline waterproofing systems are slurry-applied products that penetrate the capillary structure of concrete and react with unhydrated cement particles and water to form insoluble crystalline compounds that fill the capillaries and micro-cracks within the concrete matrix. Unlike surface-applied membrane systems — which sit on the concrete surface and can delaminate — crystalline waterproofing becomes permanently integrated with the concrete, making the concrete itself less permeable rather than covering it with a separate layer.
        </p>
        {expanded && (
          <>
            <p>
              The autogenous healing property of crystalline systems — the ability to self-seal new cracks that form after application, as long as water is present — distinguishes them from all other waterproofing approaches. This property makes crystalline systems particularly suitable for basement structures in Australian Class 2 strata apartment buildings, where post-construction structural movement and seasonal ground movement can produce new cracks in concrete after an initial membrane system has been applied. A crystalline tanking coat applied to the basement wall interior provides ongoing crack sealing protection over the life of the building, not just at the time of installation.
            </p>
            <p>
              The critical limitation is substrate requirement: crystalline chemistry relies on unhydrated cement particles in the concrete substrate to react with. It cannot be applied to masonry, brick, render, or any non-cementitious substrate and will not achieve waterproofing if the concrete substrate is contaminated, has excessive laitance, or has been sealed with a previous membrane that blocks pore entry. Surface preparation — grinding, high-pressure water blasting, or acid etching — to open the concrete pores is mandatory before application. Active running water must also be stopped with hydraulic cement plug before crystalline tanking is applied.
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

export function CrystallineTankingProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, Xypex vs Penetron selection, positive vs negative side, standards and substrates</p>
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
            <p className="mt-1 text-sm text-slate-500">3 products — 2 brands — Xypex / Penetron Australia</p>
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

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Crystalline tanking system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Xypex and Penetron are broadly technically equivalent — selection typically driven by supply chain and consultant specification.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Positive side</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Negative side</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Self-healing</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Additive option</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Potable water</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Xypex" ? "#1e40af" : "#6b21a8" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.positiveSide}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.negativeSide}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.healing}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.additiveOption}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.potableWater}</td>
                  <td className="px-4 py-3 text-slate-500">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
