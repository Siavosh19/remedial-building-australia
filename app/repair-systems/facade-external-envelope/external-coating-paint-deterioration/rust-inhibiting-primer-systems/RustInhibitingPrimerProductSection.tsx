"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Rust-inhibiting"
  | "Primer"
  | "Metal"
  | "Steel"
  | "Iron"
  | "Zinc"
  | "Coastal"
  | "Solvent-based"
  | "Water-based"
  | "Etch-primer"
  | "Zinc-phosphate";

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
  procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux Australia",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/metal",
    accentColor: "#e2003a",
    name: "Dulux Metalshield Rust & Metal Primer",
    descriptionLine: "Rust-inhibiting primer for ferrous metal — steel lintels, balustrades, window frames and metal facade elements — zinc phosphate inhibitor — water-based — compatible with Dulux metal topcoat systems",
    productType: "Rust-inhibiting acrylic primer — ferrous metal — exterior",
    filterTags: ["Rust-inhibiting", "Primer", "Metal", "Steel", "Iron", "Zinc-phosphate", "Water-based", "Coastal"],
    techChips: [
      { label: "Rust-inhibiting", cls: "bg-red-100 text-red-800" },
      { label: "Zinc phosphate", cls: "bg-amber-100 text-amber-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Ferrous metal", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Dulux Metalshield Rust & Metal Primer is a water-based rust-inhibiting primer for ferrous metal elements on facade and balcony structures — steel lintels, balustrade posts and rails, window frames, metal fascia and architectural metalwork. The zinc phosphate rust inhibitor passivates bare steel surfaces and provides a corrosion-resistant bond coat for the subsequent enamel or metal topcoat. Surface preparation is critical — all rust, mill scale, and contamination must be removed before priming (minimum St 2 hand tool cleaning, ideally Sa 2.5 abrasive blasting for severely corroded elements). The primer must be applied to clean, dry metal and topcoated within the manufacturer's overcoat window. Confirm the current DFT, coverage rate, surface preparation standard, and topcoat system compatibility from the current Dulux Metalshield TDS before specifying.",
    technicalProperties: [
      "Rust inhibitor: zinc phosphate — passivates bare ferrous metal surface",
      "Water-based — low VOC — can be used in occupied and enclosed areas",
      "DFT: typically 25–40 µm — confirm from current Dulux TDS",
      "Compatible with Dulux Metalshield enamel topcoat system",
      "Requires clean, dry metal surface — remove all rust and mill scale before application",
      "Confirm current coverage rate and overcoat window from Dulux TDS",
    ],
    limitations: [
      "Requires thorough surface preparation — rust and mill scale must be removed before priming",
      "Not suitable for non-ferrous metals — confirm suitability for aluminium, zinc, and galvanised steel",
      "Not a rust converter — does not convert existing rust — remove before application",
      "Must be topcoated within manufacturer's overcoat window",
    ],
    procurementSources: [
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
      { name: "Dulux Trade Centres — national", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl Australia",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en_AU/products/metal",
    accentColor: "#0369a1",
    name: "Wattyl Killrust Primer",
    descriptionLine: "Wattyl Killrust rust-inhibiting primer — Australia's most established metal primer range — rust-inhibiting formulation for ferrous metal facade elements — strong adhesion on prepared steel",
    productType: "Rust-inhibiting primer — ferrous metal — Killrust system",
    filterTags: ["Rust-inhibiting", "Primer", "Metal", "Steel", "Iron", "Zinc-phosphate", "Coastal"],
    techChips: [
      { label: "Killrust system", cls: "bg-sky-100 text-sky-800" },
      { label: "Rust-inhibiting", cls: "bg-amber-100 text-amber-700" },
      { label: "Ferrous metal", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal rated", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Wattyl Killrust Primer is part of Australia's most established rust-inhibiting paint range for steel and ferrous metal elements in architectural and industrial applications. Killrust products have a long history of use on steel facade elements, balustrades, gates, and metalwork in Australian residential and commercial buildings. The rust-inhibiting primer is formulated to provide excellent adhesion to properly prepared steel and acts as the corrosion-resistant bond coat for subsequent Killrust enamel topcoat application. Wattyl Killrust is widely available through Bunnings, trade paint centres and independent paint retailers nationally. Confirm the current product designation, coverage rate, surface preparation standard, and topcoat system from the current Wattyl Killrust TDS before specifying. Wattyl has both solvent-based and water-based versions in the Killrust range — confirm the appropriate product for the application.",
    technicalProperties: [
      "Rust-inhibiting formulation — well-proven Australian product on steel and ferrous metal",
      "Available in solvent-based and water-based formulations — confirm appropriate product",
      "Strong adhesion to clean, prepared ferrous metal",
      "DFT and coverage: confirm from current Wattyl Killrust Primer TDS",
      "Compatible with Wattyl Killrust enamel topcoat system",
      "Suitable for coastal environments — confirm marine-grade suitability with Wattyl technical",
    ],
    limitations: [
      "Requires thorough surface preparation — remove all rust, scale and contamination before priming",
      "Confirm solvent-based vs water-based variant for the specific application",
      "Must be topcoated with compatible Killrust system — confirm system compatibility",
      "Coastal applications may require marine-grade variant — confirm with Wattyl technical",
    ],
    procurementSources: [
      { name: "Wattyl Killrust — Product Range", url: "https://www.wattyl.com.au" },
      { name: "Bunnings — national retail and trade", url: "https://www.bunnings.com.au" },
      { name: "Wattyl Trade Centres — national", url: "https://www.wattyl.com.au" },
    ],
  },
  {
    fullLabel: "Haymes Paint Australia",
    brandUrl: "https://www.haymespaint.com.au",
    tdsUrl: "https://www.haymespaint.com.au/products/metal",
    accentColor: "#7c3aed",
    name: "Haymes Metal Guard Rust Inhibiting Primer",
    descriptionLine: "Australian-made rust-inhibiting primer for steel and ferrous metal — zinc phosphate inhibitor — suitable for exterior metal facade elements, balustrades and steel window frames",
    productType: "Rust-inhibiting primer — ferrous metal — Australian-made",
    filterTags: ["Rust-inhibiting", "Primer", "Metal", "Steel", "Iron", "Zinc-phosphate", "Water-based"],
    techChips: [
      { label: "Australian-made", cls: "bg-purple-100 text-purple-800" },
      { label: "Zinc phosphate", cls: "bg-amber-100 text-amber-700" },
      { label: "Rust-inhibiting", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Haymes Metal Guard Rust Inhibiting Primer is an Australian-manufactured rust-inhibiting primer for steel and ferrous metal elements. It incorporates a zinc phosphate rust inhibitor and is formulated to provide strong adhesion to prepared bare metal and sound existing coatings. Suitable for steel balustrades, window frames, lintels, and metal fascia on Class 2 strata and commercial buildings. Haymes has strong trade distribution in Victoria and southern Australia. Confirm the current product range, DFT, coverage rate, and topcoat compatibility from the current Haymes Metal Guard TDS before specifying.",
    technicalProperties: [
      "Zinc phosphate rust inhibitor — passivates and stabilises prepared steel surface",
      "Australian-manufactured — tested for Australian exterior metal conditions",
      "Water-based — low VOC — suitable for use in occupied environments",
      "DFT and coverage: confirm from current Haymes TDS",
      "Compatible with Haymes exterior enamel topcoat systems",
    ],
    limitations: [
      "Haymes distribution strongest in VIC and regional — confirm local availability",
      "Requires clean, rust-free metal surface before application",
      "Not suitable as a rust converter — remove active rust before priming",
      "Topcoat within manufacturer's overcoat window",
    ],
    procurementSources: [
      { name: "Haymes Paint Trade — Where to Buy", url: "https://www.haymespaint.com.au" },
      { name: "Haymes Trade Centres — VIC/NSW", url: "https://www.haymespaint.com.au" },
      { name: "Independent paint retailers — confirm local availability", url: "https://www.haymespaint.com.au" },
    ],
  },
  {
    fullLabel: "Taubmans Australia",
    brandUrl: "https://www.taubmans.com.au",
    tdsUrl: "https://www.taubmans.com.au/products/metal",
    accentColor: "#b45309",
    name: "Taubmans All Weather Metal Primer",
    descriptionLine: "All-weather rust-inhibiting primer for ferrous metal facade elements — formulated for Australian conditions — wide availability through Bunnings and trade suppliers nationally",
    productType: "Rust-inhibiting metal primer — exterior — all-weather",
    filterTags: ["Rust-inhibiting", "Primer", "Metal", "Steel", "Iron", "Water-based", "Coastal"],
    techChips: [
      { label: "All-weather", cls: "bg-amber-100 text-amber-800" },
      { label: "Rust-inhibiting", cls: "bg-amber-100 text-amber-700" },
      { label: "Wide availability", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Taubmans All Weather Metal Primer is a rust-inhibiting primer for steel and ferrous metal elements with wide availability through Bunnings and national trade paint outlets. It provides a rust-inhibiting bond coat for subsequent exterior enamel topcoat application on metal facade elements including balustrade rails, window frames, lintels and metal fascia. Confirm the current product designation, DFT, surface preparation requirements, and topcoat compatibility from the current Taubmans TDS before specifying.",
    technicalProperties: [
      "Rust-inhibiting formulation — suitable for ferrous metal exterior facade elements",
      "Wide national availability through Bunnings and trade outlets",
      "Water-based — low VOC",
      "Confirm DFT, coverage and overcoat window from current Taubmans TDS",
      "Compatible with Taubmans All Weather exterior enamel topcoat",
    ],
    limitations: [
      "Requires clean, rust-free metal before application",
      "Confirm current product formulation from Taubmans before specifying",
      "Not a standalone rust treatment — remove active rust before priming",
    ],
    procurementSources: [
      { name: "Taubmans — Product Finder", url: "https://www.taubmans.com.au" },
      { name: "Bunnings — national trade and retail", url: "https://www.bunnings.com.au" },
      { name: "Inspirations Paint — stockist", url: "https://www.inspirationspaint.com.au" },
    ],
  },
  {
    fullLabel: "Solver Paints Australia",
    brandUrl: "https://www.solverpaints.com.au",
    tdsUrl: "https://www.solverpaints.com.au/products/metal",
    accentColor: "#059669",
    name: "Solver Metal Primer",
    descriptionLine: "Rust-inhibiting metal primer for steel and ferrous metal facade elements — compatible with Solver exterior enamel and metal topcoat systems",
    productType: "Rust-inhibiting metal primer — ferrous metal — exterior",
    filterTags: ["Rust-inhibiting", "Primer", "Metal", "Steel", "Iron", "Zinc-phosphate"],
    techChips: [
      { label: "Rust-inhibiting", cls: "bg-emerald-100 text-emerald-800" },
      { label: "Metal primer", cls: "bg-slate-100 text-slate-700" },
      { label: "Ferrous metal", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription:
      "Solver Metal Primer is a rust-inhibiting primer for steel and ferrous metal elements in exterior facade applications. It provides a rust-resistant bond coat for Solver exterior enamel and metal coating systems on balustrades, window frames, lintels and other metal facade elements. Solver Paints is available through independent paint retailers and trade outlets in eastern Australia. Confirm the current product designation, DFT, and topcoat compatibility from the current Solver TDS before specifying.",
    technicalProperties: [
      "Rust-inhibiting formulation — suitable for prepared steel and ferrous metal",
      "Compatible with Solver exterior metal and enamel topcoat systems",
      "Confirm DFT and coverage from current Solver TDS",
      "Available through independent trade paint retailers in eastern Australia",
    ],
    limitations: [
      "Available primarily through independent trade retailers — confirm local availability",
      "Requires clean, rust-free metal surface before application",
      "Topcoat within manufacturer's specified overcoat window",
    ],
    procurementSources: [
      { name: "Solver Paints — Product Finder", url: "https://www.solverpaints.com.au" },
      { name: "Independent trade paint retailers — confirm local stock", url: "https://www.solverpaints.com.au" },
    ],
  },
  {
    fullLabel: "International Coatings (AkzoNobel)",
    brandUrl: "https://www.international-pc.com/en-au",
    tdsUrl: "https://www.international-pc.com/en-au/products",
    accentColor: "#dc2626",
    name: "International Intergard 269 Primer",
    descriptionLine: "High-performance two-pack epoxy primer for steel and ferrous metal — commercial and industrial grade — superior corrosion resistance for coastal and aggressive environments",
    productType: "Two-pack epoxy primer — high-performance — commercial and industrial metal",
    filterTags: ["Rust-inhibiting", "Primer", "Metal", "Steel", "Iron", "Zinc", "Coastal", "Etch-primer"],
    techChips: [
      { label: "Epoxy primer", cls: "bg-red-100 text-red-800" },
      { label: "Two-pack", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal grade", cls: "bg-sky-100 text-sky-800" },
      { label: "Commercial grade", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription:
      "International Intergard 269 is a high-performance two-pack epoxy primer by AkzoNobel for steel and ferrous metal in commercial and industrial applications. It provides superior corrosion resistance compared to single-component primers and is suitable for coastal, marine and aggressive atmospheric environments where standard single-pack primers have insufficient corrosion resistance. Used on steel facade elements of commercial buildings, Class 2 strata exposed metal works, and high-exposure coastal balustrades and structures. Two-pack epoxy system — requires specialist applicator — mixing ratio must be followed exactly. Confirm DFT, pot life, overcoat window and topcoat system compatibility from the current International TDS before specifying.",
    technicalProperties: [
      "Two-pack epoxy — superior corrosion resistance vs single-component primers",
      "Suitable for coastal and marine environments — high atmospheric corrosion resistance",
      "DFT: confirm from International TDS — typically higher build than single-pack primers",
      "Specialist applicator required — two-pack mixing and application",
      "Compatible with International protective topcoat systems",
      "Confirm pot life, overcoat window and full system from International technical",
    ],
    limitations: [
      "Two-pack system — requires specialist applicator — not for standard trade application",
      "Pot life limited — mix only what can be applied within manufacturer's pot life",
      "Higher cost than single-component primers — justify for high-exposure or commercial applications",
      "Confirm topcoat compatibility — two-pack epoxy may require specific topcoat from same system",
    ],
    procurementSources: [
      { name: "International Coatings — Australia", url: "https://www.international-pc.com/en-au" },
      { name: "Parchem Construction Supplies — nationally", url: "https://www.parchem.com.au" },
      { name: "Commercial coating suppliers — confirm local availability", url: "https://www.international-pc.com/en-au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Rust-inhibiting", label: "Rust-inhibiting" },
  { id: "Primer", label: "Primer" },
  { id: "Metal", label: "Metal" },
  { id: "Steel", label: "Steel" },
  { id: "Iron", label: "Iron" },
  { id: "Zinc", label: "Zinc" },
  { id: "Coastal", label: "Coastal" },
  { id: "Solvent-based", label: "Solvent-based" },
  { id: "Water-based", label: "Water-based" },
  { id: "Etch-primer", label: "Etch primer" },
  { id: "Zinc-phosphate", label: "Zinc phosphate" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  binder: string;
  rustInhibitor: string;
  substrate: string;
  coastal: string;
  topcoatCompat: string;
}[] = [
  { product: "Metalshield Rust & Metal Primer", brand: "Dulux", type: "Single-pack", binder: "Acrylic", rustInhibitor: "Zinc phosphate", substrate: "Ferrous metal", coastal: "Yes", topcoatCompat: "Dulux Metalshield enamel" },
  { product: "Killrust Primer", brand: "Wattyl", type: "Single-pack", binder: "Acrylic / alkyd", rustInhibitor: "Rust inhibitor", substrate: "Ferrous metal", coastal: "Yes — confirm marine grade", topcoatCompat: "Wattyl Killrust enamel" },
  { product: "Metal Guard Primer", brand: "Haymes", type: "Single-pack", binder: "Acrylic", rustInhibitor: "Zinc phosphate", substrate: "Ferrous metal", coastal: "Confirm TDS", topcoatCompat: "Haymes enamel systems" },
  { product: "All Weather Metal Primer", brand: "Taubmans", type: "Single-pack", binder: "Acrylic", rustInhibitor: "Rust inhibitor", substrate: "Ferrous metal", coastal: "Yes", topcoatCompat: "Taubmans enamel" },
  { product: "Metal Primer", brand: "Solver", type: "Single-pack", binder: "Acrylic", rustInhibitor: "Rust inhibitor", substrate: "Ferrous metal", coastal: "Confirm TDS", topcoatCompat: "Solver metal systems" },
  { product: "Intergard 269", brand: "International", type: "Two-pack epoxy", binder: "Epoxy", rustInhibitor: "Epoxy barrier", substrate: "Ferrous metal", coastal: "Yes — marine grade", topcoatCompat: "International protective topcoats" },
];

const TECH_INFO = {
  typicalApplications: [
    "Priming bare steel lintels, balustrade posts and handrails on Class 2 strata balconies before enamel topcoat",
    "Priming steel window frames and aluminium window frames (confirm suitability) before exterior enamel",
    "Priming metal fascia, gutters and architectural metalwork before exterior topcoat",
    "Re-priming corroded metal facade elements after mechanical rust removal and surface preparation",
    "Priming new galvanised steel after weathering (minimum 12 months) or acid etching",
  ],
  selectionCriteria: [
    "Remove all existing rust to bare metal before priming — rust-inhibiting primer does NOT convert or seal over active rust",
    "Use minimum St 2 hand tool cleaning; Sa 2.5 abrasive blasting recommended for severely corroded elements in coastal environments",
    "Select a marine-grade or two-pack epoxy primer for coastal (< 1 km from salt water) and tropical environments",
    "Confirm primer compatibility with the intended topcoat — use same-brand system where possible for warranty coverage",
    "For galvanised steel, specify etch primer — zinc phosphate primer may not adhere to galvanised surfaces without etching",
    "For aluminium, specify an appropriate aluminium primer — standard steel primers may not adhere correctly",
  ],
  limitations: [
    "Rust-inhibiting primers are NOT rust converters — do not apply over active rust or loose scale",
    "Do not apply to wet metal or in rain — surface moisture causes adhesion failure",
    "Alkali-resistant primers are different products — do not use metal primers on concrete or render",
    "Standard single-pack primers have limited service life in coastal marine environments — specify two-pack epoxy for high-exposure applications",
    "Must be topcoated within manufacturer's overcoat window — long exposure of primer coat reduces adhesion of topcoat",
  ],
  standardsNotes: [
    "AS 1627.4 — Metal finishing — preparation and pretreatment of surfaces — hand tool and power tool cleaning",
    "AS 1627.9 — Abrasive blast cleaning — surface preparation standards (Sa 2.5 for most corrosion applications)",
    "AS/NZS 2312.1 — Guide to the protection of structural steel against atmospheric corrosion using protective coatings",
    "ISO 12944 — Corrosion protection of steel structures by protective paint systems",
    "Manufacturer TDS — confirm DFT, surface preparation standard, coating interval and topcoat compatibility",
  ],
  suitableDefects: [
    "Corroded steel lintels and structural metal elements on masonry facades — after rust removal",
    "Rusting balustrade posts, rails and handrails on Class 2 strata balconies",
    "Corroded steel window frames with coating failure and active rust",
    "New or replacement steel metalwork requiring factory or on-site priming before installation",
    "Re-painting of existing metal facade elements where coating has failed and bare metal is exposed",
  ],
  typicalSubstrates: [
    "Ferrous metal — mild steel structural sections, sheet steel, tubular sections",
    "Wrought and cast iron — confirm primer compatibility with specific substrate",
    "Galvanised steel — requires etch primer or specific galv primer — confirm compatibility",
    "NOT for aluminium without specific aluminium primer — standard steel rust primers may not adhere",
    "NOT for timber, concrete or render — use the correct primer class for those substrates",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name}<ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}</div>}</>)}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
    </div>
  );
}

export function RustInhibitingPrimerIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are rust-inhibiting primer systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Rust-inhibiting primers are the mandatory first coat on ferrous metal elements before any exterior enamel or protective topcoat. Bare steel begins to oxidise rapidly on contact with moisture and oxygen — without a rust-inhibiting primer, even premium exterior enamels will delaminate and fail within months as the corrosion product (rust) expands under the film. Zinc phosphate and epoxy-based inhibitors passivate the metal surface and provide a corrosion-resistant bond coat for the topcoat.</p>
        {expanded && (<>
          <p>Surface preparation is the most critical variable in metal coating performance — inadequate rust removal is the primary cause of premature failure of metal coatings on facade elements. At minimum, all rust and mill scale must be removed to St 2 standard (hand tool cleaning) before priming; for coastal or aggressive exposures, abrasive blast cleaning to Sa 2.5 is strongly recommended. The primer must be applied to clean, dry metal and topcoated within the manufacturer's specified overcoat window.</p>
          <p>In coastal environments (within 1 km of salt water), standard single-component primers have limited service life. Specify two-pack epoxy primers and seek marine-grade system recommendations from the manufacturer. Galvanised steel and aluminium require specific primers (etch primer or aluminium primer) — standard steel rust-inhibiting primers may not adhere correctly to these substrates.</p>
        </>)}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
        <h3 className="text-sm font-extrabold text-sky-950">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">
            {style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}
            {style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}
            {style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RustInhibitingPrimerProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => { setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div><p className="text-base font-extrabold text-sky-950">System Technical Reference</p><p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p></div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">{accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}</div>
        </button>
        {accordionOpen && (<div className="border-t border-slate-100 px-7 pb-7 pt-6"><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
          <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
          <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
          <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
          <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
          <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
        </div></div>)}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div><h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2><p className="mt-1 text-sm text-slate-500">6 products — 6 brands — rust-inhibiting primer systems — scroll to view all</p></div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => { const active = activeFilters.has(f.id); return (<button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>); })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
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
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>
                <div className="space-y-3 px-5 py-4">
                  <div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p><CollapsibleList items={product.technicalProperties} icon="check" limit={3} /></div>
                  <div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p><CollapsibleList items={product.limitations} icon="x" limit={3} /></div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3"><CollapsibleSources sources={product.procurementSources} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div><h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2><p className="mt-1 text-sm text-slate-500">Side-by-side comparison of rust-inhibiting primer systems. Confirm all selections against current manufacturer TDS before specifying.</p></div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Binder</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Rust inhibitor</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Topcoat compatible</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.binder}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.rustInhibitor}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrate}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.topcoatCompat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
