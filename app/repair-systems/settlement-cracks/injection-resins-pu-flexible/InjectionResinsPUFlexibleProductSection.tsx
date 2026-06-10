"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Active-Crack" | "Wet-Crack" | "Masonry" | "Concrete" | "Hydrophilic" | "Elastic";

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
    fullLabel: "Sika Australia — Sika Injection-307",
    brandUrl: "https://aus.sika.com",
    accentColor: "#0369a1",
    name: "Sika Injection-307 — Polyacrylic Elastic Injection Resin",
    descriptionLine: "TODO: owner confirm — Sika Injection-307 is a 3-part polyacrylic resin (not PU) — confirm current AU availability and correct product for hydrophilic PU foam water-stop",
    productType: "Three-component polyacrylic elastic injection resin",
    filterTags: ["Active-Crack", "Wet-Crack", "Masonry", "Concrete", "Hydrophilic"],
    techChips: [
      { label: "Polyacrylic (not PU)", cls: "bg-amber-100 text-amber-800" },
      { label: "3-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-activated", cls: "bg-sky-50 text-sky-700" },
      { label: "TODO: confirm AU listing", cls: "bg-red-100 text-red-800" },
    ],
    systemDescription: "TODO: owner confirm — Sika Injection-307 is a 3-part polyacrylic elastic injection resin (resin + accelerator + hardener powder), NOT a polyurethane foam resin as originally described on this card. It is a very low viscosity elastic polyacrylic resin with adjustable curing time. Additionally, Sika Injection-307 does not appear on the current Australian Sika website (aus.sika.com) injection products listing. The current Australian Sika injection range includes Injection-306, Injection-111, Injection-111C, Injection-222 and SikaInject-867. Confirm with Sika Australia whether Injection-307 is available and appropriate for the intended water-stop application, or whether a different product (e.g. SikaFix HH or SikaInject range) is the correct current Australian specification for hydrophilic PU foam injection.",
    technicalProperties: [
      "TODO: owner confirm — polyacrylic chemistry (3-part), not hydrophilic polyurethane foam",
      "Low viscosity — elastic cured seal — adjustable curing time 10–60 minutes",
      "TODO: confirm Sika Injection-307 current Australian availability with Sika Australia",
      "Confirm correct Australian product for hydrophilic foam water-stop injection with Sika technical",
    ],
    limitations: [
      "TODO: owner confirm — chemistry is polyacrylic (not PU foam) — this card requires full review by Sika technical",
      "TODO: confirm Sika Injection-307 is currently available in Australia before specifying",
      "Water-stop only — does not reinstate structural capacity across the crack; engineer must address structural cause separately",
      "Confirm suitability for high-pH or chemical-laden groundwater from current Sika TDS",
    ],
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia — Sika Injection-306",
    brandUrl: "https://aus.sika.com",
    accentColor: "#15803d",
    name: "Sika Injection-306 — Polyacrylic Elastic Injection Resin",
    descriptionLine: "3-part polyacrylic elastic injection resin — very low viscosity — permanent watertight elastic seal in fine cracks",
    productType: "Three-component polyacrylic elastic injection resin",
    filterTags: ["Active-Crack", "Wet-Crack", "Masonry", "Concrete", "Elastic"],
    techChips: [
      { label: "Polyacrylic (not PU)", cls: "bg-amber-100 text-amber-800" },
      { label: "Elastic seal", cls: "bg-slate-100 text-slate-700" },
      { label: "Very low viscosity (~3–11 mPa·s)", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription: "Sika Injection-306 is a three-component polyacrylic elastic injection resin (resin + accelerator + hardener powder) — NOT a polyurethane as originally described on this card. Very low viscosity (~3–11 mPa·s at +20°C, comparable to water). Adjustable curing time 10–60 minutes. Cures to a permanently elastic, water-insoluble seal with the ability to reversibly absorb and release moisture. Suitable for permanent watertight sealing of fine cracks where elastic accommodation of minor movement is required. Listed on the current Australian Sika website (aus.sika.com). The previous description as 'hydroactive PU' was incorrect — Sika Injection-306 is a polyacrylic system.",
    technicalProperties: [
      "Three-component polyacrylic resin (Part A: resin, Part A1: accelerator, Part B: hardener powder) — not polyurethane",
      "Very low viscosity ~3–11 mPa·s at +20°C — penetrates fine crack networks before reaction",
      "Permanently elastic — reversibly absorbs and releases moisture — suitable for cracks with minor ongoing movement",
      "Cured material insoluble in water and hydrocarbons — resistant to alkalis",
    ],
    limitations: [
      "Not a polyurethane — this is a polyacrylic system — confirm chemistry compatibility with specification requirements",
      "Elastic seal does not reinstate structural load transfer across the crack — structural repair must accompany injection where load transfer is required",
      "Three-component mixing required — confirm operator is trained in polyacrylic injection systems",
      "May not be suitable as sole treatment for cracks with sustained high hydrostatic pressure — complementary waterproofing may be required",
    ],
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "BASF / Master Builders Solutions — MasterInject 1300",
    brandUrl: "https://www.master-builders-solutions.com/en-au",
    accentColor: "#be123c",
    name: "BASF MasterInject 1300 — Two-Component PU Injection Resin",
    descriptionLine: "2-component polyurethane injection resin — controlled expansion and cure rate — wet and active crack water-stop",
    productType: "Two-component polyurethane injection resin",
    filterTags: ["Active-Crack", "Wet-Crack", "Masonry", "Concrete", "Hydrophilic"],
    techChips: [
      { label: "2-component PU", cls: "bg-red-100 text-red-800" },
      { label: "Controlled expansion", cls: "bg-slate-100 text-slate-700" },
      { label: "Adjustable cure", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription: "BASF MasterInject 1300 is a two-component PU injection resin that allows adjustment of the A:B mix ratio to control expansion rate, foam density, and cure time — providing greater flexibility than single-component resins in complex settlement crack injection scenarios where variable crack widths or multiple crack geometries are encountered. The two-component delivery requires a twin-cartridge dispensing gun or two-component injection pump. Used in settlement crack repair for masonry and concrete where the injection contractor needs adjustable control over the reaction. BASF Master Builders Solutions supply technical support and training for the MasterInject range.",
    technicalProperties: [
      "Two-component PU — adjustable A:B ratio for expansion and cure control",
      "Suitable for wet and actively leaking cracks in masonry and concrete",
      "Twin-cartridge dispensing gun or 2-component pump required",
      "BASF Master Builders Solutions — national technical support",
    ],
    limitations: [
      "Two-component delivery requires correct equipment and trained operator — single-component resins are more suitable for simple crack scenarios",
      "Incorrect A:B ratio produces under-expanded or over-expanded foam — trial mix and equipment calibration required before production injection",
      "Not a structural reinstatement product — addresses water ingress only",
      "Application training recommended for 2-component systems",
    ],
    procurementSources: [
      { name: "BASF Master Builders Solutions", url: "https://www.master-builders-solutions.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "DCP Chemprox — PU Flexible Injection Range",
    brandUrl: "https://www.dcpchemprox.com.au",
    accentColor: "#78716c",
    name: "DCP Chemprox — PU Flexible Injection Resins (Distributor Range)",
    descriptionLine: "Specialist crack injection distributor — PU foam and elastic resins — single and two-component — training and equipment hire",
    productType: "PU flexible injection resins — distributor supply and technical support",
    filterTags: ["Active-Crack", "Wet-Crack", "Masonry", "Concrete", "Hydrophilic", "Elastic"],
    techChips: [
      { label: "Distributor supply", cls: "bg-stone-200 text-stone-800" },
      { label: "Equipment hire", cls: "bg-slate-100 text-slate-700" },
      { label: "Training support", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "DCP Chemprox is an Australian specialist crack injection distributor stocking a full range of single- and two-component PU flexible injection resins — including hydrophilic foam, elastic PU, and hybrid formulations — from multiple manufacturers. DCP also provides crack injection equipment hire (single-component and two-component injection pumps) and operator training, making them the preferred route for contractors new to crack injection or for projects requiring specialised product-equipment combinations. Technical support from DCP is product-agnostic and can help specify the most appropriate resin for settlement crack geometry, water pressure, and substrate type. DCP supplies nationally through their Brisbane and Sydney branches.",
    technicalProperties: [
      "Full PU flexible injection range — hydrophilic foam, elastic, and hybrid formulations",
      "Single- and two-component systems — multiple manufacturer product lines",
      "Injection equipment hire — single-component and twin-component pumps",
      "Operator training and application support — Brisbane and Sydney branches",
    ],
    limitations: [
      "Product selection from range depends on site conditions — consult DCP technical before ordering for complex settlement crack scenarios",
      "Equipment hire adds a project cost component — factor into preliminary budget",
      "Not a single product — the distributor supplies multiple products; product-specific TDS must be obtained for each resin selected",
      "Training strongly recommended for first-time crack injection operators — incorrect technique is the most common cause of injection failure",
    ],
    procurementSources: [
      { name: "DCP Chemprox", url: "https://www.dcpchemprox.com.au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Active-Crack", label: "Active / live crack" },
  { tag: "Wet-Crack", label: "Wet / water-bearing crack" },
  { tag: "Masonry", label: "Masonry substrate" },
  { tag: "Concrete", label: "Concrete substrate" },
  { tag: "Hydrophilic", label: "Hydrophilic (foam)" },
  { tag: "Elastic", label: "Elastic (flexible seal)" },
];

const TECH_INFO = {
  typicalApplications: [
    "Stopping active water ingress through settlement cracks in masonry foundations and basement walls",
    "Water-stop injection of settlement cracks in below-grade concrete walls and retaining structures",
    "Pre-treatment of wet masonry cracks before structural helical bar stitching",
    "Sealing of active cracks in concrete block walls affected by groundwater ingress",
    "Emergency water-stop in leaking settlement cracks before permanent structural repair",
  ],
  selectionCriteria: [
    "Hydrophilic PU foam (MasterInject 1300) for active wet cracks with visible water flow or high moisture — foam expansion is water-triggered — confirm with BASF technical",
    "Polyacrylic elastic (Sika Injection-306) for cracks with minor ongoing movement or where a very low viscosity elastic seal is preferred — note: polyacrylic chemistry, not PU",
    "TODO: confirm — Sika Injection-307 chemistry is polyacrylic (3-part), not hydrophilic PU foam — Injection-307 also not confirmed on current AU Sika website",
    "Two-component PU (MasterInject 1300) where the injection contractor needs adjustable control over expansion rate — complex crack geometries or variable crack widths",
    "DCP Chemprox for projects requiring equipment hire or operator training as well as product supply",
    "Confirm crack is in masonry or concrete settlement context — this is a water-stop treatment, not structural reinstatement",
  ],
  whenNotToUse: [
    "PU flexible injection does not restore structural capacity — do not use as a substitute for epoxy rigid injection where structural reinstatement across a dormant crack is required",
    "Do not inject PU foam into a crack that is still actively moving from ongoing settlement — the foam will re-crack",
    "Not suitable as the only treatment for cracks subject to sustained high hydrostatic pressure — requires external tanking or membrane waterproofing to complement injection",
    "Do not use in cracks with very high water velocity (visibly flowing) — the PU resin will be washed out before it can react; use chemical grout first to reduce flow velocity",
    "Not for cracks in PT concrete without GPR confirmation of tendon positions",
  ],
  standardsNotes: [
    "ICRI Technical Guideline 310.3 — Guide for the Selection of Polymer Materials for Crack Repair",
    "AS 3600 — Concrete Structures — crack repair requirements for structural concrete",
    "Manufacturer TDS and MSDSs — Sika, BASF — confirm current product specifications before specifying",
    "Injection pump operating pressure should not exceed 0.5 MPa at surface-mounted ports — higher pressures risk delamination",
    "Engineer involvement required for settlement cracks in structural elements before and after injection",
  ],
  suitableDefects: [
    "Active water ingress through settlement cracks in masonry foundations and basement walls",
    "Leaking settlement cracks in concrete retaining walls, pits, and below-grade slabs",
    "Damp and wet masonry cracks before helical bar stitching",
    "Capillary water movement through masonry joint cracking from settlement",
    "Emergency waterproofing of settlement cracks pending permanent structural repair",
  ],
  typicalSubstrates: [
    "Masonry foundations — brick, stone, masonry block — settlement crack water-stop",
    "Below-grade concrete walls and retaining structures",
    "Basement walls in masonry and concrete construction",
    "Concrete block walls with water-bearing settlement cracks",
    "Reinforced concrete foundations and ground slabs",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Sika Injection-307", components: "3-component", cure: "Polyacrylic elastic (NOT PU)", movement: "Minor only", use: "TODO: confirm AU availability — elastic waterproof seal" },
  { product: "Sika Injection-306", components: "3-component", cure: "Polyacrylic elastic (NOT PU)", movement: "Minor ongoing", use: "Elastic seal — very fine cracks — current AU product" },
  { product: "BASF MasterInject 1300", components: "2-component", cure: "Foam PU (adjustable)", movement: "Minor only", use: "Adjustable control — complex cracks" },
  { product: "DCP Chemprox range", components: "1C and 2C", cure: "Various", movement: "Various", use: "Distributor — equipment + training" },
];

export function InjectionResinsPUFlexibleIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">PU flexible injection in settlement crack repair — water-stop, not structural reinstatement</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">When to inject PU vs epoxy, hydrophilic vs elastic, and water-stop role in settlement crack repair</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>Flexible injection resins are used in settlement crack repair to stop water ingress through cracks in masonry foundations, basement walls, and concrete below-grade elements. The resin is injected through ports into a wet or damp crack; hydrophilic resins react with water to expand and seal the crack network. This is a water-stop treatment — the crack remains a crack after injection. Flexible injection resins do not reinstate structural capacity and are not a substitute for epoxy rigid injection or mechanical crack stitching. Note: Sika Injection-306 and -307 are polyacrylic resins, not polyurethane — confirm chemistry when specifying.</p>
          <p>In a typical settlement crack repair sequence: (1) Confirm settlement is dormant (or treat cause). (2) Stop water ingress with PU flexible injection. (3) Allow drying and then assess crack for structural stitching or epoxy injection. PU injection is often the first treatment applied when a building owner reports a wet basement crack after settlement movement.</p>
        </div>
      )}
    </div>
  );
}

export function InjectionResinsPUFlexibleProductSection() {
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
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none]">
          {filtered.map((p) => (
            <div key={p.name} className="w-[380px] shrink-0 rounded-2xl border border-slate-200 bg-white overflow-hidden" style={{ borderTop: `4px solid ${p.accentColor}` }}>
              <div className="p-5">
                <a href={p.brandUrl} target="_blank" rel="noopener noreferrer" className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-sky-700">{p.fullLabel} ↗</a>
                {p.tdsUrl && <a href={p.tdsUrl} target="_blank" rel="noopener noreferrer" className="mb-2 flex items-center gap-1 text-[10px] font-semibold text-sky-600 hover:text-sky-800">TDS ↗</a>}
                <h3 className="text-sm font-extrabold leading-snug text-sky-950">{p.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{p.descriptionLine}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{p.productType}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.techChips.map((c) => <span key={c.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>)}
                </div>
                <CollapsibleDescription text={p.systemDescription} />
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <CollapsibleCardDetails
                    text=""
                    chips={p.filterTags.map((t) => ({ label: t.replace(/-/g, " "), cls: "bg-sky-50 text-sky-700" }))}
                  />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Technical properties</p>
                  <CollapsibleList items={p.technicalProperties} icon="check" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Limitations</p>
                  <CollapsibleList items={p.limitations} icon="x" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Procurement</p>
                  <CollapsibleSources sources={p.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronRight size={16} /></button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><Layers size={16} /></div>
            <span className="text-sm font-extrabold text-sky-950">PU flexible injection technical reference</span>
          </div>
          <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-6 pb-6 pt-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <TechCard icon={<Layers size={14} />} title="Typical applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<CheckCircle size={14} />} title="Selection criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={14} />} title="When NOT to use" items={TECH_INFO.whenNotToUse} style="warn" />
              <TechCard icon={<FileText size={14} />} title="Standards & notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<SquareStack size={14} />} title="Suitable defects" items={TECH_INFO.suitableDefects} style="bullet" />
              <TechCard icon={<Ruler size={14} />} title="Typical substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-extrabold text-sky-950">PU flexible injection — product comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Product", "Components", "Cure type", "Movement tolerance", "Primary use"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SYSTEM_COMPARISON.map((row) => (
                <tr key={row.product} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-semibold text-sky-950">{row.product}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.components}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.cure}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.movement}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
