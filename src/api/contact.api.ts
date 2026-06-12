import { apiClient } from '@/lib/axios';
import { Contact, ApiResponse } from '@/types';

export const contactApi = {
  submit: (data: { name: string; email: string; subject: string; message: string }) =>
    apiClient.post<ApiResponse<Contact>>('/contact', data),
  getById: (id: string) => apiClient.get<ApiResponse<Contact>>('/contact/' + id),
};
