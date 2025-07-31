import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request:Request) {
  const supabase = createRouteHandlerClient({ cookies });
 
  
  let {
  data:{session}
} = await supabase.auth.getSession();

if(!session){
  return NextResponse.json({error:"Invalid Authentication"})
}
const userId = session?.user?.id;

const { data, error } = await supabase
  .from("links")
  .select("*")
  .eq("owner_id", userId)
  .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ links: data });
}
