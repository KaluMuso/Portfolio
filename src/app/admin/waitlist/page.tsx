import { AdminShell } from "@/components/admin/AdminShell";
import { WaitlistTable, type WaitlistEntry } from "@/components/admin/WaitlistTable";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

async function loadEntries(): Promise<WaitlistEntry[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("waitlist load error:", error);
    return [];
  }
  return (data as WaitlistEntry[] | null) ?? [];
}

export default async function AdminWaitlistPage() {
  const user = await requireAdminUser();
  const entries = await loadEntries();

  return (
    <AdminShell
      title="Waitlist"
      subtitle={`${entries.length} Convergeo signups`}
      email={user.email ?? ""}
    >
      <WaitlistTable entries={entries} />
    </AdminShell>
  );
}
