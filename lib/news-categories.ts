export const VALID_CATEGORIES = [
  "Building Commission NSW",
  "DBP Act",
  "Class 2 Buildings",
  "Waterproofing Defects",
  "Façade Defects",
  "Concrete Repair",
  "Strata Defects",
  "Building Defects",
  "Remedial Construction",
  "Product & Material Updates",
  "New Construction Systems",
  "Other",
] as const;

export type NewsCategory = typeof VALID_CATEGORIES[number];

export const FILTER_CATEGORIES = ["All", ...VALID_CATEGORIES] as const;

export const CATEGORY_IMAGES: Record<string, string> = {
  "Building Commission NSW":    "/Images/News2-Building-Commissioner.jpg",
  "DBP Act":                    "/Images/News4-Design%20practiotioner.jpg",
  "Class 2 Buildings":          "/Images/News3-class%202%20building%20Registration.jpg",
  "Strata Defects":             "/Images/News8-Apartment.jpg",
  "Waterproofing Defects":      "/Images/News9waterproroing%20defects%20planterbxoes.jpg",
  "Façade Defects":             "/Images/News5-Cladding.jpg",
  "Concrete Repair":            "/Images/News7-Concrete%20Spalling.jpg",
  "Building Defects":           "/Images/News7-Concrete%20Spalling.jpg",
  "Remedial Construction":      "/Images/News10-NCC-Building%20Codes-Standard.jpg",
  "Product & Material Updates": "/Images/News10-NCC-Building%20Codes-Standard.jpg",
  "New Construction Systems":   "/Images/News10-NCC-Building%20Codes-Standard.jpg",
  "Other":                      "/Images/News11-No%20title.jpg",
};

// Keyword → image mapping checked against article title before category fallback
// More specific clusters first — first match wins
const KEYWORD_IMAGES: Array<{ keywords: string[]; image: string }> = [
  // Building Commissioner / regulator enforcement
  {
    keywords: [
      "building commissioner", "david chandler", "construct nsw", "building commission",
      "ipart", "fair trading", "nsw fair trading", "watchdog", "building regulator",
      "prohibition order", "stop work order", "rectification order", "enforcement action",
      "building inspector", "inspector-general", "building investigation",
    ],
    image: "/Images/News2-Building-Commissioner.jpg",
  },
  // DBP Act / practitioner registration / certification
  {
    keywords: [
      "dbp act", "design and building practitioners", "design practitioner", "building practitioner",
      "rab act", "residential apartment buildings act", "registered practitioner",
      "design declaration", "practitioner registration", "certifier", "private certifier",
      "principal certifier", "occupation certificate", "pca", "ibc", "builder registration",
      "builder licence", "builder license", "licensed builder", "accredited practitioner",
    ],
    image: "/Images/News4-Design%20practiotioner.jpg",
  },
  // Class 2 buildings / multi-residential
  {
    keywords: [
      "class 2", "class-2", "residential flat", "multi-storey", "multi storey",
      "high-rise", "high rise", "highrise", "home building act", "hba", "multi-residential",
      "apartment complex", "unit block",
    ],
    image: "/Images/News3-class%202%20building%20Registration.jpg",
  },
  // Electrical / fire safety / essential services
  {
    keywords: [
      "smoke alarm", "smoke detector", "electrical", "wiring", "switchboard",
      "power supply", "fire alarm", "ems", "essential services",
      "passive fire", "fire protection", "fire compliance", "fire upgrade",
      "sprinkler", "fire compartment", "fire rating", "fire door", "fire safety",
      "exit sign", "emergency lighting",
    ],
    image: "/Images/News12-smoke-alarm-electricalworks.jpg",
  },
  // Plumbing / stormwater / drainage
  {
    keywords: [
      "plumbing", "stormwater", "downpipe", "drainage", "sewer", "sewerage",
      "pipe", "drain", "gutter", "rainwater", "hydraulic",
      "hot water", "water supply", "backflow", "overflow", "pump",
    ],
    image: "/Images/News13-plumbing-stormwater-downpipes.jpg",
  },
  // Waterproofing / water ingress
  {
    keywords: [
      "waterproof", "membrane", "balcony", "wet area", "planter box", "podium",
      "water ingress", "leaking", "leak", "roof terrace", "podium deck",
      "terrace", "rooftop", "shower recess", "bathroom waterproof",
      "water damage", "water penetration", "dampness", "damp", "moisture ingress",
      "seepage", "efflorescence",
    ],
    image: "/Images/News9waterproroing%20defects%20planterbxoes.jpg",
  },
  // Concrete / structural defects
  {
    keywords: [
      "concrete", "spalling", "cancer", "carbonation", "reinforcement", "corrosion",
      "crack", "cracking", "structural", "post-tension", "post tension",
      "rebar", "slab", "column defect", "beam defect", "foundation", "footing",
      "retaining wall", "subsidence", "settlement", "underpinning",
      "structural engineer", "structural repair", "structural defect", "load bearing",
    ],
    image: "/Images/News7-Concrete%20Spalling.jpg",
  },
  // Cladding / façade
  {
    keywords: [
      "cladding", "facade", "façade", "external wall", "panel", "curtain wall",
      "aluminium composite", "combustible", "acp", "acm",
      "glazing", "glazed", "window system", "spandrel", "louvre",
      "render", "external insulation", "eps", "xps", "composite panel",
      "external coating", "weatherproofing", "cavity wall",
    ],
    image: "/Images/News5-Cladding.jpg",
  },
  // Strata / apartments / defect bonds
  {
    keywords: [
      "apartment", "strata", "owners corporation", "lot owner", "levy",
      "body corporate", "strata committee", "common property", "by-laws",
      "strata scheme", "strata manager", "building bond", "2% bond",
      "defect bond", "statutory warranty", "warranty period",
      "ncat", "tribunal", "lot owners", "unit owners",
    ],
    image: "/Images/News8-Apartment.jpg",
  },
  // Roofing (waterproofing adjacent)
  {
    keywords: [
      "roof", "roofing", "re-roof", "metal roof", "tile roof", "roof repair",
      "roof replacement", "roof leak", "roof membrane", "flat roof",
    ],
    image: "/Images/News9waterproroing%20defects%20planterbxoes.jpg",
  },
  // General building defects / rectification
  {
    keywords: [
      "defect", "defective", "defects rectification", "rectif", "remediat",
      "building fault", "faulty construction", "poor workmanship",
      "substandard", "non-compliant building", "building failure",
    ],
    image: "/Images/News7-Concrete%20Spalling.jpg",
  },
  // NCC / building code / compliance / reform / legislation
  {
    keywords: [
      "ncc", "building code", "building codes", "australian standard",
      "compliance", "regulation", "reform", "legislation", "legislative",
      "code of practice", "planning law", "bca", "building act",
      "nsw planning", "planning and environment", "minister for planning",
      "industry reform", "construction industry", "building industry",
      "policy", "amendment", "parliamentary inquiry",
    ],
    image: "/Images/News10-NCC-Building%20Codes-Standard.jpg",
  },
];

export function getNewsImage(category: string, title: string): string {
  const lower = (title ?? "").toLowerCase();
  for (const { keywords, image } of KEYWORD_IMAGES) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return image;
    }
  }
  return CATEGORY_IMAGES[category] ?? "/Images/News11-No%20title.jpg";
}

// Keep for backwards compatibility
export function getCategoryImage(category: string): string {
  return CATEGORY_IMAGES[category] ?? "/Images/News11-No%20title.jpg";
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}
