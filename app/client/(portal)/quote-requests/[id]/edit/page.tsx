import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { getQuoteCategoryTree } from "@/lib/quote-categories";
import QuoteRequestForm from "@/components/client/QuoteRequestForm";

export const dynamic = "force-dynamic";

export default async function EditQuoteRequestPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/client/quote-requests");

  const { id } = await params;
  const requestId = Number(id);
  if (!Number.isInteger(requestId)) notFound();

  const r = await prisma.clientQuoteRequest.findFirst({ where: { id: requestId, client_user_id: user.id } });
  if (!r) notFound();
  // Closed requests are read-only.
  if (r.status === "closed") redirect(`/client/quote-requests/${requestId}`);

  const categoryTree = await getQuoteCategoryTree();

  return (
    <QuoteRequestForm
      mode="edit"
      requestId={r.id}
      categories={categoryTree}
      defaults={{
        contactName: r.contact_name,
        contactEmail: r.contact_email,
        contactPhone: r.contact_phone ?? "",
        companyName: r.company_name ?? "",
      }}
      initial={{
        contactName: r.contact_name,
        contactEmail: r.contact_email,
        contactPhone: r.contact_phone ?? "",
        companyName: r.company_name ?? "",
        buildingAddress: r.building_address,
        suburb: r.suburb,
        postcode: r.postcode,
        strataPlanNumber: r.strata_plan_number ?? "",
        propertyType: r.property_type,
        workCategoryId: String(r.work_category_id),
        description: r.description,
        urgency: r.urgency,
        preferredInspection: r.preferred_inspection ?? "",
        consultantScopeAvailable: r.consultant_scope_available,
        budgetRange: r.budget_range ?? "",
      }}
    />
  );
}
