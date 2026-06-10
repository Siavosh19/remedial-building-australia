"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Colorbond"
  | "Ultra"
  | "BlueScope"
  | "Lysaght"
  | "Stramit"
  | "0.55BMT"
  | "Box-gutter"
  | "Pre-painted"
  | "Custom-formed";

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
    fullLabel: "BlueScope Steel",
    brandUrl: "https://www.bluescopesteel.com.au",
    tdsUrl: "https://www.bluescopesteel.com.au/steel-products/colorbond-ultra-steel",
    accentColor: "#0369a1",
    name: "BlueScope Colorbond Ultra Steel (box gutter lining)",
    descriptionLine: "Colorbond Ultra is BlueScope's premium roofing steel with enhanced durability for box gutter applications. 0.55BMT to 1.0mm available. Custom roll-formed by fabricator to box gutter profile. Widest colour range.",
    productType: "Pre-painted Colorbond steel — box gutter lining — custom roll-formed",
    filterTags: ["Colorbond", "Ultra", "BlueScope", "0.55BMT", "Box-gutter", "Pre-painted"],
    techChips: [
      { label: "Colorbond Ultra", cls: "bg-sky-100 text-sky-800" },
      { label: "BlueScope Steel", cls: "bg-slate-100 text-slate-700" },
      { label: "0.55BMT to 1.0mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-painted", cls: "bg-green-50 text-green-700" },
      { label: "Custom roll-formed", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "BlueScope Colorbond Ultra Steel is BlueScope's premium pre-painted steel product with an enhanced coating system providing superior corrosion resistance compared to standard Colorbond. For box gutter lining applications, Colorbond Ultra steel coil is supplied to a specialist roofing or sheet metal fabricator who roll-forms the steel to the required box gutter profile on site or in their workshop. The fabricator determines the profile geometry based on the hydraulic design, catchment area, and existing gutter dimensions. Colorbond Ultra provides the widest colour range of any Colorbond product and is particularly suited to Class 2 strata buildings in coastal, industrial, or high-corrosivity environments where the extended coating durability is warranted. The BlueScope warranty for Colorbond Ultra is the longest in the Colorbond range — confirm current warranty terms and conditions with BlueScope Steel. BMT (base metal thickness) selection — typically 0.55BMT for residential or light commercial and 0.75mm to 1.0mm for heavier-duty or wider gutter applications — must be confirmed by the roofing engineer or fabricator against the box gutter design and AS 1562.3 minimum thickness requirements. Do not specify Colorbond Ultra based on colour alone — confirm the steel grade, BMT, and coating system against the project environment and AS 1562.3.",
    technicalProperties: [
      "Pre-painted Colorbond Ultra steel — enhanced ACTIVATE technology coating system — superior corrosion resistance compared to standard Colorbond",
      "BMT range: 0.55mm to 1.0mm — confirm required BMT against AS 1562.3 and hydraulic design",
      "Full Colorbond colour range — widest colour selection in the Colorbond product family",
      "Custom roll-formed by specialist fabricator to the specified box gutter profile — not a standard off-the-shelf profile",
      "Welded or mechanically lapped and sealed joints depending on fabricator capability and specification — confirm joint method with fabricator",
      "Suitable for coastal, industrial, and high-corrosivity environments where enhanced coating durability is warranted",
      "AS 1562.3 compliance depends on correct design, fabrication, and installation — not an inherent product property",
    ],
    limitations: [
      "Not a standard stock item — Colorbond Ultra box gutter lining must be custom roll-formed by a specialist fabricator — lead time must be confirmed before programming works",
      "BMT must be specified by the roofing engineer — do not assume 0.55BMT is adequate for all box gutter applications",
      "Colorbond steel must not be in direct contact with copper, lead, or treated timber without appropriate separation — dissimilar metal corrosion risk",
      "All laps, joints, and penetrations must be sealed — leaking laps at joints are a primary failure mode in box gutter linings",
      "Colorbond is not suitable for use in highly acidic or alkaline environments — confirm suitability for the specific exposure environment with BlueScope",
      "Box gutter design must comply with AS 1562.3 and must be confirmed by a licensed hydraulic or roofing engineer before fabrication — product alone does not guarantee compliance",
    ],
    procurementSources: [
      { name: "BlueScope Steel — coil supply to fabricators", url: "https://www.bluescopesteel.com.au" },
      { name: "Lysaght — distribution and fabrication", url: "https://www.lysaght.com" },
      { name: "Local roofing and sheet metal fabricators — confirm capability", url: "https://www.masterbuilders.com.au" },
    ],
  },
  {
    fullLabel: "Lysaght (BlueScope Distribution)",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#f97316",
    name: "Lysaght Custom-Formed Colorbond Box Gutter",
    descriptionLine: "Lysaght (BlueScope Distribution) supply and custom-form Colorbond box gutter profiles to specification. Standard box gutter and wide-pan profiles available.",
    productType: "Custom-formed Colorbond box gutter — Lysaght fabrication",
    filterTags: ["Colorbond", "Lysaght", "Custom-formed", "Box-gutter"],
    techChips: [
      { label: "Lysaght fabrication", cls: "bg-orange-100 text-orange-800" },
      { label: "Custom-formed", cls: "bg-slate-100 text-slate-700" },
      { label: "BlueScope Distribution", cls: "bg-slate-100 text-slate-700" },
      { label: "Standard and wide-pan profiles", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Lysaght is BlueScope's principal steel distribution and fabrication business in Australia. Lysaght fabricates and supplies custom-formed Colorbond box gutter profiles to contractor specification through their national branch network. For Class 2 strata box gutter remediation projects, Lysaght can supply custom-profiled Colorbond box gutter sections fabricated to the dimensions required by the roofing engineer or hydraulic design. Lysaght stock standard box gutter and wide-pan profiles and can custom roll-form non-standard profiles where required. Specify the required profile dimensions, BMT, Colorbond colour, and required joint method when requesting a quotation. Lysaght branches can provide technical advice on steel selection and fabrication capability. Their national branch network provides good geographic coverage across Australia — confirm the nearest branch with fabrication capability before specifying. Lysaght-fabricated Colorbond box gutters use BlueScope Colorbond steel as the base material.",
    technicalProperties: [
      "Custom-formed Colorbond box gutter fabricated by Lysaght to contractor-specified profile dimensions",
      "Fabricated from BlueScope Colorbond steel — confirm grade (standard Colorbond vs Colorbond Ultra) when ordering",
      "Standard box gutter and wide-pan profiles stocked at major branches — non-standard profiles custom-formed on request",
      "National branch network — confirm local branch fabrication capability and lead time before specifying",
      "Profile dimensions, BMT, Colorbond colour, and joint method must be specified at time of order",
      "Suitable for all standard box gutter remediation applications on Class 2 strata buildings",
    ],
    limitations: [
      "Lead time for custom-formed profiles varies by branch and current workload — confirm before programming works",
      "BMT and profile design must be confirmed by the roofing engineer against AS 1562.3 — Lysaght fabrication does not substitute for design engineering",
      "Confirm Colorbond grade (standard vs Ultra) with Lysaght at time of order — do not assume Ultra is the default",
      "Not suitable for copper contact or contact with treated timber without separation — standard Colorbond dissimilar metal precautions apply",
      "All joints, laps, and outlet connections must be detailed and sealed by the installing contractor — Lysaght supplies fabricated sections, not a complete system",
    ],
    procurementSources: [
      { name: "Lysaght — national branches", url: "https://www.lysaght.com" },
      { name: "BlueScope Distribution", url: "https://www.bluescopesteel.com.au" },
    ],
  },
  {
    fullLabel: "Stramit Building Products",
    brandUrl: "https://www.stramit.com.au",
    accentColor: "#16a34a",
    name: "Stramit Colorbond Box Gutter",
    descriptionLine: "Stramit custom-formed Colorbond box gutter. Alternative to Lysaght for contractor specification.",
    productType: "Custom-formed Colorbond box gutter — Stramit fabrication",
    filterTags: ["Colorbond", "Stramit", "Custom-formed", "Box-gutter"],
    techChips: [
      { label: "Stramit fabrication", cls: "bg-green-100 text-green-800" },
      { label: "Custom-formed", cls: "bg-slate-100 text-slate-700" },
      { label: "Colorbond steel", cls: "bg-slate-100 text-slate-700" },
      { label: "Alternative to Lysaght", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Stramit Building Products is an alternative Colorbond steel fabrication supplier for custom box gutter profiles. Stramit fabricates roofing and gutter products from BlueScope Colorbond steel through their national branch network, providing a competitive alternative to Lysaght for contractors and project managers specifying custom Colorbond box gutter lining. The selection process and specification requirements are similar to Lysaght — provide the required profile dimensions, BMT, Colorbond colour, and joint type at the time of enquiry. Stramit branch coverage differs from Lysaght in some regions — confirm which supplier has a branch with appropriate fabrication capability closest to the project location. For large box gutter remediation projects, obtaining quotations from both Lysaght and Stramit is recommended to ensure competitive pricing. Both suppliers fabricate from BlueScope Colorbond steel and the final product performance of correctly fabricated and installed Colorbond box gutter lining is comparable between the two suppliers.",
    technicalProperties: [
      "Custom-formed Colorbond box gutter fabricated by Stramit to contractor-specified profile dimensions",
      "Fabricated from BlueScope Colorbond steel — confirm grade when ordering",
      "National branch network — confirm local coverage and fabrication capability before specifying",
      "Competitive alternative to Lysaght for custom Colorbond box gutter fabrication",
      "Profile dimensions, BMT, and colour must be confirmed at time of order",
    ],
    limitations: [
      "Branch coverage differs from Lysaght in some regions — confirm local availability before specifying",
      "Lead time for custom profiles varies — confirm before programming works",
      "BMT and profile design must be confirmed by the roofing engineer against AS 1562.3",
      "All standard Colorbond dissimilar metal precautions apply — no copper or treated timber contact without separation",
      "Confirm current product range and fabrication capability with Stramit before specifying",
    ],
    procurementSources: [
      { name: "Stramit Building Products — national branches", url: "https://www.stramit.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Colorbond", label: "Colorbond" },
  { id: "Ultra", label: "Colorbond Ultra" },
  { id: "BlueScope", label: "BlueScope" },
  { id: "Lysaght", label: "Lysaght" },
  { id: "Stramit", label: "Stramit" },
  { id: "0.55BMT", label: "0.55BMT" },
  { id: "Box-gutter", label: "Box gutter" },
  { id: "Pre-painted", label: "Pre-painted" },
  { id: "Custom-formed", label: "Custom-formed" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  steelGrade: string;
  colourOptions: string;
  thickness: string;
  customProfile: string;
}[] = [
  {
    product: "Colorbond Ultra Steel",
    brand: "BlueScope",
    steelGrade: "Colorbond Ultra — ACTIVATE technology",
    colourOptions: "Full Colorbond range — widest selection",
    thickness: "0.55BMT to 1.0mm",
    customProfile: "Yes — custom roll-formed by fabricator to specification",
  },
  {
    product: "Lysaght Custom Box Gutter",
    brand: "Lysaght (BlueScope Distribution)",
    steelGrade: "BlueScope Colorbond (confirm grade — standard or Ultra)",
    colourOptions: "Full Colorbond range",
    thickness: "Confirm at order",
    customProfile: "Yes — standard and wide-pan profiles, non-standard on request",
  },
  {
    product: "Stramit Colorbond Box Gutter",
    brand: "Stramit Building Products",
    steelGrade: "BlueScope Colorbond (confirm grade at order)",
    colourOptions: "Full Colorbond range",
    thickness: "Confirm at order",
    customProfile: "Yes — custom-formed to specification",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement lining of failed or corroded box gutters on Class 2 strata buildings — internal gutters built into the roof structure",
    "New lining installed over existing corroded gutter where the substrate structure is still sound",
    "Box gutter rehabilitation on commercial, institutional, and multi-residential buildings",
    "Projects in coastal, industrial, or high-corrosivity environments where Colorbond Ultra enhanced durability is warranted",
    "Standard box gutter remediation where a pre-painted, colour-matched roofing steel lining is required",
  ],
  selectionCriteria: [
    "BMT (base metal thickness) — confirm against AS 1562.3 minimum requirements and hydraulic design",
    "Colorbond grade — standard Colorbond vs Colorbond Ultra — based on site environment and corrosivity category",
    "Colour selection — confirm against existing roof colour for visual match",
    "Fabricator capability — confirm the selected fabricator can roll-form the required profile to the required dimensions and tolerances",
    "Joint method — welded vs mechanically lapped and sealed — confirm with the fabricator and roofing engineer",
    "Lead time — custom roll-formed profiles have lead times — confirm before programming",
    "Outlet sizing and positioning — must be sized by a licensed hydraulic engineer for the catchment area",
  ],
  limitations: [
    "Colorbond steel must not contact copper, lead, or treated timber without an appropriate separation layer — dissimilar metal corrosion is a primary failure mode",
    "All joints, laps, and outlet connections must be properly sealed — leaking joints are the most common failure in box gutter linings",
    "Colorbond is not a self-sealing product — unsealed penetrations and poorly formed laps will leak",
    "Box gutter design must be confirmed by a licensed hydraulic or roofing engineer — the product alone does not guarantee a compliant or functional design",
    "Not suitable for highly acidic or alkaline environments — confirm suitability with BlueScope for unusual exposure conditions",
    "Custom-formed profiles cannot be returned to stock — incorrect dimensions result in material waste and programme delays",
  ],
  standardsNotes: [
    "AS 1562.3 — Design and Installation of Sheet Metal Roof and Wall Cladding — Part 3: Aluminium — note: Colorbond is covered under the steel standard AS 1562.1",
    "AS 1562.1 — Design and Installation of Sheet Metal Roof and Wall Cladding — Part 1: Steel — primary standard for Colorbond box gutter design and installation",
    "NCC Volume One — performance requirements for roof drainage on Class 2 buildings",
    "BlueScope Colorbond Technical Specification and Warranty Conditions — confirm current version before specifying",
    "Hydraulic design — box gutter must be sized by a licensed hydraulic engineer for the roof catchment area",
  ],
  suitableDefects: [
    "Box gutter lining corrosion — corroded or perforated existing lining requiring replacement",
    "Box gutter leakage — lining failure at joints, laps, or outlets causing water ingress to the building",
    "Undersized box gutter — gutter requires widening or deepening as part of remediation — new lining to hydraulic design",
    "Heritage and commercial buildings requiring colour-matched pre-painted steel lining",
  ],
  typicalSubstrates: [
    "Existing timber or steel box gutter structure — must be confirmed as structurally sound before lining is installed",
    "Concrete or masonry gutter substrate — confirm compatibility with Colorbond fixings and edge conditions",
    "Steel or aluminium gutter substrate — confirm dissimilar metal requirements before specifying",
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

export function BoxGutterColorbondIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are Colorbond steel box gutter lining systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Colorbond steel box gutter lining systems consist of pre-painted BlueScope Colorbond steel sheet, custom roll-formed by a specialist roofing or sheet metal fabricator to the required box gutter profile and installed within the existing box gutter structure. Unlike external quad or half-round gutters, box gutters are internal gutters built into the roof structure — their failure typically causes water ingress directly into the building fabric and is a critical defect in Class 2 strata buildings.
        </p>
        {expanded && (
          <>
            <p>
              Colorbond steel is the most common lining material for box gutter remediation in Australia. It is cost-effective, widely available, pre-painted in a wide colour range, and well suited to the Australian climate. The steel is supplied in coil to the fabricator who roll-forms it to the required profile on a roll-forming machine. Custom profile dimensions — width, depth, return legs — are determined by the hydraulic design and the physical constraints of the existing gutter structure.
            </p>
            <p>
              Product selection must consider the BMT (base metal thickness), Colorbond grade (standard vs Ultra), the joint and lap method, outlet sizing and positioning, overflow provision, and compliance with AS 1562.1 (steel sheet metal roofing) and the hydraulic design requirements of AS 3500.3. Box gutter design must be confirmed by a licensed hydraulic or roofing engineer.
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

export function BoxGutterColorbondProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 2 brands — Colorbond steel box gutter lining — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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
              Side-by-side comparison of Colorbond steel box gutter lining products. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Steel grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Colour options</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Custom profile</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.steelGrade}</td>
                  <td className="px-4 py-3 text-slate-600">{row.colourOptions}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600">{row.customProfile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
