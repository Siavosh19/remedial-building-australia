// Government news: what counts as an official source, and what counts as a
// government topic.
//
// Three different questions, deliberately kept apart:
//
//   isGovernmentSourceUrl()  — is this link the government's own website?
//                              A newspaper article ABOUT the Building
//                              Commission is not a government source.
//
//   isGovernmentTopic()      — is this article about a government matter
//                              (Building Commission NSW, a regulator, an Act,
//                              a code change)? Those are the articles worth
//                              chasing an official source for, so this test is
//                              kept tight — every candidate costs a web search.
//
//   isGovernmentRelated()    — the widest of the three, and the one that
//                              colours the admin review list grey. Anything
//                              touching a regulator, an Act, a code, a
//                              statutory instrument or an NCC building class
//                              counts. Nothing is searched or spent off the
//                              back of it, so it can afford to be generous.

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
  "austlii.edu.au", // free public access to Australian legislation and judgments
  "safeworkaustralia.gov.au",
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

// ─── Named bodies, Acts, codes, instruments — conclusive by themselves ───────

// Acronyms are matched case-sensitively. Lower-cased they collide with ordinary
// words ("sat", "vba"), and no publication writes them in lower case anyway.
//
// NCC is deliberately absent: nearly every enrichment summary reaches for it
// when explaining why a story matters, so read anywhere it marks the whole
// page. A dated edition ("NCC 2025") is specific enough to keep, and the bare
// acronym is picked up from the headline by GOV_REGULATORY_TERMS below.
const GOV_ACRONYMS =
  /\b(ABCB|NCAT|VCAT|QCAT|SACAT|ACAT|NTCAT|SAT|QBCC|VBA|BPC|DBDRV|VMIA|CBOS|HBCF|SOPA|DBP|RAB|EPA Act|ICAC|ACCC|MBIE|DEMIRS)\b/;

const GOV_STRONG_PATTERNS: RegExp[] = [
  GOV_ACRONYMS,

  // ── NSW: the primary market ──
  /\bbuilding commission(er)?\b/i,
  /\boffice of the building commissioner\b/i,
  /\bdavid chandler\b/i,
  /\bfair trading\b/i,
  /\bdepartment of customer service\b/i,
  /\bconstruct nsw\b/i,
  /\bproject (intervene|remediate)\b/i,
  /\bstrata hub\b/i,
  /\bstrata and property services commissioner\b/i,
  /\bbuilding practitioners? (board|registration|scheme)\b/i,
  /\bdbp act\b|\bdesign (and|&) building practitioners?\b/i,
  /\brab act\b|\bresidential apartment buildings? act\b/i,
  /\bhome building act\b|\bstrata schemes (management|development) act\b/i,
  /\bsecurity of payment act\b/i,
  /\benvironmental planning (and|&) assessment act\b|\bep&a act\b/i,
  /\bbuilding (act|bill|regulation|amendment) \d{4}\b/i,
  /\b[A-Z][\w(),’'&-]*(?: [\w(),’'&-]+){0,7} (Act|Bill|Regulations?|Amendment) \d{4}\b/,
  /\bnsw building bill\b|\bbuilding compliance and enforcement\b/i,

  // ── Other states and territories ──
  /\bvictorian building authority\b|\bbuilding (and|&) plumbing commission\b/i,
  /\bcladding safety victoria\b|\bdomestic building dispute resolution\b/i,
  /\bconsumer affairs victoria\b|\bvictorian managed insurance authority\b/i,
  /\bqueensland building (and|&) construction commission\b/i,
  /\boffice of fair trading\b|\bworkplace health (and|&) safety queensland\b/i,
  /\bbuilding (and|&) energy (division|regulator)\b|\bstate administrative tribunal\b/i,
  /\bconsumer (and|&) business services\b/i,
  /\bconsumer building (and|&) occupational services\b/i,
  /\baccess canberra\b|\bbuilding practitioners board\b/i,
  /\bministry of business, innovation (and|&) employment\b/i,

  // ── Federal and national ──
  /\bnational construction code\b|\bbuilding code of australia\b/i,
  /\bNCC ?20\d\d\b|\baustralian building codes board\b/i,
  /\bsafe work australia\b|\bsafework\b|\bworksafe\b/i,
  /\bstandards australia\b/i,
  /\baustralian competition (and|&) consumer commission\b|\bproduct safety australia\b/i,
  /\bnational housing accord\b|\bhousing australia\b/i,
  /\baustralian standard\b|\bAS ?\d{4}(\.\d+)?\b|\bAS\/NZS ?\d{4}\b|\bEN ?1504\b/,

  // ── Tribunals, courts, watchdogs ──
  /\bcivil and administrative tribunal\b/i,
  /\bland (and|&) environment court\b/i,
  /\broyal commission\b|\bombudsman\b|\bauditor[- ]general\b/i,
  /\bindependent commission against corruption\b/i,

  // ── Statutory instruments, orders and schemes ──
  /\bprohibition order\b|\brectification order\b|\bstop work order\b|\bbuilding work rectification\b/i,
  /\bshow cause notice\b|\bimprovement notice\b|\binfringement notice\b|\bpenalty notice\b/i,
  /\benforceable undertaking\b|\bministerial (order|direction)\b|\bgovernment gazette\b/i,
  /\bregulatory impact statement\b|\bstatutory instrument\b/i,
  /\bicare\b|\bhome building compensation\b|\bhome warranty insurance\b/i,
  /\bbuilding bond\b|\bstrata building bond\b/i,
  /\boccupation certificate\b|\bconstruction certificate\b|\bcomplying development certificate\b/i,
  /\bengineered stone ban\b|\bsilica (dust )?(ban|regulations?|rules)\b/i,
  /\bcombustible cladding (taskforce|register|programme|program|audit)\b/i,
];

