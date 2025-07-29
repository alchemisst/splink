import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabaseServerClient";

export async function POST(request: Request) {
  const { email, username, password } = await request.json();
  const supabase = supabaseServerClient();

  const { data, error } = await supabase
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
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) {
    // Show error (email in use, invalid, etc.)

    return NextResponse.json(
      { error: "Email is already registered!" },
      { status: 400 }
    );
  }

  const userId = signUpData.user?.id;

  if (userId) {

    const res = await supabase
      .from("profiles")
      .insert([{ id: userId, username, email }]);
    

      if(res.error){
        console.log(res)
        return NextResponse.json(
      { message: "Error in adding the username" },
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
