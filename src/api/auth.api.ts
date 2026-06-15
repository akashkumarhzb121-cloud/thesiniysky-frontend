import { apiClient } from '@/lib/axios';
import { AuthResponse, User, ApiResponse } from '@/types';

export const authApi = {
  register: (data: { firstName: string; lastName: string; email: string; password: string }) =>
    apiClient.post<AuthResponse>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  logout: () => apiClient.post<ApiResponse<null>>('/auth/logout'),

  refresh: (refreshToken: string) =>
    apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string }>>('/auth/refresh', { refreshToken }),

  verifyEmail: (token: string) =>
    apiClient.post<ApiResponse<null>>('/auth/verify-email', { token }),

  forgotPassword: (email: string) =>
    apiClient.post<ApiResponse<null>>('/auth/forgot-password', { email }),

  resetPassword: (data: { token: string; password: string }) =>
    apiClient.post<ApiResponse<null>>('/auth/reset-password', data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.post<ApiResponse<null>>('/auth/change-password', data),

  getMe: () => apiClient.get<ApiResponse<User>>('/auth/me'),

  updateProfile: (data: Partial<User>) =>
    apiClient.put<ApiResponse<User>>('/auth/profile', data),

  deleteAccount: () => apiClient.delete<ApiResponse<null>>('/auth/account'),
};