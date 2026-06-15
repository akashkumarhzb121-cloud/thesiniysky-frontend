'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesApi } from '@/api/invoices.api';
import { DataTable } from '@/components/data/data-table';
import { useState } from 'react';

export default function AdminInvoicesPage() {
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-invoices'],
    queryFn: () => invoicesApi.getAll({ limit: 100 }).then(r => r.data),
  });

  const createMutation = useMutation({
    mutationFn: invoicesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-invoices'] });
      setCreating(false);
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Invoices Management</h1>
        <button onClick={() => setCreating(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + New Invoice
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'invoiceNumber', header: 'Invoice #' },
          { key: 'total', header: 'Total', render: (item: any) => '$' + item.total },
          { 
            key: 'status', 
            header: 'Status',
            render: (item: any) => (
              <span className={'px-2 py-1 rounded text-xs capitalize ' + (
                item.status === 'paid' ? 'bg-green-50 text-green-600' : 
                item.status === 'overdue' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
              )}>{item.status}</span>
            )
          },
          { key: 'dueDate', header: 'Due Date', render: (item: any) => new Date(item.dueDate).toLocaleDateString() },
        ]}
        data={data?.data || []}
        isLoading={isLoading}
        emptyMessage="No invoices found"
      />

      {creating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">New Invoice</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              createMutation.mutate(Object.fromEntries(fd));
            }} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Order ID</label><input name="orderId" className="w-full px-3 py-2 border rounded-lg" required /></div>
              <div><label className="block text-sm font-medium mb-1">Amount</label><input name="amount" type="number" className="w-full px-3 py-2 border rounded-lg" required /></div>
              <div><label className="block text-sm font-medium mb-1">Due Date</label><input name="dueDate" type="date" className="w-full px-3 py-2 border rounded-lg" required /></div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setCreating(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
