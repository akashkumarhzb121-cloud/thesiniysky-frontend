import { apiClient } from '@/lib/axios';
import { Service, PaginatedResponse, ApiResponse } from '@/types';

export const servicesApi = {
  getAll: (params?: any) => apiClient.get<PaginatedResponse<Service>>('/services', { params }),
  getFeatured: () => apiClient.get<ApiResponse<Service[]>>('/services/featured'),
  getBySlug: (slug: string) => apiClient.get<ApiResponse<Service>>('/services/slug/' + slug),
  getById: (id: string) => apiClient.get<ApiResponse<Service>>('/services/' + id),
  create: (data: Partial<Service>) => apiClient.post<ApiResponse<Service>>('/services', data),
  update: (id: string, data: Partial<Service>) => apiClient.put<ApiResponse<Service>>('/services/' + id, data),
  delete: (id: string) => apiClient.delete<ApiResponse<null>>('/services/' + id),
};
