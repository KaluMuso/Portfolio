export default function AboutPage() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Me</h1>
      <div className="prose prose-lg text-gray-600">
        <p className="mb-6 leading-relaxed">
          I'm a full-stack developer and automation builder based in Zambia, 
          dedicated to helping businesses ship fast, scalable products and 
          automated workflows.
        </p>
        <p className="leading-relaxed">
          With expertise in the Next.js ecosystem and automation tools like N8N, 
          I bridge the gap between complex technical challenges and elegant, 
          user-centric solutions.
        </p>
      </div>
    </div>
  );
}
