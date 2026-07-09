// ─── Central directory category map ─────────────────────────────────────────────
// One shared source for turning a URL category slug — whether it's an exact DB
// category slug or a COMPOSITE / synonym slug (e.g. an SEO landing URL like
// "balcony-repair-remedial-building-waterproofing") — into a set of real DB
// category slugs. Used by the category/state landing pages; safe to reuse anywhere
// a slug needs resolving. All target slugs below are live top-level category slugs.

// Curated composite landing pages (SEO URLs that combine several trades). Each maps
// to a display label + the DB category slugs whose businesses should appear.
export const COMPOSITE_LANDINGS: Record<string, { label: string; slugs: string[] }> = {
  "remedial-building-building-remediation-rectification": {
    label: "Remedial Building, Remediation & Rectification",
    slugs: [
      "building-contractor", "building-maintenance", "facade-contractor", "waterproofing",
      "concrete-resurfacing-and-coatings", "underpinning-and-foundation-repair",
      "stone-repair-and-restoration", "structural-engineer",
    ],
  },
  "balcony-repair-remedial-building-waterproofing": {
    label: "Balcony Repair, Remedial & Waterproofing",
    slugs: ["waterproofing", "building-maintenance", "tiling-and-paving", "building-contractor", "caulking-joint-sealing"],
  },
  "building-consultant-construction-management-engineering": {
    label: "Building Consultant, Construction Management & Engineering",
    slugs: [
      "building-consultant", "project-management", "engineering-services", "structural-engineer",
      "quantity-surveyor", "building-inspection", "facade-consultant-and-engineers",
    ],
  },
  "metal-fabrication-welding-steel-fabrication": {
    label: "Metal Fabrication, Welding & Steel Fabrication",
    slugs: ["metal-fabrication", "steel-fabrication-and-supply"],
  },
};

// Keyword / synonym → category slugs. Lets ANY composite/synonym slug (not just the
// curated ones above) resolve by matching its dash-separated tokens. Keys are single
// tokens; values are live category slugs.
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  remedial: ["building-contractor", "building-maintenance", "facade-contractor", "waterproofing", "concrete-resurfacing-and-coatings", "underpinning-and-foundation-repair", "stone-repair-and-restoration"],
  remediation: ["building-maintenance", "building-contractor", "concrete-resurfacing-and-coatings", "waterproofing"],
  rectification: ["building-maintenance", "building-contractor"],
  defect: ["building-consultant", "building-inspection", "building-maintenance"],
  balcony: ["waterproofing", "tiling-and-paving", "building-maintenance"],
  waterproofing: ["waterproofing"], waterproof: ["waterproofing"], membrane: ["waterproofing"], tanking: ["waterproofing"],
  leak: ["waterproofing", "roofing-and-restoration"],
  facade: ["facade-contractor", "facade-consultant-and-engineers", "cladding"],
  cladding: ["cladding", "metal-cladding", "composite-decking-and-cladding-supplier"],
  render: ["rendering-and-coating"], rendering: ["rendering-and-coating"],
  consultant: ["building-consultant"], consultants: ["building-consultant"], consulting: ["building-consultant"],
  engineering: ["engineering-services", "structural-engineer", "mechanical-engineers"],
  engineer: ["structural-engineer", "engineering-services"], structural: ["structural-engineer"],
  management: ["project-management", "strata-management", "facilities-management"], project: ["project-management"],
  construction: ["building-contractor", "civil-construction"], builder: ["building-contractor"], building: ["building-contractor", "building-maintenance"],
  metal: ["metal-fabrication", "metal-roofing", "metal-cladding", "sheet-metal-and-ductwork"],
  fabrication: ["metal-fabrication", "steel-fabrication-and-supply", "fibreglass-fabrication"],
  welding: ["metal-fabrication"], steel: ["steel-fabrication-and-supply", "metal-fabrication"],
  concrete: ["concreter-concreting-contractor", "concrete-resurfacing-and-coatings", "concrete-supply", "concrete-pumping"],
  concreter: ["concreter-concreting-contractor"], concreting: ["concreter-concreting-contractor"],
  spalling: ["concrete-resurfacing-and-coatings", "building-maintenance"], concreter_repair: ["concrete-resurfacing-and-coatings"],
  roof: ["roofing-and-restoration", "metal-roofing", "roof-ventilation"], roofing: ["roofing-and-restoration", "roofing-supplier"],
  gutter: ["gutter-and-roof-repair-and-cleaning", "gutter-guard"],
  paint: ["painting"], painting: ["painting"], coating: ["painting", "rendering-and-coating"], coatings: ["painting", "rendering-and-coating"],
  waterproofer: ["waterproofing"], tiling: ["tiling-and-paving"], tiler: ["tiling-and-paving"], tile: ["tiling-and-paving"],
  plumbing: ["plumbing-and-drainage"], plumber: ["plumbing-and-drainage"], drainage: ["plumbing-and-drainage"],
  electrical: ["electrical-contractor"], electrician: ["electrical-contractor"],
  scaffold: ["scaffolding"], scaffolding: ["scaffolding"],
  strata: ["strata-management", "strata-maintenance", "building-maintenance"],
  waterproofing_membrane: ["waterproofing"], balustrade: ["balustrade"], handrail: ["balustrade"],
  surveyor: ["quantity-surveyor", "building-surveyor"], inspection: ["building-inspection", "pest-termite-control-and-inspection"],
  window: ["window-and-door-service", "window-and-door-supplier", "glazing-works"], door: ["doors-and-fire-doors", "window-and-door-service"],
  glass: ["glazing-works"], glazing: ["glazing-works"], asbestos: ["asbestos-removal", "asbestos-testing", "asbestos-consultant"],
  fire: ["fire-protection", "passive-fire-protection", "fire-engineers-and-safety-consultant", "doors-and-fire-doors"],
  supplier: ["product-and-material-supplier"], supplies: ["product-and-material-supplier"], materials: ["product-and-material-supplier"],
};

const STOP = new Set(["and", "the", "in", "for", "of", "a", "to", "services", "service", "your", "near", "me"]);

// Resolve a URL slug to a set of DB category slugs.
// `activeSlugs` is the set of live top-level category slugs.
// Returns { label?, slugs } or null when nothing matches (caller should 404).
export function resolveCategorySlug(
  slug: string,
  activeSlugs: Set<string>,
): { label?: string; slugs: string[] } | null {
  const s = slug.toLowerCase().trim();
  // 1. Exact live category slug.
  if (activeSlugs.has(s)) return { slugs: [s] };
  // 2. Curated composite landing.
  const comp = COMPOSITE_LANDINGS[s];
  if (comp) {
    const slugs = comp.slugs.filter((x) => activeSlugs.has(x));
    if (slugs.length) return { label: comp.label, slugs };
  }
  // 3. Generic composite: match tokens via the keyword map, plus any active slug
  //    that shares a meaningful token with the URL slug.
  const tokens = s.split("-").filter((t) => t.length >= 3 && !STOP.has(t));
  const found = new Set<string>();
  for (const t of tokens) (CATEGORY_KEYWORDS[t] ?? []).forEach((x) => activeSlugs.has(x) && found.add(x));
  if (!found.size) {
    for (const t of tokens) for (const a of activeSlugs) if (a.split("-").includes(t)) found.add(a);
  }
  if (found.size) return { slugs: [...found] };
  return null;
}
