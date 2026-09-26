import type { ReactNode } from "react";
import { requireSchemeAccess } from "@/lib/strata/access";
import AiPanel from "./AiPanel";
import EntitlementBanner from "./EntitlementBanner";

/**
 * Wraps every page of a scheme so the AI button is available throughout. The
 * panel is the module's only AI surface — nothing else calls a model, and
 * nothing happens until somebody opens it and asks.
 *
 * The button renders for every member, whether or not this environment has an
 * API key configured. Hiding it when the key is missing produced no button and
 * no explanation, which is indistinguishable from a bug — better to show the
 * panel and let it say what is wrong.
 */
export default async function SchemeLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const schemeId = Number(id);

  // The pages do their own access check and 404; this only decides whether the
  // button is worth rendering at all.
  const access = await requireSchemeAccess(schemeId);

  return (
    <>
      {access && (
        <div className="mb-4">
          <EntitlementBanner entitlement={access.entitlement} />
        </div>
      )}
      {children}
      {access && <AiPanel schemeId={schemeId} />}
    </>
  );
}
