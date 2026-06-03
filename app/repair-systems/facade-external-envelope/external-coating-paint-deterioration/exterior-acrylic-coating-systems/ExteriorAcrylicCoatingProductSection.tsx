"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Acrylic"
  | "Two-coat"
  | "Exterior-topcoat"
  | "Masonry"
  | "Render"
  | "UV-resistant"
  | "Water-based"
  | "Weatherproof";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux — Dulux Weathershield Exterior Acrylic",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/exterior",
    accentColor: "#e2003a",
    name: "Dulux Weathershield Exterior Acrylic",
    descriptionLine: "Premium 100% acrylic exterior paint providing long-life UV resistance and weather protection for masonry and render facades",
    productType: "100% acrylic exterior topcoat",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "UV-resistant", "Water-based", "Weatherproof"],
    techChips: [
      { label: "100% Acrylic", cls: "bg-red-100 text-red-700" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "Dulux Weathershield is the benchmark exterior acrylic paint for masonry and render facades in Australia. The 100% acrylic binder provides excellent UV resistance, colour retention, and film flexibility, allowing the coating to move with the substrate through seasonal temperature cycling without cracking. Applied as a two-coat system over alkali-resistant primer, it forms a durable weather barrier on residential and commercial buildings.",
    technicalProperties: [
      "Binder: 100% pure acrylic emulsion",
      "DFT: 35–50 µm per coat (two coats = 70–100 µm system)",
      "Coverage: 12–16 m²/L",
      "UV resistance: high — resists chalking and colour fade",
      "Mould resistance: low-sheen formula includes mould-resistant additives",
    ],
    limitations: [
      "Requires alkali-resistant primer on new render — do not apply direct to unpainted new render",
      "Not a crack-bridging coating — use elastomeric system where crack movement is anticipated",
      "Minimum 10 °C application temperature",
    ],
    procurementSources: [
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Solver — Solver Permalastic Exterior Acrylic",
    brandUrl: "https://www.solver.com.au",
    tdsUrl: "https://www.solver.com.au/products/exterior-coatings",
    accentColor: "#0057a8",
    name: "Solver Permalastic Exterior Acrylic",
    descriptionLine: "Flexible acrylic exterior coating for masonry and render providing weather resistance with improved elongation to accommodate surface movement",
    productType: "Flexible acrylic exterior topcoat",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "UV-resistant", "Water-based", "Weatherproof"],
    techChips: [
      { label: "Flexible acrylic", cls: "bg-blue-100 text-blue-700" },
      { label: "Weather-resistant", cls: "bg-sky-100 text-sky-700" },
      { label: "Masonry", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Solver Permalastic provides a flexible acrylic film with higher elongation than standard acrylics, better accommodating thermal movement and minor substrate cracking. It is applied as a two-coat exterior topcoat over alkali-resistant primer and is well-suited to rendered masonry buildings on the east coast of Australia where temperature cycling and humidity are significant coating stress factors.",
    technicalProperties: [
      "Binder: acrylic emulsion — high-elongation grade",
      "Elongation at break: >150% (improved thermal accommodation)",
      "Coverage: 10–14 m²/L",
      "DFT: 40–55 µm per coat",
      "Mould resistance: integral additives for shaded exposures",
    ],
    limitations: [
      "Not a full crack-bridging system — maximum crack accommodation is minor surface movement only",
      "Higher elongation coatings may sag on vertical surfaces if applied too thickly — follow coverage rates",
      "Best suited to masonry and render — check suitability for other substrates with TDS",
    ],
    procurementSources: [
      { name: "Solver Paints — Where to Buy", url: "https://www.solver.com.au" },
      { name: "Mitre 10 / True Value Hardware", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "Taubmans — Taubmans Endure Exterior Acrylic",
    brandUrl: "https://www.taubmans.com.au",
    tdsUrl: "https://www.taubmans.com.au/products/exterior",
    accentColor: "#005baa",
    name: "Taubmans Endure Exterior Acrylic",
    descriptionLine: "High-durability acrylic exterior coating with advanced UV stabilisers for extended colour retention and weathering resistance on masonry facades",
    productType: "High-durability acrylic exterior topcoat",
    filterTags: ["Acrylic", "Two-coat", "Exterior-topcoat", "Masonry", "Render", "UV-resistant", "Water-based", "Weatherproof"],
    techChips: [
      { label: "High-durability", cls: "bg-blue-100 text-blue-700" },
      { label: "UV stabilised", cls: "bg-amber-100 text-amber-700" },
      { label: "Acrylic", cls: "bg-indigo-100 text-indigo-700" },
    ],
    systemDescription: "Taubmans Endure incorporates advanced UV stabilisers and a high-solids acrylic binder for extended service life on exterior masonry. The improved UV package reduces colour fade and chalking compared to entry-level acrylics, making it appropriate for buildings in high-UV environments across Queensland and Northern Australia where coating deterioration is accelerated.",
    technicalProperties: [
      "Binder: high-solids acrylic with UV stabiliser package",
      "Coverage: 12–16 m²/L",
      "UV resistance: advanced — extended colour retention vs standard acrylic",
      "DFT: 35–45 µm per coat",
      "Available in low-sheen and semi-gloss finishes",
    ],
    limitations: [
      "Alkali-resistant primer mandatory on new or unpainted cement render",
      "Not suitable for horizontal or ponding water applications",
      "Colour consistency across recoating intervals requires same batch tinting",
    ],
    procurementSources: [
      { name: "Taubmans — Where to Buy", url: "https://www.taubmans.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Acrylic", label: "Acrylic" },
  { id: "Two-coat", label: "Two-coat" },
  { id: "Exterior-topcoat", label: "Exterior topcoat" },
  { id: "Masonry", label: "Masonry" },
  { id: "Render", label: "Render" },
  { id: "UV-resistant", label: "UV-resistant" },
  { id: "Water-based", label: "Water-based" },
  { id: "Weatherproof", label: "Weatherproof" },
];

const COMPARISON_ROWS = [
  { product: "Dulux Weathershield Acrylic", brand: "Dulux", type: "100% acrylic", dft: "35–50 µm/coat", coverage: "12–16 m²/L", elongation: "Standard", keyFeature: "Market benchmark, long track record" },
  { product: "Solver Permalastic Acrylic", brand: "Solver", type: "Flexible acrylic", dft: "40–55 µm/coat", coverage: "10–14 m²/L", elongation: ">150%", keyFeature: "Higher elongation, accommodates movement" },
  { product: "Taubmans Endure Acrylic", brand: "Taubmans", type: "High-solids acrylic", dft: "35–45 µm/coat", coverage: "12–16 m²/L", elongation: "Standard–enhanced", keyFeature: "Advanced UV stabilisers, fade resistance" },
];

const TECH_INFO = {
  typicalApplications: [
    "Two-coat acrylic topcoat on primed cement render facades",
    "Exterior repaint of masonry buildings — full repaint restoration",
    "Decorative and protective coating on new construction masonry",
    "Colour change repaints on existing painted masonry",
  ],
  selectionCriteria: [
    "Standard acrylic for buildings in moderate UV and weather exposure",
    "High-UV-stabilised systems for Queensland and tropical Australia exposures",
    "Flexible acrylic where substrate has minor thermal movement or micro-cracking",
    "Always apply over alkali-resistant primer on new or unpainted render",
  ],
  limitations: [
    "Acrylic topcoats do not bridge active or moving cracks — specify elastomeric system for crack-affected facades",
    "All exterior acrylics require substrate preparation including biocide treatment, crack repair, and priming",
    "Colour retention and UV performance vary between product grades — specify premium grade for high-UV exposures",
    "Touch-up areas must be primed before topcoat to avoid sheen variation",
  ],
  standardsNotes: [
    "AS 3730 — Guide to properties of paints for buildings",
    "AS 4548 — Guide to long-life coatings for concrete and masonry",
    "NATSPEC: Section 0233 — Exterior painting specification",
    "Manufacturer TDS — coverage rates, thinning requirements, and overcoating intervals",
  ],
  suitableDefects: [
    "Chalking and weathering of existing exterior coating",
    "Colour fading and UV degradation of painted facade",
    "Minor coating peeling where substrate is sound — after preparation",
    "New render requiring first-time coating after cure",
  ],
  typicalSubstrates: [
    "Cement render — new (primed) and existing painted",
    "Brick and block masonry facades",
    "Concrete panel construction",
    "Fibre cement cladding — confirm system suitability",
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

export function ExteriorAcrylicCoatingIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Exterior Acrylic Coating Systems</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Exterior acrylic coatings are the most commonly specified topcoat for cement render and masonry facades in Australia. They provide UV resistance, weather protection, colour retention, and moderate flexibility at an economical cost. Applied as a two-coat system over alkali-resistant primer, they form the final weather barrier in a standard exterior painting specification. Premium grades incorporate UV stabilisers for extended service life in high-UV coastal and tropical environments.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Binder", value: "100% acrylic" },
          { label: "DFT system", value: "70–100 µm" },
          { label: "Coverage", value: "10–16 m²/L" },
          { label: "Application", value: "Brush / roller / spray" },
        ].map((s) => (
          <div key={s.label} className="bg-sky-50 rounded-xl p-3 text-center">
            <p className="text-xs text-sky-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-sky-900">{s.value}</p>
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

export function ExteriorAcrylicCoatingProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-600 border-gray-300 hover:border-sky-400"}`}>
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
        <button onClick={() => setShowComparison(!showComparison)} className="flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-800">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>{["Product", "Brand", "Type", "DFT/coat", "Coverage", "Elongation", "Key feature"].map((h) => <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{row.product}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-gray-600">{row.dft}</td>
                    <td className="px-3 py-2 text-gray-600">{row.coverage}</td>
                    <td className="px-3 py-2 text-gray-600">{row.elongation}</td>
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
