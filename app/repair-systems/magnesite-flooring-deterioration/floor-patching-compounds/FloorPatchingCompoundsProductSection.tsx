"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { FLOOR_PATCHING_CARDS } from "./floorPatchingData";

type FilterTag = "Feather-Edge" | "Rapid-Set" | "Fine-Repair" | "Floor-Patching" | "Thin-Section" | "Polymer-Modified" | "Magnesite" | "Pre-SLC";

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
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au/products/ardex-feather-finish/",
    accentColor: "#0369a1",
    name: "Ardex Feather Finish — Polymer-Modified Feather-Edge Patching Compound",
    descriptionLine: "Polymer-modified feather-edge skimming and patching compound for floor surface irregularities — 10 kg or 5 kg bag",
    productType: "Polymer-modified feather-edge floor patching compound",
    filterTags: ["Feather-Edge", "Fine-Repair", "Thin-Section", "Polymer-Modified", "Floor-Patching", "Magnesite", "Pre-SLC"],
    techChips: [
      { label: "Feather-edge", cls: "bg-sky-100 text-sky-800" },
      { label: "Polymer-modified", cls: "bg-blue-100 text-blue-800" },
      { label: "Feather–3 mm", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex Feather Finish is a polymer-modified feather-edge patching compound designed for levelling and smoothing irregular floor surfaces at thicknesses from near-zero (skim coat) to approximately 3 mm per lift. Used over primed magnesite or concrete to fill low spots, surface defects, and saw-cut edge damage before self-levelling compound application or direct floor covering installation. It feathers to nothing at its edges, eliminating the visible step-down edges that cause hard floor covering cracking.",
    technicalProperties: [
      "Pack size: 10 kg or 5 kg bag (11 kg also available)",
      "Application range: feather edge to approximately 3 mm per lift",
      "TODO: owner confirm — coverage: AU sources report ~50 m² at skim coat from 11 kg bag; coverage at 3 mm would be substantially lower. Confirm coverage rate with current Ardex AU TDS.",
      "Apply by trowel or steel float over primed surface",
      "Walking time: as little as 15 min at skim coat thickness; thicker applications require more time",
      "Compatible with most floor coverings when fully cured",
    ],
    limitations: [
      "Maximum depth per lift is approximately 3 mm — for deeper fills, use rapid-set floor repair mortar",
      "Must be applied over primed surface — do not apply to bare, unprimed magnesite",
      "Not suitable for structural or load-bearing repairs",
      "Allow full cure before installing floor coverings — check TDS",
      "Not for external use or permanently wet areas",
      "Feather-edge areas must be protected from foot traffic until fully cured",
    ],
    procurementSources: [
      { name: "Ardex Australia", url: "https://www.ardex.com.au" },
      { name: "Tile Depot", url: "https://www.tiledepot.com.au/" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-a-45/",
    accentColor: "#0369a1",
    name: "Ardex A 45 — Rapid Hardening & Drying Floor Repair Mortar",
    descriptionLine: "Rapid hardening and drying floor repair mortar — sets in 15 min, trafficable 90 min, up to 30 mm — 20 kg bag",
    productType: "Rapid-setting cementitious floor repair mortar",
    filterTags: ["Rapid-Set", "Floor-Patching", "Polymer-Modified", "Magnesite", "Pre-SLC"],
    techChips: [
      { label: "Rapid-set", cls: "bg-orange-100 text-orange-800" },
      { label: "Deep fill", cls: "bg-amber-100 text-amber-800" },
      { label: "Trafficable 90 min", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex A 45 is a rapid hardening and drying slump-free floor repair mortar used for patching isolated floor depressions, damaged saw-cut edges, coves, stairs, and localised substrate failures in floors before self-levelling compound application. It sets in approximately 15 minutes and is trafficable and ready for finishes within 90 minutes at 20°C — making it highly suitable for occupied building floor remediation where minimising downtime is critical.",
    technicalProperties: [
      "Pack size: 20 kg bag (11 kg also available)",
      "Application depth: up to 30 mm per lift without slumping",
      "Rapid hardening — sets in approximately 15 min; trafficable and ready for finishes at approximately 90 min at 20°C",
      "Slump-free — suitable for use on stairs, coves, and vertical edges",
      "Apply over primed surface by trowel",
      "Suitable for use pre-SLC application",
    ],
    limitations: [
      "Sets in approximately 15 min — batch size must match area that can be placed and finished within working time",
      "Do not rework after initial set begins",
      "Prime surface before application — bare magnesite or unprimed concrete will cause adhesion failure",
      "Do not apply SLC over A 45 until A 45 has reached adequate strength — check TDS for overcoating time",
      "For internal floor applications only — check TDS for external use",
      "Ensure adequate ventilation — rapid-set exotherm may generate heat in large pours",
    ],
    procurementSources: [
      { name: "Ardex Australia", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-protection/concrete-repair-mortars/cementitious-repairmortars/sika-monotop-412nfg.html",
    accentColor: "#be123c",
    name: "Sika MonoTop-412 NFG — Structural Polymer-Modified Repair Mortar",
    descriptionLine: "1-component polymer-modified fibre-reinforced structural repair mortar 6–50 mm for floor and slab repair — 20 kg bag",
    productType: "Polymer-modified fibre-reinforced structural repair mortar (EN 1504-3 Class R4)",
    filterTags: ["Feather-Edge", "Fine-Repair", "Rapid-Set", "Thin-Section", "Polymer-Modified", "Floor-Patching", "Magnesite"],
    techChips: [
      { label: "Structural repair mortar", cls: "bg-red-100 text-red-800" },
      { label: "6–50 mm per layer", cls: "bg-rose-100 text-rose-800" },
      { label: "EN 1504-3 Class R4", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika MonoTop-412 NFG is a 1-component, polymer-modified, fibre-reinforced structural repair mortar classified as EN 1504-3 Class R4. Applied at 6–50 mm per layer, it is suited to floor patch repair, slab edge repair, and structural concrete reinstatement over magnesite floor structures. It contains a corrosion inhibitor and achieves approximately 50 MPa compressive strength at 28 days. Apply over a correctly prepared and pre-wetted substrate — no bonding primer required for manual application per the current Sika AU TDS.",
    technicalProperties: [
      "Pack size: 20 kg bag",
      "Application thickness: 6–50 mm per layer",
      "1-component — mix with water only; polymer-modified, fibre-reinforced, low-shrinkage",
      "Compressive strength: approximately 50 MPa at 28 days — EN 1504-3 Class R4",
      "Apply by trowel; no bonding primer required for manual application on pre-wetted substrate",
      "Compatible with Sika floor systems; contains corrosion inhibitor",
    ],
    limitations: [
      "Not for feather-edge or skim applications — minimum 6 mm depth required",
      "Structural repairs require engineering specification — do not substitute for designed structural repair",
      "Pre-wet substrate 2 hours before application — do not apply to dry substrate",
      "Not suitable for permanently wet areas without additional waterproofing",
      "Allow adequate cure time before applying SLC or floor coverings",
      "Confirm current product details and TDS with Sika Australia",
    ],
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Sika distributor locator", url: "https://aus.sika.com/en/group/find-a-sika-branch.html" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au/",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/concrete-repair/detail/planitop-fast-330",
    accentColor: "#b45309",
    name: "Mapei Planitop Fast 330 — Rapid-Set Repair Mortar for Floor Patching",
    descriptionLine: "Rapid-setting polymer-modified repair mortar for floor patching — 3 to 30 mm — 25 kg bag",
    productType: "Rapid-setting polymer-modified floor repair mortar",
    filterTags: ["Feather-Edge", "Rapid-Set", "Fine-Repair", "Polymer-Modified", "Floor-Patching", "Magnesite", "Pre-SLC"],
    techChips: [
      { label: "Rapid-set", cls: "bg-amber-100 text-amber-800" },
      { label: "3–30 mm", cls: "bg-yellow-100 text-yellow-800" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Planitop Fast 330 is a rapid-setting, polymer-modified cementitious repair mortar used for patching floors from feather-edge thickness up to 30 mm. It provides high early strength and can be overcoated with self-levelling compound or floor coverings in a short timeframe. Compatible with the Mapei floor levelling system and suitable for use over primed magnesite and concrete floor substrates.",
    technicalProperties: [
      "Pack size: 25 kg bag",
      "Application range: 3–30 mm in a single lift",
      "Workability approximately 20 min; ceramic/stone tile can be laid from 4 hrs",
      "Polymer-modified — improved adhesion and impact resistance",
      "Apply over primed surface by trowel",
      "Compatible with Mapei self-levelling products when properly cured",
    ],
    limitations: [
      "Batch size must match working time — do not over-mix",
      "Prime surface before application",
      "Do not apply SLC until Planitop Fast 330 has reached adequate compressive strength",
      "Not for structural repairs or load-bearing applications",
      "Minimum temperature 5°C during application and curing",
      "Confirm overcoating times with current Mapei TDS",
    ],
    procurementSources: [
      { name: "Mapei Australia", url: "https://www.mapei.com/au/" },
      { name: "Mapei distributors", url: "https://www.mapei.com/au/en/contact-us/where-to-buy" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Renderoc HB40",
    descriptionLine: "Polymer-modified high-build cementitious repair mortar (EN 1504-3 R3) — confirm current specification and Australian availability with Fosroc technical before specifying",
    productType: "Polymer-modified high-build cementitious repair mortar (EN 1504-3 R3)",
    filterTags: ["Floor-Patching", "Polymer-Modified", "Magnesite", "Pre-SLC"],
    techChips: [
      { label: "Polymer-modified high-build ce", cls: "bg-slate-100 text-slate-700" },
      { label: "Fosroc — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Fosroc Renderoc HB40 is a Polymer-modified high-build cementitious repair mortar (EN 1504-3 R3). High-build polymer-modified mortar to reinstate deeper losses in an encapsulated magnesite floor before a levelling underlayment. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Fosroc technical before specifying. TODO: verify specific performance figures from the current Fosroc TDS.",
    technicalProperties: [
      "Polymer-modified high-build cementitious repair mortar (EN 1504-3 R3)",
      "High-build polymer-modified mortar to reinstate deeper losses in an encapsulated magnesite floor before a levelling underlayment.",
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
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://ardexaustralia.com",
    accentColor: "#0369a1",
    name: "Ardex A 38",
    descriptionLine: "Rapid-set cementitious patching / screed mortar — confirm current specification and Australian availability with Ardex technical before specifying",
    productType: "Rapid-set cementitious patching / screed mortar",
    filterTags: ["Floor-Patching", "Rapid-Set", "Magnesite", "Pre-SLC"],
    techChips: [
      { label: "Rapid-set cementitious patchin", cls: "bg-slate-100 text-slate-700" },
      { label: "Ardex — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Ardex A 38 is a Rapid-set cementitious patching / screed mortar. Rapid-set cementitious patching/screed mortar for fast reinstatement and ramping before overlaying. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Ardex technical before specifying. TODO: verify specific performance figures from the current Ardex TDS.",
    technicalProperties: [
      "Rapid-set cementitious patching / screed mortar",
      "Rapid-set cementitious patching/screed mortar for fast reinstatement and ramping before overlaying.",
      "Confirm key performance values (strength / coverage / application) from the current Ardex TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Ardex",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Ardex technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Ardex",
    ],
    procurementSources: [
      { name: "Ardex — Australian trade supply", url: "https://ardexaustralia.com" },
    ],
  }


];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Feather-Edge", label: "Feather-edge" },
  { tag: "Rapid-Set", label: "Rapid-set" },
  { tag: "Fine-Repair", label: "Fine repair" },
  { tag: "Floor-Patching", label: "Floor patching" },
  { tag: "Thin-Section", label: "Thin-section" },
  { tag: "Polymer-Modified", label: "Polymer-modified" },
  { tag: "Magnesite", label: "Magnesite" },
  { tag: "Pre-SLC", label: "Pre-SLC" },
];

const TECH_INFO = {
  typicalApplications: [
    "Filling isolated low spots, surface defects, and depressions in magnesite and concrete floors",
    "Patching localised failed or hollow magnesite areas before self-levelling overlay",
    "Repairing damaged saw-cut and chase-cut edges before floor covering installation",
    "Fairing and smoothing surface irregularities that exceed the range of self-levelling compounds",
    "Pre-SLC surface preparation where significant depth variation exists across the floor",
  ],
  selectionCriteria: [
    "Feather-edge compound (Ardex Feather Finish): for thin skim sections (0–3 mm) and smooth transition at patch perimeters",
    "Rapid-set floor repair mortar (Ardex A 45, Parchem Speed Rep, Mapei Planitop Fast 330): for deeper fills (3–50 mm) and faster return to service",
    "Structural repair mortar (Sika MonoTop-412 NFG): for structural concrete repair requiring EN 1504-3 Class R4 compliance",
    "Match product brand to SLC brand where possible to maintain manufacturer warranty",
    "For depths > 30 mm: use structural repair mortar or engineered filler, not floor patching compound",
    "Always prime surface before patching — bare magnesite patches will fail adhesion",
  ],
  limitations: [
    "Floor patching compounds are not structural repair materials — do not use for structural fills or load-bearing applications",
    "No patching compound compensates for actively delaminating magnesite — remove loose areas first",
    "Rapid-set products require experience — batching errors and overworked material are the primary failure mode",
    "Patching compound over contaminated or poorly primed surface will fail — prep first",
    "Depth limitations apply — exceeding single-lift thickness causes cracking and delamination",
  ],
  standardsNotes: [
    "AS 1884: planarity tolerances for floor coverings — patching compounds used to achieve specified tolerance",
    "AS/NZS 3958.1: ceramic tile installation — substrate tolerance requirements before tiling",
    "Manufacturer TDS: cure time before overcoating with SLC varies — always confirm before applying SLC",
    "Safe Work Australia: magnesite dust hazard — patching over magnesite requires dust management controls",
  ],
  suitableDefects: [
    "Magnesite flooring deterioration — localised failed area patching before SLC overlay",
    "Floor surface depressions and high spots after magnesite encapsulation",
    "Saw-cut and chase-cut edge damage in floor slabs before floor covering",
    "Surface defects left after floor adhesive or covering removal",
  ],
  typicalSubstrates: [
    "Encapsulated magnesite floors (primed) in Class 2 strata buildings",
    "Concrete floor slabs with localised depressions or surface damage",
    "Previously levelled floors requiring spot patching before refinishing",
    "Floor surfaces after floor covering strip and adhesive removal",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Ardex Feather Finish", brand: "Ardex", type: "Feather-edge skim", range: "0–3 mm", setType: "Standard" },
  { product: "Ardex A 45", brand: "Ardex", type: "Rapid repair mortar", range: "Up to 30 mm", setType: "Rapid" },
  { product: "Sika MonoTop-412 NFG", brand: "Sika", type: "Structural repair mortar", range: "6–50 mm", setType: "Standard" },
  { product: "Parchem Speed Rep", brand: "Parchem", type: "Rapid repair mortar", range: "TODO: confirm", setType: "Rapid" },
  { product: "Mapei Planitop Fast 330", brand: "Mapei", type: "Rapid repair mortar", range: "3–30 mm", setType: "Rapid" },
];

export function FloorPatchingCompoundsIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
          <BookOpen size={16} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Floor patching compounds for magnesite flooring remediation</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">Feather-edge and rapid-set patching compounds for localised floor repair and surface preparation before self-levelling underlayment application. Read more ↓</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>
            Floor patching compounds occupy a specific role in the magnesite remediation sequence: they are used before self-levelling compounds to address localised depth variations, failed areas, and surface defects that exceed the levelling range or bond tolerance of an SLC when applied directly. Their use is targeted and localised — not full-area application.
          </p>
          <p>
            In magnesite flooring deterioration, localised failures occur when the magnesite screed has delaminated from the substrate, hollowed out due to chloride salt expansion, or been damaged during floor covering removal. These voids and depressions need to be filled to a consistent level before a self-levelling compound is poured over the full floor surface. Applying SLC directly over voids creates bridged areas that flex under load and eventually crack or delaminate.
          </p>
          <p>
            Two product types serve this purpose. Feather-edge patching compounds (Ardex Feather Finish, Sika MonoTop-412N) are fine-grain mortars that can taper to near-zero at edges — critical for eliminating step transitions before hard floor coverings such as ceramic tiles or LVT, which will crack or lift at any step. Rapid-set floor repair mortars (Ardex RA 90, Parchem Speed Rep, Mapei Planitop Fast 330) are used for deeper fills and where fast return to service is required.
          </p>
          <p>
            Both product types must be applied over a correctly primed surface — the same primer used for the subsequent SLC. Do not apply patching compound to bare, unprimed magnesite. Allow the patching mortar to reach adequate strength before applying self-levelling compound — overcoating too early is the primary cause of SLC map cracking over patched areas.
          </p>
        </div>
      )}
    </div>
  );
}

const DESIGN_CRITERIA = "Compressive/flexural strength (MPa) & EN 1504-3 class (R1–R4 — R4 structural for trafficked/loaded floors); min & max layer thickness & feather-edge capability; max total build; set/cure time & trafficable/recoatable time (rapid-set for quick return to service); polymer modification & fibre reinforcement for crack resistance; bond strength to old concrete/screed & primer/SSD requirement; shrinkage class & dimensional stability; compatibility & moisture tolerance with substrate (esp. residual magnesite/chloride contamination — alkali/salt resistance); abrasion resistance & receptivity to floor finish/adhesive (pH, moisture); application temp range.";

export function FloorPatchingCompoundsProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? "Hide detail" : "Show detail"} <ChevronDown size={14} className={`transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
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

      <AutoProductReference products={PRODUCTS} cards={FLOOR_PATCHING_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Floor patching compounds" />
    </>
  );
}
