export default function ServicesPage() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Services</h1>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-4">E-commerce</h2>
          <p className="text-gray-600 leading-relaxed">
            High-performance, conversion-focused online stores built with 
            Next.js and Supabase for maximum speed and scalability.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Automation</h2>
          <p className="text-gray-600 leading-relaxed">
            Efficient workflow automations using N8N, connecting your business 
            tools and eliminating repetitive manual tasks.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Web Apps</h2>
          <p className="text-gray-600 leading-relaxed">
            Custom, full-stack web applications designed for performance, 
            accessibility, and growth.
          </p>
        </div>
      </div>
    </div>
  );
}
