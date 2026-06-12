import { apiClient } from '@/lib/axios';
import { User, ApiResponse } from '@/types';

export const adminApi = {
  getUsers: () => apiClient.get<ApiResponse<User[]>>('/admin/users'),
  updateUser: (id: string, data: Partial<User>) => apiClient.put<ApiResponse<User>>('/admin/users/' + id, data),
  deleteUser: (id: string) => apiClient.delete<ApiResponse<null>>('/admin/users/' + id),
  getRoles: () => apiClient.get<ApiResponse<any>>('/admin/roles'),
  getSystemLogs: () => apiClient.get<ApiResponse<any>>('/admin/system-logs'),
};
