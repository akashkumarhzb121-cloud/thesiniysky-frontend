'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar, SidebarBody, SidebarLink, SidebarProvider } from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  LayoutDashboard, Users, Briefcase, FileEdit, Wrench, Award,
  Building2, Trophy, Star, UserPlus, ShoppingCart, CreditCard,
  FileText, Mail, Image, BarChart3, Settings, Activity,
  LogOut, Bell, Search, Menu, X, ChevronLeft, ChevronRight
} from 'lucide-react';

const adminNavItems = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5 shrink-0" /> },
  { label: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5 shrink-0" /> },
  { label: 'Projects', href: '/admin/projects', icon: <Briefcase className="h-5 w-5 shrink-0" /> },
  { label: 'Blogs', href: '/admin/blogs', icon: <FileEdit className="h-5 w-5 shrink-0" /> },
  { label: 'Services', href: '/admin/services', icon: <Wrench className="h-5 w-5 shrink-0" /> },
  { label: 'Skills', href: '/admin/skills', icon: <Award className="h-5 w-5 shrink-0" /> },
  { label: 'Experience', href: '/admin/experience', icon: <Building2 className="h-5 w-5 shrink-0" /> },
  { label: 'Achievements', href: '/admin/achievements', icon: <Trophy className="h-5 w-5 shrink-0" /> },
  { label: 'Testimonials', href: '/admin/testimonials', icon: <Star className="h-5 w-5 shrink-0" /> },
  { label: 'Leads CRM', href: '/admin/leads', icon: <UserPlus className="h-5 w-5 shrink-0" /> },
  { label: 'Orders', href: '/admin/orders', icon: <ShoppingCart className="h-5 w-5 shrink-0" /> },
  { label: 'Payments', href: '/admin/payments', icon: <CreditCard className="h-5 w-5 shrink-0" /> },
  { label: 'Invoices', href: '/admin/invoices', icon: <FileText className="h-5 w-5 shrink-0" /> },
  { label: 'Newsletter', href: '/admin/newsletter', icon: <Mail className="h-5 w-5 shrink-0" /> },
  { label: 'Media', href: '/admin/media', icon: <Image className="h-5 w-5 shrink-0" /> },
  { label: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="h-5 w-5 shrink-0" /> },
  { label: 'System Logs', href: '/admin/system-logs', icon: <Activity className="h-5 w-5 shrink-0" /> },
  { label: 'Settings', href: '/admin/settings', icon: <Settings className="h-5 w-5 shrink-0" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Premium Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 p-4">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center justify-between mb-6 px-1">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                {open && (
                  <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    TheSiniySky
                  </span>
                )}
              </Link>
            </div>

            {/* Toggle button */}
            <button
              onClick={() => setOpen(!open)}
              className="mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 flex items-center justify-center"
            >
              {open ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {open && <span className="whitespace-pre">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User section */}
          <div className="border-t dark:border-gray-800 pt-4">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-medium shrink-0">
                {user?.name?.charAt(0) || 'A'}
              </div>
              {open && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">{user?.role?.replace('_', ' ')}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => { logout(); router.push('/'); }}
              className="flex items-center gap-3 px-3 py-2 mt-1 w-full rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {open && <span>Sign Out</span>}
            </button>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold dark:text-white">
              {adminNavItems.find(item => item.href === pathname)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}