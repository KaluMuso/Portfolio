"use client";
import { useState } from "react";
import { Save, ToggleLeft, ToggleRight, Globe, Phone, Mail, Calendar, Clock } from "lucide-react";

export type SiteSettings = {
  available_for_projects: boolean;
  response_time: string;
  whatsapp_number: string;
  contact_email: string;
  calendly_url: string;
  availability_message: string;
};

type SaveAction = (settings: SiteSettings) => Promise<{ ok: true } | { ok: false; error: string }>;

export function SettingsForm({ initial, save }: { initial: SiteSettings; save: SaveAction }) {
  const [settings, setSettings] = useState<SiteSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const onSave = async () => {
    setSaving(true);
    setError("");
    const result = await save(settings);
    setSaving(false);
    if (result.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } else {
      setError(result.error);
    }
  };

  const inputClasses = "w-full bg-gray-50 dark:bg-[#060608] border border-gray-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-700 focus:outline-none focus:border-blue-500/40 transition-colors font-medium";
  const labelClasses = "block text-xs font-black uppercase tracking-[0.12em] text-gray-600 dark:text-gray-500 mb-2";

  return (
    <div className="max-w-2xl space-y-6">
      {/* Availability */}
      <div className="bg-white dark:bg-[#0d0d14] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-black text-gray-900 dark:text-white mb-1">Project Availability</h3>
            <p className="text-xs text-gray-500">Controls the availability pill displayed on the website</p>
          </div>
          <button
            onClick={() => setSettings((s) => ({ ...s, available_for_projects: !s.available_for_projects }))}
            className={`transition-colors ${settings.available_for_projects ? "text-green-400" : "text-gray-600"}`}
          >
            {settings.available_for_projects ? <ToggleRight size={44} /> : <ToggleLeft size={44} />}
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

      {/* Contact Info */}
      <div className="bg-white dark:bg-[#0d0d14] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6 space-y-5">
        <h3 className="font-black text-gray-900 dark:text-white">Contact Information</h3>

        {[
          { key: "whatsapp_number", label: "WhatsApp Number", icon: Phone, placeholder: "+260 761 359 005", type: "tel" },
          { key: "contact_email",   label: "Contact Email",    icon: Mail,  placeholder: "info@vergeo.company", type: "email" },
          { key: "calendly_url",    label: "Calendly URL",     icon: Calendar, placeholder: "https://calendly.com/...", type: "url" },
          { key: "response_time",   label: "Response Time",    icon: Clock, placeholder: "Within 2 hours", type: "text" },
        ].map(({ key, label, icon: Icon, placeholder, type }) => (
          <div key={key}>
            <label className={labelClasses}>
              <Icon size={11} className="inline mr-1.5 -mt-0.5" />
              {label}
            </label>
            <input
              type={type}
              value={settings[key as keyof SiteSettings] as string}
              onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
              className={inputClasses}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      {/* Site URL */}
      <div className="bg-white dark:bg-[#0d0d14] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6">
        <h3 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe size={16} className="text-blue-400" /> Live Site
        </h3>
        <a
          href="https://vergeo.company"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-sm font-bold underline underline-offset-4"
        >
          vergeo.company ↗
        </a>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-5 py-4 rounded-xl font-bold">
          {error}
        </div>
      )}

      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-7 py-3.5 rounded-xl font-black text-sm transition-all"
      >
        <Save size={15} />
        {saved ? "✓ Saved!" : saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
