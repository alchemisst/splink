// src/app/api/shorten/route.ts
import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseServerClient";

import {
  createRouteHandlerClient,

} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { long_url } = await request.json();
  const rawIP = request.headers.get("x-forwarded-for") || "::1";
  const clientIP = rawIP.split(",")[0].trim();

  if (!long_url) {
    return NextResponse.json({ error: "Missing long_url" }, { status: 400 });
  }
  const short_code = Math.random().toString(36).slice(2, 12);

  const supabase = createRouteHandlerClient({ cookies });
  let {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data:insertedRow ,error } = await supabaseAdmin
      .from("links")
      .insert([
        { long_url, short_code, owner_id: user.id, ip_address: clientIP },
      ]).select("*");
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { ip_address, owner_id, ...publicData } = insertedRow[0];
    publicData.clicks = 0

    return NextResponse.json({data:publicData}, { status: 201 });
  }
const { count, error: countError } = await supabaseAdmin
  .from('links')
  .select('id', { count: 'exact', head: true })
  .eq('ip_address', clientIP)
  .is('owner_id', null); 


  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  if ((count ?? 0) >= 3) {
    return NextResponse.json({
      error: 'Limit reached: Unauthenticated users can only create 3 links.',
    }, { status: 403 });
  }

  // Insert anonymously using IP
  const { data:insertedData,error: insertError } = await supabaseAdmin
    .from('links')
    .insert([{ long_url, short_code, ip_address: clientIP }]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ short_code, long_url ,data:insertedData}, { status: 201 });
}
