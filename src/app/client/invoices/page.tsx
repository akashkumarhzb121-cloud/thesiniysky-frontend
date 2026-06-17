'use client';

import { useQuery } from '@tanstack/react-query';
import { invoicesApi } from '@/api/invoices.api';

export default function ClientInvoicesPage() {
  const { data: invoices, isLoading } = useQuery({
    queryKey: ['client-invoices'],
    queryFn: () => invoicesApi.getAll().then(r => r.data),
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Invoices</h1>
      {isLoading ? (
        <div className="text-center py-12"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></div>
      ) : invoices?.data && invoices.data.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Invoice #</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.data.map((invoice: any) => (
                <tr key={invoice.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{invoice.invoiceNumber}</td>
                  <td className="py-3 px-4"></td>
                  <td className="py-3 px-4">
                    <span className={px-2 py-1 rounded text-xs capitalize }>{invoice.status}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">No invoices yet.</div>
      )}
    </div>
  );
}
