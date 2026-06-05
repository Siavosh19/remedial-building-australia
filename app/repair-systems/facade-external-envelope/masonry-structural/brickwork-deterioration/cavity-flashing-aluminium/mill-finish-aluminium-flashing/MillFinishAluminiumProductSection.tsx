"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Capral"
  | "Metalcraft"
  | "Stramit"
  | "Local-fabricator"
  | "Mill-finish"
  | "National"
  | "Cavity-flashing"
  | "Pre-profiled"
  | "Custom"
  | "AS-3700"
  | "Engineer-detail";

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
    fullLabel: "Capral Aluminium",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#0369a1",
    name: "Capral Mill Finish Aluminium Cavity Flashing",
    descriptionLine: "Mill finish 1.2–2.0mm aluminium strip for cavity flashing — national supply via Capral service centres and fabricators — alloy 1100 or 3003",
    productType: "Mill finish aluminium flashing — coil and cut length supply",
    filterTags: ["Capral", "Mill-finish", "National", "Cavity-flashing", "AS-3700"],
    techChips: [
      { label: "Mill finish", cls: "bg-sky-100 text-sky-800" },
      { label: "1.2–2.0mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Alloy 1100 / 3003", cls: "bg-slate-100 text-slate-700" },
      { label: "National distribution", cls: "bg-green-50 text-green-700" },
      { label: "Coil / cut length", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Capral Aluminium supplies mill finish aluminium strip in standard thicknesses (1.2mm, 1.6mm, 2.0mm) used as cavity flashing in masonry remediation — typically supplied to metal fabricators who form the flashing profile on site or in workshop. Mill finish aluminium is the standard specification for most cavity flashing applications — unpainted alloy 1100 or 3003 extrusion or rolled strip with standard folding and forming characteristics. Supplied in coil or pre-cut sheet lengths; fabricators form drip lips, weep former slots, and upstand returns to suit specific cavity dimensions. Available nationally through Capral's distribution network. Confirm current alloy, thickness availability, and pricing with local Capral branch before specifying.",
    technicalProperties: [
      "Finish: mill finish (bare alloy) — unpainted, natural oxidised surface forms over time in service",
      "Thickness: 1.2mm / 1.6mm / 2.0mm — confirm minimum 1.2mm for structural cavity flashing with project engineer",
      "Alloy: 1100 or 3003 — standard rolling and folding grades suitable for brake-press profile formation",
      "Standard: AS 3700 Masonry Structures — confirm flashing compliance with project engineer",
      "Supply form: coil or cut length — fabricators form drip lip, upstand, and weep former slots to drawing",
      "Distribution: national through Capral branch and aluminium service centre network",
    ],
    limitations: [
      "Mill finish aluminium will oxidise over time — not suitable where aesthetics of the exposed drip edge are important",
      "Dissimilar metal contact with steel fixings will cause galvanic corrosion — use stainless or aluminium fixings only",
      "Fabrication to correct profile required — do not install flat sheet without forming correct drip lip and upstand",
      "Minimum thickness 1.2mm required for structural cavity flashing — do not substitute 0.9mm gauge",
    ],
    procurementSources: [
      { name: "Capral Aluminium — national distribution through aluminium service centres", url: "https://www.capral.com.au" },
      { name: "Metal and aluminium fabricators nationally — confirm strip supply and forming capability", url: "https://www.capral.com.au" },
      { name: "Capral website for nearest distributor and branch location", url: "https://www.capral.com.au" },
    ],
  },
  {
    fullLabel: "Metalcraft Industries",
    brandUrl: "https://www.metalcraft.com.au",
    accentColor: "#b45309",
    name: "Metalcraft Mill Finish Aluminium Flashing Strip",
    descriptionLine: "Pre-cut and profiled mill finish aluminium cavity flashing — standard profiles with drip edge and upstand — national supply through Metalcraft network",
    productType: "Mill finish aluminium flashing — pre-profiled supply",
    filterTags: ["Metalcraft", "Mill-finish", "National", "Pre-profiled", "Cavity-flashing", "AS-3700"],
    techChips: [
      { label: "Mill finish", cls: "bg-amber-100 text-amber-800" },
      { label: "Pre-profiled strips", cls: "bg-slate-100 text-slate-700" },
      { label: "1.2–1.6mm", cls: "bg-slate-100 text-slate-700" },
      { label: "National", cls: "bg-green-50 text-green-700" },
      { label: "No site fabrication", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Metalcraft supplies mill finish aluminium flashing in standard profiles and cut lengths for masonry remediation — supplied as pre-cut strips with standard drip edge, upstand, and weep former configurations. Pre-profiled supply eliminates on-site fabrication requirements, providing consistent cavity flashing profiles for contractor installation. Standard profiles suit most residential cavity masonry configurations — custom profiles available for non-standard cavity widths. Available through Metalcraft's national supply network with technical guidance for flashing specification. Confirm available profiles, lead times, and custom profile options with Metalcraft before scheduling installation.",
    technicalProperties: [
      "Finish: mill finish (bare alloy) — no coating applied",
      "Thickness: 1.2mm / 1.6mm standard — confirm minimum thickness with engineer for structural applications",
      "Supply form: pre-cut profiles with standard drip edge, upstand, and weep former geometry",
      "Standard: AS 3700 Masonry Structures — confirm compliance with project engineer",
      "Custom profiles: available for non-standard cavity widths — confirm lead time with Metalcraft",
      "Distribution: national through Metalcraft flashing and roofing product distribution network",
    ],
    limitations: [
      "Mill finish will show oxidation over time — confirm finish acceptability for exposed drip edge locations",
      "Pre-profiled lengths are non-adjustable — confirm cavity dimensions before ordering",
      "Lead times for custom profiles — confirm with Metalcraft before scheduling installation works",
      "Dissimilar metal contact must be avoided — use aluminium or stainless steel fixings only",
    ],
    procurementSources: [
      { name: "Metalcraft Industries — national supply through specialist flashings and roofing distributors", url: "https://www.metalcraft.com.au" },
      { name: "Roofing and facade accessory suppliers nationally stocking Metalcraft products", url: "https://www.metalcraft.com.au" },
      { name: "Metalcraft website for nearest distributor and product range", url: "https://www.metalcraft.com.au" },
    ],
  },
  {
    fullLabel: "Stramit Building Products",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#7c3aed",
    name: "Stramit Aluminium Flashing Strip",
    descriptionLine: "Mill finish aluminium flashing in standard profiles for masonry cavity and parapet applications — widely available through Stramit's national branch network",
    productType: "Mill finish aluminium flashing — standard and Colorbond profiles",
    filterTags: ["Stramit", "Mill-finish", "National", "Cavity-flashing", "AS-3700"],
    techChips: [
      { label: "Mill finish / Colorbond", cls: "bg-violet-100 text-violet-800" },
      { label: "0.9–1.2mm standard", cls: "bg-slate-100 text-slate-700" },
      { label: "Cut lengths / coil", cls: "bg-slate-100 text-slate-700" },
      { label: "National branches", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Stramit Building Products supplies aluminium flashing strip in mill finish and other finishes for cavity flashing, parapet capping, and related masonry remediation applications. Stramit's national branch and distribution network provides broad contractor access to aluminium flashing products without requiring specialist fabricator engagement. Standard profiles are available for common cavity widths and parapet details — custom profiles and cut-to-length service available through Stramit branches. Note: Stramit's 0.9mm product is below the minimum recommended thickness for structural cavity flashing — confirm 1.2mm minimum with project engineer.",
    technicalProperties: [
      "Finish: mill finish or Colorbond coated — confirm finish with local Stramit branch",
      "Thickness: 0.9mm / 1.2mm standard — confirm 1.2mm minimum for structural cavity flashing with engineer",
      "Supply form: cut lengths or coil — cut-to-length service available at Stramit branches",
      "Standard: AS 3700 Masonry Structures — confirm compliance with project engineer",
      "Custom profiles: cut-to-length and profile bending available at branches",
      "Distribution: national branches — Sydney, Melbourne, Brisbane, Perth, Adelaide",
    ],
    limitations: [
      "0.9mm is below minimum recommended thickness for structural cavity flashing — confirm 1.2mm minimum with engineer",
      "Mill finish will oxidise in coastal and high-humidity environments — consider powder coat for marine zones",
      "Custom profiles require lead time — confirm availability with local Stramit branch before scheduling",
      "Confirm flashing profile is correctly specified and formed for the cavity configuration before ordering",
    ],
    procurementSources: [
      { name: "Stramit Building Products — national branch network: Sydney, Melbourne, Brisbane, Perth, Adelaide", url: "https://www.stramit.com.au" },
      { name: "Roofing and cladding suppliers nationally stocking Stramit products", url: "https://www.stramit.com.au" },
      { name: "Stramit website for nearest branch and product enquiries", url: "https://www.stramit.com.au" },
    ],
  },
  {
    fullLabel: "Local aluminium fabricators",
    brandUrl: "#",
    accentColor: "#059669",
    name: "Local Aluminium Fabricators — Custom Cavity Flashing",
    descriptionLine: "Site-specific cavity flashing fabricated by local aluminium fabricators to engineer's drawings — custom profiles, one-off and short-run production",
    productType: "Custom mill finish aluminium flashing — fabricated to engineer specification",
    filterTags: ["Local-fabricator", "Custom", "Mill-finish", "Cavity-flashing", "Engineer-detail", "AS-3700"],
    techChips: [
      { label: "Custom fabrication", cls: "bg-emerald-100 text-emerald-800" },
      { label: "Mill finish", cls: "bg-slate-100 text-slate-700" },
      { label: "Engineer detail required", cls: "bg-amber-50 text-amber-700" },
      { label: "1.2–2.0mm to spec", cls: "bg-slate-100 text-slate-700" },
      { label: "Local supply", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Local aluminium fabricators produce custom cavity flashing to engineer or architect drawings for non-standard cavity configurations, complex parapet details, and heritage applications. Fabricators can produce one-off or short-run cavity trays, weep formers, and flashing profiles to exact site dimensions — the preferred approach for complex remediation projects. Fabricators source aluminium strip from national distributors (Capral, Metalcraft) and form profiles using brake press or folder equipment. Cost-effective for small quantities or complex profiles that don't suit standard catalogue items. The project engineer or remedial practitioner must provide dimensioned drawings — fabricators do not design cavity flashing geometry.",
    technicalProperties: [
      "Finish: mill finish standard — confirm with fabricator if other finish is required",
      "Thickness: 1.2–2.0mm to engineer specification — confirm minimum 1.2mm for structural applications",
      "Supply form: custom to engineer drawings — dimensioned drawings must be provided by project practitioner",
      "Standard: AS 3700 Masonry Structures — fabrication must comply with engineer specification",
      "Lead time: variable — typically 1–2 weeks depending on fabricator workload and complexity",
      "Distribution: local supply — source through trade referral or remedial contractor networks",
    ],
    limitations: [
      "Quality varies by fabricator — check fabricator capability before engaging for critical flashing profiles",
      "Lead time for custom fabrication must be allowed in programme — do not leave to last minute",
      "Engineer or remedial practitioner must provide dimensioned drawings — fabricators do not design cavity flashing",
      "No standard product data sheet — fabrication must comply with engineer specification and AS 3700",
    ],
    procurementSources: [
      { name: "Local aluminium fabricators — trade directories and building industry referrals", url: "#" },
      { name: "Sheet metal and aluminium fabrication businesses in all major cities", url: "#" },
      { name: "Ask remedial contractors for preferred local fabricator relationships", url: "#" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Capral", label: "Capral" },
  { id: "Metalcraft", label: "Metalcraft" },
  { id: "Stramit", label: "Stramit" },
  { id: "Local-fabricator", label: "Local fabricator" },
  { id: "Mill-finish", label: "Mill finish" },
  { id: "National", label: "National supply" },
  { id: "Cavity-flashing", label: "Cavity flashing" },
  { id: "Pre-profiled", label: "Pre-profiled" },
  { id: "Custom", label: "Custom" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Engineer-detail", label: "Engineer detail" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  thickness: string;
  finish: string;
  supply: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Capral Aluminium",
    product: "Mill Finish Strip",
    thickness: "1.2–2.0mm",
    finish: "Mill finish",
    supply: "Coil / cut length",
    distribution: "National",
    keyFeature: "Standard alloy — fabricator supply",
    primaryUse: "Fabricator-sourced flashing material",
  },
  {
    supplier: "Metalcraft Industries",
    product: "Pre-cut Profiled Strip",
    thickness: "1.2–1.6mm",
    finish: "Mill finish",
    supply: "Pre-profiled lengths",
    distribution: "National",
    keyFeature: "Pre-profiled — no site fabrication required",
    primaryUse: "Standard cavity flashing profiles",
  },
  {
    supplier: "Stramit Building Products",
    product: "Aluminium Flashing Strip",
    thickness: "0.9–1.2mm",
    finish: "Mill finish / Colorbond",
    supply: "Cut lengths / coil",
    distribution: "National branches",
    keyFeature: "Broad branch availability",
    primaryUse: "Contractor-procured standard flashing",
  },
  {
    supplier: "Local Fabricators",
    product: "Custom Cavity Flashing",
    thickness: "1.2–2.0mm to spec",
    finish: "Mill finish",
    supply: "Custom to drawings",
    distribution: "Local",
    keyFeature: "Non-standard configurations to engineer drawing",
    primaryUse: "Complex details and heritage remediation",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Cavity flashing replacement where original flashing has corroded, failed, or was never installed — masonry remediation in Class 2 strata buildings",
    "New cavity flashing installation at base of cavity, over lintels, at parapet level, and at window sill junctions",
    "Parapet and lintel zone cavity tray replacement — particularly where corroded steel flashing is being replaced with aluminium",
    "Weep hole flashing replacement — where existing weep formers are blocked, absent, or incorrectly configured",
  ],
  selectionCriteria: [
    "Minimum 1.2mm thickness for structural cavity flashing — do not specify 0.9mm gauge in any structural application",
    "Mill finish is suitable for most concealed applications — specify powder coat for exposed drip edges in coastal or marine zones",
    "Use pre-profiled supply for standard cavities — custom fabrication for non-standard configurations or complex parapet details",
    "Confirm drip edge profile provides adequate weathering lap over the mortar course below — minimum 25mm overhang",
  ],
  limitations: [
    "Mill finish aluminium oxidises on the exposed surface — not suitable where the visible drip edge finish is aesthetically important",
    "Dissimilar metal corrosion with steel fixings or steel lintels — use aluminium or stainless steel fixings and isolate from steel surfaces",
    "Fabrication to correct profile is required before installation — flat strip without formed drip lip and upstand is non-compliant",
    "Minimum 1.2mm thickness required for structural application per AS 3700 — verify thickness on delivery",
  ],
  standardsNotes: [
    "AS 3700 Masonry Structures — flashing requirements, lap, and weep former spacing at 600mm maximum centres",
    "BCA / NCC Volume One Section 3 masonry — flashing at openings and wall base requirements for Class 2 buildings",
    "Flashing must extend to the outer face and form a drip edge — flat flash without a drip is non-compliant with AS 3700",
  ],
  suitableDefects: [
    "Failed or missing cavity flashing causing moisture ingress through masonry — identified by efflorescence, staining, or rising damp at wall base",
    "Corroded steel flashing requiring replacement with corrosion-resistant aluminium — particularly at lintel and parapet zones",
    "Parapet flashing replacement where original flashing has failed or been removed during repointing works",
  ],
  typicalSubstrates: [
    "Clay brick cavity masonry — most common substrate for cavity flashing in Australian Class 2 strata buildings",
    "Concrete block cavity masonry — confirm flashing profile suits blockwork course dimensions",
    "Rendered cavity masonry — confirm flashing profile extends through the render coat to shed water at the outer face",
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
              {src.url && src.url !== "#" ? (
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

export function MillFinishAluminiumIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is mill finish aluminium cavity flashing?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Mill finish aluminium is the standard specification for cavity flashing in most Australian masonry remediation projects — unpainted bare alloy in 1.2–2.0mm thickness, formed with drip edge, upstand, and weep former slots per AS 3700 requirements. Supplied as coil or pre-cut lengths by aluminium distributors, or as pre-profiled strips by specialist flashing suppliers.
        </p>
        {expanded && (
          <>
            <p>
              Alloy 1100 or 3003 in rolled strip form is the standard material for site-formed or fabricator-formed flashing. The strip is cut to length and brake-pressed to the required profile, incorporating a minimum 25mm drip edge overhang, upstand into the cavity, and weep former slots at 600mm maximum centres per AS 3700. Minimum 1.2mm wall thickness is required for all structural cavity flashing applications.
            </p>
            <p>
              For standard residential and Class 2 strata remediation work, pre-profiled mill finish aluminium flashing strips from suppliers such as Metalcraft or Stramit eliminate the need for on-site fabrication. For non-standard cavity widths or complex parapet details, custom fabrication by local aluminium fabricators to engineer drawings is the preferred approach.
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

export function MillFinishAluminiumProductSection() {
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
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 suppliers — mill finish aluminium cavity flashing — scroll to view all</p>
          </div>
        </div>

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
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
              Clear filters
            </button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}
              >
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      {product.brandUrl !== "#" && (
                        <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
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

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of mill finish aluminium cavity flashing suppliers. Confirm all product selections with current supplier TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supply form</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.supply}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyFeature}</td>
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
