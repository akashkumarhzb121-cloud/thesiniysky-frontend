'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/api/client.api';

export default function ClientDashboard() {
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['client-dashboard'],
    queryFn: () => clientApi.getDashboard().then(r => r.data.data),
  });

  const { data: orders } = useQuery({
    queryKey: ['client-orders'],
    queryFn: () => clientApi.getOrders().then(r => r.data.data),
  });

  const { data: invoices } = useQuery({
    queryKey: ['client-invoices'],
    queryFn: () => clientApi.getInvoices().then(r => r.data.data),
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Active Orders</h3>
          <p className="text-2xl font-bold mt-2">{orders?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Invoices</h3>
          <p className="text-2xl font-bold mt-2">{invoices?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Messages</h3>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Support Tickets</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
      </div>

      {/* Recent Orders */}
      {orders && orders.length > 0 && (
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order #</th>
                  <th className="text-left py-3 px-4">Service</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                    <td className="py-3 px-4">{order.service?.title}</td>
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4">
                      <span className='px-2 py-1 rounded text-xs capitalize'>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