// ─── General government language — only counts alongside a building subject ──

const GOV_WEAK_PATTERNS: RegExp[] = [
  /\bgovernment\b|\bminister(ial)?\b|\bparliament\b|\bpremier\b|\bcabinet\b|\bcommonwealth\b/i,
  /\bregulator|\bregulations?\b|\blegislation\b|\bstatutory\b|\blegislat(ed|ive|ion)\b/i,
  /\btribunal\b|\bsupreme court\b|\bfederal court\b|\bcourt (ruling|decision|found|ordered)\b/i,
  /\bpublic (inquiry|consultation)\b|\bconsultation (paper|draft|process)\b/i,
  /\bdiscussion paper\b|\bgreen paper\b|\bwhite paper\b|\bcode of practice\b/i,
  /\benforcement (action|notice|blitz)\b|\bpenalt(y|ies)\b|\bcompliance (order|notice)\b/i,
  /\bprosecut(e|ed|ion)\b|\bdisciplinary (action|proceedings)\b|\bcrackdown\b|\bwatchdog\b/i,
  /\blicens(e|ing|ed)\b|\baccreditation\b|\bcertifier\b|\bregistration scheme\b/i,
  /\breform(s)?\b|\binquiry\b|\bcode chang|\bmandat(e|ed|ory)\b|\bbanned\b/i,
  /\b(local|city|shire|municipal) council\b|\bcouncils\b/i,
  /\bpublic housing\b|\bsocial (and affordable )?housing\b/i,
  /\bgrant(s)? (program|scheme|funding)\b|\bsubsid(y|ies)\b|\blevy\b|\btaskforce\b/i,
];

// The building subject that a weak signal has to be attached to.
const BUILDING_CONTEXT = /\bbuilding(s)?\b|\bapartment(s)?\b|\bstrata\b|\bconstruction\b|\bbuilder(s)?\b|\bclass ?2\b|\bdefect(s|ive)?\b|\bwaterproof|\bconcrete\b|\bfa[cç]ade\b|\bcladding\b|\bremedial\b|\bowners corporation\b|\bdwelling(s)?\b|\bcertifier\b|\bhigh[- ]rise\b/i;

// ─── The colouring set: building terms that are statutory by nature ──────────
//
// These need no government word next to them — an NCC building class or an
// occupation certificate only exists because a regulation says so. They widen
// isGovernmentRelated() without widening what the gov-source sweep goes looking
// for, which is deliberately narrower and costs a web search per candidate.
const GOV_REGULATORY_TERMS: RegExp[] = [
  /\bclass ?(1a|1b|2|3|4|5|6|7a|7b|8|9a|9b|9c|10)\b/i,
  /\bncc\b|\bbuilding code\b|\bbuilding regulations?\b|\bbuilding standards?\b/i,
  /\bicirt\b|\bbuilding manual\b|\bdeemed[- ]to[- ]satisfy\b|\bperformance solution\b/i,
  /\bdevelopment application\b|\bplanning approval\b|\bdevelopment approval\b/i,
  /\bcertifier\b|\bcertification scheme\b|\bpractitioner registration\b/i,
  /\bcompliance (requirements?|obligations?|regime|deadline)\b/i,
];

