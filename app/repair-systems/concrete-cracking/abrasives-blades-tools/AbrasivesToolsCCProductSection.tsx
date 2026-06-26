"use client";

import { useState, useRef } from "react";
import { Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";

type FilterTag =
  | "Saw-Blade"
  | "Drilling"
  | "Cleaning"
  | "Drying"
  | "PT-Slab-Risk"
  | "Low-Risk";

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
    fullLabel: "Husqvarna / Diamond Products",
    brandUrl: "https://www.husqvarna.com/au",
    accentColor: "#0369a1",
    name: "Crack Chaser Diamond Blade — Crack Routing to Consistent Profile",
    descriptionLine: "4–6 mm kerf segmented diamond blade for angle grinder — routes random crack traces to a consistent width and square-edge profile for backer rod and sealant installation",
    productType: "Narrow-kerf diamond crack chaser blade — angle grinder",
    filterTags: ["Saw-Blade", "PT-Slab-Risk"],
    techChips: [
      { label: "Kerf: 4–6 mm", cls: "bg-sky-100 text-sky-800" },
      { label: "Diamond segment", cls: "bg-blue-100 text-blue-800" },
      { label: "Angle grinder fit", cls: "bg-indigo-100 text-indigo-800" },
      { label: "GPR first — PT risk", cls: "bg-red-100 text-red-800" },
    ],
    systemDescription:
      "A crack chaser blade is used in the routing step before sealant installation — widening an irregular crack trace to a controlled 4–6 mm kerf with square parallel sides that seat a backer rod correctly. Mounted on a 100 mm or 125 mm angle grinder. The narrow kerf is critical: standard wide concrete blades remove too much material and cannot track a narrow crack trace. Crack chasing on post-tensioned slabs requires a prior GPR scan to locate PT tendons — the blade can cut through tendons at cover depth if their position is not confirmed.",
    technicalProperties: [
      "Kerf: 4–6 mm — narrow diamond segment creates consistent parallel-sided joint",
      "Diameter: 100 or 125 mm — standard angle grinder arbor (M14)",
      "Profile: Produces square-edged slot for backer rod seating and uniform sealant adhesion",
      "Cutting depth: Typically 10–20 mm — sufficient for backer rod depth control",
      "Rated for dry or wet cutting — wet cutting reduces silica dust if water supply is available",
    ],
    limitations: [
      "GPR or covermeter scan MANDATORY on PT slabs before any crack chasing — tendon cut is a structural emergency",
      "Do NOT use a wide concrete saw blade — kerf must be 4–6 mm; wide kerf removes structural material and weakens the crack edges",
      "Generates respirable crystalline silica dust — P2 dust mask, LEV or wet cutting, WHS regs mandatory",
      "Do not force the blade — let the diamond cut at controlled pace; forcing causes segment loss",
      "Do not chase deeper than the required sealant + backer rod depth — confirm target depth before cutting",
    ],
    procurementSources: [
      { name: "Husqvarna AU (crack chasers)", url: "https://www.husqvarna.com/au" },
      { name: "Diamond Products AU", url: "https://www.diamondproducts.com.au" },
      { name: "Kennards Hire AU (angle grinder + blade)", url: "https://www.kennards.com.au" },
      { name: "Total Tools AU", url: "https://www.totaltools.com.au" },
    ],
  },
  {
    fullLabel: "Bosch Professional / Makita",
    brandUrl: "https://www.bosch-professional.com/au",
    accentColor: "#be123c",
    name: "SDS-Plus Rotary Hammer — Injection Port Hole Drilling",
    descriptionLine: "2–3 kg SDS-Plus rotary hammer — 12–16 mm hole drilling at 45° for mechanical injection port installation — SDS-Plus only, not SDS-MAX",
    productType: "SDS-Plus rotary hammer drill — port drilling",
    filterTags: ["Drilling", "PT-Slab-Risk"],
    techChips: [
      { label: "SDS-Plus chuck", cls: "bg-red-100 text-red-800" },
      { label: "Port holes: 12–16 mm", cls: "bg-rose-100 text-rose-800" },
      { label: "45° drill angle", cls: "bg-pink-100 text-pink-800" },
      { label: "GPR first — PT risk", cls: "bg-orange-100 text-orange-800" },
    ],
    systemDescription:
      "Used to drill angled port holes for mechanical injection port installation. Hole diameter 12–16 mm (match to port type TDS). Drill at 45° to the crack plane to intercept the crack trace within the body of the element — holes drilled perpendicular to the surface only reach the crack at the surface, not at depth. Blow-brush-blow the hole clean before inserting the mechanical port. SDS-Plus is specified (not SDS-MAX) — the smaller hammer energy gives better positional control at these diameters and does not cause spalling around the hole. GPR scan is mandatory before drilling into PT slabs.",
    technicalProperties: [
      "SDS-Plus chuck — 2–3 kg class — suitable for 12–16 mm holes in concrete",
      "Drill angle: 45° to crack plane, alternating sides along crack trace",
      "Port spacing: 100–300 mm depending on crack width and resin viscosity",
      "Hole cleaning: Blow-brush-blow before port insertion to clear drill dust",
      "400–900 RPM for 12–16 mm holes in concrete",
    ],
    limitations: [
      "GPR or covermeter scan MANDATORY on PT slabs before drilling — 45° drill path intersects tendons at cover depth",
      "Do NOT use SDS-MAX drills for port holes — too aggressive, causes concrete spalling around hole",
      "Drill hole must intersect crack plane at depth — confirm alignment with felt-tip mark on crack trace before drilling",
      "Drill dust must be blown out completely before inserting port — dust contamination blocks resin flow",
      "Wear P2 dust mask — silica dust WHS obligation for concrete drilling",
    ],
    procurementSources: [
      { name: "Bosch Professional AU", url: "https://www.bosch-professional.com/au" },
      { name: "Makita AU (HR series)", url: "https://www.makita.com.au" },
      { name: "Kennards Hire AU", url: "https://www.kennards.com.au" },
      { name: "Total Tools AU", url: "https://www.totaltools.com.au" },
    ],
  },
  {
    fullLabel: "PFERD / Norton Abrasives",
    brandUrl: "https://www.pferd.com.au",
    accentColor: "#15803d",
    name: "Wire Cup Brush / Flap Disc — Crack Edge Cleaning",
    descriptionLine: "Angle grinder wire cup brush or 40–80 grit flap disc for cleaning crack edges and joint faces — removes laitance, carbonation, and old sealant residue before primer and sealant application",
    productType: "Abrasive cleaning attachment — angle grinder",
    filterTags: ["Cleaning", "Low-Risk"],
    techChips: [
      { label: "Wire cup / flap disc", cls: "bg-green-100 text-green-800" },
      { label: "Laitance removal", cls: "bg-emerald-100 text-emerald-800" },
      { label: "Sealant face prep", cls: "bg-teal-100 text-teal-800" },
      { label: "Low PT risk", cls: "bg-lime-100 text-lime-800" },
    ],
    systemDescription:
      "Wire cup brushes remove loose concrete, old sealant residue, paint, laitance, and carbonation from crack edges and joint faces — creating a sound, clean substrate for sealant primer and adhesion. Flap discs (40–80 grit) are used where joint faces have a paint or epoxy coating that must be abraded before sealant bond. After brushing, blow the joint with compressed air to clear all loose material and dust before priming. Lower PT risk than blade or drill operations — surface-only tool — but GPR still recommended on PT slabs for any motorised tool work near the concrete surface.",
    technicalProperties: [
      "Wire cup brush: 65–100 mm diameter, M14 arbor — knotted wire for aggressive cleaning",
      "Flap disc: 100–125 mm, 40–80 grit for laitance and coating removal from joint faces",
      "Application: Crack edges, joint side faces, port hole surrounds",
      "Post-cleaning: Blow with compressed air; vacuum dust before applying primer",
      "RPM: Match brush/disc RPM rating to angle grinder speed — confirm before use",
    ],
    limitations: [
      "Wire cup brushes do not remove deep contamination (oil, curing compound) — solvent wipe required first",
      "Do not use grinding discs on crack edges — excessive material removal widens joint beyond design width",
      "Wire cup for joints narrower than 8 mm — use hand wire brush for very fine cracks to avoid removing material from the adjacent slab surface",
      "Full PPE required: face shield, P2 dust mask, gloves, ear protection",
      "Silica dust: wet suppression or LEV capture required under WHS regs for enclosed-space work",
    ],
    procurementSources: [
      { name: "PFERD AU (wire cups)", url: "https://www.pferd.com.au" },
      { name: "Norton Abrasives AU", url: "https://www.nortonabrasives.com.au" },
      { name: "Total Tools AU", url: "https://www.totaltools.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Bosch Professional / Makita",
    brandUrl: "https://www.bosch-professional.com/au",
    accentColor: "#78716c",
    name: "Hot Air Gun — Crack Drying Before Epoxy Injection",
    descriptionLine: "1600–2000 W industrial heat gun for drying residual moisture from crack faces before epoxy rigid injection — mandatory step; epoxy will not bond to moisture-present crack faces",
    productType: "Electric hot air gun — pre-injection crack drying",
    filterTags: ["Drying", "Low-Risk"],
    techChips: [
      { label: "Pre-epoxy drying", cls: "bg-stone-100 text-stone-800" },
      { label: "1600–2000 W", cls: "bg-amber-100 text-amber-800" },
      { label: "Moisture meter check", cls: "bg-yellow-100 text-yellow-800" },
      { label: "Low PT risk", cls: "bg-slate-100 text-slate-800" },
    ],
    systemDescription:
      "Epoxy rigid injection resins require completely dry crack faces — even residual moisture prevents full epoxy wetting and significantly reduces bond strength. A hot air gun directed along the crack trace dries surface and near-surface moisture. Pass at 200–250°C along the crack, 1–2 passes, then verify dryness with a moisture meter before injecting. Allow the crack to cool — applying epoxy to a hot substrate shortens pot life and may cause surface bubbling. If the crack is actively wet, hot air drying is not the solution — switch to hydrophilic PU resin for wet cracks rather than attempting to dry an actively leaking crack.",
    technicalProperties: [
      "Power: 1600–2000 W industrial grade — 2-speed minimum",
      "Temperature range: 50–650 °C adjustable — use 200–250 °C for concrete crack drying",
      "Nozzle: Flat nozzle for crack traces; concentrator nozzle for isolated areas",
      "Drying protocol: 1–2 passes along crack at ~200 mm/min; check with moisture meter after",
      "Wait time: Minimum 30 min cool-down before injecting (or as per resin TDS)",
    ],
    limitations: [
      "Do NOT overheat crack — temperatures above 300 °C cause micro-cracking of the concrete surface and significantly shorten epoxy pot life",
      "Moisture meter check is mandatory after drying — do not rely on visual assessment alone; concrete retains absorbed moisture below the surface even when visually dry",
      "Hot air gun does NOT make a wet crack suitable for epoxy resin — if crack is actively wet or seeping, use PU hydrophilic resin instead",
      "Do not use near flammable materials or in enclosed spaces without ventilation",
      "Allow crack to cool to ambient temperature before injection — hot substrate accelerates cure and may cause foaming",
    ],
    procurementSources: [
      { name: "Bosch Professional AU", url: "https://www.bosch-professional.com/au" },
      { name: "Makita AU", url: "https://www.makita.com.au" },
      { name: "Kennards Hire AU", url: "https://www.kennards.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Saw-Blade", label: "Saw Blade" },
  { id: "Drilling", label: "Drilling" },
  { id: "Cleaning", label: "Cleaning" },
  { id: "Drying", label: "Drying" },
  { id: "PT-Slab-Risk", label: "PT Slab Risk" },
  { id: "Low-Risk", label: "Low PT Risk" },
];

const SYSTEM_COMPARISON = [
  { tool: "Crack Chaser Blade", purpose: "Route random crack to 4–6 mm kerf for backer rod + sealant", keyNote: "GPR mandatory before PT slab chasing; 4–6 mm kerf only", ptRisk: "HIGH" },
  { tool: "SDS-Plus Rotary Hammer", purpose: "Drill 12–16 mm injection port holes at 45° into crack plane", keyNote: "SDS-Plus only; alternating sides; blow-brush-blow after drilling", ptRisk: "HIGH" },
  { tool: "Wire Cup / Flap Disc", purpose: "Clean crack edges, remove laitance and old sealant residue", keyNote: "Blow clear after cleaning; surface-only — does not penetrate slab", ptRisk: "LOW" },
  { tool: "Hot Air Gun", purpose: "Dry crack faces before epoxy rigid injection resin", keyNote: "Moisture meter check mandatory; allow cool-down before injecting", ptRisk: "LOW" },
];

const TECH_INFO = {
  typicalApplications: [
    "Crack routing to consistent 4–6 mm width before backer rod and sealant installation (crack chaser blade)",
    "Injection port hole drilling for PU or epoxy crack injection (SDS-Plus rotary hammer)",
    "Surface cleaning and laitance removal from crack faces before sealant primer (wire cup / flap disc)",
    "Crack face drying before epoxy rigid injection resin — mandatory prep step (hot air gun)",
    "Joint face preparation for re-sealing expansion and construction joints",
    "Port hole area cleaning after drilling — blow-brush-blow sequence for mechanical ports",
  ],
  selectionCriteria: [
    "Crack routing to controlled width for sealant: crack chaser blade on angle grinder (4–6 mm kerf)",
    "Injection port drilling for mechanical ports: SDS-Plus rotary hammer + 12–16 mm SDS-Plus bit",
    "Surface cleaning and laitance removal: wire cup brush or flap disc on angle grinder",
    "Pre-epoxy-injection drying of crack faces: hot air gun (then moisture meter verification)",
    "PT slab: GPR scan BEFORE crack chaser blade and before drill operations",
    "All cutting/drilling in concrete: P2 dust mask and silica dust controls mandatory",
  ],
  limitations: [
    "GPR scan is non-negotiable on PT slabs before crack chasing or port drilling — severed tendon is a structural emergency",
    "Crack chaser kerf MUST be 4–6 mm — wide blades remove too much material from the crack edges",
    "SDS-Plus only for port holes — SDS-MAX too aggressive and causes spalling",
    "Hot air gun does NOT make a wet crack suitable for epoxy — use PU hydrophilic resin for actively wet cracks",
    "All grinding, cutting, and drilling in concrete generates respirable silica dust — LEV or wet suppression required",
  ],
  standardsNotes: [
    "WHS Regulation 2017 (Cth) — respirable crystalline silica dust controls for concrete grinding and cutting",
    "AS 3600 — Concrete structures (structural significance of crack classification before treatment)",
    "AS 1171 — Electromagnetic methods for concrete cover measurement (covermeter protocol)",
    "Sika / Fosroc / Mapei injection resin TDS — specifies pre-injection dryness and cleaning requirements",
    "AS/NZS 2161 — Occupational protective gloves (abrasive grinding operations)",
  ],
  suitableDefects: [
    "Random and map cracking in slabs and walls (routing + sealing)",
    "Structural cracks requiring injection (port drilling + injection resin)",
    "Expansion and control joints needing re-sealing (routing + backer rod + sealant)",
    "Construction joints with failed sealant (cleaning + re-sealing prep)",
    "Crack faces contaminated with curing compound, laitance, or old sealant residue",
    "Dry cracks suitable for epoxy injection (crack drying with hot air gun)",
  ],
  typicalSubstrates: [
    "In-situ concrete slabs (suspended and ground-bearing)",
    "Post-tensioned slabs (GPR scan required before any tool use)",
    "Concrete walls and columns",
    "Precast concrete panels and beams",
    "Concrete toppings and industrial floor overlays",
    "Masonry walls (wire cup for mortar joint face cleaning)",
  ],
};

export function AbrasivesToolsCCIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Concrete crack preparation — four tool categories</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Crack and joint repair preparation requires four distinct tool categories: crack chaser blades for routing, SDS-Plus rotary hammers for port drilling, wire cup brushes for surface cleaning, and hot air guns for pre-injection drying. Using the wrong tool in each step — or skipping steps — is the most common cause of premature sealant debonding and injection resin failure.
        </p>
        {expanded && (
          <>
            <p>
              <strong>Crack routing (crack chaser blade):</strong> A 4–6 mm kerf diamond crack chaser blade widens a random crack trace to a consistent, square-profiled slot for backer rod seating and sealant application. Never substitute a standard wide concrete blade — the wider kerf removes too much material. On post-tensioned slabs, GPR scan is mandatory before routing to avoid cutting PT tendons at cover depth.
            </p>
            <p>
              <strong>Port hole drilling (SDS-Plus rotary hammer):</strong> Mechanical injection ports require 12–16 mm holes drilled at 45° to the crack plane to intercept the crack within the body of the element. SDS-Plus drills (not SDS-MAX) provide the correct hammer energy for these diameters without causing spalling. GPR scan is again mandatory on PT slabs.
            </p>
            <p>
              <strong>Surface cleaning (wire cup / flap disc):</strong> Crack faces and joint edges must be free of laitance, carbonation, old sealant, and paint before primer and sealant application. Wire cup brushes and abrasive flap discs on an angle grinder achieve this. After cleaning, blow all loose material clear with compressed air.
            </p>
            <p>
              <strong>Pre-injection drying (hot air gun):</strong> Epoxy rigid injection resins cannot bond to moisture-present crack faces. Two passes with a hot air gun at 200–250 °C dries the crack, followed by a moisture meter check and cool-down period before injecting. If the crack is actively wet, hot air drying is not effective — hydrophilic PU resin is the correct product for wet crack conditions.
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

const DESIGN_CRITERIA = "Machine/drive compatibility (SDS-Plus vs SDS-Max shank, angle grinder 115/125mm, planetary grinder, scarifier drum); substrate suitability (tile, adhesive, screed, concrete, masonry); target concrete surface profile achieved (CSP 1-3 light grind to CSP 5-8 scabble per ICRI prep level required by overlay/membrane datasheet); diamond bond hardness matched to substrate (soft bond for hard/cured concrete, hard bond for green/abrasive); segment vs continuous rim and kerf width for crack-chasing vs cutting; wet vs dry cutting capability and cooling; cut depth and consumable life/grit; dust/slurry extraction and WHS Respirable Crystalline Silica control (on-tool extraction H-class or wet suppression per Safe Work Australia RCS WES 0.05 mg/m3); power demand/single vs 3-phase and hire vs owned; vibration (HAV) and noise exposure";

export function AbrasivesToolsCCProductSection() {
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

      <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete cracking" />
    </>
  );
}
