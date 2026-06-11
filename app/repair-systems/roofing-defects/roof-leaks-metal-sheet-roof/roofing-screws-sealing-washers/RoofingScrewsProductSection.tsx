"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag =
  | "Buildex"
  | "Class-3"
  | "Class-4"
  | "14g"
  | "EPDM-washer";

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
    fullLabel: "Buildex — ITW Australia",
    brandUrl: "https://www.buildex.com.au",
    accentColor: "#dc2626",
    name: "Buildex Climaseal — Class 3",
    descriptionLine:
      "Class 3 corrosion-rated hex-head self-drilling roofing screw; 14g standard; Type 17 or Type 16 point; EPDM sealing washer; AS 3566.2 compliant",
    productType: "Class 3 roofing screw — hex head — EPDM washer — AS 3566.2",
    filterTags: ["Buildex", "Class-3", "14g", "EPDM-washer"],
    techChips: [
      { label: "Buildex", cls: "bg-red-100 text-red-800" },
      { label: "Class 3", cls: "bg-sky-100 text-sky-800" },
      { label: "14g", cls: "bg-green-50 text-green-700" },
      { label: "EPDM washer", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 3566.2", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Buildex Climaseal is the most widely used Class 3 roofing screw in Australia, specified for metal sheet roofing in non-coastal, non-industrial environments. The screw is a self-drilling hex-head fastener with an EPDM-backed sealing washer that compresses against the face of the sheet to create a watertight seal around the penetration. Class 3 corrosion rating under AS 3566.2 is appropriate for most inland and suburban environments, including Class 2 strata buildings located more than 500m from coastal influence. Available in multiple lengths to suit sheet BMT and purlin depth — confirm screw length against the purlin wall thickness.",
    technicalProperties: [
      "Corrosion class: AS 3566.2 Class 3 — suitable for inland and suburban environments",
      "Head type: hex head (hexagonal drive) with integrated EPDM sealing washer",
      "Gauge: 14g (5.5mm shank) — standard for metal sheet roofing into steel purlins",
      "Point type: Type 17 (self-drilling with auger tip) for steel-to-steel; Type 16 also available",
      "Lengths: 25mm, 35mm, 50mm, 65mm — select to suit sheet + purlin thickness; confirm minimum 3 full thread turns in purlin",
      "Wafer/dome head option for specific applications — confirm with Buildex",
      "AS 3566.2 Class 3 compliant",
    ],
    limitations: [
      "Class 3 is NOT suitable within 500m of a surf coast or in industrial/atmospheric pollution environments — use Class 4 instead",
      "EPDM washer must compress evenly against the sheet — over-driving collapses the washer and reduces the seal; under-driving leaves a gap",
      "Screw must penetrate the purlin by a minimum of 3 full thread turns — confirm screw length against purlin flange thickness",
      "Do not reuse screws where removed — EPDM washer compression memory is not recoverable",
      "Class 3 screws must not be used with natural zinc sheet — use manufacturer-approved zinc screws",
    ],
    procurementSources:
      "Buildex distributors and roofing merchants nationally. Available through major trade merchants, hardware chains and specialist roofing fastener suppliers.",
  },
  {
    fullLabel: "Buildex — ITW Australia",
    brandUrl: "https://www.buildex.com.au",
    accentColor: "#0369a1",
    name: "Buildex Galvadrive — Class 4",
    descriptionLine:
      "Class 4 corrosion-rated hex-head self-drilling roofing screw; 14g; EPDM sealing washer; AS 3566.2 compliant; for coastal and corrosive environments",
    productType: "Class 4 roofing screw — hex head — EPDM washer — AS 3566.2",
    filterTags: ["Buildex", "Class-4", "14g", "EPDM-washer"],
    techChips: [
      { label: "Buildex", cls: "bg-red-100 text-red-800" },
      { label: "Class 4", cls: "bg-sky-100 text-sky-800" },
      { label: "14g", cls: "bg-green-50 text-green-700" },
      { label: "EPDM washer", cls: "bg-amber-50 text-amber-700" },
      { label: "Coastal", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Buildex Galvadrive and equivalent Class 4 roofing screws are specified where the corrosive environment demands greater corrosion protection than Class 3. Class 4 screws have a heavier corrosion-resistant coating (typically a mechanically applied zinc plus additional coating) and are required for buildings within 500m of a surf coast, within 1km of breaking surf under AS 4055 conditions, or in industrial environments with airborne corrosives. On Class 2 strata buildings in coastal areas, structural engineers and roofing consultants typically specify Class 4 fasteners as standard. Using Class 3 screws in coastal or industrial environments results in premature corrosion and eventual structural failure of the fixing.",
    technicalProperties: [
      "Corrosion class: AS 3566.2 Class 4 — coastal, marine and industrial environments",
      "Head type: hex head with EPDM sealing washer",
      "Gauge: 14g (5.5mm shank)",
      "Point type: Type 17 self-drilling for steel-to-steel",
      "Same length range as Class 3 — confirm minimum 3 full thread turns in purlin",
      "AS 3566.2 Class 4 compliant",
    ],
    limitations: [
      "Heavier coating on Class 4 screws can slightly reduce self-drilling performance — use appropriate drill speed and pressure",
      "Class 4 does not mean corrosion-proof — in the most severe marine environments (continuous salt spray), stainless steel fasteners may be required — engineer review",
      "Same EPDM washer compression requirements as Class 3 — do not over-drive or under-drive",
      "Do not mix Class 3 and Class 4 screws in the same roof — specify one class throughout for consistency",
    ],
    procurementSources:
      "Buildex distributors and roofing merchants nationally. Confirm availability of Class 4 product at local merchant before specifying.",
  },
  {
    fullLabel: "Other manufacturers",
    brandUrl: "https://www.elco.com.au",
    accentColor: "#64748b",
    name: "Other Class 3/4 roofing screws",
    descriptionLine:
      "Elco, Simpson Strong-Tie and other AS 3566.2-compliant Class 3 and Class 4 hex-head roofing screws with EPDM sealing washers",
    productType: "Class 3 or 4 roofing screw — AS 3566.2 — confirm from TDS",
    filterTags: ["Class-3", "Class-4", "14g", "EPDM-washer"],
    techChips: [
      { label: "Various brands", cls: "bg-slate-100 text-slate-700" },
      { label: "Class 3 or 4", cls: "bg-sky-50 text-sky-700" },
      { label: "AS 3566.2", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm TDS", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Elco Industries, Simpson Strong-Tie and other fastener manufacturers supply AS 3566.2 Class 3 and Class 4 hex-head self-drilling roofing screws with EPDM sealing washers as alternatives to Buildex products. The key selection criteria are AS 3566.2 corrosion class compliance, gauge (14g standard), point type (Type 17 for steel-to-steel), head type (hex head with integrated EPDM washer), and screw length. Confirm that any proposed alternative fastener carries an AS 3566.2 compliance certificate and is covered by the sheet manufacturer warranty conditions.",
    technicalProperties: [
      "AS 3566.2 Class 3 or 4 compliant — confirm corrosion class from product TDS",
      "Gauge: 14g — confirm from TDS",
      "Head: hex head with EPDM sealing washer",
      "Point: Type 17 self-drilling for steel purlin applications",
      "Lengths: 25–65mm range — confirm against purlin thickness",
    ],
    limitations: [
      "Must carry a verifiable AS 3566.2 compliance certificate — do not specify uncertified fasteners",
      "Check compatibility with sheet manufacturer warranty — some manufacturers specify Buildex or named equivalent",
      "Confirm product availability at local trade merchant before specifying",
    ],
    procurementSources:
      "Specialist fastener suppliers, roofing merchants and trade hardware nationally. Elco available through electrical and roofing trade distributors.",
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All products" },
  { id: "Buildex", label: "Buildex" },
  { id: "Class-3", label: "Class 3" },
  { id: "Class-4", label: "Class 4" },
  { id: "14g", label: "14g" },
  { id: "EPDM-washer", label: "EPDM washer" },
];

const BRAND_EQUIV = [
  {
    a: "Buildex Climaseal Class 3",
    b: "Other Class 3 roofing screws (AS 3566.2)",
    note: "Any AS 3566.2 Class 3 hex-head self-drilling 14g roofing screw with EPDM washer is technically equivalent. Confirm sheet manufacturer warranty acceptability before substituting Buildex with another brand.",
  },
  {
    a: "Buildex Galvadrive Class 4",
    b: "Other Class 4 roofing screws (AS 3566.2)",
    note: "Any AS 3566.2 Class 4 hex-head self-drilling 14g roofing screw with EPDM washer is technically equivalent. Confirm warranty acceptability and local availability before substituting.",
  },
  {
    a: "Class 3 screws",
    b: "Class 4 screws",
    note: "NOT equivalent — Class 4 has a heavier corrosion-resistant coating than Class 3. Class 4 is mandatory in coastal, marine and industrial environments. Do not substitute Class 3 for Class 4 in these environments.",
  },
];

const SYSTEM_COMPARISON = [
  { attribute: "AS 3566.2 class", class3: "Class 3", class4: "Class 4", other: "Class 3 or 4 (confirm)" },
  { attribute: "Typical environment", class3: "Inland / suburban", class4: "Coastal / industrial", other: "Confirm from TDS" },
  { attribute: "Gauge", class3: "14g (5.5mm)", class4: "14g (5.5mm)", other: "14g (confirm)" },
  { attribute: "Head type", class3: "Hex head", class4: "Hex head", other: "Hex head (confirm)" },
  { attribute: "Point type", class3: "Type 17 self-drilling", class4: "Type 17 self-drilling", other: "Type 17 (confirm)" },
  { attribute: "Washer", class3: "EPDM sealing washer", class4: "EPDM sealing washer", other: "EPDM (confirm)" },
  { attribute: "Lengths available", class3: "25 / 35 / 50 / 65mm", class4: "25 / 35 / 50 / 65mm", other: "Confirm TDS" },
  { attribute: "Min purlin thread engagement", class3: "3 full turns", class4: "3 full turns", other: "3 full turns" },
];

type TechInfoItem = {
  title: string;
  icon: "check" | "warn" | "bullet";
  content: string;
};

const TECH_INFO: TechInfoItem[] = [
  {
    title: "Class 3 vs Class 4 — corrosion environment selection",
    icon: "check",
    content:
      "AS 3566.2 defines corrosion classes for self-drilling screws in building construction. Class 3 screws (mechanically galvanised or equivalent) are suitable for most inland Australian environments, including suburban Class 2 strata buildings. Class 4 screws (heavier coating) are required within 500m of the coast or breaking surf, in industrial environments with airborne corrosives, or where the sheet manufacturer or structural engineer specifies. The engineer should confirm the corrosion class in the structural specification for all new or replacement roofing works on Class 2 buildings. Using Class 3 in a Class 4 environment results in premature rust staining, washer failure and eventually structural loosening of fixings.",
  },
  {
    title: "Screw length selection — minimum thread engagement",
    icon: "bullet",
    content:
      "Roofing screw length must be selected to achieve a minimum of 3 full thread turns in the purlin or other structural element. The required length is the sum of: sheet BMT (typically 0.42–0.70mm) + Anticon blanket thickness (if present) + capping if applicable + purlin flange thickness + thread engagement allowance. For a typical 0.42mm Colorbond sheet on a 1.6mm steel C-purlin, a 35mm screw is commonly used — but always confirm against the actual purlin thickness. Too-short screws fail in pullout under wind uplift; over-length screws protrude through the purlin and can create a trip hazard in the space below.",
  },
  {
    title: "EPDM washer torque — compression without collapse",
    icon: "warn",
    content:
      "The EPDM sealing washer on a roofing screw must be compressed evenly against the face of the sheet to create a watertight seal. Under-driving leaves a gap between the washer and the sheet face — water will track under the washer and into the hole. Over-driving collapses the washer beyond its elastic range, tearing the EPDM and creating a leak path. Correct drive torque compresses the washer until it just begins to dome slightly beyond the screw head — a visible indicator of correct compression. Impact drivers should be set to appropriate torque settings; a depth-limiting hex drive collar is recommended for repetitive screw installation.",
  },
  {
    title: "Replacing corroded screws — assessment before re-fixing",
    icon: "warn",
    content:
      "On older metal sheet roofs, corroded or failed roofing screws are a common source of water entry. Where screws have corroded, the thread hole in the purlin may also be corroded or stripped. Removing a corroded screw and replacing with the same gauge in the same hole will not achieve reliable thread engagement if the hole is enlarged. Options include: oversizing the screw gauge (12g to 14g), moving the fixing position slightly to engage fresh purlin metal, or using a structural rivet or bolt where the purlin is accessible. Confirm the repair method with a structural engineer where uplift performance is critical.",
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

export function RoofingScrewsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Roofing screws and sealing washers — what they are</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Roofing screws are self-drilling hex-head fasteners with an integrated EPDM-backed sealing washer, used to fix metal roofing sheets (corrugated, Trimdek, cappings) to steel purlins. The EPDM washer compresses against the face of the sheet to seal the screw penetration against water entry. Corrosion class (AS 3566.2 Class 3 or Class 4) must be selected to suit the environment — coastal buildings require Class 4.
        </p>
        {expanded && (
          <p>
            Buildex (ITW) is the dominant market brand in Australia. The 14g hex-head self-drilling screw with Type 17 (auger) point for steel-to-steel applications is the standard specification for metal sheet roofing into steel purlins. Screw length must be selected to achieve a minimum of 3 full thread turns in the purlin. Correct EPDM washer compression — not too tight, not too loose — is critical for a durable watertight seal.
          </p>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-5 text-xs font-semibold text-sky-700 hover:text-red-700 transition">
        {expanded ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function RoofingScrewsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">Class 3 vs Class 4 corrosion selection, screw length, EPDM washer compression and replacement of corroded fixings</p>
          </div>
        </div>
        {TECH_INFO.map((item) => (<TechAccordionItem key={item.title} item={item} />))}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — Buildex Class 3, Buildex Class 4 and other AS 3566.2-compliant roofing screws</p>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Class & Brand Equivalence</h2>
            <p className="mt-1 text-sm text-slate-500">Class 3 and Class 4 are NOT interchangeable — the environment determines the class. Within each class, compliant products from different brands are equivalent.</p>
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
            <p className="mt-1 text-sm text-slate-500">Class 3 vs Class 4 vs other AS 3566.2-compliant screws. Confirm class selection against the corrosion environment classification.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Class 3 (Climaseal)</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Class 4 (Galvadrive)</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Other compliant</th></tr></thead>
            <tbody>{SYSTEM_COMPARISON.map((row, i) => (<tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.class3}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.class4}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.other}</td></tr>))}</tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
          <h3 className="text-base font-extrabold text-amber-900">Common roofing screw defects and failures:</h3>
        </div>
        <ul className="space-y-2.5">
          {[
            "Corroded screws with failed EPDM washers — rust tracks down from the screw head across the sheet surface and water enters through the corroded penetration. Replace with same gauge Class 3 or 4 screws as appropriate for the environment.",
            "Over-driven screws — EPDM washer collapsed and torn, sealing capacity lost. Not reusable — remove and replace; use fresh screw position if thread hole is damaged.",
            "Under-driven screws — EPDM washer not fully compressed, gap between washer and sheet face. Water tracks under the washer into the hole. Tighten or replace.",
            "Wrong corrosion class — Class 3 screws in coastal environments will rust within 3–5 years. Inspect and replace all screws with appropriate Class 4 product if corrosion class mismatch is identified.",
            "Insufficient thread engagement in purlin — screw too short; pulls out under wind uplift. Replace with longer screw achieving 3+ full thread turns in purlin.",
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
