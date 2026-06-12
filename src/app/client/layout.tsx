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

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r">
        <div className="p-6 border-b">
          <Link href="/" className="text-xl font-bold text-blue-600">TheSiniySky</Link>
          <p className="text-xs text-gray-500 mt-1">Client Portal</p>
        </div>
        <nav className="p-4 space-y-1">
          {clientNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={lock px-3 py-2 rounded-md text-sm font-medium transition-colors }
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
