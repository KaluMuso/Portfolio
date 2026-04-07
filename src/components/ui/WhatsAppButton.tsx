"use client";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "YOUR_PHONE_NUMBER"; // Replace with your actual WhatsApp number
  const message = encodeURIComponent("Hello! I'm interested in working with you on a project.");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-medium whitespace-nowrap">
        WhatsApp me
      </span>
    </a>
  );
}
