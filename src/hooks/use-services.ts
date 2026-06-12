import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesApi } from '@/api/services.api';

export function useServices(params?: any) {
  return useQuery({ queryKey: ['services', params], queryFn: () => servicesApi.getAll(params).then(r => r.data) });
}

export function useServiceBySlug(slug: string) {
  return useQuery({ queryKey: ['service', slug], queryFn: () => servicesApi.getBySlug(slug).then(r => r.data.data), enabled: !!slug });
}
