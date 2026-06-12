'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminNav = [
  { title: 'Dashboard', href: '/admin' },
  { title: 'Users', href: '/admin/users' },
  { title: 'Projects', href: '/admin/projects' },
  { title: 'Blogs', href: '/admin/blogs' },
  { title: 'Services', href: '/admin/services' },
  { title: 'Skills', href: '/admin/skills' },
  { title: 'Experience', href: '/admin/experience' },
  { title: 'Achievements', href: '/admin/achievements' },
  { title: 'Testimonials', href: '/admin/testimonials' },
  { title: 'Leads', href: '/admin/leads' },
  { title: 'Orders', href: '/admin/orders' },
  { title: 'Payments', href: '/admin/payments' },
  { title: 'Invoices', href: '/admin/invoices' },
  { title: 'Newsletter', href: '/admin/newsletter' },
  { title: 'Media', href: '/admin/media' },
  { title: 'Analytics', href: '/admin/analytics' },
  { title: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const base = 'block px-3 py-2 rounded-md text-sm font-medium transition-colors';
    if (pathname === href) {
      return base + ' bg-blue-50 text-blue-600';
    }
    return base + ' text-gray-600 hover:bg-gray-50';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform lg:relative lg:translate-x-0" style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div className="p-6 border-b">
          <Link href="/" className="text-xl font-bold text-blue-600">TheSiniySky</Link>
          <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ height: 'calc(100vh - 140px)' }}>
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={getLinkClass(item.href)}
              onClick={() => setSidebarOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t bg-white">
          <Link href="/" className="block w-full text-center py-2 text-sm text-gray-600 hover:text-gray-900">
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <button className="lg:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-4">
            <Link href="/profile" className="text-sm text-gray-600 hover:text-gray-900">Profile</Link>
            <Link href="/login" className="text-sm text-red-600 hover:text-red-700">Logout</Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
