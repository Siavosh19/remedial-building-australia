"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { TAPERED_INSULATION_CARDS } from "./taperedInsulationData";

const TECH_INFO = {
  typicalApplications: [
    "Creating drainage falls within the insulation layer of a warm-roof podium or roof deck, avoiding a concrete falls screed",
    "Warm-roof build-ups below single-ply (PVC/FPO/TPO) or bituminous waterproofing membranes",
    "Inverted (protected-membrane) roofs — moisture-resistant board above the membrane (XPS)",
    "Non-combustible roof build-ups where mineral wool is specified by the fire engineer / NCC",
  ],
  selectionCriteria: [
    "Confirm warm-roof (below-membrane) vs inverted (above-membrane) position — it drives the material choice",
    "Choose the material for the duty — PIR for high thermal performance, XPS for moisture-resistant / inverted, mineral wool for non-combustible",
    "Order a project-specific tapered layout design (board positions, thicknesses, ridges, valleys) to achieve the required fall",
    "Match the board facing to the membrane above (single-ply vs bituminous)",
    "Confirm compressive strength against the paver/ballast/traffic loading above",
  ],
  limitations: [
    "PIR is for warm-roof (below-membrane) use — it absorbs moisture in permanently wet above-membrane positions",
    "Tapered XPS and tapered mineral wool are less commonly stocked in Australia than tapered PIR",
    "A project-specific layout cannot be re-cut on site to a different plan — confirm lead times",
    "XPS and mineral wool need more thickness than PIR for the same R-value",
    "Most are supplied within a system / by a design service rather than as a loose commodity board",
  ],
  standardsNotes: [
    "Falls and drainage design to direct water to the outlets (hydraulic / roofing design)",
    "Thermal performance characterised by lambda (W/mK) and the assembled R-value",
    "A VCL is required in warm-roof assemblies over habitable space — confirm with the manufacturer",
    "Tapered insulation is a build-up component — not a waterproofing membrane",
  ],
  suitableDefects: [
    "Ponding on a flat roof or podium deck with inadequate falls",
    "Warm-roof build-ups lacking falls within the insulation layer",
    "Insulation moisture / interstitial condensation from wrong board choice or missing VCL",
    "Fire compliance needing non-combustible insulation in the roof build-up",
  ],
  typicalSubstrates: [
    "Structural concrete roof and podium decks (warm-roof build-up below the membrane)",
    "Cured waterproofing membrane (XPS above the membrane in an inverted roof)",
    "Roof decks requiring falls without a concrete falls screed",
    "Existing sound roofs / insulation in over-roofing applications",
  ],
};

export function TaperedInsulationIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are tapered insulation board systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Tapered (falls) insulation boards create drainage falls within the insulation layer of a warm-roof podium or roof build-up, so water runs to the outlets without a separate concrete falls screed. They range from high-performance PIR boards (Kingspan Thermataper, Recticel, Fatra, Bauder) cut to a bespoke project layout, through closed-cell XPS for moisture-resistant and inverted-roof positions, to non-combustible mineral wool where the fire engineer or NCC requires it. Selection turns on the warm-roof vs inverted position, the material for the duty, a project-specific tapered layout to achieve the fall, and the facing/compatibility with the membrane above. Confirm every value against current Australian manufacturer data.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Warm-roof (below-membrane) vs inverted (above-membrane) position; material for the duty (PIR for high thermal performance, XPS for moisture-resistant / inverted, mineral wool for non-combustible); a project-specific tapered layout design to achieve the required fall to the outlets; facing/compatibility with the membrane above; compressive strength for the loading; a VCL in warm-roof assemblies over habitable space. Tapered insulation is a build-up component, not a waterproofing membrane — confirm every value against the current AU manufacturer data.";

export function TaperedInsulationProductSection() {
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

      <AutoProductReference products={[]} cards={TAPERED_INSULATION_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Tapered insulation board systems" pruneEmptyFacts />
    </>
  );
}
