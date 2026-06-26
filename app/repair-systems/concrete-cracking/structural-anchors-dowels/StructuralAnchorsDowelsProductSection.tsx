"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";

type FilterTag = "Masonry-Stitching" | "Concrete-Stitching" | "Helical-Bar" | "Chemical-Anchor" | "AS5216" | "Wall-Tie";

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
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Masonry-Stitching", label: "Masonry crack stitching" },
  { tag: "Concrete-Stitching", label: "Concrete crack stitching" },
  { tag: "Helical-Bar", label: "Helical bar system" },
  { tag: "Chemical-Anchor", label: "Chemical anchor / epoxy dowel" },
  { tag: "AS5216", label: "AS 5216 compliant" },
  { tag: "Wall-Tie", label: "Wall tie replacement" },
];

const TECH_INFO = {
  typicalApplications: [
    "Crack stitching of settlement cracks in brick and masonry walls — helical bars into mortar bed joints",
    "Structural dowel stitching of settlement cracks in concrete foundations and walls",
    "Cavity wall tie replacement in double-brick and brick veneer construction where ties have corroded",
    "Reinforced masonry block wall crack repair — epoxy dowels across the crack plane",
    "Post-settlement structural reinstatement of masonry and concrete elements confirmed as dormant",
  ],
  selectionCriteria: [
    "For masonry (brick, stone) settlement cracks: use helical SS bars (Helifix or Thor Helical) installed into mortar bed joints — avoids drilling through bricks",
    "For concrete settlement cracks: use N12/N16 deformed rebar with epoxy adhesive at 30–45 degrees through the crack plane",
    "For cavity wall tie replacement (distinct from crack stitching): use Thor Helical or Helifix with the cavity-crossing installation method",
    "Engineer design required in all cases — bar layout, spacing, and embedment must be specified before installation",
    "Confirm settlement is dormant before any structural stitching — crack monitoring for minimum 4–12 weeks is best practice",
  ],
  whenNotToUse: [
    "Do not stitch an active (still-moving) settlement crack — the bars will fail under continued movement",
    "Do not install bars without engineer assessment of settlement cause — stitching does not address foundation bearing failure or expansive clay",
    "Do not use black mild steel or galvanised ties in masonry — corrosion product expansion causes additional cracking",
    "Do not drill through bricks for helical bar installation — always install into mortar joints",
    "Do not install epoxy dowels in PT concrete without GPR scan confirming tendon positions",
  ],
  standardsNotes: [
    "AS 5216 — Design of Post-Installed and Cast-in Fastenings in Concrete — governs chemical anchor design",
    "AS 3700 — Masonry Structures — masonry material and construction requirements",
    "Helifix / Thor Helical ETA (European Technical Assessment) — basis for engineering design of helical bar systems",
    "Hilti PROFIS Anchor design software — AS 5216 compliant calculation for epoxy dowel systems",
    "Engineer sign-off required for all structural stitching work in settlement-affected buildings",
  ],
  suitableDefects: [
    "Settlement cracks in brick masonry walls — stepped, diagonal, and vertical cracking through mortar joints",
    "Settlement cracks in concrete foundations, retaining walls, and structural walls",
    "Cavity wall delamination from corroded or absent wall ties",
    "Horizontal and diagonal cracking in reinforced masonry block walls from differential settlement",
    "Crack reinstatement in post-underpinning structural elements",
  ],
  typicalSubstrates: [
    "Solid and cavity brick masonry — mortar bed joint installation for helical bars",
    "Concrete — reinforced and unreinforced — for epoxy dowel stitching",
    "Concrete masonry block — hollow and solid block — epoxy dowels with mesh sock where required",
    "Sandstone and limestone masonry — helical bars where mortar joints are accessible",
    "Reinforced concrete block masonry walls — epoxy anchor bars",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Helifix CemTie / Heli Tie", substrate: "Brick / masonry walls", installation: "Mortar bed joint slot", material: "304 SS helical bar", keyUse: "Crack stitching — no brick drilling" },
  { product: "Thor Helical Bar", substrate: "Brick / masonry / cavity walls", installation: "Mortar joint + cavity drill", material: "304 SS helical bar", keyUse: "Stitching + wall tie replacement" },
  { product: "Hilti HIT-RE 500 V3 + rebar", substrate: "Concrete / reinforced masonry", installation: "Drilled hole — 30–45°", material: "N12/N16 rebar + epoxy", keyUse: "Structural concrete stitching" },
  { product: "Ramset Chemset Reo 502 PLUS", substrate: "Concrete / masonry block", installation: "Drilled hole (mesh sock in hollow block)", material: "Steel bar + pure epoxy", keyUse: "Dowel installation — trade supply" },
];

export function StructuralAnchorsDowelsIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Helical bars for masonry vs chemical dowels for concrete</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">System selection, settlement status confirmation, and AS 5216 design requirements</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>Masonry settlement cracks (brick, masonry block, stone) are stitched using helical stainless steel bars driven into mortar bed joints — Helifix or Thor Helical systems. The mortar joint installation avoids drilling through bricks, preserves the brick face, and the helical profile grips the slot without a large hole or injection equipment. Concrete settlement cracks (reinforced concrete walls, foundations, frames) require drilled chemical anchor bars at 30–45 degrees — N12 or N16 rebar with epoxy adhesive (Hilti HIT-RE 500 V3, Ramset Chemset Epoxy 500+).</p>
          <p>In all cases, the structural cause of the settlement — foundation bearing failure, subsidence, expansive clay, tree root damage — must be assessed and addressed before structural crack stitching. Stitching an active crack will not hold; settlement must be confirmed dormant before any structural repair is installed. Structural engineer sign-off is required for all stitching work.</p>
        </div>
      )}
    </div>
  );
}

const DESIGN_CRITERIA = "System type — epoxy-bonded rebar/dowel (load transfer) vs helical SS crack-stitching bar (distributes/stitches masonry cracks); bond strength & pull-out / characteristic resistance to AS 5216 (design of post-installed anchors); embedment depth & edge/spacing distances; hole diameter & drilling method (no diamond-core for some adhesives); substrate (concrete/masonry) & cracked vs uncracked concrete rating; adhesive gel/working & full-cure time vs temperature; bar grade & corrosion (SS316 coastal); load type (tension/shear/seismic/fatigue); base-material temperature & moisture (dry/submerged-rated); fire resistance of anchor";

export function StructuralAnchorsDowelsProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (tag: FilterTag) =>
    setActiveFilters((prev) => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : n.add(tag); return n; });

  const filtered = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.some((t) => activeFilters.has(t)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><Layers size={16} /></div>
            <span className="text-sm font-extrabold text-sky-950">Structural anchors & stitching technical reference</span>
          </div>
          <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-6 pb-6 pt-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <TechCard icon={<Layers size={14} />} title="Typical applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<CheckCircle size={14} />} title="Selection criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={14} />} title="When NOT to use" items={TECH_INFO.whenNotToUse} style="warn" />
              <TechCard icon={<FileText size={14} />} title="Standards & notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<SquareStack size={14} />} title="Suitable defects" items={TECH_INFO.suitableDefects} style="bullet" />
              <TechCard icon={<Ruler size={14} />} title="Typical substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete cracking" criteriaKey="concrete-cracking/structural-anchors-dowels" />
    </div>
  );
}
