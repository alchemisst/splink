import supabaseAdmin from "@/lib/supabaseServerClient";
import { param } from "framer-motion/m";
import { NextRequest, NextResponse } from "next/server";


function isValidEmail(email:string) {
  // Basic email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateInput(name:string, email:string, message:string) {
  if (!name || name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters.' };
  }
  if (!email || !isValidEmail(email)) {
    return { valid: false, error: 'A valid email is required.' };
  }
  if (!message || message.trim().length === 0) {
    return { valid: false, error: 'Message cannot be empty.' };
  }
  return { valid: true };
}
export async function POST(request:NextRequest) {
     const { name,email,message } = await request.json();

     const rawIP = request.headers.get("x-forwarded-for") || "::1";
  const clientIP = rawIP.split(",")[0].trim();

  const { count, error: countError } = await supabaseAdmin
  .from('contact')
  .select('id', { count: 'exact', head: true })
  .eq('ip_address', clientIP)
  


  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }
  if ((count ?? 0) >= 1) {
    return NextResponse.json({
      error: 'Message recieved already!',
    }, { status: 403 });
  }

  

// Usage
const { valid, error } = validateInput(name, email, message);
if (!valid) {
  return NextResponse.json({error:"Data should be in text format!"},{status:500})
} else {
  // Proceed to insert into Supabase
  const { data:insertedData,error: insertError } = await supabaseAdmin
    .from('contact')
    .insert([{ name, email,message, ip_address: clientIP }]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ message:"Sent Successfully!"}, { status: 201 });
}

    


}