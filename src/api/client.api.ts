import { apiClient } from '@/lib/axios';
import { ApiResponse } from '@/types';

export const clientApi = {
  getDashboard: () => apiClient.get<ApiResponse<any>>('/client/dashboard'),
  getOrders: () => apiClient.get<ApiResponse<any>>('/client/orders'),
  getInvoices: () => apiClient.get<ApiResponse<any>>('/client/invoices'),
  getProfile: () => apiClient.get<ApiResponse<any>>('/client/profile'),
  updateProfile: (data: any) => apiClient.put<ApiResponse<any>>('/client/profile', data),
};
