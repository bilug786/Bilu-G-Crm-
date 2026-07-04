import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Return a dummy client if environment variables are missing to prevent build/runtime crashes
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({ data: {}, error: { message: "Supabase not configured" } }),
        signUp: async () => ({ data: {}, error: { message: "Supabase not configured" } }),
        signOut: async () => ({ error: null }),
      },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
