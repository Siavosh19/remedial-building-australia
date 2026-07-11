import { redirect } from "next/navigation";

// Moved to the Client portal.
export default function NewQuoteRequestRedirect() {
  redirect("/client/quote-requests/new");
}
