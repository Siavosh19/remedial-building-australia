// The pre-publish read: a one-glance summary of an ingested article, plus the
// legal points worth checking before it goes on the site.
//
// These are PROMPTS, not verdicts. Everything here is pattern matching over
// the title and summary, so it will miss things and it will occasionally flag
// something harmless. It exists so the reviewer sees the question — "does this
// name someone in a dispute?" — without having to open every article.
//
// The four risks it looks for, in the order they actually matter for RBA:
//
//   1. Defamation. Republishing a claim makes RBA a publisher of it. This is
//      the only one on the list that arrives as a claim for money rather than
//      a takedown request, so it leads.
//   2. Compliance claims about named products. If RBA asserts in its own voice
//      that a product meets a standard, that is RBA's representation under
//      ACL s18/s29 — the manufacturer's, if it is attributed to them.
//   3. Standards copyright. Clause numbers are free to cite; clause text,
//      tables and figures are not.
//   4. Source quality. A press-release wire is marketing, and is usually
//      syndicated under terms that forbid republication.
//
// Not checked, because it is already handled: images. Every article gets its
// picture from RBA's own category pool (lib/news-categories.ts
// getCategoryImage), never from the source, so there is no third-party photo
// to license.

import { sourceTier, trustedBodyName } from "@/lib/news-source-tiers";

export type FlagLevel = "clear" | "note" | "caution";

export type PublishFlag = {
  level: FlagLevel;
  label: string;
  /** What to actually check before clicking Publish. */
  detail: string;
};

/** Trim the two-paragraph article summary down to something readable in a row. */
export function shortSummary(
  summary: string | null | undefined,
  limit = 240,
): string {
  const text = (summary ?? "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  if (text.length <= limit) return text;

  // Prefer to stop at a sentence end, so the row does not read as truncated
  // mid-clause. Only accept one that lands in the back half of the budget —
  // an early full stop would throw away most of the summary.
  const window = text.slice(0, limit);
  const lastStop = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "), window.lastIndexOf("! "));
  if (lastStop > limit * 0.5) return window.slice(0, lastStop + 1);

  const lastSpace = window.lastIndexOf(" ");
  return `${window.slice(0, lastSpace > 0 ? lastSpace : limit).trimEnd()}…`;
}

// An allegation of wrongdoing, failure or loss. On its own this is harmless —
// it only matters when it lands next to somebody's name.
const ADVERSE = /\b(sued?|suing|lawsuit|litigation|liquidat\w*|insolven\w*|administration|collapsed?|wound up|charged|convicted|prosecut\w*|fined|penalt\w*|banned|disqualif\w*|deregister\w*|negligen\w*|misconduct|fraud\w*|defective|defects?|breach\w*|fail(?:ed|ure|ing)|unlicensed|cover-?up|shoddy|dodgy)\b/i;

// A company-shaped proper noun. Deliberately narrow — it wants a corporate
// suffix rather than any capitalised word, so headlines about "Sydney" or
// "Monday" do not trip it.
const NAMED_ENTITY = /\b([A-Z][A-Za-z&'’-]+(?:\s+[A-Z][A-Za-z&'’-]+){0,3})\s+(Pty\.?\s*Ltd\.?|Ltd\.?|Limited|Group|Constructions?|Builders?|Building\s+Co\.?|Developments?|Developers?|Homes|Projects|Holdings|Corporation|Partners)\b/;

const COURT = /\b(NCAT|VCAT|QCAT|Supreme Court|Federal Court|District Court|Court of Appeal|tribunal|judgment|judgement|proceedings)\b/i;

// "complies with AS 3740", "certified to AS/NZS 4858", "meets AS 4654.2"
const COMPLIANCE_CLAIM = /\b(compl(?:y|ies|iant|iance)\s+with|certified\s+to|approved\s+to|tested\s+to|meets|conforms\s+to)\s+(AS\/NZS|AS|EN|ISO)\s?\d/i;

