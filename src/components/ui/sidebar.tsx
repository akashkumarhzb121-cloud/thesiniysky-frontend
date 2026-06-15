'use client';

import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LinkItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextType>({
  open: true,
  setOpen: () => {},
  animate: true,
});

export function Sidebar({ children, open, setOpen }: { children: React.ReactNode; open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: true }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {children}
    </div>
  );
}

export function SidebarLink({ link, className }: { link: LinkItem; className?: string }) {
  const { open, animate } = useContext(SidebarContext);
  
  return (
    <Link
      href={link.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
        !open && 'justify-center px-2',
        className
      )}
    >
      <div className="shrink-0">{link.icon}</div>
      <motion.span
        animate={{
          opacity: animate ? (open ? 1 : 0) : 1,
          width: animate ? (open ? 'auto' : 0) : 'auto',
        }}
        className="overflow-hidden whitespace-pre"
      >
        {link.label}
      </motion.span>
    </Link>
  );
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <motion.aside
        animate={{
          width: open ? 260 : 72,
          x: mobileOpen ? 0 : 0,
        }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-white dark:bg-gray-900 dark:border-gray-800',
          'lg:relative lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          {children}
        </Sidebar>
      </motion.aside>

      {/* Toggle buttons */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-4 -right-4 z-50 hidden lg:flex items-center justify-center w-8 h-8 rounded-full border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
      >
        {open ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border shadow-sm"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  );
}