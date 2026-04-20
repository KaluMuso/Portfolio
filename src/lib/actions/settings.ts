"use server";

import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/components/admin/SettingsForm";

export async function saveSiteSettingsAction(
  settings: SiteSettings
): Promise<{ ok: true } | { ok: false; error: string }> {
  // Re-validate session inside the action — never trust client-supplied auth.
  await requireAdminUser();

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, ...settings });

  if (error) {
    console.error("settings save error:", error);
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin/settings");
  return { ok: true };
}