// Categories that are government matters by definition.
const GOV_CATEGORIES = new Set(["Building Commission NSW", "DBP Act"]);

// Categories that are government-related for colouring purposes. Class 2 is an
// NCC building classification — the category only exists because the Code does.
const GOV_RELATED_CATEGORIES = new Set([...GOV_CATEGORIES, "Class 2 Buildings"]);

type ArticleLike = {
  title?: string | null;
  summary?: string | null;
  category?: string | null;
  tags?: string[] | null;
};

function haystackOf(article: ArticleLike): string {
  return [article.title ?? "", article.summary ?? "", (article.tags ?? []).join(" ")].join("\n");
}

// The headline and the tags — what the article is about, without the editorial
// summary underneath it. The summary's second paragraph always explains why the
// story matters to a remedial audience, so it reaches for "Class 2 buildings",
// "compliance" and "building regulations" whatever the subject was. Read the
// generic terms there and every article on the page turns out to be about the
// government. Named bodies and Acts are safe to read anywhere; the loose ones
// only count in the title.
function headlineOf(article: ArticleLike): string {
  return [article.title ?? "", (article.tags ?? []).join(" ")].join("\n");
}

/**
 * True when an article is about a government matter — a regulator, an Act, a
 * code, an inquiry — whoever happened to report it. These are the articles
 * worth chasing an official government source for.
 */
export function isGovernmentTopic(article: ArticleLike): boolean {
  if (article.category && GOV_CATEGORIES.has(article.category)) return true;

  const haystack = haystackOf(article);
  if (!haystack.trim()) return false;

  if (GOV_STRONG_PATTERNS.some((re) => re.test(haystack))) return true;

  // Generic government language only qualifies when the subject is a building.
  return GOV_WEAK_PATTERNS.some((re) => re.test(haystack)) && BUILDING_CONTEXT.test(haystack);
}

/**
 * The narrow version of the test above: the article names a specific body, Act,
 * code or instrument. These are the ones with an official document behind them
 * often enough to be worth searching first.
 */
export function isGovernmentStrongTopic(article: ArticleLike): boolean {
  if (article.category && GOV_CATEGORIES.has(article.category)) return true;
  const haystack = haystackOf(article);
  if (!haystack.trim()) return false;
  return GOV_STRONG_PATTERNS.some((re) => re.test(haystack));
}

/**
 * What made an article count as government-related — the words that matched,
 * for the badge tooltip in the news admin. Runs the tests in the same order
 * they are applied, so it reports the strongest signal present rather than
 * whichever one appears first on the page.
 */
export function governmentMatch(article: ArticleLike): string | null {
  if (article.category && GOV_RELATED_CATEGORIES.has(article.category)) return article.category;
  const haystack = haystackOf(article);
  if (!haystack.trim()) return null;
  for (const re of GOV_STRONG_PATTERNS) {
    const m = re.exec(haystack);
    if (m) return m[0].trim();
  }
  const headline = headlineOf(article);
  for (const re of GOV_REGULATORY_TERMS) {
    const m = re.exec(headline);
    if (m) return m[0].trim();
  }
  if (BUILDING_CONTEXT.test(haystack)) {
    for (const re of GOV_WEAK_PATTERNS) {
      const m = re.exec(headline);
      if (m) return m[0].trim();
    }
  }
  return null;
}

/**
 * The widest test: anything with government or regulatory content in it,
 * whoever published it. Used to grey out the row in the news admin so the
 * ordinary trade and market stories stand out white against it.
 */
export function isGovernmentRelated(article: ArticleLike): boolean {
  if (article.category && GOV_RELATED_CATEGORIES.has(article.category)) return true;

  const haystack = haystackOf(article);
  if (!haystack.trim()) return false;

  // A named body, Act or instrument counts wherever it appears.
  if (GOV_STRONG_PATTERNS.some((re) => re.test(haystack))) return true;

  // The loose terms only count in the headline — see headlineOf().
  const headline = headlineOf(article);
  if (GOV_REGULATORY_TERMS.some((re) => re.test(headline))) return true;
  return GOV_WEAK_PATTERNS.some((re) => re.test(headline)) && BUILDING_CONTEXT.test(haystack);
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
    "vba.vic.gov.au": "Victorian Building Authority",
    "qbcc.qld.gov.au": "Queensland Building and Construction Commission",
    "safeworkaustralia.gov.au": "Safe Work Australia",
    "austlii.edu.au": "AustLII",
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
