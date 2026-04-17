import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { Countdown } from "@/components/ui/Countdown";
import { ShoppingBag, Package, Calendar, Boxes, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Join Convergeo Waitlist | Vergeo Group",
  description: "Secure your spot on Convergeo — Zambia's first multi-vendor marketplace for products, services, events and inventories. Launching 7th July 2026.",
};

const features = [
  { icon: <ShoppingBag size={18} />, label: "Products", desc: "List and sell physical products" },
  { icon: <Package size={18} />, label: "Services",  desc: "Offer professional services" },
  { icon: <Calendar size={18} />, label: "Events",   desc: "Promote and sell event tickets" },
  { icon: <Boxes size={18} />,   label: "Inventory", desc: "Manage stock and supplies" },
];

export default function WaitlistPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-12 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-amber-600 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            Launching 7th July, 2026
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 leading-[1.05] tracking-tight">
            Zambia&apos;s first{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              multi-vendor marketplace
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Convergeo brings together products, services, events and inventory on one platform — giving every Zambian business a digital presence.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {features.map(({ icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-2.5 rounded-2xl"
              >
                <div className="text-blue-600">{icon}</div>
                <div className="text-left">
                  <p className="text-sm font-black text-gray-900 dark:text-white">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Countdown */}
          <Countdown />
        </div>
      </section>

      {/* Form section */}
      <section className="py-12 px-6 md:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Why join */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                Why join the waitlist?
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  { title: "Early access", desc: "Be among the first 200 vendors on the platform before public launch." },
                  { title: "Priority onboarding", desc: "Dedicated setup support to get your store live on day one." },
                  { title: "Founding vendor status", desc: "Special badge and reduced commission rates for early adopters." },
                  { title: "Direct feedback channel", desc: "Help shape the platform features before they go live." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-6 h-6 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <ArrowRight size={12} />
                    </div>
                    <div>
                      <p className="font-black text-gray-900 dark:text-white text-sm">{title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-600/5 border border-blue-600/20 rounded-2xl p-5">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-300">
                  Limited to <span className="font-black">200 vendors</span> for the initial beta phase.
                </p>
                <p className="text-xs text-blue-500/70 dark:text-blue-400/70 mt-1">
                  Spots fill up fast — secure yours today.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-3xl p-8 shadow-2xl shadow-blue-500/5">
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                Secure your spot
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                We&apos;ll send you a confirmation email, then reach out before launch.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
