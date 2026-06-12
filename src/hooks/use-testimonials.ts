import { useQuery } from '@tanstack/react-query';
import { testimonialsApi } from '@/api/testimonials.api';

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: () => testimonialsApi.getAll().then(r => r.data.data),
  });
}
