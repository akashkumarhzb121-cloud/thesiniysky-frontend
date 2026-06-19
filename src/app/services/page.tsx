'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { servicesApi } from '@/api/services.api';

export default function ServicesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: () => servicesApi.getAll().then(r => r.data),
  });

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions to help your business grow and succeed.
            </p>
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-600">
              Failed to load services. Please try again later.
            </div>
          )}

          {data && data.data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.data.map((service: any) => (
                <div key={service._id || service.id || Math.random()} className="bg-white p-8 rounded-lg border hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  {service.features && (
                    <ul className="space-y-2">
                      {service.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="text-green-500">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  {service.price && (
                    <p className="mt-4 text-blue-600 font-semibold">Starting at </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {data && data.data && data.data.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              No services available at the moment.
            </div>
          )}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
