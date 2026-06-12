import { apiClient } from '@/lib/axios';
import { Project, PaginatedResponse, ApiResponse } from '@/types';

export const projectsApi = {
  getAll: (params?: any) => apiClient.get<PaginatedResponse<Project>>('/projects', { params }),
  getFeatured: () => apiClient.get<ApiResponse<Project[]>>('/projects/featured'),
  getBySlug: (slug: string) => apiClient.get<ApiResponse<Project>>('/projects/slug/' + slug),
  getById: (id: string) => apiClient.get<ApiResponse<Project>>('/projects/' + id),
  create: (data: Partial<Project>) => apiClient.post<ApiResponse<Project>>('/projects', data),
  update: (id: string, data: Partial<Project>) => apiClient.put<ApiResponse<Project>>('/projects/' + id, data),
  delete: (id: string) => apiClient.delete<ApiResponse<null>>('/projects/' + id),
  getRelated: (id: string) => apiClient.get<ApiResponse<Project[]>>('/projects/' + id + '/related'),
};
