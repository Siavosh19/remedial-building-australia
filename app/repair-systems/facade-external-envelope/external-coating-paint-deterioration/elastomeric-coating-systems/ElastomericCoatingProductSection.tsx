"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Elastomeric"
  | "High-build"
  | "Exterior-topcoat"
  | "Masonry"
  | "Render"
  | "Flexible"
  | "Water-repellent"
  | "Textured";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux — Dulux Acratex Textur-Coat Elastomeric",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/acratex",
    accentColor: "#e2003a",
    name: "Dulux Acratex Textur-Coat Elastomeric",
    descriptionLine: "High-build elastomeric texture coating providing superior flexibility, crack accommodation, and weather resistance on masonry and render facades",
    productType: "High-build elastomeric texture topcoat",
    filterTags: ["Elastomeric", "High-build", "Exterior-topcoat", "Masonry", "Render", "Flexible", "Water-repellent", "Textured"],
    techChips: [
      { label: "Elastomeric", cls: "bg-red-100 text-red-700" },
      { label: "High-build", cls: "bg-orange-100 text-orange-700" },
      { label: "Textured", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Dulux Acratex Textur-Coat is a high-build elastomeric coating that provides a textured finish while incorporating the flexibility and elongation of a true elastomeric system. The thick film (1.0–1.5 mm DFT) bridges minor surface cracks and provides excellent protection against driving rain, UV, and carbonation ingress. Widely specified on high-rise residential and commercial facades for long-life coating systems.",
    technicalProperties: [
      "DFT: 1.0–1.5 mm (high-build, typically 2 coats)",
      "Elongation at break: >200% — true elastomeric performance",
      "Crack bridging: bridges cracks to 0.5 mm width",
      "Water repellency: hydrophobic surface texture",
      "Texture: roller-applied medium to coarse texture",
    ],
    limitations: [
      "High-build coatings are difficult to remove — surface preparation and substrate compatibility must be confirmed before application",
      "Not suitable over hollow or delaminated render — must be repaired first",
      "Requires full preparation including priming — do not apply to unprepared surfaces",
    ],
    procurementSources: [
      { name: "Dulux Trade — Acratex Range", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Solver — Solver Permalastic Elastomeric Coating",
    brandUrl: "https://www.solver.com.au",
    tdsUrl: "https://www.solver.com.au/products/exterior-coatings",
    accentColor: "#0057a8",
    name: "Solver Permalastic Elastomeric Coating",
    descriptionLine: "Flexible elastomeric exterior coating with high elongation for masonry and render facades requiring movement accommodation and waterproofing",
    productType: "Elastomeric exterior topcoat",
    filterTags: ["Elastomeric", "Exterior-topcoat", "Masonry", "Render", "Flexible", "Water-repellent", "High-build", "Textured"],
    techChips: [
      { label: "Elastomeric", cls: "bg-blue-100 text-blue-700" },
      { label: "Flexible", cls: "bg-sky-100 text-sky-700" },
      { label: "Water-repellent", cls: "bg-indigo-100 text-indigo-700" },
    ],
    systemDescription: "Solver Permalastic is a true elastomeric coating system with high elongation designed to bridge minor to moderate surface cracks and provide waterproofing protection on exterior masonry. The elastomeric film stretches over substrate movement and returns to its original position, preventing water ingress through fine cracks while maintaining a decorative finish. Suitable for rendered masonry facades.",
    technicalProperties: [
      "Elongation at break: >150–200%",
      "DFT: 0.5–1.0 mm per coat (high-build application)",
      "Coverage: 3–5 m²/L at full thickness",
      "Water resistance: excellent — repels driving rain",
      "Crack bridging: bridges fine to minor cracks",
    ],
    limitations: [
      "Not a substitute for structural waterproof membrane on water-retaining structures",
      "Smooth, reflective substrates require adequate key before application",
      "Multiple-coat application required to achieve full elastomeric thickness",
    ],
    procurementSources: [
      { name: "Solver Paints — Where to Buy", url: "https://www.solver.com.au" },
      { name: "Mitre 10", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl — Wattyl Weathermax Elastomeric",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en/wattyl-exterior",
    accentColor: "#cc0000",
    name: "Wattyl Weathermax Elastomeric",
    descriptionLine: "Premium elastomeric exterior coating with high elongation and waterproofing capability for render and masonry facades requiring crack accommodation",
    productType: "Premium elastomeric exterior topcoat",
    filterTags: ["Elastomeric", "High-build", "Exterior-topcoat", "Masonry", "Render", "Flexible", "Water-repellent", "Textured"],
    techChips: [
      { label: "Premium elastomeric", cls: "bg-red-100 text-red-700" },
      { label: "Waterproof", cls: "bg-blue-100 text-blue-700" },
      { label: "High-build", cls: "bg-orange-100 text-orange-700" },
    ],
    systemDescription: "Wattyl Weathermax Elastomeric provides high-build, waterproofing, and crack-bridging performance on rendered masonry facades. The premium elastomeric binder provides elongation well above standard acrylic coatings, making it the appropriate specification where render cracking is active or where the facade requires a waterproofing protection level above standard decorative coatings.",
    technicalProperties: [
      "Elongation at break: >200%",
      "DFT: 0.8–1.2 mm at full application rate",
      "Coverage: 3–5 m²/L",
      "Water penetration: EN 1062-3 Class W3 (very low water absorption)",
      "UV resistance: high — suitable for Australian conditions",
    ],
    limitations: [
      "High-build application requires roller technique — maintain uniform thickness",
      "Elastomeric coatings over unprepared or friable substrates will delaminate with the substrate",
      "Over-application creates non-breathable film on older masonry — check vapour permeability requirements",
    ],
    procurementSources: [
      { name: "Wattyl — Where to Buy", url: "https://www.wattyl.com.au" },
      { name: "Bunnings", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Elastomeric", label: "Elastomeric" },
  { id: "High-build", label: "High-build" },
  { id: "Exterior-topcoat", label: "Exterior topcoat" },
  { id: "Masonry", label: "Masonry" },
  { id: "Render", label: "Render" },
  { id: "Flexible", label: "Flexible" },
  { id: "Water-repellent", label: "Water-repellent" },
  { id: "Textured", label: "Textured" },
];

const COMPARISON_ROWS = [
  { product: "Dulux Acratex Textur-Coat", brand: "Dulux", type: "High-build elastomeric", dft: "1.0–1.5 mm", elongation: ">200%", crackBridge: "0.5 mm", keyFeature: "Textured finish, high-rise spec" },
  { product: "Solver Permalastic", brand: "Solver", type: "Elastomeric", dft: "0.5–1.0 mm", elongation: ">150–200%", crackBridge: "Fine–minor", keyFeature: "Flexible, water-repellent" },
  { product: "Wattyl Weathermax", brand: "Wattyl", type: "Premium elastomeric", dft: "0.8–1.2 mm", elongation: ">200%", crackBridge: "W3 waterproofing", keyFeature: "Premium waterproofing grade" },
];

const TECH_INFO = {
  typicalApplications: [
    "Long-life exterior coating on rendered masonry facades with fine surface cracking",
    "High-rise residential building facade protection and decoration",
    "Waterproofing-grade topcoat where render cracking has allowed water ingress",
    "Textured decorative and protective finish on commercial facades",
  ],
  selectionCriteria: [
    "Elastomeric coatings required where fine surface cracks are present and movement is expected",
    "High-build texture coatings preferred where render surface has minor imperfections to hide",
    "Select product with published EN 1062-3 Class W3 water absorption rating for waterproofing performance",
    "Confirm product vapour permeability — not all elastomeric coatings allow moisture egress from masonry",
  ],
  limitations: [
    "Elastomeric coatings do not bridge structural or wide cracks — repair cracks to <0.3 mm before application",
    "Full substrate preparation including consolidation, priming, and crack repair is prerequisite",
    "Improperly applied high-build coatings with variable DFT will result in premature cracking",
    "Overcoating existing elastomeric coatings requires compatibility testing — different systems may not bond",
  ],
  standardsNotes: [
    "AS 4548 — Guide to long-life coatings for concrete and masonry",
    "EN 1062-3 — Water transmission classification for facade coatings",
    "AS 3730 — Guide to properties of paints for buildings",
    "NATSPEC: Section 0233 — Exterior paint specification including elastomeric systems",
  ],
  suitableDefects: [
    "Fine surface cracking on render requiring crack-bridging topcoat",
    "Water ingress through fine render cracks in external wall",
    "Exterior coating deterioration on high-rise rendered facades",
    "Re-coating where long-life, low-maintenance facade protection is specified",
  ],
  typicalSubstrates: [
    "Cement render — existing (primed) and new (over alkali primer)",
    "Concrete and masonry block facade panels",
    "Brick masonry — confirmed product compatibility",
    "EIFS/render systems — elastomeric topcoat specified in EIFS system",
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

export function ElastomericCoatingIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Elastomeric Coating Systems</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Elastomeric coatings are high-build, high-elongation exterior coatings specified where standard acrylic paints are insufficient — primarily where facade render shows fine cracking, where waterproofing performance above standard paint is required, or where long-life service intervals are needed. The elastomeric film bridges fine cracks, returns to its original position after extension, and provides a waterproofing barrier comparable to a membrane system at much lower build thickness. They are standard fare on high-rise residential facade renovation projects.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "DFT system", value: "0.5–1.5 mm" },
          { label: "Elongation", value: ">150–200%" },
          { label: "Crack bridging", value: "Up to 0.5 mm" },
          { label: "Water class", value: "EN 1062 W3" },
        ].map((s) => (
          <div key={s.label} className="bg-red-50 rounded-xl p-3 text-center">
            <p className="text-xs text-red-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-red-900">{s.value}</p>
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

export function ElastomericCoatingProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-600 border-gray-300 hover:border-red-400"}`}>
            {f === "All" ? "All Products" : FILTER_DEFS.find((fd) => fd.id === f)?.label ?? f}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <div key={product.name} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wide hover:underline flex items-center gap-1" style={{ color: product.accentColor }}>
                  {product.fullLabel.split(" — ")[0]}<ExternalLink className="w-3 h-3 shrink-0" />
                </a>
                <h3 className="text-sm font-bold text-gray-900 mt-0.5 leading-snug">{product.name}</h3>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-2">{product.productType}</p>
            <CollapsibleDescription text={product.descriptionLine} />
            <div className="flex flex-wrap gap-1 mt-3">{product.techChips.map((chip) => <span key={chip.label} className={`text-xs px-2 py-0.5 rounded-full font-medium ${chip.cls}`}>{chip.label}</span>)}</div>
            <CollapsibleCardDetails product={product} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setShowComparison(!showComparison)} className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-800">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>{["Product", "Brand", "Type", "DFT", "Elongation", "Crack bridging", "Key feature"].map((h) => <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{row.product}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-gray-600">{row.dft}</td>
                    <td className="px-3 py-2 text-gray-600">{row.elongation}</td>
                    <td className="px-3 py-2 text-gray-600">{row.crackBridge}</td>
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
