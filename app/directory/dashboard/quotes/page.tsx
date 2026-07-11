import { redirect } from "next/navigation";

// Client quote requests now live in the dedicated Client portal (role switch).
export default function MyQuoteRequestsRedirect() {
  redirect("/client/quote-requests");
}
