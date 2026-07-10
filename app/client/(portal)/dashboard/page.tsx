import { redirect } from "next/navigation";

export default function ClientDashboardPage() {
  redirect("/directory/dashboard/quotes");
}
