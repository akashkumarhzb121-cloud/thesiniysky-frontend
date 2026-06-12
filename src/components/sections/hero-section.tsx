export function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Transform Your Digital
          <span className="text-blue-600 block mt-2">Presence with TheSiniySky</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Build stunning SaaS applications with our modern platform. 
          Fast, secure, and scalable solutions for your business needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 inline-block">
            Get Started Free
          </a>
          <a href="/services" className="border border-gray-300 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-50 inline-block">
            View Demo
          </a>
        </div>
      </div>
    </section>
  );
}
