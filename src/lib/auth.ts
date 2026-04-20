import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Call at the top of any admin server component / route handler.
 * Redirects to /admin/login if no valid Supabase session exists.
 * Returns the authenticated user object on success.
 */
export async function requireAdminUser() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return user;
}
