"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { TERMINATION_BAR_CARDS } from "./terminationBarData";

const TECH_INFO = {
  typicalApplications: [
    "Top-edge termination of liquid membranes at upstand and parapet walls on balconies",
    "Termination of membrane turn-ups at door thresholds and window sill upstands",
    "Mechanically securing the membrane edge where adhesion-only termination is not appropriate",
    "Sealing and detailing at terminations and junctions with accessory tapes",
  ],
  selectionCriteria: [
    "Aluminium bar for standard external balcony and wet-area environments",
    "Stainless steel in corrosive marine, coastal or industrial environments",
    "Match the bar to the required membrane turn-up height at the upstand",
    "Confirm fixing centres and screw type against the substrate (solid concrete vs hollow masonry)",
    "Top-edge sealant must be compatible with both the bar material and the membrane",
  ],
  limitations: [
    "A termination bar alone does not waterproof the joint — the top-edge sealant is a maintenance joint that degrades over time",
    "An incorrectly fixed bar (not level, wrong height, under-fixed) compromises the turn-up and sealant joint",
    "Insufficient membrane lap behind the bar flange allows water ingress behind the termination",
    "The membrane must still be lapped to the required turn-up height behind the bar",
    "Fixings and bar material must suit the environment to avoid galvanic / corrosion issues",
  ],
  standardsNotes: [
    "Membrane turn-up height at upstands per AS 4654.2 and the membrane manufacturer's specification",
    "Wet-area upstand and termination detailing per AS 3740 where applicable",
    "The termination detail is part of the membrane system — match the manufacturer's accessory",
    "Top-edge sealant is a maintenance joint requiring periodic inspection",
  ],
  suitableDefects: [
    "Membrane lifting or delaminating from the wall at the top edge of the termination",
    "Water ingress behind the membrane at an inadequately sealed wall termination",
    "New waterproofing needing a mechanical termination detail at upstands",
    "Adhesion-only edge terminations that have failed",
  ],
  typicalSubstrates: [
    "Concrete in-situ and precast upstand and parapet walls",
    "Brick and blockwork masonry upstand walls",
    "Rendered substrates (confirm render adhesion before fixing)",
    "Fibre-cement sheet upstands (confirm thickness and fixing)",
  ],
};

export function TerminationBarsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are membrane termination bars &amp; accessories?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Membrane termination bars mechanically secure the top edge of a liquid-applied membrane where its turn-up meets an upstand, parapet, threshold or sill — fixed with screws and plugs at regular centres, with a bead of sealant at the top as a maintenance joint. They are commonly aluminium for standard external balconies, or stainless steel in corrosive marine and industrial environments, and are supported by accessory detailing tapes. The bar does not waterproof the joint on its own — the membrane lapped behind it does — so selection turns on the bar material for the environment, the turn-up height, and the fixing and sealant compatibility.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Bar material for the environment (aluminium for standard external balconies; stainless steel in corrosive marine / industrial settings); bar matched to the required membrane turn-up height; fixing centres and screw type suited to the substrate (solid concrete vs hollow masonry); top-edge sealant compatible with the bar and the membrane (a maintenance joint); membrane fully lapped behind the bar flange. The bar does not waterproof the joint on its own — confirm every value against the current AU manufacturer data.";

export function TerminationBarsProductSection() {
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

      <AutoProductReference products={[]} cards={TERMINATION_BAR_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Membrane termination bars & accessories" pruneEmptyFacts />
    </>
  );
}
