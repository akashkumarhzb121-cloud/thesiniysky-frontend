import { apiClient } from '@/lib/axios';
import { Resource, PaginatedResponse, ApiResponse } from '@/types';

export const resourcesApi = {
  getAll: (params?: any) => apiClient.get<PaginatedResponse<Resource>>('/resources', { params }),
  getById: (id: string) => apiClient.get<ApiResponse<Resource>>('/resources/' + id),
  create: (data: Partial<Resource>) => apiClient.post<ApiResponse<Resource>>('/resources', data),
  update: (id: string, data: Partial<Resource>) => apiClient.put<ApiResponse<Resource>>('/resources/' + id, data),
  delete: (id: string) => apiClient.delete<ApiResponse<null>>('/resources/' + id),
};
