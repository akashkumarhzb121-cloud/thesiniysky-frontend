"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowUp, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface Footer7Props {
  logo?: {
    url: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  copyright?: string;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Services", href: "/services" },
      { name: "Projects", href: "/projects" },
      { name: "Pricing", href: "/pricing" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/About" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/career" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Resources", href: "/resources" },
      { name: "Testimonials", href: "/testimonials" },
      { name: "Newsletter", href: "/contact" },
      { name: "Support", href: "/client/support" },
    ],
  },
];

const socialLinks = [
  {
    name: "Code2",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: "hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    color: "hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20",
  },
  {
    name: "Email",
    href: "mailto:contact@thesiniysky.com",
    icon: <Mail className="w-5 h-5" />,
    color: "hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
];

export function Footer7({
  logo = { url: "/", title: "TheSiniySky" },
  sections = defaultSections,
  description = "Premium SaaS platform for modern businesses. Build faster with our powerful tools and services.",
  copyright,
}: Footer7Props) {
  const year = new Date().getFullYear();
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

      <div className="container mx-auto py-16 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <Link href={logo.url} className="group flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/25">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {logo.title}
              </h2>
            </Link>

            <p className="max-w-[80%] text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {description}
            </p>

            {/* Social Links - Pop-up style */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ y: -6, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={`relative p-3 rounded-xl text-gray-500 transition-all duration-300 ${social.color}`}
                >
                  {social.icon}
                  {/* Pop-up label */}
                  <motion.span
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={hoveredSocial === social.name ? { opacity: 1, y: -40, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 -top-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap pointer-events-none shadow-lg"
                  >
                    {social.name}
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Sections */}
          <motion.div variants={itemVariants} className="grid w-full grid-cols-2 md:grid-cols-3 gap-8 lg:gap-16">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <motion.li
                      key={linkIdx}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-0 h-px bg-blue-600 dark:bg-blue-400 group-hover:w-2 transition-all duration-300" />
                        {link.className ? <span className={link.className}>{link.name}</span> : link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col gap-4 border-t border-gray-200 dark:border-gray-800 pt-8 text-xs text-gray-500 dark:text-gray-400 md:flex-row md:items-center md:justify-between"
        >
          <p className="flex items-center gap-1">
            {copyright || ('\u00A9 ' + year + ' TheSiniySky. All rights reserved.')}
            <span className="inline-flex items-center gap-1 text-red-500">
              <Heart className="w-3 h-3 fill-current animate-pulse" />
            </span>
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group">
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group">
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 group-hover:w-full transition-all duration-300" />
            </Link>
            
            {/* Scroll to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}