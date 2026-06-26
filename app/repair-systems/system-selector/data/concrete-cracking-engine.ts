// ─────────────────────────────────────────────────────────────────────────────
// System Selector — Concrete Cracking engine
//
// Bespoke gate logic (per the cracking spec): live vs dormant, width, moisture,
// orientation, exposure and stitching drive a 4-stage system + flagged advisories.
// Hard gates are never crossed:
//   • live    → never epoxy rigid injection
//   • dormant → never PU flexible injection
//   • surface → no injection at all (sealant only)
//   • wet / actively-leaking → never epoxy (route to PU)
// Stage outputs reference the existing concrete-cracking library pages; product
// cards are pulled live via CRACKING_SELECTOR_CARDS (no content invented here).
// ─────────────────────────────────────────────────────────────────────────────

import type {
  Question, Demand, SelectorOutput, SelectorCategory, ProductResult, StageResult, Advisory, AiStage1,
} from "./selector-core";

export const CC_QUESTIONS: Question[] = [
  {
    key: "crack_activity",
    prompt: "Is the crack active or dormant?",
    help: "Active cracks are still moving. Dormant cracks have stopped.",
    options: [
      { value: "live", label: "Active / live", hint: "Still moving, opening or subject to ongoing movement" },
      { value: "dormant", label: "Dormant / stable", hint: "No movement — crack has stabilised" },
    ],
  },
  {
    key: "structural_role",
    prompt: "Does the crack affect structural capacity?",
    help: "Structural cracks cross load-carrying sections — beams, slabs, columns.",
    options: [
      { value: "structural", label: "Structural", hint: "Crosses a load-carrying member — tensile continuity lost" },
      { value: "non-structural", label: "Non-structural", hint: "Cosmetic or serviceability only — no load path affected" },
    ],
  },
  {
    key: "crack_width",
    prompt: "How wide is the crack?",
    help: "Measure at the widest visible point.",
    options: [
      { value: "hairline", label: "Hairline — under 0.2 mm", pillLabel: "Hairline", hint: "Fine surface crack, barely visible" },
      { value: "fine", label: "Fine — 0.2 to 1 mm", pillLabel: "Fine", hint: "Visible crack, injectable width" },
      { value: "wide", label: "Wide — 1 to 5 mm", pillLabel: "Wide", hint: "Clear opening, may require stitching" },
      { value: "surface", label: "Surface seal only", pillLabel: "Surface seal only", hint: "No injection — surface route and seal" },
    ],
  },
  {
    key: "moisture_condition",
    prompt: "What is the moisture condition at the crack?",
    help: "Check at the crack face, not just the surface.",
    options: [
      { value: "dry", label: "Dry", hint: "No moisture visible in or around the crack" },
      { value: "damp", label: "Damp", hint: "Moisture present but no active flow" },
      { value: "wet", label: "Wet / seeping", hint: "Moisture seeping slowly through crack" },
      { value: "actively-leaking", label: "Actively leaking", hint: "Water flowing through under pressure" },
    ],
  },
  {
    key: "orientation",
    prompt: "What is the orientation of the crack?",
    help: "The face where the treatment will be applied.",
    options: [
      { value: "vertical", label: "Vertical", hint: "Wall, column or beam face" },
      { value: "horizontal", label: "Horizontal", hint: "Slab top or floor surface" },
      { value: "overhead", label: "Overhead (soffit)", hint: "Underside of slab or beam" },
      { value: "joint", label: "Joint / construction joint", pillLabel: "Joint", hint: "Control joint, construction joint or formed joint" },
    ],
  },
  {
    key: "exposure",
    prompt: "What is the exposure environment?",
    help: "AS 3600 exposure classification, in plain terms.",
    options: [
      { value: "sheltered", label: "Sheltered / internal", hint: "A1–A2 — indoor, protected" },
      { value: "moderate", label: "Moderate / external", hint: "B1 — external, non-coastal" },
      { value: "coastal", label: "Coastal / high-chloride", hint: "B2–C2 — marine, de-icing salt, splash" },
    ],
  },
  {
    key: "stitching_required",
    prompt: "Is structural crack stitching required?",
    help: "Engineer's assessment — bars anchored across the crack plane.",
    options: [
      { value: "yes", label: "Yes — stitching bars required", pillLabel: "Stitching required", hint: "Wide or structural crack needing bar anchors" },
      { value: "no", label: "No — injection or seal only", pillLabel: "No stitching", hint: "No stitching — resin or sealant treatment only" },
    ],
  },
];

