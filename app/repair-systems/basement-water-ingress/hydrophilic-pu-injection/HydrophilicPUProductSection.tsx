"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "1C-PU" | "2C-PU"
  | "Expanding-foam" | "Gel-type"
  | "Active-flow" | "Joint-sealing"
  | "Crack-injection" | "EN-1504-5" | "Hydrophilic";

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
    brandUrl: "https://aus.sika.com",
    accentColor: "#cc0000",
    name: "Sika Injection-107",
    descriptionLine: "1-component hydrophilic polyurethane injection foam — water-activated expanding foam — active water leaks in cracks and joints",
    productType: "1C hydrophilic PU injection foam",
    filterTags: ["1C-PU", "Expanding-foam", "Active-flow", "Joint-sealing", "Crack-injection", "EN-1504-5", "Hydrophilic"],
    techChips: [
      { label: "1-component", cls: "bg-sky-100 text-sky-800" },
      { label: "Hydrophilic PU foam", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-activated expansion", cls: "bg-slate-100 text-slate-700" },
      { label: "Active water — yes", cls: "bg-green-50 text-green-700" },
      { label: "EN 1504-5", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Injection-107 is a 1-component hydrophilic polyurethane injection resin that reacts with water to form an expanding, flexible, closed-cell foam. When injected into a water-active crack or construction joint in a basement wall or slab, the resin contacts the water present in the crack and undergoes a chemical reaction that causes it to expand — filling the crack void, displacing the water, and forming a resilient, water-impermeable foam seal. The expansion ratio and foam density depend on the water-to-resin ratio at the injection point: higher water content produces more rapid and voluminous expansion.\n\nIn Australian Class 2 strata basement remediation, Sika Injection-107 is the primary product selected for sealing actively leaking cracks — where water is actively seeping or running through a crack or joint at the time of injection. It is delivered through pre-drilled injection packers spaced at 200–300mm centres along the crack, injected at low to medium pressure using a single-component injection pump. Inject until refusal at each port, working sequentially. Cap completed ports before moving to the next. After curing, any residual crack surface can be overcoated with crystalline slurry or cementitious render.\n\nSika Injection-107 is confirmed in the Sika Australia injection product range. Confirm current product availability, TDS version, and packer compatibility with Sika Australia at aus.sika.com before specifying.",
    technicalProperties: [
      "1-component polyurethane — no mixing required — supplied ready to inject",
      "Hydrophilic chemistry — reacts on contact with water — suitable for active water leaks",
      "Expanding foam formation — fills crack void and surrounding porous zone — closed-cell structure after cure",
      "Flexible after cure — accommodates minor ongoing structural movement without re-cracking",
      "Suitable for concrete, masonry, and brick basement walls and slabs",
      "Can be re-injected if secondary leakage occurs after initial treatment",
      "EN 1504-5 compliant — crack injection principle C and S",
    ],
    limitations: [
      "Foam expansion ratio varies with water content — very high water flow may wash resin away before cure — apply packers at closer centres and reduce injection pressure",
      "Not suitable for dry cracks — requires water presence to react — for dry or dormant cracks use epoxy injection or 2C PU gel system",
      "Foam is flexible — not structural — does not restore structural continuity across crack — structural assessment required before specifying injection as sole repair",
      "Post-injection leak recurrence is possible if the underlying cause (groundwater pressure, structural movement) is not addressed",
      "Do not use in potable water contact applications without confirming compliance with AS/NZS 4020 or relevant food-contact standard with Sika Australia",
      "Confirm current product name, formulation, and packer compatibility with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — contact for current pricing and trade supply", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Tradelink (trade plumbing/building supply)", url: "https://www.tradelink.com.au" },
    ],
  },
  {
    fullLabel: "Master Builders Solutions (BASF)",
    brandUrl: "https://www.master-builders-solutions.com/en-au",
    accentColor: "#003591",
    name: "BASF MasterInject 1308",
    descriptionLine: "1-component hydrophilic polyurethane injection resin — gel or foam behaviour — basement cracks, joints and voids",
    productType: "1C hydrophilic PU injection resin",
    filterTags: ["1C-PU", "Expanding-foam", "Gel-type", "Active-flow", "Joint-sealing", "Crack-injection", "EN-1504-5", "Hydrophilic"],
    techChips: [
      { label: "1-component", cls: "bg-sky-100 text-sky-800" },
      { label: "Gel or foam", cls: "bg-slate-100 text-slate-700" },
      { label: "Low viscosity", cls: "bg-slate-100 text-slate-700" },
      { label: "Active water — yes", cls: "bg-green-50 text-green-700" },
      { label: "EN 1504-5", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "BASF MasterInject 1308 is a 1-component hydrophilic polyurethane injection resin in the Master Builders Solutions MasterInject range, formulated for sealing water-active cracks, construction joints, and voids in concrete basement walls and slabs. Like all hydrophilic PU injection resins, MasterInject 1308 reacts on contact with water — expanding to fill the crack void and form a flexible, waterproof seal. The gel-to-foam ratio depends on the water content: in saturated cracks with active water flow, the resin tends toward foam expansion; in damp cracks with limited free water, it forms a denser, gel-type seal.\n\nMasterInject 1308 is used in Australian strata basement waterproofing remediation where active seepage through cracks or construction joints requires immediate waterproofing without the substrate drying period required by epoxy or acrylic systems. It is injected through drill-in packers at 200–300mm centres using a single-component pump at low to moderate pressure.\n\nConfirm current product name, product number, and availability with Master Builders Solutions Australia before specifying — BASF product names and numbers have changed with the rebranding from BASF Construction Chemicals to Master Builders Solutions. Check master-builders-solutions.com/en-au for current Australian product listings.",
    technicalProperties: [
      "1-component hydrophilic PU — no metering or mixing — minimises site error",
      "Low viscosity before reaction — penetrates fine cracks and voids effectively under low pressure",
      "Gel-to-foam transition depending on free water content — versatile in varying moisture conditions",
      "Flexible after cure — accommodates minor movement — suitable for live joints with minor ongoing movement",
      "Good adhesion to concrete and masonry substrates in wet conditions",
      "Can be re-injected through same packers if secondary leakage occurs",
      "EN 1504-5 classification — confirm with BASF Australia for current product compliance status",
    ],
    limitations: [
      "High free water or running water can wash resin before cure — reduce injection pressure and inject at closer packer spacings in high-flow conditions",
      "Not a structural repair — does not restore concrete continuity — structural assessment required",
      "Post-cure expansion can generate lateral pressure in narrow cracks in confined masonry — assess before injection in unreinforced masonry",
      "Foam density and waterproofing performance depend on injection technique — poor technique produces voids — specialist contractor recommended",
      "BASF product naming has changed significantly — confirm MasterInject 1308 is the current Australian product name before ordering",
      "Confirm potable water contact suitability with BASF before use in water storage or tank applications",
    ],
    procurementSources: [
      { name: "Master Builders Solutions Australia — contact for current pricing", url: "https://www.master-builders-solutions.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#cc0000",
    name: "Sika Injection-101 RC",
    descriptionLine: "2-component hydrophilic polyurethane injection resin — controlled gel time — construction joints, fine cracks with controlled flow",
    productType: "2C hydrophilic PU injection resin",
    filterTags: ["2C-PU", "Gel-type", "Joint-sealing", "Crack-injection", "EN-1504-5", "Hydrophilic"],
    techChips: [
      { label: "2-component", cls: "bg-sky-100 text-sky-800" },
      { label: "Controlled gel time", cls: "bg-slate-100 text-slate-700" },
      { label: "Hydrophilic PU gel", cls: "bg-slate-100 text-slate-700" },
      { label: "Low viscosity", cls: "bg-slate-100 text-slate-700" },
      { label: "EN 1504-5", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Injection-101 RC is a 2-component hydrophilic polyurethane injection resin in the Sika injection range, distinguished from 1-component systems by its adjustable gel time — the ratio of components can be varied to set gel time from approximately 30 seconds to several minutes, allowing the injection technician to control how quickly the resin sets in the crack before being displaced by water. This makes the 2C system preferred over 1C systems in specific conditions: where water flow velocity is too high for 1C resin to set before being washed through, or where a denser gel (rather than foam) is required for void filling.\n\nIn Australian Class 2 strata basement waterproofing, Sika Injection-101 RC is typically specified by injection contractors where 1C PU foam injection has failed due to resin washout — the gel time can be accelerated to set the resin before the active water flow displaces it. It requires a 2-component injection pump with accurate metering and mixing capability. Specialist contractor and equipment required.\n\nConfirm current product name, mixing ratio, and packer compatibility with Sika Australia at aus.sika.com before specifying.",
    technicalProperties: [
      "2-component PU — gel time adjustable by varying component ratio — suitable for high water flow conditions",
      "Hydrophilic — water presence in crack accelerates set — reacts in wet conditions",
      "Dense gel formation — less foam expansion than 1C systems — preferred for controlled filling of voids and joints",
      "Low viscosity before mixing — penetrates fine cracks under moderate injection pressure",
      "Flexible after cure — accommodates minor movement",
      "EN 1504-5 classification — confirm current compliance status with Sika Australia",
    ],
    limitations: [
      "Requires 2-component injection pump with accurate metering — significantly more complex equipment requirement than 1C systems",
      "Specialist contractor required — incorrect component ratio produces incorrect gel time — site errors result in injection failure",
      "Not a structural repair — gel does not restore structural continuity across crack",
      "Higher cost than 1C systems due to equipment and specialist labour requirement",
      "For mild active seepage and construction joints, 1C Sika Injection-107 is simpler and adequate in most strata basement applications",
      "Confirm current product name, component ratio, and packer compatibility with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — contact for current pricing and trade supply", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "1C-PU", label: "1-component" },
  { id: "2C-PU", label: "2-component" },
  { id: "Expanding-foam", label: "Expanding foam" },
  { id: "Gel-type", label: "Gel type" },
  { id: "Active-flow", label: "Active water flow" },
  { id: "Joint-sealing", label: "Joint sealing" },
  { id: "Crack-injection", label: "Crack injection" },
  { id: "EN-1504-5", label: "EN 1504-5" },
  { id: "Hydrophilic", label: "Hydrophilic" },
];

const COMPARISON_ROWS: {
  product: string;
  brand: string;
  type: string;
  behaviour: string;
  activeFlow: string;
  gelTime: string;
  en15045: string;
  keyRestriction: string;
}[] = [
  {
    product: "Injection-107",
    brand: "Sika",
    type: "1C",
    behaviour: "Expanding foam",
    activeFlow: "Yes",
    gelTime: "Fast (water-activated)",
    en15045: "Yes",
    keyRestriction: "High flow may wash resin — reduce pressure, closer spacings",
  },
  {
    product: "MasterInject 1308",
    brand: "BASF",
    type: "1C",
    behaviour: "Gel or foam",
    activeFlow: "Yes",
    gelTime: "Fast (water-activated)",
    en15045: "Confirm with BASF AU",
    keyRestriction: "Confirm current product name with BASF AU",
  },
  {
    product: "Injection-101 RC",
    brand: "Sika",
    type: "2C",
    behaviour: "Controlled gel",
    activeFlow: "Yes (preferred for high flow)",
    gelTime: "Adjustable (30s to min)",
    en15045: "Yes",
    keyRestriction: "2C pump required — specialist contractor essential",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Active seeping cracks in basement concrete walls — water actively moving through crack at time of injection",
    "Construction joints showing active water ingress — typically horizontal joint between slab and wall pour",
    "Cold joints in basement slabs — where construction pours were interrupted and joints have become water pathways",
    "Pipe penetration annular spaces — where services pass through basement walls and the annular space is leaking",
    "Tie rod holes — post-tensioned or form tie rod holes providing water pathways through basement walls",
    "Masonry and brick basement walls — water moving through mortar joints or brick cracks",
  ],
  selectionCriteria: [
    "1C Sika Injection-107: first-choice product for most active basement crack sealing — simple, single-component, water-activated — no metering required",
    "1C BASF MasterInject 1308: alternative 1C product where BASF is the preferred supply chain — confirm current product name before ordering",
    "2C Sika Injection-101 RC: specify when 1C products have failed due to resin washout in high-velocity water flow — gel time can be shortened to resist washout",
    "Dry or dormant cracks: hydrophilic PU is not appropriate — use epoxy injection for structural crack repair, or acrylic gel for fine cracks in stable concrete",
    "Packer spacing: 200–300mm for tight cracks in good concrete; 150mm for wide or badly cracked zones",
    "Always assess structural condition before injecting — injection does not restore structural capacity",
  ],
  limitations: [
    "Not structural — foam/gel does not restore concrete tensile strength across crack — structural engineer must confirm crack does not require structural repair",
    "High water flow can wash 1C resins before cure — use 2C system or install temporary water management (tampon) before injection",
    "Post-cure re-cracking can occur if crack continues to grow — movement must be stabilised before injection is permanent",
    "Hydrophilic foam will swell with continued water exposure — acceptable in most applications but confirm with engineer for confined spaces",
    "Not suitable for hairline cracks below 0.2mm width — resin cannot penetrate — acrylic acrylate injection is preferred for hairline cracks",
    "Not suitable for potable water tank injection without confirming AS/NZS 4020 compliance with manufacturer",
  ],
  standardsNotes: [
    "EN 1504-5 — Products and systems for the protection and repair of concrete structures — Concrete injection — both Sika products comply",
    "AS 3600 Concrete Structures — structural engineer must confirm whether crack injection alone is adequate or whether structural repair is required",
    "AS 4858 Wet area membranes — not applicable to injection systems but relevant for subsequent membrane work over injected cracks",
    "NCC Volume One — basement waterproofing performance requirements — no specific injection standard in NCC; designer specifies system and performance outcome",
    "Confirm current EN 1504-5 compliance and any Australian certification with manufacturer before specifying for public or critical infrastructure",
  ],
  suitableDefects: [
    "Active water ingress through basement wall cracks — seeping or weeping cracks in reinforced concrete basement walls",
    "Active leaking construction joints in basement walls — most common single defect in below-ground concrete basement structures",
    "Cold joint water ingress — joints between sequential concrete pours that have not been adequately treated during construction",
    "Active leaking tie rod holes — water entering through form tie rod voids in poured concrete basement walls",
    "Pipe penetration annular gaps — water bypassing inadequate penetration seals around service pipes through basement walls",
  ],
  typicalSubstrates: [
    "Reinforced concrete basement walls — in-situ poured — most common substrate for hydrophilic PU injection in Australian strata",
    "Reinforced concrete slabs (basement floor or soffit) — for slab cracks and cold joint treatment",
    "Masonry brick or block basement walls — injection into mortar joint or through brick via drill-in packers",
    "Precast concrete panels — confirm suitability with manufacturer before injection in precast elements",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : <span className="font-semibold text-slate-600">{src.name}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function HydrophilicPUIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are hydrophilic PU injection systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Hydrophilic polyurethane injection systems are single or two-component resins that react chemically with water to form an expanding, flexible, waterproof foam or gel. Injected under low to medium pressure through ports or packers installed along a leaking crack or joint, the resin contacts the water present in the crack, undergoes a chemical expansion reaction, fills the void, and cures to a resilient seal that stops active water ingress. Unlike epoxy injection — which requires a dry crack and restores structural continuity — hydrophilic PU injection is designed specifically for wet conditions and for waterproofing, not structural repair.
        </p>
        {expanded && (
          <>
            <p>
              In Australian Class 2 strata basement remediation, hydrophilic PU injection is the primary technique for sealing active water ingress through cracks and construction joints in concrete basement walls and slabs. The crack does not need to be dry — in fact, the presence of water is what activates the resin. After injection, the foam or gel seal is flexible, accommodating minor ongoing movement, and can be re-injected if secondary leakage occurs through the same path. For joints or cracks with significant ongoing movement, hydrophilic PU injection is typically combined with backer rod and polyurethane sealant at the surface, or with a cavity drain system behind the wall to manage any residual moisture.
            </p>
            <p>
              The selection between 1-component and 2-component systems is driven primarily by the water flow velocity at the time of injection. 1C systems — Sika Injection-107 and BASF MasterInject 1308 — are simpler and sufficient for most active seepage and slowly dripping joints. For high-velocity water flow where 1C resin is being washed through before it can cure, a 2C system with adjustable, shortened gel time — Sika Injection-101 RC — allows the contractor to set the resin before it is displaced. In either case, injection is a specialist technique: correct packer spacing, injection pressure, and sequencing are critical to achieving a complete seal without voids.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
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

export function HydrophilicPUProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, 1C vs 2C selection, packer spacing, standards, substrates and limitations</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Product Selection — 1C vs 2C" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 2 brands — Sika / BASF MBS — scroll to view all</p>
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
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
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
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
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

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Hydrophilic PU injection system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Confirmed Australian products. Confirm current product names and EN 1504-5 status with manufacturer before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Behaviour</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Active flow</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Gel time</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">EN 1504-5</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Sika" ? "#cc0000" : "#003591" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.behaviour}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.activeFlow}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.gelTime}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.en15045}</td>
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
