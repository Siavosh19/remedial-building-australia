"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Aluminium"
  | "Mill-finish"
  | "Pre-painted"
  | "Step-flashing"
  | "Wall-abutment"
  | "Capral"
  | "Metalcorp"
  | "Custom-fabricator";

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
    name: "Capral Aluminium Step Flashing",
    descriptionLine: "Capral aluminium sheet for site-formed step and soaker flashing — mill-finish or pre-anodised — AS 1562.1 compliant — lightweight, corrosion resistant, field paintable — wall-to-roof abutment flashings",
    productType: "Aluminium sheet step flashing — Capral — AS 1562.1",
    filterTags: ["Aluminium", "Mill-finish", "Pre-painted", "Step-flashing", "Wall-abutment", "Capral"],
    techChips: [
      { label: "Aluminium — lightweight", cls: "bg-sky-100 text-sky-800" },
      { label: "Mill-finish / anodised", cls: "bg-slate-100 text-slate-700" },
      { label: "Field paintable", cls: "bg-green-50 text-green-700" },
      { label: "AS 1562.1 compliant", cls: "bg-slate-100 text-slate-700" },
      { label: "Corrosion resistant", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Capral Aluminium is Australia's largest aluminium extrusion and rolling company and a primary source for aluminium sheet used in site-formed step and soaker flashing applications. Aluminium sheet for roofing flashing is available in mill-finish (natural silver) and various alloy specifications. The flashing material is cut and site-formed by the licensed roof plumber using a brake press or hand folder to match the required step profile and tile gauge. Mill-finish aluminium is paintable on site using a compatible metal primer and topcoat, allowing the flashing to be finished to match the existing roof colour or as specified by the strata committee. Aluminium is lighter than Colorbond steel and does not require a factory-painted coating — it relies on its natural oxide layer for corrosion resistance in standard residential environments. Dissimilar metal contact must be managed carefully: aluminium in direct contact with copper, lead, or copper-contaminated runoff will experience galvanic corrosion. Where copper roof elements or copper pipe penetrations are present, isolate the aluminium flashing with a non-absorbent separator tape or sleeve. Confirm minimum thickness, alloy specification, and fixing requirements with Capral and AS 1562.1 before ordering for roofing applications.",
    technicalProperties: [
      "Aluminium sheet — mill-finish or pre-anodised — lightweight — lighter than equivalent Colorbond steel flashing",
      "Natural oxide layer provides corrosion resistance in standard residential environments",
      "Field paintable — metal primer and topcoat on site — can be colour-matched to existing roof",
      "Site-formed by licensed roof plumber — brake press or hand folder — step profile matches tile gauge",
      "AS 1562.1 compliant — confirm minimum thickness and alloy specification with Capral before ordering",
      "Available in sheet and coil from Capral trade supply and aluminium merchants",
      "Widely distributed nationally — Capral trade supply centres and aluminium distributors",
    ],
    limitations: [
      "Dissimilar metal contact risk — aluminium must not be in direct contact with copper, lead, or copper-contaminated runoff — galvanic corrosion will result",
      "Mill-finish requires painting on site for colour matching — painting requires correct metal primer — do not apply non-primer latex paint direct to bare aluminium",
      "Not pre-painted from factory — colour durability depends on site paint quality and preparation",
      "Confirm minimum thickness for roofing applications with Capral and AS 1562.1 — thin aluminium sheet may be too compliant for correct step profile retention",
      "Stainless steel fixings required — do not use zinc-plated or copper fixings with aluminium flashing",
      "Confirm current alloy specification, thickness range, and availability with Capral trade supply before ordering",
    ],
    procurementSources: [
      { name: "Capral Aluminium — trade supply", url: "https://www.capral.com.au" },
      { name: "Metal Supermarkets", url: "https://www.metalsupermarkets.com.au" },
      { name: "Midalia Steel — aluminium section", url: "https://www.midalia.com.au" },
    ],
  },
  {
    fullLabel: "Metalcorp Group",
    brandUrl: "https://www.metalcorp.com.au",
    accentColor: "#16a34a",
    name: "Metalcorp Aluminium Step Flashing",
    descriptionLine: "Metalcorp aluminium sheet for site-formed step and soaker flashing — alternative national supply to Capral — mill-finish — AS 1562.1 — wall-to-roof abutment flashings on tiled pitched roofs",
    productType: "Aluminium sheet step flashing — Metalcorp — AS 1562.1",
    filterTags: ["Aluminium", "Mill-finish", "Step-flashing", "Wall-abutment", "Metalcorp"],
    techChips: [
      { label: "Aluminium sheet", cls: "bg-green-100 text-green-800" },
      { label: "Metalcorp supply", cls: "bg-slate-100 text-slate-700" },
      { label: "National distribution", cls: "bg-green-50 text-green-700" },
      { label: "AS 1562.1 compliant", cls: "bg-slate-100 text-slate-700" },
      { label: "Mill-finish", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Metalcorp Group is a major Australian steel and metals distributor providing aluminium sheet as an alternative supply channel to Capral for site-formed step and soaker flashing. Metalcorp carries aluminium sheet in a range of thicknesses and alloys from national distribution centres and regional branches, making it a practical supply option for roof plumbers working in areas where Capral direct supply may not be available or competitive. The forming method, AS 1562.1 compliance requirements, dissimilar metal precautions, and painting requirements for Metalcorp aluminium sheet are identical to Capral — the material is aluminium sheet regardless of the supply source. Confirm the specific alloy, temper, and thickness with Metalcorp before ordering for roofing flashing applications — not all aluminium sheet alloys and tempers are equally suitable for brake pressing and field forming. The 3003 alloy (common aluminium sheet alloy) is generally suitable for formed flashing applications — confirm with Metalcorp technical before ordering.",
    technicalProperties: [
      "Aluminium sheet — alternative supply channel to Capral — Metalcorp national distribution network",
      "Mill-finish — natural oxide layer corrosion resistance",
      "Available in a range of thicknesses and alloys — confirm alloy and temper for brake press forming with Metalcorp",
      "Same forming, fixing, and dissimilar metal requirements as Capral aluminium sheet",
      "Field paintable with metal primer and compatible topcoat",
      "National distribution — confirm regional stock and availability with Metalcorp before ordering",
    ],
    limitations: [
      "Confirm alloy and temper specification with Metalcorp for roofing flashing applications — not all aluminium alloys are equally suitable for brake press forming",
      "Same dissimilar metal contact risk as Capral — do not allow aluminium contact with copper, lead, or copper-contaminated runoff",
      "Stainless steel fixings required — do not use zinc-plated or copper fixings",
      "Field painting required for colour matching — metal primer essential before topcoat application",
      "Confirm current alloy, thickness range, and regional availability with Metalcorp before ordering",
    ],
    procurementSources: [
      { name: "Metalcorp Group — trade supply", url: "https://www.metalcorp.com.au" },
      { name: "Metal Supermarkets", url: "https://www.metalsupermarkets.com.au" },
    ],
  },
  {
    fullLabel: "Custom aluminium fabricator — confirm with supplier",
    brandUrl: "",
    accentColor: "#475569",
    name: "Custom-Fabricated Aluminium Step Flashing",
    descriptionLine: "Custom-fabricated aluminium step flashing from a local metal fabricator — site-specific profiles — non-standard tile gauges or wall profiles — mill-finish or pre-painted to specification — AS 1562.1",
    productType: "Custom aluminium step flashing — fabricated to specification — AS 1562.1",
    filterTags: ["Aluminium", "Mill-finish", "Pre-painted", "Step-flashing", "Wall-abutment", "Custom-fabricator"],
    techChips: [
      { label: "Custom fabricated", cls: "bg-slate-100 text-slate-700" },
      { label: "Site-specific profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-standard gauges", cls: "bg-amber-50 text-amber-700" },
      { label: "Pre-painted option", cls: "bg-green-50 text-green-700" },
      { label: "AS 1562.1 compliant", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Where a standard aluminium sheet supply and site-forming process does not suit the project — for example, where the tile gauge is non-standard, the wall profile requires a complex step profile, or a large volume of pre-formed flashings is required for a major strata building remediation — a custom aluminium fabricator can supply pre-formed step and soaker flashings to a specific profile and dimension. Custom fabrication allows the flashing to be formed in a factory environment to a tighter dimensional tolerance than site-forming, and pre-painted or powder-coated finishes can be specified to match or complement the existing roof colour without site painting. The fabricator will require a profile drawing or site dimension for each flashing type — step height, upstand length, soaker length, and any special bends. AS 1562.1 minimum dimensions still apply — the fabricator must be briefed on the standard requirements before fabrication. Lead time, minimum order quantity, and finish options vary by fabricator — confirm all with the selected fabricator before specifying. For standard residential remediation with a small number of flashings, site-forming from Capral or Metalcorp sheet is usually more practical than custom fabrication.",
    technicalProperties: [
      "Custom-fabricated to project-specific profile and dimensions — factory forming to tighter dimensional tolerance than site-forming",
      "Aluminium alloy and thickness to be specified — confirm alloy and temper with fabricator for roofing flashing applications",
      "Pre-painted or powder-coated finish options — colour-match or contrasting colour to specification",
      "AS 1562.1 compliant — minimum upstand, step height, and soaker dimensions must be specified to fabricator",
      "Suitable for non-standard tile gauges, complex wall profiles, or large volume strata remediation projects",
      "Lead time and minimum order quantities vary by fabricator — confirm before specifying",
    ],
    limitations: [
      "Lead time — custom fabrication requires lead time that may not suit urgent remediation programmes — confirm with fabricator before specifying",
      "Minimum order quantities may apply — not practical for small single-dwelling repairs",
      "Fabricator must be briefed on AS 1562.1 requirements — do not assume the fabricator knows roofing flashing standards",
      "Same dissimilar metal contact precautions apply as for site-formed aluminium flashings",
      "Quality of pre-painted finish depends on fabricator's paint system and pre-treatment — confirm paint specification and warranty before ordering",
      "Confirm profile drawings and dimensions with roof plumber before issuing to fabricator",
    ],
    procurementSources: [
      { name: "Local sheet metal fabricators — confirm with supplier", url: "" },
      { name: "Capral Aluminium — trade supply for sheet supply to fabricators", url: "https://www.capral.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Aluminium", label: "Aluminium" },
  { id: "Mill-finish", label: "Mill-finish" },
  { id: "Pre-painted", label: "Pre-painted" },
  { id: "Step-flashing", label: "Step flashing" },
  { id: "Wall-abutment", label: "Wall abutment" },
  { id: "Capral", label: "Capral" },
  { id: "Metalcorp", label: "Metalcorp" },
  { id: "Custom-fabricator", label: "Custom fabricator" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  finish: string;
  forming: string;
  dissimilarMetal: string;
  standard: string;
  primaryUse: string;
}[] = [
  {
    product: "Aluminium Step Flashing",
    brand: "Capral",
    material: "Aluminium sheet",
    finish: "Mill-finish — field paintable",
    forming: "Site-formed by roof plumber",
    dissimilarMetal: "Isolate from copper and lead",
    standard: "AS 1562.1",
    primaryUse: "Standard step and soaker flashing — wall-to-roof abutment — tiled pitched roofs",
  },
  {
    product: "Aluminium Step Flashing",
    brand: "Metalcorp",
    material: "Aluminium sheet",
    finish: "Mill-finish — field paintable",
    forming: "Site-formed by roof plumber",
    dissimilarMetal: "Isolate from copper and lead",
    standard: "AS 1562.1",
    primaryUse: "Standard step and soaker flashing — alternative supply channel to Capral",
  },
  {
    product: "Custom-Fabricated Aluminium",
    brand: "Local fabricator",
    material: "Aluminium alloy — to specification",
    finish: "Mill-finish, pre-painted, or powder-coated",
    forming: "Factory-formed to profile drawing",
    dissimilarMetal: "Isolate from copper and lead",
    standard: "AS 1562.1",
    primaryUse: "Non-standard profiles, large-volume strata remediations, or pre-painted requirements",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Step flashing repair at brick veneer wall-to-roof abutment where existing aluminium flashings have corroded or deformed",
    "New aluminium step flashing installation where Colorbond steel is not preferred or specified",
    "Strata building large-scale roof remediation where custom-fabricated pre-painted aluminium flashings are specified for colour consistency",
    "Step flashing at parapet-to-roof junction on Class 2 apartment buildings",
    "Replacement of deteriorated aluminium step flashings on residential dwellings",
  ],
  selectionCriteria: [
    "Dissimilar metal check — confirm no copper or lead elements in contact with aluminium flashing — isolate where copper pipe penetrations or lead flashings are present",
    "Thickness — confirm minimum thickness per AS 1562.1 and tile manufacturer — typically 0.7–0.9mm for aluminium step flashing",
    "Alloy — confirm alloy and temper suitable for brake press forming with supplier — 3003 alloy is commonly used for formed flashing",
    "Finish — mill-finish requires site painting for colour matching — custom fabrication allows pre-painted or powder-coated finish",
    "Step height and tile gauge — forming must match tile gauge — confirm with tile manufacturer installation guide",
    "Fixing — stainless steel fixings mandatory — do not use zinc-plated or copper fixings with aluminium",
  ],
  limitations: [
    "Not suitable where copper pipe penetrations or copper elements create direct contact with aluminium flashing — galvanic corrosion will occur",
    "Mill-finish aluminium is not pre-painted — site painting required for colour matching — requires correct metal primer",
    "Lighter than Colorbond steel — may require closer fixing spacings in high wind areas — confirm with AS 1562.1 and local wind loading requirements",
    "Not suitable for heritage buildings where lead flashing is specified",
    "Custom fabrication requires lead time — not suitable for urgent single-dwelling repairs where site-forming is faster",
  ],
  standardsNotes: [
    "AS 1562.1 — Design and Installation of Sheet Roof and Wall Cladding — Metal — minimum upstand, lap, and fixing requirements",
    "AS/NZS 1734 — Aluminium and Aluminium Alloys — Flat Sheet, Coiled Sheet, and Plate — confirm alloy specification",
    "Tile manufacturer installation guides — step height and soaker dimensions must comply with the specific tile manufacturer's requirements",
    "NCC — wind loading and weather resistance requirements for roofing in Class 1 and Class 2 buildings",
  ],
  suitableDefects: [
    "Flashing failures — step flashing at wall-to-roof abutment — failed, corroded, or deformed aluminium flashings causing roof leaks",
    "Roof leaks — pitched tiled roof — where step flashing failure is the identified cause of water ingress",
    "Strata building roof remediation — aluminium step flashing at parapet or wall abutment failure",
  ],
  typicalSubstrates: [
    "Brick veneer external wall — standard wall construction for step flashing at parapet or wall junction",
    "Rendered masonry — confirm counter-flashing or cap flashing detail at top of step flashing upstand",
    "Fibre cement cladding — confirm fixing and sealing requirements at wall-flashing junction",
    "Tiled pitched roof — all standard tile profiles — terracotta, concrete",
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
        Confirm suitability with the current supplier data before specifying or applying.
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
      <p
        className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}
      >
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

export function StepFlashingAluminiumFFIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are aluminium step flashing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Aluminium step flashings are site-formed metal flashings that seat under successive tile courses and lap up a wall or parapet face at a stepped wall-to-roof abutment junction. Aluminium is an alternative material to Colorbond steel for step flashing — lighter, naturally corrosion-resistant through its oxide layer, and field-paintable without a factory-applied coating.
        </p>
        {expanded && (
          <>
            <p>
              Aluminium step flashings are common in areas where Colorbond steel is not preferred or where a natural or painted metal finish is specified. Aluminium is more malleable than steel and can be site-formed with less force, which may be an advantage on complex profiles. The key design precaution for aluminium step flashings is dissimilar metal contact — aluminium in direct or indirect contact with copper or lead will experience galvanic corrosion. Where copper pipe penetrations or lead counter-flashings are present, an isolating sleeve or non-absorbent separator must be used.
            </p>
            <p>
              Mill-finish aluminium requires site painting for colour matching. A metal-compatible primer must be applied before any topcoat — bare aluminium does not provide adequate adhesion for most standard latex or oil-based paints without a primer. Confirm the primer and paint system with the paint manufacturer before application.
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

export function StepFlashingAluminiumFFProductSection() {
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
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — aluminium step flashing systems only — scroll to view all</p>
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
                      {product.brandUrl && (
                        <a
                          href={product.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
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
              Side-by-side comparison of aluminium step flashing systems. Confirm all product selections against current supplier data before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Forming method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Dissimilar metal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600">{row.forming}</td>
                  <td className="px-4 py-3 text-slate-600">{row.dissimilarMetal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.standard}</td>
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
