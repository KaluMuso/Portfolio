export default function ContactPage() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-2xl mx-auto min-h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Let's build something.</h1>
      <p className="text-gray-600 text-lg mb-12 leading-relaxed">
        Looking for a high-performance web app or a custom automation?
        Email me directly or reach out on my socials.
      </p>
      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <a
          href="mailto:hello@yourdomain.com"
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          Email Me
        </a>
        <a
          href="https://wa.me/260761359005?text=Hey%20Kaluba%2C%20I%20saw%20your%20profile%20on%20your%20website%20and%20would%20like%20to%20find%20out%20more%20about%20the%20services%20you%20provide"
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
