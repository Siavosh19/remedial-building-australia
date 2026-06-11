"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Terracotta" | "Ceramic" | "Non-combustible" | "NCC-2022" | "AS-1530.1"
  | "Coastal" | "No-maintenance" | "Back-ventilated" | "Extruded"
  | "Slip-fit" | "Open-joint" | "Grooved" | "Steni" | "Shildan" | "Moeding";

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
    fullLabel: "Moeding Alphaton Terracotta",
    brandUrl: "https://www.moeding.de/en/",
    accentColor: "#b45309",
    name: "Moeding Alphaton",
    descriptionLine: "Extruded terracotta rainscreen — zero maintenance, fully non-combustible.",
    productType: "Extruded Terracotta Panel",
    filterTags: ["Terracotta", "Non-combustible", "NCC-2022", "AS-1530.1", "Coastal", "No-maintenance", "Back-ventilated", "Extruded", "Open-joint", "Moeding"],
    techChips: [
      { label: "Non-combustible Group 1", cls: "bg-green-100 text-green-800" },
      { label: "NCC-2022 Compliant", cls: "bg-blue-100 text-blue-800" },
      { label: "AS 1530.1 Fire Tested", cls: "bg-purple-100 text-purple-800" },
      { label: "Coastal Zone Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "Open-joint System", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Moeding Alphaton terracotta panels are extruded from natural clay and fired at high temperature, producing a fully inorganic, non-combustible product classified Group 1 under NCC 2022. The open back-ventilated rainscreen configuration uses aluminium horizontal rails to carry slip-fit terracotta laths, allowing thermal movement without sealants. The material is inherently UV-stable, frost-resistant, and requires no painting or sealing over a 50+ year service life — ideal for high-rise remediation where future maintenance access is constrained.",
    technicalProperties: [
      "Group 1 non-combustible — AS 1530.1",
      "Panel thickness: 25–40 mm extruded",
      "Panel width: 300–600 mm standard lath",
      "Panel length: up to 1,500 mm",
      "Mass: 35–55 kg/m²",
      "Water absorption < 6%",
      "Thermal linear expansion: 6 × 10⁻⁶/°C",
      "Service life: 50+ years no maintenance",
    ],
    limitations: [
      "Higher unit cost than FC or HPL systems",
      "Specialist installer required — slip-fit rail system",
      "Limited colour range (natural clay tones)",
      "Minimum panel clearance 25 mm from substrate for ventilation",
      "Structural engineer review required for bracket loads on high-rise",
    ],
    procurementSources: [
      { name: "Moeding Australia", url: "https://www.moeding.de/en/" },
      { name: "Shildan (distributor)", url: "https://www.shildan.com.au/" },
    ],
  },
  {
    fullLabel: "Shildan Argeton Terracotta System",
    brandUrl: "https://www.shildan.com.au/",
    tdsUrl: "https://www.shildan.com.au/argeton/",
    accentColor: "#0369a1",
    name: "Shildan Argeton",
    descriptionLine: "German slip-fit terracotta — wide lath range with concealed aluminium rail.",
    productType: "Slip-fit Terracotta Panel",
    filterTags: ["Terracotta", "Non-combustible", "NCC-2022", "AS-1530.1", "Coastal", "No-maintenance", "Back-ventilated", "Extruded", "Slip-fit", "Shildan"],
    techChips: [
      { label: "Group 1 Non-combustible", cls: "bg-green-100 text-green-800" },
      { label: "NCC-2022 Compliant", cls: "bg-blue-100 text-blue-800" },
      { label: "Slip-fit Rail System", cls: "bg-purple-100 text-purple-800" },
      { label: "Coastal Rated", cls: "bg-sky-100 text-sky-800" },
      { label: "German DIN Certified", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Shildan Argeton is a German-engineered extruded terracotta cladding system with a comprehensive Australian distribution network. Panels clip onto horizontal aluminium rails with no visible fixings — the slip-fit joint allows individual panel removal for maintenance or replacement without disturbing adjacent units. The system has been tested to Australian wind pressure requirements and fire tested to AS 1530.1 Group 1. Available in a range of Australian-specific colours and textures, with technical support from Shildan for facade engineering.",
    technicalProperties: [
      "Group 1 non-combustible — AS 1530.1",
      "Panel thickness: 25–30 mm",
      "Lath widths: 225, 300, 450 mm",
      "Lengths: up to 1,200 mm standard",
      "Mass: 30–45 kg/m²",
      "Wind load tested to AS/NZS 1170.2",
      "Individual panel replaceability",
      "Concealed aluminium rail — anodised",
    ],
    limitations: [
      "Specialist installer required — Shildan trained",
      "Lead times: 12–20 weeks ex-Germany",
      "Limited to horizontal lath configuration",
      "Minimum 20 mm ventilation gap required",
      "Structural review needed for heavy panels on lightweight frames",
    ],
    procurementSources: [
      { name: "Shildan Australia", url: "https://www.shildan.com.au/" },
      { name: "Shildan Argeton Product", url: "https://www.shildan.com.au/argeton/" },
    ],
  },
  {
    fullLabel: "Steni Colour Glass Fibre Panel",
    brandUrl: "https://www.steni.no/en/",
    tdsUrl: "https://www.steni.no/en/products/steni-colour/",
    accentColor: "#7c3aed",
    name: "Steni Colour",
    descriptionLine: "Norwegian glass-fibre composite — non-combustible, unlimited colour range.",
    productType: "Glass Fibre Composite Panel",
    filterTags: ["Ceramic", "Non-combustible", "NCC-2022", "Coastal", "No-maintenance", "Back-ventilated", "Steni"],
    techChips: [
      { label: "Non-combustible Group 1", cls: "bg-green-100 text-green-800" },
      { label: "NCC-2022 Compliant", cls: "bg-blue-100 text-blue-800" },
      { label: "Unlimited Colours", cls: "bg-purple-100 text-purple-800" },
      { label: "Norwegian ISO Certified", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal Zone Rated", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Steni Colour panels are manufactured from glass fibre reinforced polyester (GRP) with a mineralised surface, classified non-combustible Group 1 under NCC 2022. The panels offer essentially unlimited colour specification including custom RAL matching, making them suitable for facade remediation where colour-matching to existing building elements is critical. The mineral surface is UV-stable, salt-resistant, and self-cleaning in rain. Installed on a concealed secret-fix rail system, Steni panels are lightweight (8–10 kg/m²) — significantly reducing structural loads compared to terracotta or porcelain alternatives.",
    technicalProperties: [
      "Group 1 non-combustible",
      "Panel thickness: 8–10 mm",
      "Panel width: up to 1,200 mm",
      "Panel length: up to 3,000 mm",
      "Mass: 8–10 kg/m² (very lightweight)",
      "Custom RAL colour matching available",
      "UV-stable mineral surface",
      "Salt spray resistance — C5-M environment",
    ],
    limitations: [
      "Not a traditional ceramic — specify correctly for heritage projects",
      "GRP substrate (not clay) — aesthetically different from terracotta",
      "Specialist importer — longer lead times in Australia",
      "Secret-fix system requires accurate substrate framing",
      "Higher cost than FC cladding for equivalent area",
    ],
    procurementSources: [
      { name: "Steni International", url: "https://www.steni.no/en/" },
      { name: "Steni Colour Product", url: "https://www.steni.no/en/products/steni-colour/" },
    ],
  },
  {
    fullLabel: "Laminam Sintered Stone Facade",
    brandUrl: "https://www.laminam.com/en/",
    accentColor: "#e2003a",
    name: "Laminam Sintered Stone",
    descriptionLine: "Italian ultra-thin sintered ceramic — monolithic slabs, large format.",
    productType: "Sintered Stone Panel",
    filterTags: ["Ceramic", "Non-combustible", "NCC-2022", "AS-1530.1", "Coastal", "No-maintenance", "Back-ventilated", "Open-joint"],
    techChips: [
      { label: "Group 1 Non-combustible", cls: "bg-green-100 text-green-800" },
      { label: "NCC-2022 Compliant", cls: "bg-blue-100 text-blue-800" },
      { label: "Large Format — 3.6 × 1.6 m", cls: "bg-purple-100 text-purple-800" },
      { label: "Ultra-Thin 3–12 mm", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal Rated", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Laminam sintered stone panels are manufactured from natural minerals fired at extreme temperature to produce a dense, non-porous ceramic slab with zero water absorption. At 3–12 mm thickness with panels up to 3.6 × 1.6 m, Laminam offers the largest ceramic format available in Australia — reducing joint lines and delivering a monolithic facade appearance. The surface replicates stone, concrete, or metal aesthetics at lower weight than natural stone. Suitable for back-ventilated rainscreen facades with concealed mechanical fixings; the fired ceramic surface requires no sealing, coating, or maintenance.",
    technicalProperties: [
      "Group 1 non-combustible — AS 1530.1",
      "Panel thickness: 3, 5.6, 12 mm",
      "Max panel: 3,600 × 1,600 mm",
      "Mass: 7.5 kg/m² (3 mm) to 30 kg/m² (12 mm)",
      "Water absorption < 0.1% (vitrified)",
      "Frost resistant — F class",
      "Scratch resistant — Mohs 7+",
      "Chemical resistance — Class A",
    ],
    limitations: [
      "Brittle — specialist handling and cutting required on site",
      "Large panels require engineered mechanical fixing system",
      "Specialist importer — Laminam AU — lead times 10–16 weeks",
      "Cutting generates silica dust — wet cut mandatory with PPE",
      "Not suitable for curved surfaces without thermoforming",
    ],
    procurementSources: [
      { name: "Laminam Australia", url: "https://www.laminam.com/en/" },
      { name: "Laminam Products", url: "https://www.laminam.com/en/products/" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Terracotta", label: "Terracotta" },
  { id: "Ceramic", label: "Ceramic / Stone" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "NCC-2022", label: "NCC-2022" },
  { id: "AS-1530.1", label: "AS-1530.1" },
  { id: "Coastal", label: "Coastal Rated" },
  { id: "No-maintenance", label: "No Maintenance" },
  { id: "Back-ventilated", label: "Back-ventilated" },
  { id: "Extruded", label: "Extruded" },
  { id: "Slip-fit", label: "Slip-fit" },
  { id: "Open-joint", label: "Open-joint" },
  { id: "Moeding", label: "Moeding" },
  { id: "Shildan", label: "Shildan" },
  { id: "Steni", label: "Steni" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  thickness: string;
  nccCompliance: string;
  coastal: string;
  maintenance: string;
  primaryUse: string;
}[] = [
  {
    product: "Moeding Alphaton",
    brand: "Moeding",
    material: "Extruded terracotta",
    thickness: "25–40 mm",
    nccCompliance: "Group 1",
    coastal: "Yes",
    maintenance: "None — 50 yr",
    primaryUse: "High-rise remediation",
  },
  {
    product: "Shildan Argeton",
    brand: "Shildan",
    material: "Extruded terracotta",
    thickness: "25–30 mm",
    nccCompliance: "Group 1",
    coastal: "Yes",
    maintenance: "None — 50 yr",
    primaryUse: "High-rise, slip-fit",
  },
  {
    product: "Steni Colour",
    brand: "Steni",
    material: "GRP composite",
    thickness: "8–10 mm",
    nccCompliance: "Group 1",
    coastal: "Yes",
    maintenance: "None — UV stable",
    primaryUse: "Custom colour facades",
  },
  {
    product: "Laminam Sintered Stone",
    brand: "Laminam",
    material: "Sintered ceramic",
    thickness: "3–12 mm",
    nccCompliance: "Group 1",
    coastal: "Yes",
    maintenance: "None — vitrified",
    primaryUse: "Large-format monolithic",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "High-rise residential facade remediation — ACP replacement",
    "Commercial and institutional building envelopes",
    "Back-ventilated rainscreen cladding systems",
    "Heritage-adjacent projects requiring natural material aesthetics",
    "Coastal and marine-exposed facades requiring zero-maintenance",
    "Facades where long service life (50+ years) is mandatory",
  ],
  selectionCriteria: [
    "Terracotta: natural clay aesthetic, 50+ year no-maintenance life",
    "Steni: custom colour specification with lightweight GRP composite",
    "Laminam: monolithic large-format slabs, stone/concrete appearance",
    "Open-joint system: maximises ventilation, avoids sealant failure",
    "Slip-fit rail: individual panel replacement without scaffold disruption",
    "Weight: sintered stone/terracotta heavier — structural engineer review",
  ],
  limitations: [
    "All systems require back-ventilation gap — minimum 20–25 mm",
    "Specialist installation for rail and clip systems — not general trades",
    "Lead times: 10–20 weeks for imported terracotta and ceramic",
    "Structural bracket loads require engineering review on high-rise",
    "Terracotta and ceramic are brittle — site handling protocols mandatory",
    "Cost: typically 2–4× FC cladding for equivalent area coverage",
  ],
  standardsNotes: [
    "AS 1530.1: Methods for fire tests — non-combustibility (Group 1 required NCC Class 2+)",
    "NCC 2022 Volume One — Section C: fire resistance levels for external walls",
    "AS/NZS 1170.2: wind pressure testing for panel and fixing system",
    "AS 4284: testing of building facades — water penetration and air infiltration",
    "ISO 10545: ceramic tile standards — water absorption and mechanical properties",
    "DIN 18516: back-ventilated cladding systems (German standard, widely referenced)",
  ],
  suitableDefects: [
    "ACP cladding — combustible PE-core requiring NCC 2022 replacement",
    "Weathered or failing fibre cement facades approaching end of life",
    "Concrete spalling facades where cladding overcladding is preferred to repair",
    "Facades with persistent water ingress due to failed sealant joints",
    "Buildings where low maintenance over 50+ years is a client priority",
    "Projects with heritage or architectural character requirements",
  ],
  typicalSubstrates: [
    "Concrete columns and beams — bracket anchor points",
    "Steel primary structure with aluminium subframe",
    "Masonry blockwork — anchor bolt subframe attachment",
    "Steel stud framing with structural sheathing (Pronto board or similar)",
    "Existing facade substrate (overcladding — engineer to confirm loads)",
    "Lightweight steel frame — engineer to confirm bracket pull-out capacity",
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

export function TerracottaIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are terracotta and ceramic facade panels?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Terracotta and ceramic facade panels represent the premium tier of non-combustible rainscreen cladding — fully inorganic materials that are inherently Group 1 under NCC 2022 and require no maintenance over a design life exceeding 50 years. They are the preferred replacement for ACP on high-rise residential where long-term performance, aesthetics, and fire compliance must all be satisfied simultaneously.
        </p>
        {expanded && (
          <>
            <p>
              Extruded terracotta panels (Moeding, Shildan Argeton) are formed from natural clay and fired at temperatures exceeding 1,000°C — producing a material with zero organic content that cannot support combustion. The slip-fit rail system allows individual panel replacement without disturbing adjacent cladding, which is critical for high-rise buildings where scaffold access is a major cost centre.
            </p>
            <p>
              Sintered stone panels (Laminam) offer large-format ceramic slabs — up to 3.6 × 1.6 m — that reduce joint lines and deliver a monolithic facade appearance. Ultra-thin at 3–12 mm, they are among the lightest ceramic options available, reducing structural demands on the subframe. Steni glass-fibre composite panels provide a non-combustible alternative with virtually unlimited colour specification — valuable when matching existing building elements or satisfying a heritage colour palette.
            </p>
            <p>
              All systems in this group use a back-ventilated rainscreen configuration — the cavity between panel and substrate allows moisture vapour to escape, preventing interstitial condensation and protecting the thermal insulation and primary structure behind. This is the most durable and thermally efficient external wall configuration available for Australian high-rise remediation.
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

export function TerracottaProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product systems — terracotta and ceramic facade panels — scroll to view all</p>
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
              Side-by-side comparison of terracotta and ceramic facade panel systems. Confirm all product selections against the current manufacturer TDS before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">NCC 2022</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Maintenance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.nccCompliance}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.maintenance}</td>
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
