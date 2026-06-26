// Balcony edge trims / drip edges & membrane-edge termination profiles. Commodity
// hardware → no Class-2/NCC or warranty fields, no invented numbers (unknown = "").
// appInfo: Type · Material · Format · Use · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";
const KEYS = ["Type", "Material", "Format", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));
const card = (
  brand: string, rangeName: string, shortType: string, vals: string[],
  bestFor: string[], avoidWhere: string[], warnings: string[],
  description: string, techData: { label: string; value: string; source?: string }[],
): RefCard => ({
  brand, rangeName, shortType, badges: [{ label: "Edge trim / drip edge", tone: "navy" }],
  appInfo: kp(vals), bestFor, avoidWhere, warnings,
  advanced: { description, designCriteria: "", techData },
});

export const GUTTER_LINING_CARDS: RefCard[] = [
  card(
    "Demtech Building Products", "Demtech BET Series",
    "Anodised aluminium balcony edge trim",
    ["Balcony edge trim with drip edge", "Anodised / powder-coated aluminium", "55 mm width; 3 m and 6 m lengths", "Membrane edge termination at the balcony slab edge", "12 mm drip edge; weep holes; powder coat to Dulux range"],
    ["Terminating and protecting the membrane edge at a tiled balcony perimeter, with a drip edge to the slab underside"],
    ["Severe coastal / salt-air exposure with standard powder coat (confirm a marine-grade finish)"],
    ["End caps required at open ends — confirm inclusion/ordering with Demtech", "Membrane must be correctly terminated under the cover flange"],
    "The Demtech BET Series is an extruded aluminium balcony edge trim with a 12 mm drip edge, weep holes and a powder-coat finish to the Dulux range, used to terminate and protect the membrane edge at a tiled balcony perimeter. Confirm the current profile range, dimensions, coastal coating grade and installation sequence with Demtech.",
    [{ label: "Material", value: "Anodised / powder-coated aluminium", source: "Demtech" }, { label: "Width", value: "55 mm", source: "Demtech" }, { label: "Lengths", value: "3 m and 6 m", source: "Demtech" }, { label: "Drip edge", value: "12 mm; weep holes", source: "Demtech" }],
  ),
  card(
    "Schlüter Systems", "Schlüter BARA-RAK / BARA-RAKO",
    "Aluminium balcony perimeter profile with tile-anchor flange",
    ["Balcony / terrace perimeter edge profile", "Anodised aluminium", "Various cover widths (confirm range with Schlüter AU)", "Mechanically anchors the tile edge at the slab perimeter", "Anchor flange bedded in the tile adhesive; BARA-RAKO adds an integrated end cap"],
    ["Anchoring the tile edge at a balcony/terrace perimeter to prevent edge chipping and delamination"],
    ["Severe salt-air exposure with standard anodising (confirm a marine-grade spec)"],
    ["Not a waterproof seal — the membrane terminates behind the anchor flange and is the applicator's responsibility", "Cover width must match the designed tile build-up"],
    "Schlüter BARA-RAK / BARA-RAKO are anodised aluminium balcony perimeter profiles whose anchor flange is bedded into the tile adhesive to mechanically support the tile edge and prevent chipping and delamination; BARA-RAKO adds an integrated end cap. Confirm available cover widths, the BARA-RAKO designation/end cap and the anodising grade with Schlüter Systems Australia.",
    [{ label: "Material", value: "Anodised aluminium", source: "Schlüter Systems" }, { label: "Feature", value: "Tile-anchor flange (bedded in adhesive)", source: "Schlüter Systems" }, { label: "Variant", value: "BARA-RAKO — integrated end cap (confirm)" }],
  ),
  card(
    "Amark", "Amark All-Edge Trim",
    "Extruded aluminium concealed-fix balcony edge trim",
    ["Concealed-fix balcony edge trim", "Extruded aluminium (powder coat or anodised)", "Multiple profile configurations", "Membrane edge termination with a fastener-free finish", "Two-part: base fixed before membrane, cover applied at completion"],
    ["A clean, concealed-fastener balcony edge termination across varying tile build-up depths"],
    ["Severe marine environments with standard powder coat (confirm available grades)"],
    ["End caps required at terminations", "Membrane must be correctly terminated under the cover section"],
    "The Amark All-Edge is an extruded aluminium concealed-fix balcony edge trim available in multiple profile configurations; a base section is fixed before the membrane and a cover is clipped on at completion for a fastener-free finish. Confirm available profiles, finish grades and coastal suitability with Amark.",
    [{ label: "Material", value: "Extruded aluminium (powder coat / anodised)", source: "Amark" }, { label: "Fixing", value: "Two-part concealed-fix", source: "Amark" }],
  ),
  card(
    "Trade supply — various", "Anodised Aluminium Drip Angle",
    "Commodity drip-angle membrane termination profile",
    ["Drip-angle edge termination profile", "Anodised / mill-finish aluminium", "Standard leg sizes (typ. 20×25 mm to 40×40 mm)", "Basic membrane edge termination and drip edge at the slab underside", "Commodity item — multiple equivalent suppliers; select on leg size/gauge/finish"],
    ["A low-cost membrane edge termination with a drip edge at exposed slab edges and soffits"],
    ["Coastal sites within ~1 km of the ocean with standard anodising (specify a marine grade or 316 stainless)", "Where a concealed multi-part or tile-anchor profile is required"],
    ["End terminations must be sealed to prevent water tracking behind the profile"],
    "A standard anodised aluminium drip angle is a commodity membrane edge-termination profile: the upstand protects the membrane turn-down and the nosing forms a drip edge at the slab underside. It is a budget detail with no tile-anchor or concealed-fix feature — select on leg size, gauge and anodising grade appropriate to the salt-air exposure.",
    [{ label: "Material", value: "Anodised / mill-finish aluminium" }, { label: "Leg sizes", value: "Typ. 20×25 mm to 40×40 mm" }, { label: "Selection", value: "By leg size, gauge and anodising spec (commodity)" }],
  ),
  card(
    "Custom fabrication — specify 316L", "Custom 316 Stainless Steel Edge Trim",
    "Fabricated marine-grade stainless edge trim (coastal)",
    ["Custom-profiled balcony edge trim", "316L (marine grade) stainless steel", "Fabricated to project profile/lengths", "Coastal / severe-environment membrane edge termination", "316 fixings throughout; passivate welds; specify 316L (not 304)"],
    ["Coastal Class-2 buildings (within ~1 km of the ocean) where aluminium finishes are not durable enough"],
    ["Standard projects where a proprietary aluminium trim is adequate (cost/lead-time)"],
    ["Specify 316L (not 304) and require a mill certificate", "All fixings/ancillary metal must also be 316 — mixed metals accelerate corrosion"],
    "Custom 316L stainless steel edge trims are fabricated to a project-specific profile for coastal balconies where aluminium powder coat / standard anodising will not last; 316L resists chloride pitting far better than 304. Use 316 fixings throughout, passivate welds, and for front-row ocean exposure consider 2205 duplex. Require a material certificate confirming 316L.",
    [{ label: "Material", value: "316L (marine grade) stainless steel" }, { label: "Fixings", value: "316 stainless throughout" }, { label: "Welds", value: "Passivate after fabrication" }, { label: "Extreme exposure", value: "Consider 2205 duplex" }],
  ),
];
