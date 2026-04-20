import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsForm, type SiteSettings } from "@/components/admin/SettingsForm";
import { saveSiteSettingsAction } from "@/lib/actions/settings";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

const DEFAULTS: SiteSettings = {
  available_for_projects: true,
  response_time: "Within 2 hours",
  whatsapp_number: "+260 761 359 005",
  contact_email: "info@vergeo.company",
  calendly_url: "https://calendly.com/convergeozambia",
  availability_message: "Available for projects",
};

async function loadSettings(): Promise<SiteSettings> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();
    return { ...DEFAULTS, ...(data ?? {}) };
  } catch {
    return DEFAULTS;
  }
}

export default async function AdminSettingsPage() {
  const user = await requireAdminUser();
  const initial = await loadSettings();

  return (
    <AdminShell title="Settings" subtitle="Site configuration & contact info" email={user.email ?? ""}>
      <SettingsForm initial={initial} save={saveSiteSettingsAction} />
    </AdminShell>
  );
}
