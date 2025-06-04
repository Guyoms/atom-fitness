import { type NextRequest, NextResponse } from "next/server"


import { updateSession } from "@/libs/supabase/middleware"

import {
  AUTH_CALLBACK_ROUTE,
  AUTH_ROUTE,
  HOME_ROUTE,
} from "./configs/routes"

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  const pathname = request.nextUrl.pathname

  if (user) {
    if (pathname !== AUTH_CALLBACK_ROUTE && pathname.startsWith(AUTH_ROUTE)) {
      return NextResponse.redirect(new URL(HOME_ROUTE, request.url))
    }
  } else {
    if (
      pathname !== HOME_ROUTE &&
      !pathname.startsWith(AUTH_ROUTE)
    ) {
      return NextResponse.redirect(new URL(HOME_ROUTE, request.url))
    }
  }

  supabaseResponse.headers.set("x-current-path", pathname)
  // supabaseResponse.headers.set("x-current-locale", lang ? lang : defaultLocale)

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
