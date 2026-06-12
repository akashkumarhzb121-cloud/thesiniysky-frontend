import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/api/analytics.api';

export function useDashboardAnalytics() {
  return useQuery({ queryKey: ['analytics-dashboard'], queryFn: () => analyticsApi.getDashboard().then(r => r.data.data) });
}

export function useUserAnalytics() {
  return useQuery({ queryKey: ['analytics-users'], queryFn: () => analyticsApi.getUsers().then(r => r.data.data) });
}

export function useRevenueAnalytics() {
  return useQuery({ queryKey: ['analytics-revenue'], queryFn: () => analyticsApi.getRevenue().then(r => r.data.data) });
}
