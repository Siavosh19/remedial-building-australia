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

// ─── Image topic pools ────────────────────────────────────────────────────────
const IMAGE_DIR = "/Images/News";
const p = (name: string) => `${IMAGE_DIR}/${name}`;

const PHOTOS = {
  commissioner: [
    p("commissioner-enforcement-stop-work-order.jpg"),
    p("building-commissioner-desk-code-compliance.jpg"),
    p("building-inspector-apartment-compliance.jpg"),
  ],
  dbp: [
    p("design-practitioner-cad-bim-workstation.jpg"),
    p("nsw-design-practitioners-registration.jpg"),
    p("class2-building-registration-form.jpg"),
  ],
  regulation: [
    p("ncc-bca-standards-books-compliance.jpg"),
    p("ncc-australian-standards-technical-guidance.jpg"),
    p("passive-fire-collars-pipes-riser-inspection.jpg"),
    p("passive-fire-penetration-collars-pipes.jpg"),
    p("construction-insurance-liability-document.jpg"),
  ],
  concrete: [
    p("rusted-rebar-exposed-broken-concrete-slab.jpg"),
    p("concrete-spalling-exposed-rebar-closeup.jpg"),
    p("concrete-spalling-beam-column-inspection-collage.jpg"),
    p("concrete-structure-spalling-cracks-exposed-rebar.jpg"),
    p("concrete-surface-crack-pattern.jpg"),
    p("magnesite-floor-material-deterioration.jpg"),
    p("mortar-repair-facade-trowel.jpg"),
  ],
  facade: [
    p("cladding-removal-facade-workers-platform.jpg"),
    p("rope-access-worker-highrise-facade.jpg"),
    p("facade-workers-gondola-glass-cladding.jpg"),
    p("facade-rope-access-highrise-remediation.jpg"),
  ],
  waterproofing: [
    p("waterproofing-membrane-roller-balcony.jpg"),
    p("waterproofing-roller-membrane-flat-surface.jpg"),
    p("water-ingress-staining-ponding-mould-collage.jpg"),
    p("balcony-water-ingress-cracked-render-tiles.jpg"),
  ],
  strata: [
    p("strata-apartment-complex-dusk.jpg"),
    p("class2-apartment-building-exterior.jpg"),
    p("apartment-balconies-glass-facade.jpg"),
    p("apartment-balcony-spalled-concrete-soffit.jpg"),
  ],
  defects: [
    p("building-defects-spalling-cracks-mould-composite.jpg"),
    p("inspector-facade-wall-crack-examination.jpg"),
    p("inspector-carpark-concrete-moisture-test.jpg"),
    p("electrical-services-wiring-switchboard.jpg"),
    p("plumbing-drainage-stormwater-pipes.jpg"),
  ],
  remedial: [
    p("building-remedial-works-scaffolding.jpg"),
    p("heritage-building-facade-restoration.jpg"),
    p("construction-team-reviewing-plans-site.jpg"),
  ],
  materials: [
    p("waterproofing-repair-products-mortar-sealants.jpg"),
    p("waterproofing-membrane-roller-balcony.jpg"),
  ],
  newbuild: [
    p("modular-construction-crane-prefab.jpg"),
    p("multiunit-apartments-construction-cranes.jpg"),
    p("highrise-building-development.jpg"),
    p("electrician-electrical-panel-building-services.jpg"),
  ],
  general: [
    p("building-industry-news-desk-laptop.jpg"),
    p("building-futures-magazine-industry-stats.jpg"),
    p("construction-industry-news-newspaper.jpg"),
    p("sydney-cbd-skyline-botanic-gardens.jpg"),
    p("construction-team-reviewing-plans-site.jpg"),
  ],
} as const;

type PhotoTopic = keyof typeof PHOTOS;

