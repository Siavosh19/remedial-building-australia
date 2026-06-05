"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Hilti"
  | "Fischer"
  | "Sika"
  | "Helifix"
  | "Epoxy"
  | "HIT-RE-500"
  | "FIS-EM"
  | "AnchorFix"
  | "Resin-anchor"
  | "Stainless-316"
  | "Very-high-load"
  | "High-load"
  | "National"
  | "AS-3700"
  | "ETA-approved"
  | "Masonry"
  | "Styrene-free"
  | "Cavity-tie";

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
    fullLabel: "Hilti Australia",
    brandUrl: "https://www.hilti.com.au",
    tdsUrl: "https://www.hilti.com.au/products/anchoring/adhesive-anchors",
    accentColor: "#dc2626",
    name: "Hilti HIT-RE 500 V4 Epoxy Adhesive Anchor",
    descriptionLine: "High-performance two-part epoxy adhesive anchor — ETA-approved — PROFIS Anchor design software for AS 3700 compliant load calculations",
    productType: "Epoxy Resin Anchor",
    filterTags: ["Hilti", "Epoxy", "HIT-RE-500", "Resin-anchor", "Stainless-316", "Very-high-load", "National", "AS-3700", "ETA-approved"],
    techChips: [
      { label: "HIT-RE 500", cls: "bg-red-100 text-red-800" },
      { label: "Epoxy", cls: "bg-slate-100 text-slate-700" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Very high load", cls: "bg-slate-100 text-slate-700" },
      { label: "ETA approved", cls: "bg-green-50 text-green-700" },
      { label: "National", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Hilti HIT-RE 500 V4 is a two-part epoxy adhesive anchor with very high bond strength for structural anchoring in concrete and masonry, widely specified for remedial cavity wall tie installation in heavy-load applications. ETA-approved with published characteristic resistance values — engineers can directly reference Profis Anchor software for AS 3700 compliant load calculations. Suitable for dry and damp substrates (not saturated); achieves full bond strength in a range of masonry and concrete types. Available nationally through Hilti direct and distributors with full technical support and on-site training.",
    technicalProperties: [
      "Two-part epoxy resin — Grade 316 stainless steel tie rod — AS 3700 / ETA approved",
      "Very high load rating — ETA-approved with published characteristic resistance values",
      "PROFIS Anchor software for engineer AS 3700 compliant load calculations",
      "Suitable for dry and damp substrates (not saturated) — full bond strength in masonry and concrete",
      "National supply through Hilti direct and distributor network with full technical support",
    ],
    limitations: [
      "Epoxy curing is inhibited in wet or saturated holes — use vinylester in persistently damp substrates",
      "Temperature-dependent cure time — pot life significantly shorter in Australian summer; confirm with TDS",
      "Hole must be cleaned per Hilti installation method — wire brush, compressed air, blow-out pump",
      "Higher cost than vinylester for equivalent tie — confirm with engineer whether epoxy is required",
    ],
    procurementSources: [
      { name: "Hilti Australia — direct supply and national distribution network", url: "https://www.hilti.com.au" },
      { name: "Hilti tool hire centres — nationally", url: "https://www.hilti.com.au" },
      { name: "Hilti online store and trade accounts for volume supply", url: "https://www.hilti.com.au" },
    ],
  },
  {
    fullLabel: "Fischer Fixings Australia",
    brandUrl: "https://www.fischer.com.au",
    tdsUrl: "https://www.fischer.com.au/products/injection-anchors",
    accentColor: "#0369a1",
    name: "Fischer FIS EM 390 S Epoxy Mortar Anchor",
    descriptionLine: "Two-component thixotropic epoxy mortar anchor — high-load structural anchoring in solid and hollow masonry — ETA published load tables",
    productType: "Epoxy Resin Anchor",
    filterTags: ["Fischer", "Epoxy", "FIS-EM", "Resin-anchor", "Stainless-316", "High-load", "National", "AS-3700", "Masonry"],
    techChips: [
      { label: "FIS EM 390", cls: "bg-sky-100 text-sky-800" },
      { label: "Epoxy mortar", cls: "bg-slate-100 text-slate-700" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "High load", cls: "bg-slate-100 text-slate-700" },
      { label: "ETA approved", cls: "bg-green-50 text-green-700" },
      { label: "National", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fischer FIS EM 390 S is a two-component epoxy mortar anchor system for high-load structural anchoring in solid masonry, hollow masonry, and concrete — suitable for remedial cavity wall tie installation. The thixotropic epoxy mortar provides good resistance to run-out in horizontal and overhead applications, and achieves high characteristic bond strengths in solid masonry substrates. ETA and ICC-ES approvals for a range of anchor configurations — load tables available for engineer calculation. Fischer provides technical software and specification support for anchoring calculations in compliance with AS 3700.",
    technicalProperties: [
      "Epoxy mortar two-part anchor system — Grade 316 stainless steel — AS 3700 / ETA approved",
      "Thixotropic epoxy mortar — suitable for horizontal and overhead applications without run-out",
      "High characteristic bond strengths in solid masonry — ETA published load tables",
      "Compatible with hollow masonry using mesh sleeve — confirm configuration for masonry type",
      "National distribution through Fischer specialist fixings network",
    ],
    limitations: [
      "Epoxy curing inhibited in wet substrates — confirm substrate moisture before specifying",
      "Hollow masonry requires mesh sleeve — confirm available anchor configuration for masonry type",
      "Minimum temperatures for curing — confirm with TDS for cold winter conditions",
      "Specialist distributor supply — confirm local availability with Fischer Australia",
    ],
    procurementSources: [
      { name: "Fischer Fixings Australia — national distribution through specialist fixings suppliers", url: "https://www.fischer.com.au" },
      { name: "Trade fixings suppliers — confirm FIS EM availability with local branch", url: "https://www.fischer.com.au" },
      { name: "Fischer website — local stockist and technical data", url: "https://www.fischer.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/solutions-products/products/sikadur.html",
    accentColor: "#b45309",
    name: "Sika AnchorFix-3+ Epoxy Anchor",
    descriptionLine: "Styrene-free two-part epoxy anchor adhesive — reduced odour — preferred for occupied building remediation — national branch supply",
    productType: "Epoxy Resin Anchor",
    filterTags: ["Sika", "Epoxy", "AnchorFix", "Resin-anchor", "Stainless-316", "High-load", "Styrene-free", "National", "AS-3700"],
    techChips: [
      { label: "AnchorFix-3+", cls: "bg-amber-100 text-amber-800" },
      { label: "Epoxy", cls: "bg-slate-100 text-slate-700" },
      { label: "Styrene-free", cls: "bg-green-50 text-green-700" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika", cls: "bg-amber-50 text-amber-700" },
      { label: "National", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika AnchorFix-3+ is a styrene-free, two-part epoxy anchor adhesive for structural post-installed anchoring in concrete and masonry — suitable for remedial cavity wall tie installation. The styrene-free formulation reduces odour and volatile emissions compared to standard vinylester resins, making it preferable for occupied building work. Suitable for dry and water-saturated substrates (confirmed as a variant in the Sika range) — confirm with current TDS for the specific AnchorFix variant before specifying. Sika provides full technical support and specification assistance through its national network.",
    technicalProperties: [
      "Styrene-free two-part epoxy anchor adhesive — Grade 316 stainless steel — AS 3700",
      "Styrene-free formulation — reduced odour and volatile emissions — preferred for occupied buildings",
      "Suitable for dry and water-saturated substrates — confirm variant suitability with Sika Australia",
      "National supply through Sika Australia branch network — Sydney, Melbourne, Brisbane, Perth, Adelaide",
      "Full technical support and specification assistance available nationally",
    ],
    limitations: [
      "Confirm the specific AnchorFix variant is approved for the intended masonry substrate — range includes multiple variants",
      "Temperature-dependent pot life — confirm open time for Australian summer site conditions",
      "Hole cleaning per Sika installation method is required — contaminated holes reduce published bond strength",
      "Sika AnchorFix products are intended for trained applicators — confirm installer capability before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — national branch network: Sydney, Melbourne, Brisbane, Perth, Adelaide, Darwin", url: "https://aus.sika.com" },
      { name: "Trade building suppliers — confirm AnchorFix-3+ stock with local branch", url: "https://aus.sika.com" },
      { name: "Sika website — nearest distributor and TDS download", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Helifix Australia",
    brandUrl: "https://www.helifix.com.au",
    tdsUrl: "https://www.helifix.com.au/products/epoxy-resin-ties",
    accentColor: "#7c3aed",
    name: "Helifix Epoxy Resin Anchor System",
    descriptionLine: "Grade 316 stainless tie with two-part epoxy resin — very high load — zero shrinkage — full system supply with published load data",
    productType: "Epoxy Resin Anchor",
    filterTags: ["Helifix", "Epoxy", "Resin-anchor", "Stainless-316", "Very-high-load", "National", "AS-3700", "Cavity-tie"],
    techChips: [
      { label: "Epoxy", cls: "bg-violet-100 text-violet-800" },
      { label: "316 SS", cls: "bg-slate-100 text-slate-700" },
      { label: "Very high load", cls: "bg-slate-100 text-slate-700" },
      { label: "Full system", cls: "bg-green-50 text-green-700" },
      { label: "Helifix", cls: "bg-violet-50 text-violet-700" },
      { label: "National", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Helifix epoxy resin anchor system uses a Grade 316 stainless tie installed into pre-drilled holes with two-part epoxy resin for very high-load cavity wall tie replacement in demanding applications. Epoxy provides zero shrinkage on curing and very high ultimate bond strength in dry masonry — specified for the most demanding load cases where vinylester is insufficient. Helifix supplies the full system including tie rods, resin, and installation tooling, with technical support for engineer specification. Load data is published for engineer AS 3700 calculations.",
    technicalProperties: [
      "Two-part epoxy resin — Grade 316 stainless steel tie rod — AS 3700 compliant",
      "Zero shrinkage on curing — very high ultimate bond strength in dry masonry",
      "Full system supply including tie rods, resin, and installation tooling",
      "Published load data for engineer AS 3700 calculations",
      "National distribution through Helifix-authorised remedial distributors",
    ],
    limitations: [
      "Epoxy curing inhibited in wet or saturated masonry — use vinylester in damp conditions",
      "Higher cost than vinylester — confirm with engineer whether epoxy load capacity is actually required",
      "Temperature-dependent pot life — significantly shorter in summer; check TDS before use",
      "Specialist distribution — not available from general hardware chains",
    ],
    procurementSources: [
      { name: "Helifix Australia — national distribution through authorised remedial distributors", url: "https://www.helifix.com.au" },
      { name: "Remedial building specialist suppliers — national", url: "https://www.helifix.com.au" },
      { name: "Helifix website — find nearest distributor", url: "https://www.helifix.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Hilti", label: "Hilti" },
  { id: "Fischer", label: "Fischer" },
  { id: "Sika", label: "Sika" },
  { id: "Helifix", label: "Helifix" },
  { id: "Epoxy", label: "Epoxy" },
  { id: "HIT-RE-500", label: "HIT-RE 500" },
  { id: "FIS-EM", label: "FIS EM" },
  { id: "AnchorFix", label: "AnchorFix" },
  { id: "Resin-anchor", label: "Resin anchor" },
  { id: "Stainless-316", label: "Stainless 316" },
  { id: "Very-high-load", label: "Very high load" },
  { id: "High-load", label: "High load" },
  { id: "National", label: "National supply" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "ETA-approved", label: "ETA approved" },
  { id: "Styrene-free", label: "Styrene-free" },
  { id: "Cavity-tie", label: "Cavity tie" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  resinType: string;
  wetOK: string;
  loadRating: string;
  loadData: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  { supplier: "Hilti Australia", product: "HIT-RE 500 V4", resinType: "Two-part epoxy", wetOK: "Damp (not saturated)", loadRating: "Very high", loadData: "ETA + PROFIS", keyFeature: "ETA approval + design software", primaryUse: "Engineer-specified high-load" },
  { supplier: "Fischer Fixings", product: "FIS EM 390 S", resinType: "Epoxy mortar", wetOK: "Dry preferred", loadRating: "High", loadData: "ETA published", keyFeature: "Thixotropic — overhead OK", primaryUse: "Solid and hollow masonry" },
  { supplier: "Sika Australia", product: "AnchorFix-3+", resinType: "Epoxy (styrene-free)", wetOK: "Yes (variant-dependent)", loadRating: "High", loadData: "Supplier published", keyFeature: "Styrene-free — occupied buildings", primaryUse: "Occupied building remediation" },
  { supplier: "Helifix Australia", product: "Helifix Epoxy System", resinType: "Two-part epoxy", wetOK: "Dry preferred", loadRating: "Very high", loadData: "Helifix published", keyFeature: "Full remedial tie system", primaryUse: "Very high-load cavity tie" },
];

const TECH_INFO = {
  typicalApplications: [
    "Very high-load cavity wall tie replacement in dry masonry substrates",
    "Engineer-specified applications requiring published ETA load data",
    "High-rise and commercial buildings with elevated wind loads",
    "Situations where zero shrinkage on curing is required",
  ],
  selectionCriteria: [
    "Specify epoxy over vinylester only where engineer confirms dry substrate and higher load requirement",
    "Use vinylester in damp or marine conditions — epoxy curing is inhibited by moisture",
    "Confirm ETA or ICC-ES approval for load table access",
    "Hole cleaning is critical for all epoxy anchor systems",
  ],
  limitations: [
    "Epoxy curing inhibited in wet/saturated holes — use vinylester for damp masonry",
    "Shorter pot life in summer than winter — confirm with TDS for site temperature",
    "Higher cost than vinylester",
    "Specialist distributor supply for most cavity tie system products",
  ],
  standardsNotes: [
    "AS 3700 Masonry Structures — structural tie requirements",
    "ETA (European Technical Assessment) provides characteristic resistance values for engineer calculation",
    "Engineer must confirm tie configuration for each project",
  ],
  suitableDefects: [
    "Failed cavity wall ties requiring higher load capacity than helical grout-in or vinylester systems",
    "Dry masonry substrates where maximum bond strength is required",
    "Engineer-specified applications with published load data requirement",
  ],
  typicalSubstrates: [
    "Dry clay brick masonry (most suitable for epoxy)",
    "Dense calcium silicate brick",
    "Concrete block masonry",
    "Not recommended for wet, saturated or persistently damp masonry",
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

export function EpoxyResinAnchorIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are epoxy resin anchor cavity wall tie systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Two-part epoxy adhesive anchor systems achieve the highest bond strengths of all resin anchor types — zero shrinkage on curing and maximum characteristic resistance values for engineer specification. Epoxy is suitable for dry masonry substrates and is specified for the most demanding load cases.
        </p>
        {expanded && (
          <>
            <p>
              In damp or persistently wet masonry, vinylester is preferred — epoxy curing is inhibited by moisture. Structural engineer specification is required for all epoxy resin anchor cavity tie installations, including confirmation of tie spacing, embedment depth, and load calculations per AS 3700.
            </p>
            <p>
              Hole preparation is critical for all epoxy anchor systems — the bore hole must be cleaned with a wire brush and blow-out pump to remove all dust and debris before resin injection. Contaminated holes will significantly reduce the published bond strength.
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

export function EpoxyResinAnchorProductSection() {
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
              <TechCard icon={<BookOpen size={15} />} title="Standards &amp; Notes" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — epoxy resin anchor cavity wall tie systems — scroll to view all</p>
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
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>
          )}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more</span>
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
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5"><p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p></div>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of epoxy resin anchor systems. Confirm all selections against current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Resin Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Wet OK</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Load Rating</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Load Data</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key Feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary Use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.resinType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.wetOK}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.loadRating}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.loadData}</td>
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
