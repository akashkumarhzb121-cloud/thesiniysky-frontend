import { useQuery } from '@tanstack/react-query';
import { blogsApi } from '@/api/blogs.api';

export function useBlogs(params?: any) {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: () => blogsApi.getAll(params).then((res) => res.data),
  });
}

export function useFeaturedBlogs() {
  return useQuery({
    queryKey: ['blogs', 'featured'],
    queryFn: () => blogsApi.getFeatured().then((res) => res.data.data),
  });
}

export function useBlogBySlug(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogsApi.getBySlug(slug).then((res) => res.data.data),
    enabled: !!slug,
  });
}
