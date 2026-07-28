import { redirect } from "next/navigation";

// Opening a project lands on the aerial Map tab (spec: "creating a project opens
// an aerial map centred on that address"). The parent layout already checks
// access + ownership.
export default async function ProjectIndexPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  redirect(`/measuremap/projects/${projectId}/map`);
}
