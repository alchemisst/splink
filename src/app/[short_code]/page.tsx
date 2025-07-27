import { supabaseServerClient } from "@/lib/supabaseServerClient";

import { redirect } from "next/navigation";

interface PageProps {
  params: { short_code: string };
}
export default async function Page({ params }: PageProps) {
  const { short_code } = params;

  const supabase = supabaseServerClient();

  const { data, error } = await supabase
    .from("links")
    .select("long_url")
    .eq("short_code", short_code)
    .single();

  console.log(data);
  if (error || !data) {
    console.log("error occured", error);
    redirect("/not-found");
  }

  redirect(data.long_url);
}
