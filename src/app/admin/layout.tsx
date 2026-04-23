export const metadata = {
  title: "Vergeo Admin",
  robots: { index: false, follow: false },
};

/**
 * Pure-styling layout. Auth is enforced at two layers:
 *   1. proxy.ts — verifies JWT via Supabase before request hits a route
 *   2. each admin page — calls requireAdminUser() (defense in depth)
 *
 * Theme follows the root ThemeProvider (next-themes). Each admin page
 * styles itself with both light and dark variants so the toggle in the
 * admin header works the same way it does on the public site.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#060608] text-gray-900 dark:text-gray-100 antialiased">
      {children}
    </div>
  );
}
