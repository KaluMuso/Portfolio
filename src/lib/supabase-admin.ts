// Back-compat shim. The Supabase helpers were split into
//   - src/lib/supabase/server.ts — server components / route handlers
//   - src/lib/supabase/client.ts — browser ("use client") code
// Import from those directly in new code.

export { createAdminClient } from "@/lib/supabase/server";
export { createBrowserClient } from "@/lib/supabase/client";
