"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Rust-inhibiting"
  | "Metal-primer"
  | "Ferrous-metal"
  | "Zinc-phosphate"
  | "Solvent-based"
  | "Water-based"
  | "Anti-corrosion"
  | "Structural-steel";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux — Dulux Metalshield Rust Inhibitor Primer",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/metal-primers",
    accentColor: "#e2003a",
    name: "Dulux Metalshield Rust Inhibitor Primer",
    descriptionLine: "High-build rust-inhibiting primer for ferrous metal providing zinc phosphate anti-corrosion protection on structural steel and metal facade elements",
    productType: "Zinc phosphate rust-inhibiting primer",
    filterTags: ["Rust-inhibiting", "Metal-primer", "Ferrous-metal", "Zinc-phosphate", "Solvent-based", "Anti-corrosion", "Structural-steel", "Water-based"],
    techChips: [
      { label: "Zinc phosphate", cls: "bg-gray-100 text-gray-700" },
      { label: "Rust-inhibiting", cls: "bg-orange-100 text-orange-700" },
      { label: "High-build", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "Dulux Metalshield is a zinc phosphate rust-inhibiting primer for ferrous metal substrates. It provides active corrosion inhibition via zinc phosphate pigmentation and forms a high-build primer film that fills minor surface imperfections. It is widely specified for structural steelwork, metal window frames, balustrades, and cladding fixings on building facades before topcoat application.",
    technicalProperties: [
      "Active ingredient: zinc phosphate anti-corrosion pigment",
      "DFT: 40–60 µm per coat",
      "Coverage: ~10–12 m²/L at recommended DFT",
      "Topcoat compatibility: compatible with alkyd, acrylic, and epoxy topcoats",
      "Recoat time: 4–8 h",
    ],
    limitations: [
      "Substrate must be prepared to minimum Sa 2 (commercial blast) or St 3 (power tool clean) for best corrosion resistance",
      "Not suitable for non-ferrous metals — use appropriate etching primer for aluminium or zinc",
      "Zinc phosphate primers perform best when followed by a compatible barrier topcoat system",
    ],
    procurementSources: [
      { name: "Dulux Trade — Metal Primers", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl — Wattyl Killrust Epoxy Primer",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en/wattyl-killrust",
    accentColor: "#cc0000",
    name: "Wattyl Killrust Epoxy Primer",
    descriptionLine: "Two-component epoxy rust-inhibiting primer delivering superior corrosion resistance for structural steel and metal building components in aggressive environments",
    productType: "Two-component epoxy rust-inhibiting primer",
    filterTags: ["Rust-inhibiting", "Metal-primer", "Ferrous-metal", "Anti-corrosion", "Structural-steel", "Zinc-phosphate", "Solvent-based", "Water-based"],
    techChips: [
      { label: "Epoxy 2K", cls: "bg-red-100 text-red-700" },
      { label: "Anti-corrosion", cls: "bg-orange-100 text-orange-700" },
      { label: "Aggressive env.", cls: "bg-gray-100 text-gray-700" },
    ],
    systemDescription: "Wattyl Killrust Epoxy Primer is a two-component epoxy system providing superior corrosion inhibition on structural steelwork and metal facade components exposed to marine or industrial atmospheric environments. The crosslinked epoxy matrix forms an extremely hard, chemically resistant primer film that acts as a barrier coat before anti-corrosion topcoat systems.",
    technicalProperties: [
      "Components: Part A (epoxy base) + Part B (polyamide hardener)",
      "DFT: 50–75 µm per coat",
      "Pot life: ~4 h at 23 °C",
      "Hardness: high — fully crosslinked epoxy network",
      "Topcoat requirement: UV-stable topcoat required (epoxy chalks in UV)",
    ],
    limitations: [
      "Two-component system — pot life must be observed; do not use mixed product past pot life",
      "Epoxy chalks in UV exposure — must be overcoated with UV-stable topcoat",
      "Not suitable for direct-to-substrate application over non-ferrous metals without etch primer",
    ],
    procurementSources: [
      { name: "Wattyl — Killrust Range", url: "https://www.wattyl.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Rust-Oleum — Rust-Oleum Professional Rust Inhibitor Primer",
    brandUrl: "https://www.rustoleum.com.au",
    tdsUrl: "https://www.rustoleum.com.au/products/professional",
    accentColor: "#d4a017",
    name: "Rust-Oleum Professional Rust Inhibitor Primer",
    descriptionLine: "Oil-based rust-inhibiting primer for ferrous metals providing active rust prevention and excellent adhesion for exterior topcoat systems on building metalwork",
    productType: "Oil-based rust-inhibiting primer",
    filterTags: ["Rust-inhibiting", "Metal-primer", "Ferrous-metal", "Anti-corrosion", "Solvent-based", "Zinc-phosphate", "Structural-steel", "Water-based"],
    techChips: [
      { label: "Oil-based", cls: "bg-amber-100 text-amber-700" },
      { label: "Rust-inhibiting", cls: "bg-orange-100 text-orange-700" },
      { label: "Professional", cls: "bg-gray-100 text-gray-700" },
    ],
    systemDescription: "Rust-Oleum Professional Primer provides oil-based rust-inhibiting protection for ferrous metal substrates on building facades, balustrades, structural steelwork, and metal fixings. The oil-based formulation provides excellent wetting of metal surfaces, even those with minor surface oxidation, delivering reliable adhesion and corrosion resistance as the base for full paint systems.",
    technicalProperties: [
      "Base: oil-modified alkyd resin",
      "DFT: 35–50 µm per coat",
      "Coverage: ~12–14 m²/L",
      "Dry time (touch): 2–3 h",
      "Dry time (recoat): 24 h",
    ],
    limitations: [
      "Longer recoat time compared to water-based alternatives — plan scheduling accordingly",
      "Not suitable for surfaces with active rust scale — mechanically remove scale before application",
      "Solvent-based — check local VOC compliance for interior or confined-space applications",
    ],
    procurementSources: [
      { name: "Rust-Oleum Australia", url: "https://www.rustoleum.com.au" },
      { name: "Bunnings", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Rust-inhibiting", label: "Rust-inhibiting" },
  { id: "Metal-primer", label: "Metal primer" },
  { id: "Ferrous-metal", label: "Ferrous metal" },
  { id: "Zinc-phosphate", label: "Zinc phosphate" },
  { id: "Solvent-based", label: "Solvent-based" },
  { id: "Water-based", label: "Water-based" },
  { id: "Anti-corrosion", label: "Anti-corrosion" },
  { id: "Structural-steel", label: "Structural steel" },
];

const COMPARISON_ROWS = [
  { product: "Dulux Metalshield Rust Inhibitor", brand: "Dulux", type: "Zinc phosphate", dft: "40–60 µm", recoat: "4–8 h", mechanism: "Zinc phosphate pigment", keyFeature: "High-build, single component" },
  { product: "Wattyl Killrust Epoxy Primer", brand: "Wattyl", type: "2K epoxy", dft: "50–75 µm", recoat: "Depends on temp", mechanism: "Crosslinked epoxy barrier", keyFeature: "Maximum corrosion resistance" },
  { product: "Rust-Oleum Professional Primer", brand: "Rust-Oleum", type: "Oil-based alkyd", dft: "35–50 µm", recoat: "24 h", mechanism: "Oil-based wetting + pigment", keyFeature: "Excellent metal wetting" },
];

const TECH_INFO = {
  typicalApplications: [
    "Structural steelwork on balconies, walkways, and facade support frames",
    "Metal window and door frames before exterior repaint",
    "Steel balustrades, handrails, and grilles",
    "Metal cladding fixings and brackets before coating",
  ],
  selectionCriteria: [
    "Two-component epoxy primers for aggressive marine and industrial environments",
    "Zinc phosphate single-component primers for normal to moderate exposure",
    "Oil-based primers where surface is slightly oxidised and cannot be blasted",
    "Check AS/NZS 2312 for corrosion category to guide primer selection",
  ],
  limitations: [
    "All rust-inhibiting primers require proper surface preparation — no primer compensates for scale, grease, or weld spatter",
    "Minimum surface cleanliness: Sa 2 (blast) or St 3 (power tool) for meaningful corrosion protection",
    "Epoxy primers require UV-stable topcoat — exposed epoxy degrades rapidly in sunlight",
    "Do not apply in rain or to wet metal — moisture trapping under primer leads to early failure",
  ],
  standardsNotes: [
    "AS/NZS 2312:2014 — Guide to the protection of structural steel against atmospheric corrosion",
    "ISO 8501-1 — Surface preparation standards for steel (Sa 1, Sa 2, Sa 2½, Sa 3)",
    "AS 3715 — Metal finishing — electroplating of zinc (relevant for galvanised substrates)",
    "NATSPEC: Section 0332 — Metal painting and coating systems",
  ],
  suitableDefects: [
    "Corrosion and rust staining on metal facade elements",
    "Peeling paint on structural steelwork requiring full repaint",
    "Metal fixings and brackets showing oxidation",
    "Pre-treatment of new uncoated steel before installation",
  ],
  typicalSubstrates: [
    "Structural steel — hollow sections, plates, angles",
    "Mild steel window and door frames",
    "Cast iron components on heritage facades",
    "Galvanised steel — requires wash primer or etch primer before rust-inhibiting coat",
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

export function RustInhibitingPrimerIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Rust-Inhibiting Primer Systems</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Rust-inhibiting primers are specified for ferrous metal elements on building facades — structural steelwork, metal frames, balustrades, and fixings — to prevent corrosion and provide adhesion for topcoat paint systems. They use active anti-corrosion pigments (zinc phosphate, zinc chromate-free alternatives) or barrier mechanisms (epoxy) to interrupt the corrosion cell. Substrate preparation to a defined cleanliness standard is the most critical factor in primer performance.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Substrate", value: "Ferrous metal" },
          { label: "Mechanism", value: "Zinc phosphate / epoxy" },
          { label: "DFT", value: "35–75 µm" },
          { label: "Prep standard", value: "Sa 2 / St 3" },
        ].map((s) => (
          <div key={s.label} className="bg-orange-50 rounded-xl p-3 text-center">
            <p className="text-xs text-orange-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-orange-900">{s.value}</p>
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

export function RustInhibitingPrimerProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-orange-600 text-white border-orange-600" : "bg-white text-gray-600 border-gray-300 hover:border-orange-400"}`}>
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
          className="flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-800">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>
                  {["Product", "Brand", "Type", "DFT", "Recoat time", "Mechanism", "Key feature"].map((h) => (
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
                    <td className="px-3 py-2 text-gray-600">{row.dft}</td>
                    <td className="px-3 py-2 text-gray-600">{row.recoat}</td>
                    <td className="px-3 py-2 text-gray-600">{row.mechanism}</td>
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
