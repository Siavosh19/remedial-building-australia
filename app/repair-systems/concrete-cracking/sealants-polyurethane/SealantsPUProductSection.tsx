"use client";

import { useState, useRef } from "react";
import { Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle, DataNote } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { SEALANT_PU_CARDS } from "./sealantsPUData";

type FilterTag =
  | "PU-Sealant"
  | "MS-Polymer"
  | "Silicone"
  | "Polyurea"
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
  dataNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/sealants-adhesives/construction-adhesives/sikaflex-11-fc.html",
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
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/pdf/products/datasheets/general%20construction/ARDEX%20RA%20040%20Datasheet.pdf",
    accentColor: "#7c3aed",
    name: "Ardex RA 040 — 1-Component Polyurethane Joint Sealant",
    descriptionLine: "1-component PU — UV/weather stable — primerless adhesion to most substrates — non-sag (vertical and horizontal) — up to 25% movement — 5–30°C application",
    productType: "1-component polyurethane joint and crack sealant — Ardex Australia",
    filterTags: ["PU-Sealant", "1-Component", "Exterior"],
    techChips: [
      { label: "1-component PU", cls: "bg-violet-100 text-violet-800" },
      { label: "Up to 25% movement", cls: "bg-green-50 text-green-700" },
      { label: "Primerless on most substrates", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-sag — vertical + horizontal", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex RA 040 is a one-component, moisture-curing polyurethane joint sealant with good weathering and UV stability and excellent primerless adhesion to most common construction substrates. Its non-sag rheology suits both vertical and horizontal joints. It is used for sealing movement and construction joints, junctions and penetrations, for sealing cracks prior to an approved ARDEX waterproofing membrane, for perimeter sealing between window and door frames, and for joint sealing in pre-fabricated and tilt-up panel buildings. It accommodates joint movement up to 25%. Apply over a closed-cell backer rod at a depth:width ratio of approximately 1:2; substrate and ambient temperature must be between 5°C and 30°C during application and cure. Note: RA 040 is NOT trafficable — for interior floor control joints subject to foot or vehicle traffic use Ardex RA 54 (semi-rigid polyurea, listed alongside). Confirm colour range, any primer requirement for dense/critical substrates, and cure time from the current Ardex RA 040 TDS. Source: ardexaustralia.com Ardex RA 040 product page + datasheet (June 2026).",
    technicalProperties: [
      "1-component moisture-cure PU — UV / weather stable — non-sag rheology for both vertical and horizontal joints",
      "Excellent primerless adhesion to most substrates — confirm for dense or critical substrates from the TDS",
      "Accommodates joint movement up to 25% — apply over closed-cell backer rod at ~1:2 depth:width ratio",
      "Uses: movement and construction joints, junctions, penetrations, crack sealing prior to ARDEX membranes, window/door perimeters, tilt-up panel joints",
      "Application and cure temperature 5–30°C — Ardex Australia national trade supply",
    ],
    limitations: [
      "NOT trafficable — do not use in foot- or vehicle-trafficked floor joints — use Ardex RA 54 (semi-rigid polyurea) instead",
      "Not suitable for continuous water immersion, chlorinated / swimming pool, aquarium, or wastewater environments",
      "Do not apply outside the 5–30°C substrate / ambient range — confirm cure time from the TDS",
      "Apply over backer rod — do not allow three-sided adhesion; joint faces must be clean and dry",
      "Confirm colour range and any primer requirement for dense substrates from the current Ardex RA 040 TDS",
    ],
    procurementSources: [
      { name: "Ardex Australia — national trade supply", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Nitoseal PU400",
    descriptionLine: "1-component polyurethane trafficable expansion-joint sealant — confirm current specification and Australian availability with Fosroc technical before specifying",
    productType: "1-component polyurethane trafficable expansion-joint sealant",
    filterTags: ["PU-Sealant", "1-Component", "Exterior", "Floor-Joint", "Traffickable"],
    techChips: [
      { label: "1-component polyurethane traff", cls: "bg-slate-100 text-slate-700" },
      { label: "Fosroc — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Fosroc Nitoseal PU400 is a 1-component polyurethane trafficable expansion-joint sealant. Trafficable single-component PU joint sealant for movement and expansion joints, including AS 4020 potable-water contact (confirm). Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Fosroc technical before specifying. TODO: verify specific performance figures from the current Fosroc TDS.",
    technicalProperties: [
      "1-component polyurethane trafficable expansion-joint sealant",
      "Trafficable single-component PU joint sealant for movement and expansion joints, including AS 4020 potable-water contact (confirm).",
      "Confirm key performance values (strength / coverage / application) from the current Fosroc TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Fosroc",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Fosroc technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Fosroc",
    ],
    procurementSources: [
      { name: "Fosroc — Australian trade supply", url: "https://www.parchem.com.au" },
    ],
  }

];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "PU-Sealant", label: "PU sealant" },
  { id: "MS-Polymer", label: "MS polymer" },
  { id: "Silicone", label: "Silicone" },
  { id: "Polyurea", label: "Polyurea" },
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
  { product: "Ardex RA 040", chemistry: "1-component PU", movement: "Up to 25%", paintable: "Confirm from TDS", exterior: "Yes (UV stable)", primerRequired: "Primerless on most substrates" },
  { product: "Ardex RA 54", chemistry: "Semi-rigid polyurea", movement: "Minor only (semi-rigid)", paintable: "No — grind flush", exterior: "Interior floors", primerRequired: "Confirm from TDS" },
];

const TECH_INFO = {
  typicalApplications: [
    "Sealing moving cracks in concrete slabs, balcony edges, and walls where the joint must tolerate cyclic thermal and live load movement",
    "Construction joints and control joints in carpark decks, slabs, and facade panels — PU or MS polymer sealant over backer rod",
    "Interior floor control joints in warehouses, industrial floors, and commercial slabs — Ardex RA 54 (semi-rigid polyurea) for traffickable flush-fill",
    "Exterior facade joints where the sealant will be overcoated — MS polymer (TODO: confirm current AU product — Nitoseal MS300 not on fosroc.com.au; use MS250 or MS400) for better paint adhesion",
    "High-UV-exposure exterior joints on roofs and facades where sealant longevity is the priority — silicone (Mapesil AC)",
  ],
  selectionCriteria: [
    "Joint will be painted → MS polymer (TODO: confirm current AU product name — Nitoseal MS300 not on fosroc.com.au; try MS250 or MS400) or PU with full cure first — not silicone",
    "High UV exterior joint not painted → acetoxy silicone (Mapesil AC, 25% movement) for long service life",
    "Interior floor joint requiring traffickable flush-fill → Ardex RA 54 (semi-rigid polyurea); for general or movement joints use Ardex RA 040 (1-C PU) or Sikaflex-11FC",
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

const DESIGN_CRITERIA = "Chemistry & rigidity for the joint duty: elastomeric 1-part PU (movement joints), self-levelling PU (horizontal floor joints), semi-rigid polyurea (trafficable control-joint filler, supports edges under traffic) vs MS-polymer (paintable, low-stain) vs silicone; movement accommodation ±% and modulus (LM/HM) classified to ISO 11600 / AS — matched to joint design movement; joint width:depth ratio (2:1) with backing rod/bond breaker; primer requirement on concrete; cure type & time vs temp; paintability/overcoatability; service temperature & UV durability; chemical/fuel resistance for floor joints; hardness (Shore A) for trafficable; adhesion to concrete per AS 3600 joint; tear/abrasion if trafficked; non-staining at edges";

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

      <AutoProductReference products={PRODUCTS} cards={SEALANT_PU_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Polyurethane sealants" />
    </>
  );
}
