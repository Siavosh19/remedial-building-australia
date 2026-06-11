"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Water-Based" | "Acrylic" | "Wax-Emulsion" | "Membrane-Forming" | "Concrete" | "Spray-Apply" | "AS3799";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-and-protection.html",
    accentColor: "#be123c",
    name: "Sika Antisol AC — Acrylic Curing Compound (TODO: confirm Antisol E vs Antisol AC)",
    descriptionLine: "TODO: owner confirm — Sika Antisol E is not confirmed as the current AU product name. The current Sika Australia acrylic curing compound is listed as Antisol AC (acrylic modified emulsion, complies with AS 3799, water-based). Confirm whether Antisol E is also stocked in AU or whether Antisol AC is the correct current product",
    productType: "Acrylic curing compound — concrete repair and new concrete — Sika Australia — TODO: confirm product name",
    filterTags: ["Water-Based", "Acrylic", "Membrane-Forming", "Concrete", "Spray-Apply", "AS3799"],
    techChips: [
      { label: "Acrylic emulsion", cls: "bg-rose-100 text-rose-800" },
      { label: "Spray apply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm pigmentation", cls: "bg-blue-50 text-blue-700" },
      { label: "AS 3799 — exceeds requirements", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Sika Antisol E is not confirmed as the current Australian product name. The Sika Australia product listed at aus.sika.com is Sika Antisol AC — an acrylic modified emulsion liquid curing membrane for protecting concrete from loss of water during early curing. Antisol AC exceeds the requirements of AS 3799-1998 and achieves water retention of 90% or greater. It is water-based, supplied ready to use, applied by spray, brush, roller or broom. Confirm whether the product being specified is Antisol E or Antisol AC and confirm current pigmentation (white or clear), coverage rate, and AS 3799 compliance from the current Sika Australia TDS before specifying. Do not apply to surfaces that will be bonded, painted, or coated without first checking whether the curing membrane is compatible with the subsequent coating system or must be removed.",
    technicalProperties: [
      "Water-based acrylic modified emulsion — membrane-forming curing compound",
      "Apply immediately after mortar finishing — within 30–60 minutes in warm conditions",
      "Complies with AS 3799 — Antisol AC exceeds AS 3799-1998 requirements — water retention ≥90%",
      "Apply by spray, brush or roller — ready to use — do not dilute",
      "TODO: confirm current pigmentation (white or clear) from Sika Australia TDS",
      "Widely available through Sika trade supply and Bayset nationally",
    ],
    limitations: [
      "TODO: owner confirm — verify current AU product name (Antisol E or Antisol AC) from Sika Australia before specifying",
      "Do not apply before surface water has evaporated after mortar placement",
      "May need to be removed before painting or applying adhesive coating systems — confirm compatibility with Sika Australia",
      "Not suitable as a curing medium for surfaces that will receive bonded overlays or adhesive systems",
      "Apply only to concrete or repair mortar surfaces — not for waterproofing or protective coating purposes",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Australia",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au/products/fosroc",
    accentColor: "#15803d",
    name: "Fosroc Concure WB30 — Water-Based Wax Emulsion Curing Compound",
    descriptionLine: "Water-based wax emulsion curing compound for concrete repair — spray or roller applied after mortar finishing — Fosroc product distributed by Parchem nationally",
    productType: "Water-based wax emulsion curing compound — concrete repair — Fosroc / Parchem",
    filterTags: ["Water-Based", "Wax-Emulsion", "Membrane-Forming", "Concrete", "Spray-Apply"],
    techChips: [
      { label: "Wax emulsion", cls: "bg-green-100 text-green-800" },
      { label: "Water-based", cls: "bg-blue-50 text-blue-700" },
      { label: "Spray or roller", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem distribution", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Concure WB30 is a water-based wax emulsion curing compound for concrete and repair mortar surfaces, distributed in Australia by Parchem. It conforms to AS 3799 with water retention efficiency of not less than 90% and solids content not less than 30%. Available in clear and white versions. Wax emulsion curing compounds form a semi-permeable membrane on the concrete surface that retards moisture evaporation during the curing period without completely sealing the surface. In slab edge repair, Concure WB30 is applied by spray or roller to the repair mortar surface immediately after finishing, reducing the risk of surface crazing and shrinkage cracking caused by rapid evaporation. The wax film breaks down naturally over time and typically does not need to be removed before subsequent painting or coating, but confirm compatibility with the intended coating system from the current Fosroc TDS or with Parchem technical. Cure minimum 7 days for repair mortar surfaces before applying protective coatings or trafficking. Confirm current spread rate, and overcoat compatibility from the current Fosroc TDS available through Parchem.",
    technicalProperties: [
      "Water-based wax emulsion — membrane-forming — retards evaporation during curing",
      "Apply by spray or roller immediately after mortar finishing",
      "Wax film breaks down over time — typically compatible with subsequent painting after cure",
      "Suitable for repair mortars and new concrete on slab edges and balconies",
      "Low VOC — suitable for enclosed and occupied building environments",
      "Distributed nationally through Parchem",
    ],
    limitations: [
      "Confirm compatibility with subsequent coating or adhesive systems before applying",
      "Do not apply before surface water has evaporated after mortar placement",
      "Cure minimum 7 days before trafficking or applying coatings",
      "Confirm current product name and specifications from current Fosroc TDS through Parchem",
    ],
    procurementSources: [
      { name: "Parchem — national distribution of Fosroc products", url: "https://www.parchem.com.au" },
      { name: "Parchem trade branches — confirm local availability", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    accentColor: "#78716c",
    name: "Tremco Eucocrete WB Cure — Water-Based Acrylic Curing Compound",
    descriptionLine: "Water-based acrylic curing compound for concrete repair mortar surfaces — applied after finishing to prevent premature drying — Tremco CPG Australia",
    productType: "Water-based acrylic curing compound — concrete repair — Tremco CPG Australia",
    filterTags: ["Water-Based", "Acrylic", "Membrane-Forming", "Concrete", "Spray-Apply"],
    techChips: [
      { label: "Acrylic curing compound", cls: "bg-stone-100 text-stone-700" },
      { label: "Water-based", cls: "bg-blue-50 text-blue-700" },
      { label: "Tremco CPG system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco Eucocrete WB Cure is a water-based acrylic curing compound for concrete repair mortar surfaces, applied after mortar finishing to prevent premature moisture loss and surface cracking during the curing period. It is part of the Tremco CPG concrete repair product range and is designed for use with Tremco Eucocrete repair mortars in slab edge, balcony, and carpark repair works. Apply by spray or roller to the repair mortar surface as soon as the surface water has evaporated and the mortar can no longer be marked by touch — typically within 30–60 minutes of finishing in warm, windy conditions. The curing compound forms a membrane that retains moisture for continued cement hydration. Confirm current product specifications, spread rate, and compatibility with subsequent coating systems from the current Tremco CPG Australia TDS before specifying.",
    technicalProperties: [
      "Water-based acrylic — membrane-forming curing compound for repair mortar",
      "Apply by spray or roller immediately after mortar finishing",
      "Prevents surface cracking from rapid evaporation in sun and wind",
      "Part of Tremco CPG concrete repair system",
    ],
    limitations: [
      "Confirm compatibility with subsequent protective coatings before applying",
      "Do not apply to mortar still wet enough to be marked",
      "Confirm current product name and specifications with Tremco CPG Australia",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply", url: "https://www.tremcosealants.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions",
    accentColor: "#b45309",
    name: "Mapei Mapecure E 30 — Curing Compound (TODO: confirm Mapecure S vs E 30)",
    descriptionLine: "TODO: owner confirm — Mapecure S is not confirmed as the current AU product name. The Mapei Australia site lists Mapecure E 30. Confirm the correct current AU Mapei curing compound product name before specifying",
    productType: "TODO: confirm product name — curing compound — Mapei Australia",
    filterTags: ["Water-Based", "Acrylic", "Membrane-Forming", "Concrete", "Spray-Apply"],
    techChips: [
      { label: "TODO: confirm product name", cls: "bg-amber-100 text-amber-800" },
      { label: "Spray apply", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei system", cls: "bg-blue-50 text-blue-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Mapecure S is not listed on the current Mapei Australia product page. The current AU-listed Mapei curing compound is Mapecure E 30 — confirm whether this is the correct replacement product and confirm specifications from the Mapei Australia TDS before specifying. General function: curing compound applied to concrete and repair mortar surfaces immediately after finishing to prevent premature moisture loss that causes surface crazing, cracking, and reduced surface strength. In slab edge repair, apply by spray as part of the Mapei complete repair system. Apply when the surface water sheen has disappeared and the mortar surface can no longer be easily marked. Cure minimum 7 days before trafficking or applying subsequent coating systems. Confirm whether the curing compound must be removed or can be overcoated with the intended protective coating system from the current Mapei TDS.",
    technicalProperties: [
      "TODO: owner confirm — verify current AU Mapei curing compound product name (Mapecure E 30 listed on AU site — not Mapecure S)",
      "Curing compound — prevents premature evaporation and surface cracking during early cure",
      "Apply when surface water sheen has disappeared — confirm timing from current Mapei TDS",
      "Part of Mapei concrete repair system — confirm compatibility with Mapegrout series",
      "Available through Mapei Australia trade supply nationally",
    ],
    limitations: [
      "TODO: owner confirm — verify current product name with Mapei Australia before ordering",
      "Confirm whether compound must be removed before applying protective coatings",
      "Do not apply too early — mortar still wet enough to be damaged by spray pressure",
      "Cure minimum 7 days before trafficking repair",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply nationally", url: "https://www.mapei.com/au" },
      { name: "Mapei distributor network — confirm local branch", url: "https://www.mapei.com/au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Water-Based", label: "Water-based" },
  { tag: "Acrylic", label: "Acrylic" },
  { tag: "Wax-Emulsion", label: "Wax emulsion" },
  { tag: "Membrane-Forming", label: "Membrane forming" },
  { tag: "Concrete", label: "Concrete" },
  { tag: "Spray-Apply", label: "Spray apply" },
  { tag: "AS3799", label: "AS 3799" },
];

const TECH_INFO = {
  typicalApplications: [
    "Applied over repair mortar on slab edges immediately after finishing",
    "Applied over balcony fascia beam and soffit repairs to prevent rapid drying",
    "Applied to new concrete pours in carparks and external walkways",
    "Part of complete concrete repair system — final step before protection period",
    "Applied in hot, windy, or low-humidity conditions where evaporation rate is high",
  ],
  selectionCriteria: [
    "Water-based products preferred for occupied building environments — low VOC",
    "White-pigmented products where direct sun exposure will heat the repair surface",
    "Confirm compatibility with subsequent protective coating or adhesive systems",
    "AS 3799 compliance — required where specification mandates Australian standard curing",
    "Apply rate and number of coats — confirm from manufacturer TDS for repair mortar substrate",
  ],
  limitations: [
    "Do not apply before surface water has evaporated — applying too early dilutes the compound",
    "Curing compound does not replace wet hessian curing in very hot or very windy conditions — a combination may be required",
    "Must be removed before applying bonded overlays or adhesive systems if not compatible",
    "Not a protective coating — does not replace the application of carbonation or chloride-resistant topcoat",
    "Do not traffic repair surface before minimum cure period — typically 7 days for structural repairs",
  ],
  standardsNotes: [
    "AS 3799 — Liquid Membrane-Forming Curing Compounds for Concrete — Australian standard for curing compound performance",
    "EN 1504-3 — curing of repair mortars is a system requirement for Class R3 structural repairs",
    "AS 3600 — concrete cover and exposure class requirements",
    "Manufacturer TDS specifies minimum curing period before trafficking and overcoating",
  ],
  suitableDefects: [
    "Slab edge spalling repair — mortar placed over prepared slab edge",
    "Balcony fascia beam and soffit patch repairs",
    "Step nosing and stair tread edge repair",
    "Any externally exposed repair mortar subject to sun and wind during curing",
  ],
  typicalSubstrates: [
    "Polymer-modified repair mortar (immediately after finishing)",
    "Epoxy aggregate mortar surfaces (confirm compatibility with curing compound)",
    "New concrete pours on balconies and carparks",
    "Rendered or re-rendered surfaces requiring moisture retention during cure",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Antisol AC (TODO: confirm E vs AC)", brand: "Sika", type: "Acrylic modified emulsion", colour: "TODO: confirm from TDS", standard: "Exceeds AS 3799-1998" },
  { product: "Concure WB30", brand: "Fosroc/Parchem", type: "Wax emulsion", colour: "Clear or White", standard: "Conforms to AS 3799" },
  { product: "Eucocrete WB Cure", brand: "Tremco", type: "Acrylic", colour: "Confirm TDS", standard: "Confirm TDS" },
  { product: "Mapecure E 30 (TODO: confirm name)", brand: "Mapei", type: "Acrylic", colour: "Confirm TDS", standard: "Confirm TDS" },
];

export function CuringCompoundsIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Why curing compound is mandatory in slab edge repair</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">The role of curing in repair mortar performance, and why sun and wind cause early failure</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>Curing is the process of maintaining adequate moisture in freshly placed repair mortar or concrete to allow continued cement hydration. If the surface dries out too quickly — in direct sun, wind, or low humidity — the surface layer loses water before the cement has fully hydrated. The result is a weak, dusty, crazed surface that cannot be painted or coated and will spall within months. A repair mortar that has been correctly mixed, primed, and applied can still fail entirely if it is not cured.</p>
          <p>Curing compounds are applied immediately after finishing — before the surface has had any chance to dry — and form a membrane that dramatically slows evaporation without interfering with continued cement hydration below the surface. In Australian climates, particularly on north or west-facing external faces, evaporation rates can exceed 1 kg/m²/hr in summer — well above the threshold at which plastic shrinkage cracking occurs. A curing compound reduces this rate by 60–80% and is the single most cost-effective insurance for repair mortar quality on external slab edges.</p>
        </div>
      )}
    </div>
  );
}

export function CuringCompoundsProductSection() {
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
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Type</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Colour</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Standard</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 bg-inherit px-5 py-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colour}</td>
                  <td className="px-4 py-3 text-slate-600">{row.standard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
