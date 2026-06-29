import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, verifySession } from "@/lib/admin/auth";

// Guard /admin pages and /api/admin endpoints. Everything else passes through.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public auth endpoints — never gate these or you lock yourself out.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  const session = await verifySession(req.cookies.get(COOKIE_NAME)?.value);
  if (session) return NextResponse.next();

  if (isAdminApi) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
