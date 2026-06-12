import { apiClient } from '@/lib/axios';
import { Experience, ApiResponse } from '@/types';

export const experienceApi = {
  getAll: () => apiClient.get<ApiResponse<Experience[]>>('/experience'),
  create: (data: Partial<Experience>) => apiClient.post<ApiResponse<Experience>>('/experience', data),
  update: (id: string, data: Partial<Experience>) => apiClient.put<ApiResponse<Experience>>('/experience/' + id, data),
  delete: (id: string) => apiClient.delete<ApiResponse<null>>('/experience/' + id),
};
