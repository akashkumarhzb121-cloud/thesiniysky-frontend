import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://thesiniysky-backend.onrender.com/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Normalize response - handle endpoints that don't return statusCode
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Ensure response has expected shape
    if (response.data && typeof response.data === 'object') {
      response.data = {
        success: response.data.success ?? true,
        statusCode: response.data.statusCode ?? response.status,
        message: response.data.message ?? 'Success',
        data: response.data.data ?? response.data,
      };
    }
    return response;
  },
  (error: AxiosError) => {
    // Normalize error response
    if (error.response?.data && typeof error.response.data === 'object') {
      const data = error.response.data as any;
      error.response.data = {
        success: false,
        statusCode: data.statusCode ?? error.response.status,
        message: data.message ?? 'An error occurred',
        data: data.data ?? null,
      };
    }
    return Promise.reject(error);
  }
);

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-storage');
      if (token) {
        try {
          const parsed = JSON.parse(token);
          const accessToken = parsed.state?.accessToken;
          if (accessToken) {
            config.headers.Authorization = 'Bearer ' + accessToken;
          }
        } catch (e) {}
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = localStorage.getItem('auth-storage');
        if (token) {
          const parsed = JSON.parse(token);
          const refreshToken = parsed.state?.refreshToken;
          
          if (refreshToken) {
            const response = await axios.post(API_URL + '/auth/refresh', { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = response.data.data || response.data;
            
            parsed.state.accessToken = accessToken;
            parsed.state.refreshToken = newRefreshToken;
            localStorage.setItem('auth-storage', JSON.stringify(parsed));
            
            originalRequest.headers.Authorization = 'Bearer ' + accessToken;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
