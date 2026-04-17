export const metadata = {
  title: "Vergeo Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark min-h-screen bg-[#060608] text-gray-100 antialiased">
      {children}
    </div>
  );
}
