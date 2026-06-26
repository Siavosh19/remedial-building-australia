// ──────────────────────────────────────────────────────────────────────────────
// Vapour control layers (warm-roof build-ups). Building films on the warm side of
// the insulation to control vapour/condensation. System components → no Class-2 /
// warranty field. Values from the manufacturer source; empty facts pruned.
// appInfo columns: Type · Function · Vapour / air control · Use · Notes.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Function", "Vapour / air control", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const VCL_CARDS: RefCard[] = [
  {
    brand: "Kingspan Insulation Australia", rangeName: "Kingspan Nilvent",
    shortType: "Breathable / non-tenting waterproof underlay membrane",
    badges: [{ label: "Breathable membrane", tone: "navy" }],
    appInfo: kp([
      "Breathable (vapour-permeable) waterproof membrane",
      "Waterproof, airtight, non-tenting underlay/breather layer",
      "Vapour-permeable; airtight at normal building pressures",
      "Unventilated pitched roofs and timber-frame walls",
      "",
    ]),
    bestFor: [
      "Waterproof, airtight, non-tenting breathable membrane for unventilated pitched roofs and timber-frame walls",
      "Vapour-permeable so the assembly can dry outward",
    ],
    avoidWhere: ["As a high-resistance vapour BARRIER (it is vapour-permeable) — use a VCL/foil where a barrier is required"],
    warnings: ["Confirm whether the design needs a vapour-permeable breather or a high-resistance VCL (they are opposite roles)", "Confirm AU specification and laps against the current Kingspan TDS"],
    advanced: { description: "Kingspan Nilvent is a breathable (vapour-permeable), waterproof, airtight, non-tenting membrane for unventilated pitched roofs and timber-frame walls — it lets the assembly dry outward rather than acting as a high-resistance vapour barrier.", designCriteria: "", techData: [
      { label: "Type", value: "Breathable waterproof membrane", source: "kingspan Nilvent" },
      { label: "Function", value: "Airtight, non-tenting, vapour-permeable", source: "kingspan Nilvent" },
    ] },
  },
  {
    brand: "DuPont / Tyvek", rangeName: "DuPont Tyvek AirGuard Reflective",
    shortType: "Metallised airtight vapour control layer (low-emissivity)",
    badges: [{ label: "VCL (metallised)", tone: "navy" }, { label: "Low-emissivity", tone: "blue" }],
    appInfo: kp([
      "Metallised airtight vapour control layer (VCL)",
      "Airtight vapour control + radiant-heat reflection",
      "100% airtight; high vapour resistance; reflects up to 95% radiant heat",
      "Warm side of insulation — roofs, ceilings and walls",
      "Seal laps/penetrations with Tyvek Metallised Tape",
    ]),
    bestFor: [
      "100% airtight VCL with a low-emissivity metallised face — high vapour resistance plus up to 95% radiant-heat reflection",
      "Improves thermal comfort and controls interstitial condensation in warm-roof build-ups",
    ],
    avoidWhere: ["On the cold side of the insulation (a VCL goes on the warm side)"],
    warnings: ["Seal all laps, penetrations and cuts with Tyvek Metallised Tape — airtightness depends on it", "Confirm the AU product and vapour resistance against the current DuPont/Tyvek TDS"],
    advanced: { description: "DuPont Tyvek AirGuard Reflective is a robust, 100% airtight vapour control layer with a metallised low-emissivity surface that reflects up to 95% of radiant heat, installed on the warm side of the insulation in roofs, ceilings and walls. Seal all laps, penetrations and cuts with Tyvek Metallised Tape.", designCriteria: "", techData: [
      { label: "Type", value: "Metallised airtight VCL (low-emissivity)", source: "dupont Tyvek AirGuard Reflective" },
      { label: "Function", value: "Airtight vapour control + reflects ~95% radiant heat", source: "dupont Tyvek AirGuard Reflective" },
    ] },
  },
  {
    brand: "Pro Clima / Rothoblaas", rangeName: "Pro Clima DB+",
    shortType: "Humidity-variable (intelligent) vapour control membrane",
    badges: [{ label: "Intelligent VCL", tone: "navy" }],
    appInfo: kp([
      "Humidity-variable (intelligent) vapour control membrane",
      "Variable vapour control — higher resistance in winter, open in summer",
      "Variable vapour resistance (sd-value changes with humidity)",
      "Warm side of insulation in roofs and walls",
      "Confirm current Australian distributor/availability",
    ]),
    bestFor: [
      "Humidity-variable 'intelligent' VCL — high vapour resistance in winter, more open in summer to allow inward drying",
      "Suited to assemblies that need to dry in both directions seasonally",
    ],
    avoidWhere: ["Where a fixed high-resistance barrier/foil is specified"],
    warnings: ["Confirm the current Australian distributor and availability", "Airtight detailing and the correct Pro Clima tapes are essential to performance"],
    advanced: { description: "Pro Clima DB+ is a humidity-variable ('intelligent') vapour control membrane whose vapour resistance changes with humidity — higher in winter to limit vapour drive, more open in summer to allow inward drying — installed on the warm side of the insulation in roofs and walls. Confirm the current Australian distributor and availability.", designCriteria: "", techData: [
      { label: "Type", value: "Humidity-variable (intelligent) VCL", source: "pro clima DB+ (confirm AU)" },
      { label: "Function", value: "Variable vapour control (seasonal drying)", source: "pro clima DB+ (confirm AU)" },
    ] },
  },
  {
    brand: "Generic", rangeName: "Heavy-Duty Polyethylene / Foil VCL",
    shortType: "Polyethylene / foil vapour barrier (commodity)",
    badges: [{ label: "Poly / foil VCL", tone: "navy" }],
    appInfo: kp([
      "Heavy-duty polyethylene / foil-faced vapour barrier",
      "High-resistance vapour barrier (fixed)",
      "High vapour resistance; confirm sd / class for the design",
      "Warm side of insulation in roofs/walls",
      "Generic format — confirm product specification & class",
    ]),
    bestFor: [
      "Low-cost high-resistance polyethylene / foil vapour barrier on the warm side of insulation",
    ],
    avoidWhere: ["Assemblies needing variable/seasonal drying (use an intelligent VCL)", "Where a documented vapour-resistance class is required and the generic spec is unknown"],
    warnings: ["Generic product — confirm the specific product, thickness and vapour-resistance class before specifying", "Seal all laps and penetrations to achieve continuity"],
    advanced: { description: "A heavy-duty polyethylene or foil-faced vapour barrier is a low-cost, high-resistance (fixed) vapour control layer placed on the warm side of the insulation in roof/wall build-ups. Confirm the specific product, thickness and vapour-resistance class, and seal all laps/penetrations for continuity.", designCriteria: "", techData: [
      { label: "Type", value: "Polyethylene / foil vapour barrier", source: "generic — confirm product" },
      { label: "Function", value: "Fixed high-resistance vapour barrier", source: "generic — confirm product" },
    ] },
  },
];
