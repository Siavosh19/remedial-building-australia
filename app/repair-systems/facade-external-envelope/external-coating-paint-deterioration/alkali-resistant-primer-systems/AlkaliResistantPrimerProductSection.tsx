"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type FilterTag =
  | "Alkali-resistant"
  | "Exterior-primer"
  | "Masonry"
  | "Concrete"
  | "New-render"
  | "Solvent-free"
  | "Water-based"
  | "Adhesion-promoter";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux — Dulux Primer for Masonry & Render",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/primers-undercoats",
    accentColor: "#e2003a",
    name: "Dulux Weathershield Alkali Primer",
    descriptionLine: "Water-based alkali-resistant primer for new and existing cement render, masonry, and concrete prior to exterior topcoat application",
    productType: "Water-based alkali-resistant primer",
    filterTags: ["Alkali-resistant", "Exterior-primer", "Masonry", "Concrete", "New-render", "Solvent-free", "Water-based", "Adhesion-promoter"],
    techChips: [
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Alkali-resistant", cls: "bg-green-100 text-green-700" },
      { label: "New render", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Dulux Weathershield Alkali Primer is a water-based primer formulated to seal and prepare new or old cement render, masonry, and concrete substrates before application of exterior paint systems. It neutralises surface alkalinity, reduces substrate porosity variation, and improves topcoat adhesion and uniformity, reducing the risk of early coating failure on highly alkaline new render.",
    technicalProperties: [
      "Base: water-based acrylic",
      "Coverage: 10–14 m²/L on smooth substrates (less on porous)",
      "DFT: ~25–40 µm per coat",
      "pH resistance: suitable for substrates up to pH 13",
      "Recoat time: 2–4 hours at 25 °C",
    ],
    limitations: [
      "Do not apply to new render cured less than 28 days without testing alkalinity — use pH indicator paper",
      "Not a fill primer — deep surface defects must be patched before priming",
      "Avoid application in temperatures below 10 °C or above 35 °C",
    ],
    procurementSources: [
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Solver — Solver Prep & Finish Alkali Primer",
    brandUrl: "https://www.solver.com.au",
    tdsUrl: "https://www.solver.com.au/products/primers",
    accentColor: "#0057a8",
    name: "Solver Prep & Finish Alkali Primer",
    descriptionLine: "Acrylic alkali-resistant primer sealing new and aged masonry and render substrates for exterior coating systems",
    productType: "Acrylic alkali-resistant primer",
    filterTags: ["Alkali-resistant", "Exterior-primer", "Masonry", "Concrete", "New-render", "Water-based", "Adhesion-promoter", "Solvent-free"],
    techChips: [
      { label: "Acrylic", cls: "bg-blue-100 text-blue-700" },
      { label: "Alkali-resistant", cls: "bg-green-100 text-green-700" },
      { label: "Masonry", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Solver's alkali-resistant exterior primer is a water-based acrylic formulated for application to cement render, masonry, and concrete facades. The primer film resists saponification from high-pH substrates and provides a consistent base for acrylic, elastomeric, and textured topcoat systems. Suitable for both new render and aged surfaces being repainted.",
    technicalProperties: [
      "Base: water-based acrylic emulsion",
      "Coverage: 12–16 m²/L depending on porosity",
      "Dry time (touch): 30–60 min at 25 °C",
      "Dry time (recoat): 2–4 h",
      "Alkali tolerance: pH up to 13",
    ],
    limitations: [
      "New render must achieve full carbonation (typically 28 days) before priming for best results",
      "One coat may be insufficient on highly porous or unpainted substrates — apply two coats",
      "Do not use as a sole moisture barrier — topcoat system provides weather resistance",
    ],
    procurementSources: [
      { name: "Solver Paints — Where to Buy", url: "https://www.solver.com.au" },
      { name: "Mitre 10 / True Value Hardware", url: "https://www.mitre10.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl — Wattyl I.D. Prep Exterior Alkali Primer",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en/wattyl-exterior",
    accentColor: "#cc0000",
    name: "Wattyl I.D. Prep Exterior Alkali Primer",
    descriptionLine: "Penetrating acrylic alkali-resistant primer for cement render, brick, and masonry delivering improved adhesion and uniform porosity for exterior repaints and new work",
    productType: "Penetrating acrylic primer",
    filterTags: ["Alkali-resistant", "Exterior-primer", "Masonry", "Concrete", "New-render", "Water-based", "Adhesion-promoter", "Solvent-free"],
    techChips: [
      { label: "Penetrating", cls: "bg-indigo-100 text-indigo-700" },
      { label: "Alkali-resistant", cls: "bg-green-100 text-green-700" },
      { label: "Acrylic", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription: "Wattyl I.D. Prep penetrates into porous render and masonry substrates, consolidating loose material and sealing high-porosity zones before topcoat application. The alkali-resistant binder resists saponification, and the low-viscosity formulation promotes good penetration for effective substrate binding and adhesion promotion.",
    technicalProperties: [
      "Base: penetrating water-based acrylic",
      "Coverage: 8–12 m²/L on porous masonry",
      "Penetration: seals and binds loose surface particles",
      "Touch dry: 1 h at 25 °C",
      "Recoat: 2–4 h",
    ],
    limitations: [
      "Not a structural repair system — cracks and surface defects must be repaired before priming",
      "Avoid application over oil-contaminated, painted (peeling), or efflorescence-active surfaces — prepare first",
      "On extremely porous substrates, multiple diluted coats may be required",
    ],
    procurementSources: [
      { name: "Wattyl — Where to Buy", url: "https://www.wattyl.com.au" },
      { name: "Bunnings", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Alkali-resistant", label: "Alkali-resistant" },
  { id: "Exterior-primer", label: "Exterior primer" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "New-render", label: "New render" },
  { id: "Solvent-free", label: "Solvent-free" },
  { id: "Water-based", label: "Water-based" },
  { id: "Adhesion-promoter", label: "Adhesion promoter" },
];

const COMPARISON_ROWS = [
  { product: "Dulux Weathershield Alkali Primer", brand: "Dulux", type: "Water-based acrylic", coverage: "10–14 m²/L", recoat: "2–4 h", phLimit: "pH 13", keyFeature: "Industry standard, wide availability" },
  { product: "Solver Prep & Finish Alkali Primer", brand: "Solver", type: "Acrylic emulsion", coverage: "12–16 m²/L", recoat: "2–4 h", phLimit: "pH 13", keyFeature: "High coverage rate, cost-effective" },
  { product: "Wattyl I.D. Prep Alkali Primer", brand: "Wattyl", type: "Penetrating acrylic", coverage: "8–12 m²/L", recoat: "2–4 h", phLimit: "pH 13", keyFeature: "Penetrating action, binds loose substrate" },
];

const TECH_INFO = {
  typicalApplications: [
    "Priming new cement render before acrylic or elastomeric topcoat",
    "Re-priming aged masonry and render before exterior repaint",
    "Sealing porous render on residential and commercial facade restoration",
    "First coat in exterior coating system on concrete block and brick masonry",
  ],
  selectionCriteria: [
    "Penetrating primers preferred on highly porous, chalky, or friable old render",
    "Film-forming acrylic primers suited to new render with moderate porosity",
    "Confirm topcoat compatibility — use same brand primer and topcoat where possible",
    "Test pH before priming new render — pH >12 requires delayed application or neutralising pre-treatment",
  ],
  limitations: [
    "Alkali-resistant primers are not a substitute for adequate render cure time",
    "Will not seal active cracks or inhibit rising damp — address substrate defects first",
    "Application in high humidity or rain risk will extend cure times and can cause film defects",
    "Do not apply over loose, peeling paint or contaminated surfaces without full preparation",
  ],
  standardsNotes: [
    "AS/NZS 2310 — Glossary of paint and varnish terms",
    "AS 4548 — Guide to long-life coatings for concrete and masonry",
    "Manufacturer TDS governs thinning, coverage, and recoat interval requirements",
    "NATSPEC: Section 0233 — Painting exterior — specifies primer requirements",
  ],
  suitableDefects: [
    "Coating adhesion failure on alkaline new render",
    "Chalking and friable old paint surface requiring consolidation before recoat",
    "Uneven porosity causing paint sheen variation on masonry",
    "Exterior facade repainting after render repair works",
  ],
  typicalSubstrates: [
    "Cement sand render — new (≥28 days cure) and aged",
    "Brick and block masonry facades",
    "Concrete panel and tilt-up construction",
    "Fibre cement sheet cladding (confirm product suitability)",
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

export function AlkaliResistantPrimerIntroSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Alkali-Resistant Primer Systems</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Alkali-resistant primers are the essential first coat for all exterior paint systems applied to cement render, masonry, and concrete. New render and concrete substrates are highly alkaline (pH 12–13) and will saponify (break down) conventional paint binders unless an alkali-resistant primer is applied first. They also seal variable substrate porosity, improving topcoat adhesion and reducing uneven sheen. Available as water-based acrylics, penetrating types, and specialised sealer-primers.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Base", value: "Water-based acrylic" },
          { label: "Coverage", value: "8–16 m²/L" },
          { label: "pH resistance", value: "Up to pH 13" },
          { label: "Recoat time", value: "2–4 hours" },
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

export function AlkaliResistantPrimerProductSection() {
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
                  {["Product", "Brand", "Type", "Coverage", "Recoat time", "pH limit", "Key feature"].map((h) => (
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
                    <td className="px-3 py-2 text-gray-600">{row.coverage}</td>
                    <td className="px-3 py-2 text-gray-600">{row.recoat}</td>
                    <td className="px-3 py-2 text-gray-600">{row.phLimit}</td>
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
