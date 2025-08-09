import { NextRequest, NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseServerClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies  } from "next/headers";

export async function POST(request: NextRequest) {
   
  const { email, username, password } = await request.json();


  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();
  if (data) {
    // Username already exists — abort registration

    return NextResponse.json(
      { error: "Username already exist!" },
      { status: 400 }
    );
  }

 

  const supabase = createRouteHandlerClient({ cookies});
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
  
    
    if(signUpError.status == 422){
      return NextResponse.json(
      { error: "New Sign-ups are disabled atm!" },
      { status: 400 }
    );
    }
    return NextResponse.json(
      { error: "Email is already registered!",data:signUpError },
      { status: 400 }
    );
  }

  const userId = signUpData.user?.id;



  if (userId) {

    const res = await supabase
      .from("profiles")
      .insert([{ id: userId, username, email }]);
    

      if(res.error){
       
        return NextResponse.json(
      { message: "Error in adding the username" ,data:res},
      { status: 403 }
    );
      }
    return NextResponse.json(
      { message: "User registered successfully.", data: signUpData },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { error: "Error Occurred during registration" },
    { status: 400 }
  );
}
