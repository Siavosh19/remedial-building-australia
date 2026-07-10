import { redirect } from "next/navigation";

// Posting a job now lives inside the merged directory portal.
export default function PostJobRedirect() {
  redirect("/directory/dashboard/jobs/new");
}
