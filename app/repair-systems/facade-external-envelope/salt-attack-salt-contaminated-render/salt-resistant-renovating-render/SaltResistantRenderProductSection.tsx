"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Salt-resistant"
  | "Pre-bagged"
  | "Polymer-modified"
  | "Masonry"
  | "Render-repair"
  | "Two-coat"
  | "AS-3700"
  | "Coastal";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika — SikaRenderEM Salt-Resistant System",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/solutions/products/sika-render-em.html",
    accentColor: "#cc0000",
    name: "SikaRenderEM Salt-Resistant System",
    descriptionLine: "Polymer-modified, two-coat salt-tolerant render mortar for contaminated masonry substrates",
    productType: "Pre-bagged polymer-modified render",
    filterTags: ["Salt-resistant", "Pre-bagged", "Polymer-modified", "Masonry", "Render-repair", "Two-coat", "AS-3700", "Coastal"],
    techChips: [
      { label: "Pre-bagged", cls: "bg-red-100 text-red-700" },
      { label: "Polymer-modified", cls: "bg-orange-100 text-orange-700" },
      { label: "Salt-resistant", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "SikaRenderEM is a factory-blended, polymer-modified render suitable for application over salt-affected masonry. The dense, low-absorption matrix restricts capillary rise and reduces chloride ingress, making it appropriate for coastal and contaminated environments where conventional renders fail prematurely.",
    technicalProperties: [
      "System: two-coat — scratch coat 8–12 mm, finish coat 6–8 mm",
      "Polymer: redispersible vinyl-acetate copolymer",
      "Chloride resistance: low permeability matrix, AS 3700 compliant",
      "Bond strength: >1.0 MPa to prepared masonry",
      "Working time: ~45 min at 23 °C",
    ],
    limitations: [
      "Requires thorough salt-remediation and desalination of substrate prior to application",
      "Do not apply over active salt-bloom without substrate treatment",
      "Minimum substrate temperature 5 °C; shade application in direct sun",
    ],
    procurementSources: [
      { name: "Sika Australia — Distributor Search", url: "https://aus.sika.com" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Mapei — Planitop XS Salt-Resistant Render",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/product-detail/planitop-xs",
    accentColor: "#003087",
    name: "Planitop XS Salt-Resistant Render",
    descriptionLine: "High-performance fibre-reinforced render mortar with reduced chloride permeability for salt-attacked facades",
    productType: "Pre-bagged fibre-reinforced render",
    filterTags: ["Salt-resistant", "Pre-bagged", "Polymer-modified", "Masonry", "Render-repair", "Two-coat", "AS-3700", "Coastal"],
    techChips: [
      { label: "Pre-bagged", cls: "bg-blue-100 text-blue-700" },
      { label: "Fibre-reinforced", cls: "bg-indigo-100 text-indigo-700" },
      { label: "Coastal", cls: "bg-cyan-100 text-cyan-700" },
    ],
    systemDescription: "Planitop XS incorporates polypropylene fibres and a modified binder system that produces a dense, crack-resistant render matrix. The reduced water absorption and tight pore structure limit salt migration through the render layer, extending service life in coastal and contaminated masonry environments.",
    technicalProperties: [
      "Application thickness: 5–30 mm per coat",
      "Fibre reinforcement: polypropylene microfibre blend",
      "Water absorption (RILEM): <0.5 kg/m²√h",
      "Compressive strength (28d): >20 MPa",
      "Flexural strength (28d): >4 MPa",
    ],
    limitations: [
      "Salt-loaded substrate must be treated with crystalline salt-retardant before application",
      "Avoid application in rain or immediately before rain forecast",
      "Thick applications (>15 mm) require two passes with adequate drying time between",
    ],
    procurementSources: [
      { name: "Mapei Australia — Distributor Search", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc — Renderoc Classic Salt-Tolerant Render",
    brandUrl: "https://www.fosroc.com/en-au",
    tdsUrl: "https://www.fosroc.com/en-au/products/concrete-repair-and-protection",
    accentColor: "#e87722",
    name: "Renderoc Classic Salt-Tolerant Render",
    descriptionLine: "Cementitious polymer-modified render system with enhanced chloride exclusion for salt-affected masonry remediation",
    productType: "Pre-bagged polymer-modified render",
    filterTags: ["Salt-resistant", "Pre-bagged", "Polymer-modified", "Masonry", "Render-repair", "Two-coat", "AS-3700", "Coastal"],
    techChips: [
      { label: "Polymer-modified", cls: "bg-orange-100 text-orange-700" },
      { label: "Chloride-resistant", cls: "bg-red-100 text-red-700" },
      { label: "Pre-bagged", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Renderoc Classic from Fosroc is engineered for structural and aesthetic render repair on masonry substrates subject to salt attack. The proprietary polymer modification reduces water absorption and chloride diffusion through the hardened render, while maintaining vapour permeability to allow the wall to breathe.",
    technicalProperties: [
      "System: scratch coat (10–15 mm) + finish coat (6–8 mm)",
      "Chloride permeability: low — <1,000 Coulombs (ASTM C1202)",
      "Bond strength: >1.5 MPa to prepared masonry",
      "Compressive strength (28d): >25 MPa",
      "Working time: ~40 min at 23 °C",
    ],
    limitations: [
      "Pre-treatment of salt-laden substrate is mandatory — product alone will not stop salt migration from within the wall",
      "Not suitable for permanently wet or below-grade conditions without secondary waterproofing",
      "Do not add additional water beyond recommended mixing ratio",
    ],
    procurementSources: [
      { name: "Fosroc Australia — Contact/Distributor", url: "https://www.fosroc.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Salt-resistant", label: "Salt-resistant" },
  { id: "Pre-bagged", label: "Pre-bagged" },
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Masonry", label: "Masonry" },
  { id: "Render-repair", label: "Render repair" },
  { id: "Two-coat", label: "Two-coat" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Coastal", label: "Coastal" },
];

const COMPARISON_ROWS = [
  { product: "SikaRenderEM Salt-Resistant", brand: "Sika", type: "Polymer-modified", scratchCoat: "8–12 mm", finishCoat: "6–8 mm", chlorideRes: "Low permeability", keyFeature: "Dense matrix, coastal rated" },
  { product: "Planitop XS Salt-Resistant", brand: "Mapei", type: "Fibre-reinforced", scratchCoat: "5–30 mm", finishCoat: "5–30 mm", chlorideRes: "<0.5 kg/m²√h", keyFeature: "PP fibre, crack-resistant" },
  { product: "Renderoc Classic Salt-Tolerant", brand: "Fosroc", type: "Polymer-modified", scratchCoat: "10–15 mm", finishCoat: "6–8 mm", chlorideRes: "<1,000 C (ASTM)", keyFeature: "Vapour-permeable, breathable" },
];

const TECH_INFO = {
  typicalApplications: [
    "Renovation render over salt-attacked brick and block masonry",
    "Coastal building facade repair and re-render",
    "Replacement render over substrate treated with crystalline salt retardant",
    "Two-coat render system as part of full salt-remediation program",
  ],
  selectionCriteria: [
    "Confirm salt source has been treated (rising damp, lateral dampness, marine exposure)",
    "Select pre-bagged polymer-modified system where site-batching QC is uncertain",
    "Fibre-reinforced products preferred where previous render showed extensive cracking",
    "Verify product chloride diffusion data for highly aggressive marine environments",
  ],
  limitations: [
    "No render system alone will stop active salt migration from an untreated substrate",
    "Rising damp must be addressed at source before render replacement is specified",
    "Avoid over-application in single coat — staged application maintains control of shrinkage",
    "Scratch and float coats must be given adequate drying time before subsequent coats",
  ],
  standardsNotes: [
    "AS 3700:2018 — Masonry Structures: render thickness, bond, and application requirements",
    "ASTM C1202 — Standard Test Method for Electrical Indication of Concrete's Ability to Resist Chloride Ion Penetration",
    "NCC Volume One: external render on fire-rated masonry must maintain required FRL",
    "Manufacturer TDS and application guides take precedence over generic specification",
  ],
  suitableDefects: [
    "Salt attack and efflorescence on masonry facades",
    "Delaminated or failed render over salt-contaminated masonry",
    "Render cracking associated with salt crystal expansion",
    "Coastal facade renovation requiring durable render replacement",
  ],
  typicalSubstrates: [
    "Brick masonry (clay, concrete, calcium silicate)",
    "Autoclaved aerated concrete (AAC) blockwork",
    "Dense concrete masonry units (CMU)",
    "Previously rendered surfaces — substrate must be thoroughly scarified and treated",
  ],
};

function CollapsibleList({ title, items, color = "blue" }: { title: string; items: string[]; color?: string }) {
  const [open, setOpen] = useState(false);
  const h = `text-${color}-800`, bg = `bg-${color}-50`, border = `border-${color}-200`, btn = `text-${color}-600 hover:text-${color}-800`;
  return (
    <div className={`border ${border} rounded-lg overflow-hidden`}>
      <button onClick={() => setOpen(!open)} className={`w-full flex items-center justify-between px-4 py-3 ${bg} ${btn} font-medium text-sm`}>
        <span className={h}>{title}</span>{open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <ul className="px-4 py-3 space-y-1 bg-white">{items.map((it, i) => <li key={i} className="text-sm text-gray-700 flex gap-2"><span className={`${h} mt-0.5`}>•</span>{it}</li>)}</ul>}
    </div>
  );
}

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
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">System Description</p>
            <p className="text-sm text-gray-700">{product.systemDescription}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Technical Properties</p>
            <ul className="space-y-1">{product.technicalProperties.map((p, i) => <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-blue-600 mt-0.5">•</span>{p}</li>)}</ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Limitations</p>
            <ul className="space-y-1">{product.limitations.map((l, i) => <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-amber-500 mt-0.5">⚠</span>{l}</li>)}</ul>
          </div>
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

export function SaltResistantRenderIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Salt-Resistant Renovating Render</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Salt-resistant renovating renders are pre-bagged, polymer-modified cementitious systems formulated to resist chloride ingress and salt crystal expansion. They are specified where conventional renders have failed due to salt attack from rising damp, marine exposure, or contaminated masonry. A salt-retardant substrate treatment must be applied before installation to address salt accumulation within the wall.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "System", value: "Two-coat" },
          { label: "Chloride resistance", value: "Low permeability" },
          { label: "Typical thickness", value: "14–20 mm" },
          { label: "Standard", value: "AS 3700" },
        ].map((s) => (
          <div key={s.label} className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-blue-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-blue-900">{s.value}</p>
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

export function SaltResistantRenderProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      {/* Filter carousel */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"}`}>
            {f === "All" ? "All Products" : FILTER_DEFS.find((fd) => fd.id === f)?.label ?? f}
          </button>
        ))}
      </div>

      {/* Product cards */}
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

      {/* Comparison table toggle */}
      <div>
        <button onClick={() => setShowComparison(!showComparison)}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>
                  {["Product", "Brand", "Type", "Scratch coat", "Finish coat", "Cl⁻ resistance", "Key feature"].map((h) => (
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
                    <td className="px-3 py-2 text-gray-600">{row.scratchCoat}</td>
                    <td className="px-3 py-2 text-gray-600">{row.finishCoat}</td>
                    <td className="px-3 py-2 text-gray-600">{row.chlorideRes}</td>
                    <td className="px-3 py-2 text-gray-600">{row.keyFeature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tech info accordion */}
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
