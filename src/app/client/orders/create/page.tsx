'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/api/orders.api';
import { useServices } from '@/hooks/use-services';
import { useRouter } from 'next/navigation';
import { FormField, FormWrapper } from '@/components/forms/form-components';

export default function CreateOrderPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: servicesData } = useServices();
  const [error, setError] = useState('');

  const createMutation = useMutation({
    mutationFn: ordersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-orders'] });
      router.push('/client/orders');
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to create order');
    },
  });

  const services = servicesData?.data || [];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Create New Order</h1>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border dark:border-gray-700">
        <FormWrapper
          onSubmit={(data) => createMutation.mutate(data)}
          submitLabel="Place Order"
          isLoading={createMutation.isPending}
          error={error}
        >
          <FormField label="Service" name="serviceId" type="select" required
            options={services.map((s: any) => ({ value: s.id, label: s.title + (s.price ? ' - $' + s.price : '') }))} />
          <FormField label="Notes" name="notes" type="textarea" placeholder="Any special requirements..." />
          <FormField label="Amount" name="amount" type="number" required placeholder="Enter amount" />
        </FormWrapper>
      </div>
    </div>
  );
}
