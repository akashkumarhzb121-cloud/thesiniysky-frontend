export function CTASection() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied clients and transform your business with our powerful platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/register" className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 inline-block">
            Start Free Trial
          </a>
          <a href="/contact" className="border border-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 inline-block">
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
}
