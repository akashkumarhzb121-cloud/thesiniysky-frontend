import { useQuery } from '@tanstack/react-query';
import { resourcesApi } from '@/api/resources.api';

export function useResources(params?: any) {
  return useQuery({
    queryKey: ['resources', params],
    queryFn: () => resourcesApi.getAll(params).then(r => r.data),
  });
}
