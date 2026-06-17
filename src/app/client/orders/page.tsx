'use client';

import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/api/orders.api';

export default function ClientOrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['client-orders'],
    queryFn: () => ordersApi.getAll().then(r => r.data),
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {isLoading ? (
        <div className="text-center py-12"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></div>
      ) : orders?.data && orders.data.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Order #</th>
                <th className="text-left py-3 px-4">Service</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.data.map((order: any) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                  <td className="py-3 px-4">{order.service?.title || 'N/A'}</td>
                  <td className="py-3 px-4"></td>
                  <td className="py-3 px-4">
                    <span className={px-2 py-1 rounded text-xs capitalize }>{order.status}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">No orders yet.</div>
      )}
    </div>
  );
}
