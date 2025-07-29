// src/app/api/shorten/route.ts
import { NextResponse } from 'next/server';
import { supabaseServerClient } from '@/lib/supabaseServerClient';

export async function POST(request: Request) {

  const { long_url,  } = await request.json();
  const rawIP = request.headers.get("x-forwarded-for") || "::1";
  const clientIP = rawIP.split(",")[0].trim();

  if (!long_url) {
    return NextResponse.json({ error: 'Missing long_url' }, { status: 400 });

  }


  const supabase = supabaseServerClient();


  const short_code = Math.random().toString(36).slice(2, 12);

  const { error } = await supabase.from('links').insert([{ long_url, short_code ,ip_address:clientIP}]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ short_code, long_url }, { status: 201 });
}
