"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag =
  | "VM-Zinc"
  | "Rheinzink"
  | "Natural-zinc"
  | "Standing-seam"
  | "Heritage";

type Product = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "VMZINC — Umicore",
    brandUrl: "https://www.vmzinc.com.au",
    accentColor: "#64748b",
    name: "VMZINC Natural Zinc",
    descriptionLine:
      "Natural rolled zinc sheet; 0.65mm–1.0mm thickness; standing seam, click-lock and batten profiles; self-healing blue-grey patina; heritage and premium applications",
    productType: "Natural zinc sheet — standing seam / click-lock profiles",
    filterTags: ["VM-Zinc", "Natural-zinc", "Standing-seam", "Heritage"],
    techChips: [
      { label: "VMZINC", cls: "bg-slate-100 text-slate-700" },
      { label: "Natural zinc", cls: "bg-slate-50 text-slate-600" },
      { label: "Standing seam", cls: "bg-sky-50 text-sky-700" },
      { label: "Heritage", cls: "bg-amber-50 text-amber-700" },
      { label: "Self-healing patina", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "VMZINC is manufactured by Umicore (Belgium) and is distributed in Australia through specialist roofing importers. Natural zinc sheet develops a characteristic blue-grey patina (zinc carbonate/hydroxide) that forms naturally over 12–36 months of weathering and becomes self-healing — minor scratches and abrasions are naturally covered by the reforming patina layer. VMZINC is used on heritage buildings, premium residential projects and architectural applications where the natural zinc aesthetic is specified. Available in natural and pre-weathered (QUARTZ-ZINC and ANTHRA-ZINC) finishes. Forming and installation requires zinc-specialist tradespeople trained in standing seam technique.",
    technicalProperties: [
      "Material: pure zinc (99.995% Zn) with small titanium and copper additions for strength",
      "Thickness: 0.65mm, 0.70mm, 0.80mm, 1.0mm — thickness selected to application and span",
      "Profiles: standing seam, click-lock, batten roll — confirm with installer and VMZINC",
      "Minimum pitch: 3° for standing seam; confirm profile-specific minimum from VMZINC TDS",
      "Patina: natural blue-grey zinc carbonate/hydroxide; forms over 12–36 months",
      "Pre-weathered finishes: QUARTZ-ZINC (grey), ANTHRA-ZINC (dark grey) — factory pre-weathered",
      "Thermal movement: significant — expansion joints and floating fixing required for all runs",
      "Weight: approx. 7.1 kg/m² at 1.0mm — structural loads must be confirmed by engineer",
    ],
    limitations: [
      "Must not contact copper, iron/steel (without isolation), lead in certain configurations, or bituminous products containing solvents",
      "Not suitable for direct contact with fresh concrete, mortar, or calcium-silicate board",
      "Installation requires zinc-specialist tradespeople — standard roofing installers are not qualified",
      "Significantly more expensive than Colorbond or Zincalume steel — confirm budget before specifying",
      "Long lead times — typically imported; confirm availability and delivery before specifying on remedial works",
      "Not suitable for all corrosive environments — avoid heavily industrial or heavily polluted atmospheric zones",
    ],
    procurementSources:
      "VMZINC Australia distributors — specialist importers in Sydney, Melbourne and other capitals. Contact VMZINC Australia for current distributor list. Not available through standard roofing merchants.",
  },
  {
    fullLabel: "Rheinzink — Rheinzink GmbH (Germany)",
    brandUrl: "https://www.rheinzink.com.au",
    accentColor: "#1e3a5f",
    name: "Rheinzink Natural Zinc",
    descriptionLine:
      "Natural rolled zinc sheet; 0.65mm–1.0mm thickness; standing seam and double-click profiles; blue-grey or pre-weathered finish; heritage and architectural applications",
    productType: "Natural zinc sheet — standing seam / double-click profiles",
    filterTags: ["Rheinzink", "Natural-zinc", "Standing-seam", "Heritage"],
    techChips: [
      { label: "Rheinzink", cls: "bg-blue-100 text-blue-800" },
      { label: "Natural zinc", cls: "bg-slate-50 text-slate-600" },
      { label: "Standing seam", cls: "bg-sky-50 text-sky-700" },
      { label: "Heritage", cls: "bg-amber-50 text-amber-700" },
      { label: "Pre-weathered", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Rheinzink is a German manufacturer of titanium zinc products and is one of the two primary natural zinc brands available in Australia. The product range includes natural zinc (develops blue-grey patina) and pre-weathered finishes (RHEINZINK-prePATINA blue-grey and graphite-grey). Rheinzink is available in sheet and coil form for standing seam, double-click and batten roll applications. The material is used on heritage buildings, premium residential, institutional and architectural projects where the zinc aesthetic is specified. Forming and installation requires zinc-specialist tradespeople and Rheinzink system knowledge.",
    technicalProperties: [
      "Material: titanium zinc (zinc with small titanium and copper additions per EN 988)",
      "Thickness: 0.65mm, 0.70mm, 0.80mm, 1.0mm",
      "Profiles: standing seam, double-click, batten roll — Rheinzink system-specific",
      "Minimum pitch: 3° for standing seam (confirm profile-specific minimum from Rheinzink TDS)",
      "Patina: natural blue-grey on natural finish; factory pre-weathered on prePATINA grades",
      "Thermal movement: significant — floating fixing and expansion joints required",
      "EN 988 compliant rolled zinc — equivalent Australian standard AS 1562.3 does not directly cover titanium zinc",
    ],
    limitations: [
      "Installation requires Rheinzink-trained zinc specialist tradespeople",
      "Premium cost — significantly more expensive than Colorbond or Zincalume",
      "Imported — long lead times; confirm availability before specifying on remedial works",
      "Galvanic isolation required from copper, ferrous metals and certain bituminous products",
      "Not suitable for direct contact with fresh concrete, mortar or calcium-silicate board",
      "Pre-weathered finishes are irreversible — confirm colour before installation",
    ],
    procurementSources:
      "Rheinzink Australia distributors — specialist importers. Contact Rheinzink Australia for current distributor list. Not available through standard roofing merchants.",
  },
  {
    fullLabel: "Specialist zinc — other brands",
    brandUrl: "https://www.zinc.com.au",
    accentColor: "#7c3aed",
    name: "Other natural zinc products",
    descriptionLine:
      "Elzinc, Anthra Zinc and other natural zinc sheet products used in Australian heritage and architectural roofing applications — confirm brand, thickness and system with specialist installer",
    productType: "Natural zinc sheet — confirm profile and system from importer TDS",
    filterTags: ["Natural-zinc", "Heritage"],
    techChips: [
      { label: "Specialist brands", cls: "bg-violet-50 text-violet-700" },
      { label: "Natural zinc", cls: "bg-slate-50 text-slate-600" },
      { label: "Heritage", cls: "bg-amber-50 text-amber-700" },
      { label: "Confirm importer", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Other natural zinc sheet products available in Australia include Elzinc (Spanish manufacturer) and various pre-weathered zinc products. All natural zinc roofing products share the same basic material properties — titanium zinc alloy, self-healing patina, requirement for specialist installation, galvanic isolation from copper/ferrous metals, and prohibition from contact with fresh concrete. Selection between brands is typically driven by heritage advisor specification, installer preference, or local distributor availability. Confirm the specific brand, product grade, thickness and system requirements with the zinc-specialist installer before specifying.",
    technicalProperties: [
      "Material: titanium zinc alloy — composition similar to VMZINC and Rheinzink",
      "Thickness: typically 0.65mm–1.0mm depending on application",
      "Minimum pitch: 3° for standing seam (confirm from brand TDS)",
      "Patina: natural zinc carbonate/hydroxide — forms over time on all natural zinc products",
    ],
    limitations: [
      "Confirm specific brand, importer and distributor before specifying — availability varies by state",
      "Same galvanic, concrete-contact and installer-competency requirements as VMZINC and Rheinzink",
      "Heritage adviser specification may mandate a specific brand — confirm before ordering",
    ],
    procurementSources:
      "Specialist roofing importers and heritage roofing contractors. Confirm the current Australian distributor for the specified brand before procurement.",
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All products" },
  { id: "VM-Zinc", label: "VMZINC" },
  { id: "Rheinzink", label: "Rheinzink" },
  { id: "Natural-zinc", label: "Natural zinc" },
  { id: "Standing-seam", label: "Standing seam" },
  { id: "Heritage", label: "Heritage" },
];

const BRAND_EQUIV = [
  {
    a: "VMZINC Natural",
    b: "Rheinzink Natural",
    note: "Technically equivalent material (titanium zinc alloy per EN 988). Both develop the same blue-grey patina. Not interchangeable in existing systems — clip and seam systems are brand-specific. Select based on heritage adviser specification, installer competency and local distributor availability.",
  },
  {
    a: "VMZINC QUARTZ-ZINC",
    b: "Rheinzink prePATINA blue-grey",
    note: "Both are factory pre-weathered natural zinc products with a similar grey finish. Not identical — confirm the specified finish with the heritage adviser and installer before ordering. Pre-weathered finishes cannot be changed after installation.",
  },
  {
    a: "Natural zinc (any brand)",
    b: "Zincalume steel",
    note: "NOT equivalent — completely different materials. Natural zinc is pure titanium zinc alloy. Zincalume is a zinc-aluminium alloy coating on steel. Natural zinc has a different patina, different structural properties, different fixing requirements and significantly higher cost.",
  },
];

const SYSTEM_COMPARISON = [
  {
    attribute: "Material",
    vmzinc: "Titanium zinc alloy",
    rheinzink: "Titanium zinc alloy",
    other: "Titanium zinc alloy",
  },
  {
    attribute: "Standard thicknesses",
    vmzinc: "0.65 / 0.70 / 0.80 / 1.0mm",
    rheinzink: "0.65 / 0.70 / 0.80 / 1.0mm",
    other: "Confirm from importer TDS",
  },
  {
    attribute: "Profiles",
    vmzinc: "Standing seam, click-lock, batten",
    rheinzink: "Standing seam, double-click, batten",
    other: "Confirm from installer",
  },
  {
    attribute: "Min pitch (standing seam)",
    vmzinc: "3°",
    rheinzink: "3°",
    other: "3° (confirm TDS)",
  },
  {
    attribute: "Natural finish patina",
    vmzinc: "Blue-grey (12–36 months)",
    rheinzink: "Blue-grey (12–36 months)",
    other: "Blue-grey (confirm timeline)",
  },
  {
    attribute: "Pre-weathered option",
    vmzinc: "QUARTZ-ZINC / ANTHRA-ZINC",
    rheinzink: "prePATINA blue-grey / graphite",
    other: "Confirm from brand TDS",
  },
  {
    attribute: "Australian distributor",
    vmzinc: "Specialist importers",
    rheinzink: "Specialist importers",
    other: "Confirm before specifying",
  },
];

type TechInfoItem = {
  title: string;
  icon: "check" | "warn" | "bullet";
  content: string;
};

const TECH_INFO: TechInfoItem[] = [
  {
    title: "Natural zinc patina — what it is and how it forms",
    icon: "check",
    content:
      "Natural zinc sheet develops a stable patina of zinc carbonate and zinc hydroxide over time through exposure to moisture, CO₂ and oxygen in the atmosphere. On a new roof, the surface will appear as a bright silver-grey metallic colour, which progressively weathers to the characteristic blue-grey zinc patina over 12–36 months depending on climate, orientation and pollution level. The patina is the material's protective layer — it is self-healing at minor scratches and abrasions. Pre-weathered products (VMZINC QUARTZ-ZINC, Rheinzink prePATINA) are factory-treated to produce an approximation of the mature patina from day one, eliminating the bright silver appearance during the weathering period.",
  },
  {
    title: "Thermal movement — critical design requirement",
    icon: "warn",
    content:
      "Natural zinc has a high coefficient of thermal expansion (approximately 22 × 10⁻⁶ /°C — about twice that of steel). Over a long sheet run, thermal expansion and contraction produces significant movement that must be accommodated in the fixing and seam design. All natural zinc roofing systems use floating (non-rigid) fixing clips that allow the sheet to slide under thermal movement. Failure to accommodate thermal movement results in seam distortion, clip fatigue and eventual leak paths. Run lengths must be designed in accordance with the zinc manufacturer's technical guidelines and installed by a zinc-trained tradesperson.",
  },
  {
    title: "Galvanic compatibility — isolation from copper and ferrous metals",
    icon: "warn",
    content:
      "Natural zinc must be isolated from copper and copper alloys (bronze, brass) and from uncoated ferrous metals (steel, iron) in direct contact or where runoff from these materials can contact the zinc. Copper runoff from copper flashings, copper pipes or copper gutters will cause accelerated dezincification and corrosion of natural zinc sheet. Isolation is achieved with EPDM, neoprene or bituminous separators at all contact points, and by routing drainage to prevent copper or iron runoff from reaching the zinc surface. Use zinc or compatible alloy fasteners and clips — steel or copper fasteners must not be used.",
  },
  {
    title: "Installer competency — zinc-specialist trades required",
    icon: "bullet",
    content:
      "Natural zinc roofing installation requires zinc-specialist tradespeople with specific training in standing seam and lock-seam forming techniques. Standard roofing sheet metal workers are not generally qualified to install natural zinc without specific zinc system training. Both VMZINC and Rheinzink publish installer competency requirements and some systems require use of manufacturer-approved installers. On Class 2 strata or heritage buildings, confirm installer competency, manufacturer approval status and insurance coverage before commencing works.",
  },
];

function TechAccordionItem({ item }: { item: TechInfoItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
            {item.icon === "check" && <CheckCircle size={12} />}
            {item.icon === "warn" && <AlertTriangle size={12} />}
            {item.icon === "bullet" && <Layers size={12} />}
          </div>
          <span className="text-sm font-extrabold text-sky-950">{item.title}</span>
        </div>
        {open ? <ChevronUp size={14} className="shrink-0 text-slate-400" /> : <ChevronDown size={14} className="shrink-0 text-slate-400" />}
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4">
          <p className="text-xs leading-6 text-slate-600">{item.content}</p>
        </div>
      )}
    </div>
  );
}

export function ZincIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is natural zinc sheet replacement?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Natural zinc roofing sheet is a titanium zinc alloy product that develops a characteristic blue-grey patina over time, providing both protection and the material&apos;s distinctive aesthetic. It is specified on heritage buildings, premium residential projects and architectural applications where the natural zinc finish is required. The two primary brands in Australia are VMZINC (Umicore, Belgium) and Rheinzink (Germany).
        </p>
        {expanded && (
          <>
            <p>
              Natural zinc is significantly more expensive than Colorbond or Zincalume steel and requires zinc-specialist tradespeople for installation. Thermal movement is a critical design constraint — the high coefficient of thermal expansion means all zinc sheet runs must use floating fixing systems and incorporate adequate expansion provision. Galvanic isolation from copper and ferrous metals is mandatory.
            </p>
            <p>
              On Class 2 strata buildings, natural zinc replacement is most commonly encountered on heritage-listed buildings where the existing zinc finish must be maintained or matched. A heritage architect or adviser should be engaged alongside the roofing consultant to confirm the specified zinc product, finish and installation system before commencing replacement works.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-5 text-xs font-semibold text-sky-700 hover:text-red-700 transition">
        {expanded ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function ZincProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibleProducts = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter as FilterTag));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="space-y-3">
        <div className="mb-2 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Technical Reference</h2>
            <p className="mt-1 text-sm text-slate-500">Patina formation, thermal movement, galvanic compatibility and installer competency guidance for natural zinc</p>
          </div>
        </div>
        {TECH_INFO.map((item) => (<TechAccordionItem key={item.title} item={item} />))}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — VMZINC, Rheinzink and other natural zinc brands available in Australia</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilter === f.id;
            return (<button key={f.id} type="button" onClick={() => setActiveFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>);
          })}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="w-[340px] shrink-0 rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderTopColor: product.accentColor, borderTopWidth: 3 }}>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{product.fullLabel}</span>
                  <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-700"><ExternalLink size={12} /></a>
                </div>
                <h3 className="text-base font-extrabold text-sky-950">{product.name}</h3>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">{product.descriptionLine}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{product.techChips.map((chip) => (<span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>))}</div>
              </div>
              <div className="border-t border-slate-100 px-5 pb-2 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Product type</p>
                <p className="mt-0.5 text-xs font-semibold text-sky-950">{product.productType}</p>
              </div>
              <div className="border-t border-slate-100 px-5 pb-4 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">System description</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{product.systemDescription}</p>
              </div>
              <div className="border-t border-slate-100 px-5 pb-4 pt-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Technical properties</p>
                <ul className="space-y-1.5">{product.technicalProperties.map((prop) => (<li key={prop} className="flex items-start gap-2 text-[11px] leading-4 text-slate-600"><CheckCircle size={10} className="mt-0.5 shrink-0 text-green-500" />{prop}</li>))}</ul>
              </div>
              <div className="border-t border-slate-100 px-5 pb-4 pt-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Limitations</p>
                <ul className="space-y-1.5">{product.limitations.map((lim) => (<li key={lim} className="flex items-start gap-2 text-[11px] leading-4 text-slate-600"><XCircle size={10} className="mt-0.5 shrink-0 text-red-400" />{lim}</li>))}</ul>
              </div>
              <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Procurement</p>
                <p className="mt-1 text-[11px] leading-4 text-slate-600">{product.procurementSources}</p>
                {product.tdsUrl && (<a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-sky-700 hover:text-red-700 transition">View TDS / product page <ExternalLink size={9} /></a>)}
                <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalence</h2>
            <p className="mt-1 text-sm text-slate-500">VMZINC and Rheinzink are technically equivalent titanium zinc products — selection is based on heritage specification, installer competency and distributor availability.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product A</th><th className="px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product B</th><th className="px-5 py-3 text-left text-xs font-bold text-slate-700">Equivalence note</th></tr></thead>
            <tbody>{BRAND_EQUIV.map((row, i) => (<tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.a}</td><td className="px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.b}</td><td className="px-5 py-3 text-slate-600">{row.note}</td></tr>))}</tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">VMZINC vs Rheinzink vs other natural zinc brands. Confirm all details against current manufacturer TDS and with zinc-specialist installer.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">VMZINC</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Rheinzink</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Other brands</th></tr></thead>
            <tbody>{SYSTEM_COMPARISON.map((row, i) => (<tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.vmzinc}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.rheinzink}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.other}</td></tr>))}</tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
          <h3 className="text-base font-extrabold text-amber-900">Do not confuse natural zinc with:</h3>
        </div>
        <ul className="space-y-2.5">
          {[
            "Zincalume steel sheet (BlueScope AZ150) — a steel sheet with a zinc-aluminium alloy coating. Completely different material to natural zinc. Zincalume is a painted-finish alternative; natural zinc is a pure zinc alloy product with a self-forming patina. Not interchangeable.",
            "Galvanised iron (GI) or galvanised steel — a hot-dipped zinc coating on steel. Not natural zinc and not used in new or replacement roofing works in Australia.",
            "Colorbond steel — a painted Colorbond finish over a Zincalume substrate. No relationship to natural zinc other than zinc being part of the substrate coating chemistry.",
            "Pre-weathered zinc vs natural zinc — pre-weathered (QUARTZ-ZINC, ANTHRA-ZINC, prePATINA) products are factory-treated to produce the mature grey patina from day one. Natural zinc starts silver and weathers over 12–36 months. Confirm the required finish with the heritage adviser before ordering.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
