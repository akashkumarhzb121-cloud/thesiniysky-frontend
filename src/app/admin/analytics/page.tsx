'use client';

import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/api/analytics.api';
import { DynamicChart, StatCard } from '@/components/charts/charts';
import { LoadingState } from '@/components/forms/form-components';

export default function AdminAnalyticsPage() {
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['analytics-dashboard'],
    queryFn: () => analyticsApi.getDashboard().then(r => r.data.data),
  });

  const { data: revenueData } = useQuery({
    queryKey: ['analytics-revenue'],
    queryFn: () => analyticsApi.getRevenue().then(r => r.data.data),
  });

  const { data: userData } = useQuery({
    queryKey: ['analytics-users'],
    queryFn: () => analyticsApi.getUsers().then(r => r.data.data),
  });

  if (isLoading) return <LoadingState message="Loading analytics..." />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold dark:text-white">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={dashboard?.totalUsers || 0} change="+12%" icon="👥" />
        <StatCard title="Total Orders" value={dashboard?.totalOrders || 0} change="+8%" icon="📦" />
        <StatCard title="Revenue" value={'$' + (dashboard?.totalRevenue || 0)} change="+23%" icon="💰" />
        <StatCard title="Growth Rate" value="23%" change="+5%" icon="📈" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {revenueData && (
          <DynamicChart data={revenueData} type="bar" title="Revenue Overview" height={300} />
        )}
        {userData && (
          <DynamicChart data={userData} type="line" title="User Growth" height={300} dataKey="count" nameKey="month" />
        )}
      </div>

      {dashboard?.orderStats && (
        <DynamicChart
          data={[
            { label: 'Pending', value: dashboard.orderStats.pending || 0 },
            { label: 'Processing', value: dashboard.orderStats.processing || 0 },
            { label: 'Completed', value: dashboard.orderStats.completed || 0 },
            { label: 'Cancelled', value: dashboard.orderStats.cancelled || 0 },
          ]}
          type="pie"
          title="Order Distribution"
          height={350}
          dataKey="value"
          nameKey="label"
        />
      )}
    </div>
  );
}