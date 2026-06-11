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
  | "Stratco"
  | "Colorbond"
  | "Ridge"
  | "Barge";

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
    accentColor: "#0369a1",
    name: "Lysaght Ridge and Barge Cappings",
    descriptionLine:
      "Colorbond and Zincalume ridge and barge cappings; profiles matched to Lysaght sheet products; full Colorbond colour range; custom-formed on request",
    productType: "Steel cappings — Colorbond or Zincalume substrate — AS 1562.1",
    filterTags: ["Lysaght", "Colorbond", "Ridge", "Barge"],
    techChips: [
      { label: "Lysaght", cls: "bg-sky-100 text-sky-800" },
      { label: "Colorbond", cls: "bg-sky-50 text-sky-700" },
      { label: "Ridge & barge", cls: "bg-green-50 text-green-700" },
      { label: "Full colour range", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Lysaght supplies a range of ridge and barge cappings in Colorbond and Zincalume steel to complement their roofing sheet products. Ridge cappings bridge the apex of the roof between two opposing sheet runs; barge cappings finish the exposed raking edge of the roof at gable ends. Cappings are roll-formed to standard profiles and can be custom-fabricated for non-standard pitches or angles. Lysaght cappings are available in the full Colorbond colour range to match existing or replacement sheet. Fix through pre-punched holes or through the face of the capping with Class 3 or 4 roofing screws and EPDM-backed washers.",
    technicalProperties: [
      "Substrate: BlueScope Colorbond steel or Zincalume — full Colorbond colour range",
      "Standard ridge capping profiles: standard roll-top, pointed, adjustable apex — confirm from Lysaght range",
      "Barge capping: available in widths to suit standard sheet profiles",
      "BMT: typically 0.42mm for cappings",
      "Laps: minimum 150mm end laps for ridge cappings; lap joints must be sealed with butyl tape or compatible sealant",
      "Fixing: Class 3 or 4 hex-head roofing screws with EPDM sealing washer at each end of capping and at laps",
      "Custom profiles available for non-standard pitches — confirm with Lysaght branch",
    ],
    limitations: [
      "Capping colour must match the existing or replacement sheet Colorbond colour — confirm with strata committee if variation is proposed",
      "Capping profile must suit the existing roof pitch — verify pitch before ordering standard profiles",
      "Laps must be sealed — unsealed laps are a common leak path at ridge and barge",
      "Not suitable for Klip-Lok concealed-fix ridge termination — specific Lysaght Klip-Lok ridge details apply",
    ],
    procurementSources:
      "Lysaght branches nationally. Standard profiles typically in stock; custom profiles to order. Available through authorised Lysaght distributors and roofing merchants.",
  },
  {
    fullLabel: "Stramit — Fletcher Building",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#15803d",
    name: "Stramit Ridge and Barge Cappings",
    descriptionLine:
      "Colorbond and Zincalume ridge and barge cappings; dimensionally compatible with Stramit sheet profiles; full Colorbond colour range",
    productType: "Steel cappings — Colorbond or Zincalume substrate — AS 1562.1",
    filterTags: ["Stramit", "Colorbond", "Ridge", "Barge"],
    techChips: [
      { label: "Stramit", cls: "bg-green-100 text-green-800" },
      { label: "Colorbond", cls: "bg-sky-50 text-sky-700" },
      { label: "Ridge & barge", cls: "bg-green-50 text-green-700" },
      { label: "Full colour range", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Stramit supplies ridge and barge cappings in Colorbond and Zincalume substrates to complement their roofing sheet products. Profiles are dimensionally compatible with Stramit corrugated and trapezoidal sheet profiles and available in the full Colorbond colour range. Stramit cappings are suitable for replacement of existing Stramit or Lysaght capped roofs where the profile is compatible. Confirm profile compatibility with Stramit before ordering for replacement of existing cappings from another manufacturer.",
    technicalProperties: [
      "Substrate: BlueScope Colorbond steel or Zincalume",
      "Full Colorbond colour range available",
      "Ridge and barge profiles — confirm available standard profiles from current Stramit range",
      "Minimum lap 150mm at end joints; seal laps with butyl tape",
      "Fix with Class 3 or 4 roofing screws and EPDM sealing washers",
    ],
    limitations: [
      "Confirm current profile range with Stramit TDS — not all profiles are stocked at all branches",
      "Profile must be confirmed compatible with existing sheet profile before ordering",
      "Same colour-matching and lap-sealing requirements as Lysaght cappings",
    ],
    procurementSources:
      "Stramit branches nationally. Confirm profile and colour availability at local branch before ordering.",
  },
  {
    fullLabel: "Stratco — Stratco Pty Ltd",
    brandUrl: "https://www.stratco.com.au",
    accentColor: "#7c3aed",
    name: "Stratco Ridge and Barge Cappings",
    descriptionLine:
      "Colorbond ridge and barge cappings; full Colorbond colour range; available through Stratco branches nationally",
    productType: "Steel cappings — Colorbond substrate",
    filterTags: ["Stratco", "Colorbond", "Ridge", "Barge"],
    techChips: [
      { label: "Stratco", cls: "bg-violet-100 text-violet-800" },
      { label: "Colorbond", cls: "bg-sky-50 text-sky-700" },
      { label: "Ridge & barge", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Stratco supplies Colorbond ridge and barge cappings as part of their roofing accessory range. Available through Stratco branches nationally, these cappings are an alternative supply option for replacement of existing cappings on Colorbond corrugated or trapezoidal roofs. Confirm the specific profile, BMT and colour availability from the current Stratco range before specifying as a replacement for existing cappings — profile dimensions should be checked against the existing capping before ordering.",
    technicalProperties: [
      "Substrate: BlueScope Colorbond steel — full Colorbond colour range",
      "Ridge and barge profiles — confirm available profiles from Stratco branch",
      "Minimum lap 150mm at end joints; seal laps with compatible sealant",
    ],
    limitations: [
      "Confirm current profile range from Stratco before ordering",
      "Profile compatibility with existing sheet must be verified",
      "Less widely distributed in some states — confirm local Stratco branch stock before specifying",
    ],
    procurementSources:
      "Stratco branches nationally. Direct supply to trade through Stratco branches.",
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All products" },
  { id: "Lysaght", label: "Lysaght" },
  { id: "Stramit", label: "Stramit" },
  { id: "Stratco", label: "Stratco" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Ridge", label: "Ridge" },
  { id: "Barge", label: "Barge" },
];

const BRAND_EQUIV = [
  {
    a: "Lysaght ridge/barge cappings",
    b: "Stramit ridge/barge cappings",
    note: "Equivalent products in the same Colorbond substrate. Profile dimensions may differ slightly between manufacturers — confirm profile compatibility with existing sheet before substituting.",
  },
  {
    a: "Lysaght ridge/barge cappings",
    b: "Stratco ridge/barge cappings",
    note: "All three brands use BlueScope Colorbond steel and the full Colorbond colour range. Selection is driven by supply channel and local availability.",
  },
];

const SYSTEM_COMPARISON = [
  { attribute: "Substrate", lysaght: "BlueScope Colorbond", stramit: "BlueScope Colorbond", stratco: "BlueScope Colorbond" },
  { attribute: "Colour range", lysaght: "Full Colorbond range", stramit: "Full Colorbond range", stratco: "Full Colorbond range" },
  { attribute: "Ridge profiles", lysaght: "Standard, pointed, adjustable", stramit: "Standard, confirm TDS", stratco: "Confirm TDS" },
  { attribute: "Barge profiles", lysaght: "Available — confirm widths", stramit: "Available — confirm TDS", stratco: "Available — confirm TDS" },
  { attribute: "Min end lap", lysaght: "150mm", stramit: "150mm", stratco: "150mm (confirm)" },
  { attribute: "Lap sealant", lysaght: "Butyl tape or compatible", stramit: "Butyl tape or compatible", stratco: "Butyl tape or compatible" },
  { attribute: "Custom profiles", lysaght: "Available — to order", stramit: "Confirm with branch", stratco: "Confirm with branch" },
];

type TechInfoItem = {
  title: string;
  icon: "check" | "warn" | "bullet";
  content: string;
};

const TECH_INFO: TechInfoItem[] = [
  {
    title: "Ridge capping profile selection — matching pitch and sheet",
    icon: "check",
    content:
      "Ridge cappings must be selected to suit the roof pitch and the sheet profile at the apex. Standard roll-top cappings suit a range of pitches; pointed (or vee-ridge) cappings suit steeper pitches. Adjustable ridge cappings can be set to the required pitch angle on-site. The base wings of the capping must sit flat on the top corrugation or rib of the sheet — a mismatch here creates a gap and leak path. Confirm the roof pitch, sheet profile and capping profile with the manufacturer before ordering.",
  },
  {
    title: "Sealing end laps — critical for weathertightness",
    icon: "warn",
    content:
      "End laps in ridge and barge cappings are a common source of water entry on metal sheet roofs. The minimum lap is typically 150mm (confirm from the manufacturer TDS). Each lap joint must be sealed with butyl tape, compatible mastic strip, or a manufacturer-approved sealant before the overlapping capping is fixed. Silicone sealant should not be used at laps on unpainted Zincalume — confirm sealant compatibility with the substrate and manufacturer. Caps fixed without lap sealing will allow windblown rain to enter under the lap at the ridgeline.",
  },
  {
    title: "Fixing cappings — screw type and washer selection",
    icon: "bullet",
    content:
      "Ridge and barge cappings are typically fixed through pre-punched holes at each end and at intermediate laps using Class 3 or Class 4 hex-head roofing screws with EPDM-backed sealing washers. The screw must penetrate through the capping, through the top corrugation or rib of the sheet below, and anchor into the purlin or top plate. At barge caps, screws should engage the gable fascia or barge rafter. Use Class 4 screws within 500m of the coast or in industrial environments — confirm corrosion class with the engineer.",
  },
  {
    title: "Colour matching on partial capping replacement",
    icon: "warn",
    content:
      "Colorbond colours fade at different rates depending on orientation, exposure and age. Replacing only a section of ridge or barge capping with new Colorbond material in the same colour will typically produce a visible colour difference. For Class 2 strata buildings, any change in capping colour (including a replacement in the same nominal colour) should be considered in the context of the building&apos;s appearance management plan and strata by-laws. Where a heritage listing applies, the heritage adviser and local council must be consulted before replacing any capping.",
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

export function RidgeBargeCappingsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Ridge and barge cappings — what they are</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Ridge cappings bridge the apex of a pitched metal sheet roof, covering the junction between two opposing sheet runs and providing weatherproofing at the ridgeline. Barge cappings finish the exposed raking edge of the roof at gable ends, covering the edge of the sheets and the bargeboard or fascia below. Both are roll-formed from Colorbond or Zincalume steel and are fixed with roofing screws through the capping into the top corrugation or rib of the sheets below.
        </p>
        {expanded && (
          <>
            <p>
              Capping replacement on existing metal roofs requires matching the existing profile, pitch angle and Colorbond colour. Standard capping profiles are available ex-stock from Lysaght, Stramit and Stratco branches. Non-standard pitch angles or wide cappings may need to be custom-fabricated. End laps must be sealed with butyl tape — unsealed laps are one of the most common sources of water entry at ridgelines on aging metal roofs.
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

export function RidgeBargeCappingsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">Profile selection, lap sealing, fixing requirements and colour matching for ridge and barge cappings</p>
          </div>
        </div>
        {TECH_INFO.map((item) => (<TechAccordionItem key={item.title} item={item} />))}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 brands — Lysaght, Stramit and Stratco — Colorbond ridge and barge cappings</p>
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
            <p className="mt-1 text-sm text-slate-500">All three brands use BlueScope Colorbond steel — selection is driven by supply channel, local branch availability and profile match to existing capping.</p>
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
            <p className="mt-1 text-sm text-slate-500">Lysaght vs Stramit vs Stratco ridge and barge cappings. Confirm all profile details from current manufacturer TDS before ordering.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lysaght</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Stramit</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Stratco</th></tr></thead>
            <tbody>{SYSTEM_COMPARISON.map((row, i) => (<tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.lysaght}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.stramit}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.stratco}</td></tr>))}</tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
          <h3 className="text-base font-extrabold text-amber-900">Common capping defects to assess before replacement:</h3>
        </div>
        <ul className="space-y-2.5">
          {[
            "Unsealed end laps — water tracks under the lap at the ridgeline. Always seal laps with butyl tape when installing new cappings.",
            "Profile mismatch at capping base — the capping wing must sit flush on the top corrugation or rib of the sheet. A gap at this junction is a leak path.",
            "Missing or failed screws at laps — screws at capping laps are critical; missing screws allow the upper capping to lift under wind load and admit water.",
            "Capping installed at wrong pitch angle — a standard capping on a non-standard pitch will result in one side of the capping being raised and unseated against the sheet below. Always check pitch before ordering.",
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
