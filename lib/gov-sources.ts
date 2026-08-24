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

// A government matter is one of two things: a named body, Act, code or
// instrument (strong enough on its own), or general government language that
// happens to be attached to a building subject. The second test matters — on
// its own, "regulation" or "government" matches an EV-charging grant and a
// French materials-market report, and each false candidate costs a web search.

// Named bodies, Acts, codes, instruments — conclusive by themselves.
const GOV_STRONG_PATTERNS: RegExp[] = [
  /\bbuilding commission(er)?\b/i,
  /\bdavid chandler\b/i,
  /\bfair trading\b/i,
  /\bdepartment of customer service\b/i,
  /\bconstruct nsw\b/i,
  /\bdbp act\b|\bdesign (and|&) building practitioners?\b/i,
  /\brab act\b|\bresidential apartment buildings? act\b/i,
  /\bhome building act\b|\bstrata schemes management act\b/i,
  /\bbuilding (act|bill|regulation) \d{4}\b/i,
  /\bnational construction code\b|\bbuilding code of australia\b/i,
  /\bNCC ?20\d\d\b|\babcb\b|\baustralian building codes board\b/i,
  /\bncat\b|\bcivil and administrative tribunal\b/i,
  /\bsafework\b|\bworksafe\b/i,
  /\bicare\b|\bhbcf\b|\bhome building compensation\b/i,
  /\bbuilding bond\b|\bstrata building bond\b/i,
  /\bprohibition order\b|\brectification order\b|\bstop work order\b|\bbuilding work rectification\b/i,
  /\baustralian standard\b|\bAS ?\d{4}(\.\d+)?\b|\bEN ?1504\b/,
  /\bicac\b|\bombudsman\b|\bauditor[- ]general\b/i,
  /\bbuilding commissioner\b|\bbuilding regulator\b/i,
];

// General government language — only counts alongside a building subject.
const GOV_WEAK_PATTERNS: RegExp[] = [
  /\bgovernment\b|\bminister\b|\bparliament\b|\bpremier\b/i,
  /\bregulator|\bregulations?\b|\blegislation\b|\bstatutory\b|\blegislat(ed|ive|ion)\b/i,
  /\btribunal\b|\bsupreme court\b|\bfederal court\b|\bcourt (ruling|decision|found)\b/i,
  /\bpublic (inquiry|consultation)\b|\bdiscussion paper\b|\bgreen paper\b|\bwhite paper\b/i,
  /\benforcement (action|notice)\b|\bpenalt(y|ies)\b|\bcompliance (order|notice)\b/i,
  /\blicens(e|ing|ed)\b|\baccreditation\b|\bcertifier\b|\bregistration scheme\b/i,
  /\breform(s)?\b|\binquiry\b|\bcode chang/i,
];

// The building subject that a weak signal has to be attached to.
const BUILDING_CONTEXT = /\bbuilding(s)?\b|\bapartment(s)?\b|\bstrata\b|\bconstruction\b|\bbuilder(s)?\b|\bclass 2\b|\bdefect(s|ive)?\b|\bwaterproof|\bconcrete\b|\bfa[cç]ade\b|\bcladding\b|\bremedial\b|\bowners corporation\b|\bdwelling(s)?\b/i;

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

  if (GOV_STRONG_PATTERNS.some((re) => re.test(haystack))) return true;

  // Generic government language only qualifies when the subject is a building.
  return GOV_WEAK_PATTERNS.some((re) => re.test(haystack)) && BUILDING_CONTEXT.test(haystack);
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
