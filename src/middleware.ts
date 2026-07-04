import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // If Supabase environment variables are missing, bypass authentication
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("Middleware: Supabase env vars missing, bypassing auth");
    return res;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return req.cookies.getAll().map(({ name, value }) => ({ name, value }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          cookiesToSet.forEach(({ name, value }) => res.cookies.set(name, value));
        },
      },
    });

    const { data: { session } } = await supabase.auth.getSession();

    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");
    const isPublicPage = req.nextUrl.pathname === "/";

    if (!session && !isAuthPage && !isPublicPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (session && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } catch (error) {
    console.error("Middleware Auth Error:", error);
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|public).*)",
  ],
};
