"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Sill-flashing" | "SS-316" | "Aluminium" | "Colorbond" | "Upstand"
  | "Sloped" | "Coastal" | "Marine-zone" | "Non-combustible" | "Factory-folded"
  | "Anti-capillary" | "EPDM-seal";

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
    fullLabel: "SS316 Sloped Sill Flashing with Upstand — Factory Folded",
    brandUrl: "https://www.metroll.com.au/",
    accentColor: "#e2003a",
    name: "SS316 Sloped Sill Flashing",
    descriptionLine: "316 stainless sloped sill with 50 mm upstand — marine and coastal zone.",
    productType: "Factory-Folded Sill Flashing — SS316",
    filterTags: ["Sill-flashing", "SS-316", "Upstand", "Sloped", "Coastal", "Marine-zone", "Non-combustible", "Factory-folded", "Anti-capillary"],
    techChips: [
      { label: "316L Stainless — Marine Zone", cls: "bg-green-100 text-green-800" },
      { label: "50 mm Upstand", cls: "bg-blue-100 text-blue-800" },
      { label: "Sloped Sill Pan — 5° min", cls: "bg-purple-100 text-purple-800" },
      { label: "Factory CNC Folded", cls: "bg-sky-100 text-sky-800" },
      { label: "Anti-capillary Nose", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "316L stainless sill flashings are factory-folded with a minimum 5° slope to the outer face, a 50 mm upstand at the back against the substrate, and an anti-capillary groove at the drip nose. The upstand is critical — it prevents water from tracking back into the wall at the critical sill-to-wall junction. The sill pan collects any water penetrating the cladding system and directs it to the outer face. End dams at each side are factory-welded. For marine zone applications (< 200 m from ocean) and all coastal high-rise facades where 50-year maintenance-free performance is required.",
    technicalProperties: [
      "Material: 316L stainless — 1.5 mm",
      "Slope: 5° minimum to outer face (factory-formed)",
      "Upstand: 50 mm minimum at back leg",
      "End dams: 50 mm factory-welded at each end",
      "Anti-capillary groove: 3 mm nose return",
      "Weep holes: 10 mm Ø at 600 mm centres in front leg",
      "Max single length: 3,000 mm (transport limited)",
      "Service life: 50+ years — no maintenance",
    ],
    limitations: [
      "Factory lead time: 3–6 weeks — must be included in programme",
      "Shop drawings required before fabrication",
      "Upstand must remain clear of insulation — thermal bridge if blocked",
      "Sill flashing must be installed before window frame — sequence critical",
      "Do not mortar or seal over weep holes — drainage must remain clear",
    ],
    procurementSources: [
      { name: "Metroll (stainless custom)", url: "https://www.metroll.com.au/" },
      { name: "Steel & Tube Australia", url: "https://www.steelandtube.com.au/" },
    ],
  },
  {
    fullLabel: "Anodised Aluminium Sill Flashing — 6063-T5",
    brandUrl: "https://www.capral.com.au/",
    accentColor: "#0369a1",
    name: "Anodised Alum Sill Flashing",
    descriptionLine: "Anodised 6063-T5 sill flashing — standard coastal cladding application.",
    productType: "Anodised Aluminium Sill Flashing",
    filterTags: ["Sill-flashing", "Aluminium", "Upstand", "Sloped", "Coastal", "Non-combustible", "Factory-folded", "Anti-capillary"],
    techChips: [
      { label: "6063-T5 Anodised", cls: "bg-blue-100 text-blue-800" },
      { label: "Sloped Sill Pan", cls: "bg-green-100 text-green-800" },
      { label: "50 mm Upstand", cls: "bg-purple-100 text-purple-800" },
      { label: "Coastal Zone Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "Factory CNC Folded", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Factory-folded 6063-T5 anodised aluminium sill flashings with sloped pan, 50 mm upstand, and end dams are the standard sill flashing for coastal zone cladding applications. Class 2 anodising (20 micron) provides long-term corrosion resistance in coastal zones (200 m–1 km from marine water). The sill pan slopes 5° to the outer face to direct water through the front weep holes. Lighter and less expensive than stainless, anodised aluminium sill flashings are appropriate for the majority of Australian cladding remediation projects outside the marine zone.",
    technicalProperties: [
      "Material: 6063-T5 aluminium",
      "Gauge: 1.6 mm",
      "Anodising: Class 2 — 20 micron (Class 3 for marine-adjacent)",
      "Slope: 5° minimum (factory formed)",
      "Upstand: 50 mm back leg",
      "End dams: factory-folded (not welded) — 50 mm",
      "Weep holes: 10 mm Ø at 600 mm centres",
      "Service life: 25–40 years depending on zone",
    ],
    limitations: [
      "Not suitable for marine zone < 200 m — specify SS316",
      "Anodising scratches on site — protect during installation",
      "High thermal expansion: allow for movement at joints (25 mm per 10 m at 50°C delta)",
      "Aluminium must not contact steel without isolation — galvanic corrosion",
      "Folded end dams (not welded) — inspect before installation and seal joints",
    ],
    procurementSources: [
      { name: "Capral Aluminium", url: "https://www.capral.com.au/" },
      { name: "Ullrich Aluminium", url: "https://www.ullrich.com.au/" },
    ],
  },
  {
    fullLabel: "Colorbond Ultra Sill Flashing — Sloped Pan",
    brandUrl: "https://www.stratco.com.au/",
    accentColor: "#7c3aed",
    name: "Colorbond Sill Flashing",
    descriptionLine: "Colorbond Ultra sloped sill flashing — colour-matched, inland to coastal.",
    productType: "Colorbond Steel Sill Flashing",
    filterTags: ["Sill-flashing", "Colorbond", "Upstand", "Sloped", "Coastal", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "Colorbond Ultra Steel", cls: "bg-blue-100 text-blue-800" },
      { label: "Colour-Matched", cls: "bg-green-100 text-green-800" },
      { label: "Sloped Pan — 5°", cls: "bg-purple-100 text-purple-800" },
      { label: "Coastal (C4) Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "Factory Folded", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Colorbond Ultra sill flashings are colour-matched to the building facade palette — suitable for residential and light commercial applications where sill flashing will be visible. Factory-folded with a 5° slope, 50 mm upstand, and end dams. Colorbond Ultra base material is rated C4 (coastal) — suitable up to 1 km from marine water. Cut edges must be treated with zinc-rich primer. Commonly specified as the matching sill flashing in Colorbond-walled buildings or FC panel cladding with Colorbond trim.",
    technicalProperties: [
      "Material: Colorbond Ultra — ZAM alloy",
      "Gauge: 0.55 mm BMT",
      "Slope: 5° minimum",
      "Upstand: 50 mm back leg",
      "Colour range: 27 standard Colorbond colours",
      "Corrosion zone: C1–C4 (up to 1 km marine)",
      "End dams: factory-folded",
      "Lead time: custom 3–5 weeks; stock profiles 2–5 days",
    ],
    limitations: [
      "Not suitable for marine zone < 1 km ocean — use SS316 or anodised alum",
      "Cut edges corrode — zinc-rich primer required within 24 hr",
      "Colour must match current Colorbond chart — confirm before ordering",
      "Folded end dams not welded — inspect and seal before installation",
      "Paint finish fades: not truly maintenance-free at 20-year outlook",
    ],
    procurementSources: [
      { name: "Stratco", url: "https://www.stratco.com.au/" },
      { name: "Metroll", url: "https://www.metroll.com.au/" },
    ],
  },
  {
    fullLabel: "Sill Flashing with Pre-formed EPDM Seal — Aluminium",
    brandUrl: "https://www.ametalin.com/",
    accentColor: "#b45309",
    name: "Alum Sill Flashing + EPDM",
    descriptionLine: "Aluminium sill with factory EPDM seal at upstand — eliminates sealant joint.",
    productType: "Sill Flashing with Integrated EPDM Upstand Seal",
    filterTags: ["Sill-flashing", "Aluminium", "Upstand", "Sloped", "Coastal", "Non-combustible", "Factory-folded", "EPDM-seal"],
    techChips: [
      { label: "EPDM Seal at Upstand", cls: "bg-green-100 text-green-800" },
      { label: "Anodised 6063-T5", cls: "bg-blue-100 text-blue-800" },
      { label: "No Sealant at Back Leg", cls: "bg-purple-100 text-purple-800" },
      { label: "Coastal Zone Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "Thermal-Movement Tolerant", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Aluminium sill flashings with factory-bonded EPDM compression seal at the upstand-to-wall interface eliminate the need for sealant at this critical junction. The EPDM seal accommodates thermal movement between the aluminium flashing and the substrate (concrete, masonry, or FC panel) without cracking — the most common failure mode of sealant at sill flashings. The seal compresses when the flashing is mechanically fixed — no adhesive or additional sealant is required at the upstand. Reduces ongoing maintenance requirements and eliminates sealant failure as a water ingress pathway.",
    technicalProperties: [
      "Material: 6063-T5 anodised aluminium",
      "EPDM seal: 3 mm bulb — 70 Shore A",
      "Factory-bonded EPDM to back of upstand leg",
      "No sealant at upstand — EPDM compression seal",
      "Sealant still required at end dams and joints",
      "Temperature range: EPDM −40°C to +120°C",
      "Gauge: 1.6 mm aluminium body",
      "Lead time: custom — 4–6 weeks",
    ],
    limitations: [
      "EPDM seal requires uniform compression against flat substrate — gaps > 2 mm will fail",
      "Field-damaged EPDM cannot be replaced — handle with care",
      "Sealant still required at end dam laps and lateral joints",
      "Higher cost than standard sill flashing",
      "Substrate must be flat and clean — EPDM will not compress over mortar drips or projections",
    ],
    procurementSources: [
      { name: "Ametalin", url: "https://www.ametalin.com/" },
      { name: "Capral Aluminium (custom)", url: "https://www.capral.com.au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Sill-flashing", label: "Sill Flashing" },
  { id: "SS-316", label: "SS-316" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Upstand", label: "Upstand" },
  { id: "Sloped", label: "Sloped Pan" },
  { id: "Coastal", label: "Coastal Rated" },
  { id: "Marine-zone", label: "Marine Zone" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "Factory-folded", label: "Factory Folded" },
  { id: "Anti-capillary", label: "Anti-capillary" },
  { id: "EPDM-seal", label: "EPDM Seal" },
];

const SYSTEM_COMPARISON: {
  product: string;
  material: string;
  zone: string;
  upstand: string;
  slope: string;
  epmdSeal: string;
  primaryUse: string;
}[] = [
  {
    product: "SS316 Sloped Sill",
    material: "316L Stainless",
    zone: "Marine",
    upstand: "50 mm",
    slope: "5°",
    epmdSeal: "No",
    primaryUse: "Marine / high-rise 50 yr",
  },
  {
    product: "Anodised Alum Sill",
    material: "6063-T5 Anodised",
    zone: "Coastal",
    upstand: "50 mm",
    slope: "5°",
    epmdSeal: "No",
    primaryUse: "Standard coastal cladding",
  },
  {
    product: "Colorbond Sill",
    material: "Colorbond Ultra",
    zone: "Coastal (C4)",
    upstand: "50 mm",
    slope: "5°",
    epmdSeal: "No",
    primaryUse: "Colour-matched residential",
  },
  {
    product: "Alum + EPDM Seal",
    material: "6063-T5 Anodised",
    zone: "Coastal",
    upstand: "50 mm",
    slope: "5°",
    epmdSeal: "Yes",
    primaryUse: "No sealant at upstand joint",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Window and door sill flashings in all rainscreen cladding systems",
    "Sill pan flashing collecting water at base of opening and directing to face",
    "Marine zone sill: SS316 — 50+ year no-maintenance performance",
    "Coastal zone sill: anodised aluminium — 25–40 year service",
    "Colour-matched sill: Colorbond — residential and light commercial",
    "High-spec sill: EPDM seal upstand — eliminates sealant failure mode",
  ],
  selectionCriteria: [
    "Marine zone < 200 m: SS316 — only acceptable long-term option",
    "Coastal zone 200 m–1 km: anodised aluminium Class 2 or Colorbond Ultra",
    "General zone > 1 km: Colorbond or mill-finish aluminium acceptable",
    "EPDM upstand seal: specify where sealant at upstand is identified as a risk",
    "Sloped pan: mandatory — minimum 5° slope to outer face",
    "Upstand: minimum 50 mm above any water level in the cavity",
  ],
  limitations: [
    "Sill flashing must be installed before window frame — sequence critical",
    "Upstand must remain above any water that can accumulate in cavity",
    "End dams are mandatory — omission allows water to run behind adjacent cladding",
    "Weep holes must remain unblocked — inspect after installation",
    "Sill must slope to drain — never install flat; flat sills pond water and fail",
    "All metals require isolation from dissimilar metals — galvanic corrosion",
  ],
  standardsNotes: [
    "AS/NZS 2904: damp-proof courses and flashings",
    "NCC 2022 Part F1: damp and weatherproofing — sill flashing requirements",
    "AS 4654.2: waterproofing — above-ground external applications",
    "Window and Door Installation Best Practice Guide — AGWA",
    "AS 2047: windows and external glazed doors in buildings — installation",
    "ABCB Condensation Handbook — cavity drainage requirements",
  ],
  suitableDefects: [
    "Water ingress at window sill — failed or missing sill flashing",
    "Failed sealant at sill upstand — replace with EPDM-sealed or correctly detailed flashing",
    "Corroded steel sill flashing — replace with anodised alum or SS316",
    "Flat sill flashing ponding water — replace with correctly sloped pan",
    "Missing end dams — retro-fit silicone end dams or replace flashing",
    "ACP remediation — install new sill flashing at openings in remediated facade",
  ],
  typicalSubstrates: [
    "Concrete window head or sill: fix back leg with SS316 screws into concrete",
    "Masonry block sill: SS316 screws into block face",
    "Steel stud frame: SS316 screws into stud through sheathing",
    "Timber window frame: SS316 screws into frame (anodised alum or SS316 flashing only)",
    "FC subframe: clip or screw to top-hat rail with SS316 screws",
    "Existing substrate: adhesive + mechanical fix — clean substrate first",
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

export function SillFlashingIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are sill flashing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Sill flashings form the waterproof tray at the base of all window and door openings in a rainscreen cladding system — collecting water that penetrates the outer cladding and directing it back to the face through weep holes. A correctly detailed sill flashing with upstand, end dams, slope, and anti-capillary nose is the single most important waterproofing detail in a cladding facade.
        </p>
        {expanded && (
          <>
            <p>
              The four mandatory elements of any sill flashing are: (1) upstand — minimum 50 mm above any water level in the cavity; (2) slope — minimum 5° to the outer face to drain by gravity; (3) end dams — preventing water running sideways behind adjacent cladding; (4) weep holes — minimum 10 mm diameter at 600 mm centres to drain collected water. Omission of any one of these elements will eventually lead to water ingress.
            </p>
            <p>
              The upstand-to-wall sealant joint is the most commonly failed sealant in facade buildings, typically failing within 10–15 years due to differential thermal movement between the aluminium flashing and the concrete or masonry substrate. Specifying a sill flashing with an EPDM upstand compression seal eliminates this failure mode entirely — the EPDM accommodates movement without cracking.
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

export function SillFlashingProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — sill flashing — scroll to view all</p>
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
              Side-by-side comparison of sill flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Zone</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Upstand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Slope</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">EPDM seal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.zone}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.upstand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.slope}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.epmdSeal}</td>
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
