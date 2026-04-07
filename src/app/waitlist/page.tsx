import { WaitlistForm } from "@/components/ui/WaitlistForm";

export const metadata = {
  title: "Join the Waitlist for Convergeo Zambia| Vergeo Group",
  description: "Get early access to my specialized Next.js e-commerce platform and business automation tools.",
};

export default function WaitlistPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          The Automation-First <br />
          <span className="text-blue-600">E-commerce Platform.</span>
        </h1>
        <p className="text-gray-600 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
          I'm building a platform that eliminates manual operations for modern retailers.
          Join the waitlist to get early access and exclusive implementation support.
        </p>

        <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-blue-500/5 mx-auto max-w-md">
          <WaitlistForm />
        </div>

        <p className="mt-8 text-sm text-gray-400">
          Limited to 10 businesses for the initial beta phase.
        </p>
      </div>
    </div>
  );
}
