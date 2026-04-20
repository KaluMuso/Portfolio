"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function WhatsAppFloat() {
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      {/* Tooltip bubble */}
      {tooltip && (
        <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl px-4 py-3 text-sm font-bold text-gray-800 dark:text-gray-200 max-w-[200px] text-right animate-in fade-in slide-in-from-bottom-2 duration-200">
          Chat with us on WhatsApp — reply in minutes!
        </div>
      )}

      {/* Button */}
      <a
        href={SITE_CONFIG.socials.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        className="relative group w-14 h-14 bg-[#25d366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25d366]/40 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full bg-[#25d366]/40 animate-ping opacity-60 group-hover:opacity-0 transition-opacity" />
        <MessageCircle size={26} fill="white" strokeWidth={0} />
      </a>
    </div>
  );
}
