"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { ACRYLIC_INJECTION_CARDS } from "./acrylicInjectionData";

const TECH_INFO = {
  typicalApplications: [
    "Hairline cracks below 0.3 mm — fine cracks in concrete basement walls and slabs where PU foam injection cannot penetrate",
    "Fine construction joints — where the joint is tight and PU resin cannot enter at low pressure",
    "Porous concrete zones — poorly consolidated concrete around joints, particularly around formwork tie-rod locations",
    "Fine cracks around cast-in service conduits and blockouts — water pathways through concrete around embedded items",
    "Curtain (sealing-wall) injection in damp / saturated ground behind or within the structure",
  ],
  selectionCriteria: [
    "Crack width below 0.3 mm: specify acrylic acrylate — PU resin cannot penetrate — very low (water-like) viscosity is critical for fine-crack entry",
    "Crack width 0.3 mm and above with active flow: specify hydrophilic PU injection (Sika Injection-107 or equivalent) — PU foam is simpler and more effective",
    "Dry fine cracks: consider epoxy injection (structural) or leave ungrouted if non-structural — acrylic gel is for wet / damp conditions",
    "High-velocity active water: neither acrylic gel nor 1C PU — use 2C PU (Sika Injection-101 RC) with short gel time or a hydraulic cement plug first",
    "Sika Injection-306 is the verified acrylic gel here — confirm the correct Master Builders Solutions acrylic gel before using it as an alternative (the listed MasterInject 1315 is an epoxy, not an acrylic)",
  ],
  limitations: [
    "2-component metering pump required — cannot be injected with a simple 1C pump — specialist contractor with the correct equipment required",
    "Not structural — acrylic gel does not restore concrete strength — a structural engineer must confirm adequacy",
    "Not suitable for high-velocity water flow — the gel is displaced before setting — apply a hydraulic cement plug first then inject",
    "Gel may shrink slightly over time in dry conditions — not a concern in permanently wet basement conditions",
    "Not suitable for large voids — acrylic gel is for fine cracks and pores only — use cementitious grout or expanding foam for large voids",
    "Confirm potable-water contact compliance (AS/NZS 4020) before specifying in water-storage or tank applications",
  ],
  standardsNotes: [
    "EN 1504-5 — concrete injection, principle C — Sika Injection-306 confirmed compliant — confirm classification for the Master Builders product",
    "AS 3600 — a structural engineer must confirm whether crack injection alone is adequate or whether structural intervention is required",
    "NCC — basement waterproofing performance obligations — the injection system must achieve the required performance outcome; no specific injection standard in NCC",
    "AS/NZS 4020 — confirm potable-water contact compliance with the manufacturer for water-storage applications",
  ],
  suitableDefects: [
    "Hairline cracks in basement concrete walls — fine seeping cracks where moisture is visually apparent but not flowing",
    "Fine construction joints with slow seepage — tightly formed joints where water is moving but not dripping",
    "Porous concrete zones with distributed seepage — poorly consolidated concrete showing damp patches without discrete cracks",
    "Fine cracks around embedded items — service conduits, cast-in inserts, and formwork hardware paths through concrete walls",
  ],
  typicalSubstrates: [
    "Reinforced concrete basement walls — in-situ poured — fine crack sealing in otherwise sound concrete",
    "Reinforced concrete slabs — fine crack treatment in slab soffits and floors",
    "Masonry — limited to fine cracks in mortar joints and brick / block face — confirm penetration with a specialist before specifying",
  ],
};

export function AcrylicInjectionIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are acrylic injection systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Acrylic (acrylate) injection systems are multi-component resins with exceptionally low viscosity before gelation — comparable to water — enabling them to penetrate hairline cracks and fine pores in concrete that cannot be reached by polyurethane injection resins. When the components are mixed at the injection head a chemical reaction initiates gelation, forming a flexible, water-impermeable gel within the crack. The gel time is adjustable (typically 10–60 min) by varying the component ratio.
        </p>
        <p>
          Unlike PU foam, acrylic gel does not expand — it fills the void without generating lateral pressure, making it appropriate for fine cracks in concrete with limited cover or in unreinforced masonry where PU expansion could cause spalling. It is also used for curtain (sealing-wall) injection in damp / saturated ground. Acrylic injection requires a 2-component metering pump and a specialist applicator; specify it where crack width is the limiting constraint, otherwise hydrophilic PU is simpler and more widely used.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the crack is too fine for PU (<0.3 mm) and damp/wet (acrylic gel is for wet conditions); the gel/reaction time set for the flow; the very-low (water-like) viscosity for penetration; non-expansive gel where PU pressure would spall; that high-velocity water is plugged first; the 2-component metering pump / specialist applicator; EN 1504-5; and AS/NZS 4020 for water-storage. Confirm every value against the current AU manufacturer TDS.";

export function AcrylicInjectionProductSection() {
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

      <AutoProductReference products={[]} cards={ACRYLIC_INJECTION_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Acrylic injection systems" pruneEmptyFacts />
    </>
  );
}
