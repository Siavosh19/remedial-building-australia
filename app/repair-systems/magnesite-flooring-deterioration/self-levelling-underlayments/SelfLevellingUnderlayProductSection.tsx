"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Cementitious" | "Rapid-Set" | "Standard-Set" | "3-20mm" | "2-30mm" | "Pumpable" | "Floor-Levelling" | "Magnesite";

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
    tdsUrl: "https://www.ardex.com.au/products/ardex-k-15/",
    accentColor: "#0369a1",
    name: "Ardex K 15 Microtec — Rapid-Drying Self-Levelling Floor Compound",
    descriptionLine: "Cement-based rapid-drying self-levelling floor compound over primed magnesite and concrete — 20 kg bag",
    productType: "Cement-based self-levelling floor underlayment",
    filterTags: ["Cementitious", "Standard-Set", "3-20mm", "Floor-Levelling", "Magnesite"],
    techChips: [
      { label: "Cementitious", cls: "bg-sky-100 text-sky-800" },
      { label: "3–20 mm", cls: "bg-blue-100 text-blue-800" },
      { label: "Standard set", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex K 15 is a cement-based, self-levelling floor compound that flows to a flat, smooth finish over primed substrates. Applied at 3–20 mm in a single pour, it provides a dimensionally stable, hard-wearing platform for all types of floor coverings including carpet, timber, LVT, ceramic tile, and sheet vinyl. Over encapsulated magnesite, it must be applied over Ardex MC Rapid (or equivalent moisture primer) to prevent osmotic blistering from chloride salt moisture drive.",
    technicalProperties: [
      "Pack size: 20 kg bag",
      "Application thickness: feather edge to any thickness in a single pour — confirm build limits from current Ardex AU TDS",
      "Compressive strength: 35 N/mm² at 28 days",
      "Walkable: approximately 2–4 hrs at 20°C",
      "Floor covering installation: typically 16–18 hrs at 20°C (vinyl); check TDS for other coverings",
      "Must be applied over Ardex-approved primer — check compatibility",
    ],
    limitations: [
      "Must not be applied directly to magnesite without moisture suppression primer",
      "Minimum application temperature 10°C — do not apply in freezing conditions",
      "Protect from draughts and direct sun during curing — rapid evaporation causes surface defects",
      "Pinholes may occur — touch up before installing hard floor coverings",
      "Not suitable for external use or permanently wet areas",
      "Pump or pour and spread immediately — do not rework after initial set begins",
    ],
    procurementSources: [
      { name: "Ardex Australia", url: "https://www.ardex.com.au" },
      { name: "Tile Depot", url: "https://www.tiledepot.com.au/" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au/products/ardex-k-301/",
    accentColor: "#0369a1",
    name: "Ardex K 301 — Rapid-Setting Self-Levelling Compound",
    descriptionLine: "Rapid-drying exterior and interior levelling compound, trafficable 2–3 hrs, 2–20 mm — 20 kg bag",
    productType: "Rapid-setting self-levelling floor underlayment",
    filterTags: ["Cementitious", "Rapid-Set", "3-20mm", "Floor-Levelling", "Magnesite"],
    techChips: [
      { label: "Rapid-set", cls: "bg-orange-100 text-orange-800" },
      { label: "3–20 mm", cls: "bg-blue-100 text-blue-800" },
      { label: "Trafficable 2–4 hrs", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex K 301 is a rapid-drying exterior and interior levelling compound, trafficable within 2–3 hours and ready for most floor coverings within 24 hours. It is suitable for both above and below-grade applications and resists sun, rain, heat, cold, and freeze-thaw conditions. Application over magnesite follows the same moisture primer requirements as Ardex K 15 Microtec.",
    technicalProperties: [
      "Pack size: 20 kg bag",
      "Application thickness: 2–20 mm",
      "Trafficable: approximately 2–3 hrs",
      "Floor covering ready: check TDS — typically 24 hrs for most coverings",
      "Mechanical mixing mandatory — use spiral mixer, pour within 10 minutes of mixing",
      "High early strength development — less working time than standard K 15",
    ],
    limitations: [
      "Mixing is time-critical — rapid onset of set, especially in warm conditions",
      "Do not re-mix or add water once initial set begins",
      "Close windows and doors to prevent surface draughts during application",
      "Same moisture primer requirements as standard SLC — do not apply without priming over magnesite",
      "Batch size should be matched to the area that can be poured and spread within 10 minutes",
      "Do not walk on surface for minimum 2–4 hrs — temporary barriers required",
    ],
    procurementSources: [
      { name: "Ardex Australia", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/flooring/cement-levellingsystems/sikafloor-level-top.html",
    accentColor: "#be123c",
    name: "Sikafloor Level TOP — Cementitious Self-Levelling Underlayment",
    descriptionLine: "Cementitious self-levelling underlayment 1–30 mm for internal floors over primed magnesite — 20 kg bag",
    productType: "Cementitious self-levelling floor underlayment",
    filterTags: ["Cementitious", "Standard-Set", "2-30mm", "Floor-Levelling", "Magnesite"],
    techChips: [
      { label: "Cementitious", cls: "bg-red-100 text-red-800" },
      { label: "1–30 mm", cls: "bg-rose-100 text-rose-800" },
      { label: "Standard set", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sikafloor Level TOP is a cementitious self-levelling underlayment designed for application over primed concrete and encapsulated magnesite in internal floor renovation work. It flows to a smooth, flat finish and provides a compatible base for all common floor coverings. Applied over Sika Primer MB (2-part epoxy moisture barrier) for full system performance and Sika warranty on magnesite floors with elevated RH.",
    technicalProperties: [
      "Pack size: 20 kg bag",
      "Application thickness: 1–30 mm neat (10–50 mm bulked with aggregate)",
      "Compressive strength: > 10 MPa at 1 day; > 25 MPa at 28 days",
      "Initial set: approximately 55–95 min at 23°C / 50% RH",
      "Floor covering installation: 18 hrs at 23°C for impervious floor coverings",
      "Must be applied over Sika-approved primer — Sika Primer MB for moisture control",
    ],
    limitations: [
      "Do not apply directly to magnesite or moisture-sensitive substrates without epoxy moisture primer",
      "Application temperature range: 10°C–35°C ambient",
      "Protect from wind and direct sunlight during first 24 hrs",
      "Pinholes may require touch-up before hard floor coverings",
      "Not for external use",
      "Confirm current TDS with Sika for application and curing guidance",
    ],
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Sika distributor locator", url: "https://aus.sika.com/en/group/find-a-sika-branch.html" },
    ],
  },
  {
    fullLabel: "Parchem Construction Products",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#78716c",
    name: "Parchem Flowfill RS — Rapid-Set Self-Levelling Floor Compound",
    descriptionLine: "Rapid-setting pumpable self-levelling floor compound, trafficable 3–4 hrs, 2–30 mm — 25 kg bag",
    productType: "Rapid-setting self-levelling floor compound",
    filterTags: ["Cementitious", "Rapid-Set", "2-30mm", "Pumpable", "Floor-Levelling", "Magnesite"],
    techChips: [
      { label: "Rapid-set", cls: "bg-stone-100 text-stone-800" },
      { label: "2–30 mm", cls: "bg-zinc-100 text-zinc-800" },
      { label: "Pumpable", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Parchem Flowfill RS is a rapid-setting self-levelling floor compound that can be pump or hand-mixed and applied at 2–30 mm depth. Its rapid-setting chemistry provides trafficability within 3–4 hours, making it suitable for commercial renovations and strata projects where long outage periods are not acceptable. Pumpable application suits large-area and multi-unit floor remediation projects.",
    technicalProperties: [
      "Pack size: 25 kg bag",
      "Application thickness: 2–30 mm",
      "Trafficable: approximately 3–4 hrs",
      "Pumpable application available for larger areas",
      "Must be applied over compatible moisture primer on magnesite",
      "Contact Parchem for current TDS and coverage rates",
    ],
    limitations: [
      "Working time is short in warm conditions — batch accordingly",
      "Pumpable application requires compatible pump equipment",
      "Moisture primer mandatory over magnesite — do not apply without primer",
      "Do not walk on surface within trafficable period",
      "Close openings during application to prevent draughts",
      "Follow-up floor coverings installation timing — check TDS",
    ],
    procurementSources: [
      { name: "Parchem Construction Products", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au/",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/smoothing-agents-and-renovation-of-floors/detail/ultraplan-eco",
    accentColor: "#b45309",
    name: "Mapei Ultraplan Eco — Self-Levelling Underlayment",
    descriptionLine: "Cement-based self-levelling underlayment up to 10 mm per layer for internal floors over primed magnesite — 20 kg bag",
    productType: "Cementitious self-levelling floor underlayment",
    filterTags: ["Cementitious", "Standard-Set", "2-30mm", "Floor-Levelling", "Magnesite"],
    techChips: [
      { label: "Cementitious", cls: "bg-amber-100 text-amber-800" },
      { label: "1–10 mm per layer", cls: "bg-yellow-100 text-yellow-800" },
      { label: "Standard set", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Ultraplan Eco is a self-levelling underlayment for internal floor preparation, applied at 1–10 mm per layer over Mapei Eco Prim T or other Mapei-approved primers. It provides a smooth, flat base for all floor coverings. For use over magnesite with elevated RH, it must be applied over a two-part epoxy moisture primer (not Eco Prim T alone). Compatible with the full Mapei floor levelling system.",
    technicalProperties: [
      "Pack size: 20 kg bag",
      "Application thickness: 1–10 mm per layer",
      "Compressive strength: 30 MPa at 28 days",
      "Walkable: approximately 3 hrs at 20°C",
      "Floor covering installation: typically 24 hrs",
      "Apply over Mapei Eco Prim T (low RH) or Mapei Primer G / suitable epoxy primer (higher RH)",
    ],
    limitations: [
      "Must not be applied over magnesite without appropriate moisture suppression primer",
      "Minimum temperature 5°C during application and curing",
      "Protect from draught and direct sunlight during cure",
      "Pinholes may occur — grout or skim before hard floor covering",
      "Not for external or wet area use",
      "Check current Mapei TDS for primer compatibility when specifying for high-RH substrates",
    ],
    procurementSources: [
      { name: "Mapei Australia", url: "https://www.mapei.com/au/" },
      { name: "Mapei distributors", url: "https://www.mapei.com/au/en/contact-us/where-to-buy" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Cementitious", label: "Cementitious" },
  { tag: "Rapid-Set", label: "Rapid-set" },
  { tag: "Standard-Set", label: "Standard-set" },
  { tag: "3-20mm", label: "3–20 mm" },
  { tag: "2-30mm", label: "2–30 mm" },
  { tag: "Pumpable", label: "Pumpable" },
  { tag: "Floor-Levelling", label: "Floor levelling" },
  { tag: "Magnesite", label: "Magnesite" },
];

const TECH_INFO = {
  typicalApplications: [
    "Levelling over encapsulated magnesite floors before new floor coverings",
    "Smoothing high spots, low spots, and surface irregularities over primed concrete",
    "Creating a flat base for ceramic tiles, LVT, carpet, timber, and sheet vinyl in strata buildings",
    "Restoring planarity tolerance (AS 1884) after floor covering removal and magnesite encapsulation",
    "Providing a sound, consistent substrate for bonded or floating floor systems",
  ],
  selectionCriteria: [
    "Standard-set SLC (Ardex K 15, Sika Level-01 Top, Mapei Ultraplan Eco): preferred for most residential strata applications",
    "Rapid-set SLC (Ardex K 301, Parchem Flowfill RS): specify when building access is limited or fast return to service is required",
    "Pumpable option (Parchem Flowfill RS): suitable for large-area or multi-unit strata floor projects",
    "Thickness: standard SLCs apply 3–20 mm; select product range that accommodates required build-up",
    "Always match SLC brand to compatible moisture primer — system warranty depends on compatibility",
    "Product with highest compressive strength: where heavy furniture or institutional traffic is anticipated",
  ],
  limitations: [
    "No SLC provides satisfactory long-term performance without correct moisture primer over magnesite",
    "SLC must not be applied in draughts, direct sunlight, or over substrates below minimum temperature",
    "SLC does not provide structural strength — delaminated or hollow magnesite must be removed, not covered",
    "Insufficient primer coverage or pooled primer causes SLC adhesion failure and map cracking",
    "Rapid-set SLCs require experienced applicators — batching errors and overworked mixes cause defects",
  ],
  standardsNotes: [
    "AS 1884: floor coverings — tolerances for floor surfaces (planarity requirements for floor coverings)",
    "AS/NZS 3958.1: ceramic tiles — guide to the installation",
    "Manufacturer TDS: minimum thickness, primer compatibility, temperature limits, and curing times vary by product",
    "ASTM F2170 / F1869: moisture testing protocols mandatory before SLC application over magnesite",
    "Safe Work Australia: magnesite dust hazard management during surface preparation",
  ],
  suitableDefects: [
    "Magnesite flooring deterioration — overlay and levelling after moisture priming",
    "Floor covering replacement over encapsulated magnesite",
    "Uneven or sloping floor surfaces requiring levelling before tiling or LVT",
    "Post-grinding floor surface restoration after CSP 2 preparation",
  ],
  typicalSubstrates: [
    "Encapsulated magnesite floors in Class 2 strata buildings (post-1970s construction)",
    "Concrete floor slabs in apartment buildings, commercial fit-outs, and strata carparks",
    "Smooth or ground concrete surfaces requiring adhesion improvement before floor coverings",
    "Previously levelled floors requiring a fresh overlay after floor covering removal",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Ardex K 15 Microtec", brand: "Ardex", setType: "Rapid-dry", range: "Feather–any thickness", trafficable: "2–4 hrs", pumpable: "No" },
  { product: "Ardex K 301", brand: "Ardex", setType: "Rapid-dry", range: "2–20 mm", trafficable: "2–3 hrs", pumpable: "No" },
  { product: "Sikafloor Level TOP", brand: "Sika", setType: "Standard", range: "1–30 mm", trafficable: "~55–95 min initial set", pumpable: "No" },
  { product: "Parchem Flowfill RS", brand: "Parchem", setType: "Rapid", range: "2–30 mm", trafficable: "3–4 hrs", pumpable: "Yes" },
  { product: "Mapei Ultraplan Eco", brand: "Mapei", setType: "Standard", range: "1–10 mm per layer", trafficable: "~3 hrs", pumpable: "No" },
];

export function SelfLevellingUnderlayIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
          <BookOpen size={16} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Self-levelling underlayments for magnesite flooring remediation</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">Cementitious and rapid-set self-levelling compounds applied over moisture-primed encapsulated magnesite to create a flat, stable floor base. Read more ↓</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>
            Self-levelling underlayments (SLCs) are applied as the final levelling layer over encapsulated magnesite, after moisture testing, substrate preparation, and moisture suppression priming. Their purpose is to create a flat, smooth, dimensionally stable surface — within the planarity tolerance required by AS 1884 — that accepts the new floor covering without bridging, hollow areas, or differential movement.
          </p>
          <p>
            SLCs are cementitious and flow to a self-levelled finish without trowelling, typically achieving a tolerance of ±3 mm over 3 m when correctly applied. They are poured and spread to a nominated depth, self-level under gravity, and cure to a hard, smooth surface. Application thickness typically ranges from 2 mm to 30 mm depending on the product, with most residential strata applications in the 5–15 mm range.
          </p>
          <p>
            The critical installation sequence for magnesite floor remediation is: (1) moisture test (ASTM F2170 or F1869); (2) grind surface to minimum CSP 2; (3) apply two-part epoxy moisture suppression primer (for high-RH substrates) or acrylic adhesion primer (for low-RH substrates); (4) allow primer to reach tack stage; (5) mix and pour SLC; (6) allow SLC to cure before installing floor covering. Skipping or shortcutting any step — especially moisture primer selection based on RH testing — is the primary cause of SLC failure in magnesite remediation projects.
          </p>
          <p>
            For large-area or multi-unit strata projects, pumpable SLC application (where the product is pump-mixed and poured via hose) is more efficient and produces a more consistent result than hand-mixing. Confirm with the manufacturer that the selected product is suitable for pump application.
          </p>
        </div>
      )}
    </div>
  );
}

export function SelfLevellingUnderlayProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (tag: FilterTag) =>
    setActiveFilters((prev) => {
      const n = new Set(prev);
      n.has(tag) ? n.delete(tag) : n.add(tag);
      return n;
    });

  const filtered =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.filterTags.some((t) => activeFilters.has(t)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {FILTER_DEFS.map(({ tag, label }) => {
          const active = activeFilters.has(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
                active
                  ? "border-sky-600 bg-sky-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
              }`}
            >
              {label}
            </button>
          );
        })}
        {activeFilters.size > 0 && (
          <button
            onClick={() => setActiveFilters(new Set())}
            className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 transition hover:bg-red-100"
          >
            Clear filters
          </button>
        )}
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
          {filtered.length === 0 && (
            <div className="flex w-full items-center justify-center py-12 text-sm text-slate-400">
              No products match the selected filters.
            </div>
          )}
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
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Set type</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Range</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Trafficable</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Pumpable</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 bg-inherit px-5 py-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.setType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.range}</td>
                  <td className="px-4 py-3 text-slate-600">{row.trafficable}</td>
                  <td className="px-4 py-3 text-slate-600">{row.pumpable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
