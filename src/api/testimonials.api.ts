import { apiClient } from '@/lib/axios';
import { Testimonial, ApiResponse } from '@/types';

export const testimonialsApi = {
  getAll: () => apiClient.get<ApiResponse<Testimonial[]>>('/testimonials'),
  create: (data: Partial<Testimonial>) => apiClient.post<ApiResponse<Testimonial>>('/testimonials', data),
  update: (id: string, data: Partial<Testimonial>) => apiClient.put<ApiResponse<Testimonial>>('/testimonials/' + id, data),
  delete: (id: string) => apiClient.delete<ApiResponse<null>>('/testimonials/' + id),
};
