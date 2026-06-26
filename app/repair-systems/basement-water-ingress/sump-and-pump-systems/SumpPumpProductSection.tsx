"use client";

import { useState } from "react";
import { BookOpen, Layers, Ruler, SquareStack, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { SUMP_PUMP_CARDS } from "./sumpPumpData";

const TECH_INFO = {
  typicalApplications: [
    "Primary sump pump in a cavity drain basement waterproofing system — automatically discharges accumulated groundwater from the sump pit",
    "Backup sump pump — installed alongside the primary automatic pump — activates via high-water alarm if the primary pump fails",
    "Emergency basement dewatering — pump on standby for manual activation during a flooding event",
    "Below-grade car park sump drainage — continuous-duty sump pump for car park drainage sumps",
  ],
  selectionCriteria: [
    "Primary automatic pump: specify Grundfos Unilift AP 35.40.08 or DAB Feka VS 550 T-NA — an automatic float switch is required for unattended primary operation",
    "Backup pump: specify Grundfos Unilift KP 150-A-1 or a second AP — the backup must be in the sump pit ready to activate (do not rely on a pump stored off-site)",
    "Pump sizing: calculate groundwater inflow from the cavity drain design and select a pump with capacity at least 1.5× peak inflow — hydraulic engineer confirmation recommended",
    "Motor size: ~150–300 W suits light residential drainage; ~350–550 W for a higher water table or larger basement footprint",
    "High-water alarm: install an independent high-water alarm at the sump — essential for a BS 8102 Grade 3 cavity drain design",
  ],
  limitations: [
    "Pump failure in an unattended sump without backup will overflow the sump and admit water to habitable space — a backup pump is mandatory",
    "Float switch failure is the most common failure mode — the float switch must be tested at each maintenance inspection",
    "Discharge routing — pump discharge must go to an approved point (stormwater drain / charged pit / to ground per council approval) — not to sewer without approval",
    "Mains-power dependent — a power outage during an extreme weather event is the highest-risk scenario — provide battery backup or a generator for Grade 3 applications",
    "Ongoing maintenance obligation — the strata OC is responsible for sump pump maintenance under a cavity drain system — include it in the strata maintenance schedule",
    "The pump alone is not a cavity drain system — the complete system also requires the membrane, perimeter channel and sump liner; the pump is the active discharge component only",
  ],
  standardsNotes: [
    "AS/NZS 3000 Wiring Rules — sump pump installation must comply with electrical wiring regulations — a licensed electrician for installation and connection",
    "AS/NZS 4020 Materials in contact with drinking water — not applicable to sump drainage pumps handling (non-potable) groundwater",
    "BS 8102:2022 — performance-grade requirements for below-ground waterproofing — Grade 3 requires a reliable active discharge system (backup pump + alarm mandatory)",
    "NCC Volume One — habitable basement space performance requirements — the active sump system must be reliably maintained for an occupied basement",
    "Strata maintenance obligations — the strata OC maintenance schedule must include periodic sump pump inspection and test",
  ],
  suitableDefects: [
    "Cavity drain system installation — the active discharge component for all cavity drain membrane systems",
    "Existing sump pump replacement — upgrade a failed or undersized pump in an existing cavity drain or car park sump",
    "New basement conversion — sump and pump installation as part of a complete below-grade habitable space waterproofing system",
  ],
  typicalSubstrates: [
    "Sump pit — precast concrete or proprietary sump liner — the submersible pump sits in the sump base",
    "Polypropylene or HDPE sump liner — chemical-resistant liner compatible with the drainage water chemistry",
    "Cast in-situ concrete sump pit — confirm the liner is smooth and of adequate depth for float-switch operation",
  ],
};

export function SumpPumpIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are sump &amp; pump systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A sump and pump system is the active discharge component of a cavity drain (BS 8102 Type C) basement: water drained behind the wall and floor membranes collects in a sump pit and is automatically pumped out by a submersible pump on a float switch. It is what makes a drained basement work — without reliable pumping the sump overflows and water enters the habitable space.
        </p>
        <p>
          For habitable (Grade 3) basements a backup pump and an independent high-water alarm are mandatory, the pump must be sized to at least 1.5× the peak inflow, and battery / generator backup is recommended because the system depends on mains power. Discharge must be routed to an approved point, and the strata owners' corporation carries an ongoing maintenance obligation (test the float switch at every inspection).
        </p>
      </div>
    </div>
  );
}

const DESIGN_CRITERIA =
  "Confirm the BS 8102 grade (Grade 3 = backup pump + high-water alarm mandatory); the pump role (primary automatic vs backup); flow / head against ≥1.5× peak inflow from the cavity drain design; free passage / solids handling; automatic float switch and thermal protection; discharge to an approved point; power resilience (battery / generator for Grade 3); and the strata maintenance plan. Confirm every value against the current manufacturer datasheet.";

export function SumpPumpProductSection() {
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

      <AutoProductReference products={[]} cards={SUMP_PUMP_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Sump & pump systems" pruneEmptyFacts />
    </>
  );
}
