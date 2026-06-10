"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "TPO-smooth" | "TPO-fleece"
  | "Fully-bonded" | "Loose-laid"
  | "Exposed" | "Trafficable"
  | "AS-4654" | "Heat-welded"
  | "Roof-deck" | "Balcony";

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
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardexaustralia.com",
    tdsUrl: "https://ardexaustralia.com/product/ardex-wpm-715/",
    accentColor: "#f97316",
    name: "ARDEX WPM 715",
    descriptionLine: "1.5mm smooth-face TPO heat-weldable roofing membrane — exposed roof decks and balconies — fully bonded or loose-laid",
    productType: "TPO sheet membrane — smooth face",
    filterTags: ["TPO-smooth", "Fully-bonded", "Loose-laid", "Exposed", "Trafficable", "AS-4654", "Heat-welded", "Roof-deck", "Balcony"],
    techChips: [
      { label: "TPO smooth face", cls: "bg-sky-100 text-sky-800" },
      { label: "1.5mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Fully bonded or loose-laid", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654.1", cls: "bg-amber-50 text-amber-700" },
      { label: "Dove grey / black", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "ARDEX WPM 715 is the primary smooth-face TPO sheet membrane in the ARDEX WeldTec range for exposed horizontal and vertical waterproofing applications on Australian roof decks, balconies, and utility platforms. It is installed as a single-layer system — either fully bonded to the substrate using ARDEX WA 98 contact adhesive or loose-laid with heat-welded perimeter upstands and edge restraint. Seams and laps between adjacent sheets are heat-welded using an approved hot-air welding unit with a minimum 40mm overlap. The membrane is UV-resistant and designed to remain exposed without ballast, tile, or growing medium above.\n\nOn Class 2 strata apartment buildings, WPM 715 is used for roof deck and upper balcony waterproofing remediation where the brief calls for a durable exposed single-ply membrane finish. The smooth face allows either bonded or loose-laid installation depending on substrate condition and moisture content. Critical installation rule: ARDEX WA 98 contact adhesive must not be applied to any area of membrane that will be seam-welded — adhesive-contaminated membrane cannot be heat-welded and the seam will fail.\n\nThe membrane is available in dove grey or black and complies with AS 4654.1. Roll dimensions are 1.4m wide × 20m long (53 kg per roll). ARDEX WPM 715 is confirmed stocked through ARDEX Australia direct, Bldcare, Waterproofing Direct, and The Waterproofing Shop.",
    technicalProperties: [
      "TPO (thermoplastic polyolefin) — plasticiser-free — UV-resistant — suitable for long-term direct UV exposure without ballast",
      "1.5mm nominal thickness — consistent membrane gauge across the roll",
      "AS 4654.1 compliant — confirmed on ardexaustralia.com product page",
      "Smooth face — suitable for fully bonded installation with ARDEX WA 98 or loose-laid with edge restraint",
      "Excellent resistance to heat, sunlight, ozone, and atmospheric pollution — suitable for all Australian climatic zones",
      "Excellent gas impermeability — confirmed resistant to geothermal gas including hydrogen sulphide and methane",
      "Service temperature range: -30°C to +80°C — confirmed on Australian trade product page (thewaterproofingshop.com.au)",
      "Available in dove grey or black — roll size 1.4m × 20m — 53 kg per roll — source: ardexaustralia.com",
    ],
    limitations: [
      "ARDEX WA 98 contact adhesive must NOT be applied over areas that will be heat-welded — adhesive-contaminated seam zones cannot be welded and seam will fail",
      "Heat welding requires an approved hot-air welding unit — no open-flame or cold bonding at seams — seam integrity is the primary waterproofing security",
      "Minimum 40mm overlap required at all side and end laps before heat welding — under-welded laps are the most common failure mode",
      "Smooth face loose-laid installation requires secure edge restraint, perimeter upstand welding, and penetration detailing — loose membrane not appropriate for high wind uplift zones without engineering confirmation",
      "Not a sub-tile or sub-screed membrane — designed for exposed applications only — do not cover with tile adhesive or screed without ARDEX confirmation",
      "Solvent-wipe membrane surface with approved solvent before heat welding all seams and laps — unwashed seams will not weld correctly",
      "Confirm current product specification, colour availability, and installation system details with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply direct — contact for current pricing", url: "https://www.ardexaustralia.com" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct (WPD Group)", url: "https://www.wpdgroup.com.au" },
      { name: "The Waterproofing Shop", url: "https://thewaterproofingshop.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardexaustralia.com",
    tdsUrl: "https://www.ardexaustralia.com/products_category/waterproofing-roofing-membranes/",
    accentColor: "#f97316",
    name: "ARDEX WPM 717",
    descriptionLine: "1.4mm fleece-backed TPO heat-weldable roofing membrane — fully bonded to substrate — roof decks and balconies",
    productType: "TPO sheet membrane — fleece-backed",
    filterTags: ["TPO-fleece", "Fully-bonded", "Exposed", "Trafficable", "AS-4654", "Heat-welded", "Roof-deck", "Balcony"],
    techChips: [
      { label: "TPO fleece-backed", cls: "bg-sky-100 text-sky-800" },
      { label: "1.4mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Fully bonded only", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654.1", cls: "bg-amber-50 text-amber-700" },
      { label: "Dove grey", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "ARDEX WPM 717 is the fleece-backed variant in the ARDEX WeldTec TPO range. The polyester fleece backing distinguishes it from WPM 715 in two ways: the fleece provides a ventilation layer that allows substrate moisture vapour to escape after installation, and it enables the membrane to be directly bonded to a wider range of substrates through the fleece rather than relying solely on contact adhesive to the smooth membrane face. The fleece-backed format is the preferred choice when substrate moisture content cannot be fully confirmed before installation, as the fleece backing allows any trapped moisture to migrate and disperse rather than blister the membrane face.\n\nIn Australian Class 2 strata roof deck remediation, WPM 717 is used where the substrate — concrete, plywood, or composite board — may retain elevated moisture or where the fully bonded installation must achieve strong adhesion to an irregular or variable surface. Like WPM 715, seams between adjacent rolls are heat-welded with an approved hot-air welding unit at minimum 40mm overlap. Solvent-wiping of the membrane surface is required before welding all laps. WPM 717 is a fully bonded system only — loose-laid installation is not appropriate with a fleece-backed membrane.\n\nThe membrane is available in dove grey and is confirmed stocked at 1.4m × 20m roll size through ARDEX Australia direct supply and Bldcare. Confirm current product pricing and availability directly with ARDEX Australia before ordering.",
    technicalProperties: [
      "TPO (thermoplastic polyolefin) — plasticiser-free — UV-resistant — designed for long-term direct UV exposure",
      "1.4mm nominal thickness — fleece-backed — consistent membrane construction",
      "Fleece backing provides substrate ventilation — allows moisture vapour to escape after installation — reduces blister risk on substrates with elevated moisture",
      "Fully bonded installation — fleece backing enables strong adhesion to concrete, plywood, insulation board, and composite substrates",
      "Excellent resistance to heat, sunlight, ozone, and atmospheric pollution",
      "Remains flexible at low temperatures — suitable for all Australian climatic zones",
      "Dove grey — roll size 1.4m × 20m",
    ],
    limitations: [
      "Fully bonded installation only — the fleece backing is not suitable for loose-laid installation — edge restraint and perimeter detailing differ from smooth-face loose-laid system",
      "Heat welding of all seams and laps is mandatory — approved hot-air welding unit required — no cold bonding at seams",
      "Minimum 40mm overlap at all side and end laps before welding",
      "Solvent-wipe membrane surface before welding all laps",
      "Available in dove grey only — black not available in fleece-backed variant — confirm colour availability with ARDEX Australia",
      "Not a sub-tile or sub-screed membrane — exposed application only — do not cover without ARDEX technical confirmation",
      "Confirm current product specification, substrate preparation requirements, and primer with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply direct — contact for current pricing", url: "https://www.ardexaustralia.com" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct (WPD Group)", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "TPO-smooth", label: "TPO smooth face" },
  { id: "TPO-fleece", label: "TPO fleece-backed" },
  { id: "Fully-bonded", label: "Fully bonded" },
  { id: "Loose-laid", label: "Loose-laid option" },
  { id: "Exposed", label: "Exposed / UV-resistant" },
  { id: "Trafficable", label: "Trafficable" },
  { id: "AS-4654", label: "AS 4654.1" },
  { id: "Heat-welded", label: "Heat-welded seams" },
  { id: "Roof-deck", label: "Roof deck" },
  { id: "Balcony", label: "Balcony" },
];

const COMPARISON_ROWS: {
  product: string;
  brand: string;
  material: string;
  thickness: string;
  face: string;
  installation: string;
  looseLaid: string;
  trafficable: string;
  as4654: string;
  keyRestriction: string;
}[] = [
  {
    product: "WPM 715",
    brand: "ARDEX",
    material: "TPO",
    thickness: "1.5mm",
    face: "Smooth",
    installation: "Fully bonded or loose-laid",
    looseLaid: "Yes",
    trafficable: "Yes (foot traffic)",
    as4654: "Yes — AS 4654.1",
    keyRestriction: "WA 98 must not overlap heat-weld seam zones",
  },
  {
    product: "WPM 717",
    brand: "ARDEX",
    material: "TPO",
    thickness: "1.4mm",
    face: "Fleece-backed",
    installation: "Fully bonded only",
    looseLaid: "No",
    trafficable: "Yes (foot traffic)",
    as4654: "Yes — AS 4654.1",
    keyRestriction: "Bonded only — no loose-laid — dove grey only",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Exposed roof deck waterproofing — single-ply exposed TPO membrane on concrete or composite roof structures",
    "Upper balcony waterproofing remediation — where exposed membrane finish replaces failed existing system",
    "Utility platform waterproofing — plant platforms, maintenance access decks, and service areas",
    "Podium slab waterproofing (exposed) — where finished surface is a trafficable exposed membrane",
    "Below-solar-panel waterproofing on flat roof structures — exposed membrane with solar panel framing above",
  ],
  selectionCriteria: [
    "WPM 715 (smooth face): select for fully bonded OR loose-laid installation — substrate moisture content confirmed low — bonded with ARDEX WA 98",
    "WPM 717 (fleece-backed): select for fully bonded installation where substrate moisture cannot be fully confirmed — fleece backing ventilates residual moisture",
    "Loose-laid installation (WPM 715 only): suitable for large roof areas where bonded installation is impractical — requires secure perimeter edge restraint and upstand heat-welding",
    "Confirm substrate type with ARDEX technical before specifying installation method — different substrates have different adhesive and preparation requirements",
    "Confirm wind uplift requirements with structural engineer for loose-laid applications — high wind zones may require mechanically fixed perimeter",
  ],
  limitations: [
    "ARDEX WA 98 contact adhesive must not be applied to any zone where heat-welded seams will be located — contaminated seams cannot be welded",
    "Heat welding of all seams mandatory — requires approved hot-air welding unit — no cold bonding at seams permitted",
    "Minimum 40mm overlap at all side and end laps — under-welded or insufficiently overlapped laps are the primary seam failure mode",
    "Solvent-wipe of membrane surface required before welding — unwashed membrane will not weld correctly",
    "Not a sub-tile or sub-screed system — do not cover membrane with tile adhesive, screed, or ballast without ARDEX Australia confirmation",
    "Not suitable for below-grade or permanently submerged applications — designed for exposed horizontal and vertical applications",
  ],
  standardsNotes: [
    "AS 4654.1 — Waterproofing of External Above-Ground Structures — both WPM 715 and WPM 717 confirmed compliant",
    "NCC Volume One — external above-ground waterproofing performance requirements in Class 2 buildings",
    "ARDEX Technical Bulletin TB272 — confirms maintenance inspection obligations for exposed WeldTec membranes",
    "Confirm current AS 4654.1 compliance status for the specified product variant with ARDEX Australia before specifying",
  ],
  suitableDefects: [
    "Failed existing roofing membrane on Class 2 strata roof decks — membrane blistering, seam failure, or delamination",
    "Failed balcony waterproofing where the brief calls for an exposed membrane finish without tile reinstatement",
    "Torch-on bitumen membrane replacement where a non-combustible single-ply system is preferred",
    "Aged EPDM or butynol membrane replacement on flat roof structures",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete roof slabs — primed per ARDEX requirements — confirm primer selection with ARDEX technical",
    "Plywood structural decking — confirm moisture content before application",
    "Insulation board (PIR/XPS) — confirm adhesion method and compatibility",
    "OSB (oriented strand board) — confirm surface preparation",
    "Composite cover board (CFC sheet) — confirm substrate compatibility with ARDEX",
    "Galvanised metal and Zincalume — confirm primer and adhesion requirements with ARDEX",
    "Polyurethane foam substrate — confirm adhesion compatibility with ARDEX technical",
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

export function TPOIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are TPO/FPO sheet membrane systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          TPO (thermoplastic polyolefin) and FPO (flexible polyolefin) sheet membranes are heat-weldable, plasticiser-free thermoplastic single-ply systems designed for direct UV exposure on roof decks, balconies, and utility platforms. Unlike PVC single-ply membranes that require ballast — pebble, pavers, or growing medium — to protect against UV degradation and plasticiser loss, TPO and FPO membranes are formulated for long-term direct exposure to Australian sunlight, heat, and weathering without any covering above. The plasticiser-free chemistry eliminates the plasticiser migration that limits the service life of PVC-based systems, and produces a membrane that maintains flexibility, weld strength, and UV resistance over time in exposed conditions.
        </p>
        {expanded && (
          <>
            <p>
              In Australian Class 2 strata apartment building remediation, TPO/FPO membranes are used on roof decks and upper balconies where the remediation brief calls for a trafficable exposed membrane finish — eliminating tile reinstatement, ballast, or growing medium. The membrane is installed as a single layer, either fully bonded to the substrate with ARDEX WA 98 contact adhesive or loose-laid with heat-welded perimeter upstands and edge restraint. Adjacent rolls are connected by heat-welded seams — a minimum 40mm overlap welded with an approved hot-air welding unit. The heat-welded seam is the waterproofing security of the system — cold bonding at seams is not acceptable, and contact adhesive must not be applied to any zone where seams will be welded.
            </p>
            <p>
              The primary TPO product range available through Australian stockists for Class 2 strata remediation is the ARDEX WeldTec range — specifically ARDEX WPM 715 (smooth face, 1.5mm, fully bonded or loose-laid) and ARDEX WPM 717 (fleece-backed, 1.4mm, fully bonded only). Both comply with AS 4654.1 for external above-ground waterproofing. Sika Sarnafil AT, an FPO membrane available internationally for mechanically fixed exposed roof applications, is not confirmed for Australian distribution at the time of publication — confirm current Australian availability with Sika Australia at aus.sika.com before specifying.
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

export function TPOProductSection() {
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
              Applications, WPM 715 vs WPM 717 selection, installation methods, standards, substrates and limitations
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
              <TechCard icon={<Ruler size={15} />} title="WPM 715 vs WPM 717 — Selection" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">2 products — 1 brand — ARDEX WeldTec TPO range — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
                    {product.techChips.filter((c) => c.label.toLowerCase().includes("warranty")).map((chip) => (
                      <span key={chip.label} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips.filter((c) => !c.label.toLowerCase().includes("warranty"))}
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

      {/* ── Comparison Table ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">TPO/FPO sheet membrane system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              ARDEX WeldTec range — confirmed Australian products only. Sika Sarnafil AT: confirm Australian availability with Sika Australia before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Face</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Installation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Loose-laid</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Trafficable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">AS 4654.1</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: "#f97316" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.face}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.installation}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.looseLaid}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.trafficable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.as4654}</td>
                  <td className="px-4 py-3 text-slate-500">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
