import { useMutation } from '@tanstack/react-query';
import { contactApi } from '@/api/contact.api';

export function useContactForm() {
  return useMutation({ mutationFn: contactApi.submit });
}
