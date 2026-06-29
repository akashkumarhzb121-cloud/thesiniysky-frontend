'use client';

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
}

const pricingData: PricingCardProps[] = [
  {
    title: "Starter Website",
    price: "$59",
    originalPrice: "₹5,599",
    period: "",
    description: "Perfect for students, freelancers, and personal brands who need a modern online presence.",
    features: [
      "1-3 Responsive Pages",
      "Mobile-Friendly Design",
      "Contact Form",
      "Social Media Integration",
      "Basic SEO Setup",
      "7 Days Free Support"
    ],
    cta: "Get Started",
    href: "/register",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/10",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Professional Website",
    price: "$169",
    originalPrice: "₹15,999",
    period: "",
    description: "Ideal for startups and growing businesses looking for a professional website.",
    features: [
      "Up to 8 Responsive Pages",
      "Custom UI Design",
      "Contact & Inquiry Forms",
      "Google Maps Integration",
      "Basic On-Page SEO",
      "Performance Optimization",
      "30 Days Free Support"
    ],
    cta: "Get Started",
    href: "/register",
    featured: true,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/10",
    borderColor: "border-blue-200 dark:border-blue-800",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: "Custom Web Application",
    price: "Custom",
    period: "",
    description: "Perfect for businesses requiring custom web applications or full-stack solutions.",
    features: [
      "MERN Stack Development",
      "User Authentication",
      "Admin Dashboard",
      "REST API Integration",
      "MongoDB Database",
      "Deployment (Vercel/Render)",
      "Source Code Included",
      "60 Days Technical Support"
    ],
    cta: "Contact Us",
    href: "/contact",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/10",
    borderColor: "border-purple-200 dark:border-purple-800",
    icon: <Crown className="w-6 h-6" />,
  },
];

function PricingCard({ plan, index }: { plan: PricingCardProps; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-8 bg-white dark:bg-gray-900 transition-all duration-300",
        plan.featured
          ? "border-blue-400 dark:border-blue-600 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/20 scale-105"
          : "border-gray-200 dark:border-gray-700 hover:shadow-lg"
      )}
    >
      {plan.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            <Sparkles className="w-3 h-3" /> Most Popular
          </span>
        </div>
      )}

      <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5 text-white", plan.color)}>
        {plan.icon}
      </div>

      <h3 className="text-xl font-bold mb-2 dark:text-white">{plan.title}</h3>
      
      <div className="mb-2">
        <span className="text-4xl font-bold dark:text-white">{plan.price}</span>
        {plan.originalPrice && (
          <span className="text-gray-400 dark:text-gray-500 text-sm ml-2 line-through">{plan.originalPrice}</span>
        )}
        {plan.period && <span className="text-gray-500 dark:text-gray-400 text-lg">{plan.period}</span>}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{plan.description}</p>

      <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

      <ul className="space-y-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link href={plan.href}>
          <button
            className={cn(
              "w-full py-3 px-6 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2",
              plan.featured
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25"
                : plan.title === "Custom Web Application"
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-500 hover:to-violet-500"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            {plan.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <>
      <PublicHeader />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Pricing Plans</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose the perfect plan for your project. All prices are starting prices.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {pricingData.map((plan, index) => (
              <PricingCard key={plan.title} plan={plan} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              All prices are starting prices. Final cost depends on project requirements.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Need a custom solution? <Link href="/contact" className="text-blue-600 hover:underline font-medium">Contact us for a free quote</Link>
            </p>
          </motion.div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}