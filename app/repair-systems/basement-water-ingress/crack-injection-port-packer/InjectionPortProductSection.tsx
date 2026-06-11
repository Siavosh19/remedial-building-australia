"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Surface-port" | "Drill-in-packer"
  | "Low-pressure" | "High-pressure"
  | "PU-compatible" | "Acrylic-compatible"
  | "Epoxy-compatible" | "EN-1504-5";

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
    name: "Sika Injection Port LP",
    descriptionLine: "Surface-mounted low-pressure injection port — bonded to crack surface — for PU, acrylic, and epoxy injection resins",
    productType: "Surface-mounted injection port — low pressure",
    filterTags: ["Surface-port", "Low-pressure", "PU-compatible", "Acrylic-compatible", "Epoxy-compatible", "EN-1504-5"],
    techChips: [
      { label: "Surface port", cls: "bg-sky-100 text-sky-800" },
      { label: "Low pressure", cls: "bg-slate-100 text-slate-700" },
      { label: "Bonded to surface", cls: "bg-slate-100 text-slate-700" },
      { label: "PU / acrylic / epoxy", cls: "bg-green-50 text-green-700" },
      { label: "EN 1504-5", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Injection Port LP (Low Pressure) is a plastic injection port bonded directly to the concrete surface over the crack with an epoxy port adhesive, eliminating the need to drill into the concrete. The port body has an internal check valve that prevents resin back-flow after injection. Resin is injected through the port at low pressure using a single or two-component injection pump, entering the crack through the bond between the port base and the crack opening.\n\nSurface-mounted ports are the preferred approach for concrete in good condition where drilling would risk damaging reinforcement, for thin concrete sections where drill-in packers are not practical, and for cracks in hard-to-access locations where setting out port positions is easier than drilling. Port spacing is typically 200–300mm for concrete cracks with 0.3–1.0mm width. Ports are bonded to the concrete with a fast-setting epoxy port adhesive, the crack is sealed between ports with a surface sealant (typically Sikadur or equivalent epoxy paste), and injection proceeds port-by-port working from the lowest point upward.\n\nCompatible with PU foam injection (Sika Injection-107), PU gel injection (Sika Injection-101 RC), acrylic acrylate injection (Sika Injection-306), and epoxy injection resins. Confirm current product name and compatible resin list with Sika Australia before specifying.",
    technicalProperties: [
      "No drilling required — bonded to crack surface with epoxy port adhesive",
      "Internal check valve — prevents resin back-flow between ports",
      "Compatible with PU (1C and 2C), acrylic acrylate, and epoxy injection resins",
      "Low pressure application — suitable for cracks and joints with good resin retention",
      "Simple installation — no specialist drilling equipment required beyond port adhesive and pump",
      "EN 1504-5 compatible injection port — confirm classification with Sika Australia",
    ],
    limitations: [
      "Bonding strength of port to surface limits maximum injection pressure — port can detach at high pressure — use drill-in packers for high-pressure injection",
      "Requires crack surface to be dry and free of dust, laitance, and release agent for port adhesive to bond correctly",
      "Port adhesive cure time required before injection — typically 1–2 hours — plan for workflow accordingly",
      "Not suitable for high-pressure injection (above approximately 3–5 bar) — drill-in packers required for high-pressure applications",
      "Crack must be sealed between ports with surface sealant before injection — unsealed crack allows resin to escape between ports",
      "Confirm current product name and compatible injection resins with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — contact for current pricing and trade supply", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#cc0000",
    name: "Sika Injection Packer HP",
    descriptionLine: "Drill-in high-pressure injection packer — 10mm and 13mm diameter — PU, acrylic and epoxy resins — basement cracks and joints",
    productType: "Drill-in injection packer — high pressure",
    filterTags: ["Drill-in-packer", "High-pressure", "Low-pressure", "PU-compatible", "Acrylic-compatible", "Epoxy-compatible", "EN-1504-5"],
    techChips: [
      { label: "Drill-in packer", cls: "bg-sky-100 text-sky-800" },
      { label: "High pressure", cls: "bg-slate-100 text-slate-700" },
      { label: "10mm or 13mm", cls: "bg-slate-100 text-slate-700" },
      { label: "PU / acrylic / epoxy", cls: "bg-green-50 text-green-700" },
      { label: "EN 1504-5", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Injection Packer HP is a drill-in steel packer used to deliver injection resins (PU, acrylic, or epoxy) into cracks and joints in concrete under higher injection pressures than surface-mounted ports can withstand. The packer body is inserted into a pre-drilled hole (typically 10mm or 13mm diameter) drilled at an angle into the crack plane from the concrete surface, and expanded to grip the hole wall by tightening the packer nut — forming a pressure-tight seal between the packer body and the drill hole wall. Resin is injected through the packer's check valve at the specified pressure until refusal.\n\nDrill-in packers are the standard choice for injection of active water leaks (PU), high-pressure injection into deep cracks (epoxy), and situations where surface-mounted ports cannot achieve adequate pressure or adhesion to the substrate. The angled drilling approach allows the packer to intersect the crack plane at multiple depths through the concrete section, improving resin distribution and completeness of fill.\n\nPacker spacing is typically 150–250mm depending on crack width and resin viscosity. After injection is complete, packers are removed by releasing the nut and pulling out — the drill holes are patched with epoxy mortar. Compatible with Sika Injection-107 (PU foam), Sika Injection-101 RC (2C PU gel), Sika Injection-306 (acrylic), and epoxy injection resins.\n\nConfirm current packer diameter availability (10mm and 13mm), HP pressure rating, and compatible resin list with Sika Australia before specifying.",
    technicalProperties: [
      "Drill-in — inserted into pre-drilled angled hole — grips drill hole wall by tightening packer nut",
      "High-pressure rated — suitable for injection pressures above 3–5 bar — significantly higher pressure capability than surface ports",
      "Removable after injection — packer nut released and packer pulled out — drill hole patched with epoxy mortar",
      "Available in 10mm and 13mm diameter — confirm current Australian stock",
      "Compatible with PU (1C and 2C), acrylic acrylate, and epoxy injection resins",
      "Intersects crack at depth — improves completeness of resin fill through full concrete thickness",
      "EN 1504-5 compatible — confirm with Sika Australia",
    ],
    limitations: [
      "Requires drilling into concrete — risk of hitting reinforcement — scan with rebar locator before drilling — mandatory",
      "Angled drilling requires skill — incorrect angle results in packer missing the crack plane — specialist contractor required",
      "Packer installation in aggressive chemical environments (below-grade with sulphate-bearing groundwater) may require stainless steel packers — confirm with Sika Australia",
      "Drill holes must be patched after packer removal — additional patching operation required after injection",
      "Over-tightening packer nut can fracture concrete at hole edge — particularly in thin sections or sections with limited concrete cover",
      "Confirm current product name, diameter availability, and pressure rating with Sika Australia before ordering",
    ],
    procurementSources: [
      { name: "Sika Australia — contact for current pricing and trade supply", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Master Builders Solutions (BASF)",
    brandUrl: "https://www.master-builders-solutions.com/en-au",
    accentColor: "#003591",
    name: "BASF MasterInject Surface Port",
    descriptionLine: "Surface-mounted injection port — bonded to crack — low-pressure PU, acrylic, and epoxy resin delivery — BASF injection system",
    productType: "Surface-mounted injection port — low pressure",
    filterTags: ["Surface-port", "Low-pressure", "PU-compatible", "Acrylic-compatible", "Epoxy-compatible", "EN-1504-5"],
    techChips: [
      { label: "Surface port", cls: "bg-sky-100 text-sky-800" },
      { label: "Low pressure", cls: "bg-slate-100 text-slate-700" },
      { label: "BASF system", cls: "bg-slate-100 text-slate-700" },
      { label: "PU / acrylic / epoxy", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "The BASF MasterInject Surface Port is the surface-mounted injection port in the Master Builders Solutions MasterInject injection system — the equivalent to the Sika Injection Port LP but specified where BASF MasterInject resins (MasterInject 1308, MasterInject 1315) are being used and the contractor prefers to keep the system within the one manufacturer's accessories. Like the Sika equivalent, the BASF surface port is bonded to the concrete surface over the crack with a fast-setting epoxy adhesive, and resin is injected at low pressure through the port's check valve.\n\nIn Australian Class 2 strata basement crack injection projects, BASF MasterInject ports are used by contractors working within the BASF supply ecosystem — contractors who purchase MasterInject injection resins from Master Builders Solutions Australia and prefer to use matching BASF accessories for the injection port components. The functional performance of BASF and Sika surface-mounted injection ports is broadly equivalent — selection is driven by supply chain.\n\nConfirm current product name and availability with Master Builders Solutions Australia before ordering — BASF injection accessory product names have changed with the Master Builders Solutions rebranding.",
    technicalProperties: [
      "Surface-mounted — bonded with epoxy adhesive — no drilling required",
      "Check valve — prevents resin back-flow",
      "Compatible with BASF MasterInject 1308 (PU), MasterInject 1315 (acrylic), and epoxy resins",
      "Low-pressure application",
      "Simple installation — no specialist drilling equipment",
    ],
    limitations: [
      "Same pressure limitation as all surface ports — port can detach at high injection pressure — use drill-in packers for high-pressure applications",
      "Requires dry, clean crack surface for port adhesive bond",
      "Confirm current product name and availability with BASF Australia — naming may have changed",
      "Crack must be surface-sealed between ports before injection",
      "Confirm EN 1504-5 compliance status with BASF Australia",
    ],
    procurementSources: [
      { name: "Master Builders Solutions Australia — contact for current pricing", url: "https://www.master-builders-solutions.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Master Builders Solutions (BASF)",
    brandUrl: "https://www.master-builders-solutions.com/en-au",
    accentColor: "#003591",
    name: "BASF MasterInject Packer",
    descriptionLine: "Drill-in injection packer — high-pressure — for BASF MasterInject PU, acrylic, and epoxy injection resins",
    productType: "Drill-in injection packer — high pressure",
    filterTags: ["Drill-in-packer", "High-pressure", "Low-pressure", "PU-compatible", "Acrylic-compatible", "Epoxy-compatible", "EN-1504-5"],
    techChips: [
      { label: "Drill-in packer", cls: "bg-sky-100 text-sky-800" },
      { label: "High pressure", cls: "bg-slate-100 text-slate-700" },
      { label: "BASF system", cls: "bg-slate-100 text-slate-700" },
      { label: "PU / acrylic / epoxy", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "The BASF MasterInject Packer is the drill-in injection packer in the Master Builders Solutions MasterInject system, equivalent in function to the Sika Injection Packer HP but supplied as part of the BASF MasterInject accessory range. Like the Sika packer, MasterInject Packers are inserted into pre-drilled angled holes, expanded to form a pressure-tight seal, and used to inject MasterInject resins (PU, acrylic, epoxy) under higher pressures than surface ports allow.\n\nContractors working within the BASF supply ecosystem typically use BASF packers alongside BASF injection resins to maintain a single-manufacturer system — relevant where the manufacturer warranty or technical support for the injection system requires that specified accessories and resins are used together.\n\nConfirm current product name, available diameter sizes, and pressure rating with Master Builders Solutions Australia before ordering.",
    technicalProperties: [
      "Drill-in — angled hole — grips hole wall by tightening packer nut",
      "High-pressure rated — suitable for applications requiring pressures above surface port limits",
      "Removable after injection — drill holes patched with epoxy mortar",
      "Compatible with BASF MasterInject PU, acrylic, and epoxy injection resins",
      "EN 1504-5 compatible — confirm with BASF Australia",
    ],
    limitations: [
      "Confirm current product name and diameter with BASF Australia before ordering",
      "Same rebar scanning requirement as all drill-in packers — scan before drilling",
      "Specialist contractor required for angled drilling and correct crack plane intersection",
      "Over-tightening can crack concrete at hole edge",
      "Confirm whether BASF packer is compatible with Sika resins and vice versa before mixing manufacturers' accessories and resins",
    ],
    procurementSources: [
      { name: "Master Builders Solutions Australia — contact for current pricing", url: "https://www.master-builders-solutions.com/en-au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Surface-port", label: "Surface port" },
  { id: "Drill-in-packer", label: "Drill-in packer" },
  { id: "Low-pressure", label: "Low pressure" },
  { id: "High-pressure", label: "High pressure" },
  { id: "PU-compatible", label: "PU compatible" },
  { id: "Acrylic-compatible", label: "Acrylic compatible" },
  { id: "Epoxy-compatible", label: "Epoxy compatible" },
  { id: "EN-1504-5", label: "EN 1504-5" },
];

const COMPARISON_ROWS: {
  product: string;
  brand: string;
  type: string;
  drilling: string;
  pressure: string;
  resins: string;
  en15045: string;
  keyRestriction: string;
}[] = [
  {
    product: "Injection Port LP",
    brand: "Sika",
    type: "Surface port",
    drilling: "No",
    pressure: "Low (<3–5 bar)",
    resins: "PU, acrylic, epoxy",
    en15045: "Yes",
    keyRestriction: "Port detaches at high pressure — low pressure only",
  },
  {
    product: "Injection Packer HP",
    brand: "Sika",
    type: "Drill-in packer",
    drilling: "Yes — scan for rebar first",
    pressure: "High (>5 bar capable)",
    resins: "PU, acrylic, epoxy",
    en15045: "Yes",
    keyRestriction: "Specialist contractor required — rebar scan mandatory",
  },
  {
    product: "MasterInject Port",
    brand: "BASF",
    type: "Surface port",
    drilling: "No",
    pressure: "Low (<3–5 bar)",
    resins: "PU, acrylic, epoxy",
    en15045: "Confirm with BASF",
    keyRestriction: "Confirm current product name with BASF AU",
  },
  {
    product: "MasterInject Packer",
    brand: "BASF",
    type: "Drill-in packer",
    drilling: "Yes — scan for rebar first",
    pressure: "High capable",
    resins: "PU, acrylic, epoxy",
    en15045: "Confirm with BASF",
    keyRestriction: "Confirm current product name and diameter with BASF AU",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "PU injection delivery — surface ports or drill-in packers deliver hydrophilic PU foam or gel into active basement cracks",
    "Acrylic acrylate injection — surface ports for fine cracks at low pressure",
    "Epoxy injection — drill-in packers for structural crack repair under high injection pressure",
    "Construction joint injection — packers drilled along construction joint at 200–250mm centres for systematic joint sealing",
    "Cold joint treatment — packers installed through cold joint at staggered depths to ensure full joint width coverage",
  ],
  selectionCriteria: [
    "Surface ports (LP): use for cracks in good concrete where drilling is undesirable — thin sections, reinforcement congestion, or hard-to-access locations",
    "Drill-in packers (HP): use for active cracks requiring higher injection pressure, for systematic joint sealing, or where surface port adhesion to substrate is unreliable (wet, contaminated, or irregular surface)",
    "PU injection (active water): either surface ports or drill-in packers — drill-in packers preferred for active flow where higher pressure is needed to overcome water pressure",
    "Acrylic injection (fine cracks, low pressure): surface ports generally adequate — use drill-in packers for cracks in inaccessible locations",
    "Epoxy injection (structural crack repair, dry crack): drill-in packers required for high-pressure injection needed to fill tight dry cracks",
    "Sika vs BASF port/packer: functionally equivalent — select based on resin brand being used",
  ],
  limitations: [
    "Rebar scan mandatory before any drilling — use a cover meter or rebar scanner — hitting reinforcement during drilling for packers is a serious error",
    "Surface port adhesion requires dry, clean, sound concrete surface — wet surface or surface contaminated with release agent results in port detachment during injection",
    "Port and packer spacings are guidance — actual spacing depends on crack width, resin viscosity, and concrete porosity — specialist contractor judgment required",
    "Injection is a specialist trade — incorrect pressure, sequence, or technique results in incomplete fill, resin bypass, or secondary cracking — do not DIY",
    "Drill holes after packer removal must be patched with epoxy mortar before closing up — unpatched holes are penetration paths for future water ingress",
    "Surface sealant (epoxy paste) between ports must be applied and cured before injection — unsealed crack allows resin to escape between ports without filling the crack",
  ],
  standardsNotes: [
    "EN 1504-5 — products and systems for protection and repair of concrete structures — concrete injection — both Sika and BASF ports and packers are designed to comply",
    "AS 3600 Concrete Structures — rebar cover requirements — scan before drilling — do not reduce cover below AS 3600 minimums during packer installation",
    "NCC Volume One — no specific standard for injection ports in NCC — specify to EN 1504-5 and manufacturer system requirements",
    "Confirm current EN 1504-5 compliance certificate for selected products with manufacturer before specifying for infrastructure or public projects",
  ],
  suitableDefects: [
    "Basement crack injection — ports and packers deliver PU, acrylic, or epoxy resins into active or dormant cracks in concrete walls and slabs",
    "Construction joint injection — systematic packer installation along basement construction joints for PU or acrylic sealing",
    "Cold joint injection — packers at staggered depths through cold joint for complete joint width coverage",
    "Pipe penetration injection — packers around pipe penetrations to deliver expanding PU into annular gap",
  ],
  typicalSubstrates: [
    "Reinforced concrete walls and slabs — in-situ poured — most common substrate for injection port installation",
    "Precast concrete panels — confirm structural engineer approval before drilling for drill-in packers",
    "Masonry — surface ports preferred for masonry — drilling for packers in masonry requires care to avoid mortar joint drilling only",
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

export function InjectionPortIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are injection ports and packers?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Injection ports and packers are the delivery hardware for crack injection systems — they provide the mechanical connection between the injection pump and the crack interior, allowing resins (PU, acrylic, or epoxy) to be delivered into the crack under controlled pressure. Without ports or packers, the resin would be applied to the surface and would not enter the crack. Two main types are used in basement crack injection: surface-mounted ports (bonded to the crack face with adhesive) and drill-in packers (inserted into angled holes drilled from the surface into the crack plane).
        </p>
        {expanded && (
          <>
            <p>
              Surface-mounted ports are the simpler option — no drilling is required, they are bonded with an epoxy adhesive directly to the concrete surface over the crack opening, and injection proceeds at low pressure through the port body. They are preferred where drilling risks hitting reinforcement (shallow cover), where the concrete section is thin, or where the crack surface is accessible and clean enough for port adhesive bonding. Their limitation is injection pressure — the adhesive bond to the concrete surface limits the maximum safe injection pressure, making them unsuitable for high-pressure epoxy injection or for situations where elevated injection pressure is needed to overcome groundwater pressure.
            </p>
            <p>
              Drill-in packers are inserted into holes drilled at an angle to intersect the crack plane, expanded to grip the hole wall, and rated for significantly higher injection pressures. They are the standard choice for active water injection (where higher pressure may be needed to overcome the groundwater pressure acting at the crack), for systematic construction joint injection, and for epoxy injection (which requires high pressure to fill tight dry cracks). The critical step with drill-in packers is scanning for reinforcement before drilling — a rebar locator or cover meter must be used on every drilling location. Hitting reinforcement in a basement wall is a structural issue that can be difficult to remediate.
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

export function InjectionPortProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Port vs packer selection, spacing, pressure, rebar scanning, resin compatibility, and installation sequence</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Port vs Packer Selection" items={TECH_INFO.selectionCriteria} style="check" />
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
            <p className="mt-1 text-sm text-slate-500">4 products — 2 brands — Sika / BASF MBS — scroll to view all</p>
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
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5"><p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p></div>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Injection port and packer comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Sika and BASF products — confirm current product names with manufacturers. Rebar scan mandatory before any drill-in packer installation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Drilling req.</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pressure</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Resins</th>
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
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.drilling}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pressure}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.resins}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.en15045}</td>
                  <td className="px-4 py-3 text-slate-500">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-700">Critical — Rebar Scan Before Drilling</p>
          <p className="text-xs leading-6 text-red-900">A rebar locator or cover meter must be used on every proposed drill-in packer location before drilling. Hitting reinforcement during packer installation in a below-grade concrete basement wall can damage structural reinforcement and create a corrosion initiation point in a permanently wet environment. This is a structural risk — not a minor site error. Never drill for injection packers in reinforced concrete without rebar scanning.</p>
        </div>
      </div>
    </>
  );
}
