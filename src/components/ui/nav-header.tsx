"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

interface TabProps {
  children: React.ReactNode;
  setPosition: any;
  href: string;
  active?: boolean;
}

const Tab = ({ children, setPosition, href, active }: TabProps) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block"
    >
      <Link
        href={href}
        className={`block cursor-pointer px-3 py-1.5 text-xs uppercase transition-colors md:px-5 md:py-3 md:text-base ${
          active ? "text-white" : "text-black dark:text-white"
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-black dark:bg-white md:h-12"
    />
  );
};

export function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
            TheSiniySky
          </span>
        </Link>

        {/* Navigation */}
        <nav>
          <ul
            className="relative mx-auto flex w-fit rounded-full border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-1"
            onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
          >
            {navItems.map((item) => (
              <Tab
                key={item.href}
                setPosition={setPosition}
                href={item.href}
                active={pathname === item.href}
              >
                {item.label}
              </Tab>
            ))}
            <Cursor position={position} />
          </ul>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          )}

          {isAuthenticated ? (
            <Link
              href={user?.role === "admin" || user?.role === "super_admin" ? "/admin" : "/client"}
              className="hidden sm:inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}