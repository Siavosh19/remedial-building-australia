"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Aluminium"
  | "Head-flashing"
  | "Anodised"
  | "Powder-coat"
  | "Mill-finish"
  | "Coastal"
  | "Non-combustible"
  | "Factory-folded"
  | "Site-folded"
  | "Drip-edge"
  | "Anti-capillary"
  | "6063-T5"
  | "Custom-folded";

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
    fullLabel: "Capral / Ullrich Aluminium",
    brandUrl: "https://www.capral.com.au/",
    tdsUrl: "https://www.capral.com.au/products/architectural/",
    accentColor: "#b45309",
    name: "Anodised Aluminium Factory Head Flashing — 6063-T5",
    descriptionLine: "Factory-folded anodised 6063-T5 head flashing — coastal zone rated — anti-capillary groove — Class 2 anodising — 25–40 year service",
    productType: "Factory-Folded Anodised Aluminium Head Flashing",
    filterTags: ["Aluminium", "Head-flashing", "Anodised", "Coastal", "Non-combustible", "Factory-folded", "Anti-capillary", "6063-T5", "Custom-folded"],
    techChips: [
      { label: "6063-T5 Aluminium", cls: "bg-amber-100 text-amber-800" },
      { label: "Anodised — Class 2 Coastal", cls: "bg-slate-100 text-slate-700" },
      { label: "Factory CNC Folded", cls: "bg-stone-100 text-stone-700" },
      { label: "Anti-capillary Groove", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Factory-folded 6063-T5 aluminium head flashings with Class 2 anodising (20 micron) are the standard long-life head flashing for cladding systems in coastal zones (200 m–1 km from marine water). CNC press-brake folding provides consistent profile geometry and allows anti-capillary grooves to be accurately formed at the drip nose. Anodising is applied after folding to avoid cracking at bends. Available in standard silver or custom coloured anodise to match adjacent cladding panels. Factory lead time 3–5 weeks; custom profiles require shop drawing approval.",
    technicalProperties: [
      "Material: 6063-T5 aluminium",
      "Gauge: 1.6 mm standard; 2.0 mm heavy-duty",
      "Anodising: Class 2 — 20 micron, Class 3 marine — 25 micron",
      "Anti-capillary groove: 3 mm return at drip nose",
      "Max single length: 3,000 mm",
      "Thermal expansion: 23 × 10⁻⁶/°C — 40% more than steel; custom profile: CNC press-brake from shop drawings",
    ],
    limitations: [
      "Not suitable for marine zone < 200 m from ocean — specify SS316",
      "Anodising can be scratched on site — protect during installation",
      "Thermal expansion is high — lap joints must allow 25 mm per 10 m at 50°C delta",
      "Aluminium must not contact steel without isolation — galvanic corrosion",
      "Factory lead time: 3–5 weeks for custom profiles",
    ],
    procurementSources: [
      { name: "Capral Aluminium — national", url: "https://www.capral.com.au/" },
      { name: "Ullrich Aluminium — national", url: "https://www.ullrich.com.au/" },
    ],
  },
  {
    fullLabel: "Ullrich / Capral Aluminium",
    brandUrl: "https://www.ullrich.com.au/",
    tdsUrl: "https://www.ullrich.com.au/products/",
    accentColor: "#0369a1",
    name: "Powder-Coat Aluminium Head Flashing — Colour-Matched",
    descriptionLine: "Colour-matched powder-coat aluminium head flashing — architectural facades — AS 3715 Class B — 60–80 micron DFT",
    productType: "Powder-Coat Aluminium Head Flashing",
    filterTags: ["Aluminium", "Head-flashing", "Powder-coat", "Coastal", "Non-combustible", "Factory-folded", "6063-T5", "Custom-folded"],
    techChips: [
      { label: "Custom Powder-Coat Colour", cls: "bg-sky-100 text-sky-800" },
      { label: "6063-T5 Aluminium", cls: "bg-green-100 text-green-700" },
      { label: "Factory CNC Folded", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal Rated", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription:
      "Powder-coat finished aluminium head flashings allow colour-matching to adjacent cladding panels, window frames, or building facade elements. The thermosetting powder coat is applied after forming and provides 60–80 micron dry film thickness. Coastal zone applications require powder-coat over chromate conversion coating (AS 3715) — do not powder-coat over bare aluminium without pre-treatment. Suitable for all zones excluding marine (< 200 m ocean). Colour must be specified using a Dulux or Interpon powder range colour code.",
    technicalProperties: [
      "Material: 6063-T5 aluminium",
      "Gauge: 1.6 mm standard",
      "Powder coat: thermosetting — AS 3715 Class B",
      "DFT: 60–80 micron",
      "Pre-treatment: chromate conversion coating mandatory",
      "Custom colour: Dulux Duralloy or Interpon 600 range; max single length: 3,000 mm",
    ],
    limitations: [
      "Powder coat will chip if site-handled roughly — protect with peel-off film during install",
      "Touch-up paint for site damage is never invisible — handle carefully",
      "Not suitable for marine zone — coating will delaminate in severe salt spray",
      "Powder coat over anodise not possible — must specify one or the other",
      "Lead time: 4–6 weeks for custom colours — colour must be approved before ordering",
    ],
    procurementSources: [
      { name: "Ullrich Aluminium — national", url: "https://www.ullrich.com.au/" },
      { name: "Capral Aluminium — national", url: "https://www.capral.com.au/" },
    ],
  },
  {
    fullLabel: "Capral / Stratco",
    brandUrl: "https://www.capral.com.au/",
    accentColor: "#7c3aed",
    name: "Mill-Finish Aluminium Site-Folded Head Flashing",
    descriptionLine: "Mill-finish aluminium coil stock — site-folded for remediation head flashings — inland zones only — lowest cost and shortest lead time",
    productType: "Site-Folded Mill-Finish Aluminium Head Flashing",
    filterTags: ["Aluminium", "Head-flashing", "Mill-finish", "Non-combustible", "Site-folded", "6063-T5"],
    techChips: [
      { label: "Mill Finish — No Coating", cls: "bg-purple-100 text-purple-800" },
      { label: "Site Folded — Immediate", cls: "bg-green-100 text-green-700" },
      { label: "Aluminium Coil Stock", cls: "bg-slate-100 text-slate-700" },
      { label: "Inland Zones Only", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription:
      "Mill-finish aluminium coil stock (0.9 mm or 1.2 mm) is the lowest-cost and most immediately available head flashing material — site-folded on a portable metal bender during facade remediation. Suitable for inland zones (> 1 km from marine water) where corrosion from chloride is not a design constraint. Mill finish will develop a natural oxide layer over time. Not suitable for coastal or marine zones without anodising. Used where factory lead times cannot be accommodated and aesthetics are secondary (flashings concealed behind cladding face).",
    technicalProperties: [
      "Material: 1100 or 3003 aluminium alloy",
      "Gauge: 0.9 mm or 1.2 mm coil",
      "Finish: mill — natural oxide develops over time",
      "Site folder: portable 1,800 mm capacity",
      "Cut to length on site; joining: aluminium rivets or aluminium screws",
      "Inland zones only: not coastal or marine; lowest cost and shortest lead time",
    ],
    limitations: [
      "Not suitable for coastal or marine zones — will corrode without anodising",
      "Site folding less precise than factory — inspect each length",
      "Mill finish oxidises to dull grey — acceptable only if concealed",
      "0.9 mm gauge is thin — handle carefully to avoid distortion",
      "No anti-capillary groove possible with site folding — use factory flashing for critical applications",
    ],
    procurementSources: [
      { name: "Capral Aluminium — national", url: "https://www.capral.com.au/" },
      { name: "Stratco — national trade supply", url: "https://www.stratco.com.au/" },
    ],
  },
  {
    fullLabel: "Ametalin / Capral Aluminium",
    brandUrl: "https://www.ametalin.com/",
    tdsUrl: "https://www.ametalin.com/products/",
    accentColor: "#b45309",
    name: "Aluminium Head Flashing with Integrated EPDM Seal",
    descriptionLine: "Aluminium head flashing with factory-integrated EPDM compression seal — eliminates sealant failure at back leg — coastal rated",
    productType: "Head Flashing with EPDM Compression Seal",
    filterTags: ["Aluminium", "Head-flashing", "Anodised", "Coastal", "Non-combustible", "Factory-folded", "Anti-capillary", "6063-T5"],
    techChips: [
      { label: "Integrated EPDM Compression Seal", cls: "bg-amber-100 text-amber-800" },
      { label: "Anodised Aluminium", cls: "bg-green-100 text-green-700" },
      { label: "Factory-Fitted EPDM", cls: "bg-slate-100 text-slate-700" },
      { label: "No Sealant at Interface", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Aluminium head flashings with factory-integrated EPDM compression seals at the flashing-to-wall interface eliminate the need for sealant at this critical junction. The EPDM seal is factory-bonded into a channel in the back leg of the flashing and compresses against the substrate when the flashing is fixed — providing a seal that accommodates thermal movement without cracking. Eliminates the most common point of sealant failure in head flashings: the bond between sealant and aluminium at the back leg where differential thermal movement is highest.",
    technicalProperties: [
      "Material: 6063-T5 anodised aluminium",
      "EPDM seal: factory-bonded, 3 mm bulb",
      "EPDM: 70 Shore A — compression seal at interface",
      "Compression seal eliminates sealant at back leg",
      "Temperature range: −40°C to +120°C EPDM",
      "Gauge: 1.6 mm aluminium body; anodising: Class 2 — 20 micron; max single length: 3,000 mm",
    ],
    limitations: [
      "EPDM must be compressed uniformly — back leg must bear evenly against substrate",
      "Substrate must be flat — EPDM will not bridge gaps > 2 mm",
      "EPDM is factory-bonded — cannot be replaced in field if damaged",
      "Higher cost than standard aluminium flashing",
      "EPDM seal at interface does not replace sealant at end dams or joints",
    ],
    procurementSources: [
      { name: "Ametalin — national", url: "https://www.ametalin.com/" },
      { name: "Capral Aluminium — custom folding", url: "https://www.capral.com.au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Aluminium", label: "Aluminium" },
  { id: "Head-flashing", label: "Head flashing" },
  { id: "Anodised", label: "Anodised" },
  { id: "Powder-coat", label: "Powder-coat" },
  { id: "Mill-finish", label: "Mill finish" },
  { id: "Coastal", label: "Coastal" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "Factory-folded", label: "Factory folded" },
  { id: "Site-folded", label: "Site folded" },
  { id: "Drip-edge", label: "Drip edge" },
  { id: "Anti-capillary", label: "Anti-capillary" },
  { id: "6063-T5", label: "6063-T5" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  finish: string;
  gauge: string;
  folding: string;
  coastal: string;
  colourMatch: string;
  zone: string;
}[] = [
  {
    product: "Anodised Factory Head Flashing",
    brand: "Capral / Ullrich",
    finish: "Anodised Class 2",
    gauge: "1.6–2.0 mm",
    folding: "Factory CNC",
    coastal: "Yes",
    colourMatch: "Silver / custom anodise",
    zone: "Coastal",
  },
  {
    product: "Powder-Coat Head Flashing",
    brand: "Ullrich / Capral",
    finish: "Powder-coat",
    gauge: "1.6 mm",
    folding: "Factory CNC",
    coastal: "Yes",
    colourMatch: "Any RAL colour",
    zone: "Coastal / general",
  },
  {
    product: "Mill-Finish Site-Folded",
    brand: "Capral / Stratco",
    finish: "Mill finish",
    gauge: "0.9–1.2 mm",
    folding: "Site folder",
    coastal: "No",
    colourMatch: "None",
    zone: "General (inland) only",
  },
  {
    product: "Alum + EPDM Seal",
    brand: "Ametalin / Capral",
    finish: "Anodised Class 2",
    gauge: "1.6 mm",
    folding: "Factory CNC",
    coastal: "Yes",
    colourMatch: "Silver / custom",
    zone: "Coastal / general",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Window and door head flashings — cladding remediation and new construction",
    "Parapet and coping flashing in non-marine coastal zone buildings",
    "Cavity base and step flashings in rainscreen wall systems",
    "Colour-matched flashings in architectural facade systems",
    "Site-folded flashings for urgent remediation where factory lead time unavailable",
    "Aluminium replacement of corroded steel or painted head flashings",
  ],
  selectionCriteria: [
    "Marine zone < 200 m ocean: SS316 only — not aluminium",
    "Coastal zone 200 m–1 km: anodised aluminium — Class 2 minimum",
    "General zone > 1 km: mill-finish or powder-coat aluminium acceptable",
    "Architectural facade: powder-coat to match cladding panel colour",
    "Critical junction (concealed long-term): anodised with anti-capillary groove",
    "Urgent remediation: site-folded mill-finish — inland zones only",
  ],
  limitations: [
    "Aluminium has high thermal expansion — lap joints must be designed for movement",
    "Mill finish not suitable for coastal or marine zones without treatment",
    "Powder coat must be applied over chromate pre-treatment — not bare aluminium",
    "End dams are mandatory — omission is the most common cause of head flashing failure",
    "Aluminium must not contact steel fixings without isolation — galvanic corrosion",
    "Site-folded flashings are less precise — anti-capillary grooves not achievable",
  ],
  standardsNotes: [
    "AS/NZS 2904: damp-proof courses and flashings — materials and installation",
    "AS 3715: powder coating for architectural applications",
    "AS 1231: aluminium and aluminium alloys — anodic oxidation coatings",
    "ABCB NCC 2022 Volume One — Part F1: damp and weatherproofing",
    "AS/NZS 1170.2: wind actions — flashing fixing design",
    "ISO 9223: corrosivity categories — specify material grade per corrosivity class",
  ],
  suitableDefects: [
    "Failed painted steel head flashings — rusting and water ingress",
    "Missing head flashings over windows in remediated facade system",
    "Corroded aluminium head flashings in coastal zone — replace with anodised",
    "Failed sealant at head flashing joints — replace with correctly lapped aluminium",
    "Water ingress at window head — install new head flashing with end dams",
    "Facade remediation requiring colour-matched flashings to new cladding panels",
  ],
  typicalSubstrates: [
    "Concrete lintel: anchor flashing back leg to concrete with SS316 screws",
    "Masonry block: mechanical fix to block face with SS316 screws",
    "Steel lintel: clip or screw-fix to steel member with SS316 rivets",
    "FC subframe: fix to top-hat rail with self-drilling SS316 screws",
    "Window frame (aluminium): isolate with EPDM tape — no direct metal contact",
    "Existing substrate: adhere back leg with approved construction adhesive + mechanical fix",
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

export function HeadFlashAlumIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are aluminium head flashing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Aluminium head flashings are the standard choice for non-marine coastal and general-zone cladding systems — combining light weight, non-combustibility, and corrosion resistance with the ability to be colour-matched by powder-coating or anodising to match adjacent cladding panels and window frames.
        </p>
        {expanded && (
          <>
            <p>
              Aluminium has the highest thermal expansion coefficient of common flashing materials — 23 × 10⁻⁶/°C versus 12 for steel and 16 for stainless. This means lap joints in aluminium flashings must accommodate significantly more movement than equivalent steel or stainless flashings. On a 6 m long flashing exposed to 50°C temperature differential, expansion is approximately 7 mm — the lap joint must be designed to allow this without cracking the sealant or distorting the profile.
            </p>
            <p>
              Galvanic corrosion between aluminium and steel is a persistent failure mechanism in poorly detailed flashings. Aluminium head flashings fixed with carbon steel screws, or aluminium flashings in contact with steel lintels without isolation, create galvanic cells in the presence of moisture. All fixings must be 316 stainless, and aluminium-to-steel interfaces must be isolated with EPDM tape or neoprene pads.
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

export function HeadFlashAlumProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — aluminium head flashings — scroll to view all</p>
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
              Side-by-side comparison of aluminium head flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Gauge</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Folding</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour match</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Zone</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.gauge}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.folding}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colourMatch}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.zone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
