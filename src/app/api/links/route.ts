import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
 
  
  const {
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

  const {data:user,error:userError} = await supabase.from("profiles").select("username").eq("id",userId).single();


  if (error || userError) return NextResponse.json({ error: error?.message || userError?.message }, { status: 400 });
  return NextResponse.json({ links: data,username: user.username });
}
