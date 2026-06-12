import { useQuery } from '@tanstack/react-query';
import { crmApi } from '@/api/crm.api';

export function useLeads(params?: any) {
  return useQuery({ queryKey: ['leads', params], queryFn: () => crmApi.getLeads(params).then(r => r.data) });
}

export function usePipeline() {
  return useQuery({ queryKey: ['pipeline'], queryFn: () => crmApi.getPipeline().then(r => r.data.data) });
}
