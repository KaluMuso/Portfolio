import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectsBoard } from "@/components/admin/ProjectsBoard";
import { projects } from "@/data/projects";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminProjectsPage() {
  const user = await requireAdminUser();
  const upcoming = projects.filter((p) => p.status === "upcoming").length;

  return (
    <AdminShell
      title="Projects"
      subtitle={`${projects.length} total · ${upcoming} upcoming`}
      email={user.email ?? ""}
    >
      <ProjectsBoard />
    </AdminShell>
  );
}
