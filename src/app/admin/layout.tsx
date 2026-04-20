export const metadata = {
  title: "Vergeo Admin",
  robots: { index: false, follow: false },
};

/**
 * Pure-styling layout. Auth is enforced at two layers:
 *   1. proxy.ts — verifies JWT via Supabase before request hits a route
 *   2. each admin page — calls requireAdminUser() (defense in depth)
 *
 * This layout intentionally does NOT call requireAdminUser() because
 * /admin/login is also nested here and would loop.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark min-h-screen bg-[#060608] text-gray-100 antialiased">
      {children}
    </div>
  );
}
