'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { testimonialsApi } from '@/api/testimonials.api';

export default function TestimonialsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => testimonialsApi.getAll().then(r => r.data.data),
  });

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Testimonials</h1>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : data && data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {data.filter((t: any) => t.status === 'approved').map((testimonial: any) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg border text-center">
                  <div className="text-yellow-400 text-2xl mb-4">
                    {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">No testimonials yet.</div>
          )}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
