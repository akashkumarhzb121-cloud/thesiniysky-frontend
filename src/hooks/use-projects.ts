import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/api/projects.api';

export function useProjects(params?: any) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectsApi.getAll(params).then((res) => res.data),
  });
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: () => projectsApi.getFeatured().then((res) => res.data.data),
  });
}

export function useProjectBySlug(slug: string) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => projectsApi.getBySlug(slug).then((res) => res.data.data),
    enabled: !!slug,
  });
}
