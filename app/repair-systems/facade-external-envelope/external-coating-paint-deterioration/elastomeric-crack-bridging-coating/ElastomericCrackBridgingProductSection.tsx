"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Crack-bridging"
  | "Elastomeric"
  | "High-elongation"
  | "Masonry"
  | "Render"
  | "Waterproofing"
  | "Movement-accommodation"
  | "Exterior";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux — Dulux Acratex Maxfilm Crack-Bridging",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/acratex",
    accentColor: "#e2003a",
    name: "Dulux Acratex Maxfilm Crack-Bridging",
    descriptionLine: "Ultra-high elongation elastomeric crack-bridging coating spanning active cracks up to 1.5 mm on render and masonry facades",
    productType: "Ultra-high elongation crack-bridging coating",
    filterTags: ["Crack-bridging", "Elastomeric", "High-elongation", "Masonry", "Render", "Waterproofing", "Movement-accommodation", "Exterior"],
    techChips: [
      { label: "Crack-bridging", cls: "bg-red-100 text-red-700" },
      { label: "1.5 mm cracks", cls: "bg-orange-100 text-orange-700" },
      { label: "High elongation", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription: "Dulux Acratex Maxfilm is an ultra-high elongation elastomeric coating formulated specifically for crack-bridging applications on rendered masonry facades. The system bridges active cracks up to 1.5 mm in width with repeated movement cycling, maintaining film integrity and water exclusion across the crack. Applied as a dedicated crack-bridging system rather than a general elastomeric topcoat, it is typically specified where render cracking is actively progressing or where thermal movement is significant.",
    technicalProperties: [
      "Elongation at break: >300% — ultra-high elongation grade",
      "Crack bridging (dynamic): up to 1.5 mm width, repeated cycling",
      "DFT: 0.8–1.5 mm minimum for full crack-bridging performance",
      "Water resistance: EN 1062 Class W3",
      "Application: brush, roller, or airless spray",
    ],
    limitations: [
      "Wide or structural cracks (>1.5 mm) require repair before coating — not a structural repair system",
      "Surface preparation including priming is mandatory for bond integrity under repeated crack movement",
      "Cannot bridge cracks in substrate that is actively delaminating or hollow — repair first",
    ],
    procurementSources: [
      { name: "Dulux Trade — Acratex Range", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Solver — Solver CrackShield Elastomeric System",
    brandUrl: "https://www.solver.com.au",
    tdsUrl: "https://www.solver.com.au/products/exterior-coatings",
    accentColor: "#0057a8",
    name: "Solver CrackShield Elastomeric System",
    descriptionLine: "High-elongation elastomeric crack-bridging system for render and masonry facades where fine to moderate cracking requires dynamic movement accommodation",
    productType: "High-elongation elastomeric crack-bridging system",
    filterTags: ["Crack-bridging", "Elastomeric", "High-elongation", "Masonry", "Render", "Waterproofing", "Movement-accommodation", "Exterior"],
    techChips: [
      { label: "Crack-bridging", cls: "bg-blue-100 text-blue-700" },
      { label: "High-elongation", cls: "bg-sky-100 text-sky-700" },
      { label: "Elastomeric", cls: "bg-indigo-100 text-indigo-700" },
    ],
    systemDescription: "Solver CrackShield is a purpose-formulated crack-bridging elastomeric system providing dynamic movement accommodation for render and masonry facades with active fine-to-moderate cracking. The high elongation film spans the crack and returns to its original state after movement, maintaining weatherproofing integrity. Applied as a two-coat system at defined minimum DFT, it provides reliable crack-bridging under Australian climate conditions.",
    technicalProperties: [
      "Elongation at break: >200–250%",
      "Crack bridging: dynamic bridging of fine to moderate cracks",
      "DFT: 0.6–1.2 mm (apply at minimum recommended thickness)",
      "Water resistance: high — tested to EN 1062",
      "UV stability: good — for Australian outdoor exposure",
    ],
    limitations: [
      "Does not replace resin injection for structural crack repair — coating bridges but does not seal cracks structurally",
      "For best performance on very active cracks, apply over glass fibre mesh reinforcing tape at crack lines",
      "Not suitable for use on surfaces subject to standing or ponding water",
    ],
    procurementSources: [
      { name: "Solver Paints — Where to Buy", url: "https://www.solver.com.au" },
      { name: "Mitre 10", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl — Wattyl Weathermax Plus Crack-Bridge",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en/wattyl-exterior",
    accentColor: "#cc0000",
    name: "Wattyl Weathermax Plus Crack-Bridge",
    descriptionLine: "Premium crack-bridging elastomeric coating providing dynamic movement accommodation and waterproofing on render and masonry facades",
    productType: "Premium crack-bridging elastomeric coating",
    filterTags: ["Crack-bridging", "Elastomeric", "High-elongation", "Masonry", "Render", "Waterproofing", "Movement-accommodation", "Exterior"],
    techChips: [
      { label: "Premium grade", cls: "bg-red-100 text-red-700" },
      { label: "Dynamic bridging", cls: "bg-orange-100 text-orange-700" },
      { label: "Waterproofing", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "Wattyl Weathermax Plus is the crack-bridging grade of the Weathermax elastomeric range, formulated for facades where repeated crack movement must be accommodated over the coating's service life. The ultra-flexible film spans active cracks under thermal cycling, preventing water ingress while providing a decorative finish. Particularly suitable for multi-storey residential and commercial facade renovation where crack-bridging performance is a key specification requirement.",
    technicalProperties: [
      "Elongation at break: >250%",
      "Dynamic crack-bridging: tested under repeated movement cycling",
      "DFT: 0.8–1.5 mm",
      "Coverage: 3–4 m²/L",
      "Vapour permeable: moderate — check project vapour management requirements",
    ],
    limitations: [
      "Cracks wider than 1.0 mm should be repaired and the coating applied with mesh reinforcement over the repaired line",
      "Minimum substrate temperature 8 °C during application",
      "Do not apply in direct sunlight on hot days — film surface may dry before adequate penetration bond",
    ],
    procurementSources: [
      { name: "Wattyl — Where to Buy", url: "https://www.wattyl.com.au" },
      { name: "Bunnings", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Crack-bridging", label: "Crack-bridging" },
  { id: "Elastomeric", label: "Elastomeric" },
  { id: "High-elongation", label: "High elongation" },
  { id: "Masonry", label: "Masonry" },
  { id: "Render", label: "Render" },
  { id: "Waterproofing", label: "Waterproofing" },
  { id: "Movement-accommodation", label: "Movement accommodation" },
  { id: "Exterior", label: "Exterior" },
];

const COMPARISON_ROWS = [
  { product: "Dulux Acratex Maxfilm", brand: "Dulux", type: "Ultra-high elongation", dft: "0.8–1.5 mm", elongation: ">300%", crackWidth: "Up to 1.5 mm", keyFeature: "Highest crack width tolerance" },
  { product: "Solver CrackShield", brand: "Solver", type: "High elongation", dft: "0.6–1.2 mm", elongation: ">200–250%", crackWidth: "Fine–moderate", keyFeature: "Mesh reinforcement option" },
  { product: "Wattyl Weathermax Plus", brand: "Wattyl", type: "Premium crack-bridging", dft: "0.8–1.5 mm", elongation: ">250%", crackWidth: "Up to 1.0 mm+", keyFeature: "Dynamic cycling tested" },
];

const TECH_INFO = {
  typicalApplications: [
    "Render facades with active fine-to-moderate cracking requiring decorative waterproofing coating",
    "Multi-storey residential facade renovation where crack bridging is a key specification requirement",
    "Commercial facades subject to thermal movement and regular fine crack cycling",
    "Over-render systems applied to new construction with potential settlement cracking",
  ],
  selectionCriteria: [
    "Specify crack bridging width based on maximum expected crack width, not current crack width",
    "For cracks >0.5 mm, reinforce with glass fibre mesh tape before coating application",
    "Ultra-high elongation systems for facades with documented active crack movement",
    "Confirm minimum DFT for specified crack-bridging grade — under-application negates crack-bridging performance",
  ],
  limitations: [
    "Crack-bridging coatings are not a substitute for structural crack repair on load-bearing elements",
    "Wide cracks (>1.5 mm) require injection repair before any coating is specified",
    "Coatings cannot bridge cracks that are still actively growing — cause must be identified and arrested",
    "Over-application of thick elastomeric coatings may reduce substrate vapour permeability",
  ],
  standardsNotes: [
    "EN 1062 — characterisation and specification of liquid applied coatings for masonry, including crack-bridging performance",
    "AS 4548 — long-life coatings for concrete and masonry",
    "Technical guidance: CSIRO Building Technology File — specification of crack-bridging coatings",
    "Manufacturer TDS and crack-bridging test report should be referenced in project specification",
  ],
  suitableDefects: [
    "Fine to moderate render cracking with known thermal movement patterns",
    "Render cracks causing water ingress staining and internal dampness",
    "Facades previously treated with standard acrylic where crack-bridging upgrade is required",
    "Post-structural repair coating to bridge repaired crack lines under movement",
  ],
  typicalSubstrates: [
    "Cement render — new and existing, primed",
    "Polymer-modified and EIFS render systems — confirm topcoat compatibility",
    "Masonry block and brick facades",
    "Concrete panel facades with fine surface cracking",
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

export function ElastomericCrackBridgingIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Elastomeric Crack-Bridging Coating</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Crack-bridging elastomeric coatings are a distinct category from standard elastomeric topcoats — they are specifically engineered and tested to dynamically bridge active cracks under repeated thermal cycling. They are specified when facade render is actively cracking or has a documented history of recurring cracks that have not responded to fill-and-paint remediation. The coating spans the crack, returning to its original position after each movement cycle, maintaining the waterproofing barrier over the service life of the system.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Elongation", value: ">200–300%" },
          { label: "Crack width", value: "Up to 1.5 mm" },
          { label: "DFT minimum", value: "0.6–1.5 mm" },
          { label: "Water class", value: "EN 1062 W3" },
        ].map((s) => (
          <div key={s.label} className="bg-amber-50 rounded-xl p-3 text-center">
            <p className="text-xs text-amber-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-amber-900">{s.value}</p>
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

export function ElastomericCrackBridgingProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-amber-600 text-white border-amber-600" : "bg-white text-gray-600 border-gray-300 hover:border-amber-400"}`}>
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
        <button onClick={() => setShowComparison(!showComparison)} className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-800">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>{["Product", "Brand", "Type", "DFT", "Elongation", "Crack width", "Key feature"].map((h) => <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{row.product}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-gray-600">{row.dft}</td>
                    <td className="px-3 py-2 text-gray-600">{row.elongation}</td>
                    <td className="px-3 py-2 text-gray-600">{row.crackWidth}</td>
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
