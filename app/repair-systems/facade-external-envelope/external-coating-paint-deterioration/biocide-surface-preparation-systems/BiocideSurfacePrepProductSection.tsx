"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Biocide"
  | "Mould-kill"
  | "Algae-treatment"
  | "Pre-paint"
  | "Exterior"
  | "Masonry"
  | "Render"
  | "Water-based";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux — Dulux Kill-ite Mould & Mildew Treatment",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/surface-preparation",
    accentColor: "#e2003a",
    name: "Dulux Kill-ite Mould & Mildew Treatment",
    descriptionLine: "Dilutable biocide wash for killing and removing mould, mildew, algae, and lichen from exterior render and masonry surfaces before repainting",
    productType: "Dilutable liquid biocide wash",
    filterTags: ["Biocide", "Mould-kill", "Algae-treatment", "Pre-paint", "Exterior", "Masonry", "Render", "Water-based"],
    techChips: [
      { label: "Biocide wash", cls: "bg-green-100 text-green-700" },
      { label: "Dilutable", cls: "bg-blue-100 text-blue-700" },
      { label: "Pre-paint", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Dulux Kill-ite is a concentrated biocide solution applied as a surface treatment to kill and neutralise mould, mildew, algae, and lichen colonies on exterior masonry and render before painting. The treatment kills biological growth at the root, reducing the risk of regrowth under the new paint film that would otherwise cause early blistering and staining.",
    technicalProperties: [
      "Active ingredient: sodium hypochlorite and chlorinated compounds",
      "Dilution: typically 1:4 to 1:8 with water depending on severity",
      "Coverage: ~15–20 m²/L diluted solution",
      "Contact time: minimum 15–30 min before rinse",
      "Application: brush, roller, or pump sprayer",
    ],
    limitations: [
      "Do not apply in direct sunlight — dries too quickly and reduces contact time",
      "Wear PPE — sodium hypochlorite is an irritant",
      "Rinse thoroughly before painting — residual biocide can inhibit paint adhesion",
      "Does not prevent long-term regrowth unless a mould-resistant topcoat is also applied",
    ],
    procurementSources: [
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Solver — Solver Mould Kill Surface Treatment",
    brandUrl: "https://www.solver.com.au",
    tdsUrl: "https://www.solver.com.au/products/surface-preparation",
    accentColor: "#0057a8",
    name: "Solver Mould Kill Surface Treatment",
    descriptionLine: "Concentrated biocide and algaecide wash for exterior render, masonry, and painted surfaces — kills mould, algae, and lichen prior to repainting",
    productType: "Concentrated biocide and algaecide wash",
    filterTags: ["Biocide", "Mould-kill", "Algae-treatment", "Pre-paint", "Exterior", "Masonry", "Render", "Water-based"],
    techChips: [
      { label: "Algaecide", cls: "bg-green-100 text-green-700" },
      { label: "Mould-kill", cls: "bg-teal-100 text-teal-700" },
      { label: "Pre-paint", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "Solver Mould Kill is a concentrated biocide solution for treating external surfaces affected by mould, algae, and lichen growth. Applied as a pre-paint treatment, it kills biological growth and reduces spore populations, preparing the surface for paint application and extending the service life of the new coating system when followed by a mould-resistant topcoat.",
    technicalProperties: [
      "Active biocide: broad-spectrum quaternary ammonium compound",
      "Dilution: 1:5 to 1:10 with water",
      "Coverage: ~20 m²/L diluted",
      "Contact time: 20–30 min",
      "Low odour formulation compared to bleach-based products",
    ],
    limitations: [
      "Must be rinsed off thoroughly before painting — residue inhibits adhesion",
      "Persistent severe mould may require two treatment applications with scrubbing",
      "Not designed as a long-term residual biocide — mould-resistant topcoat required for prevention",
      "Avoid contact with plants and garden areas — toxic to vegetation",
    ],
    procurementSources: [
      { name: "Solver Paints — Where to Buy", url: "https://www.solver.com.au" },
      { name: "Mitre 10 / True Value Hardware", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "Taubmans — Taubmans Prep Guard Algaecide Treatment",
    brandUrl: "https://www.taubmans.com.au",
    tdsUrl: "https://www.taubmans.com.au/products/preparation",
    accentColor: "#005baa",
    name: "Taubmans Prep Guard Algaecide Treatment",
    descriptionLine: "Ready-to-use or dilutable algaecide and biocide surface preparation treatment for exterior masonry and render affected by algae, mould, and lichen",
    productType: "Ready-to-use biocide and algaecide wash",
    filterTags: ["Biocide", "Algae-treatment", "Mould-kill", "Pre-paint", "Exterior", "Masonry", "Render", "Water-based"],
    techChips: [
      { label: "Ready-to-use", cls: "bg-teal-100 text-teal-700" },
      { label: "Algaecide", cls: "bg-green-100 text-green-700" },
      { label: "Pre-paint", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "Taubmans Prep Guard is formulated for use on exteriors where algae, mould, and lichen growth must be killed and removed before repainting. Applied as a ready-to-use or dilutable solution, it penetrates the biological growth layer, killing organisms at the substrate. After allowing adequate contact time and rinsing, the surface is ready for priming and topcoat application.",
    technicalProperties: [
      "Form: ready-to-use liquid (can be diluted for lighter contamination)",
      "Coverage: ~15–25 m²/L",
      "Contact time: 15–30 min",
      "Application: brush or sprayer",
      "Suitable for surfaces that will be repainted within 48 h of treatment",
    ],
    limitations: [
      "Heavy lichen deposits may require mechanical scraping before treatment",
      "Rinse thoroughly — residual treatment can cause paint film adhesion issues",
      "Follow-up mould-resistant topcoat strongly recommended in shaded, damp locations",
      "Do not use on bare metal surfaces — corrosive to some metals",
    ],
    procurementSources: [
      { name: "Taubmans — Where to Buy", url: "https://www.taubmans.com.au" },
      { name: "Bunnings", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Biocide", label: "Biocide" },
  { id: "Mould-kill", label: "Mould kill" },
  { id: "Algae-treatment", label: "Algae treatment" },
  { id: "Pre-paint", label: "Pre-paint" },
  { id: "Exterior", label: "Exterior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Render", label: "Render" },
  { id: "Water-based", label: "Water-based" },
];

const COMPARISON_ROWS = [
  { product: "Dulux Kill-ite", brand: "Dulux", type: "Sodium hypochlorite", dilution: "1:4–1:8", coverage: "15–20 m²/L", contactTime: "15–30 min", keyFeature: "Widely available, proven formula" },
  { product: "Solver Mould Kill", brand: "Solver", type: "Quat. ammonium", dilution: "1:5–1:10", coverage: "~20 m²/L", contactTime: "20–30 min", keyFeature: "Low-odour, broad-spectrum" },
  { product: "Taubmans Prep Guard", brand: "Taubmans", type: "Biocide/algaecide", dilution: "RTU / dilutable", coverage: "15–25 m²/L", contactTime: "15–30 min", keyFeature: "Ready-to-use convenience" },
];

const TECH_INFO = {
  typicalApplications: [
    "Pre-paint mould and algae treatment on exterior masonry and render",
    "Biocide wash before exterior repaint on shaded or moisture-prone facades",
    "Treatment of lichen and algae on masonry walls before coating restoration",
    "Surface preparation step in full exterior facade painting specification",
  ],
  selectionCriteria: [
    "Bleach-based products (sodium hypochlorite) are aggressive — suited to heavy mould/algae contamination",
    "Quaternary ammonium-based products are lower odour — preferred in occupied building situations",
    "Ready-to-use products reduce site-mixing errors for smaller jobs",
    "For persistent growth in shaded areas, select topcoat with integral mould-resistant additives",
  ],
  limitations: [
    "Biocide treatment kills organisms but does not remove staining — surface washing or scrubbing required after treatment",
    "Residual biocide must be completely rinsed before priming or painting",
    "Regrowth will occur if underlying moisture issue (poor drainage, shading, orientation) is not addressed",
    "Not effective over thick paint films — biological growth under old paint requires stripping",
  ],
  standardsNotes: [
    "NATSPEC: Section 0233 — Surface preparation for painting includes biocide treatment requirements",
    "Manufacturer TDS governs dilution ratio, contact time, and rinse procedure",
    "Disposal of biocide rinse water — check local council trade waste regulations",
    "Work Health & Safety: PPE required — consult SDS for specific product hazards",
  ],
  suitableDefects: [
    "Mould and mildew growth on exterior render and masonry",
    "Algae and lichen colonisation on masonry facades",
    "Biological staining before exterior repaint",
    "Pre-treatment of shaded walls prone to recurring biological growth",
  ],
  typicalSubstrates: [
    "Cement render — existing painted and unpainted",
    "Brick and block masonry facades",
    "Concrete surfaces — panels, walls",
    "Timber — some products suitable, confirm on TDS",
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

export function BiocideSurfacePrepIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Biocide & Surface Preparation Systems</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Biocide surface treatments are applied before exterior painting to kill mould, algae, lichen, and other biological growth that would otherwise cause early paint film failure. Biological growth on masonry and render produces acids and moisture beneath the paint film, causing blistering, adhesion loss, and staining. These treatments are a mandatory preparation step in any exterior repaint specification on surfaces showing biological contamination — particularly in shaded, south-facing, or moisture-prone environments.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Type", value: "Biocide wash" },
          { label: "Active", value: "Hypochlorite / QAC" },
          { label: "Coverage", value: "15–25 m²/L" },
          { label: "Contact time", value: "15–30 min" },
        ].map((s) => (
          <div key={s.label} className="bg-teal-50 rounded-xl p-3 text-center">
            <p className="text-xs text-teal-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-teal-900">{s.value}</p>
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

export function BiocideSurfacePrepProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-600 border-gray-300 hover:border-teal-400"}`}>
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
          className="flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-800">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>
                  {["Product", "Brand", "Type", "Dilution", "Coverage", "Contact time", "Key feature"].map((h) => (
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
                    <td className="px-3 py-2 text-gray-600">{row.dilution}</td>
                    <td className="px-3 py-2 text-gray-600">{row.coverage}</td>
                    <td className="px-3 py-2 text-gray-600">{row.contactTime}</td>
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
