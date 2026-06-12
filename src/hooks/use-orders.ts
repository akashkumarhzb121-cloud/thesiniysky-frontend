import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/api/orders.api';

export function useOrders(params?: any) {
  return useQuery({ queryKey: ['orders', params], queryFn: () => ordersApi.getAll(params).then(r => r.data) });
}

export function useOrder(id: string) {
  return useQuery({ queryKey: ['order', id], queryFn: () => ordersApi.getById(id).then(r => r.data.data), enabled: !!id });
}
