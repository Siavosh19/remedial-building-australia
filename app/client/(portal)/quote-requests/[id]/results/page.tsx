import { redirect } from "next/navigation";

export default async function QuoteRequestResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/directory/dashboard/quotes/${id}/results`);
}
