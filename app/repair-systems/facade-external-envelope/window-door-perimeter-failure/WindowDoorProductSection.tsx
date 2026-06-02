"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Epoxy"
  | "2C"
  | "Timber-repair"
  | "Filler"
  | "Sill"
  | "Frame"
  | "PU"
  | "1C"
  | "Perimeter-sealant"
  | "Window"
  | "Door"
  | "Movement-joint"
  | "Flashing"
  | "Colorbond"
  | "Head-flashing"
  | "Steel"
  | "Storm-angle"
  | "Aluminium"
  | "Water-deflection"
  | "Subsill"
  | "Drainage"
  | "Repair-mortar"
  | "Polymer-modified"
  | "Hob"
  | "Perimeter"
  | "Water-management"
  | "Masonry";

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
    fullLabel: "Selleys",
    brandUrl: "https://www.selleys.com.au",
    accentColor: "#ef4444",
    name: "Selleys Araldite Epoxy Putty",
    productType: "Two-part epoxy putty filler for timber repair",
    descriptionLine: "Two-part epoxy putty for repairing deteriorated timber window sills, frames and door joinery on facades",
    filterTags: ["Epoxy", "2C", "Timber-repair", "Filler", "Sill", "Frame"],
    techChips: [
      { label: "Epoxy putty", cls: "bg-sky-100 text-sky-800" },
      { label: "Two-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Timber repair", cls: "bg-green-50 text-green-700" },
      { label: "Sill / frame", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Selleys Araldite Epoxy Putty is a two-part epoxy putty used for restoring and rebuilding deteriorated timber window sills, door frames and timber joinery on building facades. The two components are kneaded together by hand and applied to prepared timber surfaces, where it adheres firmly and cures to a hard, sandable and paintable mass that accepts all standard paint systems.\n\nIn Class 2 strata remediation, epoxy putty repair is used where timber components show localised decay, checking or weathering damage that does not warrant full replacement — provided the surrounding timber retains structural integrity. The repaired area must be thoroughly primed and painted to prevent moisture re-entry. Confirm current Selleys product specification and suitability for exterior facade applications with Selleys technical before specifying.",
    technicalProperties: [
      "Two-component epoxy chemistry — high bond strength to timber, masonry and most building substrates",
      "Hand-kneadable putty consistency — can be shaped and sculpted to replicate missing timber profiles before cure",
      "Sands and machines after cure — repaired area accepts standard primers and paint systems",
      "Water-resistant after cure — suitable for exterior facade and perimeter joint repair applications",
      "No solvent or VOC-laden components — suitable for use in occupied buildings with adequate ventilation",
    ],
    limitations: [
      "Not a structural repair — epoxy putty restores profile and weather resistance only; underlying structural timber must be sound before application",
      "Two-component — working time is limited after mixing; large repairs require staged application",
      "Repaired area must be fully primed and painted — bare epoxy has limited UV resistance and will degrade if left exposed",
      "Do not apply over damp, rotting or untreated timber — confirm timber is dry and structurally sound before specifying",
      "Confirm current product specification, exterior suitability and compliance with Selleys technical before specifying",
    ],
    procurementSources: [
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Selleys Australia — trade supply and product enquiries", url: "https://www.selleys.com.au" },
      { name: "Hardware and paint trade suppliers nationally", url: "https://www.selleys.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#f97316",
    name: "Sikaflex-11 FC+",
    productType: "One-part PU perimeter sealant",
    descriptionLine: "One-part moisture-curing PU sealant for sealing window and door perimeter joints against water ingress",
    filterTags: ["PU", "1C", "Perimeter-sealant", "Window", "Door", "Movement-joint"],
    techChips: [
      { label: "Polyurethane sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture-cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Perimeter joint", cls: "bg-amber-50 text-amber-700" },
      { label: "Window / door", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sikaflex-11 FC+ is a one-component moisture-curing polyurethane sealant widely used in Australian facade remediation for sealing window and door perimeter joints. Applied by cartridge gun directly into the prepared joint over backer rod or bond breaker tape, it accommodates movement at the interface between the window or door frame and the surrounding masonry, render or cladding substrate.\n\nIn Class 2 strata remediation, Sikaflex-11 FC+ is specified for perimeter sealant replacement where existing failed or cracked sealant is allowing water ingress at window and door openings. Available in white, grey and standard colours. Paintable after full cure with compatible paint systems — confirm with Sika technical. Prime joint faces per current Sika TDS for best adhesion on porous or contaminated substrates.",
    technicalProperties: [
      "One-component moisture-curing polyurethane — no site mixing required; reduces application error on facade perimeter joints",
      "Accommodates building movement at window and door frame perimeter joints — good elongation and recovery",
      "Paintable after full cure with compatible systems — confirm compatibility with Sika technical before applying paint coat",
      "Available in multiple standard colours including white and grey — confirm current colour range with Sika Australia",
      "Gun-applied from standard cartridge — toolable after application to form a neat concave perimeter joint profile",
    ],
    limitations: [
      "Backer rod or bond breaker tape required in all perimeter joints — prevents three-sided adhesion and maintains correct sealant depth ratio",
      "Do not apply to wet, damp or contaminated joint faces — adhesion failure at the substrate interface is the primary failure mode",
      "Not suitable for joints subject to continuous immersion without specific confirmation from Sika technical",
      "Primer mandatory on porous or contaminated substrates — confirm primer selection with Sika TDS before application",
      "Confirm current product specification and compliance with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Facade and waterproofing trade suppliers nationally — confirm current stock", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Lysaght",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#eab308",
    name: "Lysaght Colorbond Head Flashing",
    productType: "Colorbond steel head flashing for windows and doors",
    descriptionLine: "Custom-profiled Colorbond steel head flashing for directing water away from window and door heads",
    filterTags: ["Flashing", "Colorbond", "Head-flashing", "Window", "Door", "Steel"],
    techChips: [
      { label: "Colorbond steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Head flashing", cls: "bg-slate-100 text-slate-700" },
      { label: "Window / door", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-painted steel", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght Colorbond head flashings are custom-profiled pre-painted steel flashings fabricated from Colorbond steel and installed above window and door heads to intercept and deflect water before it reaches the perimeter sealant joint. Head flashings are a primary line of defence against water ingress at window and door openings — particularly on rendered, masonry and concrete facade substrates exposed to driving rain.\n\nIn Class 2 strata remediation, missing or failed head flashings are a common root cause of recurring water ingress at window and door heads that cannot be resolved by sealant replacement alone. The head flashing must be installed and correctly lapped into the facade system before the perimeter sealant joint is reformed. Confirm current Lysaght Colorbond product specification and colour range with Lysaght before fabricating.",
    technicalProperties: [
      "Colorbond pre-painted steel — durable, corrosion-resistant and available in standard Colorbond colour range for facade integration",
      "Custom-profiled to suit window or door head and surrounding facade substrate — fabricated to project-specific dimensions",
      "Correctly installed head flashing protects the perimeter sealant joint from direct water loading — extends sealant service life",
      "Compatible with render, masonry and fibre cement cladding facade systems — confirm installation detail with facade consultant",
      "Long service life in Australian coastal and inland facade environments when correctly installed and maintained",
    ],
    limitations: [
      "Custom fabrication required — confirm lead times and dimensions with Lysaght or local steel fabricator before specifying",
      "Correct installation critical — flashing must be lapped and bedded into the facade system to prevent water tracking behind the flashing",
      "Galvanic compatibility must be confirmed where flashing contacts aluminium frames or dissimilar metals — confirm with facade consultant",
      "Colour matching to existing facade or window powder coat finish should be confirmed before fabrication — Colorbond range may not match all finishes",
      "Confirm current product specification and Colorbond colour availability with Lysaght before specifying",
    ],
    procurementSources: [
      { name: "Lysaght — contact for custom fabrication and pricing", url: "https://www.lysaght.com" },
      { name: "Steel and roofing trade suppliers — custom fabrication nationally", url: "https://www.lysaght.com" },
      { name: "Local steel fabricators — confirm Colorbond steel source and current pricing", url: "https://www.lysaght.com" },
    ],
  },
  {
    fullLabel: "Lysaght",
    brandUrl: "https://www.lysaght.com",
    accentColor: "#22c55e",
    name: "Lysaght Aluminium Storm Angle",
    productType: "Aluminium storm deflector angle for window perimeters",
    descriptionLine: "Extruded aluminium storm deflector angle for window and door perimeters to redirect driving rain and facade run-off",
    filterTags: ["Storm-angle", "Aluminium", "Window", "Water-deflection", "Perimeter"],
    techChips: [
      { label: "Extruded aluminium", cls: "bg-sky-100 text-sky-800" },
      { label: "Storm angle", cls: "bg-slate-100 text-slate-700" },
      { label: "Water deflection", cls: "bg-green-50 text-green-700" },
      { label: "Window / door perimeter", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Lysaght aluminium storm deflector angles are extruded aluminium profiles installed at window and door perimeters — typically at sill and jamb positions — to redirect driving rain and facade surface run-off away from the perimeter sealant joint and window frame interface. Storm angles are a secondary water management measure that reduces the volume and velocity of water reaching the perimeter joint.\n\nIn Class 2 strata remediation, storm deflector angles are specified where facade geometry, wind exposure or building height creates high hydrostatic pressure on perimeter joints during storm events. Installation of a storm angle alone does not substitute for correct perimeter sealant and head flashing — it is part of a layered facade water management system. Confirm current Lysaght aluminium product specification and extrusion profile with Lysaght before specifying.",
    technicalProperties: [
      "Extruded aluminium — lightweight, corrosion-resistant and compatible with most facade substrates without galvanic risk",
      "Deflects driving rain and facade run-off away from the window or door frame perimeter joint — reduces water loading on sealant",
      "Can be powder-coated to match window frame or facade colour — confirm coating compatibility with Lysaght",
      "Fixed mechanically to facade substrate — does not rely on sealant adhesion for primary water management function",
      "Long service life in coastal and inland facade environments — confirm anodising or coating specification for high-exposure sites",
    ],
    limitations: [
      "Storm angle reduces water loading on perimeter joints but does not substitute for correctly formed and sealed perimeter joints and head flashings",
      "Incorrect installation — insufficient lap over sealant joint or inadequate fixing — will allow water to track behind the angle",
      "Powder coat colour matching to window frames and facade finish must be confirmed before fabrication — custom colours may have lead times",
      "Confirm fixing specification into the facade substrate — fixing into render without back-up substrate may not be adequate in high-wind zones",
      "Confirm current product specification and extrusion availability with Lysaght before specifying",
    ],
    procurementSources: [
      { name: "Lysaght — contact for aluminium extrusion products and pricing", url: "https://www.lysaght.com" },
      { name: "Aluminium extrusion and fabrication suppliers nationally", url: "https://www.lysaght.com" },
      { name: "Facade and window trade suppliers — confirm current stock", url: "https://www.lysaght.com" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#3b82f6",
    name: "Sika Subsill Drainage",
    productType: "Subsill drainage system for window sill water management",
    descriptionLine: "Subsill drainage profile for managing water below window frames and directing it away from the facade",
    filterTags: ["Subsill", "Drainage", "Window", "Sill", "Water-management"],
    techChips: [
      { label: "Subsill drainage", cls: "bg-sky-100 text-sky-800" },
      { label: "Window sill", cls: "bg-slate-100 text-slate-700" },
      { label: "Water management", cls: "bg-blue-50 text-blue-700" },
      { label: "Facade drainage", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika subsill drainage systems are proprietary drainage profiles installed below window frames to collect and redirect water that penetrates beneath the window sill, preventing it from entering the wall cavity or tracking down the internal facade surface. Subsill drainage is a component of a layered window water management system — intercepting water that bypasses the primary perimeter sealant and sill flashing.\n\nIn Class 2 strata remediation, subsill drainage is specified where recurrent water ingress below window sills has been identified and where the window system geometry permits installation of a drainage profile. Confirm current Sika subsill drainage product specification, available profiles, and installation requirements with Sika Australia technical before specifying.",
    technicalProperties: [
      "Intercepts water penetrating beneath the window frame and directs it to the face of the facade — prevents water entering wall cavity or internal substrate",
      "Proprietary drainage profile — designed to integrate with the window frame and surrounding facade system",
      "Durable polymer or aluminium construction — resistant to UV, moisture and facade cleaning chemicals",
      "Part of Sika facade water management system — confirm compatible sealant and membrane products with Sika technical",
      "Reduces water loading on the subsill area — extends service life of perimeter sealant and subsill mortar or render",
    ],
    limitations: [
      "Subsill drainage is a supplementary measure — it does not substitute for correctly formed perimeter sealant joints and head flashings",
      "Installation requires access to the subsill area and may require partial removal of surrounding render or cladding — confirm scope with building consultant",
      "Confirm current Sika subsill drainage product range, available profiles and compatibility with window frame system before specifying",
      "Do not specify without diagnosing the primary source of water ingress — subsill drainage will not resolve ingress originating at the window head or jambs",
      "Confirm current product specification, availability and installation detail with Sika Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing and product range", url: "https://aus.sika.com" },
      { name: "Facade and window remediation trade suppliers — confirm current stock", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Parchem Construction Products",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#8b5cf6",
    name: "Renderoc HB40",
    productType: "Polymer-modified mortar for sill and hob repair",
    descriptionLine: "Polymer-modified repair mortar for rebuilding deteriorated window sills, balcony door hobs and masonry surrounds",
    filterTags: ["Repair-mortar", "Polymer-modified", "Hob", "Sill", "Masonry"],
    techChips: [
      { label: "Polymer-modified mortar", cls: "bg-sky-100 text-sky-800" },
      { label: "Sill / hob repair", cls: "bg-slate-100 text-slate-700" },
      { label: "Masonry reinstatement", cls: "bg-purple-50 text-purple-700" },
      { label: "Exterior facade", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Renderoc HB40 is a polymer-modified cementitious repair mortar used for rebuilding and reinstating deteriorated concrete and masonry substrates including window sills, balcony door hobs and the masonry surrounds at window and door openings. Its polymer modification provides improved adhesion, flexibility and durability compared to standard site-mixed cementitious mortars.\n\nIn Class 2 strata remediation, Renderoc HB40 is specified where window sill or door hob substrates have deteriorated through water ingress, carbonation or physical damage to the extent that the substrate cannot support a new sealant joint or flashing without reinstatement. The repaired substrate must be primed and sealed before applying perimeter sealant. Confirm current Parchem product specification and application requirements with Parchem technical before specifying.",
    technicalProperties: [
      "Polymer-modified cementitious mortar — improved adhesion, flexibility and durability compared to standard cementitious mortars",
      "Suitable for rebuilding deteriorated window sills, balcony door hobs and masonry reveals at window and door openings",
      "Acceptable for vertical and overhead applications — thixotropic consistency reduces slump on vertical faces",
      "Accepts standard primers, sealants and render finishes after cure — compatible with perimeter sealant reinstatement sequence",
      "Durable in exterior facade exposure — suitable for Australian coastal and inland environments when correctly applied and protected",
    ],
    limitations: [
      "Substrate preparation is critical — all loose, contaminated or deteriorated material must be removed before application; bond failure will occur if applied to a compromised substrate",
      "Reinforcing mesh or anti-fracture treatment may be required for large repair areas — confirm with Parchem technical",
      "Not a waterproofing membrane — repaired sill or hob must be waterproofed and sealed with compatible sealant and/or membrane after cure",
      "Do not apply in high wind or direct sun without shade and curing precautions — premature drying will cause surface cracking",
      "Confirm current product specification, mix ratios and application requirements with Parchem Construction Products before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Products — trade supply — contact for current pricing", url: "https://www.parchem.com.au" },
      { name: "Concrete repair and facade trade suppliers nationally — confirm current stock", url: "https://www.parchem.com.au" },
      { name: "Waterproofing and remedial trade suppliers — confirm compatibility and availability", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Epoxy", label: "Epoxy" },
  { id: "2C", label: "Two-component" },
  { id: "Timber-repair", label: "Timber repair" },
  { id: "Filler", label: "Filler" },
  { id: "Sill", label: "Sill" },
  { id: "Frame", label: "Frame" },
  { id: "PU", label: "Polyurethane" },
  { id: "1C", label: "One-component" },
  { id: "Perimeter-sealant", label: "Perimeter sealant" },
  { id: "Window", label: "Window" },
  { id: "Door", label: "Door" },
  { id: "Movement-joint", label: "Movement joint" },
  { id: "Flashing", label: "Flashing" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Head-flashing", label: "Head flashing" },
  { id: "Steel", label: "Steel" },
  { id: "Storm-angle", label: "Storm angle" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Water-deflection", label: "Water deflection" },
  { id: "Subsill", label: "Subsill" },
  { id: "Drainage", label: "Drainage" },
  { id: "Repair-mortar", label: "Repair mortar" },
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Hob", label: "Hob" },
];

const BRAND_EQUIV: { system: string; sika: string; lysaght: string; selleys: string; parchem: string }[] = [
  { system: "Perimeter sealant (window/door frame)", sika: "Sikaflex-11 FC+", lysaght: "—", selleys: "—", parchem: "—" },
  { system: "Head flashing (Colorbond)", sika: "—", lysaght: "Colorbond Head Flashing", selleys: "—", parchem: "—" },
  { system: "Storm deflector angle (aluminium)", sika: "—", lysaght: "Aluminium Storm Angle", selleys: "—", parchem: "—" },
  { system: "Timber frame repair", sika: "—", lysaght: "—", selleys: "Araldite Epoxy Putty", parchem: "—" },
  { system: "Sill/hob repair mortar", sika: "—", lysaght: "—", selleys: "—", parchem: "Renderoc HB40" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; type: string; material: string; purpose: string; installMethod: string; primaryUse: string;
}[] = [
  {
    product: "Araldite Epoxy Putty",
    brand: "Selleys",
    type: "Filler / repair compound",
    material: "Two-part epoxy",
    purpose: "Timber sill and frame reinstatement",
    installMethod: "Hand-knead and trowel apply",
    primaryUse: "Restoring deteriorated timber window sills and door frames",
  },
  {
    product: "Sikaflex-11 FC+",
    brand: "Sika",
    type: "Perimeter sealant",
    material: "One-part PU",
    purpose: "Seal window/door perimeter joints",
    installMethod: "Cartridge gun — over backer rod",
    primaryUse: "Window and door frame perimeter joint sealing",
  },
  {
    product: "Colorbond Head Flashing",
    brand: "Lysaght",
    type: "Flashing",
    material: "Colorbond steel",
    purpose: "Deflect water at window/door head",
    installMethod: "Fixed mechanically — lapped into facade",
    primaryUse: "Head water management at window and door openings",
  },
  {
    product: "Aluminium Storm Angle",
    brand: "Lysaght",
    type: "Water deflector",
    material: "Extruded aluminium",
    purpose: "Redirect driving rain from perimeter joints",
    installMethod: "Fixed mechanically to facade substrate",
    primaryUse: "Perimeter water deflection at window and door sills/jambs",
  },
  {
    product: "Sika Subsill Drainage",
    brand: "Sika",
    type: "Drainage profile",
    material: "Polymer / aluminium",
    purpose: "Collect and redirect subsill water",
    installMethod: "Set into subsill — integrated with frame system",
    primaryUse: "Below-frame water management at window sills",
  },
  {
    product: "Renderoc HB40",
    brand: "Parchem",
    type: "Repair mortar",
    material: "Polymer-modified cement",
    purpose: "Reinstate deteriorated sills and hobs",
    installMethod: "Trowel apply to prepared substrate",
    primaryUse: "Substrate reinstatement for window sills and balcony door hobs",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of failed perimeter sealant at window and door frames on rendered, masonry and concrete facade substrates",
    "Installation of missing or replacement head flashings above window and door heads in Class 2 strata facades",
    "Installation of storm deflector angles at window sills and jambs on high-exposure or upper-level facades",
    "Reinstatement of deteriorated concrete or masonry window sills and balcony door hobs before sealant replacement",
    "Repair of deteriorated timber window sills and door frames using epoxy putty before priming and repainting",
  ],
  selectionCriteria: [
    "Diagnose the primary failure mode before specifying — failed sealant, missing head flashing, no storm angle and failed subsill drainage each require different repair products",
    "Select head flashing and storm angle where the facade geometry or wind exposure creates high water loading on perimeter joints — sealant alone will not provide a durable solution",
    "Select epoxy putty for localised timber frame or sill repair where the surrounding timber is structurally sound — full replacement required if timber is structurally compromised",
    "Select polymer-modified repair mortar for reinstating concrete or masonry sills and hobs before sealant replacement — confirm primer compatibility with the sealant system",
    "AS 2047 requires window systems to be designed and installed to prevent water penetration — confirm window system compliance before specifying perimeter repair products only",
  ],
  limitations: [
    "Perimeter sealant replacement alone will not resolve water ingress caused by missing or failed head flashings — head flashing installation is required first",
    "Epoxy putty timber repair is a cosmetic and weather resistance repair only — structurally compromised timber must be replaced",
    "Storm angles and subsill drainage reduce water loading on perimeter joints but do not substitute for correctly formed and sealed joints",
    "Confirm galvanic compatibility between steel flashings and aluminium window frames before specifying — use isolating tape or compatible sealant where required",
    "Polymer-modified repair mortar must be fully cured and primed before applying perimeter sealant — confirm cure times with Parchem TDS",
  ],
  standardsNotes: [
    "AS 2047 — Windows in Buildings — Selection and Installation — establishes performance requirements for window and door systems and their installation",
    "AS 4386 — Sealants for Buildings — establishes movement accommodation class and durability requirements for building joint sealants",
    "NCC / BCA Section J and Section F — water ingress and weatherproofing requirements for external walls and openings in Class 2 buildings",
    "AS 3600 — Concrete Structures — referenced for concrete sill and hob repair specifications in structural contexts",
  ],
  suitableDefects: [
    "Failed, cracked or debonded perimeter sealant at window and door frames allowing water ingress",
    "Missing or failed head flashings above window and door heads — water tracking into wall cavity or internal substrate",
    "No storm deflector angle on high-exposure or upper-level facades — recurring water ingress during storm events",
    "Deteriorated or cracked concrete and masonry window sills and door hobs — water ponding and ingress at sill level",
    "Deteriorated timber window sills and door frames — localised decay requiring repair before repainting and resealing",
  ],
  typicalSubstrates: [
    "Rendered masonry and concrete facades — perimeter sealant joints at aluminium window and door frames",
    "Fibre cement cladding — perimeter sealant joints at window and door openings",
    "Concrete window sills and balcony door hobs — substrate reinstatement with polymer-modified mortar",
    "Timber window sills and door frames — epoxy putty repair before priming and repainting",
    "Aluminium window and door frames — perimeter sealant and storm angle installation",
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

export function WindowDoorIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are window and door perimeter repair systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Window and door perimeter water ingress is one of the most common defects in Class 2 strata facades in Australia. The interface between the window or door frame and the surrounding facade — whether rendered masonry, concrete or cladding — is a high-risk zone for water penetration. The four primary causes are: failed or missing perimeter sealant, missing or failed head flashings, absence of storm deflector angles on exposed facades, and failed or blocked subsill drainage. Each requires a different repair product and approach.
        </p>
        <p>
          Perimeter sealant systems seal the joint between the window or door frame and the facade substrate, accommodating movement at this interface. Head flashings are installed above window and door heads to intercept and deflect water before it reaches the perimeter joint — they are a primary line of defence that sealant alone cannot replace. Storm deflector angles redirect driving rain and facade run-off away from perimeter joints on high-exposure or upper-level facades. Where the concrete or masonry sill or balcony door hob has deteriorated, the substrate must be reinstated with a polymer-modified repair mortar before new sealant can be applied.
        </p>
        <p>
          AS 2047 establishes performance requirements for window installation and water penetration resistance. Correctly formed perimeter sealant joints must be installed over backer rod to control sealant depth and prevent three-sided adhesion. Before specifying any perimeter repair product, the actual failure mode must be diagnosed by inspection — just resealing the perimeter joint will not resolve water ingress caused by a missing head flashing or failed subsill drainage.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Full window replacement — perimeter repair systems address the frame-to-facade interface, not the window unit itself; a failed window unit requires replacement, not perimeter resealing",
              "Internal window reveals — plasterboard linings and internal reveal finishes are not part of the external waterproofing system",
              "Cavity wall flashings — flashings within the wall cavity at lintel level are a structural flashing, not a perimeter joint sealant; do not confuse cavity flashing repair with external perimeter sealant replacement",
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

export function WindowDoorProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">6 products — 5 brands — window and door perimeter repair systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of window and door perimeter repair products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Purpose</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Install method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.purpose}</td>
                  <td className="px-4 py-3 text-slate-600">{row.installMethod}</td>
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
            <p className="mt-1 text-sm text-slate-500">Window and door perimeter repair system equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#eab308" }}>Lysaght</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Selleys</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#8b5cf6" }}>Parchem</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.sika, row.lysaght, row.selleys, row.parchem].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callout — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Diagnose before specifying</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Window water ingress has multiple causes — failed perimeter sealant, missing or failed head flashing, no storm deflector angle, failed subsill drainage, or membrane failure above the opening. Resealing the perimeter joint alone will not fix a missing head flashing.",
            "Engage a building consultant to diagnose the actual failure mode before specifying any repair product — incorrect specification wastes cost and leaves the defect unresolved.",
            "Head flashings are a primary line of defence — where head flashings are missing or failed, they must be installed before perimeter sealant is replaced. Sealant is not a substitute for flashing.",
            "Confirm window system compliance with AS 2047 as part of the investigation — a non-compliant window installation may require full replacement of the window unit, not perimeter repair.",
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