const STANDARD_CITED = /\b(AS\/NZS|AS|EN|ISO)\s?\d{3,5}(\.\d+)?\b/;

const STANDARD_BODY = /\b(table|clause|figure|appendix)\s+\d/i;

// Press-release distribution, not journalism.
const WIRE_HOSTS = [
  "prnewswire.com", "businesswire.com", "globenewswire.com", "einpresswire.com",
  "openpr.com", "accesswire.com", "newsfilecorp.com", "prweb.com",
  "stocktitan.net", "indexbox.io", "marketsandmarkets.com", "researchandmarkets.com",
  "benzinga.com", "digitaljournal.com", "menafn.com",
];

function hostOf(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function publishFlags(article: {
  title?: string | null;
  summary?: string | null;
  source_url?: string | null;
  source_name?: string | null;
}): PublishFlag[] {
  const text = `${article.title ?? ""}\n${article.summary ?? ""}`;
  const tier = sourceTier(article.source_url);
  const host = hostOf(article.source_url);
  const flags: PublishFlag[] = [];

  // ── 1. Defamation ────────────────────────────────────────────────────────
  const named = NAMED_ENTITY.exec(text);
  if (named && ADVERSE.test(text)) {
    flags.push({
      level: "caution",
      label: `Names ${named[1]}`,
      detail:
        "Repeating someone else's allegation makes RBA a publisher of it. Publish only if the summary is a fair and accurate report of what the source actually said, and the source is one you would be comfortable naming in a defence.",
    });
  } else if (COURT.test(text)) {
    flags.push({
      level: "note",
      label: "Court or tribunal matter",
      detail:
        "Fair-report protection covers an accurate account of proceedings. It stops covering you the moment the summary characterises the parties beyond what the decision says.",
    });
  }

  // ── 2. Compliance claims about products ──────────────────────────────────
  if (COMPLIANCE_CLAIM.test(text)) {
    flags.push({
      level: "caution",
      label: "Product compliance claim",
      detail:
        "Reword so the manufacturer makes the claim, not RBA — \"Sika states the product meets AS 4654.2\". Asserted in RBA's own voice it is an ACL s18/s29 representation, and RBA has not tested anything.",
    });
  }

  // ── 3. Standards copyright ───────────────────────────────────────────────
  if (STANDARD_CITED.test(text) && STANDARD_BODY.test(text)) {
    flags.push({
      level: "note",
      label: "Reproduces standard content",
      detail:
        "Citing a clause number is fine. Reproducing the clause text, a table or a figure from a Standards Australia document is not, and they enforce it.",
    });
  }

  // ── 4. Source quality ────────────────────────────────────────────────────
  if (host && WIRE_HOSTS.some((w) => host === w || host.endsWith(`.${w}`))) {
    flags.push({
      level: "caution",
      label: "Press-release wire",
      detail:
        "Marketing copy carried by a distribution service, not reporting. Usually syndicated under terms that forbid republication, and it is written to sell something.",
    });
  } else if (tier === "other" && !article.source_name) {
    flags.push({
      level: "note",
      label: "Unidentified source",
      detail: "No publisher recorded. Open the original link and check who wrote it before publishing.",
    });
  }

  // Nothing flagged, and it came from an agency or a peak body — say so
  // plainly, so a clean row reads as checked rather than as unprocessed.
  if (!flags.length && tier !== "other") {
    flags.push({
      level: "clear",
      label: tier === "government" ? "Official publication" : `${trustedBodyName(article.source_url)} release`,
      detail:
        tier === "government"
          ? "The agency's own publication. Crown material, written to be quoted, and the safest category on this page to publish."
          : "A peak body's own release. Written to be picked up, so the defamation risk sits with them — but the copyright is still theirs, so keep it to a summary and a link.",
    });
  }

  return flags;
}

export const FLAG_STYLE: Record<FlagLevel, string> = {
  clear: "bg-emerald-100 text-emerald-800",
  note: "bg-slate-100 text-slate-600",
  caution: "bg-rose-100 text-rose-700",
};
