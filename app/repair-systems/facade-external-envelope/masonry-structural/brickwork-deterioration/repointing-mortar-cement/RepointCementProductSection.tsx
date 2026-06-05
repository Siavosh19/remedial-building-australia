"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "GP-cement"
  | "Pre-mixed"
  | "Polymer-modified"
  | "Site-mixed"
  | "AS-3700"
  | "M3"
  | "M4"
  | "Hard-brick"
  | "Concrete-masonry"
  | "Calcium-silicate"
  | "Colour-matched"
  | "Coastal"
  | "Parapet"
  | "External";

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
    fullLabel: "Boral / Cement Australia / Adbri",
    brandUrl: "https://www.boral.com.au",
    accentColor: "#b45309",
    name: "GP Cement + Hydrated Lime Repointing Mortar — M3 / M4",
    descriptionLine: "Site-mixed GP cement and hydrated lime mortar — AS 3700 M3 or M4 designation — external clay brick, concrete masonry, and calcium silicate brick facades",
    productType: "Site-mixed GP cement + hydrated lime mortar — AS 3700 compliant — external masonry",
    filterTags: ["GP-cement", "Site-mixed", "AS-3700", "M3", "M4", "Hard-brick", "Concrete-masonry", "Calcium-silicate", "External"],
    techChips: [
      { label: "GP + lime blend", cls: "bg-amber-100 text-amber-800" },
      { label: "AS 3700 M3/M4", cls: "bg-slate-100 text-slate-700" },
      { label: "Site-mixed", cls: "bg-stone-100 text-stone-700" },
      { label: "Hard brick only", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Ordinary Portland cement (GP) and hydrated lime blended mortar for repointing modern or hard-burnt brickwork on Class 2 strata buildings. Mix proportions per AS 3700: typically 1:1:6 (cement:lime:sand by volume) for M3 class mortar, or 1:2:9 for M4. Adding hydrated lime improves workability and reduces shrinkage compared to plain Portland cement. Never use plain OPC without lime — the resulting mortar is too rigid and will shrink excessively. The mortar is site-mixed on the day of application using GP cement, hydrated lime, and locally sourced washed sharp sand per AS 3700. Sand colour, cement content, and any pigment addition all affect the final mortar colour — commission a cured trial panel and allow minimum 28 days before approving colour. Not suitable for soft, porous or historic brickwork.",
    technicalProperties: [
      "Mix proportions per AS 3700: M3 = 1:1:6 cement:lime:sand; M4 = 1:2:9 — confirm required designation with engineer",
      "Compressive strength: M3 approx. 8 MPa; M4 approx. 5 MPa — suits most external Class 2 facade repointing",
      "Hydrated lime addition improves workability and reduces shrinkage vs plain GP cement mortar",
      "GP cement, hydrated lime and sand widely available from masonry suppliers nationally",
      "Suitable for modern clay brick, concrete masonry units and calcium silicate brick — confirm mortar softer than brick unit",
      "Pigment addition available for colour matching — trial panel mandatory at minimum 28-day cure before approval",
    ],
    limitations: [
      "Not suitable for soft, historic or lime-mortar brickwork — cement mortar too rigid — causes brick face spalling",
      "Low vapour permeability — traps moisture in damp masonry — can accelerate salt-related spalling",
      "Colour difficult to match — fresh and cured mortar colours differ significantly — trial panel mandatory",
      "Shrinkage on cure — plain cement mortars shrink; lime addition reduces but does not eliminate shrinkage cracking",
    ],
    procurementSources: [
      { name: "Boral Building Products — national", url: "https://www.boral.com.au" },
      { name: "Cement Australia (Holcim / Hanson) — eastern states", url: "https://www.cementaustralia.com.au" },
      { name: "Adbri (Adelaide Brighton) — national", url: "https://www.adbri.com.au" },
      { name: "Cockburn Cement (Adbri group) — WA / SA", url: "https://www.adbri.com.au" },
    ],
  },
  {
    fullLabel: "Boral / BGC / Cockburn / Hanson",
    brandUrl: "https://www.boral.com.au",
    accentColor: "#0369a1",
    name: "Pre-mixed Masonry Cement Repointing Mortar",
    descriptionLine: "Factory pre-blended masonry cement repointing mortar — add water only on site — AS 3700 M3 compliant — colour-matched ranges available from major suppliers",
    productType: "Pre-mixed masonry cement repointing mortar — AS 3700 compliant — external masonry",
    filterTags: ["Pre-mixed", "AS-3700", "M3", "Colour-matched", "Hard-brick", "Concrete-masonry", "External"],
    techChips: [
      { label: "Pre-mixed", cls: "bg-sky-100 text-sky-800" },
      { label: "Colour-matched", cls: "bg-green-100 text-green-700" },
      { label: "Add water only", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3700 M3/M4", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Factory pre-blended masonry cement repointing mortar supplied in dry bag format for consistent mix proportions on site. Masonry cement is a proprietary blend of Portland cement, finely ground limestone or slag, and air-entraining agents — producing a more workable mortar with better freeze-thaw resistance than plain GP cement mortar. The factory-controlled blending eliminates site batching errors in cement:lime:sand proportions that cause strength variation and colour inconsistency across a job. Colour-matched product ranges are available from major suppliers — confirm colour match using a cured trial panel before ordering full job quantities. Pre-mixed formulations often include water retention agents that reduce suction-related bond failures on dry or porous substrates. Mix with clean water only on site per manufacturer instructions.",
    technicalProperties: [
      "Factory-controlled mix — eliminates site batching errors in cement:lime:sand proportioning",
      "Colour-matched ranges available — reduces colour matching effort vs site-mixed mortar",
      "Better workability than plain GP cement — air-entrained masonry cement produces smooth, workable mix",
      "Water retention agents often included — reduces bond failure risk on dry or porous brick substrates",
      "20–25 kg bags — add clean water on site per manufacturer instructions — no separate components required",
      "Confirm AS 3700 mortar designation compliance and compressive strength class with specific supplier TDS",
    ],
    limitations: [
      "More expensive than site-mixed mortar — pre-mixed bags cost more per kg than bulk GP cement and sand",
      "Not suitable for soft historic brick — same rigidity and low vapour permeability concerns as all cement mortars",
      "Colour range is limited — match against existing weathered mortar before ordering; commission a cured trial panel",
      "Product variation between manufacturers — confirm specification compliance with the specific supplier before ordering",
    ],
    procurementSources: [
      { name: "Boral Building Products — national", url: "https://www.boral.com.au" },
      { name: "BGC Cement — WA primarily", url: "https://www.bgc.com.au" },
      { name: "Cockburn Cement (Adbri) — WA / SA", url: "https://www.adbri.com.au" },
      { name: "Hanson Building Products — eastern states", url: "https://www.hanson.com.au" },
    ],
  },
  {
    fullLabel: "Sika / Mapei / Parchem / Ardex",
    brandUrl: "https://aus.sika.com",
    accentColor: "#7c3aed",
    name: "Polymer-Modified Cement Repointing Mortar",
    descriptionLine: "Polymer-modified cementitious repointing mortar — improved bond and reduced shrinkage — AS 3700 — for high-movement and coastal exposed zones — specialist supply",
    productType: "Polymer-modified cementitious repointing mortar — AS 3700 — external masonry",
    filterTags: ["Polymer-modified", "AS-3700", "M3", "Coastal", "Parapet", "Hard-brick", "Concrete-masonry", "External"],
    techChips: [
      { label: "Polymer-modified", cls: "bg-purple-100 text-purple-800" },
      { label: "Improved bond", cls: "bg-green-100 text-green-700" },
      { label: "Reduced shrinkage", cls: "bg-sky-100 text-sky-800" },
      { label: "Pre-bagged", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Polymer-modified cementitious repointing mortar for improved adhesion and flexibility on Class 2 building facades. The polymer dispersion in the mix improves bond strength to existing masonry, reduces shrinkage cracking at the mortar-to-brick interface, and improves water resistance compared to plain cement mortars. This type of mortar is used where standard cement mortar has repeatedly failed — mortar pop-out or debonding — or where the application is in a high-movement or highly exposed zone such as parapet copings, exposed piers, or coastal locations. Available from several specialist suppliers including Sika, Mapei, Parchem, and Ardex — confirm the specific product code and compressive strength class (AS 3700 designation) from the relevant manufacturer TDS before specifying. Note: polymer-modified cement mortars are still relatively rigid and non-breathable compared to lime mortars — must not be used on soft, historic, or lime-mortar brickwork.",
    technicalProperties: [
      "Polymer modification improves bond strength — reduces risk of mortar pop-out in thermally active or exposed joints",
      "Reduced shrinkage compared to plain cement mortar — narrower crack width at mortar-to-brick interface",
      "Improved water resistance — lower water absorption than plain cement mortar — suited to parapet and coping repointing",
      "Pre-measured single-component bag — consistent performance across the job — no separate polymer admixture required",
      "Confirm mortar compressive strength class — must not exceed approx. 25–30% of brick unit compressive strength",
      "Confirm product availability, brand designation and current Australian TDS with supplier before specifying",
    ],
    limitations: [
      "Higher cost than standard cement or masonry cement mortars — justify use only where standard mortar has failed",
      "Not suitable for heritage soft brick — polymer-modified cement mortars are still rigid and non-breathable vs lime mortars",
      "Pot life shorter than plain cement mortar — mix only what can be placed within the manufacturer's stated pot life",
      "Colour matching requires manufacturer consultation — not all products have a standard colour-matching service",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply / Parchem nationally", url: "https://aus.sika.com" },
      { name: "Mapei Australia — national distributors", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies — national (Fosroc)", url: "https://www.parchem.com.au" },
      { name: "Ardex Australia — national distributors", url: "https://www.ardex.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "GP-cement", label: "GP cement" },
  { id: "Pre-mixed", label: "Pre-mixed" },
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Site-mixed", label: "Site-mixed" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "M3", label: "M3 class" },
  { id: "M4", label: "M4 class" },
  { id: "Hard-brick", label: "Hard brick" },
  { id: "Concrete-masonry", label: "Concrete masonry" },
  { id: "Calcium-silicate", label: "Calcium silicate" },
  { id: "Colour-matched", label: "Colour matched" },
  { id: "Coastal", label: "Coastal" },
  { id: "Parapet", label: "Parapet / coping" },
  { id: "External", label: "External" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  mixType: string;
  mortarClass: string;
  strength: string;
  colourMatch: string;
  vapourPermeable: string;
  coastal: string;
  primaryUse: string;
}[] = [
  {
    product: "GP cement + hydrated lime",
    brand: "Boral / Cement Australia / Adbri",
    mixType: "Site-mixed — cement + lime + sand",
    mortarClass: "M3 / M4 (per AS 3700)",
    strength: "M3 ~8 MPa / M4 ~5 MPa",
    colourMatch: "Trial panel mandatory (28-day cure)",
    vapourPermeable: "Low",
    coastal: "Suitable (confirm exposure class)",
    primaryUse: "Standard repointing — modern clay brick and concrete masonry",
  },
  {
    product: "Pre-mixed masonry cement mortar",
    brand: "Boral / BGC / Cockburn / Hanson",
    mixType: "Factory pre-blended — add water only",
    mortarClass: "M3 (confirm with supplier TDS)",
    strength: "~8 MPa (confirm TDS)",
    colourMatch: "Limited colour range — trial panel required",
    vapourPermeable: "Low",
    coastal: "Suitable (confirm product)",
    primaryUse: "Repointing where consistent batching is required — Class 2 strata",
  },
  {
    product: "Polymer-modified repointing mortar",
    brand: "Sika / Mapei / Parchem / Ardex",
    mixType: "Pre-bagged polymer-modified — add water",
    mortarClass: "Confirm AS 3700 class with supplier TDS",
    strength: "20–50 MPa range (confirm TDS)",
    colourMatch: "Limited — manufacturer consultation required",
    vapourPermeable: "Low",
    coastal: "Yes — confirm with supplier",
    primaryUse: "High-movement zones, parapets, coastal — where standard mortar has repeatedly failed",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Repointing deteriorated or failed mortar joints in modern clay brick facades on Class 2 strata buildings",
    "Repointing exposed concrete masonry (block) and calcium silicate brick facades",
    "Parapet coping repointing where high UV and water exposure accelerate mortar deterioration",
    "Repointing at exposed piers, columns and wind-driven rain exposed zones",
    "Restoration of mortar joints following salt attack treatment and substrate preparation",
  ],
  selectionCriteria: [
    "Confirm mortar designation — AS 3700 M3 or M4 is appropriate for most external Class 2 facade repointing",
    "Always include hydrated lime in GP cement mortar — plain Portland cement without lime is not suitable for facade repointing",
    "Confirm the mortar is softer than the brick unit — hard mortar on soft brick causes brick face spalling under thermal movement",
    "Commission a trial panel and cure for minimum 28 days before approving colour match",
    "For repeated mortar failure or high-movement zones, specify polymer-modified mortar over standard cement",
    "Do not use cement mortar on soft, porous, or historic lime-mortar brickwork — specify lime mortar instead",
  ],
  limitations: [
    "Never use cement mortar on soft, historic, or lime-mortar masonry — causes brick face spalling and moisture trapping",
    "Do not repoint over existing movement joints — movement joints must be raked out and resealed with polyurethane or silicone, not mortar",
    "Plain Portland cement without hydrated lime is not suitable for facade repointing — too rigid, shrinks excessively",
    "Cement mortars have low vapour permeability — can trap moisture in damp or salt-contaminated masonry",
    "Do not apply in direct sun or high wind without protecting fresh mortar from rapid drying",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — primary Australian standard for mortar proportions and designations (M1–M4)",
    "AS 3700 Table 10.2 — mortar designation requirements for different exposure classifications and structural contexts",
    "NATSPEC worksection 03 41 00 — Masonry — project specification requirements",
    "Manufacturer TDS — confirm compressive strength class, pot life, and colour-matching service before specifying",
    "NCC Volume One and Two — masonry and facade requirements for Class 2 buildings",
  ],
  suitableDefects: [
    "Deteriorated, crumbling or eroded mortar joints in modern clay brick or concrete masonry facades",
    "Failed mortar joints caused by salt crystallisation and efflorescence within the mortar",
    "Mortar pop-out in thermally active or wind-exposed locations where original mortar was too rigid",
    "Repointing after brick cleaning or facade restoration works as part of the overall remediation scope",
    "Open or raked joints following removal of failed or contaminated mortar as part of salt attack remediation",
  ],
  typicalSubstrates: [
    "Modern fired clay brick — hard-burnt engineering brick and face brick — confirm mortar strength is lower than brick strength",
    "Concrete masonry units (block) — standard and face-grade concrete block facades",
    "Calcium silicate brick — confirm mortar designation is appropriate for the specific brick compressive strength",
    "Reconstituted stone products — confirm suitability of cement mortar with product manufacturer before specifying",
    "NOT suitable: soft, porous, historic or lime-mortar brick — specify traditional lime mortar for these substrates",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x";
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
            >
              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                >
                  {src.name}
                  <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
    </div>
  );
}

function CollapsibleCardDetails({
  text,
  chips,
}: {
  text: string;
  chips: { label: string; cls: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

function TechCard({
  icon,
  title,
  items,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {icon}
        </div>
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

export function RepointCementIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are cement mortar repointing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cement mortar repointing systems use ordinary Portland cement (GP), masonry cement, or polymer-modified cementitious mortars to replace deteriorated or failed mortar joints in modern brick, block, and calcium silicate masonry facades. They must comply with AS 3700 mortar designations (M1–M4) based on the required compressive strength and exposure classification.
        </p>
        {expanded && (
          <>
            <p>
              The fundamental rule in mortar selection is that the mortar must be softer (lower compressive strength) than the masonry unit it is pointing. A mortar that is stronger than the brick will force all thermal movement stress into the brick face — causing spalling of the brick arris. This is why plain Portland cement (without hydrated lime) must never be used for facade repointing: it is too rigid, shrinks excessively, and can cause brick face damage. Always include hydrated lime in a cement mortar mix per AS 3700.
            </p>
            <p>
              Cement mortars are not suitable for soft, porous or historic brickwork — these substrates require a traditional lime mortar that matches the original mortar composition. Using cement mortar on heritage brickwork traps moisture in the masonry, accelerates salt crystallisation damage, and causes brick face spalling. The critical importance of a colour trial panel cannot be overstated — fresh and cured mortar colours differ significantly, and a minimum 28-day cured trial panel is mandatory before approving the colour match for the full job.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function RepointCementProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleProducts =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable substrates
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (
              <>Hide detail <ChevronUp size={14} /></>
            ) : (
              <>Show detail <ChevronDown size={14} /></>
            )}
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

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 product systems — cement mortar repointing — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active
                    ? "border-sky-950 bg-sky-950 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div
              key={product.name}
              className="flex-none"
              style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
            >
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}
              >
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a
                          href={product.tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a
                        href={product.brandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      >
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips}
                  />
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

                {/* Technical Properties & Limitations */}
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

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of cement mortar repointing systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mix type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mortar class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Strength</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour match</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Vapour permeable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.mixType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.mortarClass}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.strength}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colourMatch}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.vapourPermeable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
