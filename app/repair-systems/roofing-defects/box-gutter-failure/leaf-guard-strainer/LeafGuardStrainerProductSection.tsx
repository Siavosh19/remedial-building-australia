"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Leaf-guard"
  | "Aluminium-mesh"
  | "Australian-made"
  | "Leaf-Stopper"
  | "Gutter-brush"
  | "Polypropylene"
  | "Easy-install"
  | "Hedgehog"
  | "Gutter-mesh"
  | "Custom-fit";

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
    fullLabel: "Gutter Pro Products",
    brandUrl: "https://www.leafstopper.com.au",
    accentColor: "#16a34a",
    name: "Leaf Stopper (Gutter Pro Products)",
    descriptionLine: "Leaf Stopper aluminium mesh leaf guard in standard profiles for quad, half-round and box gutters. Australian-made. Stops leaves while allowing water flow.",
    productType: "Aluminium mesh leaf guard — Australian-made — box, quad, and half-round gutter profiles",
    filterTags: ["Leaf-guard", "Aluminium-mesh", "Australian-made", "Leaf-Stopper"],
    techChips: [
      { label: "Aluminium mesh", cls: "bg-green-100 text-green-800" },
      { label: "Australian-made", cls: "bg-slate-100 text-slate-700" },
      { label: "Box gutter profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Quad and half-round also", cls: "bg-green-50 text-green-700" },
      { label: "Leaf Stopper brand", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Leaf Stopper is an Australian-manufactured aluminium mesh leaf guard system produced by Gutter Pro Products. It is available in profiles specifically designed for box gutters, quad gutters, and half-round gutters — the appropriate profile must be selected for the gutter type. For box gutter applications, the Leaf Stopper mesh is fixed to the gutter edges to form a continuous mesh cover across the full gutter width, excluding leaves and large debris while allowing rainwater to pass through the mesh apertures and drain into the gutter below. Aluminium construction provides good corrosion resistance and long service life. Leaf Stopper is an Australian-made product which may be a requirement for some procurement specifications. The mesh aperture size must be considered in relation to the leaf type in the local environment — coarser mesh will exclude large leaves but may not prevent fine debris, seed pods, or bark from entering the gutter. In BAL (Bushfire Attack Level) rated zones, the mesh specification must be confirmed against AS 3959 ember protection requirements — not all standard leaf guard products satisfy BAL ember protection requirements. Leaf Stopper produces a specific ember guard product for BAL-rated applications — confirm with Gutter Pro Products which product is appropriate for the BAL zone. Regular inspection of the mesh surface is still required — debris builds up on top of the mesh and must be brushed off periodically.",
    technicalProperties: [
      "Aluminium mesh leaf guard — profiles available for box, quad, and half-round gutters",
      "Australian-made — Gutter Pro Products manufacture",
      "Mesh apertures exclude leaves and large debris while allowing rainwater to drain through",
      "Long service life — aluminium construction — corrosion resistant",
      "BAL-rated ember protection products available — confirm specific product with Gutter Pro Products for BAL applications",
      "Fixed installation — secured to gutter edges — no clips or additional fixing accessories required in most profiles",
    ],
    limitations: [
      "Does not eliminate gutter maintenance — debris accumulates on mesh surface and must be periodically brushed off",
      "Standard mesh aperture may not exclude fine debris, seed pods, or pine needles in areas with these vegetation types",
      "BAL zone applications — confirm that the selected Leaf Stopper product meets AS 3959 ember protection requirements — do not assume standard mesh is BAL-rated",
      "Must not be installed in a way that impedes overflow system function — confirm that leaf guard installation does not cover or obstruct overflow scuppers or weirs",
      "Regular inspection still required — leaf guards reduce cleaning frequency but do not eliminate the need for gutter inspection",
      "Box gutter profile must be selected — standard quad gutter profiles are not appropriate for box gutter applications",
    ],
    procurementSources: [
      { name: "Leaf Stopper / Gutter Pro Products — direct", url: "https://www.leafstopper.com.au" },
      { name: "Bunnings — selected products in-store", url: "https://www.bunnings.com.au" },
      { name: "Roofing trade suppliers — national", url: "https://www.masterbuilders.com.au" },
    ],
  },
  {
    fullLabel: "Hedgehog Gutter Products",
    brandUrl: "https://www.hedgehog.com.au",
    accentColor: "#7c2d12",
    name: "Hedgehog Gutter Brush",
    descriptionLine: "Polypropylene bristle brush insert for gutters. Allows water to flow through while blocking leaves. Easy to install without fixing — suitable for maintenance-focused applications.",
    productType: "Polypropylene gutter brush insert — easy install — no fixing required",
    filterTags: ["Gutter-brush", "Polypropylene", "Easy-install", "Hedgehog"],
    techChips: [
      { label: "Gutter brush insert", cls: "bg-orange-100 text-orange-800" },
      { label: "Polypropylene bristle", cls: "bg-slate-100 text-slate-700" },
      { label: "No fixing required", cls: "bg-green-50 text-green-700" },
      { label: "Easy install and remove", cls: "bg-slate-100 text-slate-700" },
      { label: "Hedgehog brand", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Hedgehog Gutter Brush is a polypropylene bristle brush insert that sits inside the gutter — leaves and debris are caught in the bristles on top of the brush while water flows through the bristle structure and drains through the primary outlet. The key advantage of the Hedgehog system is its ease of installation and removal — no fixings, brackets, or tools are required. The brush is cut to length and pushed into the gutter — this makes it particularly well suited to maintenance-focused applications where the strata building manager or maintenance contractor wants a simple debris reduction product that can be removed and replaced without specialist tools or contractors. Hedgehog is also easy to clean — the brush can be removed, shaken or hosed off, and replaced. However, it must be noted that the Hedgehog brush is not suitable for BAL (Bushfire Attack Level) ember protection applications — polypropylene is combustible and the product does not satisfy AS 3959 ember protection requirements. On Class 2 strata buildings in BAL-rated zones, Hedgehog is not an appropriate leaf guard product and an aluminium mesh product with confirmed BAL rating should be specified instead. The Hedgehog brush is available in standard sizes to suit common gutter widths — confirm the appropriate size for the specific box gutter width before ordering.",
    technicalProperties: [
      "Polypropylene bristle brush insert — sits inside the gutter — leaves trapped in bristles, water drains through",
      "No fixing required — push-fit installation and removal — no tools or specialist contractor needed",
      "Easy to clean — remove, hose off or shake, and replace",
      "Available in standard sizes for common gutter widths — confirm size for specific box gutter application",
      "Low cost — suitable for maintenance-focused applications where ease of installation and removal is a priority",
    ],
    limitations: [
      "NOT suitable for BAL-rated zones — polypropylene is combustible — does not satisfy AS 3959 ember protection requirements — do not install in BAL-rated applications",
      "Bristles can become compacted with fine debris over time — requires periodic removal and cleaning to maintain effectiveness",
      "Debris accumulates in the bristles — if not cleaned, the brush itself can become a debris dam that causes ponding",
      "Not a fixed installation — brush can shift or be displaced by strong water flow in heavy rainfall events",
      "Not recommended as a primary leaf guard for high leaf-load environments — better suited to moderate debris environments",
      "Must not obstruct overflow system function — confirm that the brush does not cover or impede overflow scuppers or weirs",
    ],
    procurementSources: [
      { name: "Hedgehog Gutter Products — direct", url: "https://www.hedgehog.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Hardware and roofing suppliers", url: "https://www.tradetools.com.au" },
    ],
  },
  {
    fullLabel: "Klip-Lok Gutter Mesh",
    brandUrl: "https://www.kliplok.com.au",
    accentColor: "#0369a1",
    name: "Klip-Lok Gutter Mesh",
    descriptionLine: "Aluminium gutter mesh product for custom installation over box and external gutters. Custom-fit to gutter width. Fixed installation.",
    productType: "Aluminium gutter mesh — custom-fit — fixed installation — box and external gutters",
    filterTags: ["Aluminium-mesh", "Gutter-mesh", "Custom-fit"],
    techChips: [
      { label: "Aluminium gutter mesh", cls: "bg-sky-100 text-sky-800" },
      { label: "Custom-fit", cls: "bg-slate-100 text-slate-700" },
      { label: "Fixed installation", cls: "bg-slate-100 text-slate-700" },
      { label: "Box and external gutters", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Klip-Lok Gutter Mesh is an aluminium mesh gutter protection product designed for custom fitting and fixed installation over box gutters and standard external gutters. The mesh is cut to the required width to span the gutter opening and fixed at the gutter edges, providing a continuous debris exclusion barrier across the full gutter width. Aluminium construction provides corrosion resistance and long service life. The custom-fit approach allows the product to be installed on non-standard gutter widths where standard profile leaf guard products may not be available. The fixed installation provides greater stability than a brush insert — the mesh is less likely to be displaced by heavy rainfall or wind. Klip-Lok Gutter Mesh is suitable for use as a primary leaf guard on box gutters where a fixed aluminium mesh product is preferred over a brush insert. Confirm whether the specific mesh product satisfies BAL ember protection requirements before specifying in BAL-rated zones — not all aluminium mesh products have confirmed BAL ratings. Confirm the mesh aperture size against the leaf type and debris profile at the project location — a finer mesh will exclude more debris types but may be more prone to surface clogging from fine material.",
    technicalProperties: [
      "Aluminium gutter mesh — custom-cut to required width for box gutter applications",
      "Fixed installation — secured at gutter edges — greater stability than brush inserts",
      "Suitable for box gutters and standard external gutters — non-standard widths can be accommodated by custom cutting",
      "Aluminium construction — corrosion resistant — long service life",
      "Mesh aperture excludes leaves and large debris — confirm aperture size against local debris profile",
    ],
    limitations: [
      "BAL zone suitability — confirm specific mesh product satisfies AS 3959 ember protection requirements before specifying in BAL-rated applications",
      "Regular inspection still required — debris accumulates on mesh surface and must be periodically removed",
      "Fine debris, seed pods, and fine bark may pass through or clog the mesh depending on aperture size — consider local vegetation when selecting mesh aperture",
      "Must not impede overflow system function — confirm that mesh installation does not cover or obstruct overflow scuppers or weirs",
      "Confirm current product range and availability with Klip-Lok before specifying — confirm product is suitable for box gutter application",
      "Fixed installation requires removal for gutter cleaning — factor this into the maintenance programme",
    ],
    procurementSources: [
      { name: "Klip-Lok Gutter Mesh — direct", url: "https://www.kliplok.com.au" },
      { name: "Roofing trade suppliers — national", url: "https://www.masterbuilders.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Leaf-guard", label: "Leaf guard" },
  { id: "Aluminium-mesh", label: "Aluminium mesh" },
  { id: "Australian-made", label: "Australian-made" },
  { id: "Leaf-Stopper", label: "Leaf Stopper" },
  { id: "Gutter-brush", label: "Gutter brush" },
  { id: "Polypropylene", label: "Polypropylene" },
  { id: "Easy-install", label: "Easy install" },
  { id: "Hedgehog", label: "Hedgehog" },
  { id: "Gutter-mesh", label: "Gutter mesh" },
  { id: "Custom-fit", label: "Custom-fit" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  material: string;
  maintenanceInterval: string;
  diyInstall: string;
  profileCompatibility: string;
}[] = [
  {
    product: "Leaf Stopper",
    brand: "Gutter Pro Products",
    type: "Aluminium mesh — fixed to gutter edge",
    material: "Aluminium",
    maintenanceInterval: "Inspect annually — brush debris off surface as required",
    diyInstall: "Yes — but box gutter access typically requires contractor",
    profileCompatibility: "Box, quad, and half-round gutter profiles — confirm correct profile",
  },
  {
    product: "Hedgehog Gutter Brush",
    brand: "Hedgehog Gutter Products",
    type: "Polypropylene bristle brush insert",
    material: "Polypropylene — NOT BAL-rated",
    maintenanceInterval: "Inspect 6-monthly — remove and clean annually or as required",
    diyInstall: "Yes — push-fit, no fixings required",
    profileCompatibility: "Standard gutter widths — confirm size for box gutter application",
  },
  {
    product: "Klip-Lok Gutter Mesh",
    brand: "Klip-Lok",
    type: "Aluminium mesh — custom-fit fixed installation",
    material: "Aluminium",
    maintenanceInterval: "Inspect annually — remove mesh for access when required",
    diyInstall: "Yes — custom cut and fix at gutter edges",
    profileCompatibility: "Box and external gutters — custom width available",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Reducing primary outlet blockage frequency in box gutters on Class 2 strata buildings with significant leaf load from adjacent trees",
    "Maintenance reduction strategy for strata buildings where annual gutter cleaning costs are high due to heavy debris accumulation",
    "BAL zone applications where ember protection requirements mandate specific mesh specifications — aluminium mesh with confirmed BAL rating only",
    "Post-remediation leaf management where a new box gutter lining has been installed and the strata manager wishes to protect the new lining from debris-related outlet blockage",
  ],
  selectionCriteria: [
    "Debris type — leaf size, seed pods, pine needles, fine bark — select mesh aperture appropriate for the dominant debris type at the site",
    "BAL rating — if the building is in a BAL-rated zone, confirm that the selected product satisfies AS 3959 ember protection requirements — Hedgehog brush is NOT suitable for BAL zones",
    "Gutter profile — box gutters require a product designed for box gutter geometry — do not use quad gutter profiles on box gutters",
    "Maintenance access — consider how the leaf guard will be removed for gutter cleaning and outlet inspection",
    "Material — aluminium preferred for long-term durability — polypropylene brush products are lower cost but shorter life and not BAL-rated",
    "Overflow compatibility — confirm that the leaf guard installation does not impede overflow scupper or weir function",
  ],
  limitations: [
    "Leaf guards do not eliminate gutter maintenance — they reduce the frequency of cleaning but regular inspection is still required",
    "Debris accumulates on the mesh or brush surface and must be cleared — a clogged leaf guard can cause water to overflow the mesh and bypass the gutter",
    "Polypropylene products are not suitable for BAL-rated zones — aluminium mesh with a confirmed BAL rating is required",
    "Leaf guards must not impede overflow system function — installation must be checked against the overflow scupper or weir positioning",
    "Fine debris from some vegetation types (she-oak, pin oak, pine) can pass through or clog standard mesh apertures — confirm mesh aperture against local vegetation",
    "Product installation on box gutters typically requires access equipment and a qualified contractor — height and access safety requirements apply",
  ],
  standardsNotes: [
    "AS 3959 — Construction of Buildings in Bushfire-Prone Areas — ember protection requirements for gutters in BAL-rated zones — confirm product compliance before specifying in BAL areas",
    "NCC Volume One — building maintenance obligations for Class 2 buildings — gutter cleaning and inspection requirements",
    "Strata maintenance plans — leaf guard installation and cleaning intervals should be documented in the building's maintenance plan",
    "BAL certificates — confirm the building's BAL rating from the current fire attack level assessment before specifying leaf guard products",
  ],
  suitableDefects: [
    "Box gutter primary outlet recurring blockage from leaf debris — high leaf load causing frequent blockage and overflow",
    "Box gutter failure attributed to chronic debris-induced outlet blockage — leaf guard as part of the remediation and prevention strategy",
    "Post-remediation debris management — protecting new box gutter lining and outlets from future debris accumulation",
  ],
  typicalSubstrates: [
    "Existing or new box gutter lining — leaf guard fixed to the gutter edges or set inside the gutter",
    "Colorbond, aluminium, or copper box gutter linings — confirm material compatibility of fixing clips with lining material",
    "Access safety — box gutter work requires appropriate fall protection and access equipment — confirm safe access before installing or maintaining leaf guards",
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

export function LeafGuardStrainerIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are leaf guard and strainer basket systems for box gutters?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Leaf guard and strainer basket systems are debris exclusion products installed on or in box gutters to reduce the accumulation of leaves, bark, and other debris in the gutter and at the primary drainage outlet. Debris blockage of box gutter outlets is one of the primary causes of box gutter overflow and water ingress in Class 2 strata buildings — leaf guards are a maintenance reduction strategy to reduce the frequency and severity of outlet blockage.
        </p>
        {expanded && (
          <>
            <p>
              Leaf guards do not eliminate gutter maintenance. Debris accumulates on the surface of the mesh or in the bristles of a gutter brush — if not periodically cleared, the leaf guard itself becomes the source of blockage. Regular inspection of both the leaf guard surface and the primary outlet below the guard is essential. Strainer baskets at individual outlets provide a similar function — they prevent large debris from entering the downpipe while allowing water and fine material to drain.
            </p>
            <p>
              In BAL (Bushfire Attack Level) rated zones, the mesh specification of a leaf guard must satisfy AS 3959 ember protection requirements. Not all standard leaf guard products are BAL-rated — confirm with the supplier before specifying in any bushfire-prone area. Polypropylene gutter brush products are explicitly not suitable for BAL-rated zones.
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

export function LeafGuardStrainerProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — leaf guard and strainer basket systems — scroll to view all</p>
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
                  <div className="mt-0.5">
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

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of leaf guard and strainer basket systems for box gutters. Confirm BAL zone suitability and overflow compatibility before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Maintenance interval</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">DIY install</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile compatibility</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.maintenanceInterval}</td>
                  <td className="px-4 py-3 text-slate-600">{row.diyInstall}</td>
                  <td className="px-4 py-3 text-slate-600">{row.profileCompatibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
