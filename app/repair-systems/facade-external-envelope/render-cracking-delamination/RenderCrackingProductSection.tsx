"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Render-repair"
  | "Polymer-modified"
  | "Hand-applied"
  | "Vertical"
  | "Scratch-coat"
  | "Base-coat"
  | "Elastomeric"
  | "Acrylic"
  | "Texture-coat"
  | "Crack-bridging"
  | "Exterior"
  | "Fibre-reinforced"
  | "Primer"
  | "Bonding"
  | "Solvent-free";

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
    accentColor: "#ef4444",
    name: "Sika MonoTop-623",
    productType: "Polymer-modified render repair mortar",
    descriptionLine: "Polymer-modified cementitious render repair mortar for scratch coats and re-render on concrete and masonry facades",
    filterTags: ["Render-repair", "Polymer-modified", "Hand-applied", "Vertical", "Scratch-coat", "Base-coat"],
    techChips: [
      { label: "Polymer-modified mortar", cls: "bg-sky-100 text-sky-800" },
      { label: "Hand-applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Vertical surface", cls: "bg-slate-100 text-slate-700" },
      { label: "Scratch / base coat", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika MonoTop-623 is a polymer-modified cementitious render repair mortar designed for scratch coat and base coat render applications on concrete and masonry facades. It provides excellent adhesion to existing cementitious substrates when properly prepared and is suitable for vertical surfaces without slumping when applied within the specified thickness range.\n\nMonoTop-623 is part of the Sika MonoTop system, intended for use in combination with Sika bonding primers and compatible topcoat systems. It is suitable for reinstatement of delaminated or cracked render over concrete and masonry facades on Class 2 strata buildings. Substrate preparation including full mechanical removal of loose, hollow and delaminated render is required prior to application.",
    technicalProperties: [
      "Polymer-modified cementitious chemistry — improved bond strength and flexibility versus plain sand-cement render",
      "Suitable for vertical application without slumping — thixotropic consistency for hand-application on facades",
      "Compatible with Sika primer and topcoat systems for complete render repair specification",
      "Grey cement colour — suitable for overcoat with elastomeric or texture coatings after full cure",
      "Fibre-free base coat formulation — for use where additional fibre reinforcement is not required in the scratch coat",
    ],
    limitations: [
      "Requires full mechanical removal of all hollow, delaminated and cracked existing render before application",
      "Bonding primer required on smooth or low-absorption concrete substrates — confirm with Sika technical",
      "Do not apply in direct sunlight or high wind conditions without appropriate curing and protection measures",
      "Minimum ambient and substrate temperature requirements apply — confirm with Sika TDS before specifying in cold conditions",
      "Confirm current product specification and compliance with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Parchem Construction Products — nationally", url: "https://www.parchem.com.au" },
      { name: "Bunnings — in-store nationally (select products)", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Parchem Construction Products",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#f97316",
    name: "Renderoc HB40",
    productType: "Polymer-modified repair mortar",
    descriptionLine: "High-build polymer-modified cementitious repair mortar for vertical render repair and base coat application",
    filterTags: ["Render-repair", "Polymer-modified", "Hand-applied", "Vertical", "Base-coat"],
    techChips: [
      { label: "High-build mortar", cls: "bg-sky-100 text-sky-800" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Vertical surface", cls: "bg-slate-100 text-slate-700" },
      { label: "Base coat", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Renderoc HB40 is a high-build polymer-modified cementitious repair mortar supplied by Parchem Construction Products. It is designed for vertical render repair and base coat application on concrete and masonry facades, offering improved build thickness per coat compared to standard repair mortars.\n\nRenderoc HB40 is suitable for patch and large-area render repair on Class 2 strata facades where the existing render has cracked, delaminated or has been removed. Its high-build capability reduces the number of coats required on deep repair areas. Mechanical preparation of the substrate and compatible priming are required before application per Parchem technical data sheet.",
    technicalProperties: [
      "High-build capability — achieves greater thickness per coat than standard repair mortars — reduces application passes on deep defects",
      "Polymer-modified cementitious formulation — improved adhesion and crack resistance versus plain cement mortars",
      "Thixotropic consistency — suitable for hand-application on vertical surfaces without excessive slumping",
      "Compatible with elastomeric and acrylic texture topcoat systems after full cure",
      "Available in 20 kg bags — standard trade supply format for Australian construction sites",
    ],
    limitations: [
      "Full mechanical removal of all loose, delaminated and cracked render required before application",
      "Confirm bonding primer requirements with Parchem technical on smooth or contaminated substrates",
      "Not suitable for direct application to friable or contaminated surfaces — substrate must be sound and clean",
      "Do not apply in direct sunlight without adequate wet curing procedures",
      "Confirm current product specification and compliance with Parchem Construction Products before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Products — trade supply nationally", url: "https://www.parchem.com.au" },
      { name: "Construction Supply Specialists — confirm current stock", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Laticrete Australia",
    brandUrl: "https://www.laticrete.com.au",
    accentColor: "#eab308",
    name: "Laticrete 226 Thick Bed",
    productType: "Polymer-modified base coat render",
    descriptionLine: "Polymer-modified thick-bed mortar for base coat render application on concrete and masonry substrates",
    filterTags: ["Render-repair", "Polymer-modified", "Hand-applied", "Base-coat"],
    techChips: [
      { label: "Thick-bed mortar", cls: "bg-sky-100 text-sky-800" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Base coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Concrete / masonry", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Laticrete 226 Thick Bed is a polymer-modified mortar primarily used as a thick-bed adhesive and levelling bed, and is also used as a base coat render mortar on concrete and masonry substrates for facade repair applications. The polymer modification provides improved bond strength and flexibility versus straight sand-cement mixes.\n\nWhen used as a render base coat in facade repair, Laticrete 226 Thick Bed provides a stable intermediate layer over prepared concrete or masonry substrates prior to application of a finish render or elastomeric coating. It is part of the Laticrete system and is most commonly used where a Laticrete complete system specification is required.",
    technicalProperties: [
      "Polymer-modified mortar — improved adhesion and crack resistance versus plain sand-cement mixes",
      "Suitable as a base coat render on concrete and masonry substrates after mechanical preparation",
      "Compatible with Laticrete primer and finish coat systems for complete system specification",
      "Available in standard bag format — trade supply through Laticrete distributors nationally",
      "Suitable for vertical and overhead applications within specified thickness range — confirm with Laticrete TDS",
    ],
    limitations: [
      "Primarily a thick-bed adhesive mortar — confirm suitability as a stand-alone render base coat with Laticrete technical",
      "Bonding primer required on smooth or low-porosity substrates — refer to Laticrete system specification",
      "Not suitable for application over soft, friable, or contaminated substrates",
      "Confirm current thickness limits per coat with Laticrete TDS before specifying on deep repair areas",
      "Confirm current product specification and compliance with Laticrete Australia before specifying",
    ],
    procurementSources: [
      { name: "Laticrete Australia — trade supply — contact for distributor", url: "https://www.laticrete.com.au" },
      { name: "Tile trade suppliers and construction product distributors nationally", url: "https://www.laticrete.com.au" },
    ],
  },
  {
    fullLabel: "Dulux Group Australia",
    brandUrl: "https://www.acratex.com.au",
    accentColor: "#22c55e",
    name: "Acratex Surfacekote",
    productType: "Elastomeric acrylic texture coating",
    descriptionLine: "Elastomeric crack-bridging acrylic texture coating for rendered facades — covers hairline cracks and provides weather resistance",
    filterTags: ["Elastomeric", "Acrylic", "Texture-coat", "Crack-bridging", "Exterior"],
    techChips: [
      { label: "Elastomeric coating", cls: "bg-sky-100 text-sky-800" },
      { label: "Crack-bridging", cls: "bg-green-50 text-green-700" },
      { label: "Acrylic", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior / facade", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Acratex Surfacekote is an elastomeric acrylic texture coating from the Dulux Group's Acratex facade system range. It is designed for application over prepared rendered and masonry facades, providing a crack-bridging decorative texture finish with good weather resistance and water-shedding properties.\n\nSurfacekote is commonly specified as the finish coat in rendered facade repair systems — applied over a prepared, primed and repaired render base coat. Its elastomeric properties allow it to accommodate minor hairline cracking movement in the render substrate without reflective cracking through the coating film. Available in a wide colour range through the Dulux colour system. Part of the complete Acratex facade coating system including primer and intermediate coats.",
    technicalProperties: [
      "Elastomeric acrylic chemistry — crack-bridging capability for hairline cracks in rendered facades",
      "Textured finish — available in fine, medium and coarse texture options — confirm current range with Acratex",
      "Exterior-grade UV and weather resistance — suitable for exposed Class 2 strata facade applications",
      "Wide colour range available through Dulux colour system",
      "Breathable / vapour-permeable coating — allows substrate moisture vapour transmission",
    ],
    limitations: [
      "Not a structural render repair system — substrate cracks must be repaired before coating application",
      "Crack-bridging limited to hairline cracks — active or wide cracks must be repaired before coating",
      "Acratex primer coat required on new or repaired render substrates before application — do not apply direct to bare cement",
      "Do not apply in rain, direct sunlight or temperatures outside the specified application range",
      "Confirm current product specification and compliance with Dulux Group Australia / Acratex before specifying",
    ],
    procurementSources: [
      { name: "Dulux / Acratex trade outlets — nationally", url: "https://www.acratex.com.au" },
      { name: "Dulux trade stores nationally — confirm current stock", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#3b82f6",
    name: "Mapei Planitop 400",
    productType: "Fibre-reinforced render repair mortar",
    descriptionLine: "Fibre-reinforced polymer-modified repair mortar for medium-to-heavy render repair and re-render on concrete and masonry",
    filterTags: ["Render-repair", "Fibre-reinforced", "Polymer-modified", "Hand-applied", "Vertical"],
    techChips: [
      { label: "Fibre-reinforced mortar", cls: "bg-sky-100 text-sky-800" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Vertical surface", cls: "bg-slate-100 text-slate-700" },
      { label: "Medium-heavy repair", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Planitop 400 is a fibre-reinforced polymer-modified repair mortar for medium-to-heavy render repair and re-render applications on concrete and masonry facades. The fibre reinforcement reduces plastic shrinkage cracking and improves the mortar's resistance to crack propagation, making it suitable for larger area render repairs and areas prone to thermal movement.\n\nPlanitop 400 is part of the Mapei concrete and mortar repair system and is suitable for vertical application on facade substrates when used within the specified thickness range. It is applied over properly prepared and primed substrates, and is compatible with Mapei topcoat systems. Confirm fibre type and loading with the current Mapei TDS.",
    technicalProperties: [
      "Fibre-reinforced polymer-modified cementitious mortar — reduced plastic shrinkage cracking versus plain repair mortars",
      "Suitable for medium-to-heavy render repair — applicable in thicker coats than standard polymer-modified mortars",
      "Vertical application — thixotropic formulation suitable for hand-application on facade substrates",
      "Compatible with Mapei primer and coating systems for complete render repair specification",
      "Fibre reinforcement reduces risk of plastic shrinkage cracking in large repair areas",
    ],
    limitations: [
      "Full mechanical removal of all loose and delaminated render required before application",
      "Confirm bonding primer requirements with Mapei technical on smooth or contaminated substrates",
      "Maximum application thickness per coat must not be exceeded — apply in successive layers for deep repairs",
      "Allow adequate curing time between coats and prior to topcoat application — confirm with Mapei TDS",
      "Confirm current product specification and compliance with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply nationally", url: "https://www.mapei.com/au" },
      { name: "Construction product distributors — confirm current stock", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#8b5cf6",
    name: "Sika Primer-3 N",
    productType: "Concrete and masonry bonding primer",
    descriptionLine: "Solvent-free epoxy-based bonding primer for improving adhesion of repair mortars to concrete and masonry substrates",
    filterTags: ["Primer", "Bonding", "Solvent-free", "Exterior"],
    techChips: [
      { label: "Epoxy bonding primer", cls: "bg-sky-100 text-sky-800" },
      { label: "Solvent-free", cls: "bg-green-50 text-green-700" },
      { label: "Concrete / masonry", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-render application", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Primer-3 N is a solvent-free epoxy-based bonding primer used to improve adhesion of Sika render repair mortars and cementitious coatings to concrete and masonry substrates. It is applied to prepared surfaces before the render repair mortar coat, increasing the bond strength between the substrate and the new mortar layer.\n\nSika Primer-3 N is particularly important on smooth, low-absorption concrete surfaces and on surfaces where contamination or carbonation may reduce bond strength of render repair mortars. As a solvent-free formulation, it is suitable for use in enclosed or poorly ventilated areas. Always confirm the primer is still tacky (not fully cured) when the repair mortar is applied — application over a fully cured primer coat requires re-priming.",
    technicalProperties: [
      "Solvent-free epoxy formulation — suitable for use in partially enclosed areas without forced ventilation",
      "Two-component epoxy — supplied as pre-measured packs — mix components fully before application",
      "Applied by brush or roller to prepared substrate — provides key for polymer-modified repair mortars",
      "Improves adhesion on smooth, low-absorption and carbonated concrete surfaces",
      "Part of the Sika MonoTop system — confirmed compatible with Sika render repair mortars",
    ],
    limitations: [
      "Must be applied while still tacky — apply repair mortar within the open time specified in the Sika TDS",
      "Do not apply to wet, frozen or contaminated surfaces — substrate must be sound, clean and surface dry",
      "Two-component product — both components must be mixed thoroughly before application — partial mixing causes adhesion failure",
      "Not suitable as a finish coat or for UV-exposed surfaces — cover with repair mortar before cure",
      "Confirm current product specification and compliance with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Parchem Construction Products — nationally", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Render-repair", label: "Render-repair" },
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Hand-applied", label: "Hand-applied" },
  { id: "Vertical", label: "Vertical" },
  { id: "Scratch-coat", label: "Scratch-coat" },
  { id: "Base-coat", label: "Base-coat" },
  { id: "Elastomeric", label: "Elastomeric" },
  { id: "Acrylic", label: "Acrylic" },
  { id: "Texture-coat", label: "Texture-coat" },
  { id: "Crack-bridging", label: "Crack-bridging" },
  { id: "Exterior", label: "Exterior" },
  { id: "Fibre-reinforced", label: "Fibre-reinforced" },
  { id: "Primer", label: "Primer" },
  { id: "Bonding", label: "Bonding" },
  { id: "Solvent-free", label: "Solvent-free" },
];

const BRAND_EQUIV: { system: string; sika: string; parchem: string; laticrete: string; mapei: string; dulux: string }[] = [
  { system: "Polymer-modified render repair mortar", sika: "MonoTop-623", parchem: "Renderoc HB40", laticrete: "226 Thick Bed", mapei: "—", dulux: "—" },
  { system: "Fibre-reinforced repair mortar", sika: "—", parchem: "—", laticrete: "—", mapei: "Planitop 400", dulux: "—" },
  { system: "Elastomeric acrylic coating", sika: "—", parchem: "—", laticrete: "—", mapei: "—", dulux: "Acratex Surfacekote" },
  { system: "Bonding primer", sika: "Primer-3 N", parchem: "—", laticrete: "—", mapei: "—", dulux: "—" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; systemType: string; fiberReinforced: string; minThickness: string; substrate: string; primaryUse: string;
}[] = [
  {
    product: "Sika MonoTop-623",
    brand: "Sika",
    systemType: "Polymer-modified mortar",
    fiberReinforced: "No",
    minThickness: "5 mm (confirm TDS)",
    substrate: "Concrete / masonry",
    primaryUse: "Scratch coat / base coat render repair",
  },
  {
    product: "Renderoc HB40",
    brand: "Parchem",
    systemType: "High-build polymer-modified mortar",
    fiberReinforced: "No",
    minThickness: "10 mm (confirm TDS)",
    substrate: "Concrete / masonry",
    primaryUse: "Vertical render repair / base coat",
  },
  {
    product: "Laticrete 226 Thick Bed",
    brand: "Laticrete",
    systemType: "Polymer-modified thick-bed mortar",
    fiberReinforced: "No",
    minThickness: "10 mm (confirm TDS)",
    substrate: "Concrete / masonry",
    primaryUse: "Base coat render / levelling",
  },
  {
    product: "Acratex Surfacekote",
    brand: "Dulux / Acratex",
    systemType: "Elastomeric acrylic coating",
    fiberReinforced: "N/A",
    minThickness: "Coating (DFT per TDS)",
    substrate: "Rendered facade",
    primaryUse: "Finish coat — crack-bridging texture",
  },
  {
    product: "Mapei Planitop 400",
    brand: "Mapei",
    systemType: "Fibre-reinforced polymer-modified mortar",
    fiberReinforced: "Yes",
    minThickness: "5 mm (confirm TDS)",
    substrate: "Concrete / masonry",
    primaryUse: "Medium-heavy render repair",
  },
  {
    product: "Sika Primer-3 N",
    brand: "Sika",
    systemType: "Epoxy bonding primer",
    fiberReinforced: "N/A",
    minThickness: "N/A (primer coat)",
    substrate: "Concrete / masonry",
    primaryUse: "Pre-render bonding primer",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Patch repair of localised render cracks and spalled areas on concrete and masonry facades",
    "Base coat re-render over large delaminated areas after full removal of failed render",
    "Elastomeric finish coat over repaired render to bridge hairline cracks and restore weatherproofing",
    "Bonding primer application on smooth or carbonated concrete substrates prior to render repair",
    "Complete render replacement system — primer, base coat mortar, and elastomeric topcoat — on Class 2 strata facades",
  ],
  selectionCriteria: [
    "Select fibre-reinforced mortar for large repair areas or substrates prone to thermal and moisture movement",
    "Select elastomeric topcoat where hairline crack bridging and decorative finish are required over existing or new render",
    "Confirm bonding primer requirement on smooth, carbonated or contaminated concrete substrates",
    "Match render system to existing facade type — confirm compatibility of new render with existing substrate system",
    "Confirm defect classification — delamination repair requires full removal and re-render; crack repair may allow injection or patch only",
  ],
  limitations: [
    "Render repair mortars cannot be applied to hollow, delaminated or unsound substrates — full mechanical removal first",
    "Elastomeric coatings bridge hairline cracks only — active or structural cracks require repair before coating",
    "Render shrinkage cracking risk is high without adequate curing and wet curing procedures in hot and windy conditions",
    "Fibre reinforcement reduces but does not eliminate shrinkage cracking risk — wet curing is still required",
    "Match render composition to existing facade — mismatched mortar strength can cause differential movement and reflective cracking",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — governs masonry construction and repair including render systems on masonry facades",
    "AS 3715 — Metal Finishing — relevant where render repair is adjacent to metal facade elements requiring coating compatibility",
    "NCC — National Construction Code — DTS provisions for external facades, weatherproofing and material durability",
    "Manufacturer TDS — always confirm current product specifications, application requirements and system compatibility with the current manufacturer technical data sheet",
  ],
  suitableDefects: [
    "Render cracking — hairline, map cracking, and delamination blistering on concrete and masonry facades",
    "Render delamination — large-area loss of adhesion between render coat and substrate",
    "Hollow render — areas sounding hollow on tap test indicating loss of bond to substrate",
    "Spalled or missing render — areas where render has fallen away exposing substrate",
  ],
  typicalSubstrates: [
    "Concrete — cast in-situ and precast concrete facade panels",
    "Masonry — clay brick, concrete block and AAC block masonry walls",
    "Existing render — bonded existing render as a substrate for topcoat systems",
    "EIFS — EPS board external insulation as substrate for compatible base and finish coats",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
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

export function RenderCrackingIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are render crack repair systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Render crack repair systems are polymer-modified cementitious mortars, fibre-reinforced repair mortars, elastomeric coatings and bonding primers used to repair cracked and delaminated external render on Class 2 strata facades in Australia. External render provides weatherproofing, appearance and protection to the underlying concrete or masonry substrate. When render cracks, delaminates or falls away, the substrate is exposed to water ingress, which can cause progressive structural damage, staining, and loss of property amenity.
        </p>
        <p>
          Render cracking on Class 2 strata facades has a range of causes including shrinkage during initial curing, differential thermal and moisture movement between the render and substrate, structural movement, impact damage, and failure of the original render bond due to poor preparation or incompatible mortar composition. Delamination — where the render separates from the substrate but has not yet fallen — is commonly detected by tap testing and thermal imaging. Effective repair requires full removal of all hollow and delaminated sections before applying a compatible replacement render system.
        </p>
        <p>
          The choice between polymer-modified repair mortars, fibre-reinforced mortars and elastomeric finish coatings depends on the defect type, repair area size, substrate condition, and the required final appearance. All render repair systems require the application of a compatible bonding primer on smooth or low-absorption concrete substrates. Compliance with AS 3700 is required for render on masonry facades. Finish coats must be compatible with the repair mortar system and should be applied after adequate curing of the base coat.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse render crack repair systems with:</p>
          <ul className="space-y-1.5">
            {[
              "Render paint coatings — surface-applied paint only, no render repair or crack bridging capability",
              "Expansion joint sealants — for movement joints between panels, not for repair of cracked render",
              "Full render removal systems — for complete render replacement where existing render is beyond repair",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-xs leading-5 text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function RenderCrackingProductSection() {
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
      : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

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
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
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
            <p className="mt-1 text-sm text-slate-500">6 products — 5 brands — render repair mortars, coatings and primers — scroll to view all</p>
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
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
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
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
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
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                {/* Card header */}
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of render repair products for facade crack and delamination repair. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Fibre reinforced</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Min thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.systemType}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${row.fiberReinforced === "Yes" ? "bg-green-50 text-green-700" : row.fiberReinforced === "No" ? "bg-slate-100 text-slate-600" : "bg-amber-50 text-amber-700"}`}>
                      {row.fiberReinforced}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.minThickness}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substrate}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Render repair system equivalents across brands active in Australian Class 2 strata facade remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>Parchem</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#eab308" }}>Laticrete</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Mapei</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Dulux / Acratex</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.sika, row.parchem, row.laticrete, row.mapei, row.dulux].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callouts — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Critical installation requirements</h3>
        </div>
        <ul className="space-y-2">
          {[
            "All hollow, delaminated and unsound render must be fully removed before applying repair mortar — applying over unsound render causes premature failure of the repair",
            "Bonding primer must be applied on smooth or low-absorption concrete substrates before render repair mortar — omitting primer is a leading cause of render delamination after repair",
            "Wet curing of repair mortar is mandatory in hot, dry or windy conditions — inadequate curing causes shrinkage cracking in new render within days of application",
            "Match render mortar composition and strength to the existing render system — over-strong mortar applied over weaker substrate render causes reflective cracking",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
