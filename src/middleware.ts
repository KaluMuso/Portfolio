import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // admin.vergeo.company → redirect root to /admin, pass /admin/* through
  if (hostname.startsWith("admin.")) {
    if (pathname === "/" || pathname === "") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    // Already on an /admin path — let it through
    if (pathname.startsWith("/admin")) {
      return NextResponse.next();
    }
    // Any other path on admin subdomain → redirect to admin dashboard
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Protect /admin routes on the main domain (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const accessToken = request.cookies.get("sb-access-token")?.value;
    const refreshToken = request.cookies.get("sb-refresh-token")?.value;

    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths for subdomain routing
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