// ─── Hardcoded topic overrides for known files ────────────────────────────────
// Takes precedence over keyword detection. Only needed when the filename alone
// is not descriptive enough to derive the correct topics automatically.
const IMAGE_TOPICS: Record<string, PhotoTopic[]> = {
  "commissioner-enforcement-stop-work-order.jpg":          ["commissioner"],
  "building-commissioner-desk-code-compliance.jpg":        ["commissioner", "regulation"],
  "class2-building-registration-form.jpg":                 ["dbp", "strata"],
  "design-practitioner-cad-bim-workstation.jpg":           ["dbp"],
  "cladding-removal-facade-workers-platform.jpg":          ["facade"],
  "nsw-design-practitioners-registration.jpg":             ["dbp", "commissioner"],
  "mortar-repair-facade-trowel.jpg":                       ["concrete", "remedial"],
  "apartment-balconies-glass-facade.jpg":                  ["strata"],
  "waterproofing-roller-membrane-flat-surface.jpg":        ["waterproofing"],
  "ncc-bca-standards-books-compliance.jpg":                ["regulation", "dbp"],
  "construction-industry-news-newspaper.jpg":              ["general"],
  "electrical-services-wiring-switchboard.jpg":            ["defects"],
  "plumbing-drainage-stormwater-pipes.jpg":                ["defects", "waterproofing"],
  "rope-access-worker-highrise-facade.jpg":                ["facade", "remedial"],
  "inspector-facade-wall-crack-examination.jpg":           ["defects", "facade"],
  "facade-workers-gondola-glass-cladding.jpg":             ["facade"],
  "inspector-carpark-concrete-moisture-test.jpg":          ["defects", "concrete"],
  "passive-fire-collars-pipes-riser-inspection.jpg":       ["regulation"],
  "rusted-rebar-exposed-broken-concrete-slab.jpg":         ["concrete"],
  "concrete-spalling-beam-column-inspection-collage.jpg":  ["concrete", "defects"],
  "building-defects-spalling-cracks-mould-composite.jpg":  ["defects", "concrete"],
  "concrete-structure-spalling-cracks-exposed-rebar.jpg":  ["concrete"],
  "concrete-surface-crack-pattern.jpg":                    ["concrete"],
  "magnesite-floor-material-deterioration.jpg":            ["concrete", "defects"],
  "water-ingress-staining-ponding-mould-collage.jpg":      ["waterproofing", "defects"],
  "apartment-balcony-spalled-concrete-soffit.jpg":         ["strata", "defects"],
  "balcony-water-ingress-cracked-render-tiles.jpg":        ["waterproofing", "defects"],
  "building-remedial-works-scaffolding.jpg":               ["remedial"],
  "sydney-cbd-skyline-botanic-gardens.jpg":                ["general"],
  "building-inspector-apartment-compliance.jpg":           ["commissioner", "regulation"],
  "ncc-australian-standards-technical-guidance.jpg":       ["regulation", "dbp"],
  "passive-fire-penetration-collars-pipes.jpg":            ["regulation"],
  "construction-insurance-liability-document.jpg":         ["regulation", "general"],
  "strata-apartment-complex-dusk.jpg":                     ["strata"],
  "class2-apartment-building-exterior.jpg":                ["strata"],
  "multiunit-apartments-construction-cranes.jpg":          ["newbuild", "strata"],
  "waterproofing-repair-products-mortar-sealants.jpg":     ["materials", "waterproofing"],
  "modular-construction-crane-prefab.jpg":                 ["newbuild"],
  "electrician-electrical-panel-building-services.jpg":    ["newbuild", "defects"],
  "waterproofing-membrane-roller-balcony.jpg":             ["waterproofing", "materials"],
  "concrete-spalling-exposed-rebar-closeup.jpg":           ["concrete"],
  "facade-rope-access-highrise-remediation.jpg":           ["facade", "remedial"],
  "highrise-building-development.jpg":                     ["newbuild", "strata"],
  "construction-team-reviewing-plans-site.jpg":            ["general", "remedial"],
  "heritage-building-facade-restoration.jpg":              ["remedial", "facade"],
  "building-industry-news-desk-laptop.jpg":                ["general"],
  "building-futures-magazine-industry-stats.jpg":          ["general"],
};

