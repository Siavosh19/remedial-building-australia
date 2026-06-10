"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Cementitious"
  | "General-use"
  | "Rapid-set"
  | "Site-mixed"
  | "Pre-bagged"
  | "Hand-applied"
  | "Trowel-grade"
  | "Non-structural"
  | "Budget";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-protection/concrete-repair-mortars/cementitious-repairmortars/sika-monotop-436n.html",
    accentColor: "#be123c",
    name: "Sika MonoTop-436N",
    descriptionLine: "R4 pourable self-compacting micro-concrete repair mortar — 20 kg bag — placed from 20 mm to 300 mm in one pour — structural concrete spalling repair — Sika trade supply",
    productType: "R4 pourable micro-concrete repair mortar — self-compacting — EN 1504-3 Class R4",
    filterTags: ["Cementitious", "General-use", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "EN 1504-3 Class R4", cls: "bg-rose-100 text-rose-800" },
      { label: "20 kg bag", cls: "bg-slate-100 text-slate-700" },
      { label: "Pourable — self-compacting", cls: "bg-green-50 text-green-700" },
      { label: "20 mm to 300 mm in one pour", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika MonoTop-436N is a 1-component pre-bagged, pourable, self-compacting repair mortar meeting the requirements of class R4 of EN 1504-3. It is used for structural reinstatement of concrete spalling and damaged concrete on buildings, bridges, and infrastructure. As a pourable self-compacting micro-concrete it is placed into formwork from 20 mm to 300 mm depth in a single pour — it is not a trowel-grade repair mortar. MonoTop-436N is chloride-free, carbonation-resistant, and has low water and chloride permeability and low shrinkage. It is approved for Queensland Roads (TMR) and is approved to AS4020:2018 for potable water contact. It is compatible with the Sika FerroGard Sacrificial Anode System. Confirm current TDS, formwork requirements, primer requirements, and coverage with Sika Australia before specifying — do not use international TDS for Australian projects. Source: aus.sika.com — product page confirmed 20 kg bag, EN 1504-3 R4, 20 mm–300 mm layer.",
    technicalProperties: [
      "EN 1504-3 Class R4 — pourable self-compacting micro-concrete — 1-component pre-bagged",
      "Placed from 20 mm to 300 mm depth in one pour — requires formwork for vertical and overhead applications",
      "Chloride-free, carbonation-resistant, low water and chloride permeability, low shrinkage",
      "Approved AS4020:2018 potable water — QLD Roads (TMR) Section 5.34 Repair Mortars approved",
      "Compatible with Sika FerroGard Sacrificial Anode System — 20 kg bags — Sika trade supply nationally",
    ],
    limitations: [
      "Pourable product — requires formwork for vertical and overhead applications — not a trowel-applied patch mortar",
      "Not suitable for thin-section cosmetic repair — minimum 20 mm placement depth",
      "TODO: owner confirm — primer and bonding coat requirements for MonoTop-436N from current Sika Australia TDS",
      "Not recommended for active or moving cracks — confirm crack activity before specifying",
      "Do not use international Sika TDS for Australian projects — confirm all data from current aus.sika.com TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardexaustralia.com",
    tdsUrl: "https://ardexaustralia.com/products/ardex-br-340/",
    accentColor: "#0369a1",
    name: "Ardex BR 340",
    descriptionLine: "MICROTEC® Fibre-Reinforced Polymer Modified Structural Concrete Patching and Repair Mortar — 20 kg bag — high build up to 80 mm — low resistivity — active corrosion inhibitor — Ardex trade supply",
    productType: "MICROTEC® Fibre-Reinforced Polymer Modified structural concrete repair mortar — Ardex Australia",
    filterTags: ["Cementitious", "General-use", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "Fibre-reinforced / polymer-modified", cls: "bg-sky-100 text-sky-800" },
      { label: "20 kg bag", cls: "bg-slate-100 text-slate-700" },
      { label: "Up to 80 mm high build", cls: "bg-green-50 text-green-700" },
      { label: "Ardex trade supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Ardex BR 340 is a MICROTEC® Fibre-Reinforced, Polymer Modified, Structural Concrete Patching and Repair Mortar designed for reinstating concrete structures damaged through concrete spalling and other chemical or mechanical causes. It is a high-build patching mortar capable of being applied up to 80 mm thickness on vertical, horizontal, and overhead surfaces. BR 340 contains low resistivity (less than 10,000 Ω cm) and an active corrosion inhibitor, making it suitable for use with the Ardex BRX 60 LO Sacrificial Anode System for cathodic prevention. Pack size is 20 kg bag. Confirm current Ardex Australia TDS for primer selection, EN 1504-3 class, and current compressive strength data before specifying. Source: ardexaustralia.com product page confirmed 20 kg bag, up to 80 mm, MICROTEC fibre-reinforced polymer modified, low resistivity, active corrosion inhibitor.",
    technicalProperties: [
      "MICROTEC® Fibre-Reinforced, Polymer Modified — 20 kg bag — structural concrete spalling repair",
      "High-build — up to 80 mm thickness on vertical, horizontal, and overhead surfaces",
      "Low resistivity (< 10,000 Ω cm) — contains active corrosion inhibitor",
      "Compressive strength: ~10 MPa (1 day) / 20–30 MPa (7 days) / 30–40 MPa (28 days)",
      "Suitable for use with Ardex BRX 60 LO Anodes — Ardex trade supply nationally",
    ],
    limitations: [
      "TODO: owner confirm — primer required (P 51 or similar) for BR 340 from current Ardex Australia TDS — not stated on product page",
      "Maximum single-coat layer confirmed as 80 mm — confirm from current TDS for overhead applications",
      "Confirm EN 1504-3 class compliance from current Ardex Australia TDS",
      "Not a fine cosmetic mortar — use Ardex Feather Finish for thin-section profiling",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au/products",
    accentColor: "#7c2d12",
    name: "Fosroc Renderoc HB",
    descriptionLine: "TODO: owner confirm — Renderoc GP does not appear in the current Fosroc AU product range (fosroc.com.au sitemap confirmed Jun 2026) — nearest general-use cementitious mortar is Renderoc HB — verify correct product with Parchem technical before specifying",
    productType: "TODO: owner confirm — Renderoc GP not found in AU range — verify replacement product with Parchem",
    filterTags: ["Cementitious", "General-use", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "TODO: confirm product name", cls: "bg-orange-100 text-orange-900" },
      { label: "TODO: confirm pack size", cls: "bg-slate-100 text-slate-700" },
      { label: "Nitobond SBR primer", cls: "bg-green-50 text-green-700" },
      { label: "Parchem nationally", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — 'Fosroc Renderoc GP' was listed in this card but does not appear in the current Fosroc Australia product range (checked fosroc.com.au sitemap June 2026 — no Renderoc GP found). The current Fosroc AU cementitious mortar range includes Renderoc HB, HB25, HB40, HB70, HB70 Plus, LA55, LA55 Plus, Rapid, FC, BB, CAC, and ST-06 — but no 'GP' grade. Renderoc HB is a lightweight high-build cementitious repair mortar for vertical and overhead concrete patches 10–80 mm deep on structures up to 25 MPa. It is pre-bagged and applied with Nitobond SBR or Nitobond HAR primer. Confirm the correct product name, pack size, EN 1504-3 class, and primer from the current Fosroc/Parchem TDS before specifying. Source: fosroc.com.au sitemap confirmed no Renderoc GP — Renderoc HB confirmed. Nitobond SBR confirmed in parchem.com.au sitemap.",
    technicalProperties: [
      "TODO: owner confirm — Renderoc GP not found in AU range — verify correct product name with Parchem",
      "Renderoc HB (nearest confirmed AU product): lightweight high-build — 10–80 mm — vertical and overhead",
      "Nitobond SBR or Nitobond HAR bonding primer required before application",
      "Parchem (DuluxGroup) — national trade supply with technical support branches in metropolitan centres",
      "Confirm pack size, EN 1504-3 class, and current product name from Parchem before specifying",
    ],
    limitations: [
      "TODO: owner confirm — Renderoc GP does not appear in the current Fosroc AU range — this card must be updated with a confirmed AU product",
      "Not recommended for high-exposure or coastal applications without confirming exposure classification from Parchem TDS",
      "Nitobond SBR primer is mandatory — do not apply directly to dry or unprimed concrete",
      "Confirm current product name and EN 1504-3 class with Parchem — Fosroc product range is subject to periodic revision",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products",
    accentColor: "#1d4ed8",
    name: "Mapei Mapegrout Fast-Set",
    descriptionLine: "Rapid-setting cementitious repair mortar — 25 kg bag — for fast-track concrete spalling repair where traffic reinstatement or time-critical programme is required — Mapei trade and Bayset",
    productType: "Rapid-setting cementitious repair mortar — Mapei Australia",
    filterTags: ["Cementitious", "Rapid-set", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "Rapid-setting", cls: "bg-blue-100 text-blue-900" },
      { label: "25 kg bag", cls: "bg-slate-100 text-slate-700" },
      { label: "Fast-track programme", cls: "bg-green-50 text-green-700" },
      { label: "Mapei trade + Bayset", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapegrout Fast-Set is a rapid-setting cementitious repair mortar suited to time-critical concrete spalling repair applications where traffic reinstatement, production access, or tight programme constraints require high early strength development. It achieves sufficient strength for foot traffic within a few hours of application — confirm early strength from the current Mapei Australia TDS. It is a pre-bagged product mixed with clean water and applied with Mapei Planicrete AC bonding slurry or Eporip epoxy bond coat on the prepared substrate. The rapid-setting characteristic makes it well-suited for carpark deck repairs and structural repairs requiring early return to service but requires careful batch mixing to avoid premature stiffening in hot or windy conditions. Confirm all early strength values, maximum layer thickness, primer requirements, and compatibility with subsequent coating systems from the current Mapei Australia TDS — rapid-set mortars behave differently from normal-set products in hot weather and must be mixed in smaller batches with reduced pot life.",
    technicalProperties: [
      "Rapid-setting cementitious repair mortar — high early strength — foot traffic within hours (confirm from TDS)",
      "Pre-bagged — 25 kg — mixed with clean water only — Planicrete AC or Eporip primer required",
      "Suitable for carpark deck repairs, structural repairs with tight programme requirements",
      "Compatible with Mapei coating and waterproofing systems applied over cured repair",
      "Available through Mapei Australia trade supply and Bayset nationally",
    ],
    limitations: [
      "Rapid-setting characteristic requires experienced applicators — reduced pot life, especially in hot weather — mix in small batches only",
      "Not suitable for large-area placements — rapid set may cause premature stiffening before placement is complete",
      "Primer coat (Planicrete AC or Eporip) is mandatory — confirm primer type for substrate from Mapei TDS",
      "Do not apply over active or moving cracks — rapid-set mortars are rigid and brittle and will re-crack under live movement",
      "Confirm early strength, traffic reinstatement timing, and temperature limitations from current Mapei Australia TDS — not from Mapei European or international TDS",
      "TODO: owner confirm — Mapegrout Fast-Set availability and current Australian product name with Mapei Australia technical",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Cementitious", label: "Cementitious" },
  { id: "General-use", label: "General use" },
  { id: "Rapid-set", label: "Rapid-set" },
  { id: "Pre-bagged", label: "Pre-bagged" },
  { id: "Hand-applied", label: "Hand-applied" },
  { id: "Non-structural", label: "Non-structural" },
  { id: "Budget", label: "Budget tier" },
];

const SYSTEM_COMPARISON = [
  { brand: "Sika", product: "Sika MonoTop-436N", setting: "Normal-set", en1504: "R4 (confirmed aus.sika.com)", primer: "TODO: confirm from Sika AU TDS", maxLayer: "20–300 mm one pour", bestFor: "Pourable structural repair — formwork required" },
  { brand: "Ardex", product: "Ardex BR 340", setting: "Normal-set", en1504: "Confirm with Ardex TDS", primer: "TODO: confirm from Ardex AU TDS", maxLayer: "80 mm", bestFor: "High-build spall — strata and commercial" },
  { brand: "Fosroc / Parchem", product: "TODO: confirm — Renderoc GP not in AU range", setting: "Normal-set", en1504: "Confirm with Parchem TDS", primer: "Nitobond SBR", maxLayer: "Confirm TDS", bestFor: "TODO: confirm correct AU product with Parchem" },
  { brand: "Mapei", product: "Mapei Mapegrout Fast-Set", setting: "Rapid-set", en1504: "Confirm with Mapei TDS", primer: "Planicrete AC or Eporip", maxLayer: "Confirm TDS", bestFor: "Fast-track programme — carparks" },
];

const TECH_INFO = {
  typicalApplications: [
    "General concrete spalling repair on sheltered or moderate-exposure elements such as internal carpark columns, beams, and protected slab soffits",
    "Fast-track spalling repair on carpark decks and vehicle access areas where traffic reinstatement within hours is required",
    "Non-structural patch repair on concrete surfaces in areas with limited moisture and thermal exposure",
    "Repair of honeycombing and surface defects on new or existing concrete in sheltered conditions",
    "Temporary or intermediate repair prior to application of a protective coating system",
  ],
  selectionCriteria: [
    "Set time: use normal-set for general programme applications — use rapid-set only when traffic reinstatement or fast programme is required, with experienced applicators",
    "Exposure: in coastal, high-chloride, or externally exposed locations, specify a polymer-modified mortar (not a basic cementitious grade) for improved durability and lower porosity",
    "EN 1504-3 compliance: confirm class (R3/R4) for structural repairs from the current manufacturer TDS — not all cementitious repair mortars carry EN 1504-3 structural classification",
    "Primer: SBR bonding slurry is the standard primer for porous prepared concrete — epoxy bond coat is required for smooth, dense, or low-absorption substrates",
    "Cost: cementitious repair mortars are typically lower cost than fully polymer-modified grades — appropriate for budget-constrained non-critical applications at moderate exposures",
  ],
  limitations: [
    "Lower flexibility and crack resistance than polymer-modified mortars — not recommended for thermally exposed facades or high-movement locations",
    "Higher porosity than polymer-modified grades — increased risk of chloride and carbonation ingress in moderate-to-high exposure environments",
    "Rapid-setting grades require experienced applicators — premature stiffening in hot or windy conditions will reduce placement quality",
    "Bonding coat is mandatory regardless of brand — dry, dust-covered, or contaminated surfaces will prevent adequate adhesion",
    "Do not use as a cosmetic profiling mortar alone — where a smooth surface finish is required, a compatible fine finishing mortar must be applied over the cured patch",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — minimum cover requirements for the exposure classification must be reinstated by the repair",
    "EN 1504-3 — Products and Systems for Protection and Repair of Concrete Structures — confirm class from manufacturer TDS for structural applications",
    "ICRI 310.2 — concrete substrate preparation profile (CSP) requirements — minimum CSP 3 for cementitious repair mortars",
    "Manufacturer TDS — primer, substrate condition, layer thickness, and curing requirements are critical — always confirm from current Australian TDS",
  ],
  suitableDefects: [
    "Concrete spalling — general repair at moderate exposures where polymer-modified grade is not required",
    "Honeycombing and surface voids — non-structural patch repair in sheltered locations",
    "Minor surface deterioration — shallow patch repair prior to coating",
    "Rapid-set grade: carpark deck and ramp spalling repair where traffic reinstatement is required",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — prepared by chipping, scabbling, or high-pressure washing to achieve CSP 3 minimum — saturated surface dry",
    "Precast concrete — same preparation as in-situ — confirm primer requirement for high-density precast",
    "Exposed reinforcement bars — must be cleaned and primed with zinc-rich or epoxy rebar primer before repair mortar application — never encapsulate unprepared corroded bars",
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
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${items.length - limit} more ↓`}
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
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : <span className="font-semibold text-slate-600">{src.name}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with current manufacturer TDS before specifying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
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

export function CementitiousMortarsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are cementitious repair mortars?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cementitious repair mortars are cement-based patch repair materials with limited or no added polymer — they rely primarily on the cementitious binder for strength and adhesion. Compared to fully polymer-modified systems, they are generally lower in cost and have higher porosity. In Australian remedial building practice, cementitious repair mortars are used where the exposure classification and project budget do not justify a fully polymer-modified system, or where a rapid-setting formulation is required for fast-track programme works.
        </p>
        {expanded && (
          <>
            <p>
              In most Class 2 strata and carpark concrete spalling repair specifications, a polymer-modified repair mortar (EN 1504-3 Class R3 or above) is specified rather than a basic cementitious grade — because polymer modification reduces porosity, improves adhesion, and reduces the risk of early shrinkage cracking. However, cementitious mortars remain appropriate for non-structural repair in sheltered environments, cosmetic patching, and time-critical applications where a rapid-setting formulation is required. In all cases, a bonding coat (SBR slurry or epoxy) must be applied to the prepared substrate before the cementitious repair mortar is placed.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function CementitiousMortarsProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
          </div>
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
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 products — cementitious repair mortars — general-use and rapid-set grades</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
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
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <CollapsibleList items={product.technicalProperties} icon="check" limit={3} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList items={product.limitations} icon="x" limit={3} />
                  </div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of cementitious repair mortars. Confirm all selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Setting</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">EN 1504-3</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Primer</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Max layer</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap text-slate-700">Best for</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.setting}</td>
                  <td className="px-4 py-3 text-slate-600">{row.en1504}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primer}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.maxLayer}</td>
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
