import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  // Call the signOut method (revokes refresh token, clears cookies)
  const { error } = await supabase.auth.signOut();

  if (error) {
    // You may want to log the error for debugging
    return NextResponse.json(
      { error: 'Failed to log out. Please try again.' },
      { status: 500 }
    );
  }

  // Supabase Auth Helpers will clear session cookies automatically
  return NextResponse.json(
    { message: 'Logged out successfully.' },
    { status: 200 }
  );
}
