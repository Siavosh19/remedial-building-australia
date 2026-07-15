import { redirect } from "next/navigation";

// ── DISMANTLED (2026-07-15) ──────────────────────────────────────────────────
// The old "Choose who to request quotes from" page hand-picked up to 5 businesses
// and did a server-side self-fetch to /api/directory/search that could hang
// ("Finding businesses…" freeze). The platform now AUTO-BROADCASTS on submit (see
// lib/quote-broadcast.ts), so this step is gone. This route just forwards to the
// request page. The previous implementation + ResultsClient.tsx are preserved in
// git history / the ResultsClient component if the pick-list is ever restored.
export default async function QuoteRequestResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/client/quote-requests/${id}`);
}
