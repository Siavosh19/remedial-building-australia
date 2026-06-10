"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "2-Part-Epoxy" | "1-Part-Acrylic" | "High-RH" | "Moisture-Control" | "Adhesion-Primer" | "Floor-Levelling" | "Magnesite";

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
    tdsUrl: "https://www.ardex.com.au/products/ardex-mc-rapid/",
    accentColor: "#0369a1",
    name: "Ardex MC Rapid — Two-Part Epoxy Moisture Control Primer",
    descriptionLine: "Two-part epoxy moisture-suppressing floor primer for high-RH magnesite and concrete substrates — confirm AU pack size with Ardex",
    productType: "Two-part epoxy moisture control primer",
    filterTags: ["2-Part-Epoxy", "High-RH", "Moisture-Control", "Floor-Levelling", "Magnesite"],
    techChips: [
      { label: "2-part epoxy", cls: "bg-sky-100 text-sky-800" },
      { label: "High-RH", cls: "bg-blue-100 text-blue-800" },
      { label: "Moisture control", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex MC Rapid is a two-part epoxy moisture control primer designed for substrates with elevated relative humidity — a condition commonly found over encapsulated magnesite floors. Applied as a single low-viscosity coat, it penetrates the substrate and forms a moisture barrier that allows self-levelling underlayments to be applied without adhesion failure or osmotic blistering caused by rising moisture.",
    technicalProperties: [
      "TODO: owner confirm — pack size: AU product page returned 404; US TDS lists a 6.25 L unit. Verify current AU pack size with Ardex Australia before publishing.",
      "Mix ratio: follow TDS — confirm current A:B ratio from Ardex Australia TDS",
      "TODO: owner confirm — RH rating: US TDS states 'up to 100% RH'; AU product page unavailable. Verify current AU RH rating with Ardex Australia before publishing.",
      "TODO: owner confirm — coverage: US TDS states approx. 23–25 m² per 6.25 L unit at 250 µm. AU coverage rate requires confirmation from Ardex Australia TDS.",
      "Overcoating time: check TDS — typically min. 4 hrs before SLC application (confirm current AU TDS)",
      "Complies with ASTM F2170 moisture testing protocol",
    ],
    limitations: [
      "Must not be applied over active water ingress, running water, or efflorescence",
      "Substrate must achieve minimum CSP 2 profile before primer application",
      "Do not apply to oily, dusty, or contaminated surfaces — adhesion failure will result",
      "Moisture testing (in-situ RH probe or calcium chloride) is mandatory before application",
      "Two-component mixing is time-critical — do not exceed pot life",
      "Remove all friable magnesite before priming — loose areas will cause SLC delamination",
    ],
    procurementSources: [
      { name: "Ardex Australia", url: "https://www.ardex.com.au" },
      { name: "Tile Depot (Ardex stockist)", url: "https://www.tiledepot.com.au/" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/flooring.html",
    accentColor: "#be123c",
    name: "Sika Primer MB — Two-Part Epoxy Moisture-Suppressing Floor Primer",
    descriptionLine: "Two-part epoxy moisture-suppressing floor primer for magnesite and concrete before self-levelling — 4 kg kit",
    productType: "Two-part epoxy moisture-suppressing floor primer",
    filterTags: ["2-Part-Epoxy", "High-RH", "Moisture-Control", "Floor-Levelling", "Magnesite"],
    techChips: [
      { label: "2-part epoxy", cls: "bg-red-100 text-red-800" },
      { label: "Moisture barrier", cls: "bg-rose-100 text-rose-800" },
      { label: "SLC primer", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Primer MB is a two-component solvent-free epoxy primer specifically formulated to suppress moisture vapour transmission from problematic substrates including over magnesite floors. When properly applied, it enables self-levelling compounds to bond to the substrate without the osmotic blistering or adhesion failure associated with high-RH slab surfaces in occupied buildings.",
    technicalProperties: [
      "Pack size: 4 kg kit (Part A 3 kg + Part B 1 kg)",
      "Two-component epoxy — mix per TDS before application",
      "TODO: owner confirm — rated RH limit: AU TDS (April 2023) states moisture content up to 6% CM (~9% Tramex); card claims '~97% RH when used with Sika Level floor systems' — this specific RH percentage could not be confirmed from the AU TDS PDF (binary-encoded, unreadable). Verify against current Sika AU TDS before publishing.",
      "Coverage: approximately 10–15 m²/4 kg kit depending on substrate porosity",
      "Apply by roller to achieve uniform coverage",
      "Allow to cure before applying self-levelling compound — typically 24 hrs at 20°C",
    ],
    limitations: [
      "Excess primer pooling must be avoided — roll out to prevent thick puddles which can remain tacky",
      "Not suitable for application over actively damp substrates with free water",
      "Remove all laitance, adhesive residues, and contamination before priming",
      "Working time limited — do not mix more than can be applied within pot life",
      "Must not be used as a standalone adhesive or bonding agent",
      "Always test RH before and after application to confirm moisture control performance",
    ],
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Sika Direct / distributor", url: "https://aus.sika.com/en/group/find-a-sika-branch.html" },
    ],
  },
  {
    fullLabel: "Fosroc Australia (via Parchem)",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#15803d",
    name: "Fosroc Nitoprime 28 — Two-Part Penetrating Epoxy Primer",
    descriptionLine: "Two-part penetrating epoxy primer for damp and high-moisture substrates before floor levelling — 4 L kit",
    productType: "Two-part penetrating epoxy floor primer",
    filterTags: ["2-Part-Epoxy", "High-RH", "Moisture-Control", "Adhesion-Primer", "Floor-Levelling"],
    techChips: [
      { label: "2-part epoxy", cls: "bg-green-100 text-green-800" },
      { label: "Penetrating", cls: "bg-emerald-100 text-emerald-800" },
      { label: "Damp substrates", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitoprime 28 is a low-viscosity two-part epoxy primer designed to penetrate into damp concrete and magnesite substrates, providing a moisture-tolerant bonding interface for subsequent floor levelling compounds. Its penetrating action consolidates soft surface layers and provides adhesion in conditions where standard acrylic primers would fail.",
    technicalProperties: [
      "Pack size: 4 L kit (A + B components)",
      "Low-viscosity — penetrating action into substrate pores",
      "Suitable for damp substrates — check TDS for maximum RH rating",
      "Coverage: approximately 5–8 m²/L on average porosity",
      "Cures to a tack-free, bondable surface",
      "Available through Parchem Construction Products Australia",
    ],
    limitations: [
      "Not suitable for free-water conditions — substrate must be damp but not wet",
      "Friable or delaminating magnesite must be removed before application",
      "Ensure uniform mixing of A and B components — unmixed material will not cure",
      "Pot life is limited — do not mix large quantities in warm weather",
      "Do not overcoat until tacky stage — check TDS for window",
      "Contact Parchem for current TDS and product availability",
    ],
    procurementSources: [
      { name: "Parchem Construction Products", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Parchem Construction Products",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#78716c",
    name: "Parchem Epirez 510 — Two-Part Low-Viscosity Epoxy Adhesion Primer",
    descriptionLine: "Two-part low-viscosity epoxy adhesion and moisture-control primer for floor applications — 5 L kit",
    productType: "Two-part low-viscosity epoxy floor adhesion primer",
    filterTags: ["2-Part-Epoxy", "High-RH", "Moisture-Control", "Adhesion-Primer", "Floor-Levelling"],
    techChips: [
      { label: "2-part epoxy", cls: "bg-stone-100 text-stone-800" },
      { label: "Low-viscosity", cls: "bg-slate-100 text-slate-700" },
      { label: "Adhesion primer", cls: "bg-zinc-100 text-zinc-800" },
    ],
    systemDescription:
      "Parchem Epirez 510 is a two-part low-viscosity epoxy primer used for adhesion and moisture control on floor substrates. Applied as a thin primer coat over prepared magnesite or concrete, it creates a chemically bonded interface for self-levelling underlayments. Suitable for substrates with moderate to high relative humidity where acrylic primers would fail.",
    technicalProperties: [
      "Pack size: 5 L kit",
      "Low-viscosity — penetrates porous concrete and magnesite surface",
      "Two-component — mix A and B before application",
      "Coverage: approximately 4–8 m²/L depending on porosity",
      "Apply by roller or brush — avoid excessive build-up",
      "Parchem-branded product — contact for current TDS",
    ],
    limitations: [
      "Not for application over standing water, oil contamination, or active salts",
      "Substrate preparation (CSP 2 minimum) is mandatory",
      "Overcoat window must be observed — too early or too late will affect bond",
      "Disposal of mixed epoxy components must comply with local waste regulations",
      "Pot life varies with temperature — reduce batch size in warm conditions",
      "Confirm compatibility with selected SLC brand before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Products", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au/",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/eco-prim-t-plus",
    accentColor: "#b45309",
    name: "Mapei Eco Prim T Plus — Single-Component Acrylic Floor Levelling Primer",
    descriptionLine: "Single-component acrylic adhesion primer for self-levelling underlayments over encapsulated magnesite — 1 L / 10 L",
    productType: "Single-component acrylic floor levelling primer",
    filterTags: ["1-Part-Acrylic", "Adhesion-Primer", "Floor-Levelling", "Magnesite"],
    techChips: [
      { label: "1-part acrylic", cls: "bg-amber-100 text-amber-800" },
      { label: "Ready to use", cls: "bg-yellow-100 text-yellow-800" },
      { label: "SLC primer", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Eco Prim T Plus is a single-component acrylic adhesion primer used directly from the container to prime surfaces before applying Mapei self-levelling underlayments. It is suitable over encapsulated magnesite where relative humidity is within acceptable limits. TODO: owner confirm — the product name on the AU Mapei website is 'Eco Prim T Plus', not 'Eco Prim T'. The old plain 'Eco Prim T' page returns 403 Forbidden — verify whether the product has been updated/renamed in Australia before specifying.",
    technicalProperties: [
      "Pack size: 1 L, 10 L",
      "Ready to use — no mixing required",
      "Coverage: 30–150 g/m² (i.e. approximately 7–33 m²/L) depending on substrate porosity",
      "Application method: roller or brush — work product into substrate",
      "Allow to become tacky before applying self-levelling compound; do not wait more than 24 hrs after application",
      "Compatible with Mapei Ultraplan Eco, Ultraplan Maxi Plus, and other Mapei SLC products",
    ],
    limitations: [
      "Not suitable for high-moisture substrates — use 2-part epoxy primer (e.g. Ardex MC Rapid, Sika Primer MB) when substrate moisture exceeds acceptable limits; confirm current RH threshold from Mapei AU TDS",
      "Do not dilute — use as supplied",
      "Do not apply in temperatures below 5°C or above 35°C",
      "One coat only — do not apply multiple coats",
      "SLC must be applied while primer is still tacky — if primer dries completely, re-prime",
      "Acrylic primer does not suppress moisture vapour — moisture testing mandatory before use",
    ],
    procurementSources: [
      { name: "Mapei Australia", url: "https://www.mapei.com/au/" },
      { name: "Mapei authorised distributors", url: "https://www.mapei.com/au/en/contact-us/where-to-buy" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "2-Part-Epoxy", label: "2-part epoxy" },
  { tag: "1-Part-Acrylic", label: "1-part acrylic" },
  { tag: "High-RH", label: "High RH" },
  { tag: "Moisture-Control", label: "Moisture control" },
  { tag: "Adhesion-Primer", label: "Adhesion primer" },
  { tag: "Floor-Levelling", label: "Floor levelling" },
  { tag: "Magnesite", label: "Magnesite" },
];

const TECH_INFO = {
  typicalApplications: [
    "Priming encapsulated magnesite floors before self-levelling underlayment application",
    "Moisture suppression on high-RH concrete slab surfaces before floor levelling",
    "Adhesion priming over non-porous, smooth, or contamination-risk substrates",
    "Pre-treatment of substrates where previous floor coverings have been removed",
    "Consolidating friable or powdery magnesite surface layers before levelling",
  ],
  selectionCriteria: [
    "Two-part epoxy primer: required when in-situ RH exceeds approximately 75%",
    "One-part acrylic primer: suitable when RH is within limits and substrate is sound",
    "Ardex MC Rapid / Sika Primer MB: preferred for occupied buildings with unknown magnesite condition",
    "Mapei Eco Prim T Plus: convenient single-component option for low-risk primed surfaces",
    "Match primer to SLC brand where possible for manufacturer warranty continuity",
    "Always test RH using ASTM F2170 in-situ probe or calcium chloride test before primer selection",
  ],
  limitations: [
    "No primer compensates for friable, actively corroding, or poorly adhered magnesite — remove first",
    "Primer does not eliminate the need for moisture testing — test before and after priming",
    "Primers do not provide structural consolidation of deeply carbonated or delaminated magnesite",
    "One-part acrylic primers are not moisture-barrier products and must not be used where RH is elevated",
    "Primer application over contaminated (oil, adhesive, paint) surfaces will fail — prepare substrate first",
  ],
  standardsNotes: [
    "ASTM F2170: standard for determining relative humidity in concrete floors",
    "ASTM F1869: calcium chloride test method for concrete moisture emission",
    "AS 1884: floor coverings — tolerances for floor surfaces in occupied buildings",
    "Manufacturer TDS: primer coverage rates, overcoating windows, and RH rating vary by product",
    "Safe Work Australia: guidance on magnesite dust management and respiratory hazards",
  ],
  suitableDefects: [
    "Magnesite flooring deterioration — pre-SLC primer treatment",
    "Moisture-affected concrete floor slabs before floor levelling",
    "Post-strip floor adhesive removal — adhesion primer for bare slab",
    "Corroded or partially removed magnesite before encapsulation and levelling",
  ],
  typicalSubstrates: [
    "Encapsulated magnesite flooring in Class 2 strata and residential buildings",
    "Concrete floor slabs with elevated or unknown relative humidity",
    "Smooth or non-absorptive concrete requiring adhesion improvement before SLC",
    "Previously adhesive-bonded surfaces after adhesive removal",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Ardex MC Rapid", brand: "Ardex", type: "2-part epoxy", rh: "TODO: confirm AU TDS", packSize: "TODO: confirm AU pack size" },
  { product: "Sika Primer MB", brand: "Sika", type: "2-part epoxy", rh: "TODO: confirm from AU TDS", packSize: "4 kg kit" },
  { product: "Fosroc Nitoprime 28", brand: "Fosroc/Parchem", type: "2-part epoxy", rh: "High-RH rated", packSize: "4 L kit" },
  { product: "Parchem Epirez 510", brand: "Parchem", type: "2-part epoxy", rh: "Moderate–high RH", packSize: "5 L kit" },
  { product: "Mapei Eco Prim T Plus", brand: "Mapei", type: "1-part acrylic", rh: "Low RH only — confirm AU TDS", packSize: "1 L / 10 L" },
];

export function MoistureSupprimersPrimersIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
          <BookOpen size={16} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Moisture suppression primers for magnesite flooring</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">Epoxy and acrylic primers that suppress moisture vapour from magnesite and concrete substrates before self-levelling underlayment. Read more ↓</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>
            Magnesite flooring (magnesium oxychloride cement) is found in thousands of Australian Class 2 strata buildings constructed from the 1950s to 1980s. When intact and well-encapsulated, it functions as a stable floor screed. The critical remediation challenge is moisture: magnesite is hygroscopic and contains chloride salts which attract and retain water vapour. When floor coverings are replaced or new self-levelling underlayments are applied directly over magnesite without moisture control, osmotic blistering, adhesion failure, and chloride-driven delamination occur within months.
          </p>
          <p>
            Moisture suppression primers address this by creating a vapour barrier between the magnesite substrate and the overlying floor levelling compound. Two-part epoxy primers (Ardex MC Rapid, Sika Primer MB, Fosroc Nitoprime 28) provide a genuine moisture barrier rated to elevated relative humidity levels — typically 85–97% depending on the product. Single-component acrylic primers (Mapei Eco Prim T) improve adhesion but do not suppress moisture and must only be used where RH has been tested and confirmed to be within acceptable limits.
          </p>
          <p>
            Mandatory pre-treatment steps before primer application include: magnesite moisture testing per ASTM F2170 (in-situ RH probe method) or ASTM F1869 (calcium chloride test); removal of all friable, delaminating, and actively corroding magnesite; grinding to a minimum CSP 2 surface profile; and removal of all contaminants (oil, adhesives, paint, laitance). No primer — however well specified — can compensate for inadequate substrate preparation.
          </p>
          <p>
            The primer selected must be compatible with the self-levelling underlayment system. Where manufacturer warranty is required, specifying both primer and SLC from the same manufacturer (e.g. Ardex MC Rapid + Ardex K 15; Sika Primer MB + Sika Level-01 Top) is the most defensible approach. Always confirm current product specification and RH rating against the manufacturer&apos;s current TDS.
          </p>
        </div>
      )}
    </div>
  );
}

export function MoistureSupprimersPrimersProductSection() {
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
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Type</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">RH rating</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Pack size</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 bg-inherit px-5 py-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.rh}</td>
                  <td className="px-4 py-3 text-slate-600">{row.packSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
