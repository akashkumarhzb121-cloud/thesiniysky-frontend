import { apiClient } from '@/lib/axios';
import { Skill, ApiResponse } from '@/types';

export const skillsApi = {
  getAll: () => apiClient.get<ApiResponse<Skill[]>>('/skills'),
  getById: (id: string) => apiClient.get<ApiResponse<Skill>>('/skills/' + id),
  create: (data: Partial<Skill>) => apiClient.post<ApiResponse<Skill>>('/skills', data),
  update: (id: string, data: Partial<Skill>) => apiClient.put<ApiResponse<Skill>>('/skills/' + id, data),
  delete: (id: string) => apiClient.delete<ApiResponse<null>>('/skills/' + id),
};
