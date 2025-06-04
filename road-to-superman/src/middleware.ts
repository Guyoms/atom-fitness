import { type NextRequest, NextResponse } from "next/server"


import { updateSession } from "@/libs/supabase/middleware"

import {
  AUTH_CALLBACK_ROUTE,
  AUTH_ROUTE,
  HOME_ROUTE,
} from "./configs/routes"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // console.log("PATHNAME", pathname);

  // Ignore manifest.json et sw.js explicitement
  if (pathname === "/manifest.json" || pathname === "/sw.js") {
    // console.log("SKIP MIDDLEWARE FOR", pathname);
    return NextResponse.next();
  }

  const { supabaseResponse, user } = await updateSession(request)

  // Ignore les fichiers statiques
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/manifest.json') ||
    pathname.startsWith('/sw.js') ||
    pathname.startsWith('/workbox-') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.png')
  ) {
    return NextResponse.next();
  }

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
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|workbox-.*|icons/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
