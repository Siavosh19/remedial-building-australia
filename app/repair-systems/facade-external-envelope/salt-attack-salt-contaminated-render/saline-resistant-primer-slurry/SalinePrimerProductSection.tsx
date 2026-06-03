"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Bonding-primer"
  | "Saline-resistant"
  | "Cementitious-slurry"
  | "Masonry"
  | "Pre-render"
  | "Polymer-modified"
  | "Salt-affected"
  | "Adhesion-bridge";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika — SikaCem Adhesive Slurry (Saline Grade)",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/solutions/products/sikacem-adhesive.html",
    accentColor: "#cc0000",
    name: "SikaCem Adhesive Slurry (Saline Grade)",
    descriptionLine: "Polymer-modified cementitious bonding slurry formulated to maintain adhesion over salt-contaminated masonry substrates prior to render installation",
    productType: "Polymer-modified cementitious bonding slurry",
    filterTags: ["Bonding-primer", "Saline-resistant", "Cementitious-slurry", "Masonry", "Pre-render", "Polymer-modified", "Salt-affected", "Adhesion-bridge"],
    techChips: [
      { label: "Bonding slurry", cls: "bg-red-100 text-red-700" },
      { label: "Polymer-modified", cls: "bg-orange-100 text-orange-700" },
      { label: "Salt-affected", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "SikaCem Adhesive Slurry is a factory-blended cement and polymer powder mixed on site to form a brush-applied bonding slurry. When applied to salt-affected masonry that has been treated and cleaned, the polymer component maintains adhesion in the presence of residual moisture and salt contamination, providing a reliable bond bridge for subsequent render coats.",
    technicalProperties: [
      "Form: powder mixed with water to form slurry",
      "Coverage: 1 coat at ~0.5–0.8 kg/m²",
      "Bond strength: >1.0 MPa to salt-treated masonry",
      "Polymer: redispersible polymer for adhesion in damp conditions",
      "Application: brush-applied while slurry is tacky/fresh",
    ],
    limitations: [
      "Render must be applied onto fresh (tacky, not dried) slurry coat — do not allow slurry to fully cure before rendering",
      "Not a salt stop — substrate must be treated for salts before slurry application",
      "Smooth, painted, or glazed substrates require mechanical scarification before application",
    ],
    procurementSources: [
      { name: "Sika Australia — Distributor Search", url: "https://aus.sika.com" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Mapei — Planicrete Universal Bonding Slurry",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/product-detail/planicrete",
    accentColor: "#003087",
    name: "Planicrete Universal Bonding Slurry",
    descriptionLine: "SBR latex-enhanced bonding slurry providing superior adhesion to difficult substrates including salt-affected and smooth masonry",
    productType: "SBR latex bonding slurry",
    filterTags: ["Bonding-primer", "Saline-resistant", "Cementitious-slurry", "Masonry", "Pre-render", "Polymer-modified", "Salt-affected", "Adhesion-bridge"],
    techChips: [
      { label: "SBR latex", cls: "bg-blue-100 text-blue-700" },
      { label: "Universal bonding", cls: "bg-indigo-100 text-indigo-700" },
      { label: "Pre-render", cls: "bg-cyan-100 text-cyan-700" },
    ],
    systemDescription: "Planicrete is a styrene-butadiene rubber (SBR) latex liquid mixed with cement and water on site to produce a bonding slurry. The SBR polymer provides excellent flexibility and adhesion even in the presence of residual salt and moisture in the substrate, making it particularly suited to pre-render priming of salt-affected masonry where conventional slurries may fail.",
    technicalProperties: [
      "Polymer: SBR (styrene-butadiene rubber) latex liquid",
      "Mix: Planicrete + OPC + water — site-batched slurry",
      "Bond strength: >1.5 MPa to contaminated substrates",
      "Flexibility: improved vs pure cementitious slurry",
      "Coverage: ~0.3–0.5 L of latex per m² depending on substrate absorption",
    ],
    limitations: [
      "SBR latex reduces breathability — use with breathable render where vapour permeability is required",
      "Mixing ratio must be observed — excess latex can reduce bond rather than improve it",
      "Do not allow slurry to skin over before applying render — work in manageable areas",
    ],
    procurementSources: [
      { name: "Mapei Australia — Distributor Search", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc — Nitobond AR Acrylic Bonding Agent",
    brandUrl: "https://www.fosroc.com/en-au",
    tdsUrl: "https://www.fosroc.com/en-au/products/concrete-repair-and-protection/bonding-agents/nitobond-ar",
    accentColor: "#e87722",
    name: "Nitobond AR Acrylic Bonding Agent",
    descriptionLine: "Acrylic polymer bonding agent providing reliable adhesion bridge between salt-treated masonry and cementitious render systems",
    productType: "Acrylic polymer bonding agent / slurry",
    filterTags: ["Bonding-primer", "Saline-resistant", "Cementitious-slurry", "Masonry", "Pre-render", "Polymer-modified", "Salt-affected", "Adhesion-bridge"],
    techChips: [
      { label: "Acrylic polymer", cls: "bg-orange-100 text-orange-700" },
      { label: "Bonding agent", cls: "bg-red-100 text-red-700" },
      { label: "Pre-render", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Nitobond AR from Fosroc is an acrylic polymer liquid used as an adhesion primer or mixed with OPC to form a bonding slurry. Applied to salt-affected masonry that has been treated and prepared, it provides an improved adhesion bridge that tolerates residual moisture and salt contamination better than a neat cement slurry. It is compatible with all Fosroc render and repair mortar products.",
    technicalProperties: [
      "Form: acrylic polymer liquid — used neat or as slurry with OPC",
      "Application: brush or roller applied primer, or brush-applied slurry",
      "Bond strength: >1.2 MPa when slurry mixed with OPC",
      "Compatibility: compatible with cementitious, polymer-modified, and fibre-reinforced renders",
      "Coverage (neat primer): ~0.1–0.15 L/m²",
    ],
    limitations: [
      "Allow slurry to just reach initial set (tacky) before applying render — do not apply to fully dry slurry",
      "Not a waterproof barrier — does not replace salt-retardant treatment",
      "In highly aggressive saline environments, two slurry coats may be required",
    ],
    procurementSources: [
      { name: "Fosroc Australia — Contact/Distributor", url: "https://www.fosroc.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Bonding-primer", label: "Bonding primer" },
  { id: "Saline-resistant", label: "Saline-resistant" },
  { id: "Cementitious-slurry", label: "Cementitious slurry" },
  { id: "Masonry", label: "Masonry" },
  { id: "Pre-render", label: "Pre-render" },
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Salt-affected", label: "Salt-affected" },
  { id: "Adhesion-bridge", label: "Adhesion bridge" },
];

const COMPARISON_ROWS = [
  { product: "SikaCem Adhesive Slurry", brand: "Sika", type: "Cement + redispersible polymer", application: "Brush slurry", bondStrength: ">1.0 MPa", salineTol: "Good", keyFeature: "Pre-bagged powder, site-mixed" },
  { product: "Planicrete Bonding Slurry", brand: "Mapei", type: "SBR latex + OPC site-batched", application: "Brush slurry", bondStrength: ">1.5 MPa", salineTol: "Very good", keyFeature: "SBR flexibility, salt tolerance" },
  { product: "Nitobond AR", brand: "Fosroc", type: "Acrylic polymer liquid/slurry", application: "Brush primer/slurry", bondStrength: ">1.2 MPa", salineTol: "Good–very good", keyFeature: "Dual use: primer or slurry" },
];

const TECH_INFO = {
  typicalApplications: [
    "Adhesion bridge over salt-treated masonry before render application",
    "Pre-render priming of dense, low-absorption, or smooth masonry",
    "Bond coat in full salt-attack remediation render system",
    "Primer coat where mechanical key (hacking) is impractical or insufficient",
  ],
  selectionCriteria: [
    "SBR-based slurries preferred for most salt-affected applications — superior polymer flexibility",
    "Acrylic-based agents suit situations where both primer and slurry function is needed",
    "Pre-bagged powder systems reduce site-batching errors — preferred on small or residential jobs",
    "Confirm compatibility between bonding slurry and the specific render system being applied",
  ],
  limitations: [
    "No bonding slurry compensates for inadequate substrate preparation — hacking, cleaning, and salt treatment must precede",
    "Slurry must be applied fresh and render applied while slurry is still tacky — timing is critical",
    "Impermeable polymer-rich slurries applied over breathable systems can create a vapour barrier — select compatible products",
    "Do not apply in temperatures below 5 °C or above 35 °C without specific guidance",
  ],
  standardsNotes: [
    "AS 3700:2018 — render bonding and substrate preparation requirements",
    "ASTM C1059 — Standard Specification for Latex Agents for Bonding Fresh to Hardened Concrete",
    "Manufacturer TDS governs mixing ratio, pot life, and timing between coats",
    "HB 133 — SAI Global handbook on render and plaster in Australia",
  ],
  suitableDefects: [
    "Render adhesion failure over salt-contaminated masonry",
    "Repeated render delamination where salt attack has weakened the bond zone",
    "Dense or smooth masonry surfaces requiring improved mechanical and chemical adhesion",
    "Part of a complete salt-remediation render system specification",
  ],
  typicalSubstrates: [
    "Brick masonry — particularly dense engineering brick and salt-contaminated clay brick",
    "Concrete masonry units (CMU)",
    "Dense concrete substrates",
    "Previously rendered surfaces — scarified and prepared",
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

export function SalinePrimerIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Saline-Resistant Primer & Bonding Slurry</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Saline-resistant primers and bonding slurries are applied to salt-treated masonry substrates immediately before render installation to provide a reliable adhesion bridge in the presence of residual salt and moisture. They address the bond failure risk that exists when render is applied directly to a salt-loaded substrate, where salt crystals forming at the bond interface can lift and delaminate the render. They form the final substrate-preparation step in a complete salt-remediation render system.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Type", value: "Polymer slurry" },
          { label: "Application", value: "Brush-applied" },
          { label: "Bond strength", value: ">1.0–1.5 MPa" },
          { label: "Pre-render", value: "Yes — essential" },
        ].map((s) => (
          <div key={s.label} className="bg-cyan-50 rounded-xl p-3 text-center">
            <p className="text-xs text-cyan-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-cyan-900">{s.value}</p>
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

export function SalinePrimerProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-cyan-600 text-white border-cyan-600" : "bg-white text-gray-600 border-gray-300 hover:border-cyan-400"}`}>
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
          className="flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-800">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>
                  {["Product", "Brand", "Type", "Application", "Bond strength", "Saline tolerance", "Key feature"].map((h) => (
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
                    <td className="px-3 py-2 text-gray-600">{row.application}</td>
                    <td className="px-3 py-2 text-gray-600">{row.bondStrength}</td>
                    <td className="px-3 py-2 text-gray-600">{row.salineTol}</td>
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
