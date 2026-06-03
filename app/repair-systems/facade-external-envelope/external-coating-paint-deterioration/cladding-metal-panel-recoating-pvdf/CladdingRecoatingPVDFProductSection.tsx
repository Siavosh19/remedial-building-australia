"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "PVDF"
  | "Metal-cladding"
  | "Aluminium-panel"
  | "Recoating"
  | "High-performance"
  | "UV-resistant"
  | "Fluoropolymer"
  | "Specialist-applicator";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux — Dulux Acratex PVDF Recoating System",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/acratex",
    accentColor: "#e2003a",
    name: "Dulux Acratex PVDF Recoating System",
    descriptionLine: "Field-applied PVDF topcoat system for restoration of existing PVDF-coated aluminium and metal cladding panels on high-rise building facades",
    productType: "Field-applied PVDF topcoat system",
    filterTags: ["PVDF", "Metal-cladding", "Aluminium-panel", "Recoating", "High-performance", "UV-resistant", "Fluoropolymer", "Specialist-applicator"],
    techChips: [
      { label: "PVDF", cls: "bg-red-100 text-red-700" },
      { label: "Field-applied", cls: "bg-orange-100 text-orange-700" },
      { label: "Specialist", cls: "bg-gray-100 text-gray-700" },
    ],
    systemDescription: "Dulux Acratex's PVDF recoating system is a field-applied polyvinylidene fluoride (PVDF) topcoat designed specifically for recoating deteriorated factory-applied PVDF and Kynar 500-based coating systems on aluminium composite panels and metal cladding. PVDF is the highest-performance architectural coating — standard coating systems are not compatible and will fail rapidly. This system is applied only by trained and certified applicators using manufacturer-approved spray application processes.",
    technicalProperties: [
      "Technology: polyvinylidene fluoride (PVDF) — Kynar-compatible",
      "UV resistance: outstanding — designed for 20-year exterior service life",
      "DFT: 25–40 µm topcoat over primer system",
      "Colour retention: superior — low chalking and colour fade",
      "Application: spray-applied by certified applicators only",
    ],
    limitations: [
      "PVDF field-applied systems require certified applicator — not DIY or general painter applications",
      "Substrate must be prepared to manufacturer specification — existing delaminating coating must be stripped",
      "Colour matching of existing PVDF may not be achievable to original factory finish standard",
    ],
    procurementSources: [
      { name: "Dulux Trade — Acratex/PVDF Recoating", url: "https://www.dulux.com.au" },
      { name: "Contact Dulux for certified applicator referral", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl — Wattyl Architectural PVDF Recoat System",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en/wattyl-exterior",
    accentColor: "#cc0000",
    name: "Wattyl Architectural PVDF Recoat System",
    descriptionLine: "Architect-specified PVDF recoating solution for aged aluminium cladding panels — primer, colour coat, and clear coat system applied by specialist contractors",
    productType: "Architectural PVDF recoating system",
    filterTags: ["PVDF", "Metal-cladding", "Aluminium-panel", "Recoating", "High-performance", "UV-resistant", "Fluoropolymer", "Specialist-applicator"],
    techChips: [
      { label: "Architectural PVDF", cls: "bg-red-100 text-red-700" },
      { label: "Three-coat system", cls: "bg-orange-100 text-orange-700" },
      { label: "Specialist", cls: "bg-gray-100 text-gray-700" },
    ],
    systemDescription: "Wattyl's PVDF recoating system for aluminium cladding comprises a dedicated etch primer, PVDF colour coat, and PVDF clear topcoat — matching the three-coat structure of the original factory coating system. The system restores long-term UV and weathering resistance to cladding panels that have suffered colour fade, chalking, or coating delamination. Applied under controlled conditions by Wattyl-approved specialty applicators.",
    technicalProperties: [
      "System: etch primer + PVDF colour coat + PVDF clear topcoat",
      "Total DFT: 60–90 µm complete system",
      "Gloss retention: excellent — fluoropolymer chemistry",
      "Chalking resistance: Class 1 (ASTM D4214) for 20+ years",
      "Temperature resistance: -40 °C to +150 °C",
    ],
    limitations: [
      "Requires complete removal of delaminated, blistered, or poorly adhering existing coating before recoating",
      "Aluminium substrate requires chromate conversion or ENAC treatment before primer in aggressive environments",
      "System must be applied in temperature and humidity-controlled conditions — unsuitable for open-air application in variable weather",
    ],
    procurementSources: [
      { name: "Wattyl — Architectural Coatings", url: "https://www.wattyl.com.au" },
      { name: "Contact Wattyl for specialist applicator network", url: "https://www.wattyl.com.au" },
    ],
  },
  {
    fullLabel: "Akzo Nobel — Interpon D2525 PVDF Topcoat System",
    brandUrl: "https://www.akzonobel.com/en/our-brands/interpon",
    tdsUrl: "https://www.akzonobel.com/en/our-brands/interpon",
    accentColor: "#005B8E",
    name: "Interpon D2525 PVDF Topcoat System",
    descriptionLine: "Powder and liquid PVDF coating systems from a global specialist supplier providing certified architectural performance for aluminium cladding recoating projects",
    productType: "Specialist PVDF coating system (powder / liquid)",
    filterTags: ["PVDF", "Metal-cladding", "Aluminium-panel", "Recoating", "High-performance", "UV-resistant", "Fluoropolymer", "Specialist-applicator"],
    techChips: [
      { label: "Interpon PVDF", cls: "bg-blue-100 text-blue-700" },
      { label: "Powder/liquid", cls: "bg-indigo-100 text-indigo-700" },
      { label: "Global spec", cls: "bg-gray-100 text-gray-700" },
    ],
    systemDescription: "Akzo Nobel's Interpon D2525 is a globally recognised architectural PVDF powder and liquid coating system providing the highest level of performance for aluminium cladding projects. It is frequently specified by architects on major commercial projects where the original PVDF factory coating system needs to be restored or upgraded. The Interpon PVDF system is applied through approved coil-coating or specialist field-application facilities.",
    technicalProperties: [
      "Technology: PVDF-based powder or liquid coating",
      "Colour retention: ASTM D2244 — ΔE <3 units after 10 years Florida exposure",
      "Chalking: ASTM D4214 Class 1 or better",
      "DFT: typically 25–35 µm topcoat",
      "Certification: AAMA 2605 (highest US architectural coating standard)",
    ],
    limitations: [
      "Field application of Interpon PVDF requires specialist certified applicators — not a trade product",
      "Factory or workshop application preferred for quality control of powder systems",
      "Full strip-back of delaminated prior coating required before application",
    ],
    procurementSources: [
      { name: "Akzo Nobel / Interpon — Find Applicator", url: "https://www.akzonobel.com/en/our-brands/interpon" },
      { name: "Interpon Australia Distribution", url: "https://www.akzonobel.com/en/our-brands/interpon" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "PVDF", label: "PVDF" },
  { id: "Metal-cladding", label: "Metal cladding" },
  { id: "Aluminium-panel", label: "Aluminium panel" },
  { id: "Recoating", label: "Recoating" },
  { id: "High-performance", label: "High-performance" },
  { id: "UV-resistant", label: "UV-resistant" },
  { id: "Fluoropolymer", label: "Fluoropolymer" },
  { id: "Specialist-applicator", label: "Specialist applicator" },
];

const COMPARISON_ROWS = [
  { product: "Dulux Acratex PVDF Recoat", brand: "Dulux", type: "Field PVDF topcoat", system: "Primer + topcoat", dft: "25–40 µm topcoat", cert: "Dulux certified applicators", keyFeature: "Local certified applicator network" },
  { product: "Wattyl Architectural PVDF", brand: "Wattyl", type: "Three-coat PVDF", system: "Etch primer + colour + clear", dft: "60–90 µm total", cert: "Wattyl-approved specialists", keyFeature: "Factory-equivalent 3-coat system" },
  { product: "Interpon D2525", brand: "Akzo Nobel", type: "Powder/liquid PVDF", system: "Full architectural system", dft: "25–35 µm topcoat", cert: "AAMA 2605 certified", keyFeature: "Global AAMA spec, maximum performance" },
];

const TECH_INFO = {
  typicalApplications: [
    "Restoration of deteriorated PVDF-coated aluminium composite panel (ACP) facades",
    "Recoating of Kynar 500 factory-coated aluminium cladding on high-rise commercial buildings",
    "Colour change recoating of aluminium cladding where original coating is delaminating",
    "Upgrade of lesser-grade coating systems on cladding panels to PVDF performance level",
  ],
  selectionCriteria: [
    "PVDF systems only — standard acrylic, alkyd, or epoxy coatings are not compatible over existing PVDF",
    "Confirm whether panels are aluminium composite (ACP), single-skin aluminium, or steel — substrate affects primer selection",
    "Engage PVDF-certified applicator before specifying product — applicator availability drives product selection in practice",
    "For projects requiring colour or texture change, obtain colour match samples before committing to specification",
  ],
  limitations: [
    "PVDF recoating is a specialist trade — standard painting contractors cannot apply these systems",
    "Field application performance will not fully match factory coil-coating conditions — expect some performance premium loss vs factory coating",
    "Panel removal and off-site recoating may be required for best results on complex panel geometries",
    "PVDF systems require specific surface preparation — zinc phosphate or chromate conversion treatment on aluminium",
  ],
  standardsNotes: [
    "AAMA 2605 — High-performance organic coatings on aluminium extrusions and panels (PVDF minimum)",
    "AS/NZS 4284 — Testing of building facades",
    "NCC Volume One: cladding fire compliance requirements must be maintained — check ACP fire rating status",
    "Manufacturer certification and installer qualification documentation required for specification compliance",
  ],
  suitableDefects: [
    "PVDF coating chalking, fade, and UV degradation on commercial aluminium cladding facades",
    "Delamination of factory-applied coating on aluminium composite panels",
    "Corrosion-stained or oxidised aluminium cladding requiring full restoration",
    "Colour change recoating required for building refurbishment",
  ],
  typicalSubstrates: [
    "Aluminium composite panel (ACP) — confirm fire rating compliance",
    "Single-skin extruded aluminium cladding and louvre systems",
    "Aluminium curtain wall and window frame systems",
    "Steel panel cladding — with appropriate primer for ferrous substrate",
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

export function CladdingRecoatingPVDFIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Cladding & Metal Panel Recoating — PVDF Systems</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        PVDF (polyvinylidene fluoride) recoating systems are specified for the restoration of deteriorated factory-applied fluoropolymer coatings on aluminium composite panels and metal cladding on commercial and high-rise building facades. PVDF is the benchmark for architectural coatings — offering 20+ year UV resistance, superior colour retention, and low chalking. Field recoating with PVDF requires certified specialist applicators and specific substrate preparation; standard painting contractors cannot apply these systems.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Technology", value: "PVDF fluoropolymer" },
          { label: "Service life", value: "20+ years" },
          { label: "Standard", value: "AAMA 2605" },
          { label: "Application", value: "Certified specialist" },
        ].map((s) => (
          <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-slate-900">{s.value}</p>
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

export function CladdingRecoatingPVDFProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-slate-700 text-white border-slate-700" : "bg-white text-gray-600 border-gray-300 hover:border-slate-500"}`}>
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
        <button onClick={() => setShowComparison(!showComparison)} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>{["Product", "Brand", "Type", "System", "DFT", "Certification", "Key feature"].map((h) => <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{row.product}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-gray-600">{row.system}</td>
                    <td className="px-3 py-2 text-gray-600">{row.dft}</td>
                    <td className="px-3 py-2 text-gray-600">{row.cert}</td>
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
