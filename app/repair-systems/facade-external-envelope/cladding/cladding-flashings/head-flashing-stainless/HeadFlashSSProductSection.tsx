"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "SS-316"
  | "Head-flashing"
  | "Stainless"
  | "Custom-folded"
  | "Coastal"
  | "Marine-zone"
  | "Non-combustible"
  | "Engineer-required"
  | "Factory-folded"
  | "Site-folded"
  | "Drip-edge"
  | "Anti-capillary";

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
    fullLabel: "Metroll / Steel & Tube",
    brandUrl: "https://www.metroll.com.au/",
    tdsUrl: "https://www.metroll.com.au/products/steel-roofing-and-cladding/",
    accentColor: "#b45309",
    name: "SS316 Factory-Folded Head Flashing",
    descriptionLine: "Custom-folded 316L SS head flashing — marine zone and long-life coastal — anti-capillary groove — 50+ year service",
    productType: "Factory-Folded Head Flashing — SS316",
    filterTags: ["SS-316", "Head-flashing", "Stainless", "Custom-folded", "Coastal", "Marine-zone", "Non-combustible", "Factory-folded", "Anti-capillary"],
    techChips: [
      { label: "316L Stainless — Marine Zone", cls: "bg-amber-100 text-amber-800" },
      { label: "Factory CNC Folded", cls: "bg-slate-100 text-slate-700" },
      { label: "Anti-capillary Groove", cls: "bg-stone-100 text-stone-700" },
      { label: "50+ Year Service Life", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "316L stainless steel head flashings are factory-folded to the project-specific profile using CNC press-brake equipment. The 316L grade (low carbon, 2–3% molybdenum) provides superior pitting corrosion resistance in marine chloride environments — mandatory within 200 m of marine water and recommended within 1 km. Anti-capillary grooves are folded into the flashing nose to prevent water tracking back behind the flashing by capillary action. Factory folding ensures consistent geometry and eliminates site-folding distortion. Suitable for all cladding head flashings in NCC 2022 compliant facade systems.",
    technicalProperties: [
      "Material: 316L stainless steel — 1.5 mm or 2.0 mm",
      "CNC press-brake factory folded — custom profile",
      "Anti-capillary groove: 3 mm return at nose",
      "Surface: mill finish or brushed (2B or BA)",
      "Max single length: 3,000 mm (transport limited)",
      "Thermal expansion: 16 × 10⁻⁶/°C — joints required; welded end caps: full penetration TIG weld; service life: 50+ years",
    ],
    limitations: [
      "Highest cost option — specify only where marine corrosion is confirmed risk",
      "Factory folding requires shop drawings — lead time 3–6 weeks",
      "Thermal expansion at joints must be detailed — 1.5 mm/metre per 50°C delta",
      "Stainless can cause galvanic corrosion if in contact with aluminium — isolate with neoprene",
      "Weight: heavier than aluminium — consider fixing requirements at long lengths",
    ],
    procurementSources: [
      { name: "Metroll — stainless custom folding", url: "https://www.metroll.com.au/" },
      { name: "Steel & Tube Australia — national", url: "https://www.steelandtube.com.au/" },
    ],
  },
  {
    fullLabel: "BlueScope / Metroll",
    brandUrl: "https://www.bluescope.com.au/",
    tdsUrl: "https://www.bluescope.com.au/our-products/",
    accentColor: "#0369a1",
    name: "SS316 Site-Folded Head Flashing",
    descriptionLine: "316 SS coil stock — site-folded on portable folder for remediation work — coastal and marine zone rated",
    productType: "Site-Folded Head Flashing — SS316",
    filterTags: ["SS-316", "Head-flashing", "Stainless", "Coastal", "Marine-zone", "Non-combustible", "Site-folded"],
    techChips: [
      { label: "316 Stainless Coil Stock", cls: "bg-sky-100 text-sky-800" },
      { label: "Site-Folded — Portable Folder", cls: "bg-green-100 text-green-700" },
      { label: "Coastal Zone Rated", cls: "bg-slate-100 text-slate-700" },
      { label: "Cut-to-length On Site", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription:
      "316 stainless coil stock (0.9 mm or 1.2 mm) can be site-folded on a portable metal bender to produce head flashings, sill flashings, and trim profiles during facade remediation. Site folding allows immediate adjustment to actual field dimensions — useful when as-built conditions differ from drawings. The 316 grade is suitable for coastal zones. Portable folding equipment must be capable of consistent radius bends in stainless — hardened rollers required. Site-folded flashings lack the precision of factory CNC folding and are better suited to remediation where short flashings are required over limited areas.",
    technicalProperties: [
      "Material: 316 stainless coil stock",
      "Standard gauge: 0.9 mm or 1.2 mm",
      "Site folder: portable 1,800 mm capacity recommended",
      "Minimum bend radius: 3× material thickness",
      "Cutting: aviation shears or guillotine — no angle grinder",
      "Length: cut on site to suit; surface: mill finish — 2B standard coil; joining: lap joint with SS rivets",
    ],
    limitations: [
      "Site-folding less precise than factory CNC — inspect each length for distortion",
      "0.9 mm gauge is less rigid — may sag at long unsupported spans",
      "Angle grinder cutting creates rust staining — use shears or guillotine only",
      "Anti-capillary groove difficult to fold consistently on site — factory flashing preferred",
      "Portable folders require regular calibration for tight-radius bends in stainless",
    ],
    procurementSources: [
      { name: "BlueScope Steel — national", url: "https://www.bluescope.com.au/" },
      { name: "Metroll — national trade supply", url: "https://www.metroll.com.au/" },
    ],
  },
  {
    fullLabel: "Metroll / Steel & Tube",
    brandUrl: "https://www.metroll.com.au/",
    accentColor: "#7c3aed",
    name: "SS316 Drip-Angle Head Flashing — Pre-formed",
    descriptionLine: "Pre-formed SS316 drip-angle — standard stock — window and opening head flashings — 2–5 day delivery",
    productType: "Drip-Angle Head Flashing — SS316",
    filterTags: ["SS-316", "Head-flashing", "Stainless", "Coastal", "Non-combustible", "Factory-folded", "Drip-edge"],
    techChips: [
      { label: "316 Stainless Drip Angle", cls: "bg-purple-100 text-purple-800" },
      { label: "Pre-formed Standard Profile", cls: "bg-green-100 text-green-700" },
      { label: "90° and 135° Available", cls: "bg-slate-100 text-slate-700" },
      { label: "Stock Item — Short Lead", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Pre-formed 316 stainless drip-angle sections (L-section with drip nose) are stock items for window and opening head flashings in coastal cladding applications. The pre-formed drip nose on the angle section creates a drip edge that directs water away from the facade face below. Available in 90° and 135° profiles to suit recessed and flush window applications. As stock items, lead times are minimal — suitable for urgent remediation work. Cut to length on site using aviation shears.",
    technicalProperties: [
      "Material: 316 stainless steel",
      "Gauge: 1.2 mm standard",
      "Profiles: 90° L-angle and 135° drip angle",
      "Standard lengths: 2,400 mm and 3,000 mm",
      "Leg dimensions: 65 mm × 50 mm standard",
      "Drip nose: 10 mm return at 45°; surface: mill finish — 2B; stock item: typically 2–5 day delivery",
    ],
    limitations: [
      "Standard sizes only — custom profiles require factory order",
      "Leg dimensions may not suit all window or cladding configurations — check sizes",
      "No anti-capillary groove in standard stock — specify custom for high-risk applications",
      "Thermal expansion at joints must be managed — lap joints with sealant",
      "2B mill finish will dull over time in exposed locations — not an issue for concealed flashings",
    ],
    procurementSources: [
      { name: "Metroll — national trade supply", url: "https://www.metroll.com.au/" },
      { name: "Steel & Tube Australia — national", url: "https://www.steelandtube.com.au/" },
    ],
  },
  {
    fullLabel: "Metroll / Sika Australia",
    brandUrl: "https://www.metroll.com.au/",
    tdsUrl: "https://www.sika.com.au/en/solutions-products/01/01001/01001001.html",
    accentColor: "#b45309",
    name: "SS316 Head Flashing with Formed End Dams",
    descriptionLine: "Factory 316L head flashing with factory-formed end dams — prevents end-run water ingress — marine zone — silicone sealant at joints",
    productType: "Head Flashing + End Dams — SS316",
    filterTags: ["SS-316", "Head-flashing", "Stainless", "Coastal", "Marine-zone", "Non-combustible", "Factory-folded", "Anti-capillary"],
    techChips: [
      { label: "316L Stainless with End Dams", cls: "bg-amber-100 text-amber-800" },
      { label: "Factory-Formed End Dams", cls: "bg-green-100 text-green-700" },
      { label: "Silicone Sealant at Joints", cls: "bg-slate-100 text-slate-700" },
      { label: "Prevents End-Run Ingress", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Factory-folded 316L stainless head flashings with pressed or welded end dams at each flashing terminus. End dams are critical in cavity drained systems — without them, water collected in the flashing channel runs out at the ends, potentially behind the adjacent cladding. End dams are folded up 50 mm at each end and lapped with the sill or jamb flashing. At wall junctions, silicone end caps are formed in situ using neutral-cure silicone sealant pressed into a backer rod dam. This detail is a mandatory QA requirement in all cavity-drained cladding installations per waterproofing best practice.",
    technicalProperties: [
      "Material: 316L stainless — 1.5 mm",
      "End dam height: 50 mm minimum",
      "End dam method: factory folded or TIG-welded stainless tab",
      "Sealant at ends: neutral cure silicone — Sika 11FC or equivalent",
      "Backer rod: 6–10 mm polyethylene backer rod",
      "Flashing channel depth: 20 mm minimum; outlet weep hole: 10 mm Ø at 600 mm centres; service life: 50+ years",
    ],
    limitations: [
      "Factory end dams require shop drawing confirmation — add 1–2 weeks to lead time",
      "Field-formed silicone end dams require skilled applicator — not general labourer",
      "Silicone end dams must be inspected before cladding installation — defects not visible after",
      "Weep holes must be kept clear — check annually on high-rise as part of facade inspection",
      "End dam overlap with jamb flashing must be detailed and waterproofed",
    ],
    procurementSources: [
      { name: "Metroll — custom stainless fabrication", url: "https://www.metroll.com.au/" },
      { name: "Sika Australia — silicone sealant", url: "https://www.sika.com.au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "SS-316", label: "SS-316" },
  { id: "Head-flashing", label: "Head flashing" },
  { id: "Stainless", label: "Stainless" },
  { id: "Custom-folded", label: "Custom folded" },
  { id: "Coastal", label: "Coastal" },
  { id: "Marine-zone", label: "Marine zone" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "Engineer-required", label: "Engineer required" },
  { id: "Factory-folded", label: "Factory folded" },
  { id: "Site-folded", label: "Site folded" },
  { id: "Drip-edge", label: "Drip edge" },
  { id: "Anti-capillary", label: "Anti-capillary" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  grade: string;
  gauge: string;
  folding: string;
  marineZone: string;
  endDams: string;
  primaryUse: string;
}[] = [
  {
    product: "SS316 Factory Head Flashing",
    brand: "Metroll / Steel & Tube",
    grade: "316L",
    gauge: "1.5–2.0 mm",
    folding: "Factory CNC",
    marineZone: "Yes",
    endDams: "Yes (factory)",
    primaryUse: "Marine zone custom flashings",
  },
  {
    product: "SS316 Site-Folded",
    brand: "BlueScope / Metroll",
    grade: "316",
    gauge: "0.9–1.2 mm",
    folding: "Site portable folder",
    marineZone: "Yes",
    endDams: "Site silicone",
    primaryUse: "Remediation — quick install",
  },
  {
    product: "SS316 Drip-Angle Stock",
    brand: "Metroll / Steel & Tube",
    grade: "316",
    gauge: "1.2 mm",
    folding: "Pre-formed stock",
    marineZone: "Yes",
    endDams: "Site silicone",
    primaryUse: "Window head — stock sizes",
  },
  {
    product: "SS316 + End Dams",
    brand: "Metroll / Sika",
    grade: "316L",
    gauge: "1.5 mm",
    folding: "Factory CNC",
    marineZone: "Yes",
    endDams: "Yes (factory welded)",
    primaryUse: "Cavity drain — end dam critical",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Window and door head flashing in rainscreen cladding systems",
    "Parapet cap and coping flashing in coastal zone buildings",
    "Cavity base and weep flashing in drained cavity wall systems",
    "Marine-zone buildings within 200 m of ocean — 316L mandatory",
    "High-rise facades where maintenance access is 20+ years away",
    "Cladding remediation over existing window and door frames",
  ],
  selectionCriteria: [
    "Marine zone (< 200 m ocean): 316L stainless only — no aluminium or Colorbond",
    "Coastal zone (200 m–1 km): 316 stainless or anodised aluminium",
    "General zone (> 1 km): anodised aluminium or Colorbond acceptable",
    "Factory-folded: use for complex profiles, anti-capillary grooves, end dams",
    "Site-folded: use for simple profiles in remediation where factory lead time is critical",
    "Drip-angle stock: use for standard window head details — quick delivery",
  ],
  limitations: [
    "All stainless flashings require isolation from aluminium — galvanic corrosion risk",
    "Thermal expansion: 1.5 mm/metre per 50°C — lap joints must accommodate movement",
    "End dams are mandatory in all cavity-drained flashing systems — do not omit",
    "Stainless cannot be cut with angle grinder — rust staining from carbon steel contamination",
    "Weep holes must be sized to allow debris to pass — minimum 10 mm diameter",
    "Factory lead times: 3–6 weeks for custom profiles — allow in programme",
  ],
  standardsNotes: [
    "AS/NZS 2904: damp-proof courses and flashings — material and installation",
    "ABCB NCC 2022 Volume One — Part F1: damp and weatherproofing",
    "AS 4654.2: waterproofing membranes for external above-ground use",
    "AS 1562.1: design and installation of sheet roof cladding (flashing details)",
    "ISO 9223: corrosivity categories (C1–C5) — marine zone = C4–C5",
    "Master Builders Waterproofing Technical Manual — cavity flashing details",
  ],
  suitableDefects: [
    "Water ingress at window and door heads — missing or failed head flashing",
    "Corrosion of existing aluminium flashings in marine zone — replace with SS316",
    "Failed sealant at flashing joints — replace with correctly detailed lapped flashing",
    "Facade cladding remediation requiring new head flashing to new cladding system",
    "Parapet water ingress — replace flat aluminium coping with SS316 cap flashing",
    "End dam omitted in original installation — retro-fit silicone end dams",
  ],
  typicalSubstrates: [
    "Concrete lintel or beam above window — anchor flashing to structural element",
    "Masonry blockwork lintel — mechanical fix to block with SS316 screws",
    "Steel lintel — screw-fix flashing to steel member with SS rivets",
    "FC cladding substrate — fix flashing to subframe rail or bracket",
    "Window frame (aluminium) — isolate flashing from frame with EPDM tape",
    "Existing failed flashing substrate — clean, prime, and install new flashing over",
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

export function HeadFlashSSIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are stainless steel 316 head flashing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Stainless steel 316 head flashings are specified for marine-zone and severe coastal environments where aluminium and Colorbond flashings will corrode within their design life. They are the long-life, maintenance-free option for high-rise facades where replacement access in 20+ years is not feasible.
        </p>
        {expanded && (
          <>
            <p>
              The head flashing over windows, doors, and openings in a rainscreen cladding system is the last line of defence against water ingress at these critical junctions. Its purpose is to collect any water that penetrates the outer cladding layer and direct it out of the cavity through weep holes — not to form a watertight seal. The flashing must be continuous, correctly lapped at joints, fitted with end dams, and have a drip edge or anti-capillary groove to prevent water tracking back.
            </p>
            <p>
              316L stainless (low carbon, 2–3% molybdenum) is the correct specification for marine zones — standard 316 and 304 grades will pit in high chloride environments. Factory-folded profiles are preferred over site-folded: the CNC press-brake produces consistent geometry with tight bend radii, and anti-capillary grooves can be accurately formed. Site-folded stainless is acceptable for remediation where factory lead times cannot be accommodated.
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

export function HeadFlashSSProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — stainless steel 316 head flashings — scroll to view all</p>
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
              Side-by-side comparison of stainless steel 316 head flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Gauge</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Folding</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Marine zone</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">End dams</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grade}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.gauge}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.folding}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.marineZone}</td>
                  <td className="px-4 py-3 text-slate-600">{row.endDams}</td>
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
