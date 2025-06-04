import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/supabase'

// Helper function to sync localStorage data to Supabase
async function syncLocalStorageToSupabase(supabase: any, userId: string) {
  try {
    // Initialize user with default data using our hybrid schema
    const { error: initError } = await supabase.rpc('initialize_user_fitness', {
      p_user_id: userId,
      p_start_weight: 106,
      p_start_fat: 15,
      p_target_weight: 100,
      p_target_fat: 10
    });

    if (initError) {
      console.log('User already initialized or error:', initError.message);
    }

    return true;
  } catch (error) {
    console.error('Error initializing user data:', error);
    return false;
  }
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth error:', error)
        return NextResponse.redirect(`${requestUrl.origin}/auth/error`)
      }

      if (data.user) {
        // Initialize user data in Supabase
        await syncLocalStorageToSupabase(supabase, data.user.id)
        
        // Redirect to home with sync parameter to trigger client-side sync
        return NextResponse.redirect(`${requestUrl.origin}/?sync=true`)
      }
    } catch (error) {
      console.error('Callback error:', error)
      return NextResponse.redirect(`${requestUrl.origin}/auth/error`)
    }
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${requestUrl.origin}/`)
}
