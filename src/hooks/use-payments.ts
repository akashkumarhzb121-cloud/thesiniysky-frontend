import { useMutation } from '@tanstack/react-query';
import { paymentsApi } from '@/api/payments.api';

export function useProcessPayment() {
  return useMutation({ mutationFn: paymentsApi.process });
}

export function useVerifyPayment() {
  return useMutation({ mutationFn: paymentsApi.verify });
}
