import { redirect } from "next/navigation";

// Consolidated into "Rebar primers & inhibitors" — epoxy zinc-rich primers
// (Fosroc Nitoprime Zincrich, Ardex BR 10 ZP) are covered there alongside the
// cementitious rebar primers. This route redirects to the canonical page.
export default function Page() {
  redirect("/repair-systems/reinforcement-corrosion/rebar-primers-inhibitors");
}
