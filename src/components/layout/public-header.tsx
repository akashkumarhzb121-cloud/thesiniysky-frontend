'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/blog' },
    { title: 'Resources', href: '/resources' },
    { title: 'Contact', href: '/contact' },
  ];

  const linkClass = (href: string) => {
    const base = 'text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400';
    if (pathname === href) return base + ' text-blue-600 dark:text-blue-400';
    return base + ' text-gray-600 dark:text-gray-300';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              TheSiniySky
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          )}

          {isAuthenticated ? (
            <Link href={user?.role === 'admin' || user?.role === 'super_admin' ? '/admin' : '/client'}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Dashboard
              </button>
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          )}

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login">
                  <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
