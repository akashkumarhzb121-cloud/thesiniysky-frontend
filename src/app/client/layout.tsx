'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const clientNav = [
  { title: 'Dashboard', href: '/client' },
  { title: 'Orders', href: '/client/orders' },
  { title: 'Invoices', href: '/client/invoices' },
  { title: 'Messages', href: '/client/messages' },
  { title: 'Documents', href: '/client/documents' },
  { title: 'Support', href: '/client/support' },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const base = 'block px-3 py-2 rounded-md text-sm font-medium transition-colors';
    if (pathname === href) {
      return base + ' bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
    }
    return base + ' text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800';
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <aside className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800">
          <Link href="/" className="text-xl font-bold text-blue-600">TheSiniySky</Link>
          <p className="text-xs text-gray-500 mt-1">Client Portal</p>
        </div>
        <nav className="p-4 space-y-1">
          {clientNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={getLinkClass(item.href)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}