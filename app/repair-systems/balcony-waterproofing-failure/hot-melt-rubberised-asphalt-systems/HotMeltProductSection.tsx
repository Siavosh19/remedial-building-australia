"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, Thermometer,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText, Wrench, Globe, ShieldAlert,
} from "lucide-react";

type FilterTag =
  | "Hot-fluid-applied"
  | "Hot-melt-bitumen"
  | "Mastic-asphalt"
  | "Rubberised-asphalt"
  | "Fully-bonded"
  | "Monolithic"
  | "Podium-deck"
  | "Plaza-deck"
  | "Roof-deck"
  | "Inverted-roof"
  | "Below-grade"
  | "Green-roof"
  | "Planter"
  | "Balcony"
  | "Fabric-reinforced"
  | "Specialist-equipment"
  | "Specialist-contractor"
  | "BBA-certified"
  | "Confirm-AU-availability"
  | "Traditional";

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
    fullLabel: "Henry Company (US) — confirm Australian distributor",
    brandUrl: "https://www.henry.com",
    tdsUrl: "https://www.henry.com/commercial/products/waterproofing/hot-rubberized-asphalt/790-11-hot-rubberized-asphalt-membrane/",
    accentColor: "#b45309",
    name: "Henry 790-11 Hot Rubberised Asphalt",
    descriptionLine: "Hot-fluid-applied rubberised asphalt waterproofing membrane — two-pour fabric-reinforced system — fully bonded monolithic membrane for podium slabs, roof decks, plaza decks, car parks, and below-grade applications — confirm Australian distributor availability before specifying",
    productType: "Hot-fluid-applied rubberised asphalt — confirm Australian distributor",
    filterTags: ["Hot-fluid-applied", "Rubberised-asphalt", "Fully-bonded", "Monolithic", "Podium-deck", "Plaza-deck", "Roof-deck", "Inverted-roof", "Below-grade", "Fabric-reinforced", "Specialist-equipment", "Confirm-AU-availability"],
    techChips: [
      { label: "Hot-fluid-applied", cls: "bg-amber-100 text-amber-800" },
      { label: "Rubberised asphalt", cls: "bg-slate-100 text-slate-700" },
      { label: "Two-pour fabric-reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Fully bonded — no seams", cls: "bg-green-50 text-green-700" },
      { label: "Confirm AU availability", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Henry 790-11 is one of the most widely specified hot-fluid-applied rubberised asphalt waterproofing membranes internationally, with a long track record on podium decks, plaza decks, parking structures, highway bridge decks, roof decks, tunnels, and planters. The product is a blend of refined asphalts, synthetic rubber, and mineral stabilisers, applied as a heated liquid and cured in-situ to form a continuous, seamless, fully bonded waterproofing layer. It is used in protected membrane roof assemblies — the membrane is applied to the structural slab, covered by protection course, insulation, drainage layer, and ballast or growing medium.\n\nThe system is applied in two pours with polyester reinforcing fabric embedded between pours. Total applied thickness is typically 5–6mm for the two-pour reinforced system. Henry 790-11 bridges non-working cracks in the substrate — the hot material flows into surface irregularities and cracks up to approximately 1.5mm width during application, providing a more forgiving application on imperfect concrete substrates than sheet membrane systems.\n\nHenry 790-11 is a US product. Confirm current Australian distributor availability, local stock, and specialist applicator availability before specifying. The Henry 790-11 EV (Environmentally Responsible) variant contains up to 25% post-consumer recycled content from reclaimed rubber — confirm whether the EV variant is available in Australia.",
    technicalProperties: [
      "Hot-fluid-applied rubberised asphalt — blend of refined asphalts, synthetic rubber, and mineral stabilisers",
      "Two-pour system with polyester fabric reinforcement embedded between pours",
      "Fully bonded to concrete substrate — no seams in field — monolithic membrane",
      "Applied thickness: typically 5–6mm for two-pour reinforced system",
      "Bridges non-working cracks up to approximately 1.5mm in substrate",
      "Self-healing properties — minor punctures can re-seal under heat",
      "Application temperature: 160°C–190°C — thermostatically controlled melting kettle required",
      "Suitable for: podium decks, plaza decks, roof decks, car parks, tunnels, planters, below-grade",
      "Inverted roof (protected membrane) assembly — membrane applied first, insulation and ballast above",
    ],
    limitations: [
      "Confirm Australian distributor availability before specifying — Henry is a US product with limited confirmed Australian distribution",
      "Specialist thermostatically controlled melting kettle required — not standard roofing equipment",
      "Specialist applicator required — confirm availability in the project location before specifying",
      "Structural engineer must confirm roof/podium loading capacity for melting plant before placement",
      "Not for exposed applications — must be covered by protection course, insulation, and ballast or growing medium",
      "Confirm current product specification, Australian availability, and pricing with Henry Company or Australian distributor before specifying",
    ],
    procurementSources: [
      { name: "Henry Company — confirm Australian distributor", url: "https://www.henry.com" },
      { name: "Confirm with local waterproofing consultant or roofing contractor whether Henry 790-11 is accessible in Australia" },
    ],
  },
  {
    fullLabel: "Soprema (Canada / International) — confirm Australian distributor",
    brandUrl: "https://www.soprema.com",
    accentColor: "#0369a1",
    name: "Soprema Colphene H",
    descriptionLine: "Hot-applied rubberised asphalt waterproofing membrane — mineral filler reinforced — two-pour system with fabric — podium decks, plaza decks, inverted roofs, green roofs, planters, and below-grade applications — confirm Australian availability before specifying",
    productType: "Hot-applied rubberised asphalt — Soprema — confirm Australian distributor",
    filterTags: ["Hot-fluid-applied", "Rubberised-asphalt", "Fully-bonded", "Monolithic", "Podium-deck", "Plaza-deck", "Roof-deck", "Inverted-roof", "Green-roof", "Planter", "Fabric-reinforced", "Specialist-equipment", "Confirm-AU-availability"],
    techChips: [
      { label: "Hot-applied", cls: "bg-sky-100 text-sky-800" },
      { label: "Rubberised asphalt", cls: "bg-slate-100 text-slate-700" },
      { label: "Two-pour fabric-reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Green roof / planter compatible", cls: "bg-green-50 text-green-700" },
      { label: "Confirm AU availability", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Soprema Colphene H is a hot-applied rubberised asphalt waterproofing membrane composed of a select blend of refined asphalts, recycled rubber, and inert mineral extenders. It is used in horizontal and vertical waterproofing of podium slabs, plaza decks, planters, tunnels, underground vaults, bridges, foundation walls, garden roofs, and parking structures. Applied as a heated fluid and reinforced with polyester fabric between two pours, Colphene H cures to a continuous, seamless, fully bonded membrane.\n\nColphene H EV (Environmentally Responsible) contains up to 25% post-consumer recycled rubber content. Soprema also produces the Duoflex hot melt structural waterproofing system — an SBS polymer-modified rubberised bitumen formulation specifically developed for inverted flat roof and podium deck applications, BBA certified in the UK for lifetime-of-structure performance.\n\nSoprema is an international manufacturer with a broad product range. Confirm current Australian distributor, product availability, and specialist applicator access before specifying any Soprema hot melt product on an Australian project.",
    technicalProperties: [
      "Hot-applied rubberised asphalt — blend of refined asphalts, recycled rubber, and mineral extenders",
      "Two-pour system with polyester fabric reinforcement",
      "Fully bonded to concrete substrate — seamless monolithic membrane",
      "Colphene H EV contains up to 25% post-consumer recycled rubber content",
      "Suitable for: podium decks, plaza decks, inverted roofs, green roofs, planters, tunnels, below-grade",
      "Self-healing properties",
      "Application temperature: confirm with Soprema TDS — typically 160°C–190°C — thermostatically controlled kettle required",
    ],
    limitations: [
      "Confirm Australian distributor availability before specifying — Soprema hot melt products have limited confirmed Australian distribution",
      "Specialist thermostatically controlled melting kettle required",
      "Specialist applicator required — confirm availability before specifying",
      "Confirm whether Colphene H or Duoflex hot melt system is the appropriate Soprema product for the specific application — they are different formulations for different system configurations",
      "Confirm current product specification, Australian availability, and pricing with Soprema or Australian distributor before specifying",
    ],
    procurementSources: [
      { name: "Soprema — confirm Australian distributor", url: "https://www.soprema.com" },
      { name: "Confirm with local waterproofing consultant whether Soprema hot melt products are accessible in Australia" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "SikaShield Hot Melt 50/70 (UK product name — TODO: owner confirm current Australian product name with Sika Australia)",
    descriptionLine: "Hot melt bitumen waterproofing element for inverted roofs, ballasted roofs, podium decks, and terraces — UK product name SikaShield Hot Melt 50/70 confirmed on gbr.sika.com — application temp 165°C–185°C confirmed — BBA certified (UK) — confirm current Australian product name, availability, and accredited applicator with Sika Australia before specifying",
    productType: "Hot melt bitumen waterproofing — Sika — TODO: confirm Australian product name with Sika Australia",
    filterTags: ["Hot-melt-bitumen", "Fully-bonded", "Monolithic", "Inverted-roof", "Podium-deck", "Roof-deck", "Fabric-reinforced", "Specialist-equipment", "BBA-certified", "Confirm-AU-availability"],
    techChips: [
      { label: "Hot melt bitumen", cls: "bg-rose-100 text-rose-800" },
      { label: "Inverted / ballasted roof", cls: "bg-slate-100 text-slate-700" },
      { label: "Podium deck / terrace", cls: "bg-slate-100 text-slate-700" },
      { label: "BBA certified (confirm AU)", cls: "bg-green-50 text-green-700" },
      { label: "Sika-accredited applicator req'd", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "SikaShield Hot Melt 50/70 is Sika's hot melt bitumen waterproofing product for inverted roof, ballasted roof, podium deck, and terrace applications. Part of the SikaShield hot melt structural waterproofing system, it is heated in a mechanically agitated, thermostatically controlled melting cooker at 165°C to 185°C and applied to the prepared concrete substrate. As with other hot melt rubberised asphalt systems, it is applied in conjunction with reinforcing fabric to form a two-pour reinforced membrane, and is used in protected membrane (inverted) roof assemblies.\n\nSika has a confirmed Australian presence through aus.sika.com — however, hot melt bitumen products are a specialist segment of the Sika roofing range and may not be stocked or supported by Sika Australia's standard trade distribution network. Confirm with Sika Australia directly whether SikaShield Hot Melt is currently available, whether specialist applicators are accessible, and whether the product is supported with technical backup in Australia before specifying.\n\nThe SikaShield system includes a full range of complementary components — primers, detail membranes, upstand systems — all specified within the Sika system. Confirm the complete system specification with Sika Australia technical before specifying individual components.",
    technicalProperties: [
      "Hot melt bitumen — applied at 165°C–185°C — thermostatically controlled melting cooker required",
      "For inverted roofs, ballasted roofs, podium decks, and terraces",
      "Two-pour system with polyester fabric reinforcement — fully bonded to concrete substrate",
      "BBA certified — confirm Australian certification status with Sika Australia",
      "Full SikaShield system — primer, detail membrane, field membrane, and accessories",
      "Sika-accredited applicator required",
    ],
    limitations: [
      "Confirm Australian product availability with Sika Australia before specifying — SikaShield Hot Melt is a specialist product — confirm stocking, distributor access, and applicator availability directly",
      "Specialist thermostatically controlled melting cooker required — not standard trade equipment",
      "Sika-accredited specialist applicator required — confirm availability in the project location",
      "Confirm the complete SikaShield system specification with Sika Australia technical — do not specify individual components without the full system context",
      "Structural engineer must confirm loading capacity for plant on roof or podium deck before placement",
      "Confirm current product name, TDS, and pricing with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — confirm Australian availability directly with Sika technical", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Various specialist mastic asphalt contractors",
    brandUrl: "",
    tdsUrl: undefined,
    accentColor: "#334155",
    name: "Mastic Asphalt — Traditional Hot-Applied Bituminous System",
    descriptionLine: "Traditional hot-applied mastic asphalt waterproofing — specialist contractor-applied — fully bonded seamless bituminous system — established in Australian podium and roof deck waterproofing — heavier and thicker than rubberised asphalt — specialist mastic asphalt contractor required",
    productType: "Traditional hot-applied mastic asphalt — specialist contractor-applied",
    filterTags: ["Mastic-asphalt", "Traditional", "Fully-bonded", "Podium-deck", "Roof-deck", "Balcony", "Inverted-roof", "Specialist-contractor"],
    techChips: [
      { label: "Mastic asphalt", cls: "bg-slate-200 text-slate-800" },
      { label: "Traditional — hand-applied screeder", cls: "bg-slate-100 text-slate-700" },
      { label: "20mm+ total thickness", cls: "bg-amber-50 text-amber-700" },
      { label: "Established in Australia", cls: "bg-green-50 text-green-700" },
      { label: "Specialist contractor required", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Mastic asphalt is a traditional hot-applied bituminous waterproofing system that predates modern rubberised asphalt systems. It is a mixture of bitumen, limestone aggregate, and mineral filler heated to approximately 200°C–220°C and applied by specialist mastic asphalt screeders using wooden floats and hand tools. Applied in multiple layers to a total thickness typically of 20mm or more, mastic asphalt is heavier than modern rubberised asphalt systems but provides excellent durability and a long track record of performance on podium slabs, roof decks, and balconies.\n\nMastic asphalt has a longer established track record in Australian strata building waterproofing than the more modern rubberised asphalt systems — it was widely used on podium slabs and roof decks in Australian strata buildings constructed from the 1960s through to the 1990s before the widespread adoption of torch-on modified bitumen sheet systems. Many existing Class 2 strata buildings in Australia have existing mastic asphalt waterproofing on their podium slabs — identifying and specifying the correct remediation approach for failing mastic asphalt is an important skill for waterproofing consultants on Australian strata projects.\n\nMastic asphalt remediation may involve: over-coating existing mastic asphalt with a compatible liquid-applied PU or hybrid membrane where the existing asphalt is structurally sound, replacing failing mastic asphalt with a torch-on sheet or single-ply sheet system, or applying new mastic asphalt over the prepared substrate where a specialist mastic asphalt contractor is available and the design life justifies the cost.",
    technicalProperties: [
      "Traditional hot-applied bituminous system — bitumen, limestone aggregate, and mineral filler",
      "Applied at 200°C–220°C by specialist mastic asphalt screeders using wooden floats",
      "Total applied thickness typically 20mm+ — multiple layers",
      "Fully bonded to substrate — no seams — established durability record",
      "Established in Australian podium and roof deck waterproofing — specialist contractor required",
      "Heavier than rubberised asphalt and modern sheet membranes — confirm structural loading with engineer",
    ],
    limitations: [
      "Specialist mastic asphalt contractor required — mastic asphalt screeding is a separate trade from standard waterproofing — confirm contractor availability before specifying",
      "Heavier than modern systems — 20mm+ at approximately 20 kg/m² or more — confirm structural slab loading capacity with engineer before specifying",
      "Not a factory-manufactured membrane — quality depends on site mixing, temperature control, and application skill",
      "Traditional mastic asphalt is not the same product as modern rubberised asphalt — do not specify as equivalent",
      "Remediation of existing mastic asphalt: confirm compatibility of any over-coating membrane with the existing asphalt before applying — not all liquid-applied membranes bond reliably to mastic asphalt without specific primer or preparation",
      "Confirm contractor availability and current pricing — mastic asphalt contracting is a reducing trade in Australia",
    ],
    procurementSources: [
      { name: "Specialist mastic asphalt contractors — confirm availability with local waterproofing consultant" },
      { name: "Mastic Asphalt Council of Australia — confirm current contractor directory" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Hot-fluid-applied",     label: "Hot-fluid-applied" },
  { id: "Hot-melt-bitumen",      label: "Hot melt bitumen" },
  { id: "Mastic-asphalt",        label: "Mastic asphalt" },
  { id: "Rubberised-asphalt",    label: "Rubberised asphalt" },
  { id: "Fully-bonded",          label: "Fully bonded" },
  { id: "Monolithic",            label: "Monolithic — no seams" },
  { id: "Podium-deck",           label: "Podium deck" },
  { id: "Roof-deck",             label: "Roof deck" },
  { id: "Plaza-deck",            label: "Plaza deck" },
  { id: "Inverted-roof",         label: "Inverted / protected membrane" },
  { id: "Below-grade",           label: "Below grade" },
  { id: "Green-roof",            label: "Green roof" },
  { id: "Planter",               label: "Planter" },
  { id: "Balcony",               label: "Balcony" },
  { id: "Fabric-reinforced",     label: "Fabric reinforced" },
  { id: "Specialist-equipment",  label: "Specialist equipment required" },
  { id: "Specialist-contractor", label: "Specialist contractor required" },
  { id: "BBA-certified",         label: "BBA certified" },
  { id: "Confirm-AU-availability", label: "Confirm Australian availability" },
  { id: "Traditional",           label: "Traditional system" },
];

const TECH_SECTIONS: { icon: React.ReactNode; heading: string; body: string }[] = [
  {
    icon: <Layers size={15} />,
    heading: "HOW HOT MELT RUBBERISED ASPHALT DIFFERS FROM TORCH-ON SHEET",
    body: "Both torch-on modified bitumen sheet membranes and hot melt rubberised asphalt are bituminous waterproofing systems. The critical difference is in application method and membrane continuity. Torch-on sheet membranes are pre-manufactured sheets with defined seam laps — the seams are the most vulnerable part of the system and must be heat-bonded correctly to achieve a watertight joint. Hot melt rubberised asphalt is poured as a liquid — there are no seams or laps in the field of the membrane. The membrane self-bonds to the substrate across its full area, eliminating the seam failure risk of sheet systems. This makes hot melt rubberised asphalt particularly suited to large podium slabs and roof decks where seam management across a large area is complex and high-risk.",
  },
  {
    icon: <BookOpen size={15} />,
    heading: "INVERTED ROOF ASSEMBLY",
    body: "Hot melt rubberised asphalt is almost exclusively used in an inverted roof (protected membrane roof — PMR) assembly. In an inverted roof, the membrane is applied first and directly to the structural slab, then covered by insulation (XPS), drainage layer, filter fabric, and ballast or growing medium. The membrane is at the bottom of the build-up — it is never exposed. This is the opposite of a conventional roof assembly where the membrane is at the top. The advantage of the inverted assembly with hot melt is that the membrane is protected from UV, thermal cycling, and physical damage throughout its service life — significantly extending system durability. Hot melt rubberised asphalt can be applied to zero fall in an inverted assembly.",
  },
  {
    icon: <Thermometer size={15} />,
    heading: "APPLICATION TEMPERATURE AND EQUIPMENT",
    body: "Hot melt rubberised asphalt must be heated in a mechanically agitated, thermostatically controlled hot melt cooker (melting kettle) — not a standard roofing torch or open flame kettle. Application temperature is typically 165°C to 185°C. Temperature must be carefully controlled — overheating above the maximum temperature (typically 220°C) degrades the rubber polymer and reduces membrane performance. Underheating produces a viscous material that does not flow and bond correctly to the substrate. The cooker must be positioned on the roof or podium deck during application — confirm structural loading capacity with the structural engineer before bringing plant to site. Smaller specialised pump and hose systems allow the cooker to be positioned at ground level with heated material pumped to the application area — confirm availability of pump systems with the applicator.",
  },
  {
    icon: <Layers size={15} />,
    heading: "FABRIC REINFORCEMENT",
    body: "The system is applied in two pours with a polyester fleece reinforcing fabric embedded between them. The first pour saturates the substrate and fills surface voids. The fleece is laid into the hot first pour immediately after application. The second pour is applied over the embedded fleece to fully encapsulate it. The fabric reinforcement increases the resistance of the cured membrane to puncture, mechanical damage, and differential movement of the substrate. The total applied thickness of the two-pour system is typically 4mm to 6mm — confirm the required thickness with the product manufacturer for the specific application.",
  },
  {
    icon: <Wrench size={15} />,
    heading: "SPECIALIST APPLICATOR REQUIREMENT",
    body: "Hot melt rubberised asphalt installation requires specialist equipment (thermostatically controlled melting kettle), specialist training, and experience in temperature management, pour sequencing, fabric embedding, and detail work at upstands, penetrations, and drains. It is not a general roofing or waterproofing trade skill. Confirm that a specialist applicator is available and accessible for the project before specifying. In Australia, specialist hot melt applicators are significantly less common than torch-on or liquid-applied membrane applicators — availability must be confirmed early in the project programme.",
  },
  {
    icon: <Globe size={15} />,
    heading: "AUSTRALIAN MARKET AVAILABILITY — CONFIRM BEFORE SPECIFYING",
    body: "Hot melt rubberised asphalt is an established system in the UK and North American markets where large podium and plaza deck construction volumes justify the specialist supply chain. In Australia, the system is less common — the torch-on modified bitumen sheet membrane and PVC/FPO single-ply sheet systems dominate the podium and roof deck market. Confirm current Australian product availability, distributor access, local stock, and specialist applicator availability with each manufacturer before specifying any hot melt rubberised asphalt product on an Australian project.",
  },
  {
    icon: <ShieldAlert size={15} />,
    heading: "SELF-HEALING PROPERTIES",
    body: "A key performance characteristic of hot melt rubberised asphalt systems is self-healing. Minor punctures in the cured membrane — caused by foot traffic, aggregate, or fixing penetrations — can re-seal under heat from solar gain on the membrane surface. This is a genuine performance advantage over sheet and liquid-applied membrane systems which do not self-seal. However, self-healing is not a substitute for correct application, correct fabric reinforcement, and correct protection above the membrane — self-healing addresses minor incidental damage, not systemic application defects.",
  },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  appTemp: string;
  thickness: string;
  auAvailability: string;
  keyRestriction: string;
}[] = [
  {
    product: "Henry 790-11",
    brand: "Henry Company",
    material: "Refined asphalt / synthetic rubber / mineral stabilisers",
    appTemp: "160°C–190°C",
    thickness: "5–6mm two-pour reinforced",
    auAvailability: "Confirm with Henry — limited AU distribution confirmed",
    keyRestriction: "Specialist melting kettle and applicator required — confirm Australian availability before specifying",
  },
  {
    product: "Soprema Colphene H",
    brand: "Soprema",
    material: "Refined asphalt / recycled rubber / mineral extenders",
    appTemp: "160°C–190°C — confirm with TDS",
    thickness: "Confirm with Soprema TDS",
    auAvailability: "Confirm with Soprema — limited AU distribution confirmed",
    keyRestriction: "Specialist melting kettle and applicator required — confirm Duoflex vs Colphene H for specific application — confirm AU availability",
  },
  {
    product: "SikaShield Hot Melt 50/70",
    brand: "Sika Australia",
    material: "Hot melt bitumen",
    appTemp: "165°C–185°C — thermostatically controlled",
    thickness: "Confirm with Sika TDS",
    auAvailability: "Confirm directly with Sika Australia — specialist product",
    keyRestriction: "Sika-accredited specialist applicator required — confirm Australian availability with Sika Australia directly before specifying",
  },
  {
    product: "Mastic Asphalt",
    brand: "Various specialist contractors",
    material: "Bitumen / limestone aggregate / mineral filler",
    appTemp: "200°C–220°C — hand applied by specialist screeder",
    thickness: "20mm+ — multiple layers",
    auAvailability: "Established in Australia — specialist contractor required — contractor availability reducing",
    keyRestriction: "Heavy system — confirm structural loading with engineer — specialist mastic asphalt trade — not interchangeable with rubberised asphalt",
  },
];

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

export function HotMeltIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are hot melt rubberised asphalt systems — roofs and podiums?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Hot melt rubberised asphalt is a hot-fluid-applied waterproofing membrane system applied as a heated liquid directly to a prepared concrete deck or roof substrate. The material — a blend of refined bitumen or asphalt, synthetic rubber polymers, and mineral stabilisers — is heated in a specialised thermostatically controlled melting kettle to between 160°C and 190°C and poured or pumped onto the substrate, where it flows to conform to the deck surface before cooling and solidifying into a continuous, monolithic, fully bonded waterproofing layer. A reinforcing fabric (typically polyester fleece) is embedded into the hot material while it is still fluid, and a second pour is applied over the fabric to complete the system. The result is a seamless, joint-free membrane that fully bonds to the substrate — eliminating the risk of lateral water migration beneath the membrane that is possible with loose-laid or mechanically fixed sheet systems.
        </p>
        {expanded && (
          <>
            <p>
              Hot melt rubberised asphalt is primarily specified on large concrete podium slabs, roof decks, plaza decks, and car park structures where the application area, loading conditions, and design life requirements justify the plant and specialist labour involved. Key advantages over torch-on modified bitumen sheet and single-ply sheet membranes include: full substrate adhesion preventing lateral water tracking, self-healing properties where the material can re-seal minor punctures under heat, zero-fall capability on inverted roof assemblies, and compatibility with heavy ballast, paver, and growing medium systems above the membrane. The system is applied in an inverted roof configuration — the membrane is applied first, protection board and insulation are placed above the membrane, and ballast or growing medium is placed above the insulation.
            </p>
            <p>
              Hot melt rubberised asphalt is a niche product category in the Australian waterproofing market. The principal brands — Henry 790-11, Soprema Colphene H, and SikaShield Hot Melt — are well established in the UK, North American, and European markets but have limited documented distributor presence in Australia. Specifiers should confirm current Australian product availability, distributor access, and accredited applicator availability before specifying hot melt rubberised asphalt on any Australian project.
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
export function HotMeltProductSection() {
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
              Hot melt vs torch-on vs liquid-applied, inverted roof assembly, application temperature and equipment, fabric reinforcement, specialist applicator requirement, Australian market availability
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
            <div className="grid gap-5 md:grid-cols-2">
              {TECH_SECTIONS.map((section) => (
                <div key={section.heading} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
                      {section.icon}
                    </div>
                    <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-sky-950">{section.heading}</h3>
                  </div>
                  <p className="text-xs leading-6 text-slate-600">{section.body}</p>
                </div>
              ))}
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
            <p className="mt-1 text-sm text-slate-500">
              4 products — 3 brands — hot-fluid-applied rubberised asphalt membrane systems for podium slab, roof deck, and plaza deck waterproofing — specialist applicator and thermostatically controlled melting equipment required — confirm Australian availability before specifying
            </p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
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
                      {product.brandUrl && (
                        <a
                          href={product.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                    {product.techChips.filter((c) => c.label.toLowerCase().includes("warranty")).map((chip) => (
                      <span key={chip.label} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips.filter((c) => !c.label.toLowerCase().includes("warranty"))}
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
            <h2 className="text-2xl font-extrabold text-sky-950">Hot melt rubberised asphalt system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of hot melt rubberised asphalt and mastic asphalt systems. Confirm all product selections against the current manufacturer TDS and confirm Australian availability before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application temp</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Applied thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Australian availability</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.appTemp}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px]">{row.auAvailability}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
