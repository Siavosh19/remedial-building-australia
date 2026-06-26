"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { BACKER_ROD_CARDS } from "./backerRodData";

const TECH_INFO = {
  typicalApplications: [
    "Movement joints at internal angles and changes of plane in tiled balcony and wet-area surfaces",
    "Expansion joints in concrete balcony and podium decks before sealant application",
    "Perimeter joints at wall junctions and around fixtures and penetrations",
    "Saw-cut and rebated joints — bond-breaker tape where round rod cannot seat",
    "Joints around door thresholds and drain surrounds in waterproofed surfaces",
  ],
  selectionCriteria: [
    "Select backer-rod diameter ~25% larger than the joint width for a snug interference fit",
    "Target a sealant depth-to-width ratio around 1:1 to 1:2 — rod position sets this",
    "Use closed-cell foam by default — it does not absorb sealant",
    "Use bond-breaker tape for shallow, saw-cut or rebated flat-bottomed joints",
    "Confirm backer-rod and sealant chemistry compatibility with the sealant manufacturer",
  ],
  limitations: [
    "Omitting the rod or tape causes three-sided adhesion — the sealant splits at the joint base under movement",
    "Incorrect diameter is the most common error — undersized won't control depth, oversized bows the joint faces",
    "Open-cell foam absorbs sealant chemistry — use only where the sealant manufacturer permits it",
    "Bond-breaker tape is not a substitute for rod depth control in deep joints",
    "Tape with voids or lifted edges lets the sealant bond to the base at that point",
  ],
  standardsNotes: [
    "AS 3740 requires flexible sealant at all internal angles — backer rod achieves the correct sealant profile",
    "AS 4654.2 — movement-joint requirements at changes of plane in external wet areas",
    "ASTM C1330 — cylindrical sealant backing for cold liquid-applied sealants (commonly referenced)",
    "Sealant TDS specify backer-rod diameter selection and minimum sealant thickness for each product",
  ],
  suitableDefects: [
    "Failed sealant at internal angles split at the joint base from three-sided adhesion",
    "Cracked or debonded movement joints in tiled balcony / wet-area surfaces",
    "Expansion joints in concrete decks needing correct joint preparation before re-sealing",
    "Joints re-sealed without depth control, splitting under movement",
  ],
  typicalSubstrates: [
    "Ceramic and porcelain tile — joints at internal angles and perimeters",
    "Concrete — saw-cut and cast-in expansion joints",
    "Masonry — perimeter and movement joints at building-fabric junctions",
    "Aluminium — perimeter joints against window and door frames",
  ],
};

export function BackerRodIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are backer rod &amp; bond breaker tape?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Backer rod is a closed-cell polyethylene foam cylinder installed in a movement joint before sealant. It does two jobs: controlling sealant depth (maintaining the correct depth-to-width ratio) and preventing three-sided adhesion — where the sealant bonds to both joint faces and the base at once and tears at the base under cyclic movement instead of stretching at the faces. Backer rod is closed-cell only; open-cell foam absorbs sealant and defeats the purpose, and the diameter should be ~25% larger than the joint width for a snug interference fit. Bond-breaker tape is a self-adhesive polyethylene film used instead of round rod in shallow, saw-cut and rebated joints where rod cannot seat, giving the same bond-breaking function at a flat base.
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Closed-cell PE backer rod by default (does not absorb sealant); diameter ~25% larger than the joint width for a snug interference fit; sealant depth-to-width ratio around 1:1 to 1:2 set by rod position; bond-breaker tape for shallow / saw-cut / rebated joints where round rod cannot seat; open-cell rod only where the sealant manufacturer permits it. Omitting the rod or tape causes three-sided adhesion and joint-base splitting. Confirm diameter and chemistry compatibility against the current AU sealant manufacturer TDS.";

export function BackerRodProductSection() {
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

      <AutoProductReference products={[]} cards={BACKER_ROD_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Backer rod & bond breaker tape" pruneEmptyFacts />
    </>
  );
}
