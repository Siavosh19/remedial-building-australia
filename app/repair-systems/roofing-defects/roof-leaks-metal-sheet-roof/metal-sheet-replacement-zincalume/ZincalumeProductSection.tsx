"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag =
  | "Lysaght"
  | "Stramit"
  | "Zincalume"
  | "Corrugated"
  | "Trapezoidal";

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
    fullLabel: "Lysaght — BlueScope Steel",
    brandUrl: "https://www.lysaght.com",
    tdsUrl: "https://www.lysaght.com/products/roofing-and-walling/custom-orb",
    accentColor: "#0369a1",
    name: "Lysaght Custom Orb — Zincalume",
    descriptionLine:
      "Corrugated Zincalume steel sheet; AZ150 coating; 76mm corrugation pitch; 762mm cover width; unpainted metallic finish; AS 1562.1",
    productType: "Corrugated Zincalume steel sheet — 762mm cover — AS 1562.1",
    filterTags: ["Lysaght", "Zincalume", "Corrugated"],
    techChips: [
      { label: "Lysaght", cls: "bg-sky-100 text-sky-800" },
      { label: "Zincalume AZ150", cls: "bg-slate-100 text-slate-700" },
      { label: "762mm cover", cls: "bg-green-50 text-green-700" },
      { label: "Unpainted", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 1562.1", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Lysaght Custom Orb in Zincalume steel is the corrugated (sinusoidal 76mm pitch) profile in an unpainted AZ150 Zincalume substrate rather than Colorbond paint finish. The AZ150 coating is a zinc-aluminium-silicon alloy applied to BlueScope steel that provides corrosion protection without a paint system. The profile is dimensionally identical to Colorbond corrugated Custom Orb — same 76mm corrugation pitch and 762mm nominal cover. Used where a natural metallic finish is required, specified, or preferred, or where concealed roof areas do not require a paint finish.",
    technicalProperties: [
      "Profile: corrugated (sinusoidal), 76mm pitch, 762mm cover width",
      "Substrate: BlueScope Zincalume steel — AZ150 coating (150g/m² zinc-aluminium-silicon alloy)",
      "Finish: unpainted metallic silver-grey; no Colorbond paint system",
      "BMT: 0.42mm, 0.48mm; confirm additional gauges from Lysaght",
      "AS 1562.1 compliant — same span tables as corrugated Colorbond equivalent",
      "Dimensionally interchangeable with Colorbond Custom Orb for profile matching",
      "Screw and washer fixing — same fixing pattern as Colorbond corrugated",
    ],
    limitations: [
      "No paint finish — not a substitute where Colorbond colour finish is required",
      "NOT compatible with copper, lead or copper alloy components — galvanic corrosion risk; must be isolated",
      "NOT suitable for direct contact with fresh concrete, mortar, or calcium-silicate products",
      "Not recommended for highly corrosive environments (C5/industrial/severe coastal) without engineer review",
      "Not suitable for heated swimming pool enclosures or aggressive chemical environments",
    ],
    procurementSources:
      "Lysaght branches and authorised distributors nationally. Available as standard stock item through major roofing steel merchants.",
  },
  {
    fullLabel: "Lysaght — BlueScope Steel",
    brandUrl: "https://www.lysaght.com",
    tdsUrl: "https://www.lysaght.com/products/roofing-and-walling/trimdek",
    accentColor: "#374151",
    name: "Lysaght Trimdek — Zincalume",
    descriptionLine:
      "Trapezoidal Zincalume steel sheet; AZ150 coating; 35mm rib height; 762mm cover width; unpainted metallic finish; AS 1562.1",
    productType: "Trapezoidal Zincalume steel sheet — 762mm cover — AS 1562.1",
    filterTags: ["Lysaght", "Zincalume", "Trapezoidal"],
    techChips: [
      { label: "Lysaght", cls: "bg-sky-100 text-sky-800" },
      { label: "Zincalume AZ150", cls: "bg-slate-100 text-slate-700" },
      { label: "762mm cover", cls: "bg-green-50 text-green-700" },
      { label: "Trapezoidal", cls: "bg-violet-50 text-violet-700" },
      { label: "AS 1562.1", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription:
      "Lysaght Trimdek in Zincalume steel is the high-rib trapezoidal profile in an unpainted AZ150 Zincalume substrate. The profile is dimensionally identical to Colorbond Trimdek — 35mm rib height, 762mm cover, pan-fixed. Used where a trapezoidal Zincalume profile is specified (industrial, agricultural, concealed structural areas, or heritage applications requiring bare metal). Provides the structural advantages of the Trimdek profile without a painted finish.",
    technicalProperties: [
      "Profile: trapezoidal (high-rib), 35mm rib height, 762mm cover width",
      "Substrate: BlueScope Zincalume steel — AZ150 coating",
      "Finish: unpainted metallic silver-grey",
      "BMT: 0.42mm, 0.48mm; confirm from Lysaght TDS",
      "AS 1562.1 compliant — confirm against current Lysaght Trimdek Zincalume span tables",
      "Pan-fixed — same fixing layout as Colorbond Trimdek",
    ],
    limitations: [
      "Unpainted — not a substitute where Colorbond colour finish is required",
      "Galvanic isolation required from copper, lead, and copper alloy components",
      "Not suitable for contact with fresh concrete, mortar or calcium-silicate products",
      "Confirm availability in Zincalume substrate with Lysaght — not all Trimdek gauges available in Zincalume at all branches",
    ],
    procurementSources:
      "Lysaght branches nationally. Confirm Zincalume Trimdek availability and lead times with the local Lysaght branch before specifying — may require order vs standard stock.",
  },
  {
    fullLabel: "Stramit — Fletcher Building",
    brandUrl: "https://www.stramit.com.au",
    tdsUrl: "https://www.stramit.com.au/products/roofing",
    accentColor: "#15803d",
    name: "Stramit (Zincalume equivalent)",
    descriptionLine:
      "Corrugated and trapezoidal Zincalume steel sheet — Stramit equivalent profiles in unpainted AZ150 Zincalume substrate; confirm product name and availability from Stramit",
    productType: "Zincalume steel sheet — corrugated or trapezoidal — AS 1562.1",
    filterTags: ["Stramit", "Zincalume"],
    techChips: [
      { label: "Stramit", cls: "bg-green-100 text-green-800" },
      { label: "Zincalume AZ150", cls: "bg-slate-100 text-slate-700" },
      { label: "Unpainted", cls: "bg-amber-50 text-amber-700" },
      { label: "Confirm TDS", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Stramit produces corrugated and trapezoidal steel roofing sheets in Zincalume substrate as well as Colorbond. The Zincalume products use the same BlueScope AZ150 coating and are dimensionally compatible with equivalent Lysaght profiles. Confirm the current Stramit product name, available gauges, and branch stock availability before specifying — product names may differ from Lysaght and not all profiles are stocked in Zincalume at every branch.",
    technicalProperties: [
      "Substrate: BlueScope Zincalume steel — AZ150 coating",
      "Profiles available: corrugated and trapezoidal (confirm from Stramit TDS)",
      "AS 1562.1 compliant — confirm via Stramit TDS",
      "BMT: 0.42mm standard — confirm options from Stramit",
    ],
    limitations: [
      "Confirm current product name and Zincalume availability at local Stramit branch before specifying",
      "Same galvanic isolation requirements as Lysaght Zincalume products — isolate from copper, lead and alloys",
      "Not suitable for contact with fresh concrete, mortar or calcium-silicate",
    ],
    procurementSources:
      "Stramit branches nationally. Confirm Zincalume product availability and lead times with local Stramit branch.",
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All products" },
  { id: "Lysaght", label: "Lysaght" },
  { id: "Stramit", label: "Stramit" },
  { id: "Zincalume", label: "Zincalume" },
  { id: "Corrugated", label: "Corrugated" },
  { id: "Trapezoidal", label: "Trapezoidal" },
];

const BRAND_EQUIV = [
  {
    a: "Lysaght Custom Orb — Zincalume",
    b: "Stramit Corrugated — Zincalume",
    note: "Dimensionally equivalent corrugated profiles in the same AZ150 Zincalume substrate. Interchangeable for replacement work on existing corrugated Zincalume roofs. Confirm current product name with Stramit.",
  },
  {
    a: "Lysaght Trimdek — Zincalume",
    b: "Stramit (trapezoidal Zincalume)",
    note: "Dimensionally equivalent trapezoidal profiles in Zincalume substrate. Interchangeable for profile. Confirm current Stramit product name and availability in Zincalume substrate before specifying.",
  },
  {
    a: "Zincalume (any profile)",
    b: "Colorbond (same profile)",
    note: "NOT interchangeable where a paint finish is required. Zincalume and Colorbond use the same BlueScope steel base and AZ150 coating — the difference is the absence of a Colorbond paint top coat on Zincalume. Confirm with strata committee and heritage adviser before substituting.",
  },
];

const SYSTEM_COMPARISON = [
  {
    attribute: "Substrate",
    corrugated: "Zincalume AZ150",
    trimdek: "Zincalume AZ150",
    stramit: "Zincalume AZ150",
  },
  {
    attribute: "Profile",
    corrugated: "Corrugated (sinusoidal)",
    trimdek: "Trapezoidal (Hi-Rib)",
    stramit: "Corrugated or trapezoidal",
  },
  {
    attribute: "Cover width",
    corrugated: "762mm",
    trimdek: "762mm",
    stramit: "762mm (confirm TDS)",
  },
  {
    attribute: "Paint finish",
    corrugated: "None (unpainted)",
    trimdek: "None (unpainted)",
    stramit: "None (unpainted)",
  },
  {
    attribute: "BMT standard",
    corrugated: "0.42mm / 0.48mm",
    trimdek: "0.42mm / 0.48mm",
    stramit: "0.42mm (confirm)",
  },
  {
    attribute: "AS 1562.1",
    corrugated: "Compliant",
    trimdek: "Compliant",
    stramit: "Compliant",
  },
  {
    attribute: "Cu/Pb contact",
    corrugated: "Isolate — galvanic risk",
    trimdek: "Isolate — galvanic risk",
    stramit: "Isolate — galvanic risk",
  },
];

type TechInfoItem = {
  title: string;
  icon: "check" | "warn" | "bullet";
  content: string;
};

const TECH_INFO: TechInfoItem[] = [
  {
    title: "What is AZ150 Zincalume steel?",
    icon: "check",
    content:
      "BlueScope Zincalume steel uses an AZ150 coating — 150g/m² of an aluminium-zinc-silicon alloy applied to the steel substrate. The alloy is approximately 55% aluminium, 43.5% zinc and 1.5% silicon by mass. The aluminium provides barrier protection and heat resistance; the zinc provides sacrificial protection at cut edges and scratches. Zincalume has a natural metallic silver-grey appearance and does not have a Colorbond paint system over the alloy coating. It is the same base product used under all Colorbond painted sheets.",
  },
  {
    title: "Galvanic compatibility — isolation from copper and lead",
    icon: "warn",
    content:
      "Zincalume steel must be isolated from copper, lead, and copper alloys (brass, bronze). Contact or runoff from copper or lead onto Zincalume will cause accelerated galvanic corrosion of the Zincalume substrate. This applies to copper flashing materials, copper pipes, copper gutters, and any lead-coated or lead-flashed components. Isolation must be achieved physically (e.g., using an EPDM or neoprene separator) or by routing drainage so copper or lead runoff cannot contact the Zincalume sheet.",
  },
  {
    title: "Concrete and mortar contact — prohibited",
    icon: "warn",
    content:
      "Zincalume steel must not be in direct contact with fresh or curing concrete, mortar, or calcium-silicate board products. Alkaline runoff from these materials during curing attacks the zinc component of the AZ150 coating and causes irreversible surface damage and accelerated corrosion. Permanent separation must be achieved with a compatible membrane, bituminous coating, or EPDM isolation strip. Once installed, Zincalume sheets must be protected from mortar or concrete splatter during adjacent works.",
  },
  {
    title: "Zincalume vs Colorbond — when each is appropriate",
    icon: "bullet",
    content:
      "Zincalume is appropriate where a paint finish is not required — industrial roofing, concealed structural areas, agricultural buildings, and some heritage applications where a bare metal finish is specified or preferred. Colorbond is required where a colour finish is specified, where the building is in a residential or strata context with appearance requirements, or where a heritage colour scheme applies. On Class 2 strata buildings, substitution of Colorbond for Zincalume (or vice versa) on the visible roof surface typically requires strata committee approval and should be reviewed by the heritage adviser if heritage constraints apply.",
  },
];

function TechAccordionItem({ item }: { item: TechInfoItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
      >
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

export function ZincalumeIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is Zincalume sheet replacement?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Zincalume is BlueScope Steel&apos;s brand name for steel sheet coated with an AZ150 aluminium-zinc-silicon alloy, without a Colorbond paint finish. The corrugated (Custom Orb) and trapezoidal (Trimdek) profiles are available in Zincalume as well as Colorbond. Zincalume sheet is specified where a natural metallic finish is required or acceptable — industrial buildings, concealed roof areas, agricultural structures and some heritage applications.
        </p>
        {expanded && (
          <>
            <p>
              Zincalume must be isolated from copper, lead, and copper alloy components — runoff from these materials causes accelerated galvanic corrosion of the zinc-aluminium coating. It must also not contact fresh concrete or mortar during or after installation. These constraints must be reviewed on any building where copper flashings, lead cappings, or concrete-adjacent details exist.
            </p>
            <p>
              On Class 2 strata buildings, the replacement of Colorbond sheet with Zincalume (or vice versa) is a visible change to the building appearance and typically requires strata committee approval. On heritage-listed buildings, the heritage adviser and local council must be consulted before any change in roof cladding material or finish.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-5 text-xs font-semibold text-sky-700 hover:text-red-700 transition"
      >
        {expanded ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function ZincalumeProductSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | "All">("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleProducts = activeFilter === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.filterTags.includes(activeFilter as FilterTag));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      <div className="space-y-3">
        <div className="mb-2 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Technical Reference</h2>
            <p className="mt-1 text-sm text-slate-500">AZ150 coating properties, galvanic compatibility, concrete contact prohibition and Zincalume vs Colorbond selection</p>
          </div>
        </div>
        {TECH_INFO.map((item) => (
          <TechAccordionItem key={item.title} item={item} />
        ))}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — Lysaght corrugated, Lysaght Trimdek and Stramit equivalent — all in Zincalume substrate</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button key={f.id} type="button" onClick={() => setActiveFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
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
            <p className="mt-1 text-sm text-slate-500">Zincalume products share the same AZ150 substrate across manufacturers — profile selection and supplier determines the choice.</p>
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
            <p className="mt-1 text-sm text-slate-500">Corrugated Zincalume vs Trimdek Zincalume vs Stramit equivalent. Confirm all details against current manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Custom Orb — Zincalume</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Trimdek — Zincalume</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Stramit (Zincalume)</th></tr></thead>
            <tbody>{SYSTEM_COMPARISON.map((row, i) => (<tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.corrugated}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.trimdek}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.stramit}</td></tr>))}</tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
          <h3 className="text-base font-extrabold text-amber-900">Do not confuse Zincalume with:</h3>
        </div>
        <ul className="space-y-2.5">
          {[
            "Colorbond steel — the same BlueScope AZ150 base, but with a Colorbond paint finish applied over the alloy coating. Not interchangeable where a colour finish is required or where strata by-laws specify painted sheet.",
            "Galvanised iron (GI) sheet — an older product with a hot-dipped zinc coating only (no aluminium alloy). No longer used in new or replacement work in Australia. GI is not compatible with Zincalume and should not be specified as a replacement.",
            "Natural zinc sheet (VM Zinc, Rheinzink) — pure zinc (not alloyed with aluminium) used for standing-seam heritage and premium applications. Completely different material, different forming method, different design life and installation requirements.",
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
