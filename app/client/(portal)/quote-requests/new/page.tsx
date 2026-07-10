import { redirect } from "next/navigation";

export default function NewQuoteRequestPage() {
  redirect("/directory/dashboard/quotes/new");
}
