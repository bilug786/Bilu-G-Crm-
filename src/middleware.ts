import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // If Supabase env vars are missing, skip auth logic (for development/demo)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return res;
  }

  try {
    const supabase = createMiddlewareClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If user is not signed in and the current path is not /login or /signup, redirect the user to /login
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");
    const isPublicPage = req.nextUrl.pathname === "/";

    if (!session && !isAuthPage && !isPublicPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If user is signed in and the current path is /login or /signup, redirect the user to /dashboard
    if (session && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } catch (e) {
    console.error("Middleware error:", e);
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|public).*)",
  ],
};
