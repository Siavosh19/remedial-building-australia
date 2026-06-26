"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { VCL_CARDS } from "./vclData";

const TECH_INFO = {
  typicalApplications: [
    "Warm-roof balcony/podium build-ups — VCL on the warm side of the insulation, below the membrane/overburden",
    "Controlling interstitial condensation in insulated roof and deck assemblies",
    "Airtightness layer in roof and wall build-ups",
    "Reflective VCLs to add radiant-heat control in the build-up",
  ],
  selectionCriteria: [
    "Place the VCL on the WARM side of the insulation (a VCL on the cold side traps moisture)",
    "Choose the vapour resistance for the assembly — fixed high-resistance (foil/poly) vs humidity-variable (intelligent)",
    "A breather membrane (vapour-permeable) is the opposite role to a VCL — do not confuse them",
    "Airtightness depends on taped/sealed laps and penetrations — specify the matched tapes",
    "Confirm the dew-point / condensation risk analysis for the build-up",
  ],
  limitations: [
    "A VCL is not a waterproofing membrane — it controls vapour/air, not bulk water",
    "Wrong side of the insulation, or unsealed laps, causes condensation",
    "Breather membranes and VCLs are opposite roles — confirm which the design needs",
    "Generic poly/foil specs vary — confirm the vapour-resistance class",
    "Performance depends on a continuous, taped, airtight installation",
  ],
  standardsNotes: [
    "Condensation management per the NCC / AS 4859 / a dew-point analysis for the assembly",
    "VCLs are characterised by sd-value / vapour resistance (fixed vs humidity-variable)",
    "Airtightness detailing (taped laps/penetrations) is part of the system performance",
    "VCLs are build-up components — not waterproofing membranes",
  ],
  suitableDefects: [
    "Interstitial condensation / damp insulation in warm-roof assemblies",
    "Air leakage and associated condensation in roof/wall build-ups",
    "Mould/condensation from a missing or wrongly-placed vapour control layer",
    "Poor thermal comfort where a reflective VCL would help",
  ],
  typicalSubstrates: [
    "Structural deck below the insulation (warm-roof build-up)",
    "Insulation boards (VCL on the warm face)",
    "Roof and wall framing / linings",
    "Junctions to adjacent airtight layers (taped)",
  ],
};

export function VCLIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are vapour control layers (warm roof)?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A vapour control layer (VCL) sits on the warm side of the insulation in a warm-roof balcony/podium build-up to limit water vapour driving into the assembly and condensing within it. VCLs range from fixed high-resistance poly/foil barriers to humidity-variable ('intelligent') membranes that also allow seasonal inward drying, and reflective metallised grades that add radiant-heat control. A VCL is not a waterproofing membrane and is the opposite role to a vapour-permeable breather — selection turns on vapour resistance for the assembly, airtight taped detailing, and a dew-point/condensation analysis.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "VCL on the WARM side of the insulation; vapour resistance for the assembly (fixed high-resistance foil/poly vs humidity-variable 'intelligent'); not to be confused with a vapour-permeable breather (opposite role); airtight taped laps/penetrations; dew-point/condensation analysis. A VCL controls vapour/air, not bulk water. Confirm every value against the current AU manufacturer TDS.";

export function VCLProductSection() {
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

      <AutoProductReference products={[]} cards={VCL_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Vapour control layers" pruneEmptyFacts />
    </>
  );
}
