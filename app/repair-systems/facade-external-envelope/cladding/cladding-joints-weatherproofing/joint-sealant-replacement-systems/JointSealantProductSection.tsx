"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Silicone"
  | "Polyurethane"
  | "MS-polymer"
  | "Neutral-cure"
  | "Acetoxy-cure"
  | "Movement-grade"
  | "Paintable"
  | "Non-sag"
  | "Coastal"
  | "UV-stable"
  | "Facade"
  | "High-movement"
  | "Toolable";

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
    brandUrl: "https://www.sika.com.au/",
    accentColor: "#b45309",
    name: "Sika Sikaflex 11FC+ Neutral-Cure Polyurethane Facade Sealant",
    descriptionLine: "1-component neutral-cure polyurethane facade sealant — ISO 11600 Class 25LM — paintable after cure — UV stable — non-sag",
    productType: "Polyurethane facade joint sealant — Class 25LM — paintable",
    filterTags: ["Polyurethane", "Neutral-cure", "Movement-grade", "Paintable", "Facade", "High-movement", "UV-stable", "Toolable", "Non-sag"],
    techChips: [
      { label: "Class 25LM — ISO 11600", cls: "bg-amber-100 text-amber-800" },
      { label: "Paintable After Cure", cls: "bg-green-100 text-green-700" },
      { label: "Neutral Cure", cls: "bg-slate-100 text-slate-700" },
      { label: "UV Stable", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Sika 11FC+ is a 1-component polyurethane facade joint sealant with Class 25LM movement capacity (±25% of joint width) — the minimum class for facade movement joints per industry practice. Neutral-cure formulation is safe on all substrate types including natural stone, anodised aluminium, and polycarbonate — unlike acetoxy-cure silicone which releases acetic acid on cure and can corrode metals. The sealant is paintable after full cure (typically 7 days at 23°C) — important for facades where the sealant joint must match surrounding painted surfaces. UV-stable formulation with 20+ year outdoor service life. Backer rod is mandatory for all joints exceeding 10 mm depth.",
    technicalProperties: [
      "Sealant type: 1-component polyurethane — neutral cure — no acetic acid release",
      "Movement class: ISO 11600 Class F/EX 25LM — ±25% of joint width",
      "Tack-free time: 40 min at 23°C — full cure: 7 days at 23°C",
      "Shore A hardness: 40 — elongation at break: > 300%",
      "Paintable: yes — after full cure — compatible with most exterior paints",
      "UV-stable formulation — 20+ year outdoor service life in Australian conditions",
    ],
    limitations: [
      "Must not be applied to wet or damp substrates — minimum 48 hr surface dryness required",
      "Joint width must be 6–50 mm — outside this range performance cannot be guaranteed",
      "Backer rod is mandatory for joints deeper than 10 mm — controls depth-to-width ratio",
      "Do not apply below 5°C or above 40°C ambient temperature",
      "Painted surfaces must be sanded before sealant application — paint adhesion is unreliable",
    ],
    procurementSources: [
      { name: "Sika Australia — national branches and trade", url: "https://www.sika.com.au/" },
      { name: "Bunnings / trade suppliers", url: "https://www.bunnings.com.au/" },
    ],
  },
  {
    fullLabel: "Tremco / Bostik",
    brandUrl: "https://www.tremco.com.au/",
    accentColor: "#0369a1",
    name: "Tremco Spectrem 2 Neutral-Cure Silicone — Structural Glazing and Facade",
    descriptionLine: "High-performance 1-component neutral-cure silicone — ISO 11600 Class 25LM — structural glazing certification — UV stable 25+ year",
    productType: "High-performance neutral-cure silicone — Class 25LM — structural glazing",
    filterTags: ["Silicone", "Neutral-cure", "Movement-grade", "Facade", "High-movement", "UV-stable", "Non-sag"],
    techChips: [
      { label: "Neutral-Cure Silicone", cls: "bg-sky-100 text-sky-800" },
      { label: "Class 25LM — ISO 11600", cls: "bg-slate-100 text-slate-700" },
      { label: "Structural Glazing Grade", cls: "bg-amber-100 text-amber-800" },
      { label: "UV Stable — 25+ Yr", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Tremco Spectrem 2 is a premium 1-component neutral-cure silicone sealant with structural glazing certification — used for both facade joint sealing and structural glazing applications where a single product must satisfy both weatherproofing and structural load transfer requirements. The neutral-cure chemistry is non-corrosive to aluminium, stainless steel, and anodised surfaces. UV-stable silicone chemistry provides 25+ year outdoor service life without significant hardening or chalking. Commonly specified for curtain wall joints, aluminium panel junctions, and ACP panel replacements requiring structural sealant adhesion.",
    technicalProperties: [
      "Sealant type: 1-component neutral-cure silicone — non-corrosive to all metal substrates",
      "Movement class: ISO 11600 Class F/EX 25LM — ±25% movement capacity",
      "Shore A hardness: 32 — elongation at break: > 400% — tensile strength: 0.9 MPa",
      "Structural glazing: AS 4285 compliant — accepted by certifiers for structural glazing",
      "Service life: 25+ years outdoor UV-exposed — no significant hardening or chalking",
      "Colour range: black, grey, bronze, white, custom — confirm availability with supplier",
    ],
    limitations: [
      "Not paintable — silicone chemistry does not accept paint — specify polyurethane or MS polymer where painting required",
      "Substrate must be primed on porous surfaces — FC sheet, concrete, masonry — confirm primer with Tremco",
      "Cost premium over polyurethane sealants — justify against structural glazing or high-performance requirements",
      "Positive surface temperature required for application — minimum +5°C ambient",
      "Full structural cure: 21 days at 23°C before structural load application — cannot be accelerated",
    ],
    procurementSources: [
      { name: "Tremco Australia — national", url: "https://www.tremco.com.au/" },
      { name: "Bostik Australia — trade supply", url: "https://www.bostik.com/au/" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au/",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products-detail/mapesil-ac",
    accentColor: "#7c3aed",
    name: "Mapei Mapesil AC Anti-Mould Neutral Silicone — Coastal and Humid Facades",
    descriptionLine: "Anti-mould neutral-cure silicone — ISO 11600 Class 20LM — 40+ colour range — coastal and humid zone facade joints",
    productType: "Anti-mould neutral-cure silicone — Class 20LM — coastal facade joints",
    filterTags: ["Silicone", "Neutral-cure", "Facade", "UV-stable", "Coastal", "Non-sag", "Toolable"],
    techChips: [
      { label: "Anti-Mould Formulation", cls: "bg-purple-100 text-purple-800" },
      { label: "Neutral-Cure Silicone", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal Zone Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "40+ Colour Range", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Mapei Mapesil AC incorporates an anti-mould agent that prevents fungal growth on the sealant surface — a critical requirement in humid and coastal Australian environments where silicone joints on exposed facade elements can develop visible mould within 2–3 years of application. Neutral-cure formulation is compatible with all substrate types. The wide colour range (40+ colours) allows colour-matching to adjacent panel or paint finishes. Suitable for all facade joint applications up to Class F/EX 20LM movement capacity — not a structural sealant and not suitable for high-movement joints requiring Class 25LM.",
    technicalProperties: [
      "Sealant type: 1-component neutral-cure silicone with anti-mould additive",
      "Movement class: ISO 11600 Class F/EX 20LM — ±20% of joint width",
      "Anti-mould: EN 846 method 9 tested — prevents fungal growth on sealant surface",
      "Shore A hardness: 22 — tack-free: 30 min at 23°C — full cure: 5–7 days",
      "Colour range: 40+ standard colours — confirm availability and match with supplier",
      "UV stable — no yellowing on cure — suitable for exposed facade joints",
    ],
    limitations: [
      "Class 20LM — not suitable for high-movement structural or primary facade movement joints — use Class 25LM",
      "Anti-mould additive dissipates over time — eventually mould will grow on aged sealant surface",
      "Not paintable — silicone chemistry does not accept paint",
      "Substrate must be clean, dry, and primed on porous substrates — confirm primer requirement",
      "Application temperature: 5°C to 40°C — do not apply outside this range",
    ],
    procurementSources: [
      { name: "Mapei Australia — national distributors", url: "https://www.mapei.com/au/" },
      { name: "Beaumont Tiles / trade suppliers", url: "https://www.beaumont-tiles.com.au/" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://www.sika.com.au/",
    accentColor: "#b45309",
    name: "Sika MS Polymer Facade Sealant — Paintable Low-Movement Joints",
    descriptionLine: "1-component MS polymer sealant — paintable, low-odour, isocyanate-free — ISO 11600 Class 12.5 — bonds most facade substrates without primer",
    productType: "MS polymer facade sealant — Class 12.5 — paintable — low movement",
    filterTags: ["MS-polymer", "Neutral-cure", "Paintable", "Facade", "UV-stable", "Toolable"],
    techChips: [
      { label: "MS Polymer — Paintable", cls: "bg-amber-100 text-amber-800" },
      { label: "Isocyanate-Free", cls: "bg-green-100 text-green-700" },
      { label: "Bonds Most Substrates", cls: "bg-slate-100 text-slate-700" },
      { label: "Class F/EX 12.5", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Modified silicone polymer (MS polymer) sealants combine the paintability of polyurethane with the UV stability of silicone — addressing the key limitation of each. Suitable for facade joints where the sealant surface must be painted to match adjacent surfaces. Isocyanate-free formulation produces no toxic vapours during application — safer for enclosed or poorly ventilated areas. The adhesion to most building substrates (FC, concrete, aluminium, timber, steel) without primer makes it versatile for remediation where substrate conditions vary. Class F/EX 12.5 — suitable for thermal movement joints but not for structural or primary facade movement joints requiring 25LM.",
    technicalProperties: [
      "Sealant type: 1-component MS polymer (modified silicone) — isocyanate-free",
      "Movement class: ISO 11600 Class F/EX 12.5 — ±12.5% of joint width",
      "Paintable: within 24–48 hr of application before full cure — confirm paint compatibility",
      "Tack-free: 60 min at 23°C — full cure: 7 days at 23°C",
      "Shore A hardness: 35 — primer: not required on most substrates",
      "UV stability: good — slight colour shift possible after 5–10 years on exposed joints",
    ],
    limitations: [
      "Class 12.5 only — not for high-movement structural or primary facade movement joints — use 25LM",
      "Must be painted before full cure — if painting is delayed, adhesion to paint is unreliable",
      "Slightly lower UV stability than silicone — colour shift possible on long-term exposed joints",
      "Not suitable for structural glazing or load-bearing adhesive applications",
      "Tooling window shorter than silicone — must be tooled within 10–15 min of application",
    ],
    procurementSources: [
      { name: "Sika Australia — national branches and trade", url: "https://www.sika.com.au/" },
      { name: "Bostik Seal N Flex — trade supply", url: "https://www.bostik.com/au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Silicone", label: "Silicone" },
  { id: "Polyurethane", label: "Polyurethane" },
  { id: "MS-polymer", label: "MS Polymer" },
  { id: "Neutral-cure", label: "Neutral Cure" },
  { id: "Acetoxy-cure", label: "Acetoxy Cure" },
  { id: "Movement-grade", label: "Movement Grade" },
  { id: "Paintable", label: "Paintable" },
  { id: "Non-sag", label: "Non-Sag" },
  { id: "Coastal", label: "Coastal Rated" },
  { id: "UV-stable", label: "UV Stable" },
  { id: "Facade", label: "Facade Grade" },
  { id: "High-movement", label: "High Movement" },
  { id: "Toolable", label: "Toolable" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  sealantType: string;
  movementClass: string;
  paintable: string;
  antiMould: string;
  uvStability: string;
  primaryUse: string;
}[] = [
  {
    product: "Sika 11FC+ Polyurethane",
    brand: "Sika Australia",
    sealantType: "1-component polyurethane",
    movementClass: "Class 25LM",
    paintable: "Yes — after cure",
    antiMould: "No",
    uvStability: "Good — 20+ years",
    primaryUse: "Facade movement joints — paintable surface required",
  },
  {
    product: "Tremco Spectrem 2 Silicone",
    brand: "Tremco / Bostik",
    sealantType: "1-component neutral silicone",
    movementClass: "Class 25LM",
    paintable: "No",
    antiMould: "No",
    uvStability: "Excellent — 25+ years",
    primaryUse: "Structural glazing and facade seals",
  },
  {
    product: "Mapei Mapesil AC Silicone",
    brand: "Mapei Australia",
    sealantType: "1-component neutral silicone",
    movementClass: "Class 20LM",
    paintable: "No",
    antiMould: "Yes",
    uvStability: "Excellent",
    primaryUse: "Humid and coastal — anti-mould facade joints",
  },
  {
    product: "Sika MS Polymer",
    brand: "Sika Australia",
    sealantType: "1-component MS polymer",
    movementClass: "Class 12.5",
    paintable: "Yes — before cure",
    antiMould: "No",
    uvStability: "Good",
    primaryUse: "Low-movement — paintable joints — versatile substrate",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Facade panel-to-panel joints in all cladding systems — primary sealant line",
    "Expansion joints and movement joints in cladding and flashing systems",
    "Window and door frame perimeter sealing in remediated and new facades",
    "Flashing-to-panel and flashing-to-substrate lap sealing",
    "Aluminium extrusion end dams and internal joint sealing",
    "Cladding corner, edge, and base detail sealing",
  ],
  selectionCriteria: [
    "High-movement facade joint (> 12% movement): Class 25LM polyurethane or neutral silicone",
    "Paintable joint: MS polymer or polyurethane — silicone does not accept paint",
    "UV-exposed joint: neutral-cure silicone or MS polymer — best long-term UV stability",
    "Anti-mould requirement: Mapesil AC or equivalent anti-mould silicone — coastal humid zones",
    "Structural glazing: Tremco Spectrem 2 or equivalent structural silicone — AS 4285",
    "Low-movement detail joint: MS polymer — versatile substrate adhesion without primer",
  ],
  limitations: [
    "Joint width must be 6–50 mm — tooling a joint narrower than 6 mm will fail prematurely",
    "Backer rod mandatory for all joints exceeding 10 mm depth — controls back-bond and depth",
    "Substrates must be clean, dry, and primed where required — oil, dust, and water cause adhesion failure",
    "Silicone is not paintable — specify polyurethane or MS polymer where painting is required",
    "Acetoxy-cure silicone releases acetic acid on cure — corrodes aluminium and metals — never use on facades",
    "All sealants have a service life — Class 25LM sealants typically 15–25 years before replacement",
  ],
  standardsNotes: [
    "ISO 11600: building construction — jointing products — classification and requirements",
    "AS 4284: testing of building facades — water penetration under dynamic pressure",
    "AS/NZS 4657: specification for sealants for use in buildings",
    "AS 3700: masonry structures — sealant requirements at masonry joints",
    "NCC 2022 Part F1: weatherproofing — joint sealant requirements for facades",
    "Sika / Tremco facade joint design guides — substrate preparation and primer requirements",
  ],
  suitableDefects: [
    "Failed or cracked facade joint sealant — cohesive failure within sealant body",
    "Adhesion failure of sealant to one or both substrates — surface preparation failure",
    "Mould growth on facade silicone joints — replace with anti-mould formulation",
    "Structural movement joint failure — replace with correct Class 25LM movement sealant",
    "ACP remediation — all new joints in replacement cladding system require new sealant schedule",
    "Window and door perimeter sealing — failed acetoxy-cure replaced with neutral-cure",
  ],
  typicalSubstrates: [
    "FC sheet and FC panel: neutral-cure silicone or polyurethane — primer optional on FC",
    "Anodised aluminium flashings: neutral-cure silicone — primer required for adhesion",
    "Concrete: neutral-cure silicone or polyurethane — primer recommended on porous concrete",
    "Masonry and brick: polyurethane or MS polymer — primer on porous substrate mandatory",
    "Stainless steel: neutral-cure silicone — clean surface, no primer usually required",
    "Aluminium window frames: neutral-cure silicone — never use acetoxy-cure on aluminium",
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

export function JointSealantIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are joint sealant replacement systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Joint sealants are the most frequently replaced element in cladding maintenance — typically requiring replacement every 15–25 years depending on product class, exposure, and joint geometry. Correct selection of sealant chemistry, movement class, and substrate preparation determines whether the replacement will achieve its design life.
        </p>
        {expanded && (
          <>
            <p>
              The ISO 11600 classification system (Class 12.5, 20, 25, 35, 50 — with LM/HM modifier) defines the maximum elastic movement the sealant joint can accommodate as a percentage of the original joint width. Facade expansion joints in concrete-framed buildings typically experience 15–25% movement — requiring Class 25LM as a minimum. Selecting a lower-class sealant for a high-movement joint is the most common cause of premature sealant failure.
            </p>
            <p>
              Never use acetoxy-cure silicone (the type that smells of vinegar during curing) on metal facades. The acetic acid released during cure attacks aluminium anodising, stainless passivation, and silicone primers — leading to adhesion loss within 1–2 years. Always specify neutral-cure silicone or polyurethane for all facade applications.
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

export function JointSealantProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — joint sealant replacement — scroll to view all</p>
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
              Side-by-side comparison of joint sealant replacement systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Move. class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Paintable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Anti-mould</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">UV stability</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.sealantType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.movementClass}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.paintable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.antiMould}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.uvStability}</td>
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
