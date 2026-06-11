import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import QuoteRequestsClient from "./QuoteRequestsClient";

export const dynamic = "force-dynamic";

export default async function QuoteRequestsPage() {
  const user = await getCurrentDirectoryUser();

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user?.id ?? 0 } } },
    select: { id: true, plan_type: true, quote_requests_enabled: true },
  });

  const quotes = company
    ? await prisma.quoteRequest.findMany({
        where: { company_id: company.id },
        orderBy: { created_at: "desc" },
        take: 200,
      })
    : [];

  const serialised = quotes.map((q) => ({
    ...q,
    created_at: q.created_at.toISOString(),
    updated_at: q.updated_at.toISOString(),
    responded_at: q.responded_at?.toISOString() ?? null,
  }));

  return (
    <QuoteRequestsClient
      quotes={serialised}
      planType={company?.plan_type ?? "basic"}
      quoteRequestsEnabled={company?.quote_requests_enabled ?? false}
    />
  );
}
