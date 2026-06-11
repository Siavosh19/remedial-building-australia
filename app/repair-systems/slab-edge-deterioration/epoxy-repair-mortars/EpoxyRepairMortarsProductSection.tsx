"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "2-Part" | "3-Part" | "Structural" | "Slab-Edge" | "High-Traffic" | "Early-Strength" | "Chemical-Resistant" | "Epoxy";

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
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-ra-88-plus/",
    accentColor: "#0369a1",
    name: "Ardex RA 88 Plus — 2-Part Structural Epoxy Repair Mortar",
    descriptionLine: "2-component epoxy aggregate repair mortar for high-strength slab edge repair — early return to service — 4.5 kg kit — Ardex trade supply nationally",
    productType: "2-component epoxy aggregate repair mortar — structural — slab edge",
    filterTags: ["2-Part", "Structural", "Slab-Edge", "High-Traffic", "Early-Strength", "Chemical-Resistant", "Epoxy"],
    techChips: [
      { label: "2-component epoxy", cls: "bg-sky-100 text-sky-800" },
      { label: "High-strength", cls: "bg-green-50 text-green-700" },
      { label: "Early return to service", cls: "bg-slate-100 text-slate-700" },
      { label: "4.5 kg kit", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Ardex RA 88 Plus is a two-component epoxy aggregate repair mortar for structural slab edge repair where high compressive strength, early return to service, and good impact and abrasion resistance are required. It is supplied as a pre-proportioned kit of epoxy resin/hardener (Parts A and B) and selected aggregate (Part C in a 3-part variant), mixed by mechanical drill mixer and applied by trowel or spatula to the prepared substrate. No separate bonding primer is typically required — the epoxy resin itself acts as an adhesion agent to the clean, prepared, and dry concrete substrate. In slab edge repair, Ardex RA 88 Plus is specified where the repaired edge will be subject to vehicular traffic (carpark ramps, carpark deck nosings) or pedestrian foot traffic without subsequent protective coating. The epoxy formulation provides significantly higher compressive and flexural strength than polymer-modified cementitious mortars, and excellent chemical resistance to oil, fuel, and dilute acids — relevant for carpark environments. Apply using steel or PVC edge form angles fixed in advance of mortar placement. Confirm current component proportions, pot life, and application temperature range from the current Ardex Australia TDS before specifying — epoxy mortars are sensitive to temperature during application.",
    technicalProperties: [
      "2-component epoxy aggregate mortar — no separate primer required on clean dry substrate",
      "High compressive strength — significantly exceeds EN 1504-3 Class R4 where applicable",
      "Early return to service — typically trafficable within 4–8 hours at +20°C",
      "Good abrasion and impact resistance — suitable for slab edge repairs subject to traffic",
      "Chemical resistance — oil, fuel, and dilute acid exposure in carpark environments",
      "4.5 kg pre-proportioned kit — mechanically mixed — confirm pot life from current Ardex TDS",
    ],
    limitations: [
      "Temperature-sensitive — confirm minimum and maximum application temperature from Ardex TDS — do not apply below +10°C",
      "Short pot life after mixing — batch sizing must be planned to avoid waste",
      "Not suitable for repair over actively damp or wet concrete — substrate must be dry",
      "Significantly higher cost than polymer-modified cementitious mortars — specify for high-traffic or chemical-exposure applications only",
      "Rigid — not suitable for repairs adjacent to active cracks or movement joints",
      "Confirm current pack size and specifications from current Ardex Australia TDS",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply nationally", url: "https://www.ardex.com.au" },
      { name: "Ardex distributor network — confirm local branch", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/grouts-anchoring/epoxy-grouts/sikadur-42-au.html",
    accentColor: "#be123c",
    name: "Sika Sikadur-42 — 3-Part Epoxy Mortar for Slab Edge",
    descriptionLine: "3-component solvent-free epoxy aggregate repair mortar — high compressive strength for slab edge, nosing, and structural patch repair — 14.6 kg kit — Sika Australia",
    productType: "3-component epoxy aggregate repair mortar — structural — Sika Australia",
    filterTags: ["3-Part", "Structural", "Slab-Edge", "High-Traffic", "Early-Strength", "Chemical-Resistant", "Epoxy"],
    techChips: [
      { label: "3-component epoxy", cls: "bg-rose-100 text-rose-800" },
      { label: "Solvent-free", cls: "bg-green-50 text-green-700" },
      { label: "High strength", cls: "bg-slate-100 text-slate-700" },
      { label: "14.6 kg kit", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Sikadur-42 is a three-component, solvent-free epoxy aggregate repair mortar for high-strength structural slab edge, step nosing, and patch repair where early return to service and durability under traffic are required. The three components — epoxy resin (Part A), hardener (Part B), and selected aggregate (Part C) — are pre-proportioned in the kit and mixed together by mechanical drill mixer immediately before application. Sikadur-42 does not require a separate bonding primer on clean, dry, and prepared concrete surfaces — the epoxy resin provides direct adhesion to the substrate. In Australian carparks and external slab edge applications, Sikadur-42 is specified for: vehicular ramp nosings, carpark deck edge repairs, step treads subject to foot traffic, and slab edge repairs where early return to service is required within hours rather than days. The solvent-free formulation makes it suitable for use in enclosed carpark levels with limited ventilation. Fix edge form angles before applying. Confirm current pot life (typically 20–45 minutes at +20°C), minimum/maximum temperature, and repair depth per application from the current Sika Australia TDS.",
    technicalProperties: [
      "3-component solvent-free epoxy aggregate mortar — Parts A, B, C pre-proportioned kit",
      "No separate bonding primer required on clean, dry, prepared concrete",
      "High compressive strength — early trafficable within 4–8 hours at +20°C",
      "Suitable for enclosed carparks — solvent-free, low emission",
      "Good abrasion and impact resistance for traffic and pedestrian use",
      "14.6 kg kit — confirm current pack sizes from Sika Australia TDS",
    ],
    limitations: [
      "Short pot life — confirm from current Sika TDS — plan batch sizes to avoid waste at end of pot life",
      "Application temperature critical — do not apply below +10°C or above +35°C without adjustment",
      "Substrate must be dry — not suitable over actively damp concrete",
      "Significantly higher cost than PM cementitious mortars — specify where traffic or chemical resistance is required",
      "Rigid — will re-crack if applied over active cracks or near movement joints",
      "Confirm component proportions and mixing procedure from current Sika Australia TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Australia",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#15803d",
    name: "Fosroc Nitomortar 50 — 3-Part Epoxy Slab Edge Repair Mortar",
    descriptionLine: "3-component epoxy aggregate mortar for structural slab edge and high-traffic repair — 5 kg kit — Fosroc product distributed nationally by Parchem",
    productType: "3-component epoxy aggregate repair mortar — structural — Fosroc / Parchem",
    filterTags: ["3-Part", "Structural", "Slab-Edge", "High-Traffic", "Early-Strength", "Chemical-Resistant", "Epoxy"],
    techChips: [
      { label: "3-component epoxy", cls: "bg-green-100 text-green-800" },
      { label: "Structural repair", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem distribution", cls: "bg-blue-50 text-blue-700" },
      { label: "5 kg kit", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitomortar 50 is a three-component epoxy aggregate repair mortar for structural slab edge, step nosing, and high-traffic patch repair on carparks, external walkways, and balconies. Distributed in Australia by Parchem, Nitomortar 50 provides high compressive strength, good impact and abrasion resistance, and early return to service — making it suitable for carpark deck nosings and slab edges where ongoing traffic access cannot be halted for the multi-day cure period of polymer-modified cementitious mortars. Mix components A (resin), B (hardener), and C (aggregate) mechanically immediately before application. No separate primer is required on clean, dry, and prepared concrete. Apply and compact into the prepared edge void using edge forms, then screed to match existing surface profile. Confirm current pot life, minimum and maximum application temperatures, and depth of application per lift from the current Fosroc Nitomortar 50 TDS available through Parchem.",
    technicalProperties: [
      "3-component epoxy aggregate mortar — no separate primer on clean dry substrate",
      "High compressive and flexural strength — early trafficable surface",
      "Good abrasion resistance — suitable for carpark and pedestrian traffic areas",
      "Distributed nationally through Parchem",
      "Chemical resistance — suitable for carpark fuel and oil exposure",
      "5 kg kit — confirm current pack sizes and specifications from Parchem",
    ],
    limitations: [
      "Do not apply to damp, wet, or contaminated substrates",
      "Short pot life — confirm from current Fosroc TDS through Parchem — plan batch sizes accordingly",
      "Application temperature must be within specified range — confirm with Parchem technical",
      "Not suitable for repairs adjacent to active movement joints",
      "Higher cost than PM cementitious mortars — specify only where traffic or chemical resistance is required",
    ],
    procurementSources: [
      { name: "Parchem — national distribution of Fosroc products", url: "https://www.parchem.com.au" },
      { name: "Parchem trade branches — confirm local availability", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Australia",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.fosroc.com.au/product/nitomortar-ap-au",
    accentColor: "#78716c",
    name: "Fosroc Nitomortar AP — 3-Part Structural Epoxy Repair Mortar",
    descriptionLine: "3-component epoxy aggregate repair mortar — 4.5 kg kit — structural slab edge repair with aggregate pack — Fosroc / Parchem nationally",
    productType: "3-component epoxy aggregate repair mortar — structural — Fosroc Nitomortar AP",
    filterTags: ["3-Part", "Structural", "Slab-Edge", "High-Traffic", "Early-Strength", "Epoxy"],
    techChips: [
      { label: "Nitomortar AP", cls: "bg-stone-100 text-stone-700" },
      { label: "3-component", cls: "bg-slate-100 text-slate-700" },
      { label: "4.5 kg kit", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitomortar AP is a three-component structural epoxy aggregate repair mortar available in a 4.5 kg kit, supplied with aggregate pack, distributed in Australia by Parchem. It provides similar high-strength, early-return-to-service performance to Nitomortar 50 and is used for slab edge repair, step nosing repair, and structural concrete patch repair in carparks and external walkways. Nitomortar AP is mixed mechanically from components A, B, and C and applied trowel or spatula without a separate bonding primer on clean, dry, prepared concrete. The 4.5 kg kit size is suited to smaller repair areas where full 5 kg kits of other grades would result in significant waste at end of pot life. Confirm component proportions, pot life, application temperature, and depth limitations from the current Fosroc Nitomortar AP TDS available from Parchem before specifying.",
    technicalProperties: [
      "3-component epoxy aggregate mortar — 4.5 kg kit with aggregate",
      "Smaller kit size suited to localised slab edge and step nosing repairs",
      "No separate primer required on clean dry prepared concrete",
      "High compressive strength — early trafficable surface",
      "Distributed through Parchem nationally",
    ],
    limitations: [
      "Do not apply to damp or wet concrete",
      "Short pot life — confirm from current Fosroc TDS — plan batch size to avoid waste",
      "Confirm application temperature range from current Parchem TDS",
      "Confirm current product name and availability with Parchem before ordering",
    ],
    procurementSources: [
      { name: "Parchem — national distribution of Fosroc products", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "2-Part", label: "2-part" },
  { tag: "3-Part", label: "3-part" },
  { tag: "Structural", label: "Structural" },
  { tag: "Slab-Edge", label: "Slab edge" },
  { tag: "High-Traffic", label: "High traffic" },
  { tag: "Early-Strength", label: "Early strength" },
  { tag: "Chemical-Resistant", label: "Chemical resistant" },
  { tag: "Epoxy", label: "Epoxy" },
];

const TECH_INFO = {
  typicalApplications: [
    "Carpark deck nosing and ramp edge repair subject to vehicular traffic",
    "Slab edge repair where early return to service is required within hours",
    "Step nosing and stair tread repair under pedestrian foot traffic",
    "Slab edge repairs in chemical or fuel-exposure environments",
    "Structural patch repair where high compressive and flexural strength is required",
  ],
  selectionCriteria: [
    "Traffic loading — vehicular traffic requires epoxy mortar; pedestrian and non-traffic applications can use PM mortar",
    "Return-to-service time — epoxy trafficable in 4–8 hours vs 7+ days for PM mortar",
    "Chemical exposure — epoxy provides resistance to oil, fuel, and dilute acids",
    "Substrate condition — epoxy mortars require dry substrate; PM mortars tolerate damp SSD conditions",
    "Cost — epoxy mortars are 3–5x the cost of PM cementitious mortars; specify only where needed",
    "Temperature on site — confirm minimum/maximum application temperature from TDS",
  ],
  limitations: [
    "Substrate must be dry — not suitable for application over damp or green concrete",
    "Short pot life — mixing and application must be planned to avoid waste at end of pot life",
    "Rigid — will re-crack if applied adjacent to active cracks or movement joints",
    "Temperature-sensitive — application below +10°C substantially slows cure; above +35°C shortens pot life",
    "Do not specify for repairs on masonry or heritage brick substrates",
  ],
  standardsNotes: [
    "EN 1504-3 — Class R4 (epoxy mortar) for structural concrete repair with high bond strength and compressive strength requirements",
    "AS 3600 — concrete cover and exposure class requirements for structural elements",
    "ICRI 310.2 — CSP surface preparation profile — minimum CSP 3 for epoxy mortar",
    "Manufacturer TDS specifies minimum concrete substrate strength before epoxy mortar application",
  ],
  suitableDefects: [
    "Carpark deck edge and nosing spalling under vehicular traffic",
    "Step nosing and stair tread edge damage requiring early return to service",
    "Slab edge repair in high-traffic or chemical-exposure environments",
    "Structural patch repair where cementitious mortar strength is insufficient",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete slab edges — dry substrate",
    "Precast concrete panel edges — dry substrate",
    "Carpark deck and ramp nosings",
    "Step treads and stair edges",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Ardex RA 88 Plus", brand: "Ardex", parts: "2-part", kit: "4.5 kg", trafficable: "4–8 hrs at +20°C" },
  { product: "Sika Sikadur-42", brand: "Sika", parts: "3-part", kit: "5 kg", trafficable: "4–8 hrs at +20°C" },
  { product: "Fosroc Nitomortar 50", brand: "Fosroc/Parchem", parts: "3-part", kit: "5 kg", trafficable: "Confirm TDS" },
  { product: "Fosroc Nitomortar AP", brand: "Fosroc/Parchem", parts: "3-part", kit: "4.5 kg", trafficable: "Confirm TDS" },
];

export function EpoxyRepairMortarsIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">When to specify epoxy mortar vs polymer-modified (PM) mortar for slab edge</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">The traffic, chemical exposure, and return-to-service factors that determine epoxy mortar selection</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>Epoxy aggregate repair mortars and polymer-modified (PM) cementitious repair mortars serve different roles in slab edge repair, despite both being used to reinstate spalled concrete edges. The selection decision comes down to traffic, chemical exposure, and return-to-service requirements.</p>
          <p>PM mortars are the standard for most strata slab edge repairs on balconies, fascia beams, and soffits where the repaired surface is protected from traffic and chemical exposure by a subsequent protective coating. They are cost-effective, applied over SSD concrete with a bonding primer, and achieve full strength over 7–28 days. Epoxy mortars are specified when: (1) the repaired surface will be subject to vehicular or pedestrian traffic — epoxy's higher abrasion resistance and early strength make it far more durable in these conditions; (2) the repair cannot be isolated from traffic for 7+ days and must be trafficable within hours; or (3) the environment involves chemical exposure (fuel, oil, dilute acids) where cement-based mortars would deteriorate rapidly.</p>
          <p>The key constraint of epoxy mortars is that the substrate must be dry — not just saturated-surface-dry but genuinely dry. Applying epoxy mortar to damp concrete causes adhesion failure at the interface. Where the concrete is damp (common in basement and below-grade slab edges), PM mortar with SBR primer is the appropriate choice.</p>
        </div>
      )}
    </div>
  );
}

export function EpoxyRepairMortarsProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (tag: FilterTag) =>
    setActiveFilters((prev) => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : n.add(tag); return n; });

  const filtered = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.some((t) => activeFilters.has(t)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter:</span>
        {FILTER_DEFS.map(({ tag, label }) => (
          <button key={tag} onClick={() => toggleFilter(tag)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${activeFilters.has(tag) ? "border-red-700 bg-red-700 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-sky-400"}`}>{label}</button>
        ))}
        {activeFilters.size > 0 && <button onClick={() => setActiveFilters(new Set())} className="text-xs font-bold text-red-700 underline">Clear</button>}
      </div>

      <div className="relative">
        <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronLeft size={16} /></button>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: "none" }}>
          {filtered.map((p) => (
            <div key={p.name} className="w-80 shrink-0 rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: p.accentColor }}>
              <div className="border-b border-slate-100 px-5 py-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{p.fullLabel}</span>
                  <div className="flex gap-1">
                    {p.tdsUrl && <a href={p.tdsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                    <a href={p.brandUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700">Brand</a>
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{p.name}</h3>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{p.productType}</p>
                <CollapsibleCardDetails text={p.descriptionLine} chips={p.techChips} />
              </div>
              <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                <CollapsibleDescription text={p.systemDescription} />
              </div>
              <div className="space-y-3 px-5 py-4">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                  <CollapsibleList items={p.technicalProperties} icon="check" limit={3} />
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                  <CollapsibleList items={p.limitations} icon="x" limit={3} />
                </div>
              </div>
              <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                <CollapsibleSources sources={p.procurementSources} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronRight size={16} /></button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? "Hide detail" : "Show detail"} <ChevronDown size={14} className={`transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
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

      <div>
        <h3 className="mb-4 text-lg font-extrabold text-sky-950">System Comparison</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left font-bold text-slate-700 whitespace-nowrap sticky left-0 bg-slate-50 border-r border-slate-200">Product</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Brand</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Parts</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Kit size</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Trafficable</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 bg-inherit px-5 py-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.parts}</td>
                  <td className="px-4 py-3 text-slate-600">{row.kit}</td>
                  <td className="px-4 py-3 text-slate-600">{row.trafficable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
