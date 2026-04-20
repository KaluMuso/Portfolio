import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Next 16 proxy (formerly middleware). Handles:
 *   1. `admin.*` hostname — funnels all paths into /admin/*
 *   2. Supabase session refresh on every request
 *   3. Real JWT-backed auth gate on /admin/* (except /admin/login)
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Response we'll mutate as @supabase/ssr writes refreshed cookies.
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: getUser() validates the JWT against Supabase — presence of
  // cookies alone does not mean the session is valid.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // admin.vergeo.company — rewrite /* to /admin/*, protected below.
  if (hostname.startsWith("admin.")) {
    if (pathname === "/" || pathname === "") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Gate /admin/* except /admin/login.
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Already-logged-in users shouldn't see the login page.
  if (pathname === "/admin/login" && user) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
