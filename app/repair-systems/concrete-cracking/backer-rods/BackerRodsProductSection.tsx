"use client";

import { useState, useRef } from "react";
import { Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";

type FilterTag =
  | "Closed-Cell"
  | "Open-Cell"
  | "Bond-Breaker"
  | "PU-Compatible"
  | "Silicone-Compatible"
  | "Narrow-Joint";

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
    fullLabel: "Soudal / Tremco / Generic PE",
    brandUrl: "https://www.soudal.com.au",
    accentColor: "#0369a1",
    name: "Closed-Cell PE Backer Rod — Standard Joint Sealing",
    descriptionLine: "Closed-cell PE foam rod sized 25–50% wider than joint — compression fit — non-absorbent — standard for PU and MS-polymer sealant joints",
    productType: "Closed-cell polyethylene foam rod — joint depth control",
    filterTags: ["Closed-Cell", "PU-Compatible", "Silicone-Compatible"],
    techChips: [
      { label: "Closed-cell foam", cls: "bg-sky-100 text-sky-800" },
      { label: "Non-absorbent", cls: "bg-green-100 text-green-800" },
      { label: "PU + MS-polymer", cls: "bg-blue-100 text-blue-800" },
      { label: "25–50% oversize", cls: "bg-indigo-100 text-indigo-800" },
    ],
    systemDescription:
      "Standard backer rod for concrete joint and crack sealing applications. Insert rod at 25–50% larger than joint width — the compression fit holds it in place without adhesive. Positions the sealant at the correct depth:width ratio of 1:2 and creates a bond-break at the joint base so the sealant bonds to the two side faces only (two-point contact). Closed-cell structure repels moisture and does not absorb PU sealant. Available in coils from 6 mm to 50 mm diameter from Soudal, Tremco, and general building trade suppliers.",
    technicalProperties: [
      "Closed-cell PE foam — non-absorbent — will not wick PU or MS-polymer sealant",
      "Diameters 6 mm to 50 mm — select rod 25–50% wider than joint opening",
      "Compression fit — no adhesive required — wedges tightly against both joint faces",
      "Target sealant depth:width ratio 1:2 (sealant depth = half joint width)",
      "TODO: owner confirm — service temperature upper limit; standard closed-cell PE backer rod is typically rated to approximately +71°C (not +80°C) — confirm from specific supplier TDS",
      "Compatible with PU, MS-polymer, and polysulfide sealants — NOT for acetoxy silicone (use open-cell rod with silicone to prevent outgassing voids)",
    ],
    limitations: [
      "Do NOT use in hot-applied asphalt or bitumen sealant joints — closed-cell PE foam melts",
      "Never glue rod into joint — adhesive at the joint base causes three-point bonding and premature sealant tearing",
      "Not suitable for joints narrower than ~6 mm — use bond-breaker tape instead",
      "Prolonged UV exposure degrades bare foam — sealant must fully cover and encapsulate the rod",
    ],
    procurementSources: [
      { name: "Soudal AU (foam backer rods)", url: "https://www.soudal.com.au" },
      { name: "Tremco Sealants AU", url: "https://www.tremcosealants.com.au" },
      { name: "RLA Polymers (PE rod)", url: "https://www.rlapolymers.com.au" },
      { name: "Selleys AU (foam backer)", url: "https://www.selleys.com.au" },
    ],
  },
  {
    fullLabel: "Tremco / Soudal / Generic PU foam",
    brandUrl: "https://www.tremcosealants.com.au",
    accentColor: "#15803d",
    name: "Open-Cell PU Backer Rod — Silicone Sealant Applications",
    descriptionLine: "Open-cell PU foam rod — allows cure by-products to escape — prevents outgassing voids in silicone sealants — narrow and tight joint applications",
    productType: "Open-cell polyurethane foam rod — silicone sealant joint sealing",
    filterTags: ["Open-Cell", "Silicone-Compatible", "Narrow-Joint"],
    techChips: [
      { label: "Open-cell foam", cls: "bg-green-100 text-green-800" },
      { label: "Silicone compatible", cls: "bg-emerald-100 text-emerald-800" },
      { label: "Prevents outgassing", cls: "bg-lime-100 text-lime-800" },
      { label: "Highly compressible", cls: "bg-teal-100 text-teal-800" },
    ],
    systemDescription:
      "Open-cell rods are the correct choice when silicone or acetoxy silicone sealants are specified. Silicone releases acetic acid (or other by-products) during cure — closed-cell foam traps these gases between the sealant and the joint base, creating bubbles and internal voids in the cured sealant that concentrate stress and cause premature failure. Open-cell foam allows the by-products to escape through the back of the joint. Do NOT use open-cell rod with PU or MS-polymer sealants — the open-cell structure absorbs the sealant and starves the joint faces of adhesive.",
    technicalProperties: [
      "Open-cell PU or polyether foam — allows air and cure by-products to pass through",
      "Required for silicone (acetoxy and neutral-cure) sealants — prevents outgassing bubbles",
      "Same sizing rule as closed-cell: diameter 25–50% larger than joint width",
      "Highly compressible — suits narrow and tight-tolerance joints where closed-cell is too stiff",
      "Diameters typically 6–25 mm range (narrower range than closed-cell)",
    ],
    limitations: [
      "Do NOT use open-cell rod with PU or MS-polymer sealants — open-cell absorbs sealant and starves the joint side-face adhesive bond",
      "Open-cell structure absorbs water — not suitable for permanently submerged or wet joint applications",
      "Open-cell and closed-cell rods look similar — always confirm cell type with the supplier before purchasing",
      "Confirm silicone sealant manufacturer compatibility — neutral-cure vs acetoxy silicone may have different rod requirements",
    ],
    procurementSources: [
      { name: "Tremco Sealants AU", url: "https://www.tremcosealants.com.au" },
      { name: "Soudal AU", url: "https://www.soudal.com.au" },
      { name: "Parchem Construction", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Tremco / Sika / Generic PE tape",
    brandUrl: "https://www.tremcosealants.com.au",
    accentColor: "#78716c",
    name: "Bond-Breaker Tape — Narrow Joint Base Seal Prevention",
    descriptionLine: "Self-adhesive PE or PTFE film tape applied to joint base — prevents three-sided sealant adhesion in joints too narrow or shallow for backer rod",
    productType: "PE/PTFE bond-breaker tape — joint base treatment",
    filterTags: ["Bond-Breaker", "Narrow-Joint", "PU-Compatible", "Silicone-Compatible"],
    techChips: [
      { label: "Bond-breaker tape", cls: "bg-stone-100 text-stone-800" },
      { label: "Narrow joints <6 mm", cls: "bg-orange-100 text-orange-800" },
      { label: "Two-point bond", cls: "bg-red-100 text-red-800" },
      { label: "Self-adhesive", cls: "bg-slate-100 text-slate-800" },
    ],
    systemDescription:
      "Bond-breaker tape is the solution for joints that are too shallow or too narrow (typically less than 6 mm) to seat a backer rod. A self-adhesive PE or PTFE film strip applied to the joint base prevents the sealant from bonding to the back face, enforcing two-point side-wall adhesion geometry. The tape adds negligible height. It must be applied to a completely dry, dust-free substrate — the adhesive will not seat on damp or contaminated concrete. After application, apply sealant primer (if required by the sealant TDS) to the joint side faces, then gun-apply sealant in the normal sequence.",
    technicalProperties: [
      "Self-adhesive PE or PTFE film — 0.05–0.1 mm thick — minimal depth addition",
      "Prevents sealant adhesion to joint base — enforces two-point side-wall contact only",
      "Width range 6–50 mm — cut to suit joint width",
      "Application temperature +5 °C to +40 °C — substrate must be dry",
      "Compatible with PU, MS-polymer, silicone, and polysulfide sealants",
    ],
    limitations: [
      "Must be applied to completely dry, clean, dust-free substrate — adhesive will not seat on damp or contaminated concrete",
      "Does not control sealant depth in joints wider than ~10 mm — backer rod still required for correct depth:width ratio in wider joints",
      "Never use masking tape as a substitute — masking tape adhesive transfers to the concrete and the sealant bonds to the residue",
      "PTFE tape is more reliable than PE tape in high-temperature or permanently UV-exposed joints",
    ],
    procurementSources: [
      { name: "Tremco Sealants AU", url: "https://www.tremcosealants.com.au" },
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Fosroc / Parchem", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Closed-Cell", label: "Closed-Cell" },
  { id: "Open-Cell", label: "Open-Cell" },
  { id: "Bond-Breaker", label: "Bond-Breaker Tape" },
  { id: "PU-Compatible", label: "PU Compatible" },
  { id: "Silicone-Compatible", label: "Silicone Compatible" },
  { id: "Narrow-Joint", label: "Narrow Joint" },
];

const SYSTEM_COMPARISON = [
  { product: "Closed-Cell PE Rod", cellType: "Closed-cell", pairedWith: "PU, MS-polymer, polysulfide — NOTE: NOT for acetoxy silicone (open-cell required for silicone)", absorbs: "No — water-repellent", note: "Standard; rod 25–50% wider than joint width" },
  { product: "Open-Cell PU Rod", cellType: "Open-cell", pairedWith: "Silicone (acetoxy and neutral-cure)", absorbs: "Yes — water and sealant", note: "Required for silicone — prevents outgassing voids" },
  { product: "Bond-Breaker Tape", cellType: "N/A (film)", pairedWith: "PU, MS-polymer, silicone", absorbs: "No", note: "Joints <6 mm or too shallow for rod" },
];

const TECH_INFO = {
  typicalApplications: [
    "Expansion and control joints in concrete slabs and walls prior to PU or MS-polymer sealant application",
    "Façade panel and cladding joints requiring designed movement accommodation",
    "Slab-to-wall and slab-to-slab construction joints in car parks and podiums",
    "Window and door perimeter joints in concrete reveals (bond-breaker tape for narrow reveals)",
    "Pavement and plaza deck joints prior to traffic-grade PU sealant",
    "Crack-routed applications where sealant depth:width ratio must be controlled",
  ],
  selectionCriteria: [
    "Joint width ≥ 6 mm and PU / MS-polymer sealant → closed-cell backer rod (rod 25–50% wider than joint)",
    "Silicone or acetoxy silicone sealant → open-cell backer rod (prevents outgassing bubble defects)",
    "Joint width < 6 mm or very shallow → bond-breaker tape (no rod will fit)",
    "Permanently submerged joint → closed-cell only (open-cell absorbs water and loses depth control)",
    "Interior floor joint, flush finish required → closed-cell rod, flush-applied sealant",
    "Overhead or vertical joint → rod must grip tightly — size 35–50% oversize for vertical compression",
  ],
  limitations: [
    "Backer rods and tape do NOT seal the joint — they are always accessories to the sealant, never substitutes",
    "Three-sided adhesion (no rod or tape at base) is the most common sealant failure mode — always install rod or tape before sealant",
    "Open-cell rod with PU/MS-polymer sealant starves joint face adhesive — a common and costly error",
    "Never glue closed-cell rod in position — adhesive at the base creates three-point bond and defeats the purpose",
    "Hot-applied sealant systems (bitumen, asphalt) are incompatible with PE foam — use the appropriate pre-formed seal",
  ],
  standardsNotes: [
    "AS 1725 — Sealants for concrete joints (joint geometry and depth:width ratio requirements)",
    "ISO 11600 — Building construction sealant classification (movement and adhesion classes)",
    "ASTM C962 — Standard guide for use of elastomeric joint sealants (backer rod and bond-breaker guidance)",
    "Sealant manufacturer TDS — specifies backer rod cell type, compatibility, and depth requirements for each product",
    "AS/NZS 4055 — Wind loads (joint design reference for cladding panel joints)",
  ],
  suitableDefects: [
    "Expansion and control joints in concrete slabs (prior to sealant)",
    "Construction joints requiring movement accommodation",
    "Crack-routed and widened random cracks (after routing to consistent width)",
    "Cladding panel and façade perimeter joints",
    "Window and door frame perimeter joints in concrete or masonry",
    "Pavement joints prior to traffic-grade sealant",
  ],
  typicalSubstrates: [
    "In-situ concrete — expansion and control joints in slabs and walls",
    "Masonry and clay brick — control joints in façades and retaining walls",
    "Precast concrete panels — perimeter and inter-panel joints",
    "Steel and aluminium window frames — perimeter seal joints (bond-breaker tape)",
    "Fibre cement cladding — panel-to-panel joints",
    "Concrete toppings and overlays — floor control joint sealing",
  ],
};

export function BackerRodsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Backer rods &amp; bond-breaker tape — why they matter</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A correctly performing joint sealant bonds to the two opposing side walls only. If the sealant also bonds to the joint base (three-sided adhesion), it cannot elongate in an hourglass shape under joint movement — instead it tears prematurely. Backer rods and bond-breaker tape prevent base adhesion and control the sealant depth:width ratio to the target of 1:2.
        </p>
        {expanded && (
          <>
            <p>
              <strong>Closed-cell PE backer rods</strong> are the standard for PU and MS-polymer sealant joints. They are sized 25–50% larger than the joint width to compress and hold in place without adhesive. Closed-cell foam does not absorb the sealant and maintains the correct sealant depth position over the life of the joint.
            </p>
            <p>
              <strong>Open-cell rods</strong> are required when silicone or acetoxy silicone sealants are specified. Silicone releases acetic acid and other gases during cure — open-cell foam allows these to escape through the back of the joint rather than becoming trapped as bubbles in the curing sealant. Using closed-cell rod under silicone sealant is a common installation error that causes internal voids and premature joint failure.
            </p>
            <p>
              <strong>Bond-breaker tape</strong> is used when the joint is too narrow or shallow to accept even the smallest backer rod (typically joints under 6 mm). A thin PE or PTFE film strip adhered to the joint base prevents sealant bonding at the back face. The tape must be applied to a completely dry substrate — it will not adhere to damp concrete.
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

const DESIGN_CRITERIA = "Cell structure — closed-cell (won't absorb water, for cold/wet joints, low outgassing) vs open-cell (breathable, faster cure) vs bond-breaker tape (shallow joints); rod diameter selected ~25% larger than joint width to ensure compression fit; sets sealant depth to correct width:depth ratio (typ 2:1 for elastomeric); compatibility/non-staining with sealant chemistry (PU/silicone/MS); outgassing resistance for silicone; temperature/chemical resistance; compressibility & recovery; supports ISO 11600 / AS 4051.4 sealant joint design; ensures three-sided adhesion is avoided (bond-breaker function).";

export function BackerRodsProductSection() {
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

      <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete cracking" criteriaKey="concrete-cracking/backer-rods" />
    </>
  );
}
