import type { ReactNode } from "react";
import { hasAnthropicKey } from "@/lib/anthropic";
import { requireSchemeAccess } from "@/lib/strata/access";
import AiPanel from "./AiPanel";

/**
 * Wraps every page of a scheme so the AI button is available throughout. The
 * panel is the module's only AI surface — nothing else calls a model, and
 * nothing happens until somebody opens it and asks.
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
      {children}
      {access && hasAnthropicKey() && <AiPanel schemeId={schemeId} />}
    </>
  );
}
