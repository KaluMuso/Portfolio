import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client bound to the incoming request's cookies.
 * Use in Server Components, Route Handlers, and Server Actions to call
 * `supabase.auth.getUser()` for authenticated requests.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — Next forbids cookie writes there.
            // The proxy/middleware refresh path handles cookie persistence.
          }
        },
      },
    }
  );
}

/**
 * Service-role admin client. NEVER import from a Client Component or
 * any module that ships to the browser. Bypasses RLS — use only inside
 * Route Handlers / Server Actions for trusted operations.
 *
 * Throws a loud, actionable error if env vars are missing, so admin
 * pages render a helpful error rather than a silent Supabase failure.
 */
export function createAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase admin client requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. " +
      "Set both in Vercel → Project Settings → Environment Variables, then redeploy."
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
