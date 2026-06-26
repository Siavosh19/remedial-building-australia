"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { HOT_MELT_CARDS } from "./hotMeltData";

const TECH_INFO = {
  typicalApplications: [
    "Plaza / podium / parking-deck waterproofing under heavy overburden, pavers or trafficable build-ups",
    "Inverted (protected-membrane) roofs and green roofs — membrane below the insulation/overburden",
    "Planter boxes, reflective pools and other heavy wet/landscaped build-ups",
    "Below-grade and tanking applications (for the rubberised-asphalt systems rated for it)",
  ],
  selectionCriteria: [
    "Hot-melt systems are monolithic, fully-bonded and joint-free — best where lateral water tracking must be eliminated under overburden",
    "They are protected (covered) systems — confirm the overburden / protection / drainage build-up",
    "Hot application (≈160–185 °C) requires a kettle, temperature control and specialist applicators",
    "Confirm current Australian availability — several products are imported/specialist",
    "Confirm Class 2 (NCC) / AS 4654 applicability for the specific product and the protected assembly",
  ],
  limitations: [
    "Hot-applied at high temperature — specialist trade only, with hot-works controls",
    "Protected (covered) systems — not exposed/finished membranes on their own",
    "Heavy-duty deck systems — not for light/domestic tiled balconies",
    "Imported/specialist products — confirm current Australian availability and certification",
  ],
  standardsNotes: [
    "AS 4654.1 / .2 — Waterproofing membranes for external above-ground use — confirm applicability for the protected assembly",
    "Below-grade rubberised-asphalt systems are designed on hydrostatic head, not AS 4654",
    "EN / BBA / North-American certifications are not Australian certifications — confirm AU evidence",
    "Class 2 (NCC) — confirm the specific product's current Australian test evidence",
  ],
  suitableDefects: [
    "Plaza / podium / parking-deck waterproofing failure under overburden",
    "Inverted / green-roof membrane failure beneath insulation/landscaping",
    "Planter-box and reflective-pool waterproofing failure",
    "Heavy-duty trafficable deck waterproofing needing a monolithic system",
  ],
  typicalSubstrates: [
    "In-situ concrete decks and slabs — primed/prepared per the system",
    "Concrete planters, pools and below-grade walls",
    "Insulation boards (inverted assemblies) above the membrane",
    "Structural decks under heavy overburden / landscaping",
  ],
};

export function HotMeltIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are hot-melt rubberised-asphalt systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Hot-melt rubberised-asphalt (and traditional mastic-asphalt) systems are monolithic, hot-applied, fully-bonded waterproofing membranes — melted in a kettle and applied with reinforcing fabric and protection layers. Because they bond fully and have no joints, they are favoured under heavy overburden on plaza/podium decks, inverted (protected-membrane) roofs, green roofs, planters and below-grade. They are specialist, protected (covered) systems — not exposed finishes. Several products here are imported or specialist; confirm current Australian availability and the protected build-up.
        </p>
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-xs font-semibold leading-5 text-amber-800">
            Class 2 (NCC) — podium &amp; deck systems: confirm the specific product's current Australian test evidence (see the &ldquo;Class 2 / NCC tested&rdquo; field). EN / BBA / North-American certifications are not Australian certifications.
          </p>
        </div>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Monolithic hot-applied rubberised-asphalt / mastic-asphalt; reinforcing fabric + protection layers; protected (covered) assembly with overburden; hot application (≈160–185 °C) by specialist applicators; below-grade designed on hydrostatic head (not AS 4654); current Australian availability (several imported/specialist); Class 2 (NCC) / AS 4654 applicability for the specific product. Confirm every value against the current manufacturer source.";

export function HotMeltProductSection() {
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

      <AutoProductReference products={[]} cards={HOT_MELT_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Hot-melt rubberised-asphalt systems" pruneEmptyFacts />
    </>
  );
}
