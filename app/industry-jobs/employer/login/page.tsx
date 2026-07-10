import { redirect } from "next/navigation";

// Jobs employers now sign in with their directory account (magic-link retired).
export default function EmployerLoginRedirect() {
  redirect("/directory/login?next=/directory/dashboard/jobs");
}
