"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Crystalline"
  | "Salt-retardant"
  | "Substrate-treatment"
  | "Masonry"
  | "Integral-waterproofing"
  | "Pre-render"
  | "Rising-damp"
  | "Reactive";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika — SikaTop Seal 107 Crystalline Treatment",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/solutions/products/sikatop-seal-107.html",
    accentColor: "#cc0000",
    name: "SikaTop Seal 107 Crystalline Treatment",
    descriptionLine: "Two-component polymer-modified crystalline cementitious slurry for salt-contaminated and damp masonry substrates",
    productType: "Two-component crystalline slurry",
    filterTags: ["Crystalline", "Salt-retardant", "Substrate-treatment", "Masonry", "Integral-waterproofing", "Pre-render", "Rising-damp", "Reactive"],
    techChips: [
      { label: "Crystalline", cls: "bg-indigo-100 text-indigo-700" },
      { label: "Two-component", cls: "bg-red-100 text-red-700" },
      { label: "Pre-render", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "SikaTop Seal 107 is a two-component crystalline waterproofing and salt-retardant slurry applied by brush as a preparatory coat over salt-attacked masonry before render installation. The crystalline active compounds react with moisture and free lime in the substrate to fill capillary pores, reducing water and salt movement through the wall prior to render application.",
    technicalProperties: [
      "Components: powder + polymer liquid — mix 2-component",
      "Application: brush-applied slurry, typically 2 coats",
      "Coverage: ~1.5–2.0 kg/m² per coat",
      "Crystalline depth penetration: up to 400 mm over time",
      "Bond strength: excellent adhesion to damp substrates",
    ],
    limitations: [
      "Does not permanently stop rising damp — source must be addressed for long-term performance",
      "Requires damp substrate for crystalline reaction — do not apply to dry substrate",
      "Allow sufficient cure before render application (min 24 h)",
    ],
    procurementSources: [
      { name: "Sika Australia — Distributor Search", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Mapei — Idrosilex Pronto Salt-Retardant Render",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/product-detail/idrosilex-pronto",
    accentColor: "#003087",
    name: "Idrosilex Pronto Salt-Retardant Render",
    descriptionLine: "Ready-to-use salt-retardant cementitious mortar applied directly to damp, contaminated substrates as a pre-render treatment or sacrificial render coat",
    productType: "Pre-bagged salt-retardant mortar",
    filterTags: ["Salt-retardant", "Substrate-treatment", "Masonry", "Pre-render", "Rising-damp", "Reactive", "Crystalline", "Integral-waterproofing"],
    techChips: [
      { label: "Salt-retardant", cls: "bg-blue-100 text-blue-700" },
      { label: "Pre-bagged", cls: "bg-indigo-100 text-indigo-700" },
      { label: "Damp substrate", cls: "bg-cyan-100 text-cyan-700" },
    ],
    systemDescription: "Idrosilex Pronto is a factory-blended, salt-retardant mortar formulated to be applied directly to wet, damp, and salt-contaminated masonry. It incorporates specific admixtures that retard salt crystal growth within the render matrix, extending the service life of the subsequent decorative or protective render system. It functions as a sacrificial buffer layer.",
    technicalProperties: [
      "Application: trowel or machine-applied, 5–20 mm thick",
      "Salt-crystallisation resistance: proprietary admixture blend",
      "Compressive strength (28d): >15 MPa",
      "Water absorption: reduced vs standard cement render",
      "Can be applied to substrates with moisture content up to saturation",
    ],
    limitations: [
      "Not a permanent damp-proof course substitute — does not eliminate rising damp",
      "Effectiveness reduces if salt load in substrate is extreme — desalination recommended",
      "Requires mechanical key (hack or acid etch) on smooth, painted, or dense substrates",
    ],
    procurementSources: [
      { name: "Mapei Australia — Distributor Search", url: "https://www.mapei.com/au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc — Nitofill WP Salt-Inhibiting Slurry",
    brandUrl: "https://www.fosroc.com/en-au",
    tdsUrl: "https://www.fosroc.com/en-au/products/concrete-repair-and-protection",
    accentColor: "#e87722",
    name: "Nitofill WP Salt-Inhibiting Slurry",
    descriptionLine: "Polymer-enhanced cementitious slurry treatment providing salt inhibition and improved render bond over contaminated masonry",
    productType: "Polymer-modified cementitious slurry",
    filterTags: ["Salt-retardant", "Substrate-treatment", "Masonry", "Pre-render", "Rising-damp", "Reactive", "Integral-waterproofing", "Crystalline"],
    techChips: [
      { label: "Polymer-modified", cls: "bg-orange-100 text-orange-700" },
      { label: "Salt-inhibiting", cls: "bg-red-100 text-red-700" },
      { label: "Slurry coat", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Nitofill WP from Fosroc is a cementitious polymer-modified slurry system applied as a pre-render treatment to damp and salt-contaminated masonry. The polymer component improves adhesion to the substrate, while the cementitious matrix acts as a salt-inhibiting primer layer that reduces ionic transport of salts into the subsequent render system.",
    technicalProperties: [
      "Application: brush-applied slurry, 1–2 coats",
      "Coverage: ~1.0–1.5 kg/m² per coat",
      "Polymer: styrene-butadiene copolymer dispersion",
      "Bond strength: >1.0 MPa to prepared substrate",
      "Salt inhibition: reduces ionic transport through treatment layer",
    ],
    limitations: [
      "Active rising damp must be reduced or treated before long-term performance can be expected",
      "Not suitable as a standalone waterproof membrane — use in conjunction with render or coating system",
      "Minimum 2 brush coats required for effective salt barrier in highly contaminated substrates",
    ],
    procurementSources: [
      { name: "Fosroc Australia — Contact/Distributor", url: "https://www.fosroc.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Crystalline", label: "Crystalline" },
  { id: "Salt-retardant", label: "Salt-retardant" },
  { id: "Substrate-treatment", label: "Substrate treatment" },
  { id: "Masonry", label: "Masonry" },
  { id: "Integral-waterproofing", label: "Integral waterproofing" },
  { id: "Pre-render", label: "Pre-render" },
  { id: "Rising-damp", label: "Rising damp" },
  { id: "Reactive", label: "Reactive" },
];

const COMPARISON_ROWS = [
  { product: "SikaTop Seal 107", brand: "Sika", type: "Crystalline slurry", application: "Brush, 2 coats", coverage: "1.5–2.0 kg/m²", saltMech: "Crystalline pore-fill", keyFeature: "Deep crystalline penetration" },
  { product: "Idrosilex Pronto", brand: "Mapei", type: "Salt-retardant mortar", application: "Trowel/machine", coverage: "5–20 mm thick", saltMech: "Crystal-growth inhibitor", keyFeature: "Sacrificial buffer layer" },
  { product: "Nitofill WP", brand: "Fosroc", type: "Polymer slurry", application: "Brush, 1–2 coats", coverage: "1.0–1.5 kg/m²", saltMech: "Ionic transport reduction", keyFeature: "SBR polymer bond + salt inhibit" },
];

const TECH_INFO = {
  typicalApplications: [
    "Pre-render treatment over brick masonry affected by rising damp and salt attack",
    "Substrate preparation prior to salt-resistant renovating render application",
    "Sacrificial treatment layer on coastal masonry before decorative render",
    "Remediation of efflorescence-prone substrates as part of facade restoration",
  ],
  selectionCriteria: [
    "Crystalline slurries preferred where deep pore-fill is required (old porous brick)",
    "Mortar-type treatments preferred where substrate is heavily contaminated and sacrificial render is acceptable",
    "Polymer slurries preferred where enhanced adhesion to a dense substrate is also needed",
    "Two-component systems provide higher performance but require precise mix ratios on site",
  ],
  limitations: [
    "No substrate treatment eliminates the salt source — rising damp and water ingress must be addressed",
    "Salt retardants slow crystallisation damage but do not prevent it indefinitely if substrate remains wet",
    "Performance of subsequent render is directly dependent on correct treatment application and cure",
    "Multiple treatment coats may be required on heavily contaminated heritage masonry",
  ],
  standardsNotes: [
    "AS 3700:2018 — preparation requirements before render application",
    "AS/NZS 4858 — wet area membrane systems (where applicable as primer component)",
    "Manufacturer TDS defines minimum cure time between treatment and render application",
    "Desalination poultice or wash-down may be specified in conjunction with substrate treatment on heritage buildings",
  ],
  suitableDefects: [
    "Salt attack and efflorescence from rising damp",
    "Failed render over salt-loaded masonry",
    "Coastal masonry with chloride contamination in substrate",
    "Substrate preparation for full salt-remediation render program",
  ],
  typicalSubstrates: [
    "Porous clay brick masonry (old or heritage stock)",
    "Calcium silicate brick and blockwork",
    "Concrete masonry units — salt-contaminated",
    "Stone masonry — subject to compatibility check",
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

export function SaltRetardantTreatmentIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Salt-Retardant Substrate Treatment</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Salt-retardant substrate treatments are applied directly to salt-contaminated masonry before render installation to retard crystallisation damage and reduce ionic salt transport. They include crystalline slurries, polymer-modified mortar coatings, and reactive penetrating treatments. While they extend the service life of the subsequent render system, they are most effective when used as part of a complete salt-remediation programme that addresses the moisture source driving salt migration.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Type", value: "Slurry / mortar" },
          { label: "Mechanism", value: "Crystalline / ionic" },
          { label: "Application", value: "Brush / trowel" },
          { label: "Pre-render", value: "Yes — mandatory" },
        ].map((s) => (
          <div key={s.label} className="bg-indigo-50 rounded-xl p-3 text-center">
            <p className="text-xs text-indigo-600 font-medium mb-1">{s.label}</p>
            <p className="text-sm font-bold text-indigo-900">{s.value}</p>
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

export function SaltRetardantTreatmentProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const [showComparison, setShowComparison] = useState(false);
  const filtered = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...FILTER_DEFS.map((f) => f.id)].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f as FilterTag | "All")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}>
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
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800">
          {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showComparison ? "Hide" : "Show"} product comparison table
        </button>
        {showComparison && (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px]">
                <tr>
                  {["Product", "Brand", "Type", "Application", "Coverage", "Salt mechanism", "Key feature"].map((h) => (
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
                    <td className="px-3 py-2 text-gray-600">{row.coverage}</td>
                    <td className="px-3 py-2 text-gray-600">{row.saltMech}</td>
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
