"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "UV-resistant"
  | "Metal-topcoat"
  | "Enamel"
  | "Ferrous-metal"
  | "Anti-corrosion"
  | "Gloss-finish"
  | "Solvent-based"
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
    fullLabel: "Dulux — Dulux Metalshield UV-Resistant Enamel",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/metal-coatings",
    accentColor: "#e2003a",
    name: "Dulux Metalshield UV-Resistant Enamel",
    descriptionLine: "Alkyd-acrylic UV-resistant enamel topcoat for exterior metal providing gloss retention and corrosion resistance over rust-inhibiting primer systems",
    productType: "Alkyd-acrylic UV-resistant enamel topcoat",
    filterTags: ["UV-resistant", "Metal-topcoat", "Enamel", "Ferrous-metal", "Anti-corrosion", "Gloss-finish", "Solvent-based", "Water-based"],
    techChips: [
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Enamel", cls: "bg-gray-100 text-gray-700" },
      { label: "Gloss finish", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "Dulux Metalshield UV-Resistant Enamel is formulated for application over rust-inhibiting primer on exterior metal elements — structural steel, balustrades, window frames, and metal facade cladding fixings. The UV stabiliser package resists colour fade and gloss loss, extending service intervals compared to standard alkyd enamels in Australian high-UV environments.",
    technicalProperties: [
      "Binder: alkyd-acrylic resin with UV stabilisers",
      "DFT: 30–45 µm per coat (two coats recommended)",
      "Coverage: 12–15 m²/L",
      "Gloss level: high gloss (85+)",
      "Recoat time: 4–6 h",
    ],
    limitations: [
      "Requires rust-inhibiting primer base coat on ferrous metal — enamel alone provides decorative not corrosion protection",
      "Not suitable for non-ferrous metals without etch primer — adhesion failure risk",
      "Solvent-based formulation — check local VOC compliance requirements",
    ],
    procurementSources: [
      { name: "Dulux Trade — Metal Coatings", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl — Wattyl Killrust Enamel Topcoat",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en/wattyl-killrust",
    accentColor: "#cc0000",
    name: "Wattyl Killrust Enamel Topcoat",
    descriptionLine: "Hard-wearing UV-resistant enamel topcoat in the Killrust system for exterior metal providing corrosion protection and gloss retention in harsh exposures",
    productType: "UV-resistant enamel topcoat (Killrust system)",
    filterTags: ["UV-resistant", "Metal-topcoat", "Enamel", "Ferrous-metal", "Anti-corrosion", "Gloss-finish", "Solvent-based", "Water-based"],
    techChips: [
      { label: "Killrust system", cls: "bg-red-100 text-red-700" },
      { label: "Hard-wearing", cls: "bg-orange-100 text-orange-700" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription: "Wattyl Killrust Enamel is the topcoat component of the Killrust corrosion protection system. It provides UV-resistant, hard-wearing enamel protection over the Killrust rust-inhibiting primer, delivering the complete metal corrosion protection system from the same manufacturer. The integrated primer-topcoat approach reduces adhesion risk and provides a matched, tested system for exterior metalwork on buildings.",
    technicalProperties: [
      "Binder: oil-modified alkyd-urethane with UV stabilisers",
      "DFT: 35–50 µm per coat",
      "Coverage: 10–14 m²/L",
      "Hardness: pencil hardness H+",
      "Gloss retention: good in UV exposure",
    ],
    limitations: [
      "Must be applied over Killrust primer for full system warranty — cross-system primer may reduce adhesion",
      "Allow full dry time before exposure to direct sunlight, rain, or condensation",
      "On heavily corroded surfaces, abrasive blast preparation is required for maximum performance",
    ],
    procurementSources: [
      { name: "Wattyl — Killrust Range", url: "https://www.wattyl.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Rust-Oleum — Rust-Oleum Stops Rust UV Enamel",
    brandUrl: "https://www.rustoleum.com.au",
    tdsUrl: "https://www.rustoleum.com.au/products/stops-rust",
    accentColor: "#d4a017",
    name: "Rust-Oleum Stops Rust UV Enamel",
    descriptionLine: "Oil-based UV-resistant enamel with built-in rust inhibitor for direct-to-metal application on exterior metal elements and structural steel",
    productType: "Oil-based direct-to-metal UV enamel",
    filterTags: ["UV-resistant", "Metal-topcoat", "Enamel", "Ferrous-metal", "Anti-corrosion", "Gloss-finish", "Solvent-based", "Water-based"],
    techChips: [
      { label: "Direct-to-metal", cls: "bg-amber-100 text-amber-700" },
      { label: "Built-in inhibitor", cls: "bg-orange-100 text-orange-700" },
      { label: "UV enamel", cls: "bg-gray-100 text-gray-700" },
    ],
    systemDescription: "Rust-Oleum Stops Rust UV Enamel incorporates corrosion inhibitors within the topcoat, providing a direct-to-metal application option where a separate primer step is not practical. While performance is maximised over a dedicated rust-inhibiting primer, the built-in inhibitor extends protection in situations where a two-coat system cannot be achieved. UV stabilisers maintain gloss and colour in exterior exposure.",
    technicalProperties: [
      "Binder: oil-based alkyd with built-in corrosion inhibitor",
      "Coverage: 12–14 m²/L",
      "DFT: 30–40 µm per coat",
      "Dry time (touch): 2–4 h",
      "Full cure: 7 days",
    ],
    limitations: [
      "Built-in inhibitor does not match separate primer performance for aggressive corrosion exposure — marine and industrial C4/C5 zones require dedicated primer",
      "Oil-based — longer recoat times and solvent disposal requirements",
      "Not suitable for aluminium or zinc without etch primer — adhesion failure risk",
    ],
    procurementSources: [
      { name: "Rust-Oleum Australia", url: "https://www.rustoleum.com.au" },
      { name: "Bunnings", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "UV-resistant", label: "UV-resistant" },
  { id: "Metal-topcoat", label: "Metal topcoat" },
  { id: "Enamel", label: "Enamel" },
  { id: "Ferrous-metal", label: "Ferrous metal" },
  { id: "Anti-corrosion", label: "Anti-corrosion" },
  { id: "Gloss-finish", label: "Gloss finish" },
  { id: "Solvent-based", label: "Solvent-based" },
  { id: "Water-based", label: "Water-based" },
];

const COMPARISON_ROWS = [
  { product: "Dulux Metalshield UV Enamel", brand: "Dulux", type: "Alkyd-acrylic", dft: "30–45 µm/coat", coverage: "12–15 m²/L", priming: "Separate primer required", keyFeature: "UV stabilised, wide colour range" },
  { product: "Wattyl Killrust Enamel", brand: "Wattyl", type: "Alkyd-urethane", dft: "35–50 µm/coat", coverage: "10–14 m²/L", priming: "Killrust primer system", keyFeature: "Matched primer-topcoat system" },
  { product: "Rust-Oleum Stops Rust UV", brand: "Rust-Oleum", type: "Oil-based alkyd", dft: "30–40 µm/coat", coverage: "12–14 m²/L", priming: "Direct-to-metal option", keyFeature: "Built-in inhibitor, DTM use" },
];

const TECH_INFO = {
  typicalApplications: [
    "Exterior topcoat on primed structural steel balustrades and handrails",
    "Metal window and door frames on facade renovation",
    "Steel facade support brackets and fixings",
    "Repainting metal grilles, shutters, and security screens",
  ],
  selectionCriteria: [
    "Alkyd-urethane blends for improved hardness and UV resistance in aggressive climates",
    "Direct-to-metal (DTM) grades where site conditions prevent separate primer application",
    "Use same-brand primer and topcoat for matched system performance and warranty",
    "For marine C4/C5 environments, specify two-pack epoxy primer + polyurethane topcoat for maximum protection",
  ],
  limitations: [
    "Single-pack enamel topcoats over corroded metal without adequate substrate prep will fail prematurely",
    "Gloss enamels show surface imperfections more than satin or semi-gloss — confirm finish preference",
    "Standard enamel topcoats are not suitable as sole corrosion protection in marine or industrial C4+ corrosion categories",
    "All enamel systems degrade over time — inspect and recoat before primer is exposed to prevent rust bloom-through",
  ],
  standardsNotes: [
    "AS/NZS 2312:2014 — Guide to protection of structural steel against atmospheric corrosion",
    "ISO 12944 — Paints and varnishes — corrosion protection of steel structures by protective paint systems",
    "AS 1580.481.1.3 — Gloss and sheen test methods for paint",
    "NATSPEC: Section 0332 — Metal painting and coating systems",
  ],
  suitableDefects: [
    "UV degradation, chalking, and gloss loss on exterior metal paint finish",
    "Rust bloom and corrosion staining through deteriorated enamel on metalwork",
    "Peeling enamel on metal window frames and balustrades",
    "Full repaint of structural steel facade elements",
  ],
  typicalSubstrates: [
    "Mild steel — structural sections, plates, and hollow sections",
    "Cast iron heritage elements",
    "Galvanised steel — with etch primer",
    "Steel window and door frames",
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

export function UVResistantEnamelMetalIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">UV-Resistant Enamel for Metal</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        UV-resistant enamel topcoats are specified for exterior metal elements on building facades — balustrades, handrails, steel frames, and structural steelwork — where appearance (gloss and colour) and UV durability are primary requirements in addition to corrosion protection. They are the finish coat over rust-inhibiting primer in a two-coat or multi-coat metal protection system. UV stabiliser packages distinguish these products from standard enamels and extend gloss retention in Australian high-UV environments.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Substrate", value: "Ferrous metal" },
          { label: "DFT/coat", value: "30–50 µm" },
          { label: "Coverage", value: "10–15 m²/L" },
          { label: "Gloss level", value: "High gloss" },
        ].map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-gray-900">{s.value}</p>
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

export function UVResistantEnamelMetalProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-gray-700 text-white border-gray-700" : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"}`}>
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
        <button onClick={() => setShowComparison(!showComparison)} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>{["Product", "Brand", "Type", "DFT/coat", "Coverage", "Priming", "Key feature"].map((h) => <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{row.product}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-gray-600">{row.dft}</td>
                    <td className="px-3 py-2 text-gray-600">{row.coverage}</td>
                    <td className="px-3 py-2 text-gray-600">{row.priming}</td>
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
