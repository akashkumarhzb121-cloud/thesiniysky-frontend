import { apiClient } from '@/lib/axios';
import { Achievement, ApiResponse } from '@/types';

export const achievementsApi = {
  getAll: () => apiClient.get<ApiResponse<Achievement[]>>('/achievements'),
  create: (data: Partial<Achievement>) => apiClient.post<ApiResponse<Achievement>>('/achievements', data),
  update: (id: string, data: Partial<Achievement>) => apiClient.put<ApiResponse<Achievement>>('/achievements/' + id, data),
  delete: (id: string) => apiClient.delete<ApiResponse<null>>('/achievements/' + id),
};
