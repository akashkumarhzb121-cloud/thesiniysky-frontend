import { useQuery } from '@tanstack/react-query';
import { invoicesApi } from '@/api/invoices.api';

export function useInvoices(params?: any) {
  return useQuery({ queryKey: ['invoices', params], queryFn: () => invoicesApi.getAll(params).then(r => r.data) });
}
