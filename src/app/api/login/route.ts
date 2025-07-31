import supabseAdmin from "@/lib/supabaseServerClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request:Request) {

    const {username,password} = await request.json();

  const {data,error} = await supabseAdmin.from("profiles").select("email").eq("username",username).single();

    if(error){
        return NextResponse.json({error:"User not found!",data:data},{status:404})
    }
  

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
  email:data.email,
  password,
})
if (authError) {
  // handle login error
  return NextResponse.json({error:"Error occurred at Login!"},{status:400})
}

    return NextResponse.json({message:"Login Successfull!"},{status:200})
    
}