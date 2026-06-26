// Flood / leak test equipment & QA for waterproofing. Commodity → no Class-2/warranty. Lighter treatment.
// appInfo: Type · Method · Format · Use · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";
const KEYS = ["Type", "Method", "Format", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const FLOOD_TEST_CARDS: RefCard[] = [
  {
    brand: "H2O Supplies / The Waterproofing Shop / various",
    rangeName: "Inflatable Rubber Flood Test Balloon Plug",
    shortType: "Inflatable rubber drain plug for flood testing",
    badges: [{ label: "Inflatable plug", tone: "blue" }],
    bestFor: [
      "Sealing the drain outlet to hold a flood-test head of water on balcony/wet-area membranes",
      "Residential and strata membrane QA flood testing (24-hour test)",
    ],
    avoidWhere: [
      "Irregular / out-of-round pipe bore where a rigid mechanical plug seals more reliably",
    ],
    appInfo: kp([
      "Inflatable rubber balloon drain plug",
      "Inflated by hand pump or air compressor to seal against the pipe wall",
      "50mm / 75mm / 100mm sizes; tie-off ring",
      "Flood-test sealing of balcony/terrace drain outlets",
      "Reusable; match size to actual internal pipe diameter",
    ]),
    warnings: [
      "Match the balloon to the actual internal pipe diameter (not nominal) and do not over-inflate",
      "Attach the tie-off rope before insertion; inspect for damage and confirm the seal before filling",
    ],
    advanced: {
      description:
        "Inflatable rubber balloon plugs are the standard drain-sealing product for flood testing balcony and terrace membranes. The deflated balloon is inserted into the outlet pipe then inflated by hand pump or compressor to press against the internal pipe wall, holding the test head for a minimum 24-hour test. A tie-off ring lets a rope be secured before insertion to prevent loss down the pipe. Available in 50/75/100mm; confirm the actual pipe internal diameter before ordering.",
      designCriteria: "",
      techData: [
        { label: "Construction", value: "Heavy-duty inflatable rubber — reusable", source: "Supplier" },
        { label: "Sizes", value: "50mm / 75mm / 100mm", source: "Supplier" },
        { label: "Inflation", value: "Hand pump or air compressor", source: "Supplier" },
        { label: "Retention", value: "Tie-off ring — rope secured before insertion", source: "Supplier" },
      ],
    },
  },
  {
    brand: "Plumboss / Drainchem / plumbing trade",
    rangeName: "Mechanical Expansion Test Plug — Aluminium",
    shortType: "Mechanical wing-nut expansion drain plug",
    badges: [{ label: "Mechanical plug", tone: "slate" }],
    bestFor: [
      "Flood testing where the pipe bore is irregular / out-of-round and a rigid plug seals better",
      "QA protocols that require a mechanical (non-inflatable) plug",
    ],
    avoidWhere: [
      "Where plug protrusion fouls the drain grate clearance",
    ],
    appInfo: kp([
      "Mechanical aluminium expansion plug",
      "Wing nut compresses a rubber gasket against the pipe wall — no air/pump",
      "Sized to a pipe-diameter range, approx 38mm to 100mm+",
      "Flood-test sealing of drain outlets",
      "Reusable; hand-tightened",
    ]),
    warnings: [
      "Sized to a range, not a single nominal size — confirm against the actual internal pipe diameter",
      "Do not over-tighten (can stress the drain body / puddle flange); confirm grate clearance over the protruding body",
    ],
    advanced: {
      description:
        "Mechanical aluminium expansion plugs use a wing nut and plate to compress a rubber gasket against the internal pipe wall, expanding the body to seal without air pressure. They suit flood testing where the pipe bore is irregular or out-of-round, or where the QA protocol calls for a mechanical rather than inflatable plug. Sized to pipe-diameter ranges from about 38mm to 100mm+. Confirm the size against the actual pipe ID.",
      designCriteria: "",
      techData: [
        { label: "Construction", value: "Aluminium body, rubber compression gasket — reusable", source: "Supplier" },
        { label: "Size range", value: "approx 38mm to 100mm+ (confirm)", source: "Supplier" },
        { label: "Method", value: "Hand-tightened wing nut — no pump", source: "Supplier" },
      ],
    },
  },
  {
    brand: "Plumtest / Plumbers Choice",
    rangeName: "Plumtest Inflatable Test Plug",
    shortType: "Plumbing-trade inflatable rubber bung",
    badges: [{ label: "Inflatable plug", tone: "blue" }],
    bestFor: [
      "Flood testing balcony drains where plumbing-trade supply is more convenient",
      "Pressure testing drainage pipes",
    ],
    avoidWhere: [
      "Where a tie-off feature is mandatory and the bung format lacks one (add a cord)",
    ],
    appInfo: kp([
      "Inflatable rubber test plug (plumbers bung format)",
      "Inflated to seal against the internal pipe wall",
      "50mm and 100mm sizes",
      "Flood-test sealing of drain outlets and pipe testing",
      "Reusable; widely stocked through plumbing trade",
    ]),
    warnings: [
      "Confirm a tie-off feature — if absent, attach a wire/cord to the valve stem before insertion",
      "Match size to the actual internal pipe diameter and inspect for damage before use",
    ],
    advanced: {
      description:
        "Plumtest inflatable rubber test plugs (via Plumbers Choice and plumbing trade) are a standard plumbers-bung format for flood testing and pipe pressure testing, in 50mm and 100mm sizes. The rubber body inflates to seal against the internal pipe wall, then deflates for removal after the test. Widely stocked, they are a practical alternative where the waterproofing supplier does not stock inflatable plugs. Confirm the size against the actual pipe ID.",
      designCriteria: "",
      techData: [
        { label: "Construction", value: "Inflatable rubber bung — reusable", source: "Plumbers Choice" },
        { label: "Sizes", value: "50mm and 100mm", source: "Plumbers Choice" },
        { label: "Supply", value: "Plumbing trade (Plumbers Choice, Reece, Tradelink)", source: "Plumbers Choice" },
      ],
    },
  },
  {
    brand: "Stormtech",
    rangeName: "Stormtech 100FLEX — Integrated Flood Test Plug",
    shortType: "Puddle flange with built-in flood test plug & level gauge",
    badges: [{ label: "Integrated plug", tone: "navy" }],
    bestFor: [
      "Projects wanting an all-in-one puddle flange plus integrated flood-test plug and water-level gauge",
      "Internal and external wet-area drain points on concrete substrates",
    ],
    avoidWhere: [
      "Where the 100FLEX is not the specified puddle flange — then use a separate flood test plug",
    ],
    appInfo: kp([
      "Neoprene puddle flange with integrated removable flood-test plug",
      "Built-in plug seals the outlet; small incision releases water after the test",
      "100mm outlet; built-in water level gauge",
      "Membrane integration at the drain plus integrated flood testing",
      "CodeMark certified (CM40377); confirm membrane compatibility",
    ]),
    warnings: [
      "If the 100FLEX is not the specified puddle flange, a separate flood-test plug is required",
      "Confirm membrane compatibility with the neoprene flange; make the release incision carefully to avoid damaging the membrane lap",
    ],
    advanced: {
      description:
        "The Stormtech 100FLEX is a 100mm neoprene puddle flange with an integrated, removable flood-test plug and a built-in water level gauge, eliminating the need for a separate drain plug. A small incision releases water after the test. It is CodeMark Australia certified (CM40377) for internal and external wet areas on concrete. Confirm the full puddle-flange specification on the Drainage Puddle Flanges page and membrane compatibility with Stormtech.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Neoprene flexible rubber puddle flange — 100mm", source: "Stormtech" },
        { label: "Integrated", value: "Removable flood-test plug + built-in water level gauge", source: "Stormtech" },
        { label: "Certification", value: "CodeMark Australia CM40377", source: "Stormtech" },
      ],
    },
  },
  {
    brand: "Various / site-fabricated",
    rangeName: "Water Level Gauge / Depth Marker",
    shortType: "Flood-test water-level reference & evaporation allowance",
    badges: [{ label: "QA accessory", tone: "slate" }],
    bestFor: [
      "Recording the starting water level and monitoring any drop over the flood-test period",
      "Distinguishing membrane leakage from evaporation for an accurate pass/fail",
    ],
    avoidWhere: [
      "Using the evaporation allowance to explain away a large, rapid drop — that indicates a leak",
    ],
    appInfo: kp([
      "Water level gauge / depth marker (flood-test accessory)",
      "Mark and monitor water level; deduct measured evaporation reference",
      "Pencil/tape mark or graduated PVC gauge tube; open evaporation container",
      "Pass/fail assessment and QA documentation of the flood test",
      "Site-fabricated — no specific brand required",
    ]),
    warnings: [
      "Place the evaporation reference container on the balcony surface to capture the site-specific rate",
      "Photograph the starting level mark and reference container at commencement for the flood-test certificate",
    ],
    advanced: {
      description:
        "A water level gauge or depth marker records the starting water level and monitors any drop over the flood-test period, so leakage can be distinguished from evaporation. A pencil/tape mark on the upstand plus a small open evaporation-reference container is sufficient for a standard residential balcony; a graduated PVC gauge tube gives an auditable record on larger projects. Some puddle flanges (e.g. Stormtech 100FLEX) include a built-in gauge.",
      designCriteria: "",
      techData: [
        { label: "Format", value: "Pencil/tape mark or graduated PVC gauge tube", source: "Site practice" },
        { label: "Evaporation", value: "Open reference container on the balcony surface", source: "Site practice" },
        { label: "Record", value: "Start/end level + evaporation reading for the certificate", source: "Site practice" },
      ],
    },
  },
];
