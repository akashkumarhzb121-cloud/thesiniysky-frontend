import { apiClient } from '@/lib/axios';
import { Payment, ApiResponse } from '@/types';

export const paymentsApi = {
  process: (data: { orderId: string; amount: number; method: 'razorpay' | 'stripe' }) =>
    apiClient.post<ApiResponse<Payment>>('/payments/process', data),
  verify: (data: any) => apiClient.post<ApiResponse<null>>('/payments/verify', data),
};
