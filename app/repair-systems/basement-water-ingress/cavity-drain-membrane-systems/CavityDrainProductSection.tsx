"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Cavity-drain" | "Wall-membrane"
  | "Floor-membrane" | "HDPE-dimple"
  | "BS-8102" | "Passive-drainage"
  | "Grade-3" | "Grade-2";

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
    fullLabel: "Dorken (Delta Membranes)",
    brandUrl: "https://www.delta-waterproofing.com.au",
    tdsUrl: "https://www.delta-waterproofing.com.au/products/delta-ms",
    accentColor: "#0f766e",
    name: "Delta MS",
    descriptionLine: "HDPE dimple cavity drain wall membrane — passive management of basement water ingress — Class 2–3 below-grade applications",
    productType: "HDPE dimple cavity drain wall membrane",
    filterTags: ["Cavity-drain", "Wall-membrane", "HDPE-dimple", "BS-8102", "Passive-drainage", "Grade-2", "Grade-3"],
    techChips: [
      { label: "HDPE dimple", cls: "bg-sky-100 text-sky-800" },
      { label: "Wall membrane", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm — dimple height (wall)", cls: "bg-slate-100 text-slate-700" },
      { label: "Passive drainage", cls: "bg-green-50 text-green-700" },
      { label: "BS 8102", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Delta MS is the primary Dorken cavity drain dimple membrane used for wall waterproofing in below-grade basement applications. It is an HDPE (high-density polyethylene) sheet membrane formed with a regular pattern of truncated dimples — the dimple projections stand off from the substrate, creating an air and drainage cavity between the membrane and the wall face. Water that penetrates the structural wall is intercepted by the membrane, channels down through the cavity formed by the dimples, and drains to a perimeter channel system at the base of the wall, which routes water to a sump pump pit for active discharge.\n\nIn Australian Class 2 strata basement remediation, the Delta MS cavity drain system is specified where tanking or injection systems are impractical — particularly in existing basements with complex wall geometry, multiple service penetrations, or substrates not suitable for crystalline or cementitious waterproofing. Cavity drain is a water management approach rather than a waterproofing approach: it accepts that water will continue to enter through the wall and manages the water flow so it does not affect the habitable space behind.\n\nDelta MS is installed with a capping strip at the top to retain the cavity air gap, and sealed at penetrations and corners with purpose-made fittings. The membrane system requires a perimeter drainage channel at the base and a sump pump for complete cavity drain functionality. The cavity drain system should be designed to BS 8102 Grade 3 performance (habitable space) for occupied basement remediation.\n\nConfirm current Australian distributor, product pricing, and available accessories with Dorken (Delta Waterproofing Australia) before ordering.",
    technicalProperties: [
      "HDPE dimple membrane — chemical resistant — unaffected by ground sulphates and aggressive groundwater",
      "Passive drainage cavity — intercepts water penetrating the wall and channels to perimeter drainage — no adhesion to substrate required",
      "UV stabilised — suitable for temporary exposed installation during construction",
      "Puncture and tear resistant — suitable for installation in below-grade conditions",
      "Lightweight — approximately 0.48 kg/m² — easy handling and installation",
      "Compatible with Delta perimeter drainage channel, corner fittings, and capping strip — complete accessory range available",
      "BS 8102 Grade 2 and Grade 3 performance — confirm classification with current Dorken system specification",
    ],
    limitations: [
      "Water management approach — water continues to penetrate the structural wall — cavity drain does not stop ingress, it manages the water flow",
      "Requires functioning sump pump system — if pump fails, cavity fills and water enters habitable space — backup pump strongly recommended",
      "Not suitable where the hydrostatic head exceeds the cavity drain system design capacity — hydraulic calculation required for high-water-table sites",
      "Must be combined with perimeter drainage channel and sump pump — membrane alone cannot collect and discharge water",
      "Cavity must remain unblocked — building finishes (render, plasterboard) must leave membrane cavity open — furring/stud wall system required",
      "Not suitable for positive-side application — cavity drain membranes are always installed on the interior (dry side) face",
      "Confirm current Australian distributor and product availability with Dorken before specifying — product range and accessories differ between markets",
    ],
    procurementSources: [
      { name: "Dorken / Delta Waterproofing Australia — contact for current distributor", url: "https://www.delta-waterproofing.com.au" },
      { name: "Waterproofing Direct (WPD Group)", url: "https://www.wpdgroup.com.au" },
      { name: "Confirm local availability with specialist basement waterproofing contractors", url: "https://www.delta-waterproofing.com.au" },
    ],
  },
  {
    fullLabel: "Dorken (Delta Membranes)",
    brandUrl: "https://www.delta-waterproofing.com.au",
    accentColor: "#0f766e",
    name: "Delta MS 20",
    descriptionLine: "Heavy-duty HDPE dimple cavity drain membrane — 20mm dimple height — high water pressure and podium slab applications",
    productType: "Heavy-duty HDPE dimple cavity drain membrane — 20mm dimple",
    filterTags: ["Cavity-drain", "Wall-membrane", "Floor-membrane", "HDPE-dimple", "BS-8102", "Passive-drainage", "Grade-3"],
    techChips: [
      { label: "HDPE dimple — 20mm", cls: "bg-sky-100 text-sky-800" },
      { label: "Wall and floor", cls: "bg-slate-100 text-slate-700" },
      { label: "High water pressure", cls: "bg-slate-100 text-slate-700" },
      { label: "Passive drainage", cls: "bg-green-50 text-green-700" },
      { label: "BS 8102 Grade 3", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Delta MS 20 is the heavy-duty variant of the Delta dimple membrane range, distinguished from Delta MS by its taller 20mm dimple height (versus TODO: owner confirm — standard Delta MS wall membrane dimple height — internal values conflict; verify with Dorken) and heavier gauge HDPE construction. The taller dimple creates a larger drainage cavity — providing greater drainage capacity for higher-volume water ingress, and producing a more robust stand-off from the wall face suitable for applications with higher hydrostatic water pressure behind the membrane.\n\nIn Australian below-grade remediation, Delta MS 20 is used where the hydrostatic pressure or volume of water ingress exceeds the capacity of the standard Delta MS system — typically for basement walls in sites with high groundwater tables, for podium slab undersides where water accumulation could be significant, or for basement floor slab applications where a drainage mat with high compression resistance is required under a structural floor topping. The larger drainage cavity also provides improved drainage performance in granular backfill scenarios where the membrane is installed on the exterior positive face.\n\nConfirm current Australian distributor, dimple height specification, and system design with Dorken before specifying. Not all Delta MS 20 accessories are the same as Delta MS — confirm fitting compatibility with Dorken.",
    technicalProperties: [
      "HDPE — heavy gauge — higher compression resistance than standard Delta MS",
      "20mm dimple height — large drainage cavity — suitable for high water pressure and high flow conditions",
      "Wall and floor applications — suitable for vertical (wall) and horizontal (floor) installation",
      "Chemical resistant — suitable for aggressive groundwater and sulphate-bearing soils",
      "Compatible with Delta channel, sump, and accessory range — confirm fitting compatibility",
      "BS 8102 Grade 3 performance — habitable space — confirm with current Dorken system specification",
    ],
    limitations: [
      "Same water management limitation as standard Delta MS — does not stop water ingress, manages water flow",
      "Sump pump required — drainage cavity must discharge actively",
      "Backup sump pump strongly recommended — single pump failure results in cavity flood",
      "Taller dimple height requires furring/stud wall system to be set out further from the structural wall — reduces habitable space",
      "Not suitable as a standalone waterproofing system — requires complete drainage and sump system design",
      "Confirm current Australian availability and pricing with Dorken / Delta Waterproofing Australia",
    ],
    procurementSources: [
      { name: "Dorken / Delta Waterproofing Australia — contact for current distributor", url: "https://www.delta-waterproofing.com.au" },
      { name: "Confirm local availability with specialist basement waterproofing contractors", url: "https://www.delta-waterproofing.com.au" },
    ],
  },
  {
    fullLabel: "Dorken (Delta Membranes)",
    brandUrl: "https://www.delta-waterproofing.com.au",
    accentColor: "#0f766e",
    name: "Delta Geo-Drain",
    descriptionLine: "Composite drainage mat — floor drainage layer — basement slab drainage under concrete topping — combined membrane and drainage function",
    productType: "Composite drainage mat — floor application",
    filterTags: ["Cavity-drain", "Floor-membrane", "HDPE-dimple", "BS-8102", "Passive-drainage", "Grade-2"],
    techChips: [
      { label: "Floor drainage mat", cls: "bg-sky-100 text-sky-800" },
      { label: "Composite geotextile", cls: "bg-slate-100 text-slate-700" },
      { label: "Under topping slab", cls: "bg-slate-100 text-slate-700" },
      { label: "Passive drainage", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Delta Geo-Drain is a composite drainage mat combining an HDPE dimple membrane with a bonded geotextile filter layer on the upper face. The geotextile layer filters fine particles from the water entering the drainage cavity, preventing sediment blockage of the drainage core over time — a critical function for floor drainage mats that will be buried under a structural concrete topping slab or screed where re-access for cleaning is impossible.\n\nIn Australian Class 2 strata basement remediation, Delta Geo-Drain is used as the floor component of a complete Delta cavity drain system, installed over the structural basement floor slab before the concrete topping or screed is poured. Water that has seeped through the structural slab is captured by the drainage mat, filtered by the geotextile, and routed to the perimeter channel and sump at the base of the wall cavity drain system. The composite drainage mat eliminates the need for a granular filter layer above the drainage mat, reducing the slab build-up height and allowing the floor void to be minimised.\n\nConfirm current product specification and topping slab design requirements with Dorken before ordering. The concrete topping slab must be designed to span the drainage mat without point-loading the dimple core at a level that causes dimple collapse — structural engineer to confirm slab design.",
    technicalProperties: [
      "Composite HDPE dimple core with bonded geotextile filter — prevents sediment blockage of drainage cavity",
      "Floor drainage application — designed to support concrete topping slab or screed above",
      "Filters fine particles from drainage water — maintains long-term drainage performance under buried topping",
      "Compatible with Delta wall membrane and channel system — part of complete cavity drain system",
      "Lightweight — straightforward installation before concrete pour",
    ],
    limitations: [
      "Part of a system — cannot function alone without wall membrane, perimeter channel, and sump pump",
      "Concrete topping slab must be structurally designed to span dimple cavity — confirm with structural engineer",
      "Not accessible after concrete pour — any blockage or failure requires topping slab removal to rectify — system must be correctly designed and installed at time of pour",
      "Sump pump failure results in drainage cavity flooding under the floor — backup pump is essential",
      "Confirm current Australian product availability and pricing with Dorken before ordering",
    ],
    procurementSources: [
      { name: "Dorken / Delta Waterproofing Australia — contact for current distributor", url: "https://www.delta-waterproofing.com.au" },
      { name: "Confirm local availability with specialist basement waterproofing contractors", url: "https://www.delta-waterproofing.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Cavity-drain", label: "Cavity drain" },
  { id: "Wall-membrane", label: "Wall membrane" },
  { id: "Floor-membrane", label: "Floor membrane" },
  { id: "HDPE-dimple", label: "HDPE dimple" },
  { id: "Passive-drainage", label: "Passive drainage" },
  { id: "BS-8102", label: "BS 8102" },
  { id: "Grade-2", label: "Grade 2" },
  { id: "Grade-3", label: "Grade 3" },
];

const COMPARISON_ROWS: {
  product: string;
  brand: string;
  application: string;
  dimpleHeight: string;
  geotextile: string;
  grade: string;
  keyRestriction: string;
}[] = [
  {
    product: "Delta MS",
    brand: "Dorken",
    application: "Wall — vertical",
    dimpleHeight: "~2mm (wall profile)",
    geotextile: "No",
    grade: "Grade 2–3",
    keyRestriction: "Sump pump required — water management only",
  },
  {
    product: "Delta MS 20",
    brand: "Dorken",
    application: "Wall and floor",
    dimpleHeight: "20mm",
    geotextile: "No",
    grade: "Grade 3",
    keyRestriction: "High water pressure — engineering design required",
  },
  {
    product: "Delta Geo-Drain",
    brand: "Dorken",
    application: "Floor — under topping slab",
    dimpleHeight: "Confirm with Dorken",
    geotextile: "Yes — composite",
    grade: "Grade 2",
    keyRestriction: "Buried — must be correctly designed before concrete pour",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Basement wall water management — intercept and drain water penetrating structural walls in Class 2 strata basements",
    "Basement floor water management — manage water penetrating the structural floor slab in occupied below-grade spaces",
    "Occupied basement remediation where positive-side access is unavailable — cavity drain is the interior solution",
    "High water table sites where tanking or injection is impractical due to continuous hydrostatic pressure",
    "Basement conversions — converting existing unoccupied basement or car park to Grade 3 habitable space",
    "Below-grade car park water management — Grade 1 or Grade 2 performance for non-habitable below-grade spaces",
  ],
  selectionCriteria: [
    "Habitable space (Grade 3): specify complete Delta system — wall membrane (Delta MS or MS 20), perimeter channel, floor drainage mat (Delta Geo-Drain), and active sump pump with backup",
    "Non-habitable below-grade space (Grade 1–2): cavity drain may be simplified — confirm with BS 8102 Grade table",
    "Delta MS (standard): for wall applications where hydrostatic pressure is moderate",
    "Delta MS 20 (heavy duty): for high water pressure, high groundwater table, or floor applications in high-flow conditions",
    "Delta Geo-Drain: always specify for floor applications under concrete topping — provides geotextile filtration to prevent long-term blockage",
    "Always design the complete system with perimeter drainage channel and sump — membrane alone is not a functioning cavity drain system",
  ],
  limitations: [
    "Cavity drain is water management — NOT waterproofing — water continues to enter through the wall and is managed, not stopped",
    "Sump pump failure results in cavity flooding and water entering habitable space — backup pump and alarm mandatory for Grade 3 applications",
    "Loss of habitable space — cavity drain system, furring wall and drainage channel system reduces basement floor area and headroom",
    "Ongoing maintenance obligation — sump pump, float switch, and drainage channels require periodic inspection and maintenance — strata maintenance plan required",
    "Not appropriate for Grade 3 habitable space without backup pump and overflow provision — single pump failure is unacceptable risk for occupied basement",
    "Not a structural repair — cavity drain does not address the cause of water ingress — structural assessment and cause investigation required",
  ],
  standardsNotes: [
    "BS 8102:2022 Code of practice for protection of below-ground structures against water from the ground — primary design reference for cavity drain systems",
    "BS 8102 Grade 1 (basic utility), Grade 2 (better utility), Grade 3 (habitable space — no water percolation) — specify performance grade before selecting system",
    "AS 3600 Concrete Structures — structural engineer to confirm floor slab design over drainage mat",
    "NCC Volume One — habitability requirements for below-grade spaces in Class 2 buildings — Grade 3 performance typically required for occupied basement",
    "Confirm applicable Australian standard or reference document with the design engineer — BS 8102 is widely referenced in Australia but is a British Standard",
  ],
  suitableDefects: [
    "Persistent water ingress through basement walls where injection and tanking have failed or are impractical",
    "Basement conversion — converting existing garaging or storage below-grade to habitable Class 2 space",
    "High water table — continuous hydrostatic pressure exceeds practical tanking capacity — cavity drain manages the ongoing water flow",
    "Complex basement geometry — many penetrations and changes of direction make membrane tanking impractical — cavity drain accommodates complexity",
  ],
  typicalSubstrates: [
    "Reinforced concrete basement walls — installed on interior face — no adhesion to substrate — dimple projection provides stand-off",
    "Masonry or brick basement walls — cavity drain is the preferred system for masonry basements where crystalline tanking is not applicable",
    "Reinforced concrete basement floor slabs — floor drainage mat installed over structural slab before topping",
    "Mixed substrate basement — cavity drain suits basements with concrete walls and masonry areas combined",
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

export function CavityDrainIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are cavity drain membrane systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cavity drain membrane systems are a water management approach to basement waterproofing — not a waterproofing approach. Rather than attempting to stop water from entering through the structural wall, a cavity drain system accepts that water will penetrate, intercepts it on the interior face using a dimple HDPE membrane, and channels the water down through the dimple cavity to a perimeter drainage channel and then to a sump pump for active discharge. The result is a dry interior space without the water ever reaching the habitable zone, even though it continues to move through the structural wall.
        </p>
        {expanded && (
          <>
            <p>
              This approach is fundamentally different from tanking (crystalline, cementitious, or membrane systems) which attempts to resist water entry at the wall surface. Cavity drain is preferred in specific circumstances: where the structural wall is complex, heavily penetrated, or of a substrate type (masonry, brick) where tanking is impractical; where the hydrostatic pressure is very high and continuous, making tanking design conservative and expensive; or where existing tanking systems have failed and re-tanking is impractical without full strip-out.
            </p>
            <p>
              In Australian Class 2 strata apartment building basement remediation, cavity drain is a less common approach than in the UK (where it originated and where BS 8102 is the primary design code), but it is used in specific situations — particularly for basement conversions where positive-side access is unavailable and the hydrostatic conditions make injection or crystalline tanking impractical. The complete system requires Delta MS wall membrane, Delta Geo-Drain floor mat, perimeter drainage channel (typically Safetrak or equivalent), a sump pit liner, and at minimum two sump pumps — primary and backup — with high-water alarm. The backup pump and alarm are not optional for Grade 3 (habitable space) applications.
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

export function CavityDrainProductSection() {
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
            <p className="mt-0.5 text-xs text-slate-500">Applications, product selection, BS 8102 grades, sump design, limitations and substrates</p>
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
            <p className="mt-1 text-sm text-slate-500">3 products — 1 brand — Dorken Delta Membranes — scroll to view all</p>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Cavity drain membrane system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">All Delta (Dorken) products — confirm current Australian distributor and availability before ordering.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Dimple height</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Geotextile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">BS 8102 grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: "#0f766e" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.dimpleHeight}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.geotextile}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-500">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Important — Complete System Required</p>
          <p className="text-xs leading-6 text-amber-900">Delta membrane products listed above are components of a complete cavity drain system — they do not function independently. A functioning cavity drain system requires: wall membrane (Delta MS or MS 20) + floor drainage mat (Delta Geo-Drain) + perimeter drainage channel + sump pit liner + primary sump pump + backup sump pump + high-water alarm. Design the complete system to BS 8102 and confirm system performance grade with a qualified waterproofing engineer before specifying.</p>
        </div>
      </div>
    </>
  );
}
