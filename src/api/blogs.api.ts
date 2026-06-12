import { apiClient } from '@/lib/axios';
import { Blog, PaginatedResponse, ApiResponse } from '@/types';

export const blogsApi = {
  getAll: (params?: any) => apiClient.get<PaginatedResponse<Blog>>('/blogs', { params }),
  getFeatured: () => apiClient.get<ApiResponse<Blog[]>>('/blogs/featured'),
  getTrending: () => apiClient.get<ApiResponse<Blog[]>>('/blogs/trending'),
  getBySlug: (slug: string) => apiClient.get<ApiResponse<Blog>>('/blogs/slug/' + slug),
  getById: (id: string) => apiClient.get<ApiResponse<Blog>>('/blogs/' + id),
  create: (data: Partial<Blog>) => apiClient.post<ApiResponse<Blog>>('/blogs', data),
  update: (id: string, data: Partial<Blog>) => apiClient.put<ApiResponse<Blog>>('/blogs/' + id, data),
  delete: (id: string) => apiClient.delete<ApiResponse<null>>('/blogs/' + id),
  like: (id: string) => apiClient.post<ApiResponse<null>>('/blogs/' + id + '/like'),
  bookmark: (id: string) => apiClient.post<ApiResponse<null>>('/blogs/' + id + '/bookmark'),
  addComment: (id: string, content: string) => apiClient.post<ApiResponse<null>>('/blogs/' + id + '/comments', { content }),
};
