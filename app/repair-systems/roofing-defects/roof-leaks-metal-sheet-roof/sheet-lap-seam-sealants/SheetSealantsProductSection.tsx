"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag =
  | "Butyl-tape"
  | "Polyurethane"
  | "Neutral-silicone"
  | "End-lap"
  | "Side-lap";

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
    fullLabel: "Tremco — RPM Building Products",
    brandUrl: "https://www.tremco.com.au",
    tdsUrl: "https://www.tremco.com.au/products/sealants",
    accentColor: "#0369a1",
    name: "Butyl mastic tape / strip",
    descriptionLine:
      "Butyl rubber mastic tape or strip; for side laps, end laps and capping base sealing; remains permanently flexible; compatible with Colorbond, Zincalume and natural zinc",
    productType: "Butyl mastic sealant — pre-formed tape or strip — lap and seam sealing",
    filterTags: ["Butyl-tape", "End-lap", "Side-lap"],
    techChips: [
      { label: "Butyl tape", cls: "bg-sky-100 text-sky-800" },
      { label: "Permanently flexible", cls: "bg-green-50 text-green-700" },
      { label: "Colorbond compatible", cls: "bg-slate-100 text-slate-700" },
      { label: "No primer required", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Butyl mastic tape (also called butyl strip, mastic strip, or lap sealant tape) is the primary sealant for sheet lap joints, end laps and under cappings on metal sheet roofing. It is a pre-formed strip of butyl rubber that is peeled from a release liner and applied to the sheet surface before the overlapping sheet or capping is pressed down and fixed. Butyl tape remains permanently flexible — it does not harden or crack with thermal cycling — making it the preferred sealant for metal roofing where differential thermal movement is significant. Major suppliers include Tremco, 3M, Lysaght-branded butyl tape, and various roofing accessory suppliers. Confirm compatibility with the specific sheet substrate (Colorbond, Zincalume, natural zinc) from the TDS.",
    technicalProperties: [
      "Material: butyl rubber — pre-formed strip on release liner",
      "Application: peel-and-stick — no primer required on clean Colorbond or Zincalume",
      "Permanently flexible — does not harden or crack with thermal cycling",
      "Compatible with BlueScope Colorbond steel, Zincalume and most metal substrates",
      "Typical widths: 10mm, 15mm, 20mm, 25mm — confirm width to suit lap joint dimensions",
      "Application: apply to lower sheet before fixing the upper sheet or capping over the top",
      "Operating temperature: confirm from TDS — most butyl tapes function from -20°C to +100°C",
    ],
    limitations: [
      "Surface must be clean and dry before application — dust, oil or moisture reduces adhesion",
      "Do not use acid-cure silicone over or adjacent to butyl tape — incompatible",
      "Butyl tape alone is not a structural adhesive — fixing screws are still required at all laps",
      "Confirm compatibility with specific substrate if applying to natural zinc — some butyl products are not recommended for direct contact with natural zinc",
      "Do not stretch butyl tape during application — stretching reduces seal effectiveness",
    ],
    procurementSources:
      "Tremco, 3M, Lysaght and other roofing accessory suppliers. Available through roofing merchants, trade hardware and specialist sealant suppliers. Lysaght-branded butyl tape is available through Lysaght branches.",
  },
  {
    fullLabel: "Various sealant manufacturers",
    brandUrl: "https://www.bostik.com.au",
    tdsUrl: "https://www.bostik.com.au/products/construction",
    accentColor: "#7c3aed",
    name: "Neutral-cure silicone sealant",
    descriptionLine:
      "Neutral-cure silicone sealant; for perimeter, penetration and detail sealing on metal sheet roofs; NOT acid-cure; must be metal-compatible grade",
    productType: "Neutral-cure silicone sealant — metal roofing perimeter and penetration use",
    filterTags: ["Neutral-silicone"],
    techChips: [
      { label: "Neutral-cure", cls: "bg-violet-100 text-violet-800" },
      { label: "Silicone", cls: "bg-slate-100 text-slate-700" },
      { label: "Metal compatible", cls: "bg-green-50 text-green-700" },
      { label: "NOT acid-cure", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Neutral-cure silicone sealant is used for perimeter sealing, penetration sealing and detail work on metal sheet roofs where butyl tape is not practical (e.g., complex shapes, penetrations, flashing terminations). It must be a neutral-cure formulation — acid-cure (acetoxy) silicones release acetic acid during cure and will corrode Colorbond, Zincalume and other metal substrates. Major brands include Selleys Roof & Gutter Silicone (neutral-cure), Bostik and various specialist brands. Confirm the product is specifically labelled as neutral-cure and rated for metal contact. Silicone is not suitable for use at high-movement lap joints where butyl tape is preferred.",
    technicalProperties: [
      "Type: neutral-cure silicone — NOT acetoxy/acid-cure",
      "Compatible with Colorbond, Zincalume and galvanised steel — confirm from TDS",
      "Application: gun-applied from cartridge",
      "Service temperature: typically -50°C to +200°C depending on product",
      "UV resistant — suitable for exposed outdoor metal roofing applications",
      "Cure time: skin-over approximately 30 minutes; full cure 24–48 hours depending on temperature and humidity",
    ],
    limitations: [
      "NEVER use acid-cure (acetoxy) silicone on metal substrates — acetic acid corrodes Colorbond, Zincalume and galvanised coatings",
      "Not suitable as the primary sealant at continuous sheet laps — use butyl tape instead",
      "Silicone does not paint — if a paint-over finish is required, use a paintable polyurethane sealant instead",
      "Adhesion to dusty, oily or wet surfaces is poor — clean and dry all surfaces before applying",
      "Confirm specific product compatibility with the substrate from the manufacturer TDS",
    ],
    procurementSources:
      "Selleys, Bostik, Tremco, Sika and other sealant manufacturers. Available through trade hardware, roofing merchants and building product suppliers.",
  },
  {
    fullLabel: "Tremco / Sika / Selleys",
    brandUrl: "https://www.tremco.com.au",
    tdsUrl: "https://www.tremco.com.au/products",
    accentColor: "#15803d",
    name: "Polyurethane sealant",
    descriptionLine:
      "Paintable polyurethane sealant; for penetrations, flashings and perimeter sealing on metal sheet roofs; flexible; can be overpainted",
    productType: "Polyurethane sealant — metal roofing penetrations and perimeter — paintable",
    filterTags: ["Polyurethane", "End-lap"],
    techChips: [
      { label: "Polyurethane", cls: "bg-green-100 text-green-800" },
      { label: "Paintable", cls: "bg-amber-50 text-amber-700" },
      { label: "Metal compatible", cls: "bg-green-50 text-green-700" },
      { label: "Penetrations", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Polyurethane (PU) sealants are used for penetration sealing, flashing terminations and perimeter detail work on metal sheet roofs where a paintable finish is required. Unlike silicone, polyurethane sealants can be overpainted with compatible coatings, making them suitable where the sealant joint will be in a visible location on a Colorbond roof and a matching colour is required. PU sealants are flexible and adhesive to metal substrates, but have a lower movement capability than silicone and are not recommended for high-movement lap joints. Brands include Tremco THC-900, Sika Sikaflex 11FC and Selleys Roof & Gutter Sealant (PU grade). Confirm substrate compatibility from the TDS.",
    technicalProperties: [
      "Type: one-part polyurethane (moisture-cure)",
      "Paintable after full cure — compatible paints confirmed from TDS",
      "Flexible and adhesive to metal, masonry and some plastics",
      "Cure time: skin-over approximately 1 hour; full cure 5–7 days",
      "Service temperature: approximately -40°C to +80°C — confirm from TDS",
      "Application: gun-applied from cartridge",
    ],
    limitations: [
      "Not suitable as primary sealant for high-movement sheet lap joints — use butyl tape",
      "Lower UV resistance than silicone — may discolour or degrade in exposed applications; confirm from TDS",
      "Must prime certain substrates (e.g., some metals) — confirm from TDS before applying",
      "Cannot be applied in temperatures below 5°C or in rain",
      "Paintable, but paint adhesion and colour match require testing — confirm with paint manufacturer",
    ],
    procurementSources:
      "Tremco, Sika, Selleys, Bostik and other sealant manufacturers. Available through trade hardware, roofing merchants and building product suppliers.",
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All products" },
  { id: "Butyl-tape", label: "Butyl tape" },
  { id: "Neutral-silicone", label: "Neutral silicone" },
  { id: "Polyurethane", label: "Polyurethane" },
  { id: "End-lap", label: "End laps" },
  { id: "Side-lap", label: "Side laps" },
];

const BRAND_EQUIV = [
  {
    a: "Butyl mastic tape (any brand)",
    b: "Butyl mastic tape (any brand)",
    note: "All pre-formed butyl mastic tapes serve the same function and are interchangeable for lap sealing on metal roofs. Confirm substrate compatibility (Colorbond, Zincalume, natural zinc) from the specific product TDS.",
  },
  {
    a: "Butyl tape",
    b: "Neutral-cure silicone",
    note: "NOT equivalent — butyl tape is the correct product for continuous sheet lap joints (permanently flexible, pre-formed, no skill in application). Neutral-cure silicone is for perimeter, penetrations and irregular shapes. Do not use silicone at sheet side laps or end laps in place of butyl tape.",
  },
  {
    a: "Neutral-cure silicone",
    b: "Polyurethane sealant",
    note: "Both are gun-applied and suitable for metal roofing perimeter and penetration work. Key difference: polyurethane is paintable; silicone is not. Use silicone where long-term UV resistance and non-paintable finish are acceptable. Use PU sealant where a painted finish over the sealant is required.",
  },
];

const SYSTEM_COMPARISON = [
  { attribute: "Product type", butyl: "Pre-formed strip", silicone: "Gun-applied liquid", pu: "Gun-applied liquid" },
  { attribute: "Primary use", butyl: "Sheet side laps, end laps, cappings", silicone: "Penetrations, perimeter, details", pu: "Penetrations, perimeter, paintable" },
  { attribute: "Movement capability", butyl: "High (permanently flexible)", silicone: "High (±50%)", pu: "Moderate (±25%)" },
  { attribute: "Paintable", butyl: "No", silicone: "No", pu: "Yes (after cure)" },
  { attribute: "Colorbond compatible", butyl: "Yes (confirm TDS)", silicone: "Yes — neutral-cure only", pu: "Yes (confirm TDS)" },
  { attribute: "Acid-cure risk", butyl: "N/A", silicone: "CRITICAL — must be neutral-cure", pu: "N/A" },
  { attribute: "Application method", butyl: "Peel-and-stick", silicone: "Cartridge gun", pu: "Cartridge gun" },
  { attribute: "UV resistance", butyl: "Moderate (confirm TDS)", silicone: "High", pu: "Moderate (confirm TDS)" },
];

type TechInfoItem = {
  title: string;
  icon: "check" | "warn" | "bullet";
  content: string;
};

const TECH_INFO: TechInfoItem[] = [
  {
    title: "Butyl tape — the correct product for sheet lap joints",
    icon: "check",
    content:
      "Butyl mastic tape is the correct product for sealing continuous sheet side laps and end laps on metal sheet roofing. It is applied to the lower sheet surface along the lap zone before the upper sheet is positioned and fixed over it. The clamping action of the fixing screws compresses the tape, creating a continuous seal along the length of the lap. Butyl tape remains permanently flexible and accommodates the thermal movement of metal sheet roofing without cracking or losing adhesion. Most metal sheet manufacturers (Lysaght, Stramit, Stratco) specify butyl tape at end laps and recommend it at side laps in lower-pitch applications.",
  },
  {
    title: "Neutral-cure silicone — acid-cure is prohibited on metal",
    icon: "warn",
    content:
      "Silicone sealants exist in two types: neutral-cure and acid-cure (acetoxy). Acid-cure silicones release acetic acid (vinegar) during the curing process. Acetic acid attacks the zinc component of Colorbond, Zincalume and galvanised coatings, causing white staining and accelerated corrosion at the sealant joint. NEVER use acid-cure silicone on any metal roofing substrate. Neutral-cure silicones (which release alcohol or oxime during cure) are safe for use on metal. Identify the cure type from the product TDS — the smell of vinegar during application is a reliable indicator of an acid-cure product.",
  },
  {
    title: "Minimum pitch and sealant at end laps",
    icon: "bullet",
    content:
      "At end laps on corrugated and trapezoidal metal roofing, the minimum overlap and sealant requirements increase as the roof pitch decreases. At pitches above 10°, a minimum 150mm overlap with butyl tape is the typical requirement. At pitches below 10°, the overlap increases (to 300mm or more depending on manufacturer) and butyl tape sealing becomes mandatory rather than optional. Below 3° pitch, end laps in standard profiles become impractical and concealed-fix systems (Klip-Lok) should be used instead. Confirm end lap and sealant requirements for the specific sheet profile and pitch from the current manufacturer TDS.",
  },
  {
    title: "Compatibility with Zincalume and natural zinc",
    icon: "bullet",
    content:
      "Butyl tape and neutral-cure silicone are generally compatible with Colorbond and Zincalume substrates. For natural zinc sheet (VMZINC, Rheinzink), sealant compatibility is a more sensitive issue — some sealants contain plasticisers or additives that can discolour or attack the zinc patina. The natural zinc manufacturer (VMZINC, Rheinzink) must be consulted for approved sealant products before applying any sealant to natural zinc flashings or sheet joints. Acid-cure silicone is absolutely prohibited on natural zinc as on all other zinc-containing substrates.",
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
      {open && (<div className="border-t border-slate-100 px-5 pb-5 pt-4"><p className="text-xs leading-6 text-slate-600">{item.content}</p></div>)}
    </div>
  );
}

export function SheetSealantsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Sheet lap and seam sealants — the three types</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Three sealant types are used on metal sheet roofs: butyl mastic tape (for sheet side laps and end laps), neutral-cure silicone (for penetrations, perimeter and detail sealing), and polyurethane sealant (for paintable perimeter and penetration sealing). Selection of the wrong sealant type — particularly acid-cure silicone on metal — causes accelerated corrosion of the substrate.
        </p>
        {expanded && (
          <p>
            Butyl tape is the primary product for lap joints. Neutral-cure silicone (NOT acid-cure) is for penetrations and details. Polyurethane is used where a paintable finish over the sealant is required. Each sealant type has specific application conditions, substrate requirements and limitations — confirm from the product TDS before specifying or applying.
          </p>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-5 text-xs font-semibold text-sky-700 hover:text-red-700 transition">
        {expanded ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function SheetSealantsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">Butyl tape for laps, neutral-cure silicone (never acid-cure), polyurethane for paintable applications, and end-lap requirements by pitch</p>
          </div>
        </div>
        {TECH_INFO.map((item) => (<TechAccordionItem key={item.title} item={item} />))}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 sealant types — butyl mastic tape, neutral-cure silicone and polyurethane sealant for metal sheet roof applications</p>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Sealant Type Equivalence</h2>
            <p className="mt-1 text-sm text-slate-500">The three sealant types serve different functions — they are NOT interchangeable. Select the correct type for each application.</p>
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
            <p className="mt-1 text-sm text-slate-500">Butyl tape vs neutral-cure silicone vs polyurethane for metal sheet roof applications. Confirm all properties from current manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Butyl mastic tape</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Neutral-cure silicone</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Polyurethane</th></tr></thead>
            <tbody>{SYSTEM_COMPARISON.map((row, i) => (<tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.butyl}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.silicone}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pu}</td></tr>))}</tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
          <h3 className="text-base font-extrabold text-amber-900">Critical sealant mistakes on metal sheet roofs:</h3>
        </div>
        <ul className="space-y-2.5">
          {[
            "Acid-cure silicone on metal — the most common sealant error on metal roofing. Acetic acid released during cure attacks zinc coatings (Colorbond, Zincalume, galvanised). Results in white staining, corrosion and premature sealant failure. Always confirm neutral-cure before using any silicone on metal.",
            "Applying sealant to wet or dirty surfaces — reduces adhesion of butyl tape, silicone and polyurethane. Clean and dry all contact surfaces before applying any sealant.",
            "Using silicone at continuous sheet laps instead of butyl tape — silicone is not designed for the compression-seal function at laps. Use butyl tape at all continuous sheet lap joints.",
            "Over-relying on sealant instead of achieving correct lap dimensions — sealant supplements correct lap dimensions; it does not substitute for them. If the minimum lap length is not achieved, sealant alone will not provide a durable weathertight joint.",
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
