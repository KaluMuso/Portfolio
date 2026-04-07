import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={32} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">You're on the list!</h1>
        <p className="text-gray-600 text-lg mb-10 leading-relaxed">
          Thanks for joining the waitlist. I'll reach out via email shortly to 
          discuss your business needs and early access availability.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          Back to homepage <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
