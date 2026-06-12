import { apiClient } from '@/lib/axios';
import { Invoice, ApiResponse, PaginatedResponse } from '@/types';

export const invoicesApi = {
  create: (data: any) => apiClient.post<ApiResponse<Invoice>>('/invoices', data),
  getAll: (params?: any) => apiClient.get<PaginatedResponse<Invoice>>('/invoices', { params }),
  getById: (id: string) => apiClient.get<ApiResponse<Invoice>>('/invoices/' + id),
  update: (id: string, data: any) => apiClient.put<ApiResponse<Invoice>>('/invoices/' + id, data),
};
