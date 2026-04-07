export default function TermsPage() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      <div className="prose prose-blue text-gray-600 space-y-6">
        <p>Last updated: April 7, 2026</p>
        <p>
          Welcome to Prosper Nation. By using our website and services, you 
          agree to the following terms and conditions.
        </p>
        <h2 className="text-2xl font-bold text-gray-900">Services</h2>
        <p>
          We provide full-stack development and business automation services. 
          Specific project terms will be outlined in separate agreements for 
          each client.
        </p>
        <h2 className="text-2xl font-bold text-gray-900">Waitlist</h2>
        <p>
          Joining our waitlist does not guarantee early access to our platform. 
          Early access is provided at our discretion based on business fit and 
          platform capacity.
        </p>
        <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
        <p>
          Prosper Nation shall not be liable for any indirect, incidental, or 
          consequential damages arising out of the use of our website or 
          services.
        </p>
      </div>
    </div>
  );
}
