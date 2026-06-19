import { apiClient } from '@/lib/axios';
import { MediaFile, ApiResponse } from '@/types';

export const mediaApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post<ApiResponse<MediaFile>>('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  list: () => apiClient.get<ApiResponse<MediaFile[]>>('/media/list'),
  delete: (id: string) => apiClient.post<ApiResponse<null>>('/media/delete', { id }),
};
