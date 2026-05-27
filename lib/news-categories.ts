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

// ─── Verified Unsplash photo pool (all HTTP 200 confirmed) ───────────────────
const U = "https://images.unsplash.com/photo-";
const Q = "?w=900&q=75&auto=format&fit=crop";

// Strictly construction-related photo pools only
const PHOTOS = {
  workers: [
    `${U}1504307651254-35680f356dfd${Q}`,
    `${U}1486325212027-8081e485255e${Q}`,
    `${U}1530268729831-4b0b9e170218${Q}`,
    `${U}1601597111158-2fceff292cdc${Q}`,
    `${U}1553877522-43269d4ea984${Q}`,
    `${U}1580587771525-78b9dba3b914${Q}`,
    `${U}1587620962725-abab7fe55159${Q}`,
  ],
  concrete: [
    `${U}1419242902214-272b3f66ee7a${Q}`,
    `${U}1581578731548-c64695cc6952${Q}`,
    `${U}1541888946425-d81bb19240f5${Q}`,
    `${U}1517048676732-d65bc937f952${Q}`,
    `${U}1487958449943-2429e8be8625${Q}`,
    `${U}1551434678-e076c223a692${Q}`,
  ],
  facades: [
    `${U}1526481280693-3bfa7568e0f3${Q}`,
    `${U}1497366216548-37526070297c${Q}`,
    `${U}1503387762-592deb58ef4e${Q}`,
    `${U}1600585152220-90363fe7e115${Q}`,
    `${U}1565193566173-7a0ee3dbe261${Q}`,
    `${U}1436491865332-7a61a109cc05${Q}`,
    `${U}1524178232363-1fb2b075b655${Q}`,
  ],
  site: [
    `${U}1493246507139-91e8fad9978e${Q}`,
    `${U}1570129477492-45c003edd2be${Q}`,
    `${U}1560518883-ce09059eeffa${Q}`,
    `${U}1589939705384-5185137a7f0f${Q}`,
    `${U}1507003211169-0a1dd7228f2d${Q}`,
  ],
};

// Category → preferred topic order (tries each in sequence to find an unused image)
const CATEGORY_TOPIC_ORDER: Record<string, Array<keyof typeof PHOTOS>> = {
  "Building Commission NSW": ["workers", "site", "concrete"],
  "DBP Act":                 ["site", "workers", "concrete"],
  "Class 2 Buildings":       ["site", "facades", "workers"],
  "Strata Defects":          ["site", "concrete", "workers"],
  "Waterproofing Defects":   ["concrete", "site", "workers"],
  "Façade Defects":          ["facades", "concrete", "workers"],
  "Concrete Repair":         ["concrete", "workers", "site"],
  "Building Defects":        ["site", "workers", "concrete"],
  "Remedial Construction":   ["workers", "concrete", "site"],
  "Product & Material Updates": ["site", "concrete", "workers"],
  "New Construction Systems":   ["site", "workers", "concrete"],
  "Other":                   ["site", "workers", "facades"],
};

// All photos flattened in one list for exhaustive fallback
const ALL_PHOTOS: string[] = Object.values(PHOTOS).flat();

function titleHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Assigns a unique Unsplash image to every article in the list.
 * - Prefers topic-matched photos for each category.
 * - Guarantees no two articles in the list share the same image URL.
 * - Avoids reserved image URLs when provided.
 * - Once the pool is exhausted (>34 articles), images cycle again.
 */
export function assignUniqueImages<T extends { title: string; category: string }>(
  articles: T[],
  reservedImages: string[] = []
): (T & { featured_image: string })[] {
  const used = new Set(reservedImages);

  return articles.map((article) => {
    const hash = titleHash(article.title ?? "");
    const topicOrder = CATEGORY_TOPIC_ORDER[article.category] ?? ["apartments", "workers", "facades"];

    let image: string | undefined;

    // Try preferred topic pools first
    for (const topic of topicOrder) {
      const pool = PHOTOS[topic];
      for (let i = 0; i < pool.length; i++) {
        const candidate = pool[(hash + i) % pool.length];
        if (!used.has(candidate)) { image = candidate; break; }
      }
      if (image) break;
    }

    // Fall back to global pool if all preferred topics exhausted
    if (!image) {
      for (let i = 0; i < ALL_PHOTOS.length; i++) {
        const candidate = ALL_PHOTOS[(hash + i) % ALL_PHOTOS.length];
        if (!used.has(candidate)) { image = candidate; break; }
      }
    }

    // Last resort: wrap around (only if >34 articles visible)
    if (!image) image = ALL_PHOTOS[hash % ALL_PHOTOS.length];

    used.add(image);
    return { ...article, featured_image: image };
  });
}

// Legacy — kept so ingest route still compiles
export const CATEGORY_IMAGES: Record<string, string> = {};
export function getNewsImage(category: string, title: string): string {
  const pool = PHOTOS[CATEGORY_TOPIC_ORDER[category]?.[0] ?? "apartments"];
  return pool[titleHash(title ?? "") % pool.length];
}
export function getCategoryImage(category: string): string {
  const pool = PHOTOS[CATEGORY_TOPIC_ORDER[category]?.[0] ?? "apartments"];
  return pool[titleHash(category) % pool.length];
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}