// ─── Category → preferred topic order ────────────────────────────────────────
const CATEGORY_TOPIC_ORDER: Record<NewsCategory, PhotoTopic[]> = {
  "Building Commission NSW":    ["commissioner", "regulation", "dbp", "general"],
  "DBP Act":                    ["dbp", "commissioner", "regulation", "general"],
  "Class 2 Buildings":          ["strata", "dbp", "newbuild", "general"],
  "Waterproofing Defects":      ["waterproofing", "defects", "strata", "general"],
  "Façade Defects":             ["facade", "defects", "remedial", "general"],
  "Concrete Repair":            ["concrete", "defects", "remedial", "general"],
  "Strata Defects":             ["strata", "defects", "concrete", "general"],
  "Building Defects":           ["defects", "concrete", "strata", "general"],
  "Remedial Construction":      ["remedial", "facade", "concrete", "general"],
  "Product & Material Updates": ["materials", "waterproofing", "concrete", "general"],
  "New Construction Systems":   ["newbuild", "strata", "facade", "general"],
  "Other":                      ["general", "strata", "remedial", "regulation"],
};

// ─── Keyword-based topic detection for any new image ─────────────────────────
// When a new image is dropped into /Images/News/ with a descriptive filename,
// this function automatically assigns it to the correct topics — no code change needed.
export function deriveTopicsFromFilename(filename: string): PhotoTopic[] {
  // Strip extension, replace separators with spaces
  const n = filename.toLowerCase().replace(/\.\w+$/, "").replace(/[-_]/g, " ");
  const topics: PhotoTopic[] = [];

  if (/commissioner|enforcement|stop work|bcnsw/.test(n))
    topics.push("commissioner");
  if (/design practitioner|practitioner registration|building registration|dbp act/.test(n))
    topics.push("dbp");
  if (/\bncc\b|\bbca\b|australian standard|passive fire|insurance|liability|compliance|technical guidance|code book/.test(n))
    topics.push("regulation");
  if (/concrete|spalling|rebar|reinforc|corrosion|magnesite|mortar|crack|structural defect|slab defect/.test(n))
    topics.push("concrete");
  if (/facade|cladding|rope access|gondola|curtain wall|highrise|high rise/.test(n))
    topics.push("facade");
  if (/waterproof|membrane|water ingress|water damage|ponding|mould|leaking|water stain/.test(n))
    topics.push("waterproofing");
  if (/strata|apartment|class 2|class2|unit complex/.test(n))
    topics.push("strata");
  if (/\bdefect|deteriorat|inspection|moisture|plumbing|drainage|electrical|switchboard/.test(n))
    topics.push("defects");
  if (/remedial|scaffolding|heritage|restoration/.test(n))
    topics.push("remedial");
  if (/sealant|repair product|repair system/.test(n))
    topics.push("materials");
  if (/modular|prefab|\bcrane\b|new build|new construction/.test(n))
    topics.push("newbuild");
  if (/industry news|newspaper|magazine|sydney|skyline|general news/.test(n))
    topics.push("general");

  return topics.length > 0 ? topics : ["general"];
}

