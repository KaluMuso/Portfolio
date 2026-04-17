import { Mail, MessageCircle, Clock, Video, MapPin, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { ContactForm } from "@/components/ui/ContactForm";

export const metadata = {
  title: "Contact | Vergeo Group",
  description: "Start a project with Vergeo Group. Reply within 2 hours. No project goes beyond two weeks.",
};

const channels = [
  {
    icon: <Mail size={20} />,
    title: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    color: "blue",
  },
  {
    icon: <MessageCircle size={20} />,
    title: "WhatsApp",
    value: "+260 761 359 005",
    href: `${SITE_CONFIG.socials.whatsapp}?text=Hi+Kaluba%2C+I+found+you+on+vergeo.company+and+I+would+like+to+discuss+a+project.`,
    color: "green",
  },
];

const facts = [
  { icon: <Clock size={18} />, label: "Response time", value: "Within 2 hours" },
  { icon: <Video size={18} />, label: "Project calls", value: "Google Meet" },
  { icon: <MapPin size={18} />, label: "Based in", value: "Lusaka, Zambia" },
  { icon: <ArrowRight size={18} />, label: "Delivery", value: "Under 2 weeks" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-600/8 px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Available now
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 leading-[1.05] tracking-tight">
            Let&apos;s build
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent"> something great.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl max-w-xl leading-relaxed">
            Tell us what you need. We respond within 2 hours and no project goes beyond two weeks.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Left: Info sidebar */}
            <div className="lg:col-span-2 space-y-8">

              {/* Quick facts */}
              <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-3xl p-7">
                <h3 className="text-sm font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-5">
                  Quick facts
                </h3>
                <div className="space-y-4">
                  {facts.map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                        {icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-wider">{label}</p>
                        <p className="text-sm font-black text-gray-900 dark:text-white">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct channels */}
              <div className="space-y-3">
                {channels.map((ch) => (
                  <a
                    key={ch.title}
                    href={ch.href}
                    target={ch.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
                      ch.color === "green"
                        ? "bg-green-500/5 border-green-500/20 hover:bg-green-500/10"
                        : "bg-blue-600/5 border-blue-600/20 hover:bg-blue-600/10"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      ch.color === "green" ? "bg-green-500/10 text-green-600" : "bg-blue-600/10 text-blue-600"
                    }`}>
                      {ch.icon}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-600">{ch.title}</p>
                      <p className={`font-black text-sm ${ch.color === "green" ? "text-green-700 dark:text-green-400" : "text-blue-700 dark:text-blue-400"}`}>
                        {ch.value}
                      </p>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-gray-400" />
                  </a>
                ))}
              </div>

              {/* Book a call */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-7 text-white">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Video size={20} />
                </div>
                <h3 className="font-black text-lg mb-2">Book a Google Meet</h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-5">
                  Schedule a free 30-minute discovery call to discuss your project.
                </p>
                <a
                  href="https://calendly.com/convergeozambia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl font-black text-sm hover:bg-blue-50 transition-colors"
                >
                  Book free call <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-900/5">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                  Send a project inquiry
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                  Fill in the form below and we&apos;ll get back to you within 2 hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
