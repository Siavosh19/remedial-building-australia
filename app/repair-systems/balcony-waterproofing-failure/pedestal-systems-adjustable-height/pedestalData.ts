// Adjustable-height pedestal systems (raised floors over podium/roof membranes).
// Hardware → no Class-2 / warranty field. Lighter treatment: selection facts, no
// fabricated numbers (specifics pruned where not known). appInfo columns:
// Type · Adjustment / height · Load / use · Material · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";
const KEYS = ["Type", "Adjustment / height", "Load / use", "Material", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const PEDESTAL_CARDS: RefCard[] = [
  {
    brand: "Buzon / Pasco", rangeName: "Buzon DPH Series",
    shortType: "Screwjack adjustable paver/decking pedestal with slope corrector",
    badges: [{ label: "Adjustable pedestal", tone: "navy" }, { label: "Built-in slope corrector", tone: "blue" }],
    appInfo: kp([
      "Screwjack adjustable pedestal", "Fine screw height adjustment; built-in slope corrector",
      "Pavers, tiles & timber decking on podiums/roofs (raised floor)", "Polypropylene",
      "Pasco — exclusive Australian distributor for Buzon",
    ]),
    bestFor: [
      "Precise screw-adjustable pedestal with a built-in slope corrector — creates a level raised floor over a falls-to-drain podium",
      "Supports pavers, tiles and timber decking; the membrane drains freely beneath",
    ],
    avoidWhere: ["Direct point loading on the membrane without a protection/slip pad"],
    warnings: ["Confirm the exact height range, load rating and the membrane protection pad for the build-up"],
    advanced: { description: "Buzon DPH is a screwjack adjustable pedestal with a built-in slope corrector, used to create a level raised floor of pavers, tiles or timber decking over a falls-to-drain podium or roof membrane (Pasco is the exclusive Australian distributor). Confirm the height range and load rating for the build-up.", designCriteria: "", techData: [
      { label: "Type", value: "Screwjack adjustable pedestal (slope corrector)", source: "pasco / Buzon DPH" },
      { label: "Use", value: "Raised pavers/tiles/decking over membrane", source: "pasco / Buzon DPH" },
    ] },
  },
  {
    brand: "Elmich Australia", rangeName: "Elmich VersiPave GP",
    shortType: "Adjustable paver support pedestal",
    badges: [{ label: "Adjustable pedestal", tone: "navy" }],
    appInfo: kp(["Adjustable paver support pedestal", "Height-adjustable", "Pavers on podiums/roofs (raised floor)", "Polypropylene", "Elmich Australia direct supply"]),
    bestFor: ["Height-adjustable paver support for a raised, free-draining paved floor over a podium/roof membrane"],
    avoidWhere: ["Point loading on the membrane without a protection pad"],
    warnings: ["Confirm height range, load rating and spacer/edge components against the current Elmich data"],
    advanced: { description: "Elmich VersiPave GP is a height-adjustable paver support pedestal for raised, free-draining paved floors over podium and roof membranes (Elmich Australia / KHD). Confirm height range and load rating against the current Elmich data.", designCriteria: "", techData: [{ label: "Type", value: "Adjustable paver support pedestal", source: "elmich VersiPave GP" }] },
  },
  {
    brand: "Keksia", rangeName: "Keksia NM / PR / Star.T Series",
    shortType: "Adjustable pedestal range (paver & decking)",
    badges: [{ label: "Adjustable pedestal", tone: "navy" }],
    appInfo: kp(["Adjustable pedestal range (NM / PR / Star.T)", "Height-adjustable across the range", "Pavers & timber/composite decking on podiums/roofs", "Polypropylene", "Keksia Australia / TradieCart"]),
    bestFor: ["Full adjustable-pedestal range covering low to high build-ups for pavers and decking over membranes"],
    avoidWhere: ["Point loading on the membrane without a protection pad"],
    warnings: ["Confirm the correct series (NM/PR/Star.T) and height range for the build-up"],
    advanced: { description: "The Keksia NM / PR / Star.T series is a range of adjustable pedestals covering low to high build-ups for pavers and timber/composite decking over podium and roof membranes (Keksia Australia / TradieCart). Confirm the series and height range for the build-up.", designCriteria: "", techData: [{ label: "Type", value: "Adjustable pedestal range", source: "keksia NM/PR/Star.T" }] },
  },
  {
    brand: "Maximus", rangeName: "Maximus Pedestal Systems",
    shortType: "Adjustable pedestal system (paver & decking)",
    badges: [{ label: "Adjustable pedestal", tone: "navy" }],
    appInfo: kp(["Adjustable pedestal system", "Height-adjustable", "Pavers & decking on podiums/roofs", "Polypropylene", "Maximus Pedestal Systems direct"]),
    bestFor: ["Adjustable pedestal system for raised paver and decking floors over podium/roof membranes"],
    avoidWhere: ["Point loading on the membrane without a protection pad"],
    warnings: ["Confirm height range, load rating and accessories against the current Maximus data"],
    advanced: { description: "Maximus Pedestal Systems are adjustable pedestals for raised paver and decking floors over podium and roof membranes. Confirm height range, load rating and accessories against the current Maximus data.", designCriteria: "", techData: [{ label: "Type", value: "Adjustable pedestal system", source: "maximus pedestals" }] },
  },
  {
    brand: "Moonbay", rangeName: "Moonbay POD Series",
    shortType: "Adjustable pedestal (paver & decking)",
    badges: [{ label: "Adjustable pedestal", tone: "navy" }],
    appInfo: kp(["Adjustable pedestal (POD series)", "Height-adjustable", "Pavers & decking on podiums/roofs", "Polypropylene", "TradieCart direct supply"]),
    bestFor: ["Adjustable POD pedestal for raised paver and decking floors over podium/roof membranes"],
    avoidWhere: ["Point loading on the membrane without a protection pad"],
    warnings: ["Confirm height range and load rating against the current Moonbay data"],
    advanced: { description: "Moonbay POD Series are adjustable pedestals for raised paver and decking floors over podium and roof membranes (TradieCart). Confirm height range and load rating against the current Moonbay data.", designCriteria: "", techData: [{ label: "Type", value: "Adjustable pedestal (POD)", source: "moonbay POD" }] },
  },
];