// ─── Keyword synonym map ──────────────────────────────────────────────────────
// Maps title words → terms likely to appear inside image filenames.
// When a title keyword (or any of its synonyms) appears in a filename, that
// image scores a point. Images with the highest score win; zero-score → fallback.
const KEYWORD_SYNONYMS: Record<string, string[]> = {
  // NCC / codes / standards
  ncc:           ["ncc", "bca", "standard", "code", "compliance", "guidance"],
  bca:           ["bca", "ncc", "standard", "code", "compliance"],
  national:      ["ncc", "bca", "standard", "code"],
  code:          ["ncc", "bca", "code", "standard", "compliance"],
  codes:         ["ncc", "bca", "code", "standard", "compliance"],
  standard:      ["standard", "ncc", "bca", "guidance", "technical"],
  standards:     ["standard", "ncc", "bca", "guidance", "technical"],
  compliance:    ["compliance", "ncc", "standard", "regulation", "code"],
  regulation:    ["ncc", "bca", "standard", "compliance", "regulation"],
  variation:     ["ncc", "standard", "code", "compliance", "regulation"],
  variations:    ["ncc", "standard", "code", "compliance", "regulation"],
  // Building Commissioner
  commissioner:  ["commissioner", "enforcement", "stop", "bcnsw"],
  commission:    ["commissioner", "enforcement", "bcnsw"],
  enforcement:   ["enforcement", "commissioner", "stop"],
  // DBP
  dbp:           ["practitioner", "registration", "design", "cad", "bim"],
  practitioner:  ["practitioner", "registration", "dbp"],
  registration:  ["registration", "practitioner"],
  // Concrete / structural
  concrete:      ["concrete", "spalling", "crack", "rebar", "reinforc", "magnesite", "mortar"],
  spalling:      ["spalling", "concrete", "rebar", "crack", "exposed"],
  crack:         ["crack", "concrete", "spalling"],
  cracks:        ["crack", "concrete", "spalling"],
  cracking:      ["crack", "concrete", "spalling"],
  corrosion:     ["corrosion", "rusted", "rebar", "reinforc"],
  rebar:         ["rebar", "rusted", "reinforc", "concrete"],
  reinforcement: ["reinforc", "rebar", "rusted", "concrete"],
  magnesite:     ["magnesite", "floor", "concrete"],
  mortar:        ["mortar", "concrete", "repair", "facade"],
  structural:    ["concrete", "spalling", "structural", "crack"],
  slab:          ["slab", "concrete", "crack", "spalling"],
  // Facade / cladding
  facade:        ["facade", "cladding", "rope", "gondola", "highrise"],
  cladding:      ["cladding", "facade", "curtain", "highrise"],
  curtain:       ["cladding", "facade", "curtain"],
  highrise:      ["highrise", "facade", "rope", "gondola"],
  // Waterproofing
  waterproofing: ["waterproof", "membrane", "water", "balcony", "ponding", "mould"],
  waterproof:    ["waterproof", "membrane", "water", "ponding", "mould"],
  membrane:      ["membrane", "waterproof", "roller", "balcony"],
  water:         ["water", "waterproof", "membrane", "ingress", "ponding", "mould"],
  ingress:       ["ingress", "water", "waterproof", "ponding", "mould"],
  leaking:       ["water", "ingress", "mould", "ponding", "waterproof"],
  mould:         ["mould", "water", "ingress", "ponding"],
  ponding:       ["ponding", "water", "mould"],
  balcony:       ["balcony", "waterproof", "membrane", "water"],
  // Strata / apartments
  strata:        ["strata", "apartment", "class2", "unit", "complex"],
  apartment:     ["apartment", "strata", "class2", "unit"],
  apartments:    ["apartment", "strata", "class2", "unit"],
  residential:   ["strata", "apartment", "class2"],
  // Remedial
  remedial:      ["remedial", "scaffolding", "heritage", "restoration"],
  repair:        ["repair", "remedial", "mortar", "concrete", "waterproof"],
  rectification: ["remedial", "repair"],
  heritage:      ["heritage", "restoration", "remedial", "facade"],
  restoration:   ["restoration", "heritage", "remedial"],
  scaffolding:   ["scaffolding", "remedial"],
  // Materials / products
  product:       ["product", "sealant", "repair", "mortar", "waterproof", "membrane"],
  products:      ["product", "sealant", "repair", "mortar", "waterproof"],
  material:      ["material", "sealant", "repair", "mortar"],
  materials:     ["material", "sealant", "repair", "mortar"],
  sealant:       ["sealant", "repair", "waterproof"],
  // New build / modular
  modular:       ["modular", "prefab", "crane", "construction"],
  prefab:        ["prefab", "modular", "crane"],
  innovation:    ["modular", "prefab", "construction"],
  // Fire / passive
  fire:          ["fire", "passive", "collar", "pipe"],
  passive:       ["passive", "fire", "collar"],
  // Insurance / liability
  insurance:     ["insurance", "liability", "document"],
  liability:     ["liability", "insurance", "document"],
  costs:         ["insurance", "liability"],
  // Inspection / defects
  defect:        ["defect", "inspection", "crack", "spalling", "mould"],
  defects:       ["defect", "inspection", "crack", "spalling", "mould"],
  inspection:    ["inspection", "inspector", "defect"],
  inspector:     ["inspector", "inspection", "defect"],
};

