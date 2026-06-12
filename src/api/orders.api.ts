import { apiClient } from '@/lib/axios';
import { Order, ApiResponse, PaginatedResponse } from '@/types';

export const ordersApi = {
  create: (data: any) => apiClient.post<ApiResponse<Order>>('/orders', data),
  getAll: (params?: any) => apiClient.get<PaginatedResponse<Order>>('/orders', { params }),
  getById: (id: string) => apiClient.get<ApiResponse<Order>>('/orders/' + id),
};
