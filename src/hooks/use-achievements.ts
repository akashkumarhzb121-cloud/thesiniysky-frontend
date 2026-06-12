import { useQuery } from '@tanstack/react-query';
import { achievementsApi } from '@/api/achievements.api';

export function useAchievements() {
  return useQuery({ queryKey: ['achievements'], queryFn: () => achievementsApi.getAll().then(r => r.data.data) });
}
