'use client';

import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/api/orders.api';
import { DataTable } from '@/components/data/data-table';

export default function AdminOrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => ordersApi.getAll({ limit: 100 }).then(r => r.data),
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>
      <DataTable
        columns={[
          { key: 'orderNumber', header: 'Order #' },
          { key: 'amount', header: 'Amount', render: (item: any) => '$' + item.amount },
          { 
            key: 'status', 
            header: 'Status',
            render: (item: any) => (
              <span className={'px-2 py-1 rounded text-xs capitalize ' + (
                item.status === 'completed' ? 'bg-green-50 text-green-600' : 
                item.status === 'processing' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'
              )}>{item.status}</span>
            )
          },
          { key: 'createdAt', header: 'Date', render: (item: any) => new Date(item.createdAt).toLocaleDateString() },
        ]}
        data={data?.data || []}
        isLoading={isLoading}
        emptyMessage="No orders found"
      />
    </div>
  );
}
