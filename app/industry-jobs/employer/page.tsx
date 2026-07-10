import { redirect } from "next/navigation";

// Jobs employer portal has merged into the directory dashboard.
export default function EmployerDashboardRedirect() {
  redirect("/directory/dashboard/jobs");
}
