import supabaseAdmin from "@/lib/supabaseServerClient";

import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ short_code: string }>;
}) {
  // Await the params to get the actual values
  const { short_code } = await params;

  const { data, error } = await supabaseAdmin
    .from("links")
    .select("long_url, clicks")
    .eq("short_code", short_code)
    .single();

  if (error || !data) {
    console.log("error occured", error);
    redirect("/not-found");
  }

  // Increment the clicks count
  const { error: updateError } = await supabaseAdmin
    .from("links")
    .update({ clicks: (data.clicks || 0) + 1 })
    .eq("short_code", short_code);

  if (updateError) {
    console.warn("Failed to update clicks count", updateError);
  }

  redirect(data.long_url);
}
