import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: { path?: string; maxAge?: number }) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: { path?: string }) {
          response.cookies.set({
            name,
            value: '',
            ...options,
            maxAge: 0,
          })
        },
      },
    }
  )

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    return { response, user }
  } catch (error) {
    console.error('Error in updateSession:', error)
    return { response, user: null }
  }
}
