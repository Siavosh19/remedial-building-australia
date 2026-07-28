import type { ReactNode } from "react";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import MeasureMapShell from "@/components/measuremap/MeasureMapShell";

// Server-enforced gate for the whole MeasureMap workspace. Every route rendered
// under this layout is guaranteed an authorised user (login + active access).
// access-restricted lives OUTSIDE this group on purpose, to avoid a redirect
// loop for authenticated-but-unauthorised users.
export const dynamic = "force-dynamic"; // never statically prerender an auth-gated view

export default async function MeasureMapWorkspaceLayout({ children }: { children: ReactNode }) {
  const user = await requireMeasureMapUser();
  return <MeasureMapShell email={user.email}>{children}</MeasureMapShell>;
}
