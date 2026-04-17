"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, ToggleLeft, ToggleRight } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase-admin";

type SiteSettings = {
  available_for_projects: boolean;
  response_time: string;
  whatsapp_number: string;
  contact_email: string;
  calendly_url: string;
  availability_message: string;
};

const DEFAULT_SETTINGS: SiteSettings = {
  available_for_projects: true,
  response_time: "Within 2 hours",
  whatsapp_number: "+260 761 359 005",
  contact_email: "vergeosales@gmail.com",
  calendly_url: "https://calendly.com/vergeosales",
  availability_message: "Available for projects",
};

export default function AdminSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const init = async () => {
      const supabase = createBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/admin/login"); return; }
      const { data } = await supabase.from("site_settings").select("*").single();
      if (data) setSettings(data);
      setLoading(false);
    };
    init();
  }, [router]);

  const save = async () => {
    setSaving(true);
    const supabase = createBrowserClient();
    await supabase.from("site_settings").upsert({ id: 1, ...settings });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors";
  const labelClasses = "block text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-2";

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/dashboard" className="text-gray-500 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-black text-white">Site Settings</h1>
          <button
            onClick={save}
            disabled={saving}
            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            <Save size={16} />
            {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="space-y-6">
          {/* Availability toggle */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-black text-white mb-1">Project Availability</h3>
                <p className="text-sm text-gray-400">Controls the green availability pill shown on the site</p>
              </div>
              <button
                onClick={() => setSettings((s) => ({ ...s, available_for_projects: !s.available_for_projects }))}
                className={`transition-colors ${settings.available_for_projects ? "text-green-400" : "text-gray-500"}`}
              >
                {settings.available_for_projects
                  ? <ToggleRight size={40} />
                  : <ToggleLeft size={40} />
                }
              </button>
            </div>
            <div>
              <label className={labelClasses}>Availability Message</label>
              <input
                value={settings.availability_message}
                onChange={(e) => setSettings((s) => ({ ...s, availability_message: e.target.value }))}
                className={inputClasses}
                placeholder="Available for projects"
              />
            </div>
          </div>

          {/* Contact info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h3 className="font-black text-white">Contact Information</h3>
            <div>
              <label className={labelClasses}>WhatsApp Number</label>
              <input
                value={settings.whatsapp_number}
                onChange={(e) => setSettings((s) => ({ ...s, whatsapp_number: e.target.value }))}
                className={inputClasses}
                placeholder="+260 761 359 005"
              />
            </div>
            <div>
              <label className={labelClasses}>Contact Email</label>
              <input
                value={settings.contact_email}
                onChange={(e) => setSettings((s) => ({ ...s, contact_email: e.target.value }))}
                type="email"
                className={inputClasses}
                placeholder="vergeosales@gmail.com"
              />
            </div>
            <div>
              <label className={labelClasses}>Calendly URL</label>
              <input
                value={settings.calendly_url}
                onChange={(e) => setSettings((s) => ({ ...s, calendly_url: e.target.value }))}
                className={inputClasses}
                placeholder="https://calendly.com/..."
              />
            </div>
            <div>
              <label className={labelClasses}>Response Time</label>
              <input
                value={settings.response_time}
                onChange={(e) => setSettings((s) => ({ ...s, response_time: e.target.value }))}
                className={inputClasses}
                placeholder="Within 2 hours"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
