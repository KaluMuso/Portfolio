"use client";
import { useMemo, useState } from "react";
import { Download, Search, Users, Mail, Phone } from "lucide-react";

export type WaitlistEntry = {
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

export function WaitlistTable({ entries }: { entries: WaitlistEntry[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return entries;
    return entries.filter((e) =>
      [e.name, e.email, e.company_name, e.district, e.industry].some((v) =>
        v?.toLowerCase().includes(q)
      )
    );
  }, [entries, search]);

  const exportCSV = () => {
    const headers = ["Name", "Company", "Industry", "Email", "Phone", "WhatsApp", "District", "Joined"];
    const rows = filtered.map((e) => [
      e.name, e.company_name, e.industry, e.email, e.phone, e.whatsapp, e.district,
      new Date(e.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${c ?? ""}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `convergeo-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, email or district..."
            className="w-full bg-[#0d0d14] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/40 transition-colors"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-sm font-black transition-colors"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0d0d14] border border-white/[0.06] rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Users size={36} className="mx-auto mb-3 text-gray-700" />
            <p className="text-gray-500 font-bold">
              {entries.length === 0 ? "No waitlist entries yet" : "No results match your search"}
            </p>
            <p className="text-xs text-gray-700 mt-1">
              {entries.length === 0
                ? "Entries will appear here once people sign up at vergeo.company/waitlist"
                : "Try a different search term"}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Applicant", "Industry", "Contact", "District", "Joined"].map((h) => (
                      <th key={h} className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map((entry) => (
                    <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-black shrink-0">
                            {entry.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-gray-200">{entry.name}</p>
                            <p className="text-xs text-gray-500">{entry.company_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold bg-white/[0.05] text-gray-400 px-2.5 py-1 rounded-lg">
                          {entry.industry}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <a href={`mailto:${entry.email}`} className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300">
                            <Mail size={11} /> {entry.email}
                          </a>
                          <a href={`tel:${entry.phone}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300">
                            <Phone size={11} /> {entry.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{entry.district}</td>
                      <td className="px-6 py-4 text-xs text-gray-600">
                        {new Date(entry.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden divide-y divide-white/[0.04]">
              {filtered.map((entry) => (
                <div key={entry.id} className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-sm font-black">
                      {entry.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-200 text-sm">{entry.name}</p>
                      <p className="text-xs text-gray-500">{entry.company_name} · {entry.district}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-white/[0.05] text-gray-400 px-2 py-1 rounded-lg">{entry.industry}</span>
                    <span className="text-blue-400">{entry.email}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-3 border-t border-white/[0.06] text-xs text-gray-600 font-bold">
              Showing {filtered.length} of {entries.length} entries
            </div>
          </>
        )}
      </div>
    </>
  );
}
