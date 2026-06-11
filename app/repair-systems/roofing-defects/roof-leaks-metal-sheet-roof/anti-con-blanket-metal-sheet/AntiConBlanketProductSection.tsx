"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

type FilterTag =
  | "Bradford"
  | "Knauf"
  | "75mm"
  | "Glasswool"
  | "Foil-faced";

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
    fullLabel: "Bradford Insulation — CSR",
    brandUrl: "https://www.bradfordinsulation.com.au",
    accentColor: "#0369a1",
    name: "Bradford Anticon",
    descriptionLine:
      "Glasswool anti-condensation blanket with foil facing; 60mm, 75mm, 90mm thickness; installed under metal sheet on purlins; NCC compliant thermal and condensation control",
    productType: "Metal roof anti-condensation blanket — glasswool/foil — NCC compliant",
    filterTags: ["Bradford", "75mm", "Glasswool", "Foil-faced"],
    techChips: [
      { label: "Bradford Anticon", cls: "bg-sky-100 text-sky-800" },
      { label: "Glasswool", cls: "bg-green-50 text-green-700" },
      { label: "Foil-faced", cls: "bg-amber-50 text-amber-700" },
      { label: "NCC compliant", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Bradford Anticon is the market-leading anti-condensation blanket for metal sheet roofing in Australia, used under Colorbond, Zincalume and other metal sheet profiles on purlins. The product is a glasswool blanket with a foil facing on the room-side surface that provides a condensation-control layer and a contribution to the total roof assembly thermal resistance. Anticon is installed by rolling it out across the purlin tops before the metal sheets are fixed — the sheets clamp the blanket against the purlins, and the foil face hangs into the roof cavity. Available in 60mm, 75mm and 90mm thicknesses with corresponding R-values; 75mm is the most widely specified for Class 2 strata and commercial metal roof applications.",
    technicalProperties: [
      "Material: glasswool blanket with metallised foil facing",
      "Thicknesses: 60mm, 75mm, 90mm — confirm current range from Bradford TDS",
      "R-values: approximately R1.3 (60mm), R1.5 (75mm), R2.0 (90mm) for blanket only — confirm from current Bradford TDS",
      "Total roof assembly R-value depends on additional insulation and air gaps — confirm NCC compliance with thermal assessor",
      "Foil face installed facing downward into roof cavity (away from sheet)",
      "Width: 1200mm roll — spans between purlins with overhang at laps",
      "Longitudinal laps: minimum 150mm overlap between rolls",
      "NCC Section J: confirm blanket R-value meets current NCC energy efficiency requirements for the climate zone",
    ],
    limitations: [
      "Anticon blanket alone may not meet NCC Section J requirements in all climate zones — confirm with thermal assessor",
      "Must not be compressed by purlins beyond allowable limit — compression reduces effective R-value",
      "Do not allow blanket to sag into the roof cavity — sagging creates cold spots and condensation risk",
      "Does not provide acoustic insulation — separate acoustic treatment required if sound control is specified",
      "Not suitable as the only condensation control in high humidity environments (e.g., pool rooms, industrial processes) — engineer review required",
    ],
    procurementSources:
      "Bradford Insulation distributors and major insulation merchants nationally. Available to trade through roofing merchants and insulation suppliers.",
  },
  {
    fullLabel: "Knauf Insulation Australia",
    brandUrl: "https://www.knaufinsulation.com.au",
    accentColor: "#ea580c",
    name: "Knauf Metal Roof Insulation Blanket",
    descriptionLine:
      "Glasswool anti-condensation blanket for metal roofing; foil-faced; 60mm–90mm thickness; equivalent to Bradford Anticon for NCC compliance",
    productType: "Metal roof anti-condensation blanket — glasswool/foil — NCC compliant",
    filterTags: ["Knauf", "75mm", "Glasswool", "Foil-faced"],
    techChips: [
      { label: "Knauf", cls: "bg-orange-100 text-orange-800" },
      { label: "Glasswool", cls: "bg-green-50 text-green-700" },
      { label: "Foil-faced", cls: "bg-amber-50 text-amber-700" },
      { label: "NCC compliant", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Knauf Insulation Australia manufactures glasswool anti-condensation blankets for metal sheet roofing applications, equivalent in function and installation method to Bradford Anticon. The products are available in standard thicknesses with comparable R-values and are installed by the same method — rolled across purlin tops before sheet fixing, foil face down into the roof cavity. Confirm the current product name, available thicknesses, R-values and NCC compliance from the Knauf TDS before specifying as an alternative to Bradford Anticon.",
    technicalProperties: [
      "Material: glasswool blanket with foil facing",
      "Thicknesses: 60mm, 75mm, 90mm — confirm from current Knauf TDS",
      "R-values: comparable to Bradford Anticon — confirm from Knauf TDS",
      "Installation: identical to Bradford Anticon — foil face down, rolled across purlins",
      "NCC Section J compliant — confirm applicable R-value for climate zone",
    ],
    limitations: [
      "Confirm current product name and specifications from Knauf TDS before specifying",
      "Same NCC Section J compliance requirements as Bradford Anticon — confirm with thermal assessor",
      "Same installation limitations as Bradford Anticon — do not compress, do not allow sagging",
    ],
    procurementSources:
      "Knauf Insulation distributors nationally. Available through insulation merchants and roofing suppliers. Confirm local availability before specifying.",
  },
  {
    fullLabel: "Other manufacturers",
    brandUrl: "https://www.glasswool.com.au",
    accentColor: "#64748b",
    name: "Other glasswool/foil blanket products",
    descriptionLine:
      "Other anti-condensation blanket products for metal roofing — confirm NCC compliance, R-value and suitability from manufacturer TDS before specifying",
    productType: "Metal roof anti-condensation blanket — confirm from manufacturer TDS",
    filterTags: ["Glasswool", "Foil-faced"],
    techChips: [
      { label: "Various brands", cls: "bg-slate-100 text-slate-700" },
      { label: "Glasswool/foil", cls: "bg-green-50 text-green-700" },
      { label: "Confirm TDS", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Other manufacturers supply glasswool anti-condensation blankets for metal roofing. All products of this type function on the same principle: a glasswool blanket with a foil facing, installed under the metal sheet on purlin tops. When specifying any brand, confirm the R-value, NCC Section J compliance for the applicable climate zone, available thicknesses, and roll widths from the manufacturer TDS. The key selection criteria are the declared R-value, the total roof assembly R-value achievable, and the NCC compliance pathway.",
    technicalProperties: [
      "Material: glasswool blanket with metallised foil facing",
      "Installation: foil face down, rolled across purlins before sheet fixing",
      "Confirm R-value, thickness, roll width and NCC compliance from manufacturer TDS",
    ],
    limitations: [
      "Must be NCC Section J compliant for the applicable climate zone — confirm before specifying",
      "Same installation requirements as Bradford Anticon and Knauf — no compression, no sagging",
      "Confirm Australian distributor and local availability before specifying",
    ],
    procurementSources:
      "Various insulation merchants and roofing suppliers. Confirm local availability before specifying.",
  },
];

const FILTER_DEFS: { id: FilterTag | "All"; label: string }[] = [
  { id: "All", label: "All products" },
  { id: "Bradford", label: "Bradford" },
  { id: "Knauf", label: "Knauf" },
  { id: "75mm", label: "75mm" },
  { id: "Glasswool", label: "Glasswool" },
  { id: "Foil-faced", label: "Foil-faced" },
];

const BRAND_EQUIV = [
  {
    a: "Bradford Anticon 75mm",
    b: "Knauf equivalent 75mm",
    note: "Functionally equivalent products — same glasswool/foil construction, same installation method. R-values are similar but confirm from the specific product TDS. Both are NCC Section J compliant at appropriate thicknesses.",
  },
  {
    a: "Bradford Anticon 60mm",
    b: "Bradford Anticon 90mm",
    note: "Different thicknesses of the same product — selection is based on the required total roof assembly R-value for the climate zone. 75mm is the most commonly specified for Class 2 strata in temperate climates. Confirm with a thermal assessor for NCC compliance.",
  },
];

const SYSTEM_COMPARISON = [
  { attribute: "Material", bradford: "Glasswool + foil", knauf: "Glasswool + foil", other: "Glasswool + foil (confirm TDS)" },
  { attribute: "Common thickness", bradford: "60 / 75 / 90mm", knauf: "60 / 75 / 90mm", other: "Confirm from TDS" },
  { attribute: "Approx R-value (75mm)", bradford: "~R1.5 (blanket only)", knauf: "~R1.5 (confirm TDS)", other: "Confirm from TDS" },
  { attribute: "Foil face direction", bradford: "Face down (cavity side)", knauf: "Face down (cavity side)", other: "Face down (cavity side)" },
  { attribute: "Roll width", bradford: "1200mm", knauf: "Confirm TDS", other: "Confirm TDS" },
  { attribute: "NCC Section J", bradford: "Compliant (confirm zone)", knauf: "Compliant (confirm zone)", other: "Confirm from TDS" },
  { attribute: "Installation", bradford: "Rolled over purlins", knauf: "Rolled over purlins", other: "Rolled over purlins" },
];

type TechInfoItem = {
  title: string;
  icon: "check" | "warn" | "bullet";
  content: string;
};

const TECH_INFO: TechInfoItem[] = [
  {
    title: "What anti-condensation blanket does — and what it doesn't",
    icon: "check",
    content:
      "Anti-condensation blanket (Anticon) performs two functions: it provides a thermal break between the cold metal sheet and the warm humid interior air, reducing the risk of condensation forming on the underside of the sheet; and it contributes an R-value to the total roof assembly thermal resistance for NCC Section J compliance. Anticon is not acoustic insulation — it provides minimal sound attenuation. It is also not a primary waterproofing layer and does not provide significant fire resistance. On its own, Anticon may not meet NCC Section J energy efficiency requirements in all climate zones — a thermal assessor should confirm the total roof assembly R-value including any additional insulation, air gaps and the ceiling below.",
  },
  {
    title: "NCC Section J — confirming compliance for metal roof assemblies",
    icon: "warn",
    content:
      "The NCC (National Construction Code) Section J requires minimum total roof assembly R-values that vary by climate zone. A 75mm Bradford Anticon blanket alone (approximately R1.5) may not meet the total roof assembly requirements in colder climate zones (e.g., climate zones 6, 7, 8). On Class 2 buildings, the NCC Section J assessment must be undertaken by a qualified thermal assessor, who will calculate the total roof assembly R-value including the blanket, any ceiling insulation, air gaps and ceiling board. Do not assume compliance based on the blanket R-value alone.",
  },
  {
    title: "Installation — foil face direction and lap requirements",
    icon: "bullet",
    content:
      "Anticon and equivalent blankets are installed by unrolling across the top of the purlins before the metal sheets are fixed. The foil face must be oriented downward — facing into the roof cavity toward the ceiling below. The glasswool blanket faces up against the underside of the sheet. Longitudinal laps between rolls should be a minimum of 150mm, overlapping the previous roll. The sheets are then fixed over the blanket, clamping it against the purlin top flanges. The blanket must not be stretched or torn at purlin edges — damage to the foil facing reduces condensation performance.",
  },
  {
    title: "Replacement of failed or damaged blanket under existing sheets",
    icon: "warn",
    content:
      "Where existing Anticon is damaged, compressed, saturated from past leaks, or absent (older buildings), replacement requires lifting or removing the metal sheets to access the purlins. This is a significant operation on a Class 2 strata building and must be planned carefully to maintain weathertightness during the works. Where sheets are removed for replacement, blanket replacement should be completed at the same time — retaining wet or damaged blanket under new sheets will cause ongoing condensation and corrosion of the sheet underside.",
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

export function AntiConBlanketIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Anti-condensation blanket — what it is and where it goes</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Anti-condensation blanket (commonly called Anticon after the Bradford brand) is a glasswool insulation blanket with a metallised foil facing, installed directly under metal sheet roofing on top of the purlins. It reduces the risk of condensation forming on the cold underside of the metal sheet by providing a thermal break, and contributes an R-value to the total roof assembly for NCC Section J energy efficiency compliance.
        </p>
        {expanded && (
          <>
            <p>
              Bradford Anticon is the market-leading brand and the generic name that most specifiers use to describe this product category. Knauf Insulation and other manufacturers produce functionally equivalent products. The most commonly specified thickness for Class 2 strata metal roofs is 75mm, providing approximately R1.5 for the blanket alone. Total roof assembly R-value depends on additional insulation, air gaps and ceiling below — a thermal assessor should confirm NCC compliance.
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

export function AntiConBlanketProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">Condensation control function, NCC Section J compliance, installation method and blanket replacement under existing sheets</p>
          </div>
        </div>
        {TECH_INFO.map((item) => (<TechAccordionItem key={item.title} item={item} />))}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — Bradford Anticon (primary), Knauf equivalent and other glasswool/foil blankets</p>
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
            <p className="mt-1 text-sm text-slate-500">Bradford Anticon and Knauf equivalent are functionally interchangeable glasswool/foil blankets — confirm R-value from manufacturer TDS for NCC compliance.</p>
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
            <p className="mt-1 text-sm text-slate-500">Bradford Anticon vs Knauf vs other brands. Confirm R-values and NCC compliance from current manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead><tr className="border-b border-slate-200 bg-slate-50"><th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Attribute</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Bradford Anticon</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Knauf Equivalent</th><th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Other brands</th></tr></thead>
            <tbody>{SYSTEM_COMPARISON.map((row, i) => (<tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.attribute}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.bradford}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.knauf}</td><td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.other}</td></tr>))}</tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white"><AlertTriangle size={15} /></div>
          <h3 className="text-base font-extrabold text-amber-900">Do not confuse anti-condensation blanket with:</h3>
        </div>
        <ul className="space-y-2.5">
          {[
            "Acoustic insulation — Anticon and equivalent blankets are not acoustic products. Separate acoustic insulation (e.g., Bradford SoundScreen) is required where acoustic performance is specified.",
            "Ceiling insulation — Anticon is installed under the metal sheet (above the purlins) not in the ceiling cavity. Ceiling insulation (batt or blow-in) is a separate product installed in the ceiling plane below. Both may be required for NCC Section J compliance.",
            "Sarking membrane — reflective foil sarking (e.g., Bradford R-MD, Anticon foil) is a separate product to the Anticon glasswool blanket. On pitched tiled roofs, sarking is installed under the battens. For metal roofing, the Anticon blanket provides the foil layer — a separate sarking membrane is not normally required under metal sheet.",
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
