import { redirect } from "next/navigation";

// Consolidated into "Epoxy anchoring & crack-stitching adhesives" — structural
// crack-stitching dowels and post-installed dowelling use the same AS 5216
// anchoring adhesives covered there. This route redirects to that page.
export default function Page() {
  redirect("/repair-systems/concrete-cracking/epoxy-anchoring-adhesives");
}
