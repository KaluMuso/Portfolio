import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function WaitlistCTA() {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-blue-600 rounded-3xl p-12 md:p-20 text-white text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to scale your business with automation?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            I&apos;m building a high-performance e-commerce platform that automates 
            everything from order capture to inventory updates. Join the early 
            access list.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/waitlist"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              Join the platform waitlist <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Start a custom project
            </Link>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-30"></div>
      </div>
    </section>
  );
}
