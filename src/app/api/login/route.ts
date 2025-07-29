import { supabaseServerClient } from "@/lib/supabaseServerClient";
import { NextResponse } from "next/server";

export async function POST(request:Request) {

    const {username,password} = await request.json();

    const supabase = supabaseServerClient();

    const {data,error} = await supabase.from("profiles").select("email").eq("username",username).single();

    if(error){
        return NextResponse.json({error:"User not found!"},{status:404})
    }
  
    const email = data.email;
    
// console.log(email)
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
  email,
  password,
})
if (authError) {
  // handle login error
  return NextResponse.json({error:"Error occurred at Login!"},{status:400})
}

    return NextResponse.json({message:"Login Successfull!"},{status:200})
    
}