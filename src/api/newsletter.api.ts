import { apiClient } from '@/lib/axios';
import { ApiResponse } from '@/types';

export const newsletterApi = {
  subscribe: (email: string) => apiClient.post<ApiResponse<null>>('/newsletter/subscribe', { email }),
  unsubscribe: (email: string) => apiClient.post<ApiResponse<null>>('/newsletter/unsubscribe', { email }),
  send: (data: any) => apiClient.post<ApiResponse<null>>('/newsletter/send', data),
};
