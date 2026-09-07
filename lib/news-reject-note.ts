// The one-line note that stands in for a summary on a rejected article.
//
// Rejected rows used to arrive with a title and nothing else, so the only way
// to tell a wrongly-rejected article from a genuinely off-topic one was to open
// the source link. The ingest now asks the classifier for a sentence or two on
// its way past — what the article is about, and why it did not qualify — and
// files it in the summary column, which is what the admin row already reads.
//
// It goes in `summary` rather than a column of its own so the whole existing
// backlog can be filled in without a migration. The prefix is what keeps the
// two apart: a note is not editorial copy, so anything that turns a rejected
// article back into a published one has to replace it, never keep it.

export const REJECT_NOTE_PREFIX = "Not relevant —";

/** Wrap a classifier's reason as a reject note. */
export function formatRejectNote(reason: string | null | undefined): string {
  const text = (reason ?? "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  const body = text.replace(/^not relevant\s*[—–-]\s*/i, "");
  if (!body) return "";
  // The reason runs on from the prefix, so it wants a lower-case start — but
  // only where that is safe. "NSW" and "ACCC" open plenty of these lines, and
  // knocking the first letter down would leave "nSW".
  const joins = /^[A-Z][a-z]/.test(body);
  const head = joins ? body.charAt(0).toLowerCase() : body.charAt(0);
  return `${REJECT_NOTE_PREFIX} ${head}${body.slice(1)}`;
}

/** True when a summary is one of our reject notes rather than editorial copy. */
export function isRejectNote(summary: string | null | undefined): boolean {
  return (summary ?? "").trimStart().startsWith(REJECT_NOTE_PREFIX);
}
