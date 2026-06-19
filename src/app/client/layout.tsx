'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, ShoppingCart, FileText, MessageSquare, FolderOpen, Headphones } from 'lucide-react';

const clientNav = [
  { title: 'Dashboard', href: '/client', icon: LayoutDashboard },
  { title: 'Orders', href: '/client/orders', icon: ShoppingCart },
  { title: 'Invoices', href: '/client/invoices', icon: FileText },
  { title: 'Messages', href: '/client/messages', icon: MessageSquare },
  { title: 'Documents', href: '/client/documents', icon: FolderOpen },
  { title: 'Support', href: '/client/support', icon: Headphones },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getLinkClass = (href: string) => {
    const base = 'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors';
    if (pathname === href) return base + ' bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
    return base + ' text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800';
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <aside className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 flex flex-col">
        <div className="p-6 border-b dark:border-gray-800">
          <Link href="/" className="text-xl font-bold text-blue-600">TheSiniySky</Link>
          <p className="text-xs text-gray-500 mt-1">Client Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {clientNav.map((item) => (
            <Link key={item.href} href={item.href} className={getLinkClass(item.href)}>
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              {user?.firstName?.charAt(0) || 'C'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate dark:text-white">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}