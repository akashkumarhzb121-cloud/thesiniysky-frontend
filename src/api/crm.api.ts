import { apiClient } from '@/lib/axios';
import { Lead, ApiResponse, PaginatedResponse } from '@/types';

export const crmApi = {
  getLeads: (params?: any) => apiClient.get<PaginatedResponse<Lead>>('/crm/leads', { params }),
  createLead: (data: Partial<Lead>) => apiClient.post<ApiResponse<Lead>>('/crm/leads', data),
  updateLead: (id: string, data: Partial<Lead>) => apiClient.put<ApiResponse<Lead>>('/crm/leads/' + id, data),
  deleteLead: (id: string) => apiClient.delete<ApiResponse<null>>('/crm/leads/' + id),
  getPipeline: () => apiClient.get<ApiResponse<any>>('/crm/pipeline'),
};