const EMPTY_STAGE1: AiStage1 = { headers: [], rows: [], json: { category: "", stage1_gates: {} } };

const ccCat = (slug: string, displayName: string): SelectorCategory => ({
  slug,
  displayName,
  repairStage: slug,
  href: `/repair-systems/concrete-cracking/${slug}`,
  stage1: EMPTY_STAGE1,
  stage2: {},
});

const ccProd = (name: string, source: string): ProductResult => ({
  name, id: name, selectable: true, dataStatus: "confirmed", score: 0, matchedGates: [], failedGates: [], source,
});

const stage = (key: string, label: string, category: SelectorCategory, product: ProductResult, cardNote: string): StageResult => ({
  stage: key,
  label,
  passingCategories: [],
  alternativeCategories: [],
  recommended: { category, product, why: [] },
  options: [],
  cardNote,
});

export function runSelectorCC(d: Demand): SelectorOutput {
  const stages: StageResult[] = [];
  const surface = d.crack_width === "surface";
  const wetOrLeak = d.moisture_condition === "wet" || d.moisture_condition === "actively-leaking";
  // Any moisture present at the crack face (damp / wet / actively-leaking).
  const moisturePresent =
    d.moisture_condition === "damp" || d.moisture_condition === "wet" || d.moisture_condition === "actively-leaking";

  // ── STAGE 1 — INJECTION RESIN (skipped entirely when surface-seal only) ──
  if (!surface) {
    // Epoxy rigid: dormant AND dry (rigid epoxy will not bond in the presence of moisture).
    const epoxy = d.crack_activity === "dormant" && d.moisture_condition === "dry";
    // PU flexible (moisture-tolerant): live cracks, or any crack with moisture present.
    const pu = d.crack_activity === "live" || moisturePresent;

    if (epoxy) {
      stages.push(stage(
        "injection-epoxy",
        "Crack injection — rigid epoxy resin",
        ccCat("injection-resins-epoxy-rigid", "Epoxy Rigid Injection Resins"),
        ccProd("Sika Sikadur-52 AU (Normal)", "aus.sika.com TDS"),
        "Crack injection ports required — see reference page for port selection and spacing. Minimum crack width for epoxy injection: 0.2 mm.",
      ));
    } else if (pu) {
      stages.push(stage(
        "injection-pu",
        "Crack injection — flexible PU resin",
        ccCat("injection-resins-pu-flexible", "PU Flexible Injection Resins"),
        ccProd("Sika Injection-111 (+ Injection-111C)", "aus.sika.com TDS"),
        "Crack injection ports required — see reference page for port selection and spacing.",
      ));
    }
  }

  // ── STAGE 2 — JOINT SEALANT ──
  const sealant =
    surface ||
    d.orientation === "joint" ||
    (d.crack_activity === "live" && d.structural_role === "non-structural");
  if (sealant) {
    stages.push(stage(
      "sealant",
      "Joint sealant / surface seal",
      ccCat("sealants-polyurethane", "PU Joint Sealants"),
      ccProd("Sika Sikaflex-11FC", "aus.sika.com TDS"),
      "Closed-cell PE backer rod required at correct depth:width ratio (1:2) before sealant application — see backer rods reference page.",
    ));
  }

  // ── STAGE 3 — EPOXY ANCHORING / CRACK STITCHING ──
  if (d.stitching_required === "yes") {
    stages.push(stage(
      "anchoring",
      "Crack stitching — epoxy anchoring adhesive",
      ccCat("epoxy-anchoring-adhesives", "Epoxy Anchoring Adhesives"),
      ccProd("Hilti HIT-RE 500 V3", "hilti.com.au TDS"),
      "Stitching bar design, spacing, and embedment depth must be confirmed by a structural engineer to AS 5216.",
    ));
  }

  // ── STAGE 3b — CRACK STITCHING (proprietary stitch — DORMANT cracks only) ──
  // Rigid once cured — only suitable after movement has stopped. Never on a live crack.
  if (d.stitching_required === "yes" && d.crack_activity === "dormant") {
    stages.push(stage(
      "crack-stitching",
      "Crack stitching — proprietary stitch",
      ccCat("crack-stitching", "Crack Stitching (Proprietary)"),
      ccProd("Ardex Concrete Crack Lock (CCL)", "Ardex Australia TDS — CONFIRM"),
      "Dormant cracks only. Stitch size, number, spacing and embedment are engineer-determined to ACI 224.1R / AS 3600 — there is no crack-width → size lookup.",
    ));
  }

  // ── STAGE 4 — REPAIR MORTAR (post-stitching gap fill only) ──
  if (d.stitching_required === "yes" && d.structural_role === "structural" && d.crack_width === "wide") {
    stages.push(stage(
      "repair-mortar",
      "Repair mortar — crack-gap fill",
      ccCat("repair-mortars-polymer-modified", "Polymer-Modified Repair Mortars"),
      ccProd("Sika MonoTop-352NFG", "aus.sika.com TDS"),
      "For surface fill of crack gap after stitching — concrete substrates only. Not for masonry or heritage brick.",
    ));
  }

  // ── STAGE 5 — CFRP STRENGTHENING (structural continuity / flexural-shear across the crack) ──
  if (d.structural_role === "structural" && (d.crack_activity === "live" || d.crack_width === "wide")) {
    stages.push(stage(
      "cfrp-strengthening",
      "CFRP strengthening across the crack",
      ccCat("cfrp-strips-laminates", "CFRP Strips & Laminates"),
      ccProd("Sika CarboDur S", "aus.sika.com TDS — CONFIRM"),
      "Externally-bonded CFRP to restore tensile continuity / flexural-shear capacity across the cracked member. Scheme must be designed by a structural engineer to ACI 440.2R / AS 5100.8.",
    ));
  }

  // ── ADVISORY BLOCKS (flagged cards, not product stages) ──
  const advisories: Advisory[] = [];
  if (d.structural_role === "structural" && d.crack_activity === "live") {
    advisories.push({
      severity: "critical",
      title: "Structural engineer required",
      body: "A live crack in a structural member indicates ongoing movement that must be diagnosed and arrested before any injection treatment. Do not inject a live structural crack without engineering investigation.",
    });
  }
  // Dormant crack with moisture present → PU (moisture-tolerant) was selected; flag the anomaly.
  if (d.crack_activity === "dormant" && moisturePresent) {
    advisories.push({
      severity: "critical",
      title: "Anomalous condition — engineer review required",
      body: "This crack is reported as dormant but moisture is present at the crack face. A flexible PU injection resin has been selected as it is moisture-tolerant — however a dormant wet crack may indicate ongoing moisture ingress from a hidden source. Verify the source of moisture before specifying. Do not inject with rigid epoxy in the presence of moisture.",
    });
  }
  // Active crack + stitching requested → proprietary stitch is unsuitable; flag it.
  if (d.crack_activity === "live" && d.stitching_required === "yes") {
    advisories.push({
      severity: "warning",
      title: "Proprietary stitching not suitable for active cracks",
      body: "Carbon-fibre and steel stitching dogs are bonded permanently into a routed slot and are only appropriate after crack movement has completely stopped. This crack has been reported as active/live. Stitching design must be confirmed by a structural engineer once movement is arrested.",
    });
  }
  if (d.crack_width === "hairline" && wetOrLeak) {
    advisories.push({
      severity: "warning",
      body: "Hairline cracks under 0.2 mm are below the practical minimum for pressure injection of most resins. Consider surface-applied crystalline waterproofing or confirm crack width with a feeler gauge before specifying injection.",
    });
  }

  return { stages, advisories };
}
