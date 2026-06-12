'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/api/projects.api';
import { blogsApi } from '@/api/blogs.api';
import { servicesApi } from '@/api/services.api';
import { testimonialsApi } from '@/api/testimonials.api';
import { FadeIn, StaggerChildren, StaggerItem, ScaleOnHover } from '@/components/shared/animations';
import { LoadingState, EmptyState } from '@/components/forms/form-components';
import Link from 'next/link';
import { Code2, Palette, Smartphone, Cloud, Shield, Zap, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';

const serviceIcons: Record<string, any> = {
  'Web Development': Code2,
  'UI/UX Design': Palette,
  'Mobile Apps': Smartphone,
  'Cloud Solutions': Cloud,
  'Security': Shield,
  'Performance': Zap,
};

export default function HomePage() {
  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: () => projectsApi.getFeatured().then(r => r.data.data),
  });

  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ['featured-services'],
    queryFn: () => servicesApi.getFeatured().then(r => r.data.data),
  });

  const { data: blogsData } = useQuery({
    queryKey: ['featured-blogs'],
    queryFn: () => blogsApi.getFeatured().then(r => r.data.data),
  });

  const { data: testimonialsData } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => testimonialsApi.getAll().then(r => r.data.data),
  });

  return (
    <>
      <PublicHeader />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                  Transform Your Digital
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block mt-2">
                    Presence with TheSiniySky
                  </span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                  Build stunning SaaS applications with our modern platform. Fast, secure, and scalable solutions.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register" className="group bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all inline-flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/services" className="border-2 border-gray-300 px-8 py-3 rounded-lg text-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all inline-flex items-center gap-2">
                    View Services
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: Users, value: '1,200+', label: 'Happy Clients' },
                { icon: Code2, value: '500+', label: 'Projects Delivered' },
                { icon: Star, value: '4.9/5', label: 'Client Rating' },
                { icon: TrendingUp, value: '99%', label: 'Uptime' },
              ].map((stat, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-gray-500">{stat.label}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        {servicesData && servicesData.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <FadeIn>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                  <p className="text-xl text-gray-600">Comprehensive solutions for your business</p>
                </div>
              </FadeIn>
              
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesData.map((service: any) => {
                  const Icon = serviceIcons[service.title] || Code2;
                  return (
                    <StaggerItem key={service.id}>
                      <ScaleOnHover>
                        <div className="bg-white p-8 rounded-xl border hover:shadow-xl transition-shadow h-full">
                          <Icon className="w-10 h-10 text-blue-600 mb-4" />
                          <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </ScaleOnHover>
                    </StaggerItem>
                  );
                })}
              </StaggerChildren>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl opacity-90 mb-8">Join thousands of satisfied clients today.</p>
              <Link href="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-all">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
