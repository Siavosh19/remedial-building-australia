"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Submersible" | "Auto-float"
  | "Manual" | "AS-NZS-4020"
  | "Cavity-drain-system" | "High-capacity"
  | "Backup-pump" | "Grundfos" | "DAB";

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
    fullLabel: "Grundfos Australia",
    brandUrl: "https://www.grundfos.com/au",
    tdsUrl: "https://product.grundfos.com/en/search?q=unilift+kp",
    accentColor: "#0047BB",
    name: "Grundfos Unilift KP 150-A-1",
    descriptionLine: "Submersible drainage pump — manual operation — portable — basement sump pit primary or backup pump",
    productType: "Submersible drainage pump — manual",
    filterTags: ["Submersible", "Manual", "Cavity-drain-system", "Grundfos"],
    techChips: [
      { label: "Submersible", cls: "bg-sky-100 text-sky-800" },
      { label: "Manual / portable", cls: "bg-slate-100 text-slate-700" },
      { label: "Max head ~7m", cls: "bg-slate-100 text-slate-700" },
      { label: "150W motor", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Grundfos Unilift KP 150-A-1 is a compact, portable submersible drainage pump from the Grundfos Unilift KP range, designed for dewatering and drainage of sumps, basements, and waterlogged areas. The KP range is manual-operation — a float switch is not included, making it a pump-only unit that must be controlled externally (via a float switch, level controller, or manual switch). As a portable unit, the KP 150-A-1 is also widely used as an emergency dewatering pump during basement flooding events, kept on standby in the sump pit for manual activation when required.\n\nIn cavity drain basement waterproofing systems for Australian Class 2 strata buildings, the Grundfos Unilift KP 150-A-1 is used as a backup or secondary pump in the sump pit — paired with an automatic pump (such as the Grundfos Unilift AP series) as the primary pump. Having a manual backup pump in the sump that can be activated manually in the event of automatic pump failure is a critical component of any Grade 3 cavity drain system design.\n\nThe KP 150-A-1 operates at 150W, delivers a maximum flow of approximately 8,400 L/hr, and can pump to a maximum head of approximately 7m. Confirm current product specifications, model number, and availability with Grundfos Australia before ordering.",
    technicalProperties: [
      "Submersible drainage pump — suitable for continuous submersion in sump pit",
      "Manual operation — no built-in float switch — requires external level control or manual activation",
      "Motor: 150W — maximum flow approximately 8,400 L/hr at zero head",
      "Maximum head approximately 7m — confirm current performance curve with Grundfos Australia",
      "Stainless steel shaft and impeller — corrosion-resistant construction for drainage water",
      "Portable — can be used as standby emergency pump or permanent sump pump with external control",
      "Compatible with Grundfos Unilift range float switches and level controllers",
    ],
    limitations: [
      "Manual operation only — no automatic float switch built in — must be paired with external float switch or level controller for automatic operation in unattended sump",
      "Not suitable as the sole primary pump in a Grade 3 cavity drain system without automatic activation — manual pump without float switch relies on manual intervention",
      "Confirm current model number, specifications, and availability with Grundfos Australia — KP range models and specifications are updated periodically",
      "Do not use for sewage or grey water — drainage pump only — suitable for groundwater, basement drainage, and clean water only",
      "Confirm 240V single-phase power supply at sump location — allow for dedicated circuit with residual current device (RCD)",
    ],
    procurementSources: [
      { name: "Grundfos Australia — trade and direct supply", url: "https://www.grundfos.com/au" },
      { name: "Tradelink (trade plumbing supply)", url: "https://www.tradelink.com.au" },
      { name: "Reece Plumbing — trade account", url: "https://www.reece.com.au" },
      { name: "Electrical and plumbing trade suppliers — confirm local stock", url: "https://www.grundfos.com/au" },
    ],
  },
  {
    fullLabel: "Grundfos Australia",
    brandUrl: "https://www.grundfos.com/au",
    tdsUrl: "https://product.grundfos.com/en/search?q=unilift+ap",
    accentColor: "#0047BB",
    name: "Grundfos Unilift AP 35.40.08",
    descriptionLine: "Automatic submersible drainage pump — built-in float switch — primary sump pump for cavity drain basement systems",
    productType: "Submersible drainage pump — automatic float switch",
    filterTags: ["Submersible", "Auto-float", "Cavity-drain-system", "Grundfos", "AS-NZS-4020"],
    techChips: [
      { label: "Submersible", cls: "bg-sky-100 text-sky-800" },
      { label: "Auto float switch", cls: "bg-green-50 text-green-700" },
      { label: "350W motor", cls: "bg-slate-100 text-slate-700" },
      { label: "Automatic", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Grundfos Unilift AP 35.40.08 is an automatic submersible drainage pump with a built-in float switch, making it the standard choice for unattended primary sump pump duty in cavity drain basement waterproofing systems. When the water level in the sump pit rises to the float switch activation level, the pump starts automatically, discharges the accumulated drainage water, and stops when the water level drops to the cut-off level — operating entirely without manual intervention. This automatic operation is essential for a functioning cavity drain system in an occupied basement where active monitoring of the sump is not practical.\n\nIn Australian Class 2 strata basement remediation, the Grundfos Unilift AP 35.40.08 is the primary pump in the sump pit, handling the routine daily drainage load from the cavity drain membrane system. It is always paired with a backup pump (Grundfos Unilift KP or equivalent) and a high-water alarm that activates if the water level rises above the normal operating range — indicating pump failure or extraordinary ingress volume.\n\nThe AP 35.40.08 delivers up to approximately 14,000 L/hr at zero head with a 350W motor and maximum head of approximately 8m. The built-in float switch operates at approximately 35–40mm activation range. Confirm current model specifications, float switch settings, and availability with Grundfos Australia before ordering.",
    technicalProperties: [
      "Submersible pump with built-in automatic float switch — no external controller required",
      "Motor 350W — maximum flow approximately 14,000 L/hr — maximum head approximately 8m",
      "Automatic start/stop based on water level — suitable for unattended continuous operation",
      "Stainless steel shaft and impeller — suitable for groundwater and basement drainage",
      "Vertical or horizontal installation in sump — compact dimensions suit standard sump liner",
      "IP68 — fully waterproof for permanent submersion",
      "Confirm AS/NZS 4020 (materials in contact with drinking water) if pump is used in potable water applications — standard drainage use does not require this",
    ],
    limitations: [
      "Float switch failure causes pump to not start — regular inspection and float switch testing required as part of maintenance program",
      "Sole pump failure in a Grade 3 cavity drain system is a service failure — backup pump is mandatory, not optional",
      "Not suitable for sewage or grey water — drainage (groundwater) only",
      "Pump discharge pipe must be routed to an approved drainage point — stormwater drain, charged sewer (confirm with council), or to ground away from building",
      "Confirm motor size adequacy for the expected groundwater inflow rate with the system designer — undersized pump leads to continuous operation and premature failure",
      "Confirm current model number, specifications, and price with Grundfos Australia before ordering",
    ],
    procurementSources: [
      { name: "Grundfos Australia — trade and direct supply", url: "https://www.grundfos.com/au" },
      { name: "Tradelink (trade plumbing supply)", url: "https://www.tradelink.com.au" },
      { name: "Reece Plumbing — trade account", url: "https://www.reece.com.au" },
    ],
  },
  {
    fullLabel: "DAB Pumps Australia",
    brandUrl: "https://www.dabpumps.com.au",
    tdsUrl: "https://www.dabpumps.com.au/drainage-submersible",
    accentColor: "#e05c00",
    name: "DAB FEKA VS 550 T-NA",
    descriptionLine: "Submersible drainage pump — automatic float switch — basement sump primary or backup pump — Italian engineering",
    productType: "Submersible drainage pump — automatic",
    filterTags: ["Submersible", "Auto-float", "Cavity-drain-system", "DAB", "Backup-pump"],
    techChips: [
      { label: "Submersible", cls: "bg-sky-100 text-sky-800" },
      { label: "Auto float switch", cls: "bg-green-50 text-green-700" },
      { label: "550W motor", cls: "bg-slate-100 text-slate-700" },
      { label: "DAB FEKA range", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The DAB FEKA VS 550 T-NA is a submersible drainage pump from DAB Pumps' FEKA VS range — Italian-engineered pumps distributed in Australia through DAB Pumps Australia. The FEKA VS series is designed for drainage and dewatering of sumps, wells, and flooded basements, with a vertical submersible format suitable for installation in cavity drain sump pits. The 550W motor and integrated float switch make it suitable for primary or backup sump pump duty in cavity drain basement waterproofing systems.\n\nIn Australian Class 2 strata basement remediation, DAB pumps are used where the specifying contractor or designer prefers the DAB supply chain over Grundfos — typically for cost, availability, or specific flow and head requirements that a DAB model matches better than the equivalent Grundfos Unilift model. The DAB FEKA VS 550 T-NA delivers approximately 18,000 L/hr maximum flow with 550W motor power and maximum head of approximately 9m.\n\nDAB Pumps Australia is an established Australian distributor. Confirm current model specifications, current model designation (T-NA suffix may vary by market), and pricing with DAB Pumps Australia before ordering.",
    technicalProperties: [
      "Submersible drainage pump — suitable for permanent sump pit installation",
      "Integrated float switch — automatic operation — no external controller required",
      "Motor 550W — maximum flow approximately 18,000 L/hr — maximum head approximately 9m",
      "Polypropylene body — chemical-resistant — suitable for groundwater drainage",
      "IP68 rated — suitable for continuous submersion",
      "Suitable for water with solids up to 10mm particle size — handles some suspended solids in drainage water",
    ],
    limitations: [
      "Confirm current model designation T-NA with DAB Pumps Australia — model suffixes vary by market",
      "Not for sewage or grey water — drainage and groundwater use only",
      "Float switch must be regularly tested — manufacturer inspection schedule must be followed",
      "Backup pump and high-water alarm required for Grade 3 cavity drain applications — DAB pump alone is not a complete cavity drain system",
      "Confirm discharge pipe sizing for 550W pump output — larger motor produces higher flow rate requiring adequate discharge pipe diameter",
      "Confirm Australian electrical compliance (AS/NZS 3000 wiring rules) and supply current pricing with DAB Pumps Australia",
    ],
    procurementSources: [
      { name: "DAB Pumps Australia — trade supply", url: "https://www.dabpumps.com.au" },
      { name: "Tradelink (trade plumbing supply)", url: "https://www.tradelink.com.au" },
      { name: "Reece Plumbing — trade account", url: "https://www.reece.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Submersible", label: "Submersible" },
  { id: "Auto-float", label: "Auto float switch" },
  { id: "Manual", label: "Manual / portable" },
  { id: "Backup-pump", label: "Backup pump" },
  { id: "Cavity-drain-system", label: "Cavity drain system" },
  { id: "High-capacity", label: "High capacity" },
  { id: "AS-NZS-4020", label: "AS/NZS 4020" },
  { id: "Grundfos", label: "Grundfos" },
  { id: "DAB", label: "DAB" },
];

const COMPARISON_ROWS: {
  product: string;
  brand: string;
  operation: string;
  motorW: string;
  maxFlowLhr: string;
  maxHeadM: string;
  role: string;
  keyRestriction: string;
}[] = [
  {
    product: "Unilift KP 150-A-1",
    brand: "Grundfos",
    operation: "Manual (no float)",
    motorW: "150W",
    maxFlowLhr: "~8,400 L/hr",
    maxHeadM: "~7m",
    role: "Backup / emergency",
    keyRestriction: "No auto-start — needs external float or manual activation",
  },
  {
    product: "Unilift AP 35.40.08",
    brand: "Grundfos",
    operation: "Automatic (built-in float)",
    motorW: "350W",
    maxFlowLhr: "~14,000 L/hr",
    maxHeadM: "~8m",
    role: "Primary automatic",
    keyRestriction: "Backup pump + alarm mandatory for Grade 3",
  },
  {
    product: "FEKA VS 550 T-NA",
    brand: "DAB",
    operation: "Automatic (built-in float)",
    motorW: "550W",
    maxFlowLhr: "~18,000 L/hr",
    maxHeadM: "~9m",
    role: "Primary or high-capacity",
    keyRestriction: "Confirm current model designation with DAB AU",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Primary sump pump in cavity drain basement waterproofing system — automatically discharges accumulated groundwater from sump pit",
    "Backup sump pump — installed alongside primary automatic pump — activates manually or via high-water alarm in event of primary pump failure",
    "Emergency basement dewatering — pump on standby for manual activation during flooding event",
    "Below-grade car park sump drainage — continuous duty sump pump for car park drainage sumps",
  ],
  selectionCriteria: [
    "Primary automatic pump: specify Grundfos Unilift AP 35.40.08 or DAB FEKA VS 550 T-NA — automatic float switch required for unattended primary operation",
    "Backup pump: specify Grundfos Unilift KP 150-A-1 or second AP — backup must be in sump pit ready to activate — do not rely on a pump stored offsite",
    "Pump sizing: calculate groundwater inflow rate from cavity drain system design — select pump with capacity at least 1.5× peak inflow — hydraulic engineer confirmation recommended",
    "Motor size selection: 150W suitable for light residential drainage; 350W–550W for higher water table or larger basement footprint",
    "High-water alarm: install independent high-water alarm at sump — strata OC must be notified if water level exceeds normal range — essential for Grade 3 cavity drain design",
  ],
  limitations: [
    "Pump failure in an unattended sump without backup will result in sump overflow and water entering habitable space — backup pump is mandatory",
    "Float switch failure — most common failure mode — float switch must be tested at each maintenance inspection",
    "Discharge routing — pump discharge must be routed to an approved point — stormwater drain (confirm council approval), charged stormwater pit, or to ground — cannot discharge to sewer without approval",
    "Power supply — sump pump is dependent on mains power — power outage during extreme weather event is the highest risk scenario — battery backup or generator provision for Grade 3 applications",
    "Ongoing maintenance obligation — strata OC responsible for sump pump maintenance under cavity drain waterproofing system — include in strata maintenance schedule",
    "Pump alone is not a cavity drain system — complete system requires Delta membrane, channel, and sump liner — pump is the active discharge component only",
  ],
  standardsNotes: [
    "AS/NZS 3000 Wiring rules — sump pump installation must comply with electrical wiring regulations — licensed electrician for installation and connection",
    "AS/NZS 4020 Materials in contact with drinking water — not applicable to sump drainage pumps handling groundwater (non-potable)",
    "BS 8102:2022 — specifies performance grade requirements for below-ground waterproofing — Grade 3 requires reliable active discharge system — backup pump and alarm mandatory",
    "NCC Volume One — habitable basement space performance requirements — active sump system must be reliably maintained for occupied basement",
    "Strata maintenance obligations — strata OC maintenance schedule must include periodic sump pump inspection and test — confirm with building manager",
  ],
  suitableDefects: [
    "Cavity drain system installation — active discharge component for all Delta membrane cavity drain systems",
    "Existing sump pump replacement — upgrade failed or undersized pump in existing cavity drain or car park sump systems",
    "New basement conversion — sump and pump installation as part of complete below-grade habitable space waterproofing system",
  ],
  typicalSubstrates: [
    "Sump pit — precast concrete sump liner (Bunded or Delta Sump Pro) — submersible pump sits in sump base",
    "Polypropylene or HDPE sump liner — chemical-resistant sump liner compatible with drainage water chemistry",
    "Cast in-situ concrete sump pit — confirm liner is smooth and adequate depth for float switch operation",
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

export function SumpPumpIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are sump and pump systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Sump and pump systems are the active discharge component of a cavity drain basement waterproofing system. The cavity drain membrane (Delta MS and floor mat) intercepts water penetrating through the basement walls and slab and channels it to a sump pit — a pre-formed pit in the basement floor at the lowest point of the drainage system. The submersible sump pump sits in the sump pit, activates automatically when the water level rises (via a float switch), discharges the accumulated water to a stormwater drain, and stops when the water level drops. Without a functioning sump pump, the cavity drain system fills and the water eventually reaches the habitable space.
        </p>
        {expanded && (
          <>
            <p>
              For Grade 3 habitable space basement applications in Australian Class 2 strata buildings, a single sump pump is not adequate — a backup pump is mandatory. Float switch failure, motor failure, or power outage are all realistic failure scenarios for a primary pump operating continuously over years without inspection. Best practice is a primary automatic pump (Grundfos Unilift AP or equivalent) for routine operation, a second backup pump (Grundfos Unilift KP or second AP) activated by a higher float switch setting, and a high-water alarm that triggers if the water level rises above both pump cut-off levels — indicating both pumps have failed or the inflow rate exceeds the system capacity.
            </p>
            <p>
              The pump discharge route must be confirmed before installation — groundwater drainage pumped from a basement sump cannot be discharged to the sewerage system without council approval in most Australian jurisdictions. Stormwater drain discharge is typically acceptable subject to council requirements. The strata owners corporation is responsible for maintaining the sump pump system as part of the common property waterproofing system — this maintenance obligation must be included in the strata maintenance plan and budgeted for as a recurring cost.
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

export function SumpPumpProductSection() {
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
            <p className="mt-0.5 text-xs text-slate-500">Applications, pump sizing, primary vs backup, float switch, discharge routing, maintenance</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Pump Selection" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Applications" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Sump Pit Requirements" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 2 brands — Grundfos / DAB Pumps Australia</p>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Sump pump comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Grundfos and DAB — confirm current model specifications before ordering. Backup pump + high-water alarm mandatory for Grade 3.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Operation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Motor</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Max flow</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Max head</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Role</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Grundfos" ? "#0047BB" : "#e05c00" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.operation}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.motorW}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.maxFlowLhr}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.maxHeadM}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.role}</td>
                  <td className="px-4 py-3 text-slate-500">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-700">Mandatory — Backup Pump + Alarm</p>
          <p className="text-xs leading-6 text-red-900">A single sump pump in an occupied basement (Grade 3) is not acceptable practice. A functioning cavity drain system for habitable space requires: primary automatic pump + backup pump (independent float switch at higher water level) + high-water alarm. Backup pump must be in the sump pit ready to operate — not stored offsite. Float switch on both pumps must be tested at each maintenance inspection. Confirm Grade 3 system design with a qualified waterproofing engineer before installation.</p>
        </div>
      </div>
    </>
  );
}
