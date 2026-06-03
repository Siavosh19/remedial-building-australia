"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Consolidant"
  | "Penetrating"
  | "Masonry"
  | "Concrete"
  | "Friable-surface"
  | "Epoxy"
  | "Acrylic"
  | "Heritage";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Mapei — Primer 3296 Penetrating Consolidant",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/product-detail/primer-3296",
    accentColor: "#003087",
    name: "Primer 3296 Penetrating Consolidant",
    descriptionLine: "Deep-penetrating acrylic primer and consolidant for friable, chalky, and powdery render and masonry surfaces prior to coating application",
    productType: "Penetrating acrylic consolidant primer",
    filterTags: ["Consolidant", "Penetrating", "Masonry", "Concrete", "Friable-surface", "Acrylic", "Heritage", "Epoxy"],
    techChips: [
      { label: "Penetrating", cls: "bg-blue-100 text-blue-700" },
      { label: "Acrylic consolidant", cls: "bg-indigo-100 text-indigo-700" },
      { label: "Friable surface", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Mapei Primer 3296 is a water-based acrylic primer that penetrates deeply into friable, chalky, or powdery render and masonry surfaces, binding loose particles and consolidating the substrate before topcoat application. It reduces the risk of topcoat delamination caused by weak, powdery bond zones in old or weathered render, and improves uniform porosity for consistent topcoat finish.",
    technicalProperties: [
      "Base: water-dilutable acrylic resin",
      "Dilution: apply diluted (1:4 with water) for first coat on high-porosity surfaces",
      "Coverage: ~6–10 m²/L depending on substrate porosity",
      "Penetration depth: up to 15 mm on porous substrates",
      "Recoat time: 1–2 h",
    ],
    limitations: [
      "Not a structural repair product — cracks and delaminated zones must be repaired before consolidant application",
      "Diluted first coat essential on very porous substrates — neat application may bridge pores rather than penetrate",
      "Consolidant film should be fully cured before topcoat application",
    ],
    procurementSources: [
      { name: "Mapei Australia — Distributor Search", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Sika — Sika Skim Coat Consolidant Primer",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/solutions/products",
    accentColor: "#cc0000",
    name: "Sika Consolidant Penetrating Primer",
    descriptionLine: "Solvent-free acrylic consolidant primer penetrating friable render and masonry to bind loose particles and stabilise the substrate before coating",
    productType: "Solvent-free acrylic penetrating primer",
    filterTags: ["Consolidant", "Penetrating", "Masonry", "Concrete", "Friable-surface", "Acrylic", "Heritage", "Epoxy"],
    techChips: [
      { label: "Solvent-free", cls: "bg-green-100 text-green-700" },
      { label: "Consolidant", cls: "bg-red-100 text-red-700" },
      { label: "Penetrating", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "Sika's penetrating consolidant primer is a low-viscosity, solvent-free acrylic formulation that soaks into weakened, chalky, or powdery render and concrete surfaces. It binds loose surface material, reduces water absorption variability, and provides a stable, uniform bond surface for subsequent painting or coating systems. Suitable for use on heritage masonry and weathered render requiring stabilisation.",
    technicalProperties: [
      "Base: solvent-free water-borne acrylic",
      "Viscosity: low — designed for maximum substrate penetration",
      "Coverage: 8–12 m²/L",
      "Compatibility: suitable under acrylic, elastomeric, and texture coating systems",
      "VOC: low — suitable for occupied building applications",
    ],
    limitations: [
      "Do not apply over wet or damp substrates — allow minimum 24 h drying after rain",
      "Multiple coats may be required on extremely friable substrates",
      "Not designed for use over impermeable or previously painted surfaces without adhesion test",
    ],
    procurementSources: [
      { name: "Sika Australia — Distributor Search", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc — Nitoflor FC Epoxy Consolidant",
    brandUrl: "https://www.fosroc.com/en-au",
    tdsUrl: "https://www.fosroc.com/en-au/products/concrete-repair-and-protection",
    accentColor: "#e87722",
    name: "Nitoflor FC Epoxy Consolidant",
    descriptionLine: "Low-viscosity two-component epoxy consolidant for extremely friable or delaminating concrete and render surfaces requiring high-strength particle binding",
    productType: "Low-viscosity two-component epoxy consolidant",
    filterTags: ["Consolidant", "Penetrating", "Masonry", "Concrete", "Friable-surface", "Epoxy", "Heritage", "Acrylic"],
    techChips: [
      { label: "Epoxy 2K", cls: "bg-orange-100 text-orange-700" },
      { label: "High-strength", cls: "bg-red-100 text-red-700" },
      { label: "Delaminating", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Nitoflor FC is a two-component, low-viscosity epoxy system used as a high-performance consolidant where acrylic penetrants are insufficient — for example on severely delaminating concrete soffits, heavily weathered concrete panels, or areas subject to ongoing moisture and mechanical stress. The epoxy cures to a rigid, high-strength bond that reinforces the fragmented substrate matrix.",
    technicalProperties: [
      "Components: Part A (epoxy resin) + Part B (amine hardener)",
      "Viscosity: very low — penetrates fine cracks and pore structure",
      "Compressive strength (cured): >35 MPa",
      "Bond strength: >2.0 MPa to concrete substrate",
      "Pot life: ~30–45 min at 23 °C",
    ],
    limitations: [
      "Not UV-stable — must be overcoated; not suitable as an exposed topcoat primer without overcoating",
      "Two-component system — pot life critical; do not mix large batches unless usage rate justifies",
      "Solvent-based grades available for extremely tight-pored substrates — check product range",
    ],
    procurementSources: [
      { name: "Fosroc Australia — Contact/Distributor", url: "https://www.fosroc.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Consolidant", label: "Consolidant" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Friable-surface", label: "Friable surface" },
  { id: "Epoxy", label: "Epoxy" },
  { id: "Acrylic", label: "Acrylic" },
  { id: "Heritage", label: "Heritage" },
];

const COMPARISON_ROWS = [
  { product: "Mapei Primer 3296", brand: "Mapei", type: "Acrylic penetrant", coverage: "6–10 m²/L", penetration: "Up to 15 mm", strength: "Moderate", keyFeature: "Dilutable, adjustable penetration" },
  { product: "Sika Consolidant Primer", brand: "Sika", type: "Solvent-free acrylic", coverage: "8–12 m²/L", penetration: "Good", strength: "Moderate", keyFeature: "Low VOC, low-viscosity" },
  { product: "Fosroc Nitoflor FC", brand: "Fosroc", type: "2K epoxy", coverage: "~4–8 m²/L", penetration: "Fine cracks + pores", strength: ">2.0 MPa bond", keyFeature: "Maximum strength for severe delamination" },
];

const TECH_INFO = {
  typicalApplications: [
    "Stabilising chalky, friable, or powdery old render before repaint",
    "Consolidating weathered concrete panel surfaces on facade restoration",
    "Binding loose particles on heritage masonry before coating",
    "Preparation of delaminating concrete soffits or spandrels before topcoat",
  ],
  selectionCriteria: [
    "Acrylic penetrants suited to lightly to moderately friable render and masonry",
    "Epoxy consolidants reserved for severely delaminating or structurally weakened surfaces",
    "Dilute application of acrylic consolidants on extremely high-porosity substrates for maximum penetration",
    "Check topcoat manufacturer's compatibility recommendations for consolidant and topcoat combination",
  ],
  limitations: [
    "Consolidants bind loose particles but do not restore structural integrity to significantly delaminated render",
    "Delaminated or hollow-sounding areas must be cut back and repaired — consolidant is not a substitute",
    "Excessive consolidant in pore-sealed form can reduce substrate breathability",
    "Do not apply epoxy consolidant over surfaces likely to remain damp — moisture trapped under epoxy leads to osmotic blistering",
  ],
  standardsNotes: [
    "AS 4548 — Guide to long-life coatings for concrete and masonry",
    "ICOMOS guidelines for use of consolidants on heritage masonry",
    "Manufacturer TDS governs dilution ratio and number of coats required",
    "Pull-off adhesion test (AS 1580.408.4) recommended to verify substrate consolidation before topcoat",
  ],
  suitableDefects: [
    "Chalking and powdering of old exterior render and concrete",
    "Friable surface of weathered masonry causing paint topcoat adhesion failure",
    "Delaminating and spalling render as secondary stabilisation after patching",
    "Heritage masonry stabilisation before protective coating application",
  ],
  typicalSubstrates: [
    "Old, weathered cement render (friable surface zone)",
    "Exposed concrete — spandrel panels, soffits, columns",
    "Porous brick and blockwork masonry",
    "Heritage lime render and stone masonry — confirm compatibility",
  ],
};

function CollapsibleSources({ sources }: { sources: { name: string; url: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-gray-600 hover:text-gray-800 font-medium text-sm">
        <span className="text-gray-800">Procurement Sources</span>{open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <ul className="px-4 py-3 space-y-2 bg-white">{sources.map((s, i) => <li key={i}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">{s.name}<ExternalLink className="w-3 h-3" /></a></li>)}</ul>}
    </div>
  );
}

function CollapsibleCardDetails({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-gray-600 hover:text-gray-800 font-medium text-sm">
        <span className="text-gray-800">Technical Details</span>{open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <div className="px-4 py-3 space-y-3 bg-white">
          <div><p className="text-xs font-semibold text-gray-500 uppercase mb-1">System Description</p><p className="text-sm text-gray-700">{product.systemDescription}</p></div>
          <div><p className="text-xs font-semibold text-gray-500 uppercase mb-1">Technical Properties</p><ul className="space-y-1">{product.technicalProperties.map((p, i) => <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-blue-600 mt-0.5">•</span>{p}</li>)}</ul></div>
          <div><p className="text-xs font-semibold text-gray-500 uppercase mb-1">Limitations</p><ul className="space-y-1">{product.limitations.map((l, i) => <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-amber-500 mt-0.5">⚠</span>{l}</li>)}</ul></div>
          <CollapsibleSources sources={product.procurementSources} />
        </div>
      )}
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const short = text.length > 120 ? text.slice(0, 120) + "…" : text;
  if (text.length <= 120) return <p className="text-sm text-gray-600 mt-1">{text}</p>;
  return (
    <div className="mt-1">
      <p className="text-sm text-gray-600">{open ? text : short}</p>
      <button onClick={() => setOpen(!open)} className="text-xs text-blue-600 hover:underline mt-0.5">{open ? "Show less" : "Read more"}</button>
    </div>
  );
}

export function PenetratingConsolidantIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Penetrating Consolidant Systems</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Penetrating consolidants stabilise friable, chalky, or weakened render and masonry surfaces before protective or decorative coatings are applied. They penetrate the surface pore structure, binding loose particles and reducing absorption variability. Without consolidation, topcoats applied over friable substrates delaminate with the weak substrate zone, not at the paint-to-substrate interface. Acrylic consolidants are suitable for moderately friable surfaces; low-viscosity epoxy consolidants are reserved for severely delaminating substrates.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Type", value: "Acrylic / epoxy" },
          { label: "Mechanism", value: "Pore penetration" },
          { label: "Coverage", value: "4–12 m²/L" },
          { label: "Recoat", value: "1–4 hours" },
        ].map((s) => (
          <div key={s.label} className="bg-indigo-50 rounded-xl p-3 text-center">
            <p className="text-xs text-indigo-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-indigo-900">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechCard({ title, color, items }: { title: string; color: string; items: string[] }) {
  const map: Record<string, { bg: string; border: string; head: string; dot: string }> = {
    blue: { bg: "bg-blue-50", border: "border-blue-200", head: "text-blue-800", dot: "text-blue-500" },
    green: { bg: "bg-green-50", border: "border-green-200", head: "text-green-800", dot: "text-green-500" },
    amber: { bg: "bg-amber-50", border: "border-amber-200", head: "text-amber-800", dot: "text-amber-500" },
    purple: { bg: "bg-purple-50", border: "border-purple-200", head: "text-purple-800", dot: "text-purple-500" },
    red: { bg: "bg-red-50", border: "border-red-200", head: "text-red-800", dot: "text-red-500" },
    gray: { bg: "bg-gray-50", border: "border-gray-200", head: "text-gray-800", dot: "text-gray-500" },
  };
  const c = map[color] ?? map.blue;
  return (
    <div className={`${c.bg} border ${c.border} rounded-xl p-4`}>
      <h4 className={`font-semibold text-sm mb-2 ${c.head}`}>{title}</h4>
      <ul className="space-y-1">{items.map((it, i) => <li key={i} className="text-xs text-gray-700 flex gap-2"><span className={`${c.dot} mt-0.5 shrink-0`}>•</span>{it}</li>)}</ul>
    </div>
  );
}

export function PenetratingConsolidantProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}>
            {f === "All" ? "All Products" : FILTER_DEFS.find((fd) => fd.id === f)?.label ?? f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <div key={product.name} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <a href={product.brandUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-wide hover:underline flex items-center gap-1"
                  style={{ color: product.accentColor }}>
                  {product.fullLabel.split(" — ")[0]}<ExternalLink className="w-3 h-3 shrink-0" />
                </a>
                <h3 className="text-sm font-bold text-gray-900 mt-0.5 leading-snug">{product.name}</h3>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-2">{product.productType}</p>
            <CollapsibleDescription text={product.descriptionLine} />
            <div className="flex flex-wrap gap-1 mt-3">
              {product.techChips.map((chip) => (
                <span key={chip.label} className={`text-xs px-2 py-0.5 rounded-full font-medium ${chip.cls}`}>{chip.label}</span>
              ))}
            </div>
            <CollapsibleCardDetails product={product} />
          </div>
        ))}
      </div>

      <div>
        <button onClick={() => setShowComparison(!showComparison)}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>
                  {["Product", "Brand", "Type", "Coverage", "Penetration", "Strength", "Key feature"].map((h) => (
                    <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{row.product}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-gray-600">{row.coverage}</td>
                    <td className="px-3 py-2 text-gray-600">{row.penetration}</td>
                    <td className="px-3 py-2 text-gray-600">{row.strength}</td>
                    <td className="px-3 py-2 text-gray-600">{row.keyFeature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <TechCard title="Typical Applications" color="blue" items={TECH_INFO.typicalApplications} />
        <TechCard title="Selection Criteria" color="green" items={TECH_INFO.selectionCriteria} />
        <TechCard title="Limitations" color="amber" items={TECH_INFO.limitations} />
        <TechCard title="Standards & Notes" color="purple" items={TECH_INFO.standardsNotes} />
        <TechCard title="Suitable Defects" color="red" items={TECH_INFO.suitableDefects} />
        <TechCard title="Typical Substrates" color="gray" items={TECH_INFO.typicalSubstrates} />
      </div>
    </div>
  );
}
