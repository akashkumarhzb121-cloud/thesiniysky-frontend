import { useQuery } from '@tanstack/react-query';
import { experienceApi } from '@/api/experience.api';

export function useExperience() {
  return useQuery({ queryKey: ['experience'], queryFn: () => experienceApi.getAll().then(r => r.data.data) });
}
