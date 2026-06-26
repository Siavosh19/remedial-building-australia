// Membrane protection boards. Commodity hardware → no Class-2/warranty, no invented numbers.
// appInfo: Type · Material · Format / thickness · Use · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Material", "Format / thickness", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const PROTECTION_BOARD_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX Protection Board",
    shortType: "Fluted polyethylene protection board",
    badges: [{ label: "Protection board", tone: "navy" }],
    appInfo: kp([
      "Protection board (fluted)",
      "Fluted polyethylene (corflute-type)",
      "Sheet — confirm size with ARDEX",
      "Over a cured ARDEX membrane before screed or backfill",
      "Laid loose, PVC-tape laps; not a structural board",
    ]),
    bestFor: [
      "Protecting a cured ARDEX liquid membrane from screed, backfill or site traffic before the finish is placed",
    ],
    avoidWhere: ["As a structural or load-spreading board (it is protection only)"],
    warnings: ["Confirm the format and compressive performance for the loading with ARDEX Australia"],
    advanced: {
      description:
        "ARDEX Protection Board is a lightweight fluted-polyethylene (corflute-type) sheet laid loose over a cured ARDEX membrane to protect it from screed, backfill and site traffic before the finish is placed. Laps are taped; it is not a structural board.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Fluted polyethylene (corflute-type)", source: "ARDEX Australia" },
        { label: "Fixing", value: "Laid loose; PVC-tape laps (no mechanical fixings)", source: "ARDEX Australia" },
      ],
    },
  },
  {
    brand: "Various",
    rangeName: "XPS Extruded Polystyrene Protection Board",
    shortType: "XPS foam protection / insulation board",
    badges: [{ label: "Protection board", tone: "navy" }],
    appInfo: kp([
      "Rigid foam protection board",
      "Extruded polystyrene (XPS)",
      "Rigid boards (multiple thicknesses)",
      "Over membrane under screed or pavers",
      "Available in several compressive-strength grades — match to the load",
    ]),
    bestFor: [
      "Protecting (and optionally insulating) a membrane under a screed or paver build-up where a rigid board is wanted",
    ],
    avoidWhere: ["As a drainage layer (XPS is solid — no drainage void)"],
    warnings: ["Confirm the compressive-strength grade against the applied screed/paver loading"],
    advanced: {
      description:
        "XPS extruded-polystyrene board is a lightweight, moisture-resistant rigid board placed over the membrane under a screed or paver build-up, available in several compressive-strength grades. It is solid — it protects but provides no drainage void.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Extruded polystyrene (XPS)", source: "Various" },
        { label: "Grades", value: "Multiple compressive-strength grades — confirm against loading", source: "Various" },
      ],
    },
  },
  {
    brand: "Reln / various",
    rangeName: "HDPE Dimpled Drainage & Protection Mat",
    shortType: "Dimpled HDPE drainage/protection mat",
    badges: [{ label: "Drainage board", tone: "blue" }],
    appInfo: kp([
      "Dimpled drainage/protection mat",
      "HDPE",
      "Roll — dimpled profile",
      "Over membrane under growing medium, ballast or pavers",
      "Dimples create a drainage void; pair with a filter geotextile above",
    ]),
    bestFor: [
      "Protecting the membrane and creating a drainage void over podium slabs, roof decks and planter boxes",
    ],
    avoidWhere: ["Standard tiled balconies where a flat protection board suffices"],
    warnings: [
      "Specify a filter geotextile above the mat or growing-medium fines will clog the drainage void",
      "Confirm the drainage capacity against the project rainfall",
    ],
    advanced: {
      description:
        "A dimpled HDPE drainage and protection mat protects the membrane and creates a drainage void above it on podium slabs, roof decks and planter boxes. A filter geotextile must be laid above it to stop fines clogging the void.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "HDPE (dimpled profile)", source: "Reln / various" },
        { label: "Companion", value: "Filter geotextile above (mandatory on planted build-ups)", source: "Reln / various" },
      ],
    },
  },
  {
    brand: "Colbond / Enka / various",
    rangeName: "Enkadrain / Geocomposite Drainage & Protection Mat",
    shortType: "Geocomposite drainage + protection mat",
    badges: [{ label: "Drainage board", tone: "blue" }],
    appInfo: kp([
      "Geocomposite drainage/protection mat",
      "Drainage core + bonded geotextile",
      "Roll",
      "Over membrane under growing medium or ballast",
      "Single layer combining drainage void and filter geotextile",
    ]),
    bestFor: [
      "Single-layer drainage and membrane protection on podium decks, roof decks and green roofs",
    ],
    avoidWhere: ["Standard tiled balconies (over-specified)"],
    warnings: [
      "Confirm current Australian availability and the drainage capacity against project rainfall",
    ],
    advanced: {
      description:
        "Enkadrain-type geocomposite mats combine a drainage core with a bonded geotextile filter, providing membrane protection and a drainage void in a single layer over podium and roof decks and green roofs. Confirm current AU availability.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Geocomposite — drainage core + bonded geotextile", source: "Colbond / Enka / various" },
      ],
    },
  },
  {
    brand: "Alwitra / various",
    rangeName: "Composite Root-Barrier & Protection Board",
    shortType: "Root-resistant protection board",
    badges: [{ label: "Protection board", tone: "navy" }, { label: "Root barrier", tone: "amber" }],
    appInfo: kp([
      "Composite root-barrier protection board",
      "Composite — confirm with supplier",
      "Sheet / roll — confirm",
      "Over sheet membrane under drainage layer and growing medium",
      "Adds root-penetration resistance to physical protection",
    ]),
    bestFor: [
      "Planted podium boxes, green roofs and planted terraces needing root-penetration resistance plus membrane protection",
    ],
    avoidWhere: ["Standard (unplanted) balcony build-ups"],
    warnings: [
      "Confirm Australian availability and that the root-barrier performance matches the planted species",
    ],
    advanced: {
      description:
        "A composite root-barrier and protection board protects a sheet membrane and resists root penetration on planted podium boxes, green roofs and planted terraces, sitting below the drainage layer and growing medium. Confirm AU availability and root-barrier suitability for the species.",
      designCriteria: "",
      techData: [
        { label: "Function", value: "Membrane protection + root-penetration resistance", source: "Alwitra / various" },
      ],
    },
  },
  {
    brand: "Schlüter-Systems Australia",
    rangeName: "Schlüter-DITRA / DITRA-HEAT Uncoupling Mat",
    shortType: "Polyethylene uncoupling & protection mat",
    badges: [{ label: "Uncoupling mat", tone: "slate" }],
    appInfo: kp([
      "Uncoupling / protection mat",
      "Dimpled polyethylene with fleece backing",
      "Roll — low profile",
      "Over membrane under tile adhesive (uncoupling required)",
      "Uncouples the tile from the substrate; confirm external balcony suitability",
    ]),
    bestFor: [
      "Uncoupling and protecting under a tiled balcony/terrace finish where movement-decoupling is required",
    ],
    avoidWhere: ["Under screed, ballast or growing-medium build-ups (it is an under-tile mat)"],
    warnings: ["Confirm external-balcony suitability and membrane compatibility with Schlüter Australia"],
    advanced: {
      description:
        "Schlüter-DITRA is a dimpled polyethylene mat with fleece backing that uncouples and protects under a tiled finish, accommodating substrate movement. Confirm external-balcony suitability and membrane compatibility with Schlüter Australia.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Dimpled polyethylene with fleece backing", source: "Schlüter-Systems Australia" },
        { label: "Role", value: "Uncoupling + protection under tile adhesive", source: "Schlüter-Systems Australia" },
      ],
    },
  },
];
