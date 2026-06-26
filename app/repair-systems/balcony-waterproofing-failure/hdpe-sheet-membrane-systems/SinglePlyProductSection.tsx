"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { HDPE_MEMBRANE_CARDS } from "./pvcSheetCards";

const TECH_INFO = {
  typicalApplications: [
    "Exposed roof / podium waterproofing with a PVC single-ply sheet (mechanically fixed, bonded or ballasted)",
    "Large-area commercial roofs and podiums where hot-air-welded or self-adhesive single-ply suits",
    "Below-grade / blindside tanking with an HDPE-bentonite composite sheet",
    "Re-roofing over sound substrates with an accredited single-ply system",
  ],
  selectionCriteria: [
    "Confirm the duty — exposed single-ply roof membrane (AS 4654.1) vs below-grade tanking (different standard/design)",
    "Match install method to the product — loose-laid/mechanically fixed (IB), bonded self-adhesive (GWSK), or versatile (Cosmofin)",
    "Single-ply PVC systems are installer-critical — accredited applicators and welded/sealed laps are mandatory",
    "Confirm Class 2 (NCC) test evidence (NATA / CSIRO / BRANZ / CodeMark to AS 4654.1) — EN 13956 / CE is not AU certification",
    "Confirm the manufacturer/distributor warranty (e.g. Projex single-point) and the applicator accreditation it depends on",
    "Below-grade systems (bentonite/HDPE) are selected on hydrostatic head and blindside conditions, not AS 4654",
  ],
  limitations: [
    "Single-ply systems require trained, accredited applicators — not a DIY / general-trade install",
    "Hot-air-welded or self-adhesive laps must be made and tested correctly — seam failure is the main risk",
    "Below-grade bentonite/HDPE tanking is not an AS 4654 above-ground membrane",
    "EN 13956 / CE marking is European — confirm Australian AS 4654 certification separately",
    "Warranties typically depend on accredited installation and inspection",
  ],
  standardsNotes: [
    "AS 4654.1 / .2 — Waterproofing membranes for external above-ground use — for exposed single-ply roof membranes",
    "AS 4858 — Wet area membranes — referenced for some PVC sheet systems used in wet/balcony areas",
    "EN 13956 — European single-ply membrane standard (CE) — not an Australian certification",
    "NATA — National Association of Testing Authorities — Australian test accreditation (e.g. Wolfin/Cosmofin NATA-tested)",
    "Class 2 (NCC) — specify only a sheet with current AU test evidence (NATA/CSIRO/BRANZ/CodeMark)",
  ],
  suitableDefects: [
    "Exposed roof / podium membrane failure where a specified single-ply system is appropriate",
    "Large-area roof leaks suited to mechanically-fixed or ballasted single-ply",
    "Below-grade / blindside water ingress (bentonite/HDPE tanking)",
    "Re-roofing of aged systems with an accredited single-ply overlay",
  ],
  typicalSubstrates: [
    "In-situ and precast concrete decks — primed/prepared per the system",
    "Insulation boards (warm roof) — mechanically fixed or adhered single-ply",
    "Blindside / lagging walls and under-slab — below-grade tanking sheets",
    "Sound existing membranes — confirm overlay suitability with the manufacturer",
  ],
};

export function SinglePlyIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are PVC / HDPE single-ply sheet membrane systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          This category covers factory-made single-ply sheet systems — flexible PVC roof/podium membranes (loose-laid, self-adhesive or mechanically fixed) and HDPE-bentonite composite sheets for below-grade tanking. They are specified, accredited-applicator systems with welded or bonded laps and (for the PVC systems) long manufacturer warranties. Selection turns on the duty (exposed roof vs below-grade), install method, reinforcement, and the Class 2 (NCC) test evidence to AS 4654.1.
        </p>
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-xs font-semibold leading-5 text-amber-800">
            Class 2 (NCC) — balconies, roofs &amp; podiums: specify only a sheet with current Australian test certification (see the &ldquo;Class 2 / NCC tested&rdquo; field on each card). EN 13956 / CE marking is European, not an Australian certification.
          </p>
        </div>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Duty (exposed single-ply roof AS 4654.1 vs below-grade bentonite/HDPE tanking); membrane type (PVC vs HDPE-bentonite); thickness; reinforcement (polyester / glass fleece / glass non-woven); install method (loose-laid/mechanically fixed, bonded self-adhesive, ballasted, hot-air welded); applicator accreditation; Class 2 (NCC) test evidence (NATA/CSIRO/BRANZ/CodeMark — not EN/CE); manufacturer warranty. Confirm every value against the current AU manufacturer/distributor TDS.";

export function SinglePlyProductSection() {
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
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <AutoProductReference products={[]} cards={HDPE_MEMBRANE_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="PVC / HDPE single-ply sheet systems" pruneEmptyFacts />
    </>
  );
}
