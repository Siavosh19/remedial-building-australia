"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Hydraulic-cement" | "Active-water"
  | "Fast-set" | "Plug"
  | "Running-water" | "Below-grade"
  | "Cementitious" | "AS-3972";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/solutions-products/product-finder.html",
    accentColor: "#cc0000",
    name: "Sika Plug",
    descriptionLine: "Rapid-setting hydraulic cementitious mortar — physically plugs active running water leaks — basement walls, slabs and pipe penetrations",
    productType: "Rapid-setting hydraulic cement plug",
    filterTags: ["Hydraulic-cement", "Active-water", "Fast-set", "Plug", "Running-water", "Below-grade", "Cementitious"],
    techChips: [
      { label: "Hydraulic cement", cls: "bg-sky-100 text-sky-800" },
      { label: "Active running water", cls: "bg-slate-100 text-slate-700" },
      { label: "1–3 min working time", cls: "bg-slate-100 text-slate-700" },
      { label: "No water needed to set", cls: "bg-green-50 text-green-700" },
      { label: "Cementitious", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Plug is a rapid-setting hydraulic cement mortar designed to physically stop active water ingress through basement walls, slabs, cold joints, and pipe penetrations where water is actively running or gushing at the time of repair. The product is mixed to a stiff putty consistency with a small amount of water, formed into a cone or plug shape by hand, and pressed firmly into the leak point with sustained hand pressure for 1–3 minutes until the hydraulic setting reaction produces enough strength to resist the water pressure and the plug sets hard in position.\n\nSika Plug does not require a dry substrate — the water flow itself does not prevent the hydraulic setting reaction. This is the critical distinction between hydraulic cement plugging and conventional cement-based repairs: conventional mortars require dry or damp substrates and lose adhesion and strength if applied against running water, while hydraulic cements are specifically formulated to set and harden even under active water flow.\n\nIn Australian Class 2 strata basement remediation, Sika Plug is used as the first step in a multi-stage repair when water is actively entering the basement — the plug stops the immediate water flow, allowing subsequent injection, tanking, or cavity drain systems to be installed in dry or damp conditions. Sika Plug is confirmed in the Sika Australia product range and available through trade supply. Confirm current product name, working time, and substrate preparation requirements with Sika Australia before specifying.",
    technicalProperties: [
      "Rapid-setting hydraulic cement — sets and hardens against active running water — no dry substrate required",
      "Working time 1–3 minutes (temperature-dependent) — mix and apply quickly",
      "Compressive strength increases rapidly after initial set — allows subsequent repair work over plugged area within hours",
      "Suitable for concrete, masonry, and brick basement walls and slabs",
      "No mixing equipment required — hand-mixed to putty consistency",
      "Expands slightly on setting — mechanical keying into substrate assists water resistance",
      "Can be overcoated with crystalline tanking slurry, cementitious render, or waterproof mortar after cure",
    ],
    limitations: [
      "Working time very short (1–3 min) — do not mix more product than can be applied and held in position in one operation",
      "Must be held firmly against leak point under sustained hand pressure until set — inadequate pressure during set results in plug failure",
      "Not suitable for large voids or high-velocity gushing water — pre-form the void into a clean conical shape before plugging",
      "Plugging is a temporary repair — the underlying water pathway (crack, joint, or penetration) must be permanently sealed with injection or tanking system after plugging",
      "Do not apply in ambient temperatures below 5°C — hydraulic setting reaction slows significantly in cold conditions",
      "Not a structural repair — does not restore concrete integrity",
      "Confirm current working time and mix ratio with Sika Australia before site application — formulations vary by product batch and temperature",
    ],
    procurementSources: [
      { name: "Sika Australia — contact for current pricing and trade supply", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Tradelink (trade plumbing/building supply)", url: "https://www.tradelink.com.au" },
      { name: "Haymes Paint / trade suppliers", url: "https://www.haymes.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc Australia",
    brandUrl: "https://www.fosroc.com/en-au",
    tdsUrl: "https://www.fosroc.com/en-au/products",
    accentColor: "#007A33",
    name: "Fosroc Renderoc Plug",
    descriptionLine: "Rapid-setting hydraulic cement plugging compound — stops active water flow — concrete and masonry basement walls and slabs",
    productType: "Rapid-setting hydraulic cement plug",
    filterTags: ["Hydraulic-cement", "Active-water", "Fast-set", "Plug", "Running-water", "Below-grade", "Cementitious"],
    techChips: [
      { label: "Hydraulic cement", cls: "bg-sky-100 text-sky-800" },
      { label: "Active water", cls: "bg-slate-100 text-slate-700" },
      { label: "Fast set", cls: "bg-slate-100 text-slate-700" },
      { label: "Hand-applied", cls: "bg-green-50 text-green-700" },
      { label: "Cementitious", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Renderoc Plug is the Fosroc hydraulic cement plug product, equivalent in function to Sika Plug but from the Fosroc Renderoc range of concrete repair products. It is a single-component, dry powder product mixed with water to a stiff putty consistency and applied by hand to stop active water ingress through cracks, joints, and penetrations in concrete and masonry basement walls and slabs. Like all hydraulic cement plugging compounds, it sets against active water flow without requiring a dry substrate — the hydraulic setting reaction proceeds in the presence of water, generating rapid strength gain and filling the void under applied hand pressure.\n\nIn Australian Class 2 strata basement remediation, Fosroc Renderoc Plug is typically used by contractors who work within the Fosroc supply ecosystem and have an established account with Fosroc Australia or Parchem. The product selection between Renderoc Plug and Sika Plug is generally driven by supply chain preference and contractor familiarity rather than significant technical differentiation — both achieve the same hydraulic cement plug function.\n\nFosroc Renderoc Plug is confirmed in the Fosroc Australia product range. Confirm current product name, working time, and availability with Fosroc Australia or Parchem before specifying.",
    technicalProperties: [
      "Single-component hydraulic cement — mix with water only — no specialist equipment required",
      "Rapid set against active running water — no dry substrate required",
      "Sets hard within minutes of application — allows subsequent repair work in the area",
      "Suitable for concrete and masonry basement walls, slabs, and pipe penetrations",
      "Expands slightly on setting — assists mechanical keying in void",
      "Can be overcoated after cure with cementitious tanking, crystalline slurry, or injection system",
    ],
    limitations: [
      "Very short working time — mix and apply immediately — do not prepare more than one plug at a time",
      "Must be held under sustained hand pressure until initial set — premature release causes plug failure",
      "Pre-form a clean conical or dovetail void before plugging — applying to an irregular or crumbling void surface reduces effectiveness",
      "Hydraulic plugging is a temporary repair — permanent sealing requires subsequent injection or tanking system",
      "Do not apply below 5°C without Fosroc technical approval",
      "Confirm current product name, formulation, and working time with Fosroc Australia or Parchem before site application",
    ],
    procurementSources: [
      { name: "Fosroc Australia — contact for current pricing and trade supply", url: "https://www.fosroc.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Master Builders Solutions (BASF)",
    brandUrl: "https://www.master-builders-solutions.com/en-au",
    tdsUrl: "https://www.master-builders-solutions.com/en-au/products",
    accentColor: "#003591",
    name: "BASF MasterEmaco S 488",
    descriptionLine: "Rapid-setting hydraulic cementitious repair mortar — stops active water ingress — basement structures and below-grade concrete",
    productType: "Rapid-setting hydraulic repair mortar",
    filterTags: ["Hydraulic-cement", "Active-water", "Fast-set", "Plug", "Below-grade", "Cementitious", "AS-3972"],
    techChips: [
      { label: "Hydraulic cement", cls: "bg-sky-100 text-sky-800" },
      { label: "Active water capable", cls: "bg-slate-100 text-slate-700" },
      { label: "Rapid set", cls: "bg-slate-100 text-slate-700" },
      { label: "Cementitious", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "BASF MasterEmaco S 488 is a rapid-setting, single-component cementitious repair mortar in the Master Builders Solutions MasterEmaco range, formulated to achieve high early strength and suitable for application in wet conditions including against active water seepage. While MasterEmaco S 488 is primarily a structural repair mortar for concrete rehabilitation, its rapid-setting hydraulic chemistry and wet-substrate capability make it suitable for plugging active water leaks in below-grade concrete structures when applied at a stiff consistency.\n\nMasterEmaco S 488 is the BASF equivalent used by contractors working within the BASF Master Builders Solutions supply ecosystem when a hydraulic cement plug product is required. For active running water with a strong flow, the dedicated plugging products (Sika Plug or Fosroc Renderoc Plug) may be preferred due to their shorter working time and higher early resistance to water pressure — confirm suitability of MasterEmaco S 488 for the specific active water flow rate with BASF Australia before specifying as a primary plugging product.\n\nConfirm current product name, formulation, and suitability with Master Builders Solutions Australia before ordering.",
    technicalProperties: [
      "Rapid-setting cementitious mortar — high early strength gain — suitable for wet substrates",
      "Single-component — mix with water — no specialist equipment required",
      "Suitable for concrete and masonry substrates in wet conditions",
      "Good adhesion to damp and wet concrete",
      "Can be overcoated after cure with cementitious systems, injection, or tanking",
      "AS 3972 — General purpose and blended cements — confirm current compliance with BASF Australia",
    ],
    limitations: [
      "Primarily a structural repair mortar — dedicated hydraulic plug products (Sika Plug, Renderoc Plug) may be more appropriate for strong active water flow",
      "Confirm suitability for active running water application with BASF Australia — MasterEmaco S 488 is primarily specified for damp or wet substrate repair, not specifically for plugging strong flow",
      "Not structural in the sense of plug geometry — engineer must confirm structural adequacy",
      "Confirm current product name with BASF Australia — BASF product names have changed with the Master Builders Solutions rebranding",
      "Do not apply below 5°C without BASF technical approval",
    ],
    procurementSources: [
      { name: "Master Builders Solutions Australia — contact for current pricing", url: "https://www.master-builders-solutions.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Hydraulic-cement", label: "Hydraulic cement" },
  { id: "Active-water", label: "Active water" },
  { id: "Running-water", label: "Running water" },
  { id: "Fast-set", label: "Fast set" },
  { id: "Plug", label: "Plug application" },
  { id: "Below-grade", label: "Below grade" },
  { id: "Cementitious", label: "Cementitious" },
  { id: "AS-3972", label: "AS 3972" },
];

const COMPARISON_ROWS: {
  product: string;
  brand: string;
  type: string;
  workingTime: string;
  activeFlow: string;
  structural: string;
  keyRestriction: string;
}[] = [
  {
    product: "Sika Plug",
    brand: "Sika",
    type: "Hydraulic cement plug",
    workingTime: "1–3 min",
    activeFlow: "Yes — running water",
    structural: "No",
    keyRestriction: "Hold under pressure until set — very short working time",
  },
  {
    product: "Renderoc Plug",
    brand: "Fosroc",
    type: "Hydraulic cement plug",
    workingTime: "1–3 min",
    activeFlow: "Yes — running water",
    structural: "No",
    keyRestriction: "Temporary only — permanent repair required after plug",
  },
  {
    product: "MasterEmaco S 488",
    brand: "BASF",
    type: "Rapid-set repair mortar",
    workingTime: "Rapid (confirm with BASF)",
    activeFlow: "Yes — seepage (confirm for strong flow)",
    structural: "Yes (repair mortar)",
    keyRestriction: "Confirm strong-flow suitability with BASF AU",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Actively leaking cracks in basement walls — water running through crack at time of repair",
    "Construction joint active leaks — horizontal construction joint between wall and slab pour showing active flow",
    "Pipe penetration annular leaks — water running around service pipes through basement walls",
    "Tie rod hole leaks — water gushing through form tie rod voids in concrete walls",
    "First-stage repair before injection or tanking — plugging stops the flow to allow subsequent dry-condition repair work",
  ],
  selectionCriteria: [
    "Sika Plug: first-choice dedicated hydraulic plug product — very short working time — confirmed for running water",
    "Fosroc Renderoc Plug: equivalent function to Sika Plug — select based on supply chain preference",
    "BASF MasterEmaco S 488: suitable where BASF is preferred supply chain — confirm suitability for strong active flow with BASF AU",
    "After plugging: follow with PU injection, acrylic injection, or crystalline tanking depending on defect type and water pressure",
    "For multiple active leaks: stage the work — plug each leak in sequence, allow each to achieve initial hardness before moving to next",
  ],
  limitations: [
    "Temporary repair only — hydraulic cement plug stops immediate flow but does not waterproof the substrate — permanent repair required",
    "Very short working time (1–3 min) — prepare only what can be applied in one operation — mix individually for each plug",
    "Must be held under sustained hand pressure until initial set — training required — poor technique is the primary failure mode",
    "Large voids or irregular surfaces need to be pre-formed (chased out to clean conical shape) before plugging",
    "Not effective against very high hydrostatic pressure without engineering assessment of plug adequacy",
    "Do not rely on hydraulic cement plug as the sole waterproofing measure — always combine with a permanent waterproofing system",
  ],
  standardsNotes: [
    "AS 3972 — General purpose and blended cements — governs cement component of these products",
    "AS 3600 — Concrete Structures — engineer must confirm structural adequacy of plugged area",
    "NCC Volume One — performance requirements for below-grade waterproofing — hydraulic plugging is a preparatory step not a standalone system",
    "Confirm compliance claims with manufacturer and independent certification bodies before specifying for critical infrastructure",
  ],
  suitableDefects: [
    "Active water ingress through cracks in basement concrete walls — water running or gushing at time of repair",
    "Active leaking construction joints — horizontal or vertical joints showing active water flow",
    "Active leaking pipe penetrations — water running around services through basement walls",
    "Active tie rod hole leaks — water gushing through form hardware paths in poured concrete",
  ],
  typicalSubstrates: [
    "Reinforced concrete basement walls — in-situ poured — active crack and joint plugging",
    "Reinforced concrete slabs (floor and soffit) — active crack plugging in basement floor slabs",
    "Masonry brick basement walls — apply to chased-out void in mortar joint or brick face — confirm adhesion with manufacturer",
    "Precast concrete panels — confirm with structural engineer before plugging in precast elements",
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

export function HydraulicCementIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are hydraulic cement plugging systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Hydraulic cement plugging systems are rapid-setting cementitious mortars formulated to set and harden in the presence of active water flow — physically blocking the leak point by being pressed firmly into the void and held under hand pressure while the rapid hydraulic setting reaction generates strength. Unlike conventional repair mortars that require dry or damp substrates, hydraulic cement plugs specifically exploit water contact to accelerate the set reaction, making them suitable for actively running or gushing leaks in basement walls, slabs, and pipe penetrations.
        </p>
        {expanded && (
          <>
            <p>
              In Australian Class 2 strata basement water ingress remediation, hydraulic cement plugging is almost always a first-stage repair — the immediate response when a basement is actively flooding or leaking through one or more discrete points. The plug stops the immediate water flow and allows the water pressure to be relieved, creating conditions suitable for subsequent permanent waterproofing work — injection sealing, crystalline tanking, or installation of cavity drain membranes. Without the initial plugging step, subsequent repairs are difficult or impossible to install correctly against active water flow.
            </p>
            <p>
              The technique is simple but requires practice: mix the product to a stiff putty consistency, form a plug larger than the void opening, press firmly into the void with steady hand pressure, and maintain pressure without releasing until the product achieves sufficient initial set to resist the water pressure — typically 1–3 minutes depending on product and ambient temperature. Releasing pressure too early is the most common failure mode. For large voids, pre-form a clean conical recess by chasing out the crumbling concrete before plugging.
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

export function HydraulicCementProductSection() {
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
            <p className="mt-0.5 text-xs text-slate-500">Applications, product selection, plugging technique, limitations, standards and substrates</p>
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — Sika / Fosroc / BASF MBS</p>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Hydraulic cement plugging system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">All products temporary — permanent repair required after plugging. Confirm current product names with manufacturers.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Working time</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Active flow</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Structural</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Sika" ? "#cc0000" : row.brand === "Fosroc" ? "#007A33" : "#003591" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.workingTime}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.activeFlow}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.structural}</td>
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
