"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Silane"
  | "Siloxane"
  | "Water-repellent"
  | "Penetrating"
  | "Masonry"
  | "Concrete"
  | "Invisible-finish"
  | "Breathable";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Mapei — Antipluviol S Siloxane Water Repellent",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/product-detail/antipluviol-s",
    accentColor: "#003087",
    name: "Antipluviol S Siloxane Water Repellent",
    descriptionLine: "Concentrated siloxane-based penetrating water repellent for masonry and concrete providing hydrophobic protection with no change to surface appearance",
    productType: "Siloxane penetrating water repellent",
    filterTags: ["Silane", "Siloxane", "Water-repellent", "Penetrating", "Masonry", "Concrete", "Invisible-finish", "Breathable"],
    techChips: [
      { label: "Siloxane", cls: "bg-blue-100 text-blue-700" },
      { label: "Invisible", cls: "bg-stone-100 text-stone-700" },
      { label: "Breathable", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription: "Mapei Antipluviol S is a concentrated siloxane-based penetrating water repellent that reacts with the substrate to form a hydrophobic lining within the pore structure without blocking pores. Applied to masonry, brick, and concrete facades, it repels liquid water while maintaining full vapour permeability (breathing). The treatment is invisible — it does not change the surface appearance, making it ideal for heritage and exposed brick or stonework where surface films are unacceptable.",
    technicalProperties: [
      "Active agent: modified polydimethylsiloxane",
      "Coverage: 3–6 m²/L on porous masonry (varies with absorption)",
      "Water absorption reduction: >80% (RILEM tube test)",
      "Vapour permeability: >80% retained after treatment",
      "Depth of penetration: 5–15 mm depending on porosity",
    ],
    limitations: [
      "Not a film-forming product — will not bridge cracks or provide positive waterproofing against hydrostatic pressure",
      "Not effective on dense, low-porosity substrates where penetration is negligible",
      "Requires reapplication every 5–10 years in aggressive exposure conditions",
    ],
    procurementSources: [
      { name: "Mapei Australia — Distributor Search", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Sika — SikaPenetrex Silane-Siloxane Impregnation",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/solutions/products/sikapentrex.html",
    accentColor: "#cc0000",
    name: "SikaPenetrex Silane-Siloxane Impregnation",
    descriptionLine: "Silane-siloxane penetrating water repellent providing deep substrate penetration and long-term hydrophobic protection on masonry and concrete facades",
    productType: "Silane-siloxane blend penetrating impregnation",
    filterTags: ["Silane", "Siloxane", "Water-repellent", "Penetrating", "Masonry", "Concrete", "Invisible-finish", "Breathable"],
    techChips: [
      { label: "Silane-siloxane blend", cls: "bg-red-100 text-red-700" },
      { label: "Deep penetration", cls: "bg-orange-100 text-orange-700" },
      { label: "Invisible", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "SikaPenetrex combines silane and siloxane technology to deliver both deep substrate penetration (via the smaller silane molecule) and an effective hydrophobic lining (via the larger siloxane network). The blended chemistry provides broader protection coverage than either technology alone. Suitable for brick, block, concrete, and natural stone facades where invisible water repellency with maintained vapour permeability is required.",
    technicalProperties: [
      "Active blend: silane + siloxane combination",
      "Penetration depth: 10–25 mm (silane component penetrates deepest)",
      "Water absorption reduction: >90%",
      "Vapour permeability: maintained — breathable treatment",
      "Coverage: 4–8 m²/L depending on substrate",
    ],
    limitations: [
      "Effectiveness reduced on glazed brick, very dense concrete, or substrate with existing hydrophobic coating",
      "Apply on dry substrate — moisture in pores competes with penetration",
      "Solvent-borne grades available for particularly dense substrates — check product range",
    ],
    procurementSources: [
      { name: "Sika Australia — Distributor Search", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc — Nitofill Impregnation Silane Treatment",
    brandUrl: "https://www.fosroc.com/en-au",
    tdsUrl: "https://www.fosroc.com/en-au/products/concrete-repair-and-protection/sealers-and-coatings",
    accentColor: "#e87722",
    name: "Nitofill Impregnation Silane Treatment",
    descriptionLine: "Monomeric silane penetrating impregnation providing the deepest available penetration depth and long-term chloride exclusion for concrete and masonry facades",
    productType: "Monomeric silane penetrating impregnation",
    filterTags: ["Silane", "Siloxane", "Water-repellent", "Penetrating", "Masonry", "Concrete", "Invisible-finish", "Breathable"],
    techChips: [
      { label: "Monomeric silane", cls: "bg-orange-100 text-orange-700" },
      { label: "Deep penetration", cls: "bg-red-100 text-red-700" },
      { label: "Chloride exclusion", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "Fosroc Nitofill Impregnation is a monomeric isooctyltriethoxysilane treatment providing maximum penetration depth compared to siloxane products. The small monomer diffuses deeply into concrete and masonry pore networks, polymerising in situ to form a hydrophobic lining that resists chloride ion ingress. It is particularly specified for coastal and marine environments where chloride exclusion from reinforced concrete is a primary objective.",
    technicalProperties: [
      "Active agent: monomeric isooctyltriethoxysilane",
      "Penetration depth: up to 30 mm on porous concrete",
      "Chloride resistance: significantly reduces chloride diffusion",
      "Water absorption: >90% reduction",
      "Vapour transmission: >85% retained",
    ],
    limitations: [
      "Monomeric silanes are reactive and require dry, warm substrate conditions for optimum cure",
      "Coverage rates vary significantly with concrete porosity — test panel recommended before large-scale application",
      "Solvent-borne product — PPE and ventilation required; check VOC compliance",
    ],
    procurementSources: [
      { name: "Fosroc Australia — Contact/Distributor", url: "https://www.fosroc.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Silane", label: "Silane" },
  { id: "Siloxane", label: "Siloxane" },
  { id: "Water-repellent", label: "Water-repellent" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Invisible-finish", label: "Invisible finish" },
  { id: "Breathable", label: "Breathable" },
];

const COMPARISON_ROWS = [
  { product: "Mapei Antipluviol S", brand: "Mapei", type: "Siloxane", penetration: "5–15 mm", waterReduction: ">80%", vapourPerm: ">80% retained", keyFeature: "Breathable, invisible, masonry" },
  { product: "Sika SikaPenetrex", brand: "Sika", type: "Silane-siloxane blend", penetration: "10–25 mm", waterReduction: ">90%", vapourPerm: "Maintained", keyFeature: "Dual chemistry, broad coverage" },
  { product: "Fosroc Nitofill Impregnation", brand: "Fosroc", type: "Monomeric silane", penetration: "Up to 30 mm", waterReduction: ">90%", vapourPerm: ">85% retained", keyFeature: "Maximum penetration, chloride exclusion" },
];

const TECH_INFO = {
  typicalApplications: [
    "Invisible water repellent treatment on exposed brick, stone, or fair-faced concrete facades",
    "Chloride exclusion treatment on reinforced concrete facades in coastal environments",
    "Protection of heritage and sandstone buildings without altering surface appearance",
    "Post-repair impregnation on concrete structures after patching and reinstatement",
  ],
  selectionCriteria: [
    "Siloxane products for general masonry and render water-repellent treatment",
    "Silane-siloxane blends for broader coverage and dual-mechanism performance",
    "Monomeric silane for reinforced concrete where chloride exclusion is the primary objective",
    "Confirm substrate porosity — dense, low-absorption surfaces will not allow meaningful penetration",
  ],
  limitations: [
    "Penetrating treatments are not film-forming — they do not seal cracks or provide positive waterproofing",
    "Service life is 5–15 years depending on exposure — schedule for periodic reapplication",
    "Previously applied films, paints, or coatings must be removed before penetrating treatments can work",
    "Treatments cannot be verified visually — water bead test (RILEM tube) is the only reliable performance check",
  ],
  standardsNotes: [
    "EN 1504-2 — Products and systems for the protection and repair of concrete structures: surface protection systems",
    "ASTM C1202 / C1763 — water and chloride penetration resistance testing of concrete",
    "AS 3600 — Concrete structures: durability requirements for concrete in various exposure classifications",
    "Manufacturer TDS specifies application conditions, coverage, and test data for substrate-specific performance",
  ],
  suitableDefects: [
    "Water ingress through porous masonry and brick without visible cracking",
    "Chloride contamination and corrosion risk in coastal exposed concrete",
    "Rising damp management — combined with other treatment for moisture management",
    "Heritage masonry facades requiring water repellency without surface film application",
  ],
  typicalSubstrates: [
    "Porous clay brick — common and heritage stock",
    "Natural stone — sandstone, limestone, granite",
    "Concrete — reinforced and unreinforced (porous grade)",
    "Fair-faced concrete block (CMU) masonry",
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

export function PenetratingSilaneSiloxaneIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Penetrating Silane & Siloxane Water Repellents</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Penetrating silane and siloxane treatments impregnate the pore structure of masonry and concrete, lining pores with a hydrophobic layer that repels liquid water while allowing water vapour to pass freely through the substrate. Unlike surface coatings, they leave no visible film and do not alter the surface appearance — making them the only acceptable water-repellent treatment for exposed brick, stone, and fair-faced concrete. They are also the primary tool for chloride exclusion protection on reinforced concrete facades in coastal environments.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Type", value: "Silane / siloxane" },
          { label: "Penetration", value: "5–30 mm" },
          { label: "Water reduction", value: ">80–90%" },
          { label: "Surface finish", value: "Invisible" },
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

export function PenetratingSilaneSiloxaneProductSection() {
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
                <tr>{["Product", "Brand", "Type", "Penetration", "Water reduction", "Vapour perm.", "Key feature"].map((h) => <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{row.product}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-gray-600">{row.penetration}</td>
                    <td className="px-3 py-2 text-gray-600">{row.waterReduction}</td>
                    <td className="px-3 py-2 text-gray-600">{row.vapourPerm}</td>
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
