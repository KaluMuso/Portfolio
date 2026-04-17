"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Search, Users } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase-admin";

type WaitlistEntry = {
  id: string;
  name: string;
  company_name: string;
  industry: string;
  email: string;
  phone: string;
  whatsapp: string;
  district: string;
  created_at: string;
};

export default function AdminWaitlistPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [filtered, setFiltered] = useState<WaitlistEntry[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const supabase = createBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/admin/login"); return; }

      const { data } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });

      setEntries(data || []);
      setFiltered(data || []);
      setLoading(false);
    };
    init();
  }, [router]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(entries.filter((e) =>
      e.name?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.company_name?.toLowerCase().includes(q) ||
      e.district?.toLowerCase().includes(q)
    ));
  }, [search, entries]);

  const exportCSV = () => {
    const headers = ["Name", "Company", "Industry", "Email", "Phone", "WhatsApp", "District", "Joined"];
    const rows = filtered.map((e) => [
      e.name, e.company_name, e.industry, e.email, e.phone, e.whatsapp, e.district,
      new Date(e.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c || ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `convergeo-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/dashboard" className="text-gray-500 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white">Convergeo Waitlist</h1>
            <p className="text-gray-400 text-sm">{entries.length} total signups</p>
          </div>
          <button
            onClick={exportCSV}
            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-blue-700 transition-colors"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, email, or district..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>

        {loading ? (
          <div className="text-center py-24 text-gray-500">Loading...</div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-white/10">
                  <tr className="text-left">
                    {["Name", "Company", "Industry", "Email", "Phone", "District", "Joined"].map((h) => (
                      <th key={h} className="px-5 py-4 text-xs font-black uppercase tracking-widest text-gray-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-gray-500">
                        <Users size={32} className="mx-auto mb-3 opacity-30" />
                        No entries found
                      </td>
                    </tr>
                  ) : filtered.map((entry) => (
                    <tr key={entry.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-5 py-4 font-bold text-white">{entry.name}</td>
                      <td className="px-5 py-4 text-gray-300">{entry.company_name}</td>
                      <td className="px-5 py-4 text-gray-400">{entry.industry}</td>
                      <td className="px-5 py-4 text-blue-400">{entry.email}</td>
                      <td className="px-5 py-4 text-gray-400">{entry.phone}</td>
                      <td className="px-5 py-4 text-gray-400">{entry.district}</td>
                      <td className="px-5 py-4 text-gray-500 text-xs">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