// Words too generic to be useful as matching signals
const STOP_WORDS = new Set([
  "a","an","the","to","of","and","or","in","on","at","for","with","by",
  "from","as","is","are","was","were","be","been","has","have","had",
  "do","does","did","will","would","could","should","may","might","can",
  "its","it","that","this","these","those","add","adds","new","says",
  "say","face","faces","hit","hits","set","sets","get","gets","put",
  "puts","due","over","under","out","up","down","into","onto","about",
  "after","before","between","through","during","across","industry",
  "building","buildings","news","amid","amid","sector","report",
]);

// ─── Extract up to 7 meaningful keywords from an article title ────────────────
function extractKeywords(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    .slice(0, 7);
}

const basename = (path: string): string => path.split("/").pop() ?? "";

// ─── Word-aware keyword match ────────────────────────────────────────────────
// True when any synonym of `kw` matches a whole word (or word-prefix) in the
// filename. Word-aware matching avoids false positives a naive substring check
// would catch — e.g. "water" must not match inside "stormwater".
function keywordMatchesFilename(filename: string, kw: string): boolean {
  const words = filename.toLowerCase().replace(/\.\w+$/, "").split(/[-_\s]+/);
  const synonyms = KEYWORD_SYNONYMS[kw] ?? [kw];
  return synonyms.some((s) => words.some((w) => w === s || w.startsWith(s)));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function titleHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function getTopicsForFile(filename: string): PhotoTopic[] {
  return IMAGE_TOPICS[filename] ?? deriveTopicsFromFilename(filename);
}

// ─── Core image selection — single source of truth ───────────────────────────
/**
 * Returns the best-matched image for an article from the given pool.
 *
 * DETERMINISTIC: identical inputs always produce the same output, regardless
 * of what other articles are on the page. This guarantees the news card image
 * and the article hero image are always the same.
 *
 * Works with any images in imagePool — new files added to /Images/News/ are
 * automatically discovered and matched by filename keywords, no code changes needed.
 */
export function getArticleImage(
  category: string,
  title: string,
  imagePool: string[],
  tags: string[] = []
): string {
  const FALLBACK_NAME = "building-industry-news-desk-laptop.jpg";
  if (!imagePool.length) return `/Images/News/${FALLBACK_NAME}`;

  const hash = titleHash(title ?? "");
  const catTopics = CATEGORY_TOPIC_ORDER[category as NewsCategory] ?? ["general"];

  // Weighted keyword signals. The AI-assigned tags are curated and topical, so
  // they weigh more than raw title words.
  const kwWeights = new Map<string, number>();
  for (const k of extractKeywords(title ?? "")) kwWeights.set(k, Math.max(kwWeights.get(k) ?? 0, 1));
  for (const t of tags) for (const k of extractKeywords(t)) kwWeights.set(k, Math.max(kwWeights.get(k) ?? 0, 2));

  // Score every image: weighted keyword/synonym hits + a bonus when the image's
  // own topics fit the article's category (earlier category topic = bigger bonus).
  let best = 0;
  const scored = imagePool.map((path) => {
    const fname = basename(path);
    const imgTopics = getTopicsForFile(fname);
    let score = 0;
    for (const [kw, w] of kwWeights) {
      if (keywordMatchesFilename(fname, kw)) score += w;
    }
    const catIdx = imgTopics.reduce((b, t) => {
      const i = catTopics.indexOf(t);
      return i >= 0 && i < b ? i : b;
    }, catTopics.length);
    if (catIdx < catTopics.length) score += Math.max(3 - catIdx, 1);
    if (score > best) best = score;
    return { path, score, catIdx };
  });

  // Nothing matched the article at all → pick from the generic news set
  // (the "general" topic photos), varied per article but deterministic so the
  // list card and the article hero always show the same image.
  if (best === 0) {
    const generic = imagePool.filter((p) => getTopicsForFile(basename(p)).includes("general"));
    const pool = generic.length ? generic : imagePool;
    return pool[hash % pool.length];
  }

  // Among the top scorers, prefer the best category fit, then pick deterministically.
  const top = scored.filter((s) => s.score === best);
  const bestCatIdx = Math.min(...top.map((s) => s.catIdx));
  const bestFit = top.filter((s) => s.catIdx === bestCatIdx);
  return bestFit[hash % bestFit.length].path;
}

// ─── Batch assignment ─────────────────────────────────────────────────────────
/**
 * Assigns images to an array of articles. Each article is processed with
 * getArticleImage — deterministic and consistent with the article hero image.
 */
export function assignUniqueImages<T extends { title: string; category: string; tags?: string[] }>(
  articles: T[],
  _reservedImages: string[] = [],
  imagePool?: string[]
): (T & { featured_image: string })[] {
  if (imagePool && imagePool.length > 0) {
    return articles.map((article) => ({
      ...article,
      featured_image: getArticleImage(article.category, article.title, imagePool, article.tags ?? []),
    }));
  }

  // ── Legacy / build-time fallback (no filesystem pool available) ───────────
  const used = new Set<string>();
  const ALL_PHOTOS = Object.values(PHOTOS).flat();

  return articles.map((article) => {
    const hash = titleHash(article.title ?? "");
    const topicOrder: PhotoTopic[] =
      CATEGORY_TOPIC_ORDER[article.category as NewsCategory] ?? ["general"];

    let image: string | undefined;
    for (const topic of topicOrder) {
      const pool = PHOTOS[topic] as readonly string[];
      for (let i = 0; i < pool.length; i++) {
        const c = pool[(hash + i) % pool.length];
        if (!used.has(c)) { image = c; break; }
      }
      if (image) break;
    }
    if (!image) {
      for (let i = 0; i < ALL_PHOTOS.length; i++) {
        const c = ALL_PHOTOS[(hash + i) % ALL_PHOTOS.length];
        if (!used.has(c)) { image = c; break; }
      }
    }
    if (!image) image = ALL_PHOTOS[hash % ALL_PHOTOS.length];
    used.add(image!);
    return { ...article, featured_image: image! };
  });
}

// ─── Legacy exports ───────────────────────────────────────────────────────────
export const CATEGORY_IMAGES: Record<string, string> = {};

/** @deprecated Use getArticleImage with an imagePool instead */
export function getNewsImage(category: string, title: string, imagePool?: string[]): string {
  if (imagePool && imagePool.length > 0) {
    return getArticleImage(category, title, imagePool);
  }
  const topicOrder = CATEGORY_TOPIC_ORDER[category as NewsCategory] ?? ["general"];
  const topic = topicOrder[0] as PhotoTopic;
  const pool = PHOTOS[topic] as readonly string[];
  return pool[titleHash(title ?? "") % pool.length];
}

export function getCategoryImage(category: string): string {
  const topic = (CATEGORY_TOPIC_ORDER[category as NewsCategory]?.[0] ?? "general") as PhotoTopic;
  const pool = PHOTOS[topic] as readonly string[];
  return pool[titleHash(category) % pool.length];
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}
