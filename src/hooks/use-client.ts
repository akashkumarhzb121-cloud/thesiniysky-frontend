import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/api/client.api';

export function useClientDashboard() {
  return useQuery({ queryKey: ['client-dashboard'], queryFn: () => clientApi.getDashboard().then(r => r.data.data) });
}

export function useClientOrders() {
  return useQuery({ queryKey: ['client-orders'], queryFn: () => clientApi.getOrders().then(r => r.data.data) });
}

export function useClientInvoices() {
  return useQuery({ queryKey: ['client-invoices'], queryFn: () => clientApi.getInvoices().then(r => r.data.data) });
}
