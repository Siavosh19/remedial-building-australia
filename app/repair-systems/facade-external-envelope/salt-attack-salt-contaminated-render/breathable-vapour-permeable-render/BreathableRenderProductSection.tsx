"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Vapour-permeable"
  | "Breathable"
  | "Lime-based"
  | "Masonry"
  | "Heritage"
  | "Salt-resistant"
  | "Natural-hydraulic-lime"
  | "Low-modulus";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Mapei — Antolith NHL Breathable Render",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions",
    accentColor: "#003087",
    name: "Antolith NHL Breathable Render",
    descriptionLine: "Natural hydraulic lime render system providing high vapour permeability and self-healing micro-crack behaviour for salt-affected masonry",
    productType: "Natural hydraulic lime (NHL) render",
    filterTags: ["Vapour-permeable", "Breathable", "Lime-based", "Masonry", "Heritage", "Salt-resistant", "Natural-hydraulic-lime", "Low-modulus"],
    techChips: [
      { label: "NHL lime", cls: "bg-stone-100 text-stone-700" },
      { label: "Vapour-permeable", cls: "bg-green-100 text-green-700" },
      { label: "Heritage", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription: "Mapei's NHL-based render system uses natural hydraulic lime as the primary binder, producing a vapour-permeable, low-modulus render that allows moisture to escape from the wall rather than trap it. The high sd-value (low vapour resistance) prevents salt concentration at the render-substrate interface, significantly reducing delamination and spalling compared to conventional cement renders on old masonry.",
    technicalProperties: [
      "Binder: natural hydraulic lime (NHL 3.5 or 5) — low modulus",
      "Vapour permeability (sd-value): <0.5 m — highly breathable",
      "Flexural strength: 1.5–3.5 MPa (accommodates thermal movement)",
      "Water absorption: controlled — resists driving rain while breathing",
      "Self-healing micro-cracks via lime carbonation",
    ],
    limitations: [
      "Slower strength gain than OPC render — extended curing and protection required",
      "Not appropriate for substrates requiring high compressive bond (structural applications)",
      "Cost premium over OPC renders — justified on heritage and salt-affected buildings",
    ],
    procurementSources: [
      { name: "Mapei Australia — Distributor Search", url: "https://www.mapei.com/au" },
      { name: "Lime & Stone Building Materials", url: "https://www.limeandstone.com.au" },
    ],
  },
  {
    fullLabel: "Rockcote — Breathable Render System",
    brandUrl: "https://www.rockcote.com.au",
    tdsUrl: "https://www.rockcote.com.au/products",
    accentColor: "#8B5E3C",
    name: "Rockcote Breathable Render System",
    descriptionLine: "Polymer-enhanced, vapour-permeable render formulated to allow moisture vapour transmission from masonry walls affected by salt and rising damp",
    productType: "Polymer-modified breathable render",
    filterTags: ["Vapour-permeable", "Breathable", "Salt-resistant", "Masonry", "Low-modulus", "Heritage", "Lime-based", "Natural-hydraulic-lime"],
    techChips: [
      { label: "Breathable", cls: "bg-green-100 text-green-700" },
      { label: "Polymer-modified", cls: "bg-blue-100 text-blue-700" },
      { label: "Salt-resistant", cls: "bg-cyan-100 text-cyan-700" },
    ],
    systemDescription: "Rockcote's breathable render system is formulated with a reduced OPC content and enhanced pore structure to achieve a high vapour transmission rate. The system is specified for masonry walls where trapped moisture is the primary driver of salt crystallisation damage. Applied as a two-coat system, it allows the wall assembly to dry towards the exterior without losing its resistance to driving rain.",
    technicalProperties: [
      "System: two-coat — base coat + texture coat",
      "Vapour transmission: high — sd-value <1.0 m",
      "Application thickness: 10–18 mm total",
      "Compressive strength: 8–15 MPa (controlled — not over-hard for old masonry)",
      "Coverage: ~18–22 kg/m² total system",
    ],
    limitations: [
      "Should not be combined with impermeable paint or coating — defeats breathability purpose",
      "Not recommended where wall is subject to direct hydrostatic pressure",
      "Requires compatible breathable topcoat or lime wash if colour finish is required",
    ],
    procurementSources: [
      { name: "Rockcote Australia — Distributor Search", url: "https://www.rockcote.com.au" },
      { name: "Haymes Paint — Render Range", url: "https://www.haymespaint.com.au" },
    ],
  },
  {
    fullLabel: "Sika — MonoTop Breathable Renovation Render",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/solutions/products",
    accentColor: "#cc0000",
    name: "MonoTop Breathable Renovation Render",
    descriptionLine: "Factory-blended renovation render with controlled porosity providing vapour permeability and salt tolerance for remediated masonry facades",
    productType: "Pre-bagged renovation render (breathable)",
    filterTags: ["Vapour-permeable", "Breathable", "Salt-resistant", "Masonry", "Low-modulus", "Heritage", "Lime-based", "Natural-hydraulic-lime"],
    techChips: [
      { label: "Pre-bagged", cls: "bg-red-100 text-red-700" },
      { label: "Breathable", cls: "bg-green-100 text-green-700" },
      { label: "Renovation", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Sika's MonoTop renovation render range includes grades formulated for breathable render applications on old, salt-affected masonry. The controlled porosity and low modulus design allows moisture vapour to pass through the render layer while resisting liquid water ingress. Suitable for use over substrate treatments as part of a complete salt-remediation system.",
    technicalProperties: [
      "Binder: blended cement and limestone with controlled porosity",
      "Vapour permeability: high — suitable for heritage masonry",
      "Application thickness: 8–20 mm per coat",
      "Bond strength: >0.8 MPa to prepared masonry",
      "Flexible — low stiffness reduces cracking on thermally active masonry",
    ],
    limitations: [
      "Not suitable as a structural repair mortar — MonoTop structural grades are separate products",
      "Requires salt-retardant pre-treatment for maximum service life",
      "Dense cement-rich finishes applied over the top will reduce system breathability",
    ],
    procurementSources: [
      { name: "Sika Australia — Distributor Search", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Vapour-permeable", label: "Vapour-permeable" },
  { id: "Breathable", label: "Breathable" },
  { id: "Lime-based", label: "Lime-based" },
  { id: "Masonry", label: "Masonry" },
  { id: "Heritage", label: "Heritage" },
  { id: "Salt-resistant", label: "Salt-resistant" },
  { id: "Natural-hydraulic-lime", label: "Natural hydraulic lime" },
  { id: "Low-modulus", label: "Low modulus" },
];

const COMPARISON_ROWS = [
  { product: "Antolith NHL Breathable", brand: "Mapei", type: "Natural hydraulic lime", sdValue: "<0.5 m", flexStrength: "1.5–3.5 MPa", selfHealing: "Yes", keyFeature: "True NHL lime, heritage spec" },
  { product: "Rockcote Breathable System", brand: "Rockcote", type: "Polymer-modified", sdValue: "<1.0 m", flexStrength: "Medium", selfHealing: "Limited", keyFeature: "Two-coat, rain-resistant" },
  { product: "MonoTop Breathable", brand: "Sika", type: "Pre-bagged renovation", sdValue: "High", flexStrength: "Controlled low", selfHealing: "Limited", keyFeature: "Pre-bagged, flexible low modulus" },
];

const TECH_INFO = {
  typicalApplications: [
    "Re-render of heritage masonry buildings where salt attack and rising damp are present",
    "Breathable render coat over crystalline salt-retardant treatment",
    "Facade renovation of old porous brick buildings requiring moisture management",
    "Replacement of impermeable OPC render that trapped moisture and accelerated salt damage",
  ],
  selectionCriteria: [
    "Select NHL lime-based systems for authentic heritage repair on pre-1950s masonry",
    "Polymer-modified breathable systems suited to modern masonry of medium permeability",
    "System breathability (sd-value) should be lower than the substrate for correct vapour drive",
    "Avoid high-strength cement renders over old soft brick — modulus mismatch drives delamination",
  ],
  limitations: [
    "Breathable renders must be paired with vapour-permeable coatings and paints — impermeable finishes negate the system",
    "NHL lime renders have longer cure times and require extended protection from rain and frost",
    "Where active rising damp is present, breathable render alone cannot stop moisture — source treatment is required",
    "Site-mixed lime renders require skilled plasterers — pre-bagged systems reduce QC risk",
  ],
  standardsNotes: [
    "EN 998-1 — Specification for mortar for masonry: classification of render and plaster mortars",
    "AS 3700:2018 — Masonry Structures: render application requirements",
    "ICOMOS Guidelines — use of lime in conservation of historic buildings",
    "Heritage NSW / Heritage Victoria technical notes on lime render and mortars",
  ],
  suitableDefects: [
    "Salt attack on old porous brick masonry",
    "Render failure caused by trapped moisture and crystallisation",
    "Rising damp causing repeated render delamination",
    "Heritage masonry facades requiring compatible, breathable repair render",
  ],
  typicalSubstrates: [
    "Pre-1950s solid clay brick masonry (high porosity, soft brick)",
    "Sandstone and limestone masonry",
    "Calcium silicate brick",
    "Old OPC render — must be removed before breathable system is applied",
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
          <div><p className="text-xs font-semibold text-gray-500 uppercase mb-1">Technical Properties</p><ul className="space-y-1">{product.technicalProperties.map((p, i) => <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-green-600 mt-0.5">•</span>{p}</li>)}</ul></div>
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
      <button onClick={() => setOpen(!open)} className="text-xs text-green-600 hover:underline mt-0.5">{open ? "Show less" : "Read more"}</button>
    </div>
  );
}

export function BreathableRenderIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Breathable & Vapour-Permeable Render</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Breathable renders are specified where conventional dense cement renders have trapped moisture within masonry walls, accelerating salt crystallisation damage and delamination. By allowing moisture vapour to escape through the render layer, these systems prevent the salt concentration build-up at the render-substrate interface that drives spalling and efflorescence. Natural hydraulic lime (NHL) renders are the traditional choice for heritage buildings; polymer-modified breathable systems suit modern masonry.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Binder", value: "NHL / low-OPC" },
          { label: "Vapour sd-value", value: "<0.5–1.0 m" },
          { label: "Modulus", value: "Low (flexible)" },
          { label: "Heritage rated", value: "Yes" },
        ].map((s) => (
          <div key={s.label} className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-xs text-green-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-green-900">{s.value}</p>
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

export function BreathableRenderProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-600 border-gray-300 hover:border-green-400"}`}>
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
          className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-800">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>
                  {["Product", "Brand", "Type", "sd-value", "Flex strength", "Self-healing", "Key feature"].map((h) => (
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
                    <td className="px-3 py-2 text-gray-600">{row.sdValue}</td>
                    <td className="px-3 py-2 text-gray-600">{row.flexStrength}</td>
                    <td className="px-3 py-2 text-gray-600">{row.selfHealing}</td>
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
