"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { ROOT_RESISTANT_CARDS } from "./rootResistantData";

const TECH_INFO = {
  typicalApplications: [
    "Planter-box and raised-garden waterproofing where roots would attack a standard membrane",
    "Green / landscaped roofs and podium gardens",
    "Retaining walls and below-grade structures adjacent to planting",
    "Podium decks with soil/landscaped zones over occupied space",
  ],
  selectionCriteria: [
    "Confirm genuine root resistance — an inherent (PVC) barrier, a membrane additive, or a chemical inhibitor (e.g. Preventol B2) throughout the membrane and its laps",
    "Match the form to the build — sheet (heat-welded/loose-laid), liquid (single-component + anti-root additive), torch-on cap, or hot-melt",
    "Root resistance must be continuous — including overlaps, upstands and penetrations",
    "Confirm Class 2 (NCC) test evidence (AS 4654.1) for the specific product",
    "Confirm the protection/drainage/filter build-up over the membrane (planter assemblies)",
  ],
  limitations: [
    "Root resistance must be continuous through laps and details — a non-root flashing defeats it",
    "Liquid grades rely on the correct anti-root additive dosage",
    "Heat-welded/torch grades are installer-critical (and torch is not for heat-sensitive substrates)",
    "Below-grade/protected grades are not exposed-trafficable membranes",
    "Confirm the planter drainage and filter layers above the membrane",
  ],
  standardsNotes: [
    "AS 4654.1 / .2 — Waterproofing membranes for external above-ground use",
    "FLL root-resistance test — the international benchmark for anti-root membranes (confirm for the product)",
    "Class 2 (NCC) — specify only a membrane with current AU test evidence (CSIRO/BRANZ/NATA/CodeMark)",
    "Root resistance comes from inherent chemistry, an additive, or a chemical inhibitor — confirm the basis",
  ],
  suitableDefects: [
    "Root penetration of a planter or green-roof membrane",
    "Planter-box / raised-garden leaks into occupied space below",
    "Green-roof and podium-garden membrane failure",
    "Retaining-wall / below-grade ingress adjacent to planting",
  ],
  typicalSubstrates: [
    "In-situ concrete planters, podium decks and retaining walls",
    "Insulation (inverted/green-roof assemblies)",
    "Drainage / filter / protection layers above the membrane",
    "Prepared concrete and masonry upstands",
  ],
};

export function RootResistantIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are root-resistant membrane systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Root-resistant membranes waterproof planter boxes, green roofs and podium gardens where plant roots would attack and penetrate a standard membrane. Root resistance comes from the membrane's inherent chemistry (PVC), a dosed anti-root additive, or a chemical root inhibitor (e.g. Preventol B2) carried throughout the membrane and its overlaps. They come as heat-welded/loose-laid sheets, liquid membranes, torch-on caps and hot-melt systems. Selection turns on the basis of root resistance (and that it is continuous through laps/details), the form for the build-up, and the Class 2 (NCC) test evidence to AS 4654.1.
        </p>
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-xs font-semibold leading-5 text-amber-800">
            Class 2 (NCC) — planters, green roofs &amp; podiums: specify only a membrane with current Australian test certification (see the &ldquo;Class 2 / NCC tested&rdquo; field on each card). Root resistance must also be continuous through laps, upstands and penetrations.
          </p>
        </div>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Basis of root resistance (inherent PVC barrier / anti-root additive / chemical inhibitor) and that it is continuous through laps, upstands and penetrations; form (sheet / liquid / torch-on cap / hot-melt) for the build-up; protection/drainage/filter layers over the membrane; Class 2 (NCC) test evidence to AS 4654.1 (and FLL root-resistance where stated). Confirm every value against the current AU manufacturer TDS.";

export function RootResistantProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable defects and substrates
            </p>
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

      <AutoProductReference products={[]} cards={ROOT_RESISTANT_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Root-resistant membrane systems" pruneEmptyFacts />
    </>
  );
}
