import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { getQuoteCategoryTree } from "@/lib/quote-categories";
import QuoteRequestForm from "@/components/client/QuoteRequestForm";

export const dynamic = "force-dynamic";

export default async function NewQuoteRequestPage() {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/client/quote-requests/new");

  const profile = await prisma.clientProfile.findUnique({ where: { user_id: user.id } });
  const categoryTree = await getQuoteCategoryTree();

  return (
    <QuoteRequestForm
      categories={categoryTree}
      defaults={{
        contactName: user.full_name ?? "",
        contactEmail: user.email,
        contactPhone: user.phone ?? "",
        companyName: profile?.company_name ?? "",
      }}
    />
  );
}
