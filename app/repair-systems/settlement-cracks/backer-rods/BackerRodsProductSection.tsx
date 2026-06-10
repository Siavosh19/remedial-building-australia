"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Closed-Cell" | "Open-Cell" | "Bond-Breaker" | "PU-Compatible" | "Silicone-Compatible" | "Narrow-Joint";

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
    fullLabel: "Multiple suppliers — Closed-Cell PE Backer Rod",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#0369a1",
    name: "Closed-Cell Polyethylene Backer Rod — PU Sealant Joints",
    descriptionLine: "Closed-cell PE foam rod — oversized by 25–50% — controls sealant depth:width ratio — PU sealant compatible",
    productType: "Closed-cell polyethylene foam backer rod",
    filterTags: ["Closed-Cell", "PU-Compatible", "Silicone-Compatible"],
    techChips: [
      { label: "Closed-cell PE", cls: "bg-sky-100 text-sky-800" },
      { label: "PU + silicone", cls: "bg-slate-100 text-slate-700" },
      { label: "Oversize 25–50%", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription: "Closed-cell polyethylene backer rod is the standard backing material for PU sealant joints in settlement crack repair — installed before sealant application to control the sealant depth:width ratio to the design 1:2 target. The closed-cell cell structure means the rod does not absorb sealant and maintains its shape against the sealant back-face. Rod diameter is selected 25–50% larger than the joint width to ensure it is compressed and grips the joint walls without tooling or adhesive. Installed by pressing the rod into the joint to the correct depth — the rod must be below the sealant application depth to allow two-sided adhesion (at both joint faces only) and prevent three-sided adhesion. Available in diameters from 6 mm to 50 mm from building and jointing supply trade outlets and specialist sealant suppliers. Used in settlement crack repair at movement joints and repaired crack faces before PU sealant application.",
    technicalProperties: [
      "Closed-cell PE foam — does not absorb sealant — maintains shape under sealant pressure",
      "Select diameter 25–50% larger than joint width — compresses to grip joint walls",
      "Controls sealant depth:width to 1:2 target — prevents three-sided adhesion",
      "Available 6 mm to 50 mm diameter — multiple supplier generic product",
    ],
    limitations: [
      "Rod must not be damaged or pierced during installation — a punctured closed-cell rod partially opens the cell structure and reduces its function",
      "Do not twist or stretch the rod — install by pressing straight into the joint without rotating",
      "Not suitable for very wide joints (> 50 mm) without specialist backer — use multiple rods side-by-side or consult sealant manufacturer",
      "Confirm rod diameter vs joint width before ordering — undersize rod drops into joint without gripping",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Tremco Australia", url: "https://www.tremcosealants.com.au" },
      { name: "Sika Australia", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Multiple suppliers — Open-Cell PU Backer Rod",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#15803d",
    name: "Open-Cell Polyurethane Backer Rod — Silicone Sealant Joints",
    descriptionLine: "Open-cell PU foam rod — for silicone sealants only — allows gas exchange during silicone cure — controls sealant depth",
    productType: "Open-cell polyurethane foam backer rod",
    filterTags: ["Open-Cell", "Silicone-Compatible", "Narrow-Joint"],
    techChips: [
      { label: "Open-cell PU", cls: "bg-green-100 text-green-800" },
      { label: "Silicone only", cls: "bg-slate-100 text-slate-700" },
      { label: "Gas permeable", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription: "Open-cell polyurethane backer rod is used specifically with silicone sealants in settlement crack repair applications where a silicone sealant is specified instead of PU (typically on glazed or high-UV-exposure facades). Silicone sealants cure by moisture from the joint faces — an open-cell rod allows moisture vapour to pass through and prevents sealant blistering caused by outgassing against an impermeable back face. Do not use open-cell rods with PU sealants — the open-cell structure absorbs PU sealant into the rod body, allowing three-sided adhesion and reducing sealant flexibility. Open-cell rods are typically white or grey, and soft to the touch compared to closed-cell rods. Install by pressing into the joint at the design depth — the same 1:2 depth:width rule applies.",
    technicalProperties: [
      "Open-cell PU foam — gas-permeable — required for silicone sealant compatibility",
      "Allows moisture vapour exchange through rod — prevents silicone cure blistering",
      "Select diameter 25–50% larger than joint width — compresses to design depth",
      "Do NOT use with polyurethane sealants — open cell absorbs PU resin",
    ],
    limitations: [
      "Silicone sealant use ONLY — not compatible with PU, MS-polymer, or other gun-applied sealants",
      "Open-cell structure absorbs PU sealant — causes three-sided adhesion and sealant failure if used incorrectly with PU",
      "Softer than closed-cell rod — may compress further than intended under sealant application pressure; confirm installed depth before sealant application",
      "Available in limited diameters compared to closed-cell PE range",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Tremco Australia", url: "https://www.tremcosealants.com.au" },
    ],
  },
  {
    fullLabel: "Multiple suppliers — Bond-Breaker Tape",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#78716c",
    name: "Bond-Breaker Tape — Prevents Three-Sided Sealant Adhesion in Shallow Joints",
    descriptionLine: "PTFE or PE self-adhesive tape — applied to joint base — prevents sealant bonding at back face — for joints too shallow for backer rod",
    productType: "Bond-breaker tape for sealant joint base",
    filterTags: ["Bond-Breaker", "PU-Compatible", "Silicone-Compatible", "Narrow-Joint"],
    techChips: [
      { label: "PTFE / PE tape", cls: "bg-stone-200 text-stone-800" },
      { label: "Three-sided adhesion prevention", cls: "bg-slate-100 text-slate-700" },
      { label: "Shallow joints", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Bond-breaker tape is used in narrow and shallow settlement crack repair joints where backer rod cannot be installed because the joint is not deep enough. The PTFE or polyethylene self-adhesive tape is applied to the base (back face) of the joint before sealant application. The tape's non-stick face (facing the sealant) prevents sealant adhesion to the joint base — ensuring two-sided adhesion only (at both joint faces) and allowing the sealant to elongate correctly under joint movement. Without bond-breaker tape or backer rod, sealant bonds at three faces, and any joint movement causes the sealant to tear in the middle rather than elongate at the bond faces. Bond-breaker tape is used in shallow surface cracks, hairline dormant crack surface sealing, and joints in thin masonry sections where backer rod is not feasible. Do not use masking tape as bond-breaker — the adhesive transfers to the substrate and allows partial sealant bonding at the base.",
    technicalProperties: [
      "PTFE or PE self-adhesive tape — non-stick face prevents sealant bonding at joint base",
      "Used where joint is too shallow for backer rod",
      "Maintains two-sided sealant adhesion (faces only) — prevents three-sided adhesion",
      "Suitable for PU and silicone sealants",
    ],
    limitations: [
      "Tape must not be left in position longer than necessary before sealant application — adhesive may degrade or contaminate joint faces if exposed to UV or rain for extended periods",
      "Do not use masking tape as a substitute — masking tape adhesive transfers to the substrate and allows sealant bonding at the base",
      "Bond-breaker tape does not control sealant depth:width ratio — ensure sealant depth is correctly set at application",
      "For joints that are too deep for tape alone, use backer rod instead",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
      { name: "Tremco Australia", url: "https://www.tremcosealants.com.au" },
      { name: "Sika Australia", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Closed-Cell", label: "Closed-cell PE rod" },
  { tag: "Open-Cell", label: "Open-cell PU rod" },
  { tag: "Bond-Breaker", label: "Bond-breaker tape" },
  { tag: "PU-Compatible", label: "PU sealant compatible" },
  { tag: "Silicone-Compatible", label: "Silicone compatible" },
  { tag: "Narrow-Joint", label: "Narrow / shallow joint" },
];

const TECH_INFO = {
  typicalApplications: [
    "Sealant joint backing in movement joints after settlement crack repair in masonry and concrete",
    "Depth control at repaired crack face joints before PU sealant application",
    "Bond-breaker tape in shallow cracks where backer rod is too large to install",
    "Joint backing at wall/slab junctions in settlement-affected buildings",
    "Depth control at horizontal expansion joints in concrete ground slabs near settlement areas",
  ],
  selectionCriteria: [
    "Closed-cell PE rod for PU sealants and most sealant types — the standard choice for movement joints in settlement crack repair",
    "Open-cell PU rod for silicone sealants only — do not mix rod type and sealant type",
    "Bond-breaker tape where joint is too shallow for backer rod (< 6 mm deep)",
    "Rod diameter: select 25–50% larger than joint width to ensure compression and grip",
    "Sealant depth:width ratio must be 1:2 — use rod or tape to achieve this geometry before applying sealant",
  ],
  whenNotToUse: [
    "Do not use open-cell backer rod with PU sealant — the rod absorbs PU resin and causes three-sided adhesion failure",
    "Do not use closed-cell rod with silicone sealant — the impermeable back-face causes silicone cure blistering",
    "Do not use masking tape as bond-breaker — masking tape adhesive transfers to the substrate and allows partial sealant bonding at the base",
    "Do not install backer rod and then paint over it — the paint bond between rod and sealant creates additional adhesion points",
    "Do not skip backer rod or bond-breaker in joints wider than 6 mm — three-sided adhesion will cause premature sealant failure",
  ],
  standardsNotes: [
    "ASTM C1330 — Standard Specification for Cylindrical Sealant Backing for Use with Cold Liquid-Applied Sealants",
    "Sealant manufacturer application guides specify rod type and diameter for each sealant product",
    "ISO 11600 — Building Construction — Jointing products — Classification and requirements",
    "Joint design per AS 3700 (masonry) and AS 3600 (concrete) — backer rod sizing included in standard joint detailing",
    "Closed-cell rod: confirmed non-reactive with PU and epoxy sealants — open-cell for silicone use only",
  ],
  suitableDefects: [
    "Movement joints and repaired crack face joints in settlement-cracked masonry",
    "Expansion and control joints in concrete ground slabs at settlement locations",
    "Surface sealing joints at settlement crack repairs in concrete retaining walls",
    "Wall/slab junction joints in settlement-affected structures before sealant application",
    "Shallow hairline crack surface sealing (bond-breaker tape) in concrete and masonry",
  ],
  typicalSubstrates: [
    "Brick and masonry walls — movement joint depth control before PU sealant",
    "Concrete walls, retaining walls, and foundations — joint backing",
    "Concrete ground slabs — horizontal joint depth control",
    "Concrete masonry block walls — joint backing at movement and expansion joints",
    "All masonry and concrete substrates in settlement crack repair context",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Closed-cell PE rod", cellType: "Closed-cell", pairedWith: "PU and silicone sealants", absorbs: "No", note: "Standard choice — most sealant types" },
  { product: "Open-cell PU rod", cellType: "Open-cell", pairedWith: "Silicone sealant ONLY", absorbs: "Moisture only", note: "Required for silicone cure compatibility" },
  { product: "Bond-breaker tape", cellType: "N/A — tape", pairedWith: "PU and silicone", absorbs: "No", note: "Shallow joints where rod not feasible" },
];

export function BackerRodsIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Backer rods and bond-breaker tape — controlling sealant depth:width ratio in settlement crack joints</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">Why depth:width ratio matters, closed vs open cell selection, and the masking tape trap</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>Backer rods and bond-breaker tape are installed before sealant application to control the sealant depth:width ratio to the design target of 1:2 (depth half the width). At 1:2, when the joint closes, the sealant elongates by spreading between the two face-adhesion lines — accommodating movement without cohesive failure. Without a backer rod or bond-breaker tape, the sealant bonds to all three surfaces (both faces and the back), and any joint movement causes the sealant to tear in the middle rather than elongate.</p>
          <p>Rod type selection is critical: closed-cell PE rod for PU and most sealant types; open-cell PU rod for silicone sealants only (silicone cures by moisture diffusion — an impermeable back causes blistering). Do not use masking tape as a bond-breaker — the adhesive transfers to the substrate and creates partial bonding that degrades sealant performance.</p>
        </div>
      )}
    </div>
  );
}

export function BackerRodsProductSection() {
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
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter:</span>
        {FILTER_DEFS.map(({ tag, label }) => (
          <button key={tag} onClick={() => toggleFilter(tag)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${activeFilters.has(tag) ? "border-red-700 bg-red-700 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-sky-400"}`}>{label}</button>
        ))}
        {activeFilters.size > 0 && <button onClick={() => setActiveFilters(new Set())} className="text-xs font-bold text-red-700 underline">Clear</button>}
      </div>

      <div className="relative">
        <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronLeft size={16} /></button>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none]">
          {filtered.map((p) => (
            <div key={p.name} className="w-[380px] shrink-0 rounded-2xl border border-slate-200 bg-white overflow-hidden" style={{ borderTop: `4px solid ${p.accentColor}` }}>
              <div className="p-5">
                <a href={p.brandUrl} target="_blank" rel="noopener noreferrer" className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-sky-700">{p.fullLabel} ↗</a>
                <h3 className="text-sm font-extrabold leading-snug text-sky-950">{p.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{p.descriptionLine}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{p.productType}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.techChips.map((c) => <span key={c.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>)}
                </div>
                <CollapsibleDescription text={p.systemDescription} />
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <CollapsibleCardDetails
                    text=""
                    chips={p.filterTags.map((t) => ({ label: t.replace(/-/g, " "), cls: "bg-sky-50 text-sky-700" }))}
                  />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Technical properties</p>
                  <CollapsibleList items={p.technicalProperties} icon="check" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Limitations</p>
                  <CollapsibleList items={p.limitations} icon="x" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Procurement</p>
                  <CollapsibleSources sources={p.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronRight size={16} /></button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><Layers size={16} /></div>
            <span className="text-sm font-extrabold text-sky-950">Backer rod technical reference</span>
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

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-extrabold text-sky-950">Backer rod and bond-breaker tape comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Product", "Cell type", "Paired with", "Absorbs sealant", "Key note"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SYSTEM_COMPARISON.map((row) => (
                <tr key={row.product} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-semibold text-sky-950">{row.product}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.cellType}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.pairedWith}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.absorbs}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
