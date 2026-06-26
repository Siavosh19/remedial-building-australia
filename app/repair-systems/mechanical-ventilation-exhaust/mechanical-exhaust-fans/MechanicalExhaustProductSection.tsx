"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import { DataNote } from "@/app/repair-systems/_components/ProductPageShared";

type FilterTag =
  | "Exhaust-fan"
  | "Inline"
  | "Centrifugal"
  | "Duct-fan"
  | "Ceiling-mounted"
  | "Axial"
  | "Wall-mounted"
  | "Backdraft-shutter"
  | "Acoustic"
  | "Attenuation"
  | "Flexible-duct"
  | "150mm"
  | "100mm";

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
    fullLabel: "Fantech",
    brandUrl: "https://www.fantech.com.au",
    accentColor: "#ef4444",
    name: "Fantech 150mm Inline Duct Fan",
    descriptionLine: "150mm inline centrifugal duct fan for kitchen range hood and bathroom exhaust where long duct runs and multiple bends generate high static pressure",
    productType: "150mm inline centrifugal duct fan — kitchen and bathroom exhaust",
    dataNote: "Owner to confirm — 'Fantech DVA150' could not be confirmed as a current Fantech Australia product. Current Fantech 150mm inline fans include the TD-500/150SIL and WhisperJet 150 series — confirm the correct model name with Fantech before specifying.",
    filterTags: ["Exhaust-fan", "Inline", "Centrifugal", "Duct-fan", "150mm"],
    techChips: [
      { label: "Inline centrifugal", cls: "bg-sky-100 text-sky-800" },
      { label: "150mm duct", cls: "bg-slate-100 text-slate-700" },
      { label: "High static pressure", cls: "bg-slate-100 text-slate-700" },
      { label: "Kitchen / bathroom", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1668.2", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm model name — A 150mm inline duct fan designed for kitchen range hood exhaust and bathroom exhaust systems in residential and multi-unit buildings where duct runs are long or have multiple bends that generate significant static pressure. Inline fans are installed within the duct run — typically in the ceiling plenum or plant room — rather than at the ceiling or wall face. This placement allows the fan to draw air through the full duct run length, making it suitable for strata apartment bathroom and kitchen exhaust systems where the common exhaust riser may be several floors away from the apartment.\n\nConfirm duct diameter, external static pressure, and required airflow against AS 1668.2 requirements before specifying. Confirm current product model name with Fantech Australia. An accessible maintenance point or access panel must be provided in the ceiling or duct run adjacent to the installed fan.",
    technicalProperties: [
      "150mm duct connection — centrifugal impeller — suits long duct runs with higher external static pressure than axial fans can overcome",
      "Inline installation within duct run — fan is not visible at the ceiling or wall face — suitable for kitchen range hood and bathroom exhaust in strata apartments",
      "Centrifugal fan type — higher static pressure capability than axial fans — suitable for duct runs with multiple bends and risers",
      "Available in single-speed and variable-speed models — confirm current range with Fantech for the required application",
      "Hardwired 240V connection — installation requires a licensed electrician — confirm switching and timer requirements with the electrical contractor",
    ],
    limitations: [
      "Inline installation requires access for maintenance — an access panel in the ceiling or adjacent duct run is mandatory",
      "Centrifugal fans are larger and heavier than axial fans — confirm structural support and space available in the ceiling plenum before specifying",
      "Not suitable for direct wall or ceiling face exhaust without ductwork — inline fan must be connected to a full duct system",
      "Confirm duct diameter and external static pressure against current Fantech inline fan performance data before specifying — undersizing will result in non-compliance with AS 1668.2 airflow requirements",
      "Confirm current product specification and compliance with Fantech before specifying",
    ],
    procurementSources: [
      { name: "Fantech Australia — trade supply — contact for current pricing", url: "https://www.fantech.com.au" },
      { name: "HVAC and ventilation trade suppliers nationally — confirm current stock", url: "https://www.fantech.com.au" },
    ],
  },
  {
    fullLabel: "Manrose",
    brandUrl: "https://www.manrose.com.au",
    accentColor: "#3b82f6",
    name: "Manrose CF100 Ceiling Exhaust Fan",
    descriptionLine: "100mm centrifugal ceiling-mounted exhaust fan with adjustable timer for bathroom and toilet exhaust — quiet operation, backdraft shutter, 25 L/s extract rate",
    productType: "100mm ceiling-mounted centrifugal exhaust fan for bathrooms",
    filterTags: ["Exhaust-fan", "Ceiling-mounted", "Centrifugal", "100mm", "Backdraft-shutter"],
    techChips: [
      { label: "Ceiling-mounted centrifugal", cls: "bg-sky-100 text-sky-800" },
      { label: "100mm duct", cls: "bg-slate-100 text-slate-700" },
      { label: "Backdraft shutter", cls: "bg-slate-100 text-slate-700" },
      { label: "Adjustable timer", cls: "bg-green-50 text-green-700" },
      { label: "AS 1668.2", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Manrose CF100 is a 100mm centrifugal ceiling-mounted exhaust fan for bathroom and toilet exhaust in residential and multi-unit buildings. The centrifugal design allows it to move air over longer duct runs than axial fans, providing maximum performance even against pressures from long duct lengths and resistance by grilles. The fan is installed in the ceiling face, visible from below, and connects to a 100mm flexible or rigid duct run in the ceiling plenum. Extract rate is 90 m³/hr (25 L/s). The CF100 includes an integral backdraft shutter (spring-operated non-return flap) to prevent reverse airflow and odour migration from the common exhaust duct when the fan is not running — essential in strata apartment buildings with common exhaust risers.\n\nThe CF100T variant includes an adjustable overrun timer that keeps the fan running for a set period after the light is switched off — improving moisture extraction in bathrooms and reducing condensation on surfaces. Noise level is 42 dB(A) at 3m. Confirm the selected CF100 variant (standard, timer, humidity) against the project requirements.",
    technicalProperties: [
      "100mm centrifugal ceiling-mounted fan — 90 m³/hr (25 L/s) extract rate — installs in standard ceiling opening — visible from below in bathroom or toilet",
      "Integral backdraft shutter (spring-operated non-return flap) — prevents reverse airflow through the exhaust duct when fan is off — essential in strata common exhaust riser systems",
      "Adjustable overrun timer (CF100T variant) — fan continues to run after light is switched off — improves moisture extraction and reduces condensation",
      "42 dB(A) at 3m — centrifugal design provides powerful yet quiet and vibration-free operation",
      "Hardwired 240V connection — installation requires a licensed electrician — timer and switching configuration to be confirmed with electrical contractor",
    ],
    limitations: [
      "Centrifugal fan — designed to move air over longer duct runs than axial fans, but still confirm duct run length and static pressure against Manrose CF100 performance data before specifying",
      "100mm duct diameter — confirm existing duct diameter before specifying — reducing duct diameter from an existing larger duct will increase static pressure and reduce airflow",
      "Ceiling-mounted — installation requires cutting or enlarging an opening in the ceiling — confirm ceiling type and structural framing before proceeding",
      "Overrun timer wiring configuration must be confirmed with the electrical contractor — timer function depends on switching arrangement",
      "Confirm current product specification and compliance with Manrose before specifying",
    ],
    procurementSources: [
      { name: "Manrose Australia — trade supply — contact for current pricing", url: "https://www.manrose.com.au" },
      { name: "Electrical trade suppliers nationally — confirm current stock", url: "https://www.manrose.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Clipsal",
    brandUrl: "https://www.clipsal.com",
    accentColor: "#22c55e",
    name: "Clipsal Airflow Wall Exhaust Fan",
    descriptionLine: "Wall-mounted axial exhaust fan with integral backdraft shutter for direct wall exhaust in bathrooms, toilets and laundries with access to an external wall",
    productType: "Wall-mounted exhaust fan with backdraft shutter",
    dataNote: "Owner to confirm — 'Clipsal Airflow GX' could not be confirmed as a current Clipsal Australia model. Clipsal does offer wall-mounted Airflow exhaust fans in Australia — confirm the correct current model name with Clipsal before specifying.",
    filterTags: ["Exhaust-fan", "Wall-mounted", "Axial", "Backdraft-shutter", "100mm"],
    techChips: [
      { label: "Wall-mounted axial", cls: "bg-sky-100 text-sky-800" },
      { label: "100mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Backdraft shutter", cls: "bg-slate-100 text-slate-700" },
      { label: "Direct wall exhaust", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1668.2", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm model name — A Clipsal Airflow wall-mounted exhaust fan with an integral backdraft shutter for direct wall exhaust in bathrooms, toilets, and laundries where the external wall allows direct exhaust without ductwork. Wall-mounted exhaust fans are installed through an external wall opening and exhaust directly to the outside — eliminating the duct run and static pressure limitations of ceiling fans connected to a common exhaust riser. This makes wall-mounted fans suitable where the bathroom or toilet has direct access to an external wall.\n\nIn Class 2 strata apartment buildings, wall-mounted exhaust fans are less common than ceiling fans — most apartments do not have a bathroom with direct access to an external wall. However, in ground-floor units, corner units, or where the bathroom abuts an external wall, a wall-mounted fan is an effective and simple solution. The integral backdraft shutter prevents reverse airflow and wind-driven rain ingress when the fan is not operating. Confirm current model name and specifications with Clipsal before specifying.",
    technicalProperties: [
      "Wall-mounted axial exhaust — installs through external wall — no ductwork required — direct exhaust to outside",
      "Integral backdraft shutter — prevents reverse airflow and wind ingress when fan is not operating",
      "100mm nominal diameter — confirm wall thickness and construction type before specifying — core drilling required through masonry or concrete walls",
      "Suitable for bathrooms, toilets, and laundries with direct access to an external wall — confirm planning and BCA requirements for wall penetrations in strata buildings",
      "Hardwired 240V connection — installation requires a licensed electrician — confirm switching requirements",
    ],
    limitations: [
      "Requires direct access to an external wall — not suitable for internal bathrooms or bathrooms remote from an external wall",
      "Wall penetration through concrete or masonry requires core drilling — confirm wall construction and structural implications before proceeding",
      "Axial fan — limited static pressure — not suitable for ducted installations or long runs — direct wall exhaust only",
      "Strata buildings may require OC approval for external wall penetrations — confirm with building manager and strata committee before proceeding",
      "Confirm current product specification and compliance with Clipsal before specifying",
    ],
    procurementSources: [
      { name: "Clipsal / Schneider Electric — trade supply — contact for current pricing", url: "https://www.clipsal.com" },
      { name: "Electrical trade suppliers nationally — confirm current stock", url: "https://www.clipsal.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Fantech",
    brandUrl: "https://www.fantech.com.au",
    accentColor: "#f97316",
    name: "Fantech Acoustic Attenuation Duct",
    descriptionLine: "Internally lined flexible acoustic duct for exhaust fan noise reduction — reduces airborne noise transmission through duct runs in shared walls and ceiling plenums",
    productType: "Lined flexible acoustic duct for exhaust noise reduction",
    filterTags: ["Acoustic", "Attenuation", "Flexible-duct", "Exhaust-fan"],
    techChips: [
      { label: "Acoustic attenuation", cls: "bg-sky-100 text-sky-800" },
      { label: "Flexible duct", cls: "bg-slate-100 text-slate-700" },
      { label: "Noise reduction", cls: "bg-slate-100 text-slate-700" },
      { label: "Shared walls / plenums", cls: "bg-green-50 text-green-700" },
      { label: "Exhaust system", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fantech acoustic attenuation duct is an internally lined flexible duct used in exhaust fan systems to reduce airborne noise transmission through duct runs that pass through shared walls, ceiling plenums, and floor-ceiling assemblies in strata apartment buildings. Standard flexible duct transmits exhaust fan motor noise and airborne sound from adjacent apartments through the duct walls — acoustic duct with internal mineral wool or foam lining significantly attenuates this noise. Acoustic duct is typically installed between the exhaust fan and the main duct riser, or throughout the entire duct run in noise-sensitive applications.\n\nIn Class 2 strata apartment buildings, exhaust fan noise transmitted through shared duct systems is a common complaint — particularly in bathroom exhaust systems where the duct passes through or adjacent to bedroom walls or ceiling spaces. Specifying acoustic duct as part of an exhaust fan replacement or upgrade addresses both the airflow compliance requirement (AS 1668.2) and the acoustic comfort requirement. Confirm duct diameter and acoustic performance rating with Fantech before specifying.",
    technicalProperties: [
      "Internally lined flexible duct — mineral wool or foam acoustic lining — attenuates airborne fan noise transmitted through duct walls",
      "Available in standard exhaust duct diameters — confirm required diameter (100mm or 150mm) with current Fantech range",
      "Flexible construction — allows routing around obstructions in ceiling plenums without sharp bends that increase static pressure",
      "Suitable for use in bathroom, toilet, kitchen, and laundry exhaust systems — confirm temperature rating for kitchen applications where higher temperatures may occur",
      "Compatible with standard exhaust fan duct spigots and rigid duct connectors — confirm connection method with Fantech technical data",
    ],
    limitations: [
      "Acoustic duct has a higher flow resistance than standard flexible duct — confirm static pressure implications against the selected fan performance curve before specifying",
      "Flexible duct — must not be kinked, compressed, or installed with unsupported sags — straight runs with gradual bends required for correct airflow and acoustic performance",
      "Acoustic lining must remain dry — condensation within the duct can saturate lining and reduce acoustic performance — confirm vapour barrier and insulation requirements",
      "Acoustic duct addresses airborne noise through duct walls — it does not eliminate structure-borne vibration from the fan motor — separate vibration isolation may be required",
      "Confirm current product specification and compliance with Fantech before specifying",
    ],
    procurementSources: [
      { name: "Fantech Australia — trade supply — contact for current pricing", url: "https://www.fantech.com.au" },
      { name: "HVAC and ventilation trade suppliers nationally — confirm current stock", url: "https://www.fantech.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Exhaust-fan", label: "Exhaust-fan" },
  { id: "Inline", label: "Inline" },
  { id: "Centrifugal", label: "Centrifugal" },
  { id: "Duct-fan", label: "Duct-fan" },
  { id: "Ceiling-mounted", label: "Ceiling-mounted" },
  { id: "Axial", label: "Axial" },
  { id: "Wall-mounted", label: "Wall-mounted" },
  { id: "Backdraft-shutter", label: "Backdraft-shutter" },
  { id: "Acoustic", label: "Acoustic" },
  { id: "Attenuation", label: "Attenuation" },
  { id: "Flexible-duct", label: "Flexible-duct" },
  { id: "150mm", label: "150mm" },
  { id: "100mm", label: "100mm" },
];

const BRAND_EQUIV: { system: string; fantech: string; manrose: string; clipsal: string }[] = [
  { system: "Inline duct fan (150mm)", fantech: "TODO: confirm model name", manrose: "—", clipsal: "—" },
  { system: "Ceiling centrifugal exhaust fan", fantech: "—", manrose: "CF100", clipsal: "—" },
  { system: "Wall-mounted exhaust fan", fantech: "—", manrose: "—", clipsal: "TODO: confirm model name" },
  { system: "Acoustic attenuation duct", fantech: "Acoustic Duct", manrose: "—", clipsal: "—" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  diameterMm: string;
  maxPressurePa: string;
  ductRequired: string;
  primaryUse: string;
}[] = [
  {
    product: "TODO: confirm — Fantech 150mm inline fan (model TBC)",
    brand: "Fantech",
    type: "Inline (confirm type with TDS)",
    diameterMm: "150mm",
    maxPressurePa: "High (confirm TDS)",
    ductRequired: "Yes — inline duct install",
    primaryUse: "Kitchen / bathroom — long duct runs",
  },
  {
    product: "Manrose CF100",
    brand: "Manrose",
    type: "Ceiling centrifugal",
    diameterMm: "100mm",
    maxPressurePa: "Medium-high — 90 m³/hr (25 L/s)",
    ductRequired: "Yes — ceiling duct to riser",
    primaryUse: "Bathroom / toilet ceiling exhaust",
  },
  {
    product: "TODO: confirm — Clipsal Airflow wall fan (model TBC)",
    brand: "Clipsal",
    type: "Wall-mounted axial",
    diameterMm: "100mm",
    maxPressurePa: "Low (direct wall)",
    ductRequired: "No — direct wall exhaust",
    primaryUse: "Bathroom / toilet — external wall",
  },
  {
    product: "Fantech Acoustic Duct",
    brand: "Fantech",
    type: "Acoustic attenuation duct",
    diameterMm: "100mm / 150mm",
    maxPressurePa: "N/A — duct component",
    ductRequired: "N/A — is the duct",
    primaryUse: "Noise reduction in exhaust duct runs",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of failed or undersized bathroom exhaust fans in Class 2 strata apartment buildings",
    "Replacement of inline duct fans in kitchen range hood exhaust systems serving multiple apartments on a common riser",
    "Upgrade of existing exhaust fans to comply with AS 1668.2 minimum airflow requirements",
    "Acoustic duct installation to reduce exhaust fan noise transmission in shared walls and ceiling plenums",
    "Wall-mounted exhaust fan installation where the bathroom has direct access to an external wall",
  ],
  selectionCriteria: [
    "Select inline fan for duct runs exceeding 3–4m or with multiple bends — axial fans cannot overcome the higher static pressure of long runs",
    "Select ceiling centrifugal fan (e.g. Manrose CF100) for runs up to medium length where a ceiling-face installation is required — centrifugal type handles more static pressure than axial",
    "Select wall-mounted axial fan only where the bathroom has direct access to an external wall — wall penetration approval required in strata buildings",
    "Specify acoustic duct wherever the exhaust duct passes through or adjacent to shared walls, bedroom walls, or noise-sensitive spaces",
    "Confirm minimum airflow against AS 1668.2 — bathrooms and toilets require a minimum of 25 L/s — confirm with mechanical engineer",
  ],
  limitations: [
    "Axial fans cannot overcome high static pressure in long duct runs — use centrifugal or inline fans for ducted runs to a remote riser — undersized or incorrect fan type will result in insufficient airflow and non-compliance",
    "All hardwired exhaust fan installations require a licensed electrician — not DIY",
    "Inline fans must be accessible for maintenance — access panels in the ceiling or duct run are mandatory",
    "Wall penetrations through strata building external walls require OC approval — confirm before specifying",
    "Acoustic duct has higher flow resistance than standard duct — must be accounted for in fan selection",
  ],
  standardsNotes: [
    "AS 1668.2 — The Use of Ventilation and Air-conditioning in Buildings — Ventilation Design for Indoor Air Contaminant Control — sets minimum exhaust airflow requirements for bathrooms and toilets",
    "NCC/BCA Section J — energy efficiency provisions may affect fan specification in new work or alterations",
    "AS/NZS 3000 — Wiring Rules — applies to all electrical installation of exhaust fans by licensed electricians",
    "Strata Schemes Management Act 2015 (NSW) and equivalent state legislation — OC approval required for work affecting common property including external walls and common exhaust risers",
  ],
  suitableDefects: [
    "Failed exhaust fan motor — fan not operating — bathroom exhaust not functioning",
    "Bearing failure — noisy exhaust fan requiring replacement",
    "Inadequate exhaust airflow — fan operational but airflow insufficient to comply with AS 1668.2 — condensation and mould issues",
    "Blocked or collapsed duct — duct blockage preventing exhaust airflow — fan replacement and duct inspection required",
    "Exhaust fan noise complaints — noise transmission through duct runs in shared walls or ceiling plenums",
  ],
  typicalSubstrates: [
    "Plasterboard ceilings — ceiling-mounted axial exhaust fans — standard installation",
    "Concrete or masonry external walls — wall-mounted exhaust fans — core drilling required",
    "Ceiling plenums — inline duct fans and acoustic duct — confirm structural support for fan weight",
    "Common exhaust risers — duct connection from apartment fan to building riser — confirm riser diameter and capacity with building manager",
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

export function MechanicalExhaustIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are mechanical exhaust fan systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Mechanical exhaust fans in Class 2 strata apartment buildings fail for several reasons: motor burnout from age or continuous running, bearing failure causing noise and reduced airflow, duct blockage from lint, dust and debris accumulation, and inadequate airflow for the actual duct run length — where a fan specified for a short run is installed on a long run to a common exhaust riser, resulting in insufficient extraction. These failures lead to excess moisture, condensation, mould growth, and non-compliance with AS 1668.2 ventilation requirements.
        </p>
        <p>
          Fan type selection is critical to performance. Inline fans and centrifugal ceiling fans are suitable for longer duct runs because they develop higher static pressure than axial fans, allowing them to overcome duct friction over longer runs. Axial wall-mounted fans are suitable for direct-to-wall exhaust only. Installing an axial fan on a long ducted run to a remote riser is a common cause of inadequate airflow — the fan type must be matched to the duct run length and static pressure of the installed system.
        </p>
        <p>
          Acoustic duct is used to manage noise transmission in exhaust systems where the duct run passes through or adjacent to shared walls, bedroom walls, and ceiling plenums in strata buildings. Standard flexible duct transmits exhaust fan motor noise and airborne sound from adjacent apartments — internally lined acoustic duct with mineral wool or foam lining attenuates this noise and is specified as part of an exhaust fan replacement or upgrade where noise complaints are part of the defect history.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Passive mushroom vents — passive roof space ventilation units driven by wind pressure and thermal buoyancy — not powered exhaust systems",
              "Carpark ventilation fans — high-volume industrial fans for carpark CO and smoke extraction — not residential bathroom or kitchen exhaust",
              "Window exhaust fans — window-mounted units installed in a window opening — not in-ceiling or in-duct exhaust systems",
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

export function MechanicalExhaustProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — 3 brands — mechanical exhaust fan systems — scroll to view all</p>
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
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3 space-y-2">
                  {product.dataNote && <DataNote text={product.dataNote} />}
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of mechanical exhaust fan products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Diameter</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Max pressure</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Duct required</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.diameterMm}</td>
                  <td className="px-4 py-3 text-slate-600">{row.maxPressurePa}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ductRequired}</td>
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
            <p className="mt-1 text-sm text-slate-500">Mechanical exhaust fan equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Fantech</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Manrose</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Clipsal</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.fantech, row.manrose, row.clipsal].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Airflow design and electrical compliance</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Exhaust fan airflow must comply with AS 1668.2 — minimum 25 L/s for bathrooms and toilets — airflow compliance must be confirmed by a mechanical engineer before specifying a replacement fan",
            "Fan installation requires a licensed electrician — hardwired exhaust fans are not DIY installations — confirm switching, timer, and circuit requirements with the electrical contractor before proceeding",
            "Inline fans must be accessible for maintenance — provide an access panel in the duct run or ceiling adjacent to the installed inline fan — inaccessible fans cannot be serviced or replaced when they next fail",
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
