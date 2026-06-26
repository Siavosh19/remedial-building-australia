// Drainage cell / cuspated drainage for planters & podiums. Hardware → no Class-2/warranty. Lighter treatment.
// appInfo: Type · Material · Format / height · Use · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";
const KEYS = ["Type", "Material", "Format / height", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const DRAINAGE_CELL_CARDS: RefCard[] = [
  {
    brand: "Atlantis",
    rangeName: "Atlantis Flo-Cell",
    shortType: "Modular drainage cell for podiums, planters & green roofs",
    badges: [{ label: "Drainage cell", tone: "navy" }],
    appInfo: kp([
      "Modular drainage cell",
      "Recycled polypropylene",
      "Modular panels; range of heights (confirm)",
      "Sub-surface drainage layer over the membrane",
      "Podiums, planter boxes, green roofs and retaining drainage",
    ]),
    bestFor: [
      "Creating a high-void sub-surface drainage layer over the membrane in planters, podiums and green roofs",
      "Modular panels that interlock to cover large areas",
    ],
    avoidWhere: [
      "Direct loading without confirming the compressive capacity for the build-up",
    ],
    warnings: [
      "Confirm the cell height, compressive load capacity and the filter-fabric / membrane interface with Atlantis for the build-up",
    ],
    advanced: {
      description:
        "Atlantis Flo-Cell is a modular recycled-polypropylene drainage cell that creates a high-void sub-surface drainage and water-storage layer over the membrane in planters, podiums and green roofs. Confirm the cell height and compressive capacity for the build-up with Atlantis.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Modular drainage cell", source: "Atlantis" },
        { label: "Material", value: "Recycled polypropylene", source: "Atlantis" },
        { label: "Use", value: "Podium / planter / green-roof drainage", source: "Atlantis" },
      ],
    },
  },
  {
    brand: "Elmich",
    rangeName: "Elmich VersiDrain",
    shortType: "Drainage & water-retention cell for podiums & green roofs",
    badges: [{ label: "Drainage cell", tone: "navy" }],
    appInfo: kp([
      "Drainage / water-retention cell",
      "Recycled polypropylene / HDPE (by model)",
      "Range of cell heights (confirm by model)",
      "Drainage and water-retention layer over the membrane",
      "Podiums, planters, green roofs; VersiDrain & VersiCell ranges",
    ]),
    bestFor: [
      "Drainage with water-retention for green roofs and podium planting (VersiDrain)",
      "High-flow drainage layer over the membrane in podium and planter build-ups",
    ],
    avoidWhere: [
      "Where compressive load exceeds the model's rated capacity",
    ],
    warnings: [
      "Select the VersiDrain / VersiCell model and height for the build-up load and water-retention requirement; confirm with Elmich",
    ],
    advanced: {
      description:
        "Elmich VersiDrain (and the VersiCell range) are recycled-polymer drainage and water-retention cells for green roofs, podiums and planters, providing a drainage layer over the membrane with optional water storage. Confirm the model, height and load capacity with Elmich.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Drainage / water-retention cell", source: "Elmich" },
        { label: "Use", value: "Green roof / podium / planter drainage", source: "Elmich" },
      ],
    },
  },
  {
    brand: "Geofabrics",
    rangeName: "Geofabrics MegaFlo",
    shortType: "Geocomposite / strip drain for sub-surface drainage",
    badges: [{ label: "Strip / sheet drain", tone: "navy" }],
    appInfo: kp([
      "Geocomposite drainage (core + filter fabric)",
      "Polymer drainage core with bonded geotextile",
      "Strip and sheet formats (confirm by product)",
      "Sub-surface / sub-soil drainage behind walls and under build-ups",
      "Drainage core with integral filter; civil & landscape drainage",
    ]),
    bestFor: [
      "Sub-surface and sub-soil drainage with a drainage core and integral filter fabric",
      "Behind retaining walls, planters and under landscape build-ups",
    ],
    avoidWhere: [
      "",
    ],
    warnings: [
      "Confirm the MegaFlo product, format and flow capacity with Geofabrics for the application",
    ],
    advanced: {
      description:
        "Geofabrics MegaFlo is a geocomposite drainage product combining a polymer drainage core with a bonded geotextile filter, used for sub-surface and sub-soil drainage behind walls, in planters and under landscape build-ups. Confirm the product and flow capacity with Geofabrics.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Geocomposite drainage (core + filter)", source: "Geofabrics" },
        { label: "Use", value: "Sub-surface / sub-soil drainage", source: "Geofabrics" },
      ],
    },
  },
  {
    brand: "Newton Waterproofing",
    rangeName: "Newton Geodrain",
    shortType: "Cuspated drainage membrane for walls & decks",
    badges: [{ label: "Cuspated drainage", tone: "navy" }],
    appInfo: kp([
      "Cuspated (dimpled) drainage membrane",
      "HDPE with bonded geotextile (by model)",
      "Sheet / roll; dimple drainage core",
      "Drainage and protection layer over structure / membrane",
      "Walls, decks, planters; confirm AU distributor",
    ]),
    bestFor: [
      "Combined drainage and protection layer over a structure or membrane on walls, decks and planters",
      "Cuspated core channelling water to drainage with a bonded filter",
    ],
    avoidWhere: [
      "High-void / high-load podium build-ups better suited to a structural drainage cell",
    ],
    warnings: [
      "Confirm the Geodrain model, orientation and the current Australian distributor for the application",
    ],
    advanced: {
      description:
        "Newton Geodrain is a cuspated (dimpled) HDPE drainage membrane, typically with a bonded geotextile filter, providing a combined drainage and protection layer over structures and membranes on walls, decks and planters. Confirm the model and the Australian distributor for the application.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cuspated drainage membrane", source: "Newton Waterproofing" },
        { label: "Material", value: "HDPE with bonded geotextile (by model)", source: "Newton Waterproofing" },
      ],
    },
  },
  {
    brand: "Cordek",
    rangeName: "Cordek Cellcore / Drainage Cell",
    shortType: "Void former / drainage cell for structural build-ups",
    badges: [{ label: "Drainage cell", tone: "navy" }],
    appInfo: kp([
      "Drainage cell / void former",
      "Recycled polymer",
      "Modular cells; range of heights (confirm)",
      "Drainage / void layer in structural and landscape build-ups",
      "Specialist range; confirm AU distributor & product",
    ]),
    bestFor: [
      "Drainage / void layer in structural and landscape build-ups over the membrane",
    ],
    avoidWhere: [
      "",
    ],
    warnings: [
      "Confirm the Cordek product, cell height, load capacity and the current Australian distributor",
    ],
    advanced: {
      description:
        "Cordek supplies drainage cells and void formers in recycled polymer for drainage and void layers in structural and landscape build-ups over the membrane. Confirm the product, cell height, load capacity and the Australian distributor.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Drainage cell / void former", source: "Cordek" },
        { label: "Material", value: "Recycled polymer", source: "Cordek" },
      ],
    },
  },
];
