import { redirect } from "next/navigation";

// Moved to the Client portal.
export default async function QuoteRequestDetailRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/client/quote-requests/${id}`);
}
