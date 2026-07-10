import { redirect } from "next/navigation";

export default async function EditJobRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/directory/dashboard/jobs/${id}/edit`);
}
