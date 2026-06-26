"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { HYDROPHILIC_PU_CARDS } from "./hydrophilicPUData";

const TECH_INFO = {
  typicalApplications: [
    "Active seeping cracks in basement concrete walls — water actively moving through the crack at time of injection",
    "Construction joints showing active water ingress — typically the horizontal joint between slab and wall pour",
    "Cold joints in basement slabs — where construction pours were interrupted and joints have become water pathways",
    "Pipe penetration annular spaces — where services pass through basement walls and the annular space is leaking",
    "Tie-rod holes — post-tensioned or form tie-rod holes providing water pathways through basement walls",
    "Masonry and brick basement walls — water moving through mortar joints or brick cracks",
  ],
  selectionCriteria: [
    "1C Sika Injection-107: first-choice for most active basement crack sealing — simple, single-component, water-activated — no metering required",
    "Master Builders MasterInject 1320 (1C hydrophilic PU): alternative 1C product — confirm the correct current product (the page listed MasterInject 1308)",
    "2C Sika Injection-101 RC: specify when 1C products fail due to resin washout in high-velocity flow — fast foaming resists washout (temporary waterstop)",
    "Dry or dormant cracks: hydrophilic PU is not appropriate — use epoxy injection for structural crack repair, or acrylic gel for fine cracks",
    "Packer spacing: 200–300 mm for tight cracks in good concrete; 150 mm for wide or badly cracked zones",
    "Always assess structural condition before injecting — injection does not restore structural capacity",
  ],
  limitations: [
    "Not structural — foam / gel does not restore concrete tensile strength across the crack — a structural engineer must confirm the crack does not require structural repair",
    "High water flow can wash 1C resins before cure — use a 2C system or install temporary water management before injection",
    "Post-cure re-cracking can occur if the crack continues to grow — movement must be stabilised for the injection to be permanent",
    "Hydrophilic foam swells with continued water exposure — acceptable in most applications but confirm with the engineer for confined spaces",
    "Not suitable for hairline cracks below 0.2 mm — resin cannot penetrate — acrylic acrylate injection is preferred",
    "Not suitable for potable-water tank injection without confirming AS/NZS 4020 compliance with the manufacturer",
  ],
  standardsNotes: [
    "EN 1504-5 — Products and systems for the protection and repair of concrete structures — concrete injection — Sika Injection-107 confirmed; confirm for 101 RC and the Master Builders product",
    "AS 3600 Concrete Structures — a structural engineer must confirm whether crack injection alone is adequate or whether structural repair is required",
    "AS 4858 Wet area membranes — relevant for subsequent membrane work over injected cracks",
    "NCC Volume One — basement waterproofing performance requirements — no specific injection standard in NCC; the designer specifies system and performance outcome",
    "AS/NZS 4020 — confirm potable-water contact compliance with the manufacturer for tank applications",
  ],
  suitableDefects: [
    "Active water ingress through basement wall cracks — seeping or weeping cracks in reinforced concrete basement walls",
    "Active leaking construction joints in basement walls — the most common single defect in below-ground concrete basement structures",
    "Cold joint water ingress — joints between sequential concrete pours not adequately treated during construction",
    "Active leaking tie-rod holes — water entering through form tie-rod voids in poured concrete basement walls",
    "Pipe penetration annular gaps — water bypassing inadequate penetration seals around service pipes through basement walls",
  ],
  typicalSubstrates: [
    "Reinforced concrete basement walls — in-situ poured — most common substrate for hydrophilic PU injection",
    "Reinforced concrete slabs (basement floor or soffit) — for slab cracks and cold-joint treatment",
    "Masonry brick or block basement walls — injection into mortar joint or through brick via drill-in packers",
    "Precast concrete panels — confirm suitability with the manufacturer before injection in precast elements",
  ],
};

export function HydrophilicPUIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are hydrophilic PU injection systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Hydrophilic polyurethane injection resins are injected into actively leaking cracks, joints and voids in below-grade concrete. They react with the water present and expand into a flexible foam (free-foam expansion up to ~40×) that fills and seals the water pathway across the wall. Because they are water-activated, they are particularly suited to wet, actively-seeping defects — the defining basement water-ingress condition.
        </p>
        <p>
          One-component resins (Sika Injection-107) are the first choice for most active cracks — no metering pump is needed. Two-component fast-foaming resins (Sika Injection-101 RC) are used for high-velocity flow that would wash out a 1C resin, as a temporary waterstop. Injection is not a structural repair and does not suit hairline cracks below 0.2 mm (use acrylic gel) — and the structural condition must be assessed first.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the crack is active / wet (hydrophilic PU is water-activated) and ≥0.2 mm (use acrylic gel below that); 1C for most cracks vs 2C fast-foam for high-velocity washout (temporary waterstop); expansion ratio; packer spacing; that the structural condition is assessed (injection is not structural); EN 1504-5; and AS/NZS 4020 for potable tanks. Confirm every value against the current AU manufacturer TDS.";

export function HydrophilicPUProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      {/* ── System Technical Reference ── */}
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

      <AutoProductReference products={[]} cards={HYDROPHILIC_PU_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Hydrophilic PU injection" pruneEmptyFacts />
    </>
  );
}
