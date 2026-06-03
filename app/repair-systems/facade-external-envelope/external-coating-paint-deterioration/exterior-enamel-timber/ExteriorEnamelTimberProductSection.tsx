"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Timber-enamel"
  | "Exterior"
  | "UV-resistant"
  | "Water-based"
  | "Gloss-finish"
  | "Flexible"
  | "Semi-gloss"
  | "Timber-protection";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux — Dulux Weathershield Exterior Gloss",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/exterior",
    accentColor: "#e2003a",
    name: "Dulux Weathershield Exterior Gloss",
    descriptionLine: "Premium water-based acrylic enamel for exterior timber providing superior UV resistance, flexibility, and gloss retention over primed and prepared timber joinery",
    productType: "Water-based acrylic enamel topcoat",
    filterTags: ["Timber-enamel", "Exterior", "UV-resistant", "Water-based", "Gloss-finish", "Flexible", "Semi-gloss", "Timber-protection"],
    techChips: [
      { label: "Water-based acrylic", cls: "bg-red-100 text-red-700" },
      { label: "UV-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Exterior gloss", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "Dulux Weathershield Exterior Gloss is a water-based acrylic enamel formulated for timber joinery, fascias, eaves, window surrounds, and decorative timber on building facades. The 100% acrylic binder provides superior UV resistance and flexibility compared to alkyd enamels, reducing the tendency to yellow, crack, and peel over time. Applied over an exterior timber primer, it forms a durable, flexible topcoat suitable for Australian outdoor conditions.",
    technicalProperties: [
      "Binder: 100% acrylic emulsion",
      "Coverage: 14–16 m²/L",
      "DFT: 30–40 µm per coat",
      "Recoat time: 2–4 h at 25 °C",
      "Yellowing resistance: excellent — no alkyd-type yellowing",
    ],
    limitations: [
      "Timber must be primed with compatible exterior timber primer — do not apply directly to bare timber",
      "New timber with high resin content requires shellac-based stain blocker before primer",
      "Water-based enamels raise wood grain on unprepared bare timber — sand between coats",
    ],
    procurementSources: [
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Solver — Solver Permalast Exterior Enamel",
    brandUrl: "https://www.solver.com.au",
    tdsUrl: "https://www.solver.com.au/products/exterior-coatings",
    accentColor: "#0057a8",
    name: "Solver Permalast Exterior Enamel",
    descriptionLine: "Flexible water-based enamel for exterior timber joinery and cladding providing weather protection and colour retention in full outdoor exposure",
    productType: "Flexible water-based exterior enamel",
    filterTags: ["Timber-enamel", "Exterior", "UV-resistant", "Water-based", "Gloss-finish", "Flexible", "Semi-gloss", "Timber-protection"],
    techChips: [
      { label: "Flexible", cls: "bg-blue-100 text-blue-700" },
      { label: "Exterior enamel", cls: "bg-sky-100 text-sky-700" },
      { label: "Timber", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription: "Solver Permalast Exterior Enamel is a flexible water-based formulation for exterior timber on buildings. The higher elongation formula accommodates timber movement from moisture cycling and thermal expansion, reducing cracking and peeling associated with hard, brittle enamel films. Appropriate for coastal environments where timber is subject to accelerated movement and UV degradation.",
    technicalProperties: [
      "Binder: acrylic emulsion — flexible grade",
      "Coverage: 12–16 m²/L",
      "DFT: 30–45 µm per coat",
      "Elongation: improved vs standard enamel — accommodates timber movement",
      "Available: gloss and semi-gloss",
    ],
    limitations: [
      "Flexible enamels may appear less glossy over time than high-gloss alkyd alternatives — confirm client expectations",
      "Do not apply to wet or damp timber — moisture content should be <15% before painting",
      "Requires adequate primer system — flexible enamel over inadequate primer will not perform",
    ],
    procurementSources: [
      { name: "Solver Paints — Where to Buy", url: "https://www.solver.com.au" },
      { name: "Mitre 10", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl — Wattyl Solagard Exterior Enamel",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en/wattyl-solagard",
    accentColor: "#cc0000",
    name: "Wattyl Solagard Exterior Enamel",
    descriptionLine: "UV-stabilised exterior enamel for timber and hardboard providing long-life colour retention and durability in harsh Australian UV conditions",
    productType: "UV-stabilised exterior enamel topcoat",
    filterTags: ["Timber-enamel", "Exterior", "UV-resistant", "Water-based", "Gloss-finish", "Flexible", "Semi-gloss", "Timber-protection"],
    techChips: [
      { label: "Solagard", cls: "bg-red-100 text-red-700" },
      { label: "UV-stabilised", cls: "bg-amber-100 text-amber-700" },
      { label: "Long-life", cls: "bg-orange-100 text-orange-700" },
    ],
    systemDescription: "Wattyl Solagard is a UV-stabilised exterior enamel formulated for the harsh Australian climate. The Solagard technology incorporates UV light stabilisers and hindered amine light stabilisers (HALS) to resist colour fade and chalking, extending the service interval of the paint system compared to standard exterior enamels. Suitable for all exterior timber — fascias, weatherboards, window frames, and timber cladding.",
    technicalProperties: [
      "Binder: UV-stabilised acrylic emulsion with HALS technology",
      "Coverage: 12–16 m²/L",
      "DFT: 30–40 µm per coat",
      "UV resistance: enhanced — HALS technology extends service life",
      "Available: gloss, semi-gloss, low-sheen",
    ],
    limitations: [
      "Timber primer required — do not apply directly over bare or untreated timber",
      "Not suitable for horizontal surfaces or decking — check specific product TDS for application restrictions",
      "Colour consistency in repaints requires same batch tinting — significant colour variance between production batches is possible",
    ],
    procurementSources: [
      { name: "Wattyl — Where to Buy", url: "https://www.wattyl.com.au" },
      { name: "Bunnings", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Timber-enamel", label: "Timber enamel" },
  { id: "Exterior", label: "Exterior" },
  { id: "UV-resistant", label: "UV-resistant" },
  { id: "Water-based", label: "Water-based" },
  { id: "Gloss-finish", label: "Gloss finish" },
  { id: "Flexible", label: "Flexible" },
  { id: "Semi-gloss", label: "Semi-gloss" },
  { id: "Timber-protection", label: "Timber protection" },
];

const COMPARISON_ROWS = [
  { product: "Dulux Weathershield Gloss", brand: "Dulux", type: "100% acrylic", coverage: "14–16 m²/L", yellowing: "None", flexibility: "Standard", keyFeature: "No yellowing, market benchmark" },
  { product: "Solver Permalast Enamel", brand: "Solver", type: "Flexible acrylic", coverage: "12–16 m²/L", yellowing: "None", flexibility: "Enhanced", keyFeature: "Flexible, coastal movement" },
  { product: "Wattyl Solagard Enamel", brand: "Wattyl", type: "HALS UV-stabilised acrylic", coverage: "12–16 m²/L", yellowing: "None", flexibility: "Standard–enhanced", keyFeature: "HALS UV technology, long-life" },
];

const TECH_INFO = {
  typicalApplications: [
    "Exterior timber window and door surrounds — decorative repaints and new work",
    "Fascias, eaves, and bargeboards on residential and commercial buildings",
    "Timber weatherboards and cladding — topcoat in full paint system",
    "Heritage building timber joinery and decorative elements",
  ],
  selectionCriteria: [
    "Water-based acrylics preferred over alkyd for exterior timber — no yellowing, faster recoat, lower VOC",
    "HALS UV-stabilised products for high-UV exposure (Queensland, WA, coastal)",
    "Flexible grades for coastal areas where timber moisture cycling is frequent and severe",
    "Always confirm primer compatibility — water-based enamel over incompatible oil primer can peel",
  ],
  limitations: [
    "Timber moisture content must be ≤15% before painting — wet timber causes early adhesion failure",
    "New timber and resinous species (cypress, etc.) require stain-blocking shellac primer before topcoat system",
    "Exterior enamels do not prevent timber decay — use preservative treatment on untreated timber before painting",
    "Touch-up areas must be primed — spot-applying enamel directly to bare timber is not adequate",
  ],
  standardsNotes: [
    "AS/NZS 2269 — Plywood — structural",
    "AS 1604 — Specification for preservative treatment of timber",
    "NATSPEC: Section 0232 — Interior and exterior painting of timber",
    "Manufacturer TDS — primer and topcoat system requirements for specific timber types",
  ],
  suitableDefects: [
    "Peeling and flaking exterior paint on timber joinery",
    "Chalking and UV degradation of existing timber enamel",
    "Cracking paint film on thermally active timber window frames",
    "Mould staining on timber requiring biocide treatment and repaint",
  ],
  typicalSubstrates: [
    "Seasoned hardwood and softwood timber joinery",
    "Weatherboards — hardwood (spotted gum, iron bark) and softwood (pine)",
    "Fibre cement (Hardiflex, Villaboard) — confirm primer system",
    "Engineered wood products (LVL, plywood) — exterior-grade products",
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

export function ExteriorEnamelTimberIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Exterior Enamel for Timber</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Exterior enamels for timber are specified for all painted timber elements on building facades — window frames, fascias, weatherboards, eaves, and decorative joinery. Modern water-based acrylic enamels have largely replaced traditional alkyd oil enamels on exterior timber, providing superior UV resistance, no yellowing, faster recoat times, and lower VOC. UV stabilisers and flexible formulations extend service life in Australian conditions where thermal timber movement and UV intensity are significant coating-performance drivers.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Substrate", value: "Exterior timber" },
          { label: "Base", value: "Water-based acrylic" },
          { label: "Coverage", value: "12–16 m²/L" },
          { label: "Recoat", value: "2–4 hours" },
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

export function ExteriorEnamelTimberProductSection() {
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
                <tr>{["Product", "Brand", "Type", "Coverage", "Yellowing", "Flexibility", "Key feature"].map((h) => <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{row.product}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-gray-600">{row.coverage}</td>
                    <td className="px-3 py-2 text-gray-600">{row.yellowing}</td>
                    <td className="px-3 py-2 text-gray-600">{row.flexibility}</td>
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
