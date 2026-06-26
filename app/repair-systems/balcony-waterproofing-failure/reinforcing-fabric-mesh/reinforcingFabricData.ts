// Reinforcing fabric / fleece / mesh for liquid membranes. Commodity hardware → no Class-2/warranty, no invented numbers.
// appInfo: Type · Material · Format / width · Use · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Material", "Format / width", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const REINFORCING_FABRIC_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX Deckweb",
    shortType: "Woven polyester reinforcing fabric",
    badges: [{ label: "Reinforcing fabric", tone: "navy" }],
    appInfo: kp([
      "Reinforcing fabric (woven)",
      "Woven polyester",
      "190 mm wide roll",
      "Embedded between membrane coats at corners and junctions",
      "ARDEX liquid-membrane systems; saturate fully before the second coat",
    ]),
    bestFor: [
      "Reinforcing ARDEX liquid membranes at internal/external corners, wall-floor junctions and penetrations",
    ],
    avoidWhere: ["Substituting into a non-ARDEX system without confirmation"],
    warnings: ["Fully saturate the fabric in the first coat before applying the second — no dry threads"],
    advanced: {
      description:
        "ARDEX Deckweb is a 190 mm woven-polyester fabric embedded between coats of ARDEX liquid membrane to reinforce corners, junctions and penetrations. It must be fully saturated in the first coat before the second is applied.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Woven polyester", source: "ARDEX Australia" },
        { label: "Width", value: "190 mm wide roll", source: "ARDEX Australia" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX Deckweb — Self-Adhesive Bandage",
    shortType: "Self-adhesive woven reinforcing bandage",
    badges: [{ label: "Reinforcing fabric", tone: "navy" }],
    appInfo: kp([
      "Self-adhesive reinforcing bandage",
      "Self-adhesive woven polyester",
      "Roll — confirm widths with ARDEX",
      "Pre-applied to the substrate before the membrane at junctions",
      "Confirm the format is approved for the specific membrane and junction",
    ]),
    bestFor: [
      "Pre-applied junction reinforcement at corners and changes of plane before the membrane is applied",
    ],
    avoidWhere: ["Where the system specifies embedded (in-coat) fabric only"],
    warnings: ["Confirm with ARDEX that the pre-applied format is approved for the membrane and junction type"],
    advanced: {
      description:
        "The self-adhesive Deckweb bandage is a pre-applied woven-polyester strip fixed to the substrate at junctions before the membrane is applied. Confirm it is approved for the specific membrane and junction with ARDEX.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Self-adhesive woven polyester", source: "ARDEX Australia" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapenet 150",
    shortType: "Alkali-resistant fibreglass mesh",
    badges: [{ label: "Reinforcing mesh", tone: "blue" }],
    appInfo: kp([
      "Reinforcing mesh (fibreglass)",
      "Alkali-resistant fibreglass, 150 g/m²",
      "1 m wide roll — cut to width",
      "Embedded between coats of Mapei cementitious membranes",
      "Mapelastic systems; use the alkali-resistant grade, not standard mesh",
    ]),
    bestFor: [
      "Reinforcing Mapei cementitious flexible membranes (Mapelastic family) across the field and at junctions",
    ],
    avoidWhere: ["Using standard (non-alkali-resistant) fibreglass mesh in cementitious systems"],
    warnings: ["Confirm whether Mapenet 150 or Mapetex Sel is specified for the particular membrane"],
    advanced: {
      description:
        "Mapenet 150 is a 150 g/m² alkali-resistant fibreglass mesh supplied on a 1 m roll and embedded between coats of Mapei cementitious membranes. The alkali-resistant grade is essential in cementitious systems.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Alkali-resistant fibreglass, 150 g/m²", source: "Mapei Australia" },
        { label: "Width", value: "1 m wide roll — cut to width", source: "Mapei Australia" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapetex Sel",
    shortType: "Non-woven polypropylene reinforcing fabric",
    badges: [{ label: "Reinforcing fabric", tone: "navy" }],
    appInfo: kp([
      "Reinforcing fabric (non-woven)",
      "Non-woven macro-holed polypropylene, 80 g/m²",
      "1 m × 25 m roll — cut to width",
      "Embedded between coats of Mapei membranes",
      "Confirm which fabric the specific membrane specifies — not interchangeable with Mapenet 150",
    ]),
    bestFor: [
      "Reinforcing Mapei liquid and cementitious membranes where a non-woven macro-holed fabric is specified",
    ],
    avoidWhere: ["Assuming it is interchangeable with Mapenet 150 without confirmation"],
    warnings: ["Confirm with Mapei technical which fabric is specified for the membrane"],
    advanced: {
      description:
        "Mapetex Sel is an 80 g/m² non-woven macro-holed polypropylene fabric on a 1 m x 25 m roll, embedded between coats of Mapei membranes. It is not universally interchangeable with Mapenet 150 — confirm which the system specifies.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Non-woven macro-holed polypropylene, 80 g/m²", source: "Mapei Australia" },
        { label: "Format", value: "1 m x 25 m roll — cut to width", source: "Mapei Australia" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapeband",
    shortType: "Rubberised fabric corner & junction tape",
    badges: [{ label: "Junction tape", tone: "slate" }],
    appInfo: kp([
      "Pre-formed junction / corner tape",
      "Rubber-coated polyester",
      "Cove roll + pre-formed corner / drain pieces",
      "Applied at wall-floor coves, corners and drains in Mapelastic systems",
      "Confirm which junctions need Mapeband vs embedded mesh/fabric",
    ]),
    bestFor: [
      "Detailing wall-floor coves, internal/external corners and drain flanges in Mapei Mapelastic systems",
    ],
    avoidWhere: ["Across the open field (use mesh/fabric there)"],
    warnings: ["Confirm which junctions require Mapeband vs embedded Mapenet 150 or Mapetex Sel"],
    advanced: {
      description:
        "Mapeband is a rubber-coated polyester tape supplied as cove roll plus pre-formed corner and drain pieces, used to detail coves, corners and drains in Mapei Mapelastic systems. Confirm which junctions need Mapeband vs embedded mesh/fabric.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Rubber-coated polyester", source: "Mapei Australia" },
        { label: "Formats", value: "Cove roll + pre-formed corner / drain pieces", source: "Mapei Australia" },
      ],
    },
  },
];
