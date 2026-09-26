import type { ReactNode } from "react";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { TERMS_VERSION } from "@/lib/strata/terms";
import TermsGate from "./TermsGate";

/**
 * Gates the whole strata module on acceptance of the current terms. Doing it in
 * the layout means there is no page, and no deep link, that can be reached
 * without having agreed — and bumping TERMS_VERSION re-asks everybody.
 */
export default async function StrataLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentDirectoryUser();
  if (!user) return <>{children}</>;

  const accepted = await prisma.strataTermsAcceptance.findUnique({
    where: { user_id_version: { user_id: user.id, version: TERMS_VERSION } },
    select: { id: true },
  });

  if (!accepted) return <TermsGate />;
  return <>{children}</>;
}
