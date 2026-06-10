"use client";

import { useState, useRef } from "react";
import { Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag =
  | "PU-Sealant"
  | "MS-Polymer"
  | "Silicone"
  | "1-Component"
  | "Exterior"
  | "Paintable"
  | "Floor-Joint"
  | "Traffickable";

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
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-and-protection.html",
    accentColor: "#0369a1",
    name: "Sika Sikaflex-11FC — 1-Component PU Sealant for Joints and Cracks",
    descriptionLine: "1-component moisture-cure PU — ISO 11600 Class 12.5 (±12.5% movement) — 300 mL cartridge and 600 mL sausage — exterior and interior joints",
    productType: "1-component polyurethane joint and crack sealant — ISO 11600 Class 12.5 — Sika Australia",
    filterTags: ["PU-Sealant", "1-Component", "Exterior", "Paintable"],
    techChips: [
      { label: "ISO 11600 Class 12.5 — ±12.5%", cls: "bg-sky-100 text-sky-800" },
      { label: "300 mL / 600 mL sausage", cls: "bg-slate-100 text-slate-700" },
      { label: "Paintable after full cure", cls: "bg-green-50 text-green-700" },
      { label: "Primer often required", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Sikaflex-11FC is a single-component, moisture-cure polyurethane sealant rated ISO 11600 Class 12.5 (±12.5% movement capability — not the higher Class 25 / ±25% as sometimes assumed). It is the most commonly specified general-purpose PU joint sealant in Australian remedial building practice — used for sealing moving cracks, construction joints, and control joints in concrete where the joint must tolerate moderate cyclic movement without debonding or tearing. For higher movement joints (±25%), specify Sikaflex-11 FC+ instead. Available in 300 mL cartridges and 600 mL sausage packs for high-volume work; grey, white, black, and beige standard colours. Backer rod required for joints wider than 10 mm to control sealant depth to the target 1:2 ratio (depth:width). Cures by absorbing ambient humidity — full cure approximately 7 days at 20°C and 50% RH. Used on slabs, walls, balcony edges, construction joints, and cracked pavement surfaces. Primer required on most porous substrates — confirm primer type and substrate preparation from the current Sika Australia TDS before applying. Paintable after full cure with most standard paints — confirm paint compatibility from Sika TDS. Source: aus.sika.com TDS for Sikaflex-11 FC, November 2023 Version 01.03.",
    technicalProperties: [
      "1-component moisture-cure PU — ISO 11600 Class 12.5 — ±12.5% movement capability",
      "300 mL cartridge and 600 mL sausage pack — grey, white, black, beige standard colours",
      "Backer rod required for joints wider than 10 mm — depth:width target 1:2",
      "Paintable after full cure — confirm paint compatibility from Sika TDS",
      "Sika Australia — national supply and trade hardware",
    ],
    limitations: [
      "Do not apply to damp or wet joint faces — moisture-cure PU bubbles and fails to cure correctly if applied to water-wet concrete",
      "Primer required on most porous substrates — confirm primer type from Sika TDS for each substrate",
      "Do not paint over uncured sealant — most standard paints do not adhere to uncured PU — allow full cure (7 days) before overpainting",
      "Shelf life is moisture-sensitive — opened cartridges skin over rapidly at the nozzle — use end cap and store sealed",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au/products",
    accentColor: "#15803d",
    name: "TODO: owner confirm — Fosroc Nitoseal MS300 is not listed on current fosroc.com.au; the current Fosroc AU MS polymer sealant range is Nitoseal MS250 (general joints) and Nitoseal MS400 (trafficable floor joints, ±20% movement, 600 mL) — confirm correct product and update",
    descriptionLine: "TODO: owner confirm — Nitoseal MS300 not found on fosroc.com.au (June 2026); current AU MS polymer products are Nitoseal MS250 and MS400; Nitoseal MS400 has ±20% movement (not ±25%), 600 mL pack, no primer on most substrates, isocyanate-free — verify from current Fosroc AU TDS",
    productType: "1-component modified silicone (MS polymer) sealant — paintable — Fosroc / Parchem Australia",
    filterTags: ["MS-Polymer", "1-Component", "Exterior", "Paintable"],
    techChips: [
      { label: "MS polymer — paintable", cls: "bg-emerald-100 text-emerald-800" },
      { label: "TODO: owner confirm — movement % (MS400: ±20%, not ±25%)", cls: "bg-slate-100 text-slate-700" },
      { label: "No primer on most substrates", cls: "bg-green-50 text-green-700" },
      { label: "Isocyanate-free (MS400)", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Fosroc Nitoseal MS300 does not appear on the current fosroc.com.au product listing (June 2026). The current Fosroc Australia MS polymer sealant range is Nitoseal MS250 (general construction joints) and Nitoseal MS400 (trafficable and general joints, ±20% movement, 600 mL and 200 L packs, available in Black, Concrete Grey, White). The MS400 is isocyanate-free, paintable, primerless on concrete/timber/masonry/aluminium/metal/ceramics, and uses Duraflex technology. Note: movement capability of Nitoseal MS400 is ±20% (total 40%), NOT ±25% as stated for MS300 — confirm whether MS250 or MS400 is the correct current AU product for this application. Source: fosroc.com.au/product/nitoseal-ms400 (June 2026).",
    technicalProperties: [
      "TODO: owner confirm — Nitoseal MS300 not on current fosroc.com.au range; update product name to current AU product (MS250 or MS400)",
      "TODO: owner confirm — movement capability: Nitoseal MS400 is ±20% (total 40%), not ±25% — update if MS400 is the specified product",
      "Primerless adhesion to concrete, timber, masonry, aluminium, metal, ceramics (Nitoseal MS400 confirmed)",
      "Isocyanate-free — no isocyanate odour during installation (Nitoseal MS400 confirmed)",
      "Fosroc Australia — national supply",
    ],
    limitations: [
      "MS polymer sealant is NOT a PU foam injection material — it is a surface bead applied to the joint face, not injected into the crack body",
      "Do not apply MS polymer over existing silicone sealant — adhesion failure — remove all silicone residue before applying",
      "Joint must be clean and dry — oil, release agents, or curing compounds on joint faces prevent adhesion",
      "Wide joints greater than 25 mm may not achieve adequate movement performance with MS sealant alone — consult engineer",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national distribution (DuluxGroup)", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products",
    accentColor: "#dc2626",
    name: "Mapei Mapesil AC — Acetoxy Silicone Sealant with Superior UV Resistance",
    descriptionLine: "Acetoxy silicone — excellent UV and weathering resistance — 25% movement — 310 mL cartridge — NOT paintable after cure",
    productType: "Acetoxy silicone joint and crack sealant — exterior UV-stable — Mapei Australia",
    filterTags: ["Silicone", "1-Component", "Exterior"],
    techChips: [
      { label: "Acetoxy silicone", cls: "bg-red-100 text-red-800" },
      { label: "Excellent UV resistance", cls: "bg-slate-100 text-slate-700" },
      { label: "25% movement", cls: "bg-green-50 text-green-700" },
      { label: "NOT paintable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapesil AC is an acetoxy silicone sealant for sealing cracks and movement joints in concrete, masonry, and render. While it is a silicone (not a PU), it is commonly specified in crack sealing scopes alongside PU products and is listed here for comparison. Acetoxy silicone has excellent UV stability and long-term weathering resistance — superior to PU sealants in direct sun exposure. For exterior joints in full sun on facades and roof penetrations, silicone outlasts PU in service. However, unlike PU and MS polymer sealants, acetoxy silicone cannot be painted after curing — paint does not adhere to cured silicone. It also releases acetic acid during cure, which can affect adjacent fresh cementitious materials. Movement capability 25% of joint width. Available in 310 mL cartridges in 34 colours plus transparent, from Mapei Australia nationally. Do not use in locations where overpainting is required — use a PU or MS polymer sealant instead.",
    technicalProperties: [
      "Acetoxy silicone — excellent UV and long-term weathering resistance",
      "25% movement capability — confirmed from Mapei AU product listing (June 2026)",
      "310 mL cartridges — 34 colours plus transparent — Mapei Australia nationally",
      "No primer required on most substrates — direct application",
    ],
    limitations: [
      "Cannot be painted after curing — do not specify acetoxy silicone in locations where the joint will be overcoated",
      "Acetic acid release during cure can affect adjacent fresh cementitious materials — do not apply to freshly placed concrete or render",
      "Do not apply over existing silicone sealant or sealant residue — clean joint to bare concrete before applying",
      "Open-cell backer rod required for silicone sealants — closed-cell rods cause outgassing bubbles in the curing silicone",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au/products",
    accentColor: "#7c3aed",
    name: "TODO: owner confirm — Ardex ST in the current Ardex AU range is a NEUTRAL-CURE SILICONE sealant, not a PU floor joint sealant; the Ardex AU traffickable floor joint sealant is RA 54 (fast-setting semi-rigid polyurea for interior floor control joints, heavy vehicle traffic) or RA 040 (1-component PU joint sealant) — confirm correct product and update all specs",
    descriptionLine: "TODO: owner confirm — Ardex ST on current ardexaustralia.com is a silicone sealant (not PU); if a traffickable interior floor joint sealant is intended, confirm whether RA 54 (polyurea, fast-set, heavy traffic) or RA 040 (1-component PU) is the correct Ardex AU product — update chemistry, specs, and limitations accordingly",
    productType: "TODO: owner confirm — chemistry type requires correction; current Ardex ST is silicone not PU — Ardex Australia",
    filterTags: ["PU-Sealant", "1-Component", "Floor-Joint", "Traffickable", "Paintable"],
    techChips: [
      { label: "TODO: owner confirm — Ardex ST is silicone not PU", cls: "bg-violet-100 text-violet-800" },
      { label: "TODO: confirm traffickable product (try RA 54 or RA 040)", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm grindable floor product", cls: "bg-green-50 text-green-700" },
      { label: "Ardex trade supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Ardex ST in the current ardexaustralia.com range is a neutral-cure silicone sealant (not a PU floor joint sealant) — all claims about PU chemistry, traffickability, and grindability for this product name are incorrect for the current AU product. The Ardex AU traffickable interior floor joint sealant is RA 54 (fast-setting semi-rigid polyurea for interior control joints and heavy vehicle traffic, industrial floors) or RA 040 (1-component PU joint sealant for general joints). Confirm which product is intended and update all fields accordingly. Source: ardexaustralia.com/products_category/concrete-repair/construction-sealants/ and ardexaustralia.com/products_category/concrete-repair/crack-repair-injection/ (June 2026).",
    technicalProperties: [
      "TODO: owner confirm — Ardex ST is a silicone sealant in current AU range, not a PU floor joint sealant — correct product is likely RA 54 (polyurea) or RA 040 (PU)",
      "TODO: owner confirm — traffickability and grindability claims must be verified against correct Ardex AU product TDS",
      "TODO: owner confirm — RA 54 is fast-setting semi-rigid polyurea for heavy vehicle traffic floor joints — confirm if this is the intended product",
      "Ardex Australia — national trade supply",
    ],
    limitations: [
      "TODO: owner confirm — chemistry type needs correction; Ardex ST is silicone not PU — update all limitations once correct product is confirmed",
      "TODO: owner confirm — if RA 54 (polyurea) is the correct product, it is interior-focused and traffickable; confirm cure time and UV tolerance from Ardex AU TDS",
      "TODO: owner confirm — cross-reference to Sikaflex-11FC and Nitoseal MS300 in original text are both potentially incorrect (Nitoseal MS300 not in current AU range)",
      "Backer rod required at correct depth before applying — confirm backer rod requirements from correct Ardex AU product TDS",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://www.ardex.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "PU-Sealant", label: "PU sealant" },
  { id: "MS-Polymer", label: "MS polymer" },
  { id: "Silicone", label: "Silicone" },
  { id: "1-Component", label: "1-component" },
  { id: "Exterior", label: "Exterior rated" },
  { id: "Paintable", label: "Paintable" },
  { id: "Floor-Joint", label: "Floor joint" },
  { id: "Traffickable", label: "Traffickable" },
];

const SYSTEM_COMPARISON = [
  { product: "Sika Sikaflex-11FC", chemistry: "1-component PU", movement: "±12.5% (Class 12.5)", paintable: "After full cure", exterior: "Yes", primerRequired: "Often required" },
  { product: "TODO: confirm AU product name (Nitoseal MS300 not on fosroc.com.au — try MS250 or MS400)", chemistry: "MS polymer (hybrid)", movement: "TODO: confirm (MS400: ±20% not ±25%)", paintable: "Yes", exterior: "Yes", primerRequired: "Not required (MS400 confirmed)" },
  { product: "Mapei Mapesil AC", chemistry: "Acetoxy silicone", movement: "25%", paintable: "No", exterior: "Excellent UV", primerRequired: "Not required" },
  { product: "TODO: confirm AU product name (Ardex ST is silicone not PU — try RA 54 polyurea or RA 040 PU)", chemistry: "TODO: confirm chemistry type", movement: "TODO: confirm", paintable: "TODO: confirm", exterior: "Interior focus (RA 54)", primerRequired: "TODO: confirm" },
];

const TECH_INFO = {
  typicalApplications: [
    "Sealing moving cracks in concrete slabs, balcony edges, and walls where the joint must tolerate cyclic thermal and live load movement",
    "Construction joints and control joints in carpark decks, slabs, and facade panels — PU or MS polymer sealant over backer rod",
    "Interior floor control joints in warehouses, industrial floors, and commercial slabs — Ardex ST for traffickable flush-fill",
    "Exterior facade joints where the sealant will be overcoated — MS polymer (TODO: confirm current AU product — Nitoseal MS300 not on fosroc.com.au; use MS250 or MS400) for better paint adhesion",
    "High-UV-exposure exterior joints on roofs and facades where sealant longevity is the priority — silicone (Mapesil AC)",
  ],
  selectionCriteria: [
    "Joint will be painted → MS polymer (TODO: confirm current AU product name — Nitoseal MS300 not on fosroc.com.au; try MS250 or MS400) or PU with full cure first — not silicone",
    "High UV exterior joint not painted → acetoxy silicone (Mapesil AC, 25% movement) for long service life",
    "Interior floor joint requiring traffickable flush-fill → TODO: confirm correct Ardex AU product (Ardex ST is silicone; for trafficable floor joints use RA 54 polyurea or RA 040 PU)",
    "General facade crack or construction joint → Sikaflex-11FC with backer rod and primer",
    "Backer rod pairing: PU and MS polymer → closed-cell PE rod; silicone → open-cell PE rod",
    "Depth:width ratio 1:2 — for a 20 mm wide joint, sealant depth should be 10 mm — backer rod controls this",
  ],
  limitations: [
    "Surface sealants do not penetrate the crack body — they seal the face only; for depth treatment use injection resins",
    "Sealant applied to a joint without backer rod fills the full joint depth — creating a rigid plug that tears under movement rather than stretching",
    "Silicone sealants cannot be painted after curing — do not substitute Mapesil AC where a painted finish is required",
    "Sealant applied to contaminated, painted, or release-agent-coated joint faces will fail adhesively — joint preparation is mandatory",
    "Do not apply sealant in temperatures below 5°C or above 40°C — confirm temperature limits from TDS",
  ],
  standardsNotes: [
    "ISO 11600 — Building Construction: Sealants — Classification and Requirements — Class 12.5 = ±12.5% movement (Sikaflex-11FC); Class 25 = ±25% movement (Sikaflex-11 FC+); Class G = glazing",
    "AS 3600 — Concrete Structures — engineer must design joint locations and spacing — sealants maintain the joint; the joint design prevents cracking",
    "SafeWork Australia — PU sealants contain isocyanates — ventilation, nitrile gloves, and eye protection required for application in enclosed spaces",
    "ASTM C1193 — Standard Guide for Use of Joint Sealants — joint geometry, backer rod sizing, and surface preparation guidance",
  ],
  suitableDefects: [
    "Moving cracks and control joints in concrete slabs, walls, and facades requiring watertight flexible seal",
    "Construction joints in carpark decks and podium slabs — PU sealant over backer rod after joint cleaning",
    "Interior floor control joints — traffickable and grindable-flush sealant",
    "Post-injection surface sealing of cracks after PU or epoxy crack injection",
  ],
  typicalSubstrates: [
    "In-situ concrete — joint faces must be clean, dry, and free of laitance, curing compound, and release agent",
    "Precast concrete panels — confirm primer requirement from sealant TDS for dense precast surfaces",
    "Render and masonry — MS polymer and PU sealants generally compatible — confirm primer requirement",
    "Metal and glass substrates — silicone and MS polymer more suited than PU for non-porous substrates — confirm from TDS",
  ],
};

export function SealantsPUIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Sealant joint geometry — why backer rod depth matters</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          The single most common sealant failure in concrete crack and joint sealing is incorrect joint geometry — too deep a sealant fill without a backer rod. The sealant depth should be half the joint width (depth:width 1:2). Without a backer rod, sealant fills the full depth of the joint, creating a thick, rigid plug that tears when the joint moves rather than stretching.
        </p>
        {expanded && (
          <>
            <p>
              The backer rod also creates a bond-break at the back of the joint so the sealant only bonds to the two opposing faces (two-point bonding). Three-point bonding — also bonded at the back — prevents the hourglass elongation that gives sealants their movement capability. This rule is consistently ignored in practice and accounts for the majority of premature sealant cohesive failure in concrete joint work.
            </p>
            <p>
              Backer rod pairing matters: closed-cell PE for PU and MS polymer sealants; open-cell PE for silicone sealants. Silicone releases acetic acid during cure — trapped gas creates bubbles in the sealant if applied over closed-cell foam. The joint looks fine but internal voids concentrate stress under movement and cause premature failure.
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

export function SealantsPUProductSection() {
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

  const visibleProducts = activeFilters.size === 0
    ? PRODUCTS
    : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
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

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 products — PU, MS polymer, silicone, and floor joint sealants — scroll to view all</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
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
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
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
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of joint sealant chemistry options. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Chemistry</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Movement</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Paintable?</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Exterior use</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primer required</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.chemistry}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.movement}</td>
                  <td className="px-4 py-3 text-slate-600">{row.paintable}</td>
                  <td className="px-4 py-3 text-slate-600">{row.exterior}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primerRequired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
