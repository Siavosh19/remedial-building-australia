import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://remedialbuildingaustralia.com.au";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase();

  if (!email) {
    return NextResponse.redirect(`${BASE_URL}/?unsubscribe=missing`);
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .ilike("email", email);

  if (error) {
    console.error("[unsubscribe] error:", error);
    return NextResponse.redirect(`${BASE_URL}/?unsubscribe=error`);
  }

  return NextResponse.redirect(`${BASE_URL}/?unsubscribe=success`);
}
