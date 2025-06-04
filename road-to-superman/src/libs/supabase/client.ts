import { createBrowserClient } from "@supabase/ssr"

import { Database } from "./database.types"

/**
 * Prefere to use the server-side Supabase client for security and performance reasons.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
