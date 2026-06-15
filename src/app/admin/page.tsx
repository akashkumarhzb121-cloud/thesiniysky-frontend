'use client';

import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/api/analytics.api';
import { adminApi } from '@/api/admin.api';
import { NumberTicker } from '@/components/ui/number-ticker';
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar';
import { MagicCard } from '@/components/ui/magic-card';
import { AnimatedList } from '@/components/ui/animated-list';
import { useTheme } from 'next-themes';
import { Users, ShoppingCart, DollarSign, TrendingUp, Activity, Star, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const { theme } = useTheme();
  
  const { data: analytics } = useQuery({
    queryKey: ['analytics-dashboard'],
    queryFn: () => analyticsApi.getDashboard().then(r => r.data.data),
  });

  const { data: users } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => adminApi.getUsers().then(r => r.data.data),
  });

  // Mock recent activities for animated list
  const activities = [
    { name: "New user registered", description: "john@example.com", time: "2m ago", icon: "👤", color: "#3B82F6" },
    { name: "Order completed", description: "Order #1234 - $500", time: "15m ago", icon: "✅", color: "#10B981" },
    { name: "Payment received", description: "$2,500 from Acme Corp", time: "1h ago", icon: "💸", color: "#F59E0B" },
    { name: "New project created", description: "Web Redesign", time: "3h ago", icon: "🚀", color: "#8B5CF6" },
    { name: "Support ticket resolved", description: "Ticket #5678", time: "5h ago", icon: "🎫", color: "#EC4899" },
  ];

  const ActivityItem = ({ name, description, icon, color, time }: any) => (
    <figure className={cn(
      "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
      "transition-all duration-200 ease-in-out hover:scale-[103%]",
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
    )}>
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl" style={{ backgroundColor: color }}>
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <span className="ml-auto text-xs text-gray-400">{time}</span>
      </div>
    </figure>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Activity className="w-4 h-4" />
          Real-time updates active
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm">
                <ArrowUp className="w-3 h-3" /> 12%
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
            <NumberTicker value={users?.length || 0} className="text-3xl font-bold dark:text-white" />
          </div>
        </MagicCard>

        <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm">
                <ArrowUp className="w-3 h-3" /> 8%
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
            <NumberTicker value={analytics?.totalOrders || 0} className="text-3xl font-bold dark:text-white" />
          </div>
        </MagicCard>

        <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm">
                <ArrowUp className="w-3 h-3" /> 23%
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
            <NumberTicker value={analytics?.totalRevenue || 0} className="text-3xl font-bold dark:text-white" prefix="$" />
          </div>
        </MagicCard>

        <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm">
                <ArrowUp className="w-3 h-3" /> 5%
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Satisfaction</p>
            <AnimatedCircularProgressBar 
              value={95} 
              gaugePrimaryColor="#8B5CF6"
              gaugeSecondaryColor={theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              className="mt-2"
            />
          </div>
        </MagicCard>
      </div>

      {/* Recent Activity */}
      <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Activity</h2>
          <div className="h-[400px] overflow-hidden">
            <AnimatedList>
              {activities.map((item, idx) => (
                <ActivityItem {...item} key={idx} />
              ))}
            </AnimatedList>
          </div>
        </div>
      </MagicCard>
    </div>
  );
}