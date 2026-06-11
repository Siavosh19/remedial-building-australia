"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag = "Epoxy" | "2-part" | "3-part" | "High-strength" | "Chemical-resistant" | "Thin-section" | "Rapid-strength" | "Pre-bagged";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string; filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[]; limitations: string[];
  procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardexaustralia.com",
    tdsUrl: "https://ardexaustralia.com/products/ardex-ra-88-plus/",
    accentColor: "#0369a1",
    name: "Ardex RA 88 Plus",
    descriptionLine: "2-component non-sag epoxy repair adhesive — 627 mL and 254 mL cartridges — high strength (> 55 MPa) — horizontal, vertical, and overhead use — fast cure approx. 2 hours — Ardex trade supply",
    productType: "2-component epoxy repair adhesive — cartridge format — Ardex Australia",
    filterTags: ["Epoxy", "2-part", "High-strength", "Chemical-resistant", "Thin-section", "Rapid-strength"],
    techChips: [
      { label: "2-component epoxy adhesive", cls: "bg-sky-100 text-sky-800" },
      { label: "627 mL and 254 mL cartridges", cls: "bg-slate-100 text-slate-700" },
      { label: "High strength > 55 MPa", cls: "bg-green-50 text-green-700" },
      { label: "Non-sag — vertical and overhead", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Ardex RA 88 Plus is a two-component, high-performance ceramic blend epoxy repair adhesive — not a bulk epoxy mortar in the traditional Nitomortar/Sikadur sense. It is supplied in cartridge format (627 mL and 254 mL cartridges) and is designed as a non-drip, non-sag repair adhesive suitable for horizontal, vertical, and overhead use. It achieves high strength greater than 55 MPa — described as stronger than standard concrete. Fast cure time of approximately 2 hours allows open traffic reinstatement within 2–3 hours of application. It can repair holes, spalls, and cracks in concrete, repair rotted wood, install anchor bolts, repair handrails, and bond precast concrete. Unlike bulk epoxy repair mortars which use a bag of aggregate, RA 88 Plus is applied by cartridge dispensing gun in a bead format. Confirm current TDS, coverage rates, and suitable applications from the current Ardex Australia TDS before specifying. Source: ardexaustralia.com product page confirmed cartridge format, two-component, > 55 MPa, 2-3 hour cure.",
    technicalProperties: [
      "2-component ceramic blend epoxy — supplied as 627 mL and 254 mL cartridges — dispensed by gun",
      "Non-drip, non-sag — suitable for horizontal, vertical, and overhead repair applications",
      "High strength > 55 MPa — stronger than standard concrete — fast cure approximately 2 hours",
      "Open to full traffic in 2–3 hours — ready to receive paint in 2–3 hours",
      "Can repair holes, spalls, cracks in concrete, bond anchor bolts — multi-substrate adhesive",
    ],
    limitations: [
      "Cartridge format — not a bulk epoxy repair mortar — not suitable for large-area structural repair pours",
      "Working time 20 minutes — mix in small quantities — confirm pot life in hot conditions from Ardex TDS",
      "Not suitable for active or moving cracks — epoxy is rigid and will re-crack under live structural movement",
      "Confirm whether RA 88 Plus meets EN 1504-3 requirements for structural repair mortar classification — Ardex AU page does not state EN 1504-3 compliance",
      "Confirm correct application for structural spalling repair vs crack injection vs anchor adhesive — product has multiple stated uses",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-protection/concrete-repair-mortars/epoxy-repair-mortarsandrigidbonding/sikadur-41-cf-normal.html",
    accentColor: "#be123c",
    name: "Sikadur-41 CF Normal",
    descriptionLine: "3-component thixotropic high-strength epoxy resin patching mortar — 11 kg pre-proportioned kit — Sikadur-31 Parts A+B and Sikadur Aggregates 501 — EN 1504-3 tested — Sika trade supply nationally",
    productType: "3-component epoxy repair mortar — Sika Australia",
    filterTags: ["Epoxy", "3-part", "High-strength", "Chemical-resistant", "Thin-section", "Rapid-strength"],
    techChips: [
      { label: "3-component epoxy mortar", cls: "bg-rose-100 text-rose-800" },
      { label: "11 kg pre-proportioned kit", cls: "bg-slate-100 text-slate-700" },
      { label: "High strength — abrasion resistant", cls: "bg-green-50 text-green-700" },
      { label: "EN 1504-3 tested — CE mark", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikadur-41 CF Normal is a 3-component thixotropic mortar based on a solvent-free epoxy resin and selected aggregates — confirmed on the Sika AU product page. It consists of Sikadur-31 Part A and B combined with Sikadur Aggregates 501. It is supplied as pre-proportioned 11 kg kits. Sikadur-41 CF Normal is easy to mix and apply on site, achieves high strength, and provides good abrasion resistance and good chemical resistance. It is tested for structural and non-structural repair according to EN 1504-3 and carries the CE mark. Typical applications include carpark deck repairs, vehicle ramps, and structural concrete repairs requiring chemical and abrasion resistance. Component A is white, Component B is dark grey, Component C is sand aggregate — the colour coding provides a visual check on mixing. Confirm current product TDS, primer requirements, pot life, and temperature range from the current Sika Australia TDS before specifying — do not use Sika European or international TDS for Australian projects. Source: aus.sika.com product page confirmed 3-component, 11 kg kit, EN 1504-3 tested, Sikadur-31 Parts A+B + Aggregates 501.",
    technicalProperties: [
      "3-component epoxy mortar — Sikadur-31 Part A and B + Sikadur Aggregates 501 — 11 kg pre-proportioned kit",
      "High strength — good abrasion resistance — good chemical resistance",
      "Thixotropic — suitable for vertical and overhead application",
      "Tested to EN 1504-3 for structural and non-structural repair — CE mark",
      "Available through Sika Australia trade supply and Bayset nationally",
    ],
    limitations: [
      "3-component mixing requires care — confirm ratios from Sika AU TDS — incorrect mixing causes cure failure",
      "Dry substrate required — epoxy does not cure on wet or saturated concrete",
      "Reduced pot life in hot weather — mix in small batches — confirm pot life from current Sika Australia TDS",
      "Rigid cure — not suitable for active or moving cracks",
      "TODO: owner confirm — primer coat requirements for Sikadur-41 CF Normal from current Sika Australia TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au/products",
    accentColor: "#7c2d12",
    name: "Fosroc Nitomortar 903",
    descriptionLine: "TODO: owner confirm — Nitomortar 50 does not appear in the current Fosroc AU product range (fosroc.com.au sitemap confirmed Jun 2026) — confirmed AU epoxy mortars are Nitomortar AP, 903, 908, EL-HB — verify correct product with Parchem technical before specifying",
    productType: "TODO: owner confirm — Nitomortar 50 not found in AU range — verify replacement product with Parchem",
    filterTags: ["Epoxy", "3-part", "High-strength", "Chemical-resistant", "Thin-section"],
    techChips: [
      { label: "TODO: confirm product name", cls: "bg-orange-100 text-orange-900" },
      { label: "TODO: confirm pack size", cls: "bg-slate-100 text-slate-700" },
      { label: "Carpark ramps and decks", cls: "bg-green-50 text-green-700" },
      { label: "Parchem nationally", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — 'Fosroc Nitomortar 50' was listed in this card but does not appear in the current Fosroc Australia product range (checked fosroc.com.au sitemap June 2026 — no Nitomortar 50 found). The confirmed Fosroc AU epoxy mortar range includes Nitomortar AP (2-component paste), Nitomortar 903, Nitomortar 908, Nitomortar EL-HB, and Nitomortar F4 Fillers. Nitomortar 903 is a confirmed AU product and may be the closest equivalent for carpark deck and structural repair — but confirm the correct product, pack size, primer, and application requirements with Parchem technical before specifying. Source: fosroc.com.au sitemap confirmed no Nitomortar 50 — Nitomortar 903 and 908 confirmed in range.",
    technicalProperties: [
      "TODO: owner confirm — Nitomortar 50 not found in AU range — verify correct product name with Parchem",
      "Confirmed AU Fosroc epoxy mortar range: Nitomortar AP, 903, 908, EL-HB — confirm appropriate grade",
      "TODO: confirm pack size, primer, pot life, and EN 1504 class from Parchem TDS",
      "Parchem (DuluxGroup) — national trade supply with technical branch support",
      "Confirm current product and TDS before specifying",
    ],
    limitations: [
      "TODO: owner confirm — Nitomortar 50 does not appear in the current Fosroc AU range — this card must be updated with a confirmed AU product",
      "Dry substrate required for epoxy cure — confirm from Parchem TDS for confirmed replacement product",
      "Reduced pot life in hot weather — mix in small batches — confirm pot life from Parchem TDS",
      "Not suitable for active or moving cracks — rigid cure",
      "Higher cost than cementitious alternatives — specify only where chemical resistance or high early strength is required",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au/products",
    accentColor: "#92400e",
    name: "Fosroc Nitomortar AP",
    descriptionLine: "2-component epoxy paste — patching repairs to concrete, bonding precast concrete, anchor bolt setting — potable water approved AS4020:2018 — can be applied on saturated surface dry (SSD) concrete — Parchem (DuluxGroup) nationally",
    productType: "2-component epoxy paste — repair and bonding — Fosroc / Parchem Australia",
    filterTags: ["Epoxy", "2-part", "High-strength", "Chemical-resistant", "Thin-section", "Pre-bagged"],
    techChips: [
      { label: "2-component epoxy paste", cls: "bg-amber-100 text-amber-900" },
      { label: "TODO: confirm pack size", cls: "bg-slate-100 text-slate-700" },
      { label: "SSD concrete compatible", cls: "bg-green-50 text-green-700" },
      { label: "Parchem nationally", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitomortar AP is a 2-component epoxy paste — confirmed as 2-component on the Fosroc AU product page (not 3-part as previously stated). It is used for patching repairs to concrete and bonding of precast concrete components where strength, impermeability to water, and resistance to aggressive chemicals is essential. It is also used for setting starter bars, dowels, anchoring in general, and as an adhesive for the Nitofill LV crack injection system and bonding Expoband F to concrete. Key advantages include excellent resistance to abrasion and impact, resistance to a wide range of acids, alkalis, and industrial chemicals, two-pack colour coding for visual check on correct mixing, and potable water approval to AS4020:2018. It can be used on saturated surface dry (SSD) concrete — an advantage over many epoxy systems. Confirm current pack size, application depth range, and primer requirements from the current Fosroc/Parchem TDS before specifying. Source: fosroc.com.au product page confirmed 2-component, potable water approved, SSD compatible.",
    technicalProperties: [
      "2-component epoxy paste — confirmed 2-component (not 3-part) from fosroc.com.au AU product page",
      "Can be applied to saturated surface dry (SSD) concrete — unusual advantage for epoxy system",
      "Potable water approved AS4020:2018 — suitable for water infrastructure repair",
      "Resistant to wide range of acids, alkalis, and industrial chemicals — abrasion and impact resistant",
      "Available through Parchem Construction Supplies nationally — also for anchor bolt setting and precast bonding",
    ],
    limitations: [
      "TODO: owner confirm — pack size for Nitomortar AP AU — not confirmed from available AU page data",
      "TODO: owner confirm — whether Nitoproof Epoxy primer is required or if SSD application eliminates primer requirement",
      "Rigid cure — not suitable for active cracks or moving joints",
      "Confirm appropriate Nitomortar grade for the application — range includes AP, 903, 908, EL-HB",
      "Confirm current product TDS from Parchem before specifying — Fosroc product range subject to periodic revision",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Epoxy", label: "Epoxy" },
  { id: "2-part", label: "2-part" },
  { id: "3-part", label: "3-part" },
  { id: "High-strength", label: "High strength" },
  { id: "Chemical-resistant", label: "Chemical resistant" },
  { id: "Thin-section", label: "Thin-section" },
  { id: "Rapid-strength", label: "Rapid strength" },
];

const SYSTEM_COMPARISON = [
  { brand: "Ardex", product: "Ardex RA 88 Plus", parts: "2-part", kit: "627 mL / 254 mL cartridge", primer: "TODO: confirm from Ardex AU TDS", strength: "> 55 MPa", bestFor: "Repair adhesive — spalls, cracks, anchor bolts" },
  { brand: "Sika", product: "Sikadur-41 CF Normal", parts: "3-part", kit: "11 kg pre-proportioned", primer: "TODO: confirm from Sika AU TDS", strength: "High — EN 1504-3 tested", bestFor: "Structural repair — carparks, vertical and overhead" },
  { brand: "Fosroc / Parchem", product: "TODO: confirm — Nitomortar 50 not in AU range", parts: "TODO", kit: "TODO", primer: "TODO: confirm with Parchem", strength: "TODO", bestFor: "TODO: confirm correct AU product" },
  { brand: "Fosroc / Parchem", product: "Fosroc Nitomortar AP", parts: "2-part", kit: "TODO: confirm pack size", primer: "TODO: confirm from Parchem TDS", strength: "High — acid/alkali resistant", bestFor: "Concrete repair, anchor setting, SSD compatible" },
];

const TECH_INFO = {
  typicalApplications: [
    "Carpark deck and vehicle ramp concrete spalling repair where chemical and fuel resistance is required",
    "Thin-section structural concrete repair where insufficient depth is available for a standard cementitious mortar build-up",
    "Heavy-duty repair of columns, beams, and slab soffits subject to impact or high sustained loading",
    "Fast-track programme repairs where rapid strength gain is required for early traffic reinstatement",
    "Chemical splash zones and vehicle bays where resistance to fuel, oil, or dilute chemicals is required",
  ],
  selectionCriteria: [
    "Chemical resistance: specify epoxy mortar where the repair surface is subject to fuel, oil, or chemical attack — standard cementitious mortars are not suitable",
    "Application depth: minimum 10 mm — for thinner sections, confirm product capability with manufacturer",
    "Substrate condition: dry substrate is required — cementitious mortars are preferred for wet or saturated conditions",
    "Pot life: confirm pot life in the expected application temperature — reduce batch size in hot weather",
    "Cost: epoxy mortars are significantly more expensive than cementitious alternatives — reserve for applications where epoxy-specific properties (chemical resistance, high early strength, thin section) are genuinely required",
    "2-part vs 3-part: 2-part systems are simpler to mix; 3-part systems incorporate aggregate separately and allow greater control over aggregate grading",
  ],
  limitations: [
    "Rigid, high-modulus cure — will crack under active substrate movement or differential thermal expansion — not suitable for live joints or active cracks",
    "Minimum application depth 10 mm — cannot be feathered to a thin edge — use cementitious fine mortar for cosmetic surface profiling",
    "Dry substrate required — contact with water during mixing or application will cause cure failure",
    "Exothermic reaction — significant heat generated during cure in large pours — confirm maximum application thickness and pot life from TDS",
    "Not suitable for use as an anchor grout — use a dedicated structural grout product instead",
    "High cost — epoxy mortars are not justified for general concrete spalling repair in typical residential strata",
  ],
  standardsNotes: [
    "EN 1504-3 — Products and Systems for Protection and Repair of Concrete Structures — epoxy repair mortars are typically rated Class R4 (highest class) — confirm from manufacturer TDS",
    "AS 3600 — Concrete Structures — minimum cover requirements apply to the reinstated repair section",
    "ICRI 310.2 — CSP substrate preparation profile for epoxy mortar: minimum CSP 3–5 on prepared, dry concrete",
    "Do not apply over curing compounds, release agents, or contaminated concrete — confirm surface preparation requirements from manufacturer TDS",
  ],
  suitableDefects: [
    "Concrete spalling in carpark decks and vehicle ramps — chemical and abrasion resistance required",
    "Thin-section structural repair where depth is limited to 10–20 mm",
    "Spalling repair in chemical plant or industrial areas with fuel, oil or solvent exposure",
    "Fast-track programme repair where high early strength is required within hours",
  ],
  typicalSubstrates: [
    "In-situ concrete — must be clean, dry, and free of laitance, oil, and curing compounds — mechanically prepared to CSP 3–5 minimum",
    "Precast concrete — same preparation requirements — confirm primer compatibility with manufacturer",
    "Exposed reinforcement — clean to bright steel and prime with compatible epoxy rebar primer before applying epoxy mortar",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
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
      {items.length > limit && <button onClick={() => setExpanded(e => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Show less ↑" : `+${items.length - limit} more ↓`}</button>}
    </div>
  );
}
function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button onClick={() => setExpanded(e => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && <div className="mt-2 space-y-1.5">{sources.map(src => (<div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">{src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name} <ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}</div>))}</div>}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with current manufacturer TDS before specifying.</p>
    </div>
  );
}
function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map(c => <span key={c.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>)}</div>}</>)}
      <button onClick={() => setExpanded(e => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}
function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded(e => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
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
      <ul className="space-y-2">{items.map((item, i) => (<li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">{style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}{style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}{style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}{item}</li>))}</ul>
    </div>
  );
}

export function EpoxyMortarsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are epoxy repair mortars?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Epoxy repair mortars are 2-part or 3-part systems combining an epoxy resin, a hardener, and a graded aggregate filler. Unlike cementitious and polymer-modified mortars that cure through hydration, epoxy mortars cure through a chemical cross-linking reaction — producing a rigid, high-strength, chemical-resistant repair with very low porosity. They are used specifically where chemical resistance, high early strength, thin-section capability, or heavy load resistance is required.</p>
        {expanded && (<p>In Australian Class 2 strata and commercial remediation practice, epoxy repair mortars are not the default choice for concrete spalling — they are reserved for applications where their specific properties are needed: carpark decks and ramps subject to fuel and chemical exposure, repairs requiring traffic reinstatement within hours, or thin-section structural repairs where insufficient depth is available for a cementitious mortar build-up. For standard concrete spalling on balcony soffits, columns, and beams in a residential strata context, a polymer-modified cementitious repair mortar (EN 1504-3 Class R3) is the appropriate and lower-cost specification.</p>)}
      </div>
      <button onClick={() => setExpanded(e => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
    </div>
  );
}

export function EpoxyMortarsProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggleFilter = (id: FilterTag) => { setActiveFilters(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter(p => Array.from(activeFilters).every(f => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen(o => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div><p className="text-base font-extrabold text-sky-950">System Technical Reference</p><p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p></div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">{accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}</div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2><p className="mt-1 text-sm text-slate-500">4 products — epoxy repair mortars — 2-part and 3-part grades</p></div></div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map(f => { const active = activeFilters.has(f.id); return (<button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>); })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map(product => (
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
        <div className="mb-6 flex items-start gap-3"><div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" /><div><h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2><p className="mt-1 text-sm text-slate-500">Side-by-side comparison of epoxy repair mortars. Confirm all selections against the current manufacturer TDS before specifying.</p></div></div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Parts</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Kit size</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primer</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Strength</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Best for</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.parts}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.kit}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primer}</td>
                  <td className="px-4 py-3 text-slate-600">{row.strength}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
