'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { servicesApi } from '@/api/services.api';
import { MagicCard } from '@/components/ui/magic-card';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Wrench } from 'lucide-react';

export default function ServicesPage() {
  const { theme } = useTheme();
  const { data, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: () => servicesApi.getAll().then(r => r.data),
  });

  const services = data?.data || [];

  return (
    <>
      <PublicHeader />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">Our Services</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Comprehensive digital solutions to help your business grow and succeed.</p>
          </div>

          {isLoading && <div className="text-center py-12"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></div>}
          {error && <div className="text-center py-12 text-red-600">Failed to load services.</div>}

          {!isLoading && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any) => (
                <Link key={service._id || service.id} href={'/services/' + service.slug} className="block group">
                  <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"} className="h-full">
                    <div className="p-8 text-center">
                      <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Wrench className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 dark:text-white group-hover:text-blue-600 transition-colors">{service.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{service.description}</p>
                      {service.features && (
                        <ul className="text-left space-y-2 mt-4">
                          {service.features.slice(0, 4).map((feature: string, i: number) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="text-green-500">✓</span> {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      {service.price && (
                        <p className="mt-4 text-blue-600 dark:text-blue-400 font-semibold text-lg">
                          Starting at ${service.price}
                        </p>
                      )}
                    </div>
                  </MagicCard>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && services.length === 0 && (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              <Wrench className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No services available at the moment.</p>
            </div>
          )}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
