"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Base-flashing"
  | "Weep-flashing"
  | "SS-316"
  | "Aluminium"
  | "Colorbond"
  | "Weep-hole"
  | "Cavity-drain"
  | "Coastal"
  | "Marine-zone"
  | "Non-combustible"
  | "Factory-folded"
  | "Termite-barrier"
  | "Cavity-closer";

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
    accentColor: "#b45309",
    name: "SS316 Base Weep Flashing — Slotted Weep Holes",
    descriptionLine: "316L stainless base weep flashing — drains cavity at base of cladding system — marine and coastal zone — 50+ year service",
    productType: "Base Weep Flashing — SS316 Stainless",
    filterTags: ["Base-flashing", "Weep-flashing", "SS-316", "Weep-hole", "Cavity-drain", "Coastal", "Marine-zone", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "316L Stainless — Marine Zone", cls: "bg-amber-100 text-amber-800" },
      { label: "Slotted Weep Holes", cls: "bg-slate-100 text-slate-700" },
      { label: "Cavity Drainage", cls: "bg-stone-100 text-stone-700" },
      { label: "Non-combustible", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "316L stainless base weep flashings are installed at the base of every storey (or at the base of the building) in a rainscreen cladding system to collect and drain any water that has entered the cavity. The slotted weep holes (10 mm × 3 mm or 10 mm circular at 450 mm centres) allow water to escape while minimising insect entry. The flashing turns up minimum 50 mm against the substrate (upstand) to prevent water tracking back. In multi-storey buildings, a base weep flashing is required at every floor level where the cavity is closed by a fire barrier — allowing the lower section of the cavity to drain independently. 316L stainless provides 50+ year maintenance-free service in marine and coastal zones.",
    technicalProperties: [
      "Material: 316L stainless — 1.5 mm",
      "Upstand: 50 mm minimum against substrate",
      "Weep holes: 10 mm Ø at 450 mm centres (or 10×3 mm slots)",
      "Front leg: 20 mm minimum past cladding face",
      "Anti-bug mesh: 316 stainless mesh bonded behind weep holes",
      "Factory folded — CNC press-brake; end dams: factory-welded at each end",
      "Service life: 50+ years — no maintenance",
    ],
    limitations: [
      "Weep holes must remain clear — annual inspection required on high-rise",
      "Anti-bug mesh will accumulate debris over time — inspect and clean",
      "Factory lead time 3–6 weeks",
      "Must be coordinated with fire barrier position at each floor — structural engineer",
      "Stainless must not contact aluminium subframe without isolation",
    ],
    procurementSources: [
      { name: "Metroll — stainless custom fabrication", url: "https://www.metroll.com.au/" },
      { name: "Steel & Tube Australia — national", url: "https://www.steelandtube.com.au/" },
    ],
  },
  {
    fullLabel: "Capral / Ullrich Aluminium",
    brandUrl: "https://www.capral.com.au/",
    accentColor: "#0369a1",
    name: "Anodised Aluminium Base Weep Flashing with Mesh",
    descriptionLine: "Factory-folded 6063-T5 anodised aluminium base weep — 316 stainless insect mesh — coastal zone rated — 25–40 year service",
    productType: "Base Weep Flashing — Anodised Aluminium",
    filterTags: ["Base-flashing", "Weep-flashing", "Aluminium", "Weep-hole", "Cavity-drain", "Coastal", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "6063-T5 Anodised", cls: "bg-sky-100 text-sky-800" },
      { label: "Weep Holes + Bug Mesh", cls: "bg-green-100 text-green-700" },
      { label: "Coastal Zone Rated", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-combustible", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription:
      "Factory-folded 6063-T5 anodised aluminium base weep flashings with 316 stainless insect mesh behind the weep holes. The insect mesh prevents entry of ants, wasps, and small insects into the cavity while maintaining drainage — critical for cavities that also contain thermal insulation, as insects nesting in insulation degrade its thermal performance. The aluminium flashing is suitable for coastal zones (200 m–1 km from ocean). The weep holes are spaced at 450 mm centres; at every fire barrier location, the base weep flashing is installed on both sides of the barrier to drain each independent cavity section. Class 2 anodising (20 micron) provides 25–40 year service in coastal zones.",
    technicalProperties: [
      "Material: 6063-T5 aluminium — anodised Class 2 (20 micron)",
      "Gauge: 1.6 mm",
      "Upstand: 50 mm against substrate",
      "Weep holes: 10 mm Ø at 450 mm centres",
      "Insect mesh: 316 stainless mesh behind weep holes",
      "Front leg: 20 mm past cladding face; factory folded — custom profile from shop drawing",
      "Service life: 25–40 years coastal zone",
    ],
    limitations: [
      "Not suitable for marine zone < 200 m — use SS316",
      "Insect mesh must be clear — inspect annually",
      "Anodising scratches on site — protect during installation",
      "Must coordinate with fire barrier locations — engineer to confirm",
      "Aluminium must be isolated from steel and copper",
    ],
    procurementSources: [
      { name: "Capral Aluminium — national", url: "https://www.capral.com.au/" },
      { name: "Ullrich Aluminium — national", url: "https://www.ullrich.com.au/" },
    ],
  },
  {
    fullLabel: "Stratco / Metroll",
    brandUrl: "https://www.stratco.com.au/",
    accentColor: "#7c3aed",
    name: "Colorbond Base Weep Flashing — Stock and Custom",
    descriptionLine: "Colorbond Ultra base weep — colour-matched cavity drain flashing — 27 standard colours — C4 coastal rated",
    productType: "Base Weep Flashing — Colorbond Steel",
    filterTags: ["Base-flashing", "Weep-flashing", "Colorbond", "Weep-hole", "Cavity-drain", "Coastal", "Non-combustible", "Factory-folded"],
    techChips: [
      { label: "Colorbond Ultra Steel", cls: "bg-purple-100 text-purple-800" },
      { label: "Colour-Matched", cls: "bg-green-100 text-green-700" },
      { label: "Weep Holes at 450 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal (C4) Rated", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Colorbond Ultra base weep flashings are colour-matched to the building's Colorbond palette — suitable for residential and light commercial cladding in general and coastal zones (C1–C4). Factory-folded with weep holes at 450 mm centres, the flashing drains the cavity at the base of each cladding panel run. Colorbond base weep flashings are commonly used in residential Colorbond Walling installations as part of a coordinated flashing set (head, sill, jamb, and base weep all in matching Colorbond colour). Available in 27 standard Colorbond colours. Cut edges must be primed with zinc-rich primer within 24 hours of cutting on site.",
    technicalProperties: [
      "Material: Colorbond Ultra — 0.55 mm BMT",
      "27 standard Colorbond colours",
      "Weep holes: 10 mm Ø at 450 mm centres",
      "Upstand: 50 mm against substrate",
      "Corrosion zone: C1–C4 (up to 1 km marine)",
      "Insect mesh: site-applied where required; cut edges: zinc-rich primer within 24 hr",
      "Lead time: stock profiles 2–5 days; custom 3–5 weeks",
    ],
    limitations: [
      "Not suitable for marine zone < 1 km — use anodised alum or SS316",
      "Cut edges corrode — prime within 24 hr",
      "Colour fades over 10–15 years — not maintenance-free at 20 yr",
      "Insect mesh must be added as separate item — not factory integrated",
      "Weep holes must remain unblocked — annual inspection",
    ],
    procurementSources: [
      { name: "Stratco — national trade supply", url: "https://www.stratco.com.au/" },
      { name: "Metroll — national trade supply", url: "https://www.metroll.com.au/" },
    ],
  },
  {
    fullLabel: "Permaform / Capral Aluminium",
    brandUrl: "https://www.permaform.com.au/",
    tdsUrl: "https://www.permaform.com.au/products/",
    accentColor: "#b45309",
    name: "Termite Base Weep + Cavity Closer System",
    descriptionLine: "Steel base weep with factory-fitted cavity closer — termite and weather barrier — NCC 2022 Part B3.2 compliant — termite risk zones M, H, VH",
    productType: "Base Weep Flashing + Integrated Cavity Closer",
    filterTags: ["Base-flashing", "Weep-flashing", "SS-316", "Weep-hole", "Cavity-drain", "Coastal", "Non-combustible", "Termite-barrier", "Cavity-closer"],
    techChips: [
      { label: "Integrated Cavity Closer", cls: "bg-amber-100 text-amber-800" },
      { label: "Termite Barrier Compliant", cls: "bg-green-100 text-green-700" },
      { label: "316 Stainless or Alum", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC 2022 Part B3", cls: "bg-sky-100 text-sky-700" },
    ],
    systemDescription:
      "Base weep flashings with integrated cavity closers provide both the drainage function and the cavity termination at the base of the cladding system. The cavity closer prevents termite access into the drained cavity — important in high-risk termite zones across eastern Australia. The weep holes allow water drainage while the cavity closer profile blocks insect access. Must comply with NCC 2022 Part B3.2 (Resistance to Subterranean Termite Attack) in Termite Risk Categories M, H, and VH. Available in anodised aluminium or SS316 depending on corrosion zone. Must be used in conjunction with a compliant chemical or physical termite barrier below slab.",
    technicalProperties: [
      "Cavity closer: integrated into flashing profile — continuous, no gaps",
      "Weep holes: 10 mm Ø at 450 mm centres",
      "Termite access: closed by cavity closer profile",
      "NCC 2022 Part B3.2: termite risk categories M, H, VH",
      "Material: anodised aluminium or SS316 per corrosion zone",
      "Upstand: 75 mm minimum (higher than standard base weep); factory folded — custom per project",
    ],
    limitations: [
      "Termite barrier compliance must be confirmed by licensed pest inspector",
      "Cavity closer must be continuous — gaps allow termite access",
      "Chemical termite barrier required below slab in addition to physical barrier",
      "Higher cost and lead time than standard base weep",
      "Requires termite risk zone assessment before specifying — not required in all zones",
    ],
    procurementSources: [
      { name: "Permaform Australia — national", url: "https://www.permaform.com.au/" },
      { name: "Capral Aluminium — custom fabrication", url: "https://www.capral.com.au/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Base-flashing", label: "Base flashing" },
  { id: "Weep-flashing", label: "Weep flashing" },
  { id: "SS-316", label: "SS-316" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Weep-hole", label: "Weep holes" },
  { id: "Cavity-drain", label: "Cavity drain" },
  { id: "Coastal", label: "Coastal" },
  { id: "Marine-zone", label: "Marine zone" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "Factory-folded", label: "Factory folded" },
  { id: "Termite-barrier", label: "Termite barrier" },
  { id: "Cavity-closer", label: "Cavity closer" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  zone: string;
  weepHoles: string;
  insectMesh: string;
  termite: string;
  primaryUse: string;
}[] = [
  {
    product: "SS316 Base Weep Flashing",
    brand: "Metroll / Steel & Tube",
    material: "316L Stainless — 1.5 mm",
    zone: "Marine (< 200 m ocean)",
    weepHoles: "10 mm Ø @ 450 mm centres",
    insectMesh: "SS316 mesh factory bonded",
    termite: "No — add cavity closer",
    primaryUse: "Marine / coastal — 50+ year service",
  },
  {
    product: "Anodised Aluminium Base Weep",
    brand: "Capral / Ullrich",
    material: "6063-T5 Anodised — 1.6 mm",
    zone: "Coastal (200 m–1 km)",
    weepHoles: "10 mm Ø @ 450 mm centres",
    insectMesh: "SS316 mesh factory bonded",
    termite: "No — add cavity closer",
    primaryUse: "Standard coastal cladding",
  },
  {
    product: "Colorbond Base Weep",
    brand: "Stratco / Metroll",
    material: "Colorbond Ultra — 0.55 mm BMT",
    zone: "Coastal (C4, up to 1 km)",
    weepHoles: "10 mm Ø @ 450 mm centres",
    insectMesh: "Site-applied (not factory)",
    termite: "No — add cavity closer",
    primaryUse: "Colour-matched residential",
  },
  {
    product: "Termite Weep + Cavity Closer",
    brand: "Permaform / Capral",
    material: "Alum or SS316 per zone",
    zone: "Coastal or marine per material",
    weepHoles: "10 mm Ø @ 450 mm centres",
    insectMesh: "Integrated via closer profile",
    termite: "Yes — NCC B3.2 compliant",
    primaryUse: "Termite risk zones M, H, VH",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Base of cladding panel run — drain cavity at ground level or base of building",
    "At each storey (fire barrier level) in multi-storey cavity drain systems",
    "Base weep at base of every vertical cladding section — mandatory in all rainscreen systems",
    "High-risk termite zones: base weep + cavity closer system — NCC B3.2",
    "Marine zone facades: SS316 base weep — 50+ year service",
    "Residential Colorbond cladding: colour-matched base weep set",
  ],
  selectionCriteria: [
    "Marine zone < 200 m: SS316 — mandatory for long-term performance",
    "Coastal zone 200 m–1 km: anodised aluminium or Colorbond Ultra",
    "General zone > 1 km: Colorbond or mill-finish aluminium acceptable",
    "Termite risk zones M/H/VH: base weep + cavity closer — NCC B3.2",
    "Insect mesh: specify for all cavities containing thermal insulation",
    "Fire barrier locations: base weep required at both sides of each barrier",
  ],
  limitations: [
    "Weep holes must remain clear — blocked weeps cause water ponding in cavity",
    "Anti-insect mesh accumulates debris — annual inspection and cleaning required",
    "End dams mandatory at each end of base weep to prevent side run",
    "Must coordinate with fire barrier locations at each floor level",
    "Termite cavity closer must be continuous — any gap is a termite entry point",
    "All metals must be isolated from dissimilar metals — galvanic corrosion",
  ],
  standardsNotes: [
    "AS/NZS 2904: damp-proof courses and flashings — materials and installation",
    "NCC 2022 Part B3: resistance to subterranean termite attack",
    "AS 3660.1: termite management — new building work",
    "NCC 2022 Part F1: damp and weatherproofing — cavity drainage",
    "AS 1562.1: sheet roof cladding — cavity and base flashing details",
    "AS 4284: testing of building facades — cavity drainage performance",
  ],
  suitableDefects: [
    "Water ponding at base of cladding — missing or failed base weep flashing",
    "Termite damage in cavity — cavity closer missing or perforated",
    "Corroded base weep flashing in coastal zone — replace with anodised alum or SS316",
    "ACP remediation — new base weep required at base of new cladding system",
    "Blocked weep holes causing cavity flooding — clean or replace flashing",
    "Multi-storey cavity drainage — base weeps required at each fire barrier level",
  ],
  typicalSubstrates: [
    "Concrete slab edge: fix upstand to slab edge with SS316 screws",
    "Masonry base course: mechanical fix to block with SS316 screws",
    "Steel bottom rail: screw-fix to bottom rail with SS316 self-drilling screws",
    "Steel stud frame base: screw-fix to bottom plate with SS316 screws",
    "FC sheet bottom edge: flashing bears on slab or footing below panel",
    "Fire barrier (Pronto board or similar): flashing returns at each barrier",
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

export function BaseWeepIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are base and weep flashing systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Base weep flashings terminate the cladding system at each horizontal break — the base of the building and at each floor level in multi-storey construction. Their primary function is to drain water collected in the cavity to the outside, preventing it from ponding and saturating the thermal insulation and primary structure.
        </p>
        {expanded && (
          <>
            <p>
              In multi-storey rainscreen cladding, fire barriers are installed at each floor level to close the cavity and prevent fire propagation. Each closed section of cavity requires its own base weep flashing — a base weep above and below each fire barrier. Without this, water can accumulate above the fire barrier with no drainage path, leading to prolonged saturation of insulation and the primary structural elements.
            </p>
            <p>
              In termite risk zones M, H, and VH (most of coastal Queensland, NT, and northern WA), base weep flashings must be combined with a cavity closer to prevent termite entry through the open weep holes. NCC 2022 Part B3.2 requires a compliant physical or chemical termite barrier — the cavity closer flashing is the physical barrier at the cladding base.
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

export function BaseWeepProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — base and weep flashings — scroll to view all</p>
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
              Side-by-side comparison of base and weep flashing systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Zone</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weep holes</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Insect mesh</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Termite</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.zone}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.weepHoles}</td>
                  <td className="px-4 py-3 text-slate-600">{row.insectMesh}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.termite}</td>
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
