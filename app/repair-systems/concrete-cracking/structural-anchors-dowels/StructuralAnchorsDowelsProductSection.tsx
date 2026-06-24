"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

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
  {
    fullLabel: "Helifix Australia — CemTie / Heli Tie",
    brandUrl: "https://www.helifix.com.au",
    accentColor: "#0369a1",
    name: "Helifix CemTie / Heli Tie — Helical Wall Crack Stitching Bars",
    descriptionLine: "304 stainless steel helical tie bars — mortar bed joint installation — masonry and brick crack stitching",
    productType: "Stainless steel helical bar crack stitching system",
    filterTags: ["Masonry-Stitching", "Helical-Bar", "Wall-Tie"],
    techChips: [
      { label: "304 SS helical bar", cls: "bg-sky-100 text-sky-800" },
      { label: "6 mm diameter", cls: "bg-slate-100 text-slate-700" },
      { label: "No brick drilling", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription: "Helifix helical stainless steel tie bars (CemTie and Heli Tie range) are the most widely used system for crack stitching in brick and masonry walls affected by settlement. The helical profile allows the bar to be driven into a 25–35 mm deep slot cut along the mortar bed joint adjacent to the crack, then fixed with Helifix HBS grout or specialist resin. Unlike drilled bar systems, helical ties are installed into the mortar joint — avoiding drilling through bricks — preserving the brick face and limiting disruption to the masonry. The helical profile grips the slot walls without requiring a large hole or heavy injection equipment. Typically installed at 300–450 mm centres vertically, alternating on each face where accessible. Available in 6 mm diameter, lengths 225–750 mm. Structural engineer assessment of the settlement crack cause is required before specifying — stitching a crack that is still moving does not fix the crack.",
    technicalProperties: [
      "304 stainless steel helical bar — 6 mm diameter — 225–750 mm lengths",
      "Installed into mortar bed joint slot — no drilling through brick faces",
      "Fixed with Helifix HBS grout or specialist resin",
      "Installed at 300–450 mm centres vertically — alternating each face",
    ],
    limitations: [
      "Do not stitch an active (still moving) settlement crack — confirm settlement has ceased before stitching",
      "Helical tie restores tensile continuity across the crack — it does not address the cause of settlement; engineer must confirm cause and whether underpinning is required first",
      "Mortar bed joint must be minimum 8 mm thick for slot cutting — consult Helifix if joints are thinner",
      "Stainless steel only — black mild steel ties corrode rapidly in masonry and are not suitable",
    ],
    procurementSources: [
      { name: "Helifix Australia", url: "https://www.helifix.com.au" },
    ],
  },
  {
    fullLabel: "Thor Helical Australia — Helical Bar",
    brandUrl: "https://www.thorhelical.com.au",
    accentColor: "#15803d",
    name: "Thor Helical Bar — Remedial Wall Tie and Crack Stitching System",
    descriptionLine: "304 SS helical bars — crack stitching and cavity wall tie replacement — mortar-joint and drilled installation",
    productType: "Stainless steel helical bar — crack stitching and wall tie replacement",
    filterTags: ["Masonry-Stitching", "Helical-Bar", "Wall-Tie"],
    techChips: [
      { label: "304 SS helical", cls: "bg-green-100 text-green-800" },
      { label: "6 mm / 225–1000 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Wall tie replacement", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription: "Thor Helical Bar is the primary alternative to Helifix for helical stainless steel bar crack stitching in Australian masonry. Available in 6 mm diameter, lengths 225 to 1000 mm. Installation is the same — slot cut along a mortar joint, bar driven in and fixed with Thor Helical grout or resin. Thor Helical bars are also used for cavity wall tie replacement in brick veneer and double-brick construction where existing ties have corroded or were not installed to specification. Cavity wall tie replacement involves drilling through the outer brick leaf into the inner leaf and installing a helical bar across the cavity to re-tie the two leafs together — this application is distinct from crack stitching and requires a different assessment and installation pattern. Both applications require engineer assessment before specifying layout and bar density. Thor Helical Australia supply and technical support nationally.",
    technicalProperties: [
      "304 stainless steel helical bar — 6 mm — lengths 225–1000 mm",
      "Same mortar-joint installation method as Helifix for crack stitching",
      "Cavity wall tie replacement — drilled through outer brick leaf to inner leaf",
      "Thor Helical Australia — national supply and technical support",
    ],
    limitations: [
      "Cavity wall tie replacement requires drilling through the outer brick leaf — confirm wall construction by test drill or cavity inspection before specifying",
      "Do not use black mild steel or galvanised bars in masonry — corrosion product expansion causes additional cracking",
      "Cavity tie replacement requires both leafs to be structurally sound — if inner leaf is degraded, tie replacement alone does not restore stability",
      "Crack stitching does not address settlement cause — engineer confirmation of settlement status is required",
    ],
    procurementSources: [
      { name: "Thor Helical Australia", url: "https://www.thorhelical.com.au" },
    ],
  },
  {
    fullLabel: "Hilti Australia — HIT-RE 500 V3 + N12 Bar",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#be123c",
    name: "Hilti HIT-RE 500 V3 + N12 Bar — Structural Dowel Stitching in Concrete",
    descriptionLine: "2-part epoxy + deformed rebar — crack stitching in concrete settlement cracks at 45° — AS 5216 compliant",
    productType: "Epoxy adhesive + rebar structural dowel system",
    filterTags: ["Concrete-Stitching", "Chemical-Anchor", "AS5216"],
    techChips: [
      { label: "AS 5216", cls: "bg-red-100 text-red-800" },
      { label: "HIT-RE 500 V3", cls: "bg-slate-100 text-slate-700" },
      { label: "45° drilling", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription: "For settlement cracks in concrete elements — foundations, retaining walls, concrete block walls, and concrete frames — structural stitching uses N12 or N16 deformed rebar installed at 30–45 degrees to the crack with Hilti HIT-RE 500 V3 epoxy adhesive. Drilled hole (typically 16–20 mm for N12) at 30–45 degrees through the crack plane, 3-stage cleaned (blow-brush-blow), injection-filled with HIT-RE 500 V3, bar inserted to full embedment depth. The bar crosses the crack plane and is anchored in sound concrete on each side. Bar spacing, embedment, angle, and diameter must be designed by structural engineer per AS 5216. Hilti PROFIS Anchor design software supports calculation. This method applies to reinforced and unreinforced concrete settlement damage in foundations, ground-bearing slabs, and structural walls.",
    technicalProperties: [
      "AS 5216 compliant — Hilti HIT-RE 500 V3 epoxy + N12/N16 deformed rebar",
      "16–20 mm drill hole — 30–45 degree angle through crack plane",
      "3-stage hole cleaning mandatory (blow-brush-blow) before injection",
      "Structural engineer design required — bar spacing, angle, and embedment per AS 5216",
    ],
    limitations: [
      "Do not install in PT (post-tensioned) concrete without a GPR scan confirming tendon positions — 45-degree drilling will intersect PT tendons if not mapped",
      "Settlement must be confirmed dormant before concrete stitch repair — engineer confirmation required",
      "Full cure required before loading — confirm cure time from Hilti TDS for ambient temperature on site",
      "Stitching alone does not address foundation movement — engineer must determine if underpinning or ground treatment is required first",
    ],
    procurementSources: [
      { name: "Hilti Australia — direct and trade supply", url: "https://www.hilti.com.au" },
    ],
  },
  {
    fullLabel: "Ramset Australia — Chemset Reo 502 PLUS",
    brandUrl: "https://www.ramset.com.au",
    accentColor: "#78716c",
    name: "Ramset Chemset Reo 502 PLUS — Chemical Anchor for Concrete Dowels",
    descriptionLine: "2-part pure epoxy — structural dowel and rebar installation in concrete — AS 5216 compliant — broad trade availability — 600 mL cartridge",
    productType: "Pure epoxy anchoring adhesive — structural dowel — AS 5216",
    filterTags: ["Concrete-Stitching", "Masonry-Stitching", "Chemical-Anchor", "AS5216"],
    techChips: [
      { label: "AS 5216", cls: "bg-stone-200 text-stone-800" },
      { label: "600 mL cartridge", cls: "bg-slate-100 text-slate-700" },
      { label: "Trade availability", cls: "bg-stone-100 text-stone-700" },
    ],
    systemDescription: "Ramset Chemset Reo 502 PLUS is a heavy-duty pure epoxy chemical anchor for post-installed reinforcing bar and structural dowels in cracked and uncracked concrete. AS 5216 compliant. Available in 600 mL cartridges, widely distributed through trade suppliers and Bunnings nationally. Suitable for dry, wet, or flooded holes. Used in settlement crack repair for concrete elements where a broadly available chemical anchor is appropriate for structural dowel installation. For masonry block installation with hollow core cells, a mesh sock or sleeve insert is required to contain the resin — without containment, the resin runs into the void and no anchorage develops. Structural engineer design required for bar layout, spacing, and embedment per AS 5216. Note: the previously named 'Chemset Epoxy 500+' does not appear in the current Ramset Australia product range — Chemset Reo 502 PLUS is the current equivalent product.",
    technicalProperties: [
      "AS 5216 compliant — 600 mL cartridge — cracked and uncracked concrete",
      "Suitable for dry, wet, and flooded holes in concrete",
      "Masonry block: mesh sock required to contain resin in hollow core cells",
      "Dispense waste shot before injection — first material from new nozzle is unmixed",
    ],
    limitations: [
      "Hollow masonry block requires mesh sock or sleeve — without containment, resin runs into void and no bond develops",
      "Structural engineer design required — bar spacing, diameter, embedment, and loading per AS 5216",
      "Dispense waste shot before injecting — first material from a new static nozzle is unmixed",
      "Confirm current product name and cartridge size with Ramset Australia before specifying — product range subject to change",
    ],
    procurementSources: [
      { name: "Ramset Australia", url: "https://www.ramset.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
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
                {p.tdsUrl && <a href={p.tdsUrl} target="_blank" rel="noopener noreferrer" className="mb-2 flex items-center gap-1 text-[10px] font-semibold text-sky-600 hover:text-sky-800">TDS ↗</a>}
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

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-extrabold text-sky-950">System comparison — masonry vs concrete stitching</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Product", "Substrate", "Installation", "Bar material", "Key use"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SYSTEM_COMPARISON.map((row) => (
                <tr key={row.product} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-semibold text-sky-950">{row.product}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.substrate}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.installation}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.material}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.keyUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
