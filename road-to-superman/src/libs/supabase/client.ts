import { createBrowserClient } from "@supabase/ssr"

import { Database } from "./database.types"

/**
 * Prefere to use the server-side Supabase client for security and performance reasons.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
          return cookie ? cookie.split('=')[1] : undefined
        },
        set(name: string, value: string, options: { path?: string; maxAge?: number }) {
          document.cookie = `${name}=${value}; path=${options.path || '/'}; max-age=${options.maxAge || 3600}`
        },
        remove(name: string, options: { path?: string }) {
          document.cookie = `${name}=; path=${options.path || '/'}; max-age=0`
        },
      },
    }
  )
}
