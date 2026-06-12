export function ServicesSection() {
  const services = [
    { title: 'Web Development', description: 'Modern web applications built with cutting-edge technologies.' },
    { title: 'UI/UX Design', description: 'Beautiful and intuitive user interfaces that users love.' },
    { title: 'Mobile Apps', description: 'Native and cross-platform mobile applications.' },
    { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and deployment.' },
    { title: 'Security', description: 'Enterprise-grade security for your applications.' },
    { title: 'Performance', description: 'Lightning-fast applications optimized for speed.' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital solutions to help your business grow and succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
