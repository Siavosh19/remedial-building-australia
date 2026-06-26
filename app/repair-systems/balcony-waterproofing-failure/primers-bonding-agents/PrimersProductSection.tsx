"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { PRIMER_CARDS } from "./primersData";

const TECH_INFO = {
  typicalApplications: [
    "Priming concrete, screeds, renders and sheet substrates before a liquid or sheet membrane",
    "Moisture-barrier / DPM priming over green or damp concrete (two-part epoxy primers)",
    "Bitumen priming of substrates before torch-applied membranes",
    "Bonding agents / SBR latex for cementitious repairs, screeds, renders and slurry primers",
    "High-bond slurry priming of immersed, subterranean, pool and tank areas",
  ],
  selectionCriteria: [
    "Match the primer chemistry to the membrane — water-based acrylic for water-based membranes, bitumen primer for torch membranes, epoxy for moisture barriers",
    "Use a two-part epoxy moisture barrier (e.g. WPM 300) over green/damp concrete or where hydrostatic pressure is present",
    "Use a bitumen primer (solvent) only under torch-applied bitumen systems — confirm ventilation",
    "SBR latex / bonding agents are for cementitious bond coats and admixtures, not as a membrane primer for liquid systems",
    "Confirm substrate suitability, coverage and the overcoat/recoat window for the specific membrane",
  ],
  limitations: [
    "Missing or incorrect primer is the leading cause of membrane delamination — never omit it",
    "Solvent / bitumen primers need ventilation and flammability controls",
    "Bonding agents / admixtures are not waterproof membranes on their own",
    "Two-part epoxy primers have a pot life — mix and use within the window",
    "Confirm the membrane manufacturer's approved primer — cross-brand priming must be confirmed",
  ],
  standardsNotes: [
    "Primers are system components — they are specified by the membrane manufacturer's system, not independently certified to AS 4858 / AS 4654",
    "AS/NZS 4020 — some epoxy barrier primers (e.g. WPM 300) are potable-water compliant",
    "Always use the membrane manufacturer's nominated/approved primer for warranty and certification",
    "Confirm VOC for enclosed/occupied spaces (solvent vs water-based)",
  ],
  suitableDefects: [
    "Membrane delamination caused by missing/incorrect priming",
    "Green/damp concrete preventing membrane application (moisture-barrier primer)",
    "Poor bond of repair mortars / screeds / renders (SBR / epoxy bonding agents)",
    "Porous / dusty substrates needing sealing before the membrane",
  ],
  typicalSubstrates: [
    "In-situ and precast concrete — primed per the membrane system",
    "Cement screeds and renders (incl. green/young — moisture-tolerant primers)",
    "Fibre-cement sheet, marine plywood and timber (acrylic primers)",
    "Existing cementitious surfaces (bonding agents) and AAC (moisture-tolerant primers)",
  ],
};

export function PrimersIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are waterproofing primers and bonding agents?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Primers and bonding agents are the preparation layer of a waterproofing system — they seal porous substrates, create the bond between the substrate and the membrane, control substrate moisture, or improve the adhesion and strength of cementitious repairs. They include water-based acrylic primers, two-part epoxy moisture barriers (DPM), solvent bitumen primers for torch membranes, and SBR-latex bonding agents/admixtures. The right primer is membrane-specific — missing or incorrect priming is the leading cause of membrane delamination, so always use the membrane manufacturer's nominated primer.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Primer chemistry matched to the membrane (water-based acrylic / 2-part epoxy moisture barrier / solvent bitumen / SBR latex bonding agent); function (porous-substrate seal, moisture barrier/DPM, torch-membrane primer, cementitious bond coat); substrate suitability and moisture tolerance; coverage and recoat/overcoat window; the specific membranes it primes. Always use the membrane manufacturer's nominated primer; confirm every value against the current AU TDS.";

export function PrimersProductSection() {
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

      <AutoProductReference products={[]} cards={PRIMER_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Primers & bonding agents" pruneEmptyFacts />
    </>
  );
}
