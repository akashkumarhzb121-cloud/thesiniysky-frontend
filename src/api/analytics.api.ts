import { apiClient } from '@/lib/axios';
import { ApiResponse } from '@/types';

export const analyticsApi = {
  getDashboard: () => apiClient.get<ApiResponse<any>>('/analytics/dashboard'),
  getUsers: () => apiClient.get<ApiResponse<any>>('/analytics/users'),
  getRevenue: () => apiClient.get<ApiResponse<any>>('/analytics/revenue'),
};
