import { SITE_CONFIG } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-2xl mx-auto min-h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Let&apos;s build something.</h1>
      <p className="text-gray-600 text-lg mb-12 leading-relaxed">
        Looking for a high-performance web app or a custom automation?
        Email me directly or reach out on my socials.
      </p>
      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          Email Me
        </a>
        <a
          href={`${SITE_CONFIG.socials.whatsapp}?text=Hi+Kaluba%2C+I+found+you+on+vergeo.company+and+I+would+like+to+discuss+a+project.`}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors"
        >
          WhatsApp Me
        </a>
      </div>
    </div>
  );
}
