// Government news: what counts as an official source, and what counts as a
// government topic.
//
// Two different questions, deliberately kept apart:
//
//   isGovernmentSourceUrl()  — is this link the government's own website?
//                              That is what earns the yellow highlight in the
//                              news admin. A newspaper article ABOUT the
//                              Building Commission is not a government source.
//
//   isGovernmentTopic()      — is this article about a government matter
//                              (Building Commission NSW, a regulator, an Act,
//                              a code change)? Those are the articles worth
//                              chasing an official source for.

const GOV_HOST_SUFFIXES = [
  ".gov.au",
  ".gov",
  ".govt.nz",
  ".judgments.fedcourt.gov.au",
];

// Australian government bodies that publish from a non-.gov.au domain.
const GOV_HOSTS = [
  "abcb.gov.au",
  "ncat.nsw.gov.au",
  "legislation.nsw.gov.au",
  "legislation.gov.au",
  "caselaw.nsw.gov.au",
  "parliament.nsw.gov.au",
  "aph.gov.au",
  "standards.org.au", // Standards Australia — not a department, but the official standards body
];

/** True when the URL points at a government (or official standards) website. */
export function isGovernmentSourceUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return false;
  }
  if (GOV_HOSTS.includes(host)) return true;
  if (GOV_HOSTS.some((h) => host.endsWith(`.${h}`))) return true;
  return GOV_HOST_SUFFIXES.some((suffix) => host === suffix.slice(1) || host.endsWith(suffix));
}

// Topics that mean "a government body did something" — a regulator, a minister,
// an Act, a code, an inquiry, a court or tribunal.
const GOV_TOPIC_PATTERNS: RegExp[] = [
  /\bbuilding commission(er)?\b/i,
  /\bnsw building commission\b/i,
  /\bdavid chandler\b/i,
  /\bfair trading\b/i,
  /\bdepartment of customer service\b/i,
  /\bconstruct nsw\b/i,
  /\bdbp act\b|\bdesign (and|&) building practitioners?\b/i,
  /\brab act\b|\bresidential apartment buildings?\b/i,
  /\bhome building act\b/i,
  /\bstrata schemes management act\b/i,
  /\bbuilding bill\b|\bbuilding act\b/i,
  /\bnational construction code\b|\bNCC\b/,
  /\bbuilding code of australia\b|\bBCA\b/,
  /\babcb\b|\baustralian building codes board\b/i,
  /\bregulator|\bregulation(s)?\b|\blegislation\b|\bstatutory\b/i,
  /\bminister\b|\bparliament\b|\bgovernment\b|\bpremier\b/i,
  /\bicac\b|\bombudsman\b|\bauditor[- ]general\b/i,
  /\bncat\b|\btribunal\b|\bsupreme court\b|\bfederal court\b/i,
  /\bsafework\b|\bworksafe\b|\bwork health and safety\b/i,
  /\bicare\b|\bhbcf\b|\bhome building compensation\b/i,
  /\blicens(e|ing|ed)\b.{0,30}\b(builder|practitioner|trade)\b/i,
  /\baustralian standard\b|\bAS \d{4}\b|\bEN 1504\b/,
  /\bpublic (inquiry|consultation)\b|\bdiscussion paper\b|\bgreen paper\b|\bwhite paper\b/i,
  /\benforcement (action|notice)\b|\bprohibition order\b|\brectification order\b|\bstop work order\b/i,
];

// Categories that are government matters by definition.
const GOV_CATEGORIES = new Set(["Building Commission NSW", "DBP Act"]);

/**
 * True when an article is about a government matter — a regulator, an Act, a
 * code, an inquiry — whoever happened to report it. These are the articles
 * worth chasing an official government source for.
 */
export function isGovernmentTopic(article: {
  title?: string | null;
  summary?: string | null;
  category?: string | null;
  tags?: string[] | null;
}): boolean {
  if (article.category && GOV_CATEGORIES.has(article.category)) return true;

  const haystack = [
    article.title ?? "",
    article.summary ?? "",
    (article.tags ?? []).join(" "),
  ].join("\n");

  if (!haystack.trim()) return false;
  return GOV_TOPIC_PATTERNS.some((re) => re.test(haystack));
}

/** Readable publisher name for a government URL, e.g. "NSW Fair Trading". */
export function governmentAgencyFromUrl(url: string): string | null {
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
  const KNOWN: Record<string, string> = {
    "fairtrading.nsw.gov.au": "NSW Fair Trading",
    "buildingcommission.nsw.gov.au": "Building Commission NSW",
    "nsw.gov.au": "NSW Government",
    "abcb.gov.au": "Australian Building Codes Board",
    "legislation.nsw.gov.au": "NSW Legislation",
    "legislation.gov.au": "Federal Register of Legislation",
    "ncat.nsw.gov.au": "NSW Civil and Administrative Tribunal",
    "caselaw.nsw.gov.au": "NSW Caselaw",
    "parliament.nsw.gov.au": "Parliament of NSW",
    "safework.nsw.gov.au": "SafeWork NSW",
    "icare.nsw.gov.au": "icare NSW",
    "planning.nsw.gov.au": "NSW Department of Planning",
    "standards.org.au": "Standards Australia",
  };
  if (KNOWN[host]) return KNOWN[host];
  const hit = Object.keys(KNOWN).find((k) => host.endsWith(`.${k}`));
  if (hit) return KNOWN[hit];

  // Fall back to the agency label in the hostname: "vba.vic.gov.au" → "VBA (VIC)".
  const parts = host.split(".");
  if (parts.length >= 3 && host.endsWith(".gov.au")) {
    const agency = parts[0].toUpperCase();
    const state = parts.length >= 4 ? parts[1].toUpperCase() : "AU";
    return `${agency} (${state})`;
  }
  return null;
}
